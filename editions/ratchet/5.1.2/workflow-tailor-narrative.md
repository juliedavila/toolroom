# Tailor the narrative

Rewrite the six-page narrative for the organization's own people, so it argues from their facts.

Follow Appendix E of `six-pager.md` (the field guide): what stays fixed, the premise register, the opening branches, the tailoring steps, and what to hand back. In short:

1. Start from the current-practice map and the profile. The profile has no field for a sweep with an AI model: record its date, scope and yield in the map's notes and in premise 1's row of the ledger.
2. Set each premise to validated, assumed, contradicted or unknown in `org/premise-ledger.md`, with its evidence, source, confirmer and date.
3. Choose the opening branch the strongest premises support. A branch chooses which truth leads Part I and where the weight falls; no section leaves its part. Choose branch F (the backlog was swept) when a sweep ran and the open backlog fell after it, and say so with the organization's own figures; no fixed size makes a backlog small.
4. Rewrite only where a premise is validated or contradicted. Keep the generic text, marked as not yet validated here, everywhere else. Branch F may open on a validated sweep while its decay (CL-48) is still unvalidated; the decay then keeps the generic text and its mark.
5. Tell phase 1 from the source the profile records in `phase_1_boundary`. If the sweep supplies a better first weakness, change the profile first, because the source decides how phase 1 stays safe.
6. Keep the four rules, the evidence grades, the stop conditions and the disclosure of who graded the evidence. Name every exception and every accepted organization patch that changes what the story says.
7. Write it as the presenting team's own argument, and follow the organization's disclosure rules: a tailored narrative usually stays inside the organization.
8. Rebuild table APX-2.1 (today's practices by phase) from the current-practice map: one row per practice the organization runs, with the step codes where it enters. Each practice keeps the cited phase cells of the generic row it corresponds to; a practice with no such row gets "no change" in every phase unless one of the organization's patches gives it a role. Drop generic rows it does not run.
   - **Step codes.** A practice enters at each step of `current_practice.steps` (STEP-1 to STEP-12) whose evidence or note names it. The map's steps are the only source: `existing_tools` in the profile is keyed by seam and `tools.existing` names no step. Add a practice the map does not mention yet to the map first, with its confirmer, and then to the table. When the map has no `steps` yet, map them first (`workflow-map-current-practice.md`), with confirmers; until then the row's step codes are open, and the hand-back lists them as an open question.
   - **Cells and citations.** Take each kept cell with its citations from the full table in part 2 (`02-the-plan.md`). The six-pager's compact table carries no citations, and the hand-back needs the citation behind each cell.
   - **A practice that fits two generic rows.** Give it one row per role it plays, each keeping that generic row's cells. For example, an LLM code scanner run by the red team takes the row "LLM-driven and agentic scanning of code and infrastructure" for its scanning and the row "Penetration tests and red team engagements" for the engagements it feeds, and a SOC that also runs incident reviews takes "SOC detection and monitoring" and "Incident reviews". Name each row for the practice and the role.
   - **An organization patch that changes a part a row cites.** Re-run the practices check on the compiled design, the model, layer and unit changes from `workflow-change-design.md` (Check it): every cited unit, part, module and rule still exists there, a unit cited in a phase belongs to that phase, and a cell reads "no change" exactly when it cites nothing. Then read each cell that cites the changed part against the part's responsibility as the patch leaves it, rewrite the cell where the patch changes what it says, and cite the patch beside the part. Run the check again after every accepted patch and every upgrade.
   - **A unit the organization changes.** An `add` or `modify` in `org/units.yaml` that touches a cited unit changes the cell the same way: read the cell against the unit as the units file leaves it (its `check`, phase and parts), rewrite it where its meaning changed, and cite the units file beside the unit (for example "U-205, as modified in `org/units.yaml`"). A `remove` of a cited unit takes the citation out, and a cell left citing nothing reads "no change".

Hand back the tailored narrative, the premise ledger, the open questions with who must answer them, and the list of exceptions and patches it reflects.

## The strategy brief

`strategy-brief.md` is the same argument in two pages and two exhibits, for the executive who sponsors the work, stated as a set of choices. Tailor it after the narrative, from the same premise ledger, following its appendix on tailoring:

1. Replace the generic figures with the organization's own: for the opening, the backlog and escapes from the current-practice map for a backlog organization, or for a swept one the sweep's date, scope and yield and what has been reintroduced or newly found since; then each team's fix cap and the sponsor's default, the phase 1 weakness and the people named for it, the time allocated, and the sponsor's thresholds once they are set.
2. Keep the diagnosis bullet for the organization's starting point, marked as not yet validated here where its premise is unvalidated, and drop the other one.
3. Keep every stop condition, the "what we will not do" line, the three ruled-out moves and the four rules. A looser or missing stop condition is an exception: name it, who accepted it and when it expires.
4. Fill each choice from the organization's facts. Where to play is the most organization-specific choice: name the services, teams and starting point from the current-practice map and the profile. What the organization keeps comes from the map's gaps (what exists, and what phase 1 stands in for by hand). The management systems come from the profile: fix caps, thresholds and review cadence.
5. Fill Exhibit 2 (what would have to be true) from the premise ledger: each bet's local status beside its published grade, never raising it.
6. Before sponsor approval, fill in setup effort, estimated hours per role and calendar span, the review date, every duty’s named person, practice target or real finding, existing tools against each required control (including audit-before-action and abort on audit loss), and the owning team’s fix capacity or the decision owner’s default cap. Record gaps, stand-ins and accepted exceptions, then revise effort estimates. The sponsor approves this tailored brief before work starts. Keep it to two pages that end on the ask.

Hand back the tailored brief beside the tailored narrative, with each replaced figure's source and confirmer.

## The tailored set keeps three depths, and each depth has one job

The organization's people read the argument at three depths, and each has one job. The strategy brief, for the sponsor who decides, states the strategy as a set of choices, each with what it rules out (Playing to Win's cascade: what winning means, where to play, how to win, what capabilities and management systems it takes). The six-pager, for the directors who back and staff the work, earns their buy-in by moving from what is true, to what we want, to what we will do about it, in that order. The reference, for the people who build and run it, holds the building blocks, their settings and their wiring. Each depth points to the next one down. Tailor all three from one premise ledger, so a figure or a premise reads the same at every depth.

