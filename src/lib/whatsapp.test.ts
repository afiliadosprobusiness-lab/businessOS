import { describe, expect, it } from "vitest";
import { buildBusinessOSMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("arma url con mensaje url-encoded", () => {
    const url = buildWhatsAppUrl("Hola BusinessOS");

    expect(url).toContain("https://wa.me/");
    expect(url).toContain("text=Hola%20BusinessOS");
  });

  it("crea mensaje estandar con nicho y ciudad", () => {
    const message = buildBusinessOSMessage("Odontologos", "Lima");

    expect(message).toBe("Hola, quiero implementar BusinessOS para odontologos en lima");
  });
});
