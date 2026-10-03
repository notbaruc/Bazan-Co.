import type { APIRoute } from 'astro';
import { defaultLocale, locales, routes } from '@/i18n';

/** Sitemap con alternos de idioma (hreflang) por página. */
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://bazanconsultoria.netlify.app');
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.values(routes).flatMap((route) =>
    locales.map((locale) => {
      const alternates = [
        ...locales.map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt}" href="${new URL(route[alt], base).href}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL(route[defaultLocale], base).href}"/>`,
      ].join('\n');
      return `  <url>\n    <loc>${new URL(route[locale], base).href}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
