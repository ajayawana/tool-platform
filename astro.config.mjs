import { defineConfig } from 'astro/config';
import { nicheTools } from './src/data/nicheTools.ts';
import { globalTools } from './src/data/globalTools.ts';

// Astro evaluates getStaticPaths in a separate prerender context.
// Expose the combined catalog on the Node global so existing route code
// can resolve its allTools reference during static generation.
globalThis.allTools = [...nicheTools, ...globalTools];

const site = process.env.PUBLIC_SITE_URL || 'https://ajayawana.github.io/tool-platform';

export default defineConfig({
  site,
  base: '/tool-platform',
  output: 'static',
});
