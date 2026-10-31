# Start

Set up one workspace, verify its editions, and record the organization's first-run decisions before checking its design.

## First run

1. Choose a workspace root outside the shipped folder. Every relative path and command in these workflows starts there. If the chosen root is already named `org`, its records still go in its child `org/`. Copy Ratchet's shipped files to `upstream/`, verify them as described below, and keep those files read-only.
2. Choose the organization's short name, written `<org>` everywhere in this skill: the organization's name in lowercase, with each run of characters other than letters and digits turned into one hyphen and no hyphen at either end. "Example Organization" gives `example-organization`. Set it once. It stays the same even if the profile's name changes later.
3. Create `org/` with:
   - `profile.yaml`, copied from `profile-template.yaml`, with `profile.name` set to the organization's name.
   - `org.yaml`, the source of the organization's seam exceptions, initially `seam_exceptions: {}`. This empty mapping supplies no override and does not resolve the shipped exception's null end. The first-run patch below supplies that override.
   - `version.yaml`, the version record, where `<edition>` is the bare `version` in `upstream/edition.yaml`, `5.2.1` for this edition:
     ```yaml
     version: "<edition>+<org>.0"
     upstream: "<edition>"
     org: <org>
     n: 0
     history: []
     ```
   - an empty `patches/` folder, which holds the organization's patches in order.
   - `current-practice-gaps.md`, the open ownership and current-practice gaps, starting from this template:
     ```markdown
     # Current-practice gaps

     ## Owner rows pending or provisional

     | Agreement | Side | Role | Identity | Basis | Evidence | Who confirms |
     |---|---|---|---|---|---|---|

     ## Unanswered current-practice steps

     | Step or module | Question | Where the answer usually lives | Who will answer |
     |---|---|---|---|
     ```
   - an empty `decision-log.md` and `CHANGELOG.md`.
   - `premise-ledger.md`, the table `SKILL.md` describes, with one row per premise in `claims.yaml`: its id, statement and published grade, status unknown, and every other column empty. The first run fills the rows its sources speak to and leaves the others unknown. A field-guide row that cites no premise, keyed `E<n>`, is added when a source first speaks to it, as `E16` is in the current-practice map.
4. Read `00-start-here.md`. For the first current-practice map, read diagram APX-1 and premise 16 in the six-pager's Appendix E, then three sections of `R1-rules-and-readiness.md`: the readiness section, the phase 1 section and the interview section ("The interview: questions, sources and who confirms"), alongside `workflow-map-current-practice.md`. Read the four rules before choosing the phase 1 boundary or judging separation. The rest of the six-pager and field guide can be read as their topics arise, and must be read before tailoring the narrative. This staged reading order does not change any check or readiness requirement.
5. Load the pinned Jig folder into `upstream/pins/jig/` as described below. From the workspace root, verify both editions with the bundle verifier and the pin command:

```sh
mkdir -p build
bun upstream/ratchet-tools-verify.ts
bun upstream/ratchet-tools-model-checks.ts pin --edition upstream --out build/pinned > build/pin-report.json
```

   The pin command prints a JSON report that holds the whole composed model, so redirect it to a file as shown; its result is the `build/pinned/` folder (`workflow-build-tools.md`). Read `edition.yaml` for status as well as version. `released: false` means draft. Drafts are for evaluation only. Keep every draft result identified as an evaluation and use a released edition for adoption. The `-draft` label in a reading copy is never part of the version record. A released Jig pin does not make Ratchet released.
