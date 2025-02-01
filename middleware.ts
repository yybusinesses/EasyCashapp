import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Add paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/about',
  '/contact'
]

const locales = ['en', 'de', 'es', 'fr']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return matchLocale(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }

  const path = request.nextUrl.pathname

  // Allow public paths
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Check authentication
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const user = await verifyAuth(token)
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Check if user has accepted cookies
  const cookieConsent = request.cookies.get('cookieConsent')
  if (!cookieConsent && !publicPaths.includes(path)) {
    // Only allow necessary cookies
    request.cookies.delete('analytics')
    request.cookies.delete('marketing')
  }

  // Add required headers for GDPR compliance
  const response = NextResponse.next()
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Ensure secure connection
  if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https')) {
    return NextResponse.redirect(`https://${request.url}`)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/client/:path*',
    '/freelancer/:path*',
    '/api/protected/:path*'
  ]
} 