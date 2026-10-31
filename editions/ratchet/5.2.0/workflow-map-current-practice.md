# Map current practice

Record how the organization's validation loop works today, so Ratchet starts from where the organization actually is.

Most organizations already run part of the loop. Often senior red teamers or security engineers point agents at repositories or infrastructure and let them run. What happens to a finding afterward ranges from a well-worn process to nothing at all. The map makes that visible step by step.

## Ask the people who run it

Talk to whoever runs discovery, whoever checks findings, whoever fixes, and whoever closes. Ask:

- **Discovery:** who runs it, against what (repositories, infrastructure, applications), with which agents and models, and how freely: free-running (given a target and left to work), scoped, or with each action approved.
- **After a finding:** who checks whether it is reachable end to end, and how many days that takes; where a confirmed finding goes (tracker, chat, a report, nowhere).
- **Each of the twelve steps of the loop** (`six-pager.md`, diagram APX-1): established (a well-worn process with an owner), partial, ad hoc (depends on who picks it up), or absent; who owns it; what shows it (a tracker query, a runbook, a person's account); and who confirmed that account of the step.
- **Each pluggable module** (`modules.yaml`): most organizations already run some version of several of them, disconnected from each other: security tools whose output nobody reproduces, a business impact analysis, a paved road the platform team owns, a production change process, coding-agent guardrails where code is written. For each module, record the same state as a step, its owner, and how it connects to the rest today. Then, for each of its interface points, record how far the wiring has come on the ladder: none, connected (data crosses at all, through whatever the existing system allows), conformant (what crosses matches the module's contract) or aligned (the practice keeps the four rules and the module's separations, or carries a recorded exception). The interface comes first, because existing systems are rarely to standard.

## Read the files first when people are not available yet

A first pass often has files and no interviews. Read the local sources the table names for each step, and record what they show. A source that shows the step working, partly working or missing sets its state. When the sources for a step were read and show nothing either way, set the state to `unrecorded` and name what was read in `found`: the step was looked at, so it is no longer `FILL`, and it still needs the people who run it. A step whose sources were never read stays `FILL`. The profile check reads `unrecorded` as unanswered, as it reads `FILL`. Every `unrecorded` or `FILL` step goes into `org/current-practice-gaps.md` with who can answer it.

| Step | Local sources that usually show it |
|---|---|
| STEP-1 Choose a scenario with named owners | The risk register, a business impact analysis or crown-jewel list, the tracker's security epics and their owners |
| STEP-2 Trusted context; proof condition held apart | The asset inventory or service catalog, architecture and threat-model documents, where test fixtures and expected outcomes are stored and who can read them |
| STEP-3 An agent proposes one exact test | The discovery practice's runbook, agent configuration and prompts, the register of AI tools and models in use |
| STEP-4 A person approves the exact action | The change-approval tool, access requests and just-in-time access records, authorization records for the test environment |
| STEP-5 Run isolated; audit fails closed | The test-environment inventory, network policy, audit-log configuration, the infrastructure code for test environments |
| STEP-6 An independent reviewer reproduces | Triage runbooks, penetration-test and triage reports, tracker states that mark a finding reproduced or verified, and who set them |
| STEP-7 Record outcome, decider, expiry | A tracker export or query of security findings (status, owner, due date), the risk-acceptance register and its expiry dates |
| STEP-8 The owner fixes and deploys | Merge records linked to findings, deployment records, the release process documentation |
| STEP-9 Retest the deployed system | Tracker transitions to closed with a retest note, rescans after deployment, deployment dates against closure dates |
| STEP-10 Keep the test in the pipeline | CI configuration files, the test folders of the services in scope, required checks on protected branches |
| STEP-11 Record cost and handoffs; pull next | Tracker cycle-time or queue-time reports, retrospectives, the security team's planning board |
| STEP-12 A recurring weakness becomes a secure default | Shared library and template repositories, a paved-road catalog, the platform team's roadmap, lint and policy rules |

The modules have their own usual sources in `modules.yaml` and in the interview table of R1. A source a person describes counts as their account: record it with `from` naming the conversation and the role ("conversation with the platform lead"), never as a file.

## Past findings and incidents

- **Past findings and incidents** (during phase 1, before phase 2 starts): the period the records cover, every source read (tracker queries, incident records, bug bounty and external report history, pentest reports), the deployments in that period from deployment records, and for each weakness class how many findings there were and how many reached production. They set the escape rate's starting point, and the people who keep the map gather them.

## Record

Fill `current_practice` in `org/profile.yaml`, with the modules under `current_practice.modules` and the past findings and incidents under `current_practice.history` (put the role that checked the figures against their sources in its `confirmed_by`). Each step entry, each module entry and the discovery block take an optional `found`: `by` (the person's role, or the agent's name, such as `agent:current-state-scout`), `from` (the source, named so that someone can read it again) and `as_of`. `found.as_of` holds the discovery date, the date the source was read. Add a step's or module's `confirmed` only on a person's explicit word: `by` (their role or name) and `at`. `confirmed.at` holds the confirmation date. An agent never confirms. Leave `confirmed` out until someone has confirmed the step or module. The older `confirmed_by` field still holds a confirming role, and a profile that records the date in `note` stays valid. Write dates as quoted strings. The confirmer is usually someone who runs the step, which the profile check expects and never reports. Write today as it is, without judging the people who run it. A free-running discovery practice is a fact about today; it becomes a risk only once the organization decides how phase 1 will work.

Leave the template's optional `current_practice.history` placeholders as `FILL` until the phase 1 evidence is gathered. They remain unanswered. If that optional block was omitted, restore and fill it during phase 1 before phase 2 starts. Never treat omission or an empty example list as evidence of no incidents.

## Use it

List two kinds of shared owner row as ownership gaps in `org/current-practice-gaps.md`, beside the current-practice profile. A pending row is bound to its role only, with no identity yet; take these from the model checks' `shared-owner-pending` warnings in organization context, which name each pending side and role. A provisional row has an identity whose assignment awaits confirmation. For each gap, record the stable agreement id, qualified side, role, the assigned identity or "pending", evidence for a provisional assignment, and who will name or confirm the identity. A pending row authorizes nothing, and a provisional row is filled once its identity accepts. Acceptance authorizes the recorded assignment and does not confirm its factual basis. Keep a pending gap open until an identity-only patch binds the row, and a provisional gap open until a person checks the assignment and a later identity-only patch changes its basis to confirmed. Include claim owners that have no profile field.

- Each step's state sets where that step starts: by hand, on an existing tool, or built. Pass that into the phase 1 plan.
- A module the organization already runs is wired in, never rebuilt: its interface points are the work, in ladder order. The profile check reports every point below aligned, and refuses a point that is only connected where it reaches a part an agent can reach (a coding agent's loop, the part that builds test-drafting context, or a producer), because only the contract keeps untrusted text out of an agent's sight. Record since when each point has stood at its rung: a point below aligned for longer than the `module_alignment_max_days` dial allows is refused unless an exception covers it, and while the dial is unset the 180-day exception ceiling applies.
- The findings the discovery practice produces are leads. Phase 1 may start from one of them (`workflow-run-phase.md`).
- Premise 16 in the field guide (discovery already runs, and the loop after it is uneven) is now validated or contradicted. Update its row in the premise ledger, keyed `E16` because that field-guide row cites no premise in `claims.yaml` (`SKILL.md`, the premise ledger).
