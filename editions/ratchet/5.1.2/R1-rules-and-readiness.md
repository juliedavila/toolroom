<a id="r1"></a>
# Reference R1: Rules and readiness

*Ratchet: closed-loop security validation for AI-assisted engineering. Reference R1. Edition 5.1.2, Thesis 1.4.2, 2026-10-30, build 13fabeae+local.*

Complete and exact, for agents. Part 3 explains the same rules in prose.

<a id="r1-readiness"></a>
## Readiness: each section belongs to the first phase that needs it

| Phase | Sections that must be answered |
|---|---|
| 1. The loop closes once | profile, existing_tools, separation.producer_team, separation.approver_team, separation.fixture_oracle_owner_team, separation.verifier_team, separation.fix_author_team, separation.closure_acceptor_team, ledger_write_path, models, crown_jewel_register, delivery, phase_1_boundary |
| 2. The evidence can be trusted | ownership, separation.business_risk_owner_role, separation.security_risk_owner_role, separation.control_plane_operator_role, separation.platform_operator_role, separation.team_definition, separation.internal_audit_role, attestation, unattested_default, gate_failure_policy, infrastructure_dependencies, dials, data_partitioning, jurisdictions, escapes |
| 3. Ratchet is measured against today's process and a no-agent baseline | scale, risk_appetite, fix_capacity, fix_capacity.default_cap, ai_resilience, tools, separation.evaluation_team |
| 4. A second team runs it | road, modules, blocking_cost_register |
| 5. It works in production | none new; the production module's entry evidence lives under modules |

Rules for reading readiness:

- The organization is ready for the highest phase whose sections, and every earlier phase's sections, are all answered and pass the checks below. If any phase 1 section is open, report **not yet ready for phase 1** and list its open questions.
- A section counts as answered when it holds at least one real value, has no FILL placeholder as a value, and validates against the profile schema. Inside an answered section, null means none (for example, no tool at that step of the loop). FILL in a comment is a hint, never a value.
- The literal string FILL is unanswered. Never compare it with another value: two blank fields are not equal.
- Values the template prefills are core defaults and count as answers until the organization changes them.
- Twelve sections are optional in the schema: tier_overrides, build_or_buy, exceptions, cloud_overlay, current_practice, agent_limits, thresholds, escapes, injection, disclosure, gate_seeding and regimes. All but escapes are optional at any phase; escapes must be answered before phase 2, which reports each escape with its cost. Leave injection out, or leave a placeholder in it, and attack injection stays at the pre-deploy layers (workstation, pull request, pipeline); a deployed test environment or production is reached only under the notice policy it declares. Leave disclosure out and external disclosure deadlines still pass the fix cap; outbound reports to third-party maintainers then have no named owner. Map current_practice first: it says where each step of the loop starts. Leave agent_limits out and approval works as it did before limits existed: kept regression tests replay on their reviewed batch approvals and standing permissions, and every other agent action is approved by a person. thresholds holds the numbers the sponsor sets from the phase 1 map before phase 2; it is usually empty until then, and no phase waits for it. gate_seeding declares how the approver, the proof-condition holder and the decider are each measured with seeded known-bad items; leave it out and the profile warns once the dial register is answered. regimes holds the thresholds the status report places each weakness class in a regime by, derived from the organization's own past findings; leave it out and the report shows counts and ratios alone, with a warning once findings are recorded.
- A rule condition never triggers on an unanswered field.

<a id="r1-how-to-check-a-profile"></a>
## How to check a profile

1. **Schema.** Every answered value matches the type and allowed values the template shows; an open section is a question, not an error.
2. **Should-never rules.** Test each rule's condition below against the answered fields. Codes starting `model.` are architecture exceptions the profile cannot express; they apply only when the organization declares one. The exception is phase 1: while `phase_1_boundary.status` is active, a false boundary condition triggers `model.trifecta`, and a confirmation by anyone but the independent reviewer triggers `model.phase1-boundary-unconfirmed`.
3. **Exceptions.** A triggered rule is a refusal unless the profile holds a valid exception for its code (below). Report each refusal with its code, the invariant it protects and its card; report each accepted exception beside its card.
4. **Consistency checks.** Apply every consistency check below. These are defects, never risk choices, and no exception covers them.

<a id="r1-exceptions-are-recorded-expiring-decisions-by"></a>
## Exceptions are recorded, expiring decisions by named risk owners

- **Accepted by:** business risk owner (separation.business_risk_owner_role)
- **Concurrence:** security risk owner (separation.security_risk_owner_role), never the same role as the acceptor
- **Expiry:** at most 180 days after acceptance (90 suggested); at expiry it reverts or is reviewed
- An exception applies to every instance of its code in the profile unless scope narrows it. Exceptions appear in the tailored package and in every report that relies on the rule, so a reader always sees where the organization chose differently.

An exception entry has these fields:

| Field | Required | Meaning |
|---|---|---|
| `rule` | yes | A should-never code from tradeoffs.yaml, for example sep.fix-closure. |
| `scope` | no | Optional narrowing, for example one service or one asset; recorded, not enforced. |
| `reason` | yes |  |
| `phase_1_only` | no | true for an exception taken before the risk owners are named. Accepted by separation.program_decision_owner_role with separation.verifier_team (the independent reviewer) concurring, for a code in exception_policy.phase_1_only.codes only, ending at phase 1 exit or risk_owner_review_on, whichever is first, and refused once both risk owners are named; the general 180-day ceiling still applies. |
| `risk_owner_review_on` | no | Required for phase_1_only: the risk owner's ISO review date after accepted_on. expires_on cannot be later; the exception is invalid on or after this date. |
| `phase_1_exit_on` | no | Record the actual phase 1 exit date as soon as phase 1 exits. expires_on cannot be later; a phase_1_only exception is invalid on or after this date. A planned exit never authorizes work after the actual exit. |
| `accepted_by_role` | yes | Must be separation.business_risk_owner_role (separation.program_decision_owner_role for a phase_1_only exception). |
| `concurrence_role` | yes | Must be separation.security_risk_owner_role (separation.verifier_team for a phase_1_only exception). |
| `accepted_on` | yes | ISO date. |
| `expires_on` | yes | ISO date, after accepted_on and within 180 days of it. |
| `compensating_controls` | yes | a list |
| `reviewed_with` | yes | Roles that discussed the trade-off card, at least two. |
| `on_expiry` | yes | one of revert, review |

Only the named people accept an exception. An agent may draft the entry, the reason and candidate compensating controls, and list the roles that need to discuss the card; it leaves `accepted_by_role`, `concurrence_role` and `accepted_on` for them and never records acceptance on anyone's behalf.

### Before the risk owners are named: phase 1 only

Readiness first requires the business and security risk owners in phase 2, and phase 1 runs with three roles. A phase 1 exception therefore has a narrower path, marked `phase_1_only: true`:

- **Accepted by:** program decision owner (separation.program_decision_owner_role), the executive who approves phases 1 and 2
- **Concurrence:** independent reviewer (separation.verifier_team), never the acceptor
- **Expiry:** ends at phase 1 exit or the risk owner's recorded review date, whichever is first. Record risk_owner_review_on before acceptance and phase_1_exit_on as soon as phase 1 exits. The general 180-day ceiling stays. It never carries into phase 2
- **Refused when:** both separation.business_risk_owner_role and separation.security_risk_owner_role are named; from then on they accept it again as a standard exception
- **Rules it can cover:** only those whose effects stay inside the approved test environment: `sep.producer-approver`, `sep.tool-propose-authorize`, `sep.oracle-producer`, `sep.verifier-producer`, `sep.fix-closure`, `intake.ledger-direct-write`. Anything touching a real asset, real data or outsider text, `model.trifecta` included, needs the named risk owners.

