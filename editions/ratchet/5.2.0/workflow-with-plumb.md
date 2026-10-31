# With Plumb

Add Ratchet to a Plumb workspace, map the profile's current-practice record to Ratchet's parts, and keep that current state up to date. Plumb compares the design with what the organization runs today and builds its plan and pages from the design.

**Plumb tracks the unmodified released edition.** Plumb adds Ratchet from the edition's own Plumb files in `plumb/`. The organization's patches and unit changes do not reach Plumb's model, plan or pages: they stay in this workspace and its checks. Tell the person so before relying on a Plumb page for a changed design.

**Scope:** the Ratchet design in one Plumb workspace. **Inputs:** a released, verified Ratchet edition in `upstream/` and the Jig edition it pins in `upstream/pins/jig/` (`workflow-start.md`); Plumb on this workstation with its skill, in particular its current-state workflow at `skill/plumb/workflows/current-state.md` and its add-a-design workflow at `skill/plumb/workflows/new-edition.md` in Plumb's bundle; the organization's teams; and `org/profile.yaml` with its `current_practice` map (`workflow-map-current-practice.md`). The Plumb workspace is `plumb/` under the workspace root. Without Plumb's skill, stop: this workflow does not restate Plumb's file formats. **Done when** Ratchet is added and builds, every step and module row of the mapping below that the profile answers has its current-state records, Plumb's findings are reported to the person, and nothing is confirmed or disposed of without a person's word.

## 1. Add the design

Read Plumb's add-a-design workflow first. Ratchet pins a Jig edition, and Plumb verifies that pin before it writes anything, so Jig goes in first. Run these from the workspace root, with the Jig version that Ratchet's `edition.yaml` names under `pins`:

```sh
plumb design add jig@<pinned jig version> --from upstream/pins/jig --workspace plumb
plumb design add ratchet@<version> --from upstream --workspace plumb
```

That order works with every Plumb release from 0.6.0 on. From Plumb 0.6.1, Plumb also finds the pinned edition at `upstream/pins/<namespace>/` itself, so one command adds both:

```sh
plumb design add ratchet@<version> --from upstream --workspace plumb --with-pins
```

With Plumb 0.6.0, `--with-pins` does not look in `upstream/pins/` and the command fails with a missing pin; use the two commands above. Where `plumb` is not linked on the workstation, run the same commands through Bun from the workspace root, naming Plumb's entry file in its folder:

```sh
bun <Plumb folder>/plumb.ts design add jig@<pinned jig version> --from upstream/pins/jig --workspace plumb
```

Never edit an edition file to make the addition pass. Complete the team map from the organization's own teams as Plumb's workflow describes, then build the design and report the role counts and any unresolved roles:

```sh
plumb build plumb/instances/ratchet
```

## 2. Map the profile to current state

Read Plumb's current-state workflow. Ratchet's current state lives in `plumb/instances/ratchet/current.yaml`, with one record per part. Plumb records only Ratchet's own parts, so every id below is a part of `model.yaml` without a namespace prefix. Each part is mapped from exactly one row: a step entry in `current_practice.steps`, or a module entry in `current_practice.modules`.

