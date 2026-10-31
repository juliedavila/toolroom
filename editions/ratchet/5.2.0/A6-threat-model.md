<a id="a6"></a>
# Annex A6: Ratchet's own model generates its threat leads

*Ratchet: closed-loop security validation for AI-assisted engineering. Annex. Edition 5.2.0, Thesis 1.4.3, 2026-10-31, build 5842e9bf+local.*

*A proposed method. The grid counts below are generated from the compiled design on every build; the method around them is the authors' proposal, and its first test is the recall grade described at the end.*

Ratchet's compiled design already holds what a threat model needs. It places every part in a trust zone, types every relationship and names the contract it carries, marks outsider text, and records who issues each control action and which failure scenarios test each invariant. The model checks decide the structural threats on it at every change, those of the form "can this part reach that one carrying this content". This annex proposes a way to use the same design to generate the candidate threats the checks do not decide, and to hold those candidates to the discipline Ratchet applies to an agent's findings.

<a id="a6-two-losses-shape-the-method"></a>
## Two losses shape the method

- **False closure:** a finding recorded as closed while the weakness is still exploitable. A threat model can produce one of its own: a candidate threat marked as handled because a contract states a guarantee the running code does not honor reads as closed and is never tested again.
- **Self-graded evidence:** a phase gate decided on numbers the system under evaluation produces. A threat model judged and graded by the team that generated it carries the same flaw.

Both follow from letting the producer of a claim also accept it, which is what Ratchet's four rules forbid for findings. So the method applies the rules to the threat model itself. A generated threat is a lead in the sense of rule 3: it enters the threat register only when someone independent of the model owner and of whatever generated it accepts it. Each accepted threat is encoded as something that fails on its own when the threat returns. And the register is graded afterwards against the failures Ratchet's record confirms.

<a id="a6-the-method-runs-in-eight-steps"></a>
## The method runs in eight steps

| Step | Question | Method | Owner | Output |
|---|---|---|---|---|
| 1. Frame the losses | What are we working on, and which losses matter? | Use case first; the losses and hazards step of STPA | Security risk owner, with business owners confirming | Losses and hazards, each traced to an invariant or flagged as a new one |
| 2. Generate | Where can it go wrong, structurally? | The threat grid below, run in the pipeline beside the model checks | The model owner: the authors for the reference design, the organization for its own compiled design | The candidate register: every cell, with the auto-closed cells and the field that closed each |
| 3. Judge | Which candidates are real? | Review of the register, with known-real and known-false cells seeded into it | Independent security staff, never the model owner or whatever generated the cells | Accepted threats with ids; rejected cells with a reason |
| 4. The human layer | How do the overseers fail? | STRIDE over oversight; unsafe control actions and flawed process models for each person who controls the loop | A second analyst outside the assurance unit, interviewing the people who hold the roles | Oversight threats and feedback gaps |
| 5. Adversary trees | What would a capable adversary do? | Attack trees with one root per rule, one for the handoff to secure creation and one for false closure | Held-out assessors, scope approved by the security risk owner | Trees with each leaf marked covered or open |
| 6. Program pass | How does the program itself fail? | STPA-Sec on the program's own control structure (U-166), extended to sponsors, phase gates and edition releases | The decision owner's delegate and an analyst outside the program | Program hazards, self-graded evidence first among them |
| 7. Encode | What will stop each accepted threat coming back? | The routing table below | By artifact | One artifact per accepted threat, with its id |
| 8. Grade | Did the register predict what happened? | Recall and precision against the record | Ratchet's evaluation group, independent of the model owner | Threat-model recall, precision and yield by source |

Step 2 is the only one a machine does. Steps 3 to 6 and 8 need people who did not produce what they judge, and an organization that lacks three independent parties (the judge, the second analyst and the held-out assessors) gets a single-team threat model with the rules' language on it.

<a id="a6-the-generator-emits-two-grids-from"></a>
## The generator emits two grids from the compiled design

