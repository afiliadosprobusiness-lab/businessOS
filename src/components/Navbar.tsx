import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { CalBookingButton } from "@/components/CalBooking";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Problema", href: "#problema" },
  { label: "Solucion", href: "#solucion" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Pricing", href: "#pricing" },
  { label: "Preguntas frecuentes", href: "#faqs" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
              Business<span className="text-accent">OS</span>
            </a>

            <div className="hidden items-center gap-3 md:flex">
              <Button asChild variant="hero-outline" size="sm" className="h-10 rounded-full px-4 sm:px-5">
                <Link to="/blog">Blog</Link>
              </Button>
              <Button asChild variant="hero-outline" size="sm" className="h-10 rounded-full px-4 sm:px-5">
                <Link to="/soluciones">Soluciones</Link>
              </Button>
              <ThemeToggle />
              <CalBookingButton variant="hero" size="sm" className="h-10 rounded-full px-4 sm:px-5">
                Agendar demo
              </CalBookingButton>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle compact />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="hero-outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    aria-label="Abrir menu de navegacion"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[86vw] max-w-xs border-l border-border bg-background p-0">
                  <div className="flex h-full flex-col">
                    <div className="border-b border-border px-5 py-5">
                      <p className="font-display text-xl font-bold tracking-tight text-foreground">
                        Business<span className="text-accent">OS</span>
                      </p>
                      <p className="mt-2 text-sm text-text-secondary">Navega por la landing</p>
                    </div>

                    <nav className="flex-1 space-y-2 px-5 py-4">
                      <SheetClose asChild>
                        <Link
                          to="/blog"
                          className="block rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Blog
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          to="/soluciones"
                          className="block rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          Soluciones
                        </Link>
                      </SheetClose>
                      {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <a
                            href={link.href}
                            className="block rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            {link.label}
                          </a>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className="border-t border-border px-5 py-5">
                      <ThemeToggle />
                      <CalBookingButton
                        variant="hero"
                        className="mt-3 w-full rounded-full"
                        onClick={() => {
                          setMobileMenuOpen(false);
                        }}
                      >
                        Agendar demo
                      </CalBookingButton>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="hidden flex-wrap items-center justify-center gap-2 md:flex">
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
