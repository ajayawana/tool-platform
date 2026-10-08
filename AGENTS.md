# Ozarbox AI Agent Rules

## Mission
Ozarbox is a fast, simple, global library of free calculators and professional tools.

## Before changing code
- Inspect the existing architecture and reuse existing components/data structures.
- Never replace working calculators with generic placeholders.
- Preserve existing URLs unless the task explicitly requires a migration.
- Keep the UI understandable to a child or older adult: clear labels, obvious inputs, large result areas, minimal clutter.
- Prefer small, focused changes over broad rewrites.

## Astro
- Use Astro's existing routing/data patterns.
- Keep pages statically buildable.
- Use import.meta.env.BASE_URL for internal links.
- Preserve canonical URLs, sitemap generation, robots.txt and structured data.
- Do not introduce client-side frameworks unless genuinely necessary.

## SEO
Every indexable tool should have:
- unique title
- useful meta description
- canonical URL
- breadcrumb structured data where appropriate
- WebApplication/SoftwareApplication structured data where appropriate
- clear H1
- useful explanatory content
- internal links to related tools
- inclusion in the sitemap

Never use noindex on a primary calculator/tool page unless explicitly requested.

## Quality gates
Before proposing a PR:
1. npm install
2. npm run check
3. npm run build
4. inspect the generated route structure
5. verify the requested feature works
6. check for broken internal links or obvious SEO regressions

If a test fails, diagnose and fix it rather than hiding or weakening the test.

## Safety
- Never expose API keys, tokens, passwords, or secrets.
- Never delete large parts of the project to make a build pass.
- Never modify GitHub Actions permissions or security settings unless explicitly requested.
- Do not automatically merge or deploy risky changes.
- If a request is ambiguous, inspect the repository and make the smallest reasonable change.

## Autonomous workflow
Issues labeled `fix-me` are eligible for OpenHands. Treat the issue body as the task specification. Create a focused PR with a concise summary and tests performed.
