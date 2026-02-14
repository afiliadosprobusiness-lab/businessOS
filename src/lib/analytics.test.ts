import { beforeEach, describe, expect, it, vi } from "vitest";
import { trackEvent, trackPageView } from "@/lib/analytics";

describe("analytics", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.gtag = undefined;
  });

  it("pushes page_view payload to dataLayer", () => {
    trackPageView("/blog/mi-post", "Mi Post");

    expect(window.dataLayer).toEqual([
      {
        event: "page_view",
        page_path: "/blog/mi-post",
        page_title: "Mi Post",
      },
    ]);
  });

  it("sends custom events to gtag and dataLayer when available", () => {
    const gtagSpy = vi.fn();
    window.gtag = gtagSpy;
    window.dataLayer = [];

    trackEvent("cta_whatsapp_click", { page: "/blog", variant: "blog_end" });

    expect(gtagSpy).toHaveBeenCalledWith("event", "cta_whatsapp_click", {
      page: "/blog",
      variant: "blog_end",
    });
    expect(window.dataLayer).toEqual([
      {
        event: "cta_whatsapp_click",
        page: "/blog",
        variant: "blog_end",
      },
    ]);
  });
});
