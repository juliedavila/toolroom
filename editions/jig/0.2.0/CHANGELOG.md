# Changelog

*Jig. Changelog. Edition 0.2.0, 2026-10-31, build c84932b2.*

*How each Jig edition differs from the one before it, written for the agent that consumes it on an organization's behalf. Every file in an edition is stamped with its version.*

Versions follow semantic versioning. While Jig is below 1.0.0, a minor version may change something an organization has stored, and says so under a heading of its own; 1.0.0 comes when its authors judge the seam between Jig and Ratchet settled. A patch version changes wording, corrections and links only.

Each version lists its renames in a block an agent can read and apply, then what changed. When the layer Jig and Ratchet share changes, the entry says so in a section headed "Shared layer".

## [0.2.0] - 2026-10-31

### Added

Jig now ships its own adopter skill, so an organization's agent holding Jig alone has instructions for adopting it. Load `SKILL.md` (skill name `jig-adopter`) and start with `workflow-start.md`. The skill's core is seeding (`workflow-seed.md`): before any tailoring, the agent maps how the organization creates code today, stage by stage, from local sources the person names, and records each finding with its source and date as discovered. A person confirms a finding; the agent never does. The other workflows fill the profile, change the design, upgrade (including adding Ratchet to a Jig workspace by a reviewed migration of the patches), send improvements upstream and add Jig to Plumb.

Seeding and the profile need no tools. Design changes need a verified Ratchet edition for its tools. Without one, every patch acceptance, model check, unit-graph check, impact report and threat grid is blocked and listed as unchecked. With one, kept read-only beside Jig, `workflow-change-design.md` gives the commands for Jig alone, and the governance roles come from the Jig profile. Ratchet's profile checker, readiness tool, status report and upgrade tool do not apply to Jig alone.

Two new design files hold the organization's Jig profile. `profile-schema.yaml` is JSON Schema 2020-12, and `profile-template.yaml` holds every field, unanswered. Each answer an organization can confirm on its own is a record with its value, its evidence (one entry per source read, kept as history), its confirmation and the confirmed values a person later replaced, so confirming one answer never confirms another. The profile records governance for Jig alone (the security and business risk owner roles, the roles allowed to accept a patch, and the fixed rule that a proposer never accepts), the creation surfaces, each coding agent with whether it can run a check after each edit and when its turn stops, the Jig parts found in place with their rung on the ladder, one entry per stage, dependency admission, secrets, paved roads, the seven Ratchet waits and the open questions with who can answer them. A Ratchet or substitute provider releases a wait only once a person confirms it, and the waiting stage still needs its own exit-test evidence.

The skill reuses Ratchet's tool bundle by name and ships no tool and no tool specification. One workspace holds Jig and Ratchet when an organization adopts both, with Jig's released files under `upstream/pins/jig/` as Ratchet's start workflow already describes.

### Changed

The Plumb model file lists every unit that tests a premise under the premise's `tested_by`, in Plumb's canonical reference form: Jig's own units by bare id, other designs' units qualified, such as `ratchet:U-198`. A typed reference such as `ratchet:unit/U-198` is read as that unit. A reference to a record that is not a unit, to the shared or organization namespace, or to an own unit that does not exist stops the build. The file no longer writes `measured_by` on premises, because Plumb reads that field as a flow metric. A Plumb workspace that composes Jig with Ratchet resolves the qualified ids; a lone Jig design shows them as external work. Plumb tracks the released edition as shipped: an organization's patches do not reach Plumb's pages in this release.

Premise JC-36 listed a sentence among the work units that settle it. The sentence (the policy-owning team reads the class-test totals directly as people, never an agent, and the suite and measurement plane receive only a binary rule result) now ends the premise's load text, unchanged. Its list of settling units is unchanged otherwise.

No design change. A filled profile did not exist before this edition, so nothing an organization stored changes.

### Shared layer

Shared layer 0.1.2 changes one review mark: the proven-class disclosure rule's mark names the role `independent reviewer`, dated as before. No contract, crossing, seam or premise changed. Ratchet 5.1.3 ships the same file.

