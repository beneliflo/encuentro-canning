import { NextResponse } from 'next/server'

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SHEET_GENZ_WEBHOOK_URL
const SPREADSHEET_ID = '1_QRDprrHTucjoH_eBaDj6YcpoCy31-phbHGihIpZakU'
const ALLOWED_ORIGINS = new Set([
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://www.encuentrocanning.org',
  'https://encuentrocanning.org',
  'https://genz.emubaescuela.com',
  'https://emubaescuela.com',
  'https://www.emubaescuela.com',
])

function getCorsHeaders(request: Request) {
  const origin = request.headers.get('origin')
  const allowedOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : ''

  return {
    ...(allowedOrigin ? { 'Access-Control-Allow-Origin': allowedOrigin } : {}),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  })
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request)

  try {
    const { nombreApellido, email, telefono, edad, iglesia } = await request.json()

    if (!nombreApellido || !email || !telefono || !edad || !iglesia) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400, headers: corsHeaders }
      )
    }

    if (!GOOGLE_SCRIPT_URL) {
      console.error(
        `GOOGLE_SHEET_GENZ_WEBHOOK_URL is not configured for spreadsheet ${SPREADSHEET_ID}`
      )
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500, headers: corsHeaders }
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

    return NextResponse.json({ status: 'ok' }, { headers: corsHeaders })
  } catch (error) {
    console.error('Gen Z registration error:', error)
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500, headers: corsHeaders }
    )
  }
}
