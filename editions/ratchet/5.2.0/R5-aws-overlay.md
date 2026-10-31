<a id="r5"></a>
# Reference R5: AWS overlay

*Ratchet: closed-loop security validation for AI-assisted engineering. Reference R5. Edition 5.2.0, Thesis 1.4.3, 2026-10-31, build 5842e9bf+local.*

Candidate AWS services for every part, which keep the four rules under the organization's control, and the trade-offs that matter. Candidates, never requirements. Service facts checked 2026-10-16; services change, so check again before relying on one.

<a id="r5-eight-trade-offs-decide-whether-an"></a>
## Eight trade-offs decide whether an AWS build keeps the rules

1. **The account boundary is the trust-zone boundary.** Control, evidence, execution, reasoning and evaluation each get their own accounts. A service control policy on the reasoning OU denies every agent identity any action on control and evidence accounts, so a misconfigured role inside the reasoning account cannot reach a gate. IAM policies inside a single account cannot hold this line on their own.
2. **Running a managed service does not hand AWS the rule.** Where AWS runs a rule-enforcing part, the organization keeps the policies, the key policies, the schemas and the right to change them, and grants that right only to the control-plane operator role. AWS supplies the engine; who may edit what the engine enforces stays with the organization.
3. **The organization's management account is above every rule.** Administrators of the AWS Organizations management account can change service control policies and so can undo every separation above. Treat that account as break-glass: two-person access, no standing users, alarms on any use, outside the reach of anyone who also proposes or judges tests.
4. **Residency is a configuration, and some defaults cross borders.** Bedrock global cross-Region inference can process a request in any commercial Region, and cross-Region replication copies evidence wherever it points. A profile that lists data residency must use in-Region or geographic inference profiles only and replicate evidence only to Regions it allows; the overlay checker lists every part that can do this.
5. **Hold the fallback model route outside the primary provider's failure domain.** If the frontier route runs on Bedrock and the self-hosted fallback runs on the same AWS Regions, one provider event can take out two rungs of the model degradation ladder. Either qualify a fallback outside AWS or record the shared failure domain as a concentration in the profile.
6. **Cost follows two shapes.** Per-request services (Verified Permissions, Lambda, Step Functions, Bedrock tokens, KMS calls) scale with test and deploy volume, which suits a loop that starts small. Standing services (MSK, Aurora, EKS, CloudHSM, Network Firewall endpoints) cost by the hour whether or not tests run. Regression gates in every pipeline turn deploy count into per-request cost; price that path first.
7. **Proprietary choices at swap points turn a swap into a rewrite.** Where the design marks a part as swappable behind a stable contract, an open choice (Kafka on MSK, PostgreSQL on Aurora, Cedar on Verified Permissions) keeps the swap cheap. A proprietary one (Step Functions definitions, DynamoDB data model, Bedrock Guardrails) makes leaving a rewrite. Both can be right, so the annex lists each proprietary swap point for the organization to choose on purpose.
8. **Quotas are part of the availability budget.** Per-account, per-Region quotas (Bedrock tokens per minute, Lambda concurrency, Verified Permissions request rate, KMS request rate) fail like an outage when hit. Raise them before load, alarm at a share of each, and treat a throttled control as down: it fails closed.

Of the parts, 53 enforce one of the four rules (marked). For each, the table says what the organization keeps under its own control when AWS runs the service. The overlay is checked: every part is covered, no part sits in an account its trust zone does not allow, and every rule-enforcing part states what the organization keeps.

<a id="r5-each-trust-zone-gets-its-own"></a>
## Each trust zone gets its own accounts

| Account class | What lives there |
|---|---|
| control | Control-zone parts: authorization, grants, credentials, keys, audit, policy release, model-boundary gates, registers that decide. Own OU; only the control-plane operator role administers it. |
| evidence | Evidence-plane control-zone parts: intake, verification, ledger, proof conditions, evidence stores. Own account in the control OU, separate from control so one compromised role cannot both grant and record. |
| execution | One account per execution cell class (source build, staging, production profile). No route to the reasoning account except the dispatch contract. |
| reasoning | Context, orchestration, test-drafting agents and model access. Agent identities live here and nowhere else. |
| evaluation | Cohorts, matched evaluation, telemetry and value reporting. |
| existing | The organization's own systems and accounts; Ratchet connects to them through adapters. |
| identity | The organization's identity source, federated into IAM Identity Center. |

| Trust zone | Account classes it may use |
|---|---|
| control | control, evidence |
| execution | execution |
| reasoning | reasoning |
| evaluation | evaluation |
| shared:existing | existing |
| shared:third-party | existing |

<a id="r5-candidates-per-part"></a>
## Candidates per part

