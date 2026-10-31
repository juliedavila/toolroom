---
name: ratchet-adopter
description: "Fit Ratchet, a reference design for closed-loop security validation in AI-assisted engineering, to one organization and keep it current: map how the organization's validation loop works today, fill its profile progressively, tailor the narrative, change the design with organization patches that each carry a threat-model delta, run phases and report their status, take in new editions without losing local changes, and send improvements upstream. USE WHEN an organization is adopting, adapting, running or upgrading Ratchet, or asks how Ratchet fits its own process, constraints or tools. NOT FOR authoring the reference design itself."
---

# Ratchet adopter

Ratchet carries security weaknesses that AI agents find all the way to fixes verified in the running system and held by regression tests, with people outside the agent approving every action and checking every result. This skill helps an organization's agent fit that design to the organization and keep fitting it as the organization learns. Edition version 5.2.1, thesis 1.4.3. Read `edition.yaml` for the authoritative version and released status. `released: false` marks a draft. Drafts are for evaluation only. Use a released edition for adoption (`workflow-start.md`).

The work is iterative by design. Nobody knows every answer on the first day. Start with what is known, record what is assumed, and let each phase's evidence answer the rest.

## What is in this folder

- **This skill:** `SKILL.md`, the `workflow-*.md` files, and the `spec-*.md` tool specifications.
- **The edition it fits:** `00-start-here.md`, the main parts (`01` to `04`), references `R0` to `R6`, annexes `A1` to `A6`, `six-pager.md`, `strategy-brief.md` and `CHANGELOG.md`. The edition's profile template ships here as `profile-template.yaml`.
- **Design data:** `model.yaml`, `rules.yaml`, `profile-schema.yaml`, `profile-template.yaml`, `quality.yaml`, `realization.yaml`, `failures.yaml`, `modules.yaml`, `overlay-aws.yaml`, `units.yaml`, `readiness.yaml`, `threat-closures.yaml`, `manual-work.yaml`.
- **Work types and manual work:** every unit in `units.yaml` carries a `flow_item` (feature, defect, risk or debt), a default this edition sets by the rule in `spec-unit-graph.md`, which the organization overrides unit by unit. `manual-work.yaml` lists the kinds of manual work units retire or reduce, with no shares or numbers, and a unit's `relieves` marks name a kind, the effect, and the premise in `claims.yaml` the claim rests on, graded the way premises are. The organization links each of its own routine activities to a kind and measures their shares itself.
- **Premise register:** `claims.yaml`, every premise the design rests on: its grade, what would prove it wrong, what rests on it (`load`), where the design bends if it flips, and the work units that settle it. Each premise's `rests_on` names the design items its `load` names as ids in `model.yaml`: `parts` (part or system ids) and `relationships` (relationship ids). A design change gives the parts and relationships it drew or changed. Both lists are empty when the load names only phases, units or nothing in the design, and for a dropped premise. Annex A1 and the six-pager's premise view render the same register.
- **Acceptance fixtures:** `fixtures-*.yaml`, the standalone profiles `fixture-pc-*.yaml`, and `expected-results.yaml`, which prove the tools you build behave as specified.
- **Shared layer:** `seams.yaml`, what Ratchet and Jig both reference. Jig is a separate edition line, and both editions ship this file byte for byte.
- **Edition record:** `edition.yaml`, the record of this folder: the edition line and version, whether this is the released edition or a draft, its build, the shared layer's version and hash, the Jig edition it is checked with, and the SHA-256 of every other file here with a digest over them. Check a copy of the folder against it before relying on it.

## The organization's workspace

Choose one workspace root outside the edition folder. All paths below are relative to that root, regardless of its name. Keep the shipped Ratchet files read-only in `upstream/`. The separately verified Jig pin cache goes at `upstream/pins/jig/` (`workflow-start.md`). Everything the organization owns sits beside `upstream/`:

| Path | What it holds |
|---|---|
| `org/profile.yaml` | The profile, filled progressively, with `current_practice` as its first substantive task |
| `org/patches/O01-<slug>.md` | Organization design patches, applied in order on top of `upstream/model.yaml` |
| `org/` exceptions file | The organization's source exceptions mapping, `org/org.yaml`, starting with `seam_exceptions: {}`. Patches supply the dated first-run override |
| `org/threat-closures.yaml` | The organization's closure rules and sign-offs on shipped rules |
| `org/premise-ledger.md` | One row per premise in `claims.yaml`, created at Start with status unknown and the evidence, source, date and confirmer empty, filled as sources speak to each premise; plus a row for each field-guide narrative premise that cites none, added when a source first speaks to it: validated, assumed, contradicted or unknown, with source and confirmer (below the table) |
| `org/decision-log.md` | The organization's own decisions, exceptions and patch acceptances |
| `org/current-practice-gaps.md` | Unconfirmed practice and ownership assignments, their evidence and follow-up |
| `org/kept-tests/<test-id>-<version>.yaml` | Instance-test, append-only mirror observation and drift records (`workflow-kept-tests.md`) |
| `org/status/phase-1-plan.md` | Phase 1 exit outcome, review, effort estimates, waits, boundary and scoring criteria |
| `org/status/phases.yaml`, `org/status/units.yaml`, `org/status/signals.yaml` | Structured status inputs, in `spec-status-report.md` |
| `org/status/<period>.md` | Status reports per phase |
| `org/version.yaml` | The organization's version, `<upstream version>+<org>.<n>`, its history, and the overlay baseline when the organization has one: the only version record |
| `org/CHANGELOG.md` | What changed in each organization version, citing the version |
| `org/overlay-<name>.yaml` | Optional: the organization's own overlay, in the shape of `overlay-aws.yaml`, replacing the shipped one. One overlay covers every part, so a hybrid estate starts from the example and adds account classes. Adopted once as a baseline recorded in `org/version.yaml`, then changed only by patch |
| `tools/` | Empty unless the organization builds a homegrown tool from the specifications. The shipped tool bundle runs from `upstream/` (`workflow-build-tools.md`) |
| `build/` | Generated compositions, their compiled layers and patched exceptions results, checks and tailored narrative |
| `plumb/` | Optional: the Plumb workspace, when the organization tracks the design in Plumb (`workflow-with-plumb.md`). Plumb keeps its own verified copies of the editions there, beside the read-only `upstream/`. Plumb's own source is not part of the workspace: keep it in a folder of its own outside `upstream/`, `org/` and `tools/`, such as one beside the workspace root. Where `plumb` is not linked, run `bun <path-to-plumb>/plumb.ts` in its place. Plumb adds each edition from the verified copy in this workspace, Ratchet from `upstream/` and the Jig it pins from `upstream/pins/jig/`, so Plumb reads the bytes the start workflow verified. Plumb's pages go in `plumb/build/`, never in the workspace's `build/`. |

