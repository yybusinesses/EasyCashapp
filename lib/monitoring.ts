import * as Sentry from '@sentry/nextjs'

export function initMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    })
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  })
}

export function setUserContext(user: { id: string; email: string }) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
  })
} 