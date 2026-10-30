# Specification: Threat grid

The threat grid generates candidate threats from the organization's compiled design, as data a person judges. It writes two grids. The first is STRIDE per interaction: six cells, one per letter, on every relationship whose two ends sit in different trust zones. A cell closes automatically only where every contract the relationship carries states the guarantee for that letter in a named field and a person independent of each rule's author has reviewed every rule that names those fields; the cell records the fields. Where a rule is not yet reviewed, the cell reads proposed and is never counted as closed. An organization records its own review of a shipped rule by signing the rule off in its own closure file, and an edition that later rewords the rule voids that sign-off. The second is the unsafe-control-action grid of STPA: four cells on every control action, each action traced to invariants through the failure scenarios. Every cell that stays open is a lead, accepted into the organization's threat register only by someone independent of the model owner and of this tool (Annex A6 describes the method). The organization's agent runs the tool after every accepted patch and every upgrade, beside the model checks, on the patch applier's output model.

## Ideal state

- **TG-1.** A relationship crosses a trust-zone boundary when its `from` and `to` elements have different `trust_zone` values. Every element with no `trust_zone` (absent or null), such as a person, sits in one shared zone written `(no zone)`: a relationship between two such elements does not cross, and one between such an element and an element with a zone does. Every crossing relationship gets exactly six STRIDE cells, and no other relationship gets any.
- **TG-2.** A STRIDE cell is covered when the relationship's `carries` list is not empty and every contract name in it has a valid closure rule for the cell's letter. A covered cell is closed or proposed by TG-9 and lists, for each carried contract in `carries` order, the rule's contract, its field and whether the rule counts as reviewed. Every cell that is not covered is open.
- **TG-3.** A closure rule is valid when its `reviewed` key, if present, is a valid review mark (TG-9), its contract exists in the model, its letter is one of S, T, R, I, D and E, its contract's `description` contains its field as an exact, case-sensitive substring, and no earlier valid rule has the same contract and letter. Any invalid rule is an error, and the run writes no grid.
- **TG-4.** Every relationship whose `kind` is `control` or `authorization` is a control action, issued by its `from` element (the controller) to its `to` element (the controlled part). Every control action gets exactly four cells, one per unsafe-control-action type, and every one is open.
- **TG-5.** Each control action is traced to invariants by the failure scenarios: at level `action` when at least one scenario names both its controller and its controlled part, else at level `part` when at least one names the controlled part, else at level `none`. The cell's invariants and scenarios come from the scenarios of that level.
- **TG-6.** Every controller is listed with the control actions it issues and the relationships of kind `feedback` or `observation` whose `to` is the controller.
- **TG-7.** The register (JSON) and the summary (Markdown) have the shapes under Outputs, with counts that agree with the cells, and two runs on the same inputs write byte-identical files.
- **TG-8.** A relationship whose `from` or `to` is not an element id is an error. A crossing relationship that carries a name with no contract is a warning, and its cells stay open. A valid rule that covers no cell is a warning.
- **TG-9.** A review mark records that a person independent of the rule's author reviewed the rule. It is a `reviewed` key whose value is a map with `by`, a non-empty string naming the reviewer's role, and `date`, the review date written as text in the form `YYYY-MM-DD` (four digits, a hyphen, two digits, a hyphen, two digits). A rule with no `reviewed` key carries no mark. A rule counts as reviewed when it carries a valid mark, or when it is a rule of the edition's closure file that a current sign-off names (TG-11, TG-12). A covered cell is closed when every rule it lists counts as reviewed, and proposed when at least one does not. Rules from organization closure files follow the same test. A `reviewed` key that is present with any other value, null included, is an error.
- **TG-10.** A proposed cell is never counted as closed. The register's counts and the summary report closed, proposed and open cells as three separate numbers, overall and for each letter, and the three add up to the cells counted. Each rule reports the closed and the proposed cells it covers as two separate numbers.
- **TG-11.** An organization closure file may sign off rules of the edition's closure file in its list `sign_offs`, so an organization can add its own review to a rule the edition ships. A sign-off names one edition rule by `contract` and `letter`, holds in `expects` the hashes of that rule's `field` and `why` as they read when the organization signed it off, and carries the organization's own review mark in `reviewed`. A sign-off is valid when it has that shape, its mark is valid (TG-9), a valid rule of the edition's closure file has its contract and letter, and no earlier valid sign-off names the same rule. Any other sign-off is an error, and the run writes no grid. A sign-off adds no rule: the rule keeps its own `field`, `why` and `reviewed`, and a rule of the organization's own with the same contract and letter is still a duplicate (TG-3).
- **TG-12.** A valid sign-off is current when each hash in its `expects` equals the hash of the named rule's value for that key, and void when either differs, because the edition reworded the rule after the organization signed it off. A current sign-off makes its rule count as reviewed. A void sign-off makes nothing reviewed and is a warning, so the rule's cells read proposed again unless the rule carries its own mark.

