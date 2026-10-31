<a id="figures"></a>
# Figure sources for agents

*Ratchet: closed-loop security validation for AI-assisted engineering. Figure sources. Edition 5.1.3, Thesis 1.4.3, 2026-10-31, build 694de224+local.*

Every figure in the edition has a stable id, and the text cites it by that id. This file gives each figure's source in a form an agent can read: the Mermaid itself for a figure drawn in Mermaid; for a figure drawn as SVG, a Mermaid equivalent with the same nodes and edges, which the build checks against the figure and, for a design figure, against the model; and where Mermaid cannot carry the shape, a structured description. Illustrative figures show the shape of the argument with no data behind them, and say so here as they do on their face. The five design figures are the output of the figure builder that the adopters' skill specifies: an organization runs it on its own compiled model and layer and gets the same figures under the same ids, its node ids the model's own.

<a id="fig-src-loop"></a>
## FIG-LOOP: The loop by actor

*Appears in 01-thesis.md; six-pager.md (diagram APX-1); strategy-brief.md (exhibit). Source: Mermaid, as drawn, built by the figure builder.*

```mermaid
%%{init: {"flowchart": {"rankSpacing": 26, "nodeSpacing": 22}}}%%
flowchart TB
  %% FIG-LOOP: The loop by actor
  subgraph who["Who acts at each step"]
    direction LR
    legend-agent["Agent:<br/>proposes only"]:::agent
    legend-person["Person"]:::person
    legend-control["Control outside<br/>the agent"]:::control
    legend-team["Owning<br/>team"]:::team
    legend-agent ~~~ legend-person
    legend-person ~~~ legend-control
    legend-control ~~~ legend-team
  end
  subgraph find["Find and prove"]
    direction LR
    STEP-1["1 Choose a<br/>scenario with<br/>named owners"]:::person
    STEP-2["2 Trusted context;<br/>proof condition<br/>held apart"]:::person
    STEP-3["3 Agent proposes<br/>one exact test"]:::agent
    STEP-4["4 Person approves<br/>the exact action"]:::person
    STEP-5["5 Run isolated;<br/>audit fails<br/>closed"]:::control
    STEP-6["6 Independent<br/>reviewer<br/>reproduces"]:::person
    STEP-1 --> STEP-2
    STEP-2 --> STEP-3
    STEP-3 --> STEP-4
    STEP-4 --> STEP-5
    STEP-5 --> STEP-6
  end
  subgraph keep["Fix and keep fixed"]
    direction LR
    STEP-7["7 Record outcome,<br/>decider, expiry"]:::person
    STEP-8["8 Owner fixes<br/>and deploys"]:::team
    STEP-9["9 Retest the<br/>deployed system"]:::control
    STEP-10["10 Keep the test<br/>in the pipeline"]:::team
    STEP-11["11 Record cost<br/>and handoffs;<br/>pull next"]:::person
    STEP-12["12 Recurring<br/>weakness becomes<br/>a secure default"]:::team
    STEP-7 --> STEP-8
    STEP-8 --> STEP-9
    STEP-9 --> STEP-10
    STEP-10 --> STEP-11
    STEP-11 --> STEP-12
    change-stopped["Change stopped<br/>before production"]:::stop
    next-scenario(["Back to step 1"]):::again
    STEP-10 -.->|"a later change<br/>fails here"| change-stopped
    STEP-11 -->|"next scenario"| next-scenario
  end
  who ~~~ find
  find --> keep
  classDef agent fill:#F6DCCF,stroke:#A04A2C,stroke-width:2px,color:#2A2520
  classDef person fill:#D9E4EF,stroke:#2C4A6B,stroke-width:2px,color:#2A2520
  classDef control fill:#DCE9D6,stroke:#3F6B35,stroke-width:2px,color:#2A2520
  classDef team fill:#F1E6C8,stroke:#8A6A1F,stroke-width:2px,color:#2A2520
  classDef stop fill:#FFFFFF,stroke:#3F6B35,stroke-dasharray:4 3,color:#2A2520
  classDef again fill:#FFFFFF,stroke:#2C4A6B,color:#2A2520
```

