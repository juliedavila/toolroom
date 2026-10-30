# Present the set to the organization

Show the tailored set to the organization's people and its executives so each reader reaches their decision with the fewest pages, and host it as a static site on the organization's own Pages.

**Scope.** This workflow covers how the tailored strategy brief, six-pager and reference are arranged, which figure goes where, what an executive sees first, accessibility and print, what stays off a shared page, and the static site that carries all of it. It changes no wording of the set: `workflow-tailor-narrative.md` owns the text and the figures themselves.

**Inputs.** The tailored set in `build/` (the brief, the six-pager, the reference files and `FIGURES.md`, under the shipped file names), the figure builder's output folder for it (each design figure as Mermaid and as SVG), and the organization's disclosure rules.

**Outputs.** A static site in `build/site/`, and a note in `org/decision-log.md` naming who cleared it for its audience and where it is hosted.

**Done when** every check in "Run these checks before anyone sees the site" passes and the person who clears disclosure has signed off in the decision log.

## Each page has one reader and one job

The three documents keep the jobs they have in the set. The site adds one page in front of them: the decision itself.

| Page | Reader | Its one job | Built from | Leave out |
|---|---|---|---|---|
| `index.html` | The sponsor | Make the one decision: approve phase 1 with its stop conditions | The brief's opening, its ask section with the stops, and its loop exhibit | Everything else; the cards at the bottom lead deeper |
| `brief.html` | The sponsor, and anyone briefing the sponsor | State the strategy as choices, each with what it rules out | The tailored brief | The brief's tailoring appendix |
| `six-pager.html` | Directors who back and staff the work | Earn buy-in: what is true, what we want, what we will do | The tailored six-pager | The field guide for agents (Appendix E) |
| `reference.html` | Builders, the people running a phase, agents | Find the building block, its settings and its wiring | The start-here page, then a list of every page | Nothing |
| one page per part, reference part and annex | Builders and agents | Hold the detail the pointers in the brief and six-pager land on | Each file of the set | Nothing |

Keep one page per file of the set, so every pointer in the text ("six-pager, Part III", "reference R2") lands on a page that exists. Never merge the three depths into one long page: the sponsor stops reading at the first screen that does not concern the decision.

## The executive sees the decision first, then the loop, then the way deeper

The first screen of `index.html` holds, in this order and nothing else:

1. The brief's title, which states the claim.
2. The opening paragraph: situation, complication, recommendation, with the North Star sentence in bold.
3. The decision box: what is asked, of whom, by when, what it costs, and the stop conditions written before work begins.

Below it comes the loop (FIG-LOOP) with its lead paragraph, then three cards, one per depth, each naming its reader and its job.

| Put on the first screen | Keep off the first screen |
|---|---|
| The one decision and its stops | Metrics, scores or counts that are not part of the ask |
| The cost in people and weeks, as the brief states it | The part map, the planes or any figure an executive cannot read in ten seconds |
| A link to the brief for the reasoning | Logos, vendor names, a market comparison |

The executive path has three stops at most: the decision page, the brief, and the six-pager's plan section with the phase road. Every link on the decision page leads to one of those three.

## Each argument has one carrying figure

A figure goes beside the argument it carries and nowhere else. The caption opens with the figure's id and states what the reader should conclude.

| Argument | Carrying figure | Where it appears | Reader |
|---|---|---|---|
| Authority stays outside the agent at every step | The loop (FIG-LOOP) | Decision page, brief exhibit, six-pager APX-1, part 1 | Everyone |
| The agent has no path to the systems it tests | The control boundary (FIG-CONTROL-BOUNDARY) | Six-pager APX-3, part 4 | Directors, builders |
| A kept test stops a fixed weakness from returning | Escape against catch (FIG-ESCAPE-CATCH), illustrative | Six-pager closing, part 1 | Directors |
| A sweep decays without a loop | The sweep against the loop (FIG-SWEEP-LOOP), illustrative | Six-pager regimes, part 1 | Directors, for a swept organization |
| The work starts small and widens only on evidence | The phase road, as a table | Brief, six-pager plan, part 2 | Everyone |
| The bets are named and each phase tests one | What would have to be true, as a table | Brief Exhibit 2 | Sponsor |
| Losing a model provider degrades the loop in steps | The provider ladder (FIG-PROVIDER-LADDER) | Six-pager APX-6 | Directors, builders |
| Existing tools plug in as modules | The core and its plug points (FIG-CORE-MODULES), illustrative | Six-pager APX-4, part 1 | Directors |
| How the planes connect | The planes (FIG-PLANES) | Part 4 | Builders |
| Every part, zone and tier | The part map (FIG-PART-MAP) | Reference R2 | Builders, agents |

Rules for every figure on the site:

- **Tables carry the phase road and the bets.** They print legibly, read aloud in order, and carry into the Markdown agents read.
- **No dashboard of invented numbers.** A data figure appears only when the organization has the data; its caption names the source and the date, and the premise ledger names who confirmed it.
- **Illustrative figures keep their mark** on their face and in the caption, with no values.
- **The who-acts colors mean the same actor on every page.**

## Every figure is inline SVG with its source beside it

Each figure on the site is an inline SVG with a text description (`role="img"` and an `aria-label`, or the figure's caption), followed by a details block holding its Mermaid source, or its Mermaid equivalent, or its structured description, for agents. Where to get the SVG:

| Figure | SVG source |
|---|---|
| A design figure the set carries as a Mermaid block (FIG-LOOP, FIG-CONTROL-BOUNDARY, FIG-PLANES, FIG-PROVIDER-LADDER or FIG-PART-MAP) | The figure builder's `<FIG-ID>.svg`, written beside that Mermaid in the same run. Inline it as written: it names nothing by id, refers to nothing outside itself, and takes its colors from the page's theme tokens |
| A figure the set carries as inline SVG (the three illustrative figures, and the control boundary and the provider ladder as shipped) | Already in the text; keep it, and take the source for the details block from `FIGURES.md` |
| A Mermaid block of any other figure (the Mermaid equivalent of an illustrative figure in `FIGURES.md`) | No drawing: the page shows its source open, with a one-line note saying where the figure is drawn |

The site loads nothing at run time and runs no renderer at build time: the figure builder draws every design figure itself, in an arrangement fixed for each figure, so a regenerated figure always has its drawing.

## The site works for every reader and on paper

| Requirement | How |
|---|---|
| Keyboard and screen reader | A skip link, one `main` landmark, headings in order, every figure with a text description, the zoom dialog closed by Escape with focus returned |
| Narrow screens | One column below tablet width, no page-wide horizontal scroll; wide figures and tables scroll inside their own box |
| Light and dark | Colors as theme tokens; the inline SVGs read the same tokens, with light values as fallbacks. The stylesheet defines every token the figure builder's specification lists, for both themes and for print |
| Print | Print pins the light theme and hides navigation, the contents list, the source blocks and the zoom control; figures and tables do not split across pages. Check every figure at print size before handing out paper |
| No JavaScript | Every page reads in full; the contents list and the zoom are the only scripted parts |

## Some content never goes on a shared page

The site holds the same facts as the tailored set, so the tailoring guide's disclosure rules apply to every page. Settle where it is hosted before the first build.

| Content | Rule |
|---|---|
| The profile, the premise ledger, the current-practice map, status reports | Never on the site. Link to them only where readers already have access |
| Crown jewels, team names, tool names, people's names | Only on a site restricted to the people the disclosure rules allow |
| The field guide, the brief's tailoring appendix, any instruction written for agents | Never on a page people read |
| Recorded exceptions and accepted patches that change the story | Stay in the text, named with who accepted them and when they expire |
| Organization figures | Only with their source and date in the caption and a confirmer in the ledger |

When the Pages host cannot restrict access to that audience, host only a site built from the untailored edition, which names nothing of the organization's.

## Build the site with the organization's own tool

Build the site generator in `tools/`, alongside the other tools, from this contract. The authors build a site from the shipped set the same way, as the worked example; that site is not part of this skill, so the organization's generator is the only one it runs.

- **In:** the folder of the tailored set and the figure builder's output folder. **Out:** a folder of HTML pages, one stylesheet and one script, ready to publish as it is.
- **Pages:** as in the first table above, all at the top level of the folder, linked by relative paths so the site works under any Pages path.
- **Figures:** a Mermaid block takes the figure builder's SVG whose `data-figure` is the figure id the block's comment line names and whose `data-node` values are exactly the block's node ids. A design figure with no such SVG fails the build; any other block shows its source open with a note.
- **Agent sections:** any H2 section whose heading names tailoring is left out of the people's pages, with any sentence that links into it.
- **Scripts:** one script, for the contents list and figure zoom; no inline script.

Publish the folder with the Pages feature of the organization's source-control platform: a pipeline job that copies the built folder to the path the platform publishes, triggered from the default branch. Keep the site in a repository whose visibility matches its audience.

## Run these checks before anyone sees the site

| Check | Fails when |
|---|---|
| No external requests | Any page, stylesheet or script loads a script, stylesheet, font, image, media or SVG reference from another host, uses CSS `url()` on another host or `@import`, or a script makes a network call. Plant one of each in a copy first and confirm the check catches it |
| Links | Any link between pages, or any anchor, does not resolve |
| Figures | A figure has no text description, or no source beside it, or a design figure's drawing is not the figure builder's SVG from the run that wrote its Mermaid |
| Agent sections | A page people read contains the field guide or a tailoring appendix |
| Disclosure | The person who clears disclosure has not signed off for this host and audience |
| Print | Any figure is unreadable at print size in the light theme |

Record the build's date, the set's versions from its front matter and the result of each check in `org/decision-log.md`.