An organization that wants phase 1 to touch anything real names its risk owners first.

<a id="r1-what-an-organization-may-change"></a>
## What an organization may change

Every item in the design has one of four classes. **Should-never**: a strong default broken only by a recorded exception (the four rules, invariants, separations, parts and paths that enforce the rules, tier failure behavior, dial bounds, model checks, phase exit tests). **Parameter**: set by the profile. **Suggestion**: reference material to adapt (technology examples, cloud candidates, durations, default values, the work breakdown, graded evidence). **Fixed**: stable IDs, which never change. Reference R2 marks the parts that enforce a rule.

<a id="r1-ownership-choices-and-separation-of-duties"></a>
## Ownership choices and separation of duties

Three ownership questions (where the checking team sits, who runs runtime testing, who promotes agents and models) give 64 combinations. Two choices break separation of duties: a checking team of `one-team` (one team runs the agents and the checks) and a promotion authority of `evaluation-team` (evaluation promotes its own results). Every combination with either breaks it (28). The 8 fully independent combinations put the checking team in the second line and give promotion to security leadership or a joint board. The rest (28) separate the checks by team but share a leader on some of them. Cross-team handoffs range from 30 to 52. These counts come from the design model before its later extensions; the extensions added parts but no new ownership question.

<a id="r1-the-design-checks"></a>
## The design checks

The design model is checked on every change. A fatal check failing means the design is wrong; a finding is reported for review.

A strictness exception names its seam, contracts, acceptor, end and reason. It flags only the undeclared crossing instead of refusing it. An omitted acceptor or end, or an expired calendar end, is an error. A null end warns in the bare edition but covers nothing in an organization composition until the organization supplies a calendar date. A milestone end is accepted as syntax only: the checks do not verify that the milestone exists or is complete, so review and retirement remain external duties. No exception covers a contract a seam lists as never crossing.

| Check | Fatal | What it guarantees |
|---|---|---|
| structural | yes | Every element, relationship, view, sequence step and contract resolves to a known part, system and trust zone |
| coverage | yes | Every node and edge extracted from the source research maps to the model (full model only) |
| trifecta | yes | No agent route holds untrusted content, non-public data and a way out unless effects need exact approval and outbound passes the load-bearing request-data gate |
| quarantine | yes | The part that builds agent context never receives untrusted free text |
| ai-free-control-plane | yes | No control or execution part touches the model path, so controls work with every model route down |
| model-boundary | yes | A gate on the model path sits in the control zone, decides deterministically and passes nothing into authorization or execution |
| model-advisory | yes | No model judgment reaches a part that decides authorization, coverage, verdicts, closure, promotion or tier attestation, and exploitability is never a decision type |
| t0-placement | yes | Every fail-closed control-safety part (tier T0) sits in the control or execution zone |
| design-limit | yes | Every part that lets an agent act, or a judgment stand, without a per-action approval reads its design limit from the control zone, and only a person or a control-zone part sets a limit |
| outsider-label | yes | Anything a model writes after reading outsider text keeps the outsider label until a person or a model-free check on the path clears it; a fixing agent's brief comes only from a person or a model-free part, and what the loop learns is checked for provenance when it is read back. It fails on the shipped design and on what an organization adds or changes alike |
| store-reason | yes | A store that states it holds no evidence content receives evidence records only as ids or references |
| orchestrator | yes | No model sits in the orchestrator: a part marked as orchestrating is off the model path and touches no inference relationship |
| agent-memory | yes | A store an agent writes in free text and that is read back into an agent's context is marked as a learning store |
| finding-kinds | yes | Every finding kind in the registry declares its closure check, kept gate, recovery measure and what never closes it, path is registered, and the part that judges each closure check is model-free |
| finding-kinds-held | yes | A finding kind that admits held findings names the kept test that exercises the control, the model-free part that judges it and what converts the finding, so credit for a control is taken away when its test fails |
| controller-feedback | yes | Every person who issues a control or authorization action receives a non-optional feedback relationship carrying a contract that states what it measures, so each decider hears how their decisions turned out |
| harness-parity | yes | Every coding harness states its stop gate, telemetry export, version pinning and blocking hooks, and a harness with no stop gate sends to a part that runs the same suite in its place |
| assumptions | yes | Every declared assumption states what relies on it and a fallback carried by parts that exist, and no part that carries a fallback relies on the assumption it falls back from |
| rule-first-routing | yes | A part that routes by rule calls no model, and every relationship into it from a model caller is add-only, so a model may add items to a person's review and never take one off |
| typed-fields | yes | A contract's typed fields are well formed and mark every field an outsider can write, and no contract with such a field reaches an agent-reachable part |
| evidence-custody | yes | Every evidence record that something produces lands in a store partitioned by keys, and every evidence relationship into a store names the contracts it carries |
| restricted-audience | yes | A contract marked restricted reaches only the parts and people its consumer list names |
| harness-key | yes | Every part that steers a coding agent declares its harness parity or a reason it is no harness |
| orphan | no (finding) | A part with no relationships |
| unviewed | no (finding) | A part that appears in no view |
| unowned | no (finding) | A producer, control, evidence or evaluation part with no owner |
| unbuilt | no (finding) | A part no epic builds |
| independence | no (finding) | One owner holds both test-drafting and checking parts |
| effect-without-control | no (finding) | An agent reaching an execution part without a control |
| judgment-on-untrusted | no (finding) | An agent setting a disposition directly |
| contract-gaps | no (finding) | A contract with no producer or no consumer |

<a id="r1-phase-1-and-the-model-boundary"></a>
## Phase 1 and the model-boundary rules

The model-injection rule (`model.trifecta`) forbids an agent route that holds untrusted text, non-public data and a way out at once, unless every effect needs exact approval and outbound requests pass the request-data gate. Neither safeguard exists until phase 2. Phase 1 still has a way out: its calls to the model provider carry data, and its approvals go through existing change approval, which does not bind approval to the exact action. It stays outside the rule only by keeping the other two legs out, which is harder than it sounds: the target's own responses count as untrusted, and outsider text also arrives through dependency code comments and READMEs, logs from a shared environment, and data copied from production.

So the boundary is a profile section, `phase_1_boundary`, that the independent reviewer confirms before phase 1 starts and again whenever the environment changes:

- `source`: Optional; absent means practice-target. Where phase 1's one weakness comes from, an organization choice: a practice target the team writes, a finding from the organization's existing discovery practice (for example people running agents against repositories or infrastructure), or a recent finding. The conditions that keep phase 1 outside the model-injection rule depend on it: a practice target needs all four synthetic conditions; a real finding needs the agent to draft only and to exit only through the approved model route.
- `runner_limit`: Optional; what limits the runner in phase 1, before the action broker and exact grants exist. scoped-role: a role scoped to the test environment, not bound to the exact approved action, which leaves a gap phase 2 closes when the runner presents an exact grant instead; action-bound: each run is bound to the exact approved action; other: describe it in the phase 1 plan.
- `agent_drafts_only`: Answered only when source is a real finding, and then it must be true before phase 1 starts: the phase 1 agent produces text only, it holds no tools, every action is run by a person after approval of the exact action, and its drafts reach people only. Real data in its context follows the organization's rules for the approved model route. With a practice target it plays no part, so null or absent is a complete answer.
- `target_written_by_team`: The synthetic protected resource and the seeded path were written by the phase 1 team, and nobody outside it can write to them.
- `outsider_text_excluded`: No text written by outsiders reaches the agent: no bug bounty reports, scanner messages, issue text or quoted strings, no third-party code comments or READMEs from dependencies, no logs from a shared environment, no data copied from production.
- `agent_egress_model_route_only`: The agent's only network exit is the approved model route.
- `context_synthetic`: Everything in the agent's context is synthetic or test-only, credentials included; nothing comes from real systems.

