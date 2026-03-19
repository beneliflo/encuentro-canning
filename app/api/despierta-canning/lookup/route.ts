import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const DESPIERTA_TABLE = process.env.AIRTABLE_DESPIERTA_TABLE ?? 'Despierta Canning';
const DESPIERTA_GUESTS_TABLE =
  process.env.AIRTABLE_DESPIERTA_GUESTS_TABLE ?? 'Despierta Canning Guests';

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

function getLast4Digits(phone: string): string {
  const normalized = normalizePhone(phone);
  return normalized.slice(-4);
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

async function searchRecords(
  table: string,
  formula: string,
  maxRecords = 100
): Promise<AirtableRecord[]> {
  const url =
    `${BASE_URL}/${encodeURIComponent(table)}` +
    `?filterByFormula=${encodeURIComponent(formula)}` +
    `&maxRecords=${maxRecords}`;

  const res = await fetch(url, { headers, method: 'GET' });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable search ${table} failed: ${res.status} – ${body}`);
  }
  const data = await res.json();
  return (data.records ?? []) as AirtableRecord[];
}

export async function GET(request: NextRequest) {
  try {
    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Error en la configuración del servidor.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone?.trim()) {
      return NextResponse.json(
        { error: 'El teléfono es requerido.' },
        { status: 400 }
      );
    }

    const last4 = getLast4Digits(phone);
    if (last4.length < 4) {
      return NextResponse.json(
        { error: 'El teléfono debe tener al menos 4 dígitos.' },
        { status: 400 }
      );
    }

    // Search for host registrations where phone ends with last 4 digits
    const formula = `RIGHT({Telefono Normalizado}, 4) = '${last4}'`;
    const hostRecords = await searchRecords(DESPIERTA_TABLE, formula, 10);

    if (hostRecords.length === 0) {
      return NextResponse.json(
        { 
          found: false,
          message: 'No se encontraron invitados registrados con este número de teléfono.'
        },
        { status: 200 }
      );
    }

    // Use the first matching host (most likely scenario)
    const hostRecord = hostRecords[0];
    const hostId = hostRecord.id;
    
    // Try to get name from Nombre/Apellido fields first (new records)
    let hostFirstName = hostRecord.fields['Nombre'] as string;
    let hostLastName = hostRecord.fields['Apellido'] as string;
    
    // If empty, parse from Anfitrion field (old records with full name)
    if (!hostFirstName && !hostLastName) {
      const fullName = (hostRecord.fields['Anfitrion'] as string) || '';
      const nameParts = fullName.trim().split(' ');
      if (nameParts.length > 0) {
        hostFirstName = nameParts[0];
        hostLastName = nameParts.slice(1).join(' ');
      }
    }

    // Get all guests for this host in a single batch request
    const guestIds = (hostRecord.fields['Invitados Despierta Canning'] as string[]) || [];
    
    let guestRecords: AirtableRecord[] = [];
    
    if (guestIds.length > 0) {
      // Build OR formula to fetch all guests in one request
      const orConditions = guestIds.map(id => `RECORD_ID() = '${id}'`).join(', ');
      const guestsFormula = `OR(${orConditions})`;
      guestRecords = await searchRecords(DESPIERTA_GUESTS_TABLE, guestsFormula, guestIds.length);
    }

    const guests = guestRecords.map(rec => ({
      id: rec.id,
      firstName: (rec.fields['Nombre'] as string) || '',
      lastName: (rec.fields['Apellido'] as string) || '',
      prayerRequest: (rec.fields['Motivo de oracion'] as string) || '',
      invited: (rec.fields['¿invitado?'] as string) || '',
      confirmed: (rec.fields['¿confirmado?'] as string) || '',
    }));

    return NextResponse.json(
      {
        found: true,
        host: {
          id: hostId,
          firstName: hostFirstName,
          lastName: hostLastName,
        },
        guests,
      },
      { status: 200 }
    );
  } catch (error) {
    const errDetail = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);
    console.error('Despierta Canning lookup error:', errDetail);
    return NextResponse.json(
      { error: 'Error al buscar los datos. Intentá de nuevo más tarde.' },
      { status: 500 }
    );
  }
}
