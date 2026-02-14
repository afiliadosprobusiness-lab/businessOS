import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import MarkdownContent from "@/components/MarkdownContent";
import BlogCTA from "@/components/blog/BlogCTA";
import NotFound from "@/pages/NotFound";
import { getBlogPostBySlug } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { buildBusinessOSMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const splitContentForInlineCta = (content: string) => {
  const headingIndexes: number[] = [];

  if (content.startsWith("## ")) {
    headingIndexes.push(0);
  }

  for (const match of content.matchAll(/\n##\s+/g)) {
    headingIndexes.push(match.index + 1);
  }

  if (headingIndexes.length < 2) {
    return {
      before: content,
      after: "",
    };
  }

  const splitIndex = headingIndexes[1];

  return {
    before: content.slice(0, splitIndex).trim(),
    after: content.slice(splitIndex).trim(),
  };
};

const resolveBlogNicheCity = (ctaLanding: string | undefined, fallbackCategory: string) => {
  if (!ctaLanding) {
    return { niche: fallbackCategory || "negocio", city: "peru" };
  }

  const normalizedPath = ctaLanding.replace(/^\//, "");
  const matchProgrammatic = normalizedPath.match(/^crm-para-(.+)-en-(.+)$/);
  if (matchProgrammatic) {
    return {
      niche: matchProgrammatic[1].replaceAll("-", " "),
      city: matchProgrammatic[2].replaceAll("-", " "),
    };
  }

  const matchStatic = normalizedPath.match(/^crm-para-(.+)$/);
  if (matchStatic) {
    return {
      niche: matchStatic[1].replaceAll("-", " "),
      city: "peru",
    };
  }

  return { niche: fallbackCategory || "negocio", city: "peru" };
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const path = `/blog/${post.slug}`;
  const postUrl = buildAbsoluteUrl(path);
  const targeting = resolveBlogNicheCity(post.ctaLanding, post.category);
  const whatsappUrl = buildWhatsAppUrl(buildBusinessOSMessage(targeting.niche, targeting.city));
  const showInlineCta = post.ctaVariant === "soft";
  const splitContent = splitContentForInlineCta(post.body);

  const handleWhatsAppClick = (variant: "blog_end" | "blog_inline") => {
    trackEvent("cta_whatsapp_click", {
      page: path,
      variant,
      source: "blog",
      slug: post.slug,
    });
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <SEO
        title={post.title}
        description={post.description}
        path={path}
        image={post.image}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            "@type": "Person",
            name: post.author,
          },
          mainEntityOfPage: postUrl,
          image: post.image ? buildAbsoluteUrl(post.image) : undefined,
        }}
      />

      <article className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-4 py-2 text-sm font-semibold text-text-secondary transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary sm:text-sm">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">/</span>
          <span>{post.author}</span>
        </div>

        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-text-secondary">{post.description}</p>

        {showInlineCta ? (
          <>
            <MarkdownContent content={splitContent.before} className="mt-8" />
            <div className="my-8">
              <BlogCTA
                slug={post.slug}
                mode="blog_inline"
                visualVariant="soft"
                whatsappUrl={whatsappUrl}
                recommendedLanding={post.ctaLanding}
                onWhatsAppClick={handleWhatsAppClick}
              />
            </div>
            {splitContent.after ? <MarkdownContent content={splitContent.after} className="mt-8" /> : null}
          </>
        ) : (
          <MarkdownContent content={post.body} className="mt-8" />
        )}

        <div className="mt-10">
          <BlogCTA
            slug={post.slug}
            mode="blog_end"
            visualVariant={post.ctaVariant === "soft" ? "soft" : "default"}
            whatsappUrl={whatsappUrl}
            recommendedLanding={post.ctaLanding}
            onWhatsAppClick={handleWhatsAppClick}
          />
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
