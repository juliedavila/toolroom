import { install, sources, wireFixtureTools, verifyEdition } from "./ratchet-tools";
import { join } from "path";
import { rmSync, readFileSync, writeSync } from "fs";
const args = process.argv.slice(2);
// Each line goes straight to the output, so a log file shows every suite start and finish as it happens.
const say = (line: string) => { writeSync(1, line + "\n"); };
const suites = ["reference/run-profile-bundle-fixtures.ts","export/run-model-fixtures.ts","model/check-compositions.ts","model/check-adopter-compose.ts","model/check-source-patches.ts","model/layer-fixtures.ts","reference/run-pin-bundle-fixtures.ts","export/run-applier-fixtures.ts","export/run-unit-fixtures.ts","model/check-namespace-graphs.ts","export/run-impact-fixtures.ts","export/run-threat-grid-fixtures.ts","model/check-namespace-reports.ts","export/run-upgrade-fixtures.ts","reference/run-readiness-bundle-fixtures.ts","export/run-status-fixtures.ts","reference/run-adopter-regressions.ts","reference/run-kept-test-fixtures.ts","reference/run-expects-fixtures.ts"];
let failureNamed = false;
process.once("exit",code=>{if(code && code!==3 && !failureNamed)console.error("FAILED bundle-verifier: harness setup");});
const manifestOnly = args.length === 1 && args[0] === "--manifest-only";
const one = args.length === 2 && args[0] === "--suite" ? args[1] : undefined;
if (args.length && !manifestOnly && !one || one && !suites.includes(one)) { console.error("usage: --manifest-only | --suite <suite path>"); process.exit(2); }
const edition = verifyEdition(import.meta.dir);
say("Ratchet " + edition.version + "; manifest " + edition.digest);
if (manifestOnly) process.exit(0);
const root = install(sources, import.meta.dir);
const runtime = install(sources, import.meta.dir);
// Both temporary trees go when the verifier ends, however it ends.
const cleanup = () => { rmSync(root, { recursive: true, force: true }); rmSync(runtime, { recursive: true, force: true }); };
process.once("exit", cleanup);
for (const signal of ["SIGINT", "SIGTERM"] as const) process.once(signal, () => { cleanup(); process.exit(130); });
const { orderedPool } = await import(join(root, "parallel.ts"));
const { failureLine } = await import(join(root, "suite-failures.ts"));
const { suiteEvidence, readSuiteGreen, writeSuiteGreen } = await import(join(root, "bundle-cache.ts"));
const cacheDir = one ? undefined : process.env.RATCHET_SUITE_CACHE;
const verifier = readFileSync(import.meta.path, "utf8");
try {
  wireFixtureTools(root, import.meta.dir);
  const results = await orderedPool(one ? [one] : suites, async (suite: string) => {
    const key = suiteEvidence(suite, sources, import.meta.dir, verifier);
    const green = readSuiteGreen(cacheDir, suite, key);
    if (green) { say(suite + ": cached (" + key.slice(0, 12) + ")"); return { ...green, suite, cached: true, ms: 0, key }; }
    if (!one && process.env.RATCHET_PIPELINE_FAST === "1") { say(suite + ": deferred (acceptance; run without --fast)"); return { suite, out: "", err: "", code: 3, ms: 0, deferred: true, key }; }
    say("Starting " + suite);
    const started = performance.now();
    const p = Bun.spawn([process.execPath, join(root, suite)], { cwd: join(root, "export"), stdout: "pipe", stderr: "pipe", env: { ...process.env, RATCHET_JOBS: "1", RATCHET_BUNDLE_FIXTURES: "1", RATCHET_TOOLS_FIXTURE_RUNTIME: runtime } });
    const [out, err, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
    const row = { suite, out, err, code, ms: Math.round(performance.now() - started), key };
    if (code === 0) { writeSuiteGreen(cacheDir, suite, key, row); say(suite.split("/").at(-1) + ": " + (err.trim().split("\n").at(-1) || out.trim().split("\n").at(-1))); }
    say((code === 0 ? "Passed " : "Failed ") + suite + " (" + row.ms + " ms)");
    return row;
  });
  let failed = false, deferred = false;
  // A failed suite's full output follows the live lines, in suite order.
  for (const r of results) {
    if (r.cached) continue;
    if (r.deferred) { deferred = true; continue; }
    if (r.code !== 0) { say("Output of " + r.suite + ":"); writeSync(1, r.out); writeSync(2, r.err); failed = true; }
  }
  for (const r of results) if (r.code !== 0 && !r.deferred) { failureNamed=true; console.error(failureLine(r.suite,r.out,r.err)); }
  if (failed) process.exitCode = 1;
  else if (deferred) process.exitCode = 3;
  else say("All bundled tools passed their edition fixtures.");
} finally { cleanup(); }
