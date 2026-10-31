# Send upstream

*Jig. Adopter skill. Edition 0.3.1, 2026-10-31, build 241a3d47+local.*

Offer a local improvement to Jig's reference design without sending anything the organization has not cleared.

**Scope:** one note about one improvement. **Inputs:** the patch, finding or premise result behind it, and `org/decision-log.md`. **Done when** a named person in the organization has cleared the note under its disclosure rules and sent it, and the decision log records what was sent, to whom and when; or the person has decided not to send it.

The steps are Ratchet's send-upstream workflow (`workflow-send-upstream.md` in Ratchet's edition): write a short note, remove everything specific to the organization, give it to a named person to clear and send, and record it. Only a person sends it. Good Jig candidates differ from Ratchet's in kind:

- a premise in `claims.yaml` that seeding contradicted, with the falsifier it matched and the kind of source that showed it, never the source itself;
- a coding-agent capability the design assumes and agents in use lack, or the reverse, described by kind of agent and never by product;
- a stage exit test that could not be measured with what the organization runs, and what was missing;
- a patch to Jig's parts, relationships or units that others could use, with its ops.

A change to the shared layer touches both designs. Say so in the note, and name the shared records it changes, so both designs' authors see it. If a later Jig edition adopts the change, the organization's patch may stop changing anything or conflict on upgrade. Withdraw it then, through the decision-log entry and Status line Ratchet's workflow for fixing or retiring a patch describes.
