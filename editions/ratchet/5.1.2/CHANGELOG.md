<a id="changelog"></a>
# Changelog

*Ratchet: closed-loop security validation for AI-assisted engineering. Changelog. Edition 5.1.2, Thesis 1.4.2, 2026-10-30, build 13fabeae+local.*

*How each edition differs from the one before it, written for the agent that consumes this edition on an organization's behalf. Every file in an edition is stamped with its version.*

Versions follow semantic versioning, read for this edition:

- **Major** (3.0.0): something an organization has stored must change. A profile field, rule code or identifier is renamed or removed, or a rule changes what it requires.
- **Minor** (2.1.0): new content or design changes that leave a filled profile valid, such as a new optional field, a new section or a new work unit.
- **Patch** (2.0.1): wording, corrections and links. No stored answer is affected.

Each version lists its renames in a block an agent can read and apply, then what changed in meaning, what was added and what changed. An agent holding an earlier edition should apply every version's renames in order, then read each "Changed meaning" list against the narrative it has already tailored.

<a id="changelog-thesis-versions"></a>
## Thesis versions

The thesis (the claim, the North Star, the three regimes and the premise register) carries its own version: major when the claim changes, minor when a premise or its evidence changes, patch for wording. Edition 5.1.2 builds on thesis 1.4.2. Cite the two together, edition first: "Ratchet 5.1.2, thesis 1.4.2".

- **Thesis 1.4.2** (edition 5.1.1): Wording only, in a readability pass: the purple team is defined once inside the list of where AI works on the loop, and planting known-bad proposals is said to test the people who approve. No claim, premise or grade changed.
- **Thesis 1.4.1** (edition 5.0.1): The narrative leads with security as a partner in continuous delivery and uses the five quality pillars. Sweep decay and capacity returns remain bets. Tested compensating controls can hold an open weakness, and early-stop comparisons apply as soon as the configured minimum is exceeded. Claim wording and grades are unchanged.
- **Thesis 1.4** (edition 5.0.0): The generated-record premise now states conditional reliance when accuracy and completeness can be tested. It holds on the audit standards and staff observations. Research on security assurance remains thin and treats such records as corroborating.
- **Thesis 1.3** (edition 5.0.0): A new premise, graded none: an auditor or assurance reviewer accepts a record the program generates, such as a closure record, a freshness report or figures computed from the finding ledger, in place of evidence gathered by hand. The three relief marks for manual evidence gathering rested on a missing dependency; they now rest on this premise. No other premise, grade or the claim changed.
- **Thesis 1.2** (edition 4.0.1): The premise that exploitability scores are a weak basis for priority now says that ordering by consequence, demonstrated paths and attacker-side signals is inference until measured; its grade is unchanged. Its evidence states that the 61.72% risk reduction is severity patching restricted to vulnerabilities already in exploit kits, and adds an exploitation-rate study and the scoring standard's own guidance.
- **Thesis 1.1.3** (edition 4.0.0): Wording only. The seeding premise now says seeded known-bad proposals measure gate health, a framing change made to match the routing of per-person catch rates to the seeding owner and to each person; its grade and evidence are unchanged.
- **Thesis 1.1.2** (edition 4.0.0): Wording only. The premises' falsifiers name each phase in words (phase 1, phase 2, phase 3) instead of by its code, so a reader never has to decode one; no premise, its evidence or the claim changed.
- **Thesis 1.1.1** (edition 4.0.0): Wording only. The premises' falsifiers name phases by their new codes (PH-1 for phase 1, PH-2 for phase 2, PH-3 for phase 3); no premise, its evidence or the claim changed.
- **Thesis 1.1** (edition 3.9.0): Fix capacity is read as debt service. Security debt is the security share of quality debt, which every quality a team answers for pays from one engineering pool; a team's debt-service capacity is the time it has for paying that debt down, and its fix cap is security's agreed share of it. A new premise (CL-49) says so, and CL-18 gains published evidence on remediation capacity. The claim is unchanged. Thesis 1.1 also takes in what edition 3.8.0 added to the regimes section before the thesis had a version: the sweep figure and the purple team seeding known-bad proposals at the gates.
- **Thesis 1.0** (edition 3.6.0): The reframe: the loop matters at any backlog size. An organization starts from a backlog that discovery outruns or from one a sweep made small, and in both the way weaknesses get fixed does not hold. The North Star is just-in-time find and fix: the time from a weakness's introduction to a verified fix that stays fixed. Editions 3.7.0 and 3.8.0 revised the thesis text (the reading structure, the regimes section's sweep figure and seeded proposals) before the thesis carried a version, so 1.0 names the 3.6.0 claim and its later wording, and the hash recorded for 1.1 supersedes them.

<a id="changelog-5-1-2-2026-10-30"></a>
## [5.1.2] - 2026-10-30

Wording only. No profile, rule, identifier or design changes, so an agent holding 5.1.1 needs no migration.

```yaml
renames: []
```

### Changed

The threat-model annex states that an independent read covered the administrative request and approval audit closure rules, without a review date or a named reviewer, and the 5.1.1 entry below reads the same way. The decision log states each decision with its reason and the alternatives weighed, without attributing decisions to a person, and names its review of the six-pager as an editorial review. A build check now refuses a dated review attributed to a design owner or project lead anywhere in the edition.

<a id="changelog-5-1-1-unreleased"></a>
## [5.1.1] - unreleased

An agent holding 5.1.0 should replace the tools bundle with this edition's copy, verify its manifest and rerun its bundled fixtures.

### Fixed

The tools bundle shipped workspace comments and an example word that the edition's own rules exclude. Its source files now use neutral wording and retain their technical meaning.

### Added

Plumb interface 1 files (plumb/engine.yaml, plumb/model.yaml and plumb/plan.yaml) ship with their hashes in edition.yaml. Ratchet pins Jig 0.1.3 by its edition record hash. No design or shared-layer change.

A shipped-files scan checks both edition folders, including decoded tools sources, for leftover internal references, private terms, home paths and personal email addresses. A planted attribution in an embedded source must fail the gate.

### Changed

A readability pass, wording only and no design change, across start-here, parts 1 to 4, the six-pager and the strategy brief: terms are defined at first use, the four rules are cited by their six-pager names, the design model and design checks are introduced once, parts 2 to 4 open with one orientation paragraph that points to part 1, and three cross-references now point to where their lists live. No identifier, claim, grade, stop condition or profile field changed, so a tailored narrative needs no change beyond optionally adopting the new wording; the thesis moves to 1.4.2 for wording only.

### Renamed identifiers

```yaml
renames: []
```

<a id="changelog-5-1-0-unreleased"></a>
## [5.1.0] - unreleased

### MIRROR and administrative input audit

Security, the owning engineer and an agent now co-create each fix and its component-local regression test in one pull request. The owning team owns the test in its suite, where coding agents can read it. A variant becomes a new finding through the normal loop and never quietly changes that pull request.

Security keeps an automatic, read-only mirror of every kept test. Removed, skipped and failing tests become findings. Missing, stale or mismatched observations read unknown. The mirror supports risk assessment at the revision, configuration and dependency scope being assessed. It reports contributed-test survival and instance-to-class promotion with cohorts and observation coverage.

Aggregate proof conditions and chained-path validation remain independent and never reach a coding agent. There is no separate variant probe set. Class-level paved roads and guardrails stay security-owned and reach agents as derived checks. Adopters holding 5.0.1 should separate their visible instance tests from protected aggregate validation and add the mirror without widening agent access. No stored profile field is renamed. The thesis boundary marker follows the new fix-path paragraph. The hashed thesis argument and version are unchanged.

Administrative requests and approvals now require durable protected audit records before broker action, including refusals without an issued session. Audit failure refuses the input and opens no session. An independent read covered both request and approval audit closure rules as written, so their two R cells now close. The profile-checker report example and model-check, unit-graph, upgrade, impact and threat-grid fixtures follow the added parts, delivery units, failure scenarios and reviewed audit cells. Upgrade fixture regeneration preserves the mirror as an administrative-session reader and uses the shared lead contract's released name.

### PHASES: phases end on outcomes

Refresh tailored plans and phase cards. Each phase ends when its required work has landed and its exit test passes. The organization sets a review point to continue, change or stop, with a next review date for continuing work. Setup, loop effort and handoff waits remain estimates. The brief asks for one independently verified deployed fix held by a regression test.

The phase 1 rule-4 exception ends at phase 1 exit or the risk owner's recorded review date, whichever is first. A review decision cannot extend it. Other exception safeguards remain in force.

The status report specification and its fixtures add organization-set reviews. Existing organization time boxes remain explicit stop conditions. No edition duration or six-week maximum is imposed.

The separate phase-1-only profile exception now ends at phase 1 exit or the risk owner's recorded review date, whichever is first. Record risk_owner_review_on before accepting the exception and phase_1_exit_on as soon as phase 1 exits. Existing phase-1-only exceptions need this review date before revalidation. The 56-day ceiling is replaced; the general 180-day ceiling and all other exception safeguards stay.

### Tool bundle

This edition ships ratchet-tools with a Bun command for the composer, patch applier, model checks, impact report, threat grid, unit graph, upgrade tool and profile checker. The bundle needs no npm packages. Verify the edition manifest and run the bundle's fixtures before using it. Every bundle file has a hash in the edition manifest. The build runs all bundled tools against their own edition's fixtures from a copied edition and fails on any mismatch.

Specifications and fixtures remain the design the bundle is built from. An organization may build its own tools, but a homegrown build carries no compatibility promise. The tool workflow now explains how to verify and run the bundle. Readiness and status reports now ship with their reference implementations and acceptance fixtures. Figures still need their own proved tool.

The blind-build release gate is retired and blocks no release. The optional blind-build tool and its append-only ledger remain available. Existing ledger records keep their historical meaning.

Portable composer inputs now require an explicit numeric phase from 1 to 5 on every unit; a missing or invalid phase refuses the run with compose.stage before any output. Phase claims do not substitute for that number.

### First-adoption tooling and instructions

The runtime accepts the separately verified Jig pin cache at upstream/pins/jig/ while retaining strict checks of shipped files. The pin command reads that flat released folder without unpublished tables or a second snapshot. The patch applier preserves closure files, and composed closures retain own and shared rules. The grid treats edition rules for explicitly omitted contracts as out of scope while still refusing unknown contracts. End-to-end fixtures cover pin-cache startup, closure preservation and threat grids on all four compositions.

The bundle gate prints its edition, manifest digest and suite progress. Allow about 15 minutes on a laptop. Readiness and status-report CLI fixtures now run in the bundle gate. The status report also validates optional kept-test records, including read-only source access, normal-loop drift, independent confirmation and matching passing runs before recorded closure. The new workflow names instance-test, mirror and drift records and distinguishes manual phase 1 evidence from phase 2 automation. It states the review freshness window in each assessment without adding a tier maximum.

First-run guidance now names matching unpatched comparisons, canonical hashes after shared import, owner basis rows and endpoint roles, progressive status behavior, generated impact judgment slots, phase plan and premise cross-references. Draft evaluations and blocked checks stay proposed with acceptance withheld. No rule or design element changes in these corrections.

### Second fresh-adopter corrections

The second fresh-adopter corrections keep every rule and design element unchanged. Listed not-started phase examples now include the review bound the status tool requires, with passing and missing-bound fixtures. Impact reports render unanswered teams, including FILL, as not set. The report accepts ratchet, jig and core print projections by replaying original patches on the full baseline before projecting, with deterministic all-composition fixtures covering shared assumptions expects and exception ops. Lone print output leaves the full acceptance block unchanged.

The pin instructions distinguish release-byte verification from checking organization changes and give commands to replay patches on the verified pin baseline, compose all four modes and check each against its unpatched comparison. Pin output preserves closure rules and supplies Ratchet rules for impact input. A bundled expects helper computes PA-22 hashes from compiled records, with published string, null, absent and canonical-object fixtures and record-selection refusals. Patch creation and repair workflows point to it.

The workflows now state how to prepare previews during bundle verification, use progressive checking for a first run, retain optional history placeholders, bind owners per side and role, record simulated decisions, choose actual crossings and content marks, reuse valid exposure records, select Jig claims and manual work, name kept-test files, submit drift manually before the dispatcher exists, choose a fitting finding kind, validate records in a scratch root and maintain report counts separately. Drafts explicitly block acceptance even after a successful rehearsal. The first-run reading order names the sections needed before mapping and defers the remaining narrative reading until tailoring.

### Follow-ups after 5.1

Add organization-set maximum near-JIT evidence freshness windows by consequence tier and explain their use; until then stale or mismatched evidence reads unknown.

Add a dated transition record that the status tool recognizes when the rule-4 exception expires before phase 1 completes.

### Renamed identifiers

```yaml
renames: []
```

<a id="changelog-5-0-1-unreleased"></a>
## [5.0.1] - unreleased

### Design fixes

An adopter holding 5.0.0 should regenerate the design and its contract schemas, then recheck local patches against the corrected authors and relationship inputs. The eight new input records distinguish discovery submissions, administrative session requests and approvals, policy change proposals and approvals, earned-autonomy requests and concurrence, and person-written brief submissions from the records their receiving services issue. Disposition review supplies the accepted class-retirement verdict to the class registry. Accepted dispositions update lead status. Regression specifications come from the regression planner, normalized leads come from tool signal intake, and validated model proposals come from the response proposal gate. Relationship kinds retain their meaning.

The profile now offers delivery.security_test_time_target_minutes. Security checks aim for test time under 10 minutes at every delivery stage by default. An organization may choose another target. Measures report elapsed security test time, median, p95, sample size and the share of stage runs below the effective target. Queue time is separate, and missing timings read not measured. Existing profiles remain valid. The target does not change a gate's timeout or failure posture.

Released editions now date their top changelog heading from their edition record's release state and date. The edition check refuses a released folder with an undated or mismatched heading. The earlier 5.0.0 source entry remains the historical record. Stale-pin warnings now exclude generated Jig files, so a regenerated model alone no longer appears as an unshipped source change.

### Shared layer

#### Design fixes

Shared layer 0.1.1 moves GateFailurePosture, ToolLead, DeliveryTelemetry, ChangeProvenance, TrackerText and ChangeRecord into the common contract vocabulary, with their delivery rules and declared readers. Apply the contract renames below to local relationships, layers and schemas. The emergency rollback crossing states why it carries no Ratchet record. ChangeProvenance names the engineering system as the source author. Source adapters verify and relay that statement with local verification metadata.

Release Jig 0.1.2 with this shared layer and update Ratchet's released dependency pin before releasing Ratchet 5.0.1. The two editions must ship identical shared bytes.

### Renamed identifiers

```yaml
renames:
  - {kind: contract, from: GateFailurePosture, to: "shared:GateFailurePosture"}
  - {kind: contract, from: ToolLead, to: "shared:ToolLead"}
  - {kind: contract, from: DeliveryTelemetry, to: "shared:DeliveryTelemetry"}
  - {kind: contract, from: ChangeProvenance, to: "shared:ChangeProvenance"}
  - {kind: contract, from: jig:TrackerText, to: "shared:TrackerText"}
  - {kind: contract, from: ChangeRecord, to: "shared:ChangeRecord"}
```

### Narrative: adopters should refresh their tailored pages

#### Changed meaning

The pages lead with security as a quality pillar and a partner in continuous delivery. They describe earned autonomy, tested compensating controls and the configurable default of under ten minutes of security test time at each delivery stage. These are the framing decisions for this edition.

#### Added

The strategy chapter maps the find, fix and keep discipline across all five SF² domains. The evidence tables include claim identifiers. The adoption account points to the first-run owner acceptances and checks.

#### Changed

Refresh tailored pages to distinguish unauthorized effects from harm, leads from accepted findings, and independent reproduction from the separate autonomy grant. Phase 1 combines proof holding and deciding without an assurance claim. Allow up to two setup weeks before its six-week loop exercise, and budget time from all three working roles. The pages label capacity, sweep decay and class-level returns as bets, correct the invoice proof and source scope, and explain the loop canary. Restore completion remains a model timing gap. No stored profile answer changes in this narrative package.

Upgrade fixture editions use stable test versions in copies of the shipped design, with their own manifests. Building a newer edition no longer requires the package to identify itself as 5.0.0. Fixture expectations and upgrade rules are unchanged.

### Tool specifications

**Impact report**

- A patch that changes only a failure scenario now raises IR-W-empty and leaves Summary empty while keeping Failure scenarios populated.
- The report includes every organization scenario the target patch adds or modifies, with touched_elements set to the union of its before and after named parts in natural order.
- The layer option supplies realization, quality and failures, while overlay selection follows the explicit overlay option, version record and edition fallback.
- The remove-element fixture now removes nine relationships naming the response and proposal gate, including r063, and reports U-05 and U-26 as building the touched s2.workflow-worker-app.

**Model checks**

- MC-87 now judges PersonWrittenBrief relationships as fix_brief_edges, checks relay authors against the carried brief contract and gives PersonWrittenBrief the MC-87 seam floor.
- MC-110 now states that contract-reader-unlisted reports one error per unlisted contract on a relationship.
- Layer-composition fixture comparisons cover design-layer and overlay findings and exclude separate structural lint findings such as judged-set-shrunk.
- Jig's standalone edition skips module declaration checks when modules.yaml is absent, while a precomposed Jig input supplying that file runs them.
- The shipped seam-mark expectations remove MC-86 from ConsequenceFact, which is no longer security-relevant, and remove MC-7 from ContextSnapshot.
- The shipped seam-mark expectations add MC-86 to SourceRecord and ContextQuery.
- The evidence_sinks expectations now include p17-r7, which carries FindingDisposition.
- The corrected request and approval contracts remove the contract-reader-unlisted expectations at p23-r1, p23-r2, p25-r1 and p25-r2.

**Threat grid**

- The shipped p23-r1 crossing now carries AdminSessionRequest, so p23-r1:R stays open because the issued AdminSession's audit rule does not cover the request.
- The reviewed AdminSession R rule now covers no cell and adds TG-W-closure-unused at edition closure AdminSession R beside the existing RestoreGrant T warning in the shipped fixtures.
- The shipped fixture now expects 10 closed cells instead of 12, zero R cells closed instead of two and seven rules used instead of eight, with the summary reporting seven rules covering at least one cell.
- The shipped model-output sign-off fixture now expects 12 closed cells instead of 14 and the same two unused-rule warnings.

**Unit graph**

- Ratchet-alone namespace fixture assembly now sets namespaces to [ratchet].
- Namespace fixture counts now match only the supplied fields directly under unit_graph, including the boolean phase_1_self_contained.
- The capabilities count includes accepted external declarations as well as local providers, giving Jig alone 16 capabilities for nine units.
- The UG-E-capid diagnostic retains its bare-prefix wording as a compatibility label for invalid identities, including malformed namespaces.
- The shipped stand_in_shape_gaps expectations now name shared:ChangeRecord and shared:ToolLead.

**Upgrade**

- Rule 12 now blocks an identifier occurrence immediately after any dot or immediately before a dot followed by a letter, digit or underscore, while a sentence's closing period remains a boundary.
- UP-32 now fixes the frozen shared document at `pins/<namespace>/seams.yaml` for comparison with that edition's root seams.yaml.
- The upgrade reads upstream, org, version, history and overlay from a version record when present without requiring a version key.
- UP-35 now renders each agent step with its preserved leading indentation, then a hyphen and a space, then its text.
- The fixture table now lists all 69 cases, including unreadable pins, incomplete pin history, pin downgrades, frozen shared-document mismatches and two-step Jig re-pins.
- The fields-preserved, guard-typed_contracts and guard-untrusted_fields fixtures now target shared:ToolLead.

### Deciding guesses

- The threat-grid build used edition-5.0.1 as the new edition because the brief named a missing edition-5.0.0 folder.
- The unit-graph build used edition-5.0.1 as the new edition because the brief named a missing edition-5.0.0 folder.

<a id="changelog-5-0-0-unreleased"></a>
## [5.0.0] - unreleased

Ratchet and Jig are separate edition lines over one shared interface. This major edition makes the former organization warnings errors, checks security-relevant seam crossings, and gives adopters a checked path from their first owner bindings to all four compositions. Thesis 1.4.0 states when generated records can support assurance evidence.

### What an agent holding 4.2.0 should do

1. Establish a new 5.0.0 baseline using workflow-start.md. The upgrade tool accepts held editions from 5.0.0 onward and refuses an older held edition as version.unsupported. Preserve the earlier workspace as the record of its decisions, then migrate its profile answers, local patches and evidence to the new baseline using the renames below. Recompute patch preconditions against the new records and obtain acceptance for the migrated design.
2. Read edition.yaml for the authoritative bare version and released status. A draft is for evaluation only. Identify every draft result as an evaluation. A released Jig dependency does not release Ratchet.
3. Load the released Jig 0.1.1 pin when this edition is released. Verify its edition record against Ratchet's pin and require both seams.yaml copies to match byte for byte. Jig 0.1.1 corrects standalone packaging, removes units' redundant claims field that held stage ids, and explains that module declaration checks do not apply to Jig's own standalone edition without a module file. A precomposed input with a module file still checks that file. The release order is Jig, its pin, then Ratchet.
4. Apply the identifier renames below and use moved.yaml to locate records that changed home. Retain imported namespace prefixes in patches, layers and reports. The work-unit seam key still identifies a loop step and keeps its stored spelling. Closure review marks and sign-offs use date where the review mark used on. Existing organization sign-offs need the current field spelling and current rule hashes.
5. Rebuild and prove the composer, patch applier, model checks, impact report, unit graph, threat grid and upgrade tool from their specifications and fixtures before relying on them. Prove the profile checker, readiness tool and status report when their workflows need them. A passing model check does not validate profile answers or module entry evidence. Read the deciding guesses and known issues below alongside each build log.
6. Treat every former -org warning as an error under its ordinary code. The fourteen rules introduced in 4.1.0 and 4.2.0 now judge shipped and organization items with the same severity. Removing a key with unset is supported, but a retained shipped item leaving a judged set fails immediately with judged-set-shrunk. Never clear a mark to remove an obligation from scope.
7. Recheck contract readers, harness parity, typed fields and every seam a changed relationship crosses. Contract-reader-unlisted reports one error per unlisted contract on a relationship. Never-cross contracts cannot be excepted. A strictness exception affects only the undeclared-crossing verdict and grants no exemption from any other rule.
8. Complete the first-run records below, apply the patch series once with shared outputs enabled, then project that result with the composer. Check full, Ratchet alone, Jig alone and core against their matching unpatched comparisons, with their own layers and the generated organization exceptions. The released-pin check and every composition remain acceptance requirements.
9. Regenerate each patch's impact report from its unpatched starting layer, shared input and source exceptions, then run the threat grid on the compiled failure layer. Compare registers by cell id using the helper in workflow-change-design.md. Review any closure sign-off the upgrade voids before accepting the successor wording.

### Renamed identifiers

```yaml
renames: 
  - {kind: view, from: design-change-57, to: "jig:creation-control"}
  - {kind: view, from: design-change-55, to: "jig:creation-loop"}
  - kind: element
    from: ext.engineering-workflows
    to: shared:ext.engineering-workflows
  - kind: element
    from: ext.secure-creation
    to: jig:secure-creation
  - kind: element
    from: jig.context-plane
    to: jig:context-plane
  - kind: element
    from: jig.check-suite
    to: jig:check-suite
  - kind: element
    from: jig.inner-loop
    to: jig:inner-loop
  - kind: element
    from: jig.coding-agent
    to: jig:coding-agent
  - kind: element
    from: jig.harness-full-parity
    to: jig:harness-full-parity
  - kind: element
    from: jig.harness-no-pinning
    to: jig:harness-no-pinning
  - kind: element
    from: jig.harness-no-stop-gate
    to: jig:harness-no-stop-gate
  - kind: element
    from: jig.edit-checks
    to: jig:edit-checks
  - kind: element
    from: jig.stop-gate
    to: jig:stop-gate
  - kind: element
    from: jig.quarantined-reader
    to: jig:quarantined-reader
  - kind: element
    from: jig.reader-schema-gate
    to: jig:reader-schema-gate
  - kind: element
    from: jig.model-routes
    to: jig:model-routes
  - kind: element
    from: jig.reader-model-route
    to: jig:reader-model-route
  - kind: element
    from: jig.repository
    to: jig:repository
  - kind: element
    from: jig.change-boundary
    to: jig:change-boundary
  - kind: element
    from: jig.precommit-gate
    to: jig:precommit-gate
  - kind: element
    from: jig.provenance-stamper
    to: jig:provenance-stamper
  - kind: element
    from: jig.protected-branch
    to: jig:protected-branch
  - kind: element
    from: jig.pr-plane
    to: jig:pr-plane
  - kind: element
    from: jig.pr-analysis
    to: jig:pr-analysis
  - kind: element
    from: jig.pr-triage
    to: jig:pr-triage
  - kind: element
    from: jig.ai-reviewer
    to: jig:ai-reviewer
  - kind: element
    from: jig.hunk-router
    to: jig:hunk-router
  - kind: element
    from: jig.hunk-risk-advisor
    to: jig:hunk-risk-advisor
  - kind: element
    from: jig.autofix
    to: jig:autofix
  - kind: element
    from: jig.measurement-plane
    to: jig:measurement-plane
  - kind: element
    from: ext.outside-text
    to: jig:outside-text
  - kind: element
    from: people.creation-developer
    to: jig:people.creation-developer
  - kind: element
    from: people.change-reviewer
    to: jig:people.change-reviewer
  - kind: element
    from: people.high-risk-reviewer
    to: jig:people.high-risk-reviewer
  - kind: element
    from: people.creation-policy-owner
    to: jig:people.creation-policy-owner
  - kind: system
    from: EXT
    to: shared:EXT
  - kind: system
    from: PEOPLE
    to: shared:PEOPLE
  - kind: trust-zone
    from: existing
    to: shared:existing
  - kind: trust-zone
    from: third-party
    to: shared:third-party
  - kind: plane
    from: integration
    to: shared:integration
  - kind: contract
    from: RoadEntry
    to: shared:RoadEntry
  - kind: contract
    from: DerivedCheck
    to: shared:DerivedCheck
  - kind: contract
    from: DroppedCheck
    to: shared:DroppedCheck
  - kind: contract
    from: ProvenClass
    to: shared:ProvenClass
  - kind: contract
    from: RoadAssuranceStatus
    to: shared:RoadAssuranceStatus
  - kind: contract
    from: FixBrief
    to: shared:FixBrief
  - kind: contract
    from: HunkRouteAdvice
    to: jig:HunkRouteAdvice
  - kind: contract
    from: CreationRule
    to: shared:CreationRule
  - kind: contract
    from: CatchLayer
    to: shared:CatchLayer
  - kind: contract
    from: CreationOutcome
    to: jig:CreationOutcome
  - kind: contract
    from: ReviewerDrift
    to: jig:ReviewerDrift
  - kind: contract
    from: LayerCatchRate
    to: jig:LayerCatchRate
  - kind: contract
    from: TrackerText
    to: jig:TrackerText
  - kind: contract
    from: ClassTestCount
    to: shared:ClassTestCount
  - kind: contract
    from: CreationLead
    to: shared:CreationLead
  - kind: contract
    from: ProvenanceStamp
    to: shared:ProvenanceStamp
  - kind: contract
    from: ReviewerSeedCatch
    to: shared:ReviewerSeedCatch
  - kind: contract
    from: SeededChange
    to: shared:SeededChange
  - kind: contract
    from: DerivedCheckMisses
    to: shared:DerivedCheckMisses
  - kind: relationship
    from: r002
    to: shared:r002
  - kind: relationship
    from: r010
    to: shared:r010
  - kind: relationship
    from: p14-r12
    to: shared:p14-r12
  - kind: relationship
    from: p17-r16
    to: shared:p17-r16
  - kind: relationship
    from: p17-r17
    to: shared:p17-r17
  - kind: relationship
    from: p30-r1
    to: shared:p30-r1
  - kind: relationship
    from: p30-r2
    to: shared:p30-r2
  - kind: relationship
    from: p30-r3
    to: shared:p30-r3
  - kind: relationship
    from: p30-r4
    to: shared:p30-r4
  - kind: relationship
    from: p30-r5
    to: shared:p30-r5
  - kind: relationship
    from: p30-r6
    to: shared:p30-r6
  - kind: relationship
    from: p30-r9
    to: shared:p30-r9
  - kind: relationship
    from: p32-r1
    to: shared:p32-r1
  - kind: relationship
    from: p40-r5
    to: shared:p40-r5
  - kind: relationship
    from: p43-r6
    to: shared:p43-r6
  - kind: relationship
    from: p55-r1
    to: jig:p55-r1
  - kind: relationship
    from: p55-r2
    to: jig:p55-r2
  - kind: relationship
    from: p55-r3
    to: jig:p55-r3
  - kind: relationship
    from: p55-r4
    to: jig:p55-r4
  - kind: relationship
    from: p55-r5
    to: jig:p55-r5
  - kind: relationship
    from: p55-r6
    to: jig:p55-r6
  - kind: relationship
    from: p55-r7
    to: jig:p55-r7
  - kind: relationship
    from: p55-r8
    to: jig:p55-r8
  - kind: relationship
    from: p55-r9
    to: jig:p55-r9
  - kind: relationship
    from: p55-r75
    to: jig:p55-r75
  - kind: relationship
    from: p55-r76
    to: jig:p55-r76
  - kind: relationship
    from: p55-r10
    to: shared:p55-r10
  - kind: relationship
    from: p55-r11
    to: jig:p55-r11
  - kind: relationship
    from: p55-r12
    to: jig:p55-r12
  - kind: relationship
    from: p55-r13
    to: jig:p55-r13
  - kind: relationship
    from: p55-r14
    to: jig:p55-r14
  - kind: relationship
    from: p55-r15
    to: jig:p55-r15
  - kind: relationship
    from: p55-r16
    to: jig:p55-r16
  - kind: relationship
    from: p55-r17
    to: jig:p55-r17
  - kind: relationship
    from: p55-r18
    to: jig:p55-r18
  - kind: relationship
    from: p55-r19
    to: jig:p55-r19
  - kind: relationship
    from: p55-r20
    to: jig:p55-r20
  - kind: relationship
    from: p55-r21
    to: jig:p55-r21
  - kind: relationship
    from: p55-r22
    to: jig:p55-r22
  - kind: relationship
    from: p55-r23
    to: jig:p55-r23
  - kind: relationship
    from: p55-r24
    to: jig:p55-r24
  - kind: relationship
    from: p55-r25
    to: jig:p55-r25
  - kind: relationship
    from: p55-r26
    to: jig:p55-r26
  - kind: relationship
    from: p55-r27
    to: jig:p55-r27
  - kind: relationship
    from: p55-r28
    to: jig:p55-r28
  - kind: relationship
    from: p55-r29
    to: jig:p55-r29
  - kind: relationship
    from: p55-r30
    to: jig:p55-r30
  - kind: relationship
    from: p55-r31
    to: shared:p55-r31
  - kind: relationship
    from: p55-r32
    to: shared:p55-r32
  - kind: relationship
    from: p55-r33
    to: jig:p55-r33
  - kind: relationship
    from: p55-r34
    to: jig:p55-r34
  - kind: relationship
    from: p55-r35
    to: jig:p55-r35
  - kind: relationship
    from: p55-r36
    to: jig:p55-r36
  - kind: relationship
    from: p55-r37
    to: jig:p55-r37
  - kind: relationship
    from: p55-r38
    to: jig:p55-r38
  - kind: relationship
    from: p55-r39
    to: jig:p55-r39
  - kind: relationship
    from: p55-r40
    to: jig:p55-r40
  - kind: relationship
    from: p55-r41
    to: jig:p55-r41
  - kind: relationship
    from: p55-r42
    to: jig:p55-r42
  - kind: relationship
    from: p55-r43
    to: jig:p55-r43
  - kind: relationship
    from: p55-r44
    to: jig:p55-r44
  - kind: relationship
    from: p55-r45
    to: jig:p55-r45
  - kind: relationship
    from: p55-r46
    to: jig:p55-r46
  - kind: relationship
    from: p55-r47
    to: jig:p55-r47
  - kind: relationship
    from: p55-r48
    to: jig:p55-r48
  - kind: relationship
    from: p55-r49
    to: jig:p55-r49
  - kind: relationship
    from: p55-r50
    to: jig:p55-r50
  - kind: relationship
    from: p55-r51
    to: jig:p55-r51
  - kind: relationship
    from: p55-r52
    to: jig:p55-r52
  - kind: relationship
    from: p55-r53
    to: jig:p55-r53
  - kind: relationship
    from: p55-r54
    to: jig:p55-r54
  - kind: relationship
    from: p55-r55
    to: jig:p55-r55
  - kind: relationship
    from: p55-r56
    to: jig:p55-r56
  - kind: relationship
    from: p55-r57
    to: jig:p55-r57
  - kind: relationship
    from: p55-r58
    to: jig:p55-r58
  - kind: relationship
    from: p55-r59
    to: jig:p55-r59
  - kind: relationship
    from: p55-r60
    to: jig:p55-r60
  - kind: relationship
    from: p55-r61
    to: jig:p55-r61
  - kind: relationship
    from: p55-r62
    to: jig:p55-r62
  - kind: relationship
    from: p55-r63
    to: jig:p55-r63
  - kind: relationship
    from: p55-r64
    to: jig:p55-r64
  - kind: relationship
    from: p55-r65
    to: jig:p55-r65
  - kind: relationship
    from: p55-r66
    to: jig:p55-r66
  - kind: relationship
    from: p55-r67
    to: jig:p55-r67
  - kind: relationship
    from: p55-r68
    to: jig:p55-r68
  - kind: relationship
    from: p55-r69
    to: shared:p55-r69
  - kind: relationship
    from: p55-r70
    to: shared:p55-r70
  - kind: relationship
    from: p55-r71
    to: jig:p55-r71
  - kind: relationship
    from: p55-r72
    to: jig:p55-r72
  - kind: relationship
    from: p55-r73
    to: jig:p55-r73
  - kind: relationship
    from: p55-r74
    to: jig:p55-r74
  - kind: relationship
    from: p60-r2
    to: shared:p60-r2
  - kind: relationship
    from: p60-r3
    to: shared:p60-r3
  - kind: relationship
    from: p60-r1
    to: shared:p60-r1
  - kind: seam
    from: secure-creation
    to: shared:secure-creation
  - kind: failure
    from: F128
    to: jig:F128
  - kind: failure
    from: F129
    to: shared:F129
  - kind: failure
    from: F130
    to: jig:F130
  - kind: failure
    from: F133
    to: jig:F133
  - kind: failure
    from: F134
    to: shared:F134
  - kind: failure
    from: F135
    to: shared:F135
  - kind: unit
    from: U-430
    to: jig:U-430
  - kind: unit
    from: U-431
    to: jig:U-431
  - kind: unit
    from: U-432
    to: jig:U-432
  - kind: unit
    from: U-433
    to: jig:U-433
  - kind: unit
    from: U-436
    to: jig:U-436
  - kind: unit
    from: U-437
    to: jig:U-437
  - kind: unit
    from: U-438
    to: jig:U-438
  - kind: claim
    from: JP-01
    to: jig:JC-01
  - kind: claim
    from: JP-02
    to: jig:JC-02
  - kind: claim
    from: JP-03
    to: jig:JC-03
  - kind: claim
    from: JP-04
    to: jig:JC-04
  - kind: claim
    from: JP-05
    to: jig:JC-05
  - kind: claim
    from: JP-06
    to: jig:JC-06
  - kind: claim
    from: JP-07
    to: jig:JC-07
  - kind: claim
    from: JP-08
    to: jig:JC-08
  - kind: claim
    from: JP-09
    to: jig:JC-09
  - kind: claim
    from: JP-10
    to: jig:JC-10
  - kind: claim
    from: JP-11
    to: jig:JC-11
  - kind: claim
    from: JP-12
    to: jig:JC-12
  - kind: claim
    from: JP-13
    to: jig:JC-13
  - kind: claim
    from: JP-14
    to: jig:JC-14
  - kind: claim
    from: JP-15
    to: jig:JC-15
  - kind: claim
    from: JP-16
    to: jig:JC-16
  - kind: claim
    from: JP-17
    to: jig:JC-17
  - kind: claim
    from: JP-18
    to: jig:JC-18
  - kind: claim
    from: JP-19
    to: jig:JC-19
  - kind: claim
    from: JP-20
    to: jig:JC-20
  - kind: claim
    from: JP-21
    to: jig:JC-21
  - kind: claim
    from: JP-22
    to: jig:JC-22
  - kind: claim
    from: JP-23
    to: jig:JC-23
  - kind: claim
    from: JP-24
    to: jig:JC-24
  - kind: claim
    from: JP-25
    to: jig:JC-25
  - kind: claim
    from: JP-26
    to: jig:JC-26
  - kind: claim
    from: JP-27
    to: jig:JC-27
  - kind: claim
    from: JP-28
    to: jig:JC-28
  - kind: claim
    from: JP-29
    to: jig:JC-29
  - kind: claim
    from: JP-30
    to: jig:JC-30
  - kind: claim
    from: JP-31
    to: jig:JC-31
  - kind: claim
    from: JP-32
    to: jig:JC-32
  - kind: claim
    from: JP-33
    to: jig:JC-33
  - kind: claim
    from: JP-34
    to: shared:SH-1
  - kind: claim
    from: JP-35
    to: jig:JC-35
  - kind: claim
    from: JP-36
    to: jig:JC-36
```

### Shared layer

Both editions ship the same seams.yaml. Its version and hash appear in each edition record. It holds shared systems, zones and layer vocabulary, the engineering system and its premises, whole crossing relationships, typed contracts, shared claims, owner records, exposure declarations, attached failure scenarios and capability declarations. Load it once. Each design owns its implementation and numbered stages. Ratchet pins Jig in one direction, and a working Jig report is advisory beside the released pin.

The four compositions are full with both designs and the shared layer, Ratchet alone with that layer, Jig alone with that layer, and Ratchet core with modules removed. A lone composition keeps incident crossings and represents absent endpoints by declared boundaries. A boundary declares agent reachability, exposure, model freedom, role class and kind. It never stands in for an absent implementation's local storage, harness or controller duties. The composer merges partial layer vocabulary, preserves shared owner bindings and reports known omitted records. Core excludes pruned contracts from exception evaluation without treating an unknown contract as valid.

