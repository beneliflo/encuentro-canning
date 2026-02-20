import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PEOPLE_TABLE = process.env.AIRTABLE_PEOPLE_TABLE ?? 'People';
const MESSAGES_TABLE = process.env.AIRTABLE_CONTACT_MESSAGES_TABLE ?? 'Contact Messages';

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

function escapeFormulaValue(value: string): string {
  // Airtable formula strings are single-quoted.
  // Escape backslashes first, then single quotes.
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

async function findPerson(
  email: string,
  phoneNormalized: string
): Promise<AirtableRecord | null> {
  // Search by email OR normalized phone
  const safeEmail = escapeFormulaValue(email);
  const safePhone = escapeFormulaValue(phoneNormalized);
  const formula = `OR({Email} = '${safeEmail}', {Phone normalized} = '${safePhone}')`;
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
  email: string,
  phone: string
): Promise<string> {
  const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(PEOPLE_TABLE)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        'First name': firstName,
        'Last name': lastName,
        Email: email,
        Phone: phone,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable People create failed: ${res.status} – ${body}`);
  }

  const data = await res.json();
  return data.id as string;
}

async function createContactMessage(fields: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  personId: string;
}): Promise<void> {
  const res = await fetch(`${AIRTABLE_URL}/${encodeURIComponent(MESSAGES_TABLE)}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        'First name': fields.firstName,
        'Last name': fields.lastName,
        Email: fields.email,
        Phone: fields.phone,
        Message: fields.message,
        Source: 'Website',
        'Linked Person': [fields.personId],
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Airtable Contact Messages create failed: ${res.status} – ${body}`
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    const phoneNormalized = normalizePhone(phone);

    // 1. Find or create person
    let personId: string;

    const existingPerson = await findPerson(email, phoneNormalized);

    if (existingPerson) {
      personId = existingPerson.id;
    } else {
      personId = await createPerson(firstName, lastName, email, phone);
    }

    // 2. Create contact message linked to person
    await createContactMessage({
      firstName,
      lastName,
      email,
      phone,
      message,
      personId,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Error al enviar el formulario. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
