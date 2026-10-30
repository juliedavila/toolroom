import { install, sources, wireFixtureTools, verifyEdition } from "./ratchet-tools";
import { join } from "path";
import { rmSync, readFileSync } from "fs";
const args = process.argv.slice(2);
const suites = ["reference/run-profile-bundle-fixtures.ts","export/run-model-fixtures.ts","model/check-compositions.ts","model/check-adopter-compose.ts","model/check-source-patches.ts","model/layer-fixtures.ts","reference/run-pin-bundle-fixtures.ts","export/run-applier-fixtures.ts","export/run-unit-fixtures.ts","model/check-namespace-graphs.ts","export/run-impact-fixtures.ts","export/run-threat-grid-fixtures.ts","model/check-namespace-reports.ts","export/run-upgrade-fixtures.ts","reference/run-readiness-bundle-fixtures.ts","export/run-status-fixtures.ts","reference/run-adopter-regressions.ts","reference/run-kept-test-fixtures.ts","reference/run-expects-fixtures.ts"];
let failureNamed = false;
process.once("exit",code=>{if(code && code!==3 && !failureNamed)console.error("FAILED bundle-verifier: harness setup");});
const manifestOnly = args.length === 1 && args[0] === "--manifest-only";
const one = args.length === 2 && args[0] === "--suite" ? args[1] : undefined;
if (args.length && !manifestOnly && !one || one && !suites.includes(one)) { console.error("usage: --manifest-only | --suite <suite path>"); process.exit(2); }
const edition = verifyEdition(import.meta.dir);
console.log("Ratchet " + edition.version + "; manifest " + edition.digest);
if (manifestOnly) process.exit(0);
const root = install(sources, import.meta.dir);
const runtime = install(sources, import.meta.dir);
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
    if (green) return { ...green, suite, cached: true, ms: 0, key };
    if (!one && process.env.RATCHET_PIPELINE_FAST === "1") return { suite, out: "", err: "", code: 3, ms: 0, deferred: true, key };
    const started = performance.now();
    const p = Bun.spawn([process.execPath, join(root, suite)], { cwd: join(root, "export"), stdout: "pipe", stderr: "pipe", env: { ...process.env, RATCHET_JOBS: "1", RATCHET_BUNDLE_FIXTURES: "1", RATCHET_TOOLS_FIXTURE_RUNTIME: runtime } });
    const [out, err, code] = await Promise.all([new Response(p.stdout).text(), new Response(p.stderr).text(), p.exited]);
    const row = { suite, out, err, code, ms: Math.round(performance.now() - started), key };
    if (code === 0) writeSuiteGreen(cacheDir, suite, key, row);
    return row;
  });
  let failed = false, deferred = false;
  for (const r of results) {
    if (r.cached) { console.log(r.suite + ": cached (" + r.key.slice(0, 12) + ")"); continue; }
    if (r.deferred) { console.log(r.suite + ": deferred (acceptance; run without --fast)"); deferred = true; continue; }
    console.log("Starting " + r.suite);
    if (r.code !== 0) { process.stdout.write(r.out); process.stderr.write(r.err); failed = true; }
    else console.log(r.suite.split("/").at(-1) + ": " + (r.err.trim().split("\n").at(-1) || r.out.trim().split("\n").at(-1)));
    console.log((r.code === 0 ? "Passed " : "Failed ") + r.suite + " (" + r.ms + " ms)");
  }
  for (const r of results) if (r.code !== 0 && !r.deferred) { failureNamed=true; console.error(failureLine(r.suite,r.out,r.err)); }
  if (failed) process.exitCode = 1;
  else if (deferred) process.exitCode = 3;
  else console.log("All bundled tools passed their edition fixtures.");
} finally { rmSync(root, { recursive: true, force: true }); rmSync(runtime, { recursive: true, force: true }); }