Each module boundary is a seam. Undeclared crossings carrying security-relevant contracts block unless a valid strictness exception covers every carried contract. The floor of a contract's security mark comes from the checks. A person may raise it and may never lower it. Keep proof conditions, kept regressions, failure classes, full road assurance, full class-test results and replay results on their declared side. Only the declared projections may cross. The organization declares its case in patches and is checked by these same rules.

### Before the first organization run

Complete these records before treating a run as the organization's completed first run. Workflow-start.md gives the exact operations and acceptance mapping.

1. Choose a workspace root outside the edition, a stable organization short name, and the bare edition version from edition.yaml. Create the profile, version record, source exceptions mapping, decision log, premise ledger and organization changelog. Record every unchecked tool and any evaluation status.
2. Identify the person accountable as security risk owner. Put the role in separation.security_risk_owner_role and record the identity and its authority in the decision log. Use the same role spelling for patch acceptances. Gather current practice before adoption planning or tailoring. Unknown answers remain FILL.
3. Set a calendar end for the shipped shared:secure-creation exception covering shared:CatchLayer, shared:ReviewerSeedCatch and shared:DroppedCheck. Name the person or team accepting for the security risk owner role and record the decision. The bare edition warns about a null end. An organization composition refuses it and gives it no coverage. A past date is expired. Use set_seam_exceptions in the proposed first-run patch. Each replacement list must restate every exception that is to remain.
4. Inventory every per-side owner on shared contracts, the assumptions held by shared:ext.engineering-workflows, and shared claims SH-1 and SH-2. Keep the shipped sides and roles even when a design is absent. Bind each identity with a confirmed or provisional basis. Use modify_contract for contract owners, modify_element with the complete assumptions list for held premises, and bind_claim_owners with stable shared claim ids for claims. Hash each replaced field for expects.
5. Record each distinct new identity's actual acceptance beside ops. A provisional binding counts as filled and still needs that identity's acceptance. It remains a current-practice gap until confirmed through an identity-only patch. A reassignment needs former and new identities. A content change needs the agreement's before and after owners, including the engineering system owner for its premises. A plain model-check pass does not prove that the inventory was filled or accepted.
6. Prove the tools needed for the first patch and say which remain unchecked. Preview the first-run patch, regenerate its risk section, check every composition and the profile, and obtain the accountable person's acceptance through the ordinary design-change workflow. Update the version record and organization changelog on acceptance. Fill later profile sections as their phase needs them.
7. For any module enabled at the first run, fill its owner and entry evidence and pass the profile checker before relying on that module. If using an organization overlay, fill its account classes and placements for every part, set the profile's provider, and record the accepted baseline file and hash in the version record. The shipped overlay remains the worked example when no baseline is recorded.

### Changed meaning

- Organization additions choose their design namespace. Ratchet parts use org.<slug> and Jig parts use jig:org.<slug> in a Ratchet composition. Whole shared crossings use shared:oNN-<slug>. A module tag does not move a part to another design's side. New agreement sides retain shipped owner roles and bind actual identities with their basis and acceptance.
- A relationship's point names an interface point and does not itself declare the crossing on every affected seam. Use add_to_seam where the declaration is required. Use set_seam_exposure to declare all five marks for a new shared endpoint. The declaration changes no typed field, outsider mark, clearing or audience rule.
- Outsider-writable fields carry untrusted marks in typed schemas. MC-102 refuses any such field in an agent-reachable delivery. A label claiming that text is safe supplies no clearing. Structured feeds from exposed sources still need valid clearing and their true relationship kind.
- The generated-record premise now states conditional reliance when accuracy and completeness can be tested, usually through the producing controls. It is graded strong and holds on the audit standards and staff observations. Security-assurance research remains thin and treats these records as corroborating. The organization must test precision, detail and suitability for its review purpose. The three manual evidence-gathering relief marks depend on this premise. If it fails locally, that manual work remains. This is thesis 1.4.0 and does not promise automatic replacement of evidence gathered by hand.

### Added and changed

The composer specification supplies the missing adoption mechanism for all four patched compositions and Jig's partial layers. Apply identity bindings once before projection. The composer carries the verified full security floor into lone models and never derives that floor from an absent design. A Jig-only adopter uses the annotation shipped in its shared layer.

Organization failure scenarios can be added and modified through checked patches with stable organization ids, declared invariants, matching runbooks and pipeline or game-day tests. They flow through composition, impact reporting and threat tracing. These declarations never attest that a test ran. Before signing off ModelResponse E, supply and run the hostile-response scenario that its closure rule requires. A sign-off supplies no missing scenario.

Closure rules close cells only after review. An organization's sign-off binds to the shipped rule's field and why hashes, and successor wording can void it. The upgrade reports those voided sign-offs and preserves the organization file. The model checks expose every judged set, and the upgrade guard covers every set while allowing a removed item to leave the sets through removal.

The qualification route registry verifies a weights release signature before pinning it, and the hardening service sits in the reasoning zone. The model gateway continues to check the loaded digest against that pin. Shared delivery schemas limit what reaches coding agents. The typed approval path binds permission on the approval side, earned autonomy stays inside its design limit, and an administrative session is recorded to protected audit before it opens. Review each shipped closure rule and its residual limits before relying on its cells.

Work units carry a default flow item and graded relief marks against manual-work.yaml. These are defaults and claims, not measured organization demand or labor savings. Each design retains its own numbered stages. The unit graph checks real joins across designs for cycles and chains, checks stage order within a design, and reports direct external waits by unit, stage, capability and absent provider. Phase self-containment alone does not prove those external capabilities available.

The creation-loop parts, roles, views, relationships, contracts, scenarios, units and premises moved to Jig. The engineering system, shared agreements, cross-design relationships and two shared premises moved to the shared layer. Jig premises use JC ids, with no JC-34 because JP-34 became shared:SH-1. Mixed work units have sending and receiving halves, including Jig's JU-01 and JU-02. Ratchet's finding kinds and module declarations stay with Ratchet. The renames block and moved.yaml are the migration records.

### Deciding guesses

A cold Opus build of each changed tool, made from this edition alone, had to choose at these points, and each choice decided at least one fixture. Your builder may choose differently. Compare its build log with this list, and where it differs, follow the specification and fixtures. None of these choices changes a rule or a safety boundary.

**Composer**

- The build kept only merged layer maps, version and the overlay provider in Jig alone from a full input, with layer mappings compared without key order.
- The build assigned top-level metadata to the input namespace and chose Jig's empty-sequence key placement.
- The build retained supplied module-seam crossings instead of deriving them when the starting fixture already matched that derivation.
- The build pruned core units to a fixed point and counted a shared capability only when a surviving unit provided it.
- The build inferred Jig unit modules from loaded element tags when neither a module file nor a unit mapping supplied them.
- The build classified known absent records from shared declarations and treated relied_on_by as outside context rather than necessarily a part.
- The build visited outside references in per-contract and per-assumption order before seam exclusions and attached tests.
- The build attached the supplied floor directly to Jig's shared input before invoking the composer without a floor option.
- The build distinguished an empty readable floor mapping from unparseable or mistyped floor entries when choosing refusal codes.
- The build compared available implementations with exposure declarations and treated a declaration for a missing loaded part as stale.
- The build limited the overlay literal rewrite to shared:existing in element fit and account values.

**Model checks**

- The build validated crossing endpoint declarations against the source comparison model before later fixture edits moved a crossing.
- The build compared exposure staleness only in full mode against the input before filtering or edits, leaving its treatment of a patched composition unresolved.
- The build accepted an omitted module's interface declaration from the layer's shared seam after the model declaration was unlisted.
- The build copied bound assumptions from the shared source for the acceptance fixture where the reference runner copies the composed holding part.

**Patch applier**

- The build chose the namespace fixture's model, shared and patch file names and supplied shared and organization output flags.
- The build chose the exact import and export reference fields while leaving owner rows, typed fields and exception records intact.
- The build distinguished a shared contract content change requiring all before and after side owners from an owner-only change requiring changed bindings.
- The build required new identities and replaced former identities for changed claim-owner rows while leaving unchanged rows out of acceptance.
- The build kept only the remaining qualified part in an exported attached test after cleanup.

**Upgrade**

- The build used endpoint design namespaces as shared-seam sides and the model namespace for bare endpoints.
- The build chose the reopen fixture's proposed, previewed and accepted lifecycle and tested its judgment classification by membership in the guard's list.
- The build chose readable voided-sign-off text that differs from the reference report's current wording.
- The build serialized the fixture bundle's top-level sign_off mapping for its closure-review setup.

The impact-report build made no deciding guess. The unit-graph build's one deciding guess, where report counts sit, is now stated in its specification.

### Known issues for 5.0.1

- The impact-report fixtures allow a should-never code to appear twice when selected directly and by a card, because the surviving mutation is not excluded by the assertions.
- A scenario-only impact report raises IR-W-empty and omits Summary. A build that suppresses the warning and writes Summary still passes every fixture.
- An impact-report build can pass every fixture without replaying set_seam_exposure, bind_claim_owners or shared-agreement acceptance. Check those paths in your own build.
- The patch-applier report has no dedicated lists for scenario, claim-binding or seam-exception changes, and the fixtures do not pin any extra report fields a build adds.
- The patch-applier fixture comment still names a separate review refusal suite that does not exist.
- The model-check fixtures do not yet distinguish how a build validates exposure after fixture edits, or how it falls back to the shared layer's interface declarations.
- A model-check build can pass every fixture without implementing shared-writing-side or overlay-residency. Implement both from the specification.
- Missing exposure must refuse the composition before any result file is written. A build that writes an ordinary finding report instead still passes the fixtures.
- The acceptance fixtures do not distinguish assumption bindings read from the shared source from those read from the composed holding part.
- The unit-graph shipped fixture uses partial relief assertions and does not pin every catalog kind, including finding-routing.
- The upgrade text applies Jig contract and view renames to held comparisons while the reference comparison maps element and relationship renames only.
- Passing the upgrade fixtures does not prove the patch applier, model checks or threat grid it calls. Prove each against its own fixtures.
- The upgrade fixtures do not require the same readable voided-sign-off text as the reference implementation.
- The composer fixtures do not pin every floor record's serialized shape, or the order of metadata and layer keys.

The upgrade specification's fixture table now lists all 69 fixtures. Earlier drafts listed 64.

### Unchanged

The organization's people accept patches, exceptions and closure reviews. Unknown facts stay unknown. The shared layer's current agreement content and version are unchanged by Jig 0.1.1's packaging correction. Existing disclosure residuals, review-model routes, planted-change realism, derived-check rework routing and exception-review limits remain open design work.

<a id="changelog-4-2-0-2026-10-22"></a>
## [4.2.0] - 2026-10-22

Evidence lands in a partitioned store, and the verifier's observations are a record of their own; a seeded catch rate reaches only the people its contract lists; every part that steers a coding agent says whether it is a harness; the upgrade's guard covers typed fields, held declarations and the four new rules; a threat-grid closure counts only once a person has reviewed its rule; the profile checker reports three unset dials; a view id belongs to the patches a run applies; and every premise names the design items it rests on. The new rules warn on an organization's change for this edition, so a filled profile and every accepted organization patch stay valid, except the two upgrade cases item 4 names.

### What an agent holding 4.1.1 should do

1. Nothing stored needs renaming, and every 4.1.1 profile stays valid. No profile field, rule code, trade-off card, phase, readiness condition, heading or anchor changed, and the profile template is unchanged. The profile checker gains one warning (item 6). Contracts, relationships and views keep their ids; one contract and one view are new (`VerifiedObservation` and `design-change-57`).
2. Treat every new `-org` warning as a failed check, as in 4.1.0. Four new model-check rules are errors on the shipped design and warnings, under the same code with `-org` appended, on anything an organization's patches add or change; MC-103 is now one mechanism with a table naming every rule that has a warning stage, the edition it entered and the items each finding names. **In the next major edition all fourteen `-org` warnings (ten from 4.1.0, four from 4.2.0) become errors everywhere.** The rules, with what clears each:
   - `evidence-unpartitioned-org` (MC-104, at the contract): every evidence-content contract (the seven the model-checks specification names, or any contract marked `evidence_content: true`) whose `produced_by` names an element that exists is carried by at least one relationship whose target is a store or registry with a non-empty `partitioned_by`. A contract with producers that no relationship carries fails too. The finding names the contract, every relationship that carries it and every producer that exists. An organization contract marked `evidence_content: true` needs a relationship into a partitioned store, of the organization's own or a shipped one;
   - `evidence-into-store-unnamed-org` (MC-105, at the relationship): a relationship of kind `evidence` whose target is a store or registry names at least one contract in `carries`. The finding names the relationship and its target. A `no_contract` reason does not excuse it; name the contract, or recast the relationship if the flow carries no evidence. A relationship that holds a `no_contract` reason cannot simply gain a contract: `modify_relationship` setting `carries` beside the reason gives the error `plane-join-marked` (a reason beside a non-empty `carries`, null included), and no op deletes a key, so remove the relationship and add it again under the correcting patch's own id, carrying the contract;
   - `audience-outside-consumers-org` (MC-106, at the relationship): a contract may declare `audience: restricted`, and every relationship that carries it ends at an element its `consumed_by` lists. The finding names the relationship, the restricted contract and the relationship's target. `GateCatchRate` is the first restricted contract. A gate role the organization added and fed `GateCatchRate` draws this warning until the role is in the contract's `consumed_by`: add it with `modify_contract`, restating the three shipped consumers (`people.accountable-authorities`, `people.scenario-owner`, `people.independent-security-staff`), since a `set` replaces the whole list, with `expects` holding the hash of the list as 4.2.0 ships it (the value the op replaces). A shipped consumer left out of the restated list is not blocked by the guard; its shipped relationship then draws this warning. Never clear `audience` to quiet it (item 4). The model checks never flag a patch that takes a shipped item out of a judged set (a cleared `untrusted` mark, a dropped field, a weakened `held`, a cleared `audience`); compare the `judged` sets before and after each patch before accepting it, as the change-design workflow says, since the upgrade's guard sees it only at the next upgrade. A relationship that carries two restricted contracts, neither listing its target, gives two findings at the same location;
   - `harness-key-missing-org` (MC-107, at the element): a part whose role class is not human and that sends a non-optional relationship of kind `control` to an agent-reachable model caller (an element with `agent_reachable: true` that is the source or target of an inference relationship) declares exactly one of the `harness` key, which MC-99 then judges, and `not_harness`, a string with at least one character other than whitespace saying why it is no harness. Declaring both, neither, or an empty reason is the finding, one per element; it names the element and every relationship that brings it into scope. An organization coding harness drawn without the key now draws this warning; a stop hook that only runs the suite and returns its result declares `not_harness`. The rule finds a coding agent only by `agent_reachable: true` and an inference relationship, so draw an organization's own coding agent with both. In core-only mode the shipped coding agent, its model routes and the example harnesses belong to the secure-creation module and drop out, so MC-107 judges only a coding agent and model route of the organization's own drawn outside the module; an organization that runs with secure creation off parents its own parts outside `jig.inner-loop`, or they give `unknown-parent` in core-only mode.
   A finding that the patch applier's cleaning makes the organization's counts as the organization's: removing a shipped store cleans it out of every contract's `consumed_by` and `produced_by` and marks each cleaned contract as modified by the removing patch, so the finding on that contract is the `-org` warning.
3. Restate what the organization's patches set on, or remove from, the shipped items this edition changed, and hash each field's value as 4.2.0 ships it for `expects` (a key the item does not have hashes as the empty string, `e3b0c44298fc`); the upgrade reports `conflict.changed-upstream` otherwise, also for a `remove_relationship` or `remove_element` whose target changed:
   - relationships `r042` (independent verifier to the protected evidence store) and `r071` (evidence intake validator to the protected evidence store) now carry `VerifiedObservation` where `carries` was empty;
   - contract `GateCatchRate`: new `audience: restricted`, and a corrected description saying the seeding owner reads every person's rate where the sampling and seeding service computes it (the old text named a delivery to the seeding owner that no relationship drew);
   - element `jig.stop-gate`: new `not_harness` reason.
   Where an earlier organization patch already changed the field, hash it as the earlier patches leave it: after a removal of the protected evidence store, `VerifiedObservation`'s `consumed_by` is the empty list (`4f53cda18c2b`), and the shipped value's hash is refused with `op.expects-mismatch`.
   An organization that drew its own relationship into the protected evidence store, or that set `carries` on `r042` or `r071`, checks it against the new contract. An organization that replaced the protected evidence store under 4.1 upgrades clean, but `VerifiedObservation` is new and its `consumed_by` lists no store of the organization's (the removal cleaned the shipped one out): add the organization's store to it with a new patch. Neither the upgrade report nor any `-org` warning flags this; only the model checks' `contract-no-consumer` warning does.
4. Expect two upgrade results that differ from what 4.1.1 gave the same accepted patch. Both are named here because an accepted patch's result changes; no stored answer does. The upgrade cites no changelog entry on `conflict.enforcement-change`; the cases are this item's.
   - **A 4.1 patch that shrank a newly guarded set now blocks.** A patch accepted under 4.1 that takes a shipped item still in the model out of any of the ten new judged sets (item 5 lists what blocks for each) now gets `conflict.enforcement-change`. The likeliest are a cleared `untrusted` mark on a shipped field, a shipped contract's `fields` replaced by a list that drops a marked field or its mark, a shipped finding kind's `held` weakened so it fails the held check, and `audience` cleared on `GateCatchRate`; also a contract's `fields` key taken away, evidence no longer carried into a partitioned store, and a control relationship to the coding agent made optional. Since no op removes a contract, removing every producer of a shipped evidence-content contract blocks too (`evidence_contracts`), though a removal otherwise never blocks. Restore the item, or send the case upstream and keep the patch out until an edition carries it. A patch whose only effect is the item it takes out, such as a `fields` list restated only to clear one mark, has nothing left once the item is restored: withdraw it (`workflow-fix-patch.md`), record that the case went upstream, and propose it again when an edition carries the change.
   - **A 4.1 removal of the protected evidence store with no partitioned replacement conflicts first, then applies with a warning.** Under 4.1 the store could be removed only together with `r042` and `r071` (`op.still-referenced` otherwise), and this edition changed their `carries`, so the patch gets `conflict.changed-upstream` on those two removals (item 3) and the run writes no model. Reopen the patch by the reopen path of `workflow-fix-patch.md` (the same file and id, Status back to `proposed`), although the conflict report says a revised patch is drafted as a new proposed patch, and restate the same ops on 4.2.0. The upgrade workflow's step 6 says such a patch stays clean; that holds only once it is restated. A reopened patch is proposed, so check it with the applier's `--preview` and the 4.2.0 model checks: it applies and gives `evidence-unpartitioned-org` at `VerifiedObservation`, beside a `contract-no-consumer` warning there. The upgrade lists `removed_from_judged` only for patches it re-applies; for the reopened patch, compare the model checks' `judged` sets before and after it instead (the store leaves `stores`, `partitioned_stores` and `admin_parts`, its session leaves `admin_sessions`, and `r042` and `r071` leave `evidence_sinks` and `evidence_store_inputs`). Decide where those records land: add a store of the organization's own with partition keys and give it a view, or it draws `unviewed`; since the patch removed the relationships that wrote into the old store and no op restores a removed one, add new evidence relationships under the correcting patch's own id that end at the new store and name their contracts; list the store in each contract's `consumed_by` (item 3 says how to hash it); give it a broker session if it sits in the control zone; and state in the risk section where the loop now keeps the evidence. Removing the protected audit store the same way gives `evidence-unpartitioned-org` at `ExecutionReceipt`.
5. Rebuild the model checks, then the upgrade tool on them, and run the upgrade. The model checks' `judged` map now holds thirty-six sets (was twenty-six). The new ones are `typed_contracts`, `untrusted_fields`, `agent_reach_inputs` (MC-102), `held_kinds` (MC-91's held check; the one set that holds only the items that pass their rule, and in core-only mode a kind whose judging part was dropped is in neither the set nor the errors), `evidence_contracts`, `evidence_sinks` (MC-104), `evidence_store_inputs` (MC-105), `restricted_contracts`, `restricted_deliveries` (MC-106) and `coding_agent_controllers` (MC-107). A judged id is now an element id, a relationship id, a contract name, a finding kind's id, or a field path written `<contract name>.<field name>`, a nested field's names joined by dots (`ProvenClass.road_claims.closure_state`) and a field with no name string written `(no name)`. The upgrade tool's changes:
   - **The guard on the new sets.** An item is still present while the model holds an element or relationship with its id, a contract with its name or a finding kind with its id; a field path is still present while the model holds its contract. No op removes a contract or a finding kind, so these items never leave a set by removal, and a field that a replaced `fields` list drops is a switch-off. Each new set's blocking change: an untrusted mark set false or dropped by a replaced `fields` list (`untrusted_fields`); a contract's `fields` key taken away (`typed_contracts`); a relationship into an agent-reachable part that stops carrying a typed contract, or whose target loses `agent_reachable` (`agent_reach_inputs`); a kind's `held` weakened so it fails (`held_kinds`); an evidence contract that loses its producers or its mark (`evidence_contracts`); a relationship that stops carrying an evidence contract into a partitioned store, or whose store loses its partition keys (`evidence_sinks`); an evidence relationship into a store recast as another kind, or whose target stops being a store or registry (`evidence_store_inputs`); `audience` cleared, which empties `restricted_contracts` and `restricted_deliveries`; and a control relationship to the coding agent marked optional or recast, or its source recast as a person (`coding_agent_controllers`).
   - **Warnings on a patch.** `org_warnings` lists the four new codes beside the ten from 4.1.0, each with its `decide` text. Every finding of MC-104 to MC-107 is a judgment call: the upgrade never writes partition keys, names a contract a relationship carries, adds a consumer to a restricted contract, or writes a `harness` key or a `not_harness` reason. The fix chain resolves errors only, so a warning that a later dependent patch clears still lists on the earlier patch (an organization gate role's `controller-feedback-missing-org` that its feedback patch clears, for instance); check the final model before drafting a correction. The console line counts no `org_warnings`; read them in the JSON or Markdown report.
   - **The held state.** The 4.2.0 model checks report errors on any 4.1.x shipped design: `evidence-into-store-unnamed` at `r042` and `r071`, and `harness-key-missing` at `jig.stop-gate`. They cannot judge a held 4.1.x state, so check it with the 4.1 tools first (`workflow-upgrade.md`, step 1); when those are gone, build them again from the 4.1 specifications in `upstream/` before replacing it.
6. Decide the three dials 4.1.0 left without a default, or accept a warning for each. The profile checker's new `warn.dial-unset`, at `dials`, is reported once for each of `negative_recheck_floor_above_line`, `in_tier_max_wait_days` and `approval_requests_per_approver_hour` that has no register entry or whose entry holds no numeric `current` (where an id repeats, the first entry counts), and only while the dial register is settled (answered, with no placeholder), so the empty starter profile raises none, as with `warn.gate-seeding-unset`. To leave a dial unset, give it no register entry: an entry needs a numeric `current`, and `current: null` fails the schema. Each message says what holds while the dial is unset: the negative-challenge share, no draw by age, or the approver's work-in-progress limit alone. The other seven dials with no default keep their own checks.
7. Rebuild the six tools whose specification or fixtures changed, and prove each against its fixtures; the mutation-tested runner and the build log of 4.1.0 still apply. Every specification states the reference behavior wherever a 4.1 builder had to guess and the guess decided a fixture, so rerun every fixture even where behavior did not change. The figure builder, the status report, the unit graph and the readiness report are unchanged. Behavior changes:
   - the model checks: MC-104 to MC-107 (item 2), MC-103 as one table, the ten new `judged` sets (item 5), the new summary counts `evidence_contracts`, `evidence_store_inputs`, `restricted_deliveries` and `coding_agent_controllers`, and the fields they read: `audience` on a contract, `not_harness` on an element. Core-only mode runs MC-104 to MC-107 too. The fixture runner gains two optional keys: `unwarned`, warnings by code and location that must not be reported, and `judged`, set names mapped to the exact ids each must hold, in any order. New fixtures cover each new rule's trip, pass and `-org` cases, MC-106's cleared audience, the shipped sets in full and core-only mode, and a nested untrusted field path. Two existing fixtures gain a warning: `fixture-mc-store-reason-org-contract.yaml` also expects `evidence-unpartitioned-org` at `OrgSbomRecord`, and `fixture-mc-org-controller-unfed.yaml` also expects `audience-outside-consumers-org` at `o01-r4`;
   - the patch applier: new PA-24 and step 13a. A view stays with the patch that added it. Only the patches this run applies count: the accepted patches not named in `preview_withdraw`, plus the proposed patches named in `preview`. A proposed, rejected or withdrawn patch file refuses nothing, so `O10` adding view `O100` applies beside a proposed `O100`. After the `depends_on` check and before a patch's first op, the applier looks for a view an earlier patch of the run added whose id starts with this patch's id; when there is one, this later patch is refused with `op.namespace`, with `op` null, located at the patch's file, its text naming the view and the earlier patch as whole tokens, and none of its ops run. A patch that also fails `depends_on` reports only `depends.unmet`. `op.namespace` thus gains a patch-level form, and the 4.1 text naming the longer patch is gone. This reverses the 4.1 outcome, which refused the earlier patch. `fixture-pa-view-namespace-longest.yaml` now holds seven cases, and its first case's expectations change: the error moves from `O10`'s op 0 to `O100` with `op` null, `applied` is `[O10]` where it was `[O100]`, the text tokens are `O10` and `O100`, a proposed or rejected `O100` is listed in `skipped` with its status, and in the preview case `preview` is empty because the refused patch did not apply. No op renames or removes a view, so a bare view id such as `O100` on `O10` keeps patch `O100` from applying for as long as `O10` applies: renumber the refused patch;
   - the upgrade tool: item 5, the four new `decide` texts, UP-28, and a new fixture `fixture-up-from-4-1.yaml`, a held 4.1.1 state upgraded to 4.2.0 over a toy changelog that holds both versions. `fixture-up-enforcement-change.yaml` gains four cases (the untrusted mark cleared on `ToolLead.title`, `ToolLead`'s fields replaced by its unmarked fields, the `path` kind's `held` judged by a part that calls a model, `audience` cleared on `GateCatchRate`). Existing cases change expectations: in `fixture-up-enforcement-change.yaml` the case that recasts the failure-class registry as a service also conflicts on `evidence_store_inputs` (`p16-r1`, `p16-r2`, `p16-r9`); in `fixture-up-removal.yaml` five cases gain `removed_from_judged` entries for `evidence_store_inputs` (`r038`, `p23-r9`), and the evidence-store removal case also lists `r042` and `r071` under `evidence_sinks` and gains an `org_warnings` entry;
   - the impact report: a new fixture, `fixture-ir-direct-and-card.yaml`, for a should-never code that a patch selects both directly and through a scenario on its card. It stays `basis: direct` and lists only its direct triggers. A tool that merges the card triggers into a direct code, or switches the code to basis card, is wrong;
   - the profile checker: `warn.dial-unset` (item 6), and the specification now states each reading the 4.1 builders guessed. The reference behavior is unchanged apart from the new warning, but a tool built on a different reading changes its output, so read every stated reading against the tool. The terms of section 1 (among them "unanswered", "missing", "is set" and a date) are not redefined later; the settled-section rules read the profile as written where section 1 says so, and the rest read the nulled copy; a rule that compares one field with several roles gives one finding. 166 fixtures (were 154). The twelve new ones are `module-unknown` (`check.module-unknown`), five `dial-unset` cases, `gate-seeding-unset-register-open`, `progressive-held-by-placeholder`, `road-assets-none` and `-open`, and `tools-none` and `-open`. 87 existing fixtures gain `warn.dial-unset` expectations, three each (six in the fixtures that run both modes), since their base profiles leave the three dials unset: base profile A now gives 6 warnings and base B 10. Readings stated that change output where a tool read them another way:
     - inputs: YAML 1.2, the last duplicate key wins and aliases are expanded; a runner may pass an inline profile as JSON; `--today` exits 2 unless it has the form `YYYY-MM-DD` (form only); a date is trimmed, its month runs 01 to 12 and its day 01 to 31, a day past the month's end rolls into the next month (2027-02-30 reads as 2027-03-02), and before-comparisons run on the trimmed strings; the output `profile` writes a numeric or boolean name as text;
     - the baseline hash is computed over the nulled copy (a placeholder becomes null, a placeholder list item is dropped) with RFC 8785 number formatting (0.50 is 0.5, 1e3 is 1000), so a tool that hashed the profile as written, or formatted numbers otherwise, changes its hash;
     - a null list item is `schema.required` unless the schema's items are nullable; `warn.escapes-unset` and `warn.build-or-buy-unset` fire when the section is missing or is not a mapping;
     - `build_or_buy`: an entry that is itself a placeholder gives `check.build-or-buy-choice`; a placeholder `choice` is open, no section-5 rule reads that entry, it removes no part from its plane's set, and the field checks still run;
     - exceptions: an entry that is not a mapping reads every field as absent, and an `accepted_on` or `expires_on` that is not a date makes the days not positive;
     - injection: a placeholder anywhere keeps four checks and `warn.injection-detection-side-unset` silent, while the other rows still compare answered values;
     - `partition.no-jurisdiction-key` counts duplicate jurisdictions; `cadence.continuous-without-preapproval` reads `starting_cadence_rung` only; the administration table's row 2 is checked only where row 1 raised nothing, at most one finding per part; `tier.failure-mode-override` fires on the key's presence, null and placeholder included, and the known tiers are the keys of `quality.yaml` `tiers`; `warn.adjustment-crown-jewel` is located at `gate_failure_policy.blocking_cost_adjustments[i]`;
     - a null or placeholder `agent_egress_model_route_only` gives both its schema or unanswered finding and `warn.phase1-leg-unanswered`; `warn.ownership-third-party` needs a non-null verdict, and `check.ownership-unknown` cannot be reached on shipped data;
     - modules: `consequence-gates` counts register entries in the copy; `secure-creation` needs `provenance_share_required` to be a number; any `modules` key outside the five is `check.module-unknown`, switched on or not; PC-19 also covers a dependency switched on without its entry evidence; inventory entries are judged one by one, duplicates included; a skipped point is skipped in step 3 too; the alignment limit accepts 0 and negative numbers;
     - dials: an entry's own `safe` is never read; no past-bound finding when the effective bound is not a number; `warn.dial-turned-not-sro` fires with or without acceptance; `dial.producer-turned` fires beside the past-bound findings;
     - agent limits: `consequence-line-not-business-risk-owner` fires whether or not the line is answered; a grant's environment or action-class reason does not hold when either side is not a list; `team_ids` entries are judged once each, an empty or non-string id is not remembered, and duplicates are exact-string matches;
     - `gate_seeding` entries that are not mappings are skipped by every check, and nothing reads `categories_refreshed_on`; `warn.provider-concentration` counts duplicate providers; `warn.no-tools` fires on a mapping with no class; `warn.hosted-route-restricted` matches by substring, so `unrestricted` warns; a fractional `calendar_max_months` is truncated; `check.injection-production-without-effects` reads a missing value on purpose, so production-effects absent, null or a placeholder counts as switched off;
   - the threat grid: item 8.
8. Rebuild the threat grid and review the organization's own closure rules.
   - A STRIDE cell that every carried contract's rules cover is closed only when every one of those rules carries a review mark, `reviewed: {by: <role>, on: <YYYY-MM-DD>}`; otherwise it reads proposed (TG-9). A proposed cell is never counted as closed (TG-10). A `reviewed` key present with any other value, null included, is the new error TG-E-closure-mark, located `<source> closure <n> (<contract> <letter>)`, and the run writes no grid. In the rule checks it runs after the shape test and before the letter test. The tool checks the form of `on` and not that the date exists on a calendar, and a YAML library that reads an unquoted date as a date value still counts it as that form.
   - The register gains `proposed` counts overall and per letter, `closure_rules_reviewed`, and per rule `reviewed` (the mark map as read, or null) and `cells_proposed`; each `closed_by` item gains `reviewed` (true or false) and is listed on proposed cells too; a cell's `status` is `open`, `proposed` or `closed`. `closure_rules_used` now counts rules with closed or proposed cells, and TG-W-closure-unused fires on a rule with neither. In the summary, the grid table gains "Proposed closures" between "Auto-closed" and "Open leads" (the unsafe-control-action row reads 0 there); the letter table gains "Proposed" between "Auto-closed" and "Open"; the rule table becomes `| Contract | Letter | Field that closes it | Reviewed | Cells closed | Cells proposed |`, with Reviewed `yes` or `no`; and its rule line reads `<n> closure rules, <n> of them reviewed, <n> of them covering at least one cell:`. The toy fixtures' rules, and the every-contract and organization-closures fixtures, now carry marks, and every older expectation is restated in the new shapes.
   - The register writes an unmarked rule's `reviewed` as null, and a closure file that holds `reviewed: null` is TG-E-closure-mark, so never copy a register entry back into a closure file as it stands. The console line prints no proposed count; read the summary.
   - An organization's own closure rules are held to the same mark: each needs a person independent of the rule's author to review it and add the mark. Until then the rule's cells read proposed, so the organization's closed count drops on upgrade though nothing it stored changed.
   - An independent review attacked the 26 shipped rules from the edition alone and broke 14, which are removed: `ActionSpec` S and E, `AutonomyGrant` E, `AdminSession` R, `AuditRecord` T, and T on `ValidationArtifact`, `PolicyBundle`, `ReplayWindowBundle`, `DialSetting`, `DesignLimit`, `ConsequenceLine`, `ReleaseAttestation`, `FixBrief` and `LearnedItem`. Of the 12 that remain, 9 are reviewed, the four elevation rules among them after the design owner's read. On the shipped design the grid now closes 19 STRIDE cells (4.1.1 closed 64), proposes 5 and leaves 1590 open. A grid tool run on an organization model therefore reports far fewer closed cells; an organization that relied on a removed rule may restate it in its own closure file, reviewed and marked.
   - The closure rules now name 11 contracts (`GateFailurePosture`, `CredentialLease`, `RestoreGrant`, `AuditRecord`, `DerivedCheck`, `ProvenClass`, `RoadAssuranceStatus`, `KeyReference`, `ExecutionGrant`, `TypedDecision` and `ModelResponse`), so an organization patch that rewrites one of their descriptions keeps the rule's text.
   - New fixtures: a reviewed and an unreviewed rule on one crossing, two contracts with one rule marked, an organization file with no marks, malformed marks, and a control action whose scenarios carry invariants out of order and duplicated (`I10`, `I2`, `I2`, written `[I2, I10]`).
9. Use `rests_on` in the adopters' skill's `claims.yaml`. Every premise carries `rests_on` with two lists, `parts` (part or system ids) and `relationships` (relationship ids), naming what its `load` rests on as ids in `model.yaml`; a design change gives the parts and relationships it drew or changed. Both lists are empty when the load names only phases, units or nothing in the design, and for a dropped premise. A system id in `parts` (`S2` to `S5` appear) means every part of that system, the organization's own parts in it included, so a consumer expands it. An organization part that replaces a shipped part a premise names is linked by nothing in `claims.yaml`: link it in the organization's own premise ledger. A tool that parsed `load` text to link premises can read `rests_on` instead. The packaging check now requires the field on every premise and resolves every id. A rename sweep updates `rests_on` ids with the other id lists.
10. Re-read every tailored narrative, brief, plan or slide against the new and changed text:
   - part 4 says a seeded catch rate is restricted to the people its contract lists, that evidence custody is checked on every part (every evidence record lands in a partitioned store; every evidence relationship into a store names its records; the verifier's and intake validator's observations live only in the protected evidence store), and that every part steering a coding agent declares whether it is a harness;
   - Annex A6 describes the review marks and the proposed state, with the new counts; Annex A3 gains rows 93 to 99; R1's design checks list `evidence-custody`, `restricted-audience` and `harness-key`, and `org-change-severity` covers 4.1 and 4.2;
   - counts a tailored page may quote: 90 contracts (were 89); parts, roles, relationships (505), units (310) and failure scenarios (127) are unchanged; the threat grid's 19 closed, 5 proposed and 1590 open STRIDE cells (item 8);
   - cite as "Ratchet 4.2.0, thesis 1.2.0".
11. An agent holding 4.1.0 takes two steps in one run, from the newest edition's folder. Read 4.1.1's entry first: it changed no tool, field or identifier, and its `claims.yaml` gains `rests_on` here. Then work this list, building the tools from 4.2.0's specifications, and run the upgrade tool once from 4.1.0 to 4.2.0; it reads both entries, applies both versions' renames (there are none) and writes its output under `upgrade-4.1.0-to-4.2.0/` in the output directory. Check the held 4.1.0 state with the 4.1.0 tools first (item 5). Item 4's two cases are the same from 4.1.0 as from 4.1.1, since 4.1.1 changed no model.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- The rules new in this edition (MC-104 to MC-107) take the warning stage of 4.1.0's new rules: an error on the shipped design, a warning with `-org` appended on what an organization's patches add or change, and errors everywhere in the next major edition.
- Every evidence record a part produces must land in a store partitioned by keys, and every evidence relationship into a store names the records it carries. What the independent verifier and the evidence intake validator observe is its own record, kept only in the protected evidence store, so removing that store without a partitioned replacement is flagged.
- A contract may be restricted to its listed consumers; the seeded catch rate is restricted, so it reaches only the person it is for and the gate roles its contract lists.
- Every part other than a person that steers a coding agent declares its harness parity or why it is no harness.
- The upgrade's switch-off guard judges contracts, contract fields and finding kinds as well as parts and relationships, and covers MC-102, MC-91's held check and MC-104 to MC-107.
- A threat-grid closure counts only when a person has reviewed every rule it rests on; until then the cell reads proposed and stays in the judging queue. Shipped and organization rules are held to the same mark.
- A view stays with the patch that added it. Only the patches a run applies count, and a later applied patch whose id begins an earlier patch's view is refused.

### Added

- Contract `VerifiedObservation` (evidence content), produced by the independent verifier and the evidence intake validator, consumed by the protected evidence store, with its quality entry (append-only record); view `design-change-57`. 90 contracts (was 89).
- Model fields: `audience` on a contract (`restricted` is the one value read); `not_harness` on an element.
- Model-check rules MC-104 to MC-107 with error codes `evidence-unpartitioned`, `evidence-into-store-unnamed`, `audience-outside-consumers` and `harness-key-missing`, their `-org` warnings, and ten judged sets.
- Patch-applier rule PA-24; upgrade rule UP-28; threat-grid rules TG-9 and TG-10 and error TG-E-closure-mark; profile-checker warning `warn.dial-unset`.
- `rests_on` on every premise in `claims.yaml`.
- The kit's design checks `evidence-custody`, `restricted-audience` and `harness-key`.
- Decision-log rows 93 to 99.

### Changed

- `r042` and `r071` carry `VerifiedObservation`; `GateCatchRate` is restricted and its description matches the model; `jig.stop-gate` declares `not_harness`.
- The shipped closure rules: 14 removed after an independent attack, 9 of the remaining 12 reviewed (item 8).
- Part 4, Annex A3, Annex A6 and the skill's `SKILL.md` (the `rests_on` field) describe the above. The change-design workflow covers a contract of the organization's own carrying evidence, a gate role fed its catch rate, the harness key and `not_harness`, view names, replacing an evidence store, the guard's new sets and the review mark on organization closure rules. The upgrade workflow covers the 4.2.0 warnings, the held 4.1.x state the 4.2 checks cannot judge, the two upgrade cases of item 4, and an upgrade from 4.1.0 in one run.
- Every changed specification states the reference behavior for each guess a 4.1 builder made that decided a fixture; the profile checker's specification resolves the two sections that read "settled" two ways.

### Fixed

- The 4.1.0 known issue that no judged set covered MC-102 or MC-91's held check: the guard now blocks a cleared untrusted mark, a replaced field list that drops one, and a weakened held declaration.
- The 4.1.0 known issue that an organization's coding harness drawn without the `harness` key was never judged: MC-107 asks for the key, or a reason, on every part that sends control to a coding agent (see Known issues for what it still misses).
- The 4.1.0 known issue that no tool reported an unset dial among the three new ones.
- The 4.1.0 known issue that the applier counted every patch file, whatever its status, when it decided which patch owns a view id.
- The 4.1.0 known issue of four behaviors no fixture proved: the threat grid's sorting of scenario invariants, the profile checker's `check.module-unknown`, the impact report's direct-and-card rule, and an upgrade from one minor back (now from 4.1.1 to 4.2.0).
- The protected evidence store was invisible to any rule asking where evidence goes: the two relationships into it named no contract.
- `GateCatchRate`'s description named a delivery to the seeding owner that no relationship drew.
- 14 shipped closure rules closed cells their contract text did not protect.

### Known issues

These are planned for 4.3 unless a line says otherwise. The 4.1.0 known issues not listed under Fixed stay open and are restated here.

- Four cases around removals stay open from 4.1.0:
  - a finding that an organization patch brings about only by removing a shipped item, where the applier marks no remaining item as changed, names no organization item, so it is reported as the error where the `-org` warning was meant (a shipped assumption whose relied-on part was removed, for instance). A removed evidence store is not such a case;
  - no op deletes a key, so a modify cannot take a shipped item out of `harnesses` or `assumption_holders`, and the guard never sees a weakened harness or assumption; the finding is only the `-org` warning;
  - the guard cannot tell a part replaced under a new id from one removed, so a replacement that drops a mark the old item carried passes it; only the person reading `removed_from_judged` sees it;
  - removing a part or relationship that a module's interface point names leaves `module-interface-ref`, which no local patch clears.
- MC-107 sees a coding agent only through `agent_reachable: true` and an inference relationship, and a harness only through a non-optional control relationship to it, so a harness or coding agent drawn without them is still reported clean.
- MC-106 checks only restricted contracts. Measured on the shipped design, 72 of 396 relationship-contract memberships end at a target outside the contract's `consumed_by`, of them 37 list drift and 35 likely omissions; the general rule is measured for the next major edition.
- Only 10 of the 36 judged sets are pinned by a fixture's `judged` key, so a model-checks tool that builds a wrong set (emptying `exposed`, for instance) passes every fixture, and the upgrade's guard then compares the wrong set. All 36 are to be pinned in 4.3.
- The review mark writes its date under the key `on`, which the specification, the change-design workflow and the grid's fixtures leave unquoted. A YAML 1.1 parser reads an unquoted `on` as the boolean true, so the mark loses its date. The edition's files are YAML 1.2; on a 1.1 parser, quote the key (`"on"`) or switch parsers. The edition's `threat-closures.yaml` quotes both the key and the date (`"on": "2026-10-22"`). The specification does not say how a date that a library read as a date value is written back to the register's `reviewed.on`.
- The threat-grid specification does not say who may review a closure rule. The change-design workflow asks for a person independent of the rule's author, which the shipped marks meet: the four elevation rules were read by the design owner, who did not write them. The specification's opening sentence, someone independent of the model owner, governs a different act: accepting an open cell as a lead into the threat register.
- MC-107 asks a part for exactly one of `harness` and `not_harness`, and no op deletes a key, so an organization that decides `jig.stop-gate` is a harness after all cannot take its shipped `not_harness` away and draws `harness-key-missing-org`. Whether a key set to null counts as present is not stated, for MC-107 and for the guard's "`fields` key taken away".
- The model-checks specification says each rule new in 4.2.0 has an enforcement-change fixture in `fixture-up-enforcement-change.yaml`, and its table names three (partition keys replaced on the protected evidence store, that store recast, `p55-r17` marked optional); the upgrade fixtures hold only the cleared `audience` case for the 4.2.0 rules, so the guard on `evidence_sinks`, `evidence_store_inputs` and `coding_agent_controllers` is proven by no upgrade fixture.
- The upgrade workflow says a 4.1 patch that replaced a shipped contract's `fields` blocks; the upgrade specification blocks only a replacement that drops a marked field or its mark.
- The upgrade fixture behind item 4's evidence-store removal (`fixture-up-from-4-1.yaml`, and the matching removal case) runs on a toy held model without `r042` and `r071`, so it never meets the `conflict.changed-upstream` a real 4.1.1 state gets. The upgrade workflow and the upgrade specification's removals section now give the conflict-then-restate sequence that item 4 describes; the fixture is to hold the two relationships as 4.1.1 shipped them.
- Every conflict report ends "A revised patch is drafted as a new proposed patch", while the upgrade workflow revises a conflicted patch by reopening it under the same file and id; the workflow governs.
- The patch applier's specification makes `preview_withdraw` repeatable and calls `preview` a list without giving its command-line form, and the workflows show only `--preview <id>`. The reference reads a comma-separated list (`--preview O06,O08,O09`) and keeps only the last of repeated `--preview` flags, without a warning.
- The upgrade's readable report flattens the changelog's nested lists in "What the agent should do next": sub-items move to the top level and a paragraph that follows a list is joined to the item before it. Read the entry itself.
- The `warn.dial-unset` message for `in_tier_max_wait_days` reads "so nothing is drawn by age, so a lead ...", with a doubled "so".
- Annex A3 row 83 still says a view id belongs to the longest patch id it starts with and a patch is refused when its view id starts with a longer patch's id. PA-24 reverses that, and no later row records the reversal; the patch-applier specification governs.
- Three shipped closure rules stay unmarked, so their 5 cells read proposed: `GateFailurePosture` T, `CredentialLease` T and `AuditRecord` R, whose attack verdict was unclear. `ActionSpec` S and E and `AutonomyGrant` E stay removed until their contracts say who binds the actor, that a proposal confers no authority and only the approval side sets the binding, and that a grant is never wider than the design limit for its judgment type. Each other removed rule names in a comment the contract sentence a fix needs; those sentences are 4.3 work.
- `ExecutionGrant`'s description ends in a stray ",." where the scrub dropped a citation; the elevation rule on it still matches. `s6.hardening-service` has no trust zone, and key management's signing list omits policy bundles.
- Wording the 4.2 builds met, each decided by the reference and stated nowhere a builder of the same tool would look first:
  - the upgrade tool: its fixtures use YAML merge keys (`<<`), which YAML 1.2 does not define, so a strict 1.2 parser needs them expanded; an `overlay-missing` finding suppresses later overlay errors; how rule 22 reads dependents in a fix chain; which organization item the mechanical broker fix counts; rule 22a borrows a definition from the model-checks specification;
  - the model checks: the shipped-core row says 31 secure-creation elements are dropped in core-only mode where the model tags 32; how far the non-public data rule follows a parent chain; a restore path into the control zone; a deterministic gate counts as model-free though inference relationships touch it; which producer role the agent-memory rule reads;
  - the patch applier: the view-namespace fixture is still named `-longest` and its description says "under the 4.2.0 rule", though the longest-id rule is gone; step 13a says a longer patch id always sorts after the shorter one it starts with, and the order of ids with different padding (`O10` beside `O010`) is not defined; step 12 "contains id (or name for a contract)" reads two ways; step 4 does not say what a missing Status section does; whether a layer file is unchanged is judged on the bytes written; how strict the YAML parser is on the malformed-block fixture; no fixture reaches exit 2 for an unreadable shipped model;
  - the impact report: a duplicate unit `add` gives one `IR-E-input` each; the specification names roles only for model-path part ids; what `patch_unchanged: false` means; the boundary of `markdown_equals`; "touched via a contract" when a part produces or consumes the before or after version;
  - the threat grid: elements with no trust zone share one zone, though TG-1 reads "one zone of its own"; what a fixture without `written` expects; an unquoted `on` key read as text; an absent `carries` shown as an empty list; the summary's letter rows named by `letters`.
  - the profile checker: "that dial's entry" in the kept-test warning location reads two ways; an absent `build_or_buy` field, such as `organization_controls`, is no `schema.type` error; `--today` checks the form alone, so `2026-13-45` passes it though section 1 says it is no date; an entry of `build_or_buy` that is itself a placeholder gives `check.build-or-buy-choice`, which progressive mode never holds, where PC-2 makes a placeholder an open question in progressive mode; section 12 says PC-3 lists all eight waiting warnings, and the Waits column marks four.
- Eight premises carry empty `rests_on` lists although their load names design prose that could not be mapped to ids with confidence: CL-12, CL-13, CL-18, CL-19, CL-30, CL-31, CL-37 and CL-38. Two premises that rest on provenance link broadly, to the provenance parts as a whole.
- Deciding guesses left in this edition's blind builds, per specification, Opus 5.5 then Sonnet 5; each build passed every fixture: the model checks (0 and 4), the patch applier (0 and 2), the impact report (1 and 4), the profile checker (1 and 1), the upgrade tool (2 and 2), the threat grid (2 and 3). The readings are those listed above.
- Specifications and three fixture files (`fixtures-profile-checker.yaml`, `fixtures-status-report.yaml` and `fixtures-readiness.yaml`) carry no edition stamp; the blind-build ledger's hashes identify them. Still open from 4.1.0.
- The figure builder writes Mermaid only; its SVG output is deferred to 4.3. Still open from 4.1.0.
- The upgrade tool runs the model checks it was built with: build it after the model checks, and rebuild it after any rebuild of them.

### Unchanged

- The four rules and asymmetric suspicion, every profile field and the profile template, the readiness of every phase, the acceptance gates, every rule code and trade-off card, the claim counts and every claim's text, grade and verdict, the thesis (1.2.0), the core loop, every part and role, every relationship id (505), every unit (310) and failure scenario (127), the invariants, and every element, contract, relationship, unit and capability id that 4.1.1 shipped. The figure builder, status report, unit graph and readiness report specifications and fixtures.

<a id="changelog-4-1-1-2026-10-22"></a>
## [4.1.1] - 2026-10-22

The adopters' skill ships the premise register as `claims.yaml`, so an agent or tool holding only the edition can see what rests on each premise.

### What an agent holding 4.1.0 should do

1. Nothing to rename, and nothing stored changes. No profile field, rule code, identifier, specification, fixture or expected result changed, so no tool needs rebuilding, and every 4.1.0 profile and accepted patch stays valid.
2. Read `claims.yaml` for what rests on each premise. It holds every claim of the register, the same claims annex A1 and the six-pager's premise view render, each with its id, statement, type, premise group, verdict, strength and the reason for that strength, whether the edition marks it untested, what rests on it (`load`), what would prove it wrong, where the design bends if it flips, its extrapolation, the work units that settle it (`measured_by`) and its evidence sources by their public citation. A tool that linked premises to parts from the "If it flips" text of annex A1 can link from `load` instead: it names parts by name, systems by their id in `model.yaml`, phases as `PH-1` to `PH-5`, work units by id, and design changes as "design change NN" (capitalized when it opens a sentence); where `model.yaml` carries a view `design-change-NN`, that view lists the change's parts. A dropped claim (verdict drop) has nothing resting on it, whatever its `load` says.
3. Cite as "Ratchet 4.1.1, thesis 1.2.0".

### Renamed identifiers

```yaml
renames: []
```

### Added

- `claims.yaml` in the adopters' skill, listed in `SKILL.md` under the design data. Its prose passes through the same scrub as the rest of the edition, so it carries no names, internal file paths or working codes; the authors' notes and review updates stay out.
- The skill's packaging check requires `claims.yaml` to ship, parse and hold every claim of the register exactly once with its fields, and its self-test now breaks the folder four ways, one of them a register claim left out.

### Unchanged

- Every rule, code, profile field, specification, fixture and expected result; every claim's text, grade and verdict; the thesis (1.2.0); and the model, units and layers.

<a id="changelog-4-1-0-2026-10-21"></a>
## [4.1.0] - 2026-10-21

Every person who decides hears the measured outcome of those decisions; the secure-creation loop is drawn inside the model, so the checks that judge Ratchet's agents judge its coding agent; a weakness a control stopped is held by that control, with a kept test that exercises it; a threat grid generated from the design; a building-block index where builders start; a presentation workflow with the contract for a static site; removals judged by what remains; and every changed tool specification proven on two model tiers. The new rules warn on an organization's change for this edition, so a filled profile and every accepted patch stay valid.

### What an agent holding 4.0.1 should do

1. Nothing stored needs renaming, and every 4.0.1 profile stays valid; so does every 4.0.0 profile, since 4.0.1 changed no profile field. No profile field, rule code, trade-off card, phase or readiness condition changed, and the profile template is unchanged. The three new dials (`negative_recheck_floor_above_line`, `in_tier_max_wait_days` and `approval_requests_per_approver_hour`) have no default, so no profile gains `check.dial-missing`; set them in the dial register when the organization wants them (item 6). Part 1 keeps its explicit anchor `part-01`, though its title now reads "The strategy, carried forward from the brief and the six-pager", and it gains a first section with the anchor `part-01-each-choice-in-the-brief-and`. One explicit anchor changed: `r3-failure-scenarios-121` is now `r3-failure-scenarios-127`. Headings that hold a count changed, and so did their generated anchors: R2's "Relationships (505)" (was 415) and "Integration plane (42 parts)" (was 15), R3's "Failure scenarios (127)", and R4's phase 2, 3 and 4 headings (105, 102 and 58 units; were 98, 95 and 49). New explicit anchors: reference R0 (`r0`, `r0-blocks` and one `r0-block-<block>` per block), Annex A6 (`a6` and one per section), one per trade-off card in R1 (`r1-card-<card>`), one per part in R2 (`r2-part-<id>`, the id's dots as hyphens) and `r2-typed-fields`, with a `### <Contract>` heading under it for each of the eleven contracts with typed fields. Other places a note or a parser may point at moved too: R2's module column now holds a link to the part's R0 block where it held a plain `core` or module name; the profile checker's specification is renumbered (placeholders moved from section 1 to section 3, dials from section 10 to section 9, "Dials and design limits", and section 10 is now optional sections; the sections on answered values and on the module inventory are gone); and the tailoring workflow's heading "The reference starts by reader and puts the loop before the evidence" is now "The reference starts builders at their own building-block index, and part 1 carries the strategy forward". No heading of the six-pager or the strategy brief changed.
2. Treat every new `-org` warning as a failed check. Five new model-check rules (MC-98 to MC-102) and a new check inside MC-91 are errors on the shipped design and warnings, under the same code with `-org` appended, on anything an organization's patches add or change (MC-103). Every patch the 4.0.1 checks accepted therefore still passes. **In the next major edition all ten warnings become errors everywhere**, and a patch that only warns now will then fail. An item is the organization's when the provenance list the patch applier writes on it (`patches`) names an organization patch (an id of `O` and two or more digits), or, for an element, when its id starts with `org.`; a shipped item an organization patch modified counts as the organization's. The severity reads those provenance keys, so run the checks on the applier's own output: on a model whose `patches` keys were stripped, every finding is an error. The rules, with what clears each:
   - `controller-feedback-missing-org` (MC-98): every person (role class human) who is the source of a relationship of kind control or authorization receives a non-optional relationship of kind feedback, from another element, carrying a contract whose `measures` field names the quantity it measures. A role the organization added that approves, decides or sets a limit needs one: name the part that knows how that role's decisions turned out, use a contract that declares its measure (the shipped `GateCatchRate` or `OutcomeFeedback`, or one of the organization's own with `measures`) and draw the feedback relationship. A measured contract on an evidence relationship does not count;
   - `harness-parity-undeclared-org` and `harness-stop-gate-uncompensated-org` (MC-99): an element with a `harness` key declares `stop_gate`, `version_pinning` and `blocking_hooks` as true or false and `telemetry_export` as `full`, `partial` or `none`, and a harness with no stop gate names in `stop_gate_compensated_by` a part that is not itself a harness and sends to that part on a non-optional relationship. MC-99 judges only elements that carry the `harness` key, so a coding harness of the organization's own drawn without it is never judged and the upgrade reports it clean: give each one the key with its four parity fields (Known issues). A compensating part inside the secure-creation module drops out in core-only mode, so an organization that runs core-only names a part of its own;
   - `assumption-incomplete-org` and `assumption-fallback-relies-org` (MC-100): each entry of an element's `assumptions` list has an `id` no other assumption uses, a `statement`, a non-empty `relied_on_by` (element or relationship ids that exist), a `fallback` and a non-empty `fallback_by` (element ids that exist), and no part in `fallback_by`, or any part that contains it, is listed in `relied_on_by`;
   - `route-model-in-router-org` and `route-model-removes-org` (MC-101): a part marked `routes_by_rule: true` is off the model path and touches no inference relationship, and every relationship into it from a model caller is marked `add_only: true`;
   - `contract-field-invalid-org` and `agent-reach-untrusted-field-org` (MC-102): a contract's `fields` list is well formed (names unique within each list, a type from the closed list string, text, integer, number, boolean, date, date-time, id, hash, reference, enum, list and object, `values` for an enumeration, `of` for a list and never list itself, nested `fields` for an object, `required` and `untrusted` true or false), and no relationship into a part marked `agent_reachable: true` carries a contract with a field marked `untrusted: true`. Twelve shipped parts are agent-reachable now: the secure-creation loop and eleven parts inside it. `ToolLead` is a shipped contract with untrusted fields, so an organization relationship that carries it into an agent-reachable part now draws this warning;
   - `finding-kind-held-untested-org` (MC-91): a finding kind that declares `held` names its `kept_test`, the model-free part that judges that test (`judged_by`) and `converts_when`. Only this code drops to a warning on an organization's kind: `finding-kind-incomplete` and `finding-kind-judge` stay errors, and one kind can draw all three.
   A finding that an organization patch brings about only by removing a shipped item names no organization item, so it is reported as the error (Known issues).
