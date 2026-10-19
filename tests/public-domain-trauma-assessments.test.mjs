import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  PUBLIC_DOMAIN_ASSESSMENTS,
  getPublicDomainAssessment,
  LEC5_RESPONSE_OPTIONS,
  scorePublicDomainAssessment
} from "../src/lib/public-domain-assessments.js";

test("public-domain PTSD module registry includes the three separately governed VA measures", () => {
  assert.deepEqual(Object.keys(PUBLIC_DOMAIN_ASSESSMENTS).sort(), ["lec-5", "pcl-5", "pc-ptsd-5"]);
  assert.equal(getPublicDomainAssessment("pcl-5").items.length, 20);
  assert.equal(getPublicDomainAssessment("pc-ptsd-5").items.length, 5);
  assert.equal(getPublicDomainAssessment("lec-5").events.length, 17);
  for (const instrument of Object.values(PUBLIC_DOMAIN_ASSESSMENTS)) {
    assert.match(instrument.audienceNotice, /qualified health professionals and researchers/i);
    assert.match(instrument.limitations, /not a diagnosis|does not measure|not.*diagnos/i);
    assert.ok(instrument.sources.some((source) => source.includes("ptsd.va.gov")));
  }
});

test("PCL-5 official response labels and item wording match the 20-item past-month form", () => {
  const pcl = getPublicDomainAssessment("pcl-5");
  assert.deepEqual(pcl.responseOptions.map((option) => [option.value, option.label]), [
    [0, "Not at all"], [1, "A little bit"], [2, "Moderately"], [3, "Quite a bit"], [4, "Extremely"]
  ]);
  assert.equal(pcl.recallPeriod, "Past month");
  assert.match(pcl.items[0], /^Repeated, disturbing, and unwanted memories/);
  assert.match(pcl.items[19], /^Trouble falling or staying asleep/);
});

test("PCL-5 total and cluster sums are deterministic at score boundaries and cutoff interpretation", () => {
  const byScore = (total) => {
    const out = Array(20).fill(0);
    let remaining = total;
    for (let i = 0; i < out.length && remaining > 0; i += 1) {
      out[i] = Math.min(4, remaining);
      remaining -= out[i];
    }
    return out;
  };
  for (const total of [0, 1, 30, 31, 32, 33, 34, 79, 80]) {
    const result = scorePublicDomainAssessment("pcl-5", byScore(total));
    assert.equal(result.complete, true);
    assert.equal(result.total, total);
    assert.equal(result.maxScore, 80);
  }
  assert.equal(scorePublicDomainAssessment("pcl-5", byScore(30)).interpretation, "Below the commonly cited 31–33 cutoff range");
  assert.equal(scorePublicDomainAssessment("pcl-5", byScore(31)).interpretation, "Within a commonly cited 31–33 cutoff range");
  assert.equal(scorePublicDomainAssessment("pcl-5", byScore(33)).interpretation, "Within a commonly cited 31–33 cutoff range");
  assert.equal(scorePublicDomainAssessment("pcl-5", byScore(34)).interpretation, "Above the commonly cited 31–33 cutoff range");
  const allMax = scorePublicDomainAssessment("pcl-5", Array(20).fill(4));
  assert.deepEqual(allMax.clusters, { B: 20, C: 8, D: 28, E: 24 });
});

test("every missing PCL-5 item prevents a total from being calculated", () => {
  for (let index = 0; index < 20; index += 1) {
    const responses = Array(20).fill(1);
    responses[index] = null;
    const result = scorePublicDomainAssessment("pcl-5", responses);
    assert.equal(result.complete, false);
    assert.equal(result.total, null);
    assert.deepEqual(result.missingItems, [index + 1]);
  }
});

test("PCL-5 rejects malformed lengths, non-integers and values outside 0–4", () => {
  assert.throws(() => scorePublicDomainAssessment("pcl-5", [1]), TypeError);
  for (const invalid of [-1, 5, 1.5, "3", NaN, Infinity]) {
    assert.throws(() => scorePublicDomainAssessment("pcl-5", [invalid, ...Array(19).fill(0)]), RangeError);
  }
});

test("PC-PTSD-5 obeys the required no-exposure stop branch and produces no symptom score", () => {
  const result = scorePublicDomainAssessment("pc-ptsd-5", ["no", null, null, null, null, null]);
  assert.equal(result.complete, true);
  assert.equal(result.exposure, "no");
  assert.equal(result.total, 0);
  assert.equal(result.screenPositive, false);
  assert.deepEqual(result.symptomResponses, []);
});

