import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../src/pages/tools/phq-9.astro", import.meta.url), "utf8");

test("all nine instrument items are rendered from the single canonical item list", () => {
  assert.match(page, /PHQ9_ITEMS\.map/);
  assert.match(page, /Over the last 2 weeks, how often have you been bothered by any of the following problems\?/);
  assert.match(page, /PHQ9_RESPONSE_OPTIONS\.map/);
  assert.match(page, /Not difficult at all/);
  assert.match(page, /Somewhat difficult/);
  assert.match(page, /Very difficult/);
  assert.match(page, /Extremely difficult/);
});

test("questions use native fieldsets, legends, labelled radio inputs, and keyboard-friendly controls", () => {
  assert.match(page, /<fieldset class="question"/);
  assert.match(page, /<legend>/);
  assert.match(page, /type="radio"/);
  assert.match(page, /for=\{'q' \+ \(index \+ 1\) \+ '-' \+ option\.value\}/);
  assert.match(page, /aria-label=\{'Item ' \+ \(index \+ 1\) \+ ' response'\}/);
  assert.match(page, /id="validation-message" class="validation-message" role="alert" tabindex="-1"/);
});

test("progress, results, and safety messages expose live status to assistive technology", () => {
  assert.match(page, /role="progressbar"/);
  assert.match(page, /aria-valuenow="0"/);
  assert.match(page, /role="status" aria-live="polite"/);
  assert.match(page, /role="alert" aria-live="assertive"/);
  assert.match(page, /id="safety-section"/);
});

test("layout includes mobile breakpoints, visible focus treatment, and reduced-motion support", () => {
  assert.match(page, /@media\(max-width:760px\)/);
  assert.match(page, /@media\(max-width:420px\)/);
  assert.match(page, /:focus-within/);
  assert.match(page, /prefers-reduced-motion:reduce/);
});

test("privacy and consent disclosures are present and no user identity fields are requested", () => {
  assert.match(page, /not sent to an Ozarbox server/);
  assert.match(page, /I understand and consent to saving this minimal PHQ-9 score history on this device/);
  assert.match(page, /No name, email, account, or contact details are requested/);
  assert.match(page, /localStorage/);
});

test("item 9 safety follow-up is visible even when another core item is unanswered", () => {
  const incompleteBranch = page.slice(
    page.indexOf("if (!result.complete)"),
    page.indexOf("const scoreTotal = Number(result.total)")
  );
  assert.match(incompleteBranch, /if \(item9Positive\)/);
  assert.match(incompleteBranch, /resultPanel\.hidden = false/);
  assert.match(incompleteBranch, /safetySection\.hidden = false/);
  assert.match(incompleteBranch, /#results-heading').textContent = 'Safety follow-up'/);
  assert.match(incompleteBranch, /\.score-summary').hidden = true/);
});

test("official source attribution, limitations, and India support references are visible", () => {
  assert.match(page, /Kroenke K, Spitzer RL, Williams JBW/);
  assert.match(page, /not been clinically validated/);
  assert.match(page, /112\.gov\.in/);
  assert.match(page, /14416/);
});

test("positive item 9 reveals safety follow-up before incomplete-answer validation returns", () => {
  const submitIndex = page.indexOf("form.addEventListener('submit'");
  const item9Index = page.indexOf("const item9Positive = item9Response !== null && item9Response > 0;", submitIndex);
  const incompleteIndex = page.indexOf("if (!result.complete)", submitIndex);
  const safetyBranchIndex = page.indexOf("if (item9Positive)", incompleteIndex);
  assert.ok(item9Index >= submitIndex && item9Index < incompleteIndex, "item 9 must be checked before incomplete-answer handling");
  assert.ok(safetyBranchIndex > incompleteIndex, "incomplete answers must still show safety follow-up for positive item 9");
  assert.match(page, /No total has been calculated/);
});

test("privacy policy does not claim to store item 9 status", () => {
  const privacy = readFileSync(new URL("../src/pages/privacy.astro", import.meta.url), "utf8");
  assert.match(privacy, /date, total score, and severity band/);
  assert.doesNotMatch(privacy, /whether item 9 was positive/);
});

test("positive item 9 reveals safety support immediately and handles the safety answer without requiring a total", () => {
  assert.match(page, /const item9Positive = responses\[8\] !== null && responses\[8\] > 0;\s+safetySection\.hidden = !item9Positive;/);
  assert.match(page, /const item9Score = getResponses\(\)\[8\];\s+if \(item9Score === null \|\| item9Score <= 0\) return;/);
  assert.doesNotMatch(page, /if \(!currentResult \|\| !currentResult\.requiresSafetyFollowUp\) return;/);
});

test("item-9 safety follow-up is outside hidden results so it can appear with incomplete answers", () => {
  const resultsStart = page.indexOf('<section id="results"');
  const resultsEnd = page.indexOf('    </section>\n\n    <section id="safety-section"');
  const safetyStart = page.indexOf('<section id="safety-section"');
  assert.ok(resultsStart >= 0, "results section exists");
  assert.ok(resultsEnd > resultsStart, "results section closes before the safety follow-up");
  assert.ok(safetyStart > resultsEnd, "safety follow-up is separate from the results visibility state");
  assert.match(page, /const item9Positive = responses\[8\] !== null && responses\[8\] > 0;\s*safetySection\.hidden = !item9Positive;/);
  assert.match(page, /if \(result\.requiresSafetyFollowUp\) \{\s*safetySection\.scrollIntoView/);
});

test("positive item 9 clearly states the limits of the web safety prompt for clinical use", () => {
  assert.match(page, /PHQ-9 item 9 alone is not a complete suicide-risk assessment/);
  assert.match(page, /This website does not alert a clinician, monitor responses, or provide a validated suicide-risk assessment/);
  assert.match(page, /tell the clinician or staff member now/);
  assert.match(page, /Answering “No” does not establish that you are safe or rule out suicide risk/);
  assert.match(page, /A “No” answer does not establish that you are safe or complete a risk assessment/);
});
