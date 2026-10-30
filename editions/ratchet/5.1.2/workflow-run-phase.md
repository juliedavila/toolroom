# Run a phase

Start a phase on written criteria, keep its status honest, and end it on its test.

## Before it starts

- The decision owner writes down what a good result looks like: the exit outcome, the review date to continue, change or stop, estimated effort, expected handoff waits and the phase's test (the exit tests are in `R4-work-units.md`). Effort may be estimated, for example from the organization's own rates for each kind of engineering work, and is reported as an estimate.
- Record the first review date as `review_on` and append dated continue, change or stop decisions to `reviews`. Each continuing decision names its next review date. For phase 1, record the risk owner's separate rule-4 review date as `rule_4_review_on` before relying on that exception. The decision owner cannot renew it by continuing the phase.
- For phase 1, choose where its one weakness comes from: a practice target the team writes, a finding from the existing discovery practice, or a recent finding. Record it in `phase_1_boundary.source`. A real finding means the phase 1 agent drafts only: it holds no tools, its only exit is the approved model route, and people run every approved action. The independent reviewer confirms the boundary before the first approval.
- Readiness must support the phase. If it does not, the blocking questions come first. If the readiness tool or the profile checker is missing or has not passed its fixtures, readiness is unchecked: say so, and the phase does not start until it is checked (`workflow-build-tools.md`).

## While it runs

Report each phase's status with the status report tool (`spec-status-report.md`):

- **Green:** on course toward its exit outcome, with a current review and no stop condition near.
- **Yellow:** behind its estimates, an early warning moving or a premise found false. The decision owner names a recovery step and a date.
- **Red:** a stop condition has fired, the exit test failed without a planned recovery run, or a review is due without a recorded decision. Pause work until the decision owner records continue, change or stop. Continuing work needs a next review date. A review cannot waive a safety rule or extend an exception.

The tool proposes a color from the records; the decision owner sets it, and the independent reviewer confirms it.

## When it ends

The phase is complete when all its required work units have landed and its exit test passes. This rule-4 exception ends at phase 1's exit or the risk owner's recorded review date, whichever is first. Reaching that date without the exit outcome stops work under the exception until full separation is in place or the named risk owners accept a standard exception. Phase 2 starts only when the decision owner accepts the phase 1 report against the criteria written in advance, including each role's account of every step done differently from the plan. Record the acceptance in `org/decision-log.md` and update the premise ledger with what the phase measured.

## Phase 1 records and exception boundaries

Write `org/status/phase-1-plan.md` before starting. Record the exit outcome, scoring criteria and scorer, review date, estimated effort, expected handoff waits, boundary source and evidence, and links to the profile and premise ledger. Keep dates and unit state in `org/status/phases.yaml` and `org/status/units.yaml`; write measured signals and premise status in `org/status/signals.yaml`. The narrative plan supplies the outcome and estimates that have no structured phase field. Reference the plan from `org/decision-log.md`.

The rule-4 phase 1 allowance applies when the independent reviewer holds the proof condition and decides, as R1 states. It is not a `phase_1_only` profile exception. Record the actual role assignments and whether the allowance is used in the plan and decision log. Supply `rule_4_review_on` in the status phase row even when full separation already holds, as the status format requires. A due bound is still reported by the tool; record a full-separation transition in the decision log and do not silently renew the allowance. A machine-readable transition remains a listed follow-up.

A `phase_1_only` profile exception is a separate temporary path for eligible should-never codes while both risk owners are not yet named. Once both are named, use the standard exception path and their actual acceptances. Naming the security risk owner during setup does not require delaying the business risk owner's appointment. Use neither exception when the filled profile and role assignments satisfy the rules.

`rule_4_review_on` bounds the rule-4 allowance. An exception's `risk_owner_review_on` bounds that individual profile exception, and `phase_1_exit_on` records the actual phase exit on it. The dates may differ because they bound different permissions. All applicable bounds remain in force; the phase decision owner's `review_on` renews neither.

Premise ids in status inputs are organization ledger keys. The spec's `PR-03` is illustrative and has no automatic mapping to `CL-03`. In new records use the stable `CL-nn` from `upstream/claims.yaml`, and copy the same id into `relies_on_premises` and `signals.premises`. In the premise ledger record that id, the edition, the claim statement, its evidence and status. For an existing `PR-nn` key, record an explicit ledger cross-reference. Match a field-guide premise by its statement to a claim; do not infer an id from the displayed number.

Phase 1's held regression is the team-owned instance test and independent closure evidence. Record it using `workflow-kept-tests.md`. The automatic mirror is phase 2 work, so a manual phase 1 record never claims U-455 built.

The field guide's premise 16 is "Discovery already runs, and the loop after it is uneven". It is an organization-specific practice premise, not `CL-16` about dependency-scoped deployment holds. If the phase relies on it, create a ledger key such as `ORG-current-practice`, quote that statement, link the confirmed practice map, and use that same key in both status inputs. Do not invent a `PR-16` to `CL-16` correspondence.
