import { NextRequest, NextResponse } from 'next/server';

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
  'Host - Home',
  'Host - Church',
  'Host - Other place',
  'Co-host',
];

async function findPersonByPhone(phoneNormalized: string): Promise<AirtableRecord | null> {
  const safePhone = escapeFormulaValue(phoneNormalized);
  const formula = `OR({Phone normalized} = '${safePhone}', {Phone} = '${safePhone}')`;
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
    'First name': firstName,
    'Last name': lastName,
  };
  if (phone) fields['Phone'] = phone;
  if (invitedBy && invitedBy.length > 0) {
    fields['Invited by (Despierta Canning)'] = invitedBy;
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
    'Linked Person': [personId],
    Role: role,
  };
  if (locationName) fields['Location name'] = locationName;
  fields['Event date'] = new Date().toISOString();

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
  firstName: string,
  lastName: string,
  guestPersonId: string,
  hostRegId: string
): Promise<void> {
  const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(DESPIERTA_GUESTS_TABLE)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        'First name': firstName,
        'Last name': lastName,
        'Guest Person': [guestPersonId],
        'Host registration': [hostRegId],
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable Despierta Canning Guests create failed: ${res.status} – ${body}`);
  }
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

    const isCohost = role === 'Co-host';
    const validGuests = Array.isArray(guests)
      ? guests.filter((g) => g.firstName?.trim())
      : [];

    if (!isCohost && validGuests.length === 0) {
      return NextResponse.json(
        { error: 'Debés agregar al menos un invitado.' },
        { status: 400 }
      );
    }

    // 1. Normalize phone
    const phoneNormalized = normalizePhone(hostPhone);

    // 2. Find or create host in People
    let hostPersonId: string;
    const existingPerson = await findPersonByPhone(phoneNormalized);

    if (existingPerson) {
      hostPersonId = existingPerson.id;
    } else {
      hostPersonId = await createPerson(hostFirstName.trim(), hostLastName.trim(), hostPhone.trim());
    }

    // 3. Create Despierta Canning registration
    const hostRegId = await createDespiertaRegistration(
      hostPersonId,
      role,
      role === 'Host - Other place' ? locationName?.trim() : undefined
    );

    // 4. Process each guest
    for (const guest of validGuests) {
      const guestFirstName = guest.firstName!.trim();
      const guestLastName = guest.lastName?.trim() ?? '';

      // Create guest person in People with "Invited by" link
      const guestPersonId = await createPerson(
        guestFirstName,
        guestLastName,
        undefined,
        [hostPersonId]
      );

      // Create Despierta Canning Guests record
      await createDespiertaGuest(guestFirstName, guestLastName, guestPersonId, hostRegId);
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
