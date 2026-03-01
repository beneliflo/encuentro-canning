import { NextRequest, NextResponse } from 'next/server';
import { enqueue, readQueue, removeFromQueue, updateAttempt } from '@/lib/submission-queue';
import {
  upsertPerson,
  upsertDespiertaRegistration,
  upsertDespiertaGuest,
} from '@/lib/airtable';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

const VALID_ROLES = [
  'Anfitrión - Casa',
  'Anfitrión - Iglesia',
  'Anfitrión - Otro lugar',
  'Co-anfitrión',
];

export async function processSubmission(payload: {
  hostFirstName: string;
  hostLastName: string;
  hostPhone: string;
  role: string;
  locationName?: string;
  guests: { firstName: string; lastName: string; prayerRequest: string }[];
}): Promise<void> {
  const { hostFirstName, hostLastName, hostPhone, role, locationName, guests } = payload;

  // 1. Upsert host in People (match by phone, update missing fields)
  const hostPersonId = await upsertPerson({
    firstName: hostFirstName,
    lastName: hostLastName,
    phone: hostPhone,
  });

  // 2. Upsert Despierta Canning registration (one per host)
  const resolvedLocation =
    role === 'Anfitrión - Casa' ? 'Casa' :
    role === 'Anfitrión - Iglesia' ? 'Iglesia' :
    role === 'Anfitrión - Otro lugar' ? locationName :
    undefined;

  const hostFullName = `${hostFirstName} ${hostLastName}`.trim();
  const hostRegId = await upsertDespiertaRegistration(
    hostPersonId,
    hostFullName,
    role,
    resolvedLocation
  );

  // 3. Upsert each guest (no duplicates)
  for (const guest of guests) {
    // Guests have no phone/email — upsert by name, with invitedBy link
    const guestPersonId = await upsertPerson({
      firstName: guest.firstName,
      lastName: guest.lastName,
      invitedByDespierta: [hostPersonId],
    });

    const guestFullName = `${guest.firstName} ${guest.lastName}`.trim();
    await upsertDespiertaGuest(guestPersonId, guestFullName, hostRegId, guest.prayerRequest);
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
      guests?: { firstName?: string; lastName?: string; prayerRequest?: string }[];
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
      ? guests.filter((g) => g.firstName?.trim() || g.lastName?.trim())
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
        prayerRequest: g.prayerRequest?.trim() ?? '',
      })),
    };

    try {
      await processSubmission(submissionPayload);

      // Airtable is up — auto-retry queued submissions in background
      try { drainQueue(); } catch { /* ignore queue errors in read-only filesystems */ }
    } catch (airtableError) {
      const errMsg = airtableError instanceof Error ? airtableError.message : String(airtableError);
      console.error('Airtable processSubmission failed:', errMsg, JSON.stringify(submissionPayload));
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
    const errDetail = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);
    console.error('Despierta Canning registration error:', errDetail);
    return NextResponse.json(
      { error: 'Error al enviar el formulario. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
