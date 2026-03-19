import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const DESPIERTA_GUESTS_TABLE =
  process.env.AIRTABLE_DESPIERTA_GUESTS_TABLE ?? 'Despierta Canning Guests';

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

async function updateRecord(
  table: string,
  recordId: string,
  fields: Record<string, unknown>
): Promise<AirtableRecord> {
  const url = `${BASE_URL}/${encodeURIComponent(table)}/${recordId}`;
  
  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Airtable update ${table} failed: ${res.status} – ${body}`
    );
  }
  
  const data = await res.json();
  return data as AirtableRecord;
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
    const { guests } = body as {
      guests?: Array<{
        id: string;
        firstName: string;
        lastName: string;
        prayerRequest: string;
        invited: string;
        confirmed: string;
      }>;
    };

    if (!Array.isArray(guests) || guests.length === 0) {
      return NextResponse.json(
        { error: 'Debés proporcionar al menos un invitado para actualizar.' },
        { status: 400 }
      );
    }

    // Update each guest record
    const updatePromises = guests.map(guest => {
      const fields: Record<string, unknown> = {
        Nombre: guest.firstName.trim(),
        Apellido: guest.lastName.trim(),
        'Motivo de oracion': guest.prayerRequest.trim(),
        '¿invitado?': guest.invited,
        '¿confirmado?': guest.confirmed,
      };
      
      return updateRecord(DESPIERTA_GUESTS_TABLE, guest.id, fields);
    });

    await Promise.all(updatePromises);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errDetail = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);
    console.error('Despierta Canning update guests error:', errDetail);
    return NextResponse.json(
      { error: 'Error al actualizar los invitados. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
