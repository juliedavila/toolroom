<a id="start-here"></a>
# Ratchet: start here

*Ratchet: closed-loop security validation for AI-assisted engineering. Start here. Edition 5.1.2, Thesis 1.4.2, 2026-10-30, build 13fabeae+local.*

Draft editions are for evaluation only. Use a released edition for adoption. Read the edition record for released status.

The edition version is the bare `version` in `edition.yaml`, 5.1.2 for this edition. Its `released` field states whether it is a release or a draft. A reading copy's `-draft` label describes status and is never added to the organization's upstream version. Follow `workflow-start.md` for the workspace root, pinned Jig verification, owner bindings and dated seam exception before the first organization run. `workflow-build-tools.md` identifies the tools each step needs. A profile is checked by the profile checker, including its module entry evidence.

<a id="start-here-each-reader-has-a-different-first"></a>
## Each reader has a different first file

| If you are | Start with | Then |
|---|---|---|
| An executive sponsor deciding whether to back phase 1, the first of five phases | strategy-brief.md | six-pager.md |
| A director deciding whether to back phase 1 | six-pager.md, the recommended entry before parts 1 to 4 | 02-the-plan.md for the five phases, their stop conditions and the phase card, a summary of how each phase is entered, reviewed and staffed |
| A builder | R0-building-blocks.md, then 04-architecture.md | R2, R3 and profile-template.yaml |
| An adopter fitting Ratchet to one organization | 03-in-practice.md | R1, then profile-template.yaml |
| An agent | SKILL.md | the files SKILL.md names for the task |

Part 2 (02-the-plan.md) sets out the five phases. The rules and readiness reference (R1) says which sections of the profile each phase needs; the profile is the file where an organization records its own tools, owners and choices. The work-unit reference (R4) lists the work units in each phase, the small, checkable pieces of work that build it.

<a id="start-here-four-rules-carry-the-design-and"></a>
## Four rules carry the design, and every safety rule is a should-never

AI agents propose security tests, and a proposal is never permission: people approve each exact action outside the agent. Each result is validated and reproduced independently, against a proof condition kept out of the testing agent's reach. Fixes are retested in the deployed system and kept by a regression test so they cannot slip back. Four rules carry the design: the agent cannot give itself permission to run a test; the testing agent cannot read the answer it will be judged against; the agent's report alone cannot establish a finding; and acceptance is independent: the human test operator submitting the agent's proposal cannot accept its result. Each rule has a trade-off card in R1, which sets out what the rule protects, what each role gains and carries, and the legitimate reasons for an exception. Every safety rule is a should-never: an organization may make an exception to one only as a recorded, expiring decision by named risk owners.

Ratchet's design is itself written as a machine-readable model, the **design model**: its parts, the roles people hold, the connections between parts and the records each connection may carry. Automated checks test the design model, and the reference catalogs are generated from it. Parts 1 to 4 call each of those checks a design check, to keep it apart from the AI models the agents run on.

The design's safety rests on strong evidence. The value case for agents in a large enterprise is an honest bet, a claim the design acts on before the evidence settles it, and the phases settle it in the organization's own data.

<a id="start-here-how-this-edition-is-organized"></a>
## How this edition is organized

- **Main (parts 1 to 4):** the thesis, the plan, the plan in practice, and the architecture with its diagrams. Read these.
- **Reference (R0 to R6, and the profile template):** complete catalogs for agents, generated from the checked design model.
- **Annex (A1 to A6):** background research, method, the decision log, the market comparison, the standards crosswalk and a proposed method for threat modeling Ratchet from its own design, for context.

The reference catalogs are large, which matters when choosing what to load. The design model holds 135 parts (components, each with one job) and 15 roles that people hold, 150 elements in all. The core loop is 90 parts and 11 roles (101 elements); 5 optional modules hold the remaining 45 parts and 4 roles. The plan has 318 work units across five phases, and the reference lists 138 failure scenarios the design anticipates and 57 should-never rule codes grouped in 11 trade-off cards.

