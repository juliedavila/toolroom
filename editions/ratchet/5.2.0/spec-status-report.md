# Specification: Status report

The status report tool produces the organization's periodic status report, quarterly by default, as a dated snapshot of records the work already keeps. It proposes each phase's color (green, yellow or red) with its reason by fixed rules, and reports units landed and phases completed since the last report, risk reduced, the regime each weakness class sits in, effect on delivery, cost and what is next. The tool only proposes: the decision owner sets each phase's color, and the independent reviewer then confirms the color the decision owner set. The organization's agent runs it for every report and whenever a phase's status may have changed.

## Ideal state

- SR-1. Every phase from 1 to 5 gets exactly one status: not-started, green, yellow, red or complete, with a reason that starts with the rule that decided it and names the record behind it.
- SR-2. A phase is complete only when every unit of that phase has landed (or is retired) and its test result is pass.
- SR-3. A started phase is red when a stop condition fires, a review is due without a continuing decision and next review date, or its test failed with no rerun planned. An organization may retain a hard time box. When set, it still stops work at its end and requires a rerun within it. The edition sets no duration or six-week maximum.
- SR-4. A started phase that is not red is yellow when it is behind plan (a unit past its planned date, or elapsed weeks past planned weeks), when a stop condition that applies to it shows an early warning, or when a premise it relies on is recorded false.
- SR-5. A started phase that is neither red nor yellow is green.
- SR-6. Slips are counted and reported in whole days, never in weeks; the report never contains hours.
- SR-7. Every yellow phase shows a recovery step and a date, or a visible slot marked `FILL` for the decision owner, with a warning.
- SR-8. Three fields stay separate for every phase: the color the tool proposes, the color the decision owner sets (with the decision owner's role), and the independent reviewer's confirmation. The tool writes only the proposal; it never writes a set color or a confirmation and never overwrites one a person wrote.
- SR-9. "Since the last report" means after the previous report's `as_of` date and up to this report's `as_of` date, inclusive at the end. With no previous report the window is open below: it holds every date on or before this report's `as_of`.
- SR-10. Risk reduced, effect on delivery and cost are reported as values at `as_of` with the change since the last report; every cost figure derived from effort is labeled an estimate.
- SR-11. What is next lists at most 10 units not yet landed whose required capabilities are all provided by landed units, current phase first.
- SR-12. Phase 2 cannot be green, yellow or complete while phase 1's report is not accepted.
- SR-13. The same inputs and `as_of` give byte-identical output, also when the tool runs again over its own report for the period.
- SR-14. The report is a snapshot as of its cutoff, read the way a team reads its board on that date. A unit recorded landed with a `landed_on` after `as_of` had not landed at the cutoff: it shows as in progress in What is next, and its landing counts once, in the report whose window holds `landed_on`, never twice and never early.
- SR-15. A landing recorded after the report for its window was written appears in the next report, once, under a "recorded late" line with its real `landed_on`; no earlier report is rewritten.
- SR-16. For each weakness class with a validated finding on record, and for all classes together, the report counts arrivals of validated findings and verified fixes over the regime window, their ratio, the ratio over the window before it with the trend between the two, and the findings open at `as_of`.
- SR-17. A class is placed in a regime (backlog, balanced or near zero) only by thresholds the organization set in its profile. The tool ships no threshold value: with any threshold unset, no class is placed, and the report warns when findings are recorded.
- SR-18. A class whose arrivals and verified fixes in the window number fewer than the organization's minimum, and that is not near zero, reports `too-few-to-call` in place of backlog or balanced, and its trend is `none` while either window holds fewer than that minimum.
- SR-19. For each regime the section reports, it says in a fixed sentence what that result means for what the pilot measures, and it points at the reference's regimes section in part 1.

## Inputs

Options: `root` (the organization's workspace; every path below is relative to it), `as_of` (required, a calendar date; the tool never reads the clock), `period` (the report's name; default the calendar quarter of `as_of`, written like `2027-Q1`) and `units` (the shipped unit list; default `units.yaml` in the root). The report is written to `org/status/<period>.md`.

The organization's own records, kept as small YAML files beside its status reports, plus:

- `org/profile.yaml`, required (a missing file is SR-E-input): `separation.program_decision_owner_role`, `separation.verifier_team`, `dials`, the dial register, which the profile schema makes a list of entries each with an `id` and a `current` value (the tool reads the `current` of the entry whose `id` is `early_stop_min_closed_cases`; default 5, the starting value in `quality.yaml`, when no entry has that id or the profile has no `dials`; a `dials` that is not a list, or that entry's `current` when it is not a whole number of at least 1, is SR-E-input at `org/profile.yaml:dials`), and the optional `regimes` section: `window_days`, `min_events`, `balanced_min_ratio`, `near_zero_max_arrivals` and `near_zero_max_open`, plus `set_by_role` and `set_on`, which are only reported. None of the five has a default; the profile template gives the recipe for deriving each from the organization's own past findings.
- The organization's unit list: the shipped `units.yaml` with `org/units.yaml` applied (add, then modify, then remove), as in `spec-unit-graph.md`. `org/units.yaml` is optional. This tool reports two mistakes in that file, each as SR-E-input at `org/units.yaml:<id>`: an `add` whose id is already in the list, shipped or added earlier in the same file (the entry is skipped and the unit stays as it was), and a `modify` naming a unit that is not in the list by then. A shipped unit is changed with `modify`, and the unit graph refuses a duplicate `add` the same way. A `remove` naming no unit does nothing here; the unit graph reports it. Fields read: `id`, `phase`, `provides`, `requires`. The shipped file may be a plain list or a mapping with a `units` list. `readiness.yaml` is not read: readiness gates the start of a phase and has its own tool.
- Every other `org/status/*.md` file whose last fenced YAML block holds a `status_report` mapping. The previous report is the one with the latest `as_of` before this `as_of`; when two share that `as_of`, the one whose path sorts last in natural order (so `2027-Q1.md` after `2027-Q1-rerun.md`, because `.` sorts after `-`). The existing file for this period, when present, is this report's earlier run and never the previous report.

`org/status/phases.yaml`, the phase outcomes, estimates and review records:

```yaml
phases:
  - phase: 1
    planned_start: 2027-01-11
    started_on: 2027-01-11       # null until started
    planned_weeks: 5             # optional elapsed-time estimate, never an exit outcome
    review_on: 2027-02-01        # organization-set review point
    rule_4_review_on: 2027-02-08 # phase 1 only, risk owner's bound on its rule-4 exception
    reviews: []                 # append dated decisions, never replace history
    timebox_weeks: null          # optional organization hard stop, no edition maximum
    test: {result: not-run, on: null, rerun_planned_by: null}   # result: not-run | pass | fail; on is required for pass and fail
    report_acceptance: {state: pending, by_role: null, on: null}  # phase 1 only: pending | accepted | refused; on is required unless pending
    relies_on_premises: [PR-03]
    recovery: {step: null, by: null}   # written by the decision owner when yellow
    early_warning_fraction: 0.5        # optional; share of a tolerance whose use counts as an early warning
```


A listed not-started phase still carries its planning bound. Phases 1 to 3 require review_on unless timebox_weeks supplies a stop bound; phase 1 also requires rule_4_review_on unless an organization time box supplies the earlier bound with no separate review_on. Phases 4 and 5 require review_on or a time box when started. An unplanned future phase may be omitted and reports not-started. A minimal listed phase 2 row is `{phase: 2, started_on: null, review_on: 2027-02-01, test: {result: not-run}, report_acceptance: {state: pending} }`.

### Organization-set review points

The `reviews` value must be a list of records. Other shapes are SR-E-input at the phase. A phase ends on its exit outcome, with all required units landed or retired and its test passed. A review cannot mark a phase complete. The decision owner sets the first `review_on` before work starts. At that point append a record to `reviews`: `{on, decision, by_role, next_review_on}`. The decision is `continue`, `change` or `stop`. Its role must equal the profile's program decision owner, and `on` must be on or after the current review date. Continue and change require a next review date after the decision date. Stop requires no next date and ends the chain. Entries follow the review chain in order. Invalid entries are SR-E-input at the phase. All decisions remain in history.

Only decisions dated on or before `as_of` affect the snapshot. Starting with `review_on`, each such continue or change advances the due date. Stop pauses work. An incomplete phase is red on or after its due date without a valid continuing decision and next review date. A future decision cannot authorize earlier work. `review_due_on` reports the effective date in each phase row. `rule_4_review_on` reports the separate risk owner's bound for phase 1. Continuing decisions never change it. The phase 1 workflow requires full separation or a standard exception accepted by the named risk owners before work continues past that bound.

The older `planned_weeks` remains an estimate. Existing `timebox_weeks` records remain explicit organization stop conditions and are not silently converted or extended. They have no edition-imposed maximum. A review and a time box may coexist. The earlier applicable stop wins. All other exit, independence, acceptance and stop rules still apply.

For a review block, SC-1's note is `phase 1 review due on <date> without a continuing decision and next review date` or `phase 1 review decision is stop`. At the rule-4 bound it is `phase 1 rule-4 exception reached the risk owner's review date <date>`. With no time box and no block it is `phase 1 review due on <date>`, or `phase 1 complete. Its rule-4 exception has ended`. Phases 2 to 5 use the hit text `review due on <date> without a continuing decision and next review date` or `decision owner recorded stop at the phase review`. These precede test and estimate hits.

`org/status/units.yaml`, unit status:

```yaml
units:
  - {id: U-01, state: landed, planned_by: 2027-01-22, landed_on: 2027-01-20, evidence: "tracker query 114"}
  - {id: U-02, state: in-progress, planned_by: 2027-01-29}
# state: planned | in-progress | blocked | landed | retired; units absent here count as planned
# landed_on is required when state is landed
```

`org/status/signals.yaml`, stop conditions, premises and measures:

```yaml
stop_conditions:
  - {id: SC-org-1, applies_to: [2], state: clear, note: "..."}    # organization-defined; clear | warning | fired
phase_2_script: {result: not-run, failed_conditions: []}          # not-run | pass | fail
premises:
  - {id: PR-03, status: validated}     # validated | assumed | contradicted | unknown
delivery:
  - {service: service-a, metric: change_lead_time, baseline: 2.0, current: 2.6, tolerance: 1.0, worse_when: up, unit: days, phase: 2}
no_agent_comparison:
  - {case: C-1, closed_on: 2027-02-10, agent_hours: 30, script_hours: 12, agent_cost: 900, script_cost: 300, agent_only_finding: false}
risk:
  paths_to_crown_jewels_broken: [{id: PATH-7, on: 2027-02-14}]
  classes_retired_to_road: [{id: FC-2, on: 2027-03-01}]
  regression_tests: {current: 4, stale: 1}
findings:                        # validated findings, for the regime check
  - {id: F-101, class: CWE-79, validated_on: 2027-01-14, fix_verified_on: 2027-02-02}   # fix_verified_on: null while open
cost:
  rates: {security-engineering: 120, platform-engineering: 110}   # the organization's own rates per hour of each kind of work
  effort: [{kind: security-engineering, hours: 64, period_end: 2027-03-31, includes_verification: true}]
  spend: [{item: model usage, amount: 1800, period_end: 2027-03-31}]
  currency: USD
```

## Outputs

`org/status/<period>.md`, with these sections in order: a title and the `as_of` and previous report line; Phase status (one row per phase: phase, status, reason, slip, recovery step and date, proposed color, color set by the decision owner with the role, confirmation by the independent reviewer); Units landed since the last report (with retired units listed separately); Phases completed since the last report; Risk reduced; Regime check; Effect on delivery; Cost; What is next; Stop conditions; Warnings; Confirmation (how the decision owner and the reviewer fill their fields). Then one YAML block:

```yaml
status_report:
  period: 2027-Q1
  as_of: 2027-03-31
  previous_as_of: null
  previous_report: null               # the previous report's path from the root, such as org/status/2026-Q4.md, or null
  phases:
    - phase: 1
      status: yellow
      rule: behind-plan
      other_rules: [premise-false]
      reason: "behind-plan: U-09 planned by 2027-03-22 is not landed: 9 days late (org/status/units.yaml); premise-false: premise PR-03 is recorded contradicted (org/status/signals.yaml)"
      started_on: 2027-02-24
      elapsed_weeks: 5
      planned_weeks: 5
      timebox_weeks: 6
      slip_days: 9
      completed_on: null
      recovery: {step: FILL, by: FILL}
      proposed_color: yellow     # written by the tool
      set_color: null            # written by the decision owner
      set_by: null               # the decision owner's role
      confirmed_by: null         # written by the independent reviewer, its role, once it confirms the set color
  units_landed: [U-01, U-02]
  units_recorded_late: []            # landings inside an earlier window that no earlier report listed
  units_retired: []
  phases_completed: []                # for example [{phase: 1, completed_on: 2027-03-04}] once phase 1 is complete
  risk: {paths_broken: 1, paths_broken_delta: 1, classes_retired: 1, classes_retired_delta: 1, regression_tests_current: 4, regression_tests_current_delta: 4, regression_tests_stale: 1}
  regimes:
    window: {days: 91, from: 2027-01-01, to: 2027-03-31}     # days null when the thresholds are unset; from null when open below
    thresholds: {window_days: 91, min_events: 10, balanced_min_ratio: 0.9, near_zero_max_arrivals: 1, near_zero_max_open: 2, set_by_role: security risk owner, set_on: 2027-01-04}   # null while any of the five is unset
    classes:
      - {class: CWE-79, arrivals: 12, verified_fixes: 6, ratio: 0.5, previous_ratio: 0.8, trend: falling, open: 14, regime: backlog}
    overall: {arrivals: 12, verified_fixes: 6, ratio: 0.5, previous_ratio: 0.8, trend: falling, open: 14, regime: backlog}   # null with no class
  delivery: [{service: service-a, metric: change_lead_time, phase: 2, unit: days, baseline: 2.0, current: 2.6, tolerance: 1.0, worse_when: up, used_share: 0.6, state: early-warning, change_since_last: 0.6}]
  cost: {estimated_effort_cost: 7680, spend: 1800, total: 9480, total_delta: 9480, currency: USD, estimate: true}
  next: [{unit: U-09, phase: 1, state: in-progress}]
  current_phase: 1
  stop_conditions: [{id: SC-1, applies_to: [1], state: clear, note: "elapsed 5.0 of 6 timebox weeks"}]
  warnings: ["SR-W-recovery org/status/phases.yaml:1: ..."]
```

Not-started and complete rows carry `proposed_color: null`; `slip_days` is null on not-started and complete rows, `elapsed_weeks` is null on not-started rows, and `recovery` is null on every row that is not yellow. Numbers in the block are written in their shortest form (`5`, never `5.0`); only reason and note texts write elapsed weeks with one decimal. The example shows the shape only: a yellow phase is never complete, so its `completed_on` is null and it is absent from `phases_completed`. The tool prints each message on its own line, then `report: org/status/<period>.md`, or `report: not written` when there are errors.

The values each field may take:

| Field | Values |
|---|---|
| phase `status` | not-started, green, yellow, red, complete |
| phase `rule`, `other_rules` | not-started, complete, on-course, stop-condition, test-cannot-pass, timebox-reached, behind-plan, early-warning, premise-false |
| `proposed_color`, `set_color` | green, yellow, red, or null |
| stop condition `state` | clear, warning, fired |
| delivery `state` | within, early-warning, outside |
| unit `state` in `next` | planned, in-progress, blocked |
| regime `regime` | backlog, balanced, near-zero, too-few-to-call, unset |
| regime `trend` | rising, falling, flat, none |

The Markdown layout, line by line. `<x>` is a value; numbers are written in shortest form (2.0 is `2`), except inside reason and note texts, which follow rule 18; a signed value is `+<n>` when positive, else `<n>`; a `|` inside a table cell is written `\|`; an empty cell keeps the single space on each side of its value, so it is written as two spaces between its bars (`|  |`).

```text
# Status report <period>

As of <as_of>. Previous report: <previous path>, as of <previous as_of>.      (or: Previous report: none.)

The tool proposes each phase's color from the records by fixed rules. The decision owner sets the color and the independent reviewer confirms it; the tool writes neither.

## Phase status

| Phase | Status | Reason | Slip | Recovery step and date | Proposed | Set by decision owner | Confirmed by reviewer |
|---|---|---|---|---|---|---|---|
| <phase> | <status> | <reason> | <slip_days> days | <step>, by <by> | <proposed_color> | <set_color> (<set_by, or FILL>) | <confirmed_by> |

## Units landed since the last report

- <unit> (phase <phase>) landed on <landed_on>: <evidence>      (": <evidence>" only when recorded; or: None.)
Recorded late: landed inside an earlier report's window, after that report was written.     (after a blank line, only when units_recorded_late is not empty)
- <unit> (phase <phase>) landed on <landed_on>: <evidence>      (one line per unit in units_recorded_late, as above)
Retired units, which count as landed for completion: <ids>.     (after a blank line, only when there are any)

## Phases completed since the last report

- Phase <n>, completed on <date>      (or: None.)

## Risk reduced

- Paths to crown jewels broken: <n> (<signed delta> since the last report)
- Weakness classes retired onto the paved road: <n> (<signed delta>)
- Regression tests current: <n> (<signed delta>), stale: <n>

## Regime check

Arrivals of validated findings against verified fixes, per weakness class, over <span>. The ratio is verified fixes per arrival; the trend compares it with the <days> days before.
      (<span> is "the <days> days from <from> to <to>" when the thresholds are set, else "the report's window, <from> to <to>", or "every date on or before <to>" with no lower bound; "; the trend ..." only when the thresholds are set, so with any threshold unset the sentence ends "verified fixes per arrival.")

Thresholds (org/profile.yaml, set by <set_by_role> on <set_on>): at most <near_zero_max_arrivals> arrivals and at most <near_zero_max_open> open is near zero; otherwise fewer than <min_events> arrivals and fixes together is too few to call; otherwise a ratio of at least <balanced_min_ratio> is balanced and a lower one is backlog.
      (", set by ... on ..." only when both are recorded; or: Thresholds: not set in org/profile.yaml, so no class is placed in a regime.)

| Class | Arrivals | Verified fixes | Ratio | Previous ratio | Trend | Open | Regime |
|---|---|---|---|---|---|---|---|
| <class> | <arrivals> | <verified_fixes> | <ratio> | <previous_ratio> | <trend> | <open> | <regime> |
| All classes | <arrivals> | <verified_fixes> | <ratio> | <previous_ratio> | <trend> | <open> | <regime> |

What each regime means for what the pilot measures (the reference's part 1, "As AI scales, finding and fixing may pass through three regimes"):

- <regime>: <meaning>      (one line for each regime in the table, in the order of rule 19)
                                      (with no class, the table, the What each regime line and its meaning lines are replaced by the bare line: No validated findings recorded. The opening sentence and the Thresholds line stay, in either threshold form.)

## Effect on delivery

| Service | Metric | Phase | Baseline | Current | Change since last report | Tolerance | Used share | State |
|---|---|---|---|---|---|---|---|---|
| <service> | <metric> | <phase> | <baseline> | <current> <unit> | <signed change> | <tolerance> | <used_share> | <state> |
                                      (or: No delivery measures recorded.)

## Cost

- Effort cost: <estimated_effort_cost> <currency> (estimate, from the organization's own rates)      (the parenthesis only when estimate)
- Spend: <spend> <currency>
- Total to date: <total> <currency> (<signed total_delta> since the last report), an estimate        (", an estimate" only when estimate)

## What is next

- <unit> (phase <phase>, <state>)      (or: No unit is ready.)

## Stop conditions

| Id | Applies to phases | State | Record |
|---|---|---|---|
| <id> | <phases joined ", "> | <state> | <note> |

## Warnings

- <warning>      (or: None.)

## Confirmation

For each phase, the decision owner writes `set_color` and `set_by` in the block below, and the independent reviewer then writes `confirmed_by`. The tool keeps these fields as written when it runs again for this period.
```

Each section ends with a blank line. A section with nothing to list holds the bare line its note names, with no bullet: `None.`, `No delivery measures recorded.`, `No validated findings recorded.` or `No unit is ready.`. A Warnings line is `- ` and the message without its level word, `<code> <location>: <text>`. The Set by decision owner cell is empty while `set_color` is null; once a color is set it reads `<set_color> (<set_by>)`, with `FILL` in the parentheses while `set_by` is null. Empty cells stay empty: the slip on not-started and complete rows, the recovery on rows that are not yellow, and the person-written columns until a person writes them. The YAML block follows the Confirmation section; tools compare it by parsed value, never as text.

## Behavior

1. **Snapshot.** Everything is evaluated at `as_of`. A record dated after `as_of` has not happened yet: a `started_on`, `landed_on`, test `on`, acceptance `on`, risk entry, case `closed_on`, finding `validated_on` or `fix_verified_on`, or cost `period_end` after `as_of` is treated as absent. States without a date (stop condition states, premise statuses, the phase 2 script result, unit states other than landed) are read as they stand; this is a known limit when a report is taken for a past date. A state that goes with a date reads as not yet reached while its date is after `as_of`: a test `result` of pass or fail whose `on` is after `as_of` reads as not run, and a `report_acceptance.state` of accepted or refused whose `on` is after `as_of` reads as pending.
2. **Unit phases.** A phase's units are the units whose `phase` equals it. A unit is landed at `as_of` when its state is landed and its `landed_on` is on or before `as_of`. A unit whose state is landed and whose `landed_on` is after `as_of` is in progress at `as_of` (SR-14): it is not landed for completion, lateness or capabilities, it is listed in What is next with state `in-progress` whenever rule 15 selects it (its required capabilities are all provided by landed units), and its landing is listed by the report whose window holds its `landed_on`. A retired unit counts as landed for completion, is never late and never next, and is listed separately: `units_retired` holds every unit of the unit list whose state is retired, in natural order, whatever the window, since a retired unit carries no date.
3. **Elapsed time.** `days` = whole days from `started_on` to `as_of`; `elapsed_weeks` = floor(days × 10 / 7) / 10, so 42 days is 6.0 and 38 days is 5.4. A phase with no `started_on` on or before `as_of`, or missing from the plan, is not-started; a landed unit of such a phase is an error. A phase missing from the plan raises no error of its own. Each listed phase 1 to 3, and any started phase 4 or 5, needs `review_on` or an explicit organization time box. Phase 1 also needs `rule_4_review_on`. A legacy record with no `review_on` may retain its existing time box as the bound. An unstarted phase 4 or 5 may leave its review unanswered until it starts. A not-started phase stays not-started even when a stop condition that applies to it has fired.
4. **Complete.** A started phase is complete when every unit of it is landed or retired and `test.result` is pass. Phase 2 also needs phase 1's report accepted (SR-12). The completion date is the latest of the last `landed_on` of its units, `test.on`, and for phase 2 the acceptance date, since phase 2 is not complete until phase 1's report is accepted; when that acceptance comes last, phase 2 is dated by it. For a complete phase, `elapsed_weeks` runs to the completion date and no color is proposed.
5. **Built-in stop conditions,** each evaluated at `as_of`, each with a `note` naming the record:
   - SC-1, phase 1: fired when incomplete and its review is due without a continuing decision and next review date, a review records stop, or the risk owner's `rule_4_review_on` has arrived. A decision to continue or change cannot renew the rule-4 exception. It ends at phase 1 exit or that date, whichever is first. An explicit organization time box still fires SC-1 at its end.
   - SC-2, phase 2: fired when phase 1's `report_acceptance.state` is refused, whether or not phase 2 has started, or when phase 2 has started while phase 1's report is not accepted.
   - SC-3, phase 2: fired when `phase_2_script.result` is fail, or any delivery row with `phase: 2` is outside tolerance. Warning when no fire and a phase 2 delivery row is in early warning.
   - SC-4, the current phase while it is 1, 2 or 3 (applies to no phase otherwise): let n be the dial `early_stop_min_closed_cases`. Closed cases are those with `closed_on` on or before `as_of`, ordered by `closed_on`, then by case id. Fired when more than n cases are closed, every closed case after the n-th has `agent_hours` above `script_hours` and `agent_cost` above `script_cost`, and no closed case has `agent_only_finding: true`. With n or fewer closed cases it is recorded as description and never fires or warns. "After the n-th" counts closed cases in that order, n being the dial value: with n = 5, cases six onward. With no current phase, or a current phase of 4 or 5, `applies_to` is empty, so it never fires; its note then ends `no current phase from 1 to 3` when the case condition holds.
   - Organization stop conditions apply to the phases in `applies_to` with their recorded state. An id used twice, or one that reuses a built-in id, is an input error.
   The four built-in stop conditions are always listed, in `stop_conditions` and in the Stop conditions table, whatever the phases' states: SC-1 to SC-3 with their fixed `applies_to` even when their phase is missing from the plan or not started, and SC-4 with an empty `applies_to` (an empty Applies to cell) and state clear when there is no current phase from 1 to 3.
   The current phase is the lowest started phase that is not complete, or none.
6. **Delivery rows.** `used_share` = (current − baseline) / tolerance when `worse_when` is up, (baseline − current) / tolerance when down, rounded to two decimals; every comparison uses the rounded value. Outside tolerance when `used_share` > 1; early warning when it is at least the `early_warning_fraction` of the phase the row names (default 0.5, a starting value the organization may change); otherwise within. Every row is reported, but only rows with `phase: 2` feed a stop condition (SC-3); a row of another phase, or with no phase, changes no color. `change_since_last` = current minus the same service and metric's `current` in the previous report, or minus the baseline when there is none, rounded to four decimals.
7. **Color rules,** applied in this order for each started phase that is not complete. Each rule that applies adds a hit with its text:
   - **red** for each applicable fired stop condition, by id (rule `stop-condition`); for phases 2 to 5 when the review is due without a continuing decision and next review date, or a review records stop (rule `review-due`); when `test.result` is fail and `rerun_planned_by` is null, or after the timebox end, which is `started_on` plus `timebox_weeks` × 7 days (rule `test-cannot-pass`; a rerun planned on the end day itself is inside the timebox; a phase with no `timebox_weeks` has no timebox end, so a planned rerun always keeps this rule from applying); when `timebox_weeks` is set and `elapsed_weeks` ≥ `timebox_weeks` (rule `timebox-reached`). For phase 1 the timebox is reported once, as SC-1.
   - **yellow** when any unit of the phase that is neither landed nor retired has a `planned_by` before `as_of` (rule `behind-plan`; its slip is the days from the earliest such `planned_by` to `as_of`, the most overdue unit); when `elapsed_weeks` > `planned_weeks` (rule `behind-plan`; its slip is days minus the ceiling of `planned_weeks` × 7); for each applicable stop condition in warning (rule `early-warning`); for each premise in `relies_on_premises` recorded contradicted, by id (rule `premise-false`).
   - **green** when nothing applies (rule `on-course`).
   The color is red when any red hit exists, else yellow when any hit exists, else green. `rule` is the first hit in the order above; `other_rules` lists the distinct rules of the later hits in that order, leaving out `rule` itself, so a second hit of the first rule (two fired stop conditions) adds nothing; a green, not-started or complete row carries `other_rules: []`; `reason` is every hit as `<rule>: <text>`, joined with "; ". `slip_days` is the larger of the two behind-plan slips, 0 when neither applies, on every started phase that is not complete, red ones included.
8. **Phase 1.** Running past its planned weeks makes phase 1 yellow; of the time rules, only its timebox makes it red, because seeing where the time goes is what phase 1 is for. A fired stop condition or a test that cannot pass still makes it red. A phase 1 timebox above 6 weeks is an error.
9. **Slips in the report.** Slips appear as days ("9 days") in the table and as `slip_days` in the block, whatever their length; a slip is never converted to weeks. Nothing in the report states an amount of time in hours; effort enters only as cost.
10. **Recovery.** For each yellow phase copy `recovery` from the phase plan. A missing step or date is written as `FILL` and warned once per phase. Phases that are not yellow carry `recovery: null`.
11. **Setting and confirming colors.** The decision owner sets each phase's color by writing `set_color` and `set_by` in the report's YAML block; the independent reviewer confirms it by writing `confirmed_by`. When the file for this period already exists, the tool copies `set_color`, `set_by` and `confirmed_by` for each phase from it unchanged, and writes everything else afresh. Warn (SR-W-override) when a set color differs from the newly proposed color. A row with no proposed color (complete or not-started) gives no such warning. Warn (SR-W-unconfirmed) once for each phase of the previous report that has a proposed color but no set color or no confirmation, at `<previous report path>:<phase>`; a phase missing both still gets one warning, whose text names the missing set color. Warn (SR-W-independence) when the profile's `program_decision_owner_role` equals its `verifier_team`: the confirmation then lacks independence.
12. **Since the last report.** The window (SR-9) is the same for every use: units landed, phases completed and the effort rows behind SR-W-verification. With no previous report it has no lower bound, so each of the three takes every date on or before `as_of`. Units landed: `landed_on` in the window. Phases completed: completion date in the window. Deltas compare with the previous report's block, reading a missing value as 0; with no previous report every delta equals the current value. Recorded late: a unit landed at `as_of` whose `landed_on` is on or before the previous report's `as_of`, and that no earlier report lists in `units_landed` or `units_recorded_late` (every `org/status/*.md` report with an `as_of` before this one, this period's own file excluded), was recorded after the report for its window was written. It is listed once, in `units_recorded_late` (natural order) and under a "Recorded late" line, with its real `landed_on`. An earlier report with no `units_landed` key lists no unit, so a unit that landed inside its window is recorded late in the next report. An earlier report is never rewritten. With no previous report the window has no lower bound, so nothing is recorded late.
13. **Risk.** Count `paths_to_crown_jewels_broken` and `classes_retired_to_road` entries dated on or before `as_of`; copy the regression test counts, with the change in current tests.
14. **Cost.** `estimated_effort_cost` = the sum over effort rows with `period_end` on or before `as_of` of hours × the rate for its kind. `spend` = the sum of spend rows with `period_end` on or before `as_of`. `total` = `estimated_effort_cost` + `spend`, and `total_delta` compares it with the previous report. All three are totals to date. An effort row whose kind has no rate is an error, whatever its date. Report `estimate: true` whenever any effort row is included. Warn for each effort row in the window whose `includes_verification` is not true (a missing value counts as false).
15. **What is next.** Landed capabilities are those provided by units landed at `as_of`. List units that are neither landed nor retired and whose `requires` are all landed capabilities, as `{unit, phase, state}`, where `state` is the unit's state at `as_of` (rule 2, so never `landed`): units of the current phase first, then by phase, then by id; at most 10.
16. **Errors stop the run.** With any error the tool writes no report and exits 1; all errors found are printed.
17. Dates are ISO calendar dates. **Natural order**, the same rule as the impact report and the unit graph: split each string into runs of digits and runs of other characters, compare the runs pairwise from the left, two digit runs by numeric value (on a tie the shorter run first) and any other pair by code point; when every pair is equal, the string with fewer runs comes first. So U-27 comes before U-172 and SC-2 before SC-10. Every list is sorted by id in natural order, except `next` (rule 15), `phases` (by phase), `phases_completed` (by phase), `delivery` (by service, then metric, in natural order), `applies_to` (by number) and the regime `classes` (by class, in natural order). Messages are printed errors first, then warnings, each group sorted by code, then file, then id, in natural order; `warnings` in the block follows the same order. Nothing in the output depends on the clock, the file system order or the run.
18. **Reason and note texts.** In these texts an elapsed week count is written with exactly one decimal (`5.0`, `5.4`), and planned and timebox weeks as recorded. `<w>` is `elapsed_weeks`.
   - Not-started reasons: `not-started: no started_on in org/status/phases.yaml`; `not-started: started_on <date> is after <as_of>`; `not-started: phase not in org/status/phases.yaml`. Complete: `complete: <k> of <k> units landed or retired and the test passed on <test.on> (org/status/phases.yaml)`. On course: `on-course: no stop condition fired or warning, no unit past its planned date, elapsed <w> of <planned_weeks> planned weeks`.
   - Hit texts, each written after `<rule>: `: stop-condition `<id> fired (<note>)`; test-cannot-pass `test failed on <test.on> with no rerun planned (org/status/phases.yaml)`, or `test failed on <test.on>; the rerun planned by <date> is after the timebox end <end> (org/status/phases.yaml)`; timebox-reached `elapsed <w> of <timebox_weeks> timebox weeks without completing`; behind-plan by unit `<unit> planned by <date> is not landed: <d> days late (org/status/units.yaml)`, naming the most overdue unit (earliest `planned_by`, then id) and, when more than one unit is late, adding ` (<k> units past their planned date: <ids>)` before the file, the ids of every late unit joined ", " in natural order, so two parentheticals stand in a row (`U-02 planned by 2027-03-01 is not landed: 30 days late (2 units past their planned date: U-02, U-03) (org/status/units.yaml)`); behind-plan by time `elapsed <w> of <planned_weeks> planned weeks: <d> days past the planned end`, adding `, inside the <timebox_weeks>-week timebox` while `<w>` is below the timebox; early-warning `<id> shows an early warning (<note>)`; premise-false `premise <id> is recorded contradicted (org/status/signals.yaml)`.
   - Notes: SC-1 `phase 1 not started`, or `elapsed <w> of <timebox_weeks> timebox weeks`, adding ` and phase 1 is not complete` when fired. SC-2 `phase 1 report acceptance <state>`, adding ` while phase 2 has started` only when phase 2's start is what fires it: a refused report fires SC-2 by itself and its note carries no addition, whether or not phase 2 has started. SC-3 `phase 2 script <result>`, with ` (<failed conditions joined ", ">)` after a fail that lists them, then `; <service> <metric> used <used_share> of its tolerance` for each phase 2 row outside tolerance and the same with ` (early warning)` for each in early warning. SC-4 `<k> closed cases, minimum <n>: description only` with n or fewer closed cases, else `<k> closed cases, minimum <n>; after case <n>: <every | not every> case slower and costlier with the agent; <an agent-only finding exists | no agent-only finding>`, adding `; no current phase from 1 to 3` as rule 5 says. An organization stop condition keeps its recorded `note`, or reads `organization stop condition` when it has none.

19. **Regime check.** It reads the arrival of validated findings against verified fixes, per weakness class, which the reference's regimes section (part 1) says tells backlog from balanced. The thresholds are the five numbers in the profile's `regimes`. Each counts as set when it is present and valid: `window_days` and `min_events` whole numbers of at least 1, `near_zero_max_arrivals` and `near_zero_max_open` whole numbers of at least 0, `balanced_min_ratio` a number above 0; a value present and not valid is an error, and null or absent is unset. The tool supplies no value for any of them.
   - **Records.** A finding counts from its `validated_on` on or before `as_of`; findings validated after it are absent (rule 1). The classes are the distinct `class` values of the findings that count, and "all classes" pools those findings. Every class and the pool get the same row.
   - **Window.** With every threshold set, the window is the `window_days` days ending on `as_of`, `as_of` included, so `from` is `as_of` minus (`window_days` − 1) days; with 28, a window ending 2027-01-18 runs from 2026-12-22. The window before it is the `window_days` days just before `from`. With any threshold unset, the window is the report's own window (SR-9), `from` the day after the previous report's `as_of`, or null with no previous report, and there is no window before it.
   - **Counts.** `arrivals`: findings whose `validated_on` lies in the window. `verified_fixes`: findings whose `fix_verified_on` lies in the window, whenever they arrived. `open`: findings validated on or before `as_of` with no `fix_verified_on` on or before `as_of`. `ratio` = `verified_fixes` / `arrivals`, rounded to two decimals, null when `arrivals` is 0; `previous_ratio` is the same over the window before, null when there is none or it holds no arrival. Every comparison uses the rounded values.
   - **Trend.** `rising`, `falling` or `flat` as `ratio` is above, below or equal to `previous_ratio`, when every threshold is set, both ratios are numbers, and each window holds at least `min_events` arrivals and fixes together; `none` otherwise.
   - **Regime,** decided in this order: `unset` when any threshold is unset; `near-zero` when `arrivals` is at most `near_zero_max_arrivals` and `open` at most `near_zero_max_open`; `too-few-to-call` when `arrivals` + `verified_fixes` is below `min_events`; `balanced` when `ratio` is at least `balanced_min_ratio`, or null (fixes with no arrival); `backlog` otherwise. Near zero is tested before the minimum because rare arrivals are what it claims; its meaning line says how to confirm it.
   - **Warning.** SR-W-regime-unset, once, when at least one finding counts and any threshold is unset; the text names the unset fields in the order listed above.
   - **Meaning lines,** one for each regime the table shows (classes and all classes), in the order backlog, balanced, near-zero, too-few-to-call, unset, each written `- <regime>: <text>` with this text:
     - backlog: `discovery outruns verified fixes. Measure whether fixing whole classes through secure defaults, inside each owning team's fix cap, brings verified fixes up to arrivals; queue age and the trend show it. More discovery here lengthens the queue without reducing risk.`
     - balanced: `verified fixes keep pace with arrivals. Measure whether discovery reaches surface no kept test covers yet: the novel share of findings and the escape rate show it.`
     - near-zero: `arrivals are rare and the queue is short. Before claiming it, confirm it with the remediation change fail rate and the cost per validated novel finding: this check cannot tell rare weaknesses from little discovery, and a sweep makes a class look near zero for a while.`
     - too-few-to-call: `the window holds too few arrivals and fixes to read a ratio. Claim no regime for the class; lengthen the window or wait for more findings, and read the open count meanwhile.`
     - unset: `the organization has not set its thresholds. Set them in the profile from the recipe there; until then the report shows counts and ratios only.`

## Errors, warnings and exit status

Message shape: `<level> <code> <file>:<id>: <text>`. The id is the record's id, or `findings[<i>]` for a finding with no id, `<i>` its position in the `findings` list counted from 0: a phase number, a unit id, a stop condition id, a finding id, `regimes.<field>` for a regime threshold, an effort kind, `<kind>/<period_end>` for one effort row, `separation` for the profile's roles, or `file` for a whole file.

| Code | Level | Condition |
|---|---|---|
| SR-E-input | error | a file missing or not parsing; a date that is not a calendar date; a landed unit without `landed_on`; a test result of pass or fail without `on`; an acceptance other than pending without `on`; a unit state, test result, acceptance state or stop condition state outside its listed values (other fields with listed values, such as the phase 2 script result and a delivery row's `worse_when`, are read as they stand and never refused); a stop condition id used twice; an `add` in `org/units.yaml` reusing a unit id; a `modify` naming an unknown unit; a finding without an id or a class, a finding id used twice, a finding without `validated_on`, or a `fix_verified_on` before its `validated_on`; a regime threshold present but not valid (rule 19), at `regimes.<field>`; a `dials` that is not a list, or an early-stop dial whose `current` is not a whole number of at least 1, at `dials` |
| SR-E-unit | error | a unit id in unit status that the unit list lacks |
| SR-E-phase | error | a phase outside 1 to 5, a phase listed twice, or a required review or rule-4 bound missing as rule 3 defines |
| SR-E-timebox | error | a time box that is not a finite positive number |
| SR-E-landed-unstarted | error | a unit landed at `as_of` in a phase not started at `as_of` |
| SR-E-rate | error | an effort kind with no rate |
| SR-W-recovery | warning | a yellow phase without recovery step or date |
| SR-W-unconfirmed | warning | a phase of the previous report with a proposed color that was never set by the decision owner or never confirmed by the independent reviewer |
| SR-W-override | warning | a color set by the decision owner differs from the newly proposed one |
| SR-W-independence | warning | the program decision owner role is the verifier team |
| SR-W-verification | warning | an effort row in the window recorded without the effort of verifying agent output |
| SR-W-regime-unset | warning | findings are recorded and a regime threshold is unset |

Warning locations and texts, exactly as the reference writes them (`<x>` is a value):

| Code | Location | Text |
|---|---|---|
| SR-W-recovery | `org/status/phases.yaml:<phase>` | `phase <n> is yellow without a recovery <what>; FILL slots written for the decision owner`, where `<what>` is `step or date` when both are missing, else `step` or `date`, whichever is missing |
| SR-W-unconfirmed | `<previous report path>:<phase>` | `phase <n> proposed <color> was never set by the decision owner`, or `... was never confirmed by the independent reviewer` when only the confirmation is missing |
| SR-W-override | this period's report, `org/status/<period>.md:<phase>` | `the decision owner set <set_color>; the tool now proposes <proposed_color>` |
| SR-W-independence | `org/profile.yaml:separation` | `the program decision owner role is the verifier team; the confirmation lacks independence` |
| SR-W-verification | `org/status/signals.yaml:<kind>/<period_end>` | `effort recorded without the effort of verifying agent output` |
| SR-W-regime-unset | `org/profile.yaml:regimes` | `regime thresholds unset (<unset fields joined ", ">); counts and ratios only, no class placed in a regime` |

Exit 0 when there are no errors, 1 otherwise. Warnings are also listed in the report's `warnings` field.

## Acceptance fixtures

The fixtures are in `fixtures-status-report.yaml`. Each holds its own input files (a toy unit list, a phase plan, unit status, signals, a profile and, where needed, an earlier report), an `as_of`, and an `expect` block.

The file is a mapping. Its `fixtures` key lists one entry per row below; its other top-level keys hold shared inputs that the fixtures reuse through YAML anchors (such as `toy_units`, `profile`, `profile_regimes`, `signals_clear`, `signals_cost` and `signals_regime_all`; the file holds others as well, and their names carry no meaning). A runner reads them only through the anchors and checks no top-level key but `fixtures`; it is strict on entry keys and `expect` keys. Each entry has `name`, `description`, `source` (not checked), `as_of`, optional `period` (otherwise the quarter of `as_of`), optional `runs: 2`, `files` (path under the organization's root to content: a mapping written as YAML, a string as is) and `expect`. The runner runs the tool on that root with `as_of` and the period, and reads the report from the path the tool prints after `report: `. Each expect key is checked when present:

- `exit`: the exit status. `report_written`: whether the report file exists.
- `errors` and `warnings`: every message of that level, written `<code> <file>:<id>` (the printed line without its level and without the text after the next `: `), compared as a multiset with order ignored: each entry consumes one message, and a message left over fails the fixture.
- `report`: facts of the report's YAML block. Under `phases`, keys are phase numbers, each compared with that phase's row; under `stop_conditions`, keys are ids, each compared with that condition; any other key is compared with the block's key of the same name. The comparison is the same at every depth: a mapping checks only the keys it lists, and this holds for mappings inside lists too; a list must have the same length and match item by item, in order; a scalar is compared by its text (so `2` and `"2"` match), and null matches only a null or missing value.
- `markdown_contains`: strings the written report must contain exactly. `markdown_excludes`: strings it must not contain, ignoring case.
- With `runs: 2` the tool runs twice on the same root, and both runs must print the same output and leave the same report bytes. Every written report must also satisfy: five phase rows, one status each, a reason starting with its rule, a proposed color only on green, yellow and red rows, recovery slots on every yellow row, and no hours anywhere.

| Fixture | Exercises | Expected outcome |
|---|---|---|
| fixture-sr-green.yaml | phase 1 started 2 weeks ago, units on plan | phase 1 green, rule on-course, slip 0; phases 2 to 5 not-started; next lists the two ready phase 1 units |
| fixture-sr-unit-late.yaml | one phase 1 unit 4 days past `planned_by`, no recovery written | yellow, behind-plan, slip 4 days, `FILL` slots; SR-W-recovery; no hours in the report |
| fixture-sr-past-planned.yaml | phase 1 at 5.4 weeks of 5 planned, timebox 6, recovery written | yellow, behind-plan, slip 3 days, recovery copied |
| fixture-sr-timebox.yaml | phase 1 at 6.0 weeks and not complete | red, stop-condition SC-1, behind-plan in other rules, slip 7 |
| fixture-sr-premise.yaml | phase relies on a contradicted premise | yellow, premise-false |
| fixture-sr-delivery-warning.yaml | phase 2 delivery row with used share 0.6 | phase 2 yellow, early-warning, SC-3 warning; phase 1 complete |
| fixture-sr-delivery-out.yaml | phase 2 delivery row with used share 1.2 | phase 2 red, stop-condition, SC-3 fired |
| fixture-sr-script-fail.yaml | phase 2 script fail | phase 2 red, SC-3 fired |
| fixture-sr-test-fail.yaml | phase 3 test fail, no rerun planned | red, test-cannot-pass; phases 1 and 2 complete with their dates |
| fixture-sr-rerun.yaml | phase 3 test fail, rerun planned inside timebox | not red by that rule: green, on-course |
| fixture-sr-no-agent-early.yaml | 4 cases, all agent slower and costlier, minimum 5 | SC-4 clear |
| fixture-sr-dial-list.yaml | the four cases of no-agent-early, with the early-stop dial at 3 in the profile's dial list | SC-4 fired; current phase red |
| fixture-sr-dial-mapping.yaml | the dial register written as a mapping | SR-E-input at `org/profile.yaml:dials`; no report |
| fixture-sr-no-agent-fired.yaml | 7 cases, cases 6 and 7 agent slower and costlier, none agent-only | SC-4 fired; current phase red |
| fixture-sr-no-agent-found.yaml | as above but case 2 has an agent-only finding | SC-4 clear |
| fixture-sr-acceptance-refused.yaml | phase 1 report refused, phase 2 not started | SC-2 fired; phase 2 not-started; phase 1 complete |
| fixture-sr-started-unaccepted.yaml | phase 2 started, phase 1 acceptance pending | phase 2 red, SC-2 |
| fixture-sr-complete.yaml | all phase 1 units landed, test pass, no previous report | phase 1 complete on the test date; listed in phases completed; no proposed color and a null `slip_days` |
| fixture-sr-landed-no-test.yaml | all phase 1 units landed, test not-run | not complete: green |
| fixture-sr-window.yaml | previous report at 2027-03-31, units landed on 03-31 and 04-01 | only the 04-01 unit is listed; risk deltas against the previous block |
| fixture-sr-previous-unconfirmed.yaml | as window, previous phase 1 color never set or confirmed | SR-W-unconfirmed on the previous report |
| fixture-sr-cost.yaml | two effort kinds with rates, one spend row, one row without verification, rows after `as_of` | totals computed from rows on or before `as_of`, `estimate: true`, SR-W-verification |
| fixture-sr-no-rate.yaml | effort kind with no rate | SR-E-rate; no report |
| fixture-sr-next.yaml | landed, unlanded and retired units with known capabilities, more than 10 ready | next lists only ready units, current phase first, exactly 10; the retired unit listed separately |
| fixture-sr-confirmed-kept.yaml | this period's report exists with green set and confirmed; rerun proposing yellow | set color and confirmation kept; SR-W-override |
| fixture-sr-independence.yaml | decision owner role equals verifier team | SR-W-independence |
| fixture-sr-bad-inputs.yaml | phase 7, phase 2 without review or time box, unknown unit id, phase 1 time box zero | SR-E-phase twice, SR-E-unit, SR-E-timebox; no report |
| fixture-sr-landed-unstarted.yaml | a landed unit in a phase with no `started_on` | SR-E-landed-unstarted |
| fixture-sr-missing-file.yaml | the signals file missing | SR-E-input |
| fixture-sr-determinism.yaml | fixture-sr-cost.yaml run twice into the same root | identical output and report |
| fixture-sr-natural-order.yaml | units U-172, U-27, U-1000 and U-9 | units landed U-27 then U-172; next U-9 then U-1000 |
| fixture-sr-natural-order-tie.yaml | units U-002, U-02 and U-2 landed and U-001, U-01 and U-1 planned, the longer runs first in both files | units landed U-2, U-02, U-002; next U-1, U-01, U-001: on a tie in value the shorter digit run comes first |
| fixture-sr-sc4-no-current-phase.yaml | phase 1 complete, phase 2 not started, 7 cases all slower and costlier with the agent | no current phase; SC-4 applies to no phase and stays clear |
| fixture-sr-rerun-at-timebox-end.yaml | phase 3 test fail, rerun planned on the timebox end day | green, on-course |
| fixture-sr-rerun-after-timebox.yaml | the same, rerun one day later | red, test-cannot-pass |
| fixture-sr-two-previous-same-date.yaml | two earlier reports with the same `as_of` | the previous report is the path that sorts last; deltas against it |
| fixture-sr-profile-missing.yaml | no `org/profile.yaml` | SR-E-input; no report |
| fixture-sr-delivery-other-phase.yaml | a phase 3 delivery row outside tolerance while phase 2 runs | the row reported as outside; SC-3 clear; phase 2 green |
| fixture-sr-org-units-duplicate-add.yaml | an `org/units.yaml` that adds a shipped unit id, adds one new id twice, and modifies a shipped unit | SR-E-input at each reused id; the modify raises nothing; no report |
| fixture-sr-landed-after-cutoff.yaml | a unit recorded landed with a `landed_on` four days after `as_of` | not in units landed; listed in What is next as `in-progress`; the unit that needs its capability is not next; phase 1 green |
| fixture-sr-recorded-late.yaml | a unit whose `landed_on` lies inside the previous report's window, which does not list it | listed once in `units_recorded_late` under the "Recorded late" line, not in units landed |
| fixture-sr-recorded-late-once.yaml | the report after that, with both earlier reports present | the late unit is listed nowhere again |
| fixture-sr-landed-after-cutoff-next.yaml | the next report, whose window holds that `landed_on` | the unit listed once in units landed, the unit landed in the earlier window not listed again, and the unit that needs its capability now next |
| fixture-sr-regime-backlog.yaml | one class, thresholds set, a 28-day window: 6 arrivals and 3 verified fixes, the window before 4 and 4 | ratio 0.5, previous 1, trend falling, regime backlog; all classes the same; the backlog meaning line |
| fixture-sr-regime-balanced.yaml | one class: 4 arrivals and 4 fixes, the window before 5 and 3 | ratio 1, previous 0.6, trend rising, regime balanced |
| fixture-sr-regime-near-zero.yaml | one class: 1 arrival and 1 fix, nothing open, nothing in the window before | near-zero although 2 events are below the minimum of 6; previous ratio null, trend none |
| fixture-sr-regime-too-few.yaml | one class: 2 arrivals and 1 fix, 2 open, nothing in the window before | ratio 0.5 still reported; regime too-few-to-call, trend none |
| fixture-sr-regime-overall.yaml | the four classes above together, with a finding validated and a fix verified after `as_of` | classes in natural order; all classes 13 arrivals, 9 fixes, ratio 0.69, previous 0.78, falling, 11 open, backlog; the dated-after records absent |
| fixture-sr-regime-unset.yaml | the four classes, no `regimes` in the profile, no previous report | SR-W-regime-unset naming all five fields; window open below; every row unset with trend none; counts over every date on or before `as_of` |
| fixture-sr-regime-bad-inputs.yaml | `min_events` 0, `balanced_min_ratio` "high", a fix verified before its validation, a finding with no class | SR-E-input at each; no report |
| fixture-sr-regime-no-findings.yaml | thresholds unset and no findings | no warning; the section reads No validated findings recorded. |

The cost and delivery-other-phase fixtures also hold layout lines from Outputs that the written report must contain exactly.

Coverage: SR-1 (all, by the invariants), SR-2 (complete, landed-no-test, test-fail), SR-3 (timebox, delivery-out, script-fail, test-fail, no-agent-fired, rerun-after-timebox, sc4-no-current-phase), SR-4 (unit-late, past-planned, premise, delivery-warning, delivery-other-phase), SR-5 (green, rerun, rerun-at-timebox-end), SR-6 (unit-late, and the invariants), SR-7 (unit-late, past-planned), SR-8 (confirmed-kept, previous-unconfirmed, independence), SR-9 (window, complete, two-previous-same-date), SR-10 (cost, window), SR-11 (next), SR-12 (started-unaccepted, acceptance-refused), SR-13 (determinism, natural-order, natural-order-tie), SR-14 (landed-after-cutoff, landed-after-cutoff-next), SR-15 (recorded-late, recorded-late-once), SR-16 (regime-backlog, regime-balanced, regime-overall, regime-unset), SR-17 (regime-unset, regime-no-findings, regime-bad-inputs, regime-backlog, regime-balanced), SR-18 (regime-too-few, regime-near-zero), SR-19 (regime-backlog, regime-overall). Organization units: org-units-duplicate-add.

## Not in scope

Setting or confirming colors; deciding to continue after red; writing the phase test or criteria; collecting delivery metrics or effort from source systems; judging premises; checking readiness; schedules in hours; setting the regime thresholds, which the organization derives from its own records; counting discovery effort or the cost per validated novel finding.

### Outcome and review acceptance cases for 5.1

The fixture set also covers a one-day exit before review, a cutoff before that exit, a due review with no decision, continue and change with a next date, stop, a future decision, the next review becoming due, and a continuing decision that cannot extend the rule-4 exception. Phases 2 through 5 each have a due-review case. An eight-week organization time box passes without an edition maximum. Invalid cases cover a wrong decision owner, a missing next date, a decision before its due date and malformed review history. Existing exit, acceptance, independence, hard-stop and comparison cases remain in the set.

### Kept-test record validation

The bundled status report also reads optional `org/kept-tests/*.yaml` records in the format in `workflow-kept-tests.md`. Absence of the directory is allowed for an organization with no enrolled test. Each record is checked before report output. `SR-E-kept-test` is an error at the record path and test id when its required metadata, read-only mirror access, drift-to-finding link, independent confirmation or matching passing closure run is inconsistent. Missing or malformed YAML uses SR-E-input. A failed check writes no report and exits 1. This validation checks records and never issues a closure decision. The acceptance cases are in `fixtures-kept-tests.yaml` and run through this same CLI in the bundle gate.
