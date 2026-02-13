import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const TestimonialsSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const carousel = carouselRef.current;
    if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrame = 0;
    let direction = 1;

    const animate = () => {
      const maxOffset = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      if (!isInteractingRef.current && maxOffset > 0) {
        const nextOffset = carousel.scrollLeft + direction * 0.45;
        if (nextOffset >= maxOffset) {
          carousel.scrollLeft = maxOffset;
          direction = -1;
        } else if (nextOffset <= 0) {
          carousel.scrollLeft = 0;
          direction = 1;
        } else {
          carousel.scrollLeft = nextOffset;
        }
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollByAmount = (direction: 1 | -1) => {
    const carousel = carouselRef.current;
    if (!carousel) {
      return;
    }

    const amount = Math.max(260, carousel.clientWidth * 0.72);
    carousel.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section className="bg-background pb-14 pt-4 sm:pb-20">
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Testimonios</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que dicen los negocios que ya usan BusinessOS
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface-subtle p-3 sm:p-5">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface-subtle to-transparent sm:w-16"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface-subtle to-transparent sm:w-16"
            aria-hidden="true"
          />

          <Button
            type="button"
            variant="hero-outline"
            size="icon"
            onClick={() => scrollByAmount(-1)}
            onMouseDown={() => {
              isInteractingRef.current = true;
            }}
            onMouseUp={() => {
              isInteractingRef.current = false;
            }}
            className="absolute left-2 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full bg-background/90 p-0 sm:h-10 sm:w-10"
            aria-label="Ver testimonios anteriores"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="hero-outline"
            size="icon"
            onClick={() => scrollByAmount(1)}
            onMouseDown={() => {
              isInteractingRef.current = true;
            }}
            onMouseUp={() => {
              isInteractingRef.current = false;
            }}
            className="absolute right-2 top-1/2 z-20 h-9 w-9 -translate-y-1/2 rounded-full bg-background/90 p-0 sm:h-10 sm:w-10"
            aria-label="Ver testimonios siguientes"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div
            ref={carouselRef}
            onMouseEnter={() => {
              isInteractingRef.current = true;
            }}
            onMouseLeave={() => {
              isInteractingRef.current = false;
            }}
            onFocus={() => {
              isInteractingRef.current = true;
            }}
            onBlur={() => {
              isInteractingRef.current = false;
            }}
            className="overflow-x-auto scroll-smooth px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-12"
          >
            <div className="flex w-max gap-4 py-1">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.author}
                  className="flex w-[18rem] flex-shrink-0 snap-start flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:w-[21rem]"
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
      </div>
    </section>
  );
};

export default TestimonialsSection;