The premise ledger holds the premises in `claims.yaml`, the same list Plumb's premise commands read, so a Ratchet ledger and a Plumb portfolio name the same premises by the same ids. Each row is keyed by the premise's id (`CL-<n>`). The premise register in the six-pager's field guide (Appendix E) numbers its rows by passage: a register row that cites claims updates those claims' rows, and a register row that cites no claim, such as premise 16 (discovery already runs), gets its own row keyed `E<n>`. The ledger is a Markdown table with these columns: id; statement; published grade (from `claims.yaml`, never raised); status (validated, assumed, contradicted or unknown); evidence; source; date (the date the source was read); confirmer (the person's role or name, filled only on their word); confirmed on; field-guide rows (the register rows that cite it).

## Workflows

| Workflow | When | File |
|---|---|---|
| Start | first run, or orienting in an existing workspace | `workflow-start.md` |
| Map current practice | after workspace setup, before adoption planning and tailoring, and again when practice changes | `workflow-map-current-practice.md` |
| Fill the profile | any time answers arrive | `workflow-fill-profile.md` |
| Change the design | an organizational constraint the design does not fit, or a part, cloud or tool of the organization's own | `workflow-change-design.md` |
| Fix or retire a patch | an accepted patch is wrong or no longer wanted, or its risk section is stale | `workflow-fix-patch.md` |
| Tailor the narrative | preparing the story or the strategy brief for the organization's people | `workflow-tailor-narrative.md` |
| Present the set | showing the tailored set to the organization's executives and people, or hosting it as a static site on the organization's own Pages | `workflow-present.md` |
| Run a phase | starting, running or reporting a phase | `workflow-run-phase.md` |
| Upgrade | a new edition arrives | `workflow-upgrade.md` |
| Send upstream | a local change others could use | `workflow-send-upstream.md` |
| Verify and run the tool bundle | the first time, and when an edition changes | `workflow-build-tools.md` |
| With Plumb | tracking the design in a Plumb workspace: adding Ratchet, and mapping the current-practice record to Ratchet's parts as Plumb current state | `workflow-with-plumb.md` |

## Ground rules

- **People decide; the agent prepares.** Exceptions, patch acceptances, phase colors and premise confirmations belong to named people. The agent drafts, checks and records who decided. Name the security risk owner before anything is accepted.
- **Every design change names its risk.** An organization may change anything. Each change carries a threat-model delta from the impact report, so the cost of the change is visible and owned. Moving a part to another place it runs is a design change too, made by patch.
- **Unchecked is said out loud.** When a checker is missing or has not passed its fixtures, say plainly which items are unchecked, and promote nothing on them.
- **Should-never rules stay visible.** Breaking one needs a recorded, expiring exception with named risk owners. Consistency checks are defects to fix, never exceptions.
- **The organization's data stays inside.** A filled profile names crown jewels, teams and tools. Nothing in this skill sends it anywhere.
- **Never invent facts.** An unknown stays unknown, marked as such, until someone confirms it.

## Two editions share one interface

Jig ships its own adopter skill for seeding and adopting Jig beside its design data, stages and premises, and one workspace holds both editions. Ratchet ships the tool bundle, specifications and fixtures that check both designs. The bundle includes the composer, model checks, patch applier, unit graph, impact report, threat grid, upgrade tool, profile checker, readiness tool and status report, each proved against its fixtures by the bundle verifier. Figure building still needs a separately proved tool. The profile checker, readiness tool and status report retain Ratchet's profile and phase requirements. Keep Jig's stage plan beside its own units.

Keep both edition folders read-only. Import the shared `seams.yaml` once, and require both copies to match. Ratchet's edition record names the released Jig it was checked with. A working Jig report is advisory and does not replace that pin. Before accepting a composition, require all four composition checks and the released-pin check to pass.

Use `moved.yaml` and the changelog's renames to migrate identifiers. Keep namespace prefixes on imported targets. Write a crossing whole through an organization patch, and keep source exceptions in the `org/` exceptions file. Pass the patched exceptions result to the checks. A shared contract or premise change waits for each side's owner to accept it on the proposing patch. `workflow-start.md` names every first-run fill and its acceptance record. `workflow-change-design.md` states the namespace rule for an organization's own additions.

The loop has twelve steps. `current_practice.steps` records STEP-1 through STEP-12. `existing_tools` records STEP-1 through STEP-11 only. STEP-12 is Harden the road. Describe its current tools and work under `current_practice.steps` for STEP-12 and in the optional `road` section. It has no existing-tools field. Record a kept test and its later drift with `workflow-kept-tests.md`.
