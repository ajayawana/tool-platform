import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const sitemap = readFileSync(new URL("../src/pages/sitemap.xml.ts", import.meta.url), "utf8");
const home = readFileSync(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const layout = readFileSync(new URL("../src/layouts/Layout.astro", import.meta.url), "utf8");
const catalogue = readFileSync(new URL("../src/pages/assessments/index.astro", import.meta.url), "utf8");

test("assessment centre and every implemented short-screen route are linked into the sitemap", () => {
  for (const route of [
    "'/assessments/'",
    "'/tools/phq-9/'",
    "'/tools/assessments/phq-2/'",
    "'/tools/assessments/gad-7/'",
    "'/tools/assessments/gad-2/'",
    "'/tools/assessments/pcl-5/'",
    "'/tools/assessments/pc-ptsd-5/'",
    "'/tools/assessments/lec-5/'",
  ]) assert.ok(sitemap.includes(route), "sitemap missing " + route);
});

test("assessment centre is discoverable from primary navigation and homepage", () => {
  assert.match(layout, /base\s*\+\s*'assessments\/'/);
  assert.match(home, /id="assessment-centre"/);
  assert.match(home, /assessmentRegistry\.instruments\.length/);
});

test("catalogue supports browser-only search, domain and deployment-status filtering", () => {
  assert.match(catalogue, /id="instrument-search"/);
  assert.match(catalogue, /id="domain-filter"/);
  assert.match(catalogue, /id="status-filter"/);
  assert.match(catalogue, /data-search=/);
  assert.match(catalogue, /data-domain=/);
  assert.match(catalogue, /data-status=/);
  assert.match(catalogue, /aria-live="polite"/);
  assert.match(catalogue, /if \(count\) count\.textContent/);
});

test("catalogue clearly distinguishes catalogue-only entries from usable assessment routes", () => {
  assert.match(catalogue, /No questionnaire or score is provided by Ozarbox for this entry/);
  assert.match(catalogue, /instrument.access_url/);
  assert.match(catalogue, /instrument.access_label/);
  assert.match(catalogue, /not a claim of clinical validation or institutional approval/i);
  assert.match(catalogue, /Ozarbox does not monitor patient answers, alert a clinician/);
  assert.match(catalogue, /permission.*evidence.*qualification/i);
});
