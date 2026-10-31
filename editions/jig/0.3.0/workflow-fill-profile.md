# Fill the profile

*Jig. Adopter skill. Edition 0.3.0, 2026-10-31, build a5c1bc9e+local.*

Take in answers and confirmations as they arrive, one answer at a time, and keep the list of what is still unanswered current.

**Scope:** `org/jig-profile.yaml` and `org/jig-premise-ledger.md`, plus the Jig design's current state when Plumb is in use. **Inputs:** the person's answers, confirmations and corrections, each with who gave it, and any new local source the person names. **Done when** every answer given is recorded with its evidence, every confirmation given is recorded on the one answer it confirms, the profile check reports no error, `profile.updated` holds the current date, the version is raised once if the profile changed, and `gaps` lists every answer still missing that the next step needs.

Every answer is a record with `value`, `evidence`, `confirmed` and `superseded` (`workflow-seed.md`, "How an answer is recorded"). Edit `org/jig-profile.yaml` in place, so the template's comments, which carry the field help, stay with it; a script that parses the file and writes it back drops them, so say so in the report when one is used. Write every date as quoted text, `"YYYY-MM-DD"`.

1. **A finding from a source.** Add an `evidence` entry with the source, the date it was read and what it showed. Update `value` only when the answer is not confirmed. Never remove an evidence entry.
2. **A person's answer given directly.** Record it the same way, with the person's role and the conversation's date as the source, for example an interview with the platform lead.
3. **A confirmation.** Record it only on a person's explicit word, and only on the answer they named: set its `confirmed` to `{by: <role or name>, at: <YYYY-MM-DD>}`. Confirming a stage's owner confirms nothing about its practice, tools or status. For a premise, fill the ledger row's confirmer column the same way.
4. **A correction of a confirmed answer.** When the confirming person, or another person with the authority, replaces a confirmed value, move the old value and its confirmation into `superseded` with the date, then set the new value and its new confirmation. Nothing in `superseded` is ever removed.
5. **Unanswered stays unanswered.** Leave `value` null until someone answers. An unanswered answer is never an error. Never fill a value from a guess, a name or a default.
6. **Gaps.** Remove the rows whose answer now has a value. Add a row for each answer still missing that the next step needs, with the question, the answer's path, who can answer it and the date raised. The gaps that block the first-run patch come first: the seam exception's end date and its acceptor. Owner identities are gaps too, and they do not block the first-run patch under Ratchet 5.2.0 and later: a shared agreement's owner row may stay role only, name pending, through the first run. It authorizes nothing, so a change to that agreement waits until a person names the identity.
7. **Plumb.** When Plumb is in use and a confirmed answer is a part's `today` or `baseline`, record that confirmation on the part's current-state record as `workflow-with-plumb.md` describes. A factual confirmation never sets a Plumb disposition: ask the person for the disposition as a separate decision, and tell them that a confirmed record with no disposition is an unresolved decision, which Plumb's check reports as an error until a disposition is recorded.
8. **Run the profile check.** From the workspace root, run the check shipped in the Jig edition folder: the first command for Jig alone, the second for Jig with Ratchet.

```sh
bun upstream/jig-profile-check.ts org/jig-profile.yaml
bun upstream/pins/jig/jig-profile-check.ts org/jig-profile.yaml
```

   It reads `profile-schema.yaml` and `model.yaml` from its own folder, and `--json` prints the same result as JSON. Exit 0 means no errors. Each warning names an answer that is still unanswered, which is never an error, or a date written without quotes or not as a `YYYY-MM-DD` calendar date, which the warning names by its field: quote it, or write it as `YYYY-MM-DD`. Fix every error before closing the session: an unknown key, a missing field, a value of the wrong type or outside its allowed values, a changed fixed value, a part that `model.yaml` does not hold, or a part entered twice. Then compare the warnings with `gaps`: every unanswered answer the next step needs has a gap row.
9. **Close the session.** Set `profile.updated` to the current date and raise the version once if the profile changed (`workflow-start.md`, the version rule). Tell the person what changed, what is now confirmed, what is still a proposal, and the first three gaps by who can answer them.
