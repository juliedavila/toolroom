# Send upstream

Offer a local improvement to the reference design, without sending anything the organization has not cleared.

Good candidates: a patch that fixes a gap in the design itself, a failure scenario the design missed, a premise that turned out false in a way others would share, a feasibility finding, or a correction to the narrative.

1. Write a short note: the change, why, what the phase evidence showed, and the patch ops if there are any.
2. Remove everything specific to the organization: names, teams, tools, assets, figures, incidents, and anything from which those could be deduced.
3. Give the note to a named person in the organization to clear under its disclosure rules. Only a person sends it.
4. Record what was sent, to whom and when in `org/decision-log.md`. If upstream adopts it in a later edition, the upgrade may report the organization's patch as a collision, or the patch may change nothing any more; withdraw it then (`workflow-fix-patch.md`).
