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

test("official source attribution, limitations, and India support references are visible", () => {
  assert.match(page, /Kroenke K, Spitzer RL, Williams JBW/);
  assert.match(page, /not been clinically validated/);
  assert.match(page, /112\.gov\.in/);
  assert.match(page, /14416/);
});
