# Change the design

*Jig. Adopter skill. Edition 0.3.1, 2026-10-31, build 241a3d47+local.*

Change Jig's design for the organization with an organization patch, applied by Ratchet's patch applier, with its impact report and threat-model delta, so the risk of each change is visible and owned.

**Scope:** one organization patch that changes Jig's parts, relationships, contracts, layers or shared agreements, with any unit changes it motivates. **Inputs:** the verified Jig edition; a verified Ratchet edition (`workflow-start.md`, step 3); `org/patches/`, `org/org.yaml`, `org/version.yaml`, `org/units.yaml` when the organization has unit changes, and `org/jig-profile.yaml`. **Done when** the patch has all six sections, every check below passes on the patched composition or its failure is reported, its risk section is generated and its judgment slots filled, and its Status line records a person's decision; or it stays proposed with the outstanding checks and acceptances named.

## Which path applies

| Adoption | What to do |
|---|---|
| Jig alone, no Ratchet edition | Stop. No patch can be checked or accepted. The agent may write the patch's Why section as a note in `org/decision-log.md` for when tools arrive, and lists the change's checks as unchecked |
| Jig alone, a Ratchet edition for tools | Follow this workflow. The patch's six sections, the ops format and the impact report's judgment slots are as Ratchet's change-design workflow describes (`tools/ratchet/workflow-change-design.md`); the commands, governance and differences are below |
| Jig with Ratchet | Follow Ratchet's change-design workflow (`upstream/workflow-change-design.md`) with Ratchet's profile for governance. Its four compositions include `jig`. The differences below still apply |

## Commands for Jig alone

Every command runs from the workspace root. Once, create `build/baseline-patch/O00-baseline.md`: a patch with the six sections, `ops: []` in its Ops block and the Status line `proposed`. It is never accepted. Previewing it makes the applier import the shared layer into the model, so shared records such as `shared:DroppedCheck` and `shared:ext.engineering-workflows` are in the baseline, as they are when a real patch applies. A run with no patch at all skips that import, and hashes taken from it do not match. Then:

1. **The imported baseline**, for computing `expects`, and the unpatched composition:

```sh
bun tools/ratchet/ratchet-tools-patch-applier.ts --model upstream/model.yaml --layer upstream --shared upstream/seams.yaml --shared-out build/unpatched/seams.yaml --org org/org.yaml --org-out build/unpatched/org.yaml --patches build/baseline-patch --version-record org/version.yaml --out build/unpatched/model.yaml --layer-out build/unpatched/layer --report build/unpatched/apply-report.json --preview O00
bun tools/ratchet/ratchet-tools-composer.ts --model upstream/model.yaml --layer upstream --shared upstream/seams.yaml --units upstream/units.yaml --out build/base/compositions --mode jig
```

2. **Each `expects`**, from the value immediately before the operation (after every earlier operation in the patch). For the first operation that touches a record, that is its value in the imported baseline. For example, for a part's name, a shared contract's owners, the engineering system's assumptions and a shared claim's owners:

```sh
bun tools/ratchet/ratchet-tools-expects.ts --file build/unpatched/model.yaml --collection elements --id precommit-gate --fields name
bun tools/ratchet/ratchet-tools-expects.ts --file build/unpatched/model.yaml --collection contracts --id shared:DroppedCheck --fields owners,consumed_by
bun tools/ratchet/ratchet-tools-expects.ts --file build/unpatched/model.yaml --collection elements --id shared:ext.engineering-workflows --fields assumptions
bun tools/ratchet/ratchet-tools-expects.ts --file build/unpatched/seams.yaml --collection claims --id SH-1 --fields owners
```

3. **Apply, compose and check.** Name the proposed patch being checked in `--preview`; drop the option once every patch is decided.

```sh
bun tools/ratchet/ratchet-tools-patch-applier.ts --model upstream/model.yaml --layer upstream --shared upstream/seams.yaml --shared-out build/patched/seams.yaml --org org/org.yaml --org-out build/patched/org.yaml --patches org/patches --version-record org/version.yaml --out build/patched/model.yaml --layer-out build/patched/layer --report build/patched/apply-report.json --preview O02
bun tools/ratchet/ratchet-tools-composer.ts --model build/patched/model.yaml --layer build/patched/layer --shared build/patched/seams.yaml --units upstream/units.yaml --out build/patched/compositions --mode jig
bun tools/ratchet/ratchet-tools-model-checks.ts --model build/patched/compositions/jig/model.yaml --layer build/patched/compositions/jig/layer --shipped build/base/compositions/jig/model.yaml --org build/patched/org.yaml --json
bun tools/ratchet/ratchet-tools-unit-graph.ts --units build/patched/compositions/jig/layer/units.yaml --model build/patched/compositions/jig/model.yaml --manual-work upstream/manual-work.yaml --claims upstream/claims.yaml --shared build/patched/seams.yaml --org org/units.yaml --report build/patched/unit-graph.yaml
```

   Leave out `--org org/units.yaml` when the organization has no unit changes. Until the first-run patch sets a calendar end, the model checks report `seam-exception-invalid` for the shipped exception; the first-run patch clears it.

