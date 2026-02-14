import { describe, expect, it } from "vitest";
import { markdownToHtml } from "@/lib/markdown";

describe("markdownToHtml", () => {
  it("convierte encabezados y listas", () => {
    const markdown = "## Titulo\n\n- item uno\n- item dos";
    const html = markdownToHtml(markdown);

    expect(html).toContain("<h2>Titulo</h2>");
    expect(html).toContain("<ul><li>item uno</li><li>item dos</li></ul>");
  });

  it("escapa html inseguro", () => {
    const html = markdownToHtml("<script>alert(1)</script>");

    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("soporta enlaces internos relativos", () => {
    const html = markdownToHtml("[Ver soluciones](/soluciones)");

    expect(html).toContain('<a href="/soluciones">Ver soluciones</a>');
  });
});
