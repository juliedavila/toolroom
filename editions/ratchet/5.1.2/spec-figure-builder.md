# Specification: Figure builder

The figure builder draws the edition's design figures from the organization's own compiled design, so a figure in the tailored narrative shows the design the organization runs today. It writes each figure twice: as Mermaid an agent can read, opening with the figure's stable id and using the model's own ids as node ids, and as an SVG drawing a person can read, which draws the same nodes, edges, subgraphs and classes under the same ids. It lays each drawing out itself, in an arrangement fixed for each figure, so it needs no renderer or other library at build time or at run time. It checks each figure against the compiled design before writing it: a missing relationship, a part in another trust zone, or a path rule 1 forbids stops that figure and names what changed. The organization's agent runs it after every accepted patch and every upgrade, beside the practices check, and uses its output for every design figure in the tailored set. Illustrative figures (the sweep against the loop, escape against catch, the core and its plug points) stay hand-shaped and marked illustrative; the builder never draws them.

## Ideal state

- **FB-1.** The builder builds the five design figures, FIG-LOOP, FIG-CONTROL-BOUNDARY, FIG-PLANES, FIG-PROVIDER-LADDER and FIG-PART-MAP, in that order. With the `figure` option it builds only the figures the option names, each once, still in that order, whatever order the options give. Any other figure id is an option error.
- **FB-2.** Each built figure is written to `<out>/<FIG-ID>.mmd`. Its first line is `flowchart <direction>`, except FIG-LOOP, whose first line is its layout directive and whose second is `flowchart TB`. The line after the `flowchart` line is the comment `  %% <FIG-ID>: <title>`, with the title from the table under Outputs.
- **FB-3.** Every node id is an id the organization's data already uses, with a namespaced element id escaped as FB-16 gives it: an element id from the compiled model, a plane id from the realization layer, a rung value from the profile schema, or a loop step code STEP-1 to STEP-12. The few other node ids (legend boxes, the producer nodes, the subgraph ids) are fixed by this specification.
- **FB-4.** The figure is written in the statement subset under Outputs, one statement per line, so a reader can recover its nodes, edges, subgraph membership and classes line by line.
- **FB-5.** Each figure is checked against the compiled design before it is written. A figure with an error is not written; the other figures still are.
- **FB-6.** The loop draws the twelve steps in two subgraphs with the four who-acts classes; an actor override recolors one step and warns, and an override that puts the agent at any step other than step 3 is an error.
- **FB-7.** The control boundary draws the one path every effect takes, with the six elements this specification names, each in its trust zone, and refuses a relationship from the reasoning side into the execution cell unless a recorded exception names it, in which case it draws it and warns.
- **FB-8.** The planes figure draws the design's thirteen primary flows between planes, each only while the compiled design holds a relationship behind it.
- **FB-9.** The provider ladder draws the rungs the profile allows and each producer's lowest rung from the profile's `ai_resilience`, and the shipped four-rung ladder when there is no profile.
- **FB-10.** The part map draws every part by plane and trust zone, folds each component into its nearest ancestor in the same plane, draws one edge per pair of drawn nodes that a relationship joins, and gives each part its quality-tier class.
- **FB-11.** Two runs on the same inputs write byte-identical files and reports.
- **FB-12.** A JSON report lists the built figures with both their files, and every message. The exit status is 1 when any error was reported, else 0.
- **FB-13.** Beside each Mermaid file the builder writes `<out>/<FIG-ID>.svg`, a drawing of the same figure in the arrangement this specification fixes for it. The builder computes the layout itself, so the drawing needs no renderer or other library at build time or at run time. A figure is written in both forms or in neither.
- **FB-14.** The SVG is written in the SVG statement subset under Outputs and states the figure's structure in data attributes: a reader recovers from it exactly the nodes with their shapes, the edges with their arrows, the subgraphs with their parents, and the memberships and classes that the Mermaid file states.
- **FB-15.** The drawing is legible and stands alone. Every node box lies inside its subgraph's box, and every subgraph box inside its parent's. No two node boxes overlap, no two subgraph boxes overlap unless one holds the other, and no node box overlaps a subgraph box that does not hold it. Each line of text fits its box by the width rule, a subgraph's title overlaps no box inside it, and an edge's label overlaps no node box. Outside the part map, no edge line passes through a node box it does not join. Everything drawn lies inside the view box. Every color is a theme token with its light value as the fallback, and the loop's four actors keep their colors. The root carries `role="img"` and an `aria-label`, and nothing in the file refers outside it.
- **FB-16.** An element id with a namespace, `<namespace>:<id>` (`jig:stop-gate`), is drawn under a node id that writes the colon as two underscores (`jig__stop-gate`). No element id may hold two underscores of its own, so the escape reads back: the first two underscores in a node id are always the namespace's colon. An element id the escape cannot carry is FB-E-id.

## Inputs

- **The edition folder** (`data`, required): `profile-schema.yaml` is always read from it; `model.yaml`, `realization.yaml` and `quality.yaml` are read from it unless the options below replace them.
- **The compiled model** (`model`, optional): the patch applier's output model, used in place of the shipped `model.yaml`. Required top-level entries: `elements`, `relationships`, `trust_zones`. Fields read: each element's `id`, `name`, `kind` (`person` marks a person), `trust_zone` and `parent`; each relationship's `id`, `from`, `to`, `kind` and `carries`; each trust zone's `id` and `name`; the top-level `edition`, when present, for the report. An element id may carry a namespace (FB-16).
- **The compiled layer** (`layer`, optional): the folder the patch applier's layer option writes. `realization.yaml` and `quality.yaml` are each read from it when it holds that file, else from the edition folder. Required top-level entry in each: `elements`. Fields read: a realization entry's `plane`, `class`, `swap_point` and `existing_tool_default`; a quality entry is a list whose first item is the tier.
- **The profile** (`profile`, optional): only its `ai_resilience` section is read.
- **Options:** `out` (required, the output folder), `figure` (repeatable, a figure id), `exception` (repeatable, a relationship id the organization has a recorded exception for), `actor` (repeatable, `STEP-<n>=<actor>` with the actor one of `agent`, `person`, `control`, `team`) and `report` (the JSON report path).

