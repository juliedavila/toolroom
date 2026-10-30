# Map current practice

Record how the organization's validation loop works today, so Ratchet starts from where the organization actually is.

Most organizations already run part of the loop. Often senior red teamers or security engineers point agents at repositories or infrastructure and let them run. What happens to a finding afterward ranges from a well-worn process to nothing at all. The map makes that visible step by step.

## Ask the people who run it

Talk to whoever runs discovery, whoever checks findings, whoever fixes, and whoever closes. Ask:

- **Discovery:** who runs it, against what (repositories, infrastructure, applications), with which agents and models, and how freely: free-running (given a target and left to work), scoped, or with each action approved.
- **After a finding:** who checks whether it is reachable end to end, and how many days that takes; where a confirmed finding goes (tracker, chat, a report, nowhere).
- **Each of the twelve steps of the loop** (`six-pager.md`, diagram APX-1): established (a well-worn process with an owner), partial, ad hoc (depends on who picks it up), or absent; who owns it; what shows it (a tracker query, a runbook, a person's account); and who confirmed that account of the step.
- **Each pluggable module** (`modules.yaml`): most organizations already run some version of several of them, disconnected from each other: security tools whose output nobody reproduces, a business impact analysis, a paved road the platform team owns, a production change process, coding-agent guardrails where code is written. For each module, record the same state as a step, its owner, and how it connects to the rest today. Then, for each of its interface points, record how far the wiring has come on the ladder: none, connected (data crosses at all, through whatever the existing system allows), conformant (what crosses matches the module's contract) or aligned (the practice keeps the four rules and the module's separations, or carries a recorded exception). The interface comes first, because existing systems are rarely to standard.

- **Past findings and incidents** (during phase 1, before phase 2 starts): the period the records cover, every source read (tracker queries, incident records, bug bounty and external report history, pentest reports), the deployments in that period from deployment records, and for each weakness class how many findings there were and how many reached production. They set the escape rate's starting point, and the people who keep the map gather them.

## Record

Fill `current_practice` in `org/profile.yaml`, with the modules under `current_practice.modules` and the past findings and incidents under `current_practice.history` (put the role that checked the figures against their sources in its `confirmed_by`). Note who confirmed each entry, and when. For a step, put the confirming role in its `confirmed_by` and the date in its `note`; leave `confirmed_by` out until someone has confirmed the step. The confirmer is usually someone who runs the step, which the profile check expects and never reports. Write today as it is, without judging the people who run it. A free-running discovery practice is a fact about today; it becomes a risk only once the organization decides how phase 1 will work.

Leave the template's optional `current_practice.history` placeholders as `FILL` until the phase 1 evidence is gathered. They remain unanswered. If that optional block was omitted, restore and fill it during phase 1 before phase 2 starts. Never treat omission or an empty example list as evidence of no incidents.

## Use it

List every provisional shared owner binding as an ownership gap in `org/current-practice-gaps.md`, beside the current-practice profile. For each gap, record the stable agreement id, qualified side, role, assigned identity, evidence for the provisional assignment, and who will confirm it. Provisional bindings count as filled for the first run. Acceptance authorizes the recorded assignment and does not confirm its factual basis. Keep the gap open until a person checks the assignment and a later identity-only patch changes its basis to confirmed. Include provisional claim owners that have no profile field.

- Each step's state sets where that step starts: by hand, on an existing tool, or built. Pass that into the phase 1 plan.
- A module the organization already runs is wired in, never rebuilt: its interface points are the work, in ladder order. The profile check reports every point below aligned, and refuses a point that is only connected where it reaches a part an agent can reach (a coding agent's loop, the part that builds test-drafting context, or a producer), because only the contract keeps untrusted text out of an agent's sight. Record since when each point has stood at its rung: a point below aligned for longer than the `module_alignment_max_days` dial allows is refused unless an exception covers it, and while the dial is unset the 180-day exception ceiling applies.
- The findings the discovery practice produces are leads. Phase 1 may start from one of them (`workflow-run-phase.md`).
- Premise 16 in the field guide (discovery already runs, and the loop after it is uneven) is now validated or contradicted. Update the premise ledger.
