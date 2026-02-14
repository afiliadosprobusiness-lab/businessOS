import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");
const LANDINGS_DIR = path.join(ROOT_DIR, "content", "landings");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://businessos.pe").replace(/\/$/, "");

const getSlugsByExtension = async (directoryPath, extension) => {
  try {
    const files = await fs.readdir(directoryPath);
    return files
      .filter((fileName) => fileName.endsWith(extension))
      .map((fileName) => fileName.replace(extension, ""));
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
  const [blogSlugs, landingSlugs] = await Promise.all([
    getSlugsByExtension(BLOG_DIR, ".mdx"),
    getSlugsByExtension(LANDINGS_DIR, ".json"),
  ]);

  const staticPaths = ["/", "/es", "/en", "/agendar-demo", "/agenda-confirmada", "/blog"];
  const blogPaths = blogSlugs.map((slug) => `/blog/${slug}`);
  const landingPaths = landingSlugs.map((slug) => `/${slug}`);

  const allPaths = [...new Set([...staticPaths, ...blogPaths, ...landingPaths])];

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemap(allPaths), "utf-8");
  await fs.writeFile(path.join(PUBLIC_DIR, "robots.txt"), buildRobots(), "utf-8");

  console.log(`SEO files generated (${allPaths.length} paths).`);
};

await run();
