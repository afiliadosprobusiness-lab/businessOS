import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import MarkdownContent from "@/components/MarkdownContent";
import NotFound from "@/pages/NotFound";
import { getBlogPostBySlug } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/site";

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const path = `/blog/${post.slug}`;
  const postUrl = buildAbsoluteUrl(path);

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

        <MarkdownContent content={post.body} className="mt-8" />
      </article>
    </main>
  );
};

export default BlogPostPage;