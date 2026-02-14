import { describe, expect, it } from "vitest";
import { buildWhatsAppClickPayload } from "@/lib/whatsapp-tracking";

describe("buildWhatsAppClickPayload", () => {
  it("builds payload for landing hero CTA with explicit data attributes", () => {
    const payload = buildWhatsAppClickPayload({
      href: "https://wa.me/51924464410?text=Hola%20BusinessOS%20para%20abogados%20en%20arequipa",
      pathname: "/crm-para-abogados-en-arequipa",
      pageTitle: "CRM para abogados en Arequipa",
      dataset: {
        cta: "whatsapp",
        source: "landing",
        variant: "hero",
        landingKey: "abogados_arequipa",
      },
    });

    expect(payload).toEqual({
      event: "cta_whatsapp_click",
      page_path: "/crm-para-abogados-en-arequipa",
      page_title: "CRM para abogados en Arequipa",
      source: "landing",
      variant: "hero",
      landing_key: "abogados_arequipa",
      whatsapp_number: "51924464410",
      whatsapp_message: "Hola BusinessOS para abogados en arequipa",
    });
  });

  it("infers blog slug from path when it is not provided in dataset", () => {
    const payload = buildWhatsAppClickPayload({
      href: "https://api.whatsapp.com/send?phone=51924464410&text=Hola%20BusinessOS",
      pathname: "/blog/automatizar-ventas-en-lima",
      pageTitle: "Automatizar ventas",
      dataset: {
        cta: "whatsapp",
        source: "blog",
        variant: "blog_end",
      },
    });

    expect(payload?.blog_slug).toBe("automatizar-ventas-en-lima");
    expect(payload?.source).toBe("blog");
    expect(payload?.variant).toBe("blog_end");
  });

  it("skips whatsapp_message when text looks sensitive", () => {
    const payload = buildWhatsAppClickPayload({
      href: "https://wa.me/51924464410?text=Mi%20email%20es%20ken%40mail.com%20y%20mi%20cel%20987654321",
      pathname: "/crm-para-abogados",
      pageTitle: "Landing",
      dataset: { cta: "whatsapp" },
    });

    expect(payload?.whatsapp_message).toBeUndefined();
    expect(payload?.whatsapp_number).toBe("51924464410");
  });

  it("returns null for non-whatsapp links without explicit whatsapp marker", () => {
    const payload = buildWhatsAppClickPayload({
      href: "https://businessos.pe/blog",
      pathname: "/blog",
      pageTitle: "Blog",
      dataset: { source: "blog", variant: "blog_inline" },
    });

    expect(payload).toBeNull();
  });
});
