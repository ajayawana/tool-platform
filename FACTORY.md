# Ozarbox Autonomous Factory

## Pipeline
1. Research current search demand and underserved calculator/tool problems.
2. Score opportunities by intent, usefulness, competition, monetization potential, global applicability, implementation effort and duplication risk.
3. Select only high-confidence opportunities.
4. Produce a calculator specification: audience, inputs, formulas, outputs, edge cases, examples, SEO title, meta description, FAQ topics, related-tool links and schema requirements.
5. Create a GitHub issue beginning with [AI] containing the complete implementation specification.
6. Gemini Developer implements the issue in a branch.
7. Run type checks and production build.
8. Open a pull request. Never merge automatically.
9. Existing GitHub Pages deployment publishes merged main changes.

## Free-first rules
- Use public/free information sources.
- Use Gemini free-tier quota efficiently.
- Never call paid APIs or paid research services.
- Do not purchase domains, credits or subscriptions automatically.
- Prefer one strong opportunity over many weak opportunities.

## Quality gates
- Never create duplicate calculators.
- Never remove an existing calculator to make room for a new one.
- Every new tool needs a clear calculation, useful explanation and indexable SEO page.
- Test zero, minimum, typical and edge-case inputs where applicable.
- Preserve existing URL architecture and internal linking.
