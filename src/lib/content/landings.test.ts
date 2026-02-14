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
});