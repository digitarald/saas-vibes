import { ApplicationInsights } from '@microsoft/applicationinsights-web'

let appInsights: ApplicationInsights | null = null

export function initApplicationInsights() {
  if (typeof window !== 'undefined' && !appInsights) {
    const connectionString = process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING

    if (connectionString) {
      appInsights = new ApplicationInsights({
        config: {
          connectionString,
          enableAutoRouteTracking: true,
          enableRequestHeaderTracking: true,
          enableResponseHeaderTracking: true,
        },
      })

      appInsights.loadAppInsights()
      appInsights.trackPageView()
    }
  }

  return appInsights
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (appInsights) {
    appInsights.trackEvent({ name, properties })
  }
}

export function trackException(error: Error, properties?: Record<string, unknown>) {
  if (appInsights) {
    appInsights.trackException({ exception: error, properties })
  }
}
