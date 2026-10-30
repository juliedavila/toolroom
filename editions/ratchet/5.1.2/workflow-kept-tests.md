# Record a kept test and its mirror

Keep one record per test version at `org/kept-tests/<test-id>-<version>.yaml`. Keep the owning team's actual test in its repository and suite. Security, the owning engineer and the drafting agent co-create the correction and visible component-local instance test in one reviewed pull request. Record the team's accepted, edited or rejected decision and reason. Reference the failing-before and passing-after CI runs and deployed correction. A rejected proposal supplies no held regression or completed fix. A later variant enters as a new finding.

The instance test is visible to coding agents. Aggregate proof conditions, protected fixtures, expected aggregate outcomes and chained-path validation remain in the independent evidence system. Put only source references in this record, including `input_ref` and `assertions_ref`; never copy protected content into it or the visible test. Keep independent aggregate closure evidence under the finding's normal disposition. A component-local pass establishes no aggregate closure.

In phase 1, write the instance record and manually transcribe source run references into the same format with `mirror.built: false`. The independent verifier checks this evidence for the phase exit. This manual record does not land U-455 or claim automatic coverage. Its near-JIT `reviews` entries read `protection: unknown`. In phase 2, implement the automatic read-only source inventory and reconciliation required by U-455. Mark built only when that unit's check passes.

Enroll a test version before collection so later removal is detectable. Keep enrollment and observations append-only. A version change gets a new file and enrollment; retain the old version and its history. The source credential can only read repository and CI data. The mirror can append observations and submit findings, but only owning-team review changes or retires the source test. Retain a retirement's authorized lifecycle-decision reference and all earlier observations.

Every observation names its test version, source revision, configuration, declared dependency scope, source reference, observation time, actual run if available, state, result and collection outcome. Use state enabled, skipped or removed; result passing, failing or unknown; collection success or unavailable. Missing runs, stale observations, unreachable sources or missing dependencies give unknown protection. A missing run is `run: null` and cannot carry result passing. Reconcile expected enrollment against the observed inventory to identify removals. Keep missing collection visible; an empty observed list is not zero drift.

For each removed, skipped or failing episode, submit a ValidationRequest through the normal dispatcher and record its finding reference in `drift`. In phase 1, when the dispatcher is not built, the verifier records the same validation request in the organization's tracker: affected test id and version, observation and episode, source revision, configuration, dependency scope, reason and evidence reference. Route it to the normal independent validation owner, record the resulting finding reference in drift, and cite the request and routing in the decision log. Keep route: normal-loop. This manual submission supplies the normal intake record and does not land the dispatcher unit.

Deduplicate by test version and episode. Repeated observations in an episode may reference the same finding. Distinct episodes keep distinct entries. Drift is the trigger for a normal finding, with the affected test version attached. This edition adds no dedicated finding-kind id. Choose an existing kind only when its closure check fits the actual weakness; otherwise follow `add_finding_kind` in the design-change workflow and obtain normal acceptance. Do not automatically label every drift a path finding. A skipped test alone does not establish a path weakness. If independent validation demonstrates a reachable path and the path kind's deployed retest closes that weakness, record that evidence and the reason for choosing path. Otherwise propose an add_finding_kind patch with a fitting closure check and keep the kind decision pending until normal acceptance. A draft evaluation keeps that patch proposed. The status validator's record-consistency pass does not approve a finding-kind choice.

Repair through owning-team review. Re-enabling a test alone does not close its finding. Record normal disposition and evidence references, repair author, independent confirmer, closure acceptor and closed time. The independent confirmation must be by someone other than the repair author. Record an actual enabled passing observation after the drift at the repository revision, configuration and dependency scope accepted for closure. Both independent confirmation of normal disposition and that matching pass are required before marking the episode closed. Enrollment remains. Any aggregate vulnerability still needs its own independent deployed-state closure check.

Each near-JIT assessment states revision, configuration, dependency scope, as-of time and its chosen freshness window. `fresh_from` is the lower timestamp bound of that review's stated window. `protection: current` requires a built mirror and an actual enabled passing run matching all those dimensions within the window, with no later gap or open episode. Otherwise record unknown. The review can choose and record its own window today; a profile-level maximum by consequence tier is a later design decision. No profile field or edition default is implied. Mirror metadata supports a person's review and grants no authority.

## Record format and validation

