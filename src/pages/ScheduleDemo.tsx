import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import Cal, { getCalApi } from "@calcom/embed-react";
import { DEMO_CONFIRMATION_ROUTE } from "@/lib/routes";
import { buildAbsoluteUrl } from "@/lib/site";
import { buildBusinessOSMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const CAL_NAMESPACE = "meet-demo-businessos";
const CAL_LINK = "afiliados-pro-business/meet-demo-businessos";

const ScheduleDemo = () => {
  const navigate = useNavigate();
  const whatsappFallbackUrl = buildWhatsAppUrl(buildBusinessOSMessage("negocio", "peru"));

  useEffect(() => {
    let isMounted = true;
    void (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          if (isMounted) {
            navigate(DEMO_CONFIRMATION_ROUTE, { replace: true });
          }
        },
      });
    })();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-surface-subtle via-background to-background px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <SEO
        title="Agendar demo BusinessOS | Reserva tu llamada"
        description="Agenda una demo personalizada de BusinessOS y descubre como ordenar ventas, leads y automatizacion en tu negocio."
        path="/agendar-demo"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Agendar demo BusinessOS",
          description: "Pagina para reservar una demo comercial de BusinessOS.",
          url: buildAbsoluteUrl("/agendar-demo"),
          inLanguage: "es",
        }}
      />

      <div
        className="pointer-events-none absolute -left-28 top-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="hero-outline" className="w-fit rounded-full px-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>

          <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <CalendarDays className="h-4 w-4" />
            Agenda online BusinessOS
          </div>
        </div>

        <section className="rounded-[1.75rem] border border-border/80 bg-card/95 p-4 shadow-card backdrop-blur sm:p-7">
          <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Agendar demo</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Elige la fecha para tu demo personalizada
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                Selecciona un horario disponible y confirma tu llamada en menos de un minuto.
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Si no encuentra disponibilidad,{' '}
                <a
                  href={whatsappFallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-source="unknown"
                  data-variant="unknown"
                  className="font-semibold text-accent underline underline-offset-4 transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  haga clic aqui
                </a>
                .
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface-subtle px-4 py-3 text-xs text-text-secondary sm:text-sm">
              <Clock3 className="h-4 w-4 text-accent" />
              Demo de 30 minutos por Google Meet
            </div>
          </div>

          <div className="h-[72dvh] min-h-[560px] overflow-hidden rounded-2xl border border-border/80 bg-background">
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ScheduleDemo;
