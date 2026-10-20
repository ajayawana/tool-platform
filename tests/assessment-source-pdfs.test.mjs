import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const registry = JSON.parse(readFileSync(new URL('../src/data/assessment-registry.json', import.meta.url), 'utf8'));
const scale = JSON.parse(readFileSync(new URL('../src/data/source-assessment-ams-c28.json', import.meta.url), 'utf8'));
const route = readFileSync(new URL('../src/pages/tools/source-assessments/[slug].astro', import.meta.url), 'utf8');
const catalogue = readFileSync(new URL('../src/pages/assessments/index.astro', import.meta.url), 'utf8');

test('AMS-C 28 source data contains 28 items and source-defined seven subscales', () => {
  assert.equal(scale.questions.length, 28);
  assert.equal(scale.subscales.length, 7);
  for (const subscale of scale.subscales) assert.equal(subscale.items.length, 4);
  const all = scale.subscales.flatMap(s => s.items).sort((a,b)=>a-b);
  assert.deepEqual(all, Array.from({length:28},(_,i)=>i+1));
  assert.ok(scale.sourceUrl.includes('lrcs.uqam.ca'));
});

test('AMS-C 28 implementation calculates source-defined subscale averages and does not claim clinical validity', () => {
  assert.match(route, /Calculate subscale averages/);
  assert.match(route, /mean\\.toFixed\\(2\\)/);
  assert.match(route, /not diagnoses, percentile ranks, or validated cut-offs/);
  assert.match(route, /Research-use limitation/);
});

test('source-PDF-used badge is only rendered for entries with implemented source-PDF evidence', () => {
  const ams = registry.instruments.find(x => x.instrument_id === 'academic-motivation-scale');
  const ace = registry.instruments.find(x => x.instrument_id === 'ace-iii');
  assert.equal(ams.source_pdf.status, 'official-source-pdf-used');
  assert.equal(ams.source_pdf.implementation_status, 'implemented-from-official-source-pdf');
  assert.equal(ace.source_pdf.implementation_status, 'not-implemented');
  assert.match(catalogue, /source_pdf\?\.status === 'official-source-pdf-used'/);
  assert.match(catalogue, /Official PDF used/);
});