## Inputs

Each option is given on the command line as `--<name> <value>`, such as `--model build/model.yaml` or `--org-closures org/threat-closures.yaml`; `--org-closures` may be given more than once.

- **The edition folder** (`data`): `model.yaml`, `failures.yaml` and `threat-closures.yaml`. Each can be replaced by its own option.
- **The compiled model** (`model` option, replaces `model.yaml`): the patch applier's output model. Required top-level entries, each a list: `elements`, `relationships`, `contracts`. Fields read: an element's `id`, `trust_zone` and `kind`; a relationship's `id`, `from`, `to`, `kind` and `carries` (a list of contract names; absent means empty); a contract's `name` and `description`. The optional top-level `edition` is copied to the report.
- **The failure scenarios** (`failures` option, replaces `failures.yaml`): required top-level entry `scenarios`, a list. Fields read: a scenario's `id`, `elements` (a list of element ids; absent means empty) and `invariant`.
- **The closure rules** (`closures` option, replaces `threat-closures.yaml`): required top-level entry `closures`, a list (it may be empty), whose entries are the edition's rules. Each rule has `contract`, `field`, `letter` and `why`, each a non-empty string, and may have `reviewed`, a map with `by` and `date` (TG-9). The tool checks the form of `date` and does not check that the date exists on a calendar. A YAML library that reads an unquoted date as a date value counts as reading it in the form `YYYY-MM-DD`; the shipped file quotes every date. A mark's other keys are not read, so a mark that gives its date under another key, such as `on`, has no `date` and is an error.
- **Organization closure files** (`org-closures` option, repeatable, optional): each holds `closures`, rules of the organization's own in the shape above; `sign_offs`, its sign-offs of rules of the edition's closure file (TG-11); or both. Either list may be empty. A file named by the option that is missing or not YAML, a file with neither key (a misspelled key included), and a file with either key present and not a list (null included) are each TG-E-input. Rules are read edition file first, then each organization file in option order; sign-offs are read from organization files only, in option order. Each sign-off has:
  - `contract` and `letter`, non-empty strings naming a rule of the edition's closure file;
  - `expects`, a map with exactly two keys, `field` and `why`, each a string of exactly 12 lowercase hex digits: the hash of that rule's `field` and of its `why` when the organization signed it off. Write each hash in quotes, as `"7cc07f6b964b"`: a hash made only of digits, or of digits around one `e`, otherwise reads as a number and is refused;
  - `reviewed`, a review mark (TG-9) recording the organization's own review of the rule.
- **The register file** (`register` option, required): where the JSON register is written.
- **The summary file** (`summary` option, optional): where the Markdown summary is written.

A required file that is missing, is not YAML, or lacks a required top-level list is TG-E-input. A missing `register`, or an input with neither its own option nor `data`, is TG-E-option.

