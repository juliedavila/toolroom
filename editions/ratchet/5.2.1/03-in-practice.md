<a id="part-03"></a>
# Teams adopt the loop with named owners and checked exceptions

*Ratchet: closed-loop security validation for AI-assisted engineering. Part 3 of 4. Edition 5.2.1, Thesis 1.4.3, 2026-10-31, build 2b8e8a14+local.*

Part 1, *The strategy, carried forward from the brief and the six-pager*, defines the loop, its four rules and their exceptions, and the terms used here. This part covers how an organization adopts Ratchet progressively, the should-never rules and how to make an exception to one, the roles inside existing jobs, and how the loop compounds, degrades and treats models.

<a id="part-03-adoption-starts-with-a-profile-and"></a>
## Adoption starts with a profile and completes the accepted first-run records

An organization records its tools, owners, jurisdictions, most important assets, risk appetite and build-or-buy choices in a **profile**. It also names accountable owners and accepts the changes it made to its copy of the design (its design changes, below). If its first run needs something to cross between Ratchet and Jig that the design does not otherwise allow, it records that as a dated, temporary **boundary exception**. Automated checks then test the combined design, its modules and shared agreements included. A profile alone does not complete adoption: before the organization treats a run as its first completed run of the loop (its **first organization run**), it completes these records. The adopters' workflow-start gives the exact operations.

1. A workspace root outside the edition, a stable short name for the organization and the bare edition version. The profile, version record, source exceptions mapping, decision log, premise ledger and organization changelog exist, and every unchecked tool and any evaluation status is recorded.
2. The person accountable as security risk owner is named in the profile's separation section, with the identity and its authority in the decision log. Current practice is gathered before adoption planning or tailoring; unknown answers stay open.
3. The edition's own seam exception for secure creation (the boundary exception it ships between Ratchet and Jig) has a calendar end and a named acceptor for the security risk owner role, recorded as a decision.
4. Each per-side owner row of a shared contract, of an assumption the shared engineering system holds or of a shared claim is either bound to an identity a person has named, with a confirmed or provisional basis, or left bound to its role only, with the name pending. A pending row is listed as an ownership gap and authorizes nothing, and its agreement cannot change until the name is bound. The model checks count the pending rows, so the size of that work comes from the tool.
5. Each identity bound so far has its actual acceptance recorded. A provisional binding still needs that acceptance, and it stays a current-practice gap until confirmed.
6. The tools the first change needs are proved, and those still unchecked are named. The first-run design change is previewed, every composition and the profile are checked, and the accountable person accepts it through the ordinary design-change workflow.
7. Any module switched on for the first run has its owner and entry evidence filled and passes the profile checker. An organization overlay has its account classes and every part's placement filled, and its accepted baseline is recorded.

The changelog's 5.0.0 entry, under **Before the first organization run**, gives these records with the patch operations that produce each. Its 5.2.0 entry lets owner rows wait for named identities.

The edition includes **ratchet-tools**, runnable code for checking and tailoring the design. It needs Bun and no npm packages. Verify the edition manifest's file hashes and run the bundled test cases before use. The specifications remain the design documents behind the tools. Part 4 explains the bundle and which checks still need separate tools.

The profile schema has 24 required sections, described in the list below. A profile may still be partly filled: each section must be complete only before the phase that needs it. Two further sections are needed early: the map of how the loop works today before phase 1, and the definition of an escape before phase 2.

Other sections cover tier overrides, build or buy, exceptions, a cloud overlay (where each part runs), agent limits, thresholds, injection notice, third-party disclosure, human-gate measurement and regime thresholds. Fill each before the phase that depends on it.

- Who the organization is
- Tools already in use at each step of the loop, and what is bought or built
- Jurisdictions and incident clocks
- Release cadence and starting regression cadence
- Who runs which part
- Which teams hold the roles the four rules keep apart
- Eligible models and data residency
- Number of services and teams
- Risk appetite
- How consequence tiers are drafted and confirmed
- The consequence tier an asset counts as before its owner confirms one
- Crown jewels and their consequence tiers
- What blocking a deploy costs, per service
- What a regression gate does when it is down
- How findings reach the record
- The paved road that already exists
- Existing security tools and which are mandated
- Optional modules switched on, with their entry evidence
- Every adjustable setting, its floor and who may turn it
- When fix capacity counts as saturated
- Model providers and the order of fallbacks when one fails (the degradation ladder)
- Third-party infrastructure and what Ratchet does when it fails
- How evidence is partitioned, and who may read across partitions
- What may reach the agent in phase 1 (the phase 1 boundary)

