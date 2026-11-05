import type { APIRoute } from 'astro';
import { locales, getLocalizedPath } from '../i18n/ui';

const SITE_URL = 'https://webmtomp4.github.io';

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().split('T')[0];

  const buildUrlFull = (loc: (typeof locales)[number]) => {
    const path = getLocalizedPath(loc);
    return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
  };

  const xhtmlLinks = [
    ...locales.map(
      (altLoc) =>
        `    <xhtml:link rel="alternate" hreflang="${altLoc}" href="${buildUrlFull(altLoc)}" />`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
  ].join('\n');

  const urlEntries = locales
    .map(
      (loc) => `  <url>
    <loc>${buildUrlFull(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${xhtmlLinks}
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
