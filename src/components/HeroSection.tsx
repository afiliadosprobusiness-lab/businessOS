import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="container max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-accent-soft text-accent text-xs font-medium animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Sistema todo-en-uno para negocios
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight tracking-tight text-balance animate-fade-up [animation-delay:100ms] opacity-0">
          Lanza, convierte y controla tu negocio con un solo sistema.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:200ms] opacity-0">
          BusinessOS unifica tu landing page, captación de leads y gestión contable en una plataforma integrada. Sin fricciones, sin herramientas sueltas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up [animation-delay:300ms] opacity-0">
          <Button variant="hero" size="lg" className="rounded-full px-8 text-base h-12">
            Agendar demo
            <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
          <Button variant="hero-outline" size="lg" className="rounded-full px-8 text-base h-12">
            <Play className="mr-1 w-4 h-4" />
            Ver cómo funciona
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
