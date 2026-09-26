import type { APIRoute } from 'astro';
import { nicheTools } from '../data/nicheTools';
import { globalTools } from '../data/globalTools';
import { dairyTools } from '../data/dairyTools';
import { accountingTools } from '../data/accountingTools';
import { taxTools } from '../data/taxTools';
import { professionalTools } from '../data/professionalTools';

const tools = [...nicheTools, ...globalTools];
const clusters = [...new Set(tools.map((tool) => tool.cluster))];

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://example.com';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const paths = [
    '/',
    '/niche/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
    '/disclaimer/',
    '/dairy/',
    '/niche/accounting/',
    '/niche/tax/',
    '/niche/professional-services/',
    ...clusters.map((cluster) => `/niche/${cluster}/`),
    ...tools.map((tool) => `/niche/${tool.slug}/`),
    ...accountingTools.map((tool) => `/niche/accounting/${tool.slug}/`),
    ...taxTools.map((tool) => `/niche/tax/${tool.slug}/`),
    ...professionalTools.map((tool) => `/niche/professional-services/${tool.slug}/`),
    ...dairyTools.map((tool) => `/dairy/${tool.slug}/`),
  ];
  const urls = [...new Set(paths)].map((path) => `${origin}${base}${path}`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