A missing file, a file that is not YAML, or a missing required top-level entry is an input error (FB-E-input). A required entry that is present with the value `null` counts as missing. On an input error nothing is built and no figure file is written; the JSON report is still written when its option is given, so the caller can read the error.

## Outputs

| Figure id | Title | Direction |
|---|---|---|
| FIG-LOOP | The loop by actor | TB |
| FIG-CONTROL-BOUNDARY | The control boundary | LR |
| FIG-PLANES | The planes and their primary flows | LR |
| FIG-PROVIDER-LADDER | Losing a model provider degrades the loop in steps | TB |
| FIG-PART-MAP | Every part by plane, trust zone and quality tier | LR |

Each figure is written as `<FIG-ID>.mmd` in the statement subset below, and as `<FIG-ID>.svg` in the SVG statement subset after it.

**The statement subset.** Every line, after its leading spaces, is one of these:

- a comment, starting `%%`, or the loop's layout directive, starting `%%{`;
- `flowchart <direction>`, `direction <direction>`, or `end`;
- `subgraph <id>["<title>"]`;
- a node: `<id>["<label>"]` (a box) or `<id>(["<label>"])` (a rounded box), optionally followed by `:::<class>`;
- an edge: `<from> <arrow> <to>` or `<from> <arrow>|"<label>"| <to>`, where the arrow is `-->` (a flow), `-.->` (a dotted flow), `-.-x` (a path that must not exist), `<-->` (flows both ways) or `~~~` (an invisible link that only places the boxes); `<from>` and `<to>` are node ids or subgraph ids;
- `class <id>,<id>,... <class>` or `classDef <class> <style>`.

A node belongs to the innermost subgraph whose `subgraph` and `end` lines enclose its declaration. Labels never contain a double quote; the part map writes `#quot;` for one and `#59;` for a semicolon, each for the name's own characters only, so a name `a"b;` is written `a#quot;b#59;` and the semicolon that closes `#quot;` is never escaped again. Labels may break lines with `<br/>`. Node ids match `^[A-Za-z][A-Za-z0-9._-]*$` and are none of the Mermaid keywords `end`, `subgraph`, `graph`, `flowchart`, `class`, `classDef`, `click`, `style`, `linkStyle`, `direction` or `default`, compared without case. A namespaced element id is written as FB-16 escapes it.

Labels are the reference wording below; a builder may wrap them differently. Node ids, edges with their arrows, subgraph ids and membership, classes and the first two lines are exact.

**The SVG statement subset.** The SVG file is UTF-8 text with one group per line:

- Line 1 is the root's opening tag, `<svg ...>`. It carries `xmlns="http://www.w3.org/2000/svg"`, `viewBox="0 0 <width> <height>"`, `width` and `height` with the same two numbers, `role="img"`, `aria-label="<FIG-ID>: <title>"` with the title from the table above, `data-figure="<FIG-ID>"` and `font-family="Georgia, serif"`, and no other attribute.
- Every line after it but the last is one group, written whole on that line: its opening tag, its elements, then `</g>`. A group is a subgraph, an edge or a node, and its opening tag carries exactly these attributes, in this order:
  - a subgraph: `<g data-subgraph="<id>" data-in="<parent id>">`;
  - an edge: `<g data-from="<id>" data-to="<id>" data-op="<op>">`, where `<op>` names the arrow as the fixtures do (`>` for `-->`, `.` for `-.->`, `x` for `-.-x`, `<>` for `<-->`, `~` for `~~~`), with `<` and `>` written `&lt;` and `&gt;`;
  - a node: `<g data-node="<id>" data-in="<subgraph id>" data-classes="<classes>" data-shape="<shape>">`, where `<classes>` lists every class the Mermaid gives the node, by `:::` or by a `class` line, separated by single spaces and empty when there is none, and `<shape>` is `round` for a rounded box (`(["..."])`) and `box` for any other.
- The last line is `</svg>`.

Ids are written exactly as the Mermaid file writes them. A node's `data-in` names the innermost subgraph that holds it, and a subgraph's names its parent; either is empty when the Mermaid declares it outside any subgraph. Groups come in drawing order: every subgraph, each after its parent, then every edge, then every node, each kind in the order the Mermaid file declares it. A later line is drawn over an earlier one, so a node box covers the edges that pass under it.

Inside a group the only elements are these, each with its attribute values in double quotes:

- `<rect .../>` with `x`, `y`, `width`, `height` and optionally `rx`. The first `<rect>` of a subgraph or a node is its box, and each has one.
- `<path .../>` with `d`, made only of the commands `M`, `L` and `Z`; each `M` and `L` is followed by two absolute coordinates.
- `<text ...>words</text>`, one line of text, with `x`, `y` (its baseline) and `font-size`, and optionally `font-weight="700"` for bold, `font-style="italic"` and `text-anchor` (`start` when absent, `middle` or `end`). The words hold no markup: `&`, `<`, `>` and `"` are written `&amp;`, `&lt;`, `&gt;` and `&quot;`.
- Paint, on any of the three: `fill`, `stroke`, `stroke-width`, `stroke-dasharray`, `fill-opacity`, `stroke-opacity` and `style`, except that a `<text>` takes only `fill` and `style`. A `fill` or `stroke` is `none` or a light value from the token table below, written as six uppercase hex digits. Each light value is repeated in `style` with its token, as `fill:var(<token>,<light value>)` or `stroke:var(<token>,<light value>)`, and a `style` holds nothing else. A page that defines the tokens draws the figure in its own theme; any other viewer draws the light values.

