# BusinessOS Frontend

Landing y sistema SEO de BusinessOS construido con Vite + React + TypeScript.

## Scripts

```bash
npm install
npm run dev
npm run test
npm run build
```

## Stack

- Vite
- React
- TypeScript
- TailwindCSS
- shadcn/ui

## SEO y contenido

- Blog basado en archivos: `content/blog/*.mdx`
- Landings SEO estaticas: `content/landings/*.json`
- Landings SEO programaticas: `content/seo/landing-catalog.json`
- Generacion automatica de `public/sitemap.xml` y `public/robots.txt` en `prebuild`

## Deploy (Vercel)

El repo incluye `vercel.json` con fallback SPA para rutas de `react-router-dom`.