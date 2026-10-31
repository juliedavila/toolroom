# Upgrade

*Jig. Adopter skill. Edition 0.2.0, 2026-10-31, build c84932b2.*

Take in a new Jig edition, or add Ratchet to a Jig workspace, without losing the organization's profile, ledger or patches.

**Scope:** one move: from the held Jig edition to a newer one, or from Jig alone to Jig with Ratchet. **Inputs:** the held and new edition folders, `org/`, and the verified Ratchet tool bundle when there is one. **Done when** the new editions are verified, every rename and re-addressing is applied to the organization's records and shown to a person, the patches re-apply with their checks passing or their conflicts reported, new profile fields are added unanswered, the version is raised, and `org/CHANGELOG.md` records the move.

## A new Jig edition, with Ratchet

Jig moves when Ratchet re-pins it. Follow Ratchet's upgrade workflow (`upstream/workflow-upgrade.md`): keep both pinned Jig folders under `upstream/pins/jig/` with their recorded hashes, and let Ratchet's upgrade tool apply the successor Jig's renames to the organization's qualified references. Then do steps 4 and 5 of the next section for Jig's own records.

## A new Jig edition, Jig alone

Ratchet's upgrade tool upgrades Ratchet editions, so Jig alone follows these steps.

1. Verify the new edition against its `edition.yaml` as `workflow-start.md` describes in step 2. Keep the held edition beside it, read-only, until the upgrade is accepted.
2. Read every `CHANGELOG.md` entry above the held version, oldest first. Each entry opens with a fenced block of renames, each with `from` and `to`. A minor version below 1.0.0 may change something the organization stored, and says so under a heading of its own.
3. Apply each rename, in order, wherever the organization's records name the old identity: the patches in `org/patches/`, `org/org.yaml`, `org/units.yaml`, `org/jig-profile.yaml`, `org/jig-premise-ledger.md` and, when Plumb is in use, the Jig design's current state. Match a whole identity with its namespace prefix, as the patch applier does. Records carried over from the combined design use `moved.yaml` for identifier and namespace migrations. Show the person the diff and keep it only on their word.
4. Compare the new `profile-schema.yaml` with the held one. Add each new answer to `org/jig-profile.yaml` unanswered, with a gap. Keep every value, evidence entry, confirmation and superseded entry. An answer the changelog renames moves whole; an answer it removes becomes a gap asking the confirming person where it now belongs.
5. Compare the new `claims.yaml` with the held one. Add a ledger row, status unknown, for each new premise. A premise whose statement or grade changed keeps its row, gains a proposed line saying its status needs a fresh look, and gets a gap for its confirmer.
6. Put the new edition in `upstream/` and rerun the commands in `workflow-change-design.md`, from the unpatched base on. A patch that no longer applies, or whose checks now fail, is reported to the person with the changelog entry that explains it. Never edit a patch's substance to make it apply: a changed patch is a decision for a person.
7. Set `version.yaml` to the new upstream version at `n: 1`, with the previous version added to `history` (`workflow-start.md`, the version rule). Record the move in `org/CHANGELOG.md`: both versions, the renames applied, the patches that re-applied and those that conflicted, and every check still outstanding. Set `profile.edition` to the new version once the person accepts the upgrade.

## Add Ratchet to a Jig workspace

Jig-alone patches name Jig's records bare and hash them as Jig's own model holds them. Ratchet's applier reads the full composition, where the same records are qualified `jig:`, so every target, reference and `expects` hash must be re-addressed and recomputed before Ratchet replays the patches. The migration is a reviewed change of its own.

1. Get the Ratchet edition the organization will adopt, and read which Jig version it pins. If the held Jig is older, upgrade Jig alone to the pinned version first (the section above).
2. Move Jig's files to `upstream/pins/jig/` and Ratchet's edition to `upstream/`, and verify both as Ratchet's start workflow describes in "Load both editions". Follow the rest of Ratchet's start workflow to create Ratchet's profile, and copy each confirmed governance role from `org/jig-profile.yaml` into the matching field of its separation section. In the Jig profile, move each governance value into `superseded` with the date and set it to null, since Ratchet's profile now holds the roles.
3. Re-address every patch in `org/patches/`, in order, into a draft copy: each bare Jig id used as a target or reference becomes `jig:<id>`; each Jig-side addition `org.<slug>` becomes `jig:org.<slug>`; `shared:` and `ratchet:` references stay as written. Do the same in `org/units.yaml` for every Jig unit or part it names.
4. Recompute every `expects` in the draft copies with the expects helper (`upstream/ratchet-tools-expects.ts`) against the unpatched full baseline Ratchet's tool workflow builds, using the value immediately before each operation, by the patch applier's hash rule. A hash from Jig's own model does not carry over: the qualified forms hash differently.
5. Show the person the full diff of every patch and units file, with the old and new hashes. The security risk owner accepts the migration, recorded in `org/decision-log.md`. Only then replace the patches with the draft copies.
6. Replay the patches with Ratchet's tools on all four compositions (`upstream/workflow-build-tools.md`). Report any patch that fails, with its check output. The migration changes no design content, so a failure means the re-addressing is wrong: fix the draft and show the diff again.
7. Ratchet's version record becomes the only one: set `upstream` to Ratchet's version and `n: 1`, keep every Jig-alone version in `history`, and record the move in `org/CHANGELOG.md`.
