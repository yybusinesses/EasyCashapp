import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

// Add paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/about',
  '/contact'
]

// Create rate limiter
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
})

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow public paths
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Apply rate limiting to API routes
  if (path.startsWith('/api/')) {
    try {
      await limiter.check(request, 60, 'CACHE_TOKEN') // 60 requests per minute
    } catch {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
  }

  // CORS headers
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || '*',
      },
    })
  }

  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    // Verify token and get user role
    const { role } = await verifyAuth(token)

    // Role-based access control
    if (path.startsWith('/client') && role !== 'client') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (path.startsWith('/freelancer') && role !== 'freelancer') {
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
    '/client/:path*',
    '/freelancer/:path*',
    '/api/protected/:path*'
  ]
} 