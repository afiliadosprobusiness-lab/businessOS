import { Link } from "react-router-dom";
import { CheckCircle2, House } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookingConfirmed = () => {
  return (
    <main className="min-h-screen bg-primary px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/20 bg-primary-foreground/10 p-6 text-primary-foreground shadow-[0_30px_90px_-45px_hsl(220_70%_10%)] backdrop-blur sm:p-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground/95">
          <CheckCircle2 className="h-4 w-4" />
          Llamada agendada
        </div>

        <h1 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-wide sm:text-4xl">
          Tu llamada fue reservada, pero aun debes confirmar tu asistencia.
        </h1>

        <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/20 p-5">
          <p className="text-base font-semibold uppercase leading-relaxed text-accent-foreground/95 sm:text-lg">
            Importante: te contactaremos por WhatsApp o telefono para validar la sesion. Si no respondes, el cupo se
            libera para la lista de espera.
          </p>
        </div>

        <ol className="mt-8 space-y-5 text-xl leading-snug text-primary-foreground/95 sm:text-3xl">
          <li>1. Mantente atento a WhatsApp y telefono para confirmar la llamada.</li>
          <li>2. Asegurate de que eres el tipo de negocio que podemos ayudar a escalar.</li>
          <li>3. Llega con claridad sobre el costo de seguir sin sistema.</li>
        </ol>

        <Button asChild size="lg" className="mt-10 h-12 rounded-full px-8 text-base">
          <Link to="/">
            <House className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default BookingConfirmed;
