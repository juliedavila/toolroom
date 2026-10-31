<a id="a2"></a>
# Annex A2: How the design was produced

*Ratchet: closed-loop security validation for AI-assisted engineering. Annex. Edition 5.2.0, Thesis 1.4.3, 2026-10-31, build 5842e9bf+local.*

*The method, in the order it happened, with what each step changed. Context for readers who want to know how far to trust the design; the main parts stand on their own.*

<a id="a2-pictures-became-a-model-before-anything"></a>
## Pictures became a model before anything was decided

The source research arrived with 22 architecture diagrams. Read closely, they were pictures rather than a model: 178 arrows, 173 distinct labels, and boxes that meant different things in different diagrams. Every node and edge was extracted into one canonical model of parts, relationships, contracts and trust zones, and every view since has been generated from that model rather than drawn. The extraction surfaced 24 conflicts between the research's planning diagrams and its engineering diagrams; each was resolved by a recorded design change.

<a id="a2-an-adversarial-review-attacked-the-design"></a>
## An adversarial review attacked the design from four sides

A structured review ran four perspectives against the design: safety and resilience, security economics, delivery and flow, and organization design, each grounded in the published work of practitioners in its field. It produced 29 findings. The strongest pattern across them was that the design hardened the agents and trusted the humans around them. That blind spot is now named **asymmetric suspicion** (part 1), and the design measures its human gates the way it checks its agents.

<a id="a2-architecture-and-plan-were-reviewed-and"></a>
## Architecture and plan were reviewed and rebuilt

An architecture review found the critical defects of the original design: the proof condition reachable from the agent side, agents writing the record directly, one owner accepting its own fix, and replays that skipped authorization. Thirteen design changes fixed them. A review of the original epic backlog found it sliced by component, with its minimum viable product depending on 15 epics. The work was re-sliced into a story map along the loop's steps, then into small work units, each one step of fidelity at one step of the loop with a check that runs, so organizations can batch them however they release. Ownership questions (where the checking team reports, who runs runtime testing, who promotes agents) were never answered with one organization's specifics: they were modeled as 64 ownership combinations, which showed that ownership never changes the plan's structure, changes coordination cost, and in two combinations breaks separation of duties.

<a id="a2-every-claim-was-graded-and-every"></a>
## Every claim was graded, and every number re-checked

An evidence pass inventoried the claims the design rests on (50 in this edition's ledger) and graded each: verdict, strength, what would prove it wrong, and which work unit's data would show it in the organization's own systems. Targeted literature reviews ran only where a result could change a verdict. Every cited number was re-verified against its source; four needed rewording, none was wrong. The design's authors ran this pass with AI research assistance and structured AI debates; no party independent of the authors has graded the claims yet, so the grades are the authors' own reading of the evidence. The pass forced five design changes, all applied: quarantining attacker-writable lead text, a core loop with pluggable modules, a dial register with floors, an investment order with enforced paved-road entries, and a degradation ladder for model providers.

<a id="a2-a-reliability-review-checked-that-the"></a>
## A reliability review checked that the design can run

An architecture and reliability review produced 18 findings, among them three fail-closed controls placed on the agent side of the boundary and a deploy gate that could not meet its target as composed. All were applied: the model-boundary gates moved into the control zone with their own administrators, privileged access and key management became parts, the deploy gate now answers from the execution cell alone, and path availability is worked out from part defaults and stated honestly where it falls short.

<a id="a2-later-work-extended-the-design-without"></a>
## Later work extended the design without changing its spine

Four extensions followed: a public cloud overlay for AWS that makes the account boundary carry the four rules; typed decision models, admitted as advisory routes qualified per decision type, with a model check that keeps their answers out of every decision; safety rules recast as should-nevers with recorded exceptions and trade-off cards by role; and progressive adoption, where each profile section belongs to the first phase that needs it.

<a id="a2-every-claim-about-the-design-is"></a>
## Every claim about the design is checked by the build

The model is checked on every change: structure and coverage, the lethal-trifecta combination, quarantine of untrusted text, a model-free control plane, deterministic model-boundary gates, advisory-only model judgments, and control placement. Profiles are checked against every should-never rule and consistency check, with planted violations confirming that each check catches what it claims to. The work plan is checked for missing capabilities and cycles. This edition is generated from the same model, so its counts and tables cannot drift from what the checks passed.
