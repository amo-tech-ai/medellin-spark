/**
 * Analytics tracking utilities
 * 
 * Implements event tracking for user journeys and conversions.
 * Currently logs to console - integrate with PostHog, Plausible, etc.
 */

interface AnalyticsProperties {
  [key: string]: string | number | boolean | undefined;
}

class Analytics {
  private enabled: boolean;

  constructor() {
    // Enable analytics in production, disable in dev for cleaner logs
    this.enabled = import.meta.env.PROD;
  }

  /**
   * Track page view
   */
  page(name: string, properties?: AnalyticsProperties): void {
    if (!this.enabled) return;

    const payload = {
      type: 'page',
      name,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        path: window.location.pathname,
      },
    };

    console.log('[Analytics] Page:', payload);
    
    // TODO: Send to analytics provider
    // Example: posthog.capture('$pageview', payload);
    // Example: plausible('pageview', { props: payload });
  }

  /**
   * Track user action/event
   */
  track(event: string, properties?: AnalyticsProperties): void {
    if (!this.enabled) return;

    const payload = {
      type: 'track',
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    };

    console.log('[Analytics] Event:', payload);

    // TODO: Send to analytics provider
    // Example: posthog.capture(event, payload);
    // Example: plausible(event, { props: payload });
  }

  /**
   * Identify user (after login)
   */
  identify(userId: string, traits?: AnalyticsProperties): void {
    if (!this.enabled) return;

    const payload = {
      type: 'identify',
      userId,
      traits: {
        ...traits,
        timestamp: new Date().toISOString(),
      },
    };

    console.log('[Analytics] Identify:', payload);

    // TODO: Send to analytics provider
    // Example: posthog.identify(userId, traits);
  }

  /**
   * Enable/disable analytics
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Enable in production
if (import.meta.env.PROD) {
  analytics.setEnabled(true);
}
