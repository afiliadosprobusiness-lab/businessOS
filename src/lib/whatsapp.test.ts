import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("arma url con mensaje url-encoded", () => {
    const url = buildWhatsAppUrl("Hola BusinessOS");

    expect(url).toContain("https://wa.me/");
    expect(url).toContain("text=Hola%20BusinessOS");
  });
});