`record_version: 1` identifies this tool record format. The example below is the complete worked record in the first entry of `fixtures-kept-tests.yaml`. All timestamps are UTC ISO strings. Paths and people are illustrative. Replace every example reference with actual evidence. `fix` records the reviewed correction. `instance_test` records the team-owned source and before and after runs. `mirror` retains enrollment and observations. `drift` records the findings and their normal dispositions. `reviews` contains scoped risk assessments. A review without enough evidence uses only `protection: unknown` and may record its reason.

```yaml
record_version: 1
id: KT-1
finding: FND-1
weakness_class: example-class
team: Team Alpha
repository: repo://service-a
suite: component
fix: 
  pull_request: PR-12
  author: Fix author
  team_decision: edited
  decision_reason: Team reviewed and adjusted the correction
  deployed_digest: sha256:example
instance_test: 
  id: T-1
  version: "1"
  source_revision: rev2
  dependencies: 
    - service-a
  input_ref: repo://test/input
  assertions_ref: repo://test/assertions
  failing_before: CI-11
  passing_after: CI-12
  visible_to_agents: true
  protected_content: false
mirror: 
  built: true
  source_access: read-only
  enrollment: 
    test_id: T-1
    test_version: "1"
    enrolled_at: 2026-10-28T09:00:00Z
  observations: 
    - id: OBS-1
      test_id: T-1
      test_version: "1"
      repository_revision: rev2
      dependency_scope: 
        &dependency_scope
        - service-a
      configuration: ci-main
      run: CI-12
      observed_at: 2026-10-28T10:00:00Z
      source: ci://12
      state: enabled
      result: passing
      collection: success
    - id: OBS-2
      test_id: T-1
      test_version: "1"
      repository_revision: rev3
      dependency_scope: 
        *dependency_scope
      configuration: ci-main
      run: CI-13
      observed_at: 2026-10-28T11:00:00Z
      source: ci://12
      state: skipped
      result: unknown
      collection: success
    - id: OBS-3
      test_id: T-1
      test_version: "1"
      repository_revision: rev4
      dependency_scope: 
        *dependency_scope
      configuration: ci-main
      run: CI-14
      observed_at: 2026-10-28T12:00:00Z
      source: ci://12
      state: enabled
      result: passing
      collection: success
drift: 
  - episode: D1
    test_version: "1"
    finding: FND-2
    observation: OBS-2
    reason: skipped
    route: normal-loop
    state: closed
    closure: 
      disposition: finding://FND-2/disposition
      evidence: finding://FND-2/retest
      accepted_by: Closure acceptor
      confirmed_by: Independent verifier
      repair_author: Fix author
      repository_revision: rev4
      configuration: ci-main
      dependency_scope: 
        - service-a
      closed_at: 2026-10-28T13:00:00Z
      observation: OBS-3
reviews: 
  - protection: current
    observation: OBS-3
    repository_revision: rev4
    configuration: ci-main
    dependency_scope: 
      - service-a
    as_of: 2026-10-28T14:00:00Z
    fresh_from: 2026-10-28T11:00:00Z```

Run `bun upstream/ratchet-tools-status-report.ts --root . --units upstream/units.yaml --as-of <YYYY-MM-DD> --period <name>` with the normal status inputs. It validates every YAML record in `org/kept-tests/` before writing a report. Invalid records produce `SR-E-kept-test`, exit 1 and no report. A successful run validates records but neither creates a finding nor lists kept tests or drift in the report body. The tracker finding, drift record and decision log show the raised finding. Maintain signals.risk.regression_tests separately from reviewed evidence; the tool does not derive those counts from kept-test files. There is no validate-only mode. For iterative validation, copy the normal inputs and kept-test records to build/kept-test-validation/ and run with --root build/kept-test-validation and an absolute --units path, keeping generated status files in that copy. Run once against the real root when producing the actual periodic report. A successful run checks record consistency; it does not prove source credentials, append-only storage, the linked evidence or human independence in the organization. The independent reviewer checks those facts. Keep the command, output and source references in the decision log. The bundle gate tests valid phase 1 evidence and closed drift as well as write access, absent findings, stale or mismatched passes, duplicate episodes and missing independent confirmation.

Repeated drift observations can add `episode: <episode id>` to link the same version and episode to its existing finding. Do not create one finding per repeated poll. For survival and promotion reports, state the cohort, observation window, numerator, denominator and observation coverage. Keep unknown observations outside claims of current protection and never count missing collection as zero drift. These measures remain evidence for review.

Keep rejected correction decisions in `org/decision-log.md`. Enroll a kept test only after the owning team accepts or edits the correction. A closure recorded after a review's as-of time leaves that episode open for that review.
