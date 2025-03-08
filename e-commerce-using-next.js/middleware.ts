import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const supportedLangs = ['en', 'ar']
  const defaultLang = 'en'

  // Skip middleware for specific paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/static/')
  ) {
    return NextResponse.next()
  }

  const preferredLang = request.headers.get('accept-language')?.split(',')[0] || defaultLang
  const lang = supportedLangs.includes(preferredLang) ? preferredLang : defaultLang

  if (!request.cookies.has('NEXT_LOCALE')) {
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', lang)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
