<a id="a1"></a>
# Annex A1: Background and research

*Ratchet: closed-loop security validation for AI-assisted engineering. Annex. Edition 5.1.2, Thesis 1.4.2, 2026-10-30, build 13fabeae+local.*

*Where the design came from, what the literature supports, and the full evidence ledger. Context for the thesis; nothing in the main parts depends on reading it.*

<a id="a1-the-starting-point-was-a-long"></a>
## The starting point was a long-form research synthesis

The design began as a research question: how should an organization structure red teaming once AI agents can draft security tests at volume? An AI research assistant produced a long-form synthesis over several days in October 2026, with chapters on operating models, a reference architecture, a backlog of epics, a roadmap, patterns, field lessons from teams already running agentic testing, and regulatory constraints, plus 22 architecture diagrams. That synthesis is not public. Everything in this edition was rebuilt from it into one checked design model, and every claim below cites the public paper behind it where one exists.

<a id="a1-the-literature-was-reviewed-topic-by"></a>
## The literature was reviewed topic by topic

Thirteen targeted literature reviews tested the questions the design turns on:

- reachability and exploitability as predictors of real exploitation
- system-theoretic safety analysis (STPA and STPA-Sec) applied to security and to security programs
- success, false-positive and completion rates of autonomous and LLM-driven penetration testing, in benchmarks and in real environments
- confused-deputy and authorization failures in agents and tool protocols
- prompt-injection defenses under adaptive attack
- resilience engineering applied to AI and agentic systems
- remediation capacity as the binding constraint
- secure-by-default abstractions and whether they retire weakness classes
- decay of human oversight, and catch trials as a measure of it
- security gates in continuous delivery and their effect on delivery performance
- scanner precision, and scanner output used as context for agents

<a id="a1-what-the-evidence-review-concluded"></a>
## What the evidence review concluded

The design is a good bet if it is run as a sequence of cheap, falsifiable phases. The review re-verified 298 cited numbers against their sources (none wrong, four reworded) and forced five design changes, all applied: quarantining attacker-writable lead text with a model check for the lethal combination; a core loop with pluggable modules that switch on only with entry evidence; a dial register with floors and reviewer limits; an investment order with enforced paved-road entries and verification hours counted as cost; and a degradation ladder for model providers with a model-free control plane.

**What holds.**
- The controls are well founded. Authorization enforced outside the model prevents unauthorized effects even when the agent is manipulated (CL-05, strong), and model-level defenses cannot be the primary control (CL-06, strong). These two carry the design's whole safety argument.
- Independence and verification are justified. Agent findings are noisy (CL-02), negative model judgments must never count as coverage (CL-07), people and teams need separating as well as agents (CL-28), and closure has to be retested in the deployed state with varied paths (CL-11, CL-31).
- Human gates erode and need measuring (CL-09). The newest evidence strengthens this: approval of AI-agent pull requests rose with reviewer experience while scrutiny fell.
- Priority by consequence and demonstrated paths beats exploitability scores (CL-14).
- Source access matters more than orchestration for early test-drafting agents (CL-03; one controlled study, 20 targets).

**What is an honest bet, and how it gets settled.**

| Bet | How it is settled cheaply |
|---|---|
| *Untested (CL-01, CL-26).* Agents find real defects at a rate worth paying for (CL-01) and cost less per accepted closure (CL-26) | The no-agent comparison runs beside the agent from phase 1; phase 3 compares both against today's process with verification hours counted. A clearly losing agent arm can stop the work early. |
| Fix capacity is the binding constraint, ahead of finding capacity (CL-18) | Remediation already looks saturated in large open-source projects (20 to 30% of findings in monitored systems never fixed), and vendor data points the same way: across nearly 300 organizations a typical one remediates about one in ten open vulnerabilities a month whatever its size, and 71% of organizations carry flaws left unfixed past a year. Neither measures this loop. Phase 1's flow record measures it directly; while it holds, investment goes to the paved road before more test-drafting agents. |
| *Untested (CL-13).* A regression gate will not slow delivery (CL-13) | Advisory first, a per-service time budget, dependency-scoped replay, and the five delivery metrics as a guardrail from phase 2. The literature never isolated a gate's own effect, so the work measures it. |
| *Untested (CL-15, CL-16, CL-29).* Owners attest tiers at low effort (CL-15); dependency-scoped holds keep outages small (CL-16); tests earn continuous cadence safely (CL-29) | Each has a work unit that measures it: owner minutes per attestation, deploys held per outage hour, harmful-run rate per cadence step. |
| *Untested (CL-49).* Security debt is the security share of quality debt, all paid from one engineering pool, so findings past fix capacity add interest without reducing risk (CL-49) | Developers lose 23% of their working time to technical debt in one longitudinal study and estimate 36% in a survey; no study isolates security debt. From phase 3 each owning team reports its time lost to security debt beside the counts, read against its findings above the cap. |
| *Untested (CL-23, CL-25).* Paved-road tailoring has no blind spot (CL-23); per-rule yield justifies tool decisions (CL-25) | Per-call-site conformance plus a sampled test of covered code; yield measured per rule on the organization's own code. |

**What changed or was dropped.** A multi-agent topology result was dropped as an argument for separating human teams (CL-04): the study's intervals overlap and the analogy was an extrapolation; separation holds on its own evidence (CL-28). Four claims were reworded to what the evidence supports: enforced paved-road abstractions sharply reduce the classes they target, with residual risk at the boundary with off-road code (CL-22); seeding approvers with known-bad proposals measures gate health (CL-10); coverage that follows cooperation misses where losses concentrate, and reconciling against incident and loss history corrects it (CL-19); and enough closures to read a comparison accrue in about two quarters (CL-27).

**Residual risks.** The value case is unproven anywhere in an enterprise, and only phase 3 can answer it. Human gates will drift; the design measures and rotates, which limits the damage without removing it. Prompt injection stays unsolved; the design contains it structurally, and a model check fails any change that reopens the combination of untrusted text, private data and a way out. The design is large; phase 1 runs on existing tools, and anything that cannot show its value by phase 2 waits. One source reports two different approval-drift figures, so only the direction is quoted.

<a id="a1-public-sources-behind-the-load-bearing"></a>
## Public sources behind the load-bearing claims

- Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (2025)
- Debenedetti et al., [Defeating Prompt Injections by Design (CaMeL)](https://arxiv.org/abs/2503.18813) (2025)
- Allodi and Massacci, Comparing Vulnerability Severity and Exploits Using Case-Control Studies, ACM TISSEC (2014), DOI 10.1145/2630069
- CISA, [BOD 26-04: Prioritizing Security Updates Based on Risk](https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk) (2026): sets federal remediation timelines from asset exposure, known exploited status, exploit automation and technical impact
- Bandara et al., [Fix that Fix Commit: A real-world remediation analysis of JavaScript projects](https://conferences.computer.org/icsme/pdfs/SCAM2020-CdP3rS7mSlqVWzF3cXW7H/924800a187/924800a187.pdf), IEEE SCAM (2020)
- Li and Paxson, [A Large-Scale Empirical Study of Security Patches](https://www.icir.org/vern/papers/patch-study.ccs17.pdf), ACM CCS (2017)
- Norm Hardy, The Confused Deputy, ACM SIGOPS Operating Systems Review (1988), DOI 10.1145/54289.871709
- Yu et al., [Habituation at the Gate: Rising Approval and Declining Scrutiny in Human Review of AI Agent Code](https://arxiv.org/abs/2606.22721) (2026)
- Cyentia Institute, [Prioritization to Prediction, Volume 3: Winning the Remediation Race](https://www.cyentia.com/wp-content/uploads/2026/05/Kenna-Prioritization_to_Prediction-v3.pdf) (2019): a typical organization, whatever its size, has the capacity to remediate about one in ten of its open vulnerabilities a month; nearly 300 organizations, vendor data
- Veracode, [State of Software Security 2024](https://www.veracode.com/press-release/veracode-reveals-critical-security-debt-can-be-reduced-by-75percent-with-speed-of-remediation) (2024): security debt, flaws unfixed for more than a year, in 42% of applications and 71% of organizations; the fastest fixers cut critical security debt by 75%, from 22.4% of applications to just over 5%; vendor data
- Besker, Martini and Bosch, [Technical debt cripples software developer productivity](https://doi.org/10.1145/3194164.3194178), TechDebt (2018), and [Software developer productivity loss due to technical debt](https://doi.org/10.1016/j.jss.2019.06.004), Journal of Systems and Software 156 (2019): developers lose 23% of their working time to technical debt, measured longitudinally
- Besker, Martini and Bosch, [The Pricey Bill of Technical Debt: When and by Whom will it be Paid?](https://doi.org/10.1109/ICSME.2017.42), ICSME (2017): developers' own estimate of 36%
- Besker, Martini and Bosch, [How Regulations of Safety-Critical Software Affect Technical Debt](https://doi.org/10.1109/SEAA.2019.00020), SEAA (2019): regulation first limits new debt, then forces suboptimal workarounds, and the cost of recertifying decides refactoring
- Jaspan and Green, [Defining, Measuring, and Managing Technical Debt](https://doi.org/10.1109/MS.2023.3242137), IEEE Software 40 (2023), and their [TechDebt 2025 keynote](https://conf.researchr.org/attending/TechDebt-2025/keynotes): subjective measures are the more tractable way to measure technical debt at scale
- Rindell, Bernsmed and Jaatun, [Managing Security in Software: Or: How I Learned to Stop Worrying and Manage the Security Technical Debt](https://doi.org/10.1145/3339252.3340338), ARES (2019): security risk managed as technical debt, a conceptual paper
- Boufaied, Ghaleb and Masood, [Security Debt in Practice: Nuanced Insights from Practitioners](https://arxiv.org/abs/2507.11362) (2025, preprint): empirical evidence on security debt practice is limited

<a id="a1-the-evidence-ledger"></a>
## The evidence ledger

Every claim the design rests on, graded: verdict, evidence strength, what would prove it wrong, which work units measure it, and the evidence with its setting.

### Claims that hold

#### CL-02: Agent findings are noisy and unstable, so no candidate counts until someone independent reproduces it.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** Independent reproduction confirms nearly all agent candidates over a sizable sample, so the verification cost buys little.
- **If it flips:** Independent reproduction moves from every finding to a sample, through the earned-autonomy settings in the organization's profile. The two-tier record stays.
- **Extrapolation:** Small fixtures and one live study; enterprise noise could well be higher.
- **Measured by work units:** U-12, U-35, U-36, U-60 (settled from phase 1)
- *[Comparing AI Agents to Cybersecurity Professionals in Real-World Penetration Testing](https://arxiv.org/abs/2512.09882):* "82% valid submissions ... so about 18% invalid" Measured: Invalid share of 11 findings. Setting: Live university network.
- *[Snyk VulnBench JS 1.0: Can LLMs Find the Same Bugs Twice?](https://arxiv.org/abs/2606.15762):* "80 of 161 unique unmatched findings appeared in only one of five identical repetitions" Measured: Repeatability of LLM findings across 300 scans of 10 Express fixtures. Setting: Vendor benchmark, JavaScript.
- *[APT-Agent: Automated Penetration Testing using Large Language Models](https://arxiv.org/abs/2605.24949):* "30.2% of APT-Agent module invocations named tools that do not exist" Measured: Hallucinated tool invocations. Setting: Research system.

#### CL-03: Source (whitebox) access improves detection far more than how the agents are orchestrated, so early producers should spend on source access before orchestration.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** In the organization's own cohort, the hybrid source arm shows no detection gain over the blackbox arm on matched cases.
- **If it flips:** Early spending shifts from source access toward orchestration, and the organization reorders its access requests in its own plan.
- **Extrapolation:** 20 seeded targets to enterprise codebases; whitebox here means one agent with full source for one target, far short of an estate.
- **Measured by work units:** U-55, U-56, U-67 (settled from phase 3)
- *[Towards Optimal Agentic Architectures for Offensive Security Tasks](https://arxiv.org/abs/2604.18718):* "whitebox vs blackbox was 67.0% vs 32.7% (34.3 points), and web vs binary targets was 74.3% vs 25.3% (49.0 points). Both effects dwarf the 13.4-point architecture effect" Measured: Validated detection, 600 runs, 20 targets, everything but the factor held fixed. Setting: Custom 20-target benchmark.

#### CL-05: Authorization enforced outside the model prevents unauthorized effects even when the agent is manipulated (a proposal is never permission).

- **Type:** empirical. **Evidence strength:** strong.
- **What would prove it wrong:** A seeded manipulated proposal produces an effect outside its grant in a target log.
- **If it flips:** The core safety argument fails. Agents lose any path to running actions until a stronger control outside the model exists, and the loop runs on people and scripts.
- **Extrapolation:** Benchmarks with simulated tools to real cells; attacks through a permitted channel (puppet attack) and output content stay open.
- **Measured by work units:** U-08, U-29, U-31, U-48 (settled from phase 1)
- *[Bounded Agents: Delegation Security for Multi-Agent AI Systems](https://arxiv.org/abs/2608.15888):* "AgentDojo exfiltration from 75 to 100% down to 0%. All 544 InjecAgent data-stealing cases blocked." Measured: Attack success under an external authorization layer, 3,154 instances. Setting: Shared benchmarks.
- *[Taming Various Privilege Escalation in LLM-Based Agent Systems: A Mandatory Access Control Framework](https://arxiv.org/abs/2601.11893):* "0% ASR on InjecAgent and AgentDojo ... blocked a confused-deputy case" Measured: Mandatory access control outcome; confused deputy as one case study. Setting: Benchmarks plus one case.
- *[A First Look at the Security Issues in the Model Context Protocol Ecosystem](https://arxiv.org/abs/2510.16558):* "hosts that execute model-returned tool calls without independent verification" Measured: Ecosystem scan of 67,057 MCP servers. Setting: Deployed infrastructure.

#### CL-06: Model-level defenses (alignment, instruction hierarchy, detectors) cannot be the primary control for agents that read hostile content.

- **Type:** empirical. **Evidence strength:** strong.
- **What would prove it wrong:** An adaptive evaluation against a current model-level defense holds attack success near zero.
- **If it flips:** The rule that a proposal is never permission stays, since it costs little. The quarantine on attacker-writable text could relax for a route whose model defense passes the same adaptive test.
- **Extrapolation:** Little needed: red-team agents read adversarial surfaces by design.
- *[RL Is a Hammer and LLMs Are Nails: A Simple Reinforcement Learning Recipe for Strong Prompt Injection](https://arxiv.org/abs/2510.04885):* "98% ASR vs GPT-4o, 72% vs GPT-5 with Instruction Hierarchy ... took detection to 0% while keeping 97% ASR" Measured: Black-box adaptive attack success. Setting: Benchmarks.
- *[Adaptive Attacks Break Defenses Against Indirect Prompt Injection Attacks on LLM Agents](https://arxiv.org/abs/2503.00061):* "over 50% ASR on InjecAgent against every one of 8 defenses" Measured: Adaptive gradient attack. Setting: Benchmark, white-box, defenses one at a time.

#### CL-07: Isolation protects actions but not judgments, so model-made negative calls (reject, dedup, not applicable) never count as coverage.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** Planted true findings behind adversarial content are never suppressed by model triage over a large sample.
- **If it flips:** Model triage decisions could count toward coverage after sampled checks, and the sampling of negative calls thins out.
- **Extrapolation:** Proof of concept to a motivated intruder planting content; plausible, unmeasured.
- **Measured by work units:** U-40, U-62, U-410 (settled from phase 2)
- *[Defeating Prompt Injections by Design](https://arxiv.org/abs/2503.18813):* "influence on output content ... stays open even under CaMeL-style isolation" Measured: Scope limits of a 0% ASR design. Setting: AgentDojo.
- *[Cybersecurity AI: Hacking the AI Hackers via Prompt Injection](https://arxiv.org/abs/2508.21669):* "the server's replies can be crafted to take control of the agent's workflow" Measured: Proof of concept against an AI pentest framework. Setting: One framework.
- *literature synthesis (2026), not published:* "Nothing in the corpus enforces the integrity of a judgment such as triage, dedup or 'not applicable'" Measured: Absence across 20 sources (digest interpretation). Setting: Literature gap.

#### CL-08: Keeping expected answers out of the agent's reach stops the system from grading itself.

- **Type:** engineering-practice. **Evidence strength:** weak.
- **What would prove it wrong:** A run that could read the expected value shows no difference in reported success from runs that could not.
- **If it flips:** The proof condition could sit closer to the testing agent, which simplifies the fixture owner's role. The separation is cheap, so most organizations would keep it.
- **Extrapolation:** Vendor practice to an internal program.
- **Measured by work units:** U-04, U-25, U-61 (settled from phase 1)
- *[XBOW docs - Validate results with canary tokens](https://docs.xbow.com/console/how-to/validate-with-canaries/):* "The canary coordinator receives location plus a hash, not the expected value" Measured: Vendor operational documentation. Setting: Vendor product.

#### CL-09: Human approval gates erode with familiarity and volume, so their health has to be measured.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** Seeded known-bad proposals are caught at a steady high rate as approval volume and approver tenure rise.
- **If it flips:** Gate monitoring thins out, and the organization lowers the rate of seeded proposals in its own profile.
- **Extrapolation:** Code review and SOC triage to exact-action approval; rising approval may partly reflect better agent output.
- **Latest review:** approval of AI-agent PRs rises with reviewer experience; misses caught far less than false alarms. Stronger, strength unchanged.
- **Measured by work units:** U-57 (settled from phase 3)
- *[Habituation at the Gate: Rising Approval and Declining Scrutiny in Human Review of AI Agent Code](https://arxiv.org/abs/2606.22721):* "approval rose from 30.1% to 36.8% ... inline comment volume decreases (-22%, p=0.0014)" Measured: 400 repeat reviewers, 11,429 reviews of AI-agent PRs, seven months. Setting: Open-source code review, observational, preprint.
- *[The vigilance paradox: automation reliance inside the modern SOC](https://doi.org/10.1108/ics-08-2025-0318):* "survey data (n = 696) ... automation complacency ... automation bias" Measured: Survey model plus 29 interviews. Setting: SOC analysts.
- *[On the acceptance by code reviewers of candidate security patches suggested by Automated Program Repair tools](https://doi.org/10.1007/s10664-024-10506-z):* "knowing that a patch was produced by an allegedly specialized tool" Measured: Experiment, n=72 master students. Setting: Lab.

#### CL-11: Fixing one demonstrated path often fails to close the weakness, so closure needs varied-path verification of the constraint.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** Varied-path fixtures almost never find a surviving path after a path-broken closure.
- **If it flips:** Closure needs only the demonstrated path, and varied-path checks run on a sample.
- **Extrapolation:** Open source to enterprise code; static detection in Bandara may overcount.
- **Measured by work units:** U-79, U-110 (settled from phase 4)
- *[A Large-Scale Empirical Study of Security Patches](https://www.icir.org/vern/papers/patch-study.ccs17.pdf):* "nearly 5% of security fixes negatively impacted the associated software; and 7% failed to completely remedy the security hole they targeted" Measured: 4,000+ bug fixes for 3,000+ vulnerabilities in 682 open-source projects. Setting: Open source, NVD-linked.
- *[Fix that Fix Commit: A real-world remediation analysis of JavaScript projects](https://conferences.computer.org/icsme/pdfs/SCAM2020-CdP3rS7mSlqVWzF3cXW7H/924800a187/924800a187.pdf):* "in 82% of the projects, a commit fixing a prior vulnerability, in turn, introduced one or more new vulnerabilities. Among those projects, on average, 18% of the commits intended to fix vulnerabilities ... introduced" Measured: 118K commits, 53 JavaScript projects, CodeQL-detected. Setting: Open source JavaScript.
- *[Zero-Trust Authorization and Discovery for Enterprise MCP](https://arxiv.org/abs/2609.22573):* "Visibility-only filtering was bypassable by scripted clients" Measured: A control that looked closed and was not. Setting: MCP SDKs.

#### CL-12: A reviewed regression test kept in the owning team's pipeline stops a fixed defect from coming back.

- **Type:** engineering-practice. **Evidence strength:** weak.
- **What would prove it wrong:** Reintroductions of fixed classes occur at the same rate in services with and without the replay stage.
- **If it flips:** The ratchet loses its central mechanism. The weight against reintroduction shifts to secure defaults on the paved road and to retests in the deployed state.
- **Extrapolation:** General test practice to security paths with fixtures that can rot.
- **Latest review:** no study measured reintroduction; teams fix static-analysis build breaks and keep the checks enabled.
- **Measured by work units:** U-17, U-46, U-115 (settled from phase 1)

#### CL-14: Exploitability scores are a weak basis for priority. Ordering by consequence, demonstrated paths and attacker-side signals should work better, which is inference until it is measured.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** In the organization's own incident history, losses concentrate on paths the consequence register rated standard.
- **If it flips:** Exploitability scores could rejoin intake priority beside consequence. The consequence register stays the key for gate posture.
- **Extrapolation:** Public CVE prioritization to internal path prioritization.
- **Measured by work units:** U-89, U-127, U-130, U-132 (settled from phase 2)
- *[Comparing Vulnerability Severity and Exploits Using Case-Control Studies](https://doi.org/10.1145/2630069):* "Median risk reduction from patching vulnerabilities rated CVSS High or Medium: 3.54% for vulnerabilities listed in NVD alone, 10.51% for those with a public proof of concept in Exploit-DB, 61.72% for those sold in exploit kits" Measured: Bootstrapped case-control study, Symantec attack signatures as ground truth (Table XIII). Setting: Vulnerability prioritization; the 61.72% is severity patching restricted to vulnerabilities already in exploit kits.
- *[Exploit Prediction Scoring System (EPSS)](https://arxiv.org/abs/1908.04856):* "This represents an overall exploitation rate of 3.7%." Measured: 921 recorded exploitations in the wild among 25,159 CVEs published 2016 to 2018. Setting: Public CVEs.
- *[Conflicting Scores, Confusing Signals: An Empirical Study of Vulnerability Scoring Systems](https://arxiv.org/abs/2508.13644):* "Of CVEs later added to KEV, only 19.9% ever scored 0.5 or higher on EPSS beforehand" Measured: Advance prediction of confirmed exploitation. Setting: Public CVEs.
- *[Common Vulnerability Scoring System v3.1: User Guide](https://www.first.org/cvss/v3.1/user-guide):* "designed to measure the severity of a vulnerability and should not be used alone to assess risk" Measured: The scoring standard's own guidance, not a measurement. Setting: CVSS base scores.
- *literature synthesis (2026), not published:* "None of the 20 studies evaluates code-level reachability ... as a predictor of real-world exploitation." Measured: Absence across 20 studies. Setting: Literature gap.

#### CL-17: One manual loop, end to end on existing tools, reveals the binding constraints (agreements, handoffs) faster than building components first.

- **Type:** engineering-practice. **Evidence strength:** weak.
- **What would prove it wrong:** The phase 1 retrospective shows queue time concentrated in steps a component build would have removed, not in agreements.
- **If it flips:** Phase 1 builds its first components beside the manual loop, and the weeks the organization plans for it change.
- **Extrapolation:** General software practice to a cross-team security loop with many approvals.
- **Measured by work units:** U-01, U-18 (settled from phase 1)
- *source research synthesis (2026), not published:* "deliberately scope the initial pilot to a short engineering iteration" Measured: Package recommendation; nothing measured. Setting: Design text.
- *structured adversarial review of the design (2026), not published:* "Ship a walking skeleton first" Measured: Seat argument. Setting: Adversarial review.

#### CL-24: Scanner output given to agents mainly improves false-positive filtering, and improves discovery on benchmarks; it stays unreliable as evidence.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** Lead-seeded runs show no higher validated-finding rate than unseeded runs on matched cases.
- **If it flips:** Scanner leads stop feeding agents and intake runs from scenarios alone. Leads still never count as evidence.
- **Extrapolation:** Accurate injected context to noisy SAST and DAST output.
- **Latest review:** 91 to 98% of false positives filtered; benchmark-to-real generalization unreliable.
- **Measured by work units:** U-117, U-118, U-121 (settled from phase 2)
- *[Decoupling Reconnaissance and Exploitation: Measuring the Capability Boundaries of LLM-Based Web Penetration Testing](https://arxiv.org/abs/2606.25332):* "with accurate vulnerability context injected, agents reached up to 90.0% functional success, while autonomous reconnaissance plateaued at about 50% target-vulnerability recall" Measured: Exploitation success with vs without vulnerability context, 70-vulnerability web testbed. Setting: Benchmark.
- *literature synthesis (2026), not published:* "CVSS, including its exploitability subscore, predicts exploitation poorly" Measured: Tool-adjacent scores as predictors. Setting: Public CVEs.

#### CL-28: Independent assurance needs separation between people and teams as well as between agents, because checks run by one team fail together.

- **Type:** organizational. **Evidence strength:** moderate.
- **What would prove it wrong:** Checks owned by one team catch seeded faults as often as checks split across teams.
- **If it flips:** Small organizations consolidate roles through the exception path with less to justify. The four rules still apply.
- **Extrapolation:** N-version software and defense ensembles to organizational checks.
- **Measured by work units:** U-14, U-36, U-45 (settled from phase 1)
- *source research synthesis (2026), not published:* "execution authority and finding acceptance should remain separate responsibilities" Measured: Normative design text. Setting: Package.
- *[An experimental evaluation of the assumption of independence in multiversion programming](https://doi.org/10.1109/TSE.1986.6312924):* "the assumption of independence of failures did not hold" Measured: N-version programming experiment. Setting: Software reliability.
- *[LLMail-Inject: A Dataset from a Realistic Adaptive Prompt Injection Challenge](https://arxiv.org/abs/2506.09956):* "0.166 against the ensemble" Measured: Defenses with different failure modes combined, one scenario. Setting: Public challenge.

#### CL-30: Model and tool changes can silently change control behavior, so routes need requalification on change.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** Requalification runs after model changes almost never change outcomes.
- **If it flips:** Requalification runs on a schedule in place of on every model or tool change.
- **Extrapolation:** Benchmarks to hosted routes.
- **Measured by work units:** U-58, U-87, U-103 (settled from phase 3)
- *[MCPShield: A Security Cognition Layer for Adaptive Trust Calibration in Model Context Protocol Agents](https://arxiv.org/abs/2602.14281):* "Benign-server denial was up to 29.41% for Qwen3-235B" Measured: Model-dependent defense behavior across 6 backbones. Setting: Benchmark.
- *[MCP Pitfall Lab: Exposing Developer Pitfalls in MCP Tool Server Security under Multi-Vector Attacks](https://arxiv.org/abs/2604.21477):* "Hardening increased ASR in one document workflow." Measured: Regression from a hardening change. Setting: Benchmark, 2,579 runs.

#### CL-31: Closure must be retested in the deployed state, because a merged fix or closed ticket is not a deployed fix.

- **Type:** engineering-practice. **Evidence strength:** weak.
- **What would prove it wrong:** Digest-correlated retests essentially never disagree with merge-time closure.
- **If it flips:** Retests in the deployed state run on a sample, and closure can rest on the merge record for most findings.
- **Extrapolation:** n/a
- **Measured by work units:** U-16, U-43 (settled from phase 1)
- *structured design review (2026), not published:* "a closed ticket ... is not deployed closure" Measured: Design text. Setting: Package.

#### CL-33: Frontier AI models are measurably improving at finding and exploiting weaknesses in controlled cyber evaluations, and the rate of improvement has itself increased since late 2024.

- **Type:** empirical. **Evidence strength:** moderate-strong.
- **What would prove it wrong:** Successive frontier releases show flat or falling success on a fixed held-out exploitation suite.
- **If it flips:** The opening's urgency softens. The loop, the rules and the phases stay unchanged.
- **Extrapolation:** From self-contained tasks and undefended ranges to defended production estates.
- **Latest review:** 2026-10-18: added for the thesis opening (AI capability and the backlog worry); sources confirmed against the works, two spot-checked by hand.
- *[How fast is autonomous AI cyber capability advancing?](https://aisi.gov.uk/blog/how-fast-is-autonomous-ai-cyber-capability-advancing):* "had doubled every 4.7 months since late 2024 ... around half [the institute's] November 2025 doubling time estimate, which was 8 months" Measured: 80%-reliability cyber time horizon (human-expert task length) on AISI's narrow cyber suite: identify-and-exploit tasks, reverse engineering, web exploitation. Setting: Government evaluator, self-contained lab tasks; two cyber ranges of small, undefended enterprise networks with initial access already granted.
- *[Frontier AI Trends Report](https://aisi.gov.uk/frontier-ai-trends-report):* "In late 2023, models could rarely carry out apprentice-level cyber tasks (<9% success rate)." Measured: Same suite, longitudinal; the report adds that the best models now complete apprentice-level tasks about half the time and that a model first completed an expert-level task in 2025. Setting: Government evaluator, models released up to October 2025.
- *[LLM Agents can Autonomously Exploit One-day Vulnerabilities](https://arxiv.org/abs/2404.08144):* "When given the CVE description, GPT-4 is capable of exploiting 87% of these vulnerabilities compared to 0% for every other model [tested]" Measured: One-day exploitation, 15 real CVEs, one model generation step. Setting: Sandboxed reproductions of real vulnerable software.

#### CL-34: AI systems now find previously unknown, real vulnerabilities in widely used software, though reproduction and exploitation from scratch remain unreliable.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** AI-attributed CVEs and resolved bounty reports stay flat as a share of the total over successive years.
- **If it flips:** Intake volume is sized lower, and fix-path investment shifts toward the finders the organization already runs.
- **Extrapolation:** From open-source C, Java and web targets to proprietary enterprise stacks.
- **Latest review:** 2026-10-18: added for the thesis opening (AI capability and the backlog worry); sources confirmed against the works, two spot-checked by hand.
- *[From Naptime to Big Sleep: Using Large Language Models To Catch Vulnerabilities In Real-World Code](https://googleprojectzero.blogspot.com/2024/10/from-naptime-to-big-sleep.html):* "[This is] the first public example of an AI agent finding a previously unknown exploitable memory-safety issue in widely used real-world software." Measured: One exploitable stack buffer underflow in SQLite. Setting: Real open-source code, vendor research team.
- *[AI Cyber Challenge marks pivotal inflection point for cyber defense](https://www.darpa.mil/news/2025/aixcc-results):* "In the Final Competition, teams also discovered 18 real, non-synthetic vulnerabilities that are being responsibly disclosed to open source project maintainers." Measured: Also 54 of the synthetic vulnerabilities found and 43 patched; about $152 per competition task; 54 million+ lines analyzed. Setting: Government competition on real open-source projects with injected bugs; seven finalist systems.
- *[CyberGym: Evaluating AI Agents' Real-World Cybersecurity Capabilities at Scale](https://arxiv.org/abs/2506.02548):* "Even the top-performing combinations only achieve a ~20% success rate" Measured: PoC reproduction of 1,507 real vulnerabilities across 188 projects, given a text description; the same work reports 34 zero-days and 18 incomplete patches discovered. Setting: Academic benchmark on real codebases.
- *[The Road to Top 1: How XBOW Did It](https://xbow.com/blog/top-1-how-xbow-did-it/):* "To date, bug bounty programs have resolved 130 vulnerabilities" Measured: Of nearly 1,060 submissions: 130 resolved, 303 triaged, 208 duplicates, 209 informative; human review before submission. Setting: Public bug bounty programs, vendor self-report, top of the HackerOne US ranking in mid-2025.

#### CL-50: An auditor or assurance reviewer relies on a record Ratchet generates, such as a closure record, a freshness report or figures computed from the finding ledger, when its accuracy and completeness can be tested, usually through the controls over the system that produces it.

- **Type:** organizational. **Evidence strength:** strong.
- **What would prove it wrong:** An assurance reviewer refuses a generated record even after its accuracy, completeness, precision and detail have been tested for the review purpose, or still requires the same record to be gathered by hand.
- **If it flips:** The three relief marks fall to none in that organization's reading and the manual work stays; the organization's own patches keep the evidence gathering as a manual duty, and the program still produces the records.
- **Extrapolation:** From the standards for audit evidence to the generated records this program offers an assurance reviewer. The organization must establish the applicable review purpose and test the records and their producing controls.
- **Latest review:** The premise now states conditional reliance and holds on the audit standards. It no longer asserts that generated records always replace evidence gathered by hand.
- *literature synthesis (2026), not published:* "Test the accuracy and completeness of the information, or test the controls over the accuracy and completeness of that information" Measured: A standard requires testing the information or controls over it, and evaluating precision and detail.. Setting: Audit evidence requirements for information produced by the company..
- *literature synthesis (2026), not published:* "Obtaining audit evidence about the accuracy and completeness of the information" Measured: A standard requires evaluating reliability, including accuracy, completeness, precision and detail as necessary.. Setting: The adopted standard and its application guidance on information produced by the entity..
- *literature synthesis (2026), not published:* "The Spotlight is aimed at improving auditor understanding of how to properly test" Measured: Inspection observations identify failures to test information or the controls over its accuracy and completeness.. Setting: Staff observations on the use of data and reports..

### Honest bets

#### CL-01: Bounded LLM agents find real, validated security defects in enterprise systems at a rate worth paying for.

- **Type:** empirical. **Evidence strength:** weak.
- **What would prove it wrong:** Over a pre-registered cohort, the agent arm yields no more validated findings per unit cost than the scripted comparator or the current process.
- **If it flips:** Agents stop drafting tests at the phase 3 decision and the scripted, no-agent loop carries Ratchet. The loop, the four rules and the kept tests stay.
- **Extrapolation:** From benchmarks and one university network to large enterprise estates with heterogeneous stacks, active defenses and business logic.
- **Latest review:** no new enterprise evidence 2025 to 2026; one live comparison, competitive with professionals, more false positives.
- **Measured by work units:** U-55, U-67, U-63 (settled from phase 3)
- *systematic literature search synthesis (2026), not published:* "Reported success rates run from about 30% to 100%." Measured: Benchmark success on CTF-style or seeded targets, varied success definitions. Setting: Lab benchmarks (XBOW, AutoPenBench, custom sets).
- *[Comparing AI Agents to Cybersecurity Professionals in Real-World Penetration Testing](https://arxiv.org/abs/2512.09882):* "ARTEMIS had 82% valid submissions on a live university network of about 8,000 hosts over 16 hours (11 findings)" Measured: Valid share of 11 submitted findings; cost $18 to $59 per hour vs about $60 for professional testers. Setting: One live university network, one run.
- *[LLM-Based Agents for Cybersecurity: A Systematic Review of Architectures, Applications, and Open Challenges](https://doi.org/10.3390/jcp6050159):* "No production-grade evaluation found" Measured: Systematic review of 59 studies. Setting: Field-level review.

#### CL-13: A security regression stage in the deploy path will not materially slow delivery.

- **Type:** empirical. **Evidence strength:** weak.
- **What would prove it wrong:** Lead time for changes or deploy frequency on services under test moves outside the pre-agreed tolerance.
- **If it flips:** The gate narrows to deploys that touch declared dependencies, or moves after deploy for some weakness classes, within tolerances the service owners set.
- **Extrapolation:** None available.
- **Latest review:** delivery improved where gates came with pipeline modernization; the gate's own effect never isolated.
- **Measured by work units:** U-22, U-49, U-129, U-138 (settled from phase 2)

#### CL-15: Line-of-business owners will attest consequence tiers at low effort when the testing team drafts them from existing material.

- **Type:** organizational. **Evidence strength:** none.
- **What would prove it wrong:** Owner minutes per attestation climb, or the unattested count grows quarter over quarter.
- **If it flips:** Consequence tiers come from a default rule with owner exceptions in place of attestation, and the unattested default in the profile carries more weight.
- **Extrapolation:** n/a
- **Measured by work units:** U-126, U-131 (settled from phase 2)

#### CL-16: Holding only deploys that touch a regression's declared dependencies keeps a gate outage's blast radius small.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** Held deploys per outage hour approach total deploys per hour, because declared dependencies are broad.
- **If it flips:** Dependency declarations get stricter, or the gate fails open for some tiers through the gate failure policy in the profile.
- **Extrapolation:** n/a
- **Measured by work units:** U-129 (settled from phase 3)

#### CL-18: Remediation throughput is the binding constraint, ahead of validation capability, so validation must be gated on fix capacity.

- **Type:** organizational. **Evidence strength:** moderate.
- **What would prove it wrong:** The phase 1 and phase 2 flow ledgers show fix queue time is a small share of loop time.
- **If it flips:** Fix queue time turns out to be a small share of loop time, so the opening leads with trust or with how sweeps decay in place of capacity, and dispatch stops waiting on fix capacity. The saturation setting in the profile stays unused.
- **Extrapolation:** From scanner-reported vulnerabilities across whole estates (data from 2019) and application flaws in one vendor's scans to validated findings with a demonstrated path in this loop. Both show remediation lagging discovery; neither shows that it binds ahead of validation capability, which is the part only the flow ledger can settle.
- **Latest review:** indirect evidence of saturated remediation (20 to 30% unfixed; queues at or above capacity); no before-and-after volume study.
- **Measured by work units:** U-18, U-21, U-63, U-64 (settled from phase 1)
- *structured adversarial review of the design (2026), not published:* "The package's own text suspects remediation is the binding constraint, yet every stage builds validation capability." Measured: Seat reading of the package. Setting: Adversarial review.
- *[Prioritization to Prediction, Volume 3: Winning the Remediation Race](https://www.cyentia.com/wp-content/uploads/2026/05/Kenna-Prioritization_to_Prediction-v3.pdf):* "A typical organization, regardless of asset complexity, will have the capacity to remediate about one out of every 10 vulnerabilities in their environment within a given month." Measured: Average open against closed vulnerabilities per month, regressed across organizations on log scales; the key findings state it as about one in ten whatever the organization's size. Setting: Vulnerability scanner data from one vendor's platform, nearly 300 organizations of different types and sizes; commissioned by the vendor, analyzed by an independent research firm; not peer reviewed.
- *[Veracode Reveals Critical Security Debt can be Reduced by 75% with Speed of Remediation](https://www.veracode.com/press-release/veracode-reveals-critical-security-debt-can-be-reduced-by-75percent-with-speed-of-remediation):* "[security debt] exists in 42 percent of applications and 71 percent of organizations ... reduce critical security debt by 75 percent ... from 22.4 percent of applications to just over five percent" Measured: Security debt defined as flaws unfixed for longer than a year; the 75 percent cut is for the teams that fix fastest; 1,007,133 applications, about 13 million static and dynamic scans. Setting: One vendor's scan data across its customers; not peer reviewed.

#### CL-20: Asking 'what would have caught this first' in every incident review improves scenario selection.

- **Type:** organizational. **Evidence strength:** weak.
- **What would prove it wrong:** Over a year, incident-sourced scenarios yield no more validated findings than other scenarios.
- **If it flips:** The incident review question becomes optional, and scenario selection leans on its other sources.
- **Extrapolation:** General resilience theory to this loop.
- **Measured by work units:** U-51, U-97 (settled from phase 2)
- *literature synthesis (2026), not published:* "recovery and adaptation are the under-engineered parts of AI resilience" Measured: Conceptual review; 2 of 20 sources measure anything. Setting: Resilience literature.

#### CL-21: A bounded STPA-Sec pass over Ratchet's own control structure finds hazards that component-level tests miss.

- **Type:** empirical. **Evidence strength:** weak.
- **What would prove it wrong:** The pass finds no hazard that the failure catalog or the architecture review did not already hold.
- **If it flips:** The hazard analysis of Ratchet's own control structure drops from phase 2, and the failure catalog carries that load alone.
- **Extrapolation:** Cyber-physical cases to a software validation program.
- **Latest review:** feasibility supported in DevSecOps and organizational settings; no reliability or outcome validation.
- *[Cybersafety Approach to Cybersecurity Analysis and Mitigation for Mobility-as-a-Service and Internet of Vehicles](https://doi.org/10.3390/electronics10101220):* "48 vs 23: requirements generated by Cybersafety vs CHASSIS" Measured: One use case, one group. Setting: Automotive OTA.
- *Cybersafety: A System-Theoretic Approach to Identify Cyber-Vulnerabilities & Mitigation Requirements in Industrial Control Systems:* "10%: share of identified unsafe control actions for which loss scenarios were actually developed" Measured: Coverage in one ICS analysis. Setting: Industrial control.

#### CL-23: Per-call-site conformance plus a tested sample makes analysis tailoring safe, with no blind spot where the road is bypassed.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** The covered-code sample finds escapes at a rate above the off-road baseline.
- **If it flips:** Scanner rules stay on for code on the paved road, and no weakness class is labeled covered for agents.
- **Extrapolation:** n/a
- **Measured by work units:** U-134, U-136 (settled from phase 4)
- *[Zero-Trust Authorization and Discovery for Enterprise MCP](https://arxiv.org/abs/2609.22573):* "Visibility-only filtering was bypassable by scripted clients" Measured: Cosmetic constraint failing (analogy for coverage applied too coarsely). Setting: MCP SDKs.

#### CL-25: Yield and miss rate measured per rule or class on the organization's own code justify integrate, migrate or deprecate decisions.

- **Type:** economic. **Evidence strength:** weak.
- **What would prove it wrong:** A deprecated tool's class shows up later in incidents or held-out challenges.
- **If it flips:** Tool portfolio decisions wait on held-out challenges and incident history in place of per-rule yield.
- **Extrapolation:** n/a
- **Latest review:** precision and recall vary by class and language; benchmarks do not transfer.
- **Measured by work units:** U-121, U-123, U-138 (settled from phase 3)
- *[Predicting Exploitation of Disclosed Software Vulnerabilities Using Open-source Data](https://arxiv.org/abs/1707.08015):* "under realistic conditions one replication fell from F1 83% to 4%" Measured: How evaluation choices inflate predictive metrics (method caution). Setting: Exploit prediction.

#### CL-26: Agent-assisted validation is cheaper per accepted closure than the current process once full costs are counted.

- **Type:** economic. **Evidence strength:** weak.
- **What would prove it wrong:** Phase 3 reports the agent arm's cost per accepted closure, with failures in the denominator, at or above the current process.
- **If it flips:** The scripted loop carries Ratchet, and the business case rests on fewer escapes and faster fixes in place of lower cost.
- **Extrapolation:** Agent hourly cost to full loop cost including human gates.
- **Latest review:** verification hours are the dominant uncounted cost in every published study.
- **Measured by work units:** U-55, U-63, U-67 (settled from phase 3)
- *[Comparing AI Agents to Cybersecurity Professionals in Real-World Penetration Testing](https://arxiv.org/abs/2512.09882):* "ARTEMIS cost $18 to $59 per hour vs about $60 per hour for professional testers" Measured: Hourly cost in one live study; cost per accepted closure unmeasured. Setting: University network.
- *[Multi-Agent Penetration Testing AI for the Web](https://arxiv.org/abs/2508.20816):* "MAPTA spent $0.073 per success vs $0.357 per failure, so failures are the expensive case" Measured: Inference cost only. Setting: Benchmark.

#### CL-29: Tests can earn continuous cadence through a trust gate without raising the rate of harmful runs.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** Harmful or out-of-scope runs rise after tests step up to continuous mode.
- **If it flips:** Kept tests stay on a scheduled cadence, and the step up to continuous runs waits for a stronger trust gate.
- **Extrapolation:** n/a
- **Measured by work units:** U-47, U-48 (settled from phase 2)

#### CL-32: Sending developers only demonstrated findings and high-confidence leads cuts triage toil without letting more defects through.

- **Type:** economic. **Evidence strength:** moderate (toil) / none (safety).
- **What would prove it wrong:** Sampled held leads contain validated defects at a rate that, scaled up, exceeds what developers were fixing before.
- **If it flips:** The lead threshold drops, more leads reach developers, and the triage toil returns as a cost the value case must carry.
- **Extrapolation:** Vulnerability prioritization to scanner lead routing.
- **Latest review:** triage cost real (10 to 20 minutes an alarm, 75.7% false alarms in one enterprise); LLM filtering recall below 90%, so suppressed leads need sampled review.
- **Measured by work units:** U-121, U-122, U-138 (settled from phase 3)
- *[Vulnerability Management Chaining: An Integrated Framework for Efficient Cybersecurity Risk Prioritization](https://arxiv.org/abs/2506.01220):* "A CVSS 7.0+ strategy had 0.5% efficiency at 90.0% coverage, vs 9.1% efficiency at 85.6% coverage for an integrated KEV/EPSS/CVSS decision tree" Measured: Workload vs coverage trade-off in prioritization. Setting: 90 exploited vulnerabilities, 13 months.

#### CL-35: AI agents have exploited real vulnerabilities in live intrusion campaigns, with heavy autonomy but unreliable output.

- **Type:** empirical. **Evidence strength:** weak.
- **What would prove it wrong:** No further documented AI-executed exploitation in independent incident reporting through 2027.
- **If it flips:** The opening drops the statement that attackers already use AI exploitation in the wild. Nothing else in the design rests on it.
- **Extrapolation:** One campaign to the general threat environment.
- **Latest review:** 2026-10-18: added for the thesis opening (AI capability and the backlog worry); sources confirmed against the works, two spot-checked by hand.
- *[Disrupting the first reported AI-orchestrated cyber espionage campaign](https://assets.anthropic.com/m/ec212e6566a0d47/original/Disrupting-the-first-reported-AI-orchestrated-cyber-espionage-campaign.pdf):* "the AI autonomously discovered vulnerabilities in targets selected by human operators and successfully exploited them in live operations" Measured: 80-90% of tactical operations executed by the AI; roughly 30 entities targeted; a handful of validated successful intrusions. Setting: One state-attributed espionage campaign, vendor threat-intelligence report, November 2025.
- *[Disrupting the first reported AI-orchestrated cyber espionage campaign](https://assets.anthropic.com/m/ec212e6566a0d47/original/Disrupting-the-first-reported-AI-orchestrated-cyber-espionage-campaign.pdf):* "Claude frequently overstated findings and occasionally fabricated data during autonomous operations" Measured: Qualitative limitation in the same campaign. Setting: Same.

#### CL-36: The record (the evidence store and the finding ledger) keeps up with run volume on the organization's own infrastructure.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** Write backlog in the evidence store or query time on the finding ledger grows with run volume past the service levels the organization sets for its record.
- **If it flips:** A local engineering problem: the organization patches its own storage and partitioning, and the same checks judge the patch.
- **Extrapolation:** n/a

#### CL-37: Kept regression tests fit the pipeline's time budget as they accumulate.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** The regression stage's run time per deploy grows past the time budget each service sets, even with dependency-scoped replay.
- **If it flips:** Kept tests run by dependency, retire when a cheaper kept check covers their weakness class, or move their time-based runs to a slower lane. The ratchet then depends on its retirement rule.
- **Extrapolation:** n/a

#### CL-38: Model access cost and rate limits fit the volume of runs the organization intends.

- **Type:** economic. **Evidence strength:** none.
- **What would prove it wrong:** Model spend or rate-limit refusals cap runs below the planned volume over a quarter.
- **If it flips:** Routing and budget limits tighten, and the scripted loop takes more of the load through the fallback ladder in the profile.
- **Extrapolation:** n/a

#### CL-39: Reviewers' capacity for independent reproduction grows with finding volume.

- **Type:** organizational. **Evidence strength:** none.
- **What would prove it wrong:** Candidates wait longer for independent reproduction as volume rises, and queue age per reviewer climbs quarter over quarter.
- **If it flips:** Intake throttles to reviewer capacity, or earned autonomy moves some weakness classes to sampled reproduction sooner.
- **Extrapolation:** n/a

#### CL-40: While discovery outruns fixes, fixes aimed at a whole weakness class reduce escapes faster than fixes aimed at single findings.

- **Type:** organizational. **Evidence strength:** none.
- **What would prove it wrong:** Over a period when the security backlog grows, services that received class-level fixes show no lower security escapes per deployment than services that received finding-level fixes.
- **If it flips:** Fix effort goes finding by finding in risk order, and paved-road investment waits. The fix-capacity saturation setting still governs intake.
- **Extrapolation:** n/a

#### CL-41: Once fixes keep pace with discovery, steering discovery toward untested surface finds more novel weaknesses than re-mining weakness classes already covered.

- **Type:** organizational. **Evidence strength:** none.
- **What would prove it wrong:** Runs steered toward low-coverage surface yield no more validated novel findings per run than runs on covered weakness classes.
- **If it flips:** Discovery stays spread across covered classes, and the deferred rule that would steer discovery toward low-coverage areas stays deferred.
- **Extrapolation:** n/a

#### CL-42: As novel findings near zero, AI discovery drifts toward noise, so the cost per validated novel finding rises and independent reproduction matters more.

- **Type:** economic. **Evidence strength:** none.
- **What would prove it wrong:** Cost per validated novel finding and the invalid share of agent candidates stay flat as novel findings become rare.
- **If it flips:** Discovery spending can hold steady near zero, and reproduction stays at the sample rate earned autonomy already set.
- **Extrapolation:** n/a

#### CL-43: As novel findings near zero, security fixes become the main stream of security changes and the main source of new defects, so the change fail rate of security fixes becomes the key safety measure; the floor resets for a weakness class whenever new technology brings new classes.

- **Type:** organizational. **Evidence strength:** none.
- **What would prove it wrong:** The change fail rate of security fixes stays at or below the service's overall change fail rate, and failed security fixes cause a small share of new findings.
- **If it flips:** The remediation change fail rate stays one measure among the others, and the organization weights its reporting toward escapes and discovery cost. New weakness classes are still tracked one class at a time.
- **Extrapolation:** n/a

#### CL-44: A cheaper kept check that covers a weakness class (a paved-road entry or a secure-creation check) protects as well as the kept regression test it retires.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** After kept regression tests retire in favor of a cheaper check, their weakness classes are reintroduced at a higher rate than while the tests ran.
- **If it flips:** A kept regression test retires only on direct evidence about its own weakness, and the regression stage grows, with only quiet tests' time-based runs moving to a slower lane.
- **Extrapolation:** n/a
- **Measured by work units:** U-204, jig:U-438, U-449 (settled from phase 2)

#### CL-45: Re-proving a kept regression test against its fix reverted finds tests that no longer detect their weakness.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** Scheduled re-proof against the reverted fix almost never finds a kept test that passes when it should fail.
- **If it flips:** Re-proof runs less often, at an interval the organization sets in its profile, and the time saved goes to discovery.
- **Extrapolation:** n/a
- **Measured by work units:** U-203 (settled from phase 3)

#### CL-46: Bounding what an agent may touch limits what its errors cost better than its accuracy record does.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** In phase 2, a route's recent accuracy before each action forecasts what its wrong actions cost (time to recover and incident severity) better than the tier its limit allows and the action's class.
- **If it flips:** The organization lets an accurate record widen limits further, through its own patches, while the design limit still caps what no record can reach.
- **Extrapolation:** n/a
- **Measured by work units:** U-222 (settled from phase 2)

#### CL-47: A finding that arrives with a reproducing test, a drafted fix and an owned gate costs the owning team less than one that arrives as a ticket.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** Owning teams spend as many hours per accepted finding that arrived with a fix path as they did per finding before, or decline most drafted fixes.
- **If it flips:** Security stops drafting fixes for the classes where teams decline them and puts that effort into secure defaults for those classes.
- **Extrapolation:** n/a
- **Measured by work units:** U-240 (settled from phase 3)

#### CL-48: A one-time sweep with a capable model decays: escapes return through weaknesses that later changes reintroduce and through classes that the next, more capable model finds.

- **Type:** engineering-practice. **Evidence strength:** none.
- **What would prove it wrong:** Through later model releases after a sweep, the escape rate per deployment stays at its post-sweep level against the organization's historical starting point, and escapes that are reintroduced weaknesses or in classes new since the sweep stay a small share.
- **If it flips:** A periodic sweep becomes a credible alternative for organizations already near zero, and the opening for them shifts to trust and independent evidence. The loop and its four rules still apply, and kept regression tests carry less of the case.
- **Extrapolation:** n/a
- **Measured by work units:** U-205 (settled from phase 3)

#### CL-49: Security debt is the security share of quality debt, which every quality draws from one engineering pool, so findings validated beyond an owning team's fix capacity add interest, in team time lost, without reducing risk.

- **Type:** organizational. **Evidence strength:** weak.
- **What would prove it wrong:** Owning teams' reported time lost to security debt does not rise while validated findings arrive above their fix cap, or findings above the cap close as fast as those below it without taking time from other quality work.
- **If it flips:** Fix capacity is read as a security queue of its own, the fix cap governs on queue age alone, and the time lost to security debt stays a descriptive measure beside the counts.
- **Extrapolation:** From technical debt in general, measured mostly through developers' reports in a few companies, to security findings in this loop; and from a conceptual framing of security as technical debt to the claim that both draw on one engineering pool, so that findings beyond fix capacity add interest without reducing risk.
- **Measured by work units:** U-205, U-240 (settled from phase 3)
- *[Software developer productivity loss due to technical debt: A replication and extension study examining developers' development work](https://doi.org/10.1016/j.jss.2019.06.004):* "developers waste, on average, 23% of their time due to TD ... developers are frequently forced to introduce new TD" Measured: Wasted working time reported by developers over repeated surveys; the 2018 conference paper (TechDebt 2018) first reported the same 23%, and the journal article replicates it. Setting: Longitudinal study, 43 developers in industry with follow-up interviews of 16 practitioners; replicated on a second data set.
- *[The Pricey Bill of Technical Debt: When and by Whom will it be Paid?](https://doi.org/10.1109/ICSME.2017.42):* "on average, 36 % of all development time is estimated to be wasted due to Technical Debt" Measured: Self-estimate of wasted time, not a measurement; the longitudinal study's 23% is the measured figure. Setting: Web survey, 258 participants, with follow-up interviews of 32 practitioners.
- *[How Regulations of Safety-Critical Software Affect Technical Debt](https://doi.org/10.1109/SEAA.2019.00020):* "the regulations also force the software companies to perform later suboptimal work-around solutions ... refactoring decisions are heavily weighed on the costs associated with the application's recertification process" Measured: How safety-critical regulation affects technical debt (abstract read; method not checked): regulation first limits the introduction of new debt. Setting: Companies building regulated safety-critical software.
- *[Managing Security in Software: Or: How I Learned to Stop Worrying and Manage the Security Technical Debt](https://doi.org/10.1145/3339252.3340338):* "Managing Security in Software Or: How I Learned to Stop Worrying and Manage the Security Technical Debt" Measured: Conceptual: security risk managed as technical debt, assessed against an evaluation framework drawn from the literature; no measurement. Setting: Position and framework paper.
- *[Security Debt in Practice: Nuanced Insights from Practitioners](https://arxiv.org/abs/2507.11362):* "there is limited empirical evidence on how software practitioners perceive, manage, and communicate SDs [security debts] in real-world settings" Measured: Semi-structured interviews with 22 practitioners on security debt practice. Setting: Interview study, preprint.
- *[Leveraging Research to Inform Structural Technical Debt Management](https://conf.researchr.org/attending/TechDebt-2025/keynotes):* "relying heavily on subjective measures yields a more tractable approach to measuring and managing technical debt than using purely objective measurements" Measured: How to measure the interest, not whether the claim holds: the authors' summary of their technical debt research at one large engineering organization, reported in IEEE Software (2023). Setting: One large engineering organization, quarterly engineering survey.

### Reworded

#### CL-10: Seeding gates with known-bad proposals measures gate health.

- **Type:** engineering-practice. **Evidence strength:** weak.
- **What would prove it wrong:** Seeded catch rate stays high while real out-of-scope approvals still occur, or reviewers learn to spot the seeds.
- **If it flips:** Seeded proposals stop counting as a gate-health measure, and the organization declares another check on its approval gates in its own patches.
- **Extrapolation:** Inference from vigilance and alarm-fatigue practice in other fields; no source cited here.
- **Latest review:** no study shows seeds sustain vigilance; 'sustains' dropped.
- **Measured by work units:** U-57 (settled from phase 3)

#### CL-19: Coverage that follows cooperation misses where losses concentrate, and reconciling scenarios against incident and loss history corrects it.

- **Type:** organizational. **Evidence strength:** weak.
- **What would prove it wrong:** Incident reconciliation finds losses no more concentrated in low-cooperation services than in tested ones.
- **If it flips:** Coverage is reconciled against incident history less often, and intake follows cooperation with less correction.
- **Extrapolation:** Benchmark access effect to organizational cooperation.
- **Measured by work units:** U-51, U-89, U-97 (settled from phase 2)
- *literature synthesis (2026), not published:* "whitebox access nearly doubles validated detection (67.0% vs 32.7%)" Measured: Detection by access level (digest interpretation: coverage concentrates where code is shared). Setting: Benchmark.
- *structured adversarial review of the design (2026), not published:* "Report the share of loss value that has current evidence" Measured: Seat argument. Setting: Adversarial review.

#### CL-22: Enforced paved-road abstractions sharply reduce the classes they target for code that provably uses them; residual risk sits at the boundary with off-road code.

- **Type:** empirical. **Evidence strength:** moderate.
- **What would prove it wrong:** On-road and off-road code show the same reintroduction rate and findings per change.
- **If it flips:** Paved-road entries stop replacing per-service regression tests, and the compounding return in the value case shrinks to what kept tests deliver.
- **Extrapolation:** From agent authorization to application libraries.
- **Latest review:** safe-by-construction reduces targeted classes (about 70x fewer vulnerabilities from new contributors in Rust vs C++); they reduce classes, and retire them only where enforcement is automatic and boundaries are controlled.
- **Measured by work units:** U-110, U-113, U-115 (settled from phase 4)
- *source research synthesis (2026), not published:* "Convert repeated validated failures into reviewed standards, linters, templates and secure defaults." Measured: Backlog proposal; nothing measured. Setting: Design text.
- *literature synthesis (2026), not published:* "the strongest defenses ... retire whole classes by enforcing a constraint, not by patching paths" Measured: Agent authorization mechanisms (digest interpretation). Setting: Benchmarks, different domain.

#### CL-27: Enough closures accrue within about two quarters to read a comparison.

- **Type:** empirical. **Evidence strength:** weak.
- **What would prove it wrong:** Phase 3 prints no-conclusion at the time box because closures fall below the pre-registered minimum.
- **If it flips:** The comparison window stretches, or the set of cases widens, before the continue or stop decision.
- **Extrapolation:** n/a
- **Measured by work units:** U-52, U-67 (settled from phase 3)
- *structured adversarial review of the design (2026), not published:* "single-digit closures per journey per quarter" Measured: Seat estimate. Setting: Argument.

### Dropped

#### CL-04: Independent agents beat centrally coordinated ones, and by analogy an organization should not centralize validation in one team.

- **Type:** empirical. **Evidence strength:** weak.
- **What would prove it wrong:** Not falsifiable as an organizational claim from this evidence.
- **If it flips:** Nothing bends: the claim was dropped and no part of the design rests on it. Separation between teams rests on the claim about independent assurance.
- **Extrapolation:** From software agent topology to human team structure. No warrant.
- *[Towards Optimal Agentic Architectures for Offensive Security Tasks](https://arxiv.org/abs/2604.18718):* "single agent 50.8%, independent multi-agent 64.2% ... centralized 36.7%" Measured: Agent topologies on validated detection. Setting: Custom benchmark; confidence intervals overlap among leading designs.
