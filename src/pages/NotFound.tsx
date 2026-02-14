import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { to: "/blog", label: "Ir al blog" },
  { to: "/soluciones", label: "Ver soluciones" },
  { to: "/agendar-demo", label: "Agendar demo" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="404 | Pagina no encontrada"
        description="La pagina que buscas no existe en BusinessOS."
        path={location.pathname}
        robots="noindex, follow"
      />

      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

      <section className="relative mx-auto w-full max-w-3xl rounded-3xl border border-border bg-card/95 p-6 shadow-card backdrop-blur sm:p-10">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <Search className="h-3.5 w-3.5" />
          Error 404
        </p>

        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Esta pagina no existe
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          La ruta <span className="rounded bg-surface-subtle px-2 py-0.5 font-mono text-sm">{location.pathname}</span> no esta disponible.
          Puedes volver al inicio o entrar a una seccion activa del sitio.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="hero" className="rounded-full px-5">
            <Link to="/">
              <Home className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>

          <Button asChild variant="hero-outline" className="rounded-full px-5">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" />
              Ver blog
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-xl border border-border bg-surface-subtle px-4 py-3 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default NotFound;