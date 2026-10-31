# Start

*Jig. Adopter skill. Edition 0.3.0, 2026-10-31, build a5c1bc9e+local.*

Set up the organization's workspace, verify the Jig edition, get the tools that check it if there are any, and create the organization's Jig records.

**Scope:** one Jig edition folder and one workspace root, on the person's workstation. **Inputs:** the Jig edition folder; a Ratchet edition folder when the person has one; the organization's name. **Done when** the edition is verified; the tools are verified, or recorded as unavailable with every unchecked item listed; the organization files in step 5 exist; and the first-run fills are drafted (with tools) or recorded as gaps (without). Seeding (`workflow-seed.md`) comes next.

## 1. Choose the adoption

Ask the person two questions: does the organization adopt Ratchet too, and is a Ratchet edition folder available on this workstation? The answers pick one row.

| Adoption | Jig's shipped files | Tools | Organization records |
|---|---|---|---|
| Jig alone, no Ratchet edition | `upstream/` | None | Created by this workflow. Steps 3 and 4 record what stays unchecked, and step 6 is skipped |
| Jig alone, a Ratchet edition for tools | `upstream/` | The Ratchet edition in `tools/ratchet/` | Created by this workflow |
| Jig with Ratchet | `upstream/pins/jig/`, the released Jig that Ratchet's edition pins | Ratchet's edition in `upstream/` | Created by Ratchet's start workflow; this workflow adds only Jig's own files |

An organization that starts with Jig alone and adopts Ratchet later follows "Add Ratchet to a Jig workspace" in `workflow-upgrade.md`.

## 2. Verify the edition

Copy the Jig edition folder to its place from step 1 and keep those files read-only. Parse `edition.yaml` as YAML and read its `files` list. For each entry, hash the file at that path with SHA-256 and compare it with the entry's `sha256`. Sort the entries by path in code-unit order, write one line per entry as the hash, two spaces, the path and a newline, and hash that text: it must equal `digest`. Check `seams.yaml` against the `shared` entry. Read `released`: `false` marks a draft, which is for evaluation only. Label every result from a draft as an evaluation, and use a released edition for adoption.

With Ratchet, also follow Ratchet's start workflow (`upstream/workflow-start.md`), section "Load both editions": Ratchet's pin must hold the SHA-256 of this Jig's `edition.yaml`, and the two `seams.yaml` copies must be byte-identical.

## 3. Get the tools

Jig ships no design tool and no tool specification. Its one script, the profile check, validates the profile and needs Bun only (`workflow-fill-profile.md`). Ratchet's tool bundle checks Jig's design; its entries are named `ratchet-tools-` followed by the tool.

| Adoption | What to do |
|---|---|
| Jig with Ratchet | Verify and run the tools as Ratchet's tool workflow describes (`upstream/workflow-build-tools.md`) |
| Jig alone, a Ratchet edition for tools | Prefer the Ratchet edition whose `edition.yaml` pins this Jig version. Otherwise use one whose `seams.yaml` is byte-identical to Jig's. Copy it to `tools/ratchet/`, keep it read-only, record which edition it is, and verify it as shown below |
| Jig alone, no Ratchet edition | Record in `org/CHANGELOG.md` that no tools are available, and list as unchecked: the structural, design, realization, quality, failure and overlay checks; the unit graph's waits and cycles; patch application and every `expects` hash; the impact report and threat grid of any design change; and the acceptance check on shared agreement owners. No patch can be accepted. Seeding, the profile and the profile check need no Ratchet edition |

Verify a Ratchet edition kept for tools from the workspace root:

```sh
bun tools/ratchet/ratchet-tools-verify.ts
```

The verifier checks every file of that edition against its own record and runs every bundled fixture, which can take a quarter of an hour on a workstation. It needs Bun and no network. A nonzero exit means the tools are unproven: use none of them until the cause is fixed.

## 4. Compose and check the bare edition

Jig alone, save the complete TypeScript block in `README.md` unchanged in `tools/`, under the script name the first command below uses. The recipe needs Bun only, so it runs with or without a Ratchet edition. With a Ratchet edition for tools, also run the two checks:

```sh
bun tools/compose-jig.ts upstream build/jig-composed
bun tools/ratchet/ratchet-tools-model-checks.ts --model build/jig-composed/model.yaml --layer build/jig-composed --shipped build/jig-composed/model.yaml --json
bun tools/ratchet/ratchet-tools-unit-graph.ts --units build/jig-composed/units.yaml --model build/jig-composed/model.yaml --manual-work upstream/manual-work.yaml --claims upstream/claims.yaml --shared upstream/seams.yaml --report build/jig-unit-graph.yaml
```

The bare edition gives no model-check errors, and warns that the shipped seam exception awaits the organization's end date. The unit graph lists each wait on Ratchet under `external_waits`, by unit, stage and capability. Without a Ratchet edition, the composition is still useful as a reading copy, and both checks are recorded as unchecked.

With Ratchet, the `jig` composition from Ratchet's composer is the one to check (`upstream/workflow-build-tools.md`, "Run the bundle").

## 5. Create the organization's records

Create, in `org/`:

- `jig-profile.yaml`, copied from `profile-template.yaml`. Set `profile.edition` to the bare `version` in `edition.yaml`, `profile.filled_by` to the role of the person keeping it, and `profile.updated` to the current date.
- `jig-premise-ledger.md`, a table with one row per premise in `claims.yaml`, in the columns `workflow-seed.md` gives in step 6: its id, its statement, what can settle it, a status of unknown, and empty sources, date, note and confirmer columns. Seeding fills them.

With Ratchet, the version record, changelog and decision log already exist (Ratchet's start workflow). Jig alone, also create:

- `version.yaml`, the only record of the organization's version, where `<edition>` is the bare Jig version and `<org>` is the organization's short name: its name in lowercase, each run of characters other than letters and digits turned into one hyphen, and no hyphen at either end ("Example Organization" gives `example-organization`). Set the short name once; it stays the same if the name changes later.

```yaml
version: "<edition>+<org>.0"
upstream: "<edition>"
org: <org>
n: 0
history: []
```

- an empty `decision-log.md` and `CHANGELOG.md`;
- with a Ratchet edition for tools, `org.yaml` holding `seam_exceptions: {}`, and an empty `patches/` folder.

**The version rule, shared with Ratchet.** Raise the version when a person accepts or withdraws a patch, when the overlay baseline is recorded or replaced, and when a profile changes (with Ratchet, either profile): add 1 to `n` and set `version` to `<upstream>+<org>.<n>`. A seeding or fill session that changed the profile raises it once, at the session's end. An upgrade starts the new upstream version at `n: 1` and keeps the previous version in `history`. `org/CHANGELOG.md` cites the version in each entry and holds none of its own.

## 6. Draft the first-run fills

`README.md` names two things the organization owns: the end date and acceptor of the shipped seam exception, which the first-run patch needs, and the identities that own each side of every shared agreement, which it binds only where a person has already named them. Every other owner row stays role only, name pending, through the first run.

| Adoption | What to do |
|---|---|
| Jig alone, no Ratchet edition | Skip the first-run patch: there is no applier to check it. Add one row under `gaps` for each owner identity and for the exception's end date and acceptor, so the answers are ready when tools arrive |
| Jig alone, a Ratchet edition for tools | Draft `org/patches/O01-first-run.md` exactly as `tools/ratchet/workflow-start.md` describes in "First-run organization records". The operations are the same for Jig alone: `set_seam_exceptions` on `shared:secure-creation`, `bind_claim_owners` for the shared claims, and owner bindings on the shared contracts and the engineering system's assumptions. Compute each `expects` and check the patch with the commands in `workflow-change-design.md` |
| Jig with Ratchet | Ratchet's first-run patch covers both designs |

Leave every identity, date and acceptance the person has not given as a gap, with who can answer it. The patch stays proposed until those answers and acceptances exist.

## 7. Record the start

Add an entry to `org/CHANGELOG.md`: the date, "workspace created" or "Jig added", the version from `org/version.yaml`, the Jig version and its released status, the Ratchet edition used for tools or "none", and every check still unavailable or outstanding.

## Returning

Read `org/version.yaml`, the latest entries in `org/CHANGELOG.md`, and `gaps` in `org/jig-profile.yaml`. Compare the bare version in Jig's `edition.yaml` with `profile.edition`. If a newer Jig edition has arrived, upgrade first (`workflow-upgrade.md`).