Nothing strategic lives only in the reference: a choice, a truth or a stop that matters to the sponsor or the directors appears in their document too. Each shorter depth carries forward unchanged the claims and their grades, the four rules, the asymmetric suspicion sentence, the stop conditions and phase 1's size; the last two are generated from the plan in the shipped set, so take them from the organization's profile and plan, once, and use the same words at every depth.

### The brief puts the crux first and ends on the ask

Keep the shipped order. The generic edition opens with its tailoring notice. In the sponsor’s tailored brief, replace that notice with the filled-in effort, dates, named duties, target, tools and fix capacity beside the bounded phase 1 recommendation; then state the situation and diagnosis. Then the diagnosis, and the choice cascade: what winning means and how it is scored; where we play and the three moves we rule out; how we win (the loop, the four rules named in one line, the "what we will not do" line, then the asymmetric suspicion sentence); what we keep and how we run the work (booked fix capacity, claims graded in the open). Then the phase road as one row with phase 1 marked as the decision today, and last the ask and the stop conditions. Every heading states a choice, as an assertion. The pointers name the part of the tailored six-pager that holds the depth. The reading stays at two pages plus the exhibits: the loop, and what would have to be true.

### The six-pager moves from what is true, to what we want, to what we will do

Keep the shipped order, in three parts. Part I, what is true: the current state, the illustration, what AI agents change, the numbered truths with their grades, and the method story of how they were tested. Part II, what we want: the North Star and its measures, then the regimes. Part III, what we will do about it: the loop and its four rules with the asymmetric suspicion sentence, the rejected paths, the plan with the phase road inline and the "What backing phase 1 commits you to" block closing it, the closing scene and the "going deeper" map. Truths come first on purpose, so a reader accepts them before the desired state reads as earned; do not reorder to Dalio's want-first loop. The premise register drives Part I: validated premises are told as the organization's truths, and assumed or unknown ones keep the generic text with the "not yet validated here" mark. The truths list holds only premises from the ledger, each with its grade and status. The opening branch you chose decides which truth leads Part I; no section moves out of its part. Appendix A puts the directors' diagrams first (the loop, the phases with table APX-2.1, what an outage means) and the builders' after them (the control boundary, the planes, the provider ladder). Questions, evidence and the market comparison follow as appendices for depth. Point the "going deeper" map at the edition's reference files and at the organization's own workspace files where it has them. The field guide and the brief's tailoring appendix are instructions to you: leave them out of what the organization's people read, and hand back the premise ledger beside the set.