Removing two legs rather than one is deliberate: if outsider text slips in anyway, a synthetic context leaves nothing worth taking. While the section is active, any condition answered false is refused under `model.trifecta`, and a phase 1 only exception cannot cover it, so pointing phase 1 at anything real requires the named risk owners. Once phase 2's request-data gate is load-bearing on every agent route, set `status` to retired.

<a id="r1-the-trade-off-cards-and-every"></a>
## The trade-off cards and every rule code

The first four cards carry the four rules, one each: 1. A proposal is never permission (card proposal not permission); 2. Proof conditions stay out of the testing agent's reach (card proof condition); 3. Findings enter the record only after validation and an independent reproduction (card intake only); 4. Acceptance is independent (card independent acceptance). The other 7 cards carry the remaining should-never rules.

<a id="r1-card-proposal-not-permission"></a>
### Proposal not permission: Whoever proposes an action should never be the one who authorizes it.

**Protects:** I1. An agent, or the team that runs it, can be wrong or manipulated. Authorization outside the proposer is what makes a wrong proposal harmless. It bounds what a part may do and cannot say whether the authority model it enforces is right: an application's own authorization, such as a view-only role that can approve invoices, needs verification against what was intended, and that is what the loop does.

**Legitimate reasons an organization might make an exception:** A small organization with one security team during the first phase; a short migration while the approval console moves to a separate identity realm.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Fewer handoffs and faster tests; in exchange, owns the chance that a manipulated proposal runs with real effects. |
| Security risk owner | Loses the one control that holds when the agent is wrong; expect to be asked how a bad action was stopped. |
| Engineering owner | Faster turnaround on tests against their service; also absorbs any unintended effect on it. |
| Second line and audit | Cannot show that actions were authorized independently, which most control frameworks expect. |
| Control-plane operator | Grants now come from the same identities that ask for them; audit trails still record, but nothing stops. |

**Compensating controls to consider:** Restrict excepted actions to read-only or reversible classes; a second person reviews a daily sample of self-authorized actions; tighter egress and time windows on every grant.

**Failure scenarios that exercise it:** F12, F13, F53, F56, F76, F78 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `sep.producer-approver` | The team that runs the agents also approves their actions. | separation.producer_team equals separation.approver_team |
| `sep.tool-propose-authorize` | One tool both proposes and authorizes actions. | existing_tools.STEP-3 is set and equals existing_tools.STEP-4 |
| `cadence.continuous-without-preapproval` | Continuous regression runs without a standing permission issued under standard-change preapproval. | delivery.starting_cadence_rung is continuous and delivery.standard_change_preapproval is false |
| `dial.producer-turned` | The team that runs the agents turns a dial or sets a design limit. | the turned_by_role of a core dial (the first entry for each core dial id) equals separation.producer_team, or any agent_limits.limits[].set_by_role equals separation.producer_team |
| `admin.execution-by-producer` | A fail-closed execution part is administered by the team that runs the agents. | a build_or_buy entry's administered_by equals separation.producer_team for a part it covers in the execution zone whose quality tier is T0 |
| `admin.cpo-is-producer` | The control-plane operator is the team that runs the agents. | separation.control_plane_operator_role equals separation.producer_team |
| `limit.grant-beyond-design` | A standing permission, batch approval, earned-autonomy grant or dial lets an agent act, or a judgment stand, without a person's approval beyond the design limit for its producer or judgment type, or at or above the consequence line. | agent_limits.consequence_line is answered, and an agent_limits.grants[] entry has no limit with the same applies_to and subject, or its max_tier is above that limit's max_tier, or its max_tier is at or above agent_limits.consequence_line, or it names an environment or action class the limit does not list (tiers rank standard, critical, crown-jewel) |

<a id="r1-card-proof-condition"></a>
### Proof condition: The agent that proposes or runs a test should never be able to read its proof condition.

**Protects:** I2. An agent that can see the proof condition can pass a test without doing the work, and every result it produces stops meaning anything.

**Legitimate reasons an organization might make an exception:** A team too small to hold the proof condition apart during the first phase, with seeded cases only.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Saves a role; in exchange, results may report fixes and findings that are not real. |
| Security risk owner | Loses the ability to tell real detection from leakage; measured agent value becomes unreliable. |
| Engineering owner | May receive confident findings that do not reproduce. |
| Second line and audit | Test evidence is no longer independent of the thing it tests. |
| Control-plane operator | Must enforce separate storage and keys by hand where the roles merge. |

**Compensating controls to consider:** Use only seeded cases whose answers are published after the run; rotate proof conditions after each run; independent re-test of every positive result.

**Failure scenarios that exercise it:** F11 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `sep.oracle-producer` | The proof condition is owned by the team that runs the agents. | separation.fixture_oracle_owner_team equals separation.producer_team |

<a id="r1-card-intake-only"></a>
### Intake only: Nothing should ever enter the record except through intake, and a lead should never count as coverage.

**Protects:** I3. The record is what an organization believes about its exposure. Direct writes and leads counted as coverage let unverified claims become facts.

**Legitimate reasons an organization might make an exception:** An existing tracker that cannot route through intake yet, during a time-boxed migration.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Faster reporting; the cost is a record that may overstate what was tested. |
| Security risk owner | Coverage and closure numbers lose their meaning; regulators and boards may be shown claims nobody verified. |
| Engineering owner | Fewer duplicate tickets in the short run; more disputes later about what was really found. |
| Second line and audit | Cannot trace a recorded finding back to verified evidence. |
| Control-plane operator | Two write paths to protect instead of one. |

**Compensating controls to consider:** Label every direct write as unverified and exclude it from coverage reports; reconcile direct writes against intake weekly; sample direct writes for independent reproduction.

**Failure scenarios that exercise it:** F12, F33 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `intake.ledger-direct-write` | Findings can be written to the ledger directly. | ledger_write_path is set and is not intake-only |
| `leads.as-coverage` | Existing tool leads count as coverage. | tools.leads_count_as_coverage is true |

<a id="r1-card-independent-acceptance"></a>
### Independent acceptance: No one should ever grade their own work.

**Protects:** I4. Independence is what makes a closed finding believable. Whoever proposes, holds the answer, fixes or builds should not also decide that it worked.

**Legitimate reasons an organization might make an exception:** Too few people to separate every pair at the first phase; a shared leader above separate teams during a reorganization; a tool vendor that also reports its own yield until a second source exists.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Fewer people involved and faster closure; accepts that some fixes will be graded by their authors. |
| Security risk owner | Loses independent evidence for audits and regulators; expect closed findings to be questioned. |
| Engineering owner | Fewer handoffs; owns the rework when a self-accepted fix turns out to be wrong. |
| Second line and audit | Closure and measurement are no longer independently attested. |
| Control-plane operator | Identity separation is enforced by the profile, so merged roles mean merged permissions. |

