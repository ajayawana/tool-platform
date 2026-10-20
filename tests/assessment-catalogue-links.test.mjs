import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const registry = JSON.parse(readFileSync(new URL('../src/data/assessment-registry.json', import.meta.url), 'utf8'));
const alternatives = JSON.parse(readFileSync(new URL('../src/data/open-assessment-alternatives.json', import.meta.url), 'utf8'));
const cataloguePage = readFileSync(new URL('../src/pages/assessments/index.astro', import.meta.url), 'utf8');
const reflectionPage = readFileSync(new URL('../src/pages/tools/open-assessments/[slug].astro', import.meta.url), 'utf8');

test('every catalogue-only and permission-review entry opens a local original reflection guide', () => {
  const gated = registry.instruments.filter((item) => ['catalogue-only', 'permission-review'].includes(item.deployment_status));
  assert.equal(gated.length, 178);
  for (const item of gated) {
    assert.ok(item.open_alternative_route, item.instrument_id + ' must offer a local alternative');
    const slug = item.open_alternative_route.split('/').filter(Boolean).at(-1);
    assert.ok(alternatives.instruments.some((alt) => alt.slug === slug && alt.sourceInstrumentId === item.instrument_id),
      item.instrument_id + ' must resolve to a matching local reflection guide');
    assert.equal(item.route ?? null, null, item.instrument_id + ' must not imply the named test is administered by Ozarbox');
  }
});

test('local reflection guide is the primary CTA and official sources are clearly external', () => {
  const localCta = cataloguePage.indexOf('instrument.open_alternative_route &&');
  const externalCta = cataloguePage.indexOf('instrument.access_url &&');
  assert.ok(localCta >= 0 && externalCta >= 0);
  assert.ok(localCta < externalCta, 'local reflection guide must appear before external source link');
  assert.match(cataloguePage, /\(on Ozarbox\)/);
  assert.match(cataloguePage, /target="_blank" rel="noopener noreferrer"/);
  assert.match(cataloguePage, /official source link is external/i);
});

test('reflection guide route fallback respects configured base path and question count is data-driven', () => {
  assert.match(reflectionPage, /Astro\.redirect\(base \+ 'assessments\/'\)/);
  assert.match(reflectionPage, /querySelectorAll<HTMLTextAreaElement>\('textarea\[id\^="q-"\]'\)/);
  assert.doesNotMatch(reflectionPage, /const questionIds = \[1,2,3,4,5\]/);
});
