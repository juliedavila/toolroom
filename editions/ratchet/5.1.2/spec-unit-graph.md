# Specification: Unit graph

The unit graph tool checks the organization's work units after it adds, changes or removes any of them. Units are connected through capabilities: a unit requires capabilities and other units provide them. The tool validates every unit's fields, builds the dependency graph from those capabilities, and confirms that every required capability is provided, that the graph has no cycles, that phase order holds, and that units can be pulled in layers once phase 1 is done. It also reports orderings that could weaken a separation of duties, checks each unit's flow item and the manual work the unit claims to relieve, and counts both. The organization's agent runs it after any patch that touches work units, and before a phase plan is written.

## Ideal state

- UG-1. Every unit has a unique id, a phase from 1 to 5, a known kind and a known feedback speed.
- UG-2. Every part a unit builds exists in the after model, and its fidelity moves up the ladder none, stand-in, existing-tool, built, or stays level.
- UG-3. Every unit that names a contract names one the model's contracts list defines.
- UG-4. Every entry in `requires` and `provides` is a capability id of the form `cap.<id>` or `<namespace>:cap.<id>` (UG-17); the namespace is part of its identity.
- UG-5. Every required capability is provided by at least one unit.
- UG-6. The dependency graph has no cycles, a unit depending on itself included.
- UG-7. No phase 1 unit depends, directly or transitively within its own design, on a unit of a later phase.
- UG-8. A unit in phase 2 or later that depends directly on a unit of a later phase in its own design is reported as a phase-order warning, with the capabilities involved.
- UG-9. Starting from every phase 1 unit done, every other unit is reached in a finite sequence of pull layers, and the report lists the layers.
- UG-10. A unit that builds a module part to the built level carries that module's tag, and every module tag names a known module. A unit of another module may extend a module part that is already built (built to built), as a pluggable module does where it wires into a neighbour; a core unit never may. The exemption reads only that the unit carries a module tag: a tag naming no known module also exempts the part, and that unit gets its own unknown-module error, so nothing escapes.
- UG-11. A unit that takes a part to a stand-in, or from none to an existing tool, states whether the stand-in keeps the contract's shape, and a shape gap is classified additive or breaking.
- UG-12. A unit in phase 2 or later that moves a role into a system is reported when no prerequisite in phase 2 or later guarantees a separation of that role, unless the unit names a phase entry check for that pair: a should-never code the profile checker applies before the phase starts.
- UG-13. The report is deterministic for the same inputs, whatever the order of the units in the file, as long as every id is unique (a duplicate id is already an error, and step 2 then keeps the first in file order).
- UG-14. Every unit has a flow item: feature, defect, risk or debt.
- UG-15. Every relief mark names a kind of manual work in the catalog, an effect of retire or reduce, a premise in the register that was not dropped, and a grade with its reason that is no stronger than that premise's grade; a unit names each kind once.
- UG-16. The report counts units by flow item, and lists for every kind in the catalog the units that retire it and the units that reduce it.

## Inputs

- The shipped `units.yaml`: a list of units (a mapping with a `units` list is read the same way). The organization's unit changes live in `org/units.yaml`, which holds three lists: `add` (whole units, ids starting `U-org-`), `modify` (`id` and a `set` mapping merged over the unit's top-level keys) and `remove` (ids). The tool applies them in that order to form the organization's unit list; the patch that motivates a unit change names it in its Why section. Fields per unit:

```yaml
- id: U-01                  # unique
  phase: 1                  # 1 to 5: the first phase the unit contributes to
  seam: STEP-1              # step of the loop, STEP-1 to STEP-12
  kind: agreement           # code | agreement | measurement
  contract: ValidationRequest   # optional; a contract name in the model
  elements: [{id: s2.operator-interface, fidelity_from: none, fidelity_to: existing-tool}]   # the parts it builds
  provides: [cap.scenario-selected]
  requires: [cap.contract-validators]
  check: "..."
  feedback_speed: next-loop-run   # minutes | next-loop-run | several-runs | weeks
  independence_sensitive: true
  separates: [[proposer, approver]]   # optional role pairs this unit establishes
  role_automated: verifier            # optional role this unit moves into a system or standing policy
  entry_checks:                       # optional: role pairs the profile checker guarantees at phase entry
    - {pair: [evaluator, verifier], code: sep.evaluator-conflicted}   # the pair includes role_automated; code has the shape of a rules.yaml code (step 3 checks the shape only)
  module: paved-road                  # optional module tag; absent means core
  contract_shape_ok: true             # required where UG-11 applies
  shape_gap: additive                 # additive | breaking, required when contract_shape_ok is false
  shape_note: "..."                   # optional explanation of the shape judgment
  stand_in_recorded_at: phase_1_boundary.runner_limit   # optional profile field that records what stands in
  flow_item: risk                     # feature | defect | risk | debt: the edition's default, by the rule below
  relieves:                           # optional: the manual work the unit takes off people once it is done
    - {manual_work: finding-triage, effect: reduce, rests_on: CL-32, strength: weak, strength_reason: "..."}
```

  A missing `elements`, `requires` or `provides` reads as an empty list.

  Every shipped unit's `flow_item` is a default that the edition sets by one rule, and an organization that reads a unit differently sets its own value with `modify`. The tool checks only that the value is one of the four. The rule, which an organization also applies to the units it adds: read the unit's `check`, the test that says the unit is done, and take the first of these that fits.

  1. `risk` when any part of the check shows an exposure closed, held or measured. An exposure is a way harm can get through: a weakness or attack path in the organization's systems, or a way the program itself could act, judge or record unsafely (an action beyond its grant, a test that grades itself, a model judgment or a lead taken as fact, outsider text reaching an agent, a record lost or altered, a person's gate wearing down or deciding without hearing the outcome, a control loosened with no recorded decision, non-public data leaving). Closed means refused, blocked, denied, revoked or removed. Held means kept from returning or widening, as by a kept test, an expiry or a change that reopens, a separation of people, an isolation boundary or a fail-closed default; an order of work is no hold, even when it ranks unknown values first. Measured means the exposure itself is counted, seeded or reported so that someone acts on it: findings, escapes, open findings and their age, a seeded catch or miss, a suppression rate, or a single finding, incident or weakness handed to the party that acts on it. A count, a rate or a seeded outcome of exposures is measured whatever decision it feeds. Not exposures: cost, effort, speed and value, where value includes the integrity of the program's evaluation of its own worth (a pre-registration, or a scorer of the agent-against-script verdict apart from the engineer who ran the case), though refusing an edit to a record of exposures stays risk even when an evaluation reads that record; and the reliability and the data quality of the program's own machinery, including a seeded run that shows the program's own loop or a route still works end to end.
  2. `defect` when the unit repairs a gap the design itself names: it supplies what an earlier unit's shape note says that unit's stand-in lacks (a unit with `contract_shape_ok: false`), or it fixes a shortfall that a failure scenario or a known issue names as present in a part already built or stood in. A unit that first builds a scenario's required behavior repairs nothing.
  3. `debt` when the unit builds shared platform or automation, machinery whose output other parts read, even when people also read it (a run service, an engine, a queue, a store, a ledger, an index, a collector, a connector, an adapter, a schema or a validator), and its check shows a property of that machinery (durable, exactly once, reproducible, complete, current, linked, available, recoverable or fast enough) or a capacity, budget or work-in-progress limit it enforces. A verdict or a report that a person decides from is no such output.
  4. `feature` otherwise: a capability a team or a role uses directly, such as a producer that drafts tests, a request form, a console, a register, a verdict or a report a person decides from, an agreement or a decision record.

  `relieves` marks the manual work a unit takes off people once it is done. Each mark is a claim about effect, graded like a premise: `manual_work` names a kind in the manual-work catalog, `effect` is `retire` (the unit ends that work where it applies) or `reduce` (less of it remains), `rests_on` names the premise in the premise register that the claim needs, and `strength` (none, weak, moderate or strong) with `strength_reason` grades the claim, never above the premise's own grade, since a claim is no better supported than the premise it needs. A unit names each kind at most once. A mark carries no share or number: how much of a team's time a kind of work takes is the organization's to measure.