**STRIDE per interaction.** Every relationship whose two ends sit in different trust zones gets six cells, one per letter: spoofing, tampering, repudiation, information disclosure, denial of service and elevation of privilege. A person sits in no trust zone, so every relationship between a person and a part crosses a boundary. A cell closes automatically only when every contract the relationship carries states, in a named field, a guarantee for that letter. The guarantee has to hold where the flow lands: a signature counts against tampering only when the receiving part verifies it, and a record counts against repudiation only when neither sender can rewrite it. The closed cell records the contract and the field. A relationship that carries no contract never closes a cell, and denial of service never closes on a field, because availability is decided by each part's failure behavior. The closure rules sit in one file beside the design, and the generator refuses any rule whose contract no longer states its field word for word, so a closure cannot outlive the text it rests on. Each rule is still a claim that trusts the contract text, and the judging step spot-checks it.

**Review marks keep a proposed closure apart from a closed one.** A closure rule carries a review mark, the reviewer's role and the date, once a person independent of the rule's author has reviewed it, and a cell closes only when every rule it rests on carries one. A cell whose rules match its contracts but are not all marked reads proposed. Proposed cells are counted on their own and stay in the judging queue until someone marks the rule or removes it. A mark missing its role or its date is refused, so a typo cannot pass as a review. The shipped rules are reviewed in two ways before they are marked. An independent reviewer, given only the edition, tries to break each rule against the design, one crossing at a time. A rule breaks on a crossing where the contract does not give the letter's guarantee, where the check runs somewhere other than the receiving part, or where the flow carries more than its contract lists. It also breaks when its field matches by accident or addresses a different letter. Rules the reviewer breaks are narrowed or removed, and a rule the reviewer cannot settle loses its mark. The spoofing and elevation rules, where a wrong closure hides the most, are also read one by one by the design owner, and a rule the owner is unsure of stays unmarked. An organization's own closure rules are held to the same mark, so its closed count rises only as it reviews them.

**Rules that did not survive an independent attack ship unmarked.** Later rules were attacked by a reviewer independent of their author, and some broke or stayed unsettled. Such a rule keeps its text, closes no cell and is listed as a known issue, and its cells read proposed. The disclosure rules for derived checks and for road assurance status and the tampering rule for release attestations are in that state today. The tampering rule needs three points settled before it can be marked: how a rebuilt cell is seeded, how a restored store is detected, and whether a rolled-away release is refused on every cell or on one. The disclosure rule for class projections broke on a first attack and was marked once a later one held.

**One shipped rule waits on each organization.** The rule that raw model output never carries authority ships without a mark. The response gate is the part in the control zone that checks every model response against the proposal schema before any producer sees it. What a response means is settled in the design: the gate passes on proposals only, never authority. Whether a crafted response can attack the gate itself depends on where and how each organization runs it. An adopting organization signs this rule off once it has limited what the gate can reach with the credentials it runs under, in its own environment, and has a failure scenario that sends the gate a hostile response. It records the sign-off in its own closure file: the rule's contract and letter, its own review mark, and the hashes of the rule's field and its why as they read when it signed. The generator then counts the rule as reviewed for that organization and closes its cells. When a later edition rewords the rule, the hashes stop matching and the sign-off lapses: the cells read proposed again and the generator warns, so the organization reviews the new wording before the cells count as closed. Any shipped rule can be signed off the same way, and a restatement of a shipped rule in the organization's file stays refused, because the generator allows one rule per contract and letter.

**Unsafe control actions.** Every relationship of kind control or authorization is a control action issued by its sending end. Each gets four cells, one per way a control action causes a loss in STPA: not provided when needed, provided when unsafe, at the wrong time or in the wrong order, and stopped too soon or applied too long. No cell closes automatically; each one is a question for a person. Each action is traced to invariants through the failure scenarios: those that name both its ends trace the action itself, those that name only the part it controls trace it more weakly, and an action no scenario reaches is untraced, which is itself a lead for step 1. The generator also lists every controller that receives no feedback or observation relationship, because inadequate feedback to a controller is the cause STPA looks for first.

Two parts of step 2 are left out of the generator for now. Privacy threats (LINDDUN) on flows that carry person-level data need a personal-data marking on contract fields that the design does not yet have. The library joins to OWASP's agentic list, MAESTRO and ATLAS already run as the standards crosswalk in [Annex A5](A5-standards-crosswalk.md#a5).