### The reference starts builders at their own building-block index, and part 1 carries the strategy forward

The reference catalogs come from the design and stay as shipped. The organization's own depth is its building-block index plus its profile and its patches in `build/` and `org/`. Regenerate reference R0 from the organization's compiled model and layer in `build/`, using the joins R0's opening paragraphs state, so every core block and enabled module lists the parts, rules, contracts and units of the organization's design, its own patches included. Beside each profile field and dial a block names, give the organization's answer from its profile, or mark the field as open. Point the organization's builders at that index first, then part 4, then R2, R3 and the profile. If you write a start page for the organization, open it with a table of readers (sponsor, director, builder, the people running a phase, an agent) and the file each reads first. In any retelling of part 1, keep its order: the trace table from the brief's choices and the six-pager's truths to where each is argued, the plan at a glance, the problem, the loop and its rules, then the claims and their evidence. Rebuild the trace table from the tailored brief's headings and the tailored six-pager's truths list.

### The structure is fixed, the facts are the organization's, and some passages never drop

- **Keep fixed:** each depth's job and order, the pointers between depths, the assertion headings (rewritten only where a premise changes what they assert), and the twelve steps of the loop.
- **Adapt to the organization:** figures, names of teams, tools and roles, the opening branch, the phase 1 source, the practices in table APX-2.1, durations once the sponsor has written them, and the thresholds once set.
- **Never drop:** the stop conditions, phase 1's size, the four rules and the asymmetric suspicion sentence, the honest-bet grades with the count of claims that hold and that are bets, the disclosure of who graded the evidence, and the "what we will not do" line. A looser or missing stop condition, or an exception to a rule, is named in the text with who accepted it and when it expires.

## Headings state assertions, and the set names the thesis version it adapts

Every heading states the claim its section supports, in a sentence a reader could disagree with. When a premise is validated or contradicted, rewrite the heading to the organization's claim; otherwise keep the shipped heading. The thesis claim itself stays as shipped at every depth; the tailored set adapts its premises, figures and emphasis around it.

Every edition states the thesis version it builds on; this one builds on Thesis 1.1. Record in each tailored document's front matter the thesis version it adapts, beside the edition and the organization's version from `org/version.yaml`, and the date of the premise ledger it was tailored from. Record the released version as a tagged release prints it (`thesis: "1.1"`), never a draft label: a build that is not a tagged release prints "1.1-draft", which names no released thesis. If you tailored from a draft build, check the version again once the edition is released, against the thesis changelog in `CHANGELOG.md`, and correct the front matter if it moved. When a new edition carries a new thesis version, read the thesis's own changelog and re-tailor:

- **A minor version** changes a premise or its evidence. Re-tailor at the set's next revision: re-check each changed premise row in the ledger and each changed grade.
- **A major version** changes the claim. Re-tailor before the set is shown to anyone again.
- **A patch version** changes wording only. Nothing needs re-tailoring.

## Each figure is kept, adapted or dropped, and design figures come from the organization's own model

The edition has two kinds of figure. Design figures show the design and are checked against the model before they are drawn, so a missing edge, a moved module or an arrow that should not exist stops the build. Illustrative figures show the shape of the argument with no data behind them, and say so on their face. Treat each kind by its own rules.

Every figure has a stable id (FIG-...), and the text cites it by that id. `FIGURES.md` gives each figure's source for agents: its Mermaid, a Mermaid equivalent of an SVG figure, or a structured description where Mermaid cannot carry the shape. Keep each id on the figure it names in the tailored set, cite it where the tailored text points at the figure, and regenerate the source beside the figure when you adapt one.