An organization will not know every answer at the start, and it does not need to. Each section belongs to the first phase that depends on it, so an agent can report how far the answers so far carry the organization, which questions block the next phase, where each answer usually lives and who must confirm it. Before phase 1, name who proposes, approves, holds the proof condition, verifies, fixes and accepts. Record the tools, model routes, one protected asset, delivery path and current-practice map, alongside the first-run owner acceptances. Answered sections are checked in full, and open ones are listed as questions to answer next.

Most enterprises already run some version of several modules, such as a paved-road platform, a set of security scanners or a secure-coding program, usually disconnected from one another and from any shared account of what each is for. The map of today's loop therefore also records each module's state (established, partial, ad hoc or absent), who owns it, how it connects today, and where each of its interface points stands, from lowest to highest: connected (data crosses at all), conformant (what crosses matches the agreed contract) or aligned (the practice keeps the four rules and the required separation of owners, or carries a recorded exception); part 4 defines them. Part 2 shows where common practices, from scanners to change approval, enter the loop and how each one's role changes by phase. Wiring an existing practice in is interface-first. The profile checker warns on every point below aligned, and refuses one that has stayed below aligned longer than the organization's limit unless an exception covers it; with no limit set, the limit is the longest an exception may last, 180 days.

During phase 1, the people who keep the map also gather past findings and incidents into it: the period they cover, the sources read, the deployments in that period and, for each weakness class, the findings and how many reached production. These figures are the escape rate's starting point, and the report labels them as drawn from past records, because nobody confirmed those escapes the way phase 2 confirms new ones.

### People accept a temporary exception to a rule on the record

The invoice example shows what the four rules prevent:

1. The agent cannot give itself permission to run a test. It proposes trying to approve an invoice as the view-only role. A person approves that exact action.
2. The testing agent cannot read the answer it will be judged against. The reviewer keeps the proof condition apart from its instructions. The proof condition states what would establish or refute the weakness.
3. The agent's report alone cannot establish a finding. Intake checks it and an independent reviewer reproduces whether the view-only role can approve.
4. Acceptance is independent: the human test operator submitting the agent's proposal cannot accept its result. The person who proposes a test, the person who holds its proof condition and the person who decides the result are three different people, except in phase 1, where the independent reviewer both holds the proof condition and decides. Closure needs two distinct human acceptances, one of the review and one of the retest, plus a machine record of the deployment.

Standing permissions, phase 1's combined proof-condition holder and decider, and earned autonomy are the separate exceptions described in part 1, whose table lists every kind of exception side by side. Organizations make legitimately different risk decisions, so Ratchet's safety rules are strong defaults. An organization can accept a temporary exception on the record. The checker refuses a profile that breaks one unless the profile records an **exception** for that rule. The business risk owner accepts it and the security risk owner concurs. It expires within 180 days, names at least one compensating control, and lists the roles that discussed the rule's trade-off card, the account of what the rule protects and what an exception costs each role (below). Consistency checks, such as a reference that does not resolve or two settings that contradict each other, are defects to fix, and no exception covers them.

Name the accountable security risk owner before the first organization run to accept the adoption records. Phase 2 requires both risk owners for the wider operational duties. Phase 1 has its own, narrower route for exceptions, described next. It is not the same as the security risk owner's acceptance of the organization's design changes. The executive who approves the program accepts the exception and the independent reviewer concurs. The exception ends at the earlier of phase 1 exit and the risk owner's recorded review date and covers only rules whose effects stay inside the test environment, such as one small team both writing a fix and accepting its closure. Once both risk owners are named, they accept it again or it lapses. Anything that touches a real asset, real data or outsider text needs the named risk owners, even in phase 1.

The design calls a declared module boundary a **seam**, and a **contract** is the typed record a connection across it may carry. Two further kinds of exception each name who accepted it, when it ends and why. A **strictness exception** lets a crossing at a seam be flagged as a warning instead of refused, for a named acceptor until a set end. No exception covers what a seam lists as never crossing. The edition ships one such exception of its own, on the seam where Jig plugs in as the secure-creation module, with no organization end date, so each adopter supplies a calendar date and acceptance before relying on it. Reference R1 gives the record format and checking details.

An **audience exception** is the only way to widen who reads a restricted contract, one whose readers the design limits. It names the contracts, risk acceptor, end and reason. Only the check failure caused by that widening becomes a warning. Every other rule still reports its failures, and an unchanged shipped delivery is never covered.