3. Rebuild the model checks, then build the upgrade tool on them, as in 4.0.0, and run it. The model checks' `judged` map now holds twenty-six sets (was nineteen); the new ones are `controllers`, `controller_feedback`, `harnesses`, `harness_compensations`, `assumption_holders`, `rule_routers` and `router_model_inputs`. Work the upgrade's output by its sort as in 4.0.0, with these changes:
   - **Removals.** The switch-off guard judges only items the patched model still holds. A shipped part or relationship that a patch removes leaves its sets without blocking, and the report lists each removed item on that patch under `removed_from_judged`, with the sets and rules that judged it, for the person who accepts the patch; it is listed once, on the patch that removed it, also when that patch conflicts for another reason. The rules judge what remains, and a part or role left behind still counts:
     - a part that stays in the model and leaves a set because of the removal blocks the patch (the readers of a removed exposed store), and a patch that removes one part and clears a flag on another is blocked for the flag alone;
     - removing the privileged access broker alone is `conflict.enforcement-change`: the control plane operator stays in the model with no control action left, so it leaves `controllers` and its measured feedback leaves `controller_feedback`. The removal goes through only when the same patch also removes that role and every relationship naming it, or draws the role's session to the part that replaces the broker; MC-92 then reports `admin-broker-missing`, a judgment call, and the patch applies with findings;
     - a role removed with all its relationships leaves no trace but `removed_from_judged`; a removed feedback relationship that was a role's only measured feedback gives `controller-feedback-missing` at the role, a judgment call, and the patch applies with findings; a removed control or authorization relationship whose role stays blocks the patch;
     - removing a store that held evidence passes every check, because no rule requires the evidence to be kept somewhere else: the patch's risk section states where the loop now keeps it, and the person who accepts the patch reads `removed_from_judged`;
     - a part replaced by one of the organization's under a new id is a removal to the guard, so a mark the old item carried and the new one lacks (a learning-store mark, `restore_use` on a relationship) passes unseen: give the replacement every mark `removed_from_judged` shows (Known issues);
     - removing a part or relationship that a module's interface point names leaves `module-interface-ref`, which no patch clears, since a patch cannot change `modules.yaml`: send such a removal upstream (Known issues);
     - the applier refuses to remove a part a relationship, a child or a finding kind still names (`op.still-referenced`). This edition's new relationships `p54-r1` to `p54-r9`, `p55-r10`, `p55-r31`, `p55-r32`, `p55-r69`, `p55-r70` and `p56-r1` to `p56-r5` end at twelve shipped parts (`s7.sampling-service`, `s3.approval-console`, `s6.regression-catalog`, `s7.flow-cost-telemetry`, `s7.value-ledger`, `ext.engineering-workflows`, `s7.tool-yield-evaluator`, `s7.road-adoption-telemetry`, `s5.disposition-review`, `s6.retest-regression-planner`, `s2.typed-decision-worker` and `s3.action-broker`) and eight shipped roles (`people.accountable-authorities`, `people.scenario-owner`, `people.independent-security-staff`, `people.purple-team`, `people.engineering-owners`, `people.risk-acceptance-owner`, `people.security-risk-owner` and `people.line-of-business-owner`), and 26 new parts name `ext.secure-creation` or a part inside it as `parent`. A 4.0.1 patch that removed, retired or merged one of them, `ext.secure-creation` included, now fails with `op.still-referenced` until it removes those relationships and children too;
     - the new units name fourteen shipped parts in their `elements` (item 5), so a removed part also leaves those units refused by the unit graph until the organization's units file changes them, and a scenario of F125 to F130 that loses every element it names is dropped on compile.
   - **New enforcement changes.** A patch is `conflict.enforcement-change` when it recasts or removes a shipped role's only control or authorization relationship while the role stays, changes the kind of a shipped feedback relationship, marks it optional or removes `measures` from the contract it carries, marks a shipped harness's compensating relationship optional, or clears the hunk router's `routes_by_rule` mark. No op deletes a key, so a patch cannot take a shipped harness or a shipped part's assumptions out of their sets, and no judged set covers MC-102's typed fields or MC-91's held check (Known issues).
   - **Warnings on a patch.** Each new `-org` warning a patch brought is listed on it as `org_warnings`, each `{code, location, message, sort, decide}`, and the patch's result does not change. A later patch that clears the warning does not take it off the earlier patch's list, since a fix chain resolves errors only: rerun the model checks to see which warnings remain. Read `org_warnings` and `removed_from_judged` in the JSON report, since the specification does not require the readable summary to carry them. Every finding of the new rules is a judgment call: the upgrade never writes a `measures` field, a feedback relationship, a parity field, an assumption or an `add_only` mark.
   - **Exit status.** A run that continues past `rename.collision` or `checks.unrunnable` exits 1, also when patches conflicted or applied with findings in the same run.
   - **Critical paths.** A patch that removes a part named in a critical path now applies: the applier takes the id out of every `must_answer` list and `co_deploy` group, drops a `co_deploy` group left empty and every `required_hops` entry that names the part, and never drops a path, even one whose `must_answer` is left empty. A part the organization kept only to work around the 4.0.0 known issue can be removed now.
4. Place the 31 new elements in the organization's overlay: the secure-creation loop's 26 parts (ids starting `jig.`), the outside-text source `ext.outside-text`, and four roles (`people.creation-developer`, `people.change-reviewer`, `people.high-risk-reviewer` and `people.creation-policy-owner`). An organization with its own overlay places each one, or the upgrade reports `checks.baseline` with finding `overlay-missing` for it; the shipped overlay places every one, and a part that enforces a rule needs `keeps`, though none of the 31 shipped entries carries it. `jig.model-routes` and `jig.reader-model-route` carry `residency: true` in the shipped overlay; keep it when placing them, or a profile's `models.data_residency` listing no longer covers the two routes. `jig.model-routes`, `jig.reader-model-route` and `ext.outside-text` sit in the third-party trust zone, so the account each is placed in must be one that zone's `zone_accounts` allows. All 31 belong to the secure-creation module, which a profile may keep switched off, and the overlay still places them, since overlay coverage runs on the full model.
5. Restate what the organization's patches set on the shipped items this edition changed, and hash each field's new value for `expects`. A `set` replaces a whole value, and the upgrade reports `conflict.changed-upstream` for each such key:
   - part responsibilities (9): `s3.approval-service`, `s3.approval-console`, `s5.independent-verifier`, `s5.disposition-review`, `s5.finding-ledger`, `s6.regression-catalog`, `s7.flow-cost-telemetry`, `s7.sampling-service` and `ext.secure-creation`, whose `level` is now `container`, which parents 26 of the new parts, and which gained four `assumptions` (`managed-endpoints`, `mirrored-dependencies`, `code-from-engineers` and `locked-policy`). Those assumptions name relationship `p55-r8` and `jig.` parts in `relied_on_by` and `fallback_by`, with `jig.protected-branch` the fallback for all four: a patch that removes one of them trips MC-100 as an error (Known issues);
   - contracts (15): `FindingDisposition` and `KeptTestStatus` (description and consumers), `SampleFrame` (description and `measures`), `ValueLedgerEntry` (consumers and `measures`), `ErrorBudgetStatus` (`measures`), `ActionSpec` and `TypedDecision` (consumers), and the eight handoff contracts whose prose field lists became typed `fields`, each with a new description and new producers or consumers: `ProvenClass`, `DerivedCheck`, `RoadEntry`, `RoadAssuranceStatus`, `ChangeProvenance`, `ToolLead`, `DroppedCheck` and `FixBrief`. The enumerated values those descriptions listed (`ToolLead`'s detection layers and triage verdicts, `ChangeProvenance`'s attestation states, `RoadEntry`'s types, `DroppedCheck`'s reasons) now live only in the typed `fields`; a tailored narrative or integration document that quoted them from R2 takes them from there. Four of these contracts, and `ActionSpec` and `TypedDecision`, are named by the threat grid's closure rules (item 8);
   - relationships: `p30-r1`, `p30-r2`, `p30-r3`, `p30-r4` and `p40-r5` now end at a part inside the secure-creation loop (`jig.context-plane`, `jig.check-suite` or `jig.coding-agent`) where they ended at `ext.secure-creation`, and `p30-r5` and `p30-r9` now start at one (`jig.provenance-stamper` and `jig.measurement-plane`); `p51-r1` and `p51-r2` changed their labels, since the catch rate moved to its own feedback relationships;
   - the finding kind `path`: its `description`, its `never_closes` (two entries added: a held disposition, and a control credited without being observed in a reproduction) and its new `held` declaration.
   An organization relationship that starts or ends at `ext.secure-creation` still applies; decide whether it now belongs on a part inside the loop. Work units U-420 to U-424, U-430 to U-438 and U-440 to U-448 are new; check that no `add` in the organization's units file reuses one of those ids. Those units name fourteen shipped parts in `elements` (`s3.approval-console`, `s3.approval-service`, `s3.action-broker`, `s5.independent-verifier`, `s5.disposition-review`, `s5.failure-class-registry`, `s6.regression-catalog`, `s6.retest-regression-planner`, `s7.sampling-service`, `s7.flow-cost-telemetry`, `s7.value-ledger`, `s7.reliability-monitor`, `s2.typed-decision-worker` and `ext.secure-creation`), and scenarios F125 to F130 name shipped parts too. Unit and scenario rows in a risk section are facts, so the risk section of every accepted patch that touches one of those parts reads `IR-E-stale` on regeneration and the patch goes back through acceptance (`IR-W-reaccept`). The separations `tool-owner-yield-owner`, `road-owner-verifier` and `road-owner-metrics-owner` now carry their rule label (rule 4), a wording key, so a section that names them reads `IR-E-restamp`. While a patch is reopened, the applier refuses every accepted patch that depends on it (`depends.unmet`) and writes no model: re-accept in dependency order, and name a reopened patch with `--preview <id>` to check the rest meanwhile.
6. Adopt the held state and the attention defenses.
   - Record a reproduction that a control stopped short of the proof condition, with the receipt showing that control refusing the step, as held: the disposition names the weakness, the control and the path, and the regression catalog keeps a held-dependency test (a kept test whose purpose is held dependency, owned by the team that owns the control, with a re-test interval). A held finding is neither exploitable nor closed. It reads unresolved while its test is missing, unowned or past its interval, and it becomes confirmed with the reach that run showed, the tier recorded at hold and no new triage when the test's run meets the proof condition. A failed reproduction with no control observed stopping it is recorded unresolved with its reason. An organization's own finding kind admits held findings only by declaring `held`.
   - Decide the three new dials. `negative_recheck_floor_above_line` is the share of model-negative leads drawn for a person or a deterministic re-check in each tier at or above the consequence line; its safe direction is up, its frame is negative-challenge, and while it is unset those tiers draw at the negative-challenge share. `in_tier_max_wait_days` is the longest wait inside a tier before a lead is drawn whatever the sample; its safe direction is down, its frame is negative-challenge, and while it is unset nothing is drawn by age. `approval_requests_per_approver_hour` is the most approval requests sent to one approver in an hour; its safe direction is down, it has no frame, and while it is unset the approver's work-in-progress limit alone bounds the requests. The edition ships no value and no bound for any of them. The dial notes and unit U-444 call an unset wait limit or rate limit a reported gap, but no tool in this edition reports an unset dial (Known issues): list the unset ones in the dial register yourself.
   - Phase 2 gains units U-420, U-422, U-440 to U-442, U-447 and U-448; phase 3 gains U-421, U-423, U-424 and U-443 to U-446; phase 4 gains U-430 to U-438. Failure scenarios F125 to F130 are new, each with its runbook; add them to the organization's exercises. The done-conditions of U-424, U-430, U-432, U-433 and U-442 ask that the new rules report no error on the organization's compiled model, and that each `-org` warning on the organization's own items is cleared or accepted with a named reason, so this edition's warnings never block a phase's exit.
7. Rebuild the eight tools whose specification or fixtures changed, and prove each against its fixtures: the model checks, the patch applier, the upgrade tool, the impact report, the figure builder, the status report (specification only), the profile checker (specification only) and the unit graph (fixtures only). Build the threat grid, which is new. The readiness report's specification and fixtures are unchanged, so it needs no rebuild. Every specification now states the reference behavior wherever a 4.0.0 builder had to guess and the guess decided a fixture, so rerun every fixture even where behavior did not change. The build-tools workflow also raises the proof: expected results are written from the specification, which the reference implementation reproduces; the fixture runner fails on any unknown key and is mutation-tested (break a copy and confirm the runner catches it); a build log beside `org/CHANGELOG.md` records the fixtures passed, the mutation made, the model used and each choice the specification left open with the fixture it decided; each such choice is sent upstream; and the threat grid is needed by the first organization patch. Behavior changes:
   - the model checks: MC-98 to MC-103 and the held check of MC-91 (item 2), the seven new `judged` sets, the summary keys `controllers`, `harnesses`, `assumptions_checked`, `rule_routers`, `router_inputs_checked` and `typed_contracts`, and the fields they read: `measures` and `fields` on a contract, `harness`, `assumptions` and `routes_by_rule` on an element, `add_only` on a relationship. `plane-join-marked` now also reports a `no_contract` key holding null or an empty string, as a full error: no op deletes a key, so give such a relationship a reason, or remove an organization relationship and add it again without the key. Core-only mode now runs MC-86 to MC-102 and drops the whole secure-creation loop, the four new roles' controller findings with it, and a `held.judged_by` naming a dropped part is reported in full mode only. `agent-reach-regression` and `agent-reach-verdict-ref` are now located at `jig.check-suite` and `jig.context-plane` where they were at `ext.secure-creation`, so an exception keyed on location moves with them. Known limitation: a producer in system EXT, such as the coding agent inside the loop, counts every relationship it sends to another EXT part as outbound under MC-4, so the trifecta rule is stricter there than the loop's real egress, and an organization part drawn inside the loop can draw trifecta errors its real egress does not justify. In 4.1.0 only the ten codes of item 2 end in `-org`; a model-checks tool that prints `-org` on MC-86 to MC-93 was built for 3.9 or earlier. Stated: an id that does not resolve is one error at the item that holds it, so two unknown ends give two errors; each failing endpoint of an `ai-free-control-plane` check is one error; `exposed` holds only element ids; a layer folder with no overlay file exits 2; the `orphan` warning covers every element whose `level` is not `container`; a module that names itself in `depends_on` is `module-interface-ref`, located at the module; the restore path follows a relationship carrying `RestoreGrant` from its source to its target only, and each required relationship is judged once against all appliers together; an `overlay-unknown` key's fields are not judged;
   - the patch applier: a removed part leaves the quality layer's critical paths too (PA-18, item 3), and `layers.removed` lists a part whose critical-path memberships were dropped; the applier now parses `critical_paths.paths` in `quality.yaml`, so a process that rewrites that file keeps its shape (`must_answer` lists, an optional `co_deploy` map, optional `required_hops` as `[from, to, note]`); a finding kind's `held` is shape-checked (`op.malformed` otherwise), its `held.judged_by` must name an element that exists at the end of the patch (`ref.dangling` otherwise), and removing the part it names is `op.still-referenced`; an added view id belongs to the longest id, among the patch files in the patch directory whatever their status, that it starts with, so patch `O10` adding view `O100` is `op.namespace` while patch `O100` exists, and its text names `O100`. Name a new view with a hyphen or an underscore after the patch id (`O10-approvals`), which no longer patch id can begin (Known issues). The `overlay.unrecorded-file` exemption moved: no file is reported when the version record's folder is the shipped layer directory (the `layer` option, by default the shipped model's directory), compared as absolute paths, where 4.0.1 exempted the shipped data's own folder. The fixture runner needs the expect key `layer.critical_paths`, keyed by path id. New fixtures: `fixture-pa-view-namespace-longest.yaml` (three cases), `fixture-pa-remove-critical-path.yaml` (two cases) and a third case in `fixture-pa-remove-judging-part.yaml`. Stated: the ops block is parsed as YAML 1.2 and never repaired; each `layers` list is in the order the ops first changed it;
   - the upgrade tool: item 3, with the report keys `removed_from_judged` and `org_warnings` and a `decide` text for each of the ten new codes. `reapplied: false` now appears only on an organization's own patch that is not accepted, and the upgrade's correction patch carries `written_by_upgrade: true` instead; the switch-off guard does not run on the correction patch, which with no findings of its own is `clean`. `conflict.enforcement-change` conflicts are listed in set-name order, set names sorted by code unit. The shared toy held model in the fixtures gained a feedback relationship and a measured contract, so every upgrade fixture's held state changed; the fixtures still run from 3.9.0 to 4.0.0, and `fixture-up-removal.yaml` holds thirteen cases where the specification's table describes eleven (the two more are a removed compensating relationship and a removed model input to the router). Stated: an existing output directory is `output.exists` before the overlay hash is checked; `changelog.no-renames` carries `CHANGELOG.md` as its file and the version as its location; a `profile-field` code span is rewritten only when it holds the whole path; a term matches as a whole phrase, with no letter, digit or underscore beside it; a moved key is recorded at its old path; held-model renames rewrite whole string scalars and leave mapping keys alone; key comparisons skip the provenance keys, and `keys` and `keys_changed_upstream` have a stated order; each conflicted or unmet dependency is a conflict of its own; the correction patch is classified like any patch; a citation with no version holds no other key; an unknown profile field is cited by its last segment;
   - the impact report: a fixture for a crossing into the evaluation zone. Stated: added parts in the external and people systems with no unit are not listed; the overlay option names the recorded file when the two absolute paths are the same text, links not followed; the Markdown text's exact start, blank lines and end; one table of separation ids with each id's rule, sides and unit role pairs, where `business-risk-owner` and `control-plane-operator-producer-verifier` name the producer team and the verifier team as two fields; the gate failure policy part gives its own reason line; with both blocks in the same layout, a key only one block holds is a differing fact, so regenerating a block written with a profile without one reads stale, and a section generated without the profile and checked with it, or the reverse, goes back through acceptance; a message about the patch as a whole is located at the bare patch id;
   - the figure builder: wording only. Stated: the `figure` option builds each named figure once, in the fixed order; four message locations, `FB-E-absent` located at the relationship id among them; a relationship gets at most one of `FB-E-boundary` and `FB-E-absent`; where an end an exception adds is drawn; what `FB-E-id` covers;
   - the status report: wording only. Stated: the regime sentence when a threshold is unset, and the lines that stay when no class has findings;
   - the profile checker: the specification is restructured and renumbered so a builder on a mid-tier model finds each rule where it applies (an overview and the order of a run first, each term defined once, each condition with several cases as a table). Behavior and fixtures are unchanged. Its output on the 4.1.0 model differs: with the secure-creation module switched on, `parts.fitted` gains the module's 31 elements where it gained one;
   - the unit graph: behavior unchanged; the shipped-units fixture's counts changed. Its critical path is now 22 units long (was 20) and ends in phase 4's secure-creation units (`U-430`, `U-434`, `U-436`, `U-438`), across 14 layers (were 12), 326 capabilities (were 303) and 624 dependency edges (were 575). The program's longest chain now runs through a module a profile may keep switched off, so a plan or status report that quotes the critical path or its depth quotes it again;
   - the readiness report: unchanged;
   - the threat grid: new (item 8).