- The after model (the shipped `model.yaml` with the organization's patches applied), read as parsed YAML: `elements[*].id`, `elements[*].module` and `contracts[*].name`. Read contract names from the `contracts` list itself, never by scanning the text.
- The manual-work catalog, `manual-work.yaml`: a mapping whose `manual_work` list holds the kinds of manual work, each with `id`, `name`, `description` and `flow_item`. The tool reads the ids. A catalog with no `manual_work` list holds no kinds.
- The premise register, `claims.yaml`: the tool reads each entry of its `claims` list for `id`, `verdict` and `strength`. A register with no `claims` list holds no premises. A claim whose verdict is `drop` is a dropped premise. A premise's grade is the highest of none, weak, moderate and strong that its `strength` text names as a whole word, and none when it names none of them, so `moderate (toil) / none (safety)` grades moderate.

  The tool reads both files on every run. An empty catalog or register leaves every relief mark unresolved, so each mark is refused.

## Outputs

The YAML report is written to the path the caller names (an option of the tool). Standard output carries a summary for people, whose layout is not part of the contract, and one line per finding, written `<level> <code> <unit or capability>: <text>` after two spaces. The YAML report is the contract. Every value in the example below illustrates the report's shape, and the layers are shortened. The shipped units' own counts, longest chain, layer widths and frontier are the ones `fixture-ug-shipped.yaml` expects; the example's numbers come from an earlier edition and are not a check:

```yaml
unit_graph:
  units: 205
  by_phase: {1: 23, 2: 67, 3: 50, 4: 47, 5: 18}
  by_kind: {agreement: 38, code: 124, measurement: 43}
  by_module: {consequence-gates: 3, core: 159, paved-road: 18, production-effects: 5, secure-creation: 5, tool-portfolio: 15}
  by_feedback_speed: {minutes: 107, next-loop-run: 37, several-runs: 32, weeks: 29}
  by_flow_item: {debt: 28, defect: 1, feature: 37, risk: 139}
  changed_from_upstream: {added: [U-org-01], changed: [U-21], removed: []}
  capabilities: 221
  dependency_edges: 398
  missing_capabilities: []
  multiply_provided: {cap.x: [U-10, U-11]}
  cycles: []                        # each a list of unit ids, first repeated at the end
  longest_chain:
    length: 19
    path: [U-158, U-01, U-03, U-05, U-08, U-09, U-11, U-12, U-14, U-15, U-16, U-17, U-47, U-48, U-109, U-110, U-112, U-115, U-116]
  phase_1_self_contained: true
  pull_after_phase_1:
    layers: [[U-20, U-21], [U-22]]
    layer_widths: [2, 1]
    frontier_by_phase: {2: 20, 3: 1, 4: 1}
  phase_order:
    later_phase_prerequisites: [{unit: U-30, phase: 3, needs: U-41, needs_phase: 4, capabilities: [cap.x]}]
    held_back_by_phase_order: [{unit: U-32, phase: 4, pull_layer: 1}]
    phase_understates_dependencies: [{unit: U-31, phase: 2, pull_layer: 3}]
  sensitive_orderings: [{unit: U-60, phase: 3, role: verifier, pair: [evaluator, verifier], unordered_separators: [U-98]}]
  entry_checked_orderings: [{unit: U-60, phase: 3, role: verifier, pair: [evaluator, verifier], check: sep.evaluator-conflicted}]
  phase_1_automation: [{unit: U-05, role: proposer}]
  stand_in_shape_gaps: [{unit: U-08, phase: 1, contract: ExecutionGrant, gap: breaking}]
  relief:
    finding-triage: {retire: [], reduce: [U-60, U-122]}
    fix-retest: {retire: [], reduce: [U-46]}
  errors: [{code: UG-E-missing, unit: cap.x, text: "required by U-12 but no unit provides it"}]
  warnings: [{code: UG-W-phase-order, unit: U-30, text: "phase 3 unit needs U-41 (phase 4) for cap.x; ..."}]
```

`stand_in_shape_gaps` gives `contract` and `gap` as null when the unit has none. Count mappings hold only the keys present. `by_flow_item` counts each unit under its flow item as written, and under `none` when it has none (absent or null), so a value outside the four is counted under itself, as `by_kind` counts a kind outside its set. `relief` holds every kind of the catalog, in natural order of their ids, each with a `retire` and a `reduce` list of unit ids in natural order. A unit is listed under a kind when an entry of its `relieves` names that kind with an effect of retire or reduce. When a unit names a kind more than once, its first entry naming the kind decides, so each unit appears at most once under a kind, and a first entry with any other effect lists the unit nowhere for that kind. Other findings on an entry, such as a premise the register lacks, leave it listed. `capabilities` counts distinct well-formed bare or namespaced capability identities supplied by local units or accepted external declarations. A required identity with neither a local provider nor an accepted external declaration is not counted. A finding in the report is `{code, unit, text}`, where `unit` is a unit id or, for capability findings, a capability id. Written as one line without its level it reads `<code> <unit>: <text>`, the form the fixtures match.

## Behavior

Unit ids compare in natural order, the same rule as the impact report and the status report: split each id into runs of digits and runs of other characters, and compare the runs pairwise from the left, two digit runs by numeric value (on a tie the shorter run first) and any other pair by code point; when every pair is equal, the id with fewer runs comes first. So U-81 comes before U-106, U-1 before U-01, and U-01 before U-org-01. The tool processes units in this order everywhere, so the order of units in the file never changes the report.

1. **Organization changes.** Apply `add`, then `modify`, then `remove`. An `add` whose id already exists, or whose id lacks the `U-org-` prefix, is a UG-E-overlay error and is skipped; the reuse test runs first, so an `add` of `U-01` reports only the reuse. A shipped unit is changed with `modify`. The impact report and the status report refuse a duplicate `add` too. A `modify` or `remove` naming an unknown id is a UG-E-overlay error and is skipped. One error per offending entry. A `remove` may name a unit added in the same file; that unit then appears in no delta list. Record the upstream delta: units added, units removed, and units changed (any field differs from the shipped unit, ignoring key order). Without an organization file all three lists are empty.
2. **Duplicate ids.** One UG-E-dup error per id held by more than one unit. The rest of the analysis keeps the first unit with that id in file order, after the organization's changes, and drops the others, so every count in the report (`units` among them) counts distinct ids.
3. **Field checks.** For each unit: UG-E-field when `phase` is not an integer from 1 to 5 (a YAML integer: `2.5` and the string `"2"` are errors; the error text writes the value as JSON, so `2.5`, `"2"`, or `null` when the field is absent), when `kind` is not code, agreement or measurement, and when `feedback_speed` is not one of the four speeds (one error each). UG-E-field also when `separates` is present and is not a list, and for each entry of `separates` that is not a list of exactly two strings (a single role name, a list of three roles, or a number); such an entry separates nothing in step 13, and the rest of the unit's pairs still count. For each part in `elements`: UG-E-part when its id is not a model element; UG-E-fidelity when `fidelity_from` or `fidelity_to` is off the ladder or `fidelity_to` ranks below `fidelity_from` (ranks none 0, stand-in 1, existing-tool 2, built 3). UG-E-contract when `contract` is present and the model's contracts list lacks it. UG-E-capid for each `requires` or `provides` entry that is neither a bare `cap.` identity nor a qualified capability identity; such an entry takes no further part in the graph. UG-E-entry-check for each `entry_checks` entry that lacks a `pair` of two role names or a `code` shaped like a rules code (lowercase letters, digits and hyphens, then a dot, then lowercase letters, digits, hyphens and dots, so `SEP.verifier-producer` and `sep_verifier` are refused), and for each whose pair does not include the unit's `role_automated`. A refused entry check guarantees nothing in step 13. UG-E-module when `module` is present and is not a known module. The module rule covers only parts that belong to a module, that is, model elements that carry a `module` value: UG-E-module when a unit takes such a part to built (`fidelity_to` built) and the unit's tag differs from the part's module (an absent tag counts as core), unless the part is already built (`fidelity_from` built) and the unit carries a module tag of its own. A part with no `module` (a core part) may be built by any unit, a module-tagged one included. Known modules are the `module` values present on model elements. A unit with a field error stays in the analysis. The phase checks and pull layers read its phase as a number: a YAML number as is (`2.5` as 2.5), a string written as a decimal numeral as that number (the string `"2"` as 2). A phase that is absent, null, or any other value (a word such as `"two"`, `true`) puts the unit in no phase: it meets no phase condition, so it is never a phase 1 unit, never a unit in phase 2 or later, and never later than another unit. Wherever a text or a count writes a phase, it writes the number the checks read as text (`2.5`, `2`), and `none` for a unit in no phase. So `by_phase` keys such a unit `none` (the string `"2"` counts under `2`, `2.5` under `2.5`), and so does `frontier_by_phase` when the unit is in layer 1. The flow item (UG-14): UG-W-flow-item when `flow_item` is absent or null, a warning because a unit with no type still plans correctly, and UG-E-field when it is present and is not feature, defect, risk or debt. Last for each unit come its relief marks (UG-15), when `relieves` is present and not null. UG-E-relief when `relieves` is not a list, and nothing more of it is checked. Otherwise each entry in list order, numbered from 1: UG-E-relief when the entry is not a mapping, and nothing more of that entry is checked; else one UG-E-relief for each of these that holds, in this order: `manual_work` is not a string among the catalog's ids; `effect` is neither retire nor reduce; `rests_on` is not a string among the register's ids, or it names a dropped premise; `strength` is not none, weak, moderate or strong, or it ranks above the grade of the premise `rests_on` names, when that premise exists and was not dropped (ranks none 0, weak 1, moderate 2, strong 3); `strength_reason` is absent, not a string, or only white space; `manual_work` names a kind that an earlier entry of the same unit names.
4. **Stand-in shape.** UG-11 applies to a unit with a part whose fidelity changes and whose `fidelity_to` is stand-in, or whose `fidelity_from` is none and `fidelity_to` is existing-tool. Such a unit needs `contract_shape_ok` set to true or false (UG-E-shape otherwise). Only a YAML boolean counts as set, so the string `"true"` is missing. Whether or not UG-11 applies, a unit with `contract_shape_ok: false` needs `shape_gap` set to additive or breaking (UG-E-shape otherwise). List every unit with `contract_shape_ok: false` under `stand_in_shape_gaps`, whether or not UG-11 applies to it. A breaking gap is also a UG-W-breaking warning, since the consumers of that contract must change when the stand-in is replaced; when the unit names `stand_in_recorded_at`, the warning text ends with `; the profile records what stands in at <field>`, so the organization can see what its phase 1 stand-in is.
5. **Providers.** Map each capability to the units that provide it. A capability with more than one provider is listed under `multiply_provided` and is a UG-W-multi warning located at the capability; it is allowed. A required capability with no provider is listed under `missing_capabilities` and is a UG-E-missing error located at the capability.
6. **Dependencies.** A unit depends on every provider of every capability it requires, so a unit with several providers for one capability waits for all of them. Remove duplicates and keep each unit's prerequisites in natural order. A unit that provides a capability it requires depends on itself. A missing capability adds no edge. Wherever the report or a text names "the capabilities involved" between a unit and one prerequisite, they are the entries of the unit's `requires` that the prerequisite provides, in the order of the unit's `requires` list. `dependency_edges` counts every prerequisite of every unit, self edges included.
7. **Cycles.** Run a depth-first search starting from each unvisited unit in natural order and visiting prerequisites in natural order. Each edge to a unit still on the search stack yields one cycle, written as the path from that unit along the stack and back to it, so a self-dependency reads `[U-x, U-x]`. Every cycle is a UG-E-cycle error located at its first unit.
8. **Longest chain.** When there are no cycles, report the longest dependency path, counted in units and running from prerequisite to dependent. Among paths of that length pick the smallest one, comparing unit ids one by one: start at the smallest unit that begins a longest path, then repeatedly continue with the smallest dependent that keeps the path longest. When there are cycles, report length 0 and an empty path.
9. **Phase 1 self-containment.** Within each design, phase 1 is self-contained when every prerequisite reachable along paths staying in that design is itself in phase 1. Each direct prerequisite in the same design of a phase 1 unit outside phase 1 is a UG-E-phase1 error located at the phase 1 unit, naming the prerequisite, its phase and the capabilities involved, because phase 1 must close on existing tools before anything else is built. Every transitive leak within one design passes through some phase 1 unit with such a direct prerequisite, so these errors name each leak at its source.
10. **Later-phase prerequisites.** For every unit in phase 2 or later, each direct prerequisite in the same design and a later phase is listed under `later_phase_prerequisites` with the capabilities the unit requires from it, and is a UG-W-phase-order warning. The unit cannot complete inside its phase until that later unit lands, so either the unit moves or the phase plan names the early pull.
11. **Pull layers.** Mark every phase 1 unit done. Repeatedly collect every remaining unit whose prerequisites are all done, in natural order; that set is the next layer, and its units become done. Stop when none remain. If a step finds no ready unit while units remain, raise one UG-E-stuck error located at the first remaining unit and naming them all (this follows from a cycle), and stop layering there: the remaining units get no pull layer and take no part in the phase model comparison (step 12). Layer numbers start at 1, and `frontier_by_phase` counts the units of layer 1 by phase.
12. **Phase model comparison.** For a unit in phase p of 2 or more with pull layer L: when L is less than p minus 1 the phase order holds the unit back (it could start earlier); when L is greater than p minus 1 the phase understates its dependencies. Both are reported for planning, never as errors.
13. **Sensitive orderings.** Collect every role pair (each well-formed entry of a `separates` field, step 3) as a sorted pair, with the units that separate it. A pair is sorted by putting its two roles in code point order (plain string order, which differs from natural order); its key is the two roles joined by a `|` character, and pairs are taken in code point order of that key, so for one automating unit the entries it yields in `entry_checked_orderings` and its warnings follow that order. For each unit in phase 2 or later with `role_automated` set, and for each pair (in that order) that contains that role: the separation is guaranteed when some separating unit in phase 2 or later is a transitive prerequisite of the automating unit. When none is and the automating unit's `entry_checks` names the pair (in either order) in an entry check step 3 accepted, the separation is guaranteed at phase entry instead: list `{unit, phase, role, pair, check}` under `entry_checked_orderings`, with no warning. When neither holds, report the pair, and list as `unordered_separators` the separating units in phase 2 or later, other than the automating unit itself, that are neither its transitive prerequisites nor its transitive dependents. Separations established in phase 1 are agreements between named people, and do not carry over once a role runs as a system; they never count as guarantees. Each report is a UG-W-sensitive warning located at the automating unit.
14. **Phase 1 automation.** A phase 1 unit with `role_automated` is listed under `phase_1_automation` as information: separations in phase 1 are person-level.
15. **Order.** Lists of units follow natural order. Findings sort by their unit or capability id in natural order, then by the step above that raised them, then in the order raised.

Known limitation: the reference implementation also checks that every cell of the internal story map has a unit; the story map is not shipped, so that check is left out.

## Errors, warnings and exit status

Message shape on standard output: `<level> <code> <unit or capability>: <text>`. In the report each finding is `{code, unit, text}` under `errors` or `warnings`, with no level: the list it sits in gives the level. Fixture entries match the report's findings written `<code> <unit>: <text>`.

| Code | Level | Condition |
|---|---|---|
| UG-E-dup | error | two units share an id |
| UG-E-overlay | error | a unit change names an unknown id, or an added id reuses one or lacks the prefix |
| UG-E-field | error | phase, kind or feedback speed missing or outside its set, a flow item outside its set, or a `separates` value that is not a list of two-role pairs |
| UG-E-part | error | a part id is not in the after model |
| UG-E-fidelity | error | fidelity off the ladder or going down |
| UG-E-contract | error | contract named but not in the model |
| UG-E-capid | error | a `requires` or `provides` entry is neither a bare nor qualified capability identity |
| UG-E-missing | error | a required capability has no provider |
| UG-E-cycle | error | a dependency cycle |
| UG-E-phase1 | error | a phase 1 unit has a prerequisite outside phase 1 |
| UG-E-stuck | error | the pull layering cannot proceed |
| UG-E-module | error | unknown module tag, or a module part built by a unit with a different tag |
| UG-E-shape | error | a stand-in without `contract_shape_ok`, or a shape gap that is neither additive nor breaking |
| UG-E-entry-check | error | an entry check without a role pair and a rules code, or whose pair lacks the automated role |
| UG-E-relief | error | a `relieves` value that is not a list, or a relief mark that is not a mapping, names no kind in the catalog, has another effect, rests on no premise in the register or on a dropped one, has a strength off the scale or above its premise's grade, gives no reason, or names a kind the unit already named |
| UG-W-flow-item | warning | a unit with no flow item |
| UG-W-phase-order | warning | a unit in phase 2 or later with a prerequisite in a later phase |
| UG-W-sensitive | warning | a sensitive ordering |
| UG-W-breaking | warning | a unit with `contract_shape_ok: false` and `shape_gap: breaking`, whether or not it takes a part to a stand-in (step 4) |
| UG-W-multi | warning | a capability with several providers |

Exit 0 when there are no errors, 1 otherwise. Warnings never change the exit status.

### Finding texts

The reference wording of each finding's text, after `<code> <unit>: `. Angle brackets mark a value; a list of ids or capabilities is joined with a comma and a space. These are the texts the fixtures' openings are cut from.

| Code | Located at | Text |
|---|---|---|
| UG-E-dup | the id | `<n> units share this id` |
| UG-E-overlay | the entry's id | `add reuses an existing unit id`, `added unit ids must start with U-org-`, `modify names an unknown unit`, `remove names an unknown unit` |
| UG-E-field | the unit | `phase <value as JSON> is not an integer from 1 to 5`, `kind <value> is not code, agreement, measurement`, `feedback_speed <value> is not minutes, next-loop-run, several-runs, weeks`; an absent kind or speed is written `undefined`; `flow_item <value> is not feature, defect, risk, debt`, the value written as the kind is; `separates <the value as compact JSON> is not a list of role pairs`, `separates entry <the entry as compact JSON> is not a pair of two role names`, for example `separates entry ["proposer","approver","verifier"] is not a pair of two role names` |
| UG-E-part | the unit | `part <part id> is not in the model` |
| UG-E-fidelity | the unit | `<part id> fidelity <fidelity_from> -> <fidelity_to> goes down or is off the ladder` |
| UG-E-contract | the unit | `contract <name> is not in the model` |
| UG-E-capid | the unit | `requires entry <entry> does not start with cap.` or `provides entry <entry> does not start with cap.` |
| UG-E-entry-check | the unit | `entry check <the entry as compact JSON, keys in file order> needs a role pair and a rule code`, for example `entry check {"pair":["proposer","verifier"],"code":"sep_verifier"} needs a role pair and a rule code`; or `entry check pair <role> and <role> does not include the role the unit automates (<role_automated, or none>)` |
| UG-E-module | the unit | `module <tag> is not a module of the model (known: <known modules in natural order>)`, or `builds <part id> of module <module> but is tagged <tag, or core>` |
| UG-E-shape | the unit | `takes a part to a stand-in without contract_shape_ok` (the same text for a part taken from none to existing-tool), or `contract_shape_ok is false and shape_gap <value, or "is missing" when absent>; it must be additive or breaking` |
| UG-E-relief | the unit | `relieves <the value as compact JSON> is not a list of reliefs`; for the entry numbered n from 1, `relief <n> is not a mapping: <the entry as compact JSON>`, `relief <n> names manual work <value as compact JSON>, which the catalog does not list`, `relief <n> has effect <value as compact JSON>; it must be retire or reduce`, `relief <n> rests on <value as compact JSON>, which is not a premise in the register`, `relief <n> rests on <premise id>, a dropped premise`, `relief <n> has strength <value as compact JSON>; it must be none, weak, moderate or strong`, `relief <n> is graded <strength>, above its premise <premise id> (<the premise's grade>)`, `relief <n> gives no strength_reason`, `relief <n> names <kind> again; a unit names each kind once`. An absent value is written `undefined`, so a mark with no effect reads `relief 1 has effect undefined; it must be retire or reduce` |
| UG-W-flow-item | the unit | `no flow_item (feature, defect, risk or debt)` |
| UG-W-breaking | the unit | `stand-in for <contract, or "its contract"> has a breaking shape gap; its consumers change when the stand-in is replaced`, then `; the profile records what stands in at <stand_in_recorded_at>` when the unit names one |
| UG-W-multi | the capability | `provided by <providers>; a unit requiring it waits for all of them` |
| UG-E-missing | the capability | `required by <units that require it> but no unit provides it` |
| UG-E-cycle | the cycle's first unit | `dependency cycle <the cycle's ids joined by " > ">`, for example `dependency cycle U-06 > U-07 > U-06` |
| UG-E-phase1 | the phase 1 unit | `needs <prerequisite> (phase <the prerequisite's phase>) for <capabilities involved>; phase 1 must close on its own`; the phase is written as step 3 reads it, `none` for a prerequisite in no phase, for example `needs U-01 (phase none) for cap.request; phase 1 must close on its own` |
| UG-W-phase-order | the unit | `phase <the unit's phase> unit needs <prerequisite> (phase <the prerequisite's phase>) for <capabilities involved>; move the unit or name the early pull in the phase plan`; both phases are written as step 3 reads them (the string `"2"` as `2`), and since a unit in no phase meets no phase condition, this warning never names one |
| UG-E-stuck | the first remaining unit | `no unit is ready while <count> remain: <every remaining unit>` |
| UG-W-sensitive | the automating unit | `automates <role>; no phase 2 or later prerequisite separates <role> and <role>; unordered separators: <unordered separators, or none>`, the pair in sorted order |

## Acceptance fixtures

If the environment denies the required `trash` cleanup of a fixture scratch folder, report that denial and the retained path separately from fixture assertions. Preserve the fixture result and exit status based on assertions; do not substitute another deletion mechanism or count a skipped case as passed.

Concrete input ids, names, prose, profile values, hashes and exact graph counts in these fixtures are supplied test vectors. Apply the rules to those inputs; do not hardcode fixture identities or infer organization facts from expected output.

The fixtures ship as one file, `fixtures-unit-graph.yaml`. It holds a small toy model (`toy_model`: four elements, two of them in modules, and two contracts), a clean five-unit toy plan (`toy_units`: two phase 1 units, two phase 2 units and one phase 3 unit, each with a flow item and one with a relief mark, with no findings), a toy manual-work catalog (`toy_manual_work`: the kinds `triage` and `retest`), a toy premise register (`toy_claims`: `TP-1` graded moderate, `TP-2` dropped, `TP-3` with the strength `moderate (toil) / none (safety)`), and one entry per row below:

```yaml
- name: fixture-ug-capid.yaml
  exercises: a requires entry that is not a capability id   # a description; no runner checks it
  base: toy               # shipped: units.yaml with model.yaml, manual-work.yaml and claims.yaml;
                          # toy: toy_units with toy_model, toy_manual_work and toy_claims;
                          # none: the entry's own units list with toy_model, toy_manual_work and toy_claims
  edits:                  # JSON Patch operations applied in order to the base unit list
    - {op: replace, path: "/[id=U-02]/requires/0", value: request}
  org: {add: [], modify: [], remove: []}   # optional organization changes, applied as in step 1
  repeat: 2               # optional; every run must give an identical report
  expect:
    exit: 1
    errors: ["UG-E-capid U-02: requires entry request"]   # openings of "<code> <unit>: <text>", one per finding
    warnings: []
    report: {dependency_edges: 4}                          # partial report under unit_graph
```

An entry's keys are `name`, `exercises` (a one-line description of what the fixture tests, read by people only), `base`, `units` (the entry's own list when `base` is `none`), `edits`, `org`, `repeat` and `expect`. Ordinary entries use no other key; the root also holds `namespace_graphs` with the separate schema below; the reference runner reads only these, and a stricter runner may refuse any other key as a fixture defect. Edits follow RFC 6902 (add, remove, replace) with one extension: a path segment written `[key=value]` selects the single list item whose `key` field equals `value`, and a selector that matches no item, or more than one, is a defect in the fixture. A final `-` appends to a list. The `errors` and `warnings` entries are openings of the reference implementation's findings written `<code> <unit>: <text>`, with no level, cut from the texts under "Finding texts". An entry matches a finding when the finding's line starts with the entry. Matching takes the entries longest first, and each matched entry consumes one finding; a fixture passes when every entry is matched and no finding is left over. Every key in `report` must equal the tool's report under `unit_graph`, compared this way: a mapping compares only the keys it names, at every depth, and keys compare by their text, so the key `1` and the key `"1"` are the same key; so `pull_after_phase_1: {layers: [...]}` checks the layers alone, while an empty mapping `{}` under a key requires that value to be an empty mapping (a fixture with no `report` checks no report value); a list must have the same length, and its items compare in the same order by this same rule, so a mapping inside a list also compares only the keys it names; any other value must be equal. An organization's tool may word its texts differently; it must then produce the same codes and locations, and the same report values, and its runner compares each entry only up to the colon (`<code> <unit>`), the text after the colon being the reference wording. An entry with no colon, such as `UG-E-dup U-01`, is compared whole.

| Fixture | Exercises | Expected outcome |
|---|---|---|
| fixture-ug-shipped.yaml | the shipped units unchanged | exit 0; zero missing capabilities, cycles and multiply provided capabilities; phase 1 self-contained; no later-phase prerequisites within the same design; cross-line waits remain reported; 2 warnings: UG-W-breaking for the two stand-ins of the execution grant contract, each naming `phase_1_boundary.runner_limit`; no sensitive orderings, and 11 entry-checked orderings across the three phase 3 units that automate the verifier or the evaluator role; counts, flow items, longest chain, layer widths, shape gaps and relief lists as shipped |
| fixture-ug-toy-clean.yaml | the toy units unchanged | exit 0; no findings; layers [[U-03], [U-04], [U-05]]; longest chain U-01, U-03, U-04, U-05; one unit of each flow item but two risk; U-03 reduces `triage`, and `retest` lists no unit |
| fixture-ug-dup-id.yaml | the toy units with a second U-01 appended | UG-E-dup |
| fixture-ug-bad-fields.yaml | one unit with phase 6, kind "process" and feedback speed "hours" | three UG-E-field |
| fixture-ug-unknown-part.yaml | one unit building part `s9.nothing` | UG-E-part |
| fixture-ug-fidelity-down.yaml | one unit taking a part from built down to existing-tool | UG-E-fidelity |
| fixture-ug-fidelity-off-ladder.yaml | one unit taking a part to `production` | UG-E-fidelity |
| fixture-ug-unknown-contract.yaml | one unit naming contract `NoSuchContract` | UG-E-contract |
| fixture-ug-capid.yaml | one unit requiring `request` without the prefix | UG-E-capid only; the entry adds no edge and is not a missing capability |
| fixture-ug-missing-cap.yaml | added phase 2 unit requiring `cap.never-provided` | UG-E-missing; the unit still gets a pull layer (layer 1), since a missing capability adds no edge |
| fixture-ug-cycle.yaml | two added phase 3 units, each requiring a capability the other provides | UG-E-cycle naming both; UG-E-stuck; longest chain length 0 |
| fixture-ug-self-cycle.yaml | one added unit requiring a capability it provides | UG-E-cycle with the unit repeated; UG-E-stuck; `dependency_edges` 6, the toy plan's 5 plus the self edge |
| fixture-ug-phase1-leak.yaml | a phase 1 unit additionally requires a capability only an added phase 2 unit provides | one UG-E-phase1 at the phase 1 unit; `phase_1_self_contained: false` |
| fixture-ug-phase-order.yaml | an added phase 2 unit requiring a capability only an added phase 4 unit provides | UG-W-phase-order naming the capability; exit 0 |
| fixture-ug-layers.yaml | minimal list: two phase 1 units, A (phase 2) needs phase 1, B (phase 2) needs A, C (phase 4) needs phase 1 | layers [[A, C], [B]]; C in `held_back_by_phase_order`; B in `phase_understates_dependencies` |
| fixture-ug-module-tag.yaml | the unit building the tool-portfolio part to built loses its module tag | UG-E-module |
| fixture-ug-module-unknown.yaml | one unit tagged module `quantum` | UG-E-module |
| fixture-ug-module-extend.yaml | the unit building the tool-portfolio part is tagged paved-road and takes the part from built to built | pass |
| fixture-ug-module-extend-core.yaml | the same unit untagged, built to built | UG-E-module |
| fixture-ug-shape-missing.yaml | the unit taking a part from none to stand-in loses `contract_shape_ok` | UG-E-shape |
| fixture-ug-shape-unclassified.yaml | `contract_shape_ok: false` with no `shape_gap` | UG-E-shape; the unit listed under `stand_in_shape_gaps` with gap null |
| fixture-ug-shape-breaking.yaml | `contract_shape_ok: false` with `shape_gap: breaking` | UG-W-breaking; exit 0 |
| fixture-ug-sensitive-guarded.yaml | minimal list: a phase 2 unit separating verifier and proposer is a prerequisite of a phase 3 unit automating verifier | no UG-W-sensitive |
| fixture-ug-sensitive-open.yaml | same, with the dependency removed | UG-W-sensitive listing the separator as unordered |
| fixture-ug-entry-checked.yaml | the open list, with the automating unit naming an entry check for proposer and verifier | no UG-W-sensitive; the pair listed under `entry_checked_orderings` with its code |
| fixture-ug-entry-check-bad.yaml | the open list, with an entry check for approver and proposer | UG-E-entry-check; the UG-W-sensitive warning stays |
| fixture-ug-phase1-separator.yaml | same, with the separating unit moved to phase 1 and kept as a prerequisite | UG-W-sensitive with no unordered separators: phase 1 separations do not count |
| fixture-ug-phase1-automation.yaml | a phase 1 toy unit automating the proposer role | listed under `phase_1_automation`; no warning |
| fixture-ug-multi-provider.yaml | an added unit providing the same capability as a toy unit; a third unit requires it | UG-W-multi; the third depends on both (7 edges) |
| fixture-ug-upstream-delta.yaml | organization changes adding one unit, changing one and removing one whose capabilities nothing else requires | `changed_from_upstream` lists each; exit 0 |
| fixture-ug-overlay-bad.yaml | `org/units.yaml` modifying `U-999` and adding `U-01` | two UG-E-overlay |
| fixture-ug-determinism.yaml | fixture-ug-shipped.yaml run twice | identical report |
| fixture-ug-dup-first-kept.yaml | a second U-01, in phase 2, placed first in the file | UG-E-dup; the first in file order is kept, so a UG-E-phase1 follows and the phase counts show it |
| fixture-ug-module-core-part.yaml | a unit tagged paved-road builds a core part to built | pass: the module rule covers only parts that belong to a module |
| fixture-ug-entry-check-code-shape.yaml | entry checks with codes `SEP.verifier-producer` and `sep_verifier_producer` | two UG-E-entry-check; neither guarantees the pair, so UG-W-sensitive stays |
| fixture-ug-phase-non-integer.yaml | a phase of 2.5 | UG-E-field |
| fixture-ug-phase-string.yaml | a phase written as the string "2" | UG-E-field |
| fixture-ug-org-add-remove.yaml | the organization adds a unit and removes it in the same file | pass; no upstream delta |
| fixture-ug-shape-listed-without-stand-in.yaml | `contract_shape_ok: false` on a unit with no stand-in part | listed under `stand_in_shape_gaps`; no error |
| fixture-ug-natural-order-tie.yaml | minimal list: a phase 1 unit U-9, and phase 2 units U-001, U-01 and U-1 (in that file order) that each need it | layers [[U-1, U-01, U-001]]; longest chain U-9, U-1: on a tie in value the shorter digit run comes first |
| fixture-ug-phase-absent.yaml | the toy unit U-01 (phase 1) without a phase | UG-E-field; the unit is in no phase, so UG-E-phase1 at U-02, which needs it, naming `(phase none)`, and no UG-W-phase-order at U-03; `phase_1_self_contained: false`; U-01 is pulled in layer 1; `by_phase` and `frontier_by_phase` count it under `none` |
| fixture-ug-phase-word.yaml | the toy unit U-03 with the phase `"two"` | UG-E-field; the unit is in no phase: no UG-W-phase-order at U-04, which needs it, U-03 left out of the phase model comparison, and `by_phase` and `frontier_by_phase` count it under `none` |
| fixture-ug-separates-not-pair.yaml | the open list, the separating unit also listing a three-role entry and a single role name | two UG-E-field; only the well-formed pair counts, so one UG-W-sensitive |
| fixture-ug-separates-not-list.yaml | the open list with `separates: verifier` on the separating unit and a phase 1 unit separating `[7]` | two UG-E-field; no pair is collected and no UG-W-sensitive |
| fixture-ug-capid-provides.yaml | a `provides` entry without the prefix | UG-E-capid and UG-E-missing for the capability it meant; `capabilities` 4 |
| fixture-ug-flow-item-missing.yaml | the toy unit U-02 without a flow item | UG-W-flow-item; exit 0; `by_flow_item` counts U-02 under `none` |
| fixture-ug-flow-item-bad.yaml | the toy unit U-04 with the flow item `security` | UG-E-field; `by_flow_item` counts it under `security` |
| fixture-ug-flow-item-override.yaml | the organization sets U-04's flow item to debt with `modify` | exit 0; U-04 listed as changed from upstream; one count moves from risk to debt |
| fixture-ug-relief-unknown-kind.yaml | U-03's mark names `code-review`, which the toy catalog lacks | UG-E-relief; `triage` lists no unit |
| fixture-ug-relief-bad-effect.yaml | U-03's mark has the effect `remove` | UG-E-relief; the unit is listed under no effect |
| fixture-ug-relief-unknown-premise.yaml | U-03's mark rests on `TP-9` | UG-E-relief; the mark stays listed under `triage` |
| fixture-ug-relief-dropped-premise.yaml | U-03's mark rests on `TP-2`, a dropped premise | UG-E-relief |
| fixture-ug-relief-over-graded.yaml | U-03's mark graded strong on `TP-1`, a moderate premise | UG-E-relief naming the premise's grade |
| fixture-ug-relief-compound-grade.yaml | U-03 graded moderate and U-05 graded strong, both on `TP-3` | one UG-E-relief, at U-05: the premise grades moderate, the highest grade its strength names |
| fixture-ug-relief-bad-strength.yaml | U-03's mark with the strength `high` and no reason | two UG-E-relief |
| fixture-ug-relief-repeat-kind.yaml | U-03 names `triage` twice, reduce and then retire | one UG-E-relief for the second entry; U-03 listed once, under reduce |
| fixture-ug-relief-not-list.yaml | U-03's `relieves` is a single kind name, and U-05's holds a kind name where a mark belongs | two UG-E-relief; nothing is listed |
| fixture-ug-relief-report.yaml | U-05 also retires `retest` | exit 0; `retest` lists U-05 under retire and `triage` lists U-03 under reduce |

Coverage: UG-1 (dup-id, dup-first-kept, bad-fields, phase-non-integer, phase-string, phase-absent, phase-word, overlay-bad, org-add-remove), UG-2 (unknown-part, fidelity-down, fidelity-off-ladder), UG-3 (unknown-contract), UG-4 (capid, capid-provides), UG-5 (missing-cap), UG-6 (cycle, self-cycle), UG-7 (phase1-leak, phase-absent), UG-8 (phase-order, shipped, phase-word), UG-9 (layers, toy-clean, shipped, natural-order-tie), UG-10 (module-tag, module-unknown, module-extend, module-extend-core, module-core-part), UG-11 (shape-missing, shape-unclassified, shape-breaking, shape-listed-without-stand-in, shipped), UG-12 (sensitive-guarded, sensitive-open, entry-checked, entry-check-bad, entry-check-code-shape, phase1-separator, phase1-automation, separates-not-pair, separates-not-list), UG-13 (determinism, natural-order-tie), UG-14 (flow-item-missing, flow-item-bad, flow-item-override, shipped), UG-15 (relief-unknown-kind, relief-bad-effect, relief-unknown-premise, relief-dropped-premise, relief-over-graded, relief-compound-grade, relief-bad-strength, relief-repeat-kind, relief-not-list), UG-16 (relief-report, toy-clean, shipped, relief-repeat-kind).

## Not in scope

Scheduling units to dates or teams; checking that a unit's check actually passes; landing status (the status report reads that); estimating effort; the story-map cell coverage check; changes to the model (the patch applier applies those).

## Namespace graphs

- **UG-17** Load the edition's `units.yaml`, which already holds both designs' composed units; no second edition or source tree is required. Preserve each design's own numbered stages. Compare stage order within each design as UG-18 defines, and report cross-line waits separately. Keep full identities, with imported unit, part and capability ids prefixed. A capability id starts with `cap.` or a namespace prefix followed by `cap.`; a namespace is one lowercase letter followed by up to 23 lowercase letters, digits or hyphens. Match the full identity after qualification. A mapping input may add `namespace`, `namespaces` (the designs loaded) and `capabilities` in the shared layer's shape: `{id, provided_by: [namespace], required_by: [namespace]}`. In a lone build, accept a required shared capability when the declaration names this design in `required_by` and every provider lies outside the loaded namespaces. Report those providers under `external_capabilities`. They supply no fictitious unit and no dependency edge. When a provider design is composed, its real units must provide the capability. Missing declarations remain missing-capability errors.
- **UG-18** Build one dependency graph across the loaded namespaces. Judge cycles and the longest chain across both lines, using every real capability join. Preserve the namespace in paths and findings. Judge phase-one closure and later-phase order only along dependency paths within the same design. Each design numbers its own stages. Report all direct cross-line waits in `cross_line_waits` (unit, prerequisite, their phases and capabilities), a report section with no phase error or phase-order warning. Report `by_namespace` and `by_namespace_phase`. Pull layers retain cross-line edges under UG-9's starting assumption that every design's phase-one units are done; cross-line waits remain explicit in their own section. Comparisons of global pull layers with phase numbers are planning information, not phase-order findings.

Design membership comes from the prefix before the first colon of a unit id; a bare unit belongs to the input mapping's `namespace`, then the model's namespace, default ratchet. Same-design phase checks follow paths whose vertices stay in that design; cycles, pull layers, sensitive-ordering reachability and longest chains use all real edges. The statement that a transitive phase-one leak has a direct phase-one leak applies within one design. Namespace report fields, when a `namespaces` mapping input is supplied, are `by_namespace: {namespace: count}`, `by_namespace_phase: {"namespace:phase": count}`, `external_capabilities: {"capability": [provider_namespace]}` and `cross_line_waits: [{unit, needs, capabilities, phase, needs_phase}]`. The waits list holds every direct cross-design edge. Capabilities count local providers plus accepted external declaration identities, without adding external units or edges.

For namespace fixture assembly, read the shipped unit list and model. Wrap units with `namespace: ratchet`, `namespaces: [ratchet, jig]`, `modules` from `modules.yaml` keys and `capabilities` from `seams.yaml`, qualifying bare shared declaration ids once as `shared:cap.<id>`. Full keeps all units. Ratchet alone keeps bare Ratchet units and sets `namespaces: [ratchet]`; Jig alone keeps `jig:` units and projects its own ids/references to bare, sets its namespace to jig and loads only that design in `namespaces`. Keep model elements/contracts belonging to the selected design or shared, and relationships with retained ends. Module declarations stay known independently of absent implementations. `remove_declarations` empties the capabilities list. `phase_case` and `cycle` replace the entire unit set, not append to it. Phase cases use U-1 at phase 1 requiring `shared:cap.a`, with U-2 (same) or jig:U-2 (cross) at phase 4 providing it. Cycle uses phase-2 units U-1 and jig:U-1 providing `shared:cap.a` and `shared:cap.b` respectively and requiring each other's capability. Each synthetic unit has kind code, flow_item risk, no elements and feedback_speed minutes; other requires/provides lists are empty. Namespace fixture keys are `name`, `composition`, `blocked`, `error_codes`, `counts`, `longest_chain`, `remove_declarations`, `cycle`, `phase_case`, `wait`, `no_phase_order_warnings`; every case runs twice. `wait` matches unit, needs and numeric phases; `no_phase_order_warnings` forbids UG-W-phase-order. Exact real graph counts are fixture data, not special cases in the analyzer.

The fixtures file's `namespace_graphs` selects full, ratchet or jig. `error_codes` is the exact set of error codes; `counts` matches the named fields directly under the report's `unit_graph` mapping, including the boolean `phase_1_self_contained`. Compare only the keys it supplies. `longest_chain` pins that report field. `remove_declarations` removes shared capabilities. `cycle` substitutes two units in different namespaces that require each other's capability. Every case runs twice and requires identical bytes. `phase_case: same` substitutes a phase-one unit waiting on a phase-four unit in the same design and must fail; `phase_case: cross` moves the provider to the other design, reports the wait and passes with a chain of two. `wait` requires the specified cross-line wait in the report.

In a namespace graph, `capabilities` counts distinct identities supplied by local units or accepted external declarations. The external providers remain outside every dependency path and unit count.

A composed unit mapping may carry `modules`, the ids from its loaded module declarations. These are known modules beside the tags on loaded elements. Ratchet retains the declaration for its optional creation composition when Jig's parts are absent, so its own sending units keep a declared module without inventing a Jig part.

## Shared capability declarations and absent providers

Before matching capabilities, qualify a bare `cap.<id>` in every unit's requires and provides as `shared:cap.<id>` when that exact shared identity is declared in the input mapping's capabilities. Keep explicitly qualified identities intact. A declaration never aliases two different explicit namespaces. A bare capability with no matching shared declaration stays bare and is judged by the existing missing-provider rules. Apply this normalization to both local providers and consumers.

With namespace mapping inputs, report `external_waits: [{unit, phase, capability, providers}]`. Emit one entry per unit and distinct required capability accepted through an absent provider declaration. Unit and capability are complete composed identities. Phase is that unit's numeric stage or null when absent. Providers is the sorted list of declared absent design namespaces. Order entries by unit natural order, then capability natural order. Every direct external wait appears here, including phase-one waits. These declarations add no units or graph edges. Keep `cross_line_waits` for real joins between loaded units. The existing `phase_1_self_contained` field describes closure within each design. It does not mean that external capabilities are available. Read external_waits beside it when planning a stage.

Namespace fixture keys additionally include `bare_capabilities` and `external_waits`. The first strips shared prefixes from requires and provides before running with the qualified declarations retained. The second requires those exact records in the report. The qualified and bare-reference Jig cases must report the same direct wait records, with each unit and stage. Missing declarations still fail, and a loaded provider still needs a real providing unit.

## Capability and namespace fixture details

A capability id is valid when it starts with cap. or matches `^[a-z][a-z0-9-]{0,23}:cap\.`. Use that test in step 3 and UG-E-capid. The diagnostic text's existing bare-prefix wording is retained for compatibility. It is a compatibility label for an invalid identity, including a malformed namespace, rather than a literal explanation of every failure. Qualified capabilities take part in the graph normally.

The namespace fixture's Jig projection keeps Jig and shared model elements and contracts, projects Jig ids to bare, and applies the same projection to unit ids, element references, capability references and contracts. Ratchet alone keeps bare and shared records and excludes Jig implementation records. External_waits uses the projected complete identity, so a Jig-owned unit id is bare in Jig alone.

Emit external_waits in unit natural order, then capability natural order. Fixture external_waits assertions compare exact records as a multiset, independent of the fixture list's order. No missing or extra record passes. Emit cross_line_waits for real edges between loaded designs even when units is a plain list. The other namespace grouping and external declaration fields require the namespaces mapping. Phase self-containment keeps its existing meaning of closure within each design. External_waits reports dependencies on absent designs separately.