6. Identify the person accountable as security risk owner. Set `separation.security_risk_owner_role` to the role that person holds. Record the person's identity and its link to that role in `org/decision-log.md`. Use the same role spelling in acceptance records. Every patch acceptance and overlay baseline needs that person. Shared agreement owners and a seam exception's acceptor have their own records below.
7. Map current practice (`workflow-map-current-practice.md`) before planning adoption or tailoring its narrative. Workspace creation, edition verification, identifying the risk owner and building tools can proceed while answers are gathered. Leave unknowns as `FILL` and say which parts of the map await confirmation. Mapping is the first substantive profile task, not a prerequisite to creating files or running tool fixtures.
8. Run the tools needed for the next step (`workflow-build-tools.md`). The first organization patch needs the composer, patch applier, model checks, profile checker, impact report and threat grid. Shared capability changes also need the unit graph. A model check does not check the profile or its module entry evidence. Until the profile checker runs, those answers are unchecked even when the model checks pass. Size the first-run work before drafting a patch, as described under First-run organization records.
9. Prepare `org/patches/O01-first-run.md`, using the sections in `workflow-change-design.md`. It records one decision by the security risk owner role: a calendar end and the named acceptor for the shipped seam exception, set with `set_seam_exceptions`. It also binds the owner identities a person has already named, and only those. Every other owner row stays role only, name pending. Keep this patch proposed while checking it, with `--preview O01`. Record actual acceptances, run the checks, and follow the normal patch acceptance workflow. A bare-edition diagnostic run may precede these fills, but it is not the organization's completed first run.
10. Write the first entry in `org/CHANGELOG.md`: the date, "workspace created", the version from `org/version.yaml`, the draft or released status, the number of owner rows still pending (`.lint.summary.pending_owners` in the model checks' JSON report) and every check still outstanding. Raise the version as "The version record" below says: when the first-run patch is accepted, as for any other patch, and once at the end of this first session if it changed the profile beyond what step 3 sets, even while O01 stays proposed.

## First-run organization records

Keep source records in `org/` and generated results in `build/`. `org/org.yaml` is the exceptions input. The applier's `--org-out build/org.yaml` is the generated exceptions result after the patches, passed to the model checks with `--org build/org.yaml`. Never use that output as the next run's source. Rebuild from `org/org.yaml` and the ordered patches. The compiled design layer in `build/layer/` holds the model's companion files. The phrase "dependency layer" means the shared agreements and their organization bindings loaded with those inputs. It names no extra folder or file.

### Size the work from the model checks

Apply the organization's patches (none yet, so an empty `org/patches/`), compose, and run the model checks on each composition with `--org build/org.yaml`, using the commands in `workflow-build-tools.md`. Read two things from the full composition's JSON report, which holds the structural checks under `lint`. Each `shared-owner-pending` warning in `.lint.warnings` names one shared agreement that still has owner rows bound to a role only, with each pending side and role. `.lint.summary.pending_owners` is the number of pending rows. State the size of the binding work from these, never from a hand count.

Before O01 exists, an organization composition reports `seam-exception-invalid` at `shared:secure-creation.default_exceptions[0]`, because the shipped exception's end is still null, and every other check runs. O01 removes that error by setting the end. Pending owner rows fail no check while their agreements stay unchanged.

### The seam exception

The first-run exception op uses the shared seam and complete contract identities:

```yaml
op: set_seam_exceptions
seam: shared:secure-creation
exceptions:
  - contracts: [shared:CatchLayer, shared:ReviewerSeedCatch, shared:DroppedCheck]
    accepted_by: "<person or team accepting for the security risk owner role>"
    until: "<YYYY-MM-DD>"
    why: "<why these measurement feeds may remain undeclared until that end>"
```

The organization chooses the date and records the acceptor's actual decision in `org/decision-log.md`. A named team may accept this seam exception. Record its authority to act for the security risk owner role. `accepted_by` is free text and the model checks do not resolve it to a role or person. This does not change the requirement for a person to accept a design patch. A null end produces `seam-exception-awaiting-end` in the bare edition. In an organization composition it produces `seam-exception-invalid` and covers nothing. A past date produces `seam-exception-expired`.

### Owner rows stay role only until a person names them

Every `owners` list in the shared contracts, the assumptions on `shared:ext.engineering-workflows`, and the shared claims `SH-1` and `SH-2` holds side and role rows. The edition ships each row role only, name pending: its `identity` is null. A first run may leave every row that way. A pending row is a gap, never an acceptance. It authorizes nothing, and any change to its agreement's content or quality is refused as `shared-acceptance-required` until every row of that agreement is bound. List each pending row in the first table of `org/current-practice-gaps.md`, with the agreement as the warning locates it. Bind only an identity a person has named for that side and role, and never infer one from a team list or a role name. An identity names a person or team. The row's role text copied into `identity` names no one, so the applier refuses that binding as `shared-acceptance-required`.

### When names arrive

Bind each named identity in an identity-only patch: O01 for the names already given, and a later patch for each name that arrives after it. Retain each shipped side and role, including absent designs. The same role text on two sides does not require the same identity. Reuse an identity only when responsibility belongs to the same person or team on those sides, and record that assignment's evidence. A binding patch changes owner identities and their basis only, with acceptance from every newly bound identity. It may bind some rows of an agreement and leave the others pending, and the pending rows need no acceptance. A later binding on an agreement that already has a bound row also needs acceptance from every identity recorded on it. Use `modify_contract` for contract owners and `modify_element` for the holding part's complete assumptions list, with `expects` for each replaced field. These lists replace their earlier values, so preserve every entry, pending rows included.

Bind shared claims with `bind_claim_owners`, addressed by stable claim identity such as `shared:SH-1`. Copy the qualified side and role of each shipped owner being bound into `bindings`, and supply its `identity` and `basis: confirmed` or `basis: provisional`. Rows left out of `bindings` stay pending. Use `expects: {owners: <hash of the current owners list>}`. Record a basis on every contract and assumption row given an identity too. A basis applies only to a row with an identity. A confirmed basis records a checked assignment. A provisional basis records an assignment awaiting confirmation, with its evidence and follow-up in `org/current-practice-gaps.md`. A provisional identity still needs that identity's acceptance. Confirm it through a later identity-only patch, preserving the agreement content.

Inside the Ops fenced YAML mapping, put actual owner decisions beside `ops`:

```yaml
ops: []  # Replace with the identity-only operations.
acceptance:
  - owner: "<newly bound identity>"
    accepted: true
```

List each distinct accepting identity. The decision log records who gave each acceptance and the evidence for it. The agent transcribes decisions already given. A later content change or reassignment needs every before and after identity, including the engineering system owner for its premises. MC-114 checks acceptance on shared changes. A plain model-check pass does not prove that a binding was accepted. The `shared-owner-pending` warnings show which rows remain pending.


## The version record

`org/version.yaml` is the only place the organization's version lives. The tools read it: the patch applier stamps the organization's model with its `version`, and the upgrade tool reads `upstream` and `history` and writes the next record. `org/CHANGELOG.md` is narrative only. Each entry says what changed and cites the version from the record; it never holds a version of its own.

When the organization adopts its own overlay, the record also holds `overlay: { file: overlay-<name>.yaml, sha256: <hex> }`, its recorded baseline (`workflow-change-design.md`, Your own overlay). The applier and the upgrade tool find the overlay there; with no `overlay` entry they use the shipped example.

Raise the version whenever a person accepts or withdraws a patch, records or replaces the overlay baseline, or the profile changes: add 1 to `n`, and set `version` to `<upstream>+<org>.<n>`. Each accepted or withdrawn patch and each recorded overlay baseline raises it once. Profile changes raise it once per session, at the session's end, however many answers changed. With both designs, a change to either profile counts, and a session that changes both raises it once. The workspace as Start creates it is `n: 0`: copying a profile template and setting the fields Start names are part of creating it. A first session that goes on to change a profile while O01 stays proposed raises the version once, at its end, to `n: 1`, for the profile change alone; accepting O01 later raises it again. An upgrade starts the new upstream version at `n: 1` and keeps the previous version in `history`. Jig's start workflow defers to this section.

## Returning

Read `org/version.yaml`, `org/CHANGELOG.md`, the latest status report and the open questions the readiness tool reports. Then pick the workflow the situation needs. Compare `upstream/edition.yaml`'s version with `upstream` in `org/version.yaml`, and read the matching changelog entry. If a newer edition has arrived, upgrade first.

## How the pieces relate

The organization's model is `upstream/model.yaml` with `org/patches` applied, and its design layer is the shipped layer files with the patches' layer changes and, when the organization has recorded its own, its overlay in place of the shipped one. One overlay covers every part, wherever it runs. The model checks and the profile checker both run on that result, so a patch and a profile answer are reviewed by the same rules. Readiness reads the profile and reports which phase the answers support. The tailored narrative is the six-pager rewritten from the profile and the premise ledger.

## Load both editions

Keep the released Jig folder at `upstream/pins/jig/`, the pin lookup location. Verify the flat Ratchet payload before adding that local pin cache. The cache is separately verified dependency material and is not an entry to add to Ratchet's shipped manifest. Leave every shipped Ratchet file unchanged, including its edition record. Keep the pinned Jig files read-only too.

The bundle verifier and the pin command in step 5 carry out the whole procedure in this paragraph: the verifier checks Ratchet's manifest, and the pin command checks Jig's manifest and pin. Follow it by hand only to prove a homegrown check. Parse edition.yaml as YAML and read only its files list; do not collect sha256 lines by indentation, because pins also carry hashes. For each edition, hash every listed file with SHA-256 and compare it with its `files` entry. Sort entries by path in code-unit order, concatenate one `<sha256>  <path>\n` line per entry, with two spaces and the final newline, and hash that text to check `digest`. Check the shared file against its recorded hash. Then hash Jig's `edition.yaml` bytes against Ratchet's Jig pin and check Jig's namespace, version and `released: true`. Require the two `seams.yaml` copies to be byte-identical. Run the model checks' released-pin check, the pin command in step 5. A self-consistent folder alone does not prove it is the pinned release.

Use the composer to produce all four compositions of the organization's patched design: full with the released pin, Ratchet alone with the shared layer, Jig alone with the shared layer, and Ratchet core without modules. Keep each model beside its own compiled layer and organization exceptions result. Check each against its matching unpatched composition. The composer supplies the layer vocabulary, absent-side boundaries, omitted lists and shared `seams.yaml` in the layer folder. Do not assemble lone inputs by copying a full model or removing errors by hand. A missing composer or an unchecked composition is an outstanding acceptance check.

Check a working Jig separately and label that report advisory. It cannot replace the released pin. Jig alone uses the same tool specifications, its own units and stages, and the shared capability declarations. Bind owners against stable shared identities before projecting compositions. The bundled impact report replays full patches before projection. Use its `--mode` procedure in `workflow-build-tools.md`; keep the original hashes and ops. A homegrown tool without that procedure leaves the lone reports unchecked.

## Evaluation and blocked checks

A first run on this draft is a workspace evaluation. Follow the same setup, make records and preview proposed patches, label every result evaluation, and keep a patch proposed while any required acceptance check is blocked. A completed rehearsal on a draft remains an evaluation; adoption requires a released edition. The draft itself blocks patch acceptance even when every check passes. Keep evaluated patches proposed and preview them. In a synthetic rehearsal, label every invented owner decision simulated in the decision log. A simulated decision cannot authorize a real binding, exception or patch acceptance. Obtain actual decisions before adoption. If any required check is unavailable, record it as blocked in `org/CHANGELOG.md` and the withheld acceptance in `org/decision-log.md`. Obtain the exact pinned release folder and rerun the pin check. Never substitute a working Jig or treat a draft evaluation as adoption. Binding owners' actual decisions can be recorded while patch acceptance remains withheld; keep the version at its current value until an event defined under The version record occurs.

For a model target, compute its PA-22 `expects` value from the applier's full model after shared import and all preceding operations. For a layer target, use its compiled layer value. For a shared-only target such as `bind_claim_owners`, use the target claim's owners list in the applier's shared output. In every case hash the exact target value immediately before that operation. For O01, first generate the unpatched applier output with `--shared upstream/seams.yaml`. Hash its target values, which already use qualified shared references, using `ratchet-tools-expects.ts` as described in `workflow-change-design.md` and the canonical JSON algorithm in `spec-patch-applier.md`. Do not hash the raw shared source list. A later operation in the same patch hashes the value after earlier operations. Contract and assumption owner rows have the same binding shape as claim owners:

```yaml
owners:
  - side: ratchet:S6
    role: Owning engineering team
    identity: Team Alpha
    basis: provisional
```

Retain the actual shipped side and role in each row; this shape is illustrative. Document provisional evidence and follow-up in `org/current-practice-gaps.md`. The shipped measurement crossings are already declared. Its default exception is currently idle, so a valid first run need not emit `seam-crossing-excepted`. The exception's end is still validated. The warning appears only for an actual undeclared crossing covered by a valid exception.
