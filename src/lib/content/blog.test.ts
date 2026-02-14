import { describe, expect, it } from "vitest";
import { getBlogPostBySlug } from "@/lib/content";

describe("blog loader", () => {
  it("lee configuracion CTA desde frontmatter", () => {
    const post = getBlogPostBySlug("crm-para-pymes-peru");

    expect(post).not.toBeNull();
    expect(post?.ctaVariant).toBe("soft");
    expect(post?.ctaLanding).toBe("/crm-para-odontologos");
    expect(post?.ctaMessage).toContain("CRM para pyme");
  });

  it("usa CTA default cuando no hay configuracion", () => {
    const post = getBlogPostBySlug("sistema-leads-negocios-servicios");

    expect(post).not.toBeNull();
    expect(post?.ctaVariant).toBe("default");
  });
});