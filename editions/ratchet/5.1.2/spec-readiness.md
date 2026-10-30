# Specification: readiness report

The readiness report tells an organization how far its answers carry it. It reads `profile.yaml`, finds the highest phase whose required profile sections are all answered and valid, lists the open sections that block the next phase, and for each one gives the interview questions, where the answer usually lives, who must confirm it, and the core default that stands in meanwhile. The organization's agent runs it at the start of adoption and after each round of answers, to decide what to ask next. The profile checker also calls it in progressive mode.

## Ideal state

- **RD-1** A section is answered exactly when the rule in "Answered sections" holds.
- **RD-2** `ready_for` is the highest phase n such that every section required by phases 1 to n is answered, or null when a phase 1 section is open.
- **RD-3** `next_phase` is `ready_for` plus one, phase 1 when `ready_for` is null, and null when `ready_for` is 5.
- **RD-4** `ask_next` lists every open section required by a phase at or below `next_phase`, and `open` lists every open section, both in `readiness.yaml` order. When `next_phase` is null (ready for phase 5), `ask_next` is empty.
- **RD-5** Each open item carries the interview row of its top-level section (questions, usual sources, confirm) and its assumed default, or null where none exists.
- **RD-6** `answered_sections` and `total_sections` count the section entries in `readiness.yaml`.
- **RD-7** `errors_to_fix_first` holds the profile checker's progressive-mode errors, so a refusal in an answered section is never hidden behind readiness.
- **RD-8** The exit status is 0 when `errors_to_fix_first` is empty and 1 otherwise; readiness alone never fails the run. This is the readiness tool's own status: the profile checker's progressive `ok`, which needs readiness of at least phase 1, is a separate value with its own rule in the checker's specification.
- **RD-9** A boolean false or a number 0 counts as an answer; a placeholder never does.
- **RD-10** The same profile and data files give the same report, byte for byte.
- **RD-11** Each open item names, in `open_fields`, the paths inside its section that keep it open, or the section's own path when the section carries no answer at all, so the question asked is the one actually open.

## Inputs

- `profile.yaml`: the organization profile, possibly partial, read as YAML 1.2 as the profile checker reads it (an unquoted date stays a string).
- `readiness.yaml`: phases, the sections each requires, and the core defaults that stand in while a section is open. Shape:

```yaml
phases:
  - phase: 1
    name: The loop closes once
    sections: [profile, existing_tools, separation.producer_team, separation.approver_team,
               separation.fixture_oracle_owner_team, separation.verifier_team, separation.fix_author_team,
               separation.closure_acceptor_team, ledger_write_path, models, crown_jewel_register, delivery,
               phase_1_boundary]
  - phase: 2
    name: The evidence can be trusted
    sections: [ownership, separation.business_risk_owner_role, separation.security_risk_owner_role,
               separation.control_plane_operator_role, separation.platform_operator_role,
               separation.team_definition, separation.internal_audit_role, attestation, unattested_default,
               gate_failure_policy, infrastructure_dependencies, dials, data_partitioning, jurisdictions,
               escapes]
  - phase: 3
    name: Ratchet is measured against today's process and a no-agent baseline
    sections: [scale, risk_appetite, fix_capacity, fix_capacity.default_cap, ai_resilience, tools,
               separation.evaluation_team]
  - phase: 4
    name: A second team runs it
    sections: [road, modules, blocking_cost_register]
  - phase: 5
    name: It works in production
    sections: []
defaults:
  ledger_write_path: { value: intake-only, from: "rule 3: the value the checker accepts without an exception" }
  dials:
    value:                              # the expanded list, as section 5 builds it
      - { id: covered_sample_share, current: 0.1, bound: null }
      - { id: negative_challenge_sample_share, current: 0.1, bound: null }
      # ... one entry per core dial whose default is not null, in quality.yaml order
    from: the design model dials (defaults)    # free text naming where the default comes from
conditions:
  - { section: phase_1_boundary, field: agent_drafts_only, when: { field: source, in: [discovery-finding, recent-finding] } }
```

