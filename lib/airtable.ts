const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PEOPLE_TABLE = process.env.AIRTABLE_PEOPLE_TABLE ?? 'People';
const DESPIERTA_TABLE = process.env.AIRTABLE_DESPIERTA_TABLE ?? 'Despierta Canning';
const DESPIERTA_GUESTS_TABLE =
  process.env.AIRTABLE_DESPIERTA_GUESTS_TABLE ?? 'Despierta Canning Guests';
const CONTACT_MESSAGES_TABLE =
  process.env.AIRTABLE_CONTACT_MESSAGES_TABLE ?? 'Mensaje de Contacto WEB';

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

export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
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

async function batchCreateRecords(
  table: string,
  records: Array<{ fields: Record<string, unknown> }>
): Promise<AirtableRecord[]> {
  // Airtable allows max 10 records per batch
  const batches: Array<{ fields: Record<string, unknown> }[]> = [];
  for (let i = 0; i < records.length; i += 10) {
    batches.push(records.slice(i, i + 10));
  }

  const allCreated: AirtableRecord[] = [];
  for (const batch of batches) {
    const { ok, status, data } = await airtableFetch(table, 'POST', undefined, {
      records: batch,
    });
    if (!ok) {
      throw new Error(
        `Airtable batch create ${table} failed: ${status} – ${JSON.stringify(data)}`
      );
    }
    const created = (data as { records?: AirtableRecord[] }).records ?? [];
    allCreated.push(...created);
  }
  return allCreated;
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

  // Single search: prioritize email, fallback to phone
  let formula = '';
  if (email) {
    formula = `{Email} = '${escapeFormulaValue(email)}'`;
  } else if (phone) {
    const normalized = normalizePhone(phone);
    formula = `{Phone normalized} = '${escapeFormulaValue(normalized)}'`;
  }

  let existing: AirtableRecord | null = null;
  if (formula) {
    const results = await searchRecords(PEOPLE_TABLE, formula, 1);
    existing = results.length > 0 ? results[0] : null;
  }

  if (existing) {
    // Update missing fields only
    const updates: Record<string, unknown> = {};
    const f = existing.fields;

    if (!f['Nombre'] && firstName) updates['Nombre'] = firstName;
    if (!f['Apellido'] && lastName) updates['Apellido'] = lastName;
    if (!f['Email'] && email) updates['Email'] = email;
    if (!f['Telefono'] && phone) updates['Telefono'] = phone;
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
// One registration per host. Search by phone + name.
// If exists → update. If not → create.
// ---------------------------------------------------------------------------

export async function upsertDespiertaRegistration(
  firstName: string,
  lastName: string,
  phone: string,
  role: string,
  locationName?: string
): Promise<string> {
  // Search by last 4 digits of phone to avoid duplicates from different prefixes (011 vs 11)
  const normalized = normalizePhone(phone);
  const last4 = normalized.slice(-4);
  const formula = `RIGHT({Telefono Normalizado}, 4) = '${last4}'`;
  const existing = await searchRecords(DESPIERTA_TABLE, formula, 10);

  // Normalize input name for comparison
  const normalizedInputName = normalizeName(`${firstName} ${lastName}`);

  // Check if any existing record has the same normalized name
  const matchingRecord = existing.find(rec => {
    const existingFirstName = (rec.fields['Nombre'] as string) || '';
    const existingLastName = (rec.fields['Apellido'] as string) || '';
    const existingFullName = (rec.fields['Anfitrion'] as string) || '';
    
    // Try both Nombre/Apellido and Anfitrion field
    const normalizedExisting1 = normalizeName(`${existingFirstName} ${existingLastName}`);
    const normalizedExisting2 = normalizeName(existingFullName);
    
    return normalizedExisting1 === normalizedInputName || 
           normalizedExisting2 === normalizedInputName;
  });

  const fields: Record<string, unknown> = {
    Nombre: firstName,
    Apellido: lastName,
    Telefono: phone,
    Rol: role,
  };
  if (locationName) fields['Lugar de Encuentro'] = locationName;

  if (matchingRecord) {
    // Update existing registration with matching name
    await updateRecord(DESPIERTA_TABLE, matchingRecord.id, fields);
    return matchingRecord.id;
  }

  // If phone exists but name doesn't match, still update the first one
  // (same person, just fixing typo in name)
  if (existing.length > 0) {
    await updateRecord(DESPIERTA_TABLE, existing[0].id, fields);
    return existing[0].id;
  }

  // Create new registration
  fields['Fecha de Registro'] = new Date().toISOString();

  const rec = await createRecord(DESPIERTA_TABLE, fields);
  return rec.id;
}

// ---------------------------------------------------------------------------
// Despierta Canning Guests — UPSERT
// No duplicate guest rows for the same host registration.
// Match by name + Anfitrion link.
// ---------------------------------------------------------------------------

export async function upsertDespiertaGuest(
  firstName: string,
  lastName: string,
  hostRegId: string,
  prayerRequest?: string,
  invited?: string,
  confirmed?: string
): Promise<void> {
  // Normalize name for comparison to avoid duplicates from typos/accents
  const normalizedInput = normalizeName(`${firstName} ${lastName}`);
  
  // Get all guests for this host to check for duplicates
  const hostGuestsFormula = `FIND('${hostRegId}', ARRAYJOIN({Anfitrion}, ','))`;
  const candidates = await searchRecords(DESPIERTA_GUESTS_TABLE, hostGuestsFormula, 100);

  // Check if any candidate has the same normalized name
  const existingRec = candidates.find((rec) => {
    const recFirstName = (rec.fields['Nombre'] as string) || '';
    const recLastName = (rec.fields['Apellido'] as string) || '';
    const normalizedExisting = normalizeName(`${recFirstName} ${recLastName}`);
    return normalizedExisting === normalizedInput;
  });

  const guestFields: Record<string, unknown> = {
    Nombre: firstName,
    Apellido: lastName,
    Anfitrion: [hostRegId],
  };
  if (prayerRequest !== undefined) {
    guestFields['Motivo de oracion'] = prayerRequest || '';
  }
  if (invited !== undefined) {
    guestFields['¿invitado?'] = invited || '';
  }
  if (confirmed !== undefined) {
    guestFields['¿confirmado?'] = confirmed || '';
  }

  if (existingRec) {
    await updateRecord(DESPIERTA_GUESTS_TABLE, existingRec.id, guestFields);
  } else {
    await createRecord(DESPIERTA_GUESTS_TABLE, guestFields);
  }
}

// ---------------------------------------------------------------------------
// Despierta Canning Guests — BATCH UPSERT (optimized)
// Process multiple guests in a single batch operation
// ---------------------------------------------------------------------------

export async function batchUpsertDespiertaGuests(
  guests: Array<{
    firstName: string;
    lastName: string;
    prayerRequest?: string;
    invited?: string;
    confirmed?: string;
  }>,
  hostRegId: string
): Promise<void> {
  if (guests.length === 0) return;

  // Get all existing guests for this host
  const hostGuestsFormula = `FIND('${hostRegId}', ARRAYJOIN({Anfitrion}, ','))`;
  const existingForHost = await searchRecords(DESPIERTA_GUESTS_TABLE, hostGuestsFormula, 100);

  // Create a map of existing guests by normalized name for quick lookup
  const existingMap = new Map<string, AirtableRecord>();
  existingForHost.forEach(rec => {
    const recFirstName = (rec.fields['Nombre'] as string) || '';
    const recLastName = (rec.fields['Apellido'] as string) || '';
    const normalizedName = normalizeName(`${recFirstName} ${recLastName}`);
    if (normalizedName) {
      existingMap.set(normalizedName, rec);
    }
  });

  // Separate guests into updates and creates
  const toUpdate: Array<{ id: string; fields: Record<string, unknown> }> = [];
  const toCreate: Array<{ fields: Record<string, unknown> }> = [];

  guests.forEach(guest => {
    const normalizedInput = normalizeName(`${guest.firstName} ${guest.lastName}`);
    const guestFields: Record<string, unknown> = {
      Nombre: guest.firstName,
      Apellido: guest.lastName,
      Anfitrion: [hostRegId],
    };
    if (guest.prayerRequest !== undefined) {
      guestFields['Motivo de oracion'] = guest.prayerRequest || '';
    }
    if (guest.invited !== undefined) {
      guestFields['¿invitado?'] = guest.invited || '';
    }
    if (guest.confirmed !== undefined) {
      guestFields['¿confirmado?'] = guest.confirmed || '';
    }

    const existing = existingMap.get(normalizedInput);
    if (existing) {
      toUpdate.push({ id: existing.id, fields: guestFields });
    } else {
      toCreate.push({ fields: guestFields });
    }
  });

  // Execute batch operations
  if (toCreate.length > 0) {
    await batchCreateRecords(DESPIERTA_GUESTS_TABLE, toCreate);
  }

  // Updates must be done individually (Airtable doesn't support batch PATCH)
  for (const { id, fields } of toUpdate) {
    await updateRecord(DESPIERTA_GUESTS_TABLE, id, fields);
  }
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