**Compensating controls to consider:** Independent re-test of a sample of closures (10 percent suggested); rotate the accepting person across teams; report self-graded closures separately.

**Failure scenarios that exercise it:** F25, F28, F37, F42, F47 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `sep.verifier-producer` | The verifier is the team that runs the agents. | separation.verifier_team equals separation.producer_team |
| `sep.fix-closure` | The team that writes a fix also accepts its closure. | separation.closure_acceptor_team equals separation.fix_author_team |
| `ownership.broken-separation` | ownership.q1_checking_team is one-team (one team runs the agents and the checks), or ownership.q3_promotion_authority is evaluation-team (evaluation promotes its own results); 28 of the 64 combinations do one or both | the ownership answers put the agents and the checks under one team, or let evaluation promote its own results (ownership.q1_checking_team, q2_runtime_producer, q3_promotion_authority) |
| `sep.business-risk-owner` | The business risk owner also proposes or verifies. | separation.business_risk_owner_role equals separation.producer_team or separation.verifier_team |
| `sep.security-risk-owner` | The security risk owner also proposes. | separation.security_risk_owner_role equals separation.producer_team |
| `tools.owner-grades-own` | A tool's owner also computes that tool's yield. | tools.tool_owner_team equals tools.yield_owner_team |
| `tools.decision-conflicted` | Tool portfolio decisions are made by the team that runs the agents or owns the tool. | tools.decision_owner_role equals separation.producer_team or tools.tool_owner_team |
| `road.owner-verifies` | The paved-road owner verifies its own retirement claims. | road.owner_team equals separation.verifier_team |
| `road.owner-metrics` | The paved-road owner computes its own road metrics. | road.owner_team equals road.metrics_owner_team |
| `attest.self-confirmed` | An asset's consequence tier is drafted and confirmed by the same party. | a crown_jewel_register entry's confirmed_by equals its drafted_by |
| `attest.owner-drafts` | The asset owner drafts its own consequence tiers. | attestation.drafter_team equals attestation.asset_owner_role |
| `admin.cpo-is-verifier` | The control-plane operator is also the verifier. | separation.control_plane_operator_role equals separation.verifier_team |
| `sep.evaluator-conflicted` | The evaluation team is also the verifier, the paved-road owner, the tool owner or the portfolio decision owner, so an automated verifier or evaluator would grade work its own team does. | separation.evaluation_team equals separation.verifier_team, road.owner_team, tools.tool_owner_team or tools.decision_owner_role. Checked whenever both are named, at any phase; the verifier and evaluator roles first run as systems in phase 3, and separation.evaluation_team is a phase 3 readiness section, so phase 3 cannot start until it is named |
| `creation.author-merges` | In the secure-creation loop, a change can be merged by its author: the coding agent or the person whose session produced it. | modules.secure-creation.merged_by is change-author or coding-agent |
| `creation.catch-layer-conflicted` | The team that assigns the layer that should have caught a defect is the secure-creation owner or the paved-road owner. | modules.secure-creation.catch_layer_assigner_team equals modules.secure-creation.owner_team or road.owner_team |
| `creation.drift-reporter-is-reviewer` | The team that reports reviewers' approval drift on agent-written changes is the team of reviewers it reports on. | modules.secure-creation.drift_reporter_team equals modules.secure-creation.reviewer_team |
| `sep.purple-team-decides` | The purple team, whose AI proposes kept tests, re-proof results and detections, is also the verifier team, the team that owns proof conditions, the security risk owner or the team that accepts detections, so it would accept or grade what its own AI proposes. | separation.purple_team equals separation.verifier_team, separation.fixture_oracle_owner_team, separation.security_risk_owner_role or, when it is named, separation.detection_owner_team |

<a id="r1-card-loosening-controls"></a>
### Loosening controls: A control should never loosen without an attributed, expiring decision and a replay afterward.

**Protects:** I8. Every control will be loosened at some point under delivery pressure. What keeps that safe is knowing who decided, until when, and checking what slipped through.

**Legitimate reasons an organization might make an exception:** A business-critical release window; a tier whose failure behavior the organization's own continuity plan sets differently.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Keeps deploys moving; owns what ships while the control is loose. |
| Security risk owner | Needs the replay to find what slipped through; without it, a temporary exception becomes permanent exposure. |
| Engineering owner | Ships on time; may later have to roll back what the replay finds. |
| Second line and audit | Expects every loosening to be attributable and time-bound. |
| Control-plane operator | Implements the looser posture and must be able to restore it. |

**Compensating controls to consider:** Shorter expiry than the default; replay owed on recovery for everything that shipped; notify the security risk owner on each use.

