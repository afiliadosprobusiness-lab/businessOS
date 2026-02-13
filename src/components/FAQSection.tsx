import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Que incluye exactamente BusinessOS?",
    answer:
      "Incluye landing page optimizada, widget de precalificacion de leads y sistema de gestion contable en un mismo flujo operativo.",
  },
  {
    question: "Cuanto tiempo demora la implementacion?",
    answer:
      "La puesta en marcha inicial normalmente se completa en menos de 48 horas despues de la demo y validacion del alcance.",
  },
  {
    question: "Necesito conocimientos tecnicos para usarlo?",
    answer:
      "No. El sistema se entrega configurado y con onboarding guiado para que el equipo lo pueda usar desde el primer dia.",
  },
  {
    question: "Puedo mantener mis herramientas actuales?",
    answer:
      "Si. Puedes migrar por etapas y mantener temporalmente herramientas existentes mientras centralizas procesos con BusinessOS.",
  },
  {
    question: "Que pasa si no encuentro horarios disponibles?",
    answer:
      "En la pagina de agenda encontraras un enlace directo a WhatsApp para coordinar una alternativa de horario con el equipo.",
  },
];

const FAQSection = () => {
  return (
    <section id="faqs" className="scroll-mt-32 bg-background py-24">
      <div className="container max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Preguntas frecuentes</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Resolvemos las dudas mas comunes antes de tu demo
          </h2>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-4 shadow-card sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-border/80">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
