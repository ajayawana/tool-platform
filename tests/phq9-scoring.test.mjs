import test from "node:test";
import assert from "node:assert/strict";
import { scorePhq9, getSafetyFollowUp, PHQ9_ITEMS, PHQ9_RESPONSE_OPTIONS } from "../src/lib/phq9-scoring.js";

test("official English item wording and response options remain unchanged", () => {
  assert.deepEqual(PHQ9_ITEMS, [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead or of hurting yourself in some way",
  ]);
  assert.deepEqual(PHQ9_RESPONSE_OPTIONS, [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
  ]);
});

const withTotal = (total) => {
  assert.ok(total >= 0 && total <= 27);
  const values = Array(9).fill(0);
  let remaining = total;
  for (let i = 0; i < values.length && remaining > 0; i += 1) {
    values[i] = Math.min(3, remaining);
    remaining -= values[i];
  }
  assert.equal(remaining, 0);
  return values;
};

test("all published severity-band boundaries are classified correctly", () => {
  const cases = [
    [0, "Minimal"], [4, "Minimal"],
    [5, "Mild"], [9, "Mild"],
    [10, "Moderate"], [14, "Moderate"],
    [15, "Moderately severe"], [19, "Moderately severe"],
    [20, "Severe"], [27, "Severe"],
  ];
  for (const [total, severity] of cases) {
    const result = scorePhq9(withTotal(total));
    assert.equal(result.complete, true, "score " + total + " should be complete");
    assert.equal(result.total, total);
    assert.equal(result.severity, severity);
  }
});

test("maximum score is 27 and minimum score is 0", () => {
  assert.equal(scorePhq9(Array(9).fill(0)).total, 0);
  assert.equal(scorePhq9(Array(9).fill(3)).total, 27);
});

test("every missing item prevents scoring and identifies the item number", () => {
  for (let index = 0; index < 9; index += 1) {
    const responses = Array(9).fill(0);
    responses[index] = null;
    const result = scorePhq9(responses);
    assert.equal(result.complete, false);
    assert.equal(result.total, null);
    assert.deepEqual(result.missingItems, [index + 1]);
  }
});

test("multiple missing items are reported together without prorating", () => {
  const result = scorePhq9([0, null, 1, undefined, 3, "", 0, 0, 0]);
  assert.equal(result.complete, false);
  assert.equal(result.total, null);
  assert.deepEqual(result.missingItems, [2, 4, 6]);
});

test("rejects wrong response count and invalid response values", () => {
  assert.throws(() => scorePhq9([0, 1]), TypeError);
  assert.throws(() => scorePhq9(Array(10).fill(0)), TypeError);
  for (const invalid of [-1, 4, 1.5, "2", NaN]) {
    const responses = Array(9).fill(0);
    responses[0] = invalid;
    assert.throws(() => scorePhq9(responses), RangeError);
  }
});

test("item 9 positive response triggers follow-up even with total score 1", () => {
  const result = scorePhq9([0, 0, 0, 0, 0, 0, 0, 0, 1]);
  assert.equal(result.total, 1);
  assert.equal(result.requiresSafetyFollowUp, true);
  assert.equal(result.item9Positive, true);
});

test("item 9 zero does not trigger the extra safety branch", () => {
  const result = scorePhq9([3, 3, 3, 3, 3, 3, 3, 3, 0]);
  assert.equal(result.total, 24);
  assert.equal(result.requiresSafetyFollowUp, false);
  assert.deepEqual(getSafetyFollowUp(0, "yes"), { required: false, status: "not-triggered" });
});

test("safety follow-up covers pending, urgent, and prompt-support paths", () => {
  assert.deepEqual(getSafetyFollowUp(1, null), { required: true, status: "pending" });
  assert.deepEqual(getSafetyFollowUp(2, "yes"), { required: true, status: "urgent" });
  assert.deepEqual(getSafetyFollowUp(1, "unsure"), { required: true, status: "urgent" });
  assert.deepEqual(getSafetyFollowUp(3, "no"), { required: true, status: "prompt-support" });
});

test("safety follow-up rejects invalid item 9 values and answers", () => {
  assert.throws(() => getSafetyFollowUp(4, "yes"), RangeError);
  assert.throws(() => getSafetyFollowUp(1, "maybe"), TypeError);
});

test("safety branch is independent of the total severity band", () => {
  const low = scorePhq9([0, 0, 0, 0, 0, 0, 0, 0, 1]);
  const high = scorePhq9([3, 3, 3, 3, 3, 3, 3, 3, 1]);
  assert.equal(low.severity, "Minimal");
  assert.equal(high.severity, "Severe");
  assert.equal(low.requiresSafetyFollowUp, true);
  assert.equal(high.requiresSafetyFollowUp, true);
});