The hash of a rule's text, its `field` or its `why`, is the hash the patch applier's `expects` takes of a string, so the two tools agree. Write the text as a JSON string: a double quote; each character as itself, except that `"` and `\` are written with a backslash before them, U+0008, U+0009, U+000A, U+000C and U+000D as `\b`, `\t`, `\n`, `\f` and `\r`, and any other character below U+0020 as `\u00` and two lowercase hex digits; then a closing double quote. Take SHA-256 over the UTF-8 bytes of that text, write the digest as lowercase hex, and keep the first 12 digits. In a shell, `printf '%s' '"Never authority"' | shasum -a 256 | cut -c1-12` prints `49c6c7344007`. The register lists both hashes of every valid rule, so an organization copies them into a sign-off from a run on the edition it signs off.

## Outputs

The register is written as JSON on every run that has a register file, errors included. Its top-level keys, in this order:

```json
{
  "tool": "threat grid",
  "edition": "<model.yaml edition, or null>",
  "counts": {
    "relationships": 0, "zone_crossing": 0,
    "stride": { "cells": 0, "open": 0, "proposed": 0, "closed": 0, "by_letter": { "S": { "cells": 0, "open": 0, "proposed": 0, "closed": 0 }, "T": {}, "R": {}, "I": {}, "D": {}, "E": {} } },
    "closure_rules": 0, "closure_rules_reviewed": 0, "closure_rules_used": 0,
    "stpa": { "controllers": 0, "controllers_without_feedback": 0, "people_without_feedback": 0, "control_actions": 0, "cells": 0, "traced_by_action": 0, "traced_by_part": 0, "untraced": 0 }
  },
  "letters": [{ "id": "S", "name": "spoofing", "question": "<text>" }],
  "uca_types": [{ "id": "not-provided", "name": "not provided", "question": "<text>" }],
  "closures": [{ "contract": "<name>", "field": "<text>", "letter": "T", "why": "<text>", "source": "edition", "reviewed": { "by": "<role>", "date": "<YYYY-MM-DD>" }, "signed_off": null, "hashes": { "field": "<12 hex digits>", "why": "<12 hex digits>" }, "cells_closed": 0, "cells_proposed": 0 }],
  "stride": [{ "id": "<relationship id>:<letter>", "relationship": "<id>", "from": "<id>", "to": "<id>", "from_zone": "<zone or (no zone)>", "to_zone": "<zone>", "kind": "<kind>", "carries": [], "letter": "S", "status": "open", "closed_by": [] }],
  "controllers": [{ "id": "<element id>", "person": false, "actions": ["<relationship id>"], "feedback": ["<relationship id>"] }],
  "stpa": [{ "id": "<relationship id>:<uca type>", "action": "<id>", "controller": "<id>", "controlled": "<id>", "kind": "control", "uca": "not-provided", "trace": "action", "invariants": ["I1"], "scenarios": ["<scenario id>"], "status": "open" }],
  "messages": [{ "level": "error", "code": "TG-E-closure-field", "location": "<where>", "text": "<what>" }]
}
```

The example shows shape only. Counts are integers. `letters` lists S spoofing, T tampering, R repudiation, I information disclosure, D denial of service, E elevation of privilege, in that order; `uca_types` lists `not-provided` (not provided), `provided` (provided when unsafe), `timing` (wrong timing or order) and `duration` (stopped too soon or applied too long), in that order. Each carries a one-sentence question for the person judging the cell; its wording is free. A cell's `status` is `open`, `proposed` or `closed`. A STRIDE cell's `carries` is the relationship's `carries` list as read, and the empty list when the relationship has none. `closed_by` lists, on a closed or proposed cell, one item per carried contract in `carries` order, `{ "contract", "field", "reviewed" }`, where `reviewed` is true when the rule counts as reviewed (TG-9) and false otherwise; on an open cell it is empty. `closures` lists the valid rules in reading order. A rule's `reviewed` is its own mark as read, `{ "by", "date" }`, or null when it has none; `date` is written as the text `YYYY-MM-DD`, and a date the YAML library read as a date value is written as that same calendar date. A rule's `signed_off` is the mark of the current sign-off that names it (TG-12), in the same form, and null when no current sign-off names it. A rule's `hashes` holds the hash of its `field` and of its `why` (Inputs). `source` is `edition` for a rule from the edition's closure file and `organization` for one from an organization file; a signed-off rule keeps `edition`. The JSON is written with two-space indentation and a final newline.

When the run has an error, `counts` is null and `closures`, `stride`, `controllers` and `stpa` are empty lists; `messages` holds every message.

The summary is written only when a summary file is given and the run has no error. It holds, line by line (`<n>` is a count from the JSON):

```
| Grid | Scope | Candidate cells | Auto-closed | Proposed closures | Open leads |
|---|---|---|---|---|---|
| STRIDE per interaction | <zone_crossing> of <relationships> relationships cross a trust-zone boundary | <stride.cells> | <stride.closed> | <stride.proposed> | <stride.open> |
| Unsafe control actions | <control_actions> control actions from <controllers> controllers | <stpa.cells> | 0 | 0 | <stpa.cells> |