The should-never rule codes are grouped into 11 trade-off cards. Each card states what its rules protect, legitimate reasons an organization might make an exception, what the business risk owner, security risk owner, engineering owner, a risk function independent of the teams that build and run the system (the second line in the three-lines model) and the control-plane operator each gain and carry, and compensating controls. The cards exist to make that conversation good; an agent may prepare one, but only the named people can accept an exception.

| Card | Should never | Codes |
|---|---|---|
| **Proposal not permission** | Whoever proposes an action should never be the one who authorizes it. | 7 |
| **Proof condition** | The agent that proposes or runs a test should never be able to read its proof condition. | 1 |
| **Intake only** | Nothing should ever enter the record except through intake, and a lead should never count as coverage. | 2 |
| **Independent acceptance** | No one should ever grade their own work. | 17 |
| **Loosening controls** | A control should never loosen without an attributed, expiring decision and a replay afterward. | 8 |
| **Control administration** | A control should never share administration with what it guards, and a bought control should never leave the organization's hands. | 4 |
| **Model boundary** | Model output should never reach a grant or a decision, and attacker text, private data and a way out should never meet in one agent route. | 5 |
| **Degradation** | Controls should never depend on a model, and an outage should never produce fallback credentials or a false all-clear. | 3 |
| **Measurement honesty** | Coverage should never be claimed from declarations, unsampled data or unvetted versions. | 7 |
| **Evidence partitioning** | Evidence should never be read across jurisdictions or business lines outside the review console. | 2 |
| **Sequencing** | A pluggable module should never switch on before its entry evidence exists. | 1 |

The profile template (reference R7) is the starting point, and reference R1 gives the readiness rules and every rule condition. A profile can also name an overlay: where each part runs. Part 4 and reference R5 give an AWS one as a worked example. One overlay covers every part, so an organization on another cloud, on its own hardware or on a mix of both starts from the example, adds its own account classes (the kinds of account it places parts in) and places every part. It adopts that overlay once, as a recorded baseline its security risk owner accepts; after that, moving a part or changing an account class is a design change like any other, with its own risk statement and a named person who accepts it.

The **dial register** lists the profile's adjustable settings. Each entry states the lowest allowed value and the role that may change it.

The profile answers questions the design asks. Where the organization differs from the design itself, it changes the design with a **design change**: it can add a part of its own, remove or merge parts, record that a shipped part is an existing tool, or move a part. A part it adds comes with the same entries every shipped part has (its plane, how it is realized, its quality tier and failure mode, and its cloud placement), and the design checks then judge the changed design by the same rules as the shipped one. Ratchet does not try to anticipate every organization's setup. It gives each organization a way to describe its own setup and holds that description to the same checks.

<a id="worked-examples"></a>
### Three settings ship with no number, and each starts from the organization's own data

The edition sets no starting value for a team's fix cap, for the limits on an attack injection, or for the lifecycle of kept regression tests, because the right value depends on the team, the environment and the code. Each has a way to derive a first value from records the organization already keeps, and a signal that says when to move it. The numbers below are examples only: each is worked from inputs stated beside it, and none is a default. An organization records its own inputs, its arithmetic and who agreed the result, in the profile or in the premise ledger, its record of the assumptions it relies on.

**The fix cap.** A team's fix cap is security's agreed share of its debt-service capacity: how many open validated findings it takes on at once.

1. Take the team's verified-fix throughput over a recent quarter from the tracker and the deploy records: security fixes verified in the running system, and the other quality debt it paid down in the same time, such as reliability and performance work.
2. Agree with the team what share of that capacity security gets, given its other quality debt.
3. Multiply security's monthly share by the time a finding should wait for its fix, the remediation window the profile sets, in months: the window is in days, so divide it by 30. Use the window for the consequence tier the team's findings mostly reach, the shortest tier's window when they are spread across tiers, and the profile's single window when it sets none by tier. An open queue holds about what flows through it in that time. Round the result down.

For example, a team that paid down 20 items of quality debt a month over the last quarter, and agreed with security that a quarter of that capacity goes to security fixes, has a security throughput of about 5 fixes a month. Its findings mostly reach the standard consequence tier, whose remediation window is 30 days, one month, so its starting cap is about 5 open validated findings.

Three signals say when to move it, all from the record of findings above the cap. Findings logged above the cap at most reviews, while the queue's age stays well inside the window, say the cap is low. Findings held at two reviews in a row, which go to the security risk owner, say security's share of the capacity is too small for what arrives, or that a weakness class should be fixed once through a secure default. Queue age rising toward the window while open findings sit at the cap is the saturation signal, and it says the cap is above what the team can fix in time. The cap changes only through the team and the security role that agreed it.