<a id="fig-src-planes"></a>
## FIG-PLANES: The planes and their primary flows

*Appears in 04-architecture.md. Source: Mermaid, as drawn, built by the figure builder from the model and layer.*

```mermaid
flowchart LR
  %% FIG-PLANES: The planes and their primary flows
  %% Node ids are the realization layer's plane ids; roles stands for every person in the model.
  integration["Integration<br/>(existing enterprise tools)"]
  context["Context plane"]
  orchestration["Orchestration plane"]
  control["Control plane"]
  model-access["Model-access plane"]
  roles(["People<br/>(roles)"])
  execution["Execution cells"]
  evidence["Evidence plane"]
  evaluation["Evaluation plane"]
  road["Paved road<br/>(shared platform)"]
  integration --> context
  context --> orchestration
  orchestration --> control
  control <--> model-access
  roles --> control
  control --> execution
  execution --> evidence
  evidence --> integration
  evidence --> evaluation
  evaluation --> orchestration
  evidence --> road
  road --> integration
```

<a id="fig-src-part-map"></a>
## FIG-PART-MAP: Every part by plane, trust zone and quality tier

*Appears in R2-parts.md. Source: Mermaid, as drawn, built by the figure builder from the model and layer; the source is the block in reference R2.*

The Mermaid source is the block under "Every part by plane, trust zone and quality tier" in reference R2. At about 39 KB it is not repeated here.

<a id="fig-src-control-boundary"></a>
## FIG-CONTROL-BOUNDARY: The control boundary

*Appears in 04-architecture.md; six-pager.md (diagram APX-3). Source: Mermaid equivalent of a generated SVG, built by the figure builder, its nodes named by model element ids and checked against the model.*

```mermaid
flowchart LR
  %% FIG-CONTROL-BOUNDARY: The control boundary
  %% Node ids are the model's element ids. Each node stands for its element's group in the model's control-boundary view, and each drawn edge is a relationship between the two elements it joins.
  people.accountable-authorities["Person who approves"]
  subgraph reasoning["Reasoning zone"]
    s2.workflow-worker-app["Test-drafting agent, holds no authority"]
    s4.model-data-gateway["Model gateway and route"]
  end
  subgraph control["Control zone, no model"]
    s3.action-control-service["Authorization service: checks the exact action, then issues a grant"]
    s5.proof-evidence-service["Evidence ledger and protected audit"]
  end
  subgraph cell["Execution cell"]
    s3.bounded-runner["Runner: runs only the granted action, isolated"]
  end
  s2.workflow-worker-app -->|"1 proposes"| s3.action-control-service
  people.accountable-authorities -->|"2 approves"| s3.action-control-service
  s3.action-control-service -->|"3 grants"| s3.bounded-runner
  s3.bounded-runner -->|"4 runs, 5 records the receipt"| s5.proof-evidence-service
  s2.workflow-worker-app -.-> s4.model-data-gateway
  s2.workflow-worker-app -.-x|"no path"| s3.bounded-runner
```

<a id="fig-src-provider-ladder"></a>
## FIG-PROVIDER-LADDER: Losing a model provider degrades the loop in steps

*Appears in six-pager.md (diagram APX-6). Source: Mermaid equivalent of a generated SVG, built by the figure builder, its steps named by the profile's rung values.*

```mermaid
flowchart TB
  %% FIG-PROVIDER-LADDER: Losing a model provider degrades the loop in steps
  %% Node ids are the rung values a producer declares in the profile (ai_resilience.producer_rungs, lowest_rung) and the control plane's id in the planes view.
  frontier["1 Hosted frontier model: the default route, through one gateway"]
  self-hosted["2 Self-hosted open-weight model: kept qualified by scheduled drills"]
  no-agent["3 Scripted comparison: no agent; it already runs beside one"]
  manual["4 By hand: people run the loop, as in phase 1"]
  control["Control plane: no model at any step"]
  frontier -->|"route lost"| self-hosted
  self-hosted -->|"route lost"| no-agent
  no-agent -->|"route lost"| manual
  control -.->|"keeps working"| frontier
  control -.->|"keeps working"| self-hosted
  control -.->|"keeps working"| no-agent
  control -.->|"keeps working"| manual
```