| Profile entry | The parts it records |
|---|---|
| STEP-1 Choose a scenario with named owners | `people.scenario-owner`, `s1.consequence-register`, `s2.operator-interface` |
| STEP-2 Trusted context; proof condition held apart | `s1.context-service`, `s1.source-facts`, `s1.context-compiler`, `s5.fixture-oracle-registry` |
| STEP-3 An agent proposes one exact test | `s2.workflow-worker-app`, `s2.approved-producers`, `s4.model-data-gateway` |
| STEP-4 A person approves the exact action | `s3.approval-service`, `s3.approval-console`, `s3.policy-decision-point` |
| STEP-5 Run isolated; audit fails closed | `s3.bounded-runner`, `s3.local-enforcement-point`, `s3.protected-audit`, `s3.observation-receipt` |
| STEP-6 An independent reviewer reproduces | `s5.independent-verifier`, `s5.evidence-intake-validator`, `s5.protected-evidence-store` |
| STEP-7 Record outcome, decider, expiry | `s5.finding-ledger`, `s5.disposition-review` |
| STEP-8 The owner fixes and deploys | `s6.owner-change-connector`, `people.engineering-owners` |
| STEP-9 Retest the deployed system | `s6.release-state-correlator`, `s6.change-closure-records`, `s5.repair-checks` |
| STEP-10 Keep the test in the pipeline | `s6.team-regression-suite`, `s6.regression-catalog`, `s6.retest-regression-planner`, `s6.enterprise-adapters` |
| STEP-11 Record cost and handoffs; pull next | `s7.flow-cost-telemetry`, `s7.evaluation-operations`, `s7.value-ledger` |
| STEP-12 A recurring weakness becomes a secure default | The paved-road module's row. Use the STEP-12 entry for those parts only when the profile has no `paved-road` module entry |
| Module `tool-portfolio` | `ext.appsec-tooling`, `ext.security-review-practice` |
| Module `consequence-gates` | `s5.path-impact-graph`, `ext.threat-intelligence` |
| Module `production-effects` | `s3.production-cell` |
| Module `paved-road` | `s6.paved-road-catalog`, `s6.road-conformance-check`, `s5.failure-class-registry`, `s7.road-adoption-telemetry`, `s5.road-assurance-record` |
| Module `secure-creation` | No Ratchet part: its parts are Jig's. Record them through Jig's own with-Plumb workflow |

The edition build checks this table: every id is a part of the shipped `model.yaml` and of `plumb/model.yaml`, no part appears in two rows, every step and every module of `modules.yaml` has a row, and a module row names only parts that carry that module.

For each part in a row whose profile entry is answered, write one record from that entry:

| Record field | From the profile entry |
|---|---|
| Part id | The part, from the row |
| Baseline | From the entry's `state` first: `none` when it is `absent`, `stand-in` when it is `ad-hoc`. For a step that is `established` or `partial`, read the top-level `existing_tools` entry recorded under that step's id (`existing_tools.STEP-4` for STEP-4): `existing-tool` when it names a tool, `stand-in` when it is null or has no entry (STEP-12 has none). For a module that is `established` or `partial`, the profile records no tool, so whether a tool or system does the work (`existing-tool`) or people do it by hand (`stand-in`) is the person's call: ask, and record their answer |
| Discovery | The entry's `found` (`by`, `from`, `as_of`), which step and module entries both carry: its source and date go in the discovery fields Plumb's workflow names. Set the confidence from how the source was read: a local file read directly is high, a person's account is medium, anything inferred from absence or indirect evidence is low |
| Confirmation | The entry's `confirmed` (`by`, `at`), with the same person and date, only when the profile records it |

A step or module whose state is `unrecorded` or still `FILL` gets no record: nothing shows where its parts stand, and Plumb would read a record without a baseline as `none`. It stays a gap in `org/current-practice-gaps.md`. A step confirmed only through the older `confirmed_by` field has no confirmation date, so its records stay discovered until the person's confirmation is recorded in `confirmed`. The discovery block, the module wiring ladder and the past findings stay in the profile alone, because Plumb records parts and these describe practice around them.

A confirmation in the profile never sets a disposition. Ask the person for each part's disposition (Plumb's workflow lists the values) as a separate decision, and record it only in their words. A confirmed record with no disposition is an unresolved decision, which Plumb's check reports as an error until one is recorded; tell the person so.

Build again and report every finding Plumb prints for these records.

## 3. Keep it current

| Event | What to do |
|---|---|
| A person confirms a step | Record `confirmed` in the profile (`workflow-map-current-practice.md`), then add the same confirmation to each record of that step's row |
| New evidence for a step | The profile entry's `found` changes. Update the records' discovery only while they are unconfirmed. For a confirmed record, raise the disagreement with the confirming person and leave the record as it is |
| A design change is accepted | Nothing changes in Plumb: it keeps tracking the released edition |
| A new Ratchet edition is accepted | Add the new version (and the Jig edition it pins, when that changed) with the commands above, then rebuild. For identifiers the edition moved, run Plumb's migrate command with the edition's `moved.yaml` as a dry run, show the person the result, and apply it on their word |

Plumb writes generated files on build and needs Bun only. A folder source needs no network. Plumb reads tracker data only from exported files.