| STRIDE letter | Cells | Auto-closed | Proposed | Open |
|---|---|---|---|---|
| S (spoofing) | <cells> | <closed> | <proposed> | <open> |
```

with one letter row per letter in the order above, each labeled `<id> (<name>)` with the name `letters` gives it, such as `T (tampering)`, then a blank line, the line `<closure_rules> closure rules, <closure_rules_reviewed> of them reviewed, <closure_rules_used> of them covering at least one cell:`, a blank line, the table

```
| Contract | Letter | Field that closes it | Reviewed | Cells closed | Cells proposed |
|---|---|---|---|---|---|
| <contract> | <letter> | <field> | <yes, signed off or no> | <cells_closed> | <cells_proposed> |
```

with one row per valid rule in reading order (a `|` inside the rule's field text is written `\|`). The Reviewed column reads `yes` for a rule that carries its own mark, `signed off` for a rule without one that a current sign-off names, and `no` otherwise. Then a blank line, and one paragraph:

`Of the <control_actions> control actions, <traced_by_action> trace to an invariant through a failure scenario that names both the controller and the part it controls, <traced_by_part> only through a scenario that names the controlled part, and <untraced> through none. <controllers_without_feedback> of the <controllers> controllers receive no feedback or observation relationship, <people_without_feedback> of the <P> people among them (<list>).`

`<P>` is the number of controllers that are people. `<list>` is each person controller with no feedback, in controller order, as the id in backticks, joined by a comma and a space; when there is none, the parenthesized list and the space before it are left out. The file ends with a newline.

## Behavior

1. **Read the inputs.** First check the options, reporting a TG-E-option for each problem. When there is none, read the model, the failure scenarios, the edition's closure rules and then each organization closure file in option order, reporting a TG-E-input for each that fails. On any TG-E-option or TG-E-input error, stop: write the register with every such error if the register file is known, and nothing else.
2. **Check the closure rules,** in reading order, numbering them from 1 across all closure files. For each rule, apply the first test that fails, in this order, and skip the rule: a contract, field, letter or why that is missing, empty or not a string (TG-E-closure-shape); a `reviewed` key that is present and is not a valid review mark by TG-9 (TG-E-closure-mark); a letter outside S, T, R, I, D, E (TG-E-closure-letter); a contract name no contract in the model has (TG-E-closure-contract); a field the contract's description does not contain (TG-E-closure-field), which keeps a closure from outliving the text it rests on; the same contract and letter as an earlier rule that passed every test (TG-E-closure-duplicate). A rule that passes every test is valid. Composer rule 13 retains edition closure records in core even for contracts omitted by projection. After shape, mark and letter checks, skip an edition rule whose absent contract is explicitly listed in the composed model's `composition_omitted.contracts`. It contributes no rule or cells to this projection. A sign-off naming that omitted edition rule is also out of scope after its shape and mark checks. An unknown name still fails, and organization closure rules receive the normal contract check.
2a. **Check the sign-offs,** after the rules, in reading order, numbering them from 1 across all organization files. For each sign-off, apply the first test that fails, in this order, and skip the sign-off: a contract or letter that is missing, empty or not a string, no `reviewed` key, or an `expects` that is not a map holding exactly the keys `field` and `why`, each a string of 12 lowercase hex digits (TG-E-signoff-shape); a `reviewed` value that is not a valid review mark by TG-9 (TG-E-closure-mark); no valid rule from the edition's closure file with the same contract and letter (TG-E-signoff-rule), so a sign-off of an organization's own rule, or of a rule step 2 refused, is refused too; the same contract and letter as an earlier sign-off that passed every test (TG-E-signoff-duplicate), whether that one is current or void, since a rule has one sign-off, updated in place. A sign-off that passes every test is valid. Then hash the named rule's `field` and `why`. When both equal the hashes in `expects`, the sign-off is current; otherwise it is void, and the step raises TG-W-signoff-voided once for it, naming each key whose hash differs with the hash in `expects` and the rule's current hash.
3. **Check the endpoints.** For every relationship, a `from` that is not an element id, and separately a `to` that is not, is TG-E-endpoint.
4. **Stop on errors.** If steps 2, 2a and 3 found any error, write the register as Outputs describes for an error and stop.
5. **STRIDE cells.** Take the crossing relationships (TG-1) in the order of the model's `relationships` list. For each, first raise TG-W-carries-unknown once for each name in `carries` that no contract has, in `carries` order. Then write six cells, one per letter in the order S, T, R, I, D, E, each open, proposed or closed by TG-2 and TG-9, where a rule counts as reviewed when it carries its own valid mark or a current sign-off names it. A carried name with no contract has no rule, so it keeps every cell of its relationship open.
6. **Count each rule's cells.** A valid rule's `cells_closed` is the number of closed cells of its letter whose `closed_by` lists its contract, and its `cells_proposed` the number of proposed cells of its letter whose `closed_by` lists its contract. After step 5, raise TG-W-closure-unused for each valid rule with both counts 0, in reading order.
7. **Control actions.** Take the relationships of kind `control` or `authorization` in model order. For each, find the failure scenarios at its trace level (TG-5), in the order of `failures.yaml`. `scenarios` lists their ids; `invariants` lists their `invariant` values with duplicates removed, sorted by the number after the leading `I` (I2 before I10). For level `none` both are empty. Write four cells, one per type in the order of `uca_types`, each with `status` open.
8. **Controllers.** The controllers are the distinct `from` elements of the control actions, sorted by id in character-code order. For each: `person` is true when the element's `kind` is `person`; `actions` lists its control actions in model order; `feedback` lists, in model order, the relationships of kind `feedback` or `observation` whose `to` is the controller.
9. **Counts.** `relationships` counts the model's relationships; `zone_crossing` the crossing ones; the `stride` counts its cells, overall and per letter, as open, proposed and closed; `closure_rules` the valid rules, `closure_rules_reviewed` the valid rules that count as reviewed, and `closure_rules_used` the valid rules with `cells_closed` or `cells_proposed` above 0; `stpa.controllers` the controllers, `controllers_without_feedback` those with an empty `feedback`, `people_without_feedback` those of them that are people; `control_actions` the actions, `cells` their cells, and `traced_by_action`, `traced_by_part` and `untraced` the actions at each trace level.
10. **Write** the register and, when its file is given, the summary, creating their folders if needed. Messages are listed in the order they were raised.

Known limitation: a closure trusts the contract text and the review mark. The tool checks that the contract still states the field and that the mark has its form; whether the running code honors the field, whether the person in `by` was independent of the rule's author, and whether that person read the rule against the design are questions for the person judging the cell, so each rule is itself a claim to spot-check. A sign-off rests on the rule's `field` and `why` alone: an edition that changes another sentence of the contract's description, while the description still states the field, leaves the sign-off current.

## Errors, warnings and exit status

Each message has a `level`, a `code`, a `location` and a `text`. The tool also prints each message as one line, `<level> <code> <location>: <text>`.

| Code | Level | Raised when | Location |
|---|---|---|---|
| TG-E-option | error | an unknown option, an option with no value, no register file, or an input with neither its own option nor `data` | the option |
| TG-E-input | error | a required file missing, not YAML, or lacking a required top-level list; an organization closure file with neither `closures` nor `sign_offs`, or with either present and not a list | the file path, followed by the entry name when one is missing or is not a list (`closures` for an organization file with neither) |
| TG-E-closure-shape | error | a rule's contract, field, letter or why is missing, empty or not a string | `<source> closure <n> (<contract> <letter>)`, with `?` for a missing value (absent or null) and any other value written as it reads, so an empty one leaves nothing between the spaces |
| TG-E-closure-mark | error | a rule or a sign-off has a `reviewed` key that is not a map with a non-empty `by` and a `date` in the form `YYYY-MM-DD` | as above for a rule; `organization sign-off <m> (<contract> <letter>)` for a sign-off |
| TG-E-closure-letter | error | the letter is not S, T, R, I, D or E | as above |
| TG-E-closure-contract | error | no contract in the model has the rule's contract name | as above |
| TG-E-closure-field | error | the contract's description does not contain the field | as above |
| TG-E-closure-duplicate | error | an earlier valid rule has the same contract and letter | as above |
| TG-E-signoff-shape | error | a sign-off's contract or letter is missing, empty or not a string, it has no `reviewed` key, or its `expects` is not a map holding exactly `field` and `why`, each 12 lowercase hex digits | `organization sign-off <m> (<contract> <letter>)`, with `?` for a missing value as above |
| TG-E-signoff-rule | error | no valid rule of the edition's closure file has the sign-off's contract and letter | as above |
| TG-E-signoff-duplicate | error | an earlier valid sign-off names the same contract and letter | as above |
| TG-E-endpoint | error | a relationship's `from` or `to` is not an element id | `relationship <id>` |
| TG-W-signoff-voided | warning | a valid sign-off's `expects` differs from the hash of the named rule's `field` or `why`, so the sign-off is void | `organization sign-off <m> (<contract> <letter>)` |
| TG-W-carries-unknown | warning | a crossing relationship carries a name no contract has | `relationship <id>` |
| TG-W-closure-unused | warning | a valid rule covered no cell, closed or proposed | `<source> closure <contract> <letter>` |

`<source>` is `edition` or `organization`; `<n>` is the rule's number from step 2 and `<m>` the sign-off's number from step 2a. TG-W-signoff-voided's text names each key whose hash differs, with the hash in `expects` and the current hash, as whole tokens; the wording around them is free. Exit status is 1 when any error was raised and 0 otherwise. Warnings never change the exit status.

## Acceptance fixtures

If the environment denies the required `trash` cleanup of a fixture scratch folder, report that denial and the retained path separately from fixture assertions. Preserve the fixture result and exit status based on assertions; do not substitute another deletion mechanism or count a skipped case as passed.

The fixtures ship as one file, `fixtures-threat-grid.yaml`. It holds a toy design (`toy`: a `model`, a `failures` and a `closures` document) and one entry per row below:

```yaml
- name: fixture-tg-example.yaml
  description: what it exercises            # a description; no runner checks it
  base: toy                  # shipped: the edition folder's three files byte for byte; toy: the toy documents
  edits:                     # optional, applied in order to the base documents
    - {op: add_relationship, relationship: {id: r9, from: x, to: w, kind: data, carries: [K]}}
  org_closures: []           # optional; the organization closure file's closures, as given
  org_sign_offs: []          # optional; the organization closure file's sign_offs, as given
  org_document: {}           # optional; the whole organization closure file, as given, in place of the two keys above
  omit: []                   # optional; base files left out of the run (model, failures or closures)
  runs: 2                    # optional; how many times the run is repeated
  expect:
    exit: 0
    errors: []               # every error, as a code or {code, location}; order ignored
    warnings: []             # every warning, the same way
    written: [register, summary]   # optional; what the run writes; the runner always passes both files
    counts: {zone_crossing: 5}                        # a partial match against counts
    cells: [{id: "r1:T", status: closed}]             # partial matches against stride or stpa cells by id
    absent: ["r2:S"]                                  # ids no stride or stpa cell has
    controllers: [{id: p, feedback: []}]              # partial matches by controller id
    closures: [{contract: K, letter: T, cells_closed: 1, cells_proposed: 0}]   # partial matches by contract and letter
    summary_contains: ["| STRIDE per interaction | ..."]    # whole lines the summary must contain
    outputs_byte_identical: true                      # every run of `runs` writes the same files
