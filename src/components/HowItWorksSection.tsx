const steps = [
  {
    number: "01",
    title: "Agenda tu demo",
    description: "En 30 minutos te mostramos cómo BusinessOS se adapta a tu negocio. Sin compromiso.",
  },
  {
    number: "02",
    title: "Configuramos tu sistema",
    description: "Montamos tu landing page, widget de leads y panel contable. Todo listo en menos de 48 horas.",
  },
  {
    number: "03",
    title: "Lanza y crece",
    description: "Empieza a captar leads calificados, convertir clientes y controlar tus finanzas desde el día uno.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-surface-subtle py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">Cómo funciona</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Tres pasos para transformar tu negocio
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-6 bg-card rounded-xl p-6 shadow-card"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display text-sm font-bold text-primary-foreground">{step.number}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
