import { NextResponse } from 'next/server'

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SHEET_TCP_WEBHOOK_URL

export async function POST(request: Request) {
  try {
    const { nombre, apellido, telefono, email } = await request.json()

    if (!nombre || !apellido || !telefono || !email) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }

    if (!GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SHEET_TCP_WEBHOOK_URL is not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ nombre, apellido, telefono, email }),
      redirect: 'follow',
    })

    // Google Apps Script redirects after POST; as long as we don't get a 4xx/5xx
    // from the initial request, the data has been written to the sheet
    if (response.status >= 500) {
      const text = await response.text()
      throw new Error(`Google Script error: ${response.status} - ${text.slice(0, 200)}`)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('TCP registration error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    )
  }
}