```

Edits: `{op: add_element, element}`, `{op: add_relationship, relationship}`, `{op: remove_relationship, id}`, `{op: set_relationship, id, field, value}`, `{op: set_contract_description, name, value}`, `{op: add_contract, contract}`, `{op: add_scenario, scenario}` (to the failures document), `{op: add_closure, closure}` (to the edition closures document) and `{op: set_closure, contract, letter, set}`, which merges the mapping `set` over the edition closures document's rule with that contract and letter, so a fixture can reword a shipped rule. The edition folder is the folder this specification ships in, which holds `model.yaml`, `failures.yaml` and `threat-closures.yaml`. An edited or toy document is written to a scratch folder and passed with its own option; an omitted file is passed as a path that does not exist. When `org_closures` or `org_sign_offs` is present, the runner writes one organization closure file holding `closures`, `sign_offs` or both, each exactly as the fixture gives it, and passes it with the `org-closures` option. When `org_document` is present instead, that document is the organization closure file, written exactly as given; a fixture never gives it beside the other two.

Every fixture gives `exit`, `errors` and `warnings`. When `written` is left out, it is `[register, summary]` for an expected exit of 0 and `[register]` for an expected exit of 1, as Outputs prescribes. In a partial match, a mapping matches when each key it names matches; a list matches a list of the same length whose items match in order, a mapping item as a partial match; any other value matches when equal. `outputs_byte_identical` compares the files of every run, so it needs `runs` of 2 or more.

A fixture passes when the exit status, every message, what was written and every listed expectation match. The runner fails on an expect key or edit op it does not know, so a misread key cannot pass by being skipped.

| Fixture | Exercises | Expected outcome |
|---|---|---|
| fixture-tg-shipped.yaml | the shipped files byte for byte (TG-1 to TG-6, TG-8 and TG-9 on the real design) | exit 0 with two TG-W-closure-unused warnings, for RestoreGrant T and AdminSession R. 11 rules, 7 reviewed, 9 used, 12 closed cells and 6 proposed cells. A single-contract proposal leaves S and T open. A relationship carrying three contracts leaves S open. A typed-decision flow's E cell is closed by a reviewed rule, whose mark lists its date as text. A model response's E cell is proposed, its rule listed as unreviewed and not signed off, with the hashes of its field and why. The administrative request and approval R cells are closed on their own audit-before-action rules reviewed by the design owner, including refusals without an issued session. A grant relationship's E cell and an audit relationship's T and R cells stay open. The proven-class flows' I cells are closed by their reviewed rule. The derived-check and road-assurance-status flows' I cells and both release-admission flows' T cells are proposed on unmarked rules, each listed with no review mark or sign-off and no closed cells. A relationship inside one zone has no cells. A person-to-part control action traces at level `part` and one between two people at `none` |
| fixture-tg-toy.yaml | the toy design: zones, two people who share the zone `(no zone)`, one same-zone relationship, one between the two people, one with no `carries`, two reviewed rules on one contract | exit 0; exact counts, cells (the relationship without `carries` shows an empty list), controllers, both rules' counts, the first rule's mark and hashes, and summary lines |
| fixture-tg-every-contract.yaml | a rule for a second contract, so a relationship carrying both closes with two `closed_by` items | the cell closed by both rules, in `carries` order |
| fixture-tg-org-closures.yaml | an organization closure file adding a reviewed rule | the rule's `source` is `organization` and it closes its cells |
| fixture-tg-org-unmarked.yaml | an organization closure file whose rule has no mark | the rule's cells read proposed, its `reviewed` is null, and no cell it covers counts as closed |
| fixture-tg-reviewed.yaml | one crossing with a reviewed rule for one letter and an unreviewed rule for another | the first letter's cell closed and the second's proposed, with counts, per-letter counts and summary lines that keep the two apart |
| fixture-tg-mixed-marks.yaml | a crossing carrying two contracts whose rules for one letter are one reviewed and one not | the cell proposed, `closed_by` listing both with `reviewed` true and false; the reviewed rule counts it in `cells_proposed` |
| fixture-tg-mark-malformed.yaml | one rule whose mark lacks `date`, one whose `date` is not in the form `YYYY-MM-DD`, and one whose mark gives its date under `on` | TG-E-closure-mark on each, exit 1, only the register written |
| fixture-tg-invariant-order.yaml | a control action whose trace-level scenarios carry `I10`, `I2` and `I2`, in that order | `invariants` is `[I2, I10]`: duplicates removed, sorted by number |
| fixture-tg-field-gone.yaml | the shipped files with a contract's description edited so a shipped rule's field is gone | TG-E-closure-field, exit 1, only the register written |
| fixture-tg-unknown-contract.yaml | a rule naming no contract | TG-E-closure-contract |
| fixture-tg-bad-letter.yaml | a rule with letter X | TG-E-closure-letter |
| fixture-tg-duplicate.yaml | two rules on the same contract and letter | TG-E-closure-duplicate on the second |
| fixture-tg-shape.yaml | a rule with no why | TG-E-closure-shape |
| fixture-tg-unused.yaml | a valid rule on a contract no crossing relationship carries | TG-W-closure-unused, exit 0 |
| fixture-tg-carries-unknown.yaml | a crossing relationship carrying a closed contract and an unknown name | TG-W-carries-unknown; its cells stay open |
| fixture-tg-endpoint.yaml | a relationship to an element the model lacks | TG-E-endpoint, exit 1 |
| fixture-tg-missing-input.yaml | the failures file left out | TG-E-input, exit 1 |
| fixture-tg-deterministic.yaml | the shipped files, run twice | identical files |
| fixture-tg-signoff.yaml | the toy design with an unmarked edition rule for S on `K`, and an organization file signing off that rule and the marked rule for T on `K`, each with the hashes of the rule's field and why | exit 0; `r1:S` closed; the S rule counts as reviewed, with `reviewed` null and `signed_off` the organization's mark, and reads `signed off`; the T rule keeps its own mark, lists the sign-off too and reads `yes` |
| fixture-tg-signoff-shipped.yaml | the shipped files with an organization file signing off the model-output rule for E | exit 0 with the shipped warnings; both of the rule's E cells closed, so two more cells closed and two fewer proposed than in `fixture-tg-shipped.yaml`; the rule reads `signed off` |
| fixture-tg-signoff-field-changed.yaml | the same sign-off after the edition rule's field is reworded to a longer phrase the contract still states | TG-W-signoff-voided on the sign-off beside the shipped warning; both E cells proposed again; `signed_off` null and the new field's hash listed |
| fixture-tg-signoff-why-changed.yaml | the same sign-off after only the rule's why is reworded | TG-W-signoff-voided; both E cells proposed again |
| fixture-tg-signoff-voided-marked.yaml | a sign-off of the marked toy rule for T whose field hash and why hash are both stale | one TG-W-signoff-voided for the sign-off; `r1:T` stays closed by the rule's own mark |
| fixture-tg-signoff-no-rule.yaml | a sign-off naming a contract and letter no rule has, one naming the organization's own rule, and a third repeating the first | TG-E-signoff-rule on each of the three, none a duplicate, exit 1, only the register written |
| fixture-tg-signoff-beside-own-rule.yaml | a valid, void sign-off of an edition rule beside the organization's own rule for the same contract and letter | TG-E-closure-duplicate on the organization's rule, and TG-W-signoff-voided on the sign-off, since step 2a runs before the run stops on errors; exit 1 |
| fixture-tg-signoff-escapes.yaml | a sign-off of an edition rule whose why holds a double quote, a backslash, a tab and an escape character (U+001B) | the hash written with those characters escaped matches, so `r1:R` closes |
| fixture-tg-signoff-duplicate.yaml | two sign-offs of one rule, the first void | TG-W-signoff-voided on the first and TG-E-signoff-duplicate on the second, exit 1 |
| fixture-tg-signoff-shape.yaml | eight malformed sign-offs: no mark; `expects` without `why`; a hash in capitals; no contract; `expects` with a third key; no letter; a mark whose date is not in the form; a null mark on a sign-off that also names no rule | TG-E-signoff-shape on the first six (the fourth and sixth located with `?`), TG-E-closure-mark on the last two, exit 1 |
| fixture-tg-signoff-input.yaml | an organization file whose `sign_offs` is a mapping | TG-E-input, exit 1, only the register written |
| fixture-tg-org-file-null.yaml | an organization file whose `closures` is an empty list and whose `sign_offs` is null | TG-E-input, exit 1 |
| fixture-tg-org-file-neither.yaml | an organization file holding neither key, its sign-off list misspelled `sign_off` | TG-E-input, exit 1 |

| fixture-tg-guidance-scenarios.yaml | merged full scenario identities | scenario lists follow TG-14 |
| fixture-tg-release-attestation-before-ruling.yaml | ReleaseAttestation closure before the matching description is present | TG-E-closure-field |
| fixture-tg-proven-class-before-ruling.yaml | shared:ProvenClass closure before the matching description is present | TG-E-closure-field |
| fixture-tg-road-assurance-status-before-ruling.yaml | shared:RoadAssuranceStatus closure before the matching description is present | TG-E-closure-field |
| fixture-tg-scenario-merge-precedence.yaml | one duplicate in failures, contract tests and assumption tests | first position, last contents; contracts before assumptions |

A fixture runner writes only into a scratch folder of its own and removes it afterwards. The tool is done when every fixture passes with a mutation-tested runner and the outputs are written.

Rule review and organization sign-off are distinct: an organization rule may carry its own valid review mark, but only an edition rule can receive an organization sign-off. Always serialize both `reviewed` and `signed_off`, using null when absent (for example `{reviewed: null, signed_off: null}`). TG-2 and TG-3 permit closure rules for every STRIDE letter, including D; closure remains a reviewable contract claim. The before-ruling cases target the closure record selected by contract and letter, then report its global rule index as step 2 defines; that index is fixture data tied to the shipped rule order. Late regression entries in the fixture file are part of the suite even when not tabulated above: guidance scenarios, shared attached tests and every before-ruling case must run. Concrete marks, dates, ids, rule indices, scenario lists and hashes are supplied inputs and regression expectations, never special-case behavior in the generator.

## Not in scope

- Judging cells, seeding known-real and known-false cells, or keeping the threat register; those are people's work (Annex A6, steps 3 to 8).
- Privacy cells on person-level flows, which need a personal-data marking on contract fields the design does not have yet.
- Joins to OWASP's agentic list, MAESTRO and ATLAS, which the standards crosswalk keeps.
- Deciding whether a contract's guarantee holds in the running system.
- Changing the model, the failure scenarios or the closure rules.

## The grid follows the composition

- **TG-14.** Run the grid over the actual composition, with each loaded namespace's failure and closure records. Every relationship, endpoint, contract, scenario and closure keeps its full identity. Cell ids append the letter or unsafe-action type to that whole relationship id; never split an imported id at its first colon. Start with the failures input in its list order, append each contract's direct `failure_scenarios` in contract/list order, then each element's assumption `failure_scenarios` in element/assumption/list order. Deduplicate by whole scenario id: its position is its first occurrence and its contents are its last occurrence. This is not a recursive search for arbitrary keys. Use that resulting order for trace selection and scenario output. Those tests belong to their agreement and remain available when the standalone failures file holds only the designs' obligations.

The fixtures file's `namespace_reports` uses the actual working composition. `stride` lists required whole cell ids and `scenarios` lists scenario ids that must appear on an unsafe-control-action cell. `attached_only` removes failures-input scenarios whose id starts with `shared:`; it leaves model attachments intact. `extra_action` adds the stated control relationship. Search all unsafe-control-action cells for each required scenario, not only the added action's cells, and allow other scenarios. The shipped model is already the working composition; no sibling edition or composition-loading option is required. The CLI and the pure generator must give identical counts and zero errors.

The shipped-fixture table states the generated totals; the fixtures and threat-model annex check those same totals.
