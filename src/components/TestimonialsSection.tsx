import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Antes teniamos todo separado. Con BusinessOS cerramos mas oportunidades porque el proceso comercial ahora es claro.",
    author: "Diego Ramirez",
    role: "Fundador, Agencia Growth Labs",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "En la primera semana ordenamos leads y finanzas en un solo flujo. El equipo dejo de perder horas en herramientas sueltas.",
    author: "Carla Mena",
    role: "Directora de Operaciones, Nova Studio",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Lo que mas valoro es la velocidad. Salimos con landing, captacion y control contable sin friccion tecnica.",
    author: "Jorge Vidal",
    role: "CEO, Punto Digital",
    photoUrl: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    quote:
      "Las demos son practicas y directas. Te muestran exactamente como aplicar el sistema a tu negocio real.",
    author: "Valeria Acosta",
    role: "Co-fundadora, Ecom Partners",
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const testimonialItems = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  return (
    <section className="bg-background pb-14 pt-4 sm:pb-20">
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Testimonios</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que dicen los negocios que ya usan BusinessOS
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface-subtle p-3 sm:p-5">
          <div className="testimonial-track flex w-max gap-4">
            {testimonialItems.map((testimonial, index) => (
              <article
                key={`${testimonial.author}-${index}`}
                className="flex w-[18.5rem] flex-shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:w-[22rem]"
              >
                <div>
                  <Quote className="h-5 w-5 text-accent" />
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">{testimonial.quote}</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={testimonial.photoUrl}
                    alt={`Foto de ${testimonial.author}`}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border border-border/80 object-cover"
                  />
                  <div>
                    <p className="font-display text-base font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-text-tertiary">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
