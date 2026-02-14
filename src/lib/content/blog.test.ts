import { describe, expect, it } from "vitest";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";

describe("blog loader", () => {
  it("lee configuracion CTA desde frontmatter", () => {
    const post = getBlogPostBySlug("crm-para-pymes-peru");

    expect(post).not.toBeNull();
    expect(post?.ctaVariant).toBe("soft");
    expect(post?.ctaLanding).toBe("/crm-para-odontologos");
    expect(post?.ctaMessage).toContain("BusinessOS");
    expect(post?.ctaMessage).toContain("Leads Widget + Fast Page + ContApp");
  });

  it("usa CTA default cuando no hay configuracion", () => {
    const post = getBlogPostBySlug("sistema-leads-negocios-servicios");

    expect(post).not.toBeNull();
    expect(post?.ctaVariant).toBe("default");
  });

  it("no publica archivos plantilla del blog", () => {
    const templatePost = getBlogPostBySlug("_template-businessos");
    const allPosts = getAllBlogPosts();

    expect(templatePost).toBeNull();
    expect(allPosts.some((post) => post.slug.startsWith("_"))).toBe(false);
  });
});