**Attack injection needs a consistent restore clock.** The notice mode uses a briefed detection lead, a person on the detection side who can stop the exercise. The profile names this mode `trusted-agent`, for that briefed person; it never means an AI agent.

The design has a known gap here, the **restore gap**: the injection grant and the restore grant expire at the same moment, and restore is due to start at that moment, so nothing in the current design guarantees the restore has authority to finish. The steps below describe the intended sequence. Until the gap is closed they are a design issue, and no adopter can run them as a procedure:

1. **Notice.** Before the start, the briefed detection lead, one role on the detection side, learns the environment, the time window and the weakness class being reintroduced. Nobody else on the detection side is told, so the people who watch the running system are still tested.
2. **Grant and restore.** The authorization service issues the injection grant with a signed, single-use restore grant that the execution cell, the isolated environment running the test, holds before the injection starts. Both carry the same expiry, which is the restore gap: a restore that takes any time cannot start at that expiry and finish under it, so this example cannot establish a valid restore schedule. The restore grant carries the credential the restore runs under, issued with the injection grant and sealed to that cell, so the restore never asks the control plane for one.
3. **Watch.** The detection side works what it sees as it would any alert. The briefed detection lead watches, so a real incident is never mistaken for the exercise.
4. **Hard stop.** The briefed detection lead can stop the exercise at any point. The organization's runbook names what triggers a stop, for example detection already confirmed, a response that starts to reach systems outside the test environment, or a real incident in the same environment. The stop goes to the authorization service, which revokes the grant and has the cell run the held restore at once: the injected change is withdrawn, the environment restored and the fix verified again. When that service cannot answer, the briefed detection lead stops the exercise through the service owner's own rollback, which the runbook names.
5. **Local restore.** The cell's timer starts the held restore at the injection time limit without calling the control plane. Starting then does not prove the environment is restored by that limit. The restore authority and credential must cover the time the restore takes to run, which the restore gap leaves unestablished.

Choosing either an earlier restore start or a separate bounded restore interval changes the grant design. That decision also needs to align how long the restore credential stays valid with the injection-restore service-level objective (below). This narrative makes no such change.

The profile's ceiling from a stop to the environment restored comes from a rehearsal. For example, if a rehearsed restore in that environment took 8 minutes from the stop to the fix verified again, a ceiling of 15 minutes leaves seven minutes of margin. It does not cover a second full eight-minute attempt. Every stop and expiry is recorded against the ceiling; a restore that runs past it says the ceiling or the rollback needs work before the next injection.

Part 1 describes how security co-creates each fix and its local regression test with the owning team, the kept-test mirror that inventories kept tests, and aggregate validation. The mirror's two measures are defined here.

**Test survival**, the share of contributed local tests still enabled and passing, follows a defined group of those tests over a stated period. Divide the number still enabled and passing at the assessed revision and scope by every test contributed in that group. Removed, skipped, failing and retired tests stay in the total. Report unknown observations separately and state how much of the group was observed.

The second measure, the **guardrail share** (the reference calls it instance-to-class promotion), is the share of the same group linked to an accepted guardrail for a whole weakness class. Independent validation of that class must pass. Count each local test once and show the number of distinct classes separately. An empty group reads not measured.

**The kept-test lifecycle.** Each kept test's settings follow how often the code it covers changes and how the test has failed before. Source control gives the first; the run history in the regression catalog, the store of kept tests, gives the second.

- **Quiet period.** While a kept test is active, its runs on changes that touch its declared dependencies stay blocking; the quiet period moves only its extra time-based runs to the scheduled lane. Set it to span several changes of the covered code. For example, if that code changed about every 10 days over the last quarter, a 90-day quiet period spans about nine changes without a failure.
- **Scheduled lane.** Run the lane more often than the covered code changes, so drift between changes shows before the next change ships. For the same code, a weekly lane fits.
- **Quarantine.** Size the cap from how many kept tests turned flaky and how long a repair took. For example, if two kept tests turned flaky a month over the last quarter and a repair took about two weeks, about one is in quarantine at any time, so a cap of two leaves room for a bad week. The longest stay comes from the same repair times, and never exceeds the exception ceiling of 180 days.
- **Re-proof.** Re-prove each test against its fix reverted at least as often as the covered code tends to change in ways that could break the test itself, such as a framework upgrade. Source control shows that cadence.
- **Retirement.** A test leaves the blocking path when a cheaper kept check covers its weakness class and that check fails against the test's reverted fix, or when re-proof finds it no longer fails and the verifier confirms that.

