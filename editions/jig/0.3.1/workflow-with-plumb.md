# With Plumb

*Jig. Adopter skill. Edition 0.3.1, 2026-10-31, build 241a3d47+local.*

Add Jig to a Plumb workspace, seed its current state from the profile, and keep it current. Plumb compares the design with what the organization runs today, and builds its plan and pages from the design.

**Plumb tracks the unmodified released edition in this release.** Plumb adds Jig from the edition's own Plumb files. The organization's patches and unit changes do not reach Plumb's model, plan or pages; they stay in this workspace and its checks. Tell the person so before relying on a Plumb page for a changed design.

**Scope:** the Jig design in one Plumb workspace. **Inputs:** a released, verified Jig edition; Plumb on this workstation with its skill, and in particular its current-state workflow at `skill/plumb/workflows/current-state.md` and its add-a-design workflow at `skill/plumb/workflows/new-edition.md` in Plumb's bundle; the Plumb workspace, `plumb/` under the workspace root (`SKILL.md`, the workspace table), whatever folder Plumb's own examples use; the organization's teams; and `org/jig-profile.yaml` after seeding. Without Plumb's skill, stop: this workflow does not restate Plumb's file formats. **Done when** Jig is added and builds, each `parts` entry in the profile has one current-state record, Plumb's findings are reported to the person, and nothing is confirmed or disposed of without a person's word.

## 1. Add the design

Read Plumb's add-a-design workflow, then add the released Jig edition from its verified folder. Every command runs from the workspace root, except the older-Plumb build form under "Where the pages go".

**Where Plumb runs from.** Plumb's own source is not part of the workspace: keep it in a folder of its own outside `upstream/`, `org/` and `tools/`, such as one beside the workspace root. Where `plumb` is not linked, run `bun <path-to-plumb>/plumb.ts` in its place. Every command below writes `plumb` for the linked command. Unlinked, write the path to `plumb.ts` from the folder the command runs in: `bun ../plumb/plumb.ts` from the workspace root when Plumb sits beside it.

**Where the editions come from.** Plumb adds each edition from the verified copy in this workspace, Jig alone from `upstream/`, and with Ratchet, Ratchet from `upstream/` and the Jig it pins from `upstream/pins/jig/`, so Plumb reads the bytes the start workflow verified. Plumb also accepts a repository, or a local clone of one, as `--from`. These workflows use only the workspace copies, the one documented source for an edition and its pins.

Jig alone:

```sh
plumb design add jig@<version> --from upstream --workspace plumb
```

With Ratchet, Jig's folder is `upstream/pins/jig/` and Ratchet's is `upstream/`. Add Jig first, then Ratchet:

```sh
plumb design add jig@<jig version> --from upstream/pins/jig --workspace plumb
plumb design add ratchet@<ratchet version> --from upstream --workspace plumb
```

This order works with Plumb 0.6.0 and later. Plumb 0.6.0 does not look for a pinned edition under `upstream/pins/`, so adding Ratchet first, with or without Plumb's option for pins, stops on the missing Jig pin. From Plumb 0.6.1, one command also works, because the option for pins finds the pin at `upstream/pins/<namespace>`:

```sh
plumb design add ratchet@<ratchet version> --from upstream --with-pins --workspace plumb
```

Plumb verifies each edition's hashes, its shared layer and its pins before writing anything. Never edit an edition file to make the addition pass. Complete the team map from the organization's own teams as that workflow describes. A role string that names several parties, such as `Platform team + Security team`, maps to every team it names: give that exact string the id of each of those teams, as in `{ teams: [platform, security] }`. Until every party it names has a team, keep the row as Plumb's draft wrote it and record the missing team as a gap. Then build the design and report the role counts and any unresolved roles.

**Where the pages go.** Plumb writes a build into `build/<namespace>/` under the folder it runs in, and `build/` at the workspace root holds the skills' generated compositions. Plumb's pages go in `plumb/build/`, never in the workspace's `build/`. Every Plumb build command takes `--out <dir>`, so build from the workspace root:

```sh
plumb build plumb/instances/jig --out plumb/build/jig
```

Plumb's version is the `version` field of its package manifest, at the root of its folder.

## 2. Map the profile to current state

Read Plumb's current-state workflow. The Jig design's current state lives in `plumb/instances/jig/current.yaml`, with one record per part. Each record comes from one `parts` entry in `org/jig-profile.yaml`:

| Profile | Current-state record |
|---|---|
| `parts[i].part` | The record's part id, a part of Jig's model. The coding agent session (`coding-agent`) is a Jig part and has a record like any other |
| `parts[i].baseline.value` | The record's baseline, when the profile has a value |
| The evidence entry in `parts[i].today.evidence` that supports the current value | The record's discovery: its source and date, in the discovery fields Plumb's workflow names. For an unconfirmed answer it is the newest entry. For a confirmed answer it is the newest entry dated on or before the confirmation whose `found` agrees with the confirmed value |
| `parts[i].today.confirmed`, when both `today` and `baseline` are confirmed | The record's confirmation, with the same person and date |

A person's spoken or written correction is evidence like a file. Record it in the profile with the person's role and the date (`workflow-fill-profile.md`, step 2), and in the record's discovery as `from: "conversation with <role>, <date>"`. Set the discovery's `confidence` by its source: a local file read directly is `high`, a person's account is `medium`, and a value inferred from absence or indirect evidence is `low`.

The evidence history stays in the profile; the record carries only the discovery behind its current value. Evidence newer than a confirmation that disagrees with the confirmed value never reaches the record and is never attached to the confirmation: it becomes a gap in the profile that asks the confirming person, and the record stays as it is until that person decides. Findings about shared parts, the coding agents' hook answers and the Ratchet waits stay in the profile alone, because Plumb records only a design's own parts.

A confirmation in the profile never sets a disposition. Ask the person for each part's disposition as a separate decision, and record it only in their words. A confirmed record with no disposition is an unresolved decision, which Plumb's check reports as an error until one is recorded; tell the person so.

Build again and report every finding Plumb prints for these records.

## 3. Keep it current

| Event | What to do |
|---|---|
| A person confirms a part's answers | Record it in the profile (`workflow-fill-profile.md`), then update that part's record as the mapping says |
| Seeding finds new evidence for a part | The profile gains the evidence entry. Update the record's discovery only while the record is unconfirmed. For a confirmed record, raise the disagreement with the confirming person and leave the record as it is |
| A design change is accepted | Nothing changes in Plumb in this release: it keeps tracking the released edition |
| A new Jig edition is accepted | Add the new version with the same command, then rebuild. For identifiers the edition moved, run Plumb's migrate command with the edition's `moved.yaml` as a dry run, show the person the result, and apply it on their word |

Plumb writes generated files on build and needs Bun only. A folder source needs no network. Plumb reads tracker data only from exported files.
