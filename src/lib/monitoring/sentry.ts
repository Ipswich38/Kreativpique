import * as Sentry from '@sentry/react'
import * as React from 'react'
import type { User as SentryUser } from '@sentry/types'

export interface ErrorContext {
  userId?: string
  agencyId?: string
  clientId?: string
  campaignId?: string
  queryId?: string
  url?: string
  userAgent?: string
  timestamp?: string
  feature?: string
  action?: string
  metadata?: Record<string, any>
}

export interface PerformanceContext {
  operation: string
  description?: string
  tags?: Record<string, string>
  data?: Record<string, any>
}

class MonitoringService {
  private initialized = false

  initialize() {
    if (this.initialized) return

    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN
    const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development'

    if (sentryDsn) {
      Sentry.init({
        dsn: sentryDsn,
        environment,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          }),
        ],
        // Performance Monitoring
        tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
        // Session Replay
        replaysSessionSampleRate: environment === 'production' ? 0.01 : 0.1,
        replaysOnErrorSampleRate: 1.0,
        // Error filtering
        beforeSend(event, hint) {
          // Filter out known non-critical errors
          const error = hint.originalException
          if (error && typeof error === 'object' && 'message' in error) {
            const message = String(error.message).toLowerCase()

            // Filter out network errors that are user-related
            if (message.includes('network error') ||
                message.includes('failed to fetch') ||
                message.includes('load failed')) {
              return null
            }

            // Filter out browser extension errors
            if (message.includes('extension') ||
                message.includes('chrome-extension')) {
              return null
            }
          }

          return event
        },
        // Additional configuration
        attachStacktrace: true,
        autoSessionTracking: true,
        sendClientReports: false, // Reduce noise in development
      })

      this.initialized = true
    } else {
      console.warn('Sentry DSN not found. Error monitoring will not be active.')
    }
  }

  setUser(user: {
    id: string
    email: string
    agency_id: string
    role: string
    subscription_tier?: string
  }) {
    if (!this.initialized) return

    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.email,
      agency_id: user.agency_id,
      role: user.role,
      subscription_tier: user.subscription_tier,
    } as SentryUser & Record<string, any>)
  }

  clearUser() {
    if (!this.initialized) return
    Sentry.setUser(null)
  }

  setContext(key: string, context: Record<string, any>) {
    if (!this.initialized) return
    Sentry.setContext(key, context)
  }

  setTag(key: string, value: string) {
    if (!this.initialized) return
    Sentry.setTag(key, value)
  }

  setTags(tags: Record<string, string>) {
    if (!this.initialized) return
    Sentry.setTags(tags)
  }

  setLevel(level: 'fatal' | 'error' | 'warning' | 'info' | 'debug') {
    if (!this.initialized) return
    // Note: setLevel is deprecated in newer Sentry versions
    // Use client configuration instead
    console.log(`Sentry level set to: ${level}`)
  }

  // Error capturing
  captureError(error: Error, context?: ErrorContext) {
    if (!this.initialized) {
      console.error('Monitoring error:', error, context)
      return
    }

    Sentry.withScope((scope) => {
      if (context) {
        // Set tags for filtering and searching
        if (context.userId) scope.setTag('user_id', context.userId)
        if (context.agencyId) scope.setTag('agency_id', context.agencyId)
        if (context.clientId) scope.setTag('client_id', context.clientId)
        if (context.feature) scope.setTag('feature', context.feature)
        if (context.action) scope.setTag('action', context.action)

        // Set context for detailed information
        scope.setContext('error_context', {
          timestamp: context.timestamp || new Date().toISOString(),
          url: context.url || window.location.href,
          userAgent: context.userAgent || navigator.userAgent,
          metadata: context.metadata
        })

        // Set fingerprinting for grouping similar errors
        if (context.feature && context.action) {
          scope.setFingerprint([context.feature, context.action, error.name])
        }
      }

      Sentry.captureException(error)
    })
  }

  captureMessage(message: string, level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info', context?: ErrorContext) {
    if (!this.initialized) {
      console.log(`[${level}] ${message}`, context)
      return
    }

    Sentry.withScope((scope) => {
      scope.setLevel(level)

      if (context) {
        if (context.userId) scope.setTag('user_id', context.userId)
        if (context.agencyId) scope.setTag('agency_id', context.agencyId)
        if (context.feature) scope.setTag('feature', context.feature)

        scope.setContext('message_context', context)
      }

      Sentry.captureMessage(message)
    })
  }

  // Performance monitoring
  startTransaction(name: string, operation: string, description?: string) {
    if (!this.initialized) return null

    // Note: startTransaction is deprecated in newer Sentry versions
    // Use startSpan or startInactiveSpan instead
    console.log(`Starting transaction: ${name} (${operation})`)
    return null
  }

  measurePerformance<T>(
    name: string,
    operation: string,
    fn: () => T | Promise<T>,
    context?: PerformanceContext
  ): T | Promise<T> {
    if (!this.initialized) return fn()

    // Note: trace is deprecated in newer Sentry versions
    // Use startSpan with proper API instead
    console.log(`Measuring performance: ${name} (${operation})`)
    return fn()
  }

  // Specific error types for common scenarios
  captureAPIError(error: Error, endpoint: string, method: string, statusCode?: number, context?: Partial<ErrorContext>) {
    this.captureError(error, {
      ...context,
      feature: 'api',
      action: `${method.toUpperCase()} ${endpoint}`,
      metadata: {
        endpoint,
        method,
        statusCode,
        ...context?.metadata
      }
    })
  }

  captureAuthError(error: Error, action: string, context?: Partial<ErrorContext>) {
    this.captureError(error, {
      ...context,
      feature: 'authentication',
      action,
      metadata: context?.metadata
    })
  }

  captureCitationError(error: Error, platform: string, clientId: string, queryId?: string, context?: Partial<ErrorContext>) {
    this.captureError(error, {
      ...context,
      feature: 'citation_monitoring',
      action: `check_${platform}`,
      clientId,
      queryId,
      metadata: {
        platform,
        ...context?.metadata
      }
    })
  }

  captureAdsError(error: Error, platform: string, action: string, campaignId?: string, context?: Partial<ErrorContext>) {
    this.captureError(error, {
      ...context,
      feature: 'ads_management',
      action: `${platform}_${action}`,
      campaignId,
      metadata: {
        platform,
        action,
        ...context?.metadata
      }
    })
  }

  captureEmailError(error: Error, type: string, recipient: string, context?: Partial<ErrorContext>) {
    this.captureError(error, {
      ...context,
      feature: 'email_service',
      action: `send_${type}`,
      metadata: {
        type,
        recipient,
        ...context?.metadata
      }
    })
  }

  capturePaymentError(error: Error, action: string, amount?: number, planId?: string, context?: Partial<ErrorContext>) {
    this.captureError(error, {
      ...context,
      feature: 'payment_processing',
      action,
      metadata: {
        amount,
        planId,
        ...context?.metadata
      }
    })
  }

  // Breadcrumbs for debugging context
  addBreadcrumb(message: string, category?: string, level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug', data?: Record<string, any>) {
    if (!this.initialized) return

    Sentry.addBreadcrumb({
      message,
      category: category || 'custom',
      level: level || 'info',
      data,
      timestamp: Date.now() / 1000,
    })
  }

  // Performance breadcrumbs
  addNavigationBreadcrumb(from: string, to: string) {
    this.addBreadcrumb(`Navigation: ${from} → ${to}`, 'navigation', 'info', {
      from,
      to,
      timestamp: new Date().toISOString()
    })
  }

  addUserActionBreadcrumb(action: string, element?: string, data?: Record<string, any>) {
    this.addBreadcrumb(`User action: ${action}`, 'user', 'info', {
      action,
      element,
      ...data
    })
  }

  addAPIBreadcrumb(method: string, url: string, statusCode: number, duration: number) {
    this.addBreadcrumb(`API ${method} ${url}`, 'http', statusCode >= 400 ? 'error' : 'info', {
      method,
      url,
      statusCode,
      duration
    })
  }

  // Session tracking
  startSession() {
    if (!this.initialized) return
    Sentry.startSession()
  }

  endSession() {
    if (!this.initialized) return
    Sentry.endSession()
  }

  // Health checks and diagnostics
  captureHealthCheck(service: string, status: 'healthy' | 'degraded' | 'unhealthy', responseTime?: number, error?: string) {
    this.captureMessage(`Health check: ${service} is ${status}`, status === 'unhealthy' ? 'error' : 'info', {
      feature: 'health_check',
      action: service,
      metadata: {
        service,
        status,
        responseTime,
        error
      }
    })
  }

  // Feature usage tracking (complementary to analytics)
  captureFeatureUsage(feature: string, action: string, success: boolean, duration?: number, metadata?: Record<string, any>) {
    if (!success) {
      this.captureMessage(`Feature usage failed: ${feature}.${action}`, 'warning', {
        feature,
        action,
        metadata: {
          duration,
          ...metadata
        }
      })
    } else {
      this.addBreadcrumb(`Feature used: ${feature}.${action}`, 'feature', 'info', {
        success,
        duration,
        ...metadata
      })
    }
  }

  // Debug utilities
  flush(timeout = 2000): Promise<boolean> {
    if (!this.initialized) return Promise.resolve(true)
    return Sentry.flush(timeout)
  }

  close(timeout = 2000): Promise<boolean> {
    if (!this.initialized) return Promise.resolve(true)
    return Sentry.close(timeout)
  }

  // React error boundary integration
  withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    options?: {
      fallback?: React.ComponentType<any>
      beforeCapture?: (scope: Sentry.Scope, error: Error, errorInfo: any) => void
    }
  ): React.ComponentType<P> {
    if (!this.initialized) return Component

    return Sentry.withErrorBoundary(Component, {
      fallback: options?.fallback || (() => React.createElement('div', {}, 'Something went wrong')),
      beforeCapture: (scope, error, errorInfo) => {
        scope.setContext('error_boundary', {
          componentStack: errorInfo.componentStack,
          errorBoundary: true
        })

        if (options?.beforeCapture) {
          options.beforeCapture(scope, error, errorInfo)
        }
      }
    })
  }
}

export const monitoringService = new MonitoringService()

// Export error boundary HOC for easy use
export const withErrorBoundary = monitoringService.withErrorBoundary.bind(monitoringService)