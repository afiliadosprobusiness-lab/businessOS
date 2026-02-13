import { ArrowRight } from "lucide-react";
import { CalBookingButton } from "@/components/CalBooking";

const CTASection = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container max-w-2xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
          ¿Listo para simplificar tu negocio?
        </h2>
        <p className="mt-4 text-primary-foreground/75 text-lg leading-relaxed">
          Agenda una demo de 30 minutos y descubre cómo BusinessOS puede ayudarte a lanzar, convertir y controlar — todo desde un solo lugar.
        </p>
        <CalBookingButton
          variant="default"
          size="lg"
          className="group mt-8 h-14 rounded-full bg-gradient-to-r from-accent via-sky-400 to-accent bg-[length:200%_100%] px-10 text-base font-semibold text-white shadow-[0_10px_28px_-10px_hsl(var(--accent)/0.85)] transition-all duration-300 hover:bg-right hover:shadow-[0_16px_36px_-14px_hsl(var(--accent)/0.95)] active:scale-[0.98]"
        >
          Agendar demo ahora
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </CalBookingButton>
        <p className="mt-4 text-primary-foreground/50 text-sm">
          Sin compromiso · 100% gratuito · Respuesta en 24h
        </p>
      </div>
    </section>
  );
};

export default CTASection;
