import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SOLUTIONS_ROUTE } from "@/lib/routes";

interface BlogCTAProps {
  slug: string;
  mode: "blog_end" | "blog_inline";
  visualVariant?: "default" | "soft";
  whatsappUrl: string;
  recommendedLanding?: string;
  onWhatsAppClick: (mode: "blog_end" | "blog_inline") => void;
}

const BlogCTA = ({
  slug,
  mode,
  visualVariant = "default",
  whatsappUrl,
  recommendedLanding,
  onWhatsAppClick,
}: BlogCTAProps) => {
  const isSoft = visualVariant === "soft";
  const secondaryTarget = recommendedLanding
    ? recommendedLanding.startsWith("/")
      ? recommendedLanding
      : `/${recommendedLanding}`
    : SOLUTIONS_ROUTE;
  const secondaryLabel = recommendedLanding ? "Ver solucion recomendada" : "Ver soluciones por rubro";

  return (
    <aside
      className={cn(
        "rounded-3xl border p-5 shadow-card sm:p-6",
        isSoft ? "border-border bg-surface-subtle" : "border-accent/25 bg-gradient-to-br from-accent/10 to-card",
      )}
      aria-label={`Llamado a la accion para ${slug}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">BusinessOS</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">Quieres que lo instalemos en 24h?</h2>
      <ul className="mt-4 space-y-2 text-sm text-text-secondary sm:text-base">
        <li className="rounded-xl border border-border/80 bg-card/80 px-3 py-2">Centraliza leads de WhatsApp en un solo tablero.</li>
        <li className="rounded-xl border border-border/80 bg-card/80 px-3 py-2">Automatiza seguimiento y cierre con procesos claros.</li>
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild variant="hero" className="h-11 rounded-full px-5" onClick={() => onWhatsAppClick(mode)}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Hablar por WhatsApp
          </a>
        </Button>

        <Button asChild variant="hero-outline" className="h-11 rounded-full px-5">
          <Link to={secondaryTarget}>
            {secondaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default BlogCTA;
