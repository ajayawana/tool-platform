import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL || 'https://ajayawana.github.io/tool-platform';

export default defineConfig({
  site,
  base: '/tool-platform',
  output: 'static',
});
