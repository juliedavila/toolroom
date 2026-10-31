<a id="a5"></a>
# Annex A5: Where Ratchet meets the frameworks auditors read

*Ratchet: closed-loop security validation for AI-assisted engineering. Annex. Edition 5.1.3, Thesis 1.4.3, 2026-10-31, build 694de224+local.*

*Generated from one source and checked on every build: each external id must appear in a list pinned from that framework's own published document, and each Ratchet id must exist in the design. The match grades and notes are the authors' judgments.*

A risk function independent of the teams that build and run the system (the second line) and internal audit read the record Ratchet keeps, and before they rely on it they map it to the organization's control framework. Done by hand for each organization, that mapping drifts from the design as editions change. This annex does it once, from the design itself, for the frameworks a security, platform or audit team is most likely to hold Ratchet against: NIST's Secure Software Development Framework (SSDF) and its generative AI profile, the NIST AI Risk Management Framework and its generative AI profile, OWASP SAMM, BSIMM, SSVC, MITRE ATLAS, OWASP's Top 10 lists for LLM and agentic applications, and the Cloud Security Alliance's MAESTRO threat model.

<a id="a5-a-full-match-covers-the-work"></a>
## A full match covers the work inside the loop, and conformance stays the organization's to show

Each row names a framework item, what it asks, and the work units (R4), parts and contracts (R2), rules (R1) and failure scenarios (R3) that carry it out. **Full** means the cited design does what the item asks for the work that passes through Ratchet's loop. **Partial** means it covers part of the item, and the note says what is missing. Most framework items also ask for things outside the loop, such as an organization's secure coding standards, its development environments or its incident response for products, so a column of full matches is never a claim that the organization conforms to the framework. An item with no counterpart in Ratchet has no row, and each table's coverage line says how many of the framework's pinned ids are mapped.

Where an organization holds Ratchet against another framework, or its own control catalog, it adds rows in the same shape, and the same test applies: every id a row cites must exist in its fitted design.

<a id="a5-maestro-and-the-owasp-agentic-top"></a>
## MAESTRO and the OWASP agentic Top 10 map onto Ratchet's own parts and failure scenarios

Ratchet's agents are themselves an attack surface, so the threat models written for agentic systems apply to Ratchet as they apply to any product. Every risk on OWASP's agentic list and every MAESTRO layer has a row below that names the parts and rules that contain it and the failure scenarios that test that containment. Most are full matches, because the design keeps authority, secrets and outsider text away from every agent. Four are partial, and their notes name the gap: targets under test that may run with weaker isolation than the runner, hand-offs between producers with no forged-message scenario, agent frameworks and approved producers with no compromise scenario of their own. A red team testing Ratchet itself can start from those four.

<a id="a5-the-tables"></a>
## The tables

### NIST SSDF, SP 800-218 version 1.1

