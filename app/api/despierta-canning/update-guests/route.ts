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

async function batchUpdateRecords(
  table: string,
  records: Array<{ id: string; fields: Record<string, unknown> }>
): Promise<AirtableRecord[]> {
  // Airtable allows max 10 records per batch
  const batches: Array<{ id: string; fields: Record<string, unknown> }[]> = [];
  for (let i = 0; i < records.length; i += 10) {
    batches.push(records.slice(i, i + 10));
  }

  const allUpdated: AirtableRecord[] = [];
  for (const batch of batches) {
    const url = `${BASE_URL}/${encodeURIComponent(table)}`;
    
    const res = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ records: batch }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Airtable batch update ${table} failed: ${res.status} – ${body}`
      );
    }
    
    const data = await res.json();
    const updated = (data as { records?: AirtableRecord[] }).records ?? [];
    allUpdated.push(...updated);
  }
  
  return allUpdated;
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

    // Prepare batch update records
    const recordsToUpdate = guests.map(guest => {
      const fields: Record<string, unknown> = {
        Nombre: guest.firstName.trim(),
        Apellido: guest.lastName.trim(),
      };
      
      // Only include optional fields if they have valid values
      if (guest.prayerRequest && guest.prayerRequest.trim()) {
        fields['Motivo de oracion'] = guest.prayerRequest.trim();
      }
      
      // Only update invited/confirmed if they have valid values (not empty or "Seleccionar")
      if (guest.invited && guest.invited !== '' && guest.invited !== 'Seleccionar') {
        fields['¿invitado?'] = guest.invited;
      }
      
      if (guest.confirmed && guest.confirmed !== '' && guest.confirmed !== 'Seleccionar') {
        fields['¿confirmado?'] = guest.confirmed;
      }
      
      return { id: guest.id, fields };
    });

    // Batch update all guests in optimized operation
    await batchUpdateRecords(DESPIERTA_GUESTS_TABLE, recordsToUpdate);

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
