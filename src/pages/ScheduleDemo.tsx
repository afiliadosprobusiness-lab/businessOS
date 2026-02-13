import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cal, { getCalApi } from "@calcom/embed-react";
import { DEMO_CONFIRMATION_ROUTE } from "@/lib/routes";

const CAL_NAMESPACE = "meet-demo-businessos";
const CAL_LINK = "afiliados-pro-business/meet-demo-businessos";

const ScheduleDemo = () => {
  const navigate = useNavigate();

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
    <main className="min-h-screen bg-background px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Button asChild variant="hero-outline" className="w-fit rounded-full px-6">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>

        <section className="rounded-3xl border border-border bg-card p-4 shadow-card sm:p-6">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-accent">Agendar demo</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Elige la fecha para tu demo personalizada
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Selecciona un horario disponible y confirma tu llamada en menos de un minuto.
            </p>
          </div>

          <div className="h-[76dvh] min-h-[620px] overflow-hidden rounded-2xl border border-border/80 bg-background">
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