*Source: [NIST SP 800-218, Secure Software Development Framework (SSDF) Version 1.1 (February 2022)](https://doi.org/10.6028/NIST.SP.800-218). Mapped by task: 19 of the 42 ids pinned from it, 15 full and 4 partial. Tasks moved in version 1.1 (PW.3.1, PW.3.2, PW.4.3, PW.4.5, PW.5.2) are out of the pinned list.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| PO.3.3 | Tools generate artifacts, such as an audit trail, that show secure development happened | `s3.protected-audit`, `s6.change-closure-records`, `s7.flow-cost-telemetry`, U-11 | full | Every run leaves a receipt and an audit record; handoffs and time in each step are measured per closed loop. |
| PO.4.1 | Define criteria for software security checks and track them through the life cycle | `s5.fixture-oracle-registry`, `s7.dial-register`, `proof-condition`, U-148 | full | Each test's proof condition is signed before the agent runs; thresholds live in a signed dial register. |
| PO.4.2 | Gather and safeguard the information the security check criteria need | `s5.evidence-intake-validator`, `s5.protected-evidence-store`, `intake-only` | full | |
| PO.5.1 | Separate and protect each environment involved in software development | `s3.bounded-runner`, `s3.staging-cell`, `s3.source-build-cell`, `evidence-partitioning` | partial | Covers only the environments Ratchet's own tests run in; the organization's development environments stay with its platform teams. |
| PS.3.2 | Collect, safeguard and share provenance data for every component of each release | `s6.release-state-correlator`, U-198, U-114 | partial | Ratchet reads provenance and SBOMs to bind closures and span component classes; producing them stays with the organization's build pipeline. |
| PW.1.1 | Use threat modeling or attack surface mapping to assess the software's security risk | `ext.security-review-practice`, U-119, U-166 | full | Existing threat models become invariants a demonstrated path is checked against; one STPA-Sec pass covers Ratchet's own control structure. |
| PW.1.2 | Track security requirements, risks and design decisions, with rationales for approved exceptions | `s5.finding-ledger`, `loosening-controls`, `people.risk-acceptance-owner` | full | Every exception to a should-never rule is a recorded, expiring decision by named risk owners. |
| PW.4.4 | Verify that acquired third-party components meet the organization's requirements over their life | `s4.qualification-route-registry`, U-103, U-114 | partial | Covers the models and tools Ratchet acquires, requalified on any change, and component weaknesses it reproduces; the organization's own component intake is outside the loop. |
| PW.7.2 | Perform code review or analysis and triage every issue in the team's tracker | `s1.tool-signal-intake`, `s6.developer-queue-filter`, `leads.as-coverage`, U-117, U-118 | partial | Ratchet takes existing analysis output as labeled leads and passes developers only leads above the bar; it runs no code review of its own. |
| PW.8.2 | Scope, design, run and document tests, including regression tests for past vulnerabilities | `s2.approved-producers`, `s6.retest-regression-planner`, `s6.regression-catalog`, U-203 | full | Each fix is held by a kept test that fails when the fix is reverted, re-proved on a schedule. |
| RV.1.1 | Gather vulnerability reports from users and public sources and investigate credible ones | `s1.tool-signal-intake`, `s2.quarantined-lead-reader`, `ext.threat-intelligence`, U-139 | full | Reports arrive as leads read only by a tool-less model; a scenario owner turns a credible one into a test. |
| RV.1.2 | Review, analyze or test code to find or confirm previously undetected vulnerabilities | `s2.approved-producers`, `s5.independent-verifier`, U-75 | full | Agents propose tests under exact-action approval, and nothing counts until an independent verifier reproduces it. |
| RV.1.3 | Have a vulnerability disclosure policy and the roles and processes to carry it out | `people.security-risk-owner`, `s6.change-closure-records`, `DisclosureRecord`, U-334, U-335 | full | The profile names the role for outbound reports and its policy; external disclosure deadlines pass the fix cap, and each report's dates and outcome are recorded. |
| RV.2.1 | Analyze each vulnerability for enough risk information to plan its response | `s5.path-impact-graph`, `s1.consequence-register`, `s5.disposition-review` | full | Risk is the consequence tier of the assets a demonstrated path reaches. |
| RV.2.2 | Plan and carry out risk responses, including temporary mitigation before a permanent fix | `s6.fix-cap-gate`, `s6.owner-change-connector`, `s6.change-closure-records`, `MitigationRecord`, `loosening-controls`, U-241, U-243, U-333 | full | An interim mitigation is recorded with what holds the path, who applied it and its expiry, and a replay judged with no model shows the path broken. |
| RV.3.1 | Analyze identified vulnerabilities to determine their root causes | `s5.finding-ledger`, `s5.disposition-review` | full | |
| RV.3.2 | Analyze root causes over time to find patterns | `s5.failure-class-registry`, `FailureClass`, U-105, U-107 | full | Disposition review groups reproduced findings into failure classes across services and shared components. |
| RV.3.3 | Review the software for similar vulnerabilities to eradicate a whole class | `s6.paved-road-catalog`, `s6.road-conformance-check`, U-82, U-114 | full | A class is retired only at call sites a deterministic check proves are on the paved road. |
| RV.3.4 | Update the development process so the root cause does not recur | the `paved-road` module, the `secure-creation` module, U-204 | full | Proven classes become paved-road entries and derived checks at the developer's edit. |

### NIST SP 800-218A, the SSDF profile for generative AI

*Source: [NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models (July 2024)](https://doi.org/10.6028/NIST.SP.800-218A). Mapped by task: 1 of the 48 ids pinned from it, 0 full and 1 partial. Rows cover only what 800-218A adds to version 1.1. Ratchet trains no model, so the training-data and weight tasks have no counterpart.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| PO.5.3 | Monitor execution behavior in development environments for suspicious activity | `s3.protected-audit`, `ext.soc-incident-response`, U-33 | partial | Every Ratchet run is checked against detection and visibility gaps are recorded; other development environments are outside the loop. |

### NIST AI RMF 1.0

*Source: [NIST AI 100-1, Artificial Intelligence Risk Management Framework (AI RMF 1.0) (January 2023)](https://doi.org/10.6028/NIST.AI.100-1). Mapped by subcategory: 12 of the 72 ids pinned from it, 11 full and 1 partial.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| GOVERN 1.6 | Mechanisms are in place to inventory AI systems | `s4.qualification-route-registry`, U-86 | full | Every model route, its version and what it is qualified for sit in one registry no one writes directly. |
| GOVERN 2.1 | Accountability structures empower and train people to map, measure and manage AI risk | `people.security-risk-owner`, `people.risk-acceptance-owner`, `independent-acceptance` | full | |
| GOVERN 3.2 | Roles for human-AI configurations and oversight of AI systems are defined | `proposal-not-permission`, `s3.approval-console`, U-220 | full | Agents propose; people approve each exact action outside the design limits the security risk owner sets. |
| GOVERN 4.3 | Practices enable AI testing, identification of incidents and information sharing | `s7.matched-evaluation-executor`, `s7.reliability-monitor`, `PostmortemRecord` | full | Matched evaluation against a no-agent arm, and a blameless postmortem for each of Ratchet's own harmful failures. |
| MAP 3.5 | Processes for human oversight are defined, assessed and documented | `s3.approval-console`, `s7.sampling-service`, U-57 | full | Approval health is measured per action class, with seeded known-bad proposals. |
| MEASURE 1.3 | People who did not build the system, or independent assessors, take part in assessments | `s5.independent-verifier`, `sep.evaluator-conflicted`, `sep.verifier-producer` | full | |
| MEASURE 2.4 | The AI system's functionality and behavior are monitored in production | `s7.reliability-monitor`, U-153, U-182 | full | A scheduled loop canary and six service-level objectives with error budgets. |
| MEASURE 2.7 | AI system security and resilience are evaluated and documented | U-166, U-185, U-176, U-346, `people.held-out-assessors`, F105 | full | Game days and an STPA-Sec pass test designed failure behavior, and a held-out team outside the program attacks the control and evidence planes. |
| MANAGE 2.4 | Mechanisms exist to supersede, disengage or deactivate AI that performs inconsistently | U-147, U-47, `degradation` | full | The agent arm stops early on a pre-registered rule; a harmful result steps a test down; every rung down to manual keeps working. |
| MANAGE 3.1 | AI risks and benefits from third-party resources are managed | `s7.failover-drill`, `s4.route-budget-broker`, U-170 | full | A fallback route outside the primary provider's failure domain, drilled and requalified. |
| MANAGE 4.1 | Post-deployment monitoring covers incident response, recovery and change management | `s7.reliability-monitor`, `s3.policy-release-pipeline`, `PostmortemRecord`, U-182 | full | |
| MANAGE 4.3 | Incidents and errors are communicated to relevant AI actors | `s7.reliability-monitor`, `PostmortemRecord` | partial | Postmortems reach the owning on-call role and the security risk owner; communication outside the organization is not covered. |

### NIST AI 600-1, the generative AI profile

*Source: [NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (July 2024)](https://doi.org/10.6028/NIST.AI.600-1). Mapped by suggested action: 6 of the 211 ids pinned from it, 6 full and 0 partial.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| GV-1.5-002 | Policies for after-action reviews of GAI incident response and disclosures | `s7.reliability-monitor`, `PostmortemRecord` | full | |
| GV-1.6-001 | Enumerate GAI systems into the organization's AI system inventory | `s4.qualification-route-registry` | full | |
| MS-4.2-004 | Monitor and document where people override the GAI system's decisions | `s3.approval-console`, U-57 | full | Edit, approve and reject rates per approver and action class. |
| MG-2.4-004 | Set and review criteria that warrant deactivating a GAI system | U-147, `s7.dial-register` | full | |
| MG-4.2-002 | Conduct post-mortem analyses of incidents to find root causes and prevent recurrence | `s7.reliability-monitor`, `PostmortemRecord` | full | |
| MG-4.3-001 | After-action assessments verify incident response and recovery were followed and effective | `s7.reliability-monitor`, `PostmortemRecord`, U-185 | full | |

### OWASP SAMM 2

*Source: [OWASP SAMM, The Model; ids as the project's model repository names them (practice, maturity level, stream)](https://owaspsamm.org/model/). Mapped by stream or activity: 16 of the 120 ids pinned from it, 9 full and 7 partial. An id with a level (I-DM-2-A) is one activity; an id without one (I-DM-B) is the whole stream.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| D-TA-B | Threat Modeling | `ext.security-review-practice`, U-119 | full | Threat models feed the loop as invariants; Ratchet does not author them. |
| V-AA-A | Architecture Validation | U-166, U-119 | partial | Validates architecture by demonstrated paths and one STPA-Sec pass on itself; it does not review the product's architecture documents. |
| V-RT-3-A | Automate security requirements testing | `s6.regression-catalog`, `s6.retest-regression-planner`, U-203 | full | Ahead of the activity: each kept test is itself re-proved against its fix reverted. |
| V-RT-B | Misuse/Abuse Testing | `s1.criterion-registry`, `s5.fixture-oracle-registry`, `s2.approved-producers` | full | Scenarios test a service against its stated intent, so business-logic abuse is in scope. |
| V-ST-A | Scalable Baseline | the `tool-portfolio` module, `s7.tool-yield-evaluator`, U-121 | full | |
| V-ST-B | Deep Understanding | `s2.approved-producers`, `people.independent-security-staff`, U-75 | full | |
| I-DM-A | Defect Tracking | `s5.finding-ledger`, `s6.owner-change-connector` | full | |
| I-DM-2-A | Rate and track security defects | `s6.fix-cap-gate`, `s7.flow-cost-telemetry`, U-243 | full | Classes are consequence tiers; the profile sets a remediation window per tier, with no shipped default. |
| I-DM-3-A | Enforce an SLA for defect management | `s6.owner-change-connector`, U-243 | partial | A finding past its window is reported to the program decision owner; enforcing the window stays with the organization. |
| I-DM-B | Metrics and Feedback | `s7.flow-cost-telemetry`, U-205 | full | Escape rate, time to remediate, queue age and arrivals against fixes, per weakness class. |
| I-SB-B | Software Dependencies | U-114, `s5.failure-class-registry` | partial | A reproduced component weakness spans every service whose SBOM lists it; dependency selection and inventory stay with the build process. |
| I-SD-A | Deployment Process | `s3.gate-failure-policy`, `s6.enterprise-adapters` | partial | Adds a kept regression gate with a pre-decided outage posture to the deploy path; the deployment process itself is the organization's. |
| I-SD-B | Secret Management | `s3.credential-lease-broker`, U-261, U-262 | partial | Covers Ratchet's own short-lived credentials and exposed secrets closing on proven revocation; secret injection into product deployments is outside the loop. |
| O-IM-A | Incident Detection | U-33, U-95, `ext.soc-incident-response` | partial | Covers detection of Ratchet's own runs and real-compromise signals during them; product incident detection is the SOC's. |
| O-IM-2-B | Define an incident response process | `s7.reliability-monitor`, `PostmortemRecord` | partial | Covers incidents in Ratchet's own operation; product incident response stays with the organization's process. |
| G-SM-B | Measure and Improve | `s7.value-ledger`, `s7.flow-cost-telemetry`, U-147, U-205 | full | |

### BSIMM

*Source: [BSIMM Framework, the twelve practices; the BSIMM16 report holds the activity text](https://www.blackduck.com/resources/analyst-reports/bsimm.html). Mapped by practice: 8 of the 12 ids pinned from it, 4 full and 4 partial. Mapped at practice level only. The activity descriptions sit behind registration and were not read, so no activity id is cited.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| Software Security Strategy & Metrics | Software Security Strategy & Metrics | `s7.value-ledger`, U-205 | partial | Measures the find-fix loop and its value; the wider program strategy is the organization's. |
| Attack Models | Attack Models | `ext.threat-intelligence`, U-132 | full | Attacker-side signals annotate classes and assets, and can raise a posture review but never lower one. |
| Security Features & Design | Security Features & Design | the `paved-road` module, `s6.paved-road-catalog`, `s6.road-conformance-check` | full | |
| Standards & Requirements | Standards & Requirements | `model-boundary`, `proposal-not-permission` | partial | Should-never cards set standards for adopting agents; general secure coding standards stay with the organization. |
| Architecture Analysis | Architecture Analysis | U-119, U-166 | partial | Checks demonstrated paths against existing threat models, and its own control structure once; it does not review product architectures. |
| Software Security Testing | Software Security Testing | `s6.regression-catalog`, U-203 | full | |
| Penetration Testing | Penetration Testing | `s2.approved-producers`, `s2.runtime-assessment-producer`, U-75 | partial | Agent-proposed tests under exact-action approval; human penetration tests continue as formal exercises and lead sources. |
| Configuration and Vulnerability Management | Configuration and Vulnerability Management | `s5.failure-class-registry`, U-114, `s7.assurance-incident-integration` | full | |

### SSVC, the decision points CISA uses

*Source: [CISA, Stakeholder-Specific Vulnerability Categorization (SSVC); decision point keys as CERT/CC's SSVC repository publishes them](https://www.cisa.gov/resources-tools/resources/stakeholder-specific-vulnerability-categorization-ssvc). Mapped by decision point: 10 of the 11 ids pinned from it, 4 full and 6 partial. Ids come from two CISA trees, the coordinator tree on CISA's SSVC page and the tree behind [BOD 26-04](https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk), as published in [CERT/CC's SSVC repository, release 2026.7.0](https://github.com/CERTCC/SSVC/releases/tag/2026.7.0).*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| E | Exploitation | `ext.known-exploited-catalog`, `ext.threat-intelligence`, `s6.fix-cap-gate`, `ExploitationSignal`, U-132, U-330, U-336 | partial | A public proof of concept is not an ordering input; a known exploited catalog match or observed exploitation passes the owning team's fix cap and starts the exploited window. |
| TI | Technical Impact | `s5.path-impact-graph`, `s5.independent-verifier`, `s1.consequence-register` | partial | Ratchet records no partial-or-total control value; what a demonstrated path reaches, with that asset's attested tier, does the work. The reach must be reproduced, where SSVC accepts a per-CVE judgment. |
| A | Automatable | `PriorityInputs`, `s5.disposition-review`, `s6.fix-cap-gate`, U-331 | full | Set from the reproduction: yes when every step ran with no person; unknown orders as yes, as SSVC advises. Covers kill chain steps 2 to 4 on one target. |
| MP | Mission Prevalence | `s1.consequence-register` | partial | The count of mission-essential use across entities has no counterpart; a single organization's consequence tier stands in for prevalence. |
| PWI | Public Well-Being Impact | `s1.consequence-register` | partial | No separate well-being input; harm beyond the business counts only where the organization records it in its consequence tiers. |
| MI | Mission Impact | `s1.consequence-register`, `people.line-of-business-owner` | full | The consequence tier, drafted by the testing team and confirmed by the asset's owner. |
| KEV | In KEV | `ext.known-exploited-catalog`, `ExploitationSignal`, `s6.fix-cap-gate`, U-330, U-336 | full | A match in the catalog copy passes the owning team's fix cap and starts the exploited window; a listing never creates a finding. |
| PE | Publicly Exposed | `PriorityInputs`, `s5.disposition-review`, `s6.fix-cap-gate`, U-331 | full | The entry point's exposure, read from scope and source facts with no model; unknown orders as exposed. |
| EXP | System Exposure | `PriorityInputs`, `s5.disposition-review`, `s6.fix-cap-gate`, U-331 | partial | No controlled middle value: exposure is internet, internal or unknown, and unknown orders as internet. |
| BOD2604 | CISA BOD 26-04 Remediation Timelines | `s6.fix-cap-gate`, `PriorityInputs`, U-330, U-331, U-352 | partial | No shipped remediation timelines; known exploited status, exposure and automatability pass or order work, and the organization sets its own exploited and per-tier windows. |

### MITRE ATLAS, release 2026.09

*Source: [MITRE ATLAS, Adversarial Threat Landscape for AI Systems, data release 2026.09 (15 September 2026)](https://atlas.mitre.org/). Mapped by mitigation or technique: 15 of the 248 ids pinned from it, 15 full and 0 partial.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| AML.M0024 | AI Telemetry Logging | `s4.route-usage-receipts`, `s3.protected-audit` | full | |
| AML.M0026 | Privileged AI Agent Permissions Configuration | `s3.credential-lease-broker`, `s3.privileged-access-broker`, `admin.execution-by-producer` | full | No agent holds a privileged credential; every effect runs on a short-lived lease outside the agent. |
| AML.M0028 | AI Agent Tools Permissions Configuration | U-220, `limit.grant-beyond-design` | full | |
| AML.M0029 | Human In-the-Loop for AI Agent Actions | `s3.approval-console`, `sep.producer-approver`, U-07 | full | |
| AML.M0030 | Restrict AI Agent Tool Invocation on Untrusted Data | `model.trifecta`, `model.quarantine`, `s2.quarantined-lead-reader` | full | |
| AML.M0031 | Memory Hardening | `s5.learning-store`, U-272 | full | Only disposition review writes the store, and provenance is checked again at each retrieval. |
| AML.M0032 | Segmentation of AI Agent Components | `model.boundary`, `s4.request-data-gate`, `s4.response-proposal-gate` | full | |
| AML.M0033 | Input and Output Validation for AI Agent Components | `s4.request-data-gate`, `s4.response-proposal-gate` | full | |
| AML.M0035 | AI Red Team | U-166, U-185, U-346, `people.held-out-assessors`, F105 | full | Covers designed failure behavior, and a held-out team outside the program attacks Ratchet's own control and evidence planes under approved scope. |
| AML.M0036 | Limit AI Workload Resource Consumption | `s4.route-budget-broker`, U-92 | full | |
| AML.M0037 | AI Agent Authority Expansion Controls | U-224, F84 | full | Narrowing a limit voids every wider permission, grant and dial at once. |
| AML.M0038 | AI Agent Scope Drift Detection | U-47, U-93 | full | |
| AML.T0051 | LLM Prompt Injection | `model.trifecta`, `s2.quarantined-lead-reader`, F39, F45 | full | |
| AML.T0080 | AI Agent Context Poisoning | `s5.learning-store`, `s1.context-compiler`, F10 | full | |
| AML.T0086 | Exfiltration via AI Agent Tool Invocation | `model.trifecta`, `s4.request-data-gate`, F39 | full | |

### OWASP Top 10 for LLM Applications 2025

*Source: [OWASP Gen AI Security Project, Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/). Mapped by risk: 10 of the 10 ids pinned from it, 8 full and 2 partial.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| LLM01 | Prompt Injection | `model.trifecta`, `model.quarantine`, `s2.quarantined-lead-reader`, F39, F45 | full | Contained by structure: no agent holds authority, and outsider text reaches only a tool-less model. |
| LLM02 | Sensitive Information Disclosure | `s4.request-data-gate`, F21 | full | Eligibility by source and data class decides what a request may carry; content detection is a second layer. |
| LLM03 | Supply Chain | `s4.qualification-route-registry`, U-103, F49 | full | |
| LLM04 | Data and Model Poisoning | `s5.learning-store`, U-272 | partial | Ratchet trains no model; it covers poisoning of what it stores and retrieves. |
| LLM05 | Improper Output Handling | `s4.response-proposal-gate`, `model.advisory`, F68 | full | |
| LLM06 | Excessive Agency | `proposal-not-permission`, `limit.grant-beyond-design`, F76 | full | |
| LLM07 | System Prompt Leakage | `proof-condition`, `s3.credential-lease-broker`, F11 | full | Nothing secret sits in a prompt: proof conditions stay with their owner and credentials with the lease broker. |
| LLM08 | Vector and Embedding Weaknesses | `s5.learning-store`, U-272 | partial | Retrieval checks provenance and outsider labels; no scenario targets embedding-level attacks. |
| LLM09 | Misinformation | `independent-acceptance`, `s5.independent-verifier`, F33 | full | |
| LLM10 | Unbounded Consumption | `s4.route-budget-broker`, U-92, F63 | full | |

### OWASP Top 10 for Agentic Applications for 2026

*Source: [OWASP Gen AI Security Project, OWASP Top 10 for Agentic Applications for 2026 (December 2025)](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/). Mapped by risk: 10 of the 10 ids pinned from it, 8 full and 2 partial. Risk names as the project's own repository records them; the published document is an image with no extractable text.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| ASI01 | Agent Goal Hijack | `model.trifecta`, `model.quarantine`, `proposal-not-permission`, F39, F45 | full | |
| ASI02 | Tool Misuse & Exploitation | `s3.action-broker`, `s3.policy-decision-point`, `limit.grant-beyond-design`, F76 | full | |
| ASI03 | Identity & Privilege Abuse | `admin.execution-by-producer`, `s3.credential-lease-broker`, `s3.privileged-access-broker`, U-30, F55 | full | |
| ASI04 | Agentic Supply Chain Vulnerabilities | `s4.qualification-route-registry`, U-103, F49 | full | Any model, tool, memory or policy change forces requalification before promotion. |
| ASI05 | Unexpected Code Execution (RCE) | `s3.bounded-runner`, `s3.staging-cell`, F63 | partial | The agent has no path to a cell; targets under test may run at namespace-level isolation, weaker than the runner's. |
| ASI06 | Memory & Context Poisoning | `s5.learning-store`, `s1.context-compiler`, U-272, F10 | full | |
| ASI07 | Insecure Inter-Agent Communication | `s2.workflow-engine`, `s2.artifact-exchange`, `model.boundary`, F04 | partial | Every hand-off between planes carries a typed contract; no failure scenario tests a forged or replayed message between producers. |
| ASI08 | Cascading Failures | `degradation`, `s3.gate-failure-policy`, F48, F61, F62 | full | |
| ASI09 | Human-Agent Trust Exploitation | `s3.approval-console`, `s7.sampling-service`, U-57, F42, F46, F47 | full | |
| ASI10 | Rogue Agents | `proposal-not-permission`, U-47, F76, F84 | full | An agent never holds authority, and its honesty record is checked by a model-free replay. |

### CSA MAESTRO

*Source: [Cloud Security Alliance, Agentic AI Threat Modeling Framework: MAESTRO (February 2025)](https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro). Mapped by layer: 7 of the 7 ids pinned from it, 5 full and 2 partial.*

| Id | What it asks | Where Ratchet covers it | Match | Note |
|---|---|---|---|---|
| L1 | Foundation Models | `s4.qualification-route-registry`, U-103, F48, F69 | full | |
| L2 | Data Operations | `s5.learning-store`, `s1.context-compiler`, `s4.request-data-gate`, F45 | full | |
| L3 | Agent Frameworks | `s2.producer-adapters`, `s2.approved-producers`, U-103 | partial | Agent frameworks sit behind swappable adapters and are requalified on change; no scenario targets a compromised framework. |
| L4 | Deployment and Infrastructure | `s3.bounded-runner`, `s3.staging-cell`, `infra.idp-not-fail-closed`, F63, F64 | full | |
| L5 | Evaluation and Observability | `s7.reliability-monitor`, `s3.protected-audit`, F02, F65 | full | |
| L6 | Security and Compliance | `s3.policy-decision-point`, `s3.policy-release-pipeline`, F56 | full | |
| L7 | Agent Ecosystem | `s2.approved-producers`, `s2.quarantined-lead-reader` | partial | Only approved producers run, and outside agents reach the loop only as text; no scenario covers a compromised approved producer. |
