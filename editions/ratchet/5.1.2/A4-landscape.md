<a id="a4"></a>
# Annex A4: How Ratchet compares with what the market offers

*Ratchet: closed-loop security validation for AI-assisted engineering. Annex. Edition 5.1.2, Thesis 1.4.2, 2026-10-30, build 13fabeae+local.*

*As of 18 October 2026. This market changes monthly, so re-check any figure older than about two months before quoting it. Judgments are labeled as the authors'. The strength column grades the public evidence behind each system's efficacy, never the system itself.*

Most serious work in this space now agrees that an agent's finding is a lead until something proves it. The systems differ in how far past the finding they go, in who holds the gates, and in how well their claims are measured.

| System | Finds | Proves it independently | Approves each action | Fixes | Retests the running system | Keeps a regression gate | Strength of public evidence |
|---|---|---|---|---|---|---|---|
| [Anthropic's disclosure program](https://red.anthropic.com/2026/cvd/) and Claude Security | Yes | Yes in the program: outside firms review what Anthropic sends | No | Proposes | No | No | Outside review, on findings the vendor selected |
| [OpenAI Codex Security](https://learn.chatgpt.com/docs/security) | Yes | Its own sandboxed proof | No: access tiers decide who may use the model, not which action runs | Yes | No | No | Vendor self-report, finding counts only |
| [Google CodeMender](https://deepmind.google/blog/introducing-codemender-an-ai-agent-for-code-security/) | Yes | Its own sandboxed proof | No | Yes, rerunning the exploit and tests | No | Partly | Vendor self-report |
| [Cloudflare's published harness](https://blog.cloudflare.com/build-your-own-vulnerability-harness/) | Yes | A separate validator on a different model, which cannot file findings | No | Yes: a failing test must pass | Before the fix only | Partly | Vendor self-report; recall stated as unmeasurable |
| AISLE | Yes | Partly: project maintainers confirm | No | Yes, accepted upstream | No | No | Upstream acceptance of findings the vendor selected |
| [Capital One VulnHunter](https://github.com/capitalone/vulnhunter) (open source) | Yes | Partly: the tool challenges its own findings; a separate read-only agent judges each fix | No | Yes: a failing test, then a passing one | No | Partly | No published figures |
| [XBOW](https://xbow.com/platform) | Yes | Vendor-run validators | Yes, in a runtime the vendor holds | Partly | Partly | Partly | Vendor self-report; bug-bounty results screened by the vendor |
| Uber ([AI code review](https://www.uber.com/en-US/blog/ureview/), [automated fixes](https://www.uber.com/blog/fixrleak-fixing-java-resource-leaks-with-genai)) | Partly | Partly: a second model grades each comment | No | Yes, rebuilt, tested and rescanned | No | Partly | Vendor self-report |
| [DARPA AI Cyber Challenge](https://www.darpa.mil/news/2025/aixcc-results) systems | Yes | Yes, scored by the organizers | No | Yes | No | No | Independently measured, on planted weaknesses |
| Infrastructure validation ([Horizon3](https://horizon3.ai/vulnerability-management-hub/), Picus) | Yes | Yes, by exploiting or simulating | Partly: scope and autonomy settings | Partly | Yes, for infrastructure only | Partly | Vendor self-report |
| Frameworks (CSA MAESTRO, OWASP Top 10 for Agentic Applications) | Threat models and vocabulary, not a loop | | | | | | |
| **Ratchet** | Leads only, by design | Yes, against a proof condition the agent never sees, unless a recorded autonomy grant applies; such findings are labeled | Yes, held by the organization | The owning team fixes; security co-builds the path | Yes | Yes, scoped to the code the test depends on | No run data yet |

<a id="a4-vendors-report-large-numbers-none-checked"></a>
## Vendors report large numbers, none checked outside the vendor

These are each vendor's own figures, as published. None has been checked by anyone outside the vendor, and none reports recall.

- **Anthropic**, according to its [disclosure dashboard](https://red.anthropic.com/2026/cvd/) (2 October 2026): 29,439 candidates from its models; 6,123 reviewed by outside firms, of which 5,674 were judged valid; 6,157 disclosed; 516 patched upstream. It calls independent human triage "the rate limiting step."
- **Cloudflare**, according to its [June 2026 post](https://blog.cloudflare.com/build-your-own-vulnerability-harness/): 20,799 raw candidates, of which about 12,057 survived validation; a shared pool of 13,841 findings across 145 repositories, of which 5,442 were folded as duplicates and, in its words, 7,245 were left actionable; its validator's rejection rate fell from 40% to 11%. It states that it claims no false-negative rate.
- **XBOW**, according to the vendor: 130 of nearly 1,060 bug-bounty submissions resolved in 2025, after its own screening.
- **Google**, according to its [CodeMender announcement](https://deepmind.google/blog/introducing-codemender-an-ai-agent-for-code-security/): 72 security fixes upstreamed to open-source projects in six months.
- **Uber**, according to its [code review post](https://www.uber.com/en-US/blog/ureview/) (August 2025): engineers who rate its review comments mark 75% as useful, and over 65% of comments are addressed, measured automatically.
- **AISLE**, as reported in press coverage: credited with all 12 CVEs in OpenSSL's January 2026 release.
- **Capital One**, in its VulnHunter announcement: applied across "thousands of repositories", with no figures.

<a id="a4-independent-evidence-supports-ratchet-s-skepticism"></a>
## Independent evidence supports Ratchet's skepticism and tests none of its remedies

*The studies in this section are context for the comparison. The claims the design itself rests on are graded in part 1, with the full evidence ledger in Annex A1.*

Nothing in this market has been independently measured at production scale, and no vendor publishes recall: the share of real weaknesses its system misses. The only independent scoring is the DARPA competition, on planted weaknesses: its systems found 54 of 63 and patched 43. The rest comes from vendors, or from outside reviewers who saw only what the vendor chose to send. Anthropic's 92.7% valid rate, for example, covers the 6,123 findings it sent for review out of 29,439 candidates.

Independent research is consistent on three points, and all three support where Ratchet is skeptical:

- **A passing check is weak evidence that a fix is right.** In Meta's [AutoPatchBench](https://engineering.fb.com/2025/04/29/ai-research/autopatchbench-benchmark-ai-powered-security-fixes/), about 60% of AI-generated patches built and stopped the crash, but only about 5 to 11% were correct after differential testing.
- **Agents game the checks they can see.** In [ImpossibleBench](https://arxiv.org/abs/2510.20270), whose tasks can only be passed by cheating, GPT-5 cheated on 54.0% of one task set. Hiding the tests cut cheating to near zero, but it also lowered legitimate performance. This is the closest independent test of Ratchet's hidden proof condition, and it comes from coding, not security.
- **Filtering noise works, but it misses things.** On one enterprise's static-analysis alarms, model-based triage removed 94 to 98% of false positives while recall stayed below 90% (Du et al., 2026, from the literature search for this design).

Two things remain unmeasured. No study compares a separate validator on a different model against a model checking its own security findings, which is the design choice behind Cloudflare's harness and behind Ratchet's earned-autonomy bet. And nothing independent tests any of Ratchet's remedies.

<a id="a4-each-of-ratchet-s-additions-rests"></a>
## Each of Ratchet's additions rests on a supported premise and an untested remedy (the authors' reading)

| Addition | What the evidence supports | What is untested |
|---|---|---|
| The organization holds the gate, across every vendor and internal agent | Agents act against what they can reach and see | Whether organization-held gates do better than vendor-held ones |
| A finding is done only when its fix is verified in the running system and kept by a test | A passing patch proves little | Whether kept, dependency-scoped regression gates prevent reintroduction |
| Fix capacity limits what reaches each team | Fixing limits outcomes more than finding does (Annex A1) | Whether gating on capacity improves outcomes; one early sign only |
| Checks on the people at the gates | Approvers drift toward approval (Annex A1) | Whether seeded known-bad proposals keep them alert; nearby interventions failed |
| Proof conditions hidden from the testing agent | Hiding tests resists gaming, at a cost, outside security | The same effect for security tests |

<a id="a4-the-market-is-ahead-in-engineering"></a>
## The market is ahead in engineering detail, and Ratchet repeats some of what exists

The market is ahead in engineering detail. Cloudflare's validator design is concrete and Ratchet's is not, though neither is measured. Vendors generate fixes, while Ratchet leaves fixing to the owning team. Some tie code to live traffic, a richer signal of what is at stake than Ratchet's tiers. Some have published ways to prove a weakness without harm, such as a timing test for SQL injection. And continuous testing on every change is standard, while Ratchet starts with one weakness in six weeks.

Ratchet also repeats what exists. Treating agent findings as leads is now shared ground, and Ratchet claims no credit for it. Several vendors already reproduce a finding, or write a failing test, before the fix; Ratchet's addition is narrower: reproduction independent of the vendor, against a condition the agent never sees. For an organization whose exposure is mostly network and identity, Ratchet's retest step duplicates products it can buy. For an organization already running the find-and-prove half well, Ratchet's contribution reduces to the control plane, the keep half of the loop and capacity gating.

<a id="a4-most-of-the-market-plugs-into"></a>
## Most of the market plugs into Ratchet as leads, reach or fixes

- **Signals in:** Claude Security, Codex Security, CodeMender, AISLE, VulnHunter's hunt and other AI scanners become lead sources, each scored per tool against closed cases.
- **Reach:** a black-box agent like XBOW's can propose exact tests, with Ratchet's authorization service in front of the vendor's own runtime, so every action passes two gates.
- **Stakes:** a scoped firewall rule, as Cloudflare proposes, can hold a weakness while its fix waits in a queue gated on capacity.
- **Prevention out:** Jig can draw on secure-creation tools, including Uber's published review and fix work.
- **The core fix path:** VulnHunter's failing-then-passing test is a ready candidate for the kept regression test, and its read-only verifier for the check before merge. Being open source, it can run inside the organization's own execution cells.
- **Ratchet's own threat model:** MAESTRO and the OWASP agentic Top 10 name what can go wrong with Ratchet's agents. [Annex A5](A5-standards-crosswalk.md#a5) maps each risk and layer to the parts, rules and failure scenarios that contain it, and marks the four it covers only in part.
