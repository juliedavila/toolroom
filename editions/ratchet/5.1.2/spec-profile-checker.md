# Specification: profile checker

The profile checker reads an organization's `profile.yaml` and writes one JSON report. It checks the profile against `profile-schema.yaml`, applies every should-never rule in `rules.yaml`, honours the exceptions the profile records, runs the consistency checks no exception can cover, and adds warnings. A profile with any error is refused; warnings never refuse. The organization's agent runs it after every change to the profile and before tailoring.

## A run reads one profile in one mode and writes one report

**Two modes.** Complete mode, the default, reports every unanswered value as an error. Progressive mode (`--progressive`) is for a profile still being filled in: it holds the schema findings in sections the organization has not answered yet as open questions, and passes a profile that has no errors and is ready for at least phase 1.

**One run, in this order.**

| Step | What it does | What it reads | Section |
|---|---|---|---|
| 1 | Read the profile; a profile that cannot be read stops the run with exit 2 | the file | "Errors, warnings and exit status" |
| 2 | Validate against the schema | the profile as written | 2 |
| 3 | Report each placeholder (complete mode only) | the profile as written | 3 |
| 4 | Validate each recorded exception | the copy (section 1) | 4 |
| 5 | Apply the should-never rules, the consistency checks and the warnings | the copy, except the three readings section 1 names under "the profile as written" | 5 to 12 |
| 6 | Report each valid exception that covered nothing | the copy | 4 |
| 7 | Progressive mode only: hold the schema findings that lie in open sections | run step 2's findings and the readiness tool's open sections | 13 |

**How the rules are written.** Each rule names the profile fields it reads and says when it stays silent. The terms in section 1 mean the same in every rule, and no later section redefines them. Where a rule turns on more than one condition, a table gives each case. A rule that compares one field with several roles gives one finding, however many of the roles it matches. Behavior this specification does not describe is outside the checker ("Not in scope").

## Ideal state

- **PC-1** Schema validation follows section 2: type, enumeration, required, nullable, minimum, arrays and nested objects.
- **PC-2** A placeholder is an error at its path in complete mode and an open question in progressive mode (section 3). Either way the rules read it as unanswered, since they read the copy (section 1), so a rule whose condition is an unanswered or missing value fires on it in both modes, and progressive mode holds no rule finding. A `build_or_buy` entry that is itself a placeholder is one such case: it also gives `check.build-or-buy-choice`, in both modes (section 2, item 8).
- **PC-3** A rule compares answered values only (section 1): a value that is absent, null or a placeholder never makes two values equal or different and never triggers a should-never code. The findings whose condition is that a value is missing are the defined exceptions, and the row or paragraph that defines each one says so. Eight warnings wait until a section is settled, which section 1 judges on the profile as written: `warn.no-crown-jewel`, `warn.no-tools`, `warn.no-road-assets`, `warn.no-idp`, `warn.fix-cap-default-unset` and `warn.injection-detection-side-unset` wait for their own section, and `warn.gate-seeding-unset` and `warn.dial-unset` wait for `dials`. Four injection checks wait the same way (section 10, "Attack injection").
- **PC-4** Each should-never code refuses the profile when its condition holds and no valid exception covers it (section 5).
- **PC-5** A valid exception turns each refusal of its code into a warning and an entry in `exceptions` (section 4).
- **PC-6** An exception that fails the exception policy is an error, and the refusals it would have covered stay errors.
- **PC-7** A phase-1-only exception is valid only on the narrower path in section 4.
- **PC-8** An exception lasting longer than the policy allows, or already expired on the evaluation date, is invalid.
- **PC-9** A valid exception nothing needs is a warning; one for a `model.` code is listed as a declared architecture exception.
- **PC-10** While the phase 1 boundary is active, each of its conditions follows section 6: answered false it refuses under `model.trifecta`, and left unanswered for a real-finding source it warns.
- **PC-11** An active phase 1 boundary whose confirmer differs from the independent reviewer (`separation.verifier_team`) refuses under `model.phase1-boundary-unconfirmed` (section 6).
- **PC-12** Consistency checks are always errors, and no exception covers them.
- **PC-13** The ownership answers give one of three verdicts (section 7).
- **PC-14** A module switched on without its entry evidence refuses under `modules.before-evidence`; modules that pass are listed and counted in the fitted part total (section 8).
- **PC-15** The dial register follows section 9.
- **PC-16** The report has the shape under "Outputs"; the exit status is 0 exactly when `ok` is true, and 2 for a profile that cannot be read.
- **PC-17** The same profile, data files, mode and evaluation date give the same report, byte for byte.
- **PC-18** Every finding carries a code listed in `rules.yaml`, and each finding is reported once ("Outputs").
- **PC-19** A module switched on while a module it depends on is not in `enabled_modules` (switched off, or switched on without its entry evidence) warns, and never refuses (section 8).
- **PC-20** The module inventory follows section 8, "Module inventory".
- **PC-21** The escape definition follows section 10, "Escapes".
- **PC-22** Design limits follow section 9, "Design limits".
- **PC-23** The attack-injection notice policy follows section 10, "Attack injection".
- **PC-24** The sponsor's thresholds follow section 10, "Thresholds".
- **PC-25** The exploited window and the disclosure section are recorded and never compared (section 10, "Exploitation and disclosure").
- **PC-26** Stable team ids and the frozen baseline follow section 10, "Team ids and the frozen baseline".
- **PC-27** The deploy gate's added-latency objective and the regression time budget are compared only as `check.latency-below-budget` says (section 11).
- **PC-28** Gate seeding follows section 10, "Gate seeding". The check verifies the setup, never the vigilance.
- **PC-29** Each of the three dials section 9 names under "Unset dials" warns while a settled register holds no number for it, and the warning says what holds meanwhile.

## Inputs

- `profile.yaml`, read as YAML 1.2 (the core schema). When a mapping repeats a key, the last value is the one read. Aliases are expanded. An unquoted date such as `2026-08-15` stays a string, as the schema types every date. A YAML 1.1 reader turns it into a timestamp, and the shipped standalone profiles, whose dates are unquoted, would then fail with `schema.type`.
- `profile-schema.yaml`, a small subset of JSON Schema (section 2).
- `rules.yaml`: `families` (each with `codes` and `protects`), `conditions`, `exception_policy` (`max_days`, `phase_1_only.codes`, `phase_1_only.ends_at`, `phase_1_only.review_field`, `phase_1_only.exit_field`), the finding codes outside the families (`schema_codes`, `check_codes`, `warning_codes`), the ownership verdict table (`ownership_verdicts`), and the parts that enforce a rule (`rule_enforcing_parts`).
- `model.yaml`: part ids in file order, `trust_zone`, `role_class`, `load_bearing`, `model_boundary`, `module`, `agent_reachable`, and each relationship's `id` and `to`.
- `modules.yaml`: `wiring_ladder` (its keys, lowest first) and, per module, `depends_on` and `interface_points` (`id`, `relationships`, `target`).
- `quality.yaml`: `tiers`, each with `name`, `failure_mode` and `defaults` (the targets a profile may override); `elements`, part id to a list whose first two items are the part's tier and failure mode (a third item, a note, is not read); and `dials`, each with `default`, `bound`, `safe` (`up` or `down`) and an optional `owner`, whose one value `organization` marks a dial whose turner is the organization's choice.
- `realization.yaml`: `planes`, and `elements` (part id to its `plane`).
- In progressive mode only: `readiness.yaml` and the interview table in `R1-rules-and-readiness.md`, read as the readiness specification says. The readiness tool reads the profile as written, and its `open` list gives section and field paths in the location form of "Outputs" (`dials`, `separation.business_risk_owner_role`).
- Options: `--progressive`, and `--today YYYY-MM-DD`, the evaluation date (default the current date in UTC). The run checks the form of `--today` and nothing else: four digits, a hyphen, two digits, a hyphen and two digits, with nothing before or after. Any other value exits 2 ("Errors, warnings and exit status"). A value of that form is the evaluation date even when it is no date in the sense of section 1, such as `2026-13-45`. The report writes it as given, and a rule that asks whether a date is before it compares the two strings. The alignment limit in section 8 is the one rule that counts days up to the evaluation date; with such a value it raises nothing.
- The data files are the edition's files as shipped, all in one folder, which the caller names (an option or a setting; the mechanism is the builder's choice). A fixture runner points the checker at the edition folder.

## Outputs

A JSON report on standard output:

```json
{
  "ok": false,
  "mode": "complete",
  "profile": "example",
  "evaluated_on": "2030-01-04",
  "errors": [
    { "kind": "should-never", "code": "sep.verifier-producer", "location": "separation.verifier_team",
      "message": "The verifier is the team that runs the agents.", "card": "independent-acceptance", "invariant": "I4" },
    { "kind": "consistency", "code": "check.exception-invalid", "location": "exceptions[0]",
      "message": "invalid exception: no compensating controls; expired on 2029-12-01", "card": null, "invariant": null }
  ],
  "warnings": [
    { "kind": "warning", "code": "warn.register-gap", "location": "crown_jewel_register",
      "message": "1 of 4 assets unattested (asset-c); gates treat them as critical", "card": null, "invariant": null }
  ],
  "exceptions": [
    { "code": "sep.fix-closure", "card": "independent-acceptance", "message": "...", "expires_on": "2030-03-01",
      "accepted_by_role": "...", "concurrence_role": "...", "phase_1_only": false, "declared": false }
  ],
  "ownership_verdict": "separated by team, shared leader on some checks",
  "register_gap": { "unattested": 1, "register_size": 4 },
  "enabled_modules": ["tool-portfolio"],
  "parts": { "core": 101, "fitted": 110 },
  "progress": null
}
```

| Field | Content |
|---|---|
| `ok` | Complete mode: `errors` is empty. Progressive mode: `errors` is empty and the readiness tool reports at least phase 1. |
| `mode` | `complete` or `progressive`. |
| `profile` | `profile.name` when it is answered, else null; a number or boolean name is written as its text (`2026`, `true`). A list or mapping name is a `schema.type` finding, and what `profile` then holds is not defined: no fixture compares it. |
| `evaluated_on` | The evaluation date. |
| `errors`, `warnings` | Findings, shaped as the next table says. `errors` lists the schema findings first, then the `check.unanswered` findings, then the rule findings; within each group the implementation fixes the order. Progressive mode reports no `check.unanswered`, so that group is empty there. |
| `exceptions` | One entry per refusal a valid exception covers, and one per declared architecture exception (section 4). |
| `ownership_verdict` | The verdict text, or null (section 7). |
| `register_gap` | `{unattested, register_size}` (section 12, "Register staleness"). |
| `enabled_modules` | The modules switched on that passed their entry evidence, in the order section 8 gives. |
| `parts` | `core` counts every `model.yaml` element with no `module`, the roles people hold included; `fitted` adds the elements of each module in `enabled_modules`. The edition's prose counts parts without the roles, so its figures are lower by the number of roles; both come from the same model. |
| `progress` | Null in complete mode. In progressive mode, the readiness report's `ready_for`, `next_phase`, `answered_sections`, `total_sections`, `ask_next` and `open`, in the readiness report's own shapes (`ready_for` and `next_phase` are `{phase, name}` objects or null), plus `schema_errors_held_as_open`, the number of schema findings run step 7 held (0 when none). The held findings are not listed; `open` names the sections and fields that hold them. |

Each finding has these fields:

| Field | Content |
|---|---|
| `kind` | `schema` for a code in `schema_codes` (`schema.required`, `schema.type`, `schema.enum`, `schema.minimum`); `consistency` for a code in `check_codes` (all start `check.`); `should-never` for a code in `families`; `warning` for a code in `warning_codes` (all start `warn.`). |
| `code` | A code `rules.yaml` lists. |
| `location` | The profile path most directly involved, written without a leading `profile.` (`separation.verifier_team`, `exceptions[0]`, `tools.existing.dast[0]`), or `profile` for a whole-profile finding. The section that defines each code gives its location. |
| `message` | Free text. A message never prints an unanswered value as text such as "undefined"; it says "unanswered". |
| `card` | Should-never findings: the name of the family holding the code. Every other finding: null. |
| `invariant` | Should-never findings: the card's first `protects` entry, except that `tier.failure-mode-override` names I5 for tier T1 and I6 otherwise, `admin.control-plane-operator` names I7 for a model-boundary part and I1 otherwise, and `bought.without-org-controls` names the first invariant of its first rule-enforcing part (section 5). Every other finding: null. |

Each finding is reported once: no condition raises the same finding twice. Findings about different parts are different findings even when they share a code and a location, as the per-part plane findings do, each message naming its part; a checker that drops duplicates compares kind, code, location and message together.

