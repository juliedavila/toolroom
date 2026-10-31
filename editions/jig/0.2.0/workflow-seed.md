# Seed

*Jig. Adopter skill. Edition 0.2.0, 2026-10-31, build c84932b2.*

Map how the organization creates code today, from what it already has, before any tailoring or design change. Every finding is recorded as discovered, with its source and date, and stays discovered until a named person confirms it.

**Scope:** the five Jig stages, the Jig parts found in place, the coding agents in use, the creation surfaces, dependency admission, secrets, paved roads, the seven Ratchet waits and every premise in `claims.yaml`, for the repositories the person puts in scope. **Inputs:** `org/jig-profile.yaml` and `org/jig-premise-ledger.md` from `workflow-start.md`; the shipped `phases.yaml`, `units.yaml`, `model.yaml` and `claims.yaml`; and the local sources the person names. **Done when** each stage, section and wait holds either an answer with evidence or a row under `gaps`, every coding agent in use has an entry, every part with evidence has a `parts` entry, every premise has a ledger row with a status, and the person has the report in step 8.

Most organizations already run parts of Jig: a pre-commit hook here, a required check there, a coding agent with a rules file. Seeding makes that visible stage by stage, so adoption starts from what exists.

## How an answer is recorded

Every answer in the profile is a record of its own: `value`, `evidence`, `confirmed` and `superseded`. Confirming one answer confirms that answer only. When seeding finds something:

1. Add an `evidence` entry: the source, the date it was read, and what it showed (`found`). Earlier entries stay as they are; evidence is history.
2. If the answer has no confirmation, set `value` to what the evidence now shows.
3. If the answer is confirmed and the new evidence agrees, leave the value and its confirmation alone.
4. If the answer is confirmed and the new evidence disagrees, leave the value and its confirmation alone, and add a gap that names the disagreement and asks the confirming person. Only that person's word changes a confirmed value (`workflow-fill-profile.md`).

A new discovery always has `confirmed: null`. An existing confirmation is never removed or changed by seeding.

## 1. Agree the sources

Ask the person which local sources to read and which repositories are in scope. Typical sources:

| Source | What it shows |
|---|---|
| Repository settings exports | branch protection, required checks, who may bypass them, code-owner rules |
| Continuous integration configuration | which checks run on a pull request and which block the merge |
| Hook configurations | pre-commit and pre-push checks, and whether they can be skipped |
| Editor and coding-agent settings | which agents run, their rules files, and whether they can run a check after each edit or when a turn stops |
| Policy documents | secure coding, dependency and secrets standards, and who owns them |
| Tracker exports | how findings are filed, routed and closed, and how escapes are attributed |
| Interviews | anything the files cannot show, recorded as an interview with a named role |

Read only what the person names, on this workstation. Copy nothing outside the workspace. When a source would help and has not been named, ask for it.

## 2. Walk the five stages

For each stage, read its exit test in `phases.yaml` and its units in `units.yaml` (each unit's `phase` field is the stage's number, and its `elements` name the parts it works on). Then look for today's practice at those parts. The table is a guide to where to look; the shipped files are the authority on which units and parts belong to each stage.

| Stage | Units | Parts the units touch | What to look for today |
|---|---|---|---|
| Attribute (phase 1) | creation premises declared (U-430), creation outcomes delivered (U-436), class to rule (JU-01) | Jig as a whole (`secure-creation`), measurement plane (`measurement-plane`), shared check suite (`check-suite`) | Whether changes record who or what wrote them (a person, which agent, which model); how an escaped defect is traced to the place it should have been caught; whether recurring defect classes become rules |
| One check, many places (phase 2) | harness parity compensated (U-431), derived-check gaming watched (U-438), handoff schema enforced (JU-02) | pre-commit gate (`precommit-gate`), protected branch (`protected-branch`), measurement plane (`measurement-plane`), context plane (`context-plane`) | Whether the same checks run at the edit, before the commit and as required checks on the server; which local checks can be skipped; how false positives and missed findings are counted |
| Agent fixes first (phase 3) | creation quarantine (U-432) | quarantined reader (`quarantined-reader`), reader schema gate (`reader-schema-gate`) | Whether coding agents read text from outside the organization (issues, tickets, comments) directly; whether agents fix findings before a person sees them |
| Focus the humans (phase 4) | rule-first hunk routing (U-433), reviewer drift delivered (U-437) | hunk router (`hunk-router`), hunk-risk advisor (`hunk-risk-advisor`), measurement plane (`measurement-plane`) | How reviews are routed, who reviews high-risk changes, whether an AI reviewer runs, and whether anyone measures what reviewers catch |
| Pave the road (phase 5) | none in this edition | context plane (`context-plane`), shared check suite (`check-suite`) | Templates, golden paths, shared libraries and agent skills or rules files that make the secure way the default |

