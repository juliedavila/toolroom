# Change the design

Adapt Ratchet to an organizational constraint with a patch, and make the risk of the change visible and owned.

An organization may change anything: merge roles because it is small, replace a part with a tool it already runs, add a control its regulator expects. The design's checks run on the changed model, so a change that weakens a safety property shows up as a failed check or a needed exception. It does not disappear.

A module the organization will never need stays switched off in the profile, with no patch: its entry in `modules` keeps `enabled: false`, and the profile checker refuses it switched on before its entry evidence exists. This switch records adoption readiness. It does not prune the full model or disable a seam check. Model checks on the full composition judge every module still present, including one switched off in the profile. Core-only mode (`--core`) judges the core design without any module's parts. A relationship between modules still needs every seam it crosses declared in the full composition.

Removing shipped parts by patch is allowed where the upgrade's switch-off guard allows it (`spec-upgrade.md`, UP-27, and its section on removals). The guard compares each rule's judged set (the model checks' `judged`, MC-94) on the shipped model and on the patched one, and judges only what the patched model still holds. A part the patch removes, with the relationships that name it, never blocks the patch, and the upgrade report lists each removed item with the rules that judged it (`removed_from_judged`). The model checks make the same comparison on every run (MC-109): when they are given the shipped model, a shipped item that is still in the model and has left a set is the error `judged-set-shrunk`, so you see it when you first check the patch, before acceptance and before any upgrade. These things still apply:

- A removal still blocks when a part that stays in the model leaves a rule's scope because of it. Removing an exposed store whose readers are then no longer exposed is a switch-off for those readers. Send such a removal upstream (`workflow-send-upstream.md`).
- The rules judge what remains, and a role left behind still counts. Removing the privileged access broker alone blocks the patch: the control plane operator stays in the model with no control action left, so it leaves the controller set and its measured feedback leaves the feedback set. Remove that role and every relationship naming it in the same patch, or draw its session to the part that replaces the broker; MC-92 then reports `admin-broker-missing` as a judgment call, so declare the part that administers the control zone (`admin_broker: true`).
- A patch that removes one part and clears a flag on another is blocked for the flag alone. A role removed with all its relationships leaves no trace but `removed_from_judged`, and a removed feedback relationship that was a role's only measured feedback gives a `controller-feedback-missing` finding.
- Every evidence record must land in a partitioned store (MC-104). Removing the protected evidence store, with the relationships into it, leaves `VerifiedObservation` with no partitioned home, and removing the protected audit store does the same to `ExecutionReceipt`; each gives the error `evidence-unpartitioned`. To replace an evidence store, add your own store with partition keys (`partitioned_by`), retarget the relationships that wrote into the old one so they end at yours and still name their contracts, list your store in each contract's `consumed_by`, and give it a broker session if it sits in the control zone. State in the risk section where the loop now keeps the evidence.
- The applier refuses to remove a part while a relationship, a child or a finding kind still names it (`op.still-referenced`). Edition 4.1.0's new relationships end at shipped parts and roles, and its new units and failure scenarios name shipped parts, so a removal may also need those relationships removed and the organization's units file changed (the unit graph refuses a unit that names a removed part).
- A patch cannot change `modules.yaml`, and it no longer needs to for a removal: removing a relationship that a module's interface point names takes it out of every seam that declares it, and the model checks read the point's reference as removed, since the compiled model lists the relationship under `retired`.
- The guard cannot tell a replacement from a removal. When a part of your own replaces a shipped one, give it every mark the old part carried (read `removed_from_judged`), and state in the risk section where the evidence the removed part held is now kept.
- From edition 4.2.0 judged sets cover MC-102's typed fields (`typed_contracts`, `untrusted_fields`, `agent_reach_inputs`) and MC-91's held check (`held_kinds`), so MC-109 and the guard see a patch that sets `untrusted: false` on a shipped field, replaces a shipped contract's `fields` so a marked field leaves it, or weakens a shipped kind's `held` so it fails. The same holds for the sets of MC-104 to MC-107: clearing `audience` on a shipped contract, recasting a shipped store, or making a shipped control relationship to the coding agent optional takes items out of a set.

## Describe your own setup

The edition ships the core design, the checks, and the means to extend them. It does not try to anticipate every organization's parts, cloud, roles and tools. Describe your own in your patches and your layer: your own parts with their layer entries, the tools you already run in place of shipped parts, your own accounts or data centers in your own overlay. The checks then judge what you declared by the same rules as the shipped design. The shipped AWS overlay and the example tools are worked examples; nothing requires them. Do not wait for an edition that fits your setup; declare it.

One overlay covers every part, shipped and your own, wherever each runs. A hybrid estate, with some parts in a public cloud and some in your own data centers, still keeps one overlay: start from the example, add an account class for each place you run, and place every part (see "Your own overlay" below).

## Write the patch

Create `org/patches/O<NN>-<slug>.md` with these sections:

1. **Why:** the constraint, in the organization's terms, and who raised it.
2. **Ops:** one fenced yaml block of operations in the format of `spec-patch-applier.md`.
3. **Risk and threat-model delta:** generated by the impact report tool (`spec-impact-report.md`), then completed by judgment: what an attacker could gain, what new failure modes appear, which compensating controls apply. Once the threat grid is built (`spec-threat-grid.md`), run it on the model before and after the patch, each time with the failure scenarios of the layer compiled with it, and list the cells the patch adds or reopens as leads for the organization's threat-register review. The grid has no comparison mode: compare the two registers by cell id. A new contract that should close cells needs its own closure rule, kept under `closures` in `org/threat-closures.yaml` and passed with the grid's `org-closures` option. An organization's own closure rules close cells only after a person independent of the rule's author has reviewed each one and added `reviewed: {by: <role>, date: "<YYYY-MM-DD>"}`. Until then the rule's cells read proposed and do not count as closed. A cell closes only when the closure rule's field text appears in the contract's description; typed `fields` alone close nothing. To add your own review to a rule the edition ships, sign it off (below); never restate it under `closures`.
4. **Feasibility note:** technical (can it be built, and which known limits does it lean on) and organizational (who must staff, agree to or sustain it). Grade each: holds, bet, unknown or blocked. A vague answer stays vague on the record.
5. **Exceptions needed:** each should-never code the change trips, with a drafted exception entry for the profile.
6. **Status:** `proposed`, then `accepted by <who> on <YYYY-MM-DD>` or `rejected by <who> on <YYYY-MM-DD>`. An accepted patch the organization later retires becomes `withdrawn by <who> on <YYYY-MM-DD>` (`workflow-fix-patch.md`).

### Compute expects with the bundle

Use the compiled record immediately before the operation, after shared import and every preceding operation. The helper prints an `expects` YAML mapping and changes no input:

```sh
bun upstream/ratchet-tools-expects.ts --file build/base/model.yaml --collection contracts --id shared:DroppedCheck --fields owners,consumed_by
bun upstream/ratchet-tools-expects.ts --file build/base/model.yaml --collection elements --id shared:ext.engineering-workflows --fields assumptions
bun upstream/ratchet-tools-expects.ts --file build/base/seams.yaml --collection claims --id SH-1 --fields owners
```

Use the exact id or name in that compiled file. Shared-output claims may have local ids such as SH-1; model targets use the ids in the full model. The collection can be a list matched by id or name, or a mapping keyed by the record's id. Nested collections use / path segments with JSON Pointer escaping. For a failure scenario use `--collection scenarios` on its compiled failures file. Missing fields hash as absent; a missing or ambiguous record refuses with exit 2. Fixtures include the published string, null and absent hashes plus canonical object ordering. Copy the printed fields into that operation. For a later patch, generate its baseline by applying only the preceding patches with the applier, using previews for still-proposed predecessors. For a later operation in the same patch, preview a temporary proposed prefix copy containing only that patch's earlier operations in a scratch patch directory, and hash its output. Keep that prefix copy outside org/patches and preserve the original patch. Never hash a projected record or a value after the operation under construction.

### Ops for your own setup

- **A part of your own:** `add_element` with an organization id under the namespace rule below and a `layers` mapping: `realization` (its plane, class, examples, whether it is a swap point, and whether an existing tool is the default), `quality` (tier, failure mode and a note, for every part except people and existing systems) and `overlay` (services, fit, account, portability, and what the organization keeps for a rule-enforcing part). Without them the model checks report the part missing from each layer file, and a relationship into it counts as a join between planes. The applier does not refuse an `add_element` whose `layers` is missing or incomplete: it applies, and the model checks catch every missing entry.
- **A contract of your own:** `add_contract` with an `Org` name and `layers.quality`. Mark it `evidence_content: true` when it carries evidence records, and carry it into a store with partition keys (MC-104). A relationship of kind evidence into a store names the contracts it carries in `carries`, never an empty list or a `no_contract` reason (MC-105).
- **A gate role of your own fed its seeded catch rate:** `GateCatchRate` is restricted (`audience: restricted`), so every relationship that carries it ends at a role its `consumed_by` lists (MC-106). Add your role with `modify_contract` on `GateCatchRate`; a `set` replaces the whole list, so restate the three shipped roles (`people.accountable-authorities`, `people.scenario-owner`, `people.independent-security-staff`) beside yours and give the op `expects`. Never clear `audience` to quiet the finding: the upgrade's guard blocks that.
- **A changed field of any part:** `modify_element`, `modify_relationship` or `modify_contract` replaces each field it sets whole. Give the op `expects`, the hash of each field's current value (`spec-patch-applier.md`, Declaring what a modify replaces). If a newer edition or another of your patches has changed that field since you wrote the op, the applier then refuses the patch and names the field, so the change it would have dropped is seen before anything is lost. `expects` is optional and recommended on every modify op.
- **A key that should not be there at all:** list it under `unset` on a modify op, beside the op's `set` or in its place (`spec-patch-applier.md`, Taking a key away). A null value is still a key, and an `unset` leaves none behind. The applier refuses an `unset` of a key the part does not hold, and of its id, its provenance or a key every part of its kind must have. Give `expects` the hash of each value the op takes away. Taking a key off a shipped part can take the part out of a rule's scope; the model checks then report `judged-set-shrunk` (MC-109), and the patch goes upstream instead.
- **A part run differently, or placed elsewhere:** `set_layers` with the element's `id` (or a `contract` name) and only the keys that change: `realization` (for example `existing_tool_default: true` and examples naming the tool you run), `overlay` (account, services, fit) or `quality`. It works on shipped parts and your own alike, and changes the layer only, never the model. The applier's `op.layer-incomplete` refusal belongs to `set_layers` alone: a merge that would create a realization or overlay entry must supply every required key.
- **A coding harness of your own:** give its element the `harness` key with `stop_gate`, `telemetry_export`, `version_pinning` and `blocking_hooks`, and `stop_gate_compensated_by` when it has no stop gate. MC-99 judges only elements that carry the key. Any part of yours, other than a person, that sends a non-optional control relationship to an agent-reachable model caller (the coding agent) must declare either the `harness` key or `not_harness`, a sentence saying why it is no harness, such as a stop hook that only runs the suite and returns its result (MC-107); one that declares neither gets `harness-key-missing`. To redraw a shipped part that declares `not_harness` as a harness, such as the stop gate, take `not_harness` away with `unset` and set the `harness` map in the same op, so no state between the two ever applies; MC-99 then judges its parity. The rule finds a coding agent only by `agent_reachable: true` and an inference relationship, so draw your own coding agent with both. A compensating part inside the secure-creation module drops out in core-only mode, so name a part of your own, or keep the module on, where the organization runs core-only.
- **A relationship across a module's boundary:** each pluggable module's boundary is a seam in the model's `seams` list, and a relationship whose two ends sit on different sides of one is declared on it, named with every contract it carries (MC-108). The model checks refuse an undeclared one that carries a security-relevant contract or no contract (`seam-crossing-undeclared`) and list one whose contracts are all not security-relevant (`seam-crossing-unlisted`). Declare it with `add_to_seam` in the patch that adds the relationship, `{ op: add_to_seam, seam: <module id>, crossings: [{ id: <relationship id>, carries: [<contract>, ...] }] }`; a relationship between two modules crosses both their seams, so declare it on each. When a patch adds a contract to a relationship the seam declares, add it to the crossing the same way: named without it, the crossing is undeclared again. Read each contract's mark in the model checks' report, under `marks`: its `floor`, the rule codes whose tests read it, and whether it is security-relevant.
- **A mark you raise:** when a contract the checks do not mark security-relevant matters to you anyway (an exact execution grant, say), raise its mark with `modify_contract` setting `security: { raised: { by: <role>, why: <reason> } }`. Its undeclared crossings are then refused like any other security-relevant one. Nobody lowers a mark: `relevant: false` on a contract the checks derive security-relevant is the error `seam-mark-lowered`, and a floor is never written by hand (`seam-mark-invalid`).
- **What never crosses:** a seam may list contracts that never cross it. The secure-creation seam lists proof conditions, kept regressions, failure classes and road assurance in full, the full class-test result, replay results and kept-test status, and a relationship across it that carries one of them is refused, declared or not (`seam-never-cross`). Send only the projection that crosses in its place.
- **A view of your own:** name it with a hyphen after the patch id (`O10-approvals`), since a bare id such as `O100` on patch `O10` stops any later patch numbered `O100` from applying, and no op renames or removes a view.
- **A kind of finding of your own:** `add_finding_kind` with an `org-` id, for a weakness that closes in a way no shipped kind covers (a dependency weakness closed by a deployed upgrade, a leaked signing key that must also re-sign what it signed). Declare its closure check (the check type, the part that judges it with no model, and the expected outcome), its kept gate, its recovery measure, and what never closes it; `modify_finding_kind` changes a kind, shipped or your own, and takes `expects`. The shipped infrastructure misconfiguration kind is the worked example. The model checks refuse a kind whose closure check a model or a person would judge.
- **Where parts run:** your own overlay, adopted once and changed by patch after that (below).

### Strictness exceptions

How strictly the seams block is a matter of the organization's risk appetite. While two teams settle a connection, an exception lets an undeclared crossing that carries only contracts it names flag as a warning (`seam-crossing-excepted`) instead of blocking either team's build. The secure-creation seam ships one, for the three measurement feeds between Jig and Ratchet. Keep baseline exceptions in `org/org.yaml` under `seam_exceptions`. Change the shared seam's organization list by a `set_seam_exceptions` patch and pass the generated `build/org.yaml` to model checks with `--org`. The first-run recipe is in `workflow-start.md`. A shared seam uses `shared:<seam id>` and a Ratchet-owned seam uses `ratchet:<seam id>`. Shared contracts keep their complete names:

```yaml
seam_exceptions:
  "shared:secure-creation":
    - contracts: [shared:CatchLayer, shared:ReviewerSeedCatch, shared:DroppedCheck]
      accepted_by: "<the person or team accepting for the security risk owner role>"
      until: "<YYYY-MM-DD, or a milestone written <namespace>:<id>, such as ratchet:PH-3>"
      why: "<why these crossings may flag for now>"
```

Each `set_seam_exceptions` replaces the entire organization list for that seam, including a list from an earlier patch. Copy every exception that must remain, with its acceptor, reason and already chosen end, then add or change the intended record. To separate one of the three shipped feeds, restate the other two as well. An empty list declines the shipped defaults. The source file's empty mapping `seam_exceptions: {}` supplies no override.

An exception that names no risk acceptor, has no end, gives no reason, has an end that is neither a date nor a milestone written `<namespace>:<id>`, names a contract no crossing of the seam carries or one the seam says never crosses, or has a past end date is an error and covers nothing (`seam-exception-invalid`, `seam-exception-expired`). It covers a crossing only when it names every contract the crossing carries. Use a calendar date for the first-run exception. A milestone end is judged by the design engine, which knows when a milestone's work is done. The model checks take that milestone as in force. An exception changes no other rule. A structured feed from an exposed source still needs `content: structured` and a valid `cleared_by` declaration, and a feed crossing another module still needs that module's seam declaration. Its true relationship kind stays unchanged. Record each exception's acceptance in `org/decision-log.md` and renew it with a new end and a new acceptance.

### Your own overlay

1. **Adopt it once, as your baseline.** Write `org/overlay-<name>.yaml` in the shape of `overlay-aws.yaml`, starting from the example, with your own account classes and zone placements, covering every part. Replace the generated header comment with your own, and set the file's `provider` key to `<name>`; no check reads them. Run the checks with it. Record it in `org/version.yaml` as `overlay: { file: overlay-<name>.yaml, sha256: <hex> }`, the SHA-256 of the file's bytes, and set `cloud_overlay.provider` in the profile to `<name>`. Recording the baseline, or later replacing it, is an entry in `org/decision-log.md` that the security risk owner accepts, and it raises the version.
2. **Change it only by patch.** After the baseline, never edit the file by hand. Every change to where a part runs is a patch: `set_layers` with a part's `overlay` entry moves or re-describes the part; `add_account_class` adds an account class the overlay offers, and `modify_account_class` changes one (their fields are in `spec-patch-applier.md`). The patch carries a risk section like any other, whose placement section lists each part whose account class changed (from, to, and whether it enforces a rule) and each account class added or changed. Accepting it raises the version.
3. **The tools find it.** The applier and the upgrade tool both use the overlay `org/version.yaml` records, or the shipped example when none is recorded; an overlay option given on the command line still wins. When the recorded file's hash differs from the record, the applier refuses with `overlay.unrecorded-change`: the baseline was edited outside a patch. Restore the file and put the edit into a patch, or record a new baseline through the decision log.

## Check it

1. Apply the patches and compile the layer. In a shared run, including every run once the first-run patch contains `set_seam_exceptions`, give the applier `--shared upstream/seams.yaml --shared-out build/seams.yaml --org org/org.yaml --org-out build/org.yaml --layer-out build/layer`. Also give it the shipped model, patch directory, `org/version.yaml`, model output and report output using the command recorded for the built tool (`workflow-build-tools.md`). It uses the overlay recorded in `org/version.yaml`. Use the composer to produce the four patched compositions and their matching unpatched comparisons (`workflow-start.md`). Each generated layer must include its composed `seams.yaml` and units. If those inputs are missing, rebuild them with the composer before checking. To check a proposed patch, name it with `--preview`. To check a patch that replaces an accepted one, also name the old patch with `--preview-withdraw <id>`, on both the applier and impact report.
2. Run model checks on each composition with its model, compiled layer, matching unpatched model under `--shipped`, and generated exceptions under `--org`. For the full result these inputs can be `--model build/model.yaml --layer build/layer --shipped upstream/model.yaml --org build/org.yaml`. The shipped comparison lets them refuse a patch that takes a shipped item out of a rule's scope (MC-109). The released-pin check and all four composition checks remain acceptance requirements. Run the patched-pin replay and matching checks in `workflow-build-tools.md`; standalone pin success cannot see organization patches.
3. Run the profile checker on the profile, and the unit graph check if the patch touches work units.
4. Generate the patch's risk section with the impact report tool on the actual shared composition, using the same patch selection and organization's profile. Follow the tool's specification for its layer input: distinguish the layer before the candidate patch from the compiled layer after it, since applying a layer op twice can change the result. A tool that cannot process the shared ops or qualified ids leaves this report unchecked. Do not strip prefixes or exception ops to obtain a report on a different design. Always give the impact report the same profile in check mode too. The section records team names beside each separation, so omitting the profile or renaming a team makes the section stale and sends an accepted patch back through acceptance.

Fix the organization's units file before an urgent patch. While `org/units.yaml` adds a unit id that already exists, the impact report writes no risk section for any patch, the one that tightens a control included. Change the duplicate `add` to a `modify` (or give the new unit its own id), run the unit graph check, then generate the risk section.

Every failed check is a finding about the change. Either revise the patch or draft the exception it needs. Every rule judges the organization's changes as it judges the shipped design, with the same errors. So a patch that adds a structured relationship from an exposed part names its clearing (`cleared_by`), a part the organization adds to the control zone gets an administrative session from a broker, a store it adds states its partitioning, a store that states it holds no evidence receives evidence records only by reference, no model call enters a part marked as orchestrating, and the organization's own agent memory is marked as a learning store. Every person it adds who issues a control or authorization action receives a measured outcome on a feedback relationship, every coding harness it adds states its parity, every evidence record its parts produce lands in a store with partition keys, and every relationship that carries a restricted contract ends at a consumer the contract lists. Every relationship it draws across a module's boundary is declared on that seam. Never clear one of these errors by taking an item out of the rule's scope (a flag cleared, a key unset or set to null, a kind changed, a session made optional): the model checks compare each rule's judged set with the shipped design's and refuse it at once (`judged-set-shrunk`, MC-109), and the upgrade blocks the patch (spec-upgrade.md, UP-27). When the organization's design really differs, declare it in the way the rule reads: its own privileged access tool as a broker (`admin_broker: true`), a brief relayed through a tracker with the signer its receiver verifies (`verified_from`), a dependency the restore uses (`restore_use: true`), a feed that carries only ids or references to evidence records (`by_reference`), its own orchestration parts (`orchestrator: true`), its own contract of evidence content (`evidence_content: true`).

When a tool a step needs is missing, or has not passed its fixtures on this edition (`workflow-build-tools.md`), say plainly to the person you work with that the item is unchecked, record it as unchecked in `org/CHANGELOG.md`, and promote nothing on it: no patch is accepted on a check that did not run.

## Compare threat registers

Run the threat grid before and after the candidate patch with the same edition, profile context and closure files, and each model's own compiled failure scenarios. Keep both successful JSON registers. The grid has no comparison mode. Save the TypeScript helper below in the tools folder and invoke it from the workspace root:

```sh
bun tools/compare-threat-registers.ts build/grid/before.json build/grid/after.json
```

The helper compares each grid by cell id, reports added and removed cells, and reports changed cells with a reopened flag when a closed cell becomes open or proposed.

```typescript
type Cell = { id: string; status: string; [key: string]: unknown };
type Register = {
  counts: unknown;
  messages: { level: string }[];
  stride: Cell[];
  stpa: Cell[];
};
const paths = Bun.argv.slice(2);
if (paths.length !== 2) throw new Error("Give before and after register paths");
const registers: Register[] = await Promise.all(paths.map(async path => {
  const value = await Bun.file(path).json() as Register;
  if (!value.counts || value.messages.some(m => m.level === "error")) {
    throw new Error(`Unsuccessful grid run: ${path}`);
  }
  return value;
}));
const stable = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
      .map(([key, item]) => `${JSON.stringify(key)}:${stable(item)}`).join(",")}}`;
  }
  return JSON.stringify(value);
};
for (const grid of ["stride", "stpa"] as const) {
  const index = (cells: Cell[]) => {
    const result = new Map(cells.map(cell => [cell.id, cell]));
    if (result.size !== cells.length) throw new Error(`Duplicate ids in ${grid}`);
    return result;
  };
  const before = index(registers[0][grid]);
  const after = index(registers[1][grid]);
  for (const [id, cell] of after) {
    const previous = before.get(id);
    if (!previous || stable(previous) !== stable(cell)) {
      console.log(JSON.stringify({ grid, id, change: previous ? "changed" : "added",
        reopened: previous?.status === "closed" && cell.status !== "closed",
        before: previous ?? null, after: cell }));
    }
  }
  for (const [id, cell] of before) {
    if (!after.has(id)) console.log(JSON.stringify({ grid, id, change: "removed", before: cell }));
  }
}
```

Put added and reopened ids in the risk block's `new_failure_modes` judgment slot, with the two register paths. The writer preserves these slots and replaces the rest of the generated section. Review changed contracts, endpoints, clearing and scenario traces even when a cell keeps its status. Removing a cell does not prove the threat was resolved. Check the structural findings and the patch's explanation of the removed path.

## Sign off a shipped closure rule

A closure rule the edition ships without a review mark waits on each organization: the rule that raw model output never carries authority is one, and its why says what the organization must have in place first. Once a person independent of the rule's author has checked, in your environment, what the why asks (for that rule: what the response gate can reach with the credentials it runs under is limited, and a failure scenario sends the gate a hostile response), record the sign-off:

Add the hostile-response scenario before signing off. Use `add_failure_scenario` in an organization patch with a stable id such as `org.hostile-model-response`. Name the response gate and the part it controls in `elements`, and use an invariant from the composed failure layer. Declare its trigger, required refusal behavior, detection, matching runbook and a pipeline test that sends a hostile response with the gate's actual credentials. Compile the layer, run the impact report and all four compositions, and run the threat grid with the composed failure file. Its unsafe-control-action rows must trace through this scenario. Have the independent reviewer check the test result and the gate's effective permissions, then record the sign-off below. A scenario declaration alone records a test to run. It does not attest its execution. Use `modify_failure_scenario` with `expects` to revise the organization's scenario later. The closure rule and its prerequisites stay unchanged.

1. Run the threat grid on the edition you hold and read the rule's entry in the register's `closures`: its `hashes` hold the hash of the rule's field and of its why as this edition words them.
2. Add the sign-off under `sign_offs` in `org/threat-closures.yaml` (the file may hold `closures`, `sign_offs` or both), with the hashes copied into `expects`:

   ```yaml
   sign_offs:
     - contract: ModelResponse
       letter: E
       expects: { field: "<hash of the field>", why: "<hash of the why>" }
       reviewed: { by: "<the reviewer's role>", date: "<YYYY-MM-DD>" }
   ```

3. Run the grid again with the `org-closures` option. The rule now reads `signed off` and its cells close. A sign-off is refused when no rule of the edition has its contract and letter, when another sign-off already names that rule, or when its mark or its hashes are malformed.

The sign-off lives in your own file, so an upgrade carries it forward untouched. An edition that rewords the rule's field or why changes its hashes and voids the sign-off: after the upgrade the grid warns `TG-W-signoff-voided` and the rule's cells read proposed again. Have the reviewer read the new wording, then update that same entry in place with the new hashes and a new mark; a second entry for the same rule is refused. An edition that removes the rule leaves a sign-off that names no rule, which the grid refuses until you delete the entry. The sign-off does not cover a change to another sentence of the contract, so read the changelog's contract changes as well.

## Changing a design limit or the consequence line

A design limit and the consequence line live in the profile (`agent_limits`), so changing one is a profile change, never a patch op. Record it as a turn: the security risk owner changes a limit and the business risk owner changes the line, each with the evidence for the change, an entry in `org/decision-log.md` and a new organization version. Then run the profile checker. A narrower limit or a higher tier means every outstanding grant is checked against it at runtime and any that is wider lapses at once, so reissue each affected grant inside the new limit and update `agent_limits.grants` before the change takes effect; the checker refuses a listed grant that is still wider. A grant the risk owners decide to keep wider needs an exception for `limit.grant-beyond-design`, written and expiring like any other, and it runs inside the exception's scope until the exception expires. A tier rise is a change to the crown-jewel register, which no grant names, so the profile checker cannot see it; list the grants that reach the re-tiered asset yourself.

## Accept it

Name the security risk owner in the profile (`separation.security_risk_owner_role`) before accepting anything: every acceptance below needs that person, and so does the overlay baseline. While the role is unfilled, nobody can accept a patch, and the impact report's check mode warns about any patch accepted by a role the profile does not name.

A person accepts the patch, never the agent and never the team that wrote it:

- A patch that trips a should-never rule: the business risk owner (`separation.business_risk_owner_role`) with the security risk owner's agreement, as with any exception.
- A patch that trips no rule: the security risk owner (`separation.security_risk_owner_role`).

Record the acceptance in `org/decision-log.md`, write the Status line, raise the version in `org/version.yaml` (`workflow-start.md`, the version record), add an entry to `org/CHANGELOG.md` that cites the new version, and update the premise ledger if the change alters a premise of the narrative.

To fix, reopen or withdraw an accepted patch, or to bring a stale risk section up to date, follow `workflow-fix-patch.md`.

## Change a shared interface

Declare the crossing and its exposure in the proposing patch, then check the composition. Use the shared input and output options from "Check it" on every later run too. The applier writes the whole crossing to the generated shared document with both endpoints and every contract. Keep source exceptions in `org/org.yaml` and pass the patched result to the checks.

### Namespace rule for organization additions

An organization's own record keeps the addition grammar after its namespace prefix (PA-28). In a Ratchet-root composition, `org.<slug>` is a Ratchet-side part and `jig:org.<slug>` is a Jig-side part. Tagging a part `module: secure-creation`, or putting it under a Jig parent, does not change its namespace. Use `jig:org.<slug>` for an organization harness on Jig's side of the shared seam. Its id remains an organization addition, so it does not replace a shipped Jig id. A whole shared relationship added by patch uses `shared:oNN-<slug>`. Imported references retain their prefixes. In a lone composition the composer makes own-namespace references local and supplies absent-side boundaries. Preserve the stable qualified identities in the source patches.

### Declare each part of the crossing

1. Add only the crossing the organization's actual need requires; there is no mandatory demonstration crossing for adoption. A model-free reader of an existing measurement feed is one possible evaluation exercise, not a prescribed design addition. Add the part with its layers and, for a harness, its parity declaration. Declare the actual five exposure marks for each shared-seam endpoint with `set_seam_exposure`: `agent_reachable`, `exposed`, `model_free`, `role_class` and `kind`. Use the operation's format from the built patch applier specification. Keep existing endpoint exposure records when they still match the model; restate them only when changing those marks, and declare every new endpoint. Exposure is a declaration checked against the model, so a missing mark is not inferred as false. A tool without this op cannot complete a crossing to a new endpoint. Keep that check outstanding instead of editing compiled outputs.
2. Add the relationship with its real kind and every carried contract. `point` names the shared interface point. It does not add the relationship to the seam's crossing list. Also use `add_to_seam` for `shared:secure-creation`, with the relationship id, every contract and its point. Declare the crossing on any module seam it also crosses. A profile switch does not remove those seams from a full composition.
3. Update each contract's producer or consumer membership to include the new endpoint, retaining existing members. Add the endpoint's side-owner record to `owners`. The organization states the role accountable for that endpoint and binds it to an actual identity. Keep all shipped roles and sides. A shipped role such as "Engineering owners" applies only when that responsibility actually belongs to the new endpoint. Obtain the existing agreement owners' acceptance and the new owner's acceptance for this change, with `expects` for replaced lists.
4. Trace the source of every field that can reach the harness or its model callers, including nested fields and free text. Mark outsider-writable fields `untrusted: true` in their typed contract. MC-102 refuses such fields on an agent-reachable input, including through propagating data, evidence or inference paths. A relationship does not inherit a content mark from another relationship with an overlapping carries list. Trace the actual payload and source. Mark untrusted when it carries untrusted content. Use structured with the required clearing when that is what the relationship delivers. Omit content only when no such mark applies, and record the payload basis in the patch's judgment. A check pass does not establish that basis. A crossing label saying "no outsider text" supplies no check. Keep those fields out of the delivered agent-facing contract and declare the actual clearing path allowed by the rules. Where a structured relationship leaves an exposed source, state `content: structured` and its valid `cleared_by`. Do not remove an untrusted mark, change a relationship kind or claim a field is trusted to quiet a finding. If no declared path can satisfy the rules, propose the design change to the owner and keep acceptance pending.
5. Run model checks, impact report, threat grid and unit graph on the composition. The unit graph (`spec-unit-graph.md`) is the capability dependency check referred to by this workflow. Give it the composed model, the corresponding units and the shared capability declarations. Review the units and stages waiting on providers absent from a lone composition. A missing tool leaves that check outstanding.

A shared contract or premise change requires acceptance from each side's owner on the proposing patch. Read the assigned identities from the agreement's `owners` and list each as `{owner: <assigned identity>, accepted: true}` beside `ops`, including the engineering system owner for its premises. Record only decisions actually given.

## Shared agreement owners

Before changing a shared contract, its quality entry or a shared premise, load its per-side `owners` from the shared agreements and organization bindings described in `workflow-start.md`, even when adopting one design alone. The edition supplies roles and null identities. The organization binds each role through an identity-only change accepted by those identities. Inventory shared claims as well as contracts and held assumptions. Keep every side, including absent designs. For a later content change or reassignment, record `acceptance` with `accepted: true` for each before and after identity. A role label alone, a missing identity or false acceptance is refused by MC-114. During an upgrade, retain bindings only while their sides and roles still match, and obtain former and replacement owners' acceptance when they change.

## Details for first organization changes

For a shared endpoint, its element's `owner` names the accountable role, spelled exactly as the matching side-owner row's `role`. Put the actual person or team in that row's `identity`. An identity in the element's `owner` is read as a role name by the acceptance check.

The impact report deliberately lists candidate rules and enforcing parts for every changed owner list. Identity-only binding can produce a large report. State the identity-only scope in its judgment slots, review the candidates, and record which content and threat cells actually changed. Report size is not evidence that agreement content changed.

The impact writer owns and replaces the generated risk section. Put added and reopened cell ids in the `new_failure_modes` judgment slot of its fenced YAML block, with the before and after register paths. Fill all seven judgment slots there, rerun writing mode to render them, then run `--check` with the same `--profile`, `--shared` and `--org` inputs. Keep additional prose outside the generated section.