### Renamed identifiers

```yaml
renames: []
```

## [0.1.3] - unreleased

### Added

Plumb interface 1 files (plumb/engine.yaml, plumb/model.yaml and plumb/plan.yaml) ship with their hashes in edition.yaml. An organization can add this edition directly through Plumb. No design change or shared-layer change.

### Renamed identifiers

```yaml
renames: []
```

## [0.1.2] - unreleased

### Design fixes

Regenerate Jig's design and contract schemas, then recheck local references against the shared contracts below. TrackerText is now a shared contract. Its text still reaches only the quarantined reader. Existing Jig claims retain their wording and grade.

### Shared layer

#### Design fixes

Shared layer 0.1.1 moves GateFailurePosture, ToolLead, DeliveryTelemetry, ChangeProvenance, TrackerText and ChangeRecord into the common contract vocabulary. Their delivery rules and reader declarations move with them. Use shared-qualified contract references in local relationships and layers. The emergency rollback crossing now explains why it carries no Ratchet record. Both edition lines must ship the same shared bytes.

### Renamed identifiers

```yaml
renames:
  - {kind: contract, from: "TrackerText", to: "shared:TrackerText"}
```

## [0.1.1] - unreleased

Jig now composes alone from its shipped files and shared layer without repairing its records. This is a correction to packaging and namespace projection. It adds no design variant and changes no shared agreement.

### What an adopter should do

Use the current README's first-run procedure for a fresh adoption. Its complete Bun recipe verifies the edition record, merges the shared vocabulary and attached failure scenarios, keeps incident crossings and builds declared far-side boundaries. The unit input qualifies shared capability declarations and requirements together. Run the model and layer checks on that output. Existing adopters should regenerate from their accepted inputs and check the result before replacing a compiled copy.

Views retain `ratchet:` on foreign references. Harness compensation names an own part with a bare id. An absent finding-kind registry stays absent. Units name shared capabilities with `shared:`. Overlay checks apply the shared vocabulary's rule meaning while retaining its identity. The pipeline now checks the standalone procedure from the shipped README and Jig folder, with no Ratchet design input.

The README distinguishes agreement-change acceptance from a plain model check and explains the organization's exception mapping and acceptor identity. Module declaration checks do not apply to Jig alone. Units use phase for stage membership and omit the redundant claims field that held stage ids. The graph reports direct external waits by unit, stage, capability and absent provider. Phase self-containment still means closure within the design. Shared owner bindings carry confirmed or provisional basis, and provisional assignments remain current-practice gaps until confirmed.

Use `edition.yaml` for the bare version and release state. Jig 0.1.0 is released. Its historical changelog heading said unreleased in error. That entry and the released tag remain unchanged. The new 0.1.1 entry describes an unreleased correction.

### Renamed identifiers

```yaml
renames: []
```

## [0.1.0] - unreleased

Jig is the secure-creation loop as a design of its own: the place where developers and coding agents write code, steered toward secure patterns and checked between the first edit and the merge. Its records were split out of Ratchet, it shares one layer with Ratchet, it ships design files only, and its prose argument is still in draft.

### What an agent holding Ratchet 4.2.0 should do

1. Treat Jig as a new line with its own version and changelog, and a new folder to check against its `edition.yaml`. There is no earlier Jig edition, so nothing of Jig's replaces anything you hold. Ratchet 5.0.0 ships with this edition pinned.
2. Apply the renames block below to anything you stored that names a moved record: views, elements, contracts, relationships, failure scenarios, work units and premises. Jig's ids are bare inside its own files. Ratchet's edition and any composed model name them with the `jig:` prefix.
3. Record that no premise JP-34 exists in Jig. It became a shared premise, and the renames block has no row for it.
4. Fill in the two things an organization owns before its first run (Added, "Before the first run"): the end date of the shipped exception on the seam, and the owner identities on the shared agreements.
5. Choose how to compose the design. Run Jig alone, or run it beside Ratchet (Added, "Checks and composition"). If you run it alone, expect its stages to hold until the Ratchet capabilities they wait on are met.
6. Read the known issues below before relying on any stage's exit test.

