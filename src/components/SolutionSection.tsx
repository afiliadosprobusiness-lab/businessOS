import { FileText, Filter, Calculator } from "lucide-react";

const products = [
  {
    icon: FileText,
    name: "FastPage",
    tagline: "Creación de landing pages",
    description: "Crea páginas de alta conversión en minutos. Sin código, sin diseñadores. Templates probados que convierten visitantes en clientes.",
    color: "bg-accent-soft text-accent",
  },
  {
    icon: Filter,
    name: "Leads Widget",
    tagline: "Precalificación de leads",
    description: "Filtra automáticamente a tus prospectos. Solo llegan a tu equipo los leads que realmente tienen potencial de compra.",
    color: "bg-accent-soft text-accent",
  },
  {
    icon: Calculator,
    name: "ContApp",
    tagline: "Gestión contable",
    description: "Controla ingresos, gastos y facturación desde un solo lugar. Reportes claros para tomar mejores decisiones financieras.",
    color: "bg-accent-soft text-accent",
  },
];

const SolutionSection = () => {
  return (
    <section id="solucion" className="py-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">La solución</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Un sistema, tres superpoderes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <div
              key={i}
              className="group text-center bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${product.color} mb-5`}>
                <product.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{product.name}</h3>
              <p className="text-xs font-medium text-accent mb-3">{product.tagline}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-primary rounded-2xl px-8 py-5">
            <p className="font-display text-lg md:text-xl font-bold text-primary-foreground">
              No son herramientas separadas. <span className="text-accent-medium">Es un sistema.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
