import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { BRIEF_ASSESSMENTS, BRIEF_RESPONSE_OPTIONS, getBriefAssessment, scoreBriefAssessment } from "../src/lib/brief-assessments.js";

const expectedItems = {
  "phq-2": [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
  ],
  "gad-2": [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
  ],
  "gad-7": [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen",
  ],
};

test("only the three separately identified brief screens are implemented in the shared engine", () => {
  assert.deepEqual(Object.keys(BRIEF_ASSESSMENTS).sort(), ["gad-2", "gad-7", "phq-2"]);
  for (const [id, items] of Object.entries(expectedItems)) {
    assert.equal(getBriefAssessment(id).id, id);
    assert.deepEqual(getBriefAssessment(id).items, items);
  }
});

test("response codes and labels preserve the four standard frequency choices", () => {
  assert.deepEqual(BRIEF_RESPONSE_OPTIONS.map(({ value, label }) => [value, label]), [
    [0, "Not at all"],
    [1, "Several days"],
    [2, "More than half the days"],
    [3, "Nearly every day"],
  ]);
  for (const instrument of Object.values(BRIEF_ASSESSMENTS)) {
    assert.equal(instrument.recallPeriod, "Past two weeks");
    assert.equal(instrument.instructions, "Over the last 2 weeks, how often have you been bothered by any of the following problems?");
  }
});

test("PHQ-2 minimum and maximum scores and positive threshold are exact", () => {
  assert.deepEqual(scoreBriefAssessment("phq-2", [0, 0]), {
    instrumentId: "phq-2", complete: true, missingItems: [], total: 0, maxScore: 6,
    interpretation: "Below common screening threshold", band: null, screenPositive: false, positiveThreshold: 3
  });
  assert.equal(scoreBriefAssessment("phq-2", [1, 1]).screenPositive, false);
  assert.equal(scoreBriefAssessment("phq-2", [1, 2]).screenPositive, true);
  const max = scoreBriefAssessment("phq-2", [3, 3]);
  assert.equal(max.total, 6);
  assert.equal(max.screenPositive, true);
});

test("GAD-2 minimum and maximum scores and positive threshold are exact", () => {
  assert.equal(scoreBriefAssessment("gad-2", [0, 0]).total, 0);
  assert.equal(scoreBriefAssessment("gad-2", [1, 1]).screenPositive, false);
  assert.equal(scoreBriefAssessment("gad-2", [1, 2]).screenPositive, true);
  assert.equal(scoreBriefAssessment("gad-2", [3, 3]).total, 6);
});

test("GAD-7 covers total-score boundaries and each published symptom band", () => {
  const cases = [
    [0, "Minimal symptom range", false],
    [4, "Minimal symptom range", false],
    [5, "Mild symptom range", false],
    [9, "Mild symptom range", false],
    [10, "Moderate symptom range", true],
    [14, "Moderate symptom range", true],
    [15, "Severe symptom range", true],
    [21, "Severe symptom range", true],
  ];
  for (const [total, band, positive] of cases) {
    const responses = Array(7).fill(0);
    let remainder = total;
    for (let i = 0; i < responses.length && remainder > 0; i += 1) {
      responses[i] = Math.min(3, remainder);
      remainder -= responses[i];
    }
    const result = scoreBriefAssessment("gad-7", responses);
    assert.equal(result.total, total, "expected total " + total);
    assert.equal(result.interpretation, band);
    assert.equal(result.screenPositive, positive);
  }
});

test("every missing-answer position prevents scoring without imputing or prorating", () => {
  for (const [id, count] of [["phq-2", 2], ["gad-2", 2], ["gad-7", 7]]) {
    for (let index = 0; index < count; index += 1) {
      const responses = Array(count).fill(1);
      responses[index] = null;
      const result = scoreBriefAssessment(id, responses);
      assert.equal(result.complete, false, id + " index " + index);
      assert.equal(result.total, null);
      assert.equal(result.interpretation, null);
      assert.deepEqual(result.missingItems, [index + 1]);
    }
  }
});

test("multiple missing answers are reported in ascending item order", () => {
  const result = scoreBriefAssessment("gad-7", [null, 1, null, 2, 0, null, 3]);
  assert.equal(result.complete, false);
  assert.deepEqual(result.missingItems, [1, 3, 6]);
  assert.equal(result.total, null);
});

test("malformed array sizes, unknown instruments and invalid response values are rejected", () => {
  assert.throws(() => scoreBriefAssessment("phq-2", [1]), TypeError);
  assert.throws(() => scoreBriefAssessment("gad-7", [1, 2]), TypeError);
  assert.throws(() => scoreBriefAssessment("not-real", [0]), RangeError);
  for (const invalid of [-1, 4, 1.1, "2", NaN, Infinity]) {
    assert.throws(() => scoreBriefAssessment("phq-2", [invalid, 0]), RangeError, "invalid value " + String(invalid));
  }
  assert.equal(scoreBriefAssessment("phq-2", ["", 0]).total, null);
});

test("GAD-7 daily-functioning follow-up is explicitly optional and excluded from scoring", () => {
  const instrument = getBriefAssessment("gad-7");
  assert.ok(instrument.functionalImpact);
  assert.equal(instrument.functionalImpact.options.length, 4);
  assert.match(instrument.functionalImpact.note, /not included in the GAD-7 score/i);
  assert.equal(scoreBriefAssessment("gad-7", [1, 1, 1, 0, 0, 0, 0]).total, 3);
});

test("screen interpretations make no diagnosis and disclose common threshold limitations", () => {
  for (const instrument of Object.values(BRIEF_ASSESSMENTS)) {
    assert.match(instrument.limitations, /not a diagnos/i);
    assert.match(instrument.limitations, /does not rule out|cannot establish/i);
    assert.ok(instrument.sources.length >= 1);
    assert.match(instrument.statusText, /not been independently clinically validated/i);
  }
});

test("assessment route uses native fieldsets, legends, labelled controls, validation and result focus", () => {
  const page = readFileSync(new URL("../src/pages/tools/assessments/[slug].astro", import.meta.url), "utf8");
  assert.match(page, /<fieldset class="question"/);
  assert.match(page, /<legend>/);
  assert.match(page, /type="radio"/);
  assert.match(page, /role="alert"/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /No score has been calculated/);
  assert.match(page, /resultsHeading\?\.focus\(\)/);
  assert.match(page, /Clear answers/);
  assert.match(page, /Exit assessment/);
  assert.match(page, /prefers-reduced-motion:reduce/);
  assert.match(page, /Print \/ Save as PDF/);
  assert.match(page, /does not use AI, send answers to an Ozarbox assessment endpoint/);
});

test("screen route file does not make network calls or write assessment responses to storage", () => {
  const page = readFileSync(new URL("../src/pages/tools/assessments/[slug].astro", import.meta.url), "utf8");
  assert.doesNotMatch(page, /fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|gtag\s*\(/i);
});
