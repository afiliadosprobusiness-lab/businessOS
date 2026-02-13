const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-tertiary">
        <p className="font-display font-semibold text-foreground">
          Business<span className="text-accent">OS</span>
        </p>
        <p>© {new Date().getFullYear()} BusinessOS. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