A section is a top-level profile key or a dotted path into an object (`separation.verifier_team`). A dotted section may lie inside another listed section, and each is judged on its own: `fix_capacity.default_cap` is listed beside `fix_capacity` because the schema lets the default stay null, which leaves `fix_capacity` answered, while phase 3 still needs the default. Each section belongs to the first phase whose exit test depends on it. Phase 5 adds no section; its entry evidence lives in `modules`. `conditions` lists fields the schema lets stay null that a section still needs answered in one case: the section is open while its `when.field` holds one of the `when.in` values and `field` is unanswered (absent, null, an empty string or a placeholder). Both `field` and `when.field` are keys inside the condition's section, read relative to it: in the example, `source` is `phase_1_boundary.source` and the open item is `phase_1_boundary.agent_drafts_only`. `conditions` may be absent, meaning none.

- The interview table: the table under the heading "The interview: questions, sources and who confirms" in `R1-rules-and-readiness.md`. Each row reads `` | `section` | questions | usual sources | confirm | ``, keyed by a top-level section name in backticks; names hold lowercase letters, digits and underscores (`phase_1_boundary` has a row). A row whose first cell is anything else, such as `current_practice.modules`, is not an interview row and is skipped. The confirm cell starts with `No` or `**Confirm** (who)` and may carry more text after it, as in `No (a record of today, confirmed by the people who run it)` or `**Confirm** (security risk owner) for any setting past its bound`.
- `profile-schema.yaml`, to judge each section's validity.
- The profile checker, run in progressive mode, for `errors_to_fix_first`.
- `quality.yaml`, to expand the dial defaults.
- Option `--today YYYY-MM-DD`: the evaluation date, default the current date in UTC. The readiness standing never depends on it; it is passed to the profile checker for `errors_to_fix_first`, where exception expiry and attestation age depend on it.

## Outputs

A JSON report on standard output:

```json
{
  "ok": true,
  "ready_for": { "phase": 1, "name": "The loop closes once" },
  "next_phase": { "phase": 2, "name": "The evidence can be trusted" },
  "answered_sections": 34,
  "total_sections": 38,
  "ask_next": [
    {
      "field": "separation.business_risk_owner_role",
      "open_fields": ["separation.business_risk_owner_role"],
      "phase": 2,
      "phase_name": "The evidence can be trusted",
      "questions": "Which team drafts tests, approves actions, ... Who is the business risk owner and the security risk owner? ...",
      "usual_sources": "Org charts, RACI, risk register, platform operating model",
      "confirm": "Confirm (each named owner)",
      "assumed_default": null
    }
  ],
  "open": [ "<every open item, same shape>" ],
  "errors_to_fix_first": [],
  "exceptions": []
}
```

`ask_next` holds the open sections that block the next phase (section 3). Each item's `open_fields` is defined in section 2. `ok` is true when `errors_to_fix_first` is empty. `exceptions` repeats the profile checker's list. A Markdown rendering for people is optional; when produced it shows the phase standing in one sentence and a table with columns Section, Questions, Usual sources, Confirm, where the Section cell also names the open fields when they are narrower than the section.

## Behavior

### 1. Placeholders

A placeholder is a string matching `^\s*FILL\b`, anywhere inside a section, including inside lists and nested objects.

### 2. Answered sections

For each section path, read the value by walking the dotted path from the profile root (a missing step gives absent). The section is answered when all four hold:

1. **It carries an answer.** At least one leaf is meaningful: a non-empty string after trimming that is not a placeholder, any number (0 included), any boolean (false included). Null, absent, an empty string, an empty list, and an object or list whose leaves are all null or empty carry no answer.
2. **It holds no placeholder** anywhere.
3. **It is valid against its schema.** Take the schema found by walking `properties` along the same path, and validate the value with the profile checker's schema rules (type, enum, required, nullable, minimum, items, and nested `properties` at every depth). Any finding makes the section open. A path with no schema skips this step. Validate the value as it stands in the file, never the checker's copy with placeholders removed, so list indices in `open_fields` match the file; the schema rules skip a placeholder value, which step 2 already reports.
4. **It meets its conditions.** Each `conditions` entry for the section whose `when` holds needs its `field` answered.

