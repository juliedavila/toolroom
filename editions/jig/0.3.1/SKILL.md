---
name: jig-adopter
description: "Adopt Jig, a reference design for the place where code is written, in one organization and keep it current: verify the edition, seed the organization's Jig profile and premise ledger from what it already runs (repository settings, CI configuration, hook and coding-agent settings, policy documents, tracker exports and interviews), record which Ratchet capabilities it has, change the design with organization patches checked by Ratchet's tools, take in new editions and send improvements upstream. Works alone or in one workspace with Ratchet, and feeds Plumb's current state when Plumb is in use. USE WHEN an organization is adopting, seeding, adapting or upgrading Jig, or asks how Jig fits the way its developers and coding agents write code today. NOT FOR authoring the reference design itself."
---

# Jig adopter

*Jig. Adopter skill. Edition 0.3.1, 2026-10-31, build 241a3d47+local.*

Jig steers developers and their coding agents toward secure patterns where code is written, and catches defects between the first edit and the merge. This skill helps one person at an organization, working with an AI coding agent on one workstation, fit Jig to the organization. Its core is seeding: before anything is tailored, the agent maps how code is created today from sources the person names, and records each finding as discovered until a person confirms it. Read `edition.yaml` for this edition's version and whether it is released. Drafts are for evaluation only.

Jig ships one script of its own, the profile check (`jig-profile-check.ts`), which validates the organization's Jig profile against `profile-schema.yaml` and needs Bun only. A verified Ratchet edition supplies the design tools: its composer, model checks, patch applier, expects helper, unit graph, impact report and threat grid. What each adoption can do:

| Adoption | Seeding and the profile | Design changes and checks |
|---|---|---|
| Jig alone, no Ratchet edition | Fully supported | Blocked: no patch can be accepted, and every model check, unit-graph check, impact report and threat grid stays unchecked |
| Jig alone, a Ratchet edition used for its tools | Fully supported | Supported with the commands in `workflow-change-design.md`. Ratchet's profile checker, readiness tool, status report and upgrade tool read Ratchet's profile and phases, so they do not apply to Jig alone |
| Jig with Ratchet | Fully supported | Ratchet's own workflows, with Jig's composition among the four they check |

## What is in this folder

- **This skill:** `SKILL.md` and the `workflow-*.md` files.
- **The profile:** `profile-schema.yaml` (JSON Schema 2020-12) describes every field of an organization's Jig profile, `profile-template.yaml` holds every field, unanswered, and the profile check (`jig-profile-check.ts`) validates a filled copy. It refuses what the schema refuses and lists every unanswered answer as a warning; it runs from this folder, where it finds the schema and `model.yaml`.
- **Design data:** `model.yaml`, `realization.yaml`, `quality.yaml`, `failures.yaml`, `overlay-aws.yaml`, `units.yaml`, `phases.yaml` (the five stages and their exit tests), `claims.yaml` (the premise register), `manual-work.yaml` and `moved.yaml`.
- **Shared layer:** `seams.yaml`, what Jig and Ratchet both reference, byte for byte the same in both editions.
- **Plumb interface:** the three files under `plumb/`, which let Plumb add this edition as a design.
- **Records:** `README.md` (the design and the compose recipe), `CHANGELOG.md` and `edition.yaml`, which holds the SHA-256 of every other file here.

## The organization's workspace

Choose one workspace root outside the edition folder. Every path in these workflows is relative to it. Shipped files stay read-only under `upstream/`, and the organization's own files sit in `org/` beside it. The root convention is Ratchet's, so one workspace holds both designs when the organization adopts both.

| Adoption | Jig's shipped files | Ratchet's edition |
|---|---|---|
| Jig alone | `upstream/` | `tools/ratchet/`, read-only, used only for its tools and its own workflows, when the person supplies one |
| Jig with Ratchet | `upstream/pins/jig/`, the released Jig that Ratchet's edition pins | `upstream/` |

| Path | What it holds |
|---|---|
| `org/jig-profile.yaml` | The organization's Jig profile, copied from `profile-template.yaml` |
| `org/jig-premise-ledger.md` | One row per premise in `claims.yaml`, created at Start with status unknown and the other columns empty, filled as sources speak to each premise: validated, assumed, contradicted or unknown, with source and confirmer |
| `org/version.yaml`, `org/CHANGELOG.md`, `org/decision-log.md` | The version record, its narrative and the organization's decisions (`workflow-start.md`). With Ratchet, these are Ratchet's and serve both designs |
| `org/org.yaml`, `org/patches/`, `org/units.yaml` | Seam exceptions, organization patches and unit changes, used only when a Ratchet edition supplies the tools (`workflow-change-design.md`) |
| `plumb/` | The Plumb workspace, when the organization uses Plumb (`workflow-with-plumb.md`). It sits under this root beside `org/`, whatever folder Plumb's own examples use. Plumb's own source is not part of the workspace: keep it in a folder of its own outside `upstream/`, `org/` and `tools/`, such as one beside the workspace root. Where `plumb` is not linked, run `bun <path-to-plumb>/plumb.ts` in its place. Plumb adds each edition from the verified copy in this workspace, Jig alone from `upstream/`, and with Ratchet, Ratchet from `upstream/` and the Jig it pins from `upstream/pins/jig/`, so Plumb reads the bytes the start workflow verified. Plumb's pages go in `plumb/build/`, never in the workspace's `build/`. |
| `tools/` | Only what the organization builds itself, and the compose recipe from `README.md`, saved unchanged. Jig alone with a Ratchet edition for its tools, that edition sits read-only in `tools/ratchet/`. With Ratchet, the shipped Ratchet tool bundle runs from `upstream/`, and none of Ratchet's tools go in `tools/` |
| `build/` | Generated compositions and check reports. Never edited, never used as a source |

## Workflows

| Workflow | When | File |
|---|---|---|
| Start | first run, or orienting in an existing workspace | `workflow-start.md` |
| Seed | after start, before any tailoring; again when practice changes | `workflow-seed.md` |
| Fill the profile | any time answers or confirmations arrive | `workflow-fill-profile.md` |
| Change the design | the design does not fit a constraint, or a part or tool of the organization's own | `workflow-change-design.md` |
| Upgrade | a new Jig edition arrives, or the organization adds Ratchet | `workflow-upgrade.md` |
| Send upstream | a local change others could use | `workflow-send-upstream.md` |
| With Plumb | the organization tracks current state, plan and pages in Plumb | `workflow-with-plumb.md` |

## Ground rules

- **People decide; the agent prepares.** Confirmations, patch acceptances, exceptions and owner bindings belong to named people. The agent gathers, drafts, checks and records who decided. Whoever proposed a patch never accepts it.
- **Unknowns stay unknown.** An answer nobody has given stays null and appears under `gaps` with who can answer it. Unchecked items are named as unchecked.
- **The organization's data stays inside.** Sources are local files the person names. Nothing in this skill sends a file, a finding or a profile anywhere, and no workflow needs the network.
- **Never invent a fact, person, date or acceptance.** Every finding cites its source and the date it was read. A confirmation records the confirming person's words, and the agent never confirms.
