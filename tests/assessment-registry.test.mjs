import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { BRIEF_ASSESSMENTS } from "../src/lib/brief-assessments.js";
import { PUBLIC_DOMAIN_ASSESSMENTS } from "../src/lib/public-domain-assessments.js";

const registry = JSON.parse(readFileSync(new URL("../src/data/assessment-registry.json", import.meta.url), "utf8"));

test("registry has the full set of assessment domains and unique instrument IDs", () => {
  assert.equal(registry.schema_version, "2.0.0");
  assert.equal(registry.domains.length, 13);
  assert.ok(registry.instruments.length >= 170, "expected broad master catalogue, got " + registry.instruments.length);
  const ids = registry.instruments.map((item) => item.instrument_id);
  assert.equal(new Set(ids).size, ids.length, "instrument IDs must be unique");
  const domainIds = registry.domains.map((domain) => domain.id);
  assert.equal(new Set(domainIds).size, domainIds.length, "domain IDs must be unique");
});

test("every instrument has version, population, mode, language, permissions, score provenance and safety fields", () => {
  const required = [
    "instrument_id", "official_name", "main_purpose", "domains", "version", "population",
    "administration_mode", "language", "recall_period", "license_status", "permission_status",
    "scoring_version", "evidence_sources", "safety_rules", "deployment_status", "software_validation"
  ];
  const statusSet = new Set(registry.statuses);
  for (const instrument of registry.instruments) {
    for (const key of required) assert.ok(Object.hasOwn(instrument, key), instrument.instrument_id + " missing " + key);
    assert.ok(statusSet.has(instrument.deployment_status), "unknown status " + instrument.deployment_status);
    assert.ok(Array.isArray(instrument.domains) && instrument.domains.length > 0, instrument.instrument_id + " has no domain");
    assert.ok(instrument.domains.every((domain) => registry.domains.some((candidate) => candidate.id === domain.id)), instrument.instrument_id + " references unknown domain");
    assert.ok(Array.isArray(instrument.evidence_sources));
    assert.ok(Array.isArray(instrument.safety_rules));
    assert.ok(typeof instrument.license_status === "string" && instrument.license_status.length > 0);
    assert.ok(typeof instrument.scoring_version === "string" && instrument.scoring_version.length > 0);
  }
});

test("all nine routed assessment entries have live routes and all remain labelled unvalidated", () => {
  const routed = registry.instruments.filter((item) => item.route);
  assert.deepEqual(routed.map((item) => item.instrument_id).sort(), ["ces-d","gad-2","gad-7","k6","lec-5","pc-ptsd-5","pcl-5","phq-2","phq-9"]);
  for (const instrument of routed) {
    assert.equal(instrument.deployment_status, "implemented-unvalidated");
    assert.match(instrument.software_validation, /not been independently clinically validated|validation remain outstanding|not.*validated|unvalidated/i);
  }
  for (const [id, instrument] of Object.entries({ ...BRIEF_ASSESSMENTS, ...PUBLIC_DOMAIN_ASSESSMENTS })) {
    const record = registry.instruments.find((item) => item.instrument_id === id);
    assert.ok(record, id + " has registry record");
    assert.equal(record.route, "/tools/assessments/" + id + "/");
    assert.equal(record.scoring_version, record.scoring_specification);
    assert.equal(instrument.id, id);
  }
});

test("known restricted, permission-review and clinician-administered measures are not public routes", () => {
  const mustRemainUnrouted = [
    "bdi-ii", "bai", "mmpi-3", "ados-2", "adi-r", "wais", "wisc", "mmpi-3",
    "caps-5", "scid-5-cv", "scid-5-pd", "who-5", "whodas-2-0", "audit", "assist",
    "eq-5d", "sf-36-sf-12", "maslach-burnout-inventory"
  ];
  for (const id of mustRemainUnrouted) {
    const item = registry.instruments.find((instrument) => instrument.instrument_id === id);
    assert.ok(item, "missing expected catalogue entry " + id);
    assert.equal(item.route ?? null, null, id + " must not expose a public cloned form");
  }
});

test("registry contains all user-requested domains and representative instruments", () => {
  const names = new Set(registry.instruments.map((item) => item.official_name.toLowerCase()));
  for (const expected of [
    "phq-2", "gad-7", "gad-2", "dass-21", "pcl-5", "pc-ptsd-5", "itq",
    "mdq", "asrs v1.1", "aq (autism-spectrum quotient)", "mmpi-3", "wais",
    "audit", "assist", "sdq (strengths and difficulties questionnaire)",
    "whoqol-bref", "scid-5-cv", "strong interest inventory"
  ]) {
    assert.ok(names.has(expected), "missing requested instrument " + expected);
  }
});

test("every catalogue-only or permission-review record explicitly has no live questionnaire route", () => {
  for (const instrument of registry.instruments) {
    if (["catalogue-only", "permission-review", "restricted", "disabled"].includes(instrument.deployment_status)) {
      assert.equal(instrument.route ?? null, null, instrument.instrument_id + " must remain catalogue-only");
      assert.match(instrument.scoring_version, /not implemented|none|verify|unverified|permission|official|must be verified/i);
    }
  }
});

test("every permission-review entry exposes an official access or permissions route without cloning a test", () => {
  const gated = registry.instruments.filter((item) => item.deployment_status === "permission-review");
  assert.equal(gated.length, 31);
  for (const item of gated) {
    assert.equal(item.route ?? null, null, item.instrument_id + " must not be cloned as an Ozarbox form");
    assert.ok(item.access_url, item.instrument_id + " needs an official access or permission route");
    assert.ok(item.access_label, item.instrument_id + " needs a user-facing access label");
    assert.match(item.access_url, /^https:\/\//);
  }
});

test("registry makes clear that catalogue presence does not confer instrument rights or clinical validity", () => {
  assert.match(registry.purpose, /not evidence of clinical validity/i);
  assert.match(registry.purpose, /permission to reproduce content/i);
});

test("known rights-controlled public electronic forms remain disabled with official permissions sources", () => {
  const cases = [
    ["m-chat-r-f", /license agreement|required/i, "https:\/\/www.mchatscreen.com\/mchat-rf\/"],
    ["sdq-strengths-and-difficulties-questionnaire", /electronic versions require prior authorization|copyrighted/i, "https:\/\/www.sdqinfo.org\/"],
    ["who-5", /CC BY-NC-SA|non-commercial/i, "https:\/\/cdn.who.int\/media\/docs\/default-source\/mental-health\/who-5_english-original4da539d6ed4b49389e3afe47cda2326a.pdf"],
    ["bdi-ii", /proprietary|Qualification Level B|permission/i, "https:\/\/www.pearsonclinical.in\/products\/programs\/beck-depression-inventory.html"],
  ];
  for (const [id, rightsPattern, source] of cases) {
    const item = registry.instruments.find((instrument) => instrument.instrument_id === id);
    assert.ok(item, "missing rights-controlled instrument " + id);
    assert.equal(item.route ?? null, null);
    assert.equal(item.deployment_status, "permission-review");
    assert.match(item.content_rights, rightsPattern);
    assert.ok(item.evidence_sources.includes(source), id + " must link an official permissions source");
  }
});