An open section's `open_fields` is the list, sorted by plain code-point order and without repeats, of every path inside it that fails steps 2 to 4: each placeholder's path, each schema finding's location, and `<section>.<field>` for each unmet condition. When the section fails step 1 (absent, null, or nothing meaningful in it), `open_fields` is the section's own path alone. Paths use the profile checker's location form (`phase_1_boundary.agent_drafts_only`, `crown_jewel_register[0].tier`). A `required` key missing from an object is located at the object's path followed by the key (`phase_1_boundary.confirmed_by_role`), never at the object itself.

Should-never rules play no part here. A section that is answered and valid but refused by a rule counts as answered; the refusal appears in `errors_to_fix_first` (RD-7).

Examples:

- `phase_1_boundary: { status: active }` carries an answer but fails the schema's `required` for `confirmed_by_role` and for the four booleans the schema requires (`target_written_by_team`, `outsider_text_excluded`, `agent_egress_model_route_only`, `context_synthetic`): open, with those five paths in `open_fields`. All five come from schema validation (step 3); with `source` absent, no `readiness.yaml` condition applies.
- `phase_1_boundary` complete for a practice target with `agent_drafts_only: null`: answered. With `source: recent-finding` and the same null: open, `open_fields` is `phase_1_boundary.agent_drafts_only`.
- `phase_1_boundary` complete with `context_synthetic: false` and `source: practice-target`: answered (false is an answer), and the checker reports `model.trifecta` in `errors_to_fix_first`.
- `separation.business_risk_owner_role: "FILL: who accepts business risk"`: open.
- `delivery: { deploy_cadence: hourly, starting_cadence_rung: periodic, standard_change_preapproval: true }`: open, because `hourly` is outside the enumeration. `ready_for` is null.
- `separation.internal_audit_role: null`: open. The schema allows null, but null carries no answer, so the organization records a choice such as `not-involved` to clear phase 2.
- `modules.paved-road.evidence.classes_with_two_reproduced: 0` inside an otherwise complete `modules`: answered.
- `modules` with the four required modules and no `secure-creation` entry: answered, because that entry is optional. `current_practice`, module inventory included, is optional and never gates a phase, and so is `agent_limits`: left out, approval works as it did before the section existed.
- `fix_capacity` with both windows and two team caps but `default_cap: null`: `fix_capacity` is answered and `fix_capacity.default_cap` is open, so the profile is ready for phase 2 at most. Without `fix_capacity` at all, both are open.
- A profile without `escapes`: valid, because the schema makes the section optional, but `escapes` is a phase 2 section, so the profile is ready for phase 1 at most and `ask_next` names `escapes` once phase 1 is answered. A section the schema makes optional may still gate a phase when the phase's exit test depends on it; phase 2 reports each escape with its cost, so it needs the organization's definition of an escape.

### 3. Phase standing

1. Walk the phases in order and collect every open section with its phase number.
2. `ready_for` starts at none. For n from 1 to 5: if any open section belongs to a phase at or below n, stop; otherwise `ready_for` becomes n. Because phase 5 requires nothing new, a profile with phases 1 to 4 answered is ready for phase 5.
3. `next_phase` is `ready_for` plus one (phase 1 when `ready_for` is none), or null at phase 5.
4. `ask_next` is every open section whose phase is at or below `next_phase`. Sections of later phases stay in `open` and are not asked yet. When `next_phase` is null, `ask_next` is empty: a profile ready for phase 5 has nothing left to ask, and `open` is empty too, since every section belongs to phases 1 to 4.

