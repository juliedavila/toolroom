# Jig

*Jig. Read me. Edition 0.3.0, 2026-10-31, build a5c1bc9e+local.*

Jig is a design for the place where code is written. It steers developers and their coding agents toward secure patterns, and catches defects between the first edit and the merge. Jig ships as an edition line of its own, with its own version and changelog. It ships design files, an adopter skill and one script, the profile check; Ratchet's tools check the design. Its prose argument is still in draft.

## Adopt Jig with its skill

An organization's agent adopts Jig through the skill in this folder. Load `SKILL.md`, then follow `workflow-start.md`: it verifies this folder, sets up the organization's workspace alone or beside Ratchet, and says where the tools come from. Seeding comes next (`workflow-seed.md`): the agent maps how the organization creates code today from local sources the person names, and records each finding in the organization's Jig profile as discovered until a person confirms it. Seeding and the profile need no tools beyond the shipped profile check, which needs Bun only. Design changes need a verified Ratchet edition for its tools; without one they are blocked, and the start workflow lists what stays unchecked. The sections below describe the design and the compose recipe the start workflow uses.

## Five stages, each with an exit test

Jig's work units sit in five stages of its own: Attribute, One check, many places, Agent fixes first, Focus the humans and Pave the road. `phases.yaml` holds each stage's exit test. Waits on Ratchet hold the affected stage's exit test. Cycles and chains are judged across both designs.

## How Jig meets Ratchet

Neither design names the other outside descriptive records. Views may name Ratchet parts and relationships with `ratchet:`. A lone view keeps a referenced part when an incident shared crossing supplies its boundary and otherwise omits the reference. Everything that crosses between the designs lives in the shared layer, `seams.yaml`: each crossing with the contract it carries, the contracts both designs read or write, the engineering system both depend on with its premises, and the capabilities Jig's units wait on. Every direct delivery between Ratchet and Jig carries a contract with one producing side. Shared-system trigger and control crossings may carry no contract. A change to a shared contract or premise needs the acceptance of the owners of each side of that agreement. Each shared contract and premise carries per-side owners records with shipped roles and organization-filled identities. The compiler or patch applier requires those identities' acceptance for a changed agreement in every composition, including Jig alone. A plain model-check run does not attest that the initial identities were bound or accepted. Organizational review supplies the authorization behind the records.

Ratchet pins the Jig edition it ships with, and Jig pins nothing, so Jig ships first. Ratchet runs alone. Jig alone starts by inventorying creation premises and harness coverage; its stages cannot claim their exit tests until their Ratchet waits are met. Those waits are creation-loop targets, derived checks, catch-layer attribution, lagged cohort reporting, derived-check miss counts, published class-test results and typed handoffs. These are the capabilities declared in the shared layer and required by Jig's units. This edition ships no substitute for any of them. An organization may declare its own in its Jig profile, and a declared substitute counts only once a person confirms it is in place and fit for the capability; the waiting stage still needs its own exit-test evidence. Run alone, Jig is checked with that layer, and each crossing is judged at Jig's edge from the far side's declared exposure.

## What this folder holds

| File | What it holds |
|---|---|
| `model.yaml` | Jig's parts, roles, relationships and contracts. Their ids are bare here; other designs name them with the `jig:` prefix. |
| `realization.yaml`, `quality.yaml`, `failures.yaml`, `overlay-aws.yaml` | The design layers for Jig's parts, in the shapes Ratchet's edition uses. |
| `units.yaml` | Jig's work units, each with a flow item and any manual work it retires or reduces. |
| `manual-work.yaml` | The catalog of generic kinds of manual work that units refer to. The editions ship it from the same source. |
| `phases.yaml` | The five stages and their exit tests. |
| `moved.yaml` | Identifier and namespace migrations from the combined design. |
| `claims.yaml` | Jig's premise register: each premise with its grade and the design items it rests on. |
| `seams.yaml` | The shared layer: what Jig and Ratchet both reference, the same bytes in every edition that ships it. |
| `SKILL.md`, `workflow-start.md`, `workflow-seed.md`, `workflow-fill-profile.md`, `workflow-change-design.md`, `workflow-upgrade.md`, `workflow-send-upstream.md`, `workflow-with-plumb.md` | The adopter skill: how an organization's agent starts, seeds, fills, changes, upgrades and reports on Jig. |
| `profile-schema.yaml` | Every field of an organization's Jig profile, as JSON Schema 2020-12, with a plain description. Each answer carries its own evidence and confirmation. Unanswered answers are valid. |
| `profile-template.yaml` | The profile with every field present and unanswered, to copy into the organization's workspace. |
| `jig-profile-check.ts` | The profile check: validates a filled profile against `profile-schema.yaml` and the parts in `model.yaml`, refuses what the schema refuses, and lists each unanswered answer as a warning. Shipped code that needs Bun only, run from this folder; it is not a tool specification. |
| `plumb/engine.yaml`, `plumb/model.yaml`, `plumb/plan.yaml` | The files Plumb reads when it adds this edition as a design. |
| `edition.yaml` | This edition's line, version and build, and the SHA-256 of every other file here. |
| `CHANGELOG.md` | What changed in each edition, with the renamed identifiers to apply. |

