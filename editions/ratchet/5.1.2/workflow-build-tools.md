# Verify and run the tools

Use this edition's ratchet-tools bundle for its shipped tools and expects helper. It runs on Bun and needs no npm packages. Verify the edition and pass every bundled fixture before relying on a result.

The specifications and fixtures remain the design the bundle is built from. Each specification defines the tool's inputs, outputs, behavior, errors and acceptance cases. An organization may build a homegrown tool from that design. A homegrown build carries no compatibility promise. Prove it against every fixture of the edition in use before any decision depends on it.

## Verify the bundle

Keep the complete edition together in `upstream/`. From the organization workspace root, run:

```sh
bun upstream/ratchet-tools-verify.ts
```

The verifier checks every edition file against `edition.yaml`, including every executable and the shared tool payload. It runs the tools and expects helper against their own edition's fixtures, including namespace, composition, frozen-pin and profile cases. Any changed file, unreadable fixture, unexpected result or failing fixture ends the command with a nonzero exit. The edition build runs the same command from a separate copy of the finished edition. A release requires it to pass.

The commands expand their bundled TypeScript into private temporary storage. Bun supplies the runtime and built-in libraries. No package installation or network access is needed. Fixture outputs stay in temporary storage. The verifier leaves the edition and organization layer unchanged.

Record the edition version, manifest digest, Bun version, verification command and result in `org/CHANGELOG.md`. A fixture pass proves the bundle against that edition. Run the relevant checks on the organization's actual inputs before accepting a patch, promoting an upgrade or starting a phase.

## Run the bundle

Every command below runs from the organization workspace root. Input and output paths resolve from that root. Keep the executable entries beside `ratchet-tools.ts` and the edition data.

| Tool | Entry | Design |
|---|---|---|
| Composer | `ratchet-tools-composer.ts` | `spec-compose.md` |
| Patch applier | `ratchet-tools-patch-applier.ts` | `spec-patch-applier.md` |
| Model checks | `ratchet-tools-model-checks.ts` | `spec-model-checks.md` |
| Profile checker | `ratchet-tools-profile-checker.ts` | `spec-profile-checker.md` |
| Impact report | `ratchet-tools-impact-report.ts` | `spec-impact-report.md` |
| Unit graph | `ratchet-tools-unit-graph.ts` | `spec-unit-graph.md` |
| Upgrade | `ratchet-tools-upgrade.ts` | `spec-upgrade.md` |
| Threat grid | `ratchet-tools-threat-grid.ts` | `spec-threat-grid.md` |
| Readiness | `ratchet-tools-readiness.ts` | `spec-readiness.md` |
| Status report | `ratchet-tools-status-report.ts` | `spec-status-report.md` |
| Expects hash helper | `ratchet-tools-expects.ts` | `spec-patch-applier.md`, Declaring what a modify replaces |

Apply accepted patches into a separate build folder, then compose the result:

```sh
bun upstream/ratchet-tools-patch-applier.ts --model upstream/model.yaml --layer upstream --shared upstream/seams.yaml --shared-out build/seams.yaml --org org/org.yaml --org-out build/org.yaml --patches org/patches --version-record org/version.yaml --out build/model.yaml --layer-out build/layer --report build/apply-report.json
bun upstream/ratchet-tools-composer.ts --model build/model.yaml --layer build/layer --shared build/seams.yaml --units upstream/units.yaml --out build/compositions --mode all
```

The composer produces `full`, `ratchet`, `core` and `jig` folders. Check each composition with its own model, complete layer folder, shipped comparison and organization exceptions. For example:

```sh
bun upstream/ratchet-tools-model-checks.ts --model build/compositions/full/model.yaml --layer build/compositions/full/layer --shipped build/base/compositions/full/model.yaml --org build/org.yaml --json
bun upstream/ratchet-tools-model-checks.ts pin --edition upstream --out build/pinned
bun upstream/ratchet-tools-profile-checker.ts org/profile.yaml --today 2026-12-01 --mode progressive
```

The model-check entry runs structural lint, design checks and overlay checks and returns one JSON object. It requires an explicit shipped comparison so judged-set losses remain errors. For a lone composition, produce the shipped comparison with the composer in the same mode. The pin command defaults to the flat released folder at `upstream/pins/jig/`. It verifies that folder's manifest, every listed file, the edition record hash against Ratchet's pin, released status, namespace, version and shared bytes before composing. No separate snapshot or unpublished descriptive tables are needed. `--jig <folder>` chooses another flat release folder. The historical `--snapshot <folder>` option accepts a release layout with `export/jig-skill/`; use one option at a time. Keep its result separate from working-Jig advisory results. Pin success verifies the released dependency bytes and composes the shipped Ratchet with them. It does not read organization patches, validate their acceptance, or run model checks on the patched design. Repeating pin alone cannot check O01 or O02. Use the verified baseline and replay the patches as described below. Checking only the shipped full model does not check the organization's four compositions.

Run the other tools with explicit paths:

```sh
bun upstream/ratchet-tools-impact-report.ts --data upstream --patches org/patches --patch O01 --profile org/profile.yaml --shared upstream/seams.yaml --org org/org.yaml --report build/impact-report.json
bun upstream/ratchet-tools-threat-grid.ts --data upstream --register build/threat-grid.json --summary build/threat-grid.md
bun upstream/ratchet-tools-unit-graph.ts --units upstream/units.yaml --model upstream/model.yaml --manual-work upstream/manual-work.yaml --claims upstream/claims.yaml --shared upstream/seams.yaml --report build/unit-graph.yaml
bun upstream/ratchet-tools-upgrade.ts --held held-upstream --new upstream --org org --out build --report build/upgrade-report.json
```

These last commands show the shipped edition as input. When judging a proposed organization change, select the compiled model and layer that contain that change, as the relevant specification requires. Read the report and exit status. An upgrade with conflicts or check findings cannot be promoted.

## Check organization patches against the released pin

The pin output is a full unpatched baseline with a flat layer, units, shared records, closure rules and Ratchet rules. Use it as the applier's input so the organization's changes are checked on the verified dependency. The output shared document is reserialized composition data. The pin check compares the original edition shared bytes before writing it. Do not compare the generated YAML bytes to the release hash.

From the workspace root, run:

```sh
bun upstream/ratchet-tools-model-checks.ts pin --edition upstream --out build/pinned
bun upstream/ratchet-tools-composer.ts --model build/pinned/model.yaml --layer build/pinned --shared build/pinned/seams.yaml --units build/pinned/units.yaml --out build/pinned-base/compositions --mode all
bun upstream/ratchet-tools-patch-applier.ts --model build/pinned/model.yaml --layer build/pinned --shared build/pinned/seams.yaml --shared-out build/patched-pin/seams.yaml --org org/org.yaml --org-out build/patched-pin/org.yaml --patches org/patches --version-record org/version.yaml --out build/patched-pin/model.yaml --layer-out build/patched-pin/layer --report build/patched-pin/apply-report.json --preview O01
bun upstream/ratchet-tools-composer.ts --model build/patched-pin/model.yaml --layer build/patched-pin/layer --shared build/patched-pin/seams.yaml --units build/pinned/units.yaml --out build/patched-pin/compositions --mode all
bun upstream/ratchet-tools-model-checks.ts --model build/patched-pin/compositions/full/model.yaml --layer build/patched-pin/compositions/full/layer --shipped build/pinned-base/compositions/full/model.yaml --org build/patched-pin/org.yaml --json
```

Repeat the last command with each of ratchet, jig and core in both composition paths. Replace O01 with the candidate id. For an O02 rehearsal in which O01 is still proposed, repeat the applier's `--preview` for O01 and O02. Omit previews after actual acceptance. Preserve the same source exceptions, overlay baseline and withdrawal selection on every replay. A failed replay or composition check blocks acceptance even when pin succeeds. Keep these patched-pin results and the matching unpatched comparisons as the acceptance evidence. These commands do not accept a patch or alter either edition.

For first-run inventory and expects hashes, use an empty patch folder on this same pinned baseline into `build/base/`. Keep `build/pinned/` unpatched. It also supplies the full baseline for the impact command below.

## Impact reports for every composition

Keep the full report as the patch's generated risk section. Run its writing and check commands with `--data build/pinned`, the source `--org org/org.yaml`, the same profile and patch selection. The tool replays the patches itself. Do not supply a model or layer already compiled through the candidate.

```sh
bun upstream/ratchet-tools-impact-report.ts --data build/pinned --patches org/patches --patch O02 --profile org/profile.yaml --shared build/pinned/seams.yaml --org org/org.yaml --report build/impact-full.json
bun upstream/ratchet-tools-impact-report.ts --data build/pinned --patches org/patches --patch O02 --profile org/profile.yaml --shared build/pinned/seams.yaml --org org/org.yaml --check --report build/impact-full-check.json
bun upstream/ratchet-tools-impact-report.ts --data build/pinned --patches org/patches --patch O02 --profile org/profile.yaml --shared build/pinned/seams.yaml --org org/org.yaml --mode ratchet --print --report build/impact-ratchet.json
bun upstream/ratchet-tools-impact-report.ts --data build/pinned --patches org/patches --patch O02 --profile org/profile.yaml --shared build/pinned/seams.yaml --org org/org.yaml --mode jig --print --report build/impact-jig.json
bun upstream/ratchet-tools-impact-report.ts --data build/pinned --patches org/patches --patch O02 --profile org/profile.yaml --shared build/pinned/seams.yaml --org org/org.yaml --mode core --print --report build/impact-core.json
```

Fill the full report's seven judgment slots before its check run. `--print` prints Markdown without changing the patch; `--report` still writes the requested JSON. Lone modes require `--print` without `--check`. They apply the original patches once on the full baseline, then compose the before and after snapshots in the selected mode. Do not copy a lone composition into a data folder, rewrite expects hashes, omit exception ops, or maintain projected patch copies. The full report remains the acceptance record. Keep the lone reports beside it for review of omitted parts and absent-side boundaries.

