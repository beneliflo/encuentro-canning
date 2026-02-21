import { NextRequest, NextResponse } from 'next/server';
import {
  upsertPerson,
  createContactMessage,
} from '@/lib/airtable';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

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

    // 1. Upsert person (match by email → phone, update missing fields)
    const personId = await upsertPerson({
      firstName,
      lastName,
      email,
      phone,
    });

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