| Code | Part | AWS candidates | Who runs it | Account | What the organization keeps, and trade-offs |
|---|---|---|---|---|---|
| `s1.context-service` | Context and intent service **(enforces a rule)** | ECS on Fargate; EKS | managed open | reasoning | Keeps: The snapshot it serves is built and signed by the organization's compile job; the service only reads what the control side published. Stateless; scales to zero cost on Fargate between runs. |
| `s1.source-adapters` | Source adapters | AWS DMS; MSK Connect with Debezium; Amazon AppFlow | managed open | reasoning | MSK Connect keeps Debezium connectors portable; AppFlow is proprietary and suits SaaS sources only. |
| `s1.identity-validity-resolver` | Identity and validity resolver **(enforces a rule)** | AWS Entity Resolution; Splink on AWS Glue | managed, proprietary | reasoning | Keeps: Matching rules and their thresholds are versioned by the organization; a resolution change is a context change and is snapshotted. Entity Resolution is per-record priced; Splink on Glue is open and cheaper at volume. |
| `s1.context-compiler` | Scoped context compiler **(enforces a rule)** | Amazon MWAA; Step Functions; AWS Batch | managed open | reasoning | Keeps: Output is content-addressed and signed with a control-account KMS key the compiler can use only through a narrow grant. MWAA is Airflow; standing environment cost by the hour. |
| `s1.live-precondition-resolver` | Live precondition resolver **(enforces a rule)** | Lambda; ElastiCache for Valkey | managed open | control | Keeps: Runs in the control account; reads source systems with its own role, never through the reasoning account. Short TTL; a cache miss that cannot reach the source fails closed. |
| `s1.source-facts` | Source-owned fact and lineage store | Aurora PostgreSQL; Amazon Neptune | managed open | reasoning | Aurora PostgreSQL with temporal tables is the portable default; Neptune supports openCypher and Gremlin, so graph queries port, operational tooling does not. |
| `s1.criterion-registry` | Intent and criterion registry **(enforces a rule)** | the organization's Git host; S3 with versioning | existing | reasoning | Keeps: Branch protection and signed commits on the organization's Git host; agents get read-only access. |
| `s1.normative-store` | Approved normative store **(enforces a rule)** | the organization's Git host; Verified Permissions policy store | existing | reasoning | Keeps: Normative intent is authored by people under branch protection; agents read it, never write it. |
| `s1.snapshot-index` | Snapshot and dependency index | Amazon ECR (OCI artifacts); S3 | managed open | reasoning | ECR stores OCI artifacts through ORAS, so snapshots move with any OCI registry. |
| `s2.operator-interface` | API / operator interface | Backstage on EKS; the organization's portal | self run | reasoning |  |
| `s2.workflow-worker-app` | Workflow / worker application | ECS on Fargate; EKS | managed open | reasoning |  |
| `s2.request-dispatcher` | Request API and dispatcher | Amazon API Gateway; Application Load Balancer with Envoy | managed, proprietary | reasoning | API Gateway request quotas apply per account and Region. |
| `s2.workflow-engine` | Durable workflow engine | Temporal on EKS; AWS Step Functions; Lambda durable functions | self run | reasoning | Swap point. Temporal keeps the contract portable; Step Functions (Amazon States Language) and Lambda durable functions are proprietary, so choosing them makes this swap a rewrite. Step Functions Standard bills per state transition. |
| `s2.approved-producers` | Approved producers | Amazon ECR with AWS Signer or Sigstore cosign | managed open | reasoning | Keeps: Signing keys sit in the control account; the reasoning account can verify signatures but not sign. |
| `s2.producer-adapters` | Replaceable producer adapters | Bedrock AgentCore Runtime; ECS tasks running the adapter SDK | managed, proprietary | reasoning | AgentCore Runtime isolates each session in its own microVM; its agent framework stays the organization's. A model or framework change requalifies. |
| `s2.hybrid-source-producer` | Hybrid source producers | Amazon Inspector code scanning; Semgrep or fuzzing harnesses on AWS Batch | self run | reasoning |  |
| `s2.runtime-assessment-producer` | Runtime assessment producer | ZAP or Nuclei on ECS | self run | reasoning | No AWS-native black-box scanner; it proposes only, execution happens in an execution cell. |
| `s2.workflow-state-store` | Workflow state and outbox | Aurora PostgreSQL; Amazon Keyspaces for Temporal | managed open | reasoning |  |
| `s2.artifact-exchange` | Scoped artifact exchange | S3 with per-run prefixes; S3 Access Points; presigned URLs | managed | reasoning | The S3 API is the de facto standard; per-run access points keep one run from reading another's artifacts. |
| `s2.dispatch-queue` | Dispatch queue and attempt log | Amazon MSK with Debezium outbox; Amazon MQ for RabbitMQ; SQS with a DynamoDB Streams outbox | managed open | reasoning | Swap point. MSK and Amazon MQ keep it portable; SQS plus DynamoDB Streams is cheaper at low volume and proprietary. MSK is a standing hourly cost. |
| `s3.action-control-service` | Action control service **(enforces a rule)** | Bedrock AgentCore Gateway with Policy; Envoy ext_authz on EKS | managed, proprietary | control | Keeps: Whether AgentCore Gateway or Envoy, the decision comes from the organization's Cedar policies in the control account, and tool calls that bypass the gateway are denied by network and IAM, not by convention. AgentCore Policy (GA 2026-03-03) checks each agent-to-tool call against Cedar outside the agent's code, which is this part's job. It is proprietary at the gateway, open at the policy language. |
| `s3.action-broker` | Action broker **(enforces a rule)** | Lambda; ECS on Fargate | managed open | control | Keeps: Action normalization code is the organization's; the hash it computes is what approval binds to. |
| `s3.policy-decision-point` | Policy decision point **(enforces a rule)** | Amazon Verified Permissions; Open Policy Agent on EKS | managed open | control | Keeps: Policy store, schema and every PutPolicy call are limited to the control-plane operator role through the release pipeline. Turn on CloudTrail data events for IsAuthorized; they are off by default, and without them decisions are not recorded. Verified Permissions runs Cedar, which is open source, so policies port. Per-request priced; check the request-rate quota before pipelines depend on it. A throttled decision fails closed. |
| `s3.approval-service` | Approval service **(enforces a rule)** | Step Functions with task tokens; Temporal on EKS | managed, proprietary | control | Keeps: Approval binds to the action hash; the approver identity comes from Identity Center in a permission set no producer holds. Systems Manager Change Manager closed to new customers 2025-11-07 and is not a candidate; connect to the organization's change management through an adapter. |
| `s3.grant-approval-store` | Grant and approval store **(enforces a rule)** | DynamoDB with conditional writes; Aurora DSQL; Aurora PostgreSQL serializable | managed, proprietary | control | Keeps: Single-use consume is a conditional write the organization's code performs; grants are issued only by the approval service role. For a standby Region, use DynamoDB global tables in multi-Region strong consistency mode (GA 2025-06-30, chosen at creation and unchangeable); the default eventual mode could let a single-use grant be consumed twice across Regions, which the control-plane region-loss scenario forbids. |
| `s3.protected-audit` | Protected audit service **(enforces a rule)** | CloudTrail organization trail to S3 Object Lock in compliance mode; CloudTrail Lake | managed | control | Keeps: The log archive bucket sits in an account no Ratchet role administers; Object Lock compliance mode stops deletion even by the account root. Turn on CloudTrail log file integrity validation. QLDB is retired (end of support 2025-07-31) and is not a ledger option. |
| `s3.credential-lease-broker` | Credential / lease broker **(enforces a rule)** | IAM roles with STS session policies; EKS Pod Identity; IAM Roles Anywhere; Secrets Manager | managed, proprietary | control | Keeps: Session policies scope each lease to one granted action and time window; the broker is the only principal allowed to assume execution roles. STS caps role session length; set it to the grant window, not the default. |
| `s3.local-enforcement-point` | Local enforcement point **(enforces a rule)** | VPC with no internet gateway; AWS Network Firewall; Route 53 Resolver DNS Firewall; security groups | managed, proprietary | execution | Keeps: Egress allow-lists come from the grant; the execution account's network is changed only by the control-plane operator role. Network Firewall bills per endpoint hour; DNS Firewall closes the DNS exfiltration path that security groups leave open. |
| `s3.bounded-runner` | Bounded runner deployments **(enforces a rule)** | Lambda (Firecracker); ECS on Fargate; EC2 with Nitro isolation; Bedrock AgentCore Code Interpreter | managed, proprietary | execution | Keeps: Each run gets a fresh microVM or task with the leased credential only; the runner image is signed and pinned. Lambda and Fargate run on Firecracker microVMs; Lambda caps a run at 15 minutes, Fargate does not. |
| `s3.source-build-cell` | Isolated source/build cell **(enforces a rule)** | CodeBuild in a VPC without internet; EC2 build hosts | managed, proprietary | execution | Keeps: Dependencies come from a pinned internal mirror (CodeArtifact or the organization's); no runtime internet. |
| `s3.staging-cell` | Representative staging cell **(enforces a rule)** | separate staging account with EKS or ECS; AWS Fault Injection Service for drills | managed open | execution | Keeps: Staging data is synthetic or classified for the cell; the cell account is reachable only through granted actions; targets under test run in the cell's own account on Fargate or on nodes no other cell shares. |
| `s3.production-cell` | Approved production cell **(enforces a rule)** | Systems Manager Automation with approval; Lambda with leased credentials | managed, proprietary | execution | Keeps: Reversible actions only, each bound to a grant and the organization's change record. |
| `s3.observation-receipt` | Observation and receipt | KMS asymmetric signing; in-toto attestations | managed open | execution |  |
| `s4.model-data-gateway` | Model/data gateway **(enforces a rule)** | LiteLLM on ECS; Bedrock AgentCore Gateway; API Gateway in front of Bedrock | self run | reasoning | Keeps: It is the only egress to models: VPC endpoints and SCPs deny bedrock:Invoke* from every role except the gateway's. Swap point; LiteLLM keeps the route abstraction portable across Bedrock, self-hosted and other providers. |
| `s4.request-data-gate` | Request and data gate **(enforces a rule)** | Bedrock Guardrails sensitive information filters; Amazon Comprehend PII detection; Microsoft Presidio on Lambda | managed, proprietary | control | Keeps: Classification rules and the decision to block are the organization's; Guardrails is one detector among them, not the policy. Guardrails is proprietary; keep a portable detector beside it so a swap does not lose the gate. |
| `s4.route-budget-broker` | Route and budget broker **(enforces a rule)** | LiteLLM router and budgets; Bedrock application inference profiles for cost tags | self run | reasoning | Keeps: Route eligibility is read from the qualification registry; the broker cannot add a route. Bedrock tokens-per-minute quotas are per Region and model; the broker's fallback must treat throttling as an outage. |
| `s4.response-proposal-gate` | Response and proposal gate **(enforces a rule)** | Lambda JSON Schema validation; Bedrock Guardrails as an extra detector | managed open | control | Keeps: Schema validation in the organization's code is the gate; a detector score never passes an output on its own. |
| `s4.qualification-route-registry` | Qualification and route registry **(enforces a rule)** | SageMaker Model Registry; the organization's Git host | managed, proprietary | reasoning | Keeps: Route entries change only by promotion review's role, a release the registry verified itself, and the gateway's mismatch report; only key management's role writes the key references the registry verifies with. The verification runs in the organization's code, never as the registry service's own approval status. |
| `s4.inference-endpoints` | Inference endpoint adapters | Amazon Bedrock; Bedrock Custom Model Import; SageMaker endpoints; vLLM on EKS with GPU nodes | managed, proprietary | reasoning | Use in-Region or geographic cross-Region inference profiles under a residency constraint; global profiles may process anywhere. vLLM on EKS is the portable self-hosted rung. See the shared failure domain trade-off. |
| `s4.route-usage-receipts` | Route and usage receipts | CloudWatch; Bedrock model invocation logging to S3 | managed, proprietary | reasoning | Invocation logging is off by default; logs stay in the source Region and record the Region that served the request. |
| `s5.proof-evidence-service` | Proof and evidence service **(enforces a rule)** | ECS on Fargate; Lambda | managed open | evidence | Keeps: Sole writer to the evidence stores: bucket and table policies deny every other principal, including administrators of other Ratchet accounts. |
| `s5.evidence-intake-validator` | Evidence intake validator **(enforces a rule)** | Lambda with JSON Schema and in-toto verification; SQS intake queue | managed open | evidence | Keeps: Agents can only send to the intake queue; the validator is the only consumer and the only path into the ledger. |
| `s5.independent-verifier` | Independent proof verifier **(enforces a rule)** | Step Functions or Temporal running reproduction harnesses in an execution account | managed, proprietary | evidence | Keeps: Runs under its own credential path and execution role, never one a producer used. |
| `s5.repair-checks` | Independent repair checks **(enforces a rule)** | CodeBuild; the organization's CI | existing | evidence | Keeps: Runs the unmodified harness pinned by hash. |
| `s5.disposition-review` | Disposition and review service **(enforces a rule)** | Step Functions with task tokens; Temporal | managed, proprietary | evidence | Keeps: Decider identity differs from proposer and proof-condition holder; Identity Center permission sets enforce it. |
| `s5.fixture-oracle-registry` | Fixture and oracle registry **(enforces a rule)** | S3 bucket with a dedicated KMS key; Secrets Manager; the organization's Git host | managed | evidence | Keeps: The KMS key policy names no agent role, so an agent cannot decrypt the proof condition even if a bucket policy is wrong. Never index this bucket into a Bedrock knowledge base. |
| `s5.protected-evidence-store` | Protected evidence store **(enforces a rule)** | S3 Object Lock in compliance mode; AWS Backup Vault Lock | managed | evidence | Keeps: Compliance-mode retention cannot be shortened by anyone, including the account root; the organization sets the retention. Cross-Region replication for region-loss recovery copies evidence; point it only at Regions the profile allows. |
| `s5.finding-ledger` | Root-cause and finding ledger **(enforces a rule)** | Aurora PostgreSQL with append-only tables and periodic hash digests to Object Lock | managed open | evidence | Keeps: Append-only enforced by grants and triggers; digests anchored in Object Lock make tampering detectable. QLDB is retired; AWS itself points QLDB users to Aurora PostgreSQL. |
| `s6.hardening-service` | Hardening and regression service | the organization's PR and review workflow | existing | reasoning | The fix-path drafting it directs runs in the reasoning account, where agent identities live. Changes reach the organization's release workflow as pull requests, so deploy credentials stay with that workflow. |
| `s6.owner-change-connector` | Owner/change connector | Lambda webhooks; EventBridge API destinations | managed, proprietary | reasoning | Swap point; EventBridge makes the connector proprietary, a small Lambda keeps it cheap to replace. |
| `s6.release-state-correlator` | Release and state correlator **(enforces a rule)** | CodePipeline or the organization's CD; ECR image digests; EventBridge | managed, proprietary | evidence | Keeps: Deployed state comes from the deploy system's own record, never from the team asserting closure. |
| `s6.retest-regression-planner` | Retest and regression planner **(enforces a rule)** | EventBridge Scheduler; Temporal schedules | managed, proprietary | evidence | Keeps: Schedules are derived from the ledger; nobody edits them by hand. |
| `s6.change-closure-records` | Change and closure records **(enforces a rule)** | Aurora PostgreSQL append-only | managed open | evidence | Keeps: Closure needs two human acceptances and a deploy record; the table rejects a closure without them. |
| `s6.regression-catalog` | Reviewed regression catalog **(enforces a rule)** | the organization's Git host; Backstage catalog | existing | evidence | Keeps: Kept tests live in the owning team's repository; the catalog indexes them. |
| `s6.enterprise-adapters` | Existing CI/release/SOC adapters | EventBridge; Lambda; AppFlow for SaaS trackers | managed, proprietary | existing |  |
| `s7.evaluation-operations` | Evaluation and operations service | ECS on Fargate | managed open | evaluation |  |
| `s7.snapshot-cohort-manager` | Snapshot and cohort manager | S3 versioning with lakeFS on EKS; SageMaker datasets | self run | evaluation |  |
| `s7.matched-evaluation-executor` | Matched evaluation executor | Bedrock model evaluation; SageMaker Processing; AWS Batch | managed, proprietary | evaluation | Swap point. Keep the harness in the organization's code and use Bedrock evaluation as one runner, so a model swap does not also change the yardstick. |
| `s7.promotion-review` | Accountable promotion review **(enforces a rule)** | Step Functions with task tokens; Temporal | managed, proprietary | control | Keeps: Promotion authority is separate from evaluation; the evaluation account cannot write the route registry. |
| `s7.evaluation-artifacts` | Protected evaluation artifacts | Amazon SageMaker managed MLflow; S3 | managed open | evaluation |  |
| `s7.qualification-assurance-record` | Qualification and assurance record | Aurora PostgreSQL append-only | managed open | evaluation |  |
| `s7.flow-cost-telemetry` | Flow/cost/operational telemetry | AWS Cost and Usage Reports with cost allocation tags; Athena | managed, proprietary | evaluation | Tag every Ratchet resource and Bedrock application inference profile with the business unit so cost per accepted fix can be computed. |
| `ext.estate` | Existing estate and facts | the organization's AWS accounts and other estates | existing | existing |  |
| `ext.soc-incident-response` | SOC / incident response | the organization's SIEM; Amazon Security Lake; Amazon GuardDuty | existing | existing |  |
| `ext.hosted-frontier-endpoint` | Approved hosted frontier | Amazon Bedrock (in-Region or geographic inference profiles); a contracted provider outside AWS | managed, proprietary | existing | Bedrock puts the frontier route inside the same provider as the rest of Ratchet; see the shared failure domain trade-off. |
| `s3.approval-console` | Exact-action approval console **(enforces a rule)** | Backstage plugin on a separate Identity Center permission set; AWS Verified Access | self run | control | Keeps: Reached only through Verified Access from approver identities; no producer network path. |
| `s5.review-console` | Independent evidence review console **(enforces a rule)** | Backstage plugin behind AWS Verified Access | self run | evidence | Keeps: Reached only from reviewer identities; cross-partition reads are attributed. |
| `s7.assurance-incident-integration` | Assurance and incident integration **(enforces a rule)** | Amazon Security Lake (OCSF); Security Hub; the organization's SIEM | managed open | control | Keeps: Detection reconciliation reads the SOC's own record; Ratchet never marks a test as seen by detection itself. |
| `s1.consequence-register` | Consequence register (crown jewels and mission impact) **(enforces a rule)** | Aurora PostgreSQL; DynamoDB | managed open | control | Keeps: Tiers are written only through the attestation workflow by the business owner's role; the testing team drafts, it does not confirm. Lives in the control account because gate posture reads it. |
| `s5.path-impact-graph` | Demonstrated path-impact graph **(enforces a rule)** | Amazon Neptune; Aurora PostgreSQL with Apache AGE (self-managed) | managed open | evidence | Keeps: Written only by the evidence service from verified paths. |
| `s3.gate-failure-policy` | Gate failure policy **(enforces a rule)** | S3 with signed posture bundles; AWS AppConfig | managed | control | Keeps: Postures are signed with a control-account KMS asymmetric key; deploy stages verify offline with the public key, so the gate answers without the control plane. AppConfig adds staged rollout and automatic rollback for posture bundles. |
| `ext.threat-intelligence` | Threat intelligence and exploitation signals | the organization's threat intelligence platform; GuardDuty threat lists | existing | existing |  |
| `s5.failure-class-registry` | Failure-class registry **(enforces a rule)** | Aurora PostgreSQL | managed open | evidence | Keeps: Versions append; a class is created only from verified findings. |
| `s6.paved-road-catalog` | Paved-road catalog | Backstage on EKS; AWS Service Catalog; EC2 Image Builder golden images | self run | existing | Service Catalog and Image Builder fit the AWS-specific road entries; Backstage keeps the portal portable. |
| `s6.road-conformance-check` | Road conformance check **(enforces a rule)** | AWS Config conformance packs; Kyverno on EKS; Amazon Inspector SBOM export | managed, proprietary | control | Keeps: Conformance rules are versioned with the road entry; a rule change requalifies. |
| `s7.road-adoption-telemetry` | Road adoption and escape-hatch telemetry | Athena over the flow store; Managed Grafana | managed open | evaluation |  |
| `s5.road-assurance-record` | Road assurance record **(enforces a rule)** | Aurora PostgreSQL append-only; KMS-signed in-toto attestations | managed open | evidence | Keeps: Signed with a control-account key; the road team cannot sign its own assurance record. |
| `ext.appsec-tooling` | Existing AppSec tooling and external findings | the organization's scanners; Amazon Inspector; Amazon Q Developer code review | existing | existing | CodeGuru Security was discontinued 2025-11-20; AWS points to Q Developer and Inspector. |
| `ext.security-review-practice` | Threat modeling and security review practice | the organization's threat-modeling records | existing | existing |  |
| `s1.tool-signal-intake` | Tool signal intake | AWS Security Hub (OCSF findings); Amazon Inspector; Lambda normalizer | managed, proprietary | reasoning | Security Hub aggregates findings in OCSF; CodeGuru Security was discontinued 2025-11-20 and is not a source. A scanner version change still requalifies. |
| `s1.tool-lead-store` | Tool lead store | Aurora PostgreSQL | managed open | reasoning | Separate database from source facts, so a lead never reads as a fact. |
| `s6.developer-queue-filter` | Developer-queue filter **(enforces a rule)** | Verified Permissions or OPA rules over findings; Lambda | managed open | control | Keeps: Routing rules and the confidence bar are signed settings in the dial register, not code in the tracker. |
| `s7.tool-yield-evaluator` | Tool yield and miss-rate evaluator | AWS Batch; Athena | managed | evaluation |  |
| `s7.tool-delivery-impact` | Tool delivery-impact evaluator | Athena over pipeline and tracker exports | managed | evaluation |  |
| `s7.tool-portfolio-decisions` | Tool portfolio decision record **(enforces a rule)** | the organization's Git host; Aurora PostgreSQL | existing | control | Keeps: Each decision is attested by its owner and recorded with the obligation it serves. |
| `s2.quarantined-lead-reader` | Quarantined lead reader | Lambda behind the AI gateway with no tool bindings; Bedrock structured outputs | managed, proprietary | reasoning | No IAM permissions beyond calling the gateway; schema-validated output only. |
| `s7.dial-register` | Dial register **(enforces a rule)** | the organization's Git host with signed commits; AppConfig | existing | control | Keeps: Changes need the approval workflow; AppConfig only distributes what was approved. |
| `s7.sampling-service` | Sampling and seeding service | AWS Batch; Step Functions | managed | evaluation |  |
| `s7.value-ledger` | Business-unit value ledger | Amazon Athena over S3; Amazon Redshift Serverless; Amazon QuickSight | managed, proprietary | evaluation |  |
| `s7.failover-drill` | Failover drill | EventBridge Scheduler with Step Functions; AWS Fault Injection Service | managed, proprietary | evaluation | Drill the fallback route on the same seeded cases; include a Region and a Bedrock quota failure. |
| `s3.privileged-access-broker` | Privileged access broker **(enforces a rule)** | IAM Identity Center with temporary elevated access; Systems Manager Session Manager with session logging | managed, proprietary | control | Keeps: Elevation needs a second approver and expires; sessions are recorded to the log archive account. |
| `s3.key-management` | Key management **(enforces a rule)** | AWS KMS; KMS with CloudHSM key store; KMS external key store | managed, proprietary | control | Keeps: Key policies name the control-plane operator role as sole administrator and grant use, never administration, to Ratchet services. An external key store keeps root keys outside AWS entirely, and the organization then owns their availability. CloudHSM is a single-tenant hourly cost per HSM. Multi-Region keys simplify evidence restore in a second Region; scope them to Regions the profile allows. |
| `s3.local-audit-buffer` | Local audit buffer **(enforces a rule)** | Kinesis Data Firehose to the log archive bucket; local hash-chained file with forward shipping | managed, proprietary | execution | Keeps: Hash chain computed in the cell; the destination bucket is Object Lock in the log archive account. |
| `s3.replay-verdict` | Replay verdict check **(enforces a rule)** | Lambda comparing against registered outcome hashes | managed | execution | Keeps: Compares against hashes only; the proof condition itself never enters the cell. |
| `s3.policy-release-pipeline` | Policy release pipeline **(enforces a rule)** | CodePipeline or the organization's CI; AppConfig staged deployment; Cedar policy tests | managed | control | Keeps: Only this pipeline holds write access to the policy store; a deny-diff review is a required stage. |
| `s7.reliability-monitor` | Reliability monitor | CloudWatch Application Signals SLOs; Amazon Managed Service for Prometheus; Amazon Managed Grafana | managed open | evaluation | The dead-man alarm must run outside AWS (or at least outside the monitored Regions and account), or a provider event silences the alarm with the system. |
| `s2.typed-decision-worker` | Typed decision worker | Lambda behind the AI gateway; ECS on Fargate; SageMaker endpoint for the small-classifier baseline | managed | reasoning | Typed routes such as System One models are hosted outside AWS today; route them through the same gateway and keep a fallback per decision type. |
| `s2.proof-condition-drafter` | Proof-condition drafter | Lambda behind the AI gateway with no tool bindings; Bedrock structured outputs | managed, proprietary | reasoning | Its own route and role: no IAM permissions beyond calling the gateway, no access to the stores test-drafting agents use; drafts are shown to the scenario owner only. |
| `s6.fix-cap-gate` | Fix-cap gate **(enforces a rule)** | Verified Permissions or OPA rules over findings; Lambda | managed open | control | Keeps: Cap values and the consequence line are signed settings read by the gate, never code in the tracker; only the gate's identity can write a refusal. |
| `s6.fix-cap-refusal-log` | Fix-cap refusal log **(enforces a rule)** | Aurora PostgreSQL append-only; the organization's tracker as the existing-tool rung | managed open | evidence | Keeps: A refusal row is written before the finding is held back; reviews append and never edit the refusal. |
| `s5.fix-brief-builder` | Fix brief builder **(enforces a rule)** | Step Functions or Temporal with templates; Lambda | managed open | evidence | Keeps: Reads proof conditions under the evidence identity only; the brief schema has no field for expected outcomes or outsider text, and no model endpoint is reachable from its role. |
| `s5.learning-store` | Learning store **(enforces a rule)** | Aurora PostgreSQL with append-only tables; Lambda for the retrieval check | managed open | evidence | Keeps: Only the disposition service's role can write; the retrieval check runs under the evidence identity and withholds items without provenance before anything reaches the context compiler. |
| `s5.exposed-secret-intake` | Exposed-secret intake **(enforces a rule)** | Lambda computing a keyed fingerprint; AWS KMS envelope encryption under a key per owning team | managed open | evidence | Keeps: The function is the only consumer of secret scanner hits; it writes fingerprints onward and seals a value under the owning team's key only when a recipe calls for a probe. |
| `ext.known-exploited-catalog` | Public known-exploited vulnerability catalog | the public catalog's structured feed; fetched as is | existing | existing |  |
| `s6.team-regression-suite` | Team regression suite | The owning team repository and CI | existing | existing |  |
| `s6.kept-test-mirror` | Kept-test mirror **(enforces a rule)** | Security-owned inventory store | existing | evidence | Keeps: Read-only source credentials never edit a repository or CI suite. Append-only enrollment and observations retain removed tests and unknown collection gaps. Administration uses the privileged access broker under dual control. |
| `jig:secure-creation` | Jig (secure creation at the developer's edit) | the organization's secure-creation loop; AWS CodeBuild for push and pull-request checks | existing | existing |  |
| `jig:context-plane` | Context plane: paved-road guidance and skills | the organization's source control and developer portal | existing | existing |  |
| `jig:check-suite` | Shared check suite and policy source | the organization's policy repository; AWS CodeBuild for required checks | existing | existing |  |
| `jig:inner-loop` | Inner loop: the agent's turn | managed developer endpoints | existing | existing |  |
| `jig:coding-agent` | Coding agent session | the organization's approved coding harnesses | existing | existing |  |
| `jig:harness-full-parity` | Coding harness with full parity (example) | the organization's approved coding harness | existing | existing |  |
| `jig:harness-no-pinning` | Coding harness without version pinning (example) | the organization's approved coding harness | existing | existing |  |
| `jig:harness-no-stop-gate` | Coding harness without a stop gate (example) | the organization's approved coding harness | existing | existing |  |
| `jig:edit-checks` | Per-edit checks | checks run by the harness's edit hooks on the endpoint | existing | existing |  |
| `jig:stop-gate` | Stop gate | the harness's stop hook on the endpoint | existing | existing |  |
| `jig:quarantined-reader` | Quarantined reader for outside text | Amazon Bedrock with no tools and no knowledge base | managed, proprietary | existing |  |
| `jig:reader-schema-gate` | Reader schema gate | AWS Lambda running a schema validator | managed open | existing |  |
| `jig:model-routes` | Model routes for coding agents and reviewers | Amazon Bedrock; a contracted provider outside AWS | managed, proprietary | existing |  |
| `jig:reader-model-route` | Model route for the quarantined reader | Amazon Bedrock under a separate role with no tools and no knowledge base | managed, proprietary | existing |  |
| `jig:repository` | Repositories and mirrored dependencies | the organization's source control; AWS CodeArtifact as the dependency mirror | existing | existing |  |
| `jig:change-boundary` | Commit and push boundary | the organization's source control | existing | existing |  |
| `jig:precommit-gate` | Locked pre-commit gate | pre-commit hooks on a hook path locked by endpoint management | existing | existing |  |
| `jig:provenance-stamper` | Provenance stamper | signed commit trailers; AWS Signer | existing | existing |  |
| `jig:protected-branch` | Protected branch and server-side required checks | the organization's source control branch protection; AWS CodeBuild for required checks | existing | existing |  |
| `jig:pr-plane` | Pull-request plane | the organization's pull-request checks | existing | existing |  |
| `jig:pr-analysis` | Diff-scoped deep analysis | the organization's static analysis in AWS CodeBuild; Amazon Inspector code scanning | existing | existing |  |
| `jig:pr-triage` | Model triage of pull-request findings | Amazon Bedrock | managed, proprietary | existing |  |
| `jig:ai-reviewer` | AI reviewer from a second model family | Amazon Q Developer code review; a second model family through Amazon Bedrock | managed, proprietary | existing |  |
| `jig:hunk-router` | Hunk router | code owners rules and a routing job in AWS CodeBuild | existing | existing |  |
| `jig:hunk-risk-advisor` | Hunk-risk advisor | Amazon Bedrock | managed, proprietary | existing |  |
| `jig:autofix` | Autofix | Amazon Q Developer; Amazon Bedrock | managed, proprietary | existing |  |
| `jig:measurement-plane` | Measurement plane and layer log | Amazon Athena over the layer log; Amazon QuickSight | managed | existing |  |
| `jig:outside-text` | Text from outside the organization | the public web; read only through the quarantined reader | existing | existing |  |
| `shared:ext.engineering-workflows` | Existing engineering workflows | the organization's tracker; SCM; CI/CD and change management | existing | existing | Systems Manager Change Manager closed to new customers 2025-11-07. |

<a id="r5-swap-points-where-the-proprietary-candidate"></a>
## Swap points where the proprietary candidate makes a later swap a rewrite

- **Replaceable producer adapters** (`s2.producer-adapters`): Bedrock AgentCore Runtime; ECS tasks running the adapter SDK
- **Credential / lease broker** (`s3.credential-lease-broker`): IAM roles with STS session policies; EKS Pod Identity; IAM Roles Anywhere; Secrets Manager
- **Bounded runner deployments** (`s3.bounded-runner`): Lambda (Firecracker); ECS on Fargate; EC2 with Nitro isolation; Bedrock AgentCore Code Interpreter
- **Inference endpoint adapters** (`s4.inference-endpoints`): Amazon Bedrock; Bedrock Custom Model Import; SageMaker endpoints; vLLM on EKS with GPU nodes
- **Owner/change connector** (`s6.owner-change-connector`): Lambda webhooks; EventBridge API destinations
- **Existing CI/release/SOC adapters** (`s6.enterprise-adapters`): EventBridge; Lambda; AppFlow for SaaS trackers
- **Matched evaluation executor** (`s7.matched-evaluation-executor`): Bedrock model evaluation; SageMaker Processing; AWS Batch
- **Approved hosted frontier** (`ext.hosted-frontier-endpoint`): Amazon Bedrock (in-Region or geographic inference profiles); a contracted provider outside AWS
- **Road conformance check** (`s6.road-conformance-check`): AWS Config conformance packs; Kyverno on EKS; Amazon Inspector SBOM export
- **Tool signal intake** (`s1.tool-signal-intake`): AWS Security Hub (OCSF findings); Amazon Inspector; Lambda normalizer
- **Privileged access broker** (`s3.privileged-access-broker`): IAM Identity Center with temporary elevated access; Systems Manager Session Manager with session logging
- **Key management** (`s3.key-management`): AWS KMS; KMS with CloudHSM key store; KMS external key store
- **Quarantined reader for outside text** (`jig:quarantined-reader`): Amazon Bedrock with no tools and no knowledge base
- **Model routes for coding agents and reviewers** (`jig:model-routes`): Amazon Bedrock; a contracted provider outside AWS
- **Model route for the quarantined reader** (`jig:reader-model-route`): Amazon Bedrock under a separate role with no tools and no knowledge base
- **Model triage of pull-request findings** (`jig:pr-triage`): Amazon Bedrock
- **AI reviewer from a second model family** (`jig:ai-reviewer`): Amazon Q Developer code review; a second model family through Amazon Bedrock
- **Hunk-risk advisor** (`jig:hunk-risk-advisor`): Amazon Bedrock
- **Autofix** (`jig:autofix`): Amazon Q Developer; Amazon Bedrock

<a id="r5-parts-that-can-move-data-across"></a>
## Parts that can move data across Regions unless configured not to

- **Inference endpoint adapters** (`s4.inference-endpoints`)
- **Protected evidence store** (`s5.protected-evidence-store`)
- **Approved hosted frontier** (`ext.hosted-frontier-endpoint`)
- **Model routes for coding agents and reviewers** (`jig:model-routes`)
- **Model route for the quarantined reader** (`jig:reader-model-route`)

<a id="r5-sources-for-the-service-facts"></a>
## Sources for the service facts

- [QLDB end of support 2025-07-31](https://www.infoq.com/news/2024/07/aws-kill-qldb)
- [Policy in Bedrock AgentCore GA 2026-03](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available/)
- [DynamoDB multi-Region strong consistency GA 2025-06-30](https://aws.amazon.com/about-aws/whats-new/2025/06/amazon-dynamo-db-global-tables-multi-region-strong-consistency-generally-available/)
- [Bedrock global vs geographic cross-Region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/global-cross-region-inference.html)
- [Verified Permissions IsAuthorized as CloudTrail data events, off by default](https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/monitoring-cloudtrail.html)
- [Change Manager closed to new customers 2025-11-07](https://docs.aws.amazon.com/systems-manager/latest/userguide/change-manager.html)
- [CodeGuru Security discontinued 2025-11-20](https://docs.aws.amazon.com/it_it/codeguru/latest/security-ug/end-of-support.html)
- [Lambda durable functions GA 2025-12-02](https://aws.amazon.com/about-aws/whats-new/2025/12/lambda-durable-multi-step-applications-ai-workflows/)
- [KMS external key stores](https://docs.aws.amazon.com/kms/latest/developerguide/keystore-external.html)
