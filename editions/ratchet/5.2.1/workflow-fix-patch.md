# Fix or retire a patch

Correct an accepted patch, retire it, or bring its risk section up to date, and keep the record of what was accepted.

An accepted patch is part of the organization's design and of its record. Never delete it or edit it silently.

## Fix an accepted patch

Choose one of two ways:

- **A new patch**, when the original change still holds and something must be added or corrected: write `O<next>-<slug>.md` with the correction, list the original in `depends_on` when it builds on it, and take it through `workflow-change-design.md`. A correction that takes back a key the original gave a part lists that key under `unset` (`spec-patch-applier.md`, Taking a key away), with `expects` holding the hash of the value the original wrote, so no null is left behind. Declaring the dependency matters at upgrade: an error the original adds counts against it only if it is still present after the last later patch that depends on it, directly or through others. When the correction removes it, the upgrade reports the original clean and lists the error as `resolved_by` the correction. The correction is still judged on any error it adds itself. A correction that does not list the original leaves the original reported with findings.
- **Reopen the patch**, when the original was wrong as written: set its Status back to `proposed`, edit it, regenerate its risk section, run the checks, and give it to the person who accepts it (`workflow-change-design.md`, Accept it). While it is proposed the applier leaves it out, and a patch that depends on it fails `depends.unmet` until it is accepted again. Record the reopening and the new acceptance in `org/decision-log.md`.

## Add `expects` to an accepted patch

A patch accepted before its modify ops carried `expects` takes it by the reopen path above. A correction patch cannot do it: `expects` belongs to the op that sets the field, and a new patch's op would only check the value the original already wrote.

1. Set the patch's Status back to `proposed`.
2. Add `expects` to each modify op, one hash for each key it sets or unsets, hashed from the field's value as the patch finds it: the edition's value after every earlier accepted patch has applied (`spec-patch-applier.md`, Declaring what a modify replaces). Use `ratchet-tools-expects.ts` and the baseline procedure in `workflow-change-design.md`, Compute expects with the bundle. Include earlier operations of this patch when taking each baseline. Change nothing else in the ops.
3. Run the checks with `--preview <id>` (`workflow-change-design.md`, Check it). A refusal with `op.expects-mismatch` means the hash was taken from the wrong value; take it again.
4. Regenerate the risk section, and give the patch to the person who accepts it, saying that the change is the added `expects` alone. Record the reopening and the new acceptance in `org/decision-log.md`.

While it is proposed, the applier leaves it out and any patch that depends on it fails `depends.unmet` until it is accepted again, so pick a time when no other change waits on a run of the design.

## Withdraw an accepted patch

When the organization no longer wants an accepted change, for example because it moved the work to a tool it already runs or a later edition adopted it, preview the withdrawal first. Run the applier and the impact report with `--preview-withdraw <id>`, and with `--preview <new id>` when a proposed patch replaces it; the run leaves the patch out as if withdrawn and changes no file. Then, once a person decides:

1. Set the first line of its Status to `withdrawn by <who> on <YYYY-MM-DD>`, where who is the person who would accept it. Keep the file.
2. The applier and the upgrade tool never apply a withdrawn patch. Any patch that depends on it now fails `depends.unmet`; fix or withdraw those too.
3. Check the design without it (`workflow-change-design.md`, Check it). Taking a patch out can open a gap that another patch relied on.
4. Record the withdrawal and the reason in `org/decision-log.md`, raise the version in `org/version.yaml`, and add an entry to `org/CHANGELOG.md` that cites it.

## Fold patches into one

To fold several accepted patches into one, write the new patch, preview it with the originals withdrawn, and withdraw the originals once it is accepted. Folding retires ids: every relationship the new patch adds takes an id that starts with the new patch's id, so the ids the originals added are retired. Before folding, search the status reports, the decision log, the premise ledger and profile notes for the old ids, and update each one, or record the old and new ids side by side in the decision-log entry for the fold.

## Regenerate stale risk sections

A patch's risk section holds the impact report's facts and a stamp of two model hashes. It goes stale when an earlier patch changes or a new edition arrives. Run the impact report in check mode on every patch, and act on what it reports:

- **`IR-E-restamp`:** only the hashes changed, so the patch's delta did not. Regenerate the section. The acceptance stands and nobody accepts it again. A new edition may also change the section's layout (its sections, their order or the edition's own wording) without changing a fact. The recorded block carries the layout number, and when it differs from the current one, check mode compares only the facts both layouts hold: ids, codes, counts and the judgment slots. When those agree, a layout-only change is a restamp too.
- **`IR-E-stale`:** a fact changed, or the section has no block. Regenerate the section. For an accepted patch the tool raises `IR-W-reaccept`: the patch goes back through acceptance. Set its Status to `proposed`, review the new delta and its judgment notes with the person who accepts it, and accept it again.

Run check mode with the same profile the section was generated with; without it, the team names differ and a restamp reads as stale. Check mode skips rejected and withdrawn patches, whose sections stay as written, as the record of what was decided.

Regenerating keeps the filled judgment notes byte for byte, so read them again against the new facts. Do this after every upgrade, and after fixing or withdrawing a patch that later patches build on.