4. **The impact report** needs a data folder holding Jig's design files and the Ratchet edition's rules. Build it once per edition: copy every `.yaml` file of `upstream/` into `build/jig-data/`, then copy `tools/ratchet/rules.yaml` there. Write the risk section, fill its seven judgment slots, rerun to render them, then check it:

```sh
bun tools/ratchet/ratchet-tools-impact-report.ts --data build/jig-data --patches org/patches --patch O02 --shared upstream/seams.yaml --org org/org.yaml --report build/impact-O02.json
bun tools/ratchet/ratchet-tools-impact-report.ts --data build/jig-data --patches org/patches --patch O02 --shared upstream/seams.yaml --org org/org.yaml --check
```

Add `--units org/units.yaml` to both commands only when that file exists, as for the unit graph. No `--profile` is passed: the impact report reads Ratchet's profile, and Jig alone has none, so it prints no team names and cannot check the acceptor. Governance below covers that check.

5. **The threat grid**, before and after. Build one data folder per composition: copy every file of its `layer/` folder, its `model.yaml` and `tools/ratchet/rules.yaml` into `build/tg-base/` (from `build/base/compositions/jig/`) and `build/tg-patched/` (from `build/patched/compositions/jig/`). Then:

```sh
bun tools/ratchet/ratchet-tools-threat-grid.ts --data build/tg-base --register build/tg-base.json --summary build/tg-base.md
bun tools/ratchet/ratchet-tools-threat-grid.ts --data build/tg-patched --register build/tg-patched.json --summary build/tg-patched.md
```

   Compare the two registers by cell id and list the cells the patch adds or reopens in the impact report's `new_failure_modes` slot.

Ratchet's profile checker, readiness tool, status report and upgrade tool read Ratchet's profile and phases. They do not run on Jig alone, and nothing in these workflows depends on them.

## Governance for Jig alone

The roles come from `governance` in `org/jig-profile.yaml`. Before any acceptance, a person confirms `security_risk_owner_role`, `business_risk_owner_role` and `patch_acceptor_roles`, and the decision log records the person who holds each role. While any of them is unconfirmed, no patch can be accepted.

| The patch | Who accepts |
|---|---|
| Trips no should-never rule | The security risk owner |
| Trips a should-never rule | The business risk owner, with the security risk owner's agreement recorded beside the acceptance |
| Changes a shared agreement | As above, and also each bound owner of every side of that agreement (below) |

Whoever proposed the patch never accepts it, whatever role they hold. Before writing an accepted Status line, check that the acceptor holds a role in `patch_acceptor_roles` and is not the proposer named in the Why section. With Ratchet, Ratchet's profile and acceptance rules apply instead.

## What differs for Jig

**Namespaces.** Jig's own ids are bare inside its files, and other designs name them with `jig:`. Shared records keep `shared:`, and Ratchet's records keep `ratchet:` wherever a Jig file names them. An organization's own addition keeps the addition grammar after its namespace prefix, as Ratchet's workflow states in "Namespace rule for organization additions". In a workspace with Ratchet, a Jig-side addition is `jig:org.<slug>`. Tagging a part with Jig's module or placing it under a Jig parent does not change its namespace. Jig alone, the patch applies to Jig's model, where Jig's own ids are bare. Write every reference to a shared or Ratchet record with its prefix, so adding Ratchet later needs only the reviewed migration in `workflow-upgrade.md`.

**Shared agreements need both sides' owners.** A change to a shared contract, its quality entry, a shared premise or the engineering system's assumptions needs acceptance from the bound owner of each side of that agreement, Ratchet's side included, even when the organization runs Jig alone. The edition ships the roles and leaves the identities null. Bind them first, in the first-run patch (`workflow-start.md`, step 6). A role with no identity, or a missing acceptance, is refused by the model checks' acceptance check. Record an acceptance only when its owner has given it.

**Lone compositions.** In Jig alone, Ratchet's parts are absent. The composer builds each absent far side of a shared crossing from the five exposure marks the shared seam declares for it, and keeps whole the crossings that reach Jig's parts. Declare a new crossing whole, with its exposure marks, as Ratchet's workflow describes in "Change a shared interface". Never copy records from a full composition into a lone one, and never remove a finding by editing a composed file. A stage whose units wait on a Ratchet capability claims its exit test only when `ratchet_waits` records the capability as provided and confirmed, and the stage has its own exit-test evidence (`workflow-seed.md`, step 5).

**Unit changes.** The organization's unit changes live in `org/units.yaml`, in the shape Ratchet's unit-graph specification defines (`tools/ratchet/spec-unit-graph.md`, Inputs): three lists, `add` (whole units, ids starting `U-org-`), `modify` (`id` and a `set` mapping merged over the unit's top-level keys) and `remove` (ids), applied in that order. The patch that motivates a change names it in its Why section. The composer reads the shipped units only, so unit changes reach the unit graph through `--org` and the impact report through `--units`, as in the commands above, and no other check reads them. Each unit's `phase` field names its Jig stage.

## Record the decision

A person accepts or rejects the patch, by the governance above. Record the decision in `org/decision-log.md`, write the Status line, raise the version in `org/version.yaml` (`workflow-start.md`, the version rule), and add an entry to `org/CHANGELOG.md`. If the change alters a Jig premise, update its row in `org/jig-premise-ledger.md` as a proposal, leaving the confirmer column for the person who confirms it.