test("PC-PTSD-5 requires all five symptom answers only after exposure is endorsed", () => {
  const missingExposure = scorePublicDomainAssessment("pc-ptsd-5", [null, null, null, null, null, null]);
  assert.equal(missingExposure.complete, false);
  assert.deepEqual(missingExposure.missingItems, [1]);

  const missingSymptoms = scorePublicDomainAssessment("pc-ptsd-5", ["yes", "yes", null, "no", "yes", "no"]);
  assert.equal(missingSymptoms.complete, false);
  assert.equal(missingSymptoms.total, null);
  assert.deepEqual(missingSymptoms.missingItems, [3]);

  const positive = scorePublicDomainAssessment("pc-ptsd-5", ["yes", "yes", "yes", "yes", "no", "no"]);
  assert.equal(positive.total, 3);
  assert.equal(positive.screenPositive, false);
  const atThreshold = scorePublicDomainAssessment("pc-ptsd-5", ["yes", "yes", "yes", "yes", "yes", "no"]);
  assert.equal(atThreshold.total, 4);
  assert.equal(atThreshold.screenPositive, true);
  const max = scorePublicDomainAssessment("pc-ptsd-5", ["yes", "yes", "yes", "yes", "yes", "yes"]);
  assert.equal(max.total, 5);
});

test("PC-PTSD-5 rejects malformed arrays and invalid yes/no values", () => {
  assert.throws(() => scorePublicDomainAssessment("pc-ptsd-5", ["yes"]), TypeError);
  assert.throws(() => scorePublicDomainAssessment("pc-ptsd-5", ["maybe", "no", "no", "no", "no", "no"]), TypeError);
  assert.throws(() => scorePublicDomainAssessment("pc-ptsd-5", ["yes", "maybe", "no", "no", "no", "no"]), TypeError);
});

test("LEC-5 is a 17-event exposure inventory with no total score", () => {
  const result = scorePublicDomainAssessment("lec-5", Array.from({ length: 17 }, () => ["doesnt-apply"]));
  assert.equal(result.complete, true);
  assert.equal(result.total, null);
  assert.match(result.interpretation, /no total score/i);
  assert.equal(result.summary.length, 17);
  assert.deepEqual(result.summary[0], { event: getPublicDomainAssessment("lec-5").events[0], responses: ["Doesn't apply"] });
});

test("LEC-5 requires a response for each event but does not impute or score answers", () => {
  for (let index = 0; index < 17; index += 1) {
    const responses = Array.from({ length: 17 }, () => ["doesnt-apply"]);
    responses[index] = [];
    const result = scorePublicDomainAssessment("lec-5", responses);
    assert.equal(result.complete, false);
    assert.equal(result.total, null);
    assert.deepEqual(result.missingItems, [index + 1]);
  }
});

test("LEC-5 rejects invalid options, duplicates and contradictory exclusive choices", () => {
  assert.throws(() => scorePublicDomainAssessment("lec-5", [["bad"], ...Array.from({ length: 16 }, () => ["doesnt-apply"])]), RangeError);
  assert.throws(() => scorePublicDomainAssessment("lec-5", [["personal", "personal"], ...Array.from({ length: 16 }, () => ["doesnt-apply"])]), RangeError);
  assert.throws(() => scorePublicDomainAssessment("lec-5", [["doesnt-apply", "personal"], ...Array.from({ length: 16 }, () => ["doesnt-apply"])]), RangeError);
  assert.throws(() => scorePublicDomainAssessment("lec-5", [["unsure", "witnessed"], ...Array.from({ length: 16 }, () => ["doesnt-apply"])]), RangeError);
  assert.equal(LEC5_RESPONSE_OPTIONS.length, 6);
});

test("assessment route supports conditional branching, sensitive-content exit, focus, print and reduced motion", () => {
  const page = readFileSync(new URL("../src/pages/tools/assessments/[slug].astro", import.meta.url), "utf8");
  assert.match(page, /symptom-questions/);
  assert.match(page, /The official instructions say to stop here/);
  assert.match(page, /exposure-checklist/);
  assert.match(page, /No total score or severity band is defined/);
  assert.match(page, /You can skip any item, pause or exit/);
  assert.match(page, /resultsHeading\?\.focus\(\)/);
  assert.match(page, /Exit assessment/);
  assert.match(page, /Print \/ Save as PDF/);
  assert.match(page, /prefers-reduced-motion:reduce/);
  assert.doesNotMatch(page, /fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|gtag\s*\(/i);
});
