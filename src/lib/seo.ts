import type { Dictionary, Locale } from '@/i18n';
import { site } from './site';

/** Datos estructurados (JSON-LD) del negocio, el sitio y la página actual. */
export function buildStructuredData(options: {
  lang: Locale;
  pageUrl: string;
  siteUrl: string;
  t: Dictionary;
}): Record<string, unknown> {
  const { lang, pageUrl, siteUrl, t } = options;
  const businessId = `${siteUrl}/#business`;
  const websiteId = `${siteUrl}/#website`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': businessId,
        name: site.name,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/logo-512.png`,
        image: `${siteUrl}${t.meta.ogImage}`,
        description: t.meta.description,
        email: site.email,
        telephone: site.whatsappDisplay,
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.city,
          addressRegion: site.region,
          addressCountry: site.country,
        },
        areaServed: [
          { '@type': 'City', name: site.city },
          { '@type': 'Country', name: 'MX' },
        ],
        knowsLanguage: ['es', 'en'],
        serviceType: t.services.items.map((service) => service.title),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${siteUrl}/`,
        name: site.name,
        inLanguage: ['es', 'en'],
        publisher: { '@id': businessId },
      },
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: t.meta.title,
        inLanguage: lang,
        isPartOf: { '@id': websiteId },
        about: { '@id': businessId },
      },
    ],
  };
}