The suite's health report gives the signals to move a test between lanes: a failure in the scheduled lane blocks the next deploy in the test's dependency scope. A test that fails and passes on the same code goes to quarantine. A quarantine at its cap or a test at its longest stay is fixed, re-proved or retired. And blocking-lane time running against the regression time budget says to review which tests should still block.

**Getting started:** the decision owner names the three phase 1 roles, fills in the first sections of the profile and records the exit outcome, review date and stops before work begins. Phase 1 closes when its checks pass and required records exist. Its exception to the rule that acceptance is independent ends at phase 1's exit or the risk owner's recorded review date, whichever is first. Reaching that date without the exit outcome stops work under the exception until full separation is in place or the named risk owners accept a standard exception (above). Effort stays an estimate.

<a id="part-03-ratchet-asks-for-roles-inside-existing"></a>
## Ratchet asks for roles inside existing jobs, and dedicating people is each organization's choice

In an AI-enabled organization most of this work is existing work done differently. The table lists roles; one person can hold several, except where the four rules require different people. Whether any role becomes a dedicated position is a decision each organization records in its profile.

| Role | Responsibilities | First needed |
|---|---|---|
| **Test operator**, usually a security engineer | Runs the loop, prepares context, submits the agent's proposed tests. | Phase 1 |
| **Service owner** | Approves each action against the service they own (the profile's approver in phase 1), fixes and deploys, keeps the regression test in its pipeline. | Phase 1 |
| **Decision owner**, the executive who approves phases 1 and 2 | Names the phase 1 roles; accepts exceptions that apply only to phase 1, with the independent reviewer concurring. | Phase 1 |
| **Independent reviewer**, usually an application security practitioner outside the team | Holds the proof condition, reproduces results, decides the outcome; confirms the phase 1 boundary before it starts. | Phase 1 |
| **Scenario owner** | Chooses the scenario and writes its proof condition. In phase 1, the independent reviewer holds the condition. The profile records who drafts it. | Phase 1 |
| **Proof-condition owner** | Owns test fixtures and expected results where agents cannot reach them. | Phase 2 |
| **Access approver**, usually from identity and access management | Owns the authorization rules and the standing permissions for replays; becomes the profile's approver once approvals run through the authorization service. | Phase 2 |
| **Platform operator** | Builds and runs the shared orchestration services and execution cells: run record, workflow, dispatch, model gateway routing and serving. | Phase 2 |
| **Control-plane operator**, in an assurance unit (defined below the table) | Runs the authorization service, policy engine, grant store, credential leases, the gates on the model path, audit, evidence stores and signing keys. Never the platform operator, the test operator or the reviewer; administers only through dual-controlled sessions recorded to an audit the operator cannot alter. | Phase 2 |
| **Detection engineer** | Checks whether each test was seen by detection, and records the gaps. | Phase 2 |
| **Assurance owner** | Writes the scoped assurance statement: what was tested, where, and what is not claimed. | Phase 2 |
| **Business owner** | Confirms the consequence tier the testing team drafts for each asset. | When gates block deploys |
| **Business risk owner** and **security risk owner** | The business owner accepts residual risk and any ship-through, a decision to ship despite a held security gate. The security owner accepts adoption records, sets thresholds and must agree to ship-through. | Security owner before the first organization run. Both for phase 2 operational duties. |
| **Evaluation engineer** and **promotion authority** | One measures agents against the comparison; a separate person decides whether a model or agent is approved for use (promoted). | Phase 3 |

The **decision owner** is the executive sponsor who approves the program. The test operator is the engineer who runs the test. The paved-road owner, tool owner and portfolio decision owner (who decides which security tools to keep) are ownership duties recorded for phase 3, separate from evaluation.

*Roles by first need. Phase 1 needs three working roles, all from existing jobs, and the executive who approves it. An assurance unit is whichever unit the organization names to run controls apart from the teams that run agents and the shared platform; whether that is internal audit is the organization's choice, below.*

Ratchet keeps service levels for itself, the way it asks services to. It tracks the objectives below, 11 in all, each with an error budget. In them, the gate queue-age limit is the dial that sets the longest a finding may wait in a gate's queue, a receipt is the signed evidence record of a run, a clearing request asks a person or a check with no model in it to clear text that carries the outsider label, and a fix brief is the description of a weakness that a fixing agent or the owning team receives. The injection-restore objective remains a target that the restore gap (above) leaves unestablished:

- **approval latency**: 95% of approval requests reach an approver's queue within 5 minutes (on call: control-plane operator)
- **grant success**: 99.5% of approved actions receive their grant on the first request (on call: control-plane operator)
- **intake to verified**: 90% of receipts verified or rejected within 2 business days (on call: evaluation engineer)
- **evidence durability**: 100% of acknowledged evidence readable with an intact hash chain in each restore drill (on call: control-plane operator)
- **posture freshness**: 99.9% of regression-stage runs hold current, signed outage instructions and replay-window permissions (on call: control-plane operator)
- **injection restore**: 100% of attack injections restored at or before their grant's expiry, including while the control plane is down (on call: platform operator)
- **canary freshness**: The loop canary passed within the last 24 hours; the dead-man alarm fires at 26 hours (on call: platform operator)
- **clearing decision time**: Clearing requests decided within the time the organization sets; the edition ships no default (on call: evaluation engineer)
- **fix brief age**: No reproduced finding waits for its fix brief longer than the gate queue-age limit; each one past it pages (on call: evaluation engineer)
- **fix path wait**: No finding waits for a fix path the security side cannot complete longer than the gate queue-age limit without reaching the security risk owner's report (on call: evaluation engineer)
- **revocation unknown**: No exposed-secret revocation check stays unknown for more than one day; each one past it pages (on call: control-plane operator)

On-call follows the objective: the control-plane operator for the control plane, the platform operator for orchestration and execution cells, and the evaluation engineer for evaluation. Every failure scenario has a runbook, and a burned budget freezes Ratchet's own releases, never a product deploy. A change that only tightens, such as a narrowed limit or a revoked policy, and a security fix to Ratchet's own parts still release during a freeze, through the same tests and staged rollout. Named triggers, such as an effect outside an approved scope, a closure a later escape contradicts or lost evidence, open a blameless postmortem whose action items become design changes or work units.

### In phase 1, three roles fill the six separation fields

| Profile field | Phase 1 holder |
|---|---|
| separation.producer_team | The test operator's team (usually security engineering) |
| separation.approver_team | The service owner's team |
| separation.fixture_oracle_owner_team | The independent reviewer's team, which holds the proof condition (the field's "oracle") |
| separation.verifier_team | The independent reviewer's team |
| separation.fix_author_team | The service owner's team |
| separation.closure_acceptor_team | The independent reviewer's team, which signs the review acceptance; the retest acceptance is recorded by a second identity |

