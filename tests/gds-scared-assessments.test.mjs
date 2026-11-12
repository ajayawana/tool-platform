import test from "node:test";
import assert from "node:assert/strict";
import { PUBLIC_DOMAIN_ASSESSMENTS, scorePublicDomainAssessment } from "../src/lib/public-domain-assessments.js";

test("GDS-15 and GDS-30 expose the exact item counts and yes/no response options", () => {
  assert.equal(PUBLIC_DOMAIN_ASSESSMENTS["gds-15"].items.length, 15);
  assert.equal(PUBLIC_DOMAIN_ASSESSMENTS["gds-30"].items.length, 30);
  for (const id of ["gds-15", "gds-30"]) {
    const spec = PUBLIC_DOMAIN_ASSESSMENTS[id];
    const result = scorePublicDomainAssessment(id, spec.items.map((_, i) => spec.depressionKeys.includes(i + 1) ? "no" : "yes"));
    assert.equal(result.complete, true);
    assert.equal(result.total, 0);
  }
});

test("GDS-15 counts only source-keyed depression responses", () => {
  const spec = PUBLIC_DOMAIN_ASSESSMENTS["gds-15"];
  const answers = spec.items.map((_, i) => spec.depressionKeys.includes(i + 1) ? "no" : "yes");
  answers[1] = "yes";
  answers[2] = "yes";
  answers[3] = "yes";
  answers[5] = "yes";
  answers[7] = "yes";
  answers[8] = "yes";
  assert.equal(scorePublicDomainAssessment("gds-15", answers).total, 6);
  assert.equal(scorePublicDomainAssessment("gds-15", answers).screenPositive, true);
});

test("SCARED parent report has 41 items and deterministic total scoring", () => {
  const spec = PUBLIC_DOMAIN_ASSESSMENTS.scared;
  assert.equal(spec.items.length, 41);
  assert.equal(scorePublicDomainAssessment("scared", Array(41).fill(0)).total, 0);
  const high = scorePublicDomainAssessment("scared", Array(41).fill(1));
  assert.equal(high.total, 41);
  assert.equal(high.screenPositive, true);
  assert.equal(high.maxScore, 82);
});

test("GDS and SCARED reject incomplete and out-of-range responses", () => {
  assert.equal(scorePublicDomainAssessment("gds-15", Array(14).fill("no")).complete, false);
  assert.equal(scorePublicDomainAssessment("scared", Array(40).fill(0)).complete, false);
  assert.equal(scorePublicDomainAssessment("scared", [3, ...Array(40).fill(0)]).complete, false);
});
