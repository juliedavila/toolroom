# Security policy

## Report a vulnerability privately

Use GitHub's private vulnerability reporting: open the repository's **Security** tab and choose **Report a vulnerability**, or go straight to <https://github.com/juliedavila/toolroom/security/advisories/new>. Only the maintainer sees the report. Please do not open a public issue for a security problem.

A useful report names:

- the design, edition and file, for example Ratchet 5.2.1, `ratchet-tools-patch-applier.ts`;
- what an attacker, or an agent manipulated by hostile input, could do;
- the steps or a minimal input that show it;
- what you expected to happen instead.

## Supported editions

| Design | Supported |
|---|---|
| Ratchet | The edition the README's table marks Current |
| Jig | The edition the README's table marks Current |

Earlier editions stay in the repository as released and are not patched. A fix ships as a new edition, because a released edition folder never changes.

## What is in scope

- **The bundled tools.** `ratchet-tools-*.ts` in a Ratchet edition and `jig-profile-check.ts` in a Jig edition. In scope: input that makes a tool read or write outside the folders it was given, run code it should not, or report a pass where its specification says it must refuse.
- **Edition integrity.** A way to make `ratchet-tools-verify.ts`, the pin check, or Plumb's `design add` accept files that do not match the edition's manifest. Editions are not signed; the README's "What the hashes prove" section says what the hashes do and do not establish.
- **The design itself.** A path by which the design, as its edition specifies it, lets an agent give itself permission to run a test, read the proof condition it is judged against, establish a finding by its own report, or let the person who proposed a test accept its result. These are Ratchet's four rules.

Out of scope: an organization's own deployment of Ratchet or Jig (report it to that organization), the fictional example data, and problems that need a modified edition to reproduce.

## What to expect

The maintainer reads every report. There is no response-time commitment. A confirmed problem is fixed in a new edition, and its changelog credits the reporter unless they ask otherwise.
