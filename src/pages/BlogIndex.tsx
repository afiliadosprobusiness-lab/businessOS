import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { getAllBlogPosts } from "@/lib/content";
import { BLOG_INDEX_ROUTE } from "@/lib/routes";
import { buildAbsoluteUrl } from "@/lib/site";

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const BlogIndex = () => {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <SEO
        title="Blog de BusinessOS | Estrategias de CRM, leads y automatizacion"
        description="Guia practica para mejorar conversion comercial con CRM, automatizacion y sistemas de leads."
        path={BLOG_INDEX_ROUTE}
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog de BusinessOS",
          description: "Contenido educativo sobre CRM, automatizacion y conversion comercial.",
          url: buildAbsoluteUrl(BLOG_INDEX_ROUTE),
        }}
      />

      <div className="mx-auto w-full max-w-5xl">
        <header className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent sm:text-sm">Contenido SEO</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">Blog BusinessOS</h1>
          <p className="mt-3 max-w-3xl text-base text-text-secondary sm:text-lg">
            Articulos practicos para ordenar ventas, captar mejores leads y escalar procesos comerciales.
          </p>
          <Button asChild variant="hero-outline" className="mt-5 rounded-full">
            <Link to="/soluciones">Ver soluciones por rubro</Link>
          </Button>
        </header>

        {posts.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground">Aun no hay publicaciones</h2>
            <p className="mt-2 text-text-secondary">Agrega archivos en `content/blog/*.mdx` para publicar nuevos articulos.</p>
          </section>
        ) : (
          <section className="mt-8 grid gap-4">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-border bg-card p-5 shadow-card transition-transform duration-200 hover:-translate-y-0.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary sm:text-sm">
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden="true">/</span>
                  <span>{post.category}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-text-secondary">{post.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={`${post.slug}-${tag}`} className="rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default BlogIndex;