Each `exceptions` entry has `code`, `card` (the family holding the code, for a declared architecture exception too), `message` (the covered refusal's message, or for a declared architecture exception a text naming its code), `expires_on`, `accepted_by_role`, `concurrence_role`, `phase_1_only` (true when the exception took the phase-1-only path) and `declared` (true only for a declared architecture exception).

The consolidated `fixtures-profile-checker.yaml` suite and the supplemental standalone profile fixtures both belong to acceptance; the consolidated suite is not replaced by `expected-results.yaml`. This specification's precise algorithms govern the checker: exception `scope` is recorded and never enforced; frozen-baseline selection uses the last amendment holding a string `sha256`, with no date-validity condition. Descriptive rule notes about narrowed scope or a last dated amendment do not change these algorithms. The phase-one-only held-schema count, the absent-dials count and empty-register missing-dial count are derived by schema traversal and dial inventory, with exact counts supplied by the fixtures. Progressive mode may have empty `errors`, `ready_for: null` and exit 1 for open required answers. Fixture evaluation dates come from each fixture input, never the wall clock.

## Behavior

### 1. Terms

These terms carry one meaning throughout this specification.

| Term | Meaning |
|---|---|
| placeholder | A string matching `^\s*FILL\b`. |
| the profile as written | The profile exactly as read from the file, placeholders included. Run steps 2 and 3 read it. A rule reads it in three places only: the settled test (below), a `build_or_buy` entry whose `choice` is a placeholder (section 2, item 8), and a team id that is a placeholder (section 10, "Team ids and the frozen baseline"). |
| the copy | The profile with every placeholder set to null and every placeholder list item removed. Run steps 4 to 6 read the copy, so two placeholders never compare equal and a list of placeholders reads as empty. A list index in a rule finding's location is the item's position in the copy, which differs from its position in the file only after a placeholder list item. |
| answered | Present, not null and not a placeholder. An empty string is answered, so two empty strings are equal and an empty string differs from a named role. |
| unanswered | Absent, null or a placeholder: every value that is not answered. Where a rule acts on an unanswered value, absent and null act alike. |
| missing | The condition of a warning about an absent value: the value is absent or null in the copy, so a placeholder counts as missing. Such a warning fires as soon as its condition holds, unless its row says it waits for a settled section. |
| A equals B | Both are answered and identical: the same strings, with spelling, case and spaces significant. The checker never decides that two different names are one team; `separation.team_definition` is recorded and never enforced. |
| A differs from B | Both are answered and not identical. |
| is false | The boolean false; null is not false. So `cadence.continuous-without-preapproval` needs `standard_change_preapproval: false`, `shipthrough.no-replay` needs `replay_on_recovery: false`, `infra.idp-not-fail-closed` needs an answered posture, and `partition.no-jurisdiction-key` needs `data_partitioning.keys` answered as a list. |
| carries an answer | At least one leaf of the value is meaningful: a string that is not empty after trimming and is not a placeholder, any number (0 included) or any boolean (false included). This is the test the readiness specification defines in step 1 of "Answered sections". Null, absent, an empty string, an empty list, and an object or list whose leaves are all null or empty carry none; the starter profile's `existing_tools`, every step null, carries none. It applies only where a rule names it. |
| settled | A section is settled when, in the profile as written, it carries an answer and holds no placeholder anywhere inside it. Every rule that waits for a settled section uses this test. A placeholder anywhere in the section keeps it unsettled, although the copy reads that placeholder as null and the section would carry no placeholder there. Once the section is settled, the rule reads its values in the copy as usual. |
| is set (in a `rules.yaml` condition) | Answered. An empty string is set. |
| date | A string that, after trimming spaces, has the form `YYYY-MM-DD` with a month from 01 to 12 and a day from 01 to 31. A day past the end of its month is still a date, and wherever a rule counts days or months from it, it stands for the same count of days into the next month (`2027-02-30` is 2027-03-02). A rule that asks whether one date is before another compares the two trimmed strings. |
| days from A to B | The calendar-date difference B minus A, with neither end counted twice: from the 1st to the 2nd is one day. |

Example: `producer_team: validation` and `approver_team: FILL who approves` raise nothing; with `approver_team: validation`, `sep.producer-approver` fires.

### 2. Schema validation

Run step 2 reads the profile as written and validates it recursively from the root. A top-level key's path is its name; a nested key's path is its parent's path, a dot and its name; a list item's path is the list's path and `[i]`.

1. A placeholder value is skipped here. Section 3 reports it, so a placeholder in an enumerated field gives `check.unanswered` alone.
2. Absent and null values:

   | Case | Finding |
   |---|---|
   | A key the object's `required` list names is absent | `schema.required` at the object's path followed by the key (`phase_1_boundary.confirmed_by_role`), whether or not the key's schema says `nullable: true` |
   | A key is present and holds null, required or not | None when its schema says `nullable: true`; otherwise `schema.required` at its path, and that path is checked no further |
   | A key the schema declares but does not require is absent | None: an optional value is left out by omitting its key |
   | A list item is null | None when the list's `items` schema says `nullable: true`; otherwise `schema.required` at the item's path (`tools.delivery_metrics_collected[0]`) |

3. Type: `object`, `array`, `string`, `number` (integers count) or `boolean`. A mismatch is `schema.type`, and the path's other keywords are skipped.
4. `enum`: the value equals one member exactly; case matters. A miss is `schema.enum`.
5. `minimum`: a number below it is `schema.minimum`.
6. Objects: each declared property that is present is validated; undeclared keys are accepted.
7. Arrays: each item is validated against `items`.
8. `build_or_buy` entries. The schema types `build_or_buy` only as a nullable object, and this step adds the entry fields. It applies to every key of `build_or_buy`, unknown keys included, and to an entry whose `choice` is a placeholder. It skips a field whose value is a placeholder:

   | Field | Accepted values | Otherwise |
   |---|---|---|
   | `choice` | required; one of `build`, `buy`, `reuse`, `undecided` | `check.build-or-buy-choice` (below) |
   | `product` | a string or null | `schema.type` at the field |
   | `organization_controls` | a boolean (null is not one) | `schema.type` at the field |
   | `note` | a string (null is not one) | `schema.type` at the field |
   | `administered_by` | a string or null | `schema.type` at the field |

   Only `choice` is required. A field the entry leaves out raises nothing here, so an entry without `organization_controls` gives no `schema.type`. A field that is present, null included, is checked as the table says.

   An entry that is not an object (null included, so an entry that is itself a placeholder, null in the copy, counts here as well as giving `check.unanswered` in complete mode), or whose `choice` is missing or outside the four, is reported once, as `check.build-or-buy-choice` at `build_or_buy.<key>.choice`, and no other validator reports it again. That finding is a consistency finding: run step 5 raises it with the rule findings, and progressive mode never holds it. An entry under a key that names no part or plane gets `check.build-or-buy-key` instead (section 5). A `choice` that is a placeholder in the profile as written is an open answer, never a bad one: complete mode reports it as `check.unanswered` alone, progressive mode holds it, and no rule in section 5 reads that entry until it is answered. The field checks in the table above still run on that entry. So in progressive mode an entry that is itself a placeholder fails the run, while an entry whose `choice` alone is a placeholder is held (PC-2).

Example: `delivery.deploy_cadence: hourly` fails the enumeration. `crown_jewel_register[0].confirmed_by: null` passes (nullable); `separation.verifier_team: null` fails.

### 3. Placeholders

In complete mode, run step 3 reports each placeholder in the profile as written as `check.unanswered`, kind `consistency`, at its path; a placeholder list item sits at its own index in the file. Progressive mode reports no placeholder: the readiness tool counts its section open. No rule sees a placeholder as a value, since the rules read the copy, where it is null. A rule that acts on an unanswered value therefore acts on a placeholder in both modes (PC-2).

### 4. Exceptions

Run step 4 validates each entry of `exceptions`, in the copy, before any rule runs. Every reason that holds is collected into one `check.exception-invalid` at `exceptions[i]`. An entry takes the phase-1-only path when its `phase_1_only` is true, and the standard path otherwise.

| Path | The exception is invalid when |
|---|---|
| Both | `rule` is not a code in any family. |
| Both | `reason` is absent, null, or a string that is empty after trimming spaces. A `reason` of another type is a `schema.type` finding and counts as given here. |
| Both | `accepted_by_role` is answered and equals `concurrence_role`: one role never both accepts and concurs. |
| Both | `compensating_controls` is not a list, or is empty in the copy. |
| Both | `reviewed_with` is not a list, or has fewer than two items in the copy; items are counted as listed, so the same role written twice counts as two. |
| Both | The days from `accepted_on` to `expires_on` are not positive, a value that is not a date counting as not positive; or they exceed `exception_policy.max_days` (180). Only the first of these two that holds is a reason. One lasting exactly 180 days passes, and 181 fails. |
| Both | `expires_on` is before the evaluation date. Expiring on the evaluation date is still valid. |
| Standard | `separation.business_risk_owner_role` is unanswered, or `accepted_by_role` is not identical to it. |
| Standard | `separation.security_risk_owner_role` is unanswered, or `concurrence_role` is not identical to it. |
| Phase-1-only | `risk_owner_review_on` is absent, not a date or not after `accepted_on`; `phase_1_exit_on`, when recorded, is not a date; `expires_on` exceeds either bound; or the evaluation date is on or after either bound. Record the actual exit date on the exception as soon as phase 1 exits. The bound is the earlier of that exit and the risk owner's review date. A continue decision cannot extend it. |
| Phase-1-only | Both risk owner roles are answered: from then on they accept it as a standard exception. |
| Phase-1-only | `rule` is a family code that is not in `exception_policy.phase_1_only.codes`. |
| Phase-1-only | `separation.program_decision_owner_role` is unanswered, or `accepted_by_role` is not identical to it. |
| Phase-1-only | `separation.verifier_team` is unanswered, or `concurrence_role` is not identical to it. |
| Phase-1-only | The program decision owner equals the producer team or the verifier team. |

"Not identical" in the owner rows is plain inequality of the two values. An `accepted_by_role` or `concurrence_role` that is unanswered never matches the owner, so an exception nobody named accepted is invalid. An entry that is not a mapping reads every field as absent and is invalid with each reason that follows from that. An `accepted_on` or `expires_on` that is not a date makes the days not positive (the duration row), and an `expires_on` that is not a date adds no expiry reason. `on_expiry` (`revert` or `review`) is required by `profile-schema.yaml`; a missing one is `schema.required` at `exceptions[i].on_expiry`, and the table does not repeat it. `scope` is recorded and never enforced.

How valid exceptions apply:

| Case | Result |
|---|---|
| A should-never condition holds and a valid exception names its code | `warn.exception-applied` at the refusal's location, and one `exceptions` entry carrying that refusal's message, `declared: false`. One exception covers every instance of its code, so a code that fires twice gives two warnings and two entries. |
| Several valid exceptions name the same code | The first valid one in list order covers the code and is the one reported. The others are neither errors nor `warn.exception-unused`, and no `exceptions` entry names them. |
| An invalid entry names a code a valid entry also names | The invalid entry is still `check.exception-invalid`. |
| Run step 6: a valid exception covered nothing, and its code does not start with `model.` | `warn.exception-unused` at `exceptions[i]`. |
| Run step 6: a valid exception covered nothing, and its code starts with `model.` | An `exceptions` entry with `declared: true`. Most architecture codes cannot be detected from a profile, so declaring them is how the organization records them. |

An exception for a `model.` code the checker does raise (`model.trifecta`, `model.phase1-boundary-unconfirmed`) that covers a refusal is an ordinary covered refusal, with `declared: false`.

Example:

```yaml
separation: { fix_author_team: service engineering, closure_acceptor_team: service engineering,
              business_risk_owner_role: business risk, security_risk_owner_role: security risk, ... }
exceptions:
  - { rule: sep.fix-closure, reason: "quality team not staffed yet", accepted_by_role: business risk,
      concurrence_role: security risk, accepted_on: D-10, expires_on: D+80, on_expiry: revert,
      compensating_controls: ["re-test 10 percent of closures"], reviewed_with: [business risk, security risk] }
```

Result: no error, `warn.exception-applied`, one `exceptions` entry. With `accepted_by_role: service engineering`, one reviewer and `expires_on: D-1`, the result is one `check.exception-invalid` carrying three reasons, plus the `sep.fix-closure` error. On the phase-1-only path, with risk owners unnamed and `program_decision_owner_role: sponsor`, the same record marked `phase_1_only: true`, accepted by the sponsor with the verifier team concurring for 50 days with a later risk-owner review date and no phase 1 exit, is valid; exceeding the review or exit bound, or naming `model.trifecta`, or with both risk owners named, it is invalid.

### 5. Should-never codes

For each code, the condition is its entry in `rules.yaml` `conditions`, read with the terms of section 1. A code fires once per instance that meets its condition (one register entry, one dial, one part). These codes depend on design data or need more than their condition says:

- **`partition.no-jurisdiction-key`** counts the items of `jurisdictions` in the copy, duplicates included, and fires when there are two or more and `data_partitioning.keys` is a list with no item equal to `jurisdiction`.
- **`cadence.continuous-without-preapproval`** reads the cadence rung, `delivery.starting_cadence_rung`; `delivery.deploy_cadence` plays no part. It fires when that rung is `continuous` and `delivery.standard_change_preapproval` is false.

- **Part sets.** A `build_or_buy` key names a part id in `model.yaml` (that part) or a plane in `realization.yaml` `planes` (every `model.yaml` part whose realization `plane` is that name, in `model.yaml` order, whatever its module, so a part of a module that is switched off belongs to its plane's set too). Any other key is `check.build-or-buy-key` at `build_or_buy.<key>`, and every rule in this section skips that entry, the choice check included; section 2's field type checks still run on it. A part's own entry overrides its plane's entry once the part's `choice` is one of the four choices: the plane's entry then leaves that part out of its set. Nothing passes from the plane's entry to the part: the part's `choice`, `product`, `organization_controls` and `administered_by` are the ones in its own entry, and a field the part's entry leaves out stays unanswered for that part even when the plane's entry answers it. While the part's own `choice` is a placeholder or not one of the four choices, the plane's entry still covers the part.
- **A part enforces a rule** when `rules.yaml` `rule_enforcing_parts.parts` lists it (`s5.fixture-oracle-registry`, `s5.protected-evidence-store`, `s5.evidence-intake-validator`, `s5.finding-ledger`, `s5.independent-verifier`, `s5.disposition-review`, `s5.review-console`, `s6.change-closure-records`, `s4.request-data-gate`, `s4.response-proposal-gate`), with the invariants listed there; otherwise when it matches a `criteria` row, checked in order, and the first matching row gives its invariants: its `role_class` is `control` (I1, I6); its `trust_zone` is `control` (I1, I6); its quality tier is T0 (I6); it has `load_bearing: true` (I7).
- **`bought.without-org-controls`**: the entry's `choice` is `buy`, its `organization_controls` is not true, and at least one part in its set enforces a rule. One finding per entry. Its invariant is the first invariant of the first part in the set that enforces a rule.
- **Entries no rule reads.** An entry that `check.build-or-buy-choice` reports, or whose `choice` is a placeholder in the profile as written, feeds no rule in this section: it raises no `bought.*` or `admin.*` finding and takes no part out of its plane's set.
- **Administration.** A fail-closed control is a part with tier T0 in the `control` zone, or with `model_boundary: true`. For an entry whose `administered_by` is answered, each part in its set is checked against row 1. Row 2 is checked only for a part on which row 1 raised nothing: a part that is no fail-closed control, or a fail-closed control whose `administered_by` does not differ from the operator role.

  | Row | Part | Raises when | Code |
  |---|---|---|---|
  | 1 | a fail-closed control | `administered_by` differs from `separation.control_plane_operator_role` | `admin.control-plane-operator` (I7 for a model-boundary part, I1 otherwise) |
  | 2 | a part with tier T0 in the `execution` zone | `administered_by` equals the producer team | `admin.execution-by-producer` |

  At most one finding per part, each message naming its part.
- **`tier.failure-mode-override`**: one finding per key `failure_mode`, `intent` or `name` under a known tier, whatever the key holds (null and a placeholder included): the key's presence is the change. A known tier is a key of `quality.yaml` `tiers`, and its `defaults` are that tier's `defaults` there. An unknown tier is `check.tier-override` at `tier_overrides.<tier>`; any other key outside a known tier's `defaults` is `check.tier-override` at `tier_overrides.<tier>.<field>`.
- **`gate.crown-jewel-open-with-record`** fires once for `by_tier.crown-jewel` and once per matching adjustment. An adjustment whose `path_tier` is `crown-jewel` gives one finding at most: this error when its posture is `fail-open-with-record`, else `warn.adjustment-crown-jewel` at `gate_failure_policy.blocking_cost_adjustments[<i>]` when its posture is answered and not `fail-closed`.
- **`sep.evaluator-conflicted`** is the phase 3 entry check for the automated verifier and evaluator: one finding at `separation.evaluation_team`, naming every role it equals among the verifier team, the paved-road owner, the tool owner and the portfolio decision owner. The code fires whenever its condition holds, in either mode and whatever the phase standing; the readiness tool lists `separation.evaluation_team` as a phase 3 section, and that is what holds phase 3 back.
- **`sep.purple-team-decides`**: one finding at `separation.purple_team`, naming every role it equals, in this order: the verifier team, the team that owns proof conditions (`separation.fixture_oracle_owner_team`), the security risk owner, and the team that accepts detections (`separation.detection_owner_team`, optional; unanswered, it is not compared). The purple team field is optional; unanswered, the code never fires. The purple team may equal the producer team.
- **`creation.author-merges`, `creation.catch-layer-conflicted` and `creation.drift-reporter-is-reviewer`** read the roles under `modules.secure-creation` whether or not the module is enabled, one finding each.
- Defined in other sections: `dial.bound-looser` and `dial.producer-turned` (section 9, its "Design limits" part for a limit the producer team set); `limit.grant-beyond-design` (section 9, "Design limits"); `modules.before-evidence` and `modules.alignment-overdue` (section 8); `ownership.broken-separation` (section 7); `model.trifecta` and `model.phase1-boundary-unconfirmed` (section 6).

**Locations.** Each should-never finding sits at the location below, and a valid exception turns it into `warn.exception-applied` at the same location. `<i>` and `<j>` are zero-based list indexes, `<key>` the `build_or_buy` key, `<tier>` and `<field>` the overriding tier and key.

| Code | Location |
|---|---|
| `sep.producer-approver` | `separation.approver_team` |
| `sep.tool-propose-authorize` | `existing_tools.STEP-4` |
| `cadence.continuous-without-preapproval` | `delivery.standard_change_preapproval` |
| `sep.oracle-producer` | `separation.fixture_oracle_owner_team` |
| `sep.verifier-producer` | `separation.verifier_team` |
| `sep.fix-closure` | `separation.closure_acceptor_team` |
| `sep.business-risk-owner` | `separation.business_risk_owner_role` |
| `sep.security-risk-owner` | `separation.security_risk_owner_role` |
| `sep.evaluator-conflicted` | `separation.evaluation_team` |
| `sep.purple-team-decides` | `separation.purple_team` |
| `ownership.broken-separation` | `ownership` |
| `intake.ledger-direct-write` | `ledger_write_path` |
| `leads.as-coverage`, `tools.unsampled-yield`, `tools.owner-grades-own`, `tools.decision-conflicted` | `tools.leads_count_as_coverage`, `tools.yield_requires_sampling`, `tools.yield_owner_team`, `tools.decision_owner_role` |
| `attest.owner-drafts` | `attestation.drafter_team` |
| `attest.self-confirmed` | `crown_jewel_register[<i>]` |
| `shipthrough.acceptor-not-business-owner`, `shipthrough.acceptor-conflicted` | `gate_failure_policy.override.acceptor_role` |
| `shipthrough.no-concurrence` | `gate_failure_policy.override.concurrence_role` |
| `shipthrough.no-replay` | `gate_failure_policy.override.replay_on_recovery` |
| `gate.crown-jewel-open-with-record` | `gate_failure_policy.by_tier.crown-jewel`, or `gate_failure_policy.blocking_cost_adjustments[<i>]` |
| `road.owner-verifies` | `road.owner_team` |
| `road.owner-metrics` | `road.metrics_owner_team` |
| `road.conformance-declared`, `road.service-granularity`, `road.unvetted-version`, `road.zero-sample`, `road.escape-hatch-free`, `road.opt-in-without-check` | the road field the condition reads: `road.conformance_basis`, `road.conformance_granularity`, `road.vet_each_version`, `road.covered_sample_share`, `road.escape_hatch_reinstates_regressions`, `road.opt_in_coverage_requires_call_site_check` |
| `infra.idp-not-fail-closed`, `infra.siem-continue-without` | `infrastructure_dependencies[<i>]` |
| `tier.failure-mode-override` | `tier_overrides.<tier>.<field>` |
| `bought.without-org-controls`, `admin.control-plane-operator`, `admin.execution-by-producer` | `build_or_buy.<key>` |
| `admin.cpo-is-platform`, `admin.cpo-is-producer`, `admin.cpo-is-verifier` | `separation.control_plane_operator_role` |
| `partition.cross-reads`, `partition.no-jurisdiction-key` | `data_partitioning.cross_partition_reads`, `data_partitioning.keys` |
| `creation.author-merges`, `creation.catch-layer-conflicted`, `creation.drift-reporter-is-reviewer` | `modules.secure-creation.merged_by`, `modules.secure-creation.catch_layer_assigner_team`, `modules.secure-creation.drift_reporter_team` |
| `modules.before-evidence` | `modules.<module>` |
| `modules.alignment-overdue` | `current_practice.modules[<i>].points[<j>]` |
| `dial.bound-looser`, `dial.producer-turned` | `dials[<i>]`, the first entry with that dial's id; for a design limit, `agent_limits.limits[<i>]` |
| `limit.grant-beyond-design` | `agent_limits.grants[<i>]` |
| `model.trifecta` | `phase_1_boundary.<condition>` |
| `model.phase1-boundary-unconfirmed` | `phase_1_boundary.confirmed_by_role` |

The other `model.` codes are never raised from a profile; they appear only in `exceptions`, with `declared: true`, when the organization declares one.

### 6. Phase 1 boundary

Everything in this section runs only while `phase_1_boundary.status` is `active`; with `status: retired` nothing here runs.

1. When `confirmed_by_role` differs from `separation.verifier_team`, raise `model.phase1-boundary-unconfirmed`. An unanswered confirmer or verifier team raises nothing here (PC-3).
2. The conditions checked depend on `source`. An unanswered `source` reads as `practice-target`, and any other answered value reads as a real-finding source.

   | `source` | Conditions checked | A condition answered false | A condition unanswered (absent, null or a placeholder) |
   |---|---|---|---|
   | `practice-target` | `target_written_by_team`, `outsider_text_excluded`, `agent_egress_model_route_only`, `context_synthetic` | `model.trifecta` at `phase_1_boundary.<condition>`, one per condition | silent |
   | `discovery-finding` or `recent-finding` | `agent_drafts_only`, `agent_egress_model_route_only`; the other three may be false | `model.trifecta` at `phase_1_boundary.<condition>`, one per condition | `warn.phase1-leg-unanswered` at `phase_1_boundary.<condition>`, one per condition: it must be true before phase 1 starts |

   `agent_drafts_only` is nullable, and the template prefills it with null: for a practice target null or absent is a complete answer (no schema finding, no warning, and the readiness tool counts the section answered); for a real-finding source the same null warns as the table says, never an error, so a profile that passed before stays valid, and the readiness tool keeps `phase_1_boundary` open with `phase_1_boundary.agent_drafts_only` as its open field. The other four conditions are not nullable, so null in any of them is `schema.required` whatever the source. For a real-finding source, a null or placeholder `agent_egress_model_route_only` gives both the schema or `check.unanswered` finding and `warn.phase1-leg-unanswered`; neither suppresses the other.
3. `runner_limit` of `scoped-role` gives `warn.phase1-runner-scoped-role` at `phase_1_boundary.runner_limit`: a role scoped to the test environment is not bound to the exact approved action, and phase 2 replaces it with an exact grant the runner presents. `action-bound`, `other` and an unanswered value are silent.

`model.trifecta` is never in the phase-1-only codes, so only the named risk owners can except it.

Example: `source: recent-finding`, `agent_drafts_only: false`, `context_synthetic: false`: one `model.trifecta` error, for `agent_drafts_only`. With `agent_drafts_only` absent instead: no error, one warning.

### 7. Ownership verdicts

The verdict reads `ownership.q1_checking_team`, `q2_runtime_producer` and `q3_promotion_authority`; with any of the three unanswered, the verdict is null and nothing in this section is raised. It uses `rules.yaml` `ownership_verdicts`. A `broken` or `shared` row applies when every question it names has one of the listed answers. The broken checks are the union of the broken rows that apply; the shared-leader checks are the union of the shared rows that apply, less any broken check; both are reported in the order of `checks`. The verdict is the `verdicts.broken` text when any broken check applies, else the `verdicts.shared` text when any shared-leader check remains, else the `verdicts.independent` text. The table gives these results:

| Verdict | When |
|---|---|
| breaks separation of duties | q1 is `one-team`, or q3 is `evaluation-team` (28 of 64 combinations) |
| fully independent checks | q1 is `second-line` and q3 is `security-leadership` or `joint-board` |
| separated by team, shared leader on some checks | every other combination |

Checks, in reporting order: authorize, runtime-authorize, verify, runtime-verify, close, evaluate, promote, model-gate. Broken checks: for `one-team`, authorize, verify and evaluate, plus runtime-authorize and runtime-verify when q2 is `platform`; plus promote when q3 is `evaluation-team`. Shared-leader checks: `sibling` shares authorize, verify, evaluate, plus runtime-authorize and runtime-verify when q2 is `platform` or `red-team`; `split` shares verify, evaluate, plus runtime-verify when q2 is `platform` or `red-team`, plus runtime-authorize when q2 is `product`; `sibling` and `split` add promote when q3 is `security-leadership`; `second-line` shares promote when q3 is `ai-governance`. Under `one-team` the table also lists runtime-authorize and runtime-verify as shared when q2 is `red-team`, and promote when q3 is `security-leadership`; the verdict is broken either way, so they are never reported. The table reproduces the 64 reference ownership scenarios exactly.

| Result | Finding |
|---|---|
| A broken verdict | `ownership.broken-separation` at `ownership`, naming the broken checks |
| A shared-leader verdict | `warn.ownership-shared-leader` at `ownership`, naming the shared checks |
| q2 is an answer listed under `third_party` (`vendor`) and the verdict is not null, whichever it is; with a question unanswered nothing here fires | `warn.ownership-third-party` at `ownership.q2_runtime_producer` |
| An answer the schema refuses, by the enumeration or the type that `profile-schema.yaml` gives the question | the schema finding only (`schema.enum` or `schema.type`); the verdict is null, so nothing in this section is raised |
| An answer the schema accepts that `answers` does not list | `check.ownership-unknown` at `ownership`, a defect in the data; the verdict is null. In the edition as shipped, `answers` and the schema enumerations list the same values, so a schema-valid profile never raises this code. It guards an edition whose two data files disagree. |

### 8. Modules

Both `check.interface-point-unknown` and `check.interface-agent-reach` are located at `current_practice.modules[i].points[j]`, where i is the module inventory index and j is its point index, both zero-based.

For each of the five modules whose `enabled` is the boolean `true`, the entry evidence in this table must hold; a missing number counts as unmet. Any other value of `enabled` leaves the module switched off.

| Module | Entry evidence |
|---|---|
| `consequence-gates` | `findings_with_reached_assets` at least 10, and at least 0.80 of `crown_jewel_register` entries in the copy with `confirmed_by` answered (0 for an empty register) |
| `paved-road` | `classes_with_two_reproduced` at least 3 |
| `tool-portfolio` | `closed_cases_with_lead_provenance` at least 20, and `lead_text_quarantined` true |
| `production-effects` | `phase_3_continue_decision` and `approved_production_profile` both true |
| `secure-creation` (optional in the schema, so a profile without it stays valid) | `provenance_share_required` a number (the organization sets it; there is no default), `provenance_stamped_share` at least that share, and `derived_checks_running` at least 1 |

A module whose evidence is unmet raises `modules.before-evidence` at `modules.<module>`, listing each unmet condition. For secure creation with no number in `provenance_share_required`, the condition listed is the missing required share; the stamped share has nothing to compare against, so it is not listed. A module that passes joins `enabled_modules`. `enabled_modules` lists modules in the order of this table (consequence-gates, paved-road, tool-portfolio, production-effects, secure-creation), whatever order the profile uses, and the fixtures compare it as an ordered list. These five are the modules `modules.yaml` declares. Any other key in `modules`, enabled or not, is `check.module-unknown` at `modules.<key>`, and nothing else reads it.

Then, for each module in `enabled_modules` and each entry of its `depends_on` in `modules.yaml` that is not in `enabled_modules`: `warn.module-dependency-off` at `modules.<module>`. The module still runs; the interface points that need the dependency stay idle.

**Module inventory.** `current_practice.modules` is optional. For each entry `i` whose `module` is declared in `modules.yaml` (an undeclared one is a schema finding, and the entry is skipped here), and each of its `points` entry `j`, located at `current_practice.modules[i].points[j]`. Each entry is judged on its own: two entries for one module are not merged, and a point listed twice is judged and listed twice.

1. A `point` that is answered and is not an `id` among the module's `interface_points` is `check.interface-point-unknown`, and the point is skipped. A point whose `point` is unanswered, or whose `wiring` is not a key of the wiring ladder, is also skipped: it adds to no list and raises nothing, step 3 included.
2. Each remaining point is judged by its `wiring`:

   | `wiring` | Result |
   |---|---|
   | `none` | added to the entry's below-conformant list |
   | `connected` | added to the entry's below-conformant list; `check.interface-agent-reach` when any of the point's `relationships` ends (`to`) at a `model.yaml` part with `agent_reachable: true`, at `s1.context-compiler` (the part that builds test-drafting context), or at a part whose `role_class` is `producer` |
   | `conformant` | added to the entry's conformant-but-not-aligned list |
   | `aligned` | nothing |

   Ratchet's own test-drafting agents count as agents for `check.interface-agent-reach`: until what crosses matches the contract, nothing keeps untrusted text or a proof condition out of the agent's sight, which is what the model's agent-reach rule refuses. A point at `none` carries nothing and is not refused.
3. The alignment limit is the `current` of the dial register's `module_alignment_max_days` entry when it is a number, whatever its value (0 and negative numbers included). Otherwise the dial is unset (`dials` absent, no entry with that id, or a `current` that is not a number), and the limit is the exception ceiling (`exception_policy.max_days`, 180 days), so an unexcepted gap never outlasts the longest exception the design allows. A point whose `wiring` is not `aligned` and whose `since` is a date more than the limit's days before the evaluation date raises `modules.alignment-overdue`. Exactly the limit is not overdue. A point with no `since`, or a `since` that is not a date, is never refused.

An entry with a non-empty below-conformant list gives one `warn.interface-below-conformant` at `current_practice.modules[i]`, naming each point, its wiring and its target; an entry with a non-empty conformant-but-not-aligned list gives one `warn.interface-below-aligned` at the same location. Points the inventory does not list are not reported.

Each `current_practice.steps` entry may name `confirmed_by`, the role that confirmed the account of that step. Only schema validation reads it; no rule compares it. A confirmer equal to the step's `owner` is the expected case, since the people who run a step are the ones who can confirm how it works, and the map records today's practice without raising findings against the people who run it.

### 9. Dials and design limits

**The register.** `dials` counts as present only when it is a list. When it is absent, null or any other type, every dial check in this section is skipped, `check.dial-register-mismatch` and the kept-test and window-bundle checks included (the design-limit checks read `agent_limits` and still run); the schema alone reports it (`schema.required` for absent or null, `schema.type` otherwise), and progressive mode holds that finding while `dials` is an open section. An entry whose `id` is unanswered is ignored. When two entries share an `id`, the first is the dial and the others are ignored, with no finding. Every finding about one dial sits at `dials[<i>]`, the index of the first entry with that id, except `check.dial-missing` and `warn.dial-unset`, which sit at `dials` because the dial has no entry to point at. The alignment limit in section 8 reads the same register.

**Core dials.** For each dial in `quality.yaml` `dials` (a core dial):

| Check | Finding |
|---|---|
| The register has no entry for the dial, and the dial's `default` is not null | `check.dial-missing` at `dials`. A core dial whose `default` is null is set only by the organization's choice and is never missing. Ten core dials have no default: `module_alignment_max_days`, `window_bundle_max_hours`, the five kept-test dials, and the three under "Unset dials" below. So `dials: []` gives one `check.dial-missing` per core dial with a non-null default. |
| The entry's `bound` and the core `bound` are both numbers, and the entry's is looser (`safe` is always the core dial's; an entry's own `safe` is not read): lower when `safe` is `up`, higher when `down` | `dial.bound-looser`. A core dial whose bound is null has no bound to be looser than, so it never raises this. |
| `current` is a number past the effective bound (the entry's `bound` when it is a number, else the core `bound`): below it when `safe` is `up`, above it when `down` | `check.dial-past-bound` without an answered `below_bound_acceptance`; `warn.dial-past-bound-accepted` with one. A `current` that is not a number is never past a bound, and a dial whose effective bound is not a number has no bound to pass. |
| Past its bound as above, whether or not `below_bound_acceptance` is answered, and `turned_by_role` differs from the security risk owner | `warn.dial-turned-not-sro`, except for a core dial with `owner: organization` (`early_stop_min_closed_cases`), whose turner is whichever role the organization names and is compared with no fixed role. |
| `turned_by_role` equals the producer team | `dial.producer-turned`, for every core dial, `owner: organization` included. It fires beside the rows above, so a dial the producer turned past its bound also gives the past-bound finding and `warn.dial-turned-not-sro`. |

A register entry whose id is not a core dial gives `warn.dial-not-core` at its entry, and none of the checks above runs on it.

**Values the profile repeats.** `road.covered_sample_share`, `tools.sample_minimum_per_class` and `tools.confidence_bar_default` must equal the `current` of the dials `covered_sample_share`, `lead_sample_minimum_per_class` and `confidence_bar_default`; a difference is `check.dial-register-mismatch` at the profile field. It fires only when the register has an entry for that dial and both values are numbers; a dial with no entry is `check.dial-missing`'s business, never a mismatch.

**Kept-test dials.** The five kept-test dials (`kept_test_quiet_days`, `kept_test_scheduled_lane_days`, `kept_test_quarantine_max`, `kept_test_quarantine_max_days`, `kept_test_reprove_days`) have no default and no core bound. A kept-test dial is set when it has an entry whose `current` is a number.

| Condition | Finding |
|---|---|
| `kept_test_quarantine_max_days` is set above the exception ceiling (`exception_policy.max_days`, 180); exactly the ceiling passes | `check.quarantine-past-ceiling` at that dial's entry. A quarantined kept test is an open exception. |
| `kept_test_quiet_days` is set and `kept_test_scheduled_lane_days` is not | `warn.kept-test-lane-unset` at the quiet-period dial's entry: tests would move their time-based runs to a lane with no interval. A quiet kept test still runs, and still blocks, on every change that touches its declared dependencies; only its extra time-based runs move. |
| Any kept-test dial is set and `kept_test_quarantine_max` is not | `warn.kept-test-quarantine-cap-unset`, at the first `kept_test_quarantine_max` entry when the register has one (its `current` is then not a number), and at `dials` otherwise |
| Any kept-test dial is set and `kept_test_reprove_days` is not | `warn.kept-test-reprove-unset`, at the first `kept_test_reprove_days` entry when the register has one (its `current` is then not a number), and at `dials` otherwise |

The location of these two warnings names the dial that is unset, never the kept-test dial that is set.

With no kept-test dial set, none of these fires.

**Unset dials.** Three core dials have no default and a fallback the design reads while they are unset. A dial is unset when the register has no entry for it, or the first entry with its id has a `current` that is not a number. While `dials` is a list and is settled as written (section 1), each unset dial below gives one `warn.dial-unset` at `dials`, whose message names the dial and says what holds while it is unset:

| Dial | What holds while it is unset |
|---|---|
| `negative_recheck_floor_above_line` | each tier at or above the consequence line draws model-negative leads at the negative-challenge share |
| `in_tier_max_wait_days` | nothing is drawn by age, and a lead the sample skips can wait in its tier with no limit |
| `approval_requests_per_approver_hour` | the approver's work-in-progress limit alone bounds the approval requests one approver receives |

A register that is absent, empty or holds a placeholder anywhere raises none of these, so the starter profile raises none. A `current` that is not a number is also a schema finding. The other seven dials with no default keep the checks this section gives them, and no warning reports them unset.

**Window bundle life.** `window_bundle_max_hours` has no default and no core bound. A window bundle is checked offline, so a narrowed design limit or a revoked key reaches it only when it expires, and its life is its revocation lag. A `window_bundle_max_hours` `current` that is a number above the posture expiry raises `check.bundle-past-posture-expiry` at that dial's entry; exactly the posture expiry passes. The posture expiry is the `posture_expiry_hours` `current` when it is a number, else that dial's core default. Unset, the dial raises nothing: the posture expiry caps the lag.

Example: core `approver_wip_limit` has bound 30, safe down. A profile bound 40 raises `dial.bound-looser`. `covered_sample_share` current 0.0001 with no acceptance is `check.dial-past-bound`. `lead_sample_minimum_per_class` current 25 with `below_bound_acceptance: RA-7` warns.

**Design limits.** A design limit is held in the dial register, so its checks sit with the dial checks. `agent_limits` is optional. Absent, null, or with `consequence_line` unanswered, `limit.grant-beyond-design` never fires, and approval stays as it is in a profile written before the section existed: kept regression tests replay on their reviewed batch approvals and standing permissions, and every other agent action is approved by a person. Once the line is answered, kept-test replay permissions are grants like any other and are listed under `grants`.

1. These checks run whether or not the consequence line is answered. For each `agent_limits.limits[i]`:

   | Condition | Finding |
   |---|---|
   | `set_by_role` equals `separation.producer_team` | `dial.producer-turned` at `agent_limits.limits[i]`: the team that runs the agents never sets its own cap |
   | otherwise, `set_by_role` differs from `separation.security_risk_owner_role` | `check.limit-not-security-risk-owner` at `agent_limits.limits[i].set_by_role`, since the security risk owner sets every limit |
   | `applies_to` and `subject` are both answered and an earlier entry has the same pair | `check.limit-duplicate-subject` at `agent_limits.limits[i]`, for each later entry, never the first |

   Also whether or not the line is answered: when `consequence_line_set_by_role` differs from `separation.business_risk_owner_role` (both answered, so an absent `agent_limits` raises nothing): `check.consequence-line-not-business-risk-owner` at `agent_limits.consequence_line_set_by_role`.
2. When `consequence_line` is answered, rank the tiers standard (lowest), critical, crown-jewel. A grant's limit is the first entry of `limits`, in list order, with the same answered `applies_to` and `subject`. For each `agent_limits.grants[i]`, collect every reason that holds:
   - its `applies_to` and `subject` are both answered and it has no limit;
   - its `max_tier` is answered and ranks at or above `consequence_line`;
   - it has a limit, both `max_tier` values are answered, and the grant's ranks above the limit's;
   - it has a limit, and its `environments` (or `action_classes`) list holds an answered value the limit's list does not hold, when both are lists; when either is not a list, this reason does not hold.

   One or more reasons give one `limit.grant-beyond-design` at `agent_limits.grants[i]` naming them all; an environment and an action class that the limit does not list are two reasons. An unanswered value never adds a reason. Every grant is judged against the limits and the line as the profile states them now, so a grant issued before a limit narrowed, or before the line dropped, refuses until it is narrowed or removed: this is the profile form of the rule that such a grant lapses.

Every grant kind is judged the same way: `standing-permission`, `batch-approval`, `autonomy-grant` and `dial`. A batch approval is a person approving a named set of actions at once (the tests, the targets and the window they run in); it counts as a grant, and belongs under `grants`, when the actions it names run without a person approving each one. A batch whose actions each wait for a person's approval grants nothing and is not listed.

`agent_limits.accuracy_window` is optional: `unit` (`actions` or `days`) and `size` (a number, at least 1), the window over which phase 2 reads each route's trailing accuracy. The schema checks it; no rule reads it.

The rule sits in the proposal-not-permission card, protects I1, takes a standard exception, and is never in `phase_1_only.codes`. Acceptance gates are outside it: no limit or grant changes independent reproduction or closure.

Example: line critical; limit for producer `internal-open-weight` standard, environments [isolated test cell, staging], action classes [read-only, reversible]. A standing permission for that producer at standard, [staging], [reversible] passes. The same at critical refuses (above the limit and at the line). A grant for judgment type `not-applicable-call` with no limit refuses. With the line a placeholder, none of them refuses, and complete mode reports `check.unanswered` at `agent_limits.consequence_line`.

### 10. Optional sections

Every section here is optional, so a profile without it stays valid, and no phase's readiness lists it unless its paragraph says otherwise.

**Team ids and the frozen baseline.** `separation.team_ids` maps a team name, as the role fields write it, to a stable id. The separation rules still compare team names; the ids serve the tools that record separations (the impact report), so a renamed team keeps its id and a rename never reopens an acceptance. An id that is a placeholder in the profile as written is skipped and raises nothing here; complete mode reports it as `check.unanswered`. This test reads `team_ids` as written: the copy holds null there, which the rule would otherwise report as an id that is not a string. Each entry is judged once, in file order, and raises at most one `check.team-id-invalid` at `separation.team_ids`: an id that is not a string, or is empty after trimming spaces, raises it and is not remembered; any other id raises it when an earlier remembered id is the same string exactly (case and spaces significant), and is remembered otherwise.

`current_practice.history.frozen` freezes the past-findings baseline. Once it holds an answered `sha256`, compute the hash of the figures: SHA-256, as 64 lowercase hex digits, over the canonical JSON (RFC 8785: no whitespace, keys sorted by UTF-16 code units, values as YAML 1.2 parses them, each number written as RFC 8785 writes the double it parses to, so `0.50` and `0.5` both write `0.5`, `1e3` writes `1000`, and `.nan` or `.inf` writes `null`; every key is a string) of `current_practice.history` in the copy, with its `frozen` and `amendments` keys removed. A placeholder in the figures therefore enters the hash as null, and a placeholder list item is left out. Compare it with the latest version's hash: the `sha256` of the last entry of `amendments` that has a string `sha256`, else `frozen.sha256`, compared case-insensitively. A difference raises `check.baseline-changed` at `current_practice.history`. The latest version's number is 1 plus the number of such amendments.

**Thresholds.** `thresholds` (the sponsor's thresholds) adds no finding when absent, null or an empty list. Each entry needs `value` (a number), `unit`, `set_by_role`, `set_on`, `decides` and `gates_phase` (1 to 5); a missing or mistyped field is a schema finding. An entry whose `set_by_role` equals `separation.producer_team` gives `warn.threshold-set-by-producer` at `thresholds[<i>].set_by_role`. No other check compares who set a threshold: a threshold set by someone other than the program decision owner adds no finding. A number the dial register holds, such as the early-stop minimum, belongs in the register only; the checker does not look for it here.

**Fix caps.** Each owning team sets its fix cap with security: the number of open validated findings it accepts at once, which is also the team WIP cap the saturation signal reads. `fix_capacity.team_caps`, `default_cap` and `refusal_review_interval_days` are optional, so a profile that fills only the two windows stays valid. A `team_caps` entry needs `team`, `cap` and `agreed_with_role` (a schema finding when one is missing).

| Condition | Finding |
|---|---|
| A `team_caps` entry's `agreed_with_role` equals its `team` | `check.fix-cap-self-agreed` at `fix_capacity.team_caps[<i>].agreed_with_role` |
| A `team_caps` entry's answered `team` an earlier entry already names | `check.fix-cap-duplicate-team` at `fix_capacity.team_caps[<i>].team`, for each later entry, never the first |
| `default_cap.set_by_role` differs from `separation.program_decision_owner_role` (the sponsor sets the default for any team that sets none) | `check.fix-cap-default-not-sponsor` at `fix_capacity.default_cap.set_by_role` |
| `fix_capacity` is settled as written and `default_cap` is absent or null | `warn.fix-cap-default-unset` at `fix_capacity.default_cap`. A missing default refuses nothing; the readiness report holds the profile below phase 3 until it is set (`fix_capacity.default_cap` is a phase 3 section there). |

`refusal_review_interval_days` is recorded and never checked; unset means monthly. Which findings pass a cap (those reaching an asset at or above `agent_limits.consequence_line`), the co-signed reviews and the escalation of a finding held twice happen at run time and add no check here.

**Exploitation and disclosure.** `fix_capacity.exploited_window_days` is an optional, nullable number of at least 1: the days within which a finding matched by a sourced exploitation signal is to be fixed and verified in the running system. `disclosure` is optional and nullable; when it is an object it needs `outbound_owner_role` and `policy` (strings; a missing one is a `schema.required` finding), and `deadline_alert_days` is an optional, nullable number of at least 1. The edition sets no number for either. None of these fields enters a comparison, a should-never rule or a warning. Which findings pass a cap on exploitation or on an external deadline, the window each exploited finding starts, and the alert ahead of a deadline happen at run time and add no check here.

**Escapes.** `escapes` is nullable and defines an escape for the organization. The readiness tool lists it as a phase 2 section, so phase 2 cannot start until it is answered, and a profile written without it still passes. Its fields: `detection_window_days` (a number, at least 1: an escape detected within that many days after the deployment it is attributed to counts toward that deployment's escape rate, and a later one is recorded as a late escape and reported apart); `detection_sources` (a list of `{source, detecting_role, note?}`, `source` one of `incident-response`, `bug-bounty`, `external-report`, `production-testing`, `monitoring`, `discovery-practice`, `other`); `confirmer_role` (the role that confirms each escape by reproducing it through the running system); and the optional, nullable `unconfirmed_alert_days` (a number, at least 1: how long an escape may stay unconfirmed before the security risk owner is alerted; unset means `detection_window_days`; recorded and never compared).

| Condition | Finding |
|---|---|
| `escapes` is an object and `confirmer_role` equals the `detecting_role` of one or more `detection_sources` entries | one `check.escape-confirmer-detects` at `escapes.confirmer_role`, naming each matching entry's index and source |
| `escapes` is an object and `confirmer_role` equals `separation.producer_team` or `separation.program_decision_owner_role`, whose results the escape rate judges; an unconfirmed escape counts nowhere, so such a confirmer could keep escapes out of every count | one `check.escape-confirmer-conflicted` at `escapes.confirmer_role`, naming each role it matches. A confirmer that matches a detecting role and one of these roles raises both codes. |
| `escapes` is missing or is not a mapping, and `separation.security_risk_owner_role` is answered | `warn.escapes-unset` at `escapes` |

Example: base A with a `monitoring` source whose `detecting_role` equals `confirmer_role` raises `check.escape-confirmer-detects` at `escapes.confirmer_role`. Base A without `escapes` passes with `warn.escapes-unset`. Base A with `confirmer_role` set to the program decision owner raises `check.escape-confirmer-conflicted` at `escapes.confirmer_role`.

**Attack injection.** `injection` is nullable and holds the notice policy for attack-injection experiments past deployment: `notice_mode` (one of `announced`, `trusted-agent`, `unannounced`), `allowed_environments` (a list, each item `deployed-test` or `production`; an empty list is valid), the optional, nullable `trusted_agent_role` (a string) and `trusted_agent_can_stop` (a boolean), and the optional, nullable numbers `stop_restore_max_minutes` and `production_max_exposure_minutes` (each at least 1). The edition sets no value for either number. When `injection` is absent or null nothing is reported: no injection runs past the pipeline, and no phase needs the section.

The detection-side roles are every answered `escapes.detection_sources[].detecting_role` (when `escapes` is an object) and an answered `separation.detection_owner_team`. Four checks read a null or absent value, and they wait for the section to be settled as written (section 1): inside a settled section null means none, so each is a contradiction between two answers in the same section. A placeholder anywhere in `injection` keeps the section unsettled, so those four checks and `warn.injection-detection-side-unset` stay silent, complete mode reports the placeholder as `check.unanswered`, and progressive mode holds it. The rows with no settled condition compare answered values as always, so `trusted_agent_can_stop: false` refuses even beside a placeholder. When `injection` is an object:

| Code | Condition | Location |
|---|---|---|
| `check.injection-trusted-agent-producer` | `notice_mode` is `trusted-agent` and `trusted_agent_role` equals `separation.producer_team` | `injection.trusted_agent_role` |
| `check.injection-trusted-agent-not-detection` | `notice_mode` is `trusted-agent`, `trusted_agent_role` is answered, at least one detection-side role is answered, and `trusted_agent_role` equals none of them | `injection.trusted_agent_role` |
| `check.injection-trusted-agent-unnamed` | `notice_mode` is `trusted-agent`, the section is settled as written, and `trusted_agent_role` is null or absent | `injection.trusted_agent_role` |
| `check.injection-trusted-agent-cannot-stop` | `notice_mode` is `trusted-agent`, and `trusted_agent_can_stop` is `false` (whether or not the section is settled) or the section is settled as written and `trusted_agent_can_stop` is anything but `true` | `injection.trusted_agent_can_stop` |
| `check.injection-production-without-effects` | `allowed_environments` lists `production` and `modules.production-effects.enabled` is anything but `true` (absent, null and a placeholder included: this row reads a missing value on purpose), in any notice mode | `injection.allowed_environments` |
| `check.injection-production-exposure-unset` | the section is settled as written, `allowed_environments` lists `production`, and `production_max_exposure_minutes` is not a number, in any notice mode | `injection.production_max_exposure_minutes` |
| `check.injection-restore-ceiling-unset` | the section is settled as written, `allowed_environments` is not empty, and `stop_restore_max_minutes` is not a number, in any notice mode | `injection.stop_restore_max_minutes` |
| `warn.injection-unannounced` | `notice_mode` is `unannounced` | `injection.notice_mode` |
| `warn.injection-detection-side-unset` | `notice_mode` is `trusted-agent`, the section is settled as written, `trusted_agent_role` is answered and no detection-side role is answered, so `check.injection-trusted-agent-not-detection` has nothing to compare | `injection.trusted_agent_role` |

A trusted agent equal to the producer team raises `check.injection-trusted-agent-producer`; when it is also none of the answered detection-side roles, it raises `check.injection-trusted-agent-not-detection` as well. With the production-effects module off and no exposure window, both production findings are raised. In the `announced` and `unannounced` modes the trusted agent fields are recorded and never compared. The layer each experiment names, its record, the routine re-proof at the pre-deploy layers, the authorization service's refusal of any injection outside the policy, each grant's expiry and restore, and the stop-to-restore time against the ceiling happen at run time and add no check here.

Example: base A with `injection` in the trusted-agent mode, the trusted agent the role that detects escapes from incident response, able to stop, `[deployed-test]` allowed and a stop-to-restore ceiling, passes with base A's warnings. The same with `production` added and an exposure window raises `check.injection-production-without-effects`, because base A has production-effects off; with no exposure window it also raises `check.injection-production-exposure-unset`. The same with `trusted_agent_role` null raises `check.injection-trusted-agent-unnamed`; with the placeholder `"FILL: who is told in advance"` instead it raises only `check.unanswered` in complete mode and nothing in progressive mode.

**Gate seeding.** `gate_seeding` is nullable. It is a list; each entry has `gate` (one of `approver`, `proof-holder`, `decider`), `seed_rate` (a number, at least 0: the share of the gate's items that are seeded known-bad items), `seed_categories` (a number, at least 1: how many categories of the organization's threat model for its own oversight the seeds are drawn from), `categories_from` (a string naming that threat model), `categories_refreshed_on` (optional, nullable, a date; recorded, and no check reads it), `categories_refresh_by` (a date), `catch_rate_floor` (a number, at least 0), `breach_action` (a string), `seeding_owner_role` (a string), `per_person_results_to` (a list, each item `seeding-owner`, `the-person`, `manager` or `performance-review`) and `breach_computed_by` (`system` or `person`); every field but `categories_refreshed_on` is required. The gate's team is `separation.approver_team` for `approver`, `separation.fixture_oracle_owner_team` for `proof-holder` and `separation.verifier_team` for `decider`. Entries are numbered from 0 in list order. An entry that is not a mapping is skipped by every check below: it names no gate, and for `check.gate-seeding-missing` it does not count as a mapping whose `gate` is unanswered.

| Code | Condition | Location |
|---|---|---|
| `check.gate-seeding-duplicate` | an entry's answered `gate` an earlier entry already names | `gate_seeding[<i>].gate`, for each later entry |
| `check.gate-seeding-missing` | `gate_seeding` is a list, no mapping in it has an unanswered `gate` (such an entry could be any gate), and at least one of the three gates is named by no entry; an empty list names none, so it gives all three findings | `gate_seeding`, one finding for each of the three gates that no entry names, in the order approver, proof-holder, decider |
| `check.gate-seeding-off` | an entry's `seed_rate` is 0, or its `catch_rate_floor` is 0 | `gate_seeding[<i>]`, one per entry, naming each zero value |
| `check.gate-seed-rate-not-dial` | an entry with `gate` `approver` whose `seed_rate` and the `current` of the `seeded_proposal_rate` dial are both numbers and differ; the dial register holds the approver gate's rate, and the other gates' rates are compared with nothing | `gate_seeding[<i>].seed_rate` |
| `check.gate-seeds-lapsed` | an entry's `categories_refresh_by` is a date before the evaluation date; due on the evaluation date itself has not lapsed | `gate_seeding[<i>].categories_refresh_by` |
| `check.gate-seeding-owner-in-line` | an entry's `seeding_owner_role` equals the team that holds its gate; a seeding owner equal to the team of a different gate is not compared | `gate_seeding[<i>].seeding_owner_role` |
| `check.gate-results-to-manager` | an entry's `per_person_results_to` lists `manager` or `performance-review` | `gate_seeding[<i>].per_person_results_to` |
| `check.gate-breach-by-person` | an entry's `breach_computed_by` is `person` | `gate_seeding[<i>].breach_computed_by` |
| `warn.gate-seeding-unset` | `gate_seeding` is absent or null, and `dials` is a list and is settled as written | `gate_seeding` |

Random reviewer assignment and a second reviewer on a breach are a recommended default the design describes; no field records them and nothing checks them.

Example: base A declares all three gates and passes with its own warnings. Base A without `gate_seeding` passes with `warn.gate-seeding-unset`. Base A with the approver gate's seeding owner equal to the approver team fails with `check.gate-seeding-owner-in-line` at `gate_seeding[0].seeding_owner_role`.

### 11. Other consistency checks

| Code | Condition | Location |
|---|---|---|
| `check.impact-score-threshold` | `gate_failure_policy.key` is `impact_score` and `score_threshold` is unanswered | `gate_failure_policy.score_threshold` |
| `check.impact-score-missing` | the same key, and a register entry has no answered `impact_score`; one per asset | `crown_jewel_register[<i>].impact_score` |
| `check.latency-below-budget` | `gate_failure_policy.added_latency_objective_minutes` (optional; the deploy gate's added-latency objective) and the `current` of the register's `regression_time_budget_minutes` entry are both numbers, the objective is below the budget, and `gate_failure_policy.latency_handling` is unanswered. Both values are the organization's settings, and the design's default for each is 10 minutes; the check compares only the values the profile holds, so with either one absent it raises nothing. `latency_handling` records dependency-scoped or post-deploy handling, and any answered value silences the check. | `gate_failure_policy.added_latency_objective_minutes` |
| `check.share-range` | `tools.confidence_bar_default`, `road.covered_sample_share` or `ai_resilience.primary_provider_share` is a number above 1 | the share field that is out of range |
| `check.mandated-obligation` | a `tools.existing` entry has `mandated: true` and an unanswered `obligation`; an empty string is an answer | `tools.existing.<class>[<i>]` |
| `check.typed-route-decision-types` | a route with `output: typed` lists no `decision_types` | `models.eligible_routes[<i>]` |
| `check.fallback-route-unknown` | `ai_resilience.fallback_route_id` is answered and names no route in `models.eligible_routes` | `ai_resilience.fallback_route_id` |
| `check.self-hosting-capacity` | the fallback route is self-hosted and `self_hosting_capacity` is `none`; or a producer's `lowest_rung` is `self-hosted` and capacity is `none` or `drill-only` | `ai_resilience.self_hosting_capacity` for the fallback route; `ai_resilience.producer_rungs[<i>]` for a producer |
| `check.exception-invalid` | section 4 | `exceptions[<i>]` |
| `check.build-or-buy-key`, `check.build-or-buy-choice`, `check.tier-override` | section 5 and section 2 | as given there |
| `check.ownership-unknown` | section 7 | `ownership` |
| `check.module-unknown`, `check.interface-point-unknown`, `check.interface-agent-reach` | section 8 | as given there |
| `check.dial-missing`, `check.dial-past-bound`, `check.dial-register-mismatch`, `check.quarantine-past-ceiling`, `check.bundle-past-posture-expiry`, `check.limit-not-security-risk-owner`, `check.limit-duplicate-subject`, `check.consequence-line-not-business-risk-owner` | section 9 | as given there |
| `check.team-id-invalid`, `check.baseline-changed`, `check.fix-cap-self-agreed`, `check.fix-cap-duplicate-team`, `check.fix-cap-default-not-sponsor`, `check.escape-confirmer-detects`, `check.escape-confirmer-conflicted`, the seven `check.injection-*` codes, the eight `check.gate-*` codes | section 10 | as given there |

### 12. Warnings

This table holds the warnings that no earlier section defines; sections 4 to 10 define the rest beside their checks.

A warning whose condition is that something is missing uses the term "missing" of section 1 (`warn.escapes-unset` and `warn.build-or-buy-unset` among them). The "Waits" column marks the four warnings in this table that wait for a settled section, judged on the profile as written. PC-3 lists all eight warnings that wait: the other four (`warn.fix-cap-default-unset`, `warn.injection-detection-side-unset`, `warn.gate-seeding-unset` and `warn.dial-unset`) are defined in sections 9 and 10, beside their checks, where each says which section it waits for.

| Code | Condition | Location | Waits |
|---|---|---|---|
| `warn.internal-audit-operating` | `separation.internal_audit_role` is `verifier` or `closure-acceptor` | `separation.internal_audit_role` | |
| `warn.hosted-route-restricted` | a route whose `kind` is `hosted` allows a data class whose text contains `restricted` or `secret` anywhere, in any case (so `unrestricted` matches); self-hosted routes are never reported | `models.eligible_routes[<i>]` | |
| `warn.risk-owners-same` | both risk owner roles answered and equal | `separation.security_risk_owner_role` | |
| `warn.register-gap` | at least one register entry is unattested or stale ("Register staleness" below) | `crown_jewel_register` | |
| `warn.no-crown-jewel` | `crown_jewel_register` is settled as written and lists entries, none with tier `crown-jewel` | `crown_jewel_register` | yes |
| `warn.shipthrough-no-concurrence` | `override.acceptor_role` answered and `override.concurrence_role` unanswered | `gate_failure_policy.override.concurrence_role` | |
| `warn.shipthrough-concurrence-not-sro` | `warn.shipthrough-no-concurrence` (the row above) did not fire, and `override.concurrence_role` differs from the security risk owner; a concurrence equal to the acceptor still warns here when it differs from the security risk owner | `gate_failure_policy.override.concurrence_role` | |
| `warn.gate-all-deploys` | `scope_when_unavailable` is `all-deploys` | `gate_failure_policy.scope_when_unavailable` | |
| `warn.critical-not-fail-closed` | `by_tier.critical` is answered and not `fail-closed` | `gate_failure_policy.by_tier.critical` | |
| `warn.crown-jewel-under-acceptance` | `by_tier.crown-jewel` is `fail-open-under-expiring-acceptance` | `gate_failure_policy.by_tier.crown-jewel` | |
| `warn.score-threshold-unused` | `key` is `tier` and `score_threshold` is answered | `gate_failure_policy.score_threshold` | |
| `warn.tool-decision-not-sro` | `tools.decision_owner_role` differs from the security risk owner | `tools.decision_owner_role` | |
| `warn.no-stage-timings` | `tools.delivery_metrics_collected` lists at least one metric and not `pipeline_stage_timings` | `tools.delivery_metrics_collected` | |
| `warn.no-tools` | `tools.existing` is a mapping, `tools` is settled as written, and every class under `tools.existing` holds an empty list or a value that is not a list (a mapping with no class at all meets this) | `tools.existing` | yes |
| `warn.road-owner-is-producer` | `road.owner_team` equals the producer team | `road.owner_team` | |
| `warn.authorship-unlabeled` | `road.authorship_labeling` is `unlabeled` | `road.authorship_labeling` | |
| `warn.no-road-assets` | `road` is settled as written, `road.assets` has keys, and all are null | `road.assets` | yes |
| `warn.enforced-not-preferred` | `road.enforced_preferred` is false | `road.enforced_preferred` | |
| `warn.fallback-hosted` | the fallback route is hosted | `ai_resilience.fallback_route_id` | |
| `warn.no-self-hosted-rung` | `self_hosting_capacity` is `none` | `ai_resilience.self_hosting_capacity` | |
| `warn.producer-frontier-only` | a producer's `lowest_rung` is `frontier` | `ai_resilience.producer_rungs[<i>]` | |
| `warn.provider-concentration` | `ai_resilience.providers` in the copy has exactly one item (duplicates counted), `primary_provider_share` is at least 0.9, and `self_hosting_capacity` is `none` | `ai_resilience.providers` | |
| `warn.no-idp` | `infrastructure_dependencies` is settled as written and lists no entry of kind `idp` | `infrastructure_dependencies` | yes |
| `warn.build-or-buy-unset` | `build_or_buy` is missing or is not a mapping, while `existing_tools` carries an answer | `build_or_buy` | |

**Register staleness**, for `warn.register-gap` and the `register_gap` counts. An entry is unattested when `confirmed_by` is unanswered, whatever `confirmed_on` holds. An entry with `confirmed_by` answered is stale only when `attestation.calendar_max_months` is a number and `confirmed_on` is answered: a `confirmed_on` that is not a date is stale; otherwise add the months to the date in UTC calendar arithmetic (a day past the end of the target month rolls into the next month, so 2026-01-31 plus one month is 2026-03-03), and the entry is stale when that end date falls before the evaluation date. Ending on the evaluation date is not stale. An answered `confirmed_by` with no `confirmed_on`, or a `calendar_max_months` that is not a number, is never stale. The months are added to the date's month numbered from 0 for January, and the sum is truncated toward zero, so a fraction of a month adds nothing (2026-06-10 plus 1.5 months is 2026-07-10). `register_gap.unattested` counts unattested and stale entries once each; `register_size` is the number of register entries. A register that is absent or not a list gives `{unattested: 0, register_size: 0}`. The warning fires once, when the count is above 0.

### 13. Progressive mode

Run step 7 asks the readiness tool for the open sections. An open section's path S is the `field` of an entry in the readiness report's `open` list: a section such as `dials`, or a field such as `separation.business_risk_owner_role`. The entry's `open_fields` list is not read. A schema finding is held as an open question, and left out of `errors`, when its location L meets one of these tests against an open section's path S:

| Test | Holds when | Example |
|---|---|---|
| L lies under S | L equals S, or starts with S followed by `.` or `[` | `dials[0].turned_by_role` lies under `dials` |
| L is the parent of S | S starts with L followed by `.` | a `schema.required` at `separation`, the whole section missing, while `separation.business_risk_owner_role` is open |
| L's top-level section holds a placeholder | the text of L up to its first `.` or `[` is a top-level key with a placeholder anywhere inside it in the profile as written; any top-level key counts, optional ones such as `current_practice`, `cloud_overlay`, `build_or_buy` and `exceptions` included | |

Rule findings are never held. `ok` is true when `errors` is empty and the readiness tool reports at least phase 1. `progress` carries the readiness report plus `schema_errors_held_as_open`.

Example: a profile holding only the phase 1 sections passes in progressive mode (`ok: true`, ready for phase 1) and fails in complete mode with `required` errors. The same profile with the verifier team equal to the producer team fails in both modes with `sep.verifier-producer`.

## Errors, warnings and exit status

Errors (exit 1): schema findings, `check.unanswered` in complete mode, every `check.*` code, and every should-never code without a valid exception. Warnings never change the exit status. In progressive mode, a profile not ready for phase 1 exits 1 with an empty `errors` list. A profile that cannot be read or parsed, or that is not a mapping, exits 2 with `{"ok": false, "error": "<reason>"}`; so does a `--today` value that does not have the form `YYYY-MM-DD` (four digits, a hyphen, two digits, a hyphen, two digits; the form alone is checked, and "Inputs" says how a value of that form that is no date is read).

## Acceptance fixtures

If the environment denies the required `trash` cleanup of a fixture scratch folder, report that denial and the retained path separately from fixture assertions. Preserve the fixture result and exit status based on assertions; do not substitute another deletion mechanism or count a skipped case as passed.

Concrete input ids, names, prose, profile values, hashes and exact graph counts in these fixtures are supplied test vectors. Apply the rules to those inputs; do not hardcode fixture identities or infer organization facts from expected output.

Base A: a complete passing profile, ownership `sibling`/`platform`/`joint-board`, one jurisdiction, four register entries (one unconfirmed), tool-portfolio on, no `build_or_buy`, a program decision owner, two team fix caps each agreed with the security risk owner and a default cap set by the program decision owner, `escapes` with three detection sources and a confirmer apart from them; it warns `warn.ownership-shared-leader`, `warn.register-gap`, `warn.build-or-buy-unset`, and `warn.dial-unset` once for each of the three dials under "Unset dials", which its settled register leaves out. Base B: a complete passing profile, ownership `second-line`/`red-team`/`security-leadership`, `internal_audit_role: closure-acceptor`, consequence-gates on, one dial past its bound under acceptance, a program decision owner, one team fix cap and a default cap, `escapes` with three detection sources and a confirmer apart from them; it warns `warn.internal-audit-operating`, `warn.critical-not-fail-closed`, `warn.adjustment-crown-jewel`, `warn.score-threshold-unused`, `warn.authorship-unlabeled`, `warn.build-or-buy-unset`, `warn.dial-past-bound-accepted`, and the same three `warn.dial-unset`. Each fixture fixes an evaluation date D after every `accepted_on` and before any attestation goes stale. "Phase 1 sections" means only the sections `readiness.yaml` lists for phase 1.

The fixtures ship as one file, `fixtures-profile-checker.yaml`, one entry per row below. Each entry has `name`, `exercises`, `built_from` (the row's edits in words), `mode` (`complete`, `progressive`, or `both`), `today` (D), the whole `profile` inline (or `profile_text`, raw file content, for the unreadable fixture), and `expect`. `expect` gives `outcome`, `exit`, and `errors`, a list of `{kind, code, location?}` compared as a multiset; where the row needs them it also gives `warnings` (same comparison), `exceptions` (`code` and `declared`), `ownership_verdict`, `enabled_modules`, `register_gap` (both counts), `ready_for` and `schema_errors_held_as_open` (progressive mode), and `repeat_identical` (two runs give byte-identical reports). `exceptions` compares its `{code, declared}` pairs as a multiset, and `enabled_modules` compares as an ordered list. With `mode: both`, `expect` holds exactly two keys, `complete` and `progressive`, each holding one such block. A runner may hand an inline profile to the tool in any YAML 1.2 form, JSON included. A tool passes a fixture when every listed entry matches one reported finding and nothing is left over. An entry with no `location` matches a finding of its kind and code at any location; the runner matches the entries that name a location first, so an entry with no location never takes a finding that a located entry needs. A key absent from `expect` is not compared: a fixture with no `warnings` key passes whatever warnings the tool reports. `outcome` reads the report: `pass` is `ok: true` with exit 0, `fail` is `ok: false` with exit 1 (in progressive mode that includes a profile below phase 1 with no errors), and `unreadable` is exit 2 with `{"ok": false, "error": "<reason>"}` on standard output. `ready_for` is a phase number or null: the runner compares the `phase` of the report's `progress.ready_for`, a null value comparing as null. `ready_for` and `schema_errors_held_as_open` appear only in progressive blocks, since `progress` is null in complete mode. `schema_errors_held_as_open` compares as a number.

The skill also ships standalone profiles, `fixture-pc-example-*.yaml`, `fixture-pc-pass-*.yaml` and `fixture-pc-fail-*.yaml`: each is a whole profile and nothing else, so its first comment line names its evaluation date and mode. That line and the file's entry in `expected-results.yaml` give the same date and mode, so a runner may read either. Their expected results are in `expected-results.yaml`, whose top level holds `edition` and a `results` list; each entry names its file under `fixture` and its tool under `tool` (entries for other tools, such as the model checks' `model.yaml`, are skipped), and each profile-checker entry has `tool: profile checker`, `today` (the evaluation date), `mode` (always `complete`), `outcome` (`pass` or `fail`), `schema_errors` (the number of errors whose kind is `schema`), `rule_errors` (the number of every other error: consistency findings, `check.unanswered` included, and should-never findings no valid exception covers) and `should_never_codes` (the distinct should-never codes among the errors, sorted). Warnings and exceptions are not counted. Every `pass-` file passes and every `fail-` file fails on a rule error, never on a schema error alone.

| Fixture | Exercises | Built from | Expected |
|---|---|---|---|
| `fixture-pc-base-a.yaml` | PC-16, PC-17 | A | pass, its six warnings, shared leader, tool-portfolio enabled; a second run is identical |
| `fixture-pc-base-b.yaml` | PC-13 | B | pass, fully independent, its ten warnings, consequence-gates enabled |
| `fixture-pc-schema-enum.yaml` | PC-1 | A, `deploy_cadence: hourly` | schema error |
| `fixture-pc-schema-null.yaml` | PC-1 | A, `verifier_team: null` | schema error (nullable `confirmed_by: null` raises none) |
| `fixture-pc-schema-missing.yaml` | PC-1 | A without `road`, `tools` | two `required` errors |
| `fixture-pc-schema-item.yaml` | PC-1 | A, `delivery_metrics_collected: [change_failure_rate]` | error at `[0]` |
| `fixture-pc-fill-complete.yaml` | PC-2 | A, `business_risk_owner_role: "FILL: who"` | `check.unanswered` |
| `fixture-pc-fill-no-match.yaml` | PC-3 | A, producer and approver both `"FILL: team"` | two `check.unanswered`, no `sep.producer-approver` |
| `fixture-pc-fill-section.yaml` | PC-2, PC-3 | A, `escapes` and `build_or_buy` each a placeholder string | `check.unanswered` at `escapes` and at `build_or_buy`; base A's warnings plus `warn.escapes-unset`, since a placeholder counts as missing for an absence warning |
| `fixture-pc-separation.yaml` | PC-4 | A, verifier equal to producer, fix author equal to closure acceptor | `sep.verifier-producer`, `sep.fix-closure`, `model.phase1-boundary-unconfirmed` (the boundary names the old verifier) |
| `fixture-pc-roles.yaml` | PC-4 | A, business risk owner equal to verifier, security risk owner equal to producer, override acceptor equal to its concurrence | `sep.business-risk-owner`, `sep.security-risk-owner`, `shipthrough.acceptor-not-business-owner`, `shipthrough.no-concurrence` |
| `fixture-pc-road.yaml` | PC-4 | A, road owner equal to metrics owner and verifier, `conformance_basis: declared`, `escape_hatch_reinstates_regressions: false` | four road codes |
| `fixture-pc-tools.yaml` | PC-4, PC-12 | A, leads as coverage, unsampled yield, tool owner as yield owner, a mandated tool with no obligation | three tool codes, `check.mandated-obligation` |
| `fixture-pc-gate.yaml` | PC-4 | A, ledger `direct`, `replay_on_recovery: false`, crown-jewel `fail-open-with-record` | `intake.ledger-direct-write`, `shipthrough.no-replay`, `gate.crown-jewel-open-with-record` |
| `fixture-pc-admin.yaml` | PC-4 | A, control-plane operator equal to platform operator and producer, `cross_partition_reads: open` | `admin.cpo-is-platform`, `admin.cpo-is-producer`, `partition.cross-reads` |
| `fixture-pc-build-or-buy.yaml` | PC-4, PC-12, PC-18 | A, `s4.request-data-gate` administered by the producer, the `control` plane bought without organization controls, an unknown key, a bad choice | `admin.control-plane-operator`, `bought.without-org-controls`, `check.build-or-buy-key`, `check.build-or-buy-choice` once |
| `fixture-pc-build-or-buy-plane-admin.yaml` | PC-4 | A, `build_or_buy` naming the `control` and `execution` planes, both built and administered by the producer team | one `admin.control-plane-operator` at `build_or_buy.control` per fail-closed control of the control plane, and one `admin.execution-by-producer` at `build_or_buy.execution` per tier T0 part of the execution plane (one finding per part); base A's warnings without `warn.build-or-buy-unset` |
| `fixture-pc-build-or-buy-open.yaml` | PC-2, PC-3 | A, `build_or_buy` with one `control` entry whose `choice` is `"FILL: build or buy"`, both modes | complete: `check.unanswered` at `build_or_buy.control.choice` only, never also `check.build-or-buy-choice`; base A's warnings without `warn.build-or-buy-unset`; progressive: pass, ready for phase 5, the same warnings |
| `fixture-pc-build-or-buy-part-built.yaml` | PC-4 | A, the `road` plane bought without organization controls, and its one rule-enforcing part `s6.road-conformance-check` built in its own entry | pass, base A's warnings without `warn.build-or-buy-unset`: the plane entry no longer covers the part |
| `fixture-pc-build-or-buy-part-bought.yaml` | PC-4 | A, the `road` plane built with `organization_controls: true`, and `s6.road-conformance-check` bought in its own entry without `organization_controls` | `bought.without-org-controls` at `build_or_buy.s6.road-conformance-check` only; the part's entry takes nothing from the plane's |
| `fixture-pc-build-or-buy-part-admin.yaml` | PC-4 | A, the `execution` plane built and administered by the producer team, and `s3.production-cell` built in its own entry with no `administered_by` | six `admin.execution-by-producer` at `build_or_buy.execution`, one for each other fail-closed execution part, and none for the production cell |
| `fixture-pc-build-or-buy-part-open.yaml` | PC-2, PC-4 | A, the `road` plane bought without organization controls, and `s6.road-conformance-check` in its own entry whose `choice` is `"FILL: build or buy"`, both modes | complete: `check.unanswered` at that `choice` and `bought.without-org-controls` at `build_or_buy.road`; progressive: `bought.without-org-controls` at `build_or_buy.road`; both with base A's warnings without `warn.build-or-buy-unset`. Until the part's choice is answered, the plane covers it |
| `fixture-pc-tier-override.yaml` | PC-4, PC-12 | A, `tier_overrides.T0.failure_mode` and `T9.rto` | `tier.failure-mode-override`, `check.tier-override` |
| `fixture-pc-infra.yaml` | PC-4, PC-12 | A, IdP `degrade-to-manual`, SIEM `continue-without`, unknown fallback route, provider share 1.5 | two infra codes, `check.fallback-route-unknown`, `check.share-range` |
| `fixture-pc-exception-valid.yaml` | PC-5 | A, fix author equal to closure acceptor, valid 90-day exception | pass, base A's warnings plus `warn.exception-applied`, one exception |
| `fixture-pc-exception-expires-today.yaml` | PC-5, PC-8 | as exception-valid, `expires_on` the evaluation date | pass, base A's warnings plus `warn.exception-applied`, one exception |
| `fixture-pc-exception-invalid.yaml` | PC-6, PC-8 | same, wrong acceptor, one reviewer, expired before D | `check.exception-invalid`, `sep.fix-closure` |
| `fixture-pc-exception-long.yaml` | PC-8 | same as exception-valid, lasting 200 days | `check.exception-invalid`, refusal stays |
| `fixture-pc-exception-180-days.yaml` | PC-5, PC-8 | same as exception-valid, lasting exactly 180 days | pass, base A's warnings plus `warn.exception-applied`, one exception |
| `fixture-pc-exception-unknown.yaml` | PC-6, PC-12 | A, an otherwise valid exception for `dial.missing` | `check.exception-invalid` |
| `fixture-pc-exception-unused.yaml` | PC-9 | A, valid exception for `sep.oracle-producer` | pass, `warn.exception-unused` |
| `fixture-pc-exception-declared.yaml` | PC-9 | A, valid exception for `model.quarantine` | pass, exception with `declared: true` |
| `fixture-pc-exception-several-instances.yaml` | PC-5 | A, the first two register entries confirmed by the team that drafted them, one valid exception for `attest.self-confirmed` | pass, base A's warnings plus `warn.exception-applied` at `crown_jewel_register[0]` and at `crown_jewel_register[1]`; two `exceptions` entries, both `attest.self-confirmed`: one exception covers every instance of its code |
| `fixture-pc-p1-exception-valid.yaml` | PC-7 | phase 1 sections of A, program decision owner set, fix author equal to closure acceptor, phase-1-only exception for 50 days within its review bound, progressive | pass |
| `fixture-pc-p1-exception-code.yaml` | PC-7 | same, rule `model.trifecta` | `check.exception-invalid`, `sep.fix-closure` (the refusal stays) |
| `fixture-pc-p1-exception-70-days.yaml` | PC-7, PC-8 | same, 70 days beyond the risk-owner review bound | `check.exception-invalid`, `sep.fix-closure` (the refusal stays) |
| `fixture-pc-p1-exception-56-days.yaml` | PC-7, PC-8 | same, exactly 56 days within its review bound | pass, one exception |
| `fixture-pc-p1-exception-70-days-within-review.yaml` | PC-7, PC-8 | same, 70 days within the risk-owner review bound | pass, one exception |
| `fixture-pc-p1-exception-180-days-within-review.yaml` | PC-7, PC-8 | same, 180 days within the risk-owner review bound | pass, one exception |
| `fixture-pc-p1-exception-181-days.yaml` | PC-7, PC-8 | same, 181 days despite a later review bound | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-missing-review.yaml` | PC-7, PC-8 | same, no risk-owner review date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-invalid-review.yaml` | PC-7, PC-8 | same, malformed risk-owner review date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-review-before-acceptance.yaml` | PC-7, PC-8 | same, review before acceptance | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-review-today.yaml` | PC-7, PC-8 | same, review date is the evaluation date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-review-past.yaml` | PC-7, PC-8 | same, review date before the evaluation date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-exit-before-expiry.yaml` | PC-7, PC-8 | same, exit before expires_on | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-exit-today.yaml` | PC-7, PC-8 | same, exit on the evaluation date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-exit-past.yaml` | PC-7, PC-8 | same, exit before the evaluation date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-exit-future-bound.yaml` | PC-7, PC-8 | same, expires_on equals the future exit bound | pass, one exception |
| `fixture-pc-p1-exception-invalid-exit.yaml` | PC-7, PC-8 | same, malformed recorded exit date | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-review-after-exit.yaml` | PC-7, PC-8 | same, later review never extends an elapsed exit bound | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-same-roles.yaml` | PC-7, PC-8 | same, acceptor also concurs | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-no-controls.yaml` | PC-7, PC-8 | same, no compensating controls | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-one-reviewer.yaml` | PC-7, PC-8 | same, only one role reviewed the card | check.exception-invalid; refusal stays |
| `fixture-pc-p1-exception-owners.yaml` | PC-7 | same, both risk owners named | `check.exception-invalid`, `sep.fix-closure` (the refusal stays) |
| `fixture-pc-p1-exception-owner-conflict.yaml` | PC-7 | same, program decision owner equal to verifier team | `check.exception-invalid`, `sep.fix-closure` (the refusal stays) |
| `fixture-pc-boundary-practice-false.yaml` | PC-10 | B, `context_synthetic: false` | one `model.trifecta` |
| `fixture-pc-boundary-real-ok.yaml` | PC-10 | B, `source: discovery-finding`, `agent_drafts_only: true`, three synthetic conditions false | pass |
| `fixture-pc-boundary-real-false.yaml` | PC-10 | B, `source: recent-finding`, `agent_drafts_only: false` | one `model.trifecta` |
| `fixture-pc-boundary-real-open.yaml` | PC-10 | B, real-finding source, `agent_drafts_only` absent | pass, `warn.phase1-leg-unanswered` |
| `fixture-pc-boundary-practice-null.yaml` | PC-1, PC-10 | A (practice target) with `agent_drafts_only: null`, both modes | pass in both, base A's warnings only; progressive ready for phase 5 |
| `fixture-pc-boundary-real-null.yaml` | PC-10 | B, `source: discovery-finding`, `agent_drafts_only: null`, both modes | complete: pass, `warn.phase1-leg-unanswered`; progressive: no errors, the same warning, not ready for phase 1, so exit 1 |
| `fixture-pc-boundary-unconfirmed.yaml` | PC-11 | A, `confirmed_by_role` equal to producer | `model.phase1-boundary-unconfirmed` |
| `fixture-pc-boundary-confirmer-open.yaml` | PC-3, PC-11 | A, `confirmed_by_role` the placeholder `"FILL: independent reviewer"` | `check.unanswered` at `phase_1_boundary.confirmed_by_role` only; no `model.phase1-boundary-unconfirmed` |
| `fixture-pc-boundary-confirmer-empty.yaml` | PC-3, PC-11 | A, `confirmed_by_role` an empty string | `model.phase1-boundary-unconfirmed` at `phase_1_boundary.confirmed_by_role`: an empty string is answered and differs from the verifier team |
| `fixture-pc-boundary-retired.yaml` | PC-10 | A, `status: retired`, `context_synthetic: false` | pass |
| `fixture-pc-ownership-broken.yaml` | PC-13 | A, q1 `one-team` | `ownership.broken-separation` |
| `fixture-pc-ownership-vendor.yaml` | PC-13 | A, q2 `vendor` | shared leader, `warn.ownership-third-party` |
| `fixture-pc-modules-early.yaml` | PC-14 | A, paved-road on at 1 class, tool-portfolio on without quarantine | two `modules.before-evidence`, no enabled modules |
| `fixture-pc-module-dependency.yaml` | PC-14, PC-19 | A, secure-creation on with stamped share 0.9 against a required 0.8 and two derived checks, paved-road off | pass, base A's warnings plus `warn.module-dependency-off`; tool-portfolio and secure-creation enabled |
| `fixture-pc-module-secure-creation-early.yaml` | PC-14 | A, secure-creation on with no required share and no derived check running | `modules.before-evidence`; tool-portfolio enabled |
| `fixture-pc-module-unknown.yaml` | PC-12, PC-14 | A, a `modules` entry `fuzzing` with `enabled: true` | `check.module-unknown` at `modules.fuzzing`; base A's warnings; tool-portfolio enabled |
| `fixture-pc-module-inventory.yaml` | PC-19, PC-20 | A, a module inventory: secure-creation partial (derived-checks conformant, proven-classes aligned, change-provenance connected, creation-leads none), tool-portfolio ad hoc (leads-in conformant), paved-road established with no points | pass, base A's warnings plus one `warn.interface-below-conformant` for secure-creation and two `warn.interface-below-aligned`, one for secure-creation (derived-checks conformant) and one for tool-portfolio (leads-in conformant) |
| `fixture-pc-current-practice-confirmer.yaml` | PC-1 | A, three `current_practice.steps`: one confirmed by its own owner, one by another role, one with `confirmed_by: null` | pass, base A's warnings only |
| `fixture-pc-current-practice-confirmer-type.yaml` | PC-1 | the same, the second step's `confirmed_by` the number 3 | `schema.type` at `current_practice.steps[1].confirmed_by` |
| `fixture-pc-module-inventory-broken.yaml` | PC-20 | the same inventory with derived-checks only connected and a tool-portfolio point `scanner-console` | `check.interface-agent-reach`, `check.interface-point-unknown`, the below-conformant warning for secure-creation and the below-aligned warning for tool-portfolio |
| `fixture-pc-module-inventory-context.yaml` | PC-20 | the same inventory with derived-checks aligned and the tool-portfolio point `leads-to-loop` only connected (it ends at the part that builds test-drafting context) | `check.interface-agent-reach` at that point, a below-conformant warning for each module and the below-aligned warning for tool-portfolio |
| `fixture-pc-module-alignment-unset.yaml` | PC-20 | the inventory with derived-checks conformant since 200 days before D and change-provenance connected since 10 days before D, no `module_alignment_max_days` dial, so the 180-day exception ceiling applies | `modules.alignment-overdue` at derived-checks only |
| `fixture-pc-module-alignment-ceiling.yaml` | PC-20 | the inventory with derived-checks conformant since exactly 180 days before D and change-provenance connected since 181 days before D, no dial | `modules.alignment-overdue` at change-provenance only |
| `fixture-pc-module-alignment-dial-null.yaml` | PC-20, PC-29 | module-alignment-unset with a `module_alignment_max_days` entry whose `current` is still a placeholder | `check.unanswered` at that `current`, and `modules.alignment-overdue` at derived-checks only: the dial is unset, so the ceiling applies. The placeholder leaves the register unsettled, so no `warn.dial-unset` |
| `fixture-pc-module-alignment-overdue.yaml` | PC-20 | the same with `module_alignment_max_days` at 120 | `modules.alignment-overdue` at derived-checks only |
| `fixture-pc-module-alignment-excepted.yaml` | PC-5, PC-20 | the same with a valid exception for `modules.alignment-overdue` | pass, `warn.exception-applied`, one exception |
| `fixture-pc-creation-roles.yaml` | PC-4, PC-19 | A, secure-creation off with its roles named apart (merged by an independent reviewer, catch layer and drift by the evaluation team) | pass, base A's warnings |
| `fixture-pc-creation-roles-broken.yaml` | PC-4 | the same, merged by the coding agent, catch layer assigned by the secure-creation and road owner, drift reported by the reviewers' own team | `creation.author-merges`, `creation.catch-layer-conflicted`, `creation.drift-reporter-is-reviewer` |
| `fixture-pc-evaluator-conflicted.yaml` | PC-4 | A, evaluation team equal to the tool owner | `sep.evaluator-conflicted` |
| `fixture-pc-runner-scoped-role.yaml` | PC-10 | A, `phase_1_boundary.runner_limit: scoped-role` | pass, `warn.phase1-runner-scoped-role` |
| `fixture-pc-runner-action-bound.yaml` | PC-10 | A, `phase_1_boundary.runner_limit: action-bound` | pass, base A's warnings only |
| `fixture-pc-dials.yaml` | PC-15 | A, `approver_wip_limit` bound 40, `seeded_proposal_rate` current 0.005 without acceptance (the approver gate's `seed_rate` set to match), `posture_review_interval_months` removed, `tools.confidence_bar_default` 0.6 against the dial's 0.5, `early_stop_min_closed_cases` turned by the producer | `dial.bound-looser`, `check.dial-past-bound`, `check.dial-missing`, `check.dial-register-mismatch`, `dial.producer-turned` |
| `fixture-pc-dial-not-core-producer.yaml` | PC-15 | A, a dial `triage_batch_size`, which is not a core dial, turned by the producer team | pass, base A's warnings plus `warn.dial-not-core` at that entry; the steps of "Dials", `dial.producer-turned` among them, run on core dials only |
| `fixture-pc-dials-absent.yaml` | PC-15 | A without `dials`, both modes | complete: one `schema.required` at `dials` and no dial finding; progressive: pass, ready for phase 1, one schema finding held; both with base A's warnings without `warn.dial-unset` |
| `fixture-pc-dials-empty.yaml` | PC-15, PC-29 | A with `dials: []` | one `check.dial-missing` at `dials` per core dial with a default; base A's warnings without `warn.dial-unset`, since an empty register is not settled |
| `fixture-pc-dial-unset-all-set.yaml` | PC-29 | A, the three dials under "Unset dials" set, each turned by the security risk owner | pass, base A's warnings without `warn.dial-unset` |
| `fixture-pc-dial-unset-recheck-floor-set.yaml` | PC-29 | A, only `negative_recheck_floor_above_line` set | pass, base A's warnings with two `warn.dial-unset` in place of three |
| `fixture-pc-dial-unset-max-wait-set.yaml` | PC-29 | A, only `in_tier_max_wait_days` set | pass, base A's warnings with two `warn.dial-unset` in place of three |
| `fixture-pc-dial-unset-approval-rate-set.yaml` | PC-29 | A, only `approval_requests_per_approver_hour` set | pass, base A's warnings with two `warn.dial-unset` in place of three |
| `fixture-pc-dial-unset-not-number.yaml` | PC-1, PC-29 | A, an `in_tier_max_wait_days` entry whose `current` is a string | `schema.type` at that entry's `current`; base A's warnings, all three `warn.dial-unset` included |
| `fixture-pc-kept-test-dials.yaml` | PC-4, PC-15 | A, every kept-test dial set, longest quarantine exactly 180 days, purple team equal to the producer team, a separate detection owner team | pass, base A's warnings |
| `fixture-pc-team-ids.yaml` | PC-26 | A, `separation.team_ids` giving the producer and verifier teams distinct ids | pass, base A's warnings |
| `fixture-pc-team-id-shared.yaml` | PC-26 | A, `separation.team_ids` giving two teams the same id | `check.team-id-invalid` at `separation.team_ids` |
| `fixture-pc-team-id-placeholder.yaml` | PC-2, PC-26 | A, `separation.team_ids` giving the producer team the placeholder `"FILL: stable id"` and the verifier team an id, both modes | complete: `check.unanswered` at that id's path only, never `check.team-id-invalid`; progressive: pass, ready for phase 5; both with base A's warnings |
| `fixture-pc-baseline-frozen.yaml` | PC-26 | A with `current_practice.history` frozen, its `sha256` the hash of the figures as they stand | pass, base A's warnings |
| `fixture-pc-baseline-changed.yaml` | PC-26 | as baseline-frozen, then one class's findings edited with no amendment | `check.baseline-changed` at `current_practice.history` |
| `fixture-pc-baseline-amended.yaml` | PC-26 | as baseline-changed, with a dated amendment holding the hash of the edited figures | pass, base A's warnings |
| `fixture-pc-bundle-past-expiry.yaml` | PC-15 | A, `window_bundle_max_hours` 169 against the default posture expiry of 168 | `check.bundle-past-posture-expiry` at that dial |
| `fixture-pc-bundle-at-expiry.yaml` | PC-15 | A, `window_bundle_max_hours` 168, exactly the posture expiry | pass, base A's warnings |
| `fixture-pc-kept-test-quarantine-ceiling.yaml` | PC-15 | A, `kept_test_quarantine_max_days` 181 | `check.quarantine-past-ceiling` at that dial; base A's warnings plus `warn.kept-test-quarantine-cap-unset` and `warn.kept-test-reprove-unset` at `dials` |
| `fixture-pc-kept-test-lane-unset.yaml` | PC-15 | A, `kept_test_quiet_days` 60 and no scheduled-lane interval | pass, base A's warnings plus `warn.kept-test-lane-unset` at the quiet-period dial, and `warn.kept-test-quarantine-cap-unset` and `warn.kept-test-reprove-unset` at `dials` |
| `fixture-pc-kept-test-cap-reprove-unset.yaml` | PC-15 | A, quiet period, scheduled lane and longest quarantine set, no count cap and no re-proof interval | pass, base A's warnings plus `warn.kept-test-quarantine-cap-unset` and `warn.kept-test-reprove-unset` at `dials` |
| `fixture-pc-purple-team-verifier.yaml` | PC-4 | A, purple team equal to the verifier team | `sep.purple-team-decides` |
| `fixture-pc-purple-team-risk-owner.yaml` | PC-4 | A, purple team equal to the security risk owner | `sep.purple-team-decides` |
| `fixture-pc-purple-team-oracle-owner.yaml` | PC-4 | A, proof conditions owned by a team apart from the verifier, purple team equal to that team | `sep.purple-team-decides` |
| `fixture-pc-purple-team-detection-owner.yaml` | PC-4 | A, a detection owner team named, purple team equal to it | `sep.purple-team-decides` |
| `fixture-pc-escapes-confirmer-detects.yaml` | PC-12, PC-21 | A, a `monitoring` source whose `detecting_role` equals `confirmer_role` | `check.escape-confirmer-detects` at `escapes.confirmer_role`; base A's warnings |
| `fixture-pc-escapes-confirmer-producer.yaml` | PC-12, PC-21 | A, the detection sources the producer team runs removed, `confirmer_role` equal to `separation.producer_team` | `check.escape-confirmer-conflicted` at `escapes.confirmer_role`; base A's warnings |
| `fixture-pc-escapes-confirmer-sponsor.yaml` | PC-12, PC-21 | A, `confirmer_role` equal to `separation.program_decision_owner_role`, `unconfirmed_alert_days: 14` | `check.escape-confirmer-conflicted` at `escapes.confirmer_role`; base A's warnings |
| `fixture-pc-escapes-unset.yaml` | PC-21 | A without `escapes`, both modes | complete: pass, base A's warnings plus `warn.escapes-unset` at `escapes`; progressive: pass, ready for phase 1, the same warnings |
| `fixture-pc-escapes-open.yaml` | PC-3, PC-21 | A, `confirmer_role` and the first source's `detecting_role` both `"FILL: role"`, both modes | complete: two `check.unanswered`, no `check.escape-confirmer-detects`; progressive: pass, ready for phase 1, base A's warnings |
| `fixture-pc-injection-trusted-agent.yaml` | PC-23 | A, `injection` trusted-agent with the trusted agent the role that detects escapes from incident response, `trusted_agent_can_stop: true`, `allowed_environments: [deployed-test]`, `stop_restore_max_minutes: 30`, `production_max_exposure_minutes: null` | pass, base A's warnings |
| `fixture-pc-injection-trusted-agent-producer.yaml` | PC-12, PC-23 | the same with the trusted agent equal to the producer team, which also detects escapes from production testing | `check.injection-trusted-agent-producer` at `injection.trusted_agent_role`; base A's warnings |
| `fixture-pc-injection-trusted-agent-not-detection.yaml` | PC-12, PC-23 | the same with the trusted agent `platform engineering`, which detects no escapes and is not the detection owner team | `check.injection-trusted-agent-not-detection` at `injection.trusted_agent_role`; base A's warnings |
| `fixture-pc-injection-trusted-agent-cannot-stop.yaml` | PC-12, PC-23 | the same with `trusted_agent_can_stop: false` | `check.injection-trusted-agent-cannot-stop` at `injection.trusted_agent_can_stop`; base A's warnings |
| `fixture-pc-injection-production-without-effects.yaml` | PC-12, PC-23 | the same with `allowed_environments: [deployed-test, production]` (base A has production-effects off) and `production_max_exposure_minutes: 60` | `check.injection-production-without-effects` at `injection.allowed_environments`; base A's warnings |
| `fixture-pc-injection-trusted-agent-unnamed.yaml` | PC-12, PC-23 | the first injection fixture with `trusted_agent_role: null` | `check.injection-trusted-agent-unnamed` at `injection.trusted_agent_role`; base A's warnings |
| `fixture-pc-injection-trusted-agent-stop-unset.yaml` | PC-12, PC-23 | the first injection fixture with `trusted_agent_can_stop: null` | `check.injection-trusted-agent-cannot-stop` at `injection.trusted_agent_can_stop`; base A's warnings |
| `fixture-pc-injection-trusted-agent-open.yaml` | PC-3, PC-23 | the first injection fixture with `trusted_agent_role: "FILL: who is told in advance"`, both modes | complete: `check.unanswered` at `injection.trusted_agent_role` and no injection check; progressive: pass, ready for phase 5, base A's warnings |
| `fixture-pc-injection-production-exposure-unset.yaml` | PC-12, PC-23 | the first injection fixture with `allowed_environments: [deployed-test, production]` and no exposure window | `check.injection-production-without-effects` at `injection.allowed_environments` and `check.injection-production-exposure-unset` at `injection.production_max_exposure_minutes`; base A's warnings |
| `fixture-pc-injection-restore-ceiling-unset.yaml` | PC-12, PC-23 | the first injection fixture with `stop_restore_max_minutes: null` | `check.injection-restore-ceiling-unset` at `injection.stop_restore_max_minutes`; base A's warnings |
| `fixture-pc-injection-detection-side-unset.yaml` | PC-3, PC-23 | A without `escapes` (base A names no detection owner team), the first injection fixture with the trusted agent `platform engineering` | pass, base A's warnings plus `warn.escapes-unset` at `escapes` and `warn.injection-detection-side-unset` at `injection.trusted_agent_role` |
| `fixture-pc-injection-unannounced.yaml` | PC-3, PC-23 | the same with `notice_mode: unannounced`, the trusted agent equal to the producer team and `trusted_agent_can_stop: false` | pass, base A's warnings plus `warn.injection-unannounced` at `injection.notice_mode` |
| `fixture-pc-fix-cap-earlier-edition.yaml` | PC-3 | A, `fix_capacity` with the two windows only | pass, base A's warnings plus `warn.fix-cap-default-unset` |
| `fixture-pc-fix-cap-default-unset.yaml` | PC-3 | A without `default_cap` | pass, base A's warnings plus `warn.fix-cap-default-unset` |
| `fixture-pc-fix-cap-self-agreed.yaml` | PC-12 | A, the first team cap agreed with the team itself | `check.fix-cap-self-agreed` at `fix_capacity.team_caps[0].agreed_with_role` |
| `fixture-pc-fix-cap-duplicate-team.yaml` | PC-12 | A, a third team cap naming the first team again | `check.fix-cap-duplicate-team` at `fix_capacity.team_caps[2].team` |
| `fixture-pc-fix-cap-default-not-sponsor.yaml` | PC-12 | A, the default cap set by the security risk owner | `check.fix-cap-default-not-sponsor` |
| `fixture-pc-fix-cap-sponsor-unanswered.yaml` | PC-3 | A without a program decision owner, the default cap set by the security risk owner | pass, base A's warnings |
| `fixture-pc-fix-cap-no-agreement.yaml` | PC-1 | A, the second team cap without `agreed_with_role` | `schema.required` at `fix_capacity.team_caps[1].agreed_with_role` |
| `fixture-pc-disclosure-recorded.yaml` | PC-25 | A, `fix_capacity.exploited_window_days: 7`, `disclosure` with an outbound owner role, a policy and `deadline_alert_days: 14` | pass, base A's warnings |
| `fixture-pc-disclosure-no-policy.yaml` | PC-1, PC-25 | A, `disclosure` with an outbound owner role and no `policy` | `schema.required` at `disclosure.policy` |
| `fixture-pc-limits-inside.yaml` | PC-22 | A, line critical, limits for one route and one judgment type, a standing permission and an earned-autonomy grant inside them | pass, base A's warnings |
| `fixture-pc-limits-grant-wider.yaml` | PC-22 | A, line crown-jewel, a standing permission reaching critical, production and state-changing past its route's limit | one `limit.grant-beyond-design` at `agent_limits.grants[0]` |
| `fixture-pc-limits-at-line.yaml` | PC-22 | A, the route's limit raised to crown-jewel, a standing permission reaching critical with the line at critical | `limit.grant-beyond-design` at `agent_limits.grants[0]` |
| `fixture-pc-limits-no-limit.yaml` | PC-22 | A, an earned-autonomy grant for a judgment type with no limit | `limit.grant-beyond-design` at `agent_limits.grants[1]` |
| `fixture-pc-limits-line-unanswered.yaml` | PC-3, PC-22 | A, a standing permission far past its limit and the consequence line a placeholder | `check.unanswered` at `agent_limits.consequence_line` only |
| `fixture-pc-limits-set-by-producer.yaml` | PC-4, PC-22 | A, the route's limit set by the producer team | `dial.producer-turned` at `agent_limits.limits[0]` |
| `fixture-pc-limits-set-by-other.yaml` | PC-12, PC-22 | A, the route's limit set by the approver team | `check.limit-not-security-risk-owner` at `agent_limits.limits[0].set_by_role` |
| `fixture-pc-limits-line-set-by-other.yaml` | PC-12, PC-22 | A, the consequence line set by the security risk owner | `check.consequence-line-not-business-risk-owner` at `agent_limits.consequence_line_set_by_role` |
| `fixture-pc-limits-duplicate-subject.yaml` | PC-12, PC-22 | A, a second, wider limit for the same route; the standing permission sits inside the first | `check.limit-duplicate-subject` at `agent_limits.limits[2]` only |
| `fixture-pc-limits-exception.yaml` | PC-5, PC-22 | A, a standing permission reaching production past its limit, with a valid standard exception for `limit.grant-beyond-design` | pass, base A's warnings plus `warn.exception-applied` at `agent_limits.grants[0]`, one exception |
| `fixture-pc-limits-batch-inside.yaml` | PC-22 | A, line critical, a standing permission and a batch approval inside the route's limit, an accuracy window of 200 actions | pass, base A's warnings |
| `fixture-pc-limits-batch-wider.yaml` | PC-22 | A, line critical, a batch approval reaching staging and production with read-only and state-changing actions, past its route's limit | `limit.grant-beyond-design` at `agent_limits.grants[0]` |
| `fixture-pc-limits-accuracy-window-bad.yaml` | PC-1, PC-22 | A, design limits and an accuracy window with unit `weeks` and size 0 | `schema.enum` at `agent_limits.accuracy_window.unit`, `schema.minimum` at `agent_limits.accuracy_window.size` |
| `fixture-pc-thresholds-recorded.yaml` | PC-24 | A, two thresholds set by the program decision owner, gating phases 3 and 2 | pass, base A's warnings |
| `fixture-pc-thresholds-set-by-producer.yaml` | PC-24 | A, one threshold set by the producer team | pass, base A's warnings plus `warn.threshold-set-by-producer` at `thresholds[0].set_by_role` |
| `fixture-pc-thresholds-bad-entry.yaml` | PC-1, PC-24 | A, one threshold set by the approver team, gating phase 6, with no `set_on` | `schema.required` at `thresholds[0].set_on`, `schema.enum` at `thresholds[0].gates_phase` (the approver team adds nothing) |
| `fixture-pc-dials-early-stop-owner.yaml` | PC-15 | A, `early_stop_min_closed_cases` with profile bound 3, current 5 past it under acceptance RA-12, turned by the approver team | pass, base A's warnings plus `warn.dial-past-bound-accepted` at its entry, and no `warn.dial-turned-not-sro` |
| `fixture-pc-register-stale.yaml` | PC-17 | A, `calendar_max_months` 12, one confirmed entry ending exactly on D, one ending the day before, one with `confirmed_on: last spring` | pass, `register_gap` 3 of 4 (the unconfirmed entry, the one ending the day before, the undated one) |
| `fixture-pc-impact-score.yaml` | PC-12 | A, `key: impact_score`, no threshold, no scores | `check.impact-score-threshold`, four `check.impact-score-missing` |
| `fixture-pc-typed-route.yaml` | PC-12 | A, typed route without decision types | `check.typed-route-decision-types` |
| `fixture-pc-road-assets-none.yaml` | PC-3 | A, every `road.assets` value null | pass, base A's warnings plus `warn.no-road-assets` at `road.assets` |
| `fixture-pc-road-assets-none-open.yaml` | PC-3 | the same, `road.metrics_owner_team` a placeholder | `check.unanswered` at `road.metrics_owner_team` only; base A's warnings and no `warn.no-road-assets`: `road` as written holds a placeholder, so it is not settled |
| `fixture-pc-tools-none.yaml` | PC-3 | A, every `tools.existing` class an empty list | pass, base A's warnings plus `warn.no-tools` at `tools.existing` |
| `fixture-pc-tools-none-open.yaml` | PC-3 | the same, `tools.yield_owner_team` a placeholder | `check.unanswered` at `tools.yield_owner_team` only; base A's warnings and no `warn.no-tools`: `tools` as written holds a placeholder, so it is not settled |
| `fixture-pc-latency-below-budget.yaml` | PC-27 | A (regression time budget 8 minutes), added-latency objective 5 minutes, no latency handling | `check.latency-below-budget` at `gate_failure_policy.added_latency_objective_minutes` |
| `fixture-pc-latency-post-deploy.yaml` | PC-27 | as latency-below-budget, with `latency_handling: post-deploy` | pass, base A's warnings |
| `fixture-pc-gate-seeding-unset.yaml` | PC-28 | A without `gate_seeding` | pass, base A's warnings plus `warn.gate-seeding-unset` at `gate_seeding` |
| `fixture-pc-gate-seeding-unset-register-open.yaml` | PC-3, PC-28, PC-29 | A without `gate_seeding`, `dials[0].turned_by_role` the placeholder `"FILL: who turned it"` | `check.unanswered` at `dials[0].turned_by_role` only; base A's warnings without `warn.dial-unset`, and no `warn.gate-seeding-unset`: the register as written holds a placeholder, so it is not settled |
| `fixture-pc-gate-seeding-missing.yaml` | PC-12, PC-28 | A, the decider gate's entry removed | `check.gate-seeding-missing` at `gate_seeding` |
| `fixture-pc-gate-seeding-duplicate.yaml` | PC-12, PC-28 | A, a copy of the approver gate's entry appended | `check.gate-seeding-duplicate` at `gate_seeding[3].gate` |
| `fixture-pc-gate-seeding-off.yaml` | PC-12, PC-28 | A, the proof-holder gate's seed rate 0 and the decider gate's catch-rate floor 0 | `check.gate-seeding-off` at `gate_seeding[1]` and at `gate_seeding[2]` |
| `fixture-pc-gate-seed-rate-not-dial.yaml` | PC-12, PC-28 | A, the approver gate's seed rate 0.05 with the `seeded_proposal_rate` dial at 0.02 | `check.gate-seed-rate-not-dial` at `gate_seeding[0].seed_rate` |
| `fixture-pc-gate-seed-rate-other-gate.yaml` | PC-28 | A, the decider gate's seed rate 0.05 | pass, base A's warnings |
| `fixture-pc-gate-seeds-lapsed.yaml` | PC-12, PC-28 | A, the proof-holder gate's `categories_refresh_by` the day before the evaluation date | `check.gate-seeds-lapsed` at `gate_seeding[1].categories_refresh_by` |
| `fixture-pc-gate-seeds-due-today.yaml` | PC-28 | A, the proof-holder gate's `categories_refresh_by` the evaluation date | pass, base A's warnings |
| `fixture-pc-gate-seeding-owner-in-line.yaml` | PC-12, PC-28 | A, the approver gate's seeding owner equal to the approver team | `check.gate-seeding-owner-in-line` at `gate_seeding[0].seeding_owner_role` |
| `fixture-pc-gate-seeding-owner-other-gate.yaml` | PC-28 | A, the approver gate's seeding owner equal to the verifier team | pass, base A's warnings |
| `fixture-pc-gate-seeding-owner-open.yaml` | PC-2, PC-3, PC-28 | A, the approver gate's seeding owner `"FILL: role"` | `check.unanswered` at `gate_seeding[0].seeding_owner_role` and no other error |
| `fixture-pc-gate-results-to-manager.yaml` | PC-12, PC-28 | A, the decider gate's per-person catch rates also sent to `performance-review` | `check.gate-results-to-manager` at `gate_seeding[2].per_person_results_to` |
| `fixture-pc-gate-breach-by-person.yaml` | PC-12, PC-28 | A, the approver gate's `breach_computed_by` `person` | `check.gate-breach-by-person` at `gate_seeding[0].breach_computed_by` |
| `fixture-pc-gate-seeding-no-breach-action.yaml` | PC-1, PC-28 | A, the proof-holder gate's `breach_action` removed | `schema.required` at `gate_seeding[1].breach_action` |
| `fixture-pc-progressive-phase1.yaml` | PC-16 | phase 1 sections of A | progressive pass, ready for phase 1, `schema_errors_held_as_open` equal to the number of complete-mode errors; complete fail with one `schema.required` per missing section and separation role |
| `fixture-pc-progressive-refusal.yaml` | PC-3, PC-16 | same, verifier equal to producer | fails in both modes with `sep.verifier-producer` and `model.phase1-boundary-unconfirmed` (the boundary names the old verifier); complete mode adds the `required` errors |
| `fixture-pc-progressive-held-by-placeholder.yaml` | PC-1, PC-2, PC-16 | A, `build_or_buy` with one `control` entry whose `choice` is `"FILL: build or buy"` and whose `organization_controls` is the string `yes`, both modes | complete: `check.unanswered` at `build_or_buy.control.choice` and `schema.type` at `build_or_buy.control.organization_controls`; progressive: pass, ready for phase 5, one schema finding held by the third test of section 13; both with base A's warnings without `warn.build-or-buy-unset` |
| `fixture-pc-progressive-empty.yaml` | PC-16 | `profile-template.yaml` unchanged, progressive | no errors and no warnings; below phase 1, so exit 1 |
| `fixture-pc-unreadable.yaml` | PC-16 | invalid YAML | exit 2, `{"ok": false, "error": ...}` |

Each `fixture-pc-module-alignment-*.yaml` fixture also expects the warnings of `fixture-pc-module-inventory.yaml`: base A's six, one below-conformant and two below-aligned, less the three `warn.dial-unset` for `fixture-pc-module-alignment-dial-null.yaml`.

Each `fixture-pc-p1-exception-*.yaml` fixture, and `fixture-pc-progressive-phase1.yaml` and `fixture-pc-progressive-refusal.yaml` in both modes, also expects the warnings of the phase 1 sections of A: `warn.register-gap` (the unconfirmed entry) and `warn.build-or-buy-unset`. The sections the other warnings read are absent, and `warn.escapes-unset` waits for the security risk owner. The valid phase-1-only fixtures add `warn.exception-applied` at `separation.closure_acceptor_team`, and `fixture-pc-p1-exception-owners.yaml`, which names both risk owners, adds `warn.escapes-unset`.

## Not in scope

Linting the design itself, tailoring the package, rendering proposals, checking architecture exceptions against the organization's real architecture, judging whether two differently named teams are the same team, and enforcing an exception's `scope`.
