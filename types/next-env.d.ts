/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/navigation" />

declare module '@sentry/nextjs'
declare module 'socket.io-client'

declare module 'next/server' {
  export { NextRequest, NextResponse } from 'next/server'
} 