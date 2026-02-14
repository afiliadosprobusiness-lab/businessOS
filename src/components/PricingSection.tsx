import { Check, ArrowRight } from "lucide-react";
import { CalBookingButton } from "@/components/CalBooking";

const plans = [
  {
    name: "Setup Unico",
    price: "279",
    period: "pago unico",
    description: "Implementacion completa para dejar BusinessOS listo desde el primer dia.",
    features: [
      "Implementacion completa de BusinessOS",
      "Configuracion de Leads Widget",
      "Configuracion inicial de ContApp",
      "Conexion basica SUNAT",
      "Onboarding guiado",
    ],
    highlighted: false,
  },
  {
    name: "Plan Base",
    price: "97",
    period: "/ mes",
    description: "Sistema operativo simple para pymes de servicios en Peru.",
    features: [
      "Leads Widget activo",
      "ContApp operativo para 2 empresas",
      "Hosting y seguridad",
      "Soporte estandar",
      "Actualizaciones de plataforma",
    ],
    highlighted: true,
  },
  {
    name: "Plan Upgrade",
    price: "147",
    period: "/ mes",
    description: "Todo el Plan Base, mas soporte y ejecucion para crecer sin complejidad.",
    features: [
      "Todo del Plan Base",
      "Automatizaciones adicionales",
      "Integraciones personalizadas simples",
      "Soporte prioritario",
      "Consultoria mensual corta",
      "Posibilidad de landing de conversion generada con IA",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="scroll-mt-32 py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Sistema operativo simple para pymes de servicios en Peru
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            Capta leads, ordenalos y manten un control contable basico con precios claros en soles.
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
                  Mas elegido
                </div>
              )}

              <h3
                className={`font-display text-lg font-bold ${
                  plan.highlighted ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {plan.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-xs font-medium opacity-70">S/</span>
                <span
                  className={`font-display text-4xl font-extrabold ${
                    plan.highlighted ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-text-tertiary"}`}>
                  {plan.period}
                </span>
              </div>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  plan.highlighted ? "text-primary-foreground/80" : "text-text-secondary"
                }`}
              >
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? "text-accent-medium" : "text-accent"}`}
                    />
                    <span className={plan.highlighted ? "text-primary-foreground/90" : "text-text-secondary"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <CalBookingButton variant={plan.highlighted ? "hero" : "hero-outline"} className="mt-8 w-full rounded-full">
                Agendar demo
                <ArrowRight className="ml-1 h-4 w-4" />
              </CalBookingButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
