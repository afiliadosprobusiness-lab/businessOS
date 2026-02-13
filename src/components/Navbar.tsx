import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display text-xl font-bold text-foreground tracking-tight">
          Business<span className="text-accent">OS</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-sm text-text-secondary hover:text-foreground transition-colors">Problema</a>
          <a href="#solucion" className="text-sm text-text-secondary hover:text-foreground transition-colors">Solución</a>
          <a href="#como-funciona" className="text-sm text-text-secondary hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#pricing" className="text-sm text-text-secondary hover:text-foreground transition-colors">Pricing</a>
        </div>
        <Button variant="hero" size="sm" className="rounded-full px-5">
          Agendar demo
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