### What changed

The creation loop left Ratchet's design and became Jig's. Its parts, roles, relationships, contracts, failure scenarios, work units and premises moved into Jig's files, and the renames block maps every old id to its new one. Jig's premises were regraded in this release: 35 premises, JC-01 to JC-36 with no JC-34, each carrying its grade and the design items it rests on. JC-17, JC-24 and JC-29 stay Jig's own and each links to the Ratchet premise it narrows.

Two work units that straddled the seam were split, each into a sending half in Ratchet and a receiving half in Jig, joined by a capability and given a check of its own. Jig's receiving halves are new units, JU-01 (class to rule) and JU-02 (typed handoff). The first unit, U-430, now names `ProvenanceStamp` where it named `ChangeProvenance`.

Each design now numbers its own stages. A wait that crosses into the other design is reported on its own, and cycles and chains are judged across both.

### Added

**Five stages, each with an exit test.** Jig's units sit in five stages of its own, and a stage claims its exit test only when the waits below it are met.

| Stage | Exit test | Units |
|---|---|---|
| 1. Attribute | A baseline rate of escaped defects by origin, the measured share of changes the harnesses can stamp, and closed-cohort self-fix and catch-rate measurement | U-430, U-436, JU-01 |
| 2. One check, many places | The same findings at agent time and pull-request time, effective false positives under 10% at pull request, and the replay-miss gaming watch with owner retirement | U-431, U-438, JU-02 |
| 3. Agent fixes first | Findings per AI-written hunk at pull request fall at least 50%, and the self-fix hold rate is measured | U-432 |
| 4. Focus the humans | Escaped defects fall while review time per pull request holds flat | U-433, U-437 |
| 5. Pave the road | Targeted classes trend toward zero | none in this edition |

The order guarantees that no stage relies on feedback a later stage delivers. Self-fix measurement sits in Attribute, before derived checks are relied on, and the gaming watch sits in One check, many places, beside the first use of a derived check.

**What Jig reaches alone, and what it waits on.** Run alone, Jig starts by inventorying the premises its loop relies on and the coverage of its harnesses. No stage can claim its exit test until its Ratchet waits are met, and this edition provides no substitute for any of them. The seven capabilities are declared in the shared layer and required by Jig's units:

- creation-loop targets, which U-430 waits on;
- derived checks, which U-431 waits on;
- catch-layer attribution, which U-436 waits on;
- lagged cohort reporting, which U-436 and U-437 wait on;
- derived-check miss counts, which U-438 waits on (Ratchet counts the misses and sends Jig only the count, and the owner of the check suite retires a gamed check);
- published class-test counts, which JU-01 waits on;
- published typed handoffs, which JU-02 waits on.

