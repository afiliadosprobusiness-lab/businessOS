import { describe, expect, it } from "vitest";
import { getAllLandings, getProgrammaticLandings } from "@/lib/content";

describe("landing catalog loader", () => {
  it("genera 50 landings programaticas", () => {
    const generated = getProgrammaticLandings();

    expect(generated).toHaveLength(50);
    expect(generated.some((landing) => landing.slug === "crm-para-odontologos-en-lima")).toBe(true);
  });

  it("mantiene landings estaticas existentes", () => {
    const all = getAllLandings();

    expect(all.some((landing) => landing.slug === "crm-para-odontologos")).toBe(true);
  });

  it("posiciona BusinessOS como sistema completo en hero y faq", () => {
    const landing = getProgrammaticLandings().find((item) => item.slug === "crm-para-odontologos-en-lima");

    expect(landing).toBeTruthy();
    expect(landing?.hero.headline.toLowerCase().startsWith("sistema")).toBe(true);
    expect(landing?.hero.subheadline).toContain("Leads Widget");
    expect(landing?.faqs.some((faq) => faq.question.toLowerCase().includes("esto es un crm"))).toBe(true);
  });
});
