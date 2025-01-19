import * as Sentry from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'

export function initMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      integrations: [
        new Integrations.BrowserTracing(),
      ],
      beforeSend(event) {
        // Sanitize error data
        if (event.user) {
          delete event.user.ip_address
          delete event.user.email
        }
        return event
      },
    })
  }
}

export function logError(error: Error, context?: Record<string, any>) {
  console.error(error)
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, { extra: context })
  }
}

export function logEvent(name: string, data?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(name, {
      level: 'info',
      extra: data,
    })
  }
} 