import { parseMdxFrontmatter } from "@/lib/content/frontmatter";
import type { BlogPost } from "@/lib/content/types";

const blogPostModules = import.meta.glob("../../../content/blog/*.mdx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const parseTags = (rawTags: string | undefined) =>
  (rawTags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const parseCtaVariant = (value?: string): "default" | "soft" | "none" => {
  if (value === "soft" || value === "none") {
    return value;
  }

  return "default";
};

const extractSlugFromPath = (filePath: string) => {
  const match = filePath.match(/\/([^/]+)\.mdx$/);
  return match?.[1] || "";
};

const isTemplateSlug = (slug: string) => slug.startsWith("_");

const blogPostsCache: BlogPost[] = Object.entries(blogPostModules)
  .map(([filePath, rawContent]) => {
    try {
      const { frontmatter, body } = parseMdxFrontmatter(rawContent);
      const slug = extractSlugFromPath(filePath);

      if (!slug || isTemplateSlug(slug)) {
        return null;
      }

      return {
        slug,
        title: frontmatter.title || "Post sin titulo",
        description: frontmatter.description || "",
        date: frontmatter.date || "1970-01-01",
        author: frontmatter.author || "Equipo BusinessOS",
        category: frontmatter.category || "General",
        tags: parseTags(frontmatter.tags),
        image: frontmatter.image,
        ctaVariant: parseCtaVariant(frontmatter.ctaVariant),
        ctaLanding: frontmatter.ctaLanding,
        ctaMessage: frontmatter.ctaMessage,
        body,
      };
    } catch (error) {
      console.error(`No se pudo cargar el post ${filePath}`, error);
      return null;
    }
  })
  .filter((post): post is BlogPost => Boolean(post))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getAllBlogPosts = () => blogPostsCache;

export const getBlogPostBySlug = (slug?: string) => {
  if (!slug) {
    return null;
  }

  return blogPostsCache.find((post) => post.slug === slug) || null;
};
