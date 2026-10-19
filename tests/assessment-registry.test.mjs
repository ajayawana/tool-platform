import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const registry = JSON.parse(readFileSync(new URL("../src/data/assessment-registry.json", import.meta.url), "utf8"));

test("registry schema has unique instrument IDs and required governance fields", () => {
  assert.equal(typeof registry.schema_version, "string");
  assert.ok(Array.isArray(registry.instruments) && registry.instruments.length >= 1);
  const ids = registry.instruments.map((item) => item.instrument_id);
  assert.equal(new Set(ids).size, ids.length, "instrument IDs must be unique");
  const required = ["instrument_id", "official_name", "version", "domain", "population", "administration_mode", "language", "license_status", "scoring_version", "evidence_sources", "safety_rules", "deployment_status"];
  for (const item of registry.instruments) {
    for (const key of required) assert.ok(Object.hasOwn(item, key), item.instrument_id + " missing " + key);
    assert.ok(registry.statuses.includes(item.deployment_status), "unknown state: " + item.deployment_status);
    assert.ok(Array.isArray(item.evidence_sources));
    assert.ok(Array.isArray(item.safety_rules));
    if (item.deployment_status !== "implemented-unvalidated") {
      assert.notEqual(item.license_status, "Verified for implementation");
    }
  }
});

test("only the existing PHQ-9 is marked implemented and it remains explicitly unvalidated", () => {
  const enabled = registry.instruments.filter((item) => item.deployment_status === "implemented-unvalidated");
  assert.deepEqual(enabled.map((item) => item.instrument_id), ["phq-9"]);
  assert.match(enabled[0].software_validation, /not been|outstanding|unvalidated/i);
});

test("new instrument placeholders remain blocked pending source and permission review", () => {
  for (const id of ["gad-7", "phq-2", "other-instruments-template"]) {
    const instrument = registry.instruments.find((item) => item.instrument_id === id);
    assert.ok(instrument, id + " registry entry exists");
    assert.ok(["implementation-pending-evidence", "disabled"].includes(instrument.deployment_status));
  }
});

test("registry does not imply that test catalogue metadata authorizes copyrighted content", () => {
  assert.match(registry.purpose, /not evidence of clinical validation or permission/i);
});