Example: a profile answering every phase 1 section and every phase 2 section except `separation.team_definition` reports ready for phase 1, next phase 2, and `ask_next` with one item. Example: removing `tools` from an otherwise complete profile reports ready for phase 2, next phase 3, `ask_next` with `tools`, and `open` with `tools` only.

### 4. Interview lookup

For each open item, look up the interview row whose section equals the first segment of the item's path (`separation.verifier_team` uses the `separation` row). Copy questions and usual sources as written in the cell, without the spaces that pad it inside the pipes (trim each cell). Copy confirm the same way, then remove every `**` (`**Confirm** (each named owner)` becomes `Confirm (each named owner)`). The first cell after the section name is the questions, the second the usual sources, and the rest of the row up to its closing pipe is confirm. When two rows name the same section, the last one wins. A section with no row gets null in all three fields.

### 5. Assumed defaults

For each open item, `assumed_default` is the `value` of the `defaults` entry whose key equals the item's path exactly, else null. A default stands in for planning and for the tailored package; it never makes a section answered. The shipped `readiness.yaml` also holds defaults keyed by a path inside a section (`gate_failure_policy.key`, `road.conformance_basis`, `tools.leads_count_as_coverage`) and by sections no phase lists (`tier_overrides`, `build_or_buy`). Those serve the tailored package and never reach a readiness report, since no open item has that path: an open `gate_failure_policy` reports `assumed_default: null`. The `dials` default expands to every core dial in `quality.yaml` whose `default` is not null, in `quality.yaml` order, each as `{id, current: <its default>, bound: null}`; dials with a null default are left out. The shipped `readiness.yaml` holds this list already expanded, so a tool may copy its `value` as it stands or build the same list from `quality.yaml`; the two agree.

Example: a profile without `ledger_write_path` lists it as open, phase 1, with `assumed_default: intake-only`.

### 6. Counting

`total_sections` is the number of section entries across all phases (38 with the shape above). `answered_sections` is how many of them are answered.

### 7. Errors to fix first

Run the profile checker in progressive mode on the same profile, with the same evaluation date, and copy its `errors` list and its `exceptions` list. Errors held as open questions there do not appear here.

The two tools call each other in one direction each: this section runs the profile checker, and the checker's progressive mode asks this tool for its open sections. The checker needs only sections 1 to 6 (the open items and the phase standing), never this section, so build sections 1 to 6 as a core both tools share, and there is no loop. Build and prove the profile checker against its own fixtures before this report: every readiness fixture compares `errors_to_fix_first` and `exceptions` with the checker's findings. A brief to build the readiness report therefore includes the profile checker, which is the larger half of the work; a readiness tool built on an unproven checker proves `errors_to_fix_first` only as far as the readiness fixtures exercise it.

## Errors, warnings and exit status

- Exit 0: `errors_to_fix_first` is empty, whatever the phase standing, including an empty starter profile with `ready_for` null.
- Exit 1: any entry in `errors_to_fix_first`.
- Exit 2: the profile cannot be read or parsed, or is not a mapping, or `readiness.yaml` names a phase outside 1 to 5, a section twice, or a condition on a section no phase lists. Output `{"ok": false, "error": "<reason>"}`.

The report itself raises no warnings. Every message in `errors_to_fix_first` keeps the profile checker's shape (kind, code, location, message).

### Known limitations

A section that is legitimately empty never counts as answered: `jurisdictions: []` for an organization with no jurisdiction, `existing_tools` with every step null for an organization with no tools yet, and an empty `infrastructure_dependencies` or `blocking_cost_register`. Such an organization stays below the phase that requires the section. `crown_jewel_register` needing at least one entry is intended, because phase 1 protects one real asset.

## Acceptance fixtures

Base A is the complete profile the profile checker fixtures use (every section answered, no rule errors).

