import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");
const LANDINGS_DIR = path.join(ROOT_DIR, "content", "landings");
const LANDING_CATALOG_PATH = path.join(ROOT_DIR, "content", "seo", "landing-catalog.json");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://businessos.pe").replace(/\/$/, "");

const getSlugsByExtension = async (directoryPath, extension) => {
  try {
    const files = await fs.readdir(directoryPath);
    return files
      .filter((fileName) => fileName.endsWith(extension) && !fileName.startsWith("_"))
      .map((fileName) => fileName.replace(extension, ""));
  } catch {
    return [];
  }
};

const getCatalogLandingsSlugs = async () => {
  try {
    const catalogContent = await fs.readFile(LANDING_CATALOG_PATH, "utf-8");
    const catalog = JSON.parse(catalogContent);

    if (!Array.isArray(catalog?.niches) || !Array.isArray(catalog?.cities)) {
      return [];
    }

    const nicheSlugs = catalog.niches
      .map((niche) => niche?.slug)
      .filter((slug) => typeof slug === "string");

    const citySlugs = catalog.cities
      .map((city) => city?.slug)
      .filter((slug) => typeof slug === "string");

    const slugs = [];
    for (const nicheSlug of nicheSlugs) {
      for (const citySlug of citySlugs) {
        slugs.push(`crm-para-${nicheSlug}-en-${citySlug}`);
      }
    }

    return slugs;
  } catch {
    return [];
  }
};

const toAbsoluteUrl = (routePath) => `${SITE_URL}${routePath}`;

const buildSitemap = (paths) => {
  const today = new Date().toISOString();
  const urls = paths
    .map(
      (routePath) => `  <url>\n    <loc>${toAbsoluteUrl(routePath)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${routePath === "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const buildRobots = () => `User-agent: *\nAllow: /\n\nSitemap: ${toAbsoluteUrl("/sitemap.xml")}\n`;

const run = async () => {
  const [blogSlugs, landingSlugs, catalogLandingSlugs] = await Promise.all([
    getSlugsByExtension(BLOG_DIR, ".mdx"),
    getSlugsByExtension(LANDINGS_DIR, ".json"),
    getCatalogLandingsSlugs(),
  ]);

  const staticPaths = ["/", "/es", "/en", "/agendar-demo", "/agenda-confirmada", "/blog", "/soluciones"];
  const blogPaths = blogSlugs.map((slug) => `/blog/${slug}`);
  const manualLandingPaths = landingSlugs.map((slug) => `/${slug}`);
  const catalogLandingPaths = catalogLandingSlugs.map((slug) => `/${slug}`);
  const allPaths = [...new Set([...staticPaths, ...blogPaths, ...manualLandingPaths, ...catalogLandingPaths])];

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(allPaths), "utf-8");
  await fs.writeFile(path.join(PUBLIC_DIR, "robots.txt"), buildRobots(), "utf-8");

  console.log(`SEO files generated (${allPaths.length} paths).`);
};

await run();