For each stage, record in `stages.<stage id>` the answers `current_practice` (in plain words, without judging the people who run it), `existing_tools`, `owner` and `status` (the stage's rung as a whole: none, stand-in, existing-tool or built), each with its own evidence.

## 3. Record the parts found in place

For each Jig part the sources show something for, add one entry to `parts` with the part's id from `model.yaml`: `today` (what stands in for it, in plain words) and `baseline` (its rung on the ladder), each an answer with its own evidence. The coding agent session (`coding-agent`) is a Jig part too: its entry summarizes the agents in use. One entry per part. Plumb's current state reads these entries (`workflow-with-plumb.md`).

## 4. Record the coding agents and the other sections

Add one entry under `coding_agents` per agent in use, with its `name`. Answer `runs_where`, `edit_hooks` and `turn_stop_hook` from the agent's own settings or documentation as the person supplies them: yes, no, or unknown when someone looked and could not tell. An agent that cannot run a check after each edit cannot host the per-edit checks, and one without a turn-stop hook cannot host the stop gate, so these two answers decide where those parts can run.

Add one answer per entry under `creation_surfaces` for each repository class, language and build system found. Answer `dependency_admission`, `secrets` and `paved_roads` the same way, each answer with its evidence.

## 5. Record the Ratchet waits

Jig's units wait on seven Ratchet capabilities, listed in the README's table of waits and keyed in `ratchet_waits` by their shared capability ids. For each one, answer `provided_by`:

| Value | When |
|---|---|
| `ratchet` | The organization runs Ratchet and the Ratchet work that provides the capability is in place. Ratchet's unit graph on the full composition names the providing unit |
| `substitute` | Something else the organization runs provides it. Answer `substitute` with what it is, its owner and how it delivers what the capability names |
| `absent` | Nothing provides it yet |

Jig ships no substitute; an organization may declare its own. A `ratchet` or `substitute` value releases nothing until a person confirms it. For a substitute, two confirmations are needed: the person confirms `provided_by` (it is in place) and `substitute` (it is fit for the capability). Even then, a stage whose units wait on the capability claims its exit test only with its own evidence that the exit test is met. When nobody knows yet, leave `provided_by` null and add a gap.

## 6. Grade the premises

For each premise in `claims.yaml`, write its row in `org/jig-premise-ledger.md` with a proposed status, the sources behind it and the date. Use these thresholds:

| Proposed status | Evidence needed |
|---|---|
| validated | At least two independent local sources (two documents, or a document and a measurement) that show the premise holding across the repositories in scope, and no source that matches its `falsifier` |
| contradicted | At least one local source that matches the premise's `falsifier` |
| assumed | The organization's practice relies on the premise, with no more than one source, an interview alone, or evidence for only part of the scope |
| unknown | No local evidence either way |

Leave the confirmer column empty on a new proposal. A proposal is the agent's, and the report says so. On a row a person has already confirmed, keep the confirmed status and confirmer; add a new proposal beside it only when new evidence would change the status, as a separate line marked proposed, and ask the confirming person.

## 7. Record current state in Plumb

When the organization uses Plumb, write the `parts` entries into the Jig design's current state as `workflow-with-plumb.md` describes.

## 8. Report and hand over for confirmation

Report to the person, from the files just written: the answers per stage and per part with their sources; each coding agent's two hook answers; the seven waits; the premise proposals; any disagreement with a confirmed answer; and the gaps with who can answer each. Ask the person to confirm or correct answers, one answer at a time, and record their words with `workflow-fill-profile.md`. Raise the version once if the profile changed (`workflow-start.md`, the version rule).

Seed again whenever practice changes. The rules under "How an answer is recorded" keep every earlier reading and every confirmation.