The fixtures ship as one file, `fixtures-readiness.yaml`, one entry per row below. Each entry has `name`, `exercises`, `built_from` (the row's edits in words), `today` (the evaluation date), the whole `profile` inline (or `profile_text`, the raw file content, for a profile that must fail to parse), and `expect`. Each entry runs with `--today` set to its `today`. A runner hands an inline `profile` to the tool as a file in any form that a YAML 1.2 core-schema parser reads back to the same value, JSON included (JSON is valid YAML 1.2 and keeps every type); the dates in a fixture profile are strings and must reach the tool as strings. `expect` gives `exit`, `ready_for` and `next_phase` (phase numbers or null: the report holds `{phase, name}` objects, and the runner compares their `phase`, a null report value comparing as null), and `errors_to_fix_first` (a list of `{kind, code}`, with `location` where it matters, compared as a multiset: the tool must report exactly these entries in any order, and a named location matches exactly); where the row needs them it also gives `ask_next` and `open` (the exact section paths, in readiness order), `answered_sections`, `total_sections`, `items` (for a named open item: `confirm`, `assumed_default`, `open_fields`, and `has_questions`, meaning `questions` is not null), `exceptions` (each entry's `code` and `declared`, exact, order ignored), and `repeat_identical`. A key absent from `expect` is not compared. A fixture with `profile_text` expects only `exit: 2`, with `{"ok": false, "error": "<reason>"}` on standard output.

