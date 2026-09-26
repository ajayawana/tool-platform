# ToolPlatform

A fast, free, client-side utility platform built with Astro.

## Rollout

The platform is being built as one Astro site with reusable tool infrastructure, scaling in controlled batches: **10 → 25 → 50 → 100 → 250 → 500 tools**.

### Current batch

The first 10 browser-first calculators are live in the codebase:

1. Percentage Calculator
2. Percentage Change Calculator
3. Discount Calculator
4. Profit Calculator
5. Margin Calculator
6. Markup Calculator
7. Ratio Calculator
8. Average Calculator
9. Fraction Calculator
10. Tip Calculator

## Architecture

- Astro + TypeScript
- Static/client-side calculations
- Reusable tool definitions and generated routes
- SEO-ready titles, descriptions and canonical URLs
- Categories and legal pages
- Cloudflare Pages target for production hosting

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production domain will be configured once the final domain is selected.