**Failure scenarios that exercise it:** F14, F16, F40, F41, F56 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `shipthrough.acceptor-not-business-owner` | Ship-through on a held gate is accepted by someone other than the business risk owner. | gate_failure_policy.override.acceptor_role is set and differs from separation.business_risk_owner_role |
| `shipthrough.acceptor-conflicted` | Ship-through is accepted by a proposing, fix-writing or verifying team. | gate_failure_policy.override.acceptor_role equals separation.producer_team, fix_author_team or verifier_team |
| `shipthrough.no-concurrence` | Ship-through acceptor and concurrence are the same role. | gate_failure_policy.override.concurrence_role equals gate_failure_policy.override.acceptor_role |
| `shipthrough.no-replay` | Fail-open events owe no replay on recovery. | gate_failure_policy.override is set and its replay_on_recovery is false |
| `gate.crown-jewel-open-with-record` | A gate on a crown-jewel path fails open with a record alone. | gate_failure_policy.by_tier.crown-jewel is fail-open-with-record, or a gate_failure_policy.blocking_cost_adjustments entry with path_tier crown-jewel has posture fail-open-with-record |
| `dial.bound-looser` | A dial's bound is set looser than the core bound. | a dials[] entry sets a bound looser than the core bound for that dial (lower where the safe direction is up, higher where it is down; core bounds are in the quality data) |
| `tier.failure-mode-override` | A quality tier's failure behavior is changed. | tier_overrides sets failure_mode, intent or name for any tier |
| `modules.alignment-overdue` | A module interface point has sat below aligned longer than the alignment limit allows (the organization's dial, or the 180-day exception ceiling while the dial is unset). | a current_practice.modules[].points[] entry below aligned records a since date more than the alignment limit's whole days before the evaluation date; the limit is module_alignment_max_days current in the dial register when it is a number, and otherwise the exception ceiling (exception_policy.max_days, 180 days) |

<a id="r1-card-control-administration"></a>
### Control administration: A control should never share administration with what it guards, and a bought control should never leave the organization's hands.

**Protects:** I1, I7. A control administered by the people or systems it constrains fails together with them. Whatever is bought, the organization keeps the policy, approvals and keys.

**Legitimate reasons an organization might make an exception:** A managed service the organization cannot administer separately yet; a platform team that runs everything until the assurance unit is staffed.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Uses one team or vendor instead of two; accepts that one compromise can reach both sides. |
| Security risk owner | The control-plane boundary becomes a matter of trust in one team or vendor. |
| Engineering owner | Little day-to-day change; larger blast radius when that team or vendor errs. |
| Second line and audit | Segregation of administrative duties is a common audit expectation. |
| Control-plane operator | Holds more access than the design intends; every action should be recorded and reviewed. |

**Compensating controls to consider:** Just-in-time administration with a second approver; session recording reviewed by the security risk owner; contractual control of keys and policy for bought parts.

**Failure scenarios that exercise it:** F55, F59, F68 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `admin.control-plane-operator` | A fail-closed control is administered by someone other than the control-plane operator. | a build_or_buy entry's administered_by differs from separation.control_plane_operator_role for a part it covers that is a fail-closed control in the control zone or a model-boundary gate |
| `admin.cpo-is-platform` | One role operates both the control plane and the shared platform. | separation.control_plane_operator_role equals separation.platform_operator_role |
| `bought.without-org-controls` | A bought part that enforces a rule is not under the organization's control. | a build_or_buy entry has choice buy and organization_controls not true, and covers a part that enforces a rule (classified should-never). A part entry covers its part; a plane entry covers each part of the plane except a part whose own entry has a choice that is one of build, buy, reuse or undecided, since that entry overrides the plane's for it. |
| `model.t0-placement` | A fail-closed control sits outside the control or execution zone (architecture exception). | architecture exception: declared by the organization, not detected from the profile; applies when a fail-closed control actually sits outside the control or execution zone |

<a id="r1-card-model-boundary"></a>
### Model boundary: Model output should never reach a grant or a decision, and attacker text, private data and a way out should never meet in one agent route.

**Protects:** I7, I1. Prompt injection is not solved; it is contained. These boundaries are what contain it, and a model judgment is still a judgment about input an attacker can shape.

**Legitimate reasons an organization might make an exception:** A vendor agent platform whose internals cannot be split yet; an early experiment on synthetic data only.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Adopts tools faster; owns the chance that injected text drives a real decision. |
| Security risk owner | The main defense against injection becomes the model's own behavior, which cannot be relied on. |
| Engineering owner | Agents may file or close work based on manipulated input. |
| Second line and audit | Decisions cannot be shown to rest on deterministic checks. |
| Control-plane operator | Gates that were deterministic now depend on model calls and their providers. |

**Compensating controls to consider:** Synthetic or public data only on the excepted route; human review of every action or decision the route touches; strict output schemas and allow-lists.

**Failure scenarios that exercise it:** F21, F39, F45, F69 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `model.trifecta` | An agent route holds untrusted content, non-public data and a way out (architecture exception; detected in phase 1 from phase_1_boundary). | while phase_1_boundary.status is active: with source practice-target (the default), any of target_written_by_team, outsider_text_excluded, agent_egress_model_route_only or context_synthetic is false; with source discovery-finding or recent-finding, agent_drafts_only or agent_egress_model_route_only is false; afterwards an architecture exception, declared rather than detected, that applies when an agent route in the organization's actual architecture holds untrusted content, non-public data and a way out together |
| `model.phase1-boundary-unconfirmed` | The phase 1 boundary is confirmed by someone other than the independent reviewer. | phase_1_boundary.status is active and phase_1_boundary.confirmed_by_role is set and differs from separation.verifier_team |
| `model.quarantine` | The part that builds agent context receives untrusted free text (architecture exception). | architecture exception: declared, not detected; applies when the part that builds agent context actually receives untrusted free text |
| `model.boundary` | A gate on the model path is not deterministic or sits outside the control zone (architecture exception). | architecture exception: declared, not detected; applies when a gate on the model path actually calls a model or sits outside the control zone |
| `model.advisory` | A model judgment feeds authorization, coverage, a verdict, closure, promotion or a tier attestation (architecture exception). | architecture exception: declared, not detected; applies when a model judgment actually feeds authorization, coverage, a verdict, closure, promotion or a tier attestation |

<a id="r1-card-degradation"></a>
### Degradation: Controls should never depend on a model, and an outage should never produce fallback credentials or a false all-clear.

**Protects:** I10, I6. Providers fail, change policy or become unavailable. The loop can slow down when that happens; it must not become unsafe.

**Legitimate reasons an organization might make an exception:** An identity provider whose outage behavior the organization cannot change; a SIEM migration window.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Avoids stalls during outages; owns what runs while visibility or identity is degraded. |
| Security risk owner | Outages become the moment when checks pass by default. |
| Engineering owner | Fewer blocked pipelines during outages. |
| Second line and audit | Evidence gathered during outages may not be trustworthy. |
| Control-plane operator | Must track and unwind anything issued in degraded mode. |

**Compensating controls to consider:** Mark everything done in degraded mode for replay; cap the duration of degraded operation; alert the security risk owner when degraded mode starts.

**Failure scenarios that exercise it:** F48, F49, F50, F54 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `model.ai-free-control-plane` | A control or execution part depends on the model path (architecture exception). | architecture exception: declared, not detected; applies when a control or execution part actually depends on a model route |
| `infra.idp-not-fail-closed` | An identity provider outage does not stop new grants and leases. | an infrastructure_dependencies entry of kind idp has failure_posture other than fail-closed |
| `infra.siem-continue-without` | Detection checks continue without the SIEM and report passed. | an infrastructure_dependencies entry of kind siem has failure_posture continue-without |

<a id="r1-card-measurement-honesty"></a>
### Measurement honesty: Coverage should never be claimed from declarations, unsampled data or unvetted versions.

**Protects:** I5, I3. The paved road and the tool portfolio earn lighter testing only where coverage is proven. Claimed coverage that was never checked is how blind spots grow.

**Legitimate reasons an organization might make an exception:** A road entry with a long, clean history that the organization chooses to trust by declaration for a period.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Less testing cost; owns the gaps a declaration hides. |
| Security risk owner | Road and tool metrics stop being evidence. |
| Engineering owner | Lighter scanning on code believed to be on the road. |
| Second line and audit | Coverage reports rest on assertions. |
| Control-plane operator | No direct change. |

**Compensating controls to consider:** Keep a small sample even where coverage is declared; re-vet on every road entry version; report declared and proven coverage separately.

**Failure scenarios that exercise it:** F27, F30, F34, F36, F37 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `tools.unsampled-yield` | Tool yield is computed without a pre-registered sample. | tools.yield_requires_sampling is false |
| `road.conformance-declared` | Road conformance is read from declarations, not deployed state. | road.conformance_basis is declared |
| `road.service-granularity` | Road conformance is judged per service, not per call site. | road.conformance_granularity is service |
| `road.unvetted-version` | A road entry version confers coverage before it is vetted. | road.vet_each_version is false |
| `road.zero-sample` | Covered call sites are never sampled. | road.covered_sample_share is 0 or less |
| `road.escape-hatch-free` | Leaving the road does not reinstate per-service regressions. | road.escape_hatch_reinstates_regressions is false |
| `road.opt-in-without-check` | An opt-in road entry confers coverage without a per-call-site check. | road.opt_in_coverage_requires_call_site_check is false |

<a id="r1-card-evidence-partitioning"></a>
### Evidence partitioning: Evidence should never be read across jurisdictions or business lines outside the review console.

**Protects:** I5. Partitioning keeps evidence lawful to hold and keeps one compromise from exposing everything.

**Legitimate reasons an organization might make an exception:** A single legal entity with no cross-border data constraints.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Simpler reporting across the organization. |
| Security risk owner | A single read path can expose every partition. |
| Engineering owner | No direct change. |
| Second line and audit | Data residency and access obligations may be breached. |
| Control-plane operator | Fewer keys to manage; larger blast radius per key. |

**Compensating controls to consider:** Attribute and review every cross-partition read; separate keys per partition even if reads are open.

**Failure scenarios that exercise it:** F66 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `partition.cross-reads` | Reads across evidence partitions bypass the review console. | data_partitioning.cross_partition_reads is set and is not review-console-only |
| `partition.no-jurisdiction-key` | Evidence is not partitioned by jurisdiction although several jurisdictions apply. | jurisdictions lists more than one and data_partitioning.keys does not include jurisdiction |

<a id="r1-card-sequencing"></a>
### Sequencing: A pluggable module should never switch on before its entry evidence exists.

**Protects:** I8. Modules add parts, work and claims. Switching one on early spends effort on capability the loop cannot yet support or measure.

**Legitimate reasons an organization might make an exception:** A mandate that requires the capability by a date.

| Role | What it gains and carries |
|---|---|
| Business risk owner | Gets the capability sooner; pays for it before it can be shown to work. |
| Security risk owner | Results from the module may not be trustworthy yet. |
| Engineering owner | More process before the core loop is settled. |
| Second line and audit | Claims from the module rest on thin evidence. |
| Control-plane operator | More parts to run earlier. |

**Compensating controls to consider:** Label the module's outputs provisional until entry evidence exists; review at the next phase.

**Failure scenarios that exercise it:** F44 (reference R3).

| Rule code | What it means | Triggers when |
|---|---|---|
| `modules.before-evidence` | A module is switched on before its entry evidence. | a modules entry is enabled before its entry evidence: consequence-gates needs findings_with_reached_assets of at least 10 and at least 80 percent of the crown-jewel register confirmed; paved-road needs classes_with_two_reproduced of at least 3; tool-portfolio needs closed_cases_with_lead_provenance of at least 20 and lead_text_quarantined true; production-effects needs phase_3_continue_decision and approved_production_profile both true; secure-creation needs provenance_share_required answered, provenance_stamped_share at least that share, and derived_checks_running of at least 1 |

<a id="r1-consistency-checks-defects-to-fix-no"></a>
## Consistency checks (defects to fix; no exception covers them)

- Every value matches its schema type and enumeration, and no answer is left as a FILL placeholder once the profile is called complete.
- The ownership answers name a combination the reference ownership scenarios cover.
- A gate policy keyed on impact_score sets score_threshold, and every registered asset has an impact_score.
- Shares (confidence_bar_default, road.covered_sample_share, ai_resilience.primary_provider_share) are between 0 and 1.
- A tool marked mandated names the obligation that mandates it.
- A typed model route lists the decision types it serves.
- The fallback route is one of the eligible model routes.
- A self-hosted fallback, or a producer whose lowest rung is self-hosted, has self-hosting capacity behind it.
- tier_overrides names known tiers and known targets only.
- build_or_buy keys are part ids or plane names, and each choice is build, buy, reuse or undecided.
- modules names known modules only.
- The module inventory names only interface points its module declares, and no point that ends at a part coding agents can reach, at the part that builds agent context, or at a producer is connected without being conformant.
- Once a dial register exists, it lists every core dial that has a default; a dial past its bound carries its own recorded risk acceptance.
- A value that also lives in the dial register (covered sample share, lead sample minimum, confidence bar) has the same value in both places.
- Every exception names a known rule code and meets the exception policy.
- A kept test's longest quarantine (kept_test_quarantine_max_days in the dial register) is no longer than the exception ceiling, because a quarantined kept test is an open exception.
- Each stable team id (separation.team_ids) names one team: two team names never share an id.
- Once the past-findings baseline is frozen (current_practice.history.frozen), its figures match the latest version: the freeze, or the last dated amendment.
- A window bundle's longest life (window_bundle_max_hours in the dial register) is no longer than the posture expiry (posture_expiry_hours), because a window bundle sees a revocation only when it expires.
- The role that confirms escapes (escapes.confirmer_role) is none of the roles that detect them (escapes.detection_sources[].detecting_role), because an escape counts only once someone apart from its detector reproduces it.
- The role that confirms escapes is neither the producer team nor the program decision owner, whose results the escape rate judges, because an unconfirmed escape counts nowhere.
- In the trusted-agent notice mode for attack injection, a trusted agent (injection.trusted_agent_role) is named, is on the detection side, one of the roles that detect escapes or the detection owner team when any is named, and is not the team that runs the agents, and is recorded as able to stop the exercise. Once the section is answered, a null trusted agent or stop power means none, which contradicts the mode; a placeholder leaves the section unanswered, and an unanswered section runs no injection past the pipeline.
- Attack injection may reach production (injection.allowed_environments) only while the production-effects module is enabled and with a maximum exposure window (injection.production_max_exposure_minutes).
- Attack injection that may reach any environment past deployment has a ceiling from a stop or a grant's expiry to the environment restored (injection.stop_restore_max_minutes).
- Once gate_seeding is declared, each human gate the rules name (approver, proof-holder, decider) has one entry with seeding on, a nonzero catch-rate floor, a named breach action, seed categories whose refresh date has not lapsed, a seeding owner outside the gate's own team, per-person catch rates kept from managers and performance reviews, and a breach the system computes; the approver gate's seed rate is the seeded_proposal_rate dial.

<a id="r1-the-interview-questions-sources-and-who"></a>
## The interview: questions, sources and who confirms

An organization's agent can answer many of these from internal systems. Answers marked **confirm** need a named person to confirm them in writing before the profile is validated, because they assign accountability, set risk posture or name crown jewels. Record the confirmer beside the answer (in the profile where a field exists, otherwise in the agent's notes).