Every number is a plain decimal, such as `12` or `40.5`. Nothing else may appear: no other element (no `<image>`, `<use>`, `<style>`, `<script>`, `<a>` or `<foreignObject>`), no other attribute (no `id`, `class`, `transform`, `href`, `xlink:href`, `src` or event attribute), no `url(` or `//` in any attribute value except the `xmlns` value, and no doctype, entity or processing instruction. So the file refers to nothing outside itself, and several figures inlined on one page never clash.

**The width rule.** A line of text with font size `s` is `0.6 × s` wide for each character, or `0.65 × s` when it is bold or italic, where a character at or above U+2000 (an arrow, a symbol or an emoji) counts as two. It occupies from `s` above its baseline to `s / 4` below it, and horizontally from its `x` rightward for `start`, centered on `x` for `middle`, and leftward from `x` for `end`. A builder sizes boxes by this rule, and a reader checks the drawing by it. The rule runs wider than the serif the root names, so drawn text fits with room to spare.

**Theme tokens.** The SVG carries only the light values. A page that shows a drawing in a dark theme defines every token below for both themes; a page that defines none of them shows the drawing in its light colors.

| Token | Light value | Dark value | Used for |
|---|---|---|---|
| `--paper` | `#F7F3EC` | `#1B1D21` | subgraph backgrounds |
| `--sheet` | `#FFFDF8` | `#22252A` | node backgrounds |
| `--ink` | `#2A2520` | `#ECE6DC` | node text and strong outlines |
| `--ink-2` | `#5A5047` | `#B5ACA0` | titles, edge labels and the part map's edges |
| `--rule` | `#DCD2C2` | `#3A3C42` | subgraph outlines |
| `--tint` | `#E4EAF0` | `#26303B` | inner subgraphs: zones and columns |
| `--azul` | `#2C4A6B` | `#A9C1DB` | the person actor and the flows |
| `--tierra` | `#A04A2C` | `#D4805F` | the agent actor and the absent path |
| `--verde` | `#3F6B35` | `#9CC48E` | the control actor |
| `--ocre` | `#8A6A1F` | `#D8B65E` | the owning-team actor |

**The JSON report:**

```json
{
  "tool": "figure builder",
  "edition": "<the compiled model's edition, or null>",
  "figures": [{ "id": "FIG-PLANES", "title": "The planes and their primary flows", "file": "FIG-PLANES.mmd", "svg": "FIG-PLANES.svg" }],
  "messages": [{ "level": "error", "code": "FB-E-flow", "location": "FIG-PLANES road -> integration", "text": "..." }]
}
```

The keys come in that order. `figures` lists the figures written, in build order, each with its Mermaid file as `file` and its drawing as `svg`. The report is written whenever the `report` option is given, on option and input errors too, when `figures` is `[]`. Each line printed for a message reads `<level> <code> <location>: <text>`.

## Behavior

### The loop (FIG-LOOP)

1. The first line is the layout directive, which opens with `%%{init: {"flowchart": {"rankSpacing": 26, "nodeSpacing": 22}` and closes the three braces it opened before a final `%%`; then `flowchart TB` and the id comment.
2. Subgraph `who` ("Who acts at each step", `direction LR`) holds the legend: `legend-agent` (class `agent`, "Agent: proposes only"), `legend-person` (`person`, "Person"), `legend-control` (`control`, "Control outside the agent"), `legend-team` (`team`, "Owning team"), joined in that order by `~~~` links.
3. Subgraph `find` ("Find and prove", `direction LR`) holds STEP-1 to STEP-6; subgraph `keep` ("Fix and keep fixed", `direction LR`) holds STEP-7 to STEP-12. Each step is a box labeled with its number and text, with its actor as its class, joined to the next step in its subgraph by `-->`.
4. The steps and their shipped actors: 1 "Choose a scenario with named owners" (person); 2 "Trusted context; proof condition held apart" (person); 3 "Agent proposes one exact test" (agent); 4 "Person approves the exact action" (person); 5 "Run isolated; audit fails closed" (control); 6 "Independent reviewer reproduces" (person); 7 "Record outcome, decider, expiry" (person); 8 "Owner fixes and deploys" (team); 9 "Retest the deployed system" (control); 10 "Keep the test in the pipeline" (team); 11 "Record cost and handoffs; pull next" (person); 12 "Recurring weakness becomes a secure default" (team).
5. Inside `keep` also: `change-stopped` (class `stop`, "Change stopped before production"), the rounded box `next-scenario` (class `again`, "Back to step 1"), the edge `STEP-10 -.->|"a later change fails here"| change-stopped` and the edge `STEP-11 -->|"next scenario"| next-scenario`.
6. After the subgraphs: `who ~~~ find` and `find --> keep`, then one `classDef` for each of `agent`, `person`, `control`, `team`, `stop` and `again`.
7. **Actor overrides.** Each `actor` option sets that step's class to the actor named. An override that changes the shipped actor gives FB-W-actor; one that names the shipped actor gives nothing. An override that puts the agent at any step other than step 3 is FB-E-actor: the agent acts only at step 3, and only to propose.

### The control boundary (FIG-CONTROL-BOUNDARY)

