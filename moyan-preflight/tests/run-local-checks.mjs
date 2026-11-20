// Local verification for the deterministic layer + prompt builder.
// Run: node tests/run-local-checks.mjs
import assert from "node:assert/strict";
import { runLocalChecks } from "../js/local-checks.js";
import { buildAuditPrompt } from "../js/hybrid-engine.js";
import { SAMPLES } from "../js/samples.js";

let failures = 0;
for (const sample of SAMPLES) {
  const result = runLocalChecks(sample.spec);
  try {
    assert.equal(result.verdict, sample.expected, `${sample.id} verdict`);
    console.log(
      `PASS ${sample.id}: verdict=${result.verdict} score=${result.score} rating=${result.rating} findings=[${result.findings.map((f) => f.id).join(", ")}]`
    );
  } catch (err) {
    failures++;
    console.log(
      `FAIL ${sample.id}: expected ${sample.expected}, got ${result.verdict} (score=${result.score}, findings=[${result.findings.map((f) => f.id).join(", ")}])`
    );
  }
  const prompt = buildAuditPrompt(sample.spec, result);
  assert.ok(prompt.includes(result.verdict), "prompt carries the verdict");
  assert.ok(prompt.length > sample.spec.length, "prompt wraps the spec");
}

// Empty / junk input must not crash and must not pass as READY.
const empty = runLocalChecks("");
assert.notEqual(empty.verdict, "READY");
console.log(`PASS empty-input: verdict=${empty.verdict} score=${empty.score}`);

if (failures) {
  console.error(`${failures} sample(s) failed`);
  process.exit(1);
}
console.log("All local checks passed.");