Where facts usually live: service catalog or CMDB; IAM and access governance; CI/CD and source control; change management; incident management; business impact analysis and continuity plans; data classification policy; security tooling consoles; vendor and contract records; the risk register.

| Profile section | Questions | Usual sources | Confirm |
|---|---|---|---|
| `profile` | What is the organization or unit called, and what does it run? | Service catalog, org charts | No |
| `current_practice` | Ask this first. How does the loop work today? Who runs discovery (often red teamers or security engineers pointing agents at repositories or infrastructure), against what, with which agents and models, and how freely: free-running, scoped, or with each action approved? When an agent finds something, who checks whether it is reachable end to end, and how many days does that take? Where does a confirmed finding go? Then for each step of the loop: is it established, partial, ad hoc or absent, who owns it, what shows it, and who confirmed it? Record today as it is, without judging it; it sets where each step starts. During phase 1, before phase 2 starts, gather past findings and incidents into `current_practice.history`: over what period, from which sources, how many deployments the period had, and for each weakness class how many findings there were and how many reached production? Who confirmed the figures against their sources? They set the escape rate's starting point. At phase 2 entry, freeze the past-findings baseline: who confirms the figures, and on what date? After that, every correction is a dated amendment with its reason. | Red team and security engineering leads, the discovery tools' own run history, the tracker, incident records, bug bounty and external report history, deployment records, the people who did the last few fixes | No (a record of today, confirmed by the people who run it) |
| `current_practice.modules` | Which pluggable modules does the organization already run in some form, often disconnected: security tools whose output nobody reproduces, a business impact analysis, a paved road, a production change process, coding-agent guardrails? For each: is it established, partial, ad hoc or absent, who owns it, and how does it connect to the rest today? Then for each of its interface points: does anything cross yet (none), does data cross through whatever the existing system allows (connected), does what crosses match the module's contract (conformant), and does the practice keep the four rules and the module's separations (aligned)? Since when has each point stood at its rung? How many days may a point sit below aligned before the organization wants it refused (the module_alignment_max_days dial; it has no default, and while it is unset the 180-day exception ceiling applies)? | Tool owners, platform engineering, business continuity, change management, developer platform team | No (a record of today, confirmed by the people who run it) |
| `existing_tools` | At each of loop steps 1 to 11 (the profile records no tool for step 12, the secure default), which tool already does that job (tracker, inventory, IAM, isolated environment, source control, deployment records, CI pipeline)? Which steps have none? | Service catalog, CI/CD, IAM, tracker admin | No |
| `jurisdictions` | Which jurisdictions apply, and which incident clocks (event, hours, authority) do they impose? | Legal and compliance register | **Confirm** (compliance owner) |
| `delivery` | How often do services deploy? Which regression cadence is the starting point (periodic, scheduled, continuous)? Does change management pre-approve standard changes? | CI/CD metrics, change management policy | **Confirm** (change manager) |
| `ownership` | Where does the checking team sit (same team, sibling team, second line, split)? Who runs runtime testing (platform, red team, vendor, product teams)? Who promotes agents and models? | Org charts, security operating model | **Confirm** (security leadership) |
| `separation` | Which team drafts tests, approves actions, owns the proof condition, verifies, writes fixes and accepts closure? Which executive approves phases 1 and 2 (the program decision owner)? What counts as one team when separation is compared: a reporting line up to which level, a cost center, a pod? Where does internal audit sit: verifier, closure acceptor, observer, or not involved? Who is the business risk owner and the security risk owner? Which role operates and administers the control plane (in the assurance unit, never the platform operator, producer or verifier), and which role operates the shared platform and execution cells? Before phase 3, when the verifier and evaluator first run as systems: which team runs evaluation (never the verifier team, the paved-road owner, the tool owner or the portfolio decision owner)? Optionally, which team is the purple team, whose AI turns validated findings into proposed detections and kept tests, runs the scheduled re-proof and supplies seed material (it may be the team that runs the agents, never the verifier team, the team that owns proof conditions or the security risk owner)? Optionally, which defensive team reviews and accepts the detections it proposes (never the purple team)? Optionally, what stable id does each team keep, so a later rename never reopens an accepted design change (an id names one team; a merger or split gets new ids)? | Org charts, RACI, risk register, platform operating model | **Confirm** (each named owner) |
| `models` | Which model routes are eligible, hosted or self-hosted, and which data classes may each receive? Where must data stay? | AI governance register, data classification policy | **Confirm** (AI governance and data owner) |
| `scale` | How many services and teams are in scope? | Service catalog | No |
| `risk_appetite` | Is the appetite low, moderate or high for this program? | Risk appetite statement | **Confirm** (risk owner) |
| `attestation` | Which team drafts consequence tiers? Which role confirms them? Is there a calendar maximum, and what owner-minutes target applies? | Business impact analysis owners | **Confirm** (line-of-business owner) |
| `unattested_default` | Which tier should an unconfirmed asset count as? | Risk owner decision | **Confirm** (risk owners) |
| `crown_jewel_register` | Which assets are crown jewels, critical or standard? Who drafted each tier, from which sources, and who confirmed it? | Business impact analysis, continuity tiers, data classification, service catalog criticality | **Confirm** (each asset's line-of-business owner) |
| `blocking_cost_register` | For each service, what does blocking a deploy cost: life-safety, mission-critical or standard? | Continuity plans, service criticality | **Confirm** (service owner) |
| `tier_overrides` | Do any quality targets (availability, recovery point and time, consistency, durability, retention) differ from the defaults? Failure behavior cannot be overridden. | Platform SLOs, retention policy | **Confirm** (platform owner) |
| `gate_failure_policy` | When a regression gate is down, what happens per consequence tier? Who accepts a ship-through, who concurs, for how long? How much deploy latency may the regression stage add (optional; 10 minutes unless set), and if that is below the regression time budget, is the stage dependency-scoped or are late replays run after the deploy? | Risk owners, change management | **Confirm** (business and security risk owners) |
| `ledger_write_path` | Do findings enter the record only through intake? (Any value other than intake-only needs an exception.) | Tracker configuration | No |
| `road` | Which paved-road assets already exist (portal templates, base images, container policy, auth libraries, gateway, secure-default linters)? Who owns the road and who measures it? | Platform engineering, developer portal | No |
| `tools` | Which security tools run today (static and dynamic analysis, dependency, secrets, infrastructure and container scanning, bug bounty, external tests)? Which are mandated, and by which obligation? Who owns them, who measures their yield, who decides their future? | Security tooling consoles, compliance register | **Confirm** (security risk owner for mandated tools) |
| `modules` | Which pluggable modules have their entry evidence today? Does the organization run a secure-creation loop where code is written, and if so what share of merged changes must carry a provenance stamp before the module switches on (the organization sets it), what share carries one today, and how many derived checks run while code is written? Who runs the secure-creation loop, who merges a change on the protected branch (never its author, the coding agent or the person whose session produced it), which team assigns the layer that should have caught each defect (never the secure-creation owner or the road owner), which team reviews agent-written changes, and which team reports those reviewers' approval drift (never the reviewers' own team)? | The program's own records; source control and the coding-agent platform for provenance stamps | No |
| `dials` | Which dial settings differ from the defaults, and who turned them? Which role owns the early-stop minimum (early_stop_min_closed_cases, five closed cases unless set otherwise)? That is the organization's choice; record the role as the dial's turner. A setting past its bound needs a recorded risk acceptance. One dial has no default and is set only by choice: module_alignment_max_days, how long a module interface point may sit below aligned before it is refused. While it is unset, the 180-day exception ceiling applies. Five more have no default and govern kept regression tests: after how many days without a failure a kept test's extra time-based runs move to the slower scheduled lane (it still runs, and still blocks, on every change that touches its declared dependencies), how often that lane runs, how many kept tests may be quarantined at once and for how long (never longer than the exception ceiling, because a quarantined test is an open exception), and how often each kept test is re-proved against its fix reverted. Leave any of them out until the organization has decided; once any kept-test dial is set, an unset quarantine count cap or re-proof interval draws a warning. | Risk register | **Confirm** (security risk owner) for any setting past its bound |
| `agent_limits` | Optional; leave it out and approval works as it did before limits existed: kept regression tests replay on their reviewed batch approvals and standing permissions, and every other agent action is approved by a person. For each agent route, and each kind of judgment that may earn autonomy: what is the highest consequence tier it may touch on a grant alone, in which environments, and with which action classes (read-only, reversible, state-changing)? Did the security risk owner set that limit (no one else may, and never the team that runs the agents)? At which consequence tier does a person approve every action whatever the limits say, and did the business risk owner set that line? Which standing permissions, batch approvals, earned-autonomy grants and dials already let an agent act, or a judgment stand, without a person approving each one, and what does each reach? A batch approval, where a person approves a named set of tests and targets for a window at once, counts when the actions in it run without a person approving each one. Each must sit inside its limit and below that tier. Before phase 2: over what window is each route's trailing accuracy read, a count of its most recent actions or a number of days? | Risk register, the dial register, IAM and the approval workflow's standing permissions, promotion review records | **Confirm** (security risk owner sets each limit; business risk owner for the consequence line) |
| `thresholds` | Optional, and usually empty until phase 1 ends. Which numbers stop the work or grant a step of trust, set from the phase 1 map before phase 2 starts? For each: the value and what it counts, who set it and when, what it decides, and which phase it gates. Leave out any number the dial register already holds, such as the early-stop minimum. | The phase 1 report and map, the sponsor's written criteria | **Confirm** (whoever set each one; the sponsor, unless the organization named another role) |
| `fix_capacity` | How long may accepted findings stay open, and over how many weeks does a rising age count as saturation? Optionally, for each owning team: how many open validated findings will it accept at once (its fix cap), and which security role agreed that cap with it? What default cap applies to a team that sets none (the program decision owner sets it; phase 3 needs it)? How often does each team review the findings refused above its cap with the security role that agreed it, who co-signs each review (monthly unless the organization sets another interval; the review may run in the tracker)? A finding above a cap is logged with its reason, never dropped; one that reaches an asset at or above the consequence line enters the queue regardless, and one held at two consecutive reviews goes to the security risk owner. Within how many days must a finding matched by a known exploited listing or observed exploitation be fixed and verified in the running system (the exploited window; the edition sets no number)? Such a finding passes the cap regardless, as does one with an external disclosure deadline. | Tracker metrics, engineering leadership, each owning team's lead | **Confirm** (engineering leadership; each owning team with security for its cap; program decision owner for the default) |
| `ai_resilience` | Which model providers are used, what share goes to the largest, how much self-hosting capacity exists, which route is the fallback, and what is the lowest rung each test-drafting agent can run on? | AI platform inventory, vendor records | No |
| `infrastructure_dependencies` | Which identity provider, CI system, tracker and SIEM does the loop rely on, and what does each do when down? | Platform architecture records | **Confirm** (platform owner) |
| `build_or_buy` | For each part or plane: build, buy, reuse or undecided, and which product? For a bought part that enforces the four rules, does the organization keep its policy, approvals and keys? Which role administers each part (a fail-closed control in the control zone must be the control-plane operator)? | Architecture decisions, procurement records | **Confirm** (architecture owner) |
| `exceptions` | Does the organization choose to make an exception to any should-never rule? For each: which rule code, why, which compensating controls, until when, and which roles discussed its trade-off card (this part)? Record none until the conversation has happened. | Risk register, the organization's existing exception process | **Confirm** (business risk owner accepts, security risk owner concurs; for a phase_1_only exception, the program decision owner accepts and the independent reviewer concurs) |
| `phase_1_boundary` | Where does phase 1's one weakness come from: a practice target the team writes, a finding from the existing discovery practice (people running agents against repositories or infrastructure), or a recent finding? This is the organization's choice. With a real finding: does the phase 1 agent draft only, holding no tools, with people running every approved action (agent_drafts_only; with a practice target leave it null)? Is the model route its only network exit? With a practice target: did the phase 1 team write the synthetic target and seeded path, with nobody outside able to write to them? Is all outsider text kept from the agent, including dependency code comments and READMEs, shared-environment logs and data copied from production? Is the model route the agent's only network exit? Is everything in its context synthetic or test-only, credentials included? Optionally, what limits the runner in phase 1: a scoped role (phase 2 replaces it with exact grants), each run bound to the exact approved action, or something else? Ask again whenever the environment changes; mark it retired once the request-data gate is load-bearing. | Test environment inventory, network policy, the target's repository and dependency list, the discovery practice's finding record | **Confirm** (independent reviewer) |
| `cloud_overlay` | Does the organization build on a public cloud, and which Regions does it allow, primary first? (Candidates per part come from the overlay; choices still go in `build_or_buy`.) Who administers the cloud management account, and are they kept apart from anyone who proposes or judges tests? | Cloud platform team, landing-zone records | **Confirm** (cloud platform owner) |
| `data_partitioning` | How are evidence, ledger, audit and context stores partitioned (jurisdiction, line of business, legal entity)? Is every cross-partition read routed through the review console? | Data residency policy, legal-entity register, data classification policy | **Confirm** (data protection officer or data owner) |
| `escapes` | Needed before phase 2. Where are weaknesses that reached production found today: incident response, bug bounty, external reports, testing against production, monitoring, the discovery practice, anything else? Which role detects and reports from each? Within how many days after a deployment does an escape found there count toward that deployment's escape rate (a later one is recorded as a late escape and reported apart)? Which role confirms each escape by reproducing it through the running system, apart from every role that detects them, from the producer team and from the program decision owner? How many days may an escape stay unconfirmed before the security risk owner is alerted (optional; the detection window otherwise)? Expect most bug bounty escapes to arrive after the window, as late escapes. | Incident records, bug bounty and external report history, the tracker, deployment records, the security operations and product security teams | **Confirm** (security risk owner) |
| `injection` | Optional; leave it out and attack injection stays at the pre-deploy layers (workstation, pull request, pipeline), which need no notice. May an attack-injection experiment reach a deployed test environment or production, and which of them? Who on the detection side is told before it starts: one trusted agent, the recommended mode, every detecting role (announced), or nobody (unannounced)? In the trusted-agent mode, which role is the trusted agent? It must be a role that detects escapes or the team that accepts detections, and it may not be the team that runs the agents. Can that role stop the exercise at any point? It must be able to; the stop goes to the authorization service, which revokes the injection and restores the environment. Which rollback of the service owner's own, named in the runbook, does the trusted agent use when the authorization service cannot answer? Within how many minutes must the environment be restored after a stop or when an injection's time limit runs out? Every environment past deployment needs this ceiling. Production is allowed only once the production-effects module is enabled, only when its approved production profile names attack injection explicitly, and only with a maximum exposure window in minutes. Leave a placeholder anywhere in the section and it counts as unanswered: nothing is injected past the pipeline until it is filled. | Incident response and security operations runbooks, existing game-day or red-team rules of engagement, the production-effects module's approved production profile | **Confirm** (security risk owner, with the defensive team's lead for the trusted agent) |
| `disclosure` | Optional. Which role reports weaknesses the loop finds in third-party components to their maintainers, often the product security incident response team or the vulnerability disclosure owner? Which coordinated disclosure policy does it follow? How many days before an external deadline, from an outside reporter or agreed in an outbound report, should the security risk owner be alerted about a finding still open (the edition sets no number; unset, the alert fires when the deadline is recorded)? A finding with an external deadline passes the owning team's fix cap whether or not this section is filled. | Vulnerability disclosure policy, product security incident response runbooks, bug bounty program terms | **Confirm** (security risk owner, with the role named for outbound reports) |
| `gate_seeding` | Optional; once declared, all three human gates need an entry. For the approver, the proof-condition holder and the decider: what share of their items are seeded known-bad items (the approver's share is the seeded proposal rate dial), how many categories of your threat model for your own oversight the seeds come from, which threat model that is, and by what date the seeds are refreshed next? What catch rate is the floor, and what does a breach start? Who runs the seeding, from outside the gate's reporting line? Confirm per-person catch rates go only to that owner and to each person for their own rate, never to a manager or a performance review, and that the system computes a breach. | The oversight threat model, the dial register, the evaluation team's seeding plan | **Confirm** (security risk owner, with the seeding owner) |
| `regimes` | Optional; leave it out and the status report shows arrivals, verified fixes and their ratio per weakness class with no regime, and warns once findings are recorded. Over how many days does the regime check count, and from how few arrivals and fixes together will the organization read a ratio? At what share of verified fixes per arrival is a class balanced? At how few arrivals per window and how few open findings is a class near zero? Derive each number from past findings recomputed over earlier windows, with the recipe in the profile template; the edition sets none. Who set them, and when? | The tracker's validated findings and fix verifications, the current-practice map's past findings, the classes retired onto the paved road | **Confirm** (security risk owner) |
