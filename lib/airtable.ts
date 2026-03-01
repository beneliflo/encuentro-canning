const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PEOPLE_TABLE = process.env.AIRTABLE_PEOPLE_TABLE ?? 'People';
const DESPIERTA_TABLE = process.env.AIRTABLE_DESPIERTA_TABLE ?? 'Despierta Canning';
const DESPIERTA_GUESTS_TABLE =
  process.env.AIRTABLE_DESPIERTA_GUESTS_TABLE ?? 'Despierta Canning Guests';
const CONTACT_MESSAGES_TABLE =
  process.env.AIRTABLE_CONTACT_MESSAGES_TABLE ?? 'Contact Messages';

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

const headers = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

export interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeFormulaValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

async function airtableFetch(
  table: string,
  method: string,
  path?: string,
  body?: unknown
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  const url = path
    ? `${BASE_URL}/${encodeURIComponent(table)}/${path}`
    : `${BASE_URL}/${encodeURIComponent(table)}`;

  const res = await fetch(url, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
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

async function createRecord(
  table: string,
  fields: Record<string, unknown>
): Promise<AirtableRecord> {
  const { ok, status, data } = await airtableFetch(table, 'POST', undefined, {
    fields,
  });
  if (!ok) {
    throw new Error(
      `Airtable create ${table} failed: ${status} – ${JSON.stringify(data)}`
    );
  }
  return data as unknown as AirtableRecord;
}

async function updateRecord(
  table: string,
  recordId: string,
  fields: Record<string, unknown>
): Promise<AirtableRecord> {
  const { ok, status, data } = await airtableFetch(
    table,
    'PATCH',
    recordId,
    { fields }
  );
  if (!ok) {
    throw new Error(
      `Airtable update ${table} failed: ${status} – ${JSON.stringify(data)}`
    );
  }
  return data as unknown as AirtableRecord;
}

// ---------------------------------------------------------------------------
// People — UPSERT
// Match priority: email → phone normalized
// If found → update missing fields. If not → create.
// ---------------------------------------------------------------------------

export async function upsertPerson(opts: {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  invitedByDespierta?: string[];
}): Promise<string> {
  const { firstName, lastName, phone, email, invitedByDespierta } = opts;

  // Build search formula: email first, then phone
  const clauses: string[] = [];
  if (email) {
    clauses.push(`{Email} = '${escapeFormulaValue(email)}'`);
  }
  if (phone) {
    const normalized = normalizePhone(phone);
    clauses.push(`{Phone normalized} = '${escapeFormulaValue(normalized)}'`);
    clauses.push(`{Telefono} = '${escapeFormulaValue(normalized)}'`);
  }

  let existing: AirtableRecord | null = null;
  if (clauses.length > 0) {
    const formula =
      clauses.length === 1 ? clauses[0] : `OR(${clauses.join(', ')})`;
    const results = await searchRecords(PEOPLE_TABLE, formula, 1);
    existing = results.length > 0 ? results[0] : null;
  }

  // Fallback: if email/phone didn't match, try by name
  if (!existing && firstName && lastName) {
    const safeFN = escapeFormulaValue(firstName);
    const safeLN = escapeFormulaValue(lastName);
    const nameFormula = `AND({Nombre} = '${safeFN}', {Apellido} = '${safeLN}')`;
    const nameResults = await searchRecords(PEOPLE_TABLE, nameFormula, 1);
    existing = nameResults.length > 0 ? nameResults[0] : null;
  }

  if (existing) {
    // Update missing fields only
    const updates: Record<string, unknown> = {};
    const f = existing.fields;

    if (!f['Nombre'] && firstName) updates['Nombre'] = firstName;
    if (!f['Apellido'] && lastName) updates['Apellido'] = lastName;
    if (!f['Email'] && email) updates['Email'] = email;
    if (!f['Telefono'] && phone) updates['Telefono'] = phone;
    // If phone changed (existing has a different phone), update it
    if (phone && f['Telefono'] && normalizePhone(String(f['Telefono'])) !== normalizePhone(phone)) {
      updates['Telefono'] = phone;
    }
    if (invitedByDespierta && invitedByDespierta.length > 0) {
      const current = (f['Invitado de Despierta Canning por'] as string[]) ?? [];
      const merged = [...new Set([...current, ...invitedByDespierta])];
      if (merged.length > current.length) {
        updates['Invitado de Despierta Canning por'] = merged;
      }
    }

    if (Object.keys(updates).length > 0) {
      await updateRecord(PEOPLE_TABLE, existing.id, updates);
    }
    return existing.id;
  }

  // Create new person
  const fields: Record<string, unknown> = {
    Nombre: firstName,
    Apellido: lastName,
  };
  if (phone) fields['Telefono'] = phone;
  if (email) fields['Email'] = email;
  if (invitedByDespierta && invitedByDespierta.length > 0) {
    fields['Invitado de Despierta Canning por'] = invitedByDespierta;
  }

  const rec = await createRecord(PEOPLE_TABLE, fields);
  return rec.id;
}

// ---------------------------------------------------------------------------
// Despierta Canning — UPSERT
// One registration per host. Search by Persona Anfitriona link.
// If exists → update. If not → create.
// ---------------------------------------------------------------------------

export async function upsertDespiertaRegistration(
  personId: string,
  personFullName: string,
  role: string,
  locationName?: string
): Promise<string> {
  // Search by Anfitrion formula field (contains the person's full name)
  // FIND on linked record fields doesn't work in Airtable formulas
  const safeName = escapeFormulaValue(personFullName);
  const formula = `{Anfitrion} = '${safeName}'`;
  const existing = await searchRecords(DESPIERTA_TABLE, formula, 1);

  const fields: Record<string, unknown> = {
    Rol: role,
  };
  if (locationName) fields['Lugar de Encuentro'] = locationName;

  if (existing.length > 0) {
    // Update existing registration
    await updateRecord(DESPIERTA_TABLE, existing[0].id, fields);
    return existing[0].id;
  }

  // Create new registration
  fields['Persona Anfitriona'] = [personId];
  fields['Fecha de Registro'] = new Date().toISOString();

  const rec = await createRecord(DESPIERTA_TABLE, fields);
  return rec.id;
}

// ---------------------------------------------------------------------------
// Despierta Canning Guests — UPSERT
// No duplicate guest rows for the same host registration.
// Match by Persona Invitada + Anfitrion link.
// ---------------------------------------------------------------------------

export async function upsertDespiertaGuest(
  guestPersonId: string,
  guestFullName: string,
  hostRegId: string,
  prayerRequest?: string
): Promise<void> {
  // Search by Nombre Completo (formula field) then filter client-side
  // because FIND doesn't work on linked record fields in Airtable
  const safeName = escapeFormulaValue(guestFullName);
  const formula = `{Nombre Completo} = '${safeName}'`;
  const candidates = await searchRecords(DESPIERTA_GUESTS_TABLE, formula, 100);

  // Check if any candidate is already linked to this host registration
  const alreadyLinked = candidates.some((rec) => {
    const anfitrion = rec.fields['Anfitrion'] as string[] | undefined;
    return anfitrion?.includes(hostRegId);
  });

  if (alreadyLinked) {
    return;
  }

  const guestFields: Record<string, unknown> = {
    'Persona Invitada': [guestPersonId],
    Anfitrion: [hostRegId],
  };
  if (prayerRequest) {
    guestFields['Motivo de oracion'] = prayerRequest;
  }
  await createRecord(DESPIERTA_GUESTS_TABLE, guestFields);
}

// ---------------------------------------------------------------------------
// Contact Messages — always create (messages are not upserted)
// ---------------------------------------------------------------------------

export async function createContactMessage(opts: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  personId: string;
}): Promise<void> {
  await createRecord(CONTACT_MESSAGES_TABLE, {
    Nombre: opts.firstName,
    Apellido: opts.lastName,
    'Correo electrónico': opts.email,
    Teléfono: opts.phone,
    Mensaje: opts.message,
    Canal: 'Website',
    'Persona vinculada': [opts.personId],
  });
}