| Figure | Where it ships | Kind | What to do |
|---|---|---|---|
| The loop by actor (FIG-LOOP) | Six-pager APX-1, the brief's exhibit, part 1 | Design | Keep in all three places from one copy, so they cannot disagree. Keep the twelve steps, the four who-acts colors, the legend and the dashed tooth arrow. Adapt only where an accepted patch or a recorded exception changes who acts at a step: recolor that step with the figure builder's `actor` option and cite the patch or exception in the caption. The builder refuses the agent at any step but step 3. |
| The control boundary (FIG-CONTROL-BOUNDARY) | Six-pager APX-3, part 4 | Design | Build with the figure builder from the compiled model. The figure holds only while its path exists (the agent proposes, a person approves, authorization grants, the cell runs and records its receipt) and while no relationship runs from an agent or the model route to the execution cell. If the compiled model has such a relationship, it breaks rule 1 unless a recorded exception covers it: name the exception with the builder's `exception` option, which draws it, and cite it in the caption, or report the defect. |
| The planes map (FIG-PLANES) | Six-pager APX-4, part 4 | Design | Build with the figure builder from the compiled model and layer: plane membership comes from the realization layer, relationships from the model. Each primary flow is drawn only while the compiled model holds a relationship behind it, and the organization's own parts count in the plane its patches put them in. |
| The provider ladder (FIG-PROVIDER-LADDER) | Six-pager APX-6 | Design | Build with the figure builder and the profile, which adapts it to `ai_resilience`: drop the self-hosted step when `self_hosting_capacity` is none, and name each agent's lowest step from `producer_rungs`. The bar under every step stays: the control plane uses no model at any step. |
| The phase road | The brief (one row), the six-pager's plan section, part 2 | Design | Keep its rows (the claim, the duration, the reach, the gate, the way out) and the North Star column. Name phase 1's reach from `phase_1_boundary`. Durations stay labeled estimates until the sponsor writes the plan in weeks; then use those weeks. Gates and ways out keep their meaning; a looser one is an exception. |
| The practices exhibit | Six-pager APX-2.1, part 2 | Design | Rebuild it from the current-practice map as the steps above describe, with the citation behind each cell. |
| The sweep against the loop (FIG-SWEEP-LOOP) | Part 1, the six-pager's regimes in Part II | Illustrative | Keep for branch F, where it carries the sweep's decay; keep or drop for a backlog organization. Never add values or the organization's data to it. |
| What would have to be true (the brief's Exhibit 2) | The brief | Data table | Rebuild it from the premise ledger and the evidence ledger: each bet's published grade, its local status beside it, and the phase that settles it. Never raise a grade, and never draw it as an illustrative figure. |
| Escape against catch (FIG-ESCAPE-CATCH) | Part 1, the six-pager's closing scene | Illustrative | Keep while the invoice scene stays. When premise 3 replaces the invoice with the organization's own weakness class, change the timeline's labels to match, still marked illustrative. |
| The core and its plug points (FIG-CORE-MODULES) | Part 1, six-pager APX-4 | Illustrative | Adapt the modules to the ones the organization switches on and the ones its patches add, each in its category. Keep the switch-on line for each module. |
| Every part by plane, zone and tier (FIG-PART-MAP) | Reference R2 | Design, for agents | Build with the figure builder from the compiled model and layer for the organization's agents and builders. It is too dense to read as an image; leave it out of the brief and the six-pager. |

### Design figures are regenerated from the compiled model, with the same checks

Redrawing a design figure by hand lets it drift from the design the first time a patch lands. Run the patch applier with its layer option, so the compiled model and layer in `build/` hold the organization's design. Then run the figure builder (`spec-figure-builder.md`) on them, with the profile, an `exception` option for each recorded exception the control boundary must show, and an `actor` option for each step an accepted patch or exception gives to someone else. It builds the five design figures in the table above that carry an id, the same figures the edition ships, under the same ids, with the model's own ids as node ids, so the organization's agents can cite a figure and join it to the design by id. Use its output as the figure; never edit it by hand. The edition's own design figures are this builder's output on the shipped design.

The builder checks each figure before writing it: every relationship it draws exists in the compiled model, the path it shows as absent is absent, and each part sits in the zone and plane it is drawn in. When a check fails, that figure is not written and the message names what changed; read it as a finding about the design before touching the figure. A warning names each recolored step and each exception drawn: cite the patch or exception in the caption. Regenerate after every accepted patch and every upgrade, beside the practices check. The phase road and the practices exhibit are tables, rebuilt as the table above says, and the illustrative figures stay hand-shaped.

### The who-acts colors and the legend stay

The loop diagram's colors mean one thing each: the agent, which only proposes; a person; a control outside the agent; the owning team. Keep the four colors, the legend and the line that says the agent acts only at step 3, and only to propose. Reuse the same colors for the same actors in any figure the organization adds, so a reader learns them once.

### Illustrative figures stay illustrative, and data figures cite their source

Keep the "illustrative" mark on the face of each illustrative figure and in its caption. Never add numbers, axes with values or the organization's data to one. When the organization has its own data worth a figure, such as its open backlog before and after a sweep, draw a separate data figure: name the source and the date of the data in its caption, and the person who confirmed it in the premise ledger.

### Check every figure at real print size, and print with the light theme

Look at each figure on the printed page or in the PDF at the size it will be read, one region at a time. A wide flowchart that looks fine on a screen can print too small to read. A page that follows the system theme prints dark diagram backgrounds from a machine in dark mode, so set the light theme before printing. Code spans can break mid-word in a printed table; use plain words there.

### The site and the presentation follow the presentation workflow

Which page each reader sees first, which figure carries which argument, and the static site the organization hosts on its own Pages are in `workflow-present.md`. Run it after this checklist passes: the site shows the tailored set as it stands and changes none of its text.

### Mermaid suits small flows, and generated SVG suits wide or exact figures

Mermaid lays out its own figure, which suits a small flow such as the loop. It handles badly a figure that must route one highlighted path across zones, a stepped ladder, or a ring with plug points, and a flowchart with many columns prints too small. Draw those as generated SVG. Inline SVG reads in a plain Markdown viewer when its colors carry light values as fallbacks, and several figures on one page need their own marker ids so they do not clash. Give every figure a text description of what it shows, so an agent reading the Markdown and a reader using assistive technology get the same content. Where a table carries the content, as the phase road and the practices exhibit do, prefer the table: it prints legibly and carries into the Markdown agents read.

## Quality debt and debt-service capacity sit where the shipped set puts them

Quality debt is the verified, unfixed shortfall against the claims a team makes for every quality it answers for, all paid from one engineering pool; security debt is the security share. Debt-service capacity is the engineering time an owning team has for paying down quality debt of every kind, and its fix cap is security's agreed share of it.

- **The brief:** with the fix caps, in the section on what we keep and how we run the work, at the length the shipped brief gives it.
- **The six-pager:** in Part I's "what AI agents change", where findings past what a team can fix add interest without reducing risk; in Part II's regimes, which trace security debt; and in Part III's rejected paths, where the fix cap is security's share of each team's debt-service capacity. Premise 18 checks it against the organization (CL-49, an honest bet).
- **The reference:** part 1's account of fix capacity, the fix-capacity risk in part 2, and the glossary.

Where the owning teams already measure time lost to technical debt or other quality debt, quote it beside the security figure, attributed. The profile field and the term "fix cap" keep their names.

## The tailored set reads clearly to someone outside the program

The sponsor and most directors are not security specialists, and many readers meet the set cold, forwarded by someone else. Write every depth so a capable engineer or executive from outside the security program understands it on one read.

### Plain words carry the argument

- **Use the words the organization's engineers already use.** DevOps, SRE, CI/CD and DORA vocabulary reads without translation; process-improvement jargon and security-team shorthand do not.
- **Define a term where it first appears,** in a clause, not a footnote: "a proof condition, the expected result an independent reviewer holds back from the testing agent".
- **Spell out an acronym at first use,** and drop it if it appears only once.
- **Name things by what they are.** Internal codes (rule numbers, claim ids, unit ids, figure ids, phase codes) never stand in for the thing in prose a person reads. Write "the rule that a proposal is never permission (rule 1)", with the code in parentheses at most. Codes belong in tables, in references for agents, and in the premise ledger.
- **Figure ids go in captions and references, never as a sentence's subject.** Each figure's caption opens with its id, a sentence that points at a figure names it and adds the id ("the loop, FIG-LOOP" or "the loop (FIG-LOOP)"), and files for agents use the id alone. Write "In the loop (FIG-LOOP), the first six steps...", never "FIG-LOOP shows...". This is how the text cites a figure by its id, as the figures section above asks.
- **Keep the organization's own names** for its teams, tools and systems, so a reader recognizes them.

### Every sentence survives a single read

- **One idea per sentence** where the idea is hard. Long sentences are fine when each clause is easy.
- **The second-read test:** reread each paragraph as the outside reader. Any sentence they would need to read twice gets restructured: split it, reorder it so the subject and verb come early, or replace the abstract noun with the person who acts. Do not fix it by swapping in simpler synonyms; restructure it.
- **Concrete over abstract.** An example from the organization's own work, such as the weakness class it fixed last quarter, beats a general statement.
- **Avoid rhetorical patterns that read as filler:** stacked contrasts ("not this, but that"), rhetorical questions, lists of three where there are two real items, and closing sentences that only restate the paragraph.

### Numbers and claims stay honest

- **Every number names its source and date** in the text or the caption, and rounds down rather than up ("over six and a half", never "nearly seven").
- **Keep each premise's evidence grade visible.** A premise graded as untested reads as untested in the tailored text, never as settled.
- **Separate what the organization measured from what it assumes,** in the sentence itself: "our scanner logs show", against "we expect".

### Test the set on a cold reader before it ships

Give the brief to a reader with no context on the program (a colleague outside security, or a fresh agent session that has not seen the edition) and ask them three questions: what is being asked for, what it costs, and what would stop it. If their answers differ from the brief's ask, its cost and its stop conditions, rewrite the sections they misread, then test again, until one cold read matches all three. Do the same for the six-pager with a director outside the program. The cold read tests a whole document, because its three questions are about the whole argument. For a single passage you rewrote, such as one paragraph of an otherwise shipped section, use the second-read test above instead, and cold-read the whole document again before the set ships.

## Markdown written for an agent states its scope and its done-condition

Some of what the organization writes is read by an agent: a workflow note, a specification for a tool of its own, a hand-back for the next session. That agent may be a mid-tier model, and mid-tier models apply a rule only to what the rule names. Write each such file so any tier reads it the same way.

| Write | Because |
|---|---|
| The scope of every rule, by name: "every section in `readiness.yaml`", "each open item in the ledger" | A rule stated for one item is applied to that item alone |
| A threshold a checker can apply: "any finding that changes a phase's exit test" | A qualitative bar ("important", "significant") is read strictly or guessed |
| For each specification or workflow: its inputs, its outputs, and the condition that means done, such as "done when every fixture passes and the report is written" | The done-condition is the agent's check on its own work |
| Every step the work needs, stated in the file | The agent's harness, and any system prompt the organization enforces, may differ from the author's; a file that relies on harness defaults behaves differently under each |
| A table keyed by the deciding value, where a rule has more than two branches | Long conditionals are the instructions agents drop most often |
| Each rule once, in plain words, with its reason in one clause | Capitals, "always", "be thorough", "double-check" and "think carefully" were written to push older models; on current ones they cause over-checking, and an instruction to write out reasoning can be refused |

A fixture or a script that checks the result replaces any sentence asking the agent to check its work.

## Run this checklist before the set goes to the sponsor

1. Each depth keeps its shipped job and order, and every pointer lands on a section of the tailored set or a file that exists.
   - Each brief section states a choice and what it rules out.
   - The six-pager's Part I holds only premises from the ledger, each with its status and grade.
   - The stops, the four rules and phase 1's size read identically at all three depths.
2. Every heading states an assertion, and the claim reads as shipped.
3. Each document's front matter names the thesis version, the edition, the organization's version and the premise ledger's date.
4. The stop conditions, the four rules, the honest-bet grades with their counts, the "what we will not do" line and the disclosure of who graded are all present; every exception and looser condition is named with its acceptor and expiry.
5. Every organization figure in the text has a source and a confirmer in the ledger; every unvalidated premise is marked as not yet validated here.
6. Every design figure is the figure builder's output on the current compiled model and layer, built after the last accepted patch with no error, and every warning it gave is cited in that figure's caption.
7. Every illustrative figure carries its mark and no numbers; every data figure names its source and date.
8. Every figure was checked at print size, and the print copy uses the light theme.
9. The field guide and the tailoring appendix are out of what the people read, and the set follows the organization's disclosure rules.
10. Every depth passed a cold read by someone outside the program, and no sentence fails the second-read test.
11. If the set is going on a site, `workflow-present.md` comes next, and its checks pass before anyone sees the site.
