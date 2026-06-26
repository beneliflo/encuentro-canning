import { NextResponse } from 'next/server'

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SHEET_GENZ_WEBHOOK_URL
const SPREADSHEET_ID = '1VBEHJUowb28kMaMeVHA8dEE2ttE8fq0GT7CH2XcHH-0'

export async function POST(request: Request) {
  try {
    const { nombreApellido, email, telefono, edad, iglesia } = await request.json()

    if (!nombreApellido || !email || !telefono || !edad || !iglesia) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      )
    }

    if (!GOOGLE_SCRIPT_URL) {
      console.error(
        `GOOGLE_SHEET_GENZ_WEBHOOK_URL is not configured for spreadsheet ${SPREADSHEET_ID}`
      )
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const [nombre, ...apellidoParts] = String(nombreApellido).trim().split(/\s+/)
    const apellido = apellidoParts.join(' ')

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        nombreApellido,
        email,
        telefono,
        edad,
        iglesia,
        nombre,
        apellido,
        spreadsheetId: SPREADSHEET_ID,
        source: 'genz',
        submittedAt: new Date().toISOString(),
      }),
      redirect: 'follow',
    })

    if (response.status >= 500) {
      const text = await response.text()
      throw new Error(`Google Script error: ${response.status} - ${text.slice(0, 200)}`)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Gen Z registration error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    )
  }
}
