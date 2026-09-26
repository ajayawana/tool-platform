# Production deployment checklist

## Required manual input
Set the production site URL as the `PUBLIC_SITE_URL` environment variable. Example:

`https://yourdomain.com`

Do not include a trailing slash.

This value is used by Astro for canonical URLs and by the generated sitemap/robots endpoints.

## Cloudflare Pages / Workers
1. Connect this GitHub repository.
2. Framework preset: Astro.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable `PUBLIC_SITE_URL` with the production URL.
6. Deploy.
7. Confirm `/sitemap.xml` and `/robots.txt` load on the production domain.

## Search Console
After the production domain is live:
1. Add the domain/property in Google Search Console.
2. Complete Google's ownership verification method.
3. Submit `https://yourdomain.com/sitemap.xml`.
4. Inspect the homepage and several tool URLs with URL Inspection.

## Monetization
Ads should only be added after the site has useful indexed content and a clear privacy/consent setup. When an ad network is approved, add its script through the site's shared layout rather than duplicating it on every calculator page.