8. Below the id comment, one comment line saying that node ids are the model's element ids.
9. Nodes. Outside any subgraph: `people.accountable-authorities` ("Person who approves"). Subgraph `reasoning` ("Reasoning zone"): `s2.workflow-worker-app` ("Test-drafting agent, holds no authority") and `s4.model-data-gateway` ("Model gateway and route"). Subgraph `control` ("Control zone, no model"): `s3.action-control-service` ("Authorization service: checks the exact action, then issues a grant") and `s5.proof-evidence-service` ("Evidence ledger and protected audit"). Subgraph `cell` ("Execution cell"): `s3.bounded-runner` ("Runner: runs only the granted action, isolated"). The subgraphs come in that order, each written even when empty.
10. Edges, in this order: `s2.workflow-worker-app -->|"1 proposes"| s3.action-control-service`; `people.accountable-authorities -->|"2 approves"| s3.action-control-service`; `s3.action-control-service -->|"3 grants"| s3.bounded-runner`; `s3.bounded-runner -->|"4 runs, 5 records the receipt"| s5.proof-evidence-service`; `s2.workflow-worker-app -.-> s4.model-data-gateway`; `s2.workflow-worker-app -.-x|"no path"| s3.bounded-runner`.
11. **Checks.** Each node's element must be in the compiled model (FB-E-element); a missing element is reported once, and edges touching it are not checked further. Its `trust_zone` must be the subgraph's zone: `reasoning` for the reasoning subgraph, `control` for the control subgraph, `execution` for the cell, and none (absent or null) for the person outside (FB-E-zone). Each of the five edges other than the `-.-x` edge, the dotted gateway edge included, needs at least one relationship in the compiled model from its first element to its second (FB-E-relationship, located `FIG-CONTROL-BOUNDARY <first element> -> <second element>`).
12. **Rule 1 at the boundary.** A relationship whose `from` part sits in the orchestration or model-access plane and whose `to` part sits in the execution plane (planes from the realization layer) is FB-E-boundary, located at the relationship id. Separately, any relationship from `s2.workflow-worker-app` to `s3.bounded-runner` that is not a boundary crossing under the first sentence is FB-E-absent, located at the relationship id: the figure shows that path as absent wherever its ends sit. Each relationship gets at most one of the two codes.
13. **Recorded exceptions.** A relationship named by an `exception` option is drawn instead of refused, and each such relationship gives FB-W-exception. It is drawn after the six edges as `<from> -->|"exception: <relationship id>"| <to>`, with the ends' node ids. An end not already a node is added as a box labeled with the element's name, after the subgraph's fixed nodes: in `cell` when its plane is execution, else in `reasoning`, using the execution plane for `cell` and every other plane for `reasoning`, independently of its trust zone. The relationships rule 12 refuses run from the orchestration or model-access plane to the execution plane, so their ends land in `reasoning` and `cell` as their planes say; the absent path's two ends are already nodes. An added end with a namespace is drawn under its escaped node id (rule 39), and an added end whose id cannot be drawn (rule 40) is FB-E-id at that id. When the excepted relationship runs from `s2.workflow-worker-app` to `s3.bounded-runner`, the `-.-x` edge is left out. An `exception` that names a relationship which is neither a boundary crossing nor the absent path gives FB-W-exception-unused and draws nothing.

The absent-path test in rule 12 examines model relationships even when an endpoint has moved outside the figure's drawn zone; its plane does not exempt that named path. An exception can therefore add endpoints from other planes, placed by rule 13.

### The planes (FIG-PLANES)

14. Every part (an element that is not a person) must have a realization entry (FB-E-layer) whose plane is one of the nine design planes (FB-E-plane): `integration`, `road`, `context`, `orchestration`, `model-access`, `control`, `execution`, `evidence`, `evaluation`. The same check runs for the part map.
15. Each relationship joins the plane of its `from` end to the plane of its `to` end, where a person's plane is `roles` whatever its realization entry says (the shipped realization file gives each person an identity-provider entry, which the model checks read and this figure ignores); a relationship within one plane joins nothing, and one whose end is not an element joins nothing here. The primary flows are: integration to context; context to orchestration; orchestration to control; control to model-access; model-access to control; roles to control; control to execution; execution to evidence; evidence to integration; evidence to evaluation; evaluation to orchestration; evidence to road; road to integration. Each needs at least one relationship behind it (FB-E-flow, located `FIG-PLANES <from> -> <to>`).
16. Below the id comment, one comment line saying that node ids are the realization layer's plane ids. Nodes, in order of first appearance in the list above: each plane as a box with its title (integration "Integration (existing enterprise tools)", road "Paved road (shared platform)", context "Context plane", orchestration "Orchestration plane", model-access "Model-access plane", control "Control plane", execution "Execution cells", evidence "Evidence plane", evaluation "Evaluation plane"), and `roles` as a rounded box, "People (roles)".
17. Edges, in the list's order: a pair listed both ways is one `<-->` edge, written at its first appearance (`control <--> model-access`); every other flow is `-->`.

### The provider ladder (FIG-PROVIDER-LADDER)

