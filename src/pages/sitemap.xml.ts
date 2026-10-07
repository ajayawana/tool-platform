import type { APIRoute } from 'astro';
import { nicheTools } from '../data/nicheTools';
import { globalTools } from '../data/globalTools';
import { dairyTools } from '../data/dairyTools';
import { accountingTools } from '../data/accountingTools';
import { taxTools } from '../data/taxTools';
import { professionalTools } from '../data/professionalTools';
import { researchTools } from '../data/researchTools';

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
    '/niche/hidden-business-costs/',
    '/niche/chair-hour-overhead-calculator/',
    '/niche/labor-burden-by-trade-calculator/',
    '/niche/contractor-bid-markup-calculator/',
    '/niche/client-churn-cost-calculator/',
    ...[],
    ...tools.map((tool) => `/niche/${tool.slug}/`),
    ...accountingTools.map((tool) => `/niche/accounting/${tool.slug}/`),
    ...taxTools.map((tool) => `/niche/tax/${tool.slug}/`),
    ...professionalTools.map((tool) => `/niche/professional-services/${tool.slug}/`),
    ...dairyTools.map((tool) => `/dairy/${tool.slug}/`),
    '/research/',
    ...[...new Set(researchTools.map((tool) => tool.cluster))].map((cluster) => `/research/cluster/${cluster}/`),
    ...researchTools.map((tool) => `/research/${tool.slug}/`),
  ];
  const urls = [...new Set(paths)].map((path) => `${origin}${base}${path}`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
