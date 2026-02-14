import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <SEO title="404 | Pagina no encontrada" description="La pagina que buscas no existe en BusinessOS." path={location.pathname} robots="noindex, follow" />

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <h1 className="mb-4 font-display text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Pagina no encontrada</p>
        <Link
          to="/"
          className="text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;