<a id="fig-src-core-modules"></a>
## FIG-CORE-MODULES: The core and its four plug points

*Appears in 01-thesis.md; six-pager.md (diagram APX-4). Source: Mermaid equivalent of a generated SVG, its nodes named by the modules data's category and module ids and checked against the modules. Illustrative: the shape of the argument, with no data behind it.*

```mermaid
flowchart LR
  %% Node ids are the modules data's ids: each plug point carries its category id and each module its module id; the node named core is the core itself.
  core["Core: the loop, its four rules and the record; every organization runs it"]
  signals-in["Plug point: Signals in"]
  stakes["Plug point: Stakes"]
  reach["Plug point: Reach"]
  prevention-out["Plug point: Prevention out"]
  tool-portfolio["Existing security tools as leads. On when closed cases record which leads pointed at them"]
  consequence-gates["Consequence-informed gates beyond tiers. On when accepted findings record the assets they reach"]
  production-effects["Production effects. On when phase 3 decides to continue and a production profile is approved"]
  paved-road["Paved road. On when weakness classes recur across reproduced findings"]
  secure-creation["Secure creation (Jig). On when provenance stamps reach the share the organization sets"]
  signals-in --> core
  stakes --> core
  core --> reach
  core --> prevention-out
  tool-portfolio -.->|"plugs in at"| signals-in
  consequence-gates -.->|"plugs in at"| stakes
  production-effects -.->|"plugs in at"| reach
  paved-road -.->|"plugs in at"| prevention-out
  secure-creation -.->|"plugs in at"| prevention-out
```

<a id="fig-src-escape-catch"></a>
## FIG-ESCAPE-CATCH: Escape against catch, on the invoice timeline

*Appears in 01-thesis.md; six-pager.md (closing). Source: Mermaid equivalent of a generated SVG. Illustrative: the shape of the argument, with no data behind it.*

```mermaid
flowchart LR
  subgraph today["Today"]
    today1["A tester finds a view-only role that can approve invoices"]
    today2["It waits in the queue; the fix merges weeks later"]
    today3["The ticket closes on the merge; nobody retests"]
    today4["Months later, an unrelated change reopens the gap"]
    today5["It ships: the gap reaches production again"]
    todayEnd["An escape"]
  end
  subgraph ratchet["With Ratchet"]
    ratchet1["An independent reviewer reproduces the finding"]
    ratchet2["The fix is verified in the running system"]
    ratchet3["The test is kept in the invoicing team's pipeline"]
    ratchet4["Months later, the same unrelated change"]
    ratchet5["The kept test fails the change before it ships"]
    ratchetEnd["A catch"]
  end
  today1 --> today2
  today2 --> today3
  today3 --> today4
  today4 --> today5
  today5 --> todayEnd
  ratchet1 --> ratchet2
  ratchet2 --> ratchet3
  ratchet3 --> ratchet4
  ratchet4 --> ratchet5
  ratchet5 --> ratchetEnd
```

<a id="fig-src-sweep-loop"></a>
## FIG-SWEEP-LOOP: A sweep against the loop, across model releases

*Appears in 01-thesis.md; six-pager.md (regimes). Source: Structured description; Mermaid cannot carry a chart's shape. Illustrative: the shape of the argument, with no data behind it.*

Illustrative: the shape of the argument, with no data behind it. A line chart with no values on either axis: known open weaknesses (vertical) against time across model releases (horizontal), with three new model releases marked after a first sweep.

Series:
- **Backlog, left alone:** rises steadily across the whole period.
- **A sweep with each new model:** drops sharply at the first sweep, climbs back as later changes reintroduce weaknesses, and jumps at each new model release before the next sweep drops it again, so the line is a sawtooth that never stays down.
- **The sweep plus the loop:** the same first drop, then stays near the floor; each new model release adds a small tooth that the loop fixes and holds.

Relations:
- The first sweep lowers both sweep series by the same amount at the same time.
- Between releases, the sweep-only series rises and the loop series stays flat near the floor.
- At each release, the sweep-only series rises sharply and the loop series rises a little, then returns to the floor.
- The backlog series stays above both sweep series after the first sweep.