An independent read covered the administrative request and approval audit closure rules as written, so their two R cells close, bringing the current design to 11 rules, 7 reviewed and 9 used, with 12 closed cells and 6 proposed cells.

The grids on the current design:

| Grid | Scope | Candidate cells | Auto-closed | Proposed closures | Open leads |
|---|---|---|---|---|---|
| STRIDE per interaction | 283 of 524 relationships cross a trust-zone boundary | 1698 | 12 | 6 | 1680 |
| Unsafe control actions | 146 control actions from 50 controllers | 584 | 0 | 0 | 584 |

| STRIDE letter | Cells | Auto-closed | Proposed | Open |
|---|---|---|---|---|
| S (spoofing) | 283 | 0 | 0 | 283 |
| T (tampering) | 283 | 0 | 2 | 281 |
| R (repudiation) | 283 | 2 | 0 | 281 |
| I (information disclosure) | 283 | 6 | 2 | 275 |
| D (denial of service) | 283 | 0 | 0 | 283 |
| E (elevation of privilege) | 283 | 4 | 2 | 277 |

11 closure rules, 7 of them reviewed, 9 of them covering at least one cell:

| Contract | Letter | Field that closes it | Reviewed | Cells closed | Cells proposed |
|---|---|---|---|---|---|
| RestoreGrant | T | verified there offline against cached key references and consumed once | yes | 0 | 0 |
| ReleaseAttestation | T | An artifact with no attestation, a signature that does not verify against a current key reference whose purpose is release, provenance below Build Level 3, or a digest that differs from the attested one is never started or served. The local enforcement point checks this before anything starts in a cell, and the route registry before it pins a weights digest; the model gateway then serves only weights whose loaded digest matches that pin. Each release attestation carries a monotonically increasing release sequence number covered by the release signature. Release signatures and rollback authorizations verify only against a current key reference whose purpose is release. For release admission a cell is a stable logical execution destination, independent of its disposable image or enforcement process. The local enforcement point keeps that cell's highest verified release sequence, last consumed rollback number and sticky refusal ranges in durable storage outside the disposable cell; all survive restart, rebuild and restore. A new or rebuilt cell takes its first mark and rollback state from the release pipeline through authenticated provisioning, never from the first arriving release or an empty local store; unavailable or stale initialization refuses all starts. A rollback authorization is part of the release attestation and is signed by key management for the pipeline with purpose release; it names the cell, its highest verified sequence, the running sequence being rolled away from, the older target sequence and digest, a per-cell rollback number and the highest release sequence issued before this rollback. The enforcement point requires the target to be older than the running release and the rollback number to exceed the last consumed number, and atomically persists its consumption and the new refusal range before starting the target. A rollback never lowers the high-water mark and permanently refuses every previously issued release from its rolled-away-from sequence through its signed issued-through sequence, even with another rollback authorization. These refusal ranges accumulate; reusing that code at or above a rolled-away-from sequence requires the pipeline to issue a fresh release with a new sequence beyond the applicable refusal ranges and the high-water mark. Outside these ranges an older release still requires a matching unused rollback authorization; a missing, invalid, reused or non-increasing authorization is refused before any start. | no | 0 | 2 |
| AdminSession | R | records each session to protected audit, with its requester, its second approver and any break-glass approval, before the session opens | yes | 0 | 0 |
| KeyReference | I | Private key material never leaves key management | yes | 4 | 0 |
| TypedDecision | E | it may rank, route or flag, never authorize | yes | 4 | 0 |
| ModelResponse | E | Never authority | no | 0 | 2 |
| AdminSessionRequest | R | Before acting on this input, the broker durably appends its request reference, authenticated sender identity, received time, target and scope, payload hash and acceptance or refusal with its reason to protected audit under custody neither the requester nor the approver can alter. A refusal is recorded even when no session is issued. If the append fails, the broker refuses the input and opens no session. | yes | 1 | 0 |
| AdminSessionApproval | R | Before acting on this input, the broker durably appends its request reference, authenticated sender identity, received time, target and scope, payload hash and acceptance or refusal with its reason to protected audit under custody neither the requester nor the approver can alter. A refusal is recorded even when no session is issued. If the append fails, the broker refuses the input and opens no session. | yes | 1 | 0 |
| shared:DerivedCheck | I | Its pattern is the body the check suite compiles into configuration coding agents can read, so it holds a general pattern for the weakness class the kept test holds, never the kept test's input, its fixtures or the boundary behavior it expects. | no | 0 | 1 |
| shared:ProvenClass | I | Its definition names no service, component, path or file of the organization's own. While any member finding is open, the projection shows the class's existence, definition and fix rule, with no member count, services or components spanned, or highest consequence tier. A third-party class names the component without its versions until a fix exists. Per-class member counts are never carried in this projection, including after every member closes; they go only to the policy-owning team: people, never an agent, never to an agent-reachable part or the model route. Spans and highest consequence tier are sent only once every member's finding is closed; a class that gains an open member again sends its next version without them, and the loop keeps only the current version of each class. The model provider is a reader through the coding agent's model route, so the same limits apply to what reaches it. | yes | 2 | 0 |
| shared:RoadAssuranceStatus | I | For each entry version its status is current or not current, with no class outcomes and no reason for a status change, including a failed vetting or a withdrawal after a leak. Its vetted scope and known limits use API and configuration identifiers and named pattern classes, never an input shape or sequence. They never hold a test's input, fixture content, expected outcome or a bypass description. | no | 0 | 1 |

