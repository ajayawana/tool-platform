import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'src/data/assessment-registry.json'), 'utf8'));
const alternatives = JSON.parse(fs.readFileSync(path.join(root, 'src/data/open-assessment-alternatives.json'), 'utf8'));

test('all 147 remaining catalogue-only instruments have separate original reflection guides', () => {
  const pending = registry.instruments.filter((item) => item.deployment_status === 'catalogue-only');
  assert.equal(pending.length, 147);
  assert.equal(pending.filter((item) => item.open_alternative_route).length, 147);
  assert.equal(alternatives.instruments.length, 181);
  for (const item of pending) {
    assert.ok(alternatives.instruments.some((alt) => alt.sourceInstrumentId === item.instrument_id));
    assert.equal(item.open_alternative_route, '/tools/open-assessments/' + item.instrument_id + '/');
  }
});

test('all guides are original, bounded, complete, and have unique routes', () => {
  const slugs = alternatives.instruments.map((item) => item.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const item of alternatives.instruments) {
    assert.ok(item.title.startsWith('Open '));
    assert.match(item.description, /not a validated substitute/i);
    assert.match(item.intendedUse, /Not diagnostic/i);
    assert.match(item.resultNotice, /not a clinical score/i);
    assert.match(item.intendedUse, /not intended for diagnosis|not diagnostic/i);
    assert.equal(item.questions.length, 5);
    assert.equal(new Set(item.questions.map((question) => question.id)).size, 5);
    assert.ok(item.questions.every((question) => question.text.trim().length > 15));
    assert.equal('scale' in item, false);
    assert.ok(item.sources.every((source) => /^https:\/\//.test(source)));
  }
});

test('proprietary instruments remain permission-gated and alternatives do not claim equivalence', () => {
  for (const item of registry.instruments.filter((instrument) => instrument.deployment_status === 'permission-review')) {
    assert.equal(item.route, null);
    assert.ok(item.content_rights);
  }
  for (const item of alternatives.instruments) {
    assert.match(item.description, /not the named proprietary instrument/i);
    assert.match(item.resultNotice, /Do not compare it with the named instrument/i);
  }
});
