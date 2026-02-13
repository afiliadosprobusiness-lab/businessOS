import { CalBookingButton } from "@/components/CalBooking";

const navLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Solucion", href: "#solucion" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Pricing", href: "#pricing" },
  { label: "Preguntas frecuentes", href: "#faqs" },
];

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
              Business<span className="text-accent">OS</span>
            </a>
            <CalBookingButton variant="hero" size="sm" className="h-10 rounded-full px-4 sm:px-5">
              Agendar demo
            </CalBookingButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
