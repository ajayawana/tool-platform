import type { APIRoute } from 'astro';
import { nicheTools } from '../data/nicheTools';
import { globalTools } from '../data/globalTools';

const tools = [...nicheTools, ...globalTools];
const clusters = [...new Set(tools.map((tool) => tool.cluster))];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://example.com';
  const urls = [
    '/',
    '/niche/',
    ...clusters.map((cluster) => `/niche/${cluster}/`),
    ...tools.map((tool) => `/niche/${tool.slug}`),
  ];
  const unique = [...new Set(urls)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${unique
    .map((path) => `<url><loc>${origin}${path}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
