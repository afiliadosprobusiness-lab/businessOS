import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, BriefcaseBusiness } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { getCatalogCities, getCatalogNiches, getProgrammaticLandings } from "@/lib/content";
import { SOLUTIONS_ROUTE } from "@/lib/routes";
import { buildAbsoluteUrl } from "@/lib/site";

const SolutionsIndexPage = () => {
  const niches = getCatalogNiches();
  const cities = getCatalogCities();
  const [selectedNiche, setSelectedNiche] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const cityLabelMap = useMemo(
    () => cities.reduce<Record<string, string>>((acc, city) => ({ ...acc, [city.slug]: city.name }), {}),
    [cities],
  );

  const landings = getProgrammaticLandings();

  const filteredLandings = useMemo(
    () =>
      landings.filter((landing) => {
        const matchNiche = selectedNiche === "all" || landing.nicheSlug === selectedNiche;
        const matchCity = selectedCity === "all" || landing.citySlug === selectedCity;
        return matchNiche && matchCity;
      }),
    [landings, selectedCity, selectedNiche],
  );

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <SEO
        title="Soluciones por rubro y ciudad | BusinessOS"
        description="Explora soluciones CRM de BusinessOS por nicho y ciudad en Peru."
        path={SOLUTIONS_ROUTE}
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Soluciones BusinessOS",
          description: "Listado de soluciones SEO por nicho y ciudad.",
          url: buildAbsoluteUrl(SOLUTIONS_ROUTE),
          inLanguage: "es",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <header className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent sm:text-sm">SEO Programatico</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Soluciones por rubro y ciudad
          </h1>
          <p className="mt-3 max-w-3xl text-base text-text-secondary sm:text-lg">
            Filtra por nicho y ciudad para encontrar una landing especifica con enfoque comercial y CTA directo a WhatsApp.
          </p>
        </header>

        <section className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-5 shadow-card sm:grid-cols-2 sm:p-6">
          <div>
            <label htmlFor="niche-filter" className="mb-2 block text-sm font-semibold text-foreground">
              Rubro
            </label>
            <div className="relative">
              <BriefcaseBusiness className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
              <select
                id="niche-filter"
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedNiche}
                onChange={(event) => setSelectedNiche(event.target.value)}
              >
                <option value="all">Todos los rubros</option>
                {niches.map((niche) => (
                  <option key={niche.slug} value={niche.slug}>
                    {niche.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="city-filter" className="mb-2 block text-sm font-semibold text-foreground">
              Ciudad
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
              <select
                id="city-filter"
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
              >
                <option value="all">Todas las ciudades</option>
                {cities.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLandings.map((landing) => (
            <article key={landing.slug} className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                {landing.nicheSlug?.replaceAll("-", " ")} / {cityLabelMap[landing.citySlug || ""] || landing.citySlug}
              </p>
              <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">{landing.keyword}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">{landing.seo.description}</p>

              <Button asChild variant="hero-outline" className="mt-4 rounded-full">
                <Link to={`/${landing.slug}`}>Ver landing</Link>
              </Button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default SolutionsIndexPage;