The should-never rules compare teams, and the exit test of phase 2 also compares people: the person who proposed, the person who held the proof condition and the person who decided must differ.

### What counts as a team, and where internal audit sits, are each organization's choice

The design sets no default for either. The profile records both answers by phase 2, when separation first carries an assurance claim.

**What counts as a team** (`separation.team_definition`). The checker treats two entries as one team when their names match, so the organization decides what a name stands for. Separation exists so that one shared failure cannot reach both sides of a check, so the useful test is what two groups share:

- **Incentives and pressure.** Pods under one manager share goals, ratings and deadlines. They count as separate teams only if that shared pressure is acceptable for the check in question.
- **Access.** Groups in the same directory groups or on-call rotation can reach each other's systems. That defeats separation whatever the org chart says.
- **Blind spots.** People trained together and reviewing the same code tend to miss the same things.
- **The organization's control framework.** Use the definition its auditors and regulators already accept for separation of duties, so the record holds up where it will be read.

A stricter definition means more cross-team handoffs, and the handoff count is measured from phase 1. The person-level test in phase 2 applies whatever definition is chosen.

**Where internal audit sits** (`separation.internal_audit_role`): verifier, closure acceptor, observer or not involved.

- **Verifier or closure acceptor.** Audit brings independence from the teams that run agents and often a mandate regulators recognize. Internal audit standards generally expect auditors not to take on management responsibilities or to audit work they took part in, so an operating role weakens audit's later assurance over the program. Audit also needs the technical staff and capacity to reproduce findings or accept fixes on the loop's schedule. The checker warns on either choice and asks the profile to record how audit keeps its independence.
- **Observer.** Audit reads the record, tests the controls on its own schedule and relies on the evidence for its assurance, keeping its independence intact. Verification and acceptance then need another unit outside the teams that run agents, such as a security assurance team or a risk function independent of the teams that build and run the system (a second-line team).
- **Not involved.** This is simplest at phases 1 and 2, but evidence audit never examined may need re-examining later before audit relies on it.

The trade-off cards give one perspective for the second line (a risk function independent of the teams that build and run the system) and audit together because both read the record; where audit sits is this separate choice.

<a id="part-03-the-loop-compounds-degrades-safely-and"></a>
## The loop compounds, degrades safely and stays honest about models

### Two outputs compound over time: the paved road and the tool portfolio