| Fixture | Exercises | Expected |
|---|---|---|
| `fixture-rd-complete.yaml` | RD-2, RD-3, RD-6 | base A: ready 5, next null, `ask_next` empty, answered 38 of 38, exit 0 |
| `fixture-rd-empty-starter.yaml` | RD-2, RD-3, RD-8 | `profile-template.yaml` unchanged: ready null, next 1, `ask_next` holds every phase 1 section except `ledger_write_path`, which the starter already answers with its core default, exit 0 |
| `fixture-rd-phase1-only.yaml` | RD-2, RD-4, RD-5 | base A reduced to the phase 1 sections: ready 1, next 2, `ask_next` is every phase 2 section, `gate_failure_policy` among them with its questions and `Confirm (business and security risk owners)` |
| `fixture-rd-placeholder.yaml` | RD-1, RD-9 | base A with `separation.business_risk_owner_role: "FILL: who"`: ready 1, `ask_next` is that field with the `separation` row |
| `fixture-rd-invalid-enum.yaml` | RD-1 | base A with `delivery.deploy_cadence: hourly`: `delivery` open, ready null, next 1 |
| `fixture-rd-partial-section.yaml` | RD-1, RD-6, RD-11 | base A with `phase_1_boundary: { status: active }`: open, ready null, `open_fields` the five missing paths, answered 37 of 38 |
| `fixture-rd-boundary-practice-null.yaml` | RD-1 | base A (practice target) with `agent_drafts_only: null`: ready 5 |
| `fixture-rd-boundary-real-null.yaml` | RD-1, RD-11 | base A with `source: recent-finding` and `agent_drafts_only: null`: `phase_1_boundary` open with `open_fields` `phase_1_boundary.agent_drafts_only`, ready null, exit 0 |
| `fixture-rd-false-is-answer.yaml` | RD-1, RD-7, RD-9 | base A with `context_synthetic: false`, practice target: ready 5, `errors_to_fix_first` has `model.trifecta`, exit 1 |
| `fixture-rd-zero-is-answer.yaml` | RD-9 | base A with `modules.paved-road.evidence.classes_with_two_reproduced: 0`: ready 5 |
| `fixture-rd-modules-false-only.yaml` | RD-1, RD-9 | base A with every module off and every evidence number null, so `modules` holds only false and null leaves (`lead_text_quarantined` and both production-effects booleans false): `modules` is answered only because false is an answer, so ready 5, `open` empty, exit 0 |
| `fixture-rd-team-definition.yaml` | RD-4, RD-6 | base A without `separation.team_definition`: ready 1, `ask_next` has exactly that field, answered 37 of 38 |
| `fixture-rd-audit-null.yaml` | RD-1 | base A with `separation.internal_audit_role: null`: ready 1 |
| `fixture-rd-phase3-gap.yaml` | RD-2, RD-4, RD-6 | base A without `tools`: ready 2, next 3, `open` is `tools` only, answered 37 of 38 |
| `fixture-rd-phase3-evaluation-team.yaml` | RD-2, RD-4 | base A without `separation.evaluation_team` (the phase 3 entry check needs it named): ready 2, next 3, `ask_next` and `open` are that field only |
| `fixture-rd-escapes-unset.yaml` | RD-2, RD-4 | base A without `escapes` (optional in the schema, required for phase 2): ready 1, next 2, `ask_next` and `open` are `escapes` only |
| `fixture-rd-fix-cap-default-unset.yaml` | RD-1, RD-2, RD-4, RD-6 | base A without `fix_capacity.default_cap` (optional in the schema, required for phase 3): ready 2, next 3, `ask_next` and `open` are `fix_capacity.default_cap` only, answered 37 of 38 (`fix_capacity` itself stays answered), `errors_to_fix_first` empty, exit 0 |
| `fixture-rd-phase4-gap.yaml` | RD-2 | base A without `road`: ready 3, next 4 |
| `fixture-rd-later-not-blocking.yaml` | RD-4, RD-6 | phase 1 sections plus `scale`, missing phase 2: ready 1, `ask_next` holds only phase 2 items, `open` also holds phase 3 and 4 items, answered 14 of 38 |
| `fixture-rd-default-ledger.yaml` | RD-5 | base A without `ledger_write_path`: open item with `assumed_default: intake-only` |
| `fixture-rd-default-dials.yaml` | RD-5 | base A without `dials`: open item whose `assumed_default` lists every core dial at its default |
| `fixture-rd-no-default.yaml` | RD-5 | base A without `ownership`: `assumed_default` null, confirm `Confirm (security leadership)` |
| `fixture-rd-refusal-answered.yaml` | RD-7, RD-8 | base A with verifier equal to producer: ready 5, `errors_to_fix_first` has `sep.verifier-producer` and `model.phase1-boundary-unconfirmed` (the boundary names the old verifier), exit 1 |
| `fixture-rd-empty-list.yaml` | known limitation | base A with `jurisdictions: []`: ready 1, `jurisdictions` open |
| `fixture-rd-repeat.yaml` | RD-10 | base A run twice: identical output |
| `fixture-rd-exception-applied.yaml` | RD-7, RD-8 | base A with the closure acceptor equal to the fix author and a valid 90-day exception for `sep.fix-closure`: ready 5, answered 38 of 38, `errors_to_fix_first` empty, `exceptions` one entry `sep.fix-closure` (not declared), exit 0 |
| `fixture-rd-exception-declared.yaml` | RD-7 | base A with a valid exception for the architecture code `model.quarantine`: ready 5, `errors_to_fix_first` empty, `exceptions` one entry `model.quarantine` with `declared: true`, exit 0 |
| `fixture-rd-exception-expired.yaml` | RD-7, RD-8 | as exception-applied, but the exception expired the day before the evaluation date: ready 5, `errors_to_fix_first` has `check.exception-invalid` at `exceptions[0]` and `sep.fix-closure`, `exceptions` empty, exit 1 |
| `fixture-rd-unreadable.yaml` | exit 2 | a file that is not valid YAML (`profile_text`): exit 2 |
| `fixture-rd-not-mapping.yaml` | exit 2 | a file that parses to a list (`profile_text`): exit 2 |

No fixture is ready for phase 4. With the shipped `readiness.yaml`, phase 5 lists no section, so a profile with phases 1 to 4 answered is ready for phase 5 and `ready_for` is never 4: `next_phase: 5` cannot occur, and RD-3 at that step applies only to readiness data whose phase 5 lists a section. Every fixture runs on the shipped data, so none can reach it.

## Not in scope

Judging whether answers are correct for the organization, collecting confirmations, applying should-never rules (the profile checker does that), choosing between interview sources, and the phase exit tests themselves, which the organization runs from its own evidence.
