import { NextRequest, NextResponse } from 'next/server';
import { enqueue, readQueue, removeFromQueue, updateAttempt } from '@/lib/submission-queue';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PEOPLE_TABLE = process.env.AIRTABLE_PEOPLE_TABLE ?? 'People';
const DESPIERTA_TABLE = process.env.AIRTABLE_DESPIERTA_TABLE ?? 'Despierta Canning';
const DESPIERTA_GUESTS_TABLE = process.env.AIRTABLE_DESPIERTA_GUESTS_TABLE ?? 'Despierta Canning Guests';

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

function escapeFormulaValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

const VALID_ROLES = [
  'Anfitrión - Casa',
  'Anfitrión - Iglesia',
  'Anfitrión - Otro lugar',
  'Co-anfitrión',
];

async function findPersonByPhone(phoneNormalized: string): Promise<AirtableRecord | null> {
  const safePhone = escapeFormulaValue(phoneNormalized);
  const formula = `OR({Phone normalized} = '${safePhone}', {Telefono} = '${safePhone}')`;
  const url = `${AIRTABLE_URL}/${encodeURIComponent(PEOPLE_TABLE)}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`;

  const res = await fetch(url, { headers, method: 'GET' });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable People search failed: ${res.status} – ${body}`);
  }

  const data = await res.json();
  const records: AirtableRecord[] = data.records ?? [];
  return records.length > 0 ? records[0] : null;
}

async function createPerson(
  firstName: string,
  lastName: string,
  phone?: string,
  invitedBy?: string[]
): Promise<string> {
  const fields: Record<string, unknown> = {
    'Nombre': firstName,
    'Apellido': lastName,
  };
  if (phone) fields['Telefono'] = phone;
  if (invitedBy && invitedBy.length > 0) {
    fields['Invitado de Despierta Canning por'] = invitedBy;
  }

  const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(PEOPLE_TABLE)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable People create failed: ${res.status} – ${body}`);
  }

  const data = await res.json();
  return data.id as string;
}

async function createDespiertaRegistration(
  personId: string,
  role: string,
  locationName?: string
): Promise<string> {
  const fields: Record<string, unknown> = {
    'Persona Anfitriona': [personId],
    Rol: role,
  };
  if (locationName) fields['Lugar de Encuentro'] = locationName;
  fields['Fecha de Registro'] = new Date().toISOString();

  const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(DESPIERTA_TABLE)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable Despierta Canning create failed: ${res.status} – ${body}`);
  }

  const data = await res.json();
  return data.id as string;
}

async function createDespiertaGuest(
  guestPersonId: string,
  hostRegId: string
): Promise<void> {
  const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(DESPIERTA_GUESTS_TABLE)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        'Persona Invitada': [guestPersonId],
        'Anfitrion': [hostRegId],
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable Despierta Canning Guests create failed: ${res.status} – ${body}`);
  }
}

export async function processSubmission(payload: {
  hostFirstName: string;
  hostLastName: string;
  hostPhone: string;
  role: string;
  locationName?: string;
  guests: { firstName: string; lastName: string }[];
}): Promise<void> {
  const { hostFirstName, hostLastName, hostPhone, role, locationName, guests } = payload;

  // 1. Normalize phone
  const phoneNormalized = normalizePhone(hostPhone);

  // 2. Find or create host in People
  let hostPersonId: string;
  const existingPerson = await findPersonByPhone(phoneNormalized);

  if (existingPerson) {
    hostPersonId = existingPerson.id;
  } else {
    hostPersonId = await createPerson(hostFirstName, hostLastName, hostPhone);
  }

  // 3. Create Despierta Canning registration
  const hostRegId = await createDespiertaRegistration(
    hostPersonId,
    role,
    role === 'Anfitrión - Casa' ? 'Casa' :
    role === 'Anfitrión - Iglesia' ? 'Iglesia' :
    role === 'Anfitrión - Otro lugar' ? locationName :
    undefined
  );

  // 4. Process each guest
  for (const guest of guests) {
    const guestPersonId = await createPerson(
      guest.firstName,
      guest.lastName,
      undefined,
      [hostPersonId]
    );

    await createDespiertaGuest(guestPersonId, hostRegId);
  }
}

function drainQueue(): void {
  const queue = readQueue();
  if (queue.length === 0) return;

  console.log(`Auto-retrying ${queue.length} queued submission(s)...`);

  (async () => {
    for (const item of queue) {
      try {
        await processSubmission(item.payload);
        removeFromQueue(item.id);
        console.log(`Queued submission ${item.id} processed successfully.`);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        updateAttempt(item.id, errorMsg);
        console.error(`Queued submission ${item.id} failed again:`, errorMsg);
        break;
      }
    }
  })();
}

export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Error en la configuración del servidor.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { hostFirstName, hostLastName, hostPhone, role, locationName, guests } = body as {
      hostFirstName?: string;
      hostLastName?: string;
      hostPhone?: string;
      role?: string;
      locationName?: string;
      guests?: { firstName?: string; lastName?: string }[];
    };

    // Validate required fields
    if (!hostFirstName?.trim() || !hostLastName?.trim() || !hostPhone?.trim() || !role?.trim()) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben completarse.' },
        { status: 400 }
      );
    }

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { error: 'El rol seleccionado no es válido.' },
        { status: 400 }
      );
    }

    const isCohost = role === 'Co-anfitrión';
    const validGuests = Array.isArray(guests)
      ? guests.filter((g) => g.firstName?.trim())
      : [];

    if (!isCohost && validGuests.length === 0) {
      return NextResponse.json(
        { error: 'Debés agregar al menos un invitado.' },
        { status: 400 }
      );
    }

    const submissionPayload = {
      hostFirstName: hostFirstName.trim(),
      hostLastName: hostLastName.trim(),
      hostPhone: hostPhone.trim(),
      role,
      locationName: role === 'Anfitrión - Casa' ? 'Casa' :
        role === 'Anfitrión - Iglesia' ? 'Iglesia' :
        role === 'Anfitrión - Otro lugar' ? locationName?.trim() :
        undefined,
      guests: validGuests.map((g) => ({
        firstName: g.firstName!.trim(),
        lastName: g.lastName?.trim() ?? '',
      })),
    };

    try {
      await processSubmission(submissionPayload);

      // Airtable is up — auto-retry queued submissions in background
      drainQueue();
    } catch (airtableError) {
      console.error('Airtable failed, saving to queue:', airtableError);
      try {
        enqueue(submissionPayload);
        console.log('Submission queued successfully for later retry.');
      } catch (queueError) {
        console.error('Queue save also failed:', queueError);
        return NextResponse.json(
          { error: 'Error al enviar el formulario. Intentá de nuevo más tarde.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Despierta Canning registration error:', error);
    return NextResponse.json(
      { error: 'Error al enviar el formulario. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
