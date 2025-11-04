import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { analyticsService } from '../lib/analytics/service'
import { monitoringService } from '../lib/monitoring/sentry'
import { useAuthContext } from './AuthContext'

interface AnalyticsContextType {
  track: typeof analyticsService.track
  trackCitationCheck: typeof analyticsService.trackCitationCheck
  trackCampaignAction: typeof analyticsService.trackCampaignAction
  trackUserAction: typeof analyticsService.trackUserAction
  trackFeatureUsage: typeof analyticsService.trackFeatureUsage
  trackPageView: typeof analyticsService.trackPageView
  trackButtonClick: typeof analyticsService.trackButtonClick
  trackFormSubmission: typeof analyticsService.trackFormSubmission
  trackError: typeof analyticsService.trackError
  trackPerformance: typeof analyticsService.trackPerformance
  isFeatureEnabled: typeof analyticsService.isFeatureEnabled
  captureError: typeof monitoringService.captureError
  captureMessage: typeof monitoringService.captureMessage
  measurePerformance: typeof monitoringService.measurePerformance
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const { user } = useAuthContext()

  useEffect(() => {
    // Initialize analytics and monitoring services
    analyticsService.initialize()
    monitoringService.initialize()

    // Track session start
    analyticsService.trackSessionStart()
    monitoringService.startSession()

    // Track page load performance
    const performanceEntries = performance.getEntriesByType('navigation')
    if (performanceEntries.length > 0) {
      const navigation = performanceEntries[0] as PerformanceNavigationTiming
      analyticsService.trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart)
    }

    // Set up error handling for unhandled errors
    const handleUnhandledError = (event: ErrorEvent) => {
      monitoringService.captureError(new Error(event.message), {
        url: event.filename,
        metadata: {
          lineno: event.lineno,
          colno: event.colno,
          type: 'unhandled_error'
        }
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      monitoringService.captureError(
        event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        {
          metadata: {
            type: 'unhandled_promise_rejection'
          }
        }
      )
    }

    window.addEventListener('error', handleUnhandledError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Track session end on page unload
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStartTime
      analyticsService.trackSessionEnd(sessionDuration)
      monitoringService.endSession()
      analyticsService.flush()
      monitoringService.flush(1000)
    }

    const sessionStartTime = Date.now()
    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleUnhandledError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (user) {
      // Identify user in analytics
      analyticsService.identify({
        id: user.id,
        email: user.email || '',
        agency_id: user.agency?.id || '',
        role: user.role || 'user',
        subscription_tier: user.agency?.subscription_tier || 'free'
      })

      // Set user in monitoring
      monitoringService.setUser({
        id: user.id,
        email: user.email || '',
        agency_id: user.agency?.id || '',
        role: user.role || 'user',
        subscription_tier: user.agency?.subscription_tier || 'free'
      })

      // Set group for agency-level analytics
      if (user.agency) {
        analyticsService.setGroup('agency', user.agency.id, {
          name: user.agency.name,
          subscription_tier: user.agency.subscription_tier,
          created_at: user.agency.created_at
        })
      }

      // Set tags for monitoring
      monitoringService.setTags({
        agency_id: user.agency?.id || '',
        user_role: user.role || 'user',
        subscription_tier: user.agency?.subscription_tier || 'free'
      })
    } else {
      // Reset analytics and monitoring when user logs out
      analyticsService.reset()
      monitoringService.clearUser()
    }
  }, [user])

  const contextValue: AnalyticsContextType = {
    track: analyticsService.track.bind(analyticsService),
    trackCitationCheck: analyticsService.trackCitationCheck.bind(analyticsService),
    trackCampaignAction: analyticsService.trackCampaignAction.bind(analyticsService),
    trackUserAction: analyticsService.trackUserAction.bind(analyticsService),
    trackFeatureUsage: analyticsService.trackFeatureUsage.bind(analyticsService),
    trackPageView: analyticsService.trackPageView.bind(analyticsService),
    trackButtonClick: analyticsService.trackButtonClick.bind(analyticsService),
    trackFormSubmission: analyticsService.trackFormSubmission.bind(analyticsService),
    trackError: analyticsService.trackError.bind(analyticsService),
    trackPerformance: analyticsService.trackPerformance.bind(analyticsService),
    isFeatureEnabled: analyticsService.isFeatureEnabled.bind(analyticsService),
    captureError: monitoringService.captureError.bind(monitoringService),
    captureMessage: monitoringService.captureMessage.bind(monitoringService),
    measurePerformance: monitoringService.measurePerformance.bind(monitoringService)
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

// Higher-order component for automatic error boundary and analytics tracking
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  const WrappedComponent = (props: P) => {
    const { trackPageView, captureError } = useAnalytics()

    useEffect(() => {
      // Track component mount
      if (componentName) {
        trackPageView(componentName)
      }
    }, [trackPageView])

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withAnalytics(${componentName || Component.displayName || Component.name})`

  // Wrap with error boundary
  return monitoringService.withErrorBoundary(WrappedComponent, {
    beforeCapture: (scope, error, errorInfo) => {
      scope.setContext('component', {
        name: componentName || Component.displayName || Component.name,
        props: Object.keys(props || {}),
        componentStack: errorInfo.componentStack
      })
    }
  })
}

// Hooks for specific tracking scenarios
export function usePageTracking(pageName: string, metadata?: Record<string, any>) {
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(pageName, metadata)
  }, [pageName, trackPageView, metadata])
}

export function useFeatureTracking() {
  const { trackFeatureUsage, trackButtonClick, trackFormSubmission } = useAnalytics()

  const trackFeature = (feature: string, metadata?: Record<string, any>) => {
    trackFeatureUsage(feature, window.location.pathname, metadata)
  }

  const trackButton = (buttonName: string, metadata?: Record<string, any>) => {
    trackButtonClick(buttonName, window.location.pathname, metadata)
  }

  const trackForm = (formName: string, success: boolean, metadata?: Record<string, any>) => {
    trackFormSubmission(formName, window.location.pathname, success, metadata)
  }

  return {
    trackFeature,
    trackButton,
    trackForm
  }
}

export function useErrorTracking() {
  const { captureError, captureMessage } = useAnalytics()

  const trackError = (error: Error, context?: Record<string, any>) => {
    captureError(error, {
      url: window.location.href,
      metadata: context
    })
  }

  const trackMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info', context?: Record<string, any>) => {
    captureMessage(message, level, {
      url: window.location.href,
      metadata: context
    })
  }

  return {
    trackError,
    trackMessage
  }
}

export function usePerformanceTracking() {
  const { trackPerformance, measurePerformance } = useAnalytics()

  const measureAsync = async <T,>(
    name: string,
    operation: string,
    fn: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> => {
    const startTime = performance.now()
    try {
      const result = await measurePerformance(name, operation, fn, {
        tags: { async: 'true' },
        data: context
      })
      const duration = performance.now() - startTime
      trackPerformance(`${operation}_duration`, duration, context)
      return result
    } catch (error) {
      const duration = performance.now() - startTime
      trackPerformance(`${operation}_duration_error`, duration, { ...context, error: true })
      throw error
    }
  }

  const measureSync = <T,>(
    name: string,
    operation: string,
    fn: () => T,
    context?: Record<string, any>
  ): T => {
    const startTime = performance.now()
    try {
      const result = measurePerformance(name, operation, fn, {
        tags: { async: 'false' },
        data: context
      })
      const duration = performance.now() - startTime
      trackPerformance(`${operation}_duration`, duration, context)
      return result
    } catch (error) {
      const duration = performance.now() - startTime
      trackPerformance(`${operation}_duration_error`, duration, { ...context, error: true })
      throw error
    }
  }

  return {
    measureAsync,
    measureSync,
    trackPerformance
  }
}