18. The schema's `properties.ai_resilience.properties.producer_rungs.items.properties.lowest_rung.enum` must be exactly `[frontier, self-hosted, no-agent, manual]` (FB-E-rungs).
19. The rungs: frontier ("Hosted frontier model: the default route, through one gateway"), self-hosted ("Self-hosted open-weight model: kept qualified by scheduled drills"), no-agent ("Scripted comparison: no agent; it already runs beside one"), manual ("By hand: people run the loop, as in phase 1"). When the profile's `ai_resilience.self_hosting_capacity` is `none`, the self-hosted rung is left out. Each rung's label is its position, counted from 1 among the rungs drawn, then one space, then the text above (`2 Scripted comparison: no agent; it already runs beside one` when the self-hosted rung is left out).
20. With a profile whose `ai_resilience` is absent or not a mapping: FB-W-no-resilience, located `FIG-PROVIDER-LADDER profile`, and the shipped four rungs with no producers. Without a profile: the same drawing, with no warning.
21. Each entry of `producer_rungs` becomes a node with id `producer-<slug>`, where the slug is the producer's name lowercased, every run of characters other than a to z and 0 to 9 replaced by one hyphen, and leading and trailing hyphens removed; its label is `Producer: <name>`. A name whose slug is empty, two producers with the same id, or a lowest rung that is not drawn (including `self-hosted` when the capacity is `none`) is FB-E-producer, located at the producer id, or at `producer_rungs` for an empty slug. Producers are read in list order, and only a producer whose id an earlier producer already took is reported, so two producers sharing an id give one error. A producer that fails any of these checks gets no node, and the figure is not written.
22. Nodes in order: the rungs, then `control` ("Control plane: no model at any step"), then the producers. Edges in order: each rung `-->|"route lost"|` the next rung drawn; `control -.->|"keeps working"|` each rung; each producer `-.->|"lowest step"|` its lowest rung.

### The part map (FIG-PART-MAP)

23. Checks: rule 14's plane checks; every element id can be drawn as a node id (rule 40, FB-E-id); every relationship's ends are elements (FB-E-element); every part's tier is one of T0, T1, T2, T3 or EXT (FB-E-tier). Every node id the part map writes, in a node, an edge or a `class` line, is the element's id as rule 39 escapes it. A part's tier is the first item of its quality entry, or EXT when it has no quality entry.
24. **Folding.** A component (an element with a `parent` that is an element) folds into its parent when the two share a plane, and on up the chain while they do; it is drawn as the first ancestor whose parent is in another plane or absent. A component whose parent is in another plane is drawn itself. People never fold. A drawn part is a part that folds into itself.
25. Below the id comment, one comment line saying that node ids are the model's element ids. For each plane in the order of rule 14 that holds a drawn part: `subgraph plane-<plane>["<plane title>"]`, inside it one `subgraph zone-<plane>-<zone>["trust zone: <zone name>"]` per trust zone among its drawn parts, in order of first appearance, then the parts of that zone in model order. The zone is the element's `trust_zone`, or `none` when it has none, named "No trust zone (external)"; other zones take their name from `trust_zones`. Then `subgraph people-roles["People (roles), not parts"]` with each person as a rounded box, in model order, with class `person`.
26. A part's box is labeled with its name, its realization class, `+<n> components` when components fold into it, and its marks: "⇄ swap point" when it or a component folded into it is a swap point, "existing tool first" when its own `existing_tool_default` is true. Its class is `swap` when it carries the swap mark, else `existing` when its existing-tool mark is set, else `built`.
27. **Edges.** Map each relationship end to its drawn node (a person maps to itself). For each ordered pair of different drawn nodes that at least one relationship joins, in order of the first such relationship, write one edge. Its label is the contracts the relationships carry, distinct, in order of first appearance: the first two joined by ", ", plus ` +<k>` when k more remain. With no contracts and a person at either end, the label is the distinct actions of the relationship kinds, the first two joined by ", ": authorization "approves", control "sets or administers", evidence "accepts or attests", change "changes", feedback "is told", proposal "proposes", data "reads", observation "observes", any other kind "acts". A labeled edge is `-->`; an edge with no label is `-.->`.
28. Then `classDef` lines for `swap`, `existing`, `built` and `person`; then one `class <ids> tier<T>` line per tier, listing the drawn parts of that tier in the order they were drawn, the tiers in order of first appearance; then `classDef tierT0`, `tierT1`, `tierT2`, `tierT3` and `tierEXT`, in that order.

The profile ladder reads `ai_resilience.producer_rungs` entries as `{producer, lowest_rung}`. All model element ids, including persons and folded components, undergo the part-map id check, with one FB-E-id for each bad id. Folding does not draw its components separately; the loop has eighteen nodes and the planes figure ten. SVG `data-classes` lists the inline class first, then classes from `class` lines in their appearance order. Keep warnings raised for a failed figure in the JSON report even though neither of that figure's files is written.

### Run order

29. The run has four stages, and an error in any of the first three stops it before a figure is built. First, the options are read as written: an unknown option, an option with no value, and a missing `data` or `out` are FB-E-option, and the input files are not read. Second, the input files are read (FB-E-input). Third, the options that need the inputs are checked, all of them before any stop: a figure id outside FB-1; an actor or exception option when its figure is not built; an actor override that is not `STEP-1` to `STEP-12` with a known actor; an exception naming no relationship in the compiled model, which needs the model read. Fourth, each figure is built and checked in the order of FB-1, and each one either writes its two files or reports its errors. Messages come in the order the checks find them.

### Drawing the SVG (FB-13 to FB-15)