| File | What it holds |
|---|---|
| six-pager.md | For people: the six-page narrative with appendices for the key diagrams, system design, expected questions and evidence, plus a field guide for agents tailoring the story to one organization |
| strategy-brief.md | For an executive sponsor: about two and a half pages and one exhibit that end on the decision and the stop conditions, plus a guide for agents tailoring the brief to one organization |
| 01-thesis.md | The strategy, carried forward from the brief and the six-pager: where every choice and truth that the brief and the six-pager state is argued in depth, then the outcome sought, the problem, what holds and what is a bet, the approach and its four rules |
| 02-the-plan.md | How to get there: work units, the five phases, alternatives weighed, risks and stop conditions |
| 03-in-practice.md | Adopting progressively, should-never rules and exceptions, roles, and how the loop compounds and degrades |
| 04-architecture.md | Planes, trust zones, core and modules, how controls fail, the key diagrams, AWS in brief |
| R0-building-blocks.md | Where a builder starts: every core block and module with its parts, rules, profile fields, dials (adjustable settings), contracts (what each connection may carry), switch-on evidence (what must exist before a module is turned on), the units that build it and its AWS candidates |
| R1-rules-and-readiness.md | Readiness by phase, how to check a profile, exceptions, every rule code and card, the interview |
| R2-parts.md | Every part, role, separation and contract, with the full part and failure-behavior maps |
| R3-quality-and-failures.md | Quality tiers, critical paths, what each gate does when it is down, dials, service levels, metrics, failure scenarios, invariants |
| R4-work-units.md | The steps of the loop, the phases and every work unit with its check and dependencies |
| R5-aws-overlay.md | Candidate AWS services per part and what the organization keeps |
| R6-glossary-and-codes.md | Terms and ID families |
| profile-template.yaml | A commented starter profile to fill progressively |
| A1-background-and-research.md | Where the design came from, the evidence review and the full evidence ledger |
| A2-method.md | How the design was produced |
| A3-decision-log.md | The decisions that shaped it, with alternatives |
| A4-landscape.md | How Ratchet compares with the market, weighted by the strength of each system's evidence |
| A5-standards-crosswalk.md | Where Ratchet's units, parts, rules and failure scenarios meet SSDF, SAMM, BSIMM, the AI RMF, SSVC, ATLAS, OWASP's LLM and agentic lists and MAESTRO |
| A6-threat-model.md | A proposed method for threat modeling Ratchet from its own design: the generated grids of STRIDE threats and of unsafe control actions (STPA's term for a command that causes a loss in a given context), how candidates are judged, encoded and graded |
| FIGURES.md | Every figure's stable id, where it appears and its source for agents: Mermaid, a Mermaid equivalent of each SVG figure, or a structured description |
| CHANGELOG.md | What changed in each edition, with renamed identifiers to apply and what an agent holding an earlier edition should do |

In this skill folder the edition's files sit beside the skill's own: `SKILL.md`, the workflows, the tool specifications, the design data and the acceptance fixtures. `SKILL.md` says what each is for.

To show the tailored set to the organization's executives, follow `workflow-present.md`: it says what the sponsor sees first, which figure carries which argument, and how to build and check a static site the organization hosts on its own Pages.

<a id="start-here-cite-an-edition-by-its-versions"></a>
## Cite an edition by its versions and its tagged packet

Cite Ratchet by its edition and thesis versions together, edition first, here "Ratchet 5.1.2, thesis 1.4.2". Also cite the reading packet tagged for that edition, the set of files released with it; each of its files carries the edition in its name. Never cite the link to the live pages: it always shows the latest edition. A build that is not a tagged release labels its versions as drafts, as in 5.1.2-draft; cite a draft only as a draft.

<a id="start-here-using-it-with-an-agent"></a>
## Using it with an agent

A filled profile names crown jewels, teams and tools, so keep it inside the organization. Nothing in this edition asks an agent to send it anywhere.

Give an agent this folder as a skill, starting at `SKILL.md` and `workflow-start.md`, then part 3, R1, R2 and `profile-template.yaml`. Ask it to help the organization fill the profile from its own sources, report which phase the answers support, list the questions that block the next one with who must confirm each, and flag any should-never rule a choice would break, with that rule's trade-off card. Exceptions stay decisions for the named risk owners. The agent prepares the conversation, and it records an acceptance only when the person accepting has actually given it.
