import { AlertTriangle, BarChart3, Layers, Users } from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Leads sin filtrar",
    description: "Recibes contactos que nunca van a comprar. Tu equipo pierde tiempo con prospectos no calificados.",
  },
  {
    icon: BarChart3,
    title: "Páginas que no convierten",
    description: "Tu landing page no comunica bien tu propuesta de valor y los visitantes se van sin actuar.",
  },
  {
    icon: AlertTriangle,
    title: "Desorden financiero",
    description: "Facturas en Excel, gastos sin categorizar, y cero visibilidad del estado real de tu negocio.",
  },
  {
    icon: Layers,
    title: "Demasiadas herramientas",
    description: "Pagas por 5 plataformas distintas que no se comunican entre sí. Datos fragmentados por todas partes.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problema" className="py-24 bg-surface-subtle">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">El problema</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            ¿Te suena familiar?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center">
                  <problem.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{problem.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