30. The drawing states the figure its Mermaid file states, read back by the statement subset: the same nodes, edges, subgraphs and classes, under the same ids. A label is the Mermaid label with `<br/>` as a line break, `<b>` as bold, `<i>` as italic, and `#quot;` and `#59;` read as `"` and `;`. A builder may wrap a label's lines again, breaking only at spaces, and sizes each box to its longest line by the width rule.
31. Rules 34 to 38 fix each figure's arrangement. Sizes, spacing and wrapping are the builder's, within FB-15.
32. A node is a box with its label centered in it, and a rounded box when its shape is `round`. A subgraph is a box with its title inside it at the top left, except the control boundary's three zones, whose titles sit at the bottom of their columns.
33. An edge starts and ends on the border of the two boxes it joins, drawn by its arrow: `>` a solid line with an arrowhead at its `to` end; `.` a dashed line with an arrowhead; `x` a dashed line ending in a cross; `<>` a solid line with an arrowhead at each end; `~` nothing, so its group is empty. The four smaller figures draw each edge's label beside its line. The part map draws no edge labels; they stay in its Mermaid file.
34. The loop: the `who`, `find` and `keep` boxes as three rows, top to bottom. The legend boxes stand left to right in `who`, steps 1 to 6 left to right in `find`, and steps 7 to 12 left to right in `keep`, with a second row under them holding `change-stopped` under step 10 and `next-scenario` under step 11. Neighboring steps are joined by short horizontal arrows. The two edges into the second row run straight down, each label beside its line, and the edge from `find` to `keep` runs down the gap between the two boxes. Each step's and legend box's outline takes its actor's token: agent `--tierra`, person `--azul`, control `--verde`, team `--ocre`.
35. The control boundary: the person at the top, centered over the control zone, and under it the three zones as columns, `reasoning`, `control` and `cell`, left to right. In each column the nodes stack top to bottom in the Mermaid's order, and the cell column leaves its second row empty. The proposal and the grant run straight across the first row, and the approval runs straight down from the person. The receipt runs down from the runner into the empty second row and across into the evidence ledger. The dotted gateway edge runs down the reasoning column. The absent path, or its exception, rises from the agent to a lane above the first row, runs along it and comes down into the runner. Every other exception edge leaves its reasoning node to the left, runs down outside the columns, along a lane of its own under them, and up outside the cell column into its cell node's right side.
36. The planes: a grid of three rows and four columns. The first row holds `integration`, `context`, `orchestration` and `roles`; the second `road`, `evaluation`, `control` and `model-access`; the third `evidence`, an empty cell, `execution` and an empty cell. Every flow is a straight line between its two boxes, except evidence to integration, which runs round the left of the grid because the paved road sits between them. The grid is spaced so that no line crosses a third box.
37. The provider ladder: the rungs as steps descending from left to right in the Mermaid's order; under them the `control` box as one bar across the figure's width; and, when there are producers, the producers in a row above the steps. Each `route lost` edge leaves its rung to the right and comes down into the next rung's top. Each `keeps working` edge rises straight from the bar into its rung's bottom. Each `lowest step` edge drops from its producer to a lane of its own above the steps, runs along it and comes down into its rung's top.
38. The part map: each plane subgraph is a band across the figure's width, top to bottom in the Mermaid's order, and the people's subgraph is the last band. In a plane band the zone boxes stand side by side, left to right. In a zone box, and in the people's band, the nodes stand in a grid, row by row in the Mermaid's order. Edges are straight lines between box borders, drawn under the boxes.

### Namespaces for planes and zones

Plane lookup removes one leading `shared:`, `jig:` or `ratchet:` before comparing with the nine design-plane names, including boundary checks, folding, flow checks and fixture `remove_plane_flow` edits. Thus `shared:integration` draws as `integration`, with subgraph `plane-integration`. Zone identities keep their prefix for grouping and display-name lookup; only the subgraph suffix replaces each colon with `_`, so `shared:existing` gives `zone-integration-shared_existing`. Other zone characters are preserved. Inputs must use valid subgraph suffix characters and distinct zone suffixes within a plane; ambiguous suffix collisions have no specified successful drawing. Element colon escaping remains the separate reversible FB-16 rule. Draw every retained namespaced part under that escape unless rule 24 folds it; an import prefix never excludes a part from the map.

The node-id pattern permits underscores, including two consecutive underscores in an escaped id; FB-16 forbids that pair only in the original model identity. Parent chains must be acyclic compiled-model inputs (the model checks report parent cycles); the figure builder has no additional parent-cycle error contract.

### Namespaced ids (FB-16)

39. An element id `<namespace>:<id>`, whose namespace is lowercase letters, digits and hyphens starting with a letter and whose part after the colon is a valid node id, is drawn under the node id `<namespace>__<id>`. That node id stands for the element wherever the figure names it: its node, its edges and its `class` line, in the Mermaid and in the SVG. Labels, message locations and `exception` options keep the id as the model writes it.
40. An element id cannot be drawn when it holds two underscores in a row, when it holds a colon anywhere rule 39 does not place one, or when it holds no colon and is not a valid node id. Each such id is FB-E-id, located at the id as the model writes it. Since no drawn id holds two underscores of its own, the first two underscores in a node id always mark a namespace, and the model id is the node id with them turned back into a colon.

## Errors, warnings and exit status

| Code | Level | When |
|---|---|---|
| FB-E-option | error | an unknown figure id; an actor override that is not `STEP-1` to `STEP-12` with a known actor; an exception naming no relationship in the compiled model; an actor override when FIG-LOOP is not built, or an exception when FIG-CONTROL-BOUNDARY is not built; an unknown option or an option with no value; no `data` or no `out` |
| FB-E-input | error | a file is missing or is not YAML, or a required top-level entry is missing |
| FB-E-actor | error | an override puts the agent at a step other than step 3 |
| FB-E-element | error | a control-boundary node is not in the compiled model; a relationship names an element the model does not have (part map) |
| FB-E-zone | error | a control-boundary node's trust zone differs from the zone the figure draws it in |
| FB-E-relationship | error | a control-boundary edge the figure draws has no relationship behind it |
| FB-E-boundary | error | a relationship runs from the orchestration or model-access plane into the execution plane with no exception named |
| FB-E-absent | error | the path the figure shows as absent exists, outside the boundary rule, with no exception named |
| FB-E-layer | error | a part has no realization entry |
| FB-E-plane | error | a part's plane is not one of the nine design planes |
| FB-E-flow | error | a primary flow has no relationship behind it |
| FB-E-rungs | error | the schema's rung values differ from the four the ladder draws |
| FB-E-producer | error | a producer's slug is empty, two producers share an id, or a producer's lowest rung is not drawn |
| FB-E-id | error | an element id the figure draws as a node cannot be drawn (rule 40): it holds two underscores in a row, it holds a colon outside a namespace as rule 39 gives one, or it holds no colon and is not a valid node id. In the part map every element id of the compiled model is checked, persons and folded components included; in the control boundary, an end that an exception adds |
| FB-E-tier | error | a part's tier is not T0, T1, T2, T3 or EXT |
| FB-W-actor | warning | an override recolors a step |
| FB-W-exception | warning | an excepted relationship is drawn |
| FB-W-exception-unused | warning | an exception names a relationship there is nothing to draw for |
| FB-W-no-resilience | warning | the profile's `ai_resilience` is absent or not a mapping |

