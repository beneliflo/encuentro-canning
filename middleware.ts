import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  if (hostname === 'tcp.emubaescuela.com') {
    const url = request.nextUrl.clone()
    
    if (url.pathname === '/') {
      url.pathname = '/tcp'
      return NextResponse.rewrite(url)
    }
    
    if (!url.pathname.startsWith('/tcp')) {
      url.pathname = `/tcp${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
}
