declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: pagePath,
    page_title: pageTitle,
  });
};

export const trackEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }
};

export {};