Locations: an option error found as the options are read names the option as the command line spells it (`--data`); the others are `figure <id>`, `exception <relationship id>`, `actor <step>=<actor>` with the value as given, and the bare words `actor` or `exception` when that option's figure is not built. An input error names the file as given, followed by a space and the entry when a required entry is missing. A figure check's rung error is located `FIG-PROVIDER-LADDER profile-schema.yaml`; every figure message's location starts with the figure id, then the element, relationship, producer, step or flow concerned. Three forms are fixed beyond that: FB-E-relationship is `FIG-CONTROL-BOUNDARY <from> -> <to>`; FB-E-element in the part map is `FIG-PART-MAP <relationship id> <missing element id>`; FB-E-producer for a name whose slug is empty is `FIG-PROVIDER-LADDER producer_rungs`. A figure check error leaves that figure unwritten. Exit status 1 when any error was reported, else 0. Message texts are free; codes and locations are not.

## Acceptance fixtures

If the environment denies the required `trash` cleanup of a fixture scratch folder, report that denial and the retained path separately from fixture assertions. Preserve the fixture result and exit status based on assertions; do not substitute another deletion mechanism or count a skipped case as passed.

The fixtures ship as `fixtures-figure-builder.yaml`, a mapping whose one key, `fixtures`, lists one entry per row below. Each fixture runs on the shipped files of the edition folder, changed only by the fixture's `edits`. A runner must understand every key below; a fixture holding a key the runner does not know fails.

- **Fixture keys.** `name`, `description`; `edits` (a list, applied in order); `profile` (a mapping written as the profile file and passed with the profile option); `options`; `runs` (2 runs the fixture twice); `expect`.
- **Edits.** `{op: add_element, element}`; `{op: remove_element, id}` (also removes every relationship naming it); `{op: set_element, id, field, value}`; `{op: add_relationship, relationship}`; `{op: remove_relationships, from, to}` (every relationship from the one element to the other); `{op: remove_plane_flow, from, to}` (every relationship whose ends sit in those planes, planes read from the shipped realization file except that a person counts as `roles`, as rule 15 reads it); `{op: set_layer, file, id, value}` (sets an entry of `realization` or `quality`; a null value removes it); `{op: set_path, file, path, value}` (sets a dotted path in a shipped file, such as the schema). An edited model is passed with the model option; an edited realization or quality file is passed in a layer folder; an edited schema is passed in a copy of the edition folder.
- **Options.** `figures` (a list, one figure option each), `exceptions` (a list), `actors` (a mapping from step code to actor).
- **Expect keys.** Every key given is checked. `outcome` is `ok` for exit 0, `error` otherwise; `exit` is the exit status. `errors` and `warnings` list every message of that level, as a multiset: an entry is a code, or `{code, location}`. `built` is the list of figure ids written, in order. `json_keys` is the report's top-level keys, in order. `figure_keys` is the keys of each entry of the report's `figures`, in order. The keys below map a figure id to what its written Mermaid file must show, read by the statement subset: `header` (its first lines, exactly); `nodes` (`contains`, `excludes`, and `count`, the number of distinct node ids declared by node statements; a subgraph id is no node, even where an edge names it); `edges` (`contains` and `excludes`, each edge written `<from> <op> <to>` with op `>` for `-->`, `.` for `-.->`, `x` for `-.-x`, `<>` for `<-->` and `~` for `~~~`); `members` (node id to the id of its innermost subgraph, or `null` for none); `classes` (node id to a class it carries, by `:::` or by a `class` line); `text_contains` (strings in the file). `svg_text_contains` maps a figure id to strings in its SVG file. `outputs_byte_identical`, with `runs: 2`, requires both runs to write the same files and report.
- **The drawing, on every fixture.** For every figure a run writes, the runner also reads `<FIG-ID>.svg` and checks it, whatever the expect block holds, and the fixture fails on any finding. The SVG exists exactly when the Mermaid file does. It is written in the SVG statement subset, attributes and all. Read by that subset, it states the Mermaid's nodes with their shapes, edges, subgraphs with their parents, memberships and classes, each kind in the order the Mermaid declares it. And every rule of FB-15 holds, with text measured by the width rule, and boxes, text and path points compared with a tolerance of 0.1 for rounding. The loop keeps its actors' colors when the group of each node with an actor class (`agent`, `person`, `control` or `team`) holds a `<rect>` whose `stroke` is that actor's light value (rule 34). A path enters a box when one of its `L` segments crosses the box's inside, its border left out by half a unit.
- **The reference check, proven first.** Before the fixtures run, the runner proves its check that nothing refers outside the file. It takes an SVG the builder wrote for the shipped files, confirms the check passes it, then plants each of these in a copy and confirms the check catches every one: an `<image href>`, a `<use href>`, an `xlink:href`, a `src`, a `url(` in an attribute, a `url(` in a style, a `<script>`, a `<style>` with `@import`, a `<foreignObject>`, an `<a href>`, an event attribute such as `onload`, and a doctype declaring an entity. A runner whose check misses one stops before the fixtures.

