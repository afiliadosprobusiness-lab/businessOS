import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
        <Button variant="hero" size="lg" className="mt-8 rounded-full px-10 text-base h-13">
          Agendar demo ahora
          <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
        <p className="mt-4 text-primary-foreground/50 text-sm">
          Sin compromiso · 100% gratuito · Respuesta en 24h
        </p>
      </div>
    </section>
  );
};

export default CTASection;
