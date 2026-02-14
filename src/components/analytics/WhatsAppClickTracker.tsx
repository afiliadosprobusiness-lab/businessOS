import { useEffect } from "react";
import { buildWhatsAppClickPayload, type WhatsAppTrackingDataset } from "@/lib/whatsapp-tracking";

const getTrackingElement = (eventTarget: Element | null) => {
  if (!eventTarget) {
    return null;
  }

  return eventTarget.closest<HTMLElement>("[data-cta='whatsapp']") || eventTarget.closest<HTMLElement>("a[href]");
};

const readTrackingDataset = (trackingElement: HTMLElement, anchor: HTMLAnchorElement | null): WhatsAppTrackingDataset => {
  return {
    cta: trackingElement.dataset.cta || anchor?.dataset.cta,
    source: trackingElement.dataset.source || anchor?.dataset.source,
    variant: trackingElement.dataset.variant || anchor?.dataset.variant,
    landingKey: trackingElement.dataset.landingKey || anchor?.dataset.landingKey,
    blogSlug: trackingElement.dataset.blogSlug || anchor?.dataset.blogSlug,
  };
};

const WhatsAppClickTracker = () => {
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const clickedElement = event.target instanceof Element ? event.target : null;
      const trackingElement = getTrackingElement(clickedElement);
      if (!trackingElement) {
        return;
      }

      const anchor =
        clickedElement?.closest<HTMLAnchorElement>("a[href]") ||
        (trackingElement instanceof HTMLAnchorElement
          ? trackingElement
          : trackingElement.querySelector<HTMLAnchorElement>("a[href]"));
      const payload = buildWhatsAppClickPayload({
        href: anchor?.getAttribute("href"),
        pathname: window.location.pathname,
        pageTitle: document.title,
        dataset: readTrackingDataset(trackingElement, anchor),
      });

      if (!payload) {
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  return null;
};

export default WhatsAppClickTracker;
