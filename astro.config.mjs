import { defineConfig } from 'astro/config';
import { nicheTools } from './src/data/nicheTools.ts';
import { globalTools } from './src/data/globalTools.ts';

globalThis.allTools = [...nicheTools, ...globalTools];

const site = process.env.PUBLIC_SITE_URL || 'https://ajayawana.github.io/tool-platform';

export default defineConfig({
  site,
  base: '/tool-platform',
  trailingSlash: 'always',
  output: 'static',
});
