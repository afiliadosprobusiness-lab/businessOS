import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { CalBookingButton } from "@/components/CalBooking";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent animate-fade-up">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Sistema todo-en-uno para negocios
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground text-balance animate-fade-up [animation-delay:100ms] opacity-0 md:text-5xl lg:text-6xl">
          Lanza, convierte y controla tu negocio con un solo sistema.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary animate-fade-up [animation-delay:200ms] opacity-0 md:text-xl">
          BusinessOS unifica tu landing page, captacion de leads y gestion contable en una plataforma integrada. Sin fricciones, sin herramientas sueltas.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-up [animation-delay:300ms] opacity-0 sm:flex-row">
          <CalBookingButton variant="hero" size="lg" className="h-12 rounded-full px-8 text-base">
            Agendar demo
            <ArrowRight className="ml-1 h-4 w-4" />
          </CalBookingButton>

          <Button asChild variant="hero-outline" size="lg" className="h-12 rounded-full px-8 text-base">
            <a href="#solucion" aria-label="Ver como funciona BusinessOS">
              <Play className="mr-1 h-4 w-4" />
              Ver como funciona
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