For the unit graph, use each composition's own `layer/units.yaml`, model and `layer/seams.yaml`. In the jig mode, use `--claims upstream/pins/jig/claims.yaml --manual-work upstream/pins/jig/manual-work.yaml`. Use Ratchet's `upstream/claims.yaml` and `upstream/manual-work.yaml` for full, ratchet and core. These are the editions' claims and manual obligations, not interchangeable files even when both inputs happen to pass.

## Checks outside this bundle

Figure building still needs its own proved tool. Readiness and status reports ship in the bundle and run their fixtures in the bundle gate. The profile checker runs in complete or progressive mode. It does not replace a readiness report. Model checks do not validate a profile's module switches or entry evidence.

When a tool is missing or has not passed its fixtures on the edition in use, say which items remain unchecked and record them in `org/CHANGELOG.md`. No patch acceptance, upgrade promotion or phase start may depend on an unchecked item.

For a homegrown tool, record its executable, working directory, exact input and output options, edition version and complete fixture command. Run every fixture and compare every expected outcome and code. The runner must reject unknown fixture keys and exit nonzero on any mismatch. Mutation-test it by breaking a copy of the tool and confirming that a fixture catches the change. Keep the fixture totals, mutation result and every specification gap in its build log. Send fixture-deciding choices upstream through `workflow-send-upstream.md`.

The optional blind-build tool and its ledger remain available for independent experiments. A blind build is no longer a release gate. When an edition changes, verify its new bundle before using it and prove any homegrown tools again against its specifications and fixtures.

## Runtime and first comparisons

Expect about 15 minutes for the complete bundle gate on a laptop, and allow longer on slower storage. It prints the edition version and manifest digest, then a start and completion line with elapsed seconds for each suite. A running suite can be quiet for several minutes. You may prepare records and preview patches in parallel while the gate runs. Label their results unchecked until the entire gate passes. Do not accept a patch, promote an upgrade or start a phase on them. If the gate fails, correct the problem and rerun it and the affected checks before relying on those results. Keep the full output, exit status and wall time in a build log and cite that log in `org/CHANGELOG.md`. The upgrade suite prints fixture and run totals after its mutation checks.

Before applying O01, run the applier with an empty patch folder into `build/base/`, then the composer into `build/base/compositions/`. Use the same shared and organization inputs and all the output options shown above. Use each unpatched mode's model as that mode's `--shipped` comparison, including full. Keep this comparison unchanged while previewing O01 and O02. An unpatched organization run may report the documented null seam-exception end; that diagnostic does not prevent making its comparison files.

For every composed threat grid, pass `--model build/compositions/<mode>/model.yaml --failures build/compositions/<mode>/layer/failures.yaml --closures build/compositions/<mode>/layer/threat-closures.yaml` along with `--data upstream`. Each projection has its own applicable edition closures. The applier preserves the supplied closure file.

A lone projection may retain a shared relationship while an absent-side endpoint is only a boundary record. STRIDE compares endpoint trust zones, treating a missing zone as `(no zone)`. If both endpoints have no zone in that projection, the relationship count increases but no crossing cell is added. This is expected for a zone-less measurement plane feeding an absent Ratchet reader in Jig alone. If one endpoint has a zone and the other does not, they do cross. Compare the full and lone registers. An unchanged lone cell count supplies no assurance about the absent design.

Use progressive mode for a first-run profile and require no answered-field errors plus readiness for the phase being started. Complete mode is for a fully filled profile; its missing later-phase sections do not block a progressive phase 1 run. A progressive profile-checker exit 1 can mean unfinished: inspect its JSON. With empty errors and an open phase 1, fill `progress.ask_next`; schema gaps held open are not malformed input. Exit 2 means unreadable input or invocation failure. Optional `current_practice` does not contribute to the 38 required readiness section counts. Its map still comes first. Readiness exit 0 means no answered-field errors; check `ready_for.phase >= 1` as well before starting phase 1.

```sh
bun upstream/ratchet-tools-readiness.ts org/profile.yaml --today 2026-12-01 > build/readiness.json
bun upstream/ratchet-tools-status-report.ts --root . --units upstream/units.yaml --as-of 2026-12-01 --period phase-1-setup
```

Create the three status YAML inputs using the complete shapes in `spec-status-report.md`. A listed not-started phase uses `started_on: null`, `test: {result: not-run}` and `report_acceptance: {state: pending}`. Phases 1 to 3 also need an organization-set `review_on` unless `timebox_weeks` supplies their stop bound. Phase 1 needs `rule_4_review_on` as specified in the status specification. For example, `{phase: 2, started_on: null, review_on: 2027-02-01, test: {result: not-run}, report_acceptance: {state: pending} }` is a complete minimal phase 2 row. A future phase whose review is not yet decided may be absent from the file; the report still shows it not-started. Before it starts, record its review point. Phases 4 and 5 require their review point when started. Status validation and readiness are separate checks. Neither replaces the other.