| Fixture | Exercises | Expected outcome |
|---|---|---|
| fixture-fb-shipped.yaml | the shipped files byte for byte, no profile | all five built, no messages; loop steps, legend and classes; the control boundary's six nodes in their subgraphs and six edges; the planes' ten nodes and twelve edges; the four-rung ladder; part map memberships and tiers, including a part with no quality entry as EXT and a folded component absent; in the SVGs, the root's attributes, a group of each kind and a theme token, as exact strings |
| fixture-fb-determinism.yaml | the shipped files, run twice | identical files, both forms, and reports |
| fixture-fb-report.yaml | the shipped files | the report's keys in order, and each figure's keys naming both its files |
| fixture-fb-select.yaml | figure FIG-PLANES only | only FIG-PLANES built |
| fixture-fb-unknown-figure.yaml | figure FIG-SWEEP-LOOP | FB-E-option, nothing built |
| fixture-fb-missing-entry.yaml | the model without `relationships` | FB-E-input, nothing built |
| fixture-fb-cb-missing-edge.yaml | remove the relationship from the accountable people to the action control service | FB-E-relationship; the other four figures built |
| fixture-fb-cb-missing-node.yaml | remove the evidence service, control boundary only | one FB-E-element, nothing built |
| fixture-fb-cb-zone.yaml | the runner set to the control trust zone | FB-E-zone |
| fixture-fb-cb-boundary.yaml | add a relationship from the workflow worker app to the runner | FB-E-boundary at its id; no FB-E-absent |
| fixture-fb-cb-exception.yaml | the same relationship, named as an exception | FB-W-exception; drawn as an exception edge; the absent edge left out |
| fixture-fb-cb-exception-new-nodes.yaml | a relationship from the inference endpoints to the local enforcement point, named as an exception | both ends added, in reasoning and in cell |
| fixture-fb-cb-absent.yaml | the workflow worker app moved to the context plane, and a relationship from it to the runner | FB-E-absent, no FB-E-boundary |
| fixture-fb-cb-exception-unused.yaml | an exception naming a shipped relationship that crosses nothing | FB-W-exception-unused, built |
| fixture-fb-cb-exception-unknown.yaml | an exception naming no relationship | FB-E-option, nothing built |
| fixture-fb-planes-flow.yaml | remove every flow from the road plane to the integration plane | FB-E-flow for road to integration; the part map still built |
| fixture-fb-planes-unknown-plane.yaml | a part's plane set to one outside the nine | FB-E-plane in both the planes and the part map |
| fixture-fb-layer-missing.yaml | an added part with no realization entry | FB-E-layer in both |
| fixture-fb-part-map-new-part.yaml | an added part with its layer entries, a component folded into it, a component in another plane, and a relationship carrying a contract | the part in its plane and zone with its classes; the folded component absent; the other component drawn; the edge |
| fixture-fb-part-map-bad-id.yaml | an added part whose id starts with a digit | FB-E-id |
| fixture-fb-part-map-tier.yaml | a part's tier set to T9 | FB-E-tier |
| fixture-fb-ladder-none.yaml | a profile with no self-hosting capacity and one producer | three rungs; the producer node and its edge |
| fixture-fb-ladder-self-hosted-on-none.yaml | the same, with a producer whose lowest rung is self-hosted | FB-E-producer |
| fixture-fb-ladder-duplicate.yaml | two producers with the same slug | FB-E-producer |
| fixture-fb-ladder-no-section.yaml | a profile with no `ai_resilience` | FB-W-no-resilience; four rungs |
| fixture-fb-ladder-rungs.yaml | the schema's rung values changed | FB-E-rungs |
| fixture-fb-loop-actor.yaml | step 4 drawn as a control | FB-W-actor; STEP-4 carries class control |
| fixture-fb-loop-agent.yaml | step 5 drawn as the agent | FB-E-actor; the loop not built |
| fixture-fb-loop-bad-step.yaml | an override for STEP-13 | FB-E-option, nothing built |
| fixture-fb-namespaced-ids.yaml | two parts, a folded component and a role named with a namespace, and an excepted crossing between the two parts; the control boundary and the part map | both built, FB-W-exception; each namespaced id drawn escaped in both files, in its zone, with its edges and classes; the excepted ends added in reasoning and cell; the component folded |
| fixture-fb-namespaced-bad-ids.yaml | four element ids the escape cannot carry: two underscores in a row, an uppercase namespace, a digit after the colon, two colons; the part map | FB-E-id at each id as the model writes it; nothing built |
| fixture-fb-svg-escaped-text.yaml | a part whose name holds markup, an ampersand and web addresses, and whose class is one long word; the part map | built; the Mermaid writes the name's quotes as `#quot;`; the SVG writes the name as escaped text, refers to nothing outside the file and fits the long word in its box |
| fixture-fb-svg-ladder-producers.yaml | a profile with four rungs and three producers, two of them on one rung; the ladder | eight nodes; each producer's edge to its rung; the drawing passes every check |

## Not in scope

- Illustrative figures, which stay hand-shaped and marked illustrative, and the phase road and the practices exhibit, which are tables the tailoring workflow rebuilds from the profile and the current-practice map.
- Captions. The agent writes each caption, citing any patch or exception the builder's warnings name.
- Raster images: the builder writes Mermaid text and SVG drawings only.
- Judging whether a patch is wise; the impact report and the model checks do that.