Of the 146 control actions, 71 trace to an invariant through a failure scenario that names both the controller and the part it controls, 69 only through a scenario that names the controlled part, and 6 through none. 28 of the 50 controllers receive no feedback or observation relationship, 0 of the 13 people among them.

The full register, every cell with its relationship, zones, carried contracts, closing field or trace, is written as data on every build. An organization builds the same generator from the adopters' skill and runs it on its own compiled design after each accepted patch, with its own closure rules added for its own contracts.

<a id="a6-judging-seeds-known-answers-so-drift"></a>
## Judging seeds known answers so drift shows

The open cells above make a long review queue, and a review queue drifts toward approving. That is the approver's drift risk reappearing inside the threat model, so step 3 gets the approval gate's protection. Known-real cells (drawn from failure scenarios and past findings) and known-false cells (closed by a field the reviewer can verify, or naming a flow the deployment cannot carry) are seeded into each review. A reviewer whose accept and reject rates do not move with the seeds is not reading the cells, and the seeded-cell detection rate is the step's health measure.

<a id="a6-each-accepted-threat-is-encoded-where"></a>
## Each accepted threat is encoded where it fails on its own

| If the accepted threat is | Encode it as | Owner |
|---|---|---|
| Structural and decidable on the design ("this part can reach that one carrying this content") | A model check with a failing fixture | Model owner, with the fixture reviewed independently |
| A runtime behavior under a failure or an attack | A failure scenario with its invariant, detection, runbook and a pipeline or game-day test | The owning part's on-call role |
| A property of the software under validation | An invariant imported from the product's own threat model (U-119) and, once a finding is reproduced, a kept test | Scenario owner |
| Specific to one organization (who signs, thresholds, rates) | A profile field, a should-never code or a dial floor | The organization's security risk owner |
| A class of weakness created while writing code, or a control in secure creation | A Jig rule: a derived check, a policy rule compiled to each harness, or a premise with its fallback | The secure-creation policy owner |
| Not encodable | A named open risk in the plan's risk table, with a measure that shows it early | Decision owner |

<a id="a6-the-register-is-graded-against-the"></a>
## The register is graded against the record

Every quarter, beside the program status report, Ratchet's evaluation group takes each reproduced finding, confirmed escape, incident and held-out finding and asks whether its class was in the register. Threat-model recall is the share of those confirmed failures the register predicted; precision is the share of accepted threats later exercised; yield is reported by source (generated cells, use cases, the oversight pass, attack trees, the program pass), beside U-125's count of contradicted review claims. The method keeps its proposed status until the first recall grade with seeded cells is in.

Four results would show the method wrong for an organization. Held-out assessors keep finding threats on parts the design describes wrongly, so the grids grade a model that does not match what is deployed. Confirmed failures come mostly from use cases, the oversight pass and attack trees, so generated cells add little beyond the model checks and step 2 should shrink to them. Reviewers' accept rates do not move with seeded cells. Or the three independent parties are not available.