**Checks and composition.** Jig ships no tool specification. Ratchet 5.0's tools check Jig's files: the model checks, the work-unit graph, the impact report and the threat grid run on a composed model, in four compositions (both designs with the shared layer, each design alone with it, and Ratchet's core with no module). Alone, each crossing is judged at Jig's edge from the far side's declared exposure, which the shared layer holds. Every crossing endpoint declares its exposure, and a missing declaration fails the build. To run Jig beside Ratchet, compose Ratchet's edition with the Jig edition it pins; the two folders must hold the same bytes for `seams.yaml`, and the composition refuses otherwise. To run Jig alone, compose Jig's folder with its own `seams.yaml`.

**Before the first run, an organization fills in two things.**

- The exception on the secure-creation seam ships with no end date. It covers the three measurement feeds the two designs are still settling (the catch layer of each accepted defect, each reviewer's seeded catches, and the loop's log of dropped checks), and its acceptor is the security risk owner role. The bare edition warns and lets it cover those feeds. In any organization composition it is an error and covers nothing until the organization sets a calendar date in its own layer, and a past date is expired. Set a near end and name the person or team that accepts it.
- Each shared contract and premise carries owner records for each side, with the role shipped and the identity left empty. Fill every identity. The build requires those owners' acceptance in every composition, Jig alone included, and refuses a change to a shared agreement until they accept it.

### Known issues

1. Jig's three review models (the hunk-risk advisor, the AI reviewer and pull-request triage) share the coding agent's model route. The premise that code comes only from the organization's own engineers has a fallback that covers only what the coding agent reads. If you take outside contributions, keep those changes away from the review models yourself. Jig's next release redraws the routes.
2. Planted changes may look planted. A real change picks up triage labels, AI review comments, routing and a provenance stamp on its way through the protected branch, and a planted one does not, so a reviewer's seeded catch rate can read higher than the truth. Read the reviewer drift report with that in mind. Ratchet 5.1 draws a path through the pull-request plane that makes planted changes look real.
3. A gamed derived check can be retired, but a request back to Ratchet to rework it is not drawn. The owner of the check suite retires the check, and its kept test still catches the weakness at the pipeline's regression stage. Ratchet 5.1 draws the rework request.
4. Exceptions to blocking have no review date and no longest end. An end can sit far in the future or name a milestone no design holds, and the exception then stays in force with nobody deciding that it should. Write a near end and a named acceptor on every exception you add, the seam exception included.
5. Of the three records that reach Jig's agent-reachable parts, two keep their disclosure rule proposed and one is reviewed, and all three carry residuals. For `DerivedCheck` (proposed), nothing enforces the free-text bounds on a body or message, so review each one before sending it to an agent-readable suite. For `ProvenClass` (reviewed by the design owner), per-class counts go to the policy-owning team, which is people and never an agent, and a class definition has no send-time check against the estate inventory for a service id or name, so review each definition and keep the human totals out of published rules, guidance and prompts. For `RoadAssuranceStatus` (proposed), scope and limits are free text with no mechanical check, and cross-record inference remains possible. Joining a status flip, a class-version change and a dropped road claim can reveal a failed class answer or a leak to a reader, the model provider included; this is an accepted risk. An organization that needs to reduce it can batch status and projection changes on a fixed schedule and keep a neutral "not answering" claim in place of a dropped one.
6. The engineering-system part in the shared layer combines the protected regression stage with the pull-request, tracker and release surfaces. Its unreachable declaration describes the protected stage while its exposure covers the wider system. The next shared revision splits those permission contexts.
7. Pave the road has an exit test and no unit in this edition, so nothing in Jig's plan advances it yet.
8. Every unit's flow item defaults to risk, set by one written rule, so most units read as risk items. The mix is not a measured demand mix.
9. Premise JC-33 rests on a design record that is not published. The premises grade every other claim against its sources, and several grade the remedy below the threat, so read each grade beside its premise before relying on a stage.
10. Jig's prose argument is still in draft, and the edition ships design files only.

### Renamed identifiers

Apply each row to anything you stored: a `view`, `element`, `contract`, `relationship`, `failure`, `unit` or `claim` whose id equals `from` takes the id in `to`.

```yaml
renames: 
  - {kind: view, from: design-change-57, to: creation-control}
  - {kind: view, from: design-change-55, to: creation-loop}
  - kind: element
    from: ext.secure-creation
    to: secure-creation
  - kind: element
    from: jig.context-plane
    to: context-plane
  - kind: element
    from: jig.check-suite
    to: check-suite
  - kind: element
    from: jig.inner-loop
    to: inner-loop
  - kind: element
    from: jig.coding-agent
    to: coding-agent
  - kind: element
    from: jig.harness-full-parity
    to: harness-full-parity
  - kind: element
    from: jig.harness-no-pinning
    to: harness-no-pinning
  - kind: element
    from: jig.harness-no-stop-gate
    to: harness-no-stop-gate
  - kind: element
    from: jig.edit-checks
    to: edit-checks
  - kind: element
    from: jig.stop-gate
    to: stop-gate
  - kind: element
    from: jig.quarantined-reader
    to: quarantined-reader
  - kind: element
    from: jig.reader-schema-gate
    to: reader-schema-gate
  - kind: element
    from: jig.model-routes
    to: model-routes
  - kind: element
    from: jig.reader-model-route
    to: reader-model-route
  - kind: element
    from: jig.repository
    to: repository
  - kind: element
    from: jig.change-boundary
    to: change-boundary
  - kind: element
    from: jig.precommit-gate
    to: precommit-gate
  - kind: element
    from: jig.provenance-stamper
    to: provenance-stamper
  - kind: element
    from: jig.protected-branch
    to: protected-branch
  - kind: element
    from: jig.pr-plane
    to: pr-plane
  - kind: element
    from: jig.pr-analysis
    to: pr-analysis
  - kind: element
    from: jig.pr-triage
    to: pr-triage
  - kind: element
    from: jig.ai-reviewer
    to: ai-reviewer
  - kind: element
    from: jig.hunk-router
    to: hunk-router
  - kind: element
    from: jig.hunk-risk-advisor
    to: hunk-risk-advisor
  - kind: element
    from: jig.autofix
    to: autofix
  - kind: element
    from: jig.measurement-plane
    to: measurement-plane
  - kind: element
    from: ext.outside-text
    to: outside-text
  - kind: element
    from: ratchet:people.creation-developer
    to: people.creation-developer
  - kind: element
    from: ratchet:people.change-reviewer
    to: people.change-reviewer
  - kind: element
    from: ratchet:people.high-risk-reviewer
    to: people.high-risk-reviewer
  - kind: element
    from: ratchet:people.creation-policy-owner
    to: people.creation-policy-owner
  - kind: contract
    from: ratchet:HunkRouteAdvice
    to: HunkRouteAdvice
  - kind: contract
    from: ratchet:CreationOutcome
    to: CreationOutcome
  - kind: contract
    from: ratchet:ReviewerDrift
    to: ReviewerDrift
  - kind: contract
    from: ratchet:LayerCatchRate
    to: LayerCatchRate
  - kind: contract
    from: ratchet:TrackerText
    to: TrackerText
  - kind: relationship
    from: ratchet:p55-r1
    to: p55-r1
  - kind: relationship
    from: ratchet:p55-r2
    to: p55-r2
  - kind: relationship
    from: ratchet:p55-r3
    to: p55-r3
  - kind: relationship
    from: ratchet:p55-r4
    to: p55-r4
  - kind: relationship
    from: ratchet:p55-r5
    to: p55-r5
  - kind: relationship
    from: ratchet:p55-r6
    to: p55-r6
  - kind: relationship
    from: ratchet:p55-r7
    to: p55-r7
  - kind: relationship
    from: ratchet:p55-r8
    to: p55-r8
  - kind: relationship
    from: ratchet:p55-r9
    to: p55-r9
  - kind: relationship
    from: ratchet:p55-r75
    to: p55-r75
  - kind: relationship
    from: ratchet:p55-r76
    to: p55-r76
  - kind: relationship
    from: ratchet:p55-r11
    to: p55-r11
  - kind: relationship
    from: ratchet:p55-r12
    to: p55-r12
  - kind: relationship
    from: ratchet:p55-r13
    to: p55-r13
  - kind: relationship
    from: ratchet:p55-r14
    to: p55-r14
  - kind: relationship
    from: ratchet:p55-r15
    to: p55-r15
  - kind: relationship
    from: ratchet:p55-r16
    to: p55-r16
  - kind: relationship
    from: ratchet:p55-r17
    to: p55-r17
  - kind: relationship
    from: ratchet:p55-r18
    to: p55-r18
  - kind: relationship
    from: ratchet:p55-r19
    to: p55-r19
  - kind: relationship
    from: ratchet:p55-r20
    to: p55-r20
  - kind: relationship
    from: ratchet:p55-r21
    to: p55-r21
  - kind: relationship
    from: ratchet:p55-r22
    to: p55-r22
  - kind: relationship
    from: ratchet:p55-r23
    to: p55-r23
  - kind: relationship
    from: ratchet:p55-r24
    to: p55-r24
  - kind: relationship
    from: ratchet:p55-r25
    to: p55-r25
  - kind: relationship
    from: ratchet:p55-r26
    to: p55-r26
  - kind: relationship
    from: ratchet:p55-r27
    to: p55-r27
  - kind: relationship
    from: ratchet:p55-r28
    to: p55-r28
  - kind: relationship
    from: ratchet:p55-r29
    to: p55-r29
  - kind: relationship
    from: ratchet:p55-r30
    to: p55-r30
  - kind: relationship
    from: ratchet:p55-r33
    to: p55-r33
  - kind: relationship
    from: ratchet:p55-r34
    to: p55-r34
  - kind: relationship
    from: ratchet:p55-r35
    to: p55-r35
  - kind: relationship
    from: ratchet:p55-r36
    to: p55-r36
  - kind: relationship
    from: ratchet:p55-r37
    to: p55-r37
  - kind: relationship
    from: ratchet:p55-r38
    to: p55-r38
  - kind: relationship
    from: ratchet:p55-r39
    to: p55-r39
  - kind: relationship
    from: ratchet:p55-r40
    to: p55-r40
  - kind: relationship
    from: ratchet:p55-r41
    to: p55-r41
  - kind: relationship
    from: ratchet:p55-r42
    to: p55-r42
  - kind: relationship
    from: ratchet:p55-r43
    to: p55-r43
  - kind: relationship
    from: ratchet:p55-r44
    to: p55-r44
  - kind: relationship
    from: ratchet:p55-r45
    to: p55-r45
  - kind: relationship
    from: ratchet:p55-r46
    to: p55-r46
  - kind: relationship
    from: ratchet:p55-r47
    to: p55-r47
  - kind: relationship
    from: ratchet:p55-r48
    to: p55-r48
  - kind: relationship
    from: ratchet:p55-r49
    to: p55-r49
  - kind: relationship
    from: ratchet:p55-r50
    to: p55-r50
  - kind: relationship
    from: ratchet:p55-r51
    to: p55-r51
  - kind: relationship
    from: ratchet:p55-r52
    to: p55-r52
  - kind: relationship
    from: ratchet:p55-r53
    to: p55-r53
  - kind: relationship
    from: ratchet:p55-r54
    to: p55-r54
  - kind: relationship
    from: ratchet:p55-r55
    to: p55-r55
  - kind: relationship
    from: ratchet:p55-r56
    to: p55-r56
  - kind: relationship
    from: ratchet:p55-r57
    to: p55-r57
  - kind: relationship
    from: ratchet:p55-r58
    to: p55-r58
  - kind: relationship
    from: ratchet:p55-r59
    to: p55-r59
  - kind: relationship
    from: ratchet:p55-r60
    to: p55-r60
  - kind: relationship
    from: ratchet:p55-r61
    to: p55-r61
  - kind: relationship
    from: ratchet:p55-r62
    to: p55-r62
  - kind: relationship
    from: ratchet:p55-r63
    to: p55-r63
  - kind: relationship
    from: ratchet:p55-r64
    to: p55-r64
  - kind: relationship
    from: ratchet:p55-r65
    to: p55-r65
  - kind: relationship
    from: ratchet:p55-r66
    to: p55-r66
  - kind: relationship
    from: ratchet:p55-r67
    to: p55-r67
  - kind: relationship
    from: ratchet:p55-r68
    to: p55-r68
  - kind: relationship
    from: ratchet:p55-r71
    to: p55-r71
  - kind: relationship
    from: ratchet:p55-r72
    to: p55-r72
  - kind: relationship
    from: ratchet:p55-r73
    to: p55-r73
  - kind: relationship
    from: ratchet:p55-r74
    to: p55-r74
  - kind: failure
    from: ratchet:F128
    to: F128
  - kind: failure
    from: ratchet:F130
    to: F130
  - kind: failure
    from: ratchet:F133
    to: F133
  - kind: unit
    from: ratchet:U-430
    to: U-430
  - kind: unit
    from: ratchet:U-431
    to: U-431
  - kind: unit
    from: ratchet:U-432
    to: U-432
  - kind: unit
    from: ratchet:U-433
    to: U-433
  - kind: unit
    from: ratchet:U-436
    to: U-436
  - kind: unit
    from: ratchet:U-437
    to: U-437
  - kind: unit
    from: ratchet:U-438
    to: U-438
  - kind: claim
    from: JP-01
    to: JC-01
  - kind: claim
    from: JP-02
    to: JC-02
  - kind: claim
    from: JP-03
    to: JC-03
  - kind: claim
    from: JP-04
    to: JC-04
  - kind: claim
    from: JP-05
    to: JC-05
  - kind: claim
    from: JP-06
    to: JC-06
  - kind: claim
    from: JP-07
    to: JC-07
  - kind: claim
    from: JP-08
    to: JC-08
  - kind: claim
    from: JP-09
    to: JC-09
  - kind: claim
    from: JP-10
    to: JC-10
  - kind: claim
    from: JP-11
    to: JC-11
  - kind: claim
    from: JP-12
    to: JC-12
  - kind: claim
    from: JP-13
    to: JC-13
  - kind: claim
    from: JP-14
    to: JC-14
  - kind: claim
    from: JP-15
    to: JC-15
  - kind: claim
    from: JP-16
    to: JC-16
  - kind: claim
    from: JP-17
    to: JC-17
  - kind: claim
    from: JP-18
    to: JC-18
  - kind: claim
    from: JP-19
    to: JC-19
  - kind: claim
    from: JP-20
    to: JC-20
  - kind: claim
    from: JP-21
    to: JC-21
  - kind: claim
    from: JP-22
    to: JC-22
  - kind: claim
    from: JP-23
    to: JC-23
  - kind: claim
    from: JP-24
    to: JC-24
  - kind: claim
    from: JP-25
    to: JC-25
  - kind: claim
    from: JP-26
    to: JC-26
  - kind: claim
    from: JP-27
    to: JC-27
  - kind: claim
    from: JP-28
    to: JC-28
  - kind: claim
    from: JP-29
    to: JC-29
  - kind: claim
    from: JP-30
    to: JC-30
  - kind: claim
    from: JP-31
    to: JC-31
  - kind: claim
    from: JP-32
    to: JC-32
  - kind: claim
    from: JP-33
    to: JC-33
  - kind: claim
    from: JP-35
    to: JC-35
  - kind: claim
    from: JP-36
    to: JC-36
```

### Shared layer

This is the shared layer's first version, 0.1.0, so everything in it is new. It ships byte for byte as `seams.yaml` in both editions, and `edition.yaml` records its version and SHA-256 (2ae110aaed3e6fd69e809c60d78286b993cfa65e8540558b5ea4c999ef7f7ff8). A change to it needs a new version and a "Shared layer" section in the changelog entry of each edition that ships it.

It holds what Ratchet and Jig both reference, and neither design's own records: the vocabulary both place parts in, the engineering system with its premises and its owner role, every crossing between the designs written whole, the contracts both read or write, the shared premises, and the seven capabilities Jig's units wait on. Each seam declares the contracts that never cross it (proof conditions, kept regressions, failure classes, the full road assurance record, the full class-test result and replay results), and no exception covers one. A strictness exception covers the rest and only while its acceptor and its end hold. A contract's security mark is derived from the checks as a floor, and a person may raise it and never lower it.

Ratchet pins the Jig edition it ships with, by the SHA-256 of that edition's `edition.yaml`, and Jig pins nothing, so Jig ships first, then the pin, then Ratchet. A change to a shared contract or premise needs the acceptance of the owners on each side of that agreement, recorded on the patch that proposes it. Each side answers only for its own end: a failure scenario on the seam attaches to exactly one owner, a design's obligation, a shared premise or a shared contract.
