import { Link } from "react-router-dom";
import { MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { LandingContent } from "@/lib/content";
import { SOLUTIONS_ROUTE } from "@/lib/routes";

interface LandingLayoutProps {
  landing: LandingContent;
  whatsappUrl: string;
  onCtaClick: (variant: string) => void;
}

const defaultIncludes = [
  "Leads Widget: captura y califica oportunidades en un solo flujo.",
  "Fast Page: pagina enfocada en conversion para atraer demanda calificada.",
  "ContApp: orden financiero y operativo para sostener el crecimiento.",
];

const LandingLayout = ({ landing, whatsappUrl, onCtaClick }: LandingLayoutProps) => {
  const introParagraphs = landing.intro?.paragraphs || [];
  const includesItems = landing.includes?.items?.length ? landing.includes.items : defaultIncludes;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            Business<span className="text-accent">OS</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="hero-outline" size="sm" className="rounded-full">
              <Link to="/blog">Blog</Link>
            </Button>
            <Button asChild variant="hero-outline" size="sm" className="hidden rounded-full sm:inline-flex">
              <Link to={SOLUTIONS_ROUTE}>Soluciones</Link>
            </Button>
            <Button asChild variant="hero" size="sm" className="rounded-full" onClick={() => onCtaClick("header")}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

          <div className="relative mx-auto w-full max-w-6xl">
            <div className="max-w-3xl rounded-3xl border border-border bg-card/90 p-6 shadow-card backdrop-blur sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent sm:text-sm">{landing.hero.eyebrow}</p>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {landing.keyword}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">{landing.hero.subheadline}</p>

              <Button asChild variant="hero" size="lg" className="mt-7 h-12 rounded-full px-8" onClick={() => onCtaClick("hero")}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {landing.hero.ctaLabel}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {introParagraphs.length ? (
          <section className="px-4 pb-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{landing.intro?.title || "Contexto de tu mercado"}</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-text-secondary">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{landing.problem.title}</h2>
              <p className="mt-3 text-text-secondary">{landing.problem.description}</p>
              <ul className="mt-5 space-y-3">
                {landing.problem.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-xl border border-border/80 bg-surface-subtle p-3 text-sm text-text-secondary sm:text-base">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">{landing.benefits.title}</h2>
              <ul className="mt-5 space-y-3">
                {landing.benefits.items.map((item) => (
                  <li key={item} className="rounded-xl border border-accent/20 bg-accent/10 p-3 text-sm text-foreground sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="bg-surface-subtle px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
              {landing.includes?.title || "Que incluye BusinessOS"}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {includesItems.map((item) => (
                <article key={item} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <p className="text-sm leading-relaxed text-text-secondary sm:text-base">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">{landing.steps.title}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {landing.steps.items.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">Preguntas frecuentes</h2>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {landing.faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question} className="border-border/80">
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-text-secondary sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 sm:bottom-6 sm:justify-end sm:px-6 lg:px-8">
        <Button asChild variant="hero" className="h-12 w-full max-w-sm rounded-full shadow-cta sm:w-auto" onClick={() => onCtaClick("floating")}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp con BusinessOS">
            <MessageCircle className="h-5 w-5" />
            Hablar por WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default LandingLayout;