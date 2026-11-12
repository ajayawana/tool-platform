import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync(new URL("../src/pages/wellbeing/index.astro", import.meta.url), "utf8");
const home = readFileSync(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../src/pages/sitemap.xml.ts", import.meta.url), "utf8");
const registry = JSON.parse(readFileSync(new URL("../src/data/assessment-registry.json", import.meta.url), "utf8"));

test("wellbeing activities are linked from the homepage and sitemap", () => {
  assert.match(home, /wellbeing-activities/);
  assert.match(home, /wellbeing\//);
  assert.match(sitemap, /'\/wellbeing\//);
});

test("wellbeing page includes the five original guided worksheets and privacy/safety boundaries", () => {
  for (const phrase of ["Reduce repeated reassurance-seeking", "Small-step activity planner", "Grounding and present-moment reset", "Personal 5P reflection map", "Support and next-step plan", "does not receive or monitor", "does not assess suicide risk"]) {
    assert.ok(page.includes(phrase), "Missing page content: " + phrase);
  }
});

test("requested additional measures are catalogued without falsely claiming they are live", () => {
  const expected = ["epds", "stai", "asi-16", "pdss-sr", "adis-iv", "scaared", "wsas", "whodas-2-0"];
  for (const id of expected) {
    const item = registry.instruments.find((entry) => entry.instrument_id === id);
    assert.ok(item, "Missing catalogue entry: " + id);
    assert.equal(item.route, null);
    assert.ok(["catalogue-only", "permission-review", "restricted"].includes(item.deployment_status));
  }
});
