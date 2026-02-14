import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { buildAbsoluteUrl } from "@/lib/site";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="BusinessOS | CRM, leads y automatizacion para negocios en crecimiento"
        description="Acelera conversion comercial con BusinessOS: CRM operativo, sistema de leads y automatizacion para tu negocio."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "BusinessOS",
          description: "Sistema para ordenar ventas, leads y automatizacion comercial.",
          url: buildAbsoluteUrl("/"),
          inLanguage: "es",
        }}
      />
      <Navbar />
      <HeroSection />
      <TestimonialsSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;