8. Build the threat grid and run it on every design change. It reads the compiled model, the failure scenarios and the closure rules (`threat-closures.yaml`, plus any closure files of the organization's own, passed with the `org-closures` option; keep them in `org/threat-closures.yaml`), and writes a register and a summary. Every relationship whose two ends sit in different trust zones gets six STRIDE cells. Elements with no trust zone, people among them, share one zone written `(no zone)`, so a relationship between two people crosses nothing. A cell closes only where every contract the relationship carries states the guarantee for that letter in its description: a closure rule names a contract and a field text, and the cell closes when the description contains that text exactly. Typed `fields` close nothing on their own, and a relationship that carries no contract never closes. Every control or authorization relationship gets four unsafe-control-action cells, traced to invariants through the failure scenarios; the grid counts a controller by element kind person and any feedback or observation relationship, where MC-98 counts role class human and a measured feedback relationship, so the two can disagree on an organization role. Every open cell is a lead for the organization's threat-register review (Annex A6). A closure rule whose field text the contract's description no longer contains stops the run with an error. The 26 shipped rules name 23 contracts (`ActionSpec`, `AdminSession`, `AuditRecord`, `AutonomyGrant`, `ConsequenceLine`, `CredentialLease`, `DerivedCheck`, `DesignLimit`, `DialSetting`, `ExecutionGrant`, `FixBrief`, `GateFailurePosture`, `KeyReference`, `LearnedItem`, `ModelResponse`, `PolicyBundle`, `ProvenClass`, `ReleaseAttestation`, `ReplayWindowBundle`, `RestoreGrant`, `RoadAssuranceStatus`, `TypedDecision` and `ValidationArtifact`), so an organization patch that rewrites one of their descriptions keeps the rule's text, or the organization drops the rule in its own closure file. The likeliest place to hit this is restating `FixBrief`, `DerivedCheck`, `ProvenClass` or `RoadAssuranceStatus` for item 5. Run the grid on the model before and after each patch, each run with the failure scenarios of the layer compiled with it; the grid has no comparison mode, so compare the two registers by cell id and list the cells the patch adds or reopens in its risk section. A new contract that should close cells needs a closure rule of its own. The new parts in the third-party zone (item 4) add crossings, so the grid's counts on an upgraded model change.
9. Re-read every tailored narrative, brief, plan or slide against the new and changed text:
   - part 1 now carries the strategy forward: it opens with a table tracing each choice in the brief and each truth in the six-pager to the section and claims that argue it. Rebuild that table from the tailored brief's headings and the tailored six-pager's truths list;
   - part 1 states the held finding beside "exploitable"; the glossary's "disposition" gains held and keeps the reason of a failed reproduction, and the glossary gains "held finding", "paper-slice credit", "false closure" and "self-graded evidence";
   - part 3 describes the secure-creation loop drawn inside the model; part 4 describes outcome feedback to every person who decides, and the threat grid. Part 4 and Annex A3 row 84 state the severity: a person with no measured outcome fails the build on the shipped design, and on the organization's own roles draws a warning in this edition and fails the build from the next major edition. A tailored part 4 states it the same way. Annex A3 row 92 adds a rule for an organization with its own coding-agent routes: only the reader's own model route sees outside text, so wiring a reader, or any other consumer of outside text, to the route the coding agent and reviewers share makes the trifecta and agent-reach rules refuse the coding agent;
   - counts a tailored page may quote: 133 parts and 15 roles, 148 elements (were 106, 11 and 117); the core loop is still 88 parts and 11 roles, and the 5 modules hold 45 parts (were 18) and the 4 new roles, 28 of the parts in secure creation (was 1); 89 contracts (were 81); 505 relationships; 310 work units, of which 189 are code, 52 agreements and 69 measurements, and 132 give feedback within minutes; 127 failure scenarios, 103 of them run in the pipeline; 67 parts start with a tool the organization already runs (were 44), and 47 are swap points (were 28). Part 2's phase table counts controls where a unit first builds them: phase 2 now builds 30 (was 29) and phase 3 builds 10 (was 11);
   - point the organization's builders at reference R0 regenerated from its own compiled model and profile, then part 4, R2, R3 and the profile, as the tailoring workflow now says. Beside each profile field and dial a block names, the tailored R0 carries the organization's answer, or "open" where there is none. The start page's builder path no longer lists R5 (the AWS overlay); an organization with its own overlay points its builders at that instead;
   - write any Markdown an agent will read to the tailoring workflow's new table: each rule's scope by name, thresholds a checker can apply, the done-condition, no reliance on the agent's harness, a table keyed by the deciding value where a rule has several cases, each rule stated once with no emphasis words, and a fixture or script that checks the result in place of any sentence asking the agent to check its work;
   - cite as "Ratchet 4.1.0, thesis 1.2.0".
10. Present the set when the organization wants a site. The new presentation workflow says which page each reader sees first and which figure carries which argument, and gives the contract for a site generator the organization builds in its own tools folder: plain HTML, one stylesheet, one small script, no external request, every figure as inline SVG with its Mermaid source beside it, and the checks to run before anyone sees the site. Run it after the tailoring checklist passes; the tailoring workflow's new step 11 hands over to it. The authors' own site, built from the shipped edition with their build, is the worked example of that contract; it is not part of the skill or the Markdown edition.
11. An agent holding 4.0.0 takes two steps in one run, from the newest edition's folder. First read 4.0.1's entry: its item 2, the re-reading, is all it asks, since 4.0.1 changed no tool, field, identifier or profile field, and item 1 above holds for a 4.0.0 profile. Then work this list, building the tools from 4.1.0's specifications, and run the upgrade tool once from 4.0.0 to 4.1.0; it reads both entries and applies both versions' renames (there are none). Cite the result as item 9 says: 4.0.1's citation, "Ratchet 4.0.1, thesis 1.2.0", gives the thesis version the same way. Check the held 4.0.0 state with the 4.0.0 tools first (`workflow-upgrade.md`, step 1): the 4.1.0 model checks report MC-98 errors on a 4.0.x shipped design, so they cannot judge the held state, and when the 4.0.0 tools are gone, build them again from the 4.0.0 specifications in `upstream/` before replacing it.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- The rules new in this edition (MC-98 to MC-102 and MC-91's held check) report a finding as an error when it sits only on the shipped design, and as a warning under the same code with `-org` appended when it touches anything an organization's patches added or changed. They become errors everywhere in the next major edition. A work unit whose done-condition names one of these rules asks for no error and for each warning cleared or accepted with a named reason.
- Every person who issues a control or authorization action hears the measured outcome of those decisions, from the part that knows it, on a feedback relationship of its own. Approvers, clearers of outsider text, proof-condition holders and deciders receive their own seeded catch rate; the other roles receive the outcome measure their decisions are graded on. The organization's own roles are held to the same rule, at warning severity in this edition.
- A disposition can be held: the independent reproduction stopped short of the proof condition at a control its receipt observed refusing the step. A held finding is neither exploitable nor closed, reads unresolved while its held-dependency test is missing, unowned or past its interval, and becomes confirmed when that test meets the proof condition. A control that no reproduction observed holds nothing, and a path finding never closes on a held disposition.
- A failed reproduction is recorded unresolved with its reason, as a state on the record.
- The secure-creation loop is drawn inside the model as its planes, harnesses, coding agent and four roles, so the trifecta, agent-reach, outsider-label and controller-feedback rules judge its coding agent. Outside text reaches a coding agent only through a tool-less reader on its own model route and a schema gate that passes typed fields; a consumer of outside text wired to the coding agent's route makes those rules refuse the coding agent.
- Hunks reach a person by rule first; a model may add hunks to the human route and has no way to take one off.
- A model-negative lead still reaches a person or a deterministic re-check, by a floor per consequence tier and by age; flip-style seeded pairs measure each typed route's flip rate as gate health; wait inside a tier is measured per path key. Approvers see the action rendered from the broker's normalized record, with any rationale apart and labeled, and approval requests per approver are rate-limited.
- Removing a shipped part or relationship by patch is judged by what remains: the removal itself never blocks, and a part or role still in the model that leaves a rule's scope does, the role left behind by a removed broker included.
- Removing a part also takes its id out of the quality layer's critical paths.
- An added view id belongs to the longest patch id it starts with, counting every patch file whatever its status.
- Ratchet's own design is threat modeled from itself by a generated grid whose cells are leads until independently reviewed, and a closure rests on contract description text that a build check holds.
- Part 1 is the strategy carried forward from the brief and the six-pager, and builders start at reference R0.
- A changed tool specification ships only with passing, mutation-tested blind builds on a top-tier and on a mid-tier model.

### Added

- Model fields: `measures` and typed `fields` (each with `name`, `type`, `of`, `values`, `fields`, `required`, `untrusted`, `description`) on a contract; `harness` (`stop_gate`, `telemetry_export`, `version_pinning`, `blocking_hooks`, `stop_gate_compensated_by`), `assumptions` (`id`, `statement`, `relied_on_by`, `fallback`, `fallback_by`) and `routes_by_rule` on an element; `add_only` on a relationship; `held` (`kept_test`, `judged_by`, `converts_when`) on a finding kind; `requires_module` on a module's interface point in `modules.yaml` (`catch-layers` requires `tool-portfolio`). No tool in this edition enforces `requires_module`: the profile checker does not read it, and the secure-creation module's `depends_on` is still `paved-road`.
- 31 elements: the secure-creation loop's context plane, check suite, inner loop, coding agent, three example harnesses (full parity, no version pinning, no stop gate), per-edit checks, stop gate, quarantined reader, reader schema gate, model routes, the reader's own model route, repositories, commit and push boundary, locked pre-commit gate, provenance stamper, protected branch, pull-request plane, diff-scoped analysis, model triage, AI reviewer, hunk router, hunk-risk advisor, autofix and measurement plane; the outside-text source; and the roles of the creation developer, the change reviewer, the high-risk reviewer and the secure-creation policy owner.
- 90 relationships (`p54-r1` to `p54-r9`, `p55-r1` to `p55-r76`, `p56-r1` to `p56-r5`): 505 in all (was 415). Views `design-change-54`, `design-change-55` and `design-change-56`.
- Eight contracts: `GateCatchRate` and `OutcomeFeedback` (measured outcome feedback), `HunkRouteAdvice`, `CreationRule`, `CatchLayer`, `CreationOutcome`, `ReviewerDrift` and `LayerCatchRate`: 89 in all (was 81). Eleven contracts declare typed fields, and R2 gains a section listing them.
- The secure-creation module's interface points `tracker-text`, `rule-class-tests`, `catch-layers` (which requires the tool-portfolio module) and `drift-rates`.
- Model-check rules MC-98 to MC-103 and the held check of MC-91, their error codes (`controller-feedback-missing`, `finding-kind-held-untested`, `harness-parity-undeclared`, `harness-stop-gate-uncompensated`, `assumption-incomplete`, `assumption-fallback-relies`, `route-model-in-router`, `route-model-removes`, `contract-field-invalid`, `agent-reach-untrusted-field`) and their `-org` warnings, with fixtures for each: one each rule trips, one it must not, one per `-org` warning, and an enforcement change that must block.
- The upgrade report's `removed_from_judged`, `org_warnings` and `written_by_upgrade`, and a removal fixture with one case per removal edge case.
- Three dials with no default: `negative_recheck_floor_above_line`, `in_tier_max_wait_days` and `approval_requests_per_approver_hour`.
- Failure scenarios F125 to F130, each with its runbook: 127 scenarios (was 121).
- Work units U-420 to U-424, U-430 to U-438 and U-440 to U-448: 310 units (was 287); by phase 26, 105, 102, 58 and 19.
- The threat grid's specification and fixtures, the shipped closure rules (`threat-closures.yaml`) and Annex A6, which describes the method as a proposal, with the generator's counts on the shipped design: 1614 STRIDE cells on the 269 relationships that cross a trust-zone boundary, 64 of them closed by a contract field, and 576 unsafe-control-action cells on 144 control actions from 50 controllers.
- Reference R0, the building-block index generated from the model: each core plane and each module is one block, every part sits in exactly one (a build check holds it), and each block joins its parts, trade-off cards, profile fields and dials, contracts at its edge, swap points, switch-on evidence, units by phase and AWS candidates.
- The presentation workflow, with the contract for a site generator the organization builds. The authors build a static site of the edition with their own build, as the worked example of that contract; the site is not shipped in the skill or the Markdown edition.
- Glossary terms "held finding", "paper-slice credit", "false closure" and "self-graded evidence".
- The kit's design checks list the held, controller-feedback, harness-parity, assumption, rule-first routing and typed-field rules, and the `-org` severity of this edition's new rules.
- In the specification brief and the tailoring workflow, writing guidance for Markdown an agent reads; in the build-tools workflow, how fixtures prove a tool on whatever model builds it, with a mutation-tested runner and a build log.
- Decision-log rows 81 to 92.

### Changed

- Part 1 is re-headed "The strategy, carried forward from the brief and the six-pager" and opens with the trace table, and it describes the held finding. Part 3 describes the secure-creation loop drawn inside the model. Part 4 describes outcome feedback to every person who decides and the threat grid. The start page sends builders to R0 and then part 4, lists R0 and Annex A6, says the authors' static site is a worked example built outside the edition, and counts the 4 module roles beside the 45 module parts.
- The responsibilities of the approval service, the approval console, the independent verifier, disposition review, the finding ledger, the regression catalog, the flow and cost telemetry and the sampling service carry the held state and the attention defenses; the secure-creation loop is a container with declared assumptions.
- The eight handoff contracts between Ratchet and the secure-creation loop carry typed fields; a proven class carries the CWE ids its failure class holds, and the secure-creation policy owner turns each proven class into a rule tested against the class's reproduced members.
- The seeded catch rate moved off the seed relationships for the proof-condition holder and the decider onto feedback relationships of its own.
- The tailoring workflow regenerates R0 from the organization's compiled model and profile, and hands over to the presentation workflow; the change-design workflow makes switching a module off the default way to leave it out, allows removals where the switch-off guard allows them, lists what still applies (the role a removed broker leaves behind, evidence stores, replacements, module interface points, ops no judged set covers), says how to declare an organization's own harness and name its views, and runs the threat grid before and after each patch; the upgrade workflow covers `removed_from_judged`, the new `-org` warnings, a held state the new edition's checks cannot judge, an upgrade across two versions in one run, and risk sections that new units make stale.
- Every tool specification states the reference behavior for each guess the 4.0.0 builders made that decided a fixture (item 7), and the profile checker's specification is restructured for builders on a mid-tier model.

### Fixed

- The 4.0.0 known issue on removals: the switch-off guard counted a shipped item that a patch removed as a rule switched off, so removing any shipped store, control-zone part, exposed part or part that is neither a person nor model-free was blocked with nothing local to clear it.
- The 4.0.0 known issue on critical paths: a removed part stayed in a critical path's `must_answer` list and `co_deploy` groups, and the model checks then refused the result with no op that could clean it.
- The 4.0.0 known issue on view ids: patch `O10` could take view `O100` from patch `O100`.
- The 4.0.0 known issue on the impact report: no fixture had a crossing into the evaluation zone, so a builder's mistake there passed every fixture.
- Seven of the nine people who issue control actions had no feedback relationship, and the approver's outcome stopped at the approval console.
- A reproduction a control stopped had no honest state: rejecting it credited the control for good, and calling it exploitable ranked the weakness as if the control were absent.

### Known issues

These are planned for 4.2 unless a line says otherwise.

- The severity of this edition's new rules reads the provenance lists, so a finding that an organization patch brings about only by removing a shipped item names no organization item, so it is reported as the error where the `-org` warning was meant (a shipped assumption whose relied-on part the organization removed, for instance). The upgrade attributes it to the patch that removed the part, as a judgment call.
- A modify cannot take a shipped item out of `harnesses` or `assumption_holders`, since no op deletes a key, so the switch-off guard never sees a weakened harness or assumption. A patch that sets a shipped harness's parity field to a malformed value, or a shipped part's `assumptions` to an incomplete list, leaves the item judged; the finding then names an item the organization modified, so in this edition it is only the `-org` warning and nothing blocks the patch.
- No judged set covers MC-102 or MC-91's held check, so the switch-off guard never sees a patch that sets `untrusted: false` on a shipped field, replaces a shipped contract's `fields`, or weakens a shipped kind's `held`. Read such ops before acceptance.
- An organization's own coding harness drawn without the `harness` key is never judged by MC-99, and the upgrade reports it clean. Nothing yet asks for the key on an organization part that runs a coding agent.
- No tool reports an unset dial among the three new ones, though the dial notes and unit U-444 call an unset wait limit or rate limit a reported gap; the profile checker's specification still lists only `module_alignment_max_days`, `window_bundle_max_hours` and the five kept-test dials as core dials with no default.
- The guard cannot tell a part replaced under a new id from one removed, so a replacement that drops a mark the old item carried passes it; only the person reading `removed_from_judged` sees it.
- Removing a part or relationship that a module's interface point names leaves `module-interface-ref`, which no local patch clears, since a patch cannot change `modules.yaml`.
- The patch applier counts every patch file in the directory, whatever its status, when it decides which patch owns a view id, so creating a proposed or empty patch file such as `O100` makes an accepted patch's bare view id `O100` refused, and the applier writes no model. No op renames or removes a view, so the remedy is a hyphen after the patch id in every new view id.
- Specifications and three fixture files (`fixtures-profile-checker.yaml`, `fixtures-status-report.yaml` and `fixtures-readiness.yaml`) carry no edition stamp, though the header above says every file is stamped; the blind-build ledger's hashes identify them.
- The figure builder writes Mermaid only. Without a Mermaid renderer the organization may run at build time, a regenerated design figure on the site shows its source with a one-line note and no drawing.
- The upgrade tool runs the model checks it was built with, as in 4.0.0: build it after the model checks, and rebuild it after any rebuild of the model checks.
- Deciding guesses left in this edition's final blind builds, per specification, Opus 5.5 then Sonnet 5. Each passed every fixture; a builder of the same tool may meet the same choice:
  - the upgrade tool (1 and 1): whether a patch's status field holds the bare kind word;
  - the impact report (1 and 2): when a relationship-added line shows what it carries and where content brackets go; which contract version marks a part touched, and the model hash's shape;
  - the profile checker (1 and 6): how a profile handed inline is read; six readings where two sections pull different ways on a settled or unanswered answer;
  - the model checks (2 and 4): where `effect-without-control` is located; that "exit 2, no report" means nothing on standard output; how many secure-creation elements core-only mode drops; that no quality-control-mode error is raised without a quality entry; that an edit's target names a renamed file; that a critical path's id is its map key;
  - the threat grid (2 and 2): that elements with no trust zone share one zone, and how organization closure files are wrapped; that ids such as `y` and `n` are read as YAML 1.2 strings, and the summary's letter-row form;
  - the unit graph (1 and 2): that an entry with no colon is matched as a prefix; which unit list is the baseline for toy fixtures, and that a remove may name a unit added in the same file;
  - the patch applier (1 and 1): whether `meta.organization_patches` includes previewed patches; that the YAML 1.2 parser rejects a malformed block;
  - the figure builder (0 and 1): how a layout directive's brace closes;
  - the status report (0 and 1): that the regime trend gate's "arrivals and fixes together" is a sum per window.
- Four behaviors no fixture proves; a mutation of each passed every fixture or no fixture exercises it: the threat grid's sorting of scenario invariants; the profile checker's `check.module-unknown`; the impact report's rule that a code selected both directly and by card stays direct with its direct triggers only; and an upgrade from a 4.0.1 held edition to 4.1.0, since the upgrade fixtures run from 3.9.0 to 4.0.0.

### Unchanged

- The four rules and asymmetric suspicion, every profile field and the profile template, the readiness of every phase, the acceptance gates, every rule code and trade-off card (57 should-never codes in 11 cards), the claim counts (49 claims, 27 of them honest bets) and every claim's grade, the thesis (1.2.0), the core loop (88 parts and 11 roles), the invariants, and every element, contract, relationship, unit and capability id that 4.0.1 shipped. No shipped unit or failure scenario changed, though new units and scenarios name shipped parts (item 5).

<a id="changelog-4-0-1-2026-10-21"></a>
## [4.0.1] - 2026-10-21

"Exploitable" and "urgency" are defined in the glossary, a failed reproduction is stated as unresolved, and the premise behind priority separates what is measured from what is inferred.

### What an agent holding 4.0.0 should do

1. Nothing stored changes, and no tool behaves differently. No profile field, rule code, identifier, specification or fixture changed, so no tool needs rebuilding.
2. Re-read every tailored narrative, brief, plan or slide against the changed text:
   - where it says a weakness is "exploitable", use the glossary's definition or say plainly that it means something else. The definition: a weakness the running system has demonstrated, where a test met a written proof condition in the deployed system with its actual controls in place and a reproduction by someone other than the proposer met the same condition; its consequence is what the reproduced path reached, at the tier the business owner confirmed. Only two kinds count without a demonstrated path: a live exposed secret, while the credential still works, and a live infrastructure misconfiguration, while it still differs from its declared intent. Do not add a third. A tailored narrative may adopt the definition word for word;
   - where it sets how soon a fix is needed, take urgency only from the attacker-side signals on the glossary's list (a known-exploited listing, EPSS, presence in an exploit kit, a public proof of concept), never from a severity score or a model's opinion;
   - where it describes a reproduction that failed, call the finding unresolved. A failed reproduction never refutes a finding, because reports often leave out a condition the path needed;
   - where it quotes the case-control figures, say that the 61.72% is severity patching restricted to vulnerabilities already in exploit kits, against 3.54% for severity patching alone;
   - where it states or relies on the premise that exploitability scores are a weak basis for priority, carry its new wording: ordering by consequence, demonstrated paths and attacker-side signals should work better, and that half is inference until it is measured. Its grade is unchanged. A narrative that presented the better ordering as measured should say it is the program's bet.
3. Cite as "Ratchet 4.0.1, thesis 1.2.0".

### Renamed identifiers

```yaml
renames: []
```

### Changed

- The glossary gains "exploitable" (a definition with its two kinds that count without a path, enumerated and closed) and "urgency" (a closed, versioned list of attacker-side signals). Its "disposition" entry says a failed reproduction leaves a finding unresolved.
- Part 1's rule on how findings enter the record says a failed reproduction leaves the finding unresolved and never refutes it. The record state that carries this is planned for the next minor edition.
- Part 1 cites the case-control study with its precise comparison: severity patching alone against the same patching restricted to vulnerabilities in exploit kits.
- The premise on exploitability scores (thesis 1.2.0) is reworded so its second half reads as inference until measured, its strength reason says so, and its evidence gains an exploitation-rate study and the scoring standard's own guidance that a base score should not be used alone to assess risk. The evidence ledger and the premise tables show the new wording.
- Annex A3 records the decision (row 80).

### Unchanged

- Every rule, code, profile field, specification, fixture and expected result, and every claim's grade and verdict.

<a id="changelog-4-0-0-2026-10-20"></a>
## [4.0.0] - 2026-10-20

Codes renamed so each means one thing; the ten checks that only warned on an organization's change are errors, and the upgrade sorts what they find so none is cleared by loosening a patch; three new design rules; asymmetric suspicion stated beside the four rules; a regime check in the status report; a figure builder; and the brief and the six-pager each take one job.

### What an agent holding 3.9.0 should do

1. Work in this order: check the held state, read the renames, rebuild the tools, then run the upgrade. Check the held state first, with the tools built for 3.9.0 (the upgrade workflow, step 1). Then read the renames below. The upgrade tool applies all of them in its run, before it re-applies any patch, so rename nothing by hand. Every 3.9.0 profile is valid once they are applied: the eleven `existing_tools` keys become `STEP-1` to `STEP-11`, `modules.production-effects.evidence.r2_continue_decision` becomes `phase_3_continue_decision`, and stored step values (`current_practice.steps[].step`, a unit's `seam`) become step codes. The two new profile sections are optional and no phase's readiness lists them (item 6 and item 7). One new warning can appear on a held profile: `warn.gate-seeding-unset`, when the dial register is settled and `gate_seeding` is absent. As in 3.9.0, the schema accepted keys it did not define, so a profile that already used a top-level key named `gate_seeding` or `regimes` for its own purposes is now read as the new section; rename such a key before running the profile checker. Part 1's headings and every explicit anchor of part 1 are unchanged. Two explicit anchors of the reference changed: `r3-failure-scenarios-118` is now `r3-failure-scenarios-121`, and `r4-the-steps-of-the-loop-a` is now `r4-the-steps-of-the-loop-step`. The six-pager's anchors `diagram-a1` to `diagram-a6` are now `diagram-apx-1` to `diagram-apx-6`, and it gains the anchors `part-1`, `part-2`, `part-3` and `truths`; the brief gains `exhibit-2`. Headings that hold a count changed with it, and so did their generated anchors: R2's "Relationships (415)" (was 411), R3's "Failure scenarios (121)" (was 118), and R4's phase 2 and phase 3 headings (98 and 95 units, were 95 and 86). R4's "The steps of the loop (A-codes)" is now "The steps of the loop (STEP codes)", and Annex A1's heading for CL-10 now reads "CL-10: Seeding gates with known-bad proposals measures gate health." Many headings of the six-pager and the brief changed their words (see Changed), so a link that targets a heading's generated anchor may no longer land; links to the explicit anchors named here still do.
2. Rebuild the model checks, then build the upgrade tool on them, then run it. The upgrade tool runs the model checks itself, after each patch. Its specification has it run the organization's model checks, and its options name no checker, so the checks it runs are the ones it was built with: wire the rebuilt model checks into the upgrade tool when you build it, and run that same build on the upgrade's output afterwards (the upgrade workflow, step 6). An upgrade tool still wired to model checks built for 3.9.0 cannot run them: it refuses with `checks.unrunnable` a model-check report that holds no `judged` map (MC-94). In this edition:
   - every finding of MC-86 to MC-93 is an error on an organization's change as on the shipped design. The ten warning codes ending in `-org` (`label-uncleared-org`, `label-cleared-by-model-org`, `fix-brief-author-org`, `learning-writer-org`, `learning-unchecked-org`, `drafter-free-text-org`, `restore-not-held-org`, `restore-needs-control-org`, `admin-unbrokered-org`, `store-partition-org`) are retired with no alias, so a tool that still prints one was built for an earlier edition;
   - four of those rules changed first, so that none fails a valid design: MC-87 accepts a fix brief relayed through an exposed part, such as a tracker, when the relationship that delivers it names the signer the receiver verifies (`verified_from`); MC-88 lets a person read learned items as free text and judges a replica marked `learning_store: true` as a store of its own; MC-90 judges only what the restore uses, in both directions (a relationship the restore calls out along, and a credential or key that flows into the restore path from the control zone at run time, unless it arrived with the restore grant), and an organization marks a dependency the restore uses with `restore_use: true`; MC-92 accepts a control-zone part the organization declares as a broker (`admin_broker: true`), and a model with control-zone parts and no broker is the new error `admin-broker-missing`, so removing the broker never switches the rule off;
   - three rules are new and are errors from the start: MC-95, a store that states a reason it holds no evidence content receives evidence-content contracts only by reference (`store-reason-contradicted`), where the evidence-content contracts are the seven the rule names (`CandidateFinding`, `ValidationArtifact`, `ExecutionReceipt`, `FindingDisposition`, `LearnedItem`, `SecretRevocation` and `ConformanceRead`) and any contract marked `evidence_content: true`; MC-96, no model in the orchestrator (`orchestrator-on-model-path`, `orchestrator-model-call`); MC-97, agent memory is a learning store (`memory-unflagged`).
3. Work the upgrade's output by its three-way sort (UP-26 and UP-27):
   - **Mechanical fixes.** Only two qualify: the broker's administrative session for a control-zone part the organization added, and dropping a shipped no-evidence reason beside partition keys an organization patch added. The upgrade writes them as one proposed correction patch, `O<NN>-upgrade-4-0-0-mechanical-fixes.md`, numbered one past the organization's highest patch, applies it as a preview and lists each error it fixes as resolved by it. Read it, generate its risk section with the impact report and fill the judgment slots, as for any patch (the change-design workflow, Check it, step 4), whatever the upgrade wrote under that heading. Then have a person accept it by writing its Status line; until then the applier leaves it out and the errors return.
   - **Judgment calls.** Every other error of these rules carries `sort: judgment` and a `decide` text that says what a person must decide. The upgrade never writes a clearing, a partitioning reason, a reference mark, a restore grant, a broker declaration, an orchestrator mark or a learning-store mark, because each asserts a control the checks cannot see. Draft the correction from that person's answer.
   - **Enforcement changes.** A patch that takes a shipped item out of what a rule judges (a flag cleared, a kind changed, a session made optional, a broker moved out of the control zone) is conflicted with `conflict.enforcement-change`, naming the set, its rules and the items, even when no rule then reports an error, and it is not applied. Removing a shipped item that a set holds counts too: in this edition, a patch that removes any shipped store or registry, control-zone part, exposed part or part that is neither a person nor model-free is blocked this way, whatever the reason for the removal (Known issues). Nothing accepted locally clears it. Declare the organization's design the way the rule reads it (`admin_broker`, `verified_from`, `restore_use`, `by_reference`, `orchestrator`, `evidence_content`, `learning_store`), or send the case upstream and keep the patch out until an edition carries the change.
   - **Reopened patches.** A conflicted patch reopened by the fix-patch workflow stays proposed through promotion; list each one as open in the organization's changelog, with what the design does not do until it is accepted again. The upgrade is complete when every reopened patch is accepted again or withdrawn.
   Re-add nothing by hand for a renamed finding kind: the upgrade now follows the rename (item 10). Run the impact report's check mode on every patch that adds, removes or changes a finding kind; expect `IR-E-stale`, because the kind's judging part is now touched (IR-23), and regenerate the risk section (an accepted patch goes back through acceptance). Run check mode on every other accepted patch as well: the separation between the proposing tool and the authorizing tool (`sep.tool-propose-authorize`) now names its sides `existing_tools.STEP-3` and `existing_tools.STEP-4`, so every recorded risk section that brings that separation into scope is stale after the rename (`IR-E-stale`), and regenerating it raises `IR-W-reaccept`. Such a patch goes back through acceptance although the organization changed nothing; say so to the person who accepts it again.
4. Restate what the organization's patches set on the shipped items this edition changed, and hash each field's new value for `expects`. A `set` replaces a whole value, and the upgrade reports `conflict.changed-upstream` for each such key:
   - part responsibilities (7): `s3.action-control-service`, `s3.credential-lease-broker` and `s3.local-enforcement-point` (the restore credential), `s7.sampling-service` (every human gate seeded; planted findings behind outsider text), `s3.approval-console` (seeds measure gate health), and `ext.known-exploited-catalog` and `ext.threat-intelligence` (affected versions);
   - contracts (5): `RestoreGrant` (description), `CredentialLease` (description and `consumed_by`), `SecretRevocation` (description and `produced_by`, which gains the security risk owner), `ExploitationSignal` (description), and `CostHandoffEntry` (description, which names the loop step by its step code);
   - relationships: `p43-r1` and `p43-r3` changed their labels and now carry `CredentialLease` beside `RestoreGrant`; `p07-r1` changed its label (it also carries the dispositions of seeded findings and closures for the decider gate), and so did `p44-r1` (catalog entries carry no versions and match on the identifier); `p24-r4` gained `restore_use: true`; `p14-r7`, `p16-r1`, `p16-r9`, `p19-r1`, `p39-r4` and `p40-r9` gained `by_reference`;
   - the finding kind `exposed-secret`: its `closure_check` and `never_closes` (the uncovered stretch of the exposure window);
   - the marks `orchestrator: true` on `s2.workflow-engine`, `s2.request-dispatcher`, `s2.dispatch-queue` and `s2.workflow-state-store`. A patch that clears one, or that removes the `restore_use` mark, is an enforcement change (item 3). A patch that removes a `by_reference` mark leaves the relationship in what MC-95 judges, so it brings the error `store-reason-contradicted`, a judgment call.
   No part was added, so no overlay needs a new placement. Four relationships are new (`p48-r1`, `p48-r2`, `p51-r1`, `p51-r2`). A patch that removes a part a finding kind names as its judging part is now refused with `op.still-referenced`; move the judging first with `modify_finding_kind` in the same patch or an earlier one.
5. Rework attack injection, exposed secrets and the exploitation signal. The lease broker issues a restore credential with each injection grant, scoped to the restore and sealed to the cell, carried inside the restore grant, so the restore runs at its time limit with no lease request; issue one with every injection grant. An exposed secret's exposure-use review records each stretch no issuer log covers as not verifiable, with its dates, and the finding closes only on the security risk owner's named, dated acceptance of that stretch; revocation is still proven. An exploitation signal states its affected versions as a range and where the range came from; the public catalog states none, so a catalog listing matches a finding on its vulnerability identifier alone unless a vulnerability database record supplies a range. Phase 2 gains units U-380, U-381 and U-411; phase 3 gains U-382, U-390 to U-392, U-400, U-401, U-410, U-412 and U-413. Check that no `add` in the organization's units file reuses one of those ids.
6. Declare how each human gate is seeded, or accept the warning. The new optional section `gate_seeding` (PC-28) holds one entry per gate the rules name (`approver`, `proof-holder`, `decider`) with its seed rate, seed categories drawn from the organization's threat model for its own oversight, the refresh date, the catch-rate floor, the breach action, the seeding owner outside the gate's reporting line, who sees per-person rates (never a manager or a performance review) and who computes a breach (the system). Once declared, all three gates need an entry, and the approver gate's `seed_rate` must equal the `seeded_proposal_rate` dial. Mark the organization's own evidence contracts `evidence_content: true`, its own orchestration parts `orchestrator: true`, and any vector store or scratch memory its agents write and read back as `learning_store: true`, with its writes routed through disposition review. A store with a no-evidence reason that receives evidence records only as ids lists them in `by_reference` on that relationship, or takes partition keys.
7. Use the regime check if the organization wants it. Rebuild the status report and add a `findings` list (`id`, `class`, `validated_on`, `fix_verified_on`) to `org/status/signals.yaml`. The optional profile section `regimes` holds five thresholds plus who set them and when; derive each from past findings with the recipe in the profile template, and have the security risk owner confirm them. The edition ships no value; until all five are set the report shows counts and ratios only, and warns once findings are recorded. The status report now reads the dial register as the list the schema defines; a profile that wrote `dials` as a mapping is refused (`SR-E-input`) and must write the list form. Reading the list makes the early-stop dial take effect for the first time: the stop condition SC-4 (the agent slower and costlier than the script on every closed case past the minimum, with no finding only the agent made) counts closed cases against the profile's `early_stop_min_closed_cases`, where every earlier edition used 5. A dial below 5 lets SC-4 fire on fewer closed cases and turn the current phase red sooner; a dial above 5 holds it back longer. Compare the next status report's stop conditions and phase colors with the last one, and tell the program's decision owner when SC-4 or a phase color changed only because of the dial.
8. Build the figure builder and use it for every design figure. It writes FIG-LOOP, FIG-CONTROL-BOUNDARY, FIG-PLANES, FIG-PROVIDER-LADDER and FIG-PART-MAP as Mermaid from the organization's compiled model, layer and profile, with the model's own ids as node ids, and checks each figure before writing it. Replace any figure script the agent kept; pass an `exception` option for each recorded exception the control boundary must show and an `actor` option for each recolored loop step, and cite every warning in the caption. The builder refuses an `actor` option that puts the agent at any step but step 3 (`FB-E-actor`) and then writes no loop figure, since the agent acts only at step 3, to propose; a tailored loop figure that showed the agent at another step was wrong, so read the patch or exception behind it again. Node ids changed: the loop's steps are `STEP-1` to `STEP-12`, the model route is `model-access`, the part map uses element ids, and the core figure's nodes are the modules data's ids (such as `tool-portfolio` and `signals-in`). Update any stored reference to an old node id.
9. Re-read every tailored narrative, brief, plan or slide against the new and changed text:
   - copy the asymmetric suspicion sentence word for word right after the four rules, at every depth: "**Asymmetric suspicion:** people at the gates the rules name drift toward approving, so each gate (approver, proof-condition holder, decider) is tested with seeded known-bad items." The rules stay four;
   - re-tailor the brief's middle into the choice cascade (what winning means and how it is scored, where we play and the three moves ruled out, how we win, what we keep and how we run the work), filling where we play and what we keep from the current-practice map and the profile, and fill Exhibit 2 from the premise ledger, never raising a grade;
   - remove the brief's lead-in before phase 1 ("Before phase 1, we map today's loop", with its list of practices that stay). The tailoring step that named the organization's own practices there is gone with it. Name those tools and practices in the section on what we keep, from the current-practice map, where the brief's tailoring appendix now puts them; phase 1's item opens with mapping today's loop, and the six-pager's table APX-2.1 still shows each practice by phase;
   - re-order the tailored six-pager into its three parts (what is true, what we want, what we will do about it) with the graded truths list; the opening branch now decides only which truth leads Part I, so branch F no longer moves the regimes up;
   - state the stop conditions and phase 1's size once, from the plan, in the same words at every depth. Accepting the phase 1 report is phase 2's entry gate, so remove any fourth stop that repeats it;
   - replace "matches SSVC in substance and is stricter in one place" with the new reading: for a finding with a demonstrated path, what the path reaches and whether it ran without a person come from the reproduction, and Ratchet is looser in two places (public well-being counts only where the organization records it in its consequence tiers, and the edition ships no remediation timelines). In Annex A5, exploitation, technical impact and mission prevalence are now partial;
   - name phases and loop steps in words in prose ("phase 1", "the loop's step 3"), with a code in parentheses at most; tables, the premise ledger and agent files keep the codes;
   - part 3's new regime check paragraph and its twelve optional profile sections (was ten); part 4's restore credential, the orchestrator paragraph, agent memory as a learning store, the uncovered exposure window and the store reason backed by references;
   - the seeding premise now reads "Seeding gates with known-bad proposals measures gate health." (thesis 1.1.3), and a count of 47 or 48 claims refers to an earlier edition. Cite as "Ratchet 4.0.0, thesis 1.1.3".
10. Rebuild the nine tools whose specification or fixtures changed, and prove each against its fixtures; the figure builder is new. Each specification now states the reference behavior wherever a builder of the 3.9.0 or 4.0.0 drafts had to guess and the guess decided a fixture, so rerun every fixture even where behavior did not change. Behavior changes:
    - the model checks: the rules in item 2, the `judged` map (nineteen sets, MC-94), the summary keys `reason_store_inputs`, `orchestrators` and `memory_stores`, and the new fields they read (item 6 and item 2). A missing `realization.yaml`, `quality.yaml` or `failures.yaml` now exits 2 with no report (before, a missing quality file skipped the tier-zero rule). A duplicate id gives one error for each occurrence after the first. MC-9's model path is the fixed list of shipped ids less any part with `model_boundary: true`, never the realization's `model-access` plane;
    - the patch applier: removing a finding kind's judging part is refused (above), and the report gains `modified.views`, the existing views a removal took a member out of. The version record's `overlay` now has its shape checked on its two keys: `file` must be a bare name `overlay-<name>.yaml` (lowercase letters, digits and hyphens in the name, never a path) and `sha256` 64 lowercase hex digits, or the record is an unreadable input; other keys in it are ignored. The scan for unrecorded overlay files now runs with no version record too, in the folder the version record option names, so an organization with no `version.yaml` can now get `overlay.unrecorded-file` for an overlay file there that the run did not use. Stated where builders guessed: one `depends.unmet` per patch naming every unmet id; `preview.invalid` is a run-level message that does not stop the run; `skipped` is in patch order; a model with no edition gives a null edition; an empty Status section is both `status.invalid` and `section.empty`; a Status line's date is the text after its last " on ";
    - the impact report: a finding kind the patch adds, removes or changes touches its judging part before and after (`via-finding-kind`, IR-23). Stated: team names are wording where both blocks carry a team id at the same position; the order of every list in the block; the exact reason and trigger wording; that a producer for the trifecta selector is a part with role class producer; how the AI-free control plane selector reads each endpoint; that an op failure no op owns is located at the bare patch id; and that the patches apply to the whole layer as read, so a layer refusal of the applier stops the report;
    - the profile checker: `gate_seeding` and `regimes` through the schema, PC-28's eight checks and `warn.gate-seeding-unset`. Stated: each finding is reported once, and findings about different parts are different findings even at one location; an exception's days are the calendar-date difference (180 days passes, 181 fails); the independent ownership verdict's text;
    - the readiness report: no behavior change. It states that its exit status is its own (the checker's progressive `ok` is separate), that a condition's fields are read inside its section, how a runner hands an inline profile to the tool, and that the ledger write path's default is the value accepted without an exception;
    - the status report: the regime check (SR-16 to SR-19, `SR-W-regime-unset`, the section "Regime check" and the block key `regimes`), finding records in the snapshot rule, and the dial register read as a list, so the early-stop dial now decides SC-4 (item 7). Stated: a test result or acceptance whose date is after `as_of` reads as not yet reached; `other_rules` never repeats `rule`; a refused phase 1 report's note carries no addition; an earlier report with no `units_landed` key lists no unit; the exact empty-section lines, warning lines and the set-by cell;
    - the unit graph: `UG-W-breaking` fires on every unit with `contract_shape_ok: false` and `shape_gap: breaking`, whether or not it takes a part to a stand-in. The 3.9.0 table named only a breaking stand-in gap, so a tool built to that reading may warn on fewer of the organization's units than this one; the shipped units give two, on U-08 and U-09. Stated: a module tag naming no known module still exempts the part and raises its own error; the shipped-units fixture's counts changed with the new units;
    - the upgrade tool: the sort and the switch-off guard (item 3), finding-kind renames (UP-25: it rewrites only the `id` of a `modify_finding_kind` and whole code spans, and maps the held model's kinds before comparing), step-code renames that also rewrite each unit's `seam` in the organization's unit changes, and the conflict code `conflict.enforcement-change`. Stated: which keys a `patches` entry carries; the headings of a conflict report and its "Question for the person:" line; the findings report's line form and its "What a person must decide:" lines; that a conflict on a remove carries only `held` and `new`; that the Status line it appends names the target edition; that the prose search reads every line of a patch, the ops block included; that a profile value equal to a generic identifier is never reported; the `file` an error carries; and that `checks.unrunnable` lets the run go on so the report lists every conflict;
    - the figure builder: new (item 8), with its specification and fixtures.
11. An agent holding 3.8.0 takes two steps, in one run of the 4.0.0 upgrade tool, which selects both versions and applies their renames in order. Check the held state first, with the tools built for 3.8.0. Then work through 3.9.0's list below, items 1 and 3 to 9, against the organization's files; skip its item 2, since the `-org` warnings it asks to clear are now errors that the 4.0.0 upgrade sorts, and its item 10, since only the 4.0.0 tools are built. Then work through this list, item 1 from its renames on. The upgrade's `agent_steps` copies every item of both versions as written, 3.9.0's items 2 and 10 included; skip those two there as well.
    - Read 3.9.0's item 1 with three corrections. "Nothing stored needs renaming" holds for 3.9.0 alone; on this path this edition's renames apply in the same run. "The model checks accept every patch that 3.8.0's checks accepted" holds for 3.9.0's tools alone; with the 4.0.0 tools every finding of those rules is an error on an organization's change, and the upgrade sorts it (item 3). "No heading of ... part 1 changed its words, and every explicit anchor still lands" was wrong in 3.9.0: part 1's heading "17 of 48 claims hold today, and the value case is a set of bets the phases settle" became "17 of 49 claims ...", and its anchor `part-01-17-of-48-claims-hold-today` is now `part-01-17-of-49-claims-hold-today`; R3's anchor `r3-failure-scenarios-91` became `r3-failure-scenarios-118` (and is `r3-failure-scenarios-121` in this edition); and the headings that hold a count in R2 (the evidence and integration planes, 20 and 15 parts, were 19 and 14; relationships, 411, was 335), R4 (phases 2 to 4) and part 4 (a core of 88 parts, was 86) changed their numbers and their generated anchors.
    - 3.9.0's list left out these changes; act on them too. U-205's check gained, per owning team, the time it lost to security debt, from a periodic survey of the team with the flow ledger's time on security work beside it; a units file that sets U-205's `check` restates the new text, since the upgrade has no changed-upstream check for units. Failure scenarios F69, F91, F92 and F94 changed their required behavior: F69 judges calibration on the 90% upper confidence bound with at least the labels the dial register lists, and in F91, F92 and F94 the cell runs the restore grant it holds, with no new approval and no control-plane call, where the action control service ran the restore before; update any runbook the organization keeps for them. The view `design-change-23` gained 20 control-zone parts and the broker's administrative sessions to them, `p45-r10` to `p45-r33`. `s3.local-enforcement-point` gained `applies_injection: true`, so MC-90 judges it, and a patch that clears the mark is an enforcement change (item 3). The secure-creation module's reviewer-approval-drift measure reads seed results pooled per change kind with a confidence interval, and per reviewer only once that reviewer's own interval is narrower than `approver_drift_threshold_pp`, as the approval gate's measure does.

### Renamed identifiers

```yaml
renames:
  - {kind: view, from: design-change-55, to: "jig:P55"}
  - {kind: view, from: design-change-57, to: "jig:P57"}
  - { kind: profile-field, from: existing_tools.A1, to: existing_tools.STEP-1 }
  - { kind: profile-field, from: existing_tools.A2, to: existing_tools.STEP-2 }
  - { kind: profile-field, from: existing_tools.A3, to: existing_tools.STEP-3 }
  - { kind: profile-field, from: existing_tools.A4, to: existing_tools.STEP-4 }
  - { kind: profile-field, from: existing_tools.A5, to: existing_tools.STEP-5 }
  - { kind: profile-field, from: existing_tools.A6, to: existing_tools.STEP-6 }
  - { kind: profile-field, from: existing_tools.A7, to: existing_tools.STEP-7 }
  - { kind: profile-field, from: existing_tools.A8, to: existing_tools.STEP-8 }
  - { kind: profile-field, from: existing_tools.A9, to: existing_tools.STEP-9 }
  - { kind: profile-field, from: existing_tools.A10, to: existing_tools.STEP-10 }
  - { kind: profile-field, from: existing_tools.A11, to: existing_tools.STEP-11 }
  - { kind: profile-field, from: modules.production-effects.evidence.r2_continue_decision, to: modules.production-effects.evidence.phase_3_continue_decision }
  - { kind: capability, from: cap.r0-contract-validators, to: cap.phase1-contract-validators }
  - { kind: rule-code, from: R1, to: RULE-1 }
  - { kind: rule-code, from: R2, to: RULE-2 }
  - { kind: rule-code, from: R3, to: RULE-3 }
  - { kind: rule-code, from: R4, to: RULE-4 }
  - { kind: delivery-point, from: R0, to: PH-1 }
  - { kind: delivery-point, from: R1, to: PH-2 }
  - { kind: delivery-point, from: R2, to: PH-3 }
  - { kind: delivery-point, from: R3, to: PH-4 }
  - { kind: delivery-point, from: R4, to: PH-5 }
  - { kind: step-code, from: A1, to: STEP-1 }
  - { kind: step-code, from: A2, to: STEP-2 }
  - { kind: step-code, from: A3, to: STEP-3 }
  - { kind: step-code, from: A4, to: STEP-4 }
  - { kind: step-code, from: A5, to: STEP-5 }
  - { kind: step-code, from: A6, to: STEP-6 }
  - { kind: step-code, from: A7, to: STEP-7 }
  - { kind: step-code, from: A8, to: STEP-8 }
  - { kind: step-code, from: A9, to: STEP-9 }
  - { kind: step-code, from: A10, to: STEP-10 }
  - { kind: step-code, from: A11, to: STEP-11 }
  - { kind: step-code, from: A12, to: STEP-12 }
  - { kind: term, from: A1, to: APX-1 }
  - { kind: term, from: A2, to: APX-2 }
  - { kind: term, from: A2.1, to: APX-2.1 }
  - { kind: term, from: A3, to: APX-3 }
  - { kind: term, from: A4, to: APX-4 }
  - { kind: term, from: A5, to: APX-5 }
  - { kind: term, from: A6, to: APX-6 }
```

R1 to R4 named both the four rules and phases 2 to 5, and A1 to A6 named both loop steps and the six-pager's appendix sections, so those codes appear under two kinds. The rule codes come first: a whole value `R1` to `R4` the organization stored is rewritten as a rule code, and every other place either meaning appears is reported for the agent to read. Reference parts keep R1 to R7 and annexes keep A1 to A5. Story-map cells join the two codes (`R0-A1` is now `PH-1-STEP-1`), and a patch's cell ends in the new phase code; no organization file holds them. The six-pager's anchors `diagram-a1` to `diagram-a6` are now `diagram-apx-1` to `diagram-apx-6`, so a tailored copy that links to them changes with its labels. The kind `step-code` is new: it rewrites what an identifier kind rewrites, and also the `seam` of each unit in the organization's unit changes. The kind `finding-kind` is new as well, though no shipped kind was renamed in this edition.

### Changed meaning

- Every finding of the outsider-label, fix-brief, learning-store, drafter, restore, broker and partition rules is an error on what an organization's patches add or change, as it is on the shipped design. A patch that only warned in 3.9.0 now fails.
- The restore check judges only what the restore uses. A runner dependency the restore never touches passes; a credential or key the restore needs from the control zone at run time fails unless it arrived with the restore grant.
- A fix brief may pass through an exposed part, such as an issue tracker, when its receiver verifies the signature of the part that wrote it.
- A person may read learned items as free text, and a replica that is itself a learning store is judged as one.
- The broker rule reads any control-zone part the organization declares as a broker, and a control zone with no broker is an error.
- A store's statement that it holds no evidence content must hold for what it receives: evidence records arrive only as ids or references.
- No model sits in the orchestrator (invariant I11). Model output reaches the workflow engine, the request dispatcher, the dispatch queue and the workflow state only as typed records from a part off the model path.
- Agent memory that an agent writes in free text and that is read back into an agent's context is a learning store, written only by disposition review.
- An injection's restore runs under a credential issued with its grant and held in the cell; the restore never asks the control plane for one.
- An exposed secret's exposure window that no issuer log covers closes only on the security risk owner's named, dated acceptance of that stretch.
- A known exploited catalog listing matches a finding on its component only inside a stated version range; with no range it matches on the vulnerability identifier alone.
- Every human gate the rules name is seeded with known-bad items: the approver, the proof-condition holder and the decider. Seeding measures gate health; per-person catch rates go only to the seeding owner and to each person for their own rate, and the system computes each breach.
- The suppression rate counts only planted known-true findings that sit behind outsider text in the path model triage reads.
- A finding kind the patch adds, removes or changes brings the part that judges its closure check into the impact report, before and after, with its separations and should-never codes.
- Accepting the phase 1 report is phase 2's entry gate and never a stop condition. The stop conditions are three, generated from the plan at every depth.
- Ratchet is looser than SSVC in two places, public well-being and remediation timelines, and takes what a demonstrated path reaches and whether it ran without a person from the reproduction. It no longer claims to be stricter than SSVC on technical impact.
- Text a person reads names phases and loop steps in words; tables, the premise ledger and the files agents load keep the codes.

### Added

- Model fields: `orchestrator` and `admin_broker` on an element; `verified_from`, `restore_use` and `by_reference` on a relationship; `evidence_content` on a contract.
- Model-check rules MC-94 (the `judged` sets) to MC-97, the error codes `admin-broker-missing`, `store-reason-contradicted`, `orchestrator-on-model-path`, `orchestrator-model-call` and `memory-unflagged`, and fixtures for each of the ten checks that were warnings on an organization's change and the three new ones: one it trips, one it must not, and an enforcement change that must block.
- Invariant I11 (no model in the orchestrator) and failure scenarios F122 to F124, each with its runbook: 121 scenarios (was 118).
- Relationships `p48-r1` (the restore credential from the lease broker), `p48-r2` (the security risk owner's acceptance of an uncovered stretch), `p51-r1` and `p51-r2` (seeds for the proof-condition holder and the decider): 415 relationships (was 411). Views `design-change-48`, `design-change-51` and `design-change-53` in `model.yaml`.
- The tool-portfolio module's interface point `exposed-secret-hits-out`, so the shipped model crosses no module boundary unnamed.
- Work units U-380 to U-382, U-390 to U-392, U-400, U-401 and U-410 to U-413: 287 units (was 275); by phase 26, 98, 95, 49 and 19.
- The optional profile sections `gate_seeding` and `regimes`: twelve optional sections (was ten). Rule PC-28 with the checks `check.gate-seeding-missing`, `check.gate-seeding-duplicate`, `check.gate-seeding-off`, `check.gate-seed-rate-not-dial`, `check.gate-seeds-lapsed`, `check.gate-seeding-owner-in-line`, `check.gate-results-to-manager` and `check.gate-breach-by-person`, and the warning `warn.gate-seeding-unset`. The profile template writes both sections, `regimes` with each threshold as `FILL` beside its recipe.
- The status report's regime check: per weakness class and for all classes, arrivals of validated findings against verified fixes over a window, the ratio and its trend, findings open, and a regime (backlog, balanced, near zero, too few to call, or unset) placed only by the organization's thresholds, with one line on what each regime means for what the pilot measures. The `findings` list in `org/status/signals.yaml` and the warning `SR-W-regime-unset`.
- The figure builder's specification and fixtures, and its row in the build-tools workflow.
- The upgrade tool's rename kinds `step-code` and `finding-kind`; its sort (the proposed correction patch, `written_by_upgrade`, `fixes`, `sort` and `decide`); and the conflict code `conflict.enforcement-change`.
- The patch applier's report key `modified.views`.
- The principle of asymmetric suspicion, one sentence right after the four rules in the brief, the six-pager and part 1, and the glossary term.
- The six-pager's truths list (seven truths, two of them honest bets) and the brief's Exhibit 2, what would have to be true, generated from the evidence ledger.
- A generated count above the contracts table and the failure-scenarios table, held to each table by a build check; a line saying the failure-scenario numbers F74, F85 and F86 were never assigned; a sentence in part 1 that a count of 47 or 48 claims refers to an earlier edition; and the citation form, edition first: "Ratchet 4.0.0, thesis 1.1.3".
- Thesis versions 1.1.1 to 1.1.3, all wording: the premises' falsifiers name phases in words, and the seeding premise says seeding measures gate health.
- Annex A5's SSVC rows for automatability, known exploited status, public exposure, exposure and the BOD 26-04 tree, from a line-by-line comparison with SSVC's published trees, and a new mission prevalence row; the consequence tier the old mission prevalence row cited now maps mission impact. 10 of the 11 pinned SSVC ids are mapped.
- The kit's design checks list the store-reason, orchestrator and agent-memory rules.
- Decision-log rows 65 to 79.

### Changed

- The strategy brief states the strategy as a set of choices in Playing to Win's order, each with what it rules out: what winning means and how it is scored, where we play and the three moves ruled out, how we win (the loop, the four rules named in one line, the "what we will not do" line and the asymmetric suspicion sentence), and what we keep and how we run the work. Its headings changed with it, and its exhibit is now Exhibit 1. The consequence line is set by the business risk owner, and a finding at or above it always passes the fix cap.
- The six-pager moves from what is true (Part I: the current state, the illustration, what AI agents change, the truths list, the method story) to what we want (Part II: the North Star and its measures, the regimes) to what we will do about it (Part III: the loop and its rules, the rejected paths, the plan, the closing scene, the "going deeper" map). New headings: "Seven truths carry the design, and two of them are honest bets", "We aim to find and fix each weakness just in time, and two measures show whether we do" and "We considered other paths and rejected each for a named weakness" (was "... rejected them for named reasons"); "Authority outside the agent is the strongest claim, the value case is a bet, and the stop conditions are set in advance" is gone, its content in the truths section; "Each section goes deeper in one part of the complete edition" (was "... one file ..."); the appendix sections are APX-1 to APX-6. The main body stays within its cap.
- The stop conditions and phase 1's size (its weeks and roles) are generated from the plan in the brief, the six-pager and parts 1 to 3, so the three depths read alike. Part 1 lists three stops and states the acceptance of the phase 1 report as the entry to phase 2.
- Part 1's priority bullet names both CISA trees (the coordinator tree and the tree behind BOD 26-04) and the two places Ratchet is looser than SSVC. Part 1 also adds the asymmetric suspicion sentence with a paragraph on why it stays a principle.
- Part 3 describes the regime check in the status report and lists twelve optional profile sections. Part 4 describes the restore credential, the orchestrator holding no model, agent memory as a learning store, the uncovered stretch of an exposed secret's window, and a store's no-evidence reason backed by references, and it says each control-zone part is administered through a broker under dual control: the shipped privileged access broker or a part the organization declares as one.
- Failure scenario F95 (a control-plane outage during an injection) names the lease broker among its parts, trigger and test: the restore runs under the credential it holds, with no lease request.
- The seeding premise (CL-10) reads "Seeding gates with known-bad proposals measures gate health." Its grade and evidence are unchanged.
- Phases and steps are named in words in the premises' falsifiers. In the edition's model and layer files, parts, contracts and relationships already named phases that way, so this changed no hash an organization holds; `CostHandoffEntry` now names the loop step by its step code, which changed its hash (item 4).
- Counts a tailored page may quote: units by kind are 177 code, 51 agreements and 59 measurements (were 170, 49 and 56), and 125 give feedback within minutes (was 123).
- The tailoring workflow gives each depth one job, builds every design figure with the figure builder instead of a script the agent keeps, and adds checklist items: each brief section states a choice and what it rules out, Part I holds only premises from the ledger, and the stops, the four rules and phase 1's size read identically at all three depths. Its step that named the organization's practices in the brief's lead-in before phase 1 is gone with the lead-in (item 9).
- The upgrade workflow checks the held state first, then reads the changelog and its renames, then rebuilds the tools and runs the upgrade, which applies the renames before anything else. It covers the correction patch (its risk section generated before acceptance), judgment calls, enforcement changes, reopened patches and when the upgrade is complete, and it settles the version at promotion: the upgrade writes `n` as 1, and each acceptance, withdrawal or profile change after the run raises it by one, in the output directory or after promotion. The change-design workflow says how to declare the organization's design the way each rule reads it, and never to clear an error by taking an item out of a rule's scope. It no longer offers dropping a module by removing its parts: a module the organization does not need stays switched off in the profile (Known issues).
- The interview guide gains the `gate_seeding` and `regimes` rows; its tool question covers loop steps 1 to 11, since the profile records no tool for step 12; and a ledger write path other than intake-only needs an exception.
- The kit's lookup reads the codes `PH-1` to `PH-5` and `RULE-1` to `RULE-4`.
- In Annex A5, SSVC's exploitation and technical impact move from full to partial, and its source link is CISA's current SSVC page.
- The figure sources: the core figure's nodes are the modules data's ids, and the design figures are the figure builder's output on the shipped design, with the model's ids as node ids.

### Fixed

- The 3.9.0 restore grant was held in the cell, yet the runner still asked the lease broker, which fails closed, for the credential the restore runs under, so a control-plane outage left the restore unable to run. The restore credential now travels inside the restore grant, and the restore check judges what flows into the restore path.
- The status report read the profile's dial register as a mapping, while the schema makes it a list, so every valid profile got the default early-stop minimum of 5 whatever its dial said (since 2.2.0). It now reads the list, so SC-4 and the phase colors follow the organization's dial (item 7).
- The 3.9.0 changelog said no heading of part 1 changed and every explicit anchor still landed, and its list for a 3.8.0 holder left out U-205's check, four failure scenarios, a view, a shipped `applies_injection` mark and the reviewer-drift pooling. Item 11 corrects it for an agent upgrading from 3.8.0.
- Both 3.9.0 known issues: the upgrade tool follows a renamed finding kind instead of reporting a removed target, and the impact report marks a changed kind's judging part as touched.
- Part 1 listed accepting the phase 1 report as a fourth stop condition, while the plan holds it as phase 2's entry gate.
- The SSVC comparison overstated the match; a line-by-line comparison against SSVC's published trees showed Ratchet has no counterpart to SSVC's partial-or-total control value and is looser on remediation timelines and public well-being.
- The suppression seed had lost its condition that planted findings sit behind outsider text when the sampling service replaced the earlier sampler, so the suppression rate measured triage on clean input.
- The shipped model warned `module-interface-uncovered` on its own secret-scanner export to the exposed-secret intake; the tool-portfolio module now declares it.
- A store's no-evidence reason was believed on its word, and an organization's own agent memory was judged by no rule.
- The impact report's specification said a changed item's fields follow the key order of the item before the patch; the reference has always written them in natural order of field name, and the specification now says so.

### Known issues

- The upgrade's switch-off guard (UP-27) counts a shipped item that leaves a judged set because a patch removed it as a rule switched off. Removing any shipped store or registry, control-zone part, exposed part or part that is neither a person nor model-free is therefore `conflict.enforcement-change`, and nothing accepted locally clears it (removing `s4.route-usage-receipts` is blocked, for example). Until it is fixed, keep such a part and switch off what you do not use another way (a module stays off in the profile), or send the removal upstream (`workflow-send-upstream.md`) and keep the patch out until an edition carries it. Edition 4.1 is planned to judge only the items still present in the model.
- The upgrade tool runs the model checks it was built with: its options name no model-check build, so an organization cannot point a run at another checker. Build the upgrade tool after the model checks and wire that build into it; after any rebuild of the model checks, rebuild the upgrade tool too.
- Removing a part leaves its id in the critical paths of the compiled quality layer. The patch applier drops a removed part's realization, quality and overlay entries and its failure-scenario mentions, but not its place in a critical path's `must_answer` list or `co_deploy` groups, although rule PA-18 promises no reference to it remains. The patch applies with no error, and the model checks then report `critical-path-part` for each place that still names the part (removing the local audit buffer gives four: two paths, each in both lists). No patch op edits a critical path, so an organization cannot clean it itself: keep a part a critical path names and retire its relationships instead, or send the removal upstream.
- An added view's id needs only to start with the patch id, so patch O10 may add a view `O100`, and patch O100's own view `O100` is then refused with `op.exists` and stops that patch. The same holds for any patch id that begins a longer one. Until the rule needs a separator, name each added view by the patch id alone or by the patch id, a hyphen and a name (`O10-boundary`), never the patch id followed directly by a digit.
- Builders still had to guess at a few points that decided a fixture. In the final blind builds of this edition, each passing every fixture, the guesses left were: the upgrade tool 9, the impact report 5, the status report 2 and the profile checker 1; the model checks, the patch applier, the readiness report, the unit graph and the figure builder none. A tool built from these specifications may differ from the reference where its builder guessed the other way and no fixture tells them apart.
- No impact report fixture has a crossing into the evaluation zone, so a builder's mistake there passes every fixture (a deliberate mutant of the reference survived).
- Portability: builds of seven of the specifications on a smaller model (the profile checker, the upgrade tool, the patch applier, the impact report, the figure builder, the readiness report and the status report) passed every fixture. Their builders recorded more deciding guesses on the larger specifications: the profile checker 9, the upgrade tool 8, the patch applier 2, and the impact report, the figure builder and the readiness report 1 each; the status report none. These builds are recorded beside the gate builds and do not count toward it.

### Unchanged

- The four rules (still four, with asymmetric suspicion stated beside them as a principle), every element, contract, unit and capability id apart from the renames above, every profile field apart from the renamed ones, the readiness of every phase, the acceptance gates, every claim's grade, the claim counts (49 claims, 27 of them honest bets), the counts of parts (106, 88 of them in the core loop), contracts (81), should-never rule codes (57) and trade-off cards (11), and part 1's headings. No shipped unit changed beyond the renames.

<a id="changelog-3-9-0-2026-10-19"></a>
## [3.9.0] - 2026-10-19

### What an agent holding 3.8.0 should do

1. Nothing stored needs renaming. Every 3.8.0 profile stays valid: every new profile field is optional, no phase's readiness lists one, and the one new dial (`window_bundle_max_hours`) has no default, so no profile gains `check.dial-missing`. The four new consistency checks read only the new fields (item 4). One exception: the 3.8.0 schema accepted keys it did not define, so a profile that already used one of the new names below for its own purposes (a key `team_ids` under `separation`, a dial named `window_bundle_max_hours`, a top-level `disclosure`) is now read as the new field. No tool reports the dial case. A dial id is a value inside the `dials` list, never a key, so the upgrade tool's walk of the schema never meets it, and the profile checker reads an organization's own dial named `window_bundle_max_hours` as Ratchet's new dial. Above the posture expiry (`posture_expiry_hours`, 168 unless the profile changes it) the checker reports `check.bundle-past-posture-expiry`; at or below it the checker says nothing, and the organization's number silently becomes the window bundle's life. Rename such a key or dial id before running the 3.9.0 profile checker. The rename is an edit to the profile that no patch carries, and `renames` below does not list it (the adopters' upgrade workflow, step 7). Every organization patch still applies, and the model checks accept every patch that 3.8.0's checks accepted: each new rule only warns on an organization's change (item 2). No heading of the six-pager, the strategy brief or part 1 changed its words, and every explicit anchor still lands. Part 4 gains the section "Ratchet's own control plane is built, tested and administered like the systems it protects", and the edition gains Annex A5.
2. Clear the new `-org` warnings now. Five new model-check rules (MC-89 to MC-93) are errors on the shipped design and warnings on what an organization's patches add or change, as MC-86 to MC-88 already were. With them there are ten `-org` warnings, and **in edition 4.0 all ten become errors everywhere**. The new ones, with what clears each:
   - `drafter-free-text-org` (MC-89): a part that drafts a fix, any part other than a person listed among the producers of `PatchCandidate` or `FixPath`, takes no free text from a candidate finding or a disposition. Every relationship into it that carries `CandidateFinding` or `FindingDisposition` must be `content: structured` with `cleared_by` naming its source or target, and that part must be a person or a part with no model in it. Its description of the weakness is the fix brief;
   - `restore-not-held-org` and `restore-needs-control-org` (MC-90): a part marked `applies_injection: true` receives a `RestoreGrant` on a non-optional relationship, and nothing the restore runs through waits synchronously on the control zone for the restore grant, for control or for authorization. Mark a relationship `timing: async` when the cell only reports the restore afterwards;
   - `admin-unbrokered-org` (MC-92): every part in the control zone, the organization's own included, receives a non-optional `AdminSession` (kind control) from `s3.privileged-access-broker`, directly or through a parent;
   - `store-partition-org` (MC-93): every store or registry, the organization's own included, states its partitioning, either `partitioned_by` (a non-empty list of keys) or `unpartitioned` (a reason it holds no evidence content), never both.
   An element whose id starts with `org.` counts as the organization's for MC-92 and MC-93. MC-91, the finding-kind registry check, has no `-org` form: it fails an organization's kind outright, since no organization kind existed before this edition. As in 3.8.0, the upgrade tool compares errors only, so after upgrading run the patch applier and the model checks on its output and clear every `-org` warning.
3. Restate what the organization's patches set on the shipped items this edition changed. A `set` replaces a whole value, so a patch that sets one of these fields drops the new text, and the upgrade tool reports `conflict.changed-upstream` for each one. Restate the new text in the patch and hash the field's new value for `expects`:
   - part responsibilities (31): `s1.context-compiler`, `s1.tool-signal-intake`, `s3.action-control-service`, `s3.approval-service`, `s3.credential-lease-broker`, `s3.key-management`, `s3.local-enforcement-point`, `s3.policy-decision-point`, `s3.policy-release-pipeline`, `s3.privileged-access-broker`, `s3.replay-verdict`, `s4.model-data-gateway`, `s4.qualification-route-registry`, `s4.request-data-gate`, `s5.evidence-intake-validator`, `s5.fix-brief-builder`, `s5.independent-verifier`, `s5.learning-store`, `s5.review-console`, `s6.change-closure-records`, `s6.fix-cap-gate`, `s6.fix-cap-refusal-log`, `s6.hardening-service`, `s6.owner-change-connector`, `s6.regression-catalog`, `s6.release-state-correlator`, `s6.retest-regression-planner`, `s7.dial-register`, `s7.reliability-monitor`, `s7.sampling-service` and `ext.soc-incident-response`;
   - contract descriptions (24): `ActionSpec`, `ApprovalOutcome`, `CandidateFinding`, `ChangeRecord`, `ContextSnapshot`, `DesignLimit`, `ExecutionReceipt`, `FailureClass`, `FindingDisposition`, `FixBrief`, `FixCapRefusal`, `InjectionRecord`, `KeptTestStatus`, `KeyReference`, `LearnedItem`, `ModelRequest`, `ModelResponse`, `PatchCandidate`, `RegressionSpec`, `ReplayVerdict`, `RouteQualification`, `SecretRevocation`, `ServiceIndicator` and `ValidationArtifact`; and the producer or consumer lists of `AdminSession`, `ApprovalOutcome`, `FixBrief`, `InjectionRecord`, `KeyReference`, `RouteQualification`, `SecretRevocation` and `ServiceIndicator`;
   - relationships: `r009`, `r073`, `r092`, `r103`, `r108` and `p07-r1` became `content: structured` with a `cleared_by`; `p25-r10`, `p39-r1`, `p40-r2` and `p40-r9` changed their labels; `p35-r2`, `p35-r4` and `p35-r10` changed their labels and became `timing: cached` (limits and tiers are read from a signed, leased copy); and `p40-r7`, the learning store's grant edge, is now required. A patch that removed `p40-r7` must keep it.
   Twenty-eight shipped stores gained `partitioned_by` or `unpartitioned`; the four that already had `partitioned_by` kept it. No patch could have set the new statements, so they bring no conflict.
   An organization with its own overlay must place the three new parts, or the upgrade reports `checks.baseline` with finding `overlay-missing` for each: `s5.exposed-secret-intake` sits in the control zone and enforces a rule, so it needs `keeps` (the shipped example puts it in the `evidence` account class); `ext.known-exploited-catalog` is an existing system; `people.held-out-assessors` is an identity-provider role kept apart from the producer, verifier and control-plane operator identities. The shipped overlay's entry for `s3.staging-cell` also changed (see Changed).
   Shipped layer entries changed as well, and a held `set_layers` that sets one gets `conflict.changed-upstream` the same way: `quality` on the parts `s3.action-control-service`, `s3.action-broker`, `s3.local-enforcement-point`, `s3.staging-cell`, `s3.replay-verdict`, `s5.learning-store`, `s6.fix-cap-gate` and `s7.dial-register`, and on the contracts `KeyReference`, `ReplayWindowBundle` and `DesignLimit`; and `realization.class` and `realization.examples` on `s3.staging-cell`. Restate the new entry in the patch where it should keep it.
4. Fill the new profile fields that apply. All are optional, and each has an interview question. The profile template now writes `turned_by_role` and `last_turn_evidence` as `FILL` on every dial line, and ships the `frozen` and `disclosure` blocks filled with placeholders:
   - `gate_failure_policy.added_latency_objective_minutes` and `gate_failure_policy.latency_handling` (`dependency-scoped` or `post-deploy`): how much deploy latency the regression stage may add, owed to service teams. Unanswered means 10 minutes, the same as the regression time budget's default. **The organization decides both numbers.** An objective below the regression time budget with no latency handling recorded is `check.latency-below-budget`;
   - `separation.team_ids`: a stable id per team, keyed by the team name as the role fields write it. A renamed team keeps its id, and the impact report then restamps a recorded separation and no longer treats it as stale. Two names sharing an id, or an id that is not a non-empty string, is `check.team-id-invalid`;
   - `current_practice.history.frozen` (`frozen_on`, `confirmed_by_role`, `sha256`) and `current_practice.history.amendments` (`on`, `by_role`, `reason`, `sha256`): the past-findings baseline freezes at phase 2 entry, and every later correction is a dated amendment. Figures that changed with no amendment are `check.baseline-changed`. The escape rate names the baseline version it read;
   - `fix_capacity.remediation_window_days_by_tier` (`crown-jewel`, `critical`, `standard`): a remediation window per consequence tier, with no shipped values. A tier without one uses `remediation_window_days`;
   - `fix_capacity.exploited_window_days`: the days within which a finding matched by a sourced exploitation signal should be fixed. The edition ships no default;
   - the new optional section `disclosure` (`outbound_owner_role` and `policy` required inside it, `deadline_alert_days` optional): who reports weaknesses found in third-party components and under which coordinated disclosure policy. It is recorded and never compared. A finding with an external disclosure deadline passes the fix cap whether or not the section is filled. The profile now has ten optional sections (was nine);
   - the dial `window_bundle_max_hours`: the longest life of a window bundle, which is how long a narrowed limit or a revoked key takes to reach it. It has no default; unset, the posture expiry caps it. Above the posture expiry is `check.bundle-past-posture-expiry`.
   The dial `typed_route_max_calibration_error` now lists the labels each ceiling needs (1,000 at 0.05, 250 at 0.1).
5. Use the finding-kind registry for anything that closes in a way of its own. Each finding has a kind, and the kind says how it closes: its closure check (the check type, the part that judges it with no model, the expected outcome), its kept gate, its recovery measure and what never closes it. The edition ships three kinds: `path` (judged by `s3.replay-verdict`, measured as time to remediate; a finding with no kind is a path finding), `exposed-secret` (judged by `s3.replay-verdict`, time to revoke) and `infra-misconfiguration` (judged by `s6.release-state-correlator` on a read of the live configuration, time to conform), the worked example for infrastructure flaws. Add a kind with the new patch op `add_finding_kind` and an `org-` id; change one, shipped or your own, with `modify_finding_kind`, which takes `expects`. A disposition naming an unregistered kind is refused at intake. If the organization tracks infrastructure misconfigurations today, route them as this kind: a merged or applied change to the infrastructure code alone never closes one.
6. Rework exposed-secret handling to the new revocation proof. Revocation is now proven per credential type by a verification recipe kept in the regression catalog (`CredentialRecipe`): the issuer's status by identifier first; where the issuer offers none, a status probe announced to the detection side, repeated over the issuer's propagation time from a fixed address, counting refused only on the codes the recipe maps to revoked or invalid. One refused attempt no longer closes the finding. Derived sessions and tokens are named and recorded as ended. A type with no recipe closes on the owning team's attestation, labeled attested in every record and measure. The new core part `s5.exposed-secret-intake` replaces the value with a fingerprint before anything stores it and seals it under the owning team's key only when a probe needs it. Closure also needs the detection side's review of use during the exposure window, and unexplained use opens an incident. Phase 2 gains the recipe and announcement units; agree the probe announcement format with the detection side before the first probe.
7. Wire exploitation, interim mitigation and disclosure into the fix cap. A finding matched by a known exploited vulnerabilities catalog listing or by sourced observed exploitation passes the owning team's fix cap and starts the organization's exploited window. The public catalog (`ext.known-exploited-catalog`) is a core input from phase 3. A finding with an external disclosure deadline passes the cap too. Inside a consequence tier, exposure (internet, internal, unknown) and automatability order the work, and none of these signals lowers a posture. The security risk owner may record an interim mitigation on a validated finding, with what holds the path, who applied it and its expiry, proven by replaying the path while it holds; the finding stays open and its remediation clock keeps running. While the fix-cap gate is down, a finding that would pass it anyway goes straight to its owning team and is logged for review when the gate returns; every other finding waits.
8. Plan for Ratchet's own control plane. Ratchet's software and runner and cell images are built on a hosted, isolated build platform with SLSA Build Level 3 provenance, released only through the policy release pipeline with a signature from key management, and started only when their attestation verifies. Self-hosted model weights are released by digest, and a new digest is a new route version that serves nothing until requalified. A team outside the program runs a recurring exercise against the control and evidence planes under scope the security risk owner approves, and its findings enter intake like any other (a phase 3 unit proves the first one ran). Learned items, fix briefs and secret revocation records are signed. A closure or escape attribution resting on provenance below SLSA Build Level 2 is labeled self-attested.
9. Re-read every tailored narrative, brief, plan or slide against the new and changed text:
   - the strategy brief: the opening drops the clause "and we expect each more capable model to find what the last could not"; the fix-capacity bullet says security debt is security's share of the quality debt all qualities pay from one engineering pool, fixing is debt service, and each team's cap is security's share of its debt-service capacity; the claim counts read 49 claims and 27 honest bets (were 48 and 26); the exhibit names its figure FIG-LOOP; the tailoring appendix gains a line on keeping the three depths and recording the thesis version; and three bullets are reworded with the same meaning (the noise reading, the fix-path cost, the escape's cost);
   - the six-pager's main body: "What AI agents change" says the findings are security debt, the security share of the quality debt every quality draws from the same engineering time, and that a finding validated beyond what a team can fix adds interest in lost time without reducing risk, so security must keep its debt from growing through this loop; the regimes trace security debt (growing, paid as it accrues, then arising mostly from new changes); the rejected paths say the fix cap caps security's share of each team's debt-service capacity; the claim counts read 49 claims and 27 honest bets; premise 18 adds the debt reading (CL-49, an honest bet) and the owning teams' reported time lost to security debt; and a few sentences elsewhere (the opening note, phase 1, the "going deeper" map) are tightened with the same meaning;
   - the six-pager: Appendix B's answer "What stops a manipulated agent from doing damage?" now says the label travels on the records field by field; the answer "How do we know approvers are not rubber-stamping?" reads seeded proposals pooled per action class, and per approver only once enough have accumulated; a new Appendix B question asks whether the loop handles findings it cannot replay; Appendix D's threat-model line points to the standards crosswalk; the earned-autonomy paragraph says both labels are checked again at run time. The main body stays within its cap;
   - part 1: the priority paragraph adds SSVC, which decides on exploitation, technical impact, automatability, mission prevalence and public well-being impact with no base score; the fix-path paragraph adds the two new grounds that pass the cap, the ordering inside a tier and interim mitigation;
   - part 2's fix-capacity row; part 3's optional profile sections, its on-call paragraph (what still releases during a freeze, and postmortems) and its typed-routes paragraph (the 90% upper confidence bound, the labels it needs, and where typed routes pay off);
   - part 4: the control tier's "when a control is down, nothing new starts", with a running injection still restored on time by its cell; the fix-cap gate's exception while it is down; the deploy gate's two availability figures (about 99.9% counting the four co-deployed cell parts as one unit, about 99.6% if they fail independently; phase 2 measures which holds) and its latency setting; the limits read from fenced copies; the outsider label carried at run time and what clearing means; the request-data gate deciding first by eligibility; finding kinds, the reworked exposed secret and the infrastructure misconfiguration kind; and the new control-plane section;
   - the outcome and efficiency measures: part 1 now says the escape rate and time to remediate are outcome measures (did weaknesses reach production, how long they stayed open), and phase 3's matched comparison against today's process and a no-agent baseline is the efficiency measure (does an agent beat a script per finding), each answering only its own question; part 4's measures paragraph and the six-pager's answer "How is an escape counted?" say the same. A tailored story that reads a falling escape rate as proof the agents pay, or the reverse, needs rewording;
   - part 1's bullet "Findings already outrun fixes" and the six-pager's illustration paragraph no longer say no enterprise data exists; enterprise vendor data points the same way (the security debt evidence in part 1);
   - part 3's new section "Three settings ship with no number, and each starts from the organization's own data": worked examples that derive a team's fix cap from its verified-fix throughput and its other quality debt, walk an attack injection from notice to a hard stop and its local restore, and derive the kept-test lifecycle settings from the covered code's change cadence and the test's failure history, each with the signal that says to move the setting. Every number in them is labeled as an example worked from stated inputs; none is a default, and none belongs in a profile;
   - the six-pager's field guide: premise rows and opening branches that rest on a claim graded none or weak, and not held, open with the generated mark "Untested", and the premise view and bets tables add "untested" to such a grade; "How to tailor" gains step 10 (keep the set's depths, headings and figures as the adopters' tailoring workflow says, and record the thesis version), and "What to hand back" the thesis version in each tailored document's front matter. The brief's "Keep the form" points to the same workflow;
   - Annex A4's threat-model line, and table A2.1's secret scanning row in phase 2, which now reads "Labeled leads; exposed secrets close once revocation is proven per type" and also cites U-311.
10. Rebuild the eight tools whose specification or fixtures changed, and prove each against its fixtures. Six change behavior:
    - the model checks: rules MC-89 to MC-93 with the error codes `drafter-free-text`, `restore-not-held`, `restore-needs-control`, `finding-kind-path-missing`, `finding-kind-duplicate`, `finding-kind-incomplete`, `finding-kind-judge`, `admin-unbrokered` and `store-partition`, and the five new `-org` warnings (item 2). The tool reads the new element fields `applies_injection`, `partitioned_by` and `unpartitioned`, the relationship field `timing`, and the model's `finding_kinds`. The summary gains `drafter_inputs_checked`, `injection_appliers`, `restore_edges_checked`, `finding_kinds`, `admin_checked_parts` and `stores_checked`. All five rules run in core-only mode too; a finding kind whose judging part was dropped with its module is not reported there;
    - the patch applier: the ops `add_finding_kind` and `modify_finding_kind` (rule PA-23), with shapes checked and content left to the model checks; finding kinds record their provenance like every other item, an added kind's id starts with `org-`, and the report lists finding kinds under `added` and `modified`. The report's `applied` lists the patches that applied even when the run fails, and an added element's `patches` holds the patch's id;
    - the profile checker: the new fields through the schema, and the four checks `check.latency-below-budget` (PC-27), `check.team-id-invalid` and `check.baseline-changed` (PC-26), and `check.bundle-past-posture-expiry` (among the dial rules, PC-15). PC-25 states that the exploited window and the disclosure section are recorded and never compared. `window_bundle_max_hours` joins the dials with no default that never raise `check.dial-missing`. Three changes can flip a held profile's result: an optional key present with the value null is now `schema.required` at its path unless its schema says `nullable` (leave an optional value out by omitting the key); an exception is now invalid when its `reason` is blank after trimming, its `accepted_by_role` is unanswered or empty, its `compensating_controls` is not a list or holds only placeholders, or its `reviewed_with` is not a list; and under PC-11 an empty-string `confirmed_by_role` now refuses with `model.phase1-boundary-unconfirmed`, while a placeholder confirmer no longer does (it is unanswered, as PC-3 says);
    - the impact report: it lists every finding kind a patch adds, removes or changes (IR-21), and the Summary counts them; with `separation.team_ids` it records each side's team ids, and a rename that keeps the id is a restamp (IR-22); IR-20's warning for an accepted patch with no named accepter now fires in every mode; a units file with reused ids reports every one before it stops; and an overlay given by option that is the recorded file keeps its recorded name in input errors;
    - the status report: a unit recorded landed with a `landed_on` after `as_of` is in progress at the cutoff (SR-14), and a landing recorded after the report for its window was written appears once in the next report under a "Recorded late" line, with the new block key `units_recorded_late` (SR-15). The specification now gives every warning's location and text;
    - the upgrade tool: finding kinds re-apply with the applier's rules (UP-24): a `modify_finding_kind` that sets a key that changed upstream conflicts, an added kind whose id the new edition also adds collides, and a removed kind is a removed target. It also resolves a modify against every id an earlier op of the same patch added, so a patch that adds a part and then modifies it applies (3.8.0 reported `conflict.target-removed`); a missing target is `conflict.target-removed` and every other applier error, an account class's missing target included, is `conflict.invalid`; a patch file the applier's reader rejects conflicts whatever its status; a `capability` rename now rewrites whole entries of `provides` and `requires` in the organization's `units.yaml` (UP-5); `version.yaml`'s history is always appended; and the specification now defines the reporting-only files, the schema walk behind `profile.unknown-field` (rule 27) and `checks.unrunnable`;
    Two change no behavior. The readiness specification states that `ready_for` is never 4 with the shipped data. The unit graph's specification lists the fixture keys, and its shipped-units fixture counts changed with the new units.

### Renamed identifiers

```yaml
renames: []
```

No profile field, rule code, element, relationship, contract, unit or interface point that 3.8.0 shipped changed its name. While this edition was built, its new rule numbers, failure scenario ids and one new module interface point (`observed-exploitation-to-fix-cap`) were renumbered or renamed before release; none of those names shipped in 3.8.0, so nothing an organization holds refers to them.

### Changed meaning

- The outsider label is carried on the records at run time. Context items, model requests and responses, candidate findings, validation artifacts, patch candidates, receipts and dispositions each hold a label set (`OutsiderLabelSet`), computed by parts the agents cannot reach; evidence edges clear only the fields the verifier constrains. Before, the label was a design rule with no record to carry it.
- Clearing a label means only that a field can no longer carry instructions. A check with no model in it cannot show that the value is right, so a cleared field may order work and nothing authorizes on it.
- The core's fix drafter reads the weakness only as a fix brief. From a finding or disposition it takes identifiers, statuses, enumerated fields and references. A brief that needs free-text steps or a target's output is written by a person.
- A control that is down stops new effects. A running attack injection still ends at its time limit, because the execution cell holds a signed, single-use restore grant and its timer runs the restore with no control-plane call. The trusted agent's second stop is the service owner's own rollback, named in the runbook.
- An exposed secret closes when revocation is proven for its credential type and a review of its use while exposed finds nothing unexplained. One refused authentication attempt no longer closes it.
- A sourced exploitation signal, and an external disclosure deadline, pass the fix cap, as a finding at or above the consequence line already did.
- A typed route qualifies when the 90% upper confidence bound of its calibration error is under the ceiling. Below the labels that bound needs, the report says the sample is too small and the decision stays on its fallback.
- The deploy gate's added-latency objective defaults to 10 minutes (was 5) and is the organization's setting. Its availability figure is stated two ways, since it depends on whether the four co-deployed cell parts are counted as one unit, and it excludes the staging target.
- Limits, the consequence line and tiers are read from signed copies with a version and a lease. A narrowing is pushed at once, no reader accepts an older version, and a lapsed lease sends grant-only actions to a person.
- A window bundle sees a narrowed limit or a revoked key only when it expires, so its life is its revocation lag; the new dial caps it. A grant inside a bundle already minted is honored until the bundle expires.
- The status report is a snapshot as of its cutoff.
- The baseline is frozen at phase 2 entry, and every comparison names the version it read.
- During a burned error budget, a change whose deny-diff newly allows nothing and a security fix to Ratchet's own parts still release, through the same tests and staged rollout.
- Seeded known-bad proposals test the approval gate itself. Their results are read pooled per action class, and per approver only once that approver's interval is narrower than the drift threshold.

### Added

- Parts: the exposed-secret intake (`s5.exposed-secret-intake`, core, control zone), which fingerprints a found value before anything stores it and seals it only when a probe needs it; the public known exploited vulnerabilities catalog (`ext.known-exploited-catalog`), a core input to the fix-cap gate; and the held-out assessors (`people.held-out-assessors`), the team outside the program that tests Ratchet's own planes. The design now has 106 parts (was 104), 88 of them in the core loop (was 86).
- Contracts `OutsiderLabelSet`, `CredentialRecipe`, `SealedCredential`, `ConformanceRead`, `RestoreGrant`, `ExploitationSignal`, `PriorityInputs`, `MitigationRecord`, `DisclosureRecord`, `ReleaseAttestation` and `PostmortemRecord` (81 contracts, was 70); `FailureClass` gains optional CWE ids, set only by the disposition reviewer; 76 relationships (411, was 335).
- Model fields: `applies_injection` on an element, `partitioned_by` and `unpartitioned` on a store, and the top-level registry `finding_kinds` with the kinds `path`, `exposed-secret` and `infra-misconfiguration`.
- Patch ops `add_finding_kind` and `modify_finding_kind`.
- Model-check rules MC-89 to MC-93, nine error codes and five `-org` warnings, and their fixtures (item 10).
- Profile fields and the optional section `disclosure` (item 4); the dial `window_bundle_max_hours`; the consistency checks `check.latency-below-budget`, `check.team-id-invalid`, `check.baseline-changed` and `check.bundle-past-posture-expiry`.
- Work units U-300 to U-305, U-310 to U-317, U-320 and U-321, U-330 to U-337, U-340 to U-347, U-350 to U-353 and U-360 to U-362: 275 units (was 236); by phase 26, 95, 86, 49 and 19.
- Failure scenarios F95 to F121, each with its runbook: 118 scenarios (was 91).
- Service levels: injection restore, clearing decision time, fix brief age, fix path wait and revocation checks left unknown. Measures: clearing gate health, human gate load, fix brief sources, label coverage mismatches, time to conform, skipped replay misses and typed route calibration. Operability: the grain of a declared dependency, the change freeze and Ratchet's own postmortems, opened by triggers set before any incident.
- Module interface points: `admin-in` on the tool-portfolio, consequence-gates and paved-road modules (administrative sessions from the privileged access broker), and `observed-exploitation-to-fix-cap` on the consequence-gates module.
- Annex A5, the standards crosswalk: where Ratchet's units, parts, rules and failure scenarios meet SSDF 1.1, SP 800-218A, the AI RMF and its generative AI profile, SAMM, BSIMM, SSVC, MITRE ATLAS, the OWASP LLM and agentic lists and MAESTRO, each row graded full or partial. Full covers the work inside the loop and is never a conformance claim; every external id is checked against a list built from each framework's primary document.
- Part 4's section "Ratchet's own control plane is built, tested and administered like the systems it protects", and an Appendix B question in the six-pager.
- Glossary terms: finding kind, infrastructure misconfiguration, quality debt and debt-service capacity.
- The measure `team_time_lost_to_security_debt`: owning-team time lost to security debt, from a short periodic survey of the team, beside what the flow ledger shows of the same time, and beside time lost to the rest of its quality debt where the organization surveys it. A tailored measures section quotes it where the teams measure it.
- Decision-log rows 51 to 63.
- Views `design-change-41` to `design-change-47` in `model.yaml`, one per design change of this edition.
- Two build checks on the authors' side, which a tailored design can run the same way: every critical path's recovery is consistent (no fail-closed part waits synchronously on a slower part), and every part has a failure scenario, a runbook and a service level. A third checks every crosswalk id.
- The thesis is now versioned separately from the edition: the claim, the North Star, the three regimes and the premise register carry their own version (major when the claim changes, minor when a premise or its evidence changes, patch for wording) and a short thesis changelog, placed ahead of the edition entries in this file. Edition 3.9.0 builds on thesis 1.1, and every stamp names it beside the edition number.
- Worked examples, with derivation recipes and no shipped numbers, for the fix cap, attack injection from notice to a hard stop, and the kept-test lifecycle (part 3), and a step in the fill-profile workflow that derives each from the organization's own records.
- A premise grade mark: wherever the edition lists premises or the field guide's opening branches (the six-pager's register and branch table, Annex A1's bets table, the premise view and the bets tables), a premise resting on a claim graded none or weak that does not hold reads "Untested", generated from the evidence ledger. A build check fails a listed premise that lacks its mark or names a claim it does not rest on.
- Stable figure ids (FIG-LOOP, FIG-PLANES, FIG-PART-MAP, FIG-CONTROL-BOUNDARY, FIG-PROVIDER-LADDER, FIG-CORE-MODULES, FIG-ESCAPE-CATCH, FIG-SWEEP-LOOP), cited in the text of every file each figure appears in and in each SVG figure's caption. A new file, `FIGURES.md`, also inside `ratchet-complete.md`, gives each figure's source for agents: the Mermaid for figures drawn in Mermaid, a Mermaid equivalent of each generated SVG figure with the same nodes and edges, and a structured description, marked illustrative, for the sweep against the loop. The complete file's map gains a figure index (id, title, where it appears, source form). The build fails when a figure's Mermaid source differs from the figure it shows, when a design figure's edges leave the model, or when the text cites a figure id outside the files it appears in. The printed figures are unchanged.
- How to cite an edition, on the start-here page and in the complete file's map: cite the edition and thesis versions and the tagged reading packet, never the live page link, which always shows the latest edition.

### Changed

- The staging cell's targets under test run in a sandboxed runtime or behind a separate VM, cluster or account boundary; a namespace alone is too weak for attack payloads. The realization examples and the shipped overlay's `keeps` changed with it.
- The request-data gate decides first by eligibility (which sources and data classes a task may send to which route); content detection is a second layer, and the gate is one of three controls on the way out, beside the quarantine and the route registry.
- Shipped units changed: U-253, U-261, U-262, U-270 and U-272 gained prerequisites (`cap.injection-restore-local`, `cap.exposed-secret-intake`, `cap.credential-recipes` and `cap.labels-carried-field-by-field`), and U-188, U-203, U-262, U-270 and U-272 changed their checks. A `modify` that sets `requires` must carry the new prerequisites.
- Counts a tailored page may quote: units by kind are 170 code, 49 agreements and 56 measurements (were 141, 44 and 51), and 123 give feedback within minutes (was 109); the core loop has 99 elements, 88 parts and 11 roles (was 96, 86 and 10); the evidence ledger has 49 claims, 27 of them honest bets (was 48 and 26).
- The availability tables in part 4 and R3 show, for each path with co-deployed parts, the figure if those parts fail independently (approve-and-run about 99.05%, deploy gate about 99.60%).
- The fix capacity saturation measure reads the window for the highest tier a finding's path reaches; the escape rate names the baseline version; the kept test suite health counts tests that cannot be re-proved, never as no longer failing.
- The interview guide gains the `disclosure` row and new questions under `separation`, `gate_failure_policy`, `fix_capacity` and `injection`. The change-design workflow covers adding a finding kind, and fixing the units file before an urgent patch.
- The start-here page lists Annex A5.
- The edition and thesis versions print on the first page of every document: each part's heading band carries them, and each PDF's title names them. A build that is not a tagged release labels its versions as drafts everywhere they show (for example "edition 3.9.0-draft", "thesis 1.1-draft"), and its packet files carry the draft label in their names. The release build, and a rebuild at the release tag, print the clean versions. Machine-read edition fields (the kit manifest, the skill's data headers and expected results) keep the bare version.
- The adopters' tailoring workflow cites each figure by its id and points to `FIGURES.md` for each figure's source.
- The strategy brief carries the debt argument: in its fix-capacity bullet, security debt is security's share of the quality debt all qualities pay from one engineering pool, fixing is debt service, and each team's fix cap is security's share of its debt-service capacity. The class-fix bullet keeps its reason (one class-level fix retires many findings). Re-read a tailored brief's measures group against it.
- The adopters' tailoring workflow gains most of its length, in six new sections: "The tailored set keeps three depths, and each depth has one job" (the order of the brief, the six-pager and the reference, and what stays fixed, what adapts and what never drops); "Headings state assertions, and the set names the thesis version it adapts" (record the released thesis version, never a draft label, and re-tailor by the thesis's major, minor or patch change); "Each figure is kept, adapted or dropped, and design figures come from the organization's own model" (a table for every figure, and how to regenerate design figures with their checks); "Quality debt and debt-service capacity sit where the shipped set puts them"; "The tailored set reads clearly to someone outside the program" (plain words, terms defined where they first appear, internal codes never standing in for names in prose and figure ids kept to captions and references, the second-read test fixed by restructuring, numbers that name their source and round down, visible evidence grades, and a cold read of each whole document, with the second-read test for a single passage); and "Run this checklist before the set goes to the sponsor" (ten items).
- The fill-profile workflow's step 9 and part 3's fix-cap example state the unit conversion (a window in days over a throughput per month: divide the days by 30) and which window applies (the window for the consequence tier the team's findings mostly reach, the shortest tier's window when they are spread, the single window when none is set by tier). The upgrade workflow says that a reopened patch stays out of the output until a person accepts it again by the fix-patch workflow's reopen path, and that renaming a profile key or dial id the new edition claims is a profile edit that no patch carries.
- In `FIGURES.md`, the control boundary's Mermaid equivalent names each node by its model element id (for example `s3.action-control-service`), with the readable label kept, and the build checks each drawn edge against the relationship between exactly those two parts; the provider ladder's names each step by its profile rung value (`frontier`, `self-hosted`, `no-agent`, `manual`), checked against the schema.

### Fixed

- Part 1 said no enterprise data on unfixed findings existed, while its own security debt paragraph cites enterprise vendor data (Veracode 2024, Cyentia). The bullet now points to that evidence, and the six-pager's illustration paragraph reads the same way. The sentence is outside the thesis text the thesis version covers, so the thesis stays 1.1.
- The status report could list a unit in "What is next" as landed when its `landed_on` was after `as_of`. Such a unit is now in progress at the cutoff, and its landing counts once, in the report whose window holds the date.
- Three synchronous edges added in 3.5.0 made fail-closed top-tier parts wait on lower-tier parts, so the recovery-consistency rule failed on the shipped design from 3.5.0 to 3.8.0, and no build step ran it. Limits, the line and tiers are now read from fenced, leased copies, the credential recipe edge is cached likewise, and the build runs the rule.
- The edition said a fix brief was the only form in which a fixing agent learns of a weakness, yet the core's own fix drafter read accepted findings directly. It now receives only fix briefs, and MC-89 holds it there.
- The outsider label had no run-time carrier: the design said what keeps the label, yet no record held it. Every record that crosses from the reasoning zone now carries its label set, and the learning store recomputes it at write and at retrieval and reports mismatches.

### Known issues

- The upgrade tool cannot rename a finding kind: an organization kind whose id the new edition renames is reported as a removed target, so re-add it under the new id by hand.
- The impact report does not mark a finding kind's judging part as touched when the kind changes, so a change to a kind's closure check brings no separation or should-never code into scope through that part. Read the judging part's separations yourself when a patch changes a kind.

### Unchanged

- The four rules, every existing rule code and profile field, the acceptance gates, the readiness of every phase, every claim's text and grade, the counts of rule codes (57) and trade-off cards (11), every heading of the six-pager, the brief and part 1, and every explicit anchor. The strategy brief's headings, ask and stop conditions did not change; its text did (see Changed).

<a id="changelog-3-8-0-2026-10-19"></a>
## [3.8.0] - 2026-10-19

### What an agent holding 3.7.0 should do

1. Nothing stored needs renaming, and every 3.7.0 profile and organization patch stays valid: the model checks accept every organization patch that 3.7.0's checks accepted (item 2), and no readiness answer changes, because the new profile part is optional and no phase waits for it. One held file may still need a change: a units file with an `add` that reuses a unit id (item 4), which 3.7.0's unit graph already refused. Fix it before regenerating any patch's risk section, because the impact report now refuses to run while it stands. No heading of the six-pager, the strategy brief or part 1 changed its words, and every explicit anchor of those pages still lands. In reference R2, two headings merged into one: "Every part by plane and trust zone" and "Every part by quality tier and failure behavior" are now "Every part by plane, trust zone and quality tier", so the anchors `r2-every-part-by-plane-and-trust` and `r2-every-part-by-quality-tier-and` are gone and the merged section's anchor is `r2-every-part-by-plane-trust-zone`. R2's relationships section now has the fixed anchor `r2-relationships`, and its count stays in the heading text only. The counted anchor (`r2-relationships-322` in 3.7.0) is gone, so the anchor no longer moves when the number of relationships changes. Relink anything that cited those three anchors.
2. Name the outsider label's clearing in the organization's own patches now. Three new model-check rules (MC-86 to MC-88) hold that anything a model writes after reading outsider text keeps the outsider label until a person or a check with no model in it clears it. In this edition they are errors on the shipped design and warnings on what an organization's patches add or change: the same five codes with `-org` appended (`label-uncleared-org`, `label-cleared-by-model-org`, `fix-brief-author-org`, `learning-writer-org`, `learning-unchecked-org`), and the checks still exit 0. **In edition 4.0 they become errors everywhere, and a patch that only warns today will then fail.** The upgrade tool compares errors only, so its report shows none of these warnings and calls a patch whose only new findings are `-org` warnings clean. After upgrading, run the patch applier and the model checks yourself on the upgrade's output and clear every `-org` warning now, as the upgrade workflow's new step 6 says:
   - every relationship a patch adds with `content: structured` out of a part exposed to outsider text names its clearing in the new field `cleared_by`, with `by` (the relationship's source or target, which must be a person or a part with no model in it) and `check` (what the clearing does). A check with no model clears only fields it limits to a fixed set or resolves against a store; free text stays labeled until a person clears it, and each clearing is recorded at run time with who or which check and its version, when, and the fields cleared;
   - a description of a weakness sent to a fixing agent (the new contract `FixBrief`) comes only from a person or from a part with no model in it that never reads outsider text;
   - nothing the organization adds writes the learning store from an agent or from a part on the model path, and anything read out of the store travels on a structured relationship whose clearing is the store itself.
   A finding is the organization's when the relationship it sits on, either end of it, or the part its clearing names was added or modified by an organization patch, or when it arises only through a relationship the organization added (for example, an added relationship that carries outsider text into a shipped part exposes that part's shipped structured relationships).
3. Check the organization's patches against the shipped items this edition changed. A patch that sets one of these fields whole drops the new text, and the upgrade tool reports `conflict.changed-upstream` for each key a patch sets that the new edition changed; restate the new text in the patch, then hash the field's new value for `expects`:
   - contract descriptions: `FindingDisposition` (the optional `finding_kind`, item 6) and `EscapeRecord` (time to revoke stands as the time to recover of an escaped secret); `AutonomyGrant`'s `consumed_by` gained the learning store;
   - part responsibilities: `s3.replay-verdict` (it also records the revocation check) and `s6.change-closure-records` (an exposed secret closes on that check);
   - relationships: `r019`, `r021`, `p14-r15`, `p30-r6`, `p30-r7`, `p27-r2`, `p18-r4` and `p17-r3` each gained `cleared_by`, and `p18-r4` and `p17-r3` also changed their labels (the lead reader's bounded summary keeps the outsider label and never reaches producer context).

   An organization with its own overlay must also place the two new parts, `s5.fix-brief-builder` and `s5.learning-store`, or the upgrade reports `checks.baseline` with finding `overlay-missing` for each. Both sit in the control zone, so each enforces a rule and needs `keeps`. Place them with a patch, `set_layers` with each part's `overlay` entry; the shipped example puts both in the `evidence` account class.
4. Use `modify` to change a shipped unit in the organization's units file. An `add` whose id is already a unit, shipped or added earlier in the same file, is now refused by the three tools that check the file: the unit graph already refused it, and now the impact report (`IR-E-input` at that id) and the status report (`SR-E-input` at `org/units.yaml:<id>`) refuse it too and write no report. The upgrade tool also reads the file, only to apply renames, and does not refuse it, so run the unit graph after upgrading. In 3.7.0 the status report replaced the shipped unit with the added one and the impact report kept the shipped one, so a units file that relied on either reading must move the change to `modify`. Fix the units file first: while the duplicate stands, the impact report writes no risk section for any patch.
   A `modify` replaces each key it sets whole, so set only the keys the organization changes, and carry over every prerequisite and capability the shipped unit now has when setting `requires` or `provides`. Restating the whole held unit drops what this edition added. One shipped unit changed: U-205 (phase 3's remediation measures) now also requires `cap.past-findings-gathered`. No other shipped unit gained or lost a prerequisite, capability or separation. The new units bring new capabilities that an organization unit may now require: `cap.past-findings-gathered` (U-260), `cap.exposed-secret-fix-path` (U-261, which also separates the fix owner from the verifier), `cap.revocation-verified` (U-262), `cap.time-to-revoke-reported` (U-263), `cap.fix-brief` (U-270), `cap.fix-brief-to-agent` (U-271, secure-creation module) and `cap.learning-provenance-checked` (U-272).
5. During phase 1, gather past findings and incidents into the new optional part of the current-practice map, `current_practice.history`: the period (`period_start`, `period_end`), every source read (`sources`), the deployments in the period (`deployments`, null when deployment records do not reach back), and per weakness class the findings and how many reached production (`classes`), with the role that checked the figures against their sources in `confirmed_by`. The people who keep the map gather them (new phase 1 unit U-260), and the escape rate's starting point and the evaluation report's before-figures are read from them, labeled as drawn from past records. Phase 3's remediation measures (U-205) now require them. The profile template carries the part with `FILL` and null placeholders; delete it until it is gathered. The interview's `current_practice` row and the current-practice workflow ask for it.
6. If the organization scans for secrets, route an exposed secret as a finding of its own kind (`finding_kind: exposed-secret` on its disposition; absent still means `path`). Deleting the string does not close it: the owning team revokes and rotates the credential through its fix path, the replay verdict check, which uses no model, records one authentication attempt with the old credential refused, and only then does the finding close as path broken. The kept test is the scan rule that blocks the same secret's return. No agent revokes, rotates or holds the credential, and records carry its fingerprint and never its value (the new contract `SecretRevocation`). Report its **time to revoke**, detection to the old credential failing, in place of time to remediate. New units U-261 and U-262 (phase 2) and U-263 (phase 3). Rebuild table A2.1's secret scanning row from the new generic row (item 8).
7. Re-read every tailored narrative, brief, plan or slide against the new and moved text:
   - the containment limit, new in the six-pager's confidence section, part 1 (after the controls) and the rule 1 trade-off card: keeping authority outside the agent bounds what any part may do but cannot say whether an application's own permissions are right; a view-only role that can approve invoices breaks no boundary, and only a test against what the role was meant to allow, which the loop runs, catches it;
   - the inherited outsider label, new in the six-pager's earned-autonomy paragraph (what the loop learns keeps its labels, checked again when read back), its Appendix B answer "What stops a manipulated agent from doing damage?", Appendix A4's leads module, part 1's earned-autonomy paragraph, part 3's section on leads and its account of what a fixing agent receives, and part 4's learning store;
   - exposed secrets in part 4, and the phase 1 baseline in the six-pager's plan section, part 2, part 3 and the brief's lead-in before phase 1 ("in phase 1 add past findings and incidents as the baseline");
   - the six-pager's main body was tightened back to its cap of 3,800 words after these additions. Twenty sentences were shortened with no change of proposition. A twenty-first, in the opening, had lost its claim that leaders' worry about the whole backlog is new, and the clause "in a way they did not before" is restored as in 3.7.0. The one deletion is "The phase table lists every condition of each test" at the end of the phases 2 to 5 paragraph, which the phase road's caption already says with the same link. A tailored six-pager that quoted the longer wording may keep it.
8. Rebuild table A2.1 for the organization from the changed generic rows: secret scanning now reads "Labeled leads; an exposed secret closes once a model-free check shows revocation" and "Yield sampled per rule; time to revoke reported for each secret" in the two phases that changed, and incident reviews gain "Past incidents gathered into the current-practice map as the baseline" in phase 1 (was "no change"). The citations changed with them, in part 2's full table: secret scanning's phase 2 cell cites U-117, U-118, U-261, U-262 and `s3.replay-verdict` (it cited `leads.as-coverage`, now dropped), its phase 3 cell cites U-121, U-122, U-263 and the `tool-portfolio` module (U-143, the clause on developers getting only leads above the bar, is dropped), and incident reviews' phase 1 cell cites U-260. The six-pager's compact table split its row "Static analysis (SAST); Secret scanning" into two rows, one per practice, because their cells now differ.
9. Redraw the figures a tailored page reuses (item list under "Changed"): the loop (diagram A1) now colors each step by who acts, and its caption in the six-pager, part 1 and the brief gained two sentences; the control boundary, the planes map, the part map and the provider-degradation ladder are redrawn; three illustrative figures are new. Appendix A6's paragraph is now the degradation ladder figure. Its caption carries the 3.7.0 paragraph's steps in words, so a text-only reading keeps them, and adds one sentence from part 3: each test-drafting agent declares the lowest step it can run on.
10. Rebuild the seven tools whose specification or fixtures changed, and prove each against its fixtures. Three change behavior: the model checks (the new rules), the impact report and the status report (the duplicate `add` refusal); the profile checker also reads the new profile part through its schema. The unit graph, the patch applier and the readiness tool change no behavior. Blind builds of this edition's drafts showed where builders still had to guess, and each specification now states what the reference tool does at those points:
    - the model checks: rules MC-86 to MC-88 with the five error codes `label-uncleared`, `label-cleared-by-model`, `fix-brief-author`, `learning-writer` and `learning-unchecked`, located at the relationship, and their five `-org` warnings (item 2). The tool reads three new fields: `cleared_by` (`by`, `check`) on relationships, `learning_store` on elements, and the patch applier's `patches` list, which marks an organization item. The specification defines a part with no model in it, runs the three rules in core-only mode too, adds `label_clearings_checked`, `fix_brief_edges` and `learning_stores` to the summary, and now lists error codes and warning codes separately. Eleven new fixtures; `fixture-mc-boundary-decision.yaml` now also expects `label-cleared-by-model` at `p27-r2`. When it judges again without the organization's relationships to decide whether a finding is the organization's, it leaves them out of the outsider-label spread entirely, so an organization relationship marked `content: untrusted` exposes nothing in that judgment. The quality coverage check reads tier and failure mode on element entries only; a contract entry has the shape `[kind, note]` and is checked for its key alone. The shipped-model fixtures no longer claim zero warnings (the shipped overlay reports its proprietary swap points and cross-region parts as warnings by design, 15 of them) or pin the core's element and relationship counts;
    - the impact report: the duplicate `add` refusal (item 4) is a behavior change, with a new fixture. The rest states what the reference already did: the shape of `critical_paths.paths` in `quality.yaml`; `card` names the card whose `codes` holds the code whatever its basis (the first in file order when two do, null when none does), so `fixture-ir-modify-owner.yaml` now expects the card on its direct codes; and a removed element is listed under Placement from its account class to none (`fixture-ir-remove-element.yaml`). Its output is now stated in full: the ops block is read only from the patch's `## Ops` section, so the block the tool writes under the Risk heading never counts as a second one; a writing or print run applies the patch under report whatever its own Status says; a card's `codes` is a mapping keyed by code; the Summary appears exactly when the empty-patch warning does not; the section is titled "Should-never codes that may need an exception"; only set fields list added and removed members, and a changed contract's fields carry `field`, `before` and `after`; changed fields follow the key order of the item before the patch; `written` is true whenever a writing run with no error writes the file, even unchanged bytes; messages go to standard output, after the Markdown in print mode; touching `s6.change-closure-records` brings in the closure acceptor and fix author separation with its own reason line; the recorded block is the first yaml block under the heading that parses to a mapping holding `impact_report`, and its judgment lines are defined by indent; check mode matches a block that differs only in list order; and each input error's location is named;
    - the status report: the duplicate `add` refusal (item 4) is a behavior change, with a new fixture. With no previous report, the "since the last report" window is open below for all three of its uses (units landed, phases completed, and the effort rows behind `SR-W-verification`); `fixture-sr-complete.yaml` now tests it. The specification also states that `units_retired` lists every retired unit of the unit list in natural order, whatever the window, since a retired unit carries no date; that a complete or not-started row, having no proposed color, never raises `SR-W-override`; that numbers in the YAML block take their shortest form (`5`, never `5.0`); and which fields with listed values `SR-E-input` refuses (unit state, test result, acceptance state and stop condition state) and which it reads as they stand. The fixture header now also checks recovery slots on every yellow row;
    - the unit graph: no behavior change. The specification now says a shipped unit is changed with `modify`; that only a YAML boolean sets `contract_shape_ok`, so the string `"true"` counts as missing, and that `contract_shape_ok: false` needs `shape_gap` whether or not UG-11 applies; that after `UG-E-stuck` the remaining units get no pull layer and leave the phase model comparison; that `unordered_separators` excludes transitive prerequisites and dependents; whose phase each finding text names; and that fixture keys compare by their text (`1` and `"1"` are one key). The shipped-units fixture's counts changed with the new units, and the fixture format now compares mappings key by key at every depth, mappings inside lists included, and lists by length and item by item in order;
    - the patch applier: no behavior change. `overlay.unrecorded-file` never reports the overlay in use however it was found, nor any file when the record's folder is the shipped data's own folder; when several patch files share a number, each gets one `file.duplicate-id` error located at that file; the output example now shows an added element. Overlays are named by file name alone (`overlay-old.yaml`, never a path) in `overlay.unrecorded-file`; a patch whose Status is invalid is never `preview.invalid`, since `status.invalid` already stops it; and the run-level checks run in a stated order (options, shipped model, patch directory, version record, recorded overlay, layer files), the first failure stopping the run;
    - the profile checker: it must validate the new `current_practice.history` against the schema. PC-3 now names the six absence warnings that wait for a settled section (`warn.no-crown-jewel`, `warn.no-tools`, `warn.no-road-assets`, `warn.no-idp`, `warn.fix-cap-default-unset`, `warn.injection-detection-side-unset`); every other absence warning, `warn.escapes-unset` among them, fires as soon as its condition holds. A plane's build-or-buy set holds every part of that plane in the model, a part of a switched-off module included; a core dial whose bound is null raises no `dial.bound-looser`; the shared-leader warning sits at `ownership` and the third-party warning at `ownership.q2_runtime_producer`; progressive mode's example of a held schema finding is now written at its real location, `separation` (it read `profile.separation`); and a key absent from a fixture's `expect` is not compared;
    - readiness: its specification now states that it validates a section's value as it stands in the file, so list indices in `open_fields` match the file; that confirm text drops every `**`; that the profile checker is built and proven first, because every readiness fixture compares `errors_to_fix_first` and `exceptions` with the checker's findings; and that an open item with no answer at all names the section's own path in `open_fields`, that the five open paths of the `phase_1_boundary` example come from schema validation, and the fixture format's `profile_text` (a profile that must fail to parse) and `location` in `errors_to_fix_first`, matched exactly when named, and `exceptions` (each entry's `code` and `declared`). Five existing fixtures now also check the answered-section count, and five fixtures are new: an applied exception, a declared architecture exception and an expired one, and exit 2 on a file that is not valid YAML and on one that is not a mapping. Rebuild against the new text and rerun.
    The upgrade tool's specification and fixtures are unchanged; it applies patches with the patch applier's rules, so rebuild it on the 3.8.0 applier text.

### Renamed identifiers

```yaml
renames: []
```

No profile field, rule code, element, relationship, contract or unit id changed. The two merged R2 headings and the moved anchors in item 1 are prose and generated anchors, never identifiers.

### Changed meaning

- The outsider label is inherited. Text a model writes after reading outsider text is outsider text until a person or a check with no model in it clears it, and a check clears only the fields it limits to a fixed set or resolves against a store. Before, the design said what a reader model could not do and said nothing about what it wrote.
- An exposed secret is fixed when the old credential stops working. Removing the string no longer reads as the fix, and its time to revoke stands in for time to remediate (and, when the secret reached production, for the escape's time to recover).
- A duplicate `add` in an organization's units file is an error everywhere; `modify` is the one way to change a shipped unit (item 4).
- Rule 1's trade-off card says what containment cannot do: the boundary bounds what a part may do and cannot say whether the authority model it enforces is right.

### Added

- Parts: the fix brief builder (`s5.fix-brief-builder`), which builds a fixing agent's description of a weakness by rule from the weakness the signed proof condition names and the reproduction run with no model, never the proof condition's expected outcome, with a form for a person to write one instead; and the learning store (`s5.learning-store`), written only by disposition review, which checks each item's provenance again when it is read and withholds an item with no provenance, an uncleared label or a lapsed grant. Each quarter the store reports its flagged retrievals and the share of them that trace to untagged stored items, a share that should fall. The design now has 104 parts (was 102), 86 of them in the core loop (was 84).
- Contracts `FixBrief`, `LearnedItem` and `SecretRevocation`; the optional `finding_kind` on `FindingDisposition` (`path` or `exposed-secret`); thirteen relationships (335, was 322).
- Model fields: `cleared_by` on a relationship (`by`, `check`) and `learning_store` on an element.
- Work units U-260 to U-263 and U-270 to U-272: 236 units (was 229); by phase 26, 80, 63, 48 and 19.
- The profile part `current_practice.history` (item 5).
- Model-check rules MC-86 to MC-88, their five error codes and five `-org` warnings, and their fixtures. The kit's list of design checks gains the outsider-label check.
- The secure-creation module's interface point `fix-briefs`: the fix brief it receives, aligned from the start.
- The measure time to revoke.
- Glossary terms: exposed secret, fix brief, learning store.
- Figures: three illustrative thesis figures with no data behind them (a sweep against the loop over model releases, in the six-pager's regimes section and part 1; the invoice weakness as an escape and as a catch, in the six-pager's closing scene and part 1's measures; the core and its four plug points, in Appendix A4 and part 1) and the provider-degradation ladder in Appendix A6.
- A build check that holds the six-pager's main body to 3,800 words, counted from the source up to Appendix A with each generated block counted as one word.
- Decision-log rows 46 to 50.
- Views `design-change-39` (an exposed secret closes on a model-free revocation check) and `design-change-40` (the inherited outsider label) in `model.yaml`. An organization patch may extend them with `add_to_view`, and a tailored page may draw from them.
- Reference R2's relationship table gains the column "Cleared by", which names each relationship's clearing (`cleared_by`: the part and what its check does), so the shipped clearings are readable without the model file. R2 also gains the section "Contracts that cross between planes" (anchor `r2-plane-crossings`): for each pair of planes, the contracts that cross and the relationships that carry them, generated from the model.

### Changed

- The loop diagram colors each step by who acts (agent, person, control outside the agent, owning team) and draws the ratchet's tooth: a later change that reopens the weakness fails at the kept test. The control boundary is one path in three columns, drawn and checked against the model. The planes map in part 4 shows the primary flows only; it lost its contract labels and its per-plane part and swap-point counts, which part 4's planes table and R2 still give. The six-pager's Appendix A4 has a planes table and no map, so nothing there changed. Reference R2 lists every contract that crosses between planes in a new section. The full part map is one map styled by quality tier, in R2 (item 1).
- The figures are generated and checked against the model, and the build stops when a figure no longer matches it: a control-boundary path edge goes missing, an edge from an agent or the model to the execution cell appears, a primary flow drawn on the planes map disappears from the planes view, or a module of the core figure changes or leaves the design.
- Appendix A2 drops its five-box chain of the phases, which repeated the phase road, and points to the phase road instead.
- The six-pager's main body was tightened back to 3,799 words (item 7).
- Counts a tailored page may quote: phase 3's controls on the phase card are 8 first in use and 12 built (were 6 and 10); part 2's units by kind are 141 code, 44 agreements and 51 measurements (were 136, 44 and 49), and 109 give feedback within minutes (was 108); the evidence plane has 19 parts (was 17) in part 4 and R2; and the core loop has 96 elements, 86 parts and 10 roles (was 94).
- Reference R1's design-check row for the outsider label now says it fails on the shipped design and only warns on what an organization's patches add or change (the same code with `-org` appended).
- The strategy brief's lead-in before phase 1 said past findings and incidents were gathered as the baseline before phase 1 starts; it now says they are added in phase 1. Parts 2 and 3 say they are gathered during phase 1, before phase 2 starts.
- R2's relationships heading has the fixed anchor `r2-relationships`; the counted anchor is gone (item 1).
- Table A2.1's secret scanning and incident reviews rows (item 8).
- The rule `bought.without-org-controls` now says which part entries override their plane's: one whose choice is build, buy, reuse or undecided. The checker already behaved this way.
- The tool specifications listed in item 10 state the points their builders had to guess.
- The upgrade workflow gains a step after the upgrade tool runs: run the patch applier, the model checks and the unit graph on its output, read the warnings, and clear every `-org` warning now. It also says to fix the units file before regenerating risk sections, to carry over a shipped unit's prerequisites and capabilities in a `modify`, to revise a conflicted patch by reopening it under its own id, to place each new part in the organization's own overlay with `keeps` where it enforces a rule, and that a changelog item naming a contract field describes a record the running loop writes, which no profile field holds. The change-design workflow treats a `-org` warning as a failed check. The tailoring workflow says what to do when the current-practice map has no steps yet, and how an organization's unit change reaches the table A2.1 cells that cite the unit.

### Fixed

- The narrative promised that the escape rate's starting point comes from past findings and incidents, yet no unit gathered them and the profile had no place for them, so phase 2 could start with no baseline (item 5).
- One organization units file gave three different unit lists in the unit graph, the impact report and the status report (item 4).
- Specification text that was wrong or silent, found by the 3.7.0 blind builds: the status report's reading of a window with no previous report; the impact report's card naming, critical-path shape and placement of a removed element; and the profile checker's account of which absence warnings wait for a settled section (item 10).
- Specification text that left builders guessing, found by the blind builds of this edition's drafts: the impact report's output, the patch applier's overlay naming and check order, the status report's retired units and override warnings, the profile checker's plane sets and null dial bounds, the model checks' judgment without organization relationships and their quality tier checks, and readiness's answered counts, exceptions and exit 2 (item 10). The profile checker's progressive-mode example now gives the location as `separation` (was `profile.separation`), and the model checks' shipped-model fixtures no longer claim zero warnings or fixed core counts.
- Reference R2's relationship table showed no id for the relationships that design changes added, such as `p14-r15` (223 of the 335), because the edition's scrub took them for citations. Every id now shows, in that table and in the new plane-crossings section, so each relationship this changelog names can be found in R2.

### Known issues

- The status report can list a unit in "What is next" with state `landed` when its `landed_on` is later than `as_of`: such a unit is not landed at `as_of`, so it is not filtered out, yet the specification's values table allows only planned, in-progress and blocked there. A tool built from the specification may do the same. The fix is queued for the next edition.

### Unchanged

- The four rules, every existing rule code and profile field, the acceptance gates, the readiness of every phase, every claim's text and grade, the counts of failure scenarios (91), rule codes (57) and trade-off cards (11), every heading of the six-pager, the brief and part 1, and every explicit anchor apart from the three in R2 (item 1). The reference patch applier, unit graph, profile checker, readiness tool and upgrade tool behave as in 3.7.0.

<a id="changelog-3-7-0-2026-10-19"></a>
## [3.7.0] - 2026-10-19

### What an agent holding 3.6.1 should do

1. Nothing stored needs renaming, and every 3.6.1 profile and organization patch stays valid. No readiness answer changes: the new profile fields are optional, and no phase waits for them. Every explicit anchor of 3.6.1 still lands. The two retitled headings (item 2) lose the ids the pages generated from their old words, `an-organization-begins-with-one-weakness-three-people-and-six-weeks` in the six-pager and `phase-1-is-a-feasibility-test-and-its-checks-are-written-before-it-starts` in the brief; link the six-pager's plan section by its new anchor `the-plan`.
2. Re-read every tailored narrative, strategy brief, plan or slide that quotes a heading of the six-pager, the brief or part 1, and replace the retitled ones:
   - Six-pager: "An organization begins with one weakness, three people and six weeks" is now "Five phases widen Ratchet only on evidence, and the first takes one weakness, three people and six weeks". New headings: "What backing phase 1 commits you to" (closing the plan section), "Each section goes deeper in one file of the complete edition" (after the closing scene), "For builders" (a subhead in Appendix A) and "A2.1. The security practices an organization already runs keep running, and each takes a defined role as the phases land". Every other heading keeps its words, though several sections moved (item 3).
   - Strategy brief: "Phase 1 is a feasibility test, and its checks are written before it starts" is now "Five phases lead toward just-in-time fixing, and we ask only for the first".
   - Part 1 (the thesis): no heading changed its words. "Ratchet is one loop of twelve steps, governed by four rules that should never be broken without a recorded decision" moved from after the claims section to directly after the problem section, so text that cites part 1's order needs updating.
3. Rebuild the tailored six-pager on the new structure. Its main body is now about six pages (about 3,800 words, was about 5,500), in this order: the opening, the invoice-gap story, what AI agents change, the loop and its four rules, the five-phase plan (with the phase road at its head, one sentence each for phases 2 to 5, and the commitments block: people and weeks, what the sponsor writes first, the pass checks, the stop rule, what you keep if it stops), the three regimes, the paths rejected, the confidence and stop-conditions section, the blind spot at the gates, the closing scene and the going-deeper map. The rules for counting an escape (the three things on record, its cost fields, when the escape rate and change fail rate are compared) moved from page 1 to the first question of Appendix B, "How is an escape counted?". The detection-injection paragraph moved from the plan section to Appendix A2. Appendix A now runs A1, A2 with A2.1, A5, then A3, A4 and A6 under "For builders"; labels and anchors are unchanged, so links to "diagram A1" or "table A2.1" still land. The field guide's premises 2, 7 and 11 and opening branch C now name passages that exist in the new text; re-read any tailoring that followed them. The tightening cut detail as well as moving it, so a tailored six-pager that quoted any of these passages either drops it or keeps it as the organization's own choice, citing where it still lives:
   - late escapes, and escapes no deployment shipped, reported apart, with the escape rate shown with and without late escapes: no longer in the six-pager, including its new Appendix B question; still in part 1's measures section and part 2's escape definition for phase 2 (the profile's `escapes` section);
   - who scores each phase 1 case of agent against script, and on what scale: no longer in the commitments block; still in Appendix A2's phase 1 row and in part 2's section on phases 1 and 2;
   - AI working on three sides of the loop (red, purple team, remediation): part 1, after the regimes;
   - whether trust should follow an agent's accuracy or the size of the damage its errors can do, and what phase 2 records to answer it: part 1's paragraph on earned autonomy;
   - the paragraph on Jig, the sibling design for secure creation, in the loop section: Appendix A4 still names it as a module, and parts 1 and 3 carry the full account;
   - "we expect that outcome early; an agent will rarely beat a well-built script" in the stop conditions: Appendix B, "What if the agents find nothing the script does not?";
   - the narrowed claim that seeded known-bad proposals measure the approval gate without being shown to keep approvers alert: Appendix B, Appendix C's reworded claims and Appendix D;
   - in the invoice walkthrough, the sentence that phase 1 approves every action and phase 2 lets a reviewed test run on a standing permission inside its limits: Appendix B, "Won't human approval of every action limit scale?", and diagram A3;
   - the paragraph saying the premises can move with the facts and the organization revises them: Appendix C's premise view and Appendix E's premise register;
   - smaller asides, each still in the reference: bug bounty and red team findings jumping the queue, the examples of who detects an escape and how blast radius is expressed (part 1), the legitimate-use check running before merge (part 2, step 9 still checks it in the running system), and who points agents at code today (part 2).
4. Rebuild table A2.1 for the organization, the new tailoring step: one row per practice it runs, from the current-practice map, with the loop step codes where it enters today. Each practice keeps the cited phase cells of the generic row it corresponds to; a practice with no such row gets "no change" in every phase unless one of the organization's own patches gives it a role, which the cell then cites. Drop the generic rows it does not run. In the tailored brief, name the same practices in the lead-in before phase 1.
5. Rebuild the tailored strategy brief on its new grouping: the diagnosis opens on the shared failure (a fixed weakness can return unnoticed); the policy sits under three bold heads in order (the loop holds fixes, authority stays outside the agent, we measure escapes and book fix capacity); the phase section opens with the one-row phase road, "Before phase 1, we map today's loop" is an unnumbered lead-in so list item 1 is phase 1, and the pass checks and the scorer sit in the sponsor's line of the ask. Each section ends with a one-line pointer to its six-pager section. Two passages left the brief: phase 1's detection-injection experiment (reintroducing the fixed weakness at the cheapest layer that should catch it, never past the pipeline, when it costs the service owner a day or less) and "It tests whether the loop can close at all; scale comes later". The experiment now lives in the six-pager's Appendix A2 and part 2's section on phases 1 and 2, and the six-pager's plan section says phase 1 does not show scale; a tailored brief that carried either drops it or moves it to the tailored six-pager. The brief's tailoring guide now says "the first bold sentence" where it said "the bold sentence", and gains a row, "Existing practices", for the organization's own practices in the lead-in before phase 1, which is new in this edition.
6. Refresh any count or wording the organization's documents quote: the six-pager's length (item 3); nine optional profile sections (was eight), `thresholds` the new one; rule 3 in one wording everywhere, "findings enter the record only after validation and an independent reproduction" (start-here said "only through intake"), which now reads the same in start-here, part 1, the six-pager's rules and its field guide, R1's trade-off cards, R3's invariant I3 and R6; and the three phase 1 roles in one wording, "the engineer running the test, the service owner and an independent reviewer", with the test-drafting agent beside them carrying no authority (part 1 counted the agent among the three), which now reads the same in part 1, part 2, the phase card, R6, the six-pager's commitments block and the brief's ask, the last two adding that the reviewer comes from outside the service owner's team. Counts of parts, work units, failure scenarios, rule codes and claims are unchanged.
7. Re-read the tailored narrative and strategy brief where they describe the stop conditions: the six-pager, the thesis, the in-practice chapter and the brief no longer name one owner of the early-stop minimum; the organization names the role. The checks of work units U-147 (the early stop) and U-222 (the agent action record) were reworded to match.
8. Check the organization's own patches against the contract `AgentActionRecord`, whose description changed: it now names batch approvals among the grants an action can run on, and reads the route's trailing accuracy over the accuracy window recorded with the design limits, naming that window in every record. A patch that sets the contract's whole `description` drops the new text; restate it in the patch.
9. Rebuild the six tools whose specifications changed, and the upgrade tool, and prove each against its fixtures:
   - the upgrade tool: its specification and fixtures are unchanged, but it re-applies patches with every rule of the patch applier (UP-8), and those rules now include `expects`. A tool built on 3.6.1's applier rules ignores `expects` without a word, so rebuild it on the 3.7.0 applier rules;
   - the patch applier: an optional `expects` on `modify_element`, `modify_relationship` and `modify_contract` (PA-22), the hash it carries, and the new error `op.expects-mismatch`; plus the behaviors now written down (see "Changed"), of which one differs from 3.6.1's text: a provenance key on an account class op is `op.provenance`, where 3.6.1's step order made it `op.malformed`;
   - the profile checker: a part's own build-or-buy entry overriding its plane's entry, `confirmed_by` on current-practice steps, the grant kind `batch-approval`, `agent_limits.accuracy_window`, the `thresholds` section with `warn.threshold-set-by-producer`, and the early-stop minimum's turner compared with no fixed role (a dial in `quality.yaml` may now carry `owner: organization`);
   - readiness: its specification is unchanged, and its fixtures changed with the profile template; rerun them;
   - the unit graph: a phase that is absent or does not read as a number is written `none` in finding texts and counted under `none` in `by_phase` and `frontier_by_phase`, and a `separates` entry that is not two role names is a `UG-E-field` error and separates nothing;
   - the impact report and the status report: no behavior of the reference tools changed, but each specification now states every point a builder from 3.6.1's text had to guess (see "Changed"), so a tool built from 3.6.1 may differ on any of them. Each gained a fixture for ids whose digit runs tie in value (U-1 before U-01). The impact report's fixtures now require an empty list wherever one is expected: under `report_contains`, an expected `[]` matches only an empty list, so a runner that let it match anything passed four expectations it never tested. The impact report's specification does not name `expects`, but it applies ops as the applier's op table says, so it follows the applier's semantics: an op whose `expects` does not match, in the patch under report or an earlier included one, fails to apply and is `IR-E-apply`. Build it that way.
10. Give each of the organization's modify ops `expects` (recommended, never required for an organization): the hash of each field's current value, computed as the patch applier's specification states. What it adds is protection between the organization's own patches. In 3.6.1, when an earlier patch had changed a field, a later patch that set the same field replaced the earlier text without a word, in a plain applier run and in an upgrade alike; with `expects`, the applier refuses the later patch with `op.expects-mismatch` and names the field, and the upgrade tool reports it as `conflict.invalid` carrying that code. A field the new edition changed is different, and was already caught in 3.6.1: the upgrade tool's pre-checks compare each key a modify op sets between the held and new editions before the applier runs, and report `conflict.changed-upstream` with the held, new and patch values. They still do, with or without `expects`, which they never reach. That includes a value that differs only because the upgrade renamed an identifier inside it, which reports `conflict.changed-upstream` even though the rename changed nothing the patch meant. After revising such a patch, hash the field's new value. The upgrade workflow says how to revise a patch for each code, and the fix-patch workflow how to add `expects` to a patch already accepted (by reopening it).
11. If the consequence line in `agent_limits` is answered and the organization approves batches of actions that then run without a person approving each one, list each such batch under `agent_limits.grants` with kind `batch-approval`. It is judged against its route's limit and the consequence line like a standing permission. A batch whose actions each still wait for a person grants nothing and is left out.
12. Before phase 2, record `agent_limits.accuracy_window`: a count of the route's most recent actions or a number of days. After phase 1, record the sponsor's numeric thresholds in `thresholds`, each with its value and unit, who set it and when, what it decides and the phase it gates. Leave out a number the dial register already holds, such as the early-stop minimum. The profile template now carries both with `FILL` or null placeholders; delete what you are not filling.
13. Record which role sets the early-stop minimum (`early_stop_min_closed_cases`) as that dial's `turned_by_role`. The choice is the organization's; the team that runs the agents still may not set it.
14. When mapping current practice, put each step's confirming role in its new `confirmed_by` field and the date in its `note`; leave the field out until someone has confirmed the step.
15. When loading the edition as an agent, start from the map that opens the complete Markdown file and load one of its named sets: orientation (start here and parts 1 to 4), adoption (part 3, R1, R2's contracts and the profile template) or build (part 4, R2, R3 and R5). Every H1 and H2 of the complete file and of each reference chapter file (start-here, parts 1 to 4, R1 to R6, A1 to A4 and the changelog) now carries an explicit anchor. A link from one chapter to an anchor in another names that chapter's file, for example `R4-work-units.md#r4-phase-1`, so it lands in the chapter files and in the adopters' skill folder; inside the complete file the same link reads `#r4-phase-1`. Most H2s of the six-pager and the brief still carry no explicit anchor; link those pages only by the anchors they list. The complete file ships in the Markdown edition (in the chapter zip, and beside it in the release's reading packet as `ratchet-<version>-complete.md`), never in the adopters' skill folder, whose agents start from `SKILL.md`.

### Renamed identifiers

```yaml
renames: []
```

Headings are prose, never identifiers, so the retitled headings in item 2 are not listed here: no profile field, rule code or element id changed, and every explicit anchor is kept.

### Changed meaning

- Who sets the early-stop minimum is the organization's choice. The dial register records the role it names as the dial's turner, and the profile checker compares that turner with no fixed role, so `warn.dial-turned-not-sro` no longer fires for this dial; `dial.producer-turned` still does.
- A batch approval, a person approving a named set of actions at once, is a grant when the actions it names run without a person approving each one, and it sits inside the design limits like any other grant.

### Added

- Patches may declare what they replace. A modify op's `expects` holds, for each field its `set` names, the first 12 hex digits of the SHA-256 of the field's current value written as canonical JSON (RFC 8785). On any mismatch the applier refuses the whole patch with `op.expects-mismatch`, naming the target, the field and both hashes; it never warns and applies. A malformed `expects` is `op.malformed`. The fixtures include a planted replay of two patches that set one part's responsibility in turn, where the later one, written before the earlier applied, is now refused instead of dropping the earlier text. The authors' own patches must carry `expects` from this edition on (`patch.expects-required`, a check on the authors' patches only). The design-change and upgrade workflows recommend `expects` on every modify op and say how to revise a patch refused for a mismatch.
- Profile fields: `agent_limits.accuracy_window` (`unit` actions or days, `size` at least 1), the optional section `thresholds` (`value`, `unit`, `set_by_role`, `set_on`, `decides`, `gates_phase`), the grant kind `batch-approval`, and `confirmed_by` on each `current_practice.steps` entry. Warning `warn.threshold-set-by-producer`. In `quality.yaml`, a dial's optional `owner`, whose one value `organization` marks the early-stop minimum.
- Today's practices by phase: one table, generated from one source, showing for 14 common security practices (scanners, reviews, the security operations center, the tracker, pipeline gates, change approval and the rest) where each enters the loop today by step code and what the design gives it in each phase. It renders in full, with citations, in the plan chapter (part 2), in compact form as the six-pager's table A2.1, and as one line in the brief pointing to it; the tailoring workflow has a step to rebuild it (item 4). Every cell cites the work units, parts, modules or rules that back it, a unit cited in a phase belongs to that phase, a cell with no citation says "no change", and the build fails when a citation no longer exists.
- The phase road, generated from the phase table at three depths: one row in the brief (the five phases and the North Star, phase 1 marked "decision today"), a table inline in the six-pager's plan section and above the phase table in part 2 (what each phase lets the organization claim, its duration estimate, how far the loop reaches, its exit test in brief and the way out). Under the phase table, a generated phase card gives each phase's test in brief, entry gate, the roles the profile names before it starts, the profile sections due, the controls that arrive, its stop conditions and its unit count, linked to R1 and R4.
- In the six-pager: the commitments block "What backing phase 1 commits you to", the question "How is an escape counted?" in Appendix B, and the going-deeper map naming the file of the complete edition that carries each section further.
- In the full reference: start-here opens with a table of first files by reader (sponsor, director, builder, adopter, agent) and names the four rules as the first four trade-off cards in R1; part 1's plan at a glance lists all five phases; each of part 1's twelve steps carries its step code and reference name, with the loop diagram beneath them; R1 names the card that carries each of the four rules; R6 gains a section stating the four rules and the three phase 1 roles in their one wording; stable anchors for R1's readiness, R2's contracts and each phase in R4.
- The complete Markdown file opens with a map: the named load sets for agents with their sizes, then every H1 and H2 with its anchor, line range and size. The build checks that every link inside the complete file lands on an anchor and that every H1 and H2 sits under one.
- The pages carry a print stylesheet, and each release ships a PDF reading packet: the strategy brief, the six-pager, and the full reference in two halves, the narrative and the specification (the specification printed landscape), beside the complete Markdown and the chapter zip, each named with the version. The build reads every PDF back before it counts it written. The Markdown edition stays the form for agents.
- Fixtures for gaps the last blind builds found: one exception covering several instances of its code, a dial outside the core turned by the team that runs the agents, several parts of one plane administered by the wrong role, a unit with no phase, a phase written as a word, malformed `separates` entries, the tie in natural order between U-1 and U-01 in the unit graph, the impact report and the status report, and `slip_days` null on a complete row of the status report.
- Two standalone profile fixtures changed with the new fields: `fixture-pc-pass-agent-limits.yaml` gained a batch approval, an accuracy window and a threshold, and still passes; `fixture-pc-fail-limits.yaml` gained a batch approval that reaches production, outside its route's limit, so its `rule_errors` in `expected-results.yaml` rises from 6 to 7. A runner proving against `expected-results.yaml` must expect both.
- Decision-log rows 41 to 45.

### Changed

- The six-pager is tightened to about six pages and reordered (item 3). The four rules, every cited figure and its qualifiers, the three regimes and the twelve steps of the loop keep their substance; the steps are shorter and still twelve, so references to step 10 or step 11 still land.
- The strategy brief is regrouped by argument, crux first (item 5), and stays within two pages.
- Part 1 puts the loop and its rules before the evidence, and part 3 moves "In phase 1, three roles fill the six separation fields" and "What counts as a team, and where internal audit sits" to the end of the section on roles inside existing jobs.
- The contract `AgentActionRecord` names batch approvals and the recorded accuracy window (item 8).
- The adopters' workflows answer what the table A2.1 step and the `expects` items left open. Tailoring the narrative: a practice's step codes come from the steps of its current-practice map; a practice that fits two generic rows gets one row per role it plays; cells and citations come from part 2's full table; and when an organization patch changes a part a row cites, the practices check runs again on the compiled design. Upgrade: which conflict code each case raises (item 10), and where the complete Markdown file is. Fixing a patch: adding `expects` to an accepted patch goes through the reopen path.
- The unit graph's specification states what its reference does with a unit in no phase (`none` in texts and counts), with a phase that does not read as a number (in no phase, like an absent one), and with a malformed `separates` value (`UG-E-field`, then ignored).
- The impact report's specification now states: the hashed model has no `retired` key until a removal; `IR-W-reaccept` fires only when a recorded block exists and its facts differ; what the JSON `markdown`, `markdown_equals` and `yaml_equals` each hold; that `report_contains` matches lists at every depth; natural order with duplicates dropped for `triggers` and `reasons`, one reason line per firing element, relationship or unit row; only the touched elements in a scenario's `touched_elements`; `building_touched` ordered by unit, then part; option paths relative to the directory the tool runs in, and the profile read only when an option names it; how keys are compared across block layouts; that check mode raises every warning a writing run raises; a selector table with an ids column (the only selector that brings in the security risk owner); `IR-E-apply` for an earlier patch whose ops cannot be read; how `--patch` matches a file; that an `add` reusing a unit id is skipped; and every fixture key a runner must know.
- The patch applier's specification now states: where the `retired` key goes and when it is absent; that a zone list emptied by `modify_account_class` stays as `[]`; that `ref.dangling` and `op.layer-incomplete` name each value as a whole token; and the fixture file's layout and every fixture, file, option and expect key (among them `error_text_names`, `outcome`, the version record path and how `changes` matches).
- The status report's specification now states: errors and warnings compared as a multiset of code and location; mappings inside expected lists compared on their listed keys at any depth; the full text of every reason and note, with elapsed weeks to one decimal; that "after case n" counts in closing order; `SR-W-unconfirmed` once per phase; how organization units are read (an `add` reusing an id replaces the unit, an unknown `remove` does nothing); the rule for a test that cannot pass with no timebox; and `slip_days` null on complete rows.

### Fixed

- The reference profile checker judged a plane's build-or-buy entry against a part that has its own answered entry, raising findings against a part the organization builds. A part's own entry now overrides its plane's, as the schema always said: once the part's choice is answered, the plane's entry no longer covers it and passes it no field. No profile that passed starts failing.
- The reference unit graph crashed on a `separates` entry that was a number and silently read a single role name or a list of three roles as a pair; each is now a `UG-E-field` error. It wrote a missing phase as `undefined` and counted it under `undefined` in `by_phase` and `NaN` in `frontier_by_phase`; both now read `none`.
- Specification text that was wrong: the patch applier's step order made a provenance key on an account class op `op.malformed` where the reference reports `op.provenance`; the impact report's `IR-10` said five slots where check mode counts seven values in five slots; the status report's output example showed phase 1 yellow and completed at once; patch applier fixture descriptions said "three forms" of the status line (four) and cited rule labels the specification does not define.
- Start-here stated rule 3 more loosely than the rule itself, and part 1 named the three phase 1 roles differently from parts 2 and 3 (item 6). R3's invariant I3 still carried the loose wording of rule 3, and the six-pager, the brief and part 2 each named the phase 1 roles in their own words; all now use the one wording.
- Start-here's H1 and H2 carried no explicit anchor, and part 2's links to R1's readiness and to each phase in R4 landed only in the complete file. Both are fixed (item 15), and the build now checks the links and anchors of every chapter file and of the adopters' skill folder, as it already did for the complete file.

### Unchanged

- The four rules, every existing rule code and profile field, the acceptance gates, the readiness of every phase, every claim's text and grade, every explicit anchor, and the counts of parts, work units and failure scenarios. The reference impact report, patch applier, status report and upgrade tool behave as in 3.6.1 apart from `expects`, which the impact report and the upgrade tool handle through the applier's rules (item 9).

<a id="changelog-3-6-1-2026-10-19"></a>
## [3.6.1] - 2026-10-19

### What an agent holding 3.6.0 should do

1. Nothing stored changes, and no tool behaves differently. Re-read four clarified passages of the profile checker's specification if you built it from 3.6.0: the conditions a real-finding phase 1 may leave false are three, named; when a non-date `confirmed_on` counts as stale; the wording of schema step 1; and the layout of `expected-results.yaml`.

### Renamed identifiers

```yaml
renames: []
```

### Changed

- The complete edition, as one Markdown file, is published with every release beside the full reference, the six-pager and the strategy brief, and the full reference links to it.
- Four wording fixes in the profile checker's specification, listed above.

### Unchanged

- Every rule, code, profile field, fixture and expected result.

<a id="changelog-3-6-0-2026-10-19"></a>
## [3.6.0] - 2026-10-19

### What an agent holding 3.5.0 should do

1. Nothing stored needs renaming, and every 3.5.0 profile and organization patch stays valid. No readiness answer changes.
2. If the organization ran 3.5.0's attack-injection experiment (work units U-207 and U-208: a build with a verified fix reverted, deployed into a deployed test environment under that environment's normal authorization, without telling the roles that would detect it), that experiment is now refused past the pipeline. Phase 1 never injects past the pipeline, even once a notice policy exists, so move a phase 1 experiment to the cheapest layer that should catch the class, usually a pull request or the pipeline. From phase 2, an injection into a deployed test environment runs only once the organization fills `injection` with `deployed-test` in `allowed_environments`, and only after the new phase 2 agreement U-251 closes: in the trusted-agent mode, the holder of the trusted-agent role confirms in the tracker that they are told in advance of each exercise and hold the stop; in the announced or unannounced mode, the owner on the detection side named in that tracker item acknowledges the declared policy there. Until both hold, the authorization service refuses the injection before anyone is asked to approve it (failure scenario F90). For such an organization, filling `injection` is required, and telling one role on the detection side in advance (the recommended trusted-agent mode) is a change from 3.5.0.
3. Re-read the tailored narrative and the tailored strategy brief against the new opening. The thesis no longer assumes a backlog: an organization starts either with a backlog that discovery outruns or with a known backlog made small by a one-time sweep, and in both the way findings get fixed is not repeatable and does not hold. Use the field guide's premise 1, which now asks which starting point the organization is in and how to tell (age of open findings, whether and when a sweep ran, reintroductions and new classes since), and the new opening branch F for a swept organization. In the brief, pick the opening and the diagnosis bullet that match the organization's starting point.
4. Refresh the headings and figures a tailored narrative, brief or plan cites:
   - Six-pager: the subtitle now reads "Fewer security escapes, faster fixes that stay fixed, and an honest measure of both, whether an organization still carries a backlog of weaknesses or has already swept its code with AI." The first section, "Security has always found more than teams could fix, and AI makes the speed of fixing the whole game", is now "Whether an organization carries a backlog or has swept it clean, the way weaknesses get fixed does not hold".
   - Thesis: "Fix capacity and trust limit security testing, and AI agents put pressure on both" is now "Whether fixes land fast, hold, and rest on trusted evidence decides the outcome at any backlog size"; "Security has always found more than teams could fix, and AI raises both the noise and the stakes" is now "Organizations start from a backlog or a fresh sweep, and in both the way weaknesses get fixed does not hold"; "The crux is fix capacity and trust" is now "The crux is how fast the loop closes, whether its fixes hold, and trust"; "17 of 47 claims hold today" is now "17 of 48 claims hold today".
   - Strategy brief: the diagnosis heading "Owning teams discount security's tickets because most of them are noise" is now "Fixes arrive buried in noise or all at once, and nothing keeps them in place".
   - Claims: 48, of which 17 hold and 26 are honest bets (was 47 and 25). CL-48 counts as an honest bet; its evidence strength is none.
   - Work units: 229 (was 224), of which 136 are code (was 132) and 44 agreements (was 43). Phase 2 has 78 units (was 75), phase 3 has 60 (was 59) and phase 5 has 19 (was 18); phases 1 and 4 are unchanged.
   - Failure scenarios: 91 (was 86), of which 70 have pipeline tests (was 66).
5. Check the organization's own patches against `s6.retest-regression-planner`, `s3.action-control-service`, `s7.evaluation-operations` and `ext.soc-incident-response`, whose descriptions changed; a patch that sets the whole `responsibility` of one of them drops the new attack-injection duties. Five relationships are new, all carrying injection records: from `s6.retest-regression-planner` to `s7.flow-cost-telemetry`, from `ext.soc-incident-response` to `s6.retest-regression-planner`, from `s7.flow-cost-telemetry` to `s7.evaluation-operations`, from `s3.action-control-service` to `s7.flow-cost-telemetry`, and a control edge from `ext.soc-incident-response` to `s3.action-control-service` that carries the trusted agent's stop. `s7.flow-cost-telemetry`, `s6.regression-catalog` and `s3.production-cell` gain injection duties through these relationships and the new units while their descriptions stay the same, so also check patches that change their relationships or the layer they sit in.
6. Re-read anything of the organization's own that cites U-207, U-208 or failure scenario F70: runbooks, game-day plans, tests, patches, and unit changes or unit-graph inputs. All three were rewritten (see "Changed"), and the two units now produce an injection record in place of a regression specification.
7. Rebuild the profile checker from its updated specification and prove it against its fixtures: a new optional `injection` section, seven consistency checks and two warnings. The readiness and unit-graph fixtures changed with the new section and units; their specifications are unchanged in behavior.
8. Fill `injection` to allow attack injection past the pipeline (required for an organization in item 2). With it absent, reintroduction runs only before deployment (workstation, pull request, pipeline), and the authorization service refuses any injection past the pipeline. The profile template now carries the whole `injection` section with `FILL` placeholders. A placeholder anywhere in the section leaves it unanswered: complete mode reports each placeholder, and the design treats the section as absent. Delete the section from a profile rebuilt from the template if you are not filling it.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- The thesis is independent of vulnerability volume. The North Star is just-in-time find and fix: the time from a weakness's introduction to a verified fix that stays fixed, caught where code is written or reviewed when possible and proved through the running system when not. Fix capacity as the binding constraint stays a graded bet and no longer carries the opening.
- Attack injection follows the detection layer. Every reintroduction names the layer expected to catch its weakness class (workstation, pull request, pipeline, deployed test environment, production) and records whether it was caught, the time to detection and, after deployment, the time to recovery. Phase 1 runs at the cheapest layer that should catch the class, usually the pull request or the pipeline, and never injects past the pipeline, even once a notice policy exists. Pre-deploy injections need no notice, open as drafts or on isolated branches behind a check that blocks merge, close at their time limit and count against the regression time budget. Past the pipeline, injection starts in phase 2 and the organization's declared notice policy governs (announced, a trusted agent, or unannounced; the trusted agent is recommended): the trusted agent, on the detection side, can stop the exercise, the authorization service then revokes the grant at once and runs the restore approved inside it within the ceiling the organization sets, and every injection grant expires and restores itself at the service owner's time limit. Production injection runs only under an approved production profile that names it, with a maximum exposure window.
- A catch in the pipeline now counts as a detection. In 3.5.0 the experiment excluded the kept test failing in a pipeline and counted only detection from the running environment; in 3.6.0 the expected layer's own check or watch counts, whichever layer that is.

### Added

- Premise CL-48 (a one-time sweep with a capable model decays: escapes return through reintroduction and through classes the next model finds), an honest bet whose evidence strength is none. Decision-log rows 39 and 40.
- Profile section `injection`: `notice_mode`, `trusted_agent_role`, `trusted_agent_can_stop`, `allowed_environments`, `stop_restore_max_minutes`, `production_max_exposure_minutes`.
- Consistency checks `check.injection-trusted-agent-producer`, `check.injection-trusted-agent-not-detection`, `check.injection-trusted-agent-cannot-stop`, `check.injection-trusted-agent-unnamed`, `check.injection-production-without-effects`, `check.injection-production-exposure-unset` and `check.injection-restore-ceiling-unset`; warnings `warn.injection-unannounced` and `warn.injection-detection-side-unset`.
- Contract `InjectionRecord`. Failure scenarios F90 to F94: injection past an undeclared policy, a stop, production outside its profile, a layer that misses, and an injection that outlives its limit.
- Work units: in phase 2, U-250 (the injection record for every injection), U-251 (the agreement on the notice policy, which blocks any deployed test environment injection until the trusted-agent holder confirms in the tracker, or, in the announced and unannounced modes, the named owner on the detection side acknowledges the policy there) and U-254 (the authorization service holds the policy, refuses what it does not allow, and runs the restore on a stop or at expiry); in phase 3, U-252 (routine pre-deploy re-proof); in phase 5, U-253 (production injection).
- The six-pager's questions gain one for swept organizations, and the rejected paths gain re-sweeping with each new model.
- Tailoring guidance for a swept organization, in the six-pager's field guide, the brief's tailoring guide and the tailoring workflow. No fixed size makes a backlog small: choose branch F when a sweep ran and the open backlog fell after it, and say so with the organization's own figures. Branch F may open on the sweep while its decay is unvalidated, with the decay marked as not yet validated in this organization. The profile has no field for a sweep, so its date, scope and yield go in the current-practice map's notes and the premise ledger. The story follows the profile's phase 1 source; if the sweep supplies a better first weakness, the profile changes first. In the brief, keep the diagnosis bullet for the organization's starting point, marked if unvalidated, and drop the other.

### Changed

- Work units U-207 and U-208 and failure scenario F70 were rewritten for injection by detection layer. U-207 runs phase 1's experiment at a pre-deploy layer and forbids injection into a deployed test environment or production. U-208 runs it from phase 2 under the declared notice policy. F70 now reintroduces the weakness at the layer expected to catch its class; its title, trigger, required behavior, detection and test steps all changed.
- The fix-capacity claim (CL-18) keeps its statement, grade and falsifier; its "if it flips" text now reads: "Fix queue time turns out to be a small share of loop time, so the opening leads with trust or with how sweeps decay in place of capacity, and dispatch stops waiting on fix capacity. The saturation setting in the profile stays unused."
- The profile checker and readiness specifications are clarified, and neither tool's behavior changes. PC-3 now says an absent, null or placeholder value never enters a comparison, and names the warnings and consistency checks defined on a missing value as the exceptions (a placeholder counts as missing for them). The checker specification states where `check.tier-override`, `check.build-or-buy-key` and each per-dial finding sit, defines "carries an answer" by the readiness rule, and reads profiles as YAML 1.2, so an unquoted date stays a string. The readiness specification says `ask_next` is empty at phase 5 and shows the `dials` default as the expanded list `readiness.yaml` ships. New fixtures: an exception lasting exactly 180 days and a phase-1-only exception lasting exactly 56 days, both valid; a profile whose `escapes` and `build_or_buy` are placeholder strings; and a readiness profile whose `modules` holds only false and null leaves, answered only because false counts as an answer.

### Unchanged

- The four rules, every rule code and profile field from 3.5.0, the acceptance gates, the readiness of every phase, and every existing claim's statement and grade. Of the existing claims' other text, only CL-18's "if it flips" changed.

<a id="changelog-3-5-0-2026-10-19"></a>
## [3.5.0] - 2026-10-19

### What an agent holding 3.4.0 should do

1. Nothing stored needs renaming, and every 3.4.0 profile stays valid. Two readiness answers are new: a profile without the `escapes` section is ready for phase 1 at most, and one without `fix_capacity.default_cap` is ready for phase 2 at most.
2. Check the organization's own patches against nine parts whose descriptions changed: `s3.policy-decision-point`, `s3.approval-service`, `s5.evidence-intake-validator`, `s5.disposition-review`, `s5.finding-ledger`, `s6.hardening-service`, `s6.owner-change-connector`, `s7.promotion-review` and `s7.flow-cost-telemetry`. A patch that sets the whole `responsibility` of one of them replaces it, dropping the new duties (reading design limits, the fix path, escape records); rewrite such a patch on the new text. A part of the organization's own that grants authority without a person approving each action, or that produces earned-autonomy grants, must now declare `grants_authority: true` and read the design limit from a control-zone part, or the model checks report `limit-unbound`; such patches apply with findings until fixed.
3. Place the two new parts in the organization's overlay if it keeps one: `s6.fix-cap-gate` (control zone, fails closed: while it is down no validated finding enters any team's queue) and `s6.fix-cap-refusal-log`.
4. Rebuild four tools from their updated specifications and prove each against its fixtures:
   - the profile checker: new sections `escapes` and `agent_limits`, new `fix_capacity` fields, one new should-never code, eight consistency checks, two warnings, a placeholder build-or-buy choice held as an open answer, and the clarified behaviors listed under "Changed" below;
   - readiness: two new readiness items, how a nested section is named (`fix_capacity.default_cap`), a `--today` option passed to the profile checker, `ready_for` and `next_phase` as `{phase, name}` objects, and looser reading of the interview table;
   - model checks: `limit-unbound` and `limit-writer`, and the new element field `grants_authority`;
   - the unit graph: a table of every finding text, fixture entries matched as prefixes (longest first), a mapping compared only on the keys it names, and an empty mapping under a key requiring an empty value.
   The impact report's specification is unchanged; one fixture restates a part's new text. Each specification's output example illustrates the report's shape only; the shipped counts are the ones its fixtures expect.
5. Fill `separation.program_decision_owner_role` if it is empty. It now sets the default fix cap and may not confirm escapes, and while it is unanswered the checks that compare against it stay silent.
6. Re-read the tailored narrative against the new six-pager. Rule 1 now reads: the design limits what an agent can touch, the limits always stop below a consequence line the business risk owner sets, people approve any action outside them, and a clean record can widen what an agent may do up to those limits and no further. Phase 1 is a feasibility test, it now hands the finding over with a reproducing test, a drafted fix and an owned gate, and it can run the attack-injection experiment. The agent arm's early stop uses the minimum set in the profile (five unless set otherwise). Add Appendix E's premises 18 and 19, and refresh any count the narrative quotes (parts, rule codes, failure scenarios, units, claims) from the edition.
7. Tailor the new strategy brief for the organization's sponsor with its own guide (the appendix of the brief), from the same current-practice map and profile as the six-pager.
8. Optionally, fill the new sections, knowing how they interact:
   - `escapes` is needed before phase 2.
   - `agent_limits`: with it absent, approval works as in 3.4.0 (kept regression tests replay on their standing permissions; a person approves every other agent action). Once its consequence line is answered, every standing permission, earned-autonomy grant and dial that lets an agent act without per-action approval, kept-test replay permissions included, must be listed in `grants` inside a limit; a route or judgment type with no limit sends every action to a person. Changing a limit or the line is a profile change recorded as a turn, described in the design-change workflow.
   - Fix caps in `fix_capacity`: the default cap is needed before phase 3. A finding at or above the consequence line bypasses the cap only when `agent_limits.consequence_line` is set; set the line before relying on caps, or high-consequence findings can wait behind a full cap.
   - The profile template carries every new section with `FILL` placeholders; delete a section you are not filling, or complete mode reports each placeholder.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- Rule 1 is tiered by consequence. The design sets a limit for each agent route and each kind of judgment that may earn autonomy (the highest consequence tier, the environments and the action classes), set by the security risk owner. The business risk owner sets a consequence line, and every limit stops below it. Inside its limit an action may run on a grant alone, always through the authorization service the agent cannot reach; outside it, a person approves that exact action. A standing permission, earned-autonomy grant or dial wider than its limit is refused by `limit.grant-beyond-design` unless the profile records an exception. When a limit narrows or a tier rises, every outstanding grant is checked again and lapses if wider. Acceptance gates (independent reproduction and the two closure sign-offs) are unchanged.
- An escape counts only once it is confirmed by a role other than whoever detected it (and other than the team that runs the agents and the program's decision owner), attributed to the deployment that shipped it by a named role and method, and detected inside the organization's window. Late escapes and those no deployment shipped are reported apart; the rate is shown with late escapes both left out and included; an unconfirmed escape past its alert age goes to the security risk owner. Each escape records its blast radius, time to recover, and whether the fix removed the weakness class.
- Phase 1 is a feasibility test. It passes when three checks written before it starts hold (the loop closed, an independent reviewer verified the fix, the regression test held) and the map, the scripted comparison and the per-case verdicts exist. The sponsor's criteria name the scorer, who is not the engineer running the test, and the verdict's scale; a verdict against the agent does not fail phase 1. Numeric thresholds are set from the phase 1 map before phase 2.
- Security pays for the fix path. A validated finding enters an owning team's queue only with a reproducing test (through the running system where no build-level test is possible), a drafted fix or a recorded reason none is possible, and an owned regression test. Each owning team sets its fix cap with security, the same team cap the saturation signal reads, and the sponsor sets a default. A control-zone gate checks the cap before the fix path is prepared and again at queue entry; a finding above the cap is logged with its reason and stays on the record; a finding at or above the consequence line always goes through; a finding held at two consecutive reviews goes to the security risk owner.
- The escape rate keeps DORA's change fail rate as its frame and is compared with it only once both are collected the same way over enough deployments.

### Added

- A strategy brief beside the six-pager: two pages for an executive sponsor, answer first, with a diagnosis, a guiding policy and the first actions under assertion headings, ending on the decision asked of each role and the stop conditions, generated from the same sources so its counts and stops cannot drift. It carries its own tailoring guide and is published as its own page.
- Profile sections `escapes` (detection window, detection sources and their roles, confirmer, unconfirmed alert age) and `agent_limits` (consequence line and who set it, limits, grants); `fix_capacity` fields `team_caps`, `default_cap` and `refusal_review_interval_days`.
- Should-never code `limit.grant-beyond-design`. Consistency checks `check.escape-confirmer-detects`, `check.escape-confirmer-conflicted`, `check.limit-not-security-risk-owner`, `check.consequence-line-not-business-risk-owner`, `check.limit-duplicate-subject`, `check.fix-cap-self-agreed`, `check.fix-cap-duplicate-team` and `check.fix-cap-default-not-sponsor`. Warnings `warn.escapes-unset` and `warn.fix-cap-default-unset`. `dial.producer-turned` also covers a design limit set by the team that runs the agents.
- Model checks `limit-unbound` (every part that grants authority without per-action approval reads the design limit from the control zone) and `limit-writer` (only the security risk owner sends a limit and only the business risk owner sends the consequence line).
- Parts and contracts: the fix-cap gate and the fix-cap refusal log; contracts for escape records, design limits, the consequence line, agent action records, fix paths and fix-cap refusals. Failure scenarios for each new way the loop can fail, and work units for each step, including one attack-injection experiment: the fixed weakness is reintroduced into a deployed test environment to time how fast the loop's own detection notices it and recovers, in phase 1 when the service owner's estimate is a day or less, otherwise in phase 2.
- Phase 2 tests whether a route's recent accuracy or the reach of its limit better forecasts what its wrong actions cost, each written before the action and cost measured apart from both; "too few wrong actions to tell" is a stated result.
- Claims CL-46 (bounding what an agent may touch limits error cost better than its accuracy record) and CL-47 (a finding with a prepared fix path costs the owning team less than a ticket), both graded none.
- Specification text for every guess that decided a fixture in the last edition's blind builds.

### Changed

- Profile checker behaviors now written down: a missing build-or-buy `choice` is a consistency finding that progressive mode never holds; `reviewed_with` counts duplicate entries; `warn.exception-unused` sits at `exceptions[i]`; exact path tests decide which schema findings progressive mode holds; `dial.producer-turned` checks core dials only.

### Fixed

- The reference profile checker refused a placeholder build-or-buy choice as a bad choice; it now holds it as an open answer, as its specification always said.
- The rule text for `sep.evaluator-conflicted` said it was checked from phase 3 on; it fires whenever both roles are named, which is what the checker did.

### Unchanged

- Rules 2 to 4, every existing claim's text and grade, every existing rule code and profile field, and the acceptance gates.

<a id="changelog-3-4-0-2026-10-19"></a>
## [3.4.0] - 2026-10-19

### What an agent holding 3.3.0 should do

1. Nothing stored needs renaming, and every 3.3.0 profile and organization patch stays valid.
2. Rebuild the profile checker from its updated specification and prove it against the new fixtures (`sep.purple-team-decides` now also compares the proof-condition owner and the optional detection owner, and two new warnings fire once kept-test dials are set); the unit graph's fixture counts changed with six new work units. The other tools' specifications are unchanged.
3. Re-read the tailored narrative against the new six-pager. The thesis is now stated as an outcome: fewer security escapes per deployment and a shorter time to remediate, both measured honestly. Carry that framing into the organization's version, and Appendix E's new premise 17 on the three regimes.
4. Optionally, set the five kept-test dials in the dial register, name the purple team (`separation.purple_team`) and name the defensive team that accepts detections (`separation.detection_owner_team`). With the dials unset, no kept-test run changes lane and a quarantine lasts at most the exception ceiling. Once any kept-test dial is set, leaving the quarantine count cap or the re-proof interval unset draws a warning.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- The thesis is an outcome with a measure. Security's counterpart to DORA's change fail rate is the escape rate: security weaknesses that reach production per deployment (the denominator DORA uses for change fail rate), by weakness class, against the organization's measured starting point. Time to remediate, security's analogue of failed deployment recovery time, runs from a reproduced finding to a fix verified in the running system. Phase 1 handles one weakness, so the escape rate's starting point comes from the historical findings and incidents gathered in the current-practice map.
- A kept regression test can now leave the blocking path, by a recorded route only. It retires when a kept, passing paved-road entry or derived check covers its weakness class, that check fails against the test's reverted-fix copy, and the security risk owner accepts. A quiet one, with no failure within the quiet period the organization sets, still runs and still blocks on every change that touches its declared dependencies; only its extra time-based runs move to a scheduled lane. A flaky one is quarantined as an exception under the exception ceiling. Each is re-proved on a schedule against a copy with its fix reverted, where it must fail; a "no longer fails" result moves it out of the blocking lane only after the verifier independently confirms it. Nothing is deleted, and a retirement lapses when the covering check fails.
- "Novel" now has one definition: a finding whose path key (weakness class plus a defined path: service and entry point, identity or role, asset or action reached) matches no earlier record in the finding ledger.

### Added

- A new title: "Ratchet: security's contribution to high-quality delivery". The six-pager and the reference chapters gain a section on the probable ideal: as AI scales, discovery and remediation pass through three regimes (backlog, balanced, near zero), with the measures that tell them apart and the roles AI plays in each, all graded as premises.
- The purple team role (`people.purple-team`): its AI proposes detections and kept tests, runs the scheduled re-proof and supplies seed material for the gates; an independent check decides each. Optional profile fields `separation.purple_team` and `separation.detection_owner_team`, and should-never code `sep.purple-team-decides` (the purple team may not be the verifier team, the team that owns proof conditions, the security risk owner or, when named, the detection owner team; it may be the team that runs the agents).
- Contracts `KeptTestStatus` and `DetectionProposal`; six work units for lanes, quarantine, re-proof, retirement, measures and the purple team.
- Dials with no default: `kept_test_quiet_days`, `kept_test_scheduled_lane_days`, `kept_test_quarantine_max`, `kept_test_quarantine_max_days`, `kept_test_reprove_days`. Consistency check `check.quarantine-past-ceiling` and warnings `warn.kept-test-lane-unset`, `warn.kept-test-quarantine-cap-unset` and `warn.kept-test-reprove-unset`.
- Remediation measures beside DORA's, each with its data source: escape rate and time to remediate, remediation change fail rate, cost per validated novel finding, validated findings arriving against verified fixes per weakness class, queue age, novel against recurring share, weakness classes retired, and kept-test suite health.
- Every claim in the evidence ledger carries an "if it flips" line saying where the design bends if the claim proves false. Ten new claims graded "none" (CL-36 to CL-45) state the capacity premises, the three regimes and the kept-test lifecycle. Appendix C gains a premise view generated from the ledger.

### Unchanged

- The four rules, every existing claim's text and grade, every rule code, and every existing profile field.

<a id="changelog-3-3-0-2026-10-19"></a>
## [3.3.0] - 2026-10-19

### What an agent holding 3.2.0 should do

1. Nothing stored needs renaming, and every 3.2.0 profile stays valid. Every organization patch still applies, but the upgrade now runs the model checks on each one, so a patch 3.2.0 accepted can come back `applies-with-findings` when it brought a check error that no later patch built on it removes. Act on that finding as the upgrade workflow says.
2. Rebuild every tool from the updated specifications and prove it against the new fixtures before relying on it. All eight specifications changed, and the model-check fixtures now match on error code and location instead of message text.
3. If the organization keeps its version only in `org/CHANGELOG.md`, create `org/version.yaml` with `version` and `history` from it. `org/version.yaml` is now the only version record; the changelog stays as narrative.
4. If an organization patch adds an element or a contract and the model checks refused it for missing realization, quality or overlay entries, add those entries to the patch with `layers` (below), apply with a layer output, and run the model checks on the compiled model and layer. A part that was folded into a shipped part only to pass the checks can now be modeled as its own part.
5. If any part of the estate does not run on AWS, adopt an overlay of your own: copy the example, keep every part in it (one overlay covers the whole estate, so a hybrid estate adds its own account classes beside the AWS ones), and record it in `org/version.yaml` as `overlay` with its file name and SHA-256. Recording it is a decision the security risk owner accepts in the decision log. Every later change to where a part runs is a patch.
6. Fill `separation.security_risk_owner_role` in the profile first; the impact report now warns when it is unfilled. Filling it changes the team names the risk sections record, so do it before step 7.
7. Run the impact report in check mode on every accepted patch, always with the same profile. The report's layout changed (it now records `layout: 2`), so expect `IR-E-restamp`: regenerate the section and the acceptance stands. Only a changed fact sends a patch back through acceptance. Two facts can change for a patch the upgrade called clean: a new direct code (such as `model.plane-join` on a patch whose gap a later patch closes), and the risk owner's name. `IR-W-accepter` fires while the role is unfilled; once it is named, record in the decision log that the named role stands behind every earlier acceptance, or re-accept those patches.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- An organization can add parts of its own. `add_element` and `add_contract` take an optional `layers` mapping with the part's realization, quality and overlay entries; a new op, `set_layers`, changes those entries for any part, shipped or added, to record that a shipped part is an existing tool or lives somewhere else. The patch applier compiles the organization's design layer next to its model (option `layer_out`), drops the entries of removed elements, and drops failure scenarios left with no elements. The model checks read the compiled model and layer (options `--model` and `--layer`).
- The AWS overlay is a worked example. An organization may adopt its own overlay file once, recorded in `org/version.yaml` with its hash, and the same overlay rules judge it. The applier, the upgrade tool and the impact report all find it from that record, else use the shipped example; the applier's and the impact report's `overlay` option still wins. The applier refuses a recorded overlay whose hash no longer matches, and warns about an overlay file in `org/` that nothing records.
- Changing where a part runs is a design change. `set_layers` moves a part to another account class, and new ops `add_account_class` (a name starting `org-`) and `modify_account_class` change the classes the overlay offers. Such a patch gets an impact report with a placement section and is accepted like any other.
- The rule that every relationship between two planes carries a contract now sees organization parts. A part with no plane counts as its own plane, so it never escapes the rule, and a person is recognized by belonging to the PEOPLE system, whatever their id.
- The upgrade tool calls a patch clean only when the model checks pass on the cumulative model through that patch. A patch whose ops apply but which brings new check errors is `applies-with-findings`, with a findings file beside the conflict files; exit 3 now covers both. An error a patch brings counts against it only if it is still there after the last later patch that depends on it, so a follow-up patch that fixes it clears the finding; the upgrade report lists each cleared error under `resolved` with the patch that cleared it.
- The AI-free control plane rule no longer has a separate exemption for the route qualification registry. Writes to it still pass because it is off the model path, but an inference relationship to it now fails like any other.
- Removing a part leaves no dangling reference in the realization, quality, failures or overlay file; `modules.yaml` cannot be changed by a patch, so it is outside that guarantee.
- A recorded impact section that differs from a regenerated one only in report layout, list order or edition wording is a restamp, never a changed fact.
- Each design-layer file has required top-level entries (maps, and the `scenarios` list in `failures.yaml`); a file missing one, or holding the wrong kind, is unreadable and the model checks exit 2. Model-check fixtures gained an `exit: 2` expectation for these. The coverage checks judge the full model in core mode too.
- A patch can be withdrawn: Status `withdrawn by <who> on <date>`. A withdrawn patch is never applied, and a patch that depends on it fails.
- An unset module alignment limit falls back to the 180-day exception ceiling, and every source now says so.
- `phase_1_boundary.agent_drafts_only` left empty counts as missing only when phase 1 starts from a real finding, and readiness names the fields that keep a section open.

### Added

- Error codes `op.layer-incomplete` (patch applier), `checks.baseline` and `checks.unrunnable` (upgrade), warning `modules-absent` (model checks, when an edition predates `modules.yaml`), and impact report codes `IR-E-restamp` and `IR-W-reaccept`, with direct finding `model.plane-join`.
- Readiness output fields `open_fields` and `conditions`.
- A workflow for fixing or withdrawing an accepted patch and regenerating stale impact sections.
- A packaging check in the build: every file the start-here page and the skill name ships, and every count matches the model.
- Part 3 of the full reference explains design changes and says that the overlay is an example an organization replaces.
- Impact report sections for placement and for untrusted-content exposure gained or lost; relationship lines show `content`. The report reads the organization's own `org/units.yaml`, so its unbuilt warning can clear for an organization part. Codes `IR-W-skipped` (check mode on a withdrawn or rejected patch) and `IR-W-accepter` (accepter role unfilled); applier error `overlay.unrecorded-change` and warning `overlay.unrecorded-file`.
- Option `--preview-withdraw` on the applier and the impact report, to see a replacement together with the withdrawals it implies. Applier report fields `overlay` (the file used and how it was found), `preview_withdrawn` and `layers.account_classes`; model meta `preview_withdrawn`.
- The applier writes `modules.yaml` into the layer it compiles, so the module checks run on an organization's own build.

### Fixed

- The patch applier reads the edition from the shipped model's top-level `edition` field.
- Removing an element is blocked while a sequence step names it, and cleans it out of contracts' producer and consumer lists. The impact report does not count that cleanup as a contract change.
- Upgrade renames change only matching keys and whole code spans, never prose; a generic word is never cited as a match.
- The impact report names `rule_enforcing_parts.parts`, specifies its hash exactly (SHA-256 of canonical JSON), and shares one natural sort order with the status report (U-27 before U-172). Output layouts for the impact and status reports are specified field by field.
- The unit graph's module rule and message shape match its fixtures; a refused entry check no longer counts as guaranteeing its separation; phases must be integers.
- The start-here page and the skill list only files that ship, with part and role counts generated from the model. The rule-guidance notes in reference R3 render again. Register staleness is computed in UTC.
- The interview and reference R1 count twelve loop steps, matching the thesis.
- The impact report states its block layout instead of leaving it to the fixtures. Strings in the block are now written as JSON strings, so every recorded block's bytes change; check mode reads that as a restamp. The report spells an unmapped plane `unmapped:<id>` as the model checks do. Its separations table gives the rule labels for the two control-plane-operator separations. Required hops are written `[from, to, note]` in the model-check and impact report specs, matching the data. The wording of an error that names references (such as `op.still-referenced`) is free; its fixture matches the ids and step numbers as whole tokens.

### Unchanged

- The six-pager, the four rules, the claims and their grades, and every profile field. One field accepts more: `cloud_overlay.provider` takes the name of the organization's own overlay.

<a id="changelog-3-2-0-2026-10-18"></a>
## [3.2.0] - 2026-10-18

### What an agent holding 3.1.0 should do

1. Nothing stored changes, and every 3.1.0 profile and organization patch stays valid.
2. The field guide for tailoring the six-pager moved from Appendix D to Appendix E. Appendix D is now the market comparison. Update any instruction or saved note that points at "Appendix D" for the field guide; the adopters' skill workflows already point at Appendix E.
3. Re-check any tailored narrative against the new section order and headings (below). The four rules are now a numbered list, so a tailored telling can cite them as rules 1 to 4.

### Renamed identifiers

```yaml
renames: []
```

### Changed

- The six-pager's four rules are a numbered list with their evidence grades, and every mention links to them. The four losses follow the rules instead of preceding them.
- The narrative's order is now: the problem, the illustration, what agents change, the loop and its rules, how an organization begins, how the design was argued into shape, the paths rejected, what is known and bet, and the closing.
- Headings that were labels are assertions, the contradiction about how many things agents change is fixed (three), the phase test is called the exit test, and the opening's two paragraphs on the work after finding are merged.
- Phase 1's safety by source of the weakness moved from the narrative into the diagram A2 text.
- Every in-text cross-reference is a link to a stable anchor, and the build fails on a link with no anchor. The page's contents rail lists diagrams A1 to A6, and each appendix has a link back to the contents.
- Appendix D (market comparison) and Annex A4 use assertion headings.
<a id="changelog-3-1-0-2026-10-18"></a>
## [3.1.0] - 2026-10-18

### What an agent holding 3.0.0 should do

Nothing stored changes, and every 3.0.0 profile and organization patch stays valid. Re-read parts 1 to 4 of the full reference and the new Annex A4, then re-check any tailored narrative that quotes them.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- The full reference now carries the thesis-level changes 3.0.0 made to the six-pager. Part 1 adds the value-stream argument, governed earned autonomy, Jig and the core platform with pluggable modules. Part 2 explains the later-phase changes and the phase 1 runner limit. Part 3 replaces the "adjacent journey" section with Jig as a pluggable module, and adds interface-first wiring for the modules an organization already runs. Part 4 adds the autonomy grant and the self-validation label.

### Added

- Annex A4: the landscape comparison, carried into the full reference from the six-pager's Appendix E.
<a id="changelog-3-0-0-2026-10-18"></a>
## [3.0.0] - 2026-10-18

### What an agent holding 2.2.0 should do

1. Nothing stored needs renaming, and every 2.2.0 profile stays valid. The major version is for one stricter rule: every relationship an organization patch adds between two planes now needs a contract, or a written `no_contract` reason. An organization patch that adds such a relationship without either now fails the model check. Fix it by naming the contract the relationship carries, or by recording why none is needed.
2. Rebuild the organization's tools from the updated specifications and prove them against the new fixtures before relying on any check: the model checks, profile checker, readiness and unit graph all gained rules.
3. Re-read the six-pager. The opening, the bets section and Appendix A4 changed meaning (below), and Appendix E is new. Re-tailor any narrative that quotes the old opening.
4. Before phase 3, name `separation.evaluation_team`; the phase 3 entry check refuses an evaluation team that is also the verifier, the road owner, the tool owner or the portfolio decision owner.
5. If the organization runs a secure-creation loop, map it as the pluggable module `secure-creation` (Jig), and record each module's interface points and their wiring in `current_practice.modules`.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- The opening now argues from delivery: organizations have always found more weaknesses than they could fix, AI makes findings louder and the stakes higher, and what matters is how fast a real defect is corrected without stalling the teams that ship. Finding is the cheap end of the work.
- Ratchet is a core platform with pluggable modules. The core is the loop, its four rules and its record. Each module declares its category (signals in, stakes, reach, prevention out), its interface points, its switch-on test, how it keeps the four rules, its separations, and the existing practice it wires in. Wiring an existing practice is interface-first, up a ladder: connected, conformant, aligned.
- Earned autonomy: Ratchet starts by learning only from what people confirm. The owners of business and security risk can grant it the right to learn from its own validations, one kind of judgment at a time, on two records checked on samples it cannot predict (honesty and correctness, for example by replaying the agent's reproduction through a runner with no model). The grant is the one standing departure from the rules on validation and independent acceptance; it is written, expires, lapses when either record slips, and every finding the system validated itself is labeled.
- Rule 3 reads everywhere as "Findings enter the record only after validation and an independent reproduction."
- An interface point below aligned for longer than `module_alignment_max_days` (by default the exception ceiling, 180 days) is refused unless an exception covers it.

### Added

- Jig, the sibling secure-creation design, as the pluggable module `secure-creation`: proven classes, pass-or-fail checks derived from kept tests and vetted road entries flow to it; provenance per change, leads before its triage and dropped-check records flow back. Its three separations (merger versus author, catch-layer assigner, drift reporter) are enforced.
- Contracts for every relationship between planes, including new ones: SourceRecord, RouteUsage, CredentialLease, DefensiveObservation, ReviewClaim, GatedResponse, ApprovalOutcome, DerivedCheck, ChangeProvenance, DroppedCheck, ProvenClass, RoadAssuranceStatus and AutonomyGrant.
- Model checks: agent reach (nothing a coding agent, the context builder or a producer can reach receives a proof condition, a full regression test, a verdict reference or untrusted text), module declarations, and uncontracted plane joins as errors.
- Profile fields: `phase_1_boundary.runner_limit`, `separation.evaluation_team`, the secure-creation roles, and `current_practice.modules`; and the dial `module_alignment_max_days`.
- Claims CL-33 to CL-35 on AI's capability to find and exploit weaknesses, graded.
- Appendix E: an evidence-weighted comparison with the market, with each vendor's figures attributed to the vendor.

### Changed

- Work units: the restore game day moves to phase 4 beside its drill; the registry lock moves into phase 3. Every automated verifier or evaluator in phase 3 now carries an entry check.
- The reference text names Jig where it used to call secure creation separate work.
<a id="changelog-2-2-0-2026-10-17"></a>
## [2.2.0] - 2026-10-17

### What an agent holding 2.1.2 should do

1. Nothing stored needs renaming; every 2.1.2 profile and organization patch stays valid.
2. Load the adopters' skill that now ships with the edition (`SKILL.md` and its workflows) and start from its start workflow. It is the supported way to fit Ratchet to the organization, change the design and take later editions.
3. Before relying on any check, build the organization's tools from the specifications and prove each one against its fixtures, as the build-tools workflow describes. Record which tools pass in `org/CHANGELOG.md`.
4. If the organization filled the profile template shipped with 2.1.x, check the indentation under `modules` and `current_practice`. That template lost its nesting, so those sections may not read as intended. This edition's template keeps it.

### Renamed identifiers

```yaml
renames: []
```

### Added

- The adopters' skill: `SKILL.md` and nine workflows (start, map current practice, fill the profile, change the design, tailor the narrative, run a phase, upgrade, send changes upstream, build the tools). Every design change the organization makes names its risks and its threat model.
- Eight tool specifications: patch applier, upgrade, model checks, profile checker, readiness, impact report, unit graph and status report. Code ships only as specifications; the organization builds the tools in its own languages.
- Acceptance fixtures for every specification, each with its expected result. Every expected result came from running a reference implementation, so a tool that matches them behaves as the reference does.
- The design as YAML data: model, rules, profile schema, quality, realization, failures, cloud overlay, work units and readiness.
- `rules.yaml` now lists every check, warning and schema code, the ownership verdict table and the parts that enforce rules.

### Changed

- Each profile checker finding carries a kind, a code, a location and a message; should-never findings also carry their card and invariant. Error counts on existing profiles are unchanged.
- A warning about a missing companion answer now waits until its section is answered, so an empty starter raises none.
- The readiness report names what to ask next as `ask_next`, lists every open section in `open`, and gives each open section the core default that stands in meanwhile.
- Two rule conditions now say "is false" where they were ambiguous: continuous cadence without preapproval, and shipping through an outage without replay.
- The profile template keeps its indentation.

<a id="changelog-2-1-2-2026-10-17"></a>
## [2.1.2] - 2026-10-17

### What an agent holding 2.1.1 should do

Nothing. This release rewords two sentences in the 2.1.1 entry of this changelog. No identifier, rule, profile field or narrative passage changed.

### Renamed identifiers

```yaml
renames: []
```

### Changed

- Two sentences in the 2.1.1 entry reworded for plain reading.

<a id="changelog-2-1-1-2026-10-17"></a>
## [2.1.1] - 2026-10-17

### What an agent holding 2.1.0 should do

Nothing stored changes. A tailored narrative that quotes "The ask", "Decision: approve phases 1 and 2" or "Requested now" should present the plan instead. Any request to approve phases belongs to the organization's own decision process.

### Renamed identifiers

```yaml
renames: []
```

### Changed

- The thesis presents the plan: "The ask" is now "The plan at a glance" (phases 1 and 2, cost, getting started, stop conditions), with no decision line or approvers. The opening heading and the phase definition say the first two phases do most of the learning and the plan widens only on what they measure. The phases diagram no longer marks phases as requested.

<a id="changelog-2-1-0-2026-10-17"></a>
## [2.1.0] - 2026-10-17

### What an agent holding 2.0.0 should do

1. Nothing stored needs renaming; every 2.0.0 profile stays valid.
2. Before anything else, map how the organization's loop works today in the new optional `current_practice` section, with the people who run each step: who runs discovery and how freely, who checks findings end to end and in how many days, where findings go, and the state of each step. Record it without judging anyone.
3. Ask where phase 1's weakness will come from and record it in `phase_1_boundary.source`. If it is a real finding, record `agent_drafts_only: true` once confirmed.
4. Re-read the field guide: premise 16 and step 1 of "How to tailor" are new, branch C now opens on the organization's own discovery practice, and the hand-back list gains the current-practice map.

### Renamed identifiers

```yaml
renames: []
```

### Changed meaning

- **Phase 1's weakness can come from three places**, by the organization's choice: a practice target, a finding from its existing discovery practice, or a recent finding. The boundary that keeps phase 1 outside the model-injection rule now depends on that choice. A practice target keeps the four synthetic conditions. A real finding requires the agent to draft only (no tools; people run every approved action) and to exit only through the approved model route, and the checker refuses a profile that records otherwise. An unanswered field never refuses; it warns.

### Added

- **`current_practice`** (optional profile section): the discovery practice (who, targets, agents and models, latitude: free-running, scoped or action-approved; the end-to-end check and its days; where findings go) and each loop step's state (established, partial, ad hoc, absent), owner and evidence. It is the first interview question.
- **`phase_1_boundary.source`** (practice-target, discovery-finding, recent-finding; absent means practice-target) and **`phase_1_boundary.agent_drafts_only`**.
- **Discovery as a lead source.** Findings from people running agents against repositories or infrastructure enter as leads; a scenario owner turns one into a scenario that records its originating finding, its proof condition and where the end-to-end check runs (approved test environment, replica, read-only production, or the production-effects module) or that it settles by review.
- **A proof-condition drafter**: a tool-less model on its own route that drafts a proof condition and shows it only to the scenario owner, who corrects and signs it. A new model check (isolated draft) fails the design if the drafter sends anything except model requests through the request-data gate and drafts to a person, or if it receives the context built for test-drafting agents.
- **The scenario owner** as a named role in the model and glossary.
- Three work units: map today's loop (phase 1), start a scenario from the discovery practice (phase 1), and build the drafter with a planted-marker isolation check (phase 2).
- A question in the six-page narrative: "We already run agents against our code and infrastructure. Where does that fit?"
- Decision log rows 25 and 26.

### Fixed

- The agents' entry guide told agents to record exceptions under a profile field named `departures`; the field is `exceptions`. Its wording now matches.

### Unchanged

- Every evidence grade, the four rules and the stop conditions.

<a id="changelog-2-0-0-2026-10-17"></a>
## [2.0.0] - 2026-10-17

### What an agent holding 1.0.0 should do

1. Apply the renames below to the stored profile and to any notes, premise ledger or tailored narrative that quote the old names.
2. Run the readiness check again. No section was added or removed, so the readiness result should not change unless the profile was already failing.
3. Re-read rule 2. It now keeps the proof condition from the testing agent only, and a separate drafting model may help the scenario owner write it. A tailored narrative that says "no agent can read it" should change to "the agent that proposes and runs the test never sees it".
4. Re-read the field guide (Appendix D of the six-page narrative). Premise 15 is new, and so is the section on building the fix path with developer experience; their output adds an item to what an agent hands back.
5. Replace any status language based on reaching a checkpoint with the phase status: green, yellow or red.
6. No evidence grade changed. Keep the grades in any tailored narrative as they were.

### Renamed identifiers

```yaml
renames:
  - { kind: profile-field, from: checkpoint_1_boundary, to: phase_1_boundary }
  - { kind: profile-field, from: "exceptions[].checkpoint_1_only", to: "exceptions[].phase_1_only" }
  - { kind: exception-policy, from: checkpoint_1_only, to: phase_1_only }
  - { kind: rule-code, from: model.cp1-boundary-unconfirmed, to: model.phase1-boundary-unconfirmed }
  - { kind: trade-off-card, from: "card:answer-key", to: "card:proof-condition" }
  - { kind: separation, from: "sep:answer-key-proposer", to: "sep:proof-condition-proposer" }
  - { kind: delivery-point, from: "checkpoint:1", to: "phase:1" }
  - { kind: delivery-point, from: "checkpoint:2", to: "phase:2" }
  - { kind: delivery-point, from: "checkpoint:3", to: "phase:3" }
  - { kind: delivery-point, from: "checkpoint:4", to: "phase:4" }
  - { kind: delivery-point, from: "checkpoint:5", to: "phase:5" }
  - { kind: duration, from: "duration:checkpoint-N", to: "duration:phase-N" }
  - { kind: capability, from: cap.cp1-criteria-and-departures, to: cap.phase1-criteria-and-departures }
  - { kind: capability, from: cap.cp2-gate-accepted, to: cap.phase2-gate-accepted }
  - { kind: report-field, from: next_checkpoint, to: next_phase }
  - { kind: report-field, from: checkpoint_name, to: phase_name }
  - { kind: report-field, from: by_checkpoint, to: by_phase }
  - { kind: work-unit-field, from: checkpoint, to: phase }
  - { kind: term, from: evidence checkpoint, to: phase }
  - { kind: term, from: answer key, to: proof condition }
  - { kind: rule-name, from: "Expected answers stay out of the agent's reach", to: "Proof conditions stay out of the testing agent's reach" }
```

### Changed meaning

- **Phases replace evidence checkpoints.** A phase is a stretch of work that ends when its test, written in advance, passes. Each phase reports green (on course), yellow (behind its plan by days or a week, an early warning moving, or a premise found false; the decision owner names a recovery step and a date) or red (a stop condition has fired; the work stops until the decision owner decides). Phase 1 running past its planned weeks turns yellow; only reaching the end of its six-week timebox turns it red.
- **Time is planned in weeks or days, never tracked in hours.** Where a cost needs effort, such as the cost of verifying agent output in the phase 3 comparison, the effort is estimated, for example from rates the organization already uses, and reported as an estimate. The phase 1 criteria now name the weeks the phase should take and the expected wait at each handoff, in place of hours per role.
- **The proof condition** (formerly the answer key) says what the running system must show for a weakness to count as real, what would show it is not, and what must still work for legitimate users. The scenario owner writes it, often from a language model's draft. The drafting model runs as a separate route with no tools, and nothing it sees reaches the testing agent.
- **Agent findings are described as valid locally and unproven end to end.** An agent can show code is flawed without showing that anyone can reach the flaw through the running system; a security operations team checks each finding by hand today. The graded claim behind this keeps its wording and grade.
- **The deploy gate's outage behavior follows the assets the weakness reaches**, stated plainly: deploys go ahead with a record when only standard assets are reached, and wait when a critical or crown-jewel asset is reached unless the business risk owner, with the security risk owner's agreement, accepts shipping for a short, recorded period. This was the design already; one sentence in the six-page narrative had keyed it to the service.

### Added

- **The fix path.** Even with no false findings, a sudden flow of validated risk competes with the business's ability to ship. Security helps build the fix path with the owning teams: a fix arrives with a test that reproduces the weakness, its variants already checked, and evidence that legitimate use still works. Sending findings faster is listed as a rejected path. Each team receives only what its fix capacity can absorb.
- **Building the fix path with developer experience**, in the field guide: questions to ask whoever owns developer experience or the internal developer platform, how to record overlaps and conflicts, premise 15, and shared-work candidates in what the agent hands back. The shared work itself is left for each organization to design.
- **The authors' expectation about agents and scripts**, labeled as an expectation: an agent will rarely find something a well-built script misses, at least early on, and no study has tested this on an enterprise's own systems.
- **Linked sources.** The evidence tables carry a Sources column, and the evidence ledger links each published source. Internal reviews and AI-assisted syntheses are marked "not published". Five citations were corrected (author order, spelling, a missing year, and two labels for one study merged).
- **Plain definitions** of work units, parts, swap points, "existing tool first" and the four optional modules, each with the evidence that switches it on.
- **The meeting when a service leaves its delivery tolerance:** the service owner, the security risk owner and the decision owner meet; the options include tuning the gate, narrowing what triggers it, returning it to advisory, or recording an exception; one of them owns the decision and writes it down with its reason.
- **Quarterly status report**, carrying each phase's status and its reason.
- Decision log rows 23 (phases, status, weeks over hours) and 24 (proof condition).
- This changelog, and a version stamp on every file.

### Changed

- The availability appendix leads with what an outage means for teams that ship: only the deploy gate can hold up a release, and the other two paths make security work wait.
- A prose pass removed constructions that read as machine-written; each rewrite keeps its claim.

### Unchanged

- Every evidence grade, the stop conditions and the four rules' substance, except rule 2's scope as described above.

<a id="changelog-1-0-0-2026-10-17"></a>
## [1.0.0] - 2026-10-17

The first versioned edition: the thesis, the plan, the plan in practice, the architecture, references R1 to R7, Annex A1 to A3, and the six-page narrative with its field guide for agents. Earlier copies carry no version and should be treated as 1.0.0 or older.