The **paved road** is the set of vetted building blocks engineers build on: templates, base images, libraries, gateway policies and secure defaults. When the same weakness recurs, Ratchet proposes a road entry that removes it, verifies the entry independently, and keeps it under its own regression test. Code proven to use the entry, call site by call site, gets lighter scanning for that weakness; a sample is still tested. The evidence supports enforced entries over optional ones: safe-by-default mechanisms reduce the weaknesses they target, most strongly when enforcement is automatic, and the leaks sit at the boundary with code that does not use them.

The organization's existing discovery practice is a lead source too: findings from people running agents against repositories or infrastructure are usually valid locally and unproven end to end, and a scenario owner turns a promising one into a scenario with a proof condition. A tool-less model may draft that proof condition for the owner. Its draft reaches only the owner, and a design check confirms nothing it writes reaches a test-drafting agent. 

Existing security tools, such as static and dynamic analysis, dependency scanning and bug bounty reports, become **leads**: labeled hints an agent may use to choose what to test, never facts or coverage. Text written by outsiders reaches agents only through a separate model with no tools, because attacker-written text plus private data plus a way out is the combination that prompt injection exploits. 

Whatever that model writes keeps the outsider label until a person or a check with no model in it clears it. Such a check clears only fields it limits to a fixed set, such as an enumerated class or a reference to a stored record. Free text stays labeled until a person clears it, and every clearing is recorded with who or which check, when, and the fields it cleared. Each tool's yield is measured per rule on the organization's own code, which informs whether to keep it, move its job onto the road, or retire it.

### Losing a model provider degrades Ratchet in steps, and controls never depend on a model

1. **Frontier route:** The default hosted model, through one gateway.
2. **Self-hosted route:** An open-weight model, kept qualified by scheduled failover drills.
3. **No agent:** The scripted comparison that already runs beside the agent.
4. **Manual:** People run the loop by hand, as in phase 1.

*The degradation ladder. Each test-drafting agent declares the lowest step it can run on, and the control plane uses no model at any step.*

### Models restricted to fixed answers rank and flag, while authorization and acceptance reject model-made decisions

Some models answer a fixed question with one of a set of answers and a stated probability, fast and cheap enough to run on every lead. Ratchet uses such a **typed model route** for six kinds of decision: sorting and deduplicating leads, the probability that decides which leads clear the confidence bar for the developers' queue, ordering scenarios inside a consequence tier, drafting tiers for the testing team, scoring gate health, and flagging agent output for human review. Each kind of decision keeps a fallback that works without the typed route.

A route serves a kind of decision only after promotion review, the decision that approves a model or route for use, has compared its stated probabilities with outcomes in the organization's own sampled findings. The 90% upper confidence bound of its calibration error must also stay under a ceiling set in the dial register. That bound needs labels: about a thousand at the default ceiling. With fewer, the report says the sample is too small and the decision stays on its fallback, which says nothing about the model. Typed routes pay off where labels are cheap and plentiful, such as lead sorting at volume, and rarely where reproduced outcomes arrive a few dozen a quarter. Vendor calibration claims are not enough, because calibration tends to break when the code, scanners or attackers change. 

A design check fails if a typed answer, or anything an agent's model produced, reaches a part that authorizes, counts coverage, sets a verdict, closes a finding, promotes a route or confirms a consequence tier. Exploitability is never one of the decisions. 

In phase 3, lead sorting and the confidence bar are compared across four arms: the typed route, a frontier model, a small classifier trained on the same labels, and no model. If the small classifier matches the typed route, the cheaper option that the organization can host itself wins.

Typed output closes one leak and leaves two open. A model that can only return one of a fixed set of answers cannot pass free text onward, which removes the way out for that step. The attacker still writes the input, so the attacker can steer which answer comes back, and a choice is itself a channel of up to about eight bits per decision. Inputs to typed routes therefore never carry secrets or proof conditions, a label such as "discard" never removes a lead from the sample, and a typed flag can only send an output to human review; it never passes anything.

### Jig, the sibling design for secure creation, plugs in as a module, keeps the four rules and meets Ratchet only through contracts

Red teaming tests what was built. Secure creation uses those results to prevent the same defects while code is being written. Jig, the sibling design with an edition of its own, works where code is written and catches defects between the first edit and merge. It is broad, fast and noisier, and Ratchet supplies the ground truth about which classes of weakness are real in this organization. The record of weakness classes and the paved road export to the guidance coding agents use: rules, examples, road-aware templates and review checks. Jig plugs in as the module `secure-creation`, in the prevention-out category. It switches on once the share of merged changes carrying a provenance stamp (a signed record of who and what produced the change) reaches the level the organization sets and at least one derived check runs while code is being written, and its shared measures need the paved-road module. The profile's `modules` switch for it decides whether an organization composes Jig with Ratchet, running the two designs together.

