import { describe, expect, it } from "vitest";
import { parseMdxFrontmatter } from "@/lib/content/frontmatter";

describe("parseMdxFrontmatter", () => {
  it("extrae frontmatter y body", () => {
    const content = `---\ntitle: Post de prueba\ntags: crm, ventas\n---\n## Hola\nContenido`;
    const result = parseMdxFrontmatter(content);

    expect(result.frontmatter.title).toBe("Post de prueba");
    expect(result.frontmatter.tags).toBe("crm, ventas");
    expect(result.body).toContain("## Hola");
  });

  it("lanza error cuando falta frontmatter", () => {
    expect(() => parseMdxFrontmatter("Sin metadata")).toThrowError();
  });
});