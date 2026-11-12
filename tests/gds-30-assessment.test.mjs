import test from "node:test";
import assert from "node:assert/strict";
import { getPublicDomainAssessment, scorePublicDomainAssessment } from "../src/lib/public-domain-assessments.js";

const instrument = getPublicDomainAssessment("gds-30");

test("GDS-30 preserves all 30 source items, Yes/No options and scoring-key positions", () => {
  assert.equal(instrument.items.length, 30);
  assert.equal(instrument.scoringKeys.length, 30);
  assert.deepEqual(instrument.responseOptions.map(({ value, label }) => [value, label]), [["no", "No"], ["yes", "Yes"]]);
  assert.equal(instrument.recallPeriod, "Past week");
});

test("GDS-30 scoring key yields the full 30-point maximum", () => {
  const result = scorePublicDomainAssessment("gds-30", instrument.scoringKeys);
  assert.equal(result.total, 30);
  assert.equal(result.maxScore, 30);
  assert.equal(result.interpretation, "Severe depressive symptoms band (20–30)");
});

test("GDS-30 inverse scoring key yields zero and each source band boundary is exact", () => {
  const inverse = instrument.scoringKeys.map((value) => value === "yes" ? "no" : "yes");
  assert.equal(scorePublicDomainAssessment("gds-30", inverse).total, 0);
  for (const [score, band] of [
    [9, "Normal band (0–9)"],
    [10, "Mild depressive symptoms band (10–19)"],
    [19, "Mild depressive symptoms band (10–19)"],
    [20, "Severe depressive symptoms band (20–30)"],
  ]) {
    const responses = instrument.scoringKeys.map((value, index) => index < score ? value : (value === "yes" ? "no" : "yes"));
    const result = scorePublicDomainAssessment("gds-30", responses);
    assert.equal(result.total, score);
    assert.equal(result.interpretation, band);
  }
});

test("GDS-30 never imputes missing answers and rejects invalid response values", () => {
  for (let index = 0; index < 30; index += 1) {
    const responses = [...instrument.scoringKeys];
    responses[index] = null;
    const result = scorePublicDomainAssessment("gds-30", responses);
    assert.equal(result.complete, false);
    assert.equal(result.total, null);
    assert.deepEqual(result.missingItems, [index + 1]);
  }
  assert.throws(() => scorePublicDomainAssessment("gds-30", ["yes"]), TypeError);
  assert.throws(() => scorePublicDomainAssessment("gds-30", ["maybe", ...Array(29).fill("no")]), RangeError);
});

test("GDS-30 results are explicitly screening-only and cite the source instrument", () => {
  assert.match(instrument.limitations, /not a diagnostic instrument/i);
  assert.match(instrument.statusText, /not been independently clinically validated/i);
  assert.ok(instrument.sources.some((source) => source.includes("apa.org")));
});