Jig keeps the same four rules, applied to an agent that proposes code instead of tests, and two of them are narrower by design. Under the rule that the testing agent cannot read the answer it will be judged against, a coding agent can see a derived check but cannot edit it. That check tests a general pattern for the weakness class and returns pass or fail with a fixed message. It never exposes the protected aggregate test's input or expected outcome. Aggregate tests, connected attack paths and retests of the running system stay inside Ratchet. The team's separate local regression test stays visible in its own suite. Under the rule that acceptance is independent, one independent sign-off merges a change where Ratchet's closure takes two; the author is the agent plus the person whose session produced the change, the person who merges is neither, and each reviewer's approval rate is tracked for drift against known-bad changes seeded only on a sandbox branch.

The two designs meet through agreed records, each with one producing side. Ratchet sends proven weakness classes, derived checks and vetted shared defaults. Jig sends a record of who and what produced each change, verified against the organization's signing keys. Unlabeled changes still count. Jig also sends its findings as leads. Ratchet's intake converts each to its own lead record and keeps the triage verdict as a label. Jig records any derived check it drops.

Jig's rule for a weakness class goes to Ratchet as published, and only the policy-owning team writes it. Ratchet runs the class test and keeps the full result. What each side learns from it is limited:

- Agent-reachable parts learn only pass or fail for each rule version.
- Per-class totals go directly to the policy-owning team: people, never an agent.
- For each derived check, Ratchet counts the changes that passed it and later failed the kept test on replay, and only that count crosses to Jig.
- Each reviewer's catches of planted changes go only to Jig's measurement plane, the group of Jig parts that keeps its measures.
- Protected aggregate replay results, proof conditions, aggregate kept regressions and the full class-test result never cross. This restriction does not hide the team's separate local test.

A fixing agent receives a fix brief that a person wrote, or that Ratchet assembled by fixed rules from the weakness the proof condition names and from the reproduction, which ran without a model. It never receives an outsider's report or anything a model wrote after reading one, and never the proof condition's expected outcome. 

The shared measures follow a defined group of changes until its allowed reproduction period has closed. They count only reproduced defects. Ratchet's evaluation team assigns the layer that should have caught each defect. The measures already exist: findings per change using and bypassing shared secure defaults, split by human-written and agent-written code. Ratchet runs alone. Jig alone starts by inventorying its assumptions and coding-agent environments. Its stage exits wait on Ratchet capabilities, chiefly checks derived from kept tests and a record of which layer should have caught each defect; the shared layer (part 4) holds the full list.

Jig is described in the same design model, part by part, so the checks that judge Ratchet's own agents judge its coding agent as well. Its planes, its coding harnesses (the environments its coding agents run in) and its coding agent are parts, and four human roles decide in it: the developer whose session runs the agent, the reviewer who merges, the qualified reviewer of high-risk hunks and the policy-owning team: people, never an agent, each told how their decisions turned out.

The coding agent reads no outside text itself. Issue text, web pages and dependency documentation go to a reader with no tools. Issue and review text travels as a record of its own whose title and body are marked as writable by outsiders, and the shipped default sends it to that reader alone. An organization can widen the audience only with an audience exception (above). Only typed fields, such as package versions and API signatures, pass its schema gate, a check that admits only fields of the declared types, to the agent. Each harness declares whether it has a stop gate, exports telemetry, pins its version and has hooks that can block. A harness without a stop gate runs the same suite at commit instead.

Jig does not take for granted that endpoints are managed, that dependencies come through the organization's mirrors, that code comes only from its own engineers or that policy is locked centrally. Each is written down as an assumption, and each has a fallback check at the protected branch that still works if the assumption is false. 

The engineering system both designs depend on carries two premises of the same kind, each with an owner, a test and a fallback:

1. Coding agents cannot read the protected aggregate regression stage's tests, outcomes or logs.
2. The protected branch holds its settings as a requirement: each required check is tied to the app that reports it, the rule is enforced for administrators, and no agent identity holds administrator rights or any way to set a check's status.

If the first premise fails, Ratchet runs those aggregate regressions only in its own replay. 

A code change that touches authorization, cryptography, data access or money reaches a qualified person by rule, and a model may send another code change for that review but cannot remove one from it. What crosses between the two designs has typed fields, which the kit publishes as a schema, and the policy-owning team turns each proven class into a rule that has to catch the class's reproduced members before it may block a merge.