Check a copy of this folder against `edition.yaml` before relying on it.

## Start with Jig alone

A fresh adopter starts here. The older changelog's renames apply only to records carried over from the combined design. Use the bare version in `edition.yaml` for version records. Its `released` field gives the release state. A draft label describes a working build. Drafts are for evaluation only. Use a released edition for adoption. Historical changelog headings do not override the edition record.

Keep the edition intact. The recipe below verifies its recorded hashes and composes its own files with its own shared layer. It needs Bun and reads no Ratchet folder, fixture bundle or author workspace. Save the complete TypeScript block under the script name in the command below, beside the edition folder, then run:

```sh
bun compose-jig.ts jig-edition jig-composed
```

Use a new output folder. Run the model checks on its `model.yaml` with that folder as the layer input. Run the realization, quality, failure and overlay checks on the same inputs. The model-check tools are built from Ratchet's tool specifications and proved against their fixtures. Jig ships no separate tool specification. An organization must use a tool that honors lone compositions and the verified shared security floor. A plain run of Jig's partial layer files is not a composition.

The composition keeps whole incident crossings and creates absent endpoints from their five declared exposure marks. It merges shared plane, tier, failure-mode and account vocabulary with the own layers and loads scenarios attached to shared agreements. It keeps owner sides qualified. Own ids are bare, including harness compensation targets. Shared identities retain `shared:`. A value such as `shared:existing` has the rule meaning of `existing`, including overlay fit and account values. This does not rename the identity in a finding. The unit wrapper qualifies shared capability references on both the declarations and the requirements.

The bare edition warns about the shipped exception's null end. Shared agreement owner identities, including shared claims and absent sides, are bound in the organization's own dependency layer as a person names each one. A first run may leave a row role only, name pending: it authorizes nothing, and a change to that agreement waits until every row of it is bound. An identity names a person or team, never the shipped role text. Record each assigned identity's acceptance and a basis of confirmed or provisional. Use the patch applier's `bind_claim_owners` op for each stable shared claim id. Provisional assignments count as filled for the first run and remain gaps in the current-practice map until confirmed. An identity-only binding changes identities and their basis. A later agreement change requires the recorded former and new owners' acceptance. Preserve every qualified `side` and shipped `role`.

Calculate each patch operation's `expects` hash from its exact target composition before that operation, using the patch applier's hash rule. A hash calculated on a Ratchet projection need not match the same agreement in a Jig projection because local references have different qualified forms.

Keep the organization's exceptions in an `org.yaml` mapping under `seam_exceptions`. Use `shared:secure-creation` as the seam key and qualified contract names such as `shared:CatchLayer`, `shared:ReviewerSeedCatch` and `shared:DroppedCheck`. Copy the shipped exception's other fields, replace `until` with the organization's chosen calendar end, and set `accepted_by` to the identity of the person or team accepting the risk. The shipped Ratchet role identifies a responsibility to assign. It does not require a Ratchet part in a lone organization. Pass this mapping with the model checks' `--org` option. A null or past end fails. A replacement list replaces the whole seam's exception list, so retain every exception the organization still needs.

Module declaration checks do not apply to Jig alone. Jig ships no module declaration file. Its module tags identify the creation loop. The lone run reports the absent module declarations and still runs its structural, realization, quality, failure and overlay checks. The units' `phase` field selects the stage. Premise coverage comes from the premise register.

The lone unit-graph report lists each direct external wait under `external_waits`, with its unit, stage, capability and absent provider. Its phase self-containment field describes closure within the design. Read the external waits beside it before claiming a stage exit. Later stages also inherit their prerequisite units' waits.

| Stage | Unit | Required Ratchet capability |
|---|---|---|
| Attribute | U-430 | creation-loop targets |
| Attribute | U-436 | catch-layer attribution and lagged cohort reporting |
| Attribute | JU-01 | published class-test counts |
| One check, many places | U-431 | derived checks |
| One check, many places | U-438 | derived-check miss counts |
| One check, many places | JU-02 | published typed handoffs |
| Focus the humans | U-437 | lagged cohort reporting |

