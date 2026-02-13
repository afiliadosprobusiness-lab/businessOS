import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Setup",
    price: "279",
    period: "pago único",
    description: "Configuración e implementación completa de tu sistema BusinessOS.",
    features: [
      "Landing page personalizada",
      "Widget de leads configurado",
      "Panel contable inicial",
      "Onboarding guiado",
    ],
    highlighted: false,
  },
  {
    name: "Mantenimiento",
    price: "79",
    period: "/ mes",
    description: "Todo funcionando sin preocupaciones. Soporte y actualizaciones incluidas.",
    features: [
      "Soporte técnico prioritario",
      "Actualizaciones de plataforma",
      "Hosting y seguridad",
      "Reportes mensuales",
    ],
    highlighted: true,
  },
  {
    name: "Upgrade",
    price: "129",
    period: "/ mes",
    description: "Funcionalidades avanzadas para escalar tu negocio al siguiente nivel.",
    features: [
      "Todo del plan Mantenimiento",
      "Automatizaciones avanzadas",
      "Integraciones personalizadas",
      "Consultoría estratégica mensual",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Simple, transparente, sin sorpresas
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            Precios en soles peruanos. Sin contratos largos, sin costos ocultos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-card-hover scale-[1.03]"
                  : "bg-card shadow-card hover:shadow-card-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                  Más popular
                </div>
              )}

              <h3 className={`font-display text-lg font-bold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-xs font-medium opacity-70">S/</span>
                <span className={`font-display text-4xl font-extrabold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-text-tertiary"}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`mt-3 text-sm leading-relaxed ${plan.highlighted ? "text-primary-foreground/80" : "text-text-secondary"}`}>
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-accent-medium" : "text-accent"}`} />
                    <span className={plan.highlighted ? "text-primary-foreground/90" : "text-text-secondary"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "hero-outline"}
                className="w-full mt-8 rounded-full"
              >
                Agendar demo
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
