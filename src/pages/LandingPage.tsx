import { useParams } from "react-router-dom";
import SEO from "@/components/SEO";
import LandingLayout from "@/components/landing/LandingLayout";
import NotFound from "@/pages/NotFound";
import { getLandingBySlug } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/site";
import { buildBusinessOSMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const LandingPage = () => {
  const { landingSlug } = useParams();
  const landing = getLandingBySlug(landingSlug);

  if (!landing) {
    return <NotFound />;
  }

  const pagePath = `/${landing.slug}`;
  const whatsappUrl = buildWhatsAppUrl(
    buildBusinessOSMessage(landing.niche || "negocio", landing.city || "peru"),
  );

  return (
    <>
      <SEO
        title={landing.seo.title}
        description={landing.seo.description}
        path={landing.seo.canonicalPath || pagePath}
        schema={{
          "@context": "https://schema.org",
          "@type": landing.seo.schemaType || "WebPage",
          name: landing.seo.title,
          description: landing.seo.description,
          url: buildAbsoluteUrl(landing.seo.canonicalPath || pagePath),
          inLanguage: "es",
        }}
      />
      <LandingLayout landing={landing} whatsappUrl={whatsappUrl} />
    </>
  );
};

export default LandingPage;