```typescript
// This complete recipe is included in the edition README and runs with Bun alone.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {join, resolve} from 'path';

export function composeJig(folder: string, output: string) {
  const read = (name: string): any => Bun.YAML.parse(readFileSync(join(folder, name), 'utf8'));
  const list = (value: any): any[] => Array.isArray(value) ? value : [];
  const sha = (value: string | Uint8Array) => new Bun.CryptoHasher('sha256').update(value).digest('hex');
  if (resolve(output) === resolve(folder) || resolve(output).startsWith(resolve(folder) + '/')) throw Error('Use a separate output folder.');
  if (existsSync(output)) throw Error('Use a new output folder.');
  const edition = read('edition.yaml');
  if (edition.namespace !== 'jig' || !Array.isArray(edition.files)) throw Error('Not a Jig edition record.');
  for (const file of edition.files) {
    if (sha(readFileSync(join(folder, file.path))) !== file.sha256) throw Error('Edition hash mismatch: ' + file.path);
  }
  if (sha(edition.files.map((file: any) => `${file.sha256}  ${file.path}\n`).join('')) !== edition.digest) throw Error('Edition digest mismatch.');
  if (sha(readFileSync(join(folder, 'seams.yaml'))) !== edition.shared.sha256) throw Error('Shared hash mismatch.');
  const own = read('model.yaml'), shared = read('seams.yaml');
  const unitSource = read('units.yaml');
  const ownUnits = Array.isArray(unitSource) ? unitSource : unitSource.units;
  const ownIds = new Set([
    ...['systems', 'trust_zones', 'elements', 'relationships', 'contracts', 'seams', 'views'].flatMap(key => list(own[key]).map(row => row[key === 'contracts' ? 'name' : 'id'])),
    ...list(ownUnits).flatMap(row => [row.id, ...list(row.provides)]),
    ...list(read('failures.yaml').scenarios).flatMap(row => [row.id, row.runbook]),
    ...Object.keys(read('realization.yaml').planes ?? {}),
  ].filter(Boolean));
  const attached = [...list(shared.contracts).flatMap(c => list(c.failure_scenarios)), ...list(shared.parts).flatMap(p => list(p.assumptions).flatMap(a => list(a.failure_scenarios)))];
  const sharedIds = new Set([
    ...['systems', 'zones', 'parts', 'crossings', 'contracts', 'seams', 'views', 'capabilities'].flatMap(key => list(shared[key]).map(row => row[key === 'contracts' ? 'name' : 'id'])),
    ...attached.flatMap(row => [row.id, row.runbook]),
    ...Object.keys(shared.layers.realization.planes ?? {}),
  ].filter(Boolean));
  const local = (id: string) => id.startsWith('jig:') ? id.slice(4) : id;
  const imported = (id: string) => local(id.includes(':') ? id : sharedIds.has(id) ? 'shared:' + id : id);
  const ownReference = (id: string) => ownIds.has(id) ? id : imported(id);
  const values = new Set(['id', 'name', 'from', 'to', 'parent', 'system', 'trust_zone', 'plane', 'produced_by', 'consumed_by', 'carries', 'by', 'judged_by', 'fallback_by', 'relied_on_by', 'stop_gate_compensated_by', 'part', 'parts', 'elements', 'relationships', 'contracts', 'contract', 'requires', 'provides', 'measured_by', 'rests_on', 'never_cross', 'verified_from', 'seam', 'view', 'runbook']);
  const maps = new Set(['elements', 'contracts', 'planes', 'names', 'zone_accounts']);
  const rewrite = (value: any, lookup: (id: string) => string, field = ''): any => {
    if (['owners', 'fields', 'kind', 'role_class', 'type', 'between', 'partitioned_by', 'source', 'evidence', 'note', 'notes'].includes(field)) return structuredClone(value);
    if (typeof value === 'string') return values.has(field) ? lookup(value) : value;
    if (Array.isArray(value)) return value.map(row => rewrite(row, lookup, field));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, row]) => [maps.has(field) ? lookup(key) : key, rewrite(row, lookup, key)]));
    return value;
  };
  const root = rewrite(shared, imported);
  const model = {...rewrite(own, ownReference), namespace: 'jig', composition: 'jig'};
  for (const [key, sharedKey] of [['systems', 'systems'], ['trust_zones', 'zones'], ['elements', 'parts'], ['relationships', 'crossings'], ['contracts', 'contracts'], ['views', 'views'], ['seams', 'seams']]) {
    model[key] = [...list(model[key]), ...list(root[sharedKey])];
  }
  const home = (id: string) => id.includes(':') ? id.split(':')[0] : 'jig';
  const retained = (row: any) => home(row.from) === 'jig' || home(row.to) === 'jig' || home(row.from) === 'shared' && home(row.to) === 'shared';
  const omittedRelationships = model.relationships.filter((row: any) => !retained(row)).map((row: any) => row.id);
  model.relationships = model.relationships.filter(retained);
  const parts = new Set<string>(model.elements.map((row: any) => row.id));
  const exposures = new Map<string, any>();
  for (const seam of list(root.seams)) for (const rows of Object.values(seam.exposure ?? {})) for (const row of list(rows)) exposures.set(row.part, row);
  for (const crossing of list(root.crossings)) for (const id of [crossing.from, crossing.to]) {
    const row = exposures.get(id);
    if (!row || ['agent_reachable', 'exposed', 'model_free'].some(key => typeof row[key] !== 'boolean') || ['role_class', 'kind'].some(key => typeof row[key] !== 'string')) throw Error('composition-exposure-missing: ' + id);
  }
  for (const contract of model.contracts) {
    if (contract.name.startsWith('shared:') && new Set(list(contract.produced_by).map(home)).size > 1) throw Error('shared-writing-side: ' + contract.name);
  }
  const declaredParts = [
    ...list(root.contracts).flatMap(row => [...list(row.produced_by), ...list(row.consumed_by)]),
    ...list(root.parts).flatMap(row => list(row.assumptions).flatMap(a => [...list(a.relied_on_by), ...list(a.fallback_by)])),
    ...list(root.claims).flatMap(row => list(row.rests_on?.parts)),
    ...rewrite(attached, imported).flatMap((row: any) => list(row.elements)),
  ];
  model.outside_references = [...new Set([...declaredParts, ...list(root.seams).flatMap(row => list(row.never_cross))])];
  model.composition_omitted = {
    elements: [...new Set(declaredParts.filter(id => home(id) === 'ratchet' && !parts.has(id)))],
    relationships: omittedRelationships,
    contracts: [...new Set(list(root.seams).flatMap(row => list(row.never_cross)).filter(id => !model.contracts.some((c: any) => c.name === id)))],
    modules: [],
  };
  const missing = new Set<string>(model.relationships.flatMap((row: any) => [row.from, row.to]).filter((id: string) => !parts.has(id)));
  model.outside = Object.fromEntries([...missing].map(id => [id, exposures.get(id)]));
  for (const id of missing) {
    const row = exposures.get(id);
    if (!row) throw Error('composition-exposure-missing: ' + id);
    model.elements.push({...row, id, boundary: true, name: root.names?.[id] ?? id, system: 'shared:EXT', trust_zone: 'shared:existing'});
    parts.add(id);
  }
  const relationships = new Set(model.relationships.map((row: any) => row.id));
  for (const view of model.views) {
    view.elements = list(view.elements).filter(id => parts.has(id));
    view.relationships = list(view.relationships).filter(id => relationships.has(id));
  }
  model.sequence = list(model.sequence).filter(row => parts.has(row.from) && parts.has(row.to));
  for (const seam of list(root.seams)) {
    const row = model.seams.find((s: any) => s.id === seam.id);
    row.crossings = list(root.crossings).filter(c => relationships.has(c.id)).map(c => ({id: c.id, carries: list(c.carries), ...(c.point ? {point: c.point} : {})}));
  }
  const docs: Record<string, any> = {'model.yaml': model, 'seams.yaml': shared};
  for (const name of ['realization', 'quality', 'failures', 'overlay-aws']) {
    const a = rewrite(read(name + '.yaml'), ownReference), b = root.layers[name], layer = {...a};
    for (const key of ['elements', 'contracts', 'planes', 'tiers', 'failure_modes', 'account_classes', 'zone_accounts']) {
      if (a[key] || b?.[key]) layer[key] = {...a[key], ...b?.[key]};
    }
    if (name === 'failures') layer.scenarios = [...list(a.scenarios), ...list(b?.scenarios), ...rewrite(attached, imported)].filter(row => !list(row.elements).length || !row.elements.every((id: string) => model.composition_omitted.elements.includes(id)));
    docs[name + '.yaml'] = layer;
  }
  docs['units.yaml'] = {namespace: 'jig', namespaces: ['jig'], composition: 'jig', capabilities: root.capabilities, units: rewrite(ownUnits, ownReference)};
  // Module declarations are used only when supplied. No foreign implementation is invented.
  if (existsSync(join(folder, 'modules.yaml'))) docs['modules.yaml'] = read('modules.yaml');
  mkdirSync(output, {recursive: true});
  for (const [name, value] of Object.entries(docs)) writeFileSync(join(output, name), Bun.YAML.stringify(value));
  return docs;
}

if (import.meta.main) {
  const [folder, output] = process.argv.slice(2);
  if (!folder || !output) throw Error('Usage: bun compose-jig.ts <edition-folder> <new-output-folder>');
  composeJig(folder, output);
  console.log('Jig and its shared layer composed. Run the model and layer checks on the output folder.');
}
```
