// Jig edition 0.3.1. Shipped code: the profile check. Run it with Bun from the workspace root.
// The Jig profile check: validates an organization's Jig profile against the profile schema shipped beside it.
// It needs Bun and nothing else, reads only the files it is given and writes nothing.
//
//   bun jig-profile-check.ts <profile> [--schema <file>] [--model <file>] [--json]
//
// The schema and the model default to profile-schema.yaml and model.yaml in this script's own folder, which is the
// edition folder it ships in. The check refuses (errors, exit 1): a profile that does not parse; a key the schema does
// not describe; a missing required key; a value of the wrong type; a value outside its list of allowed values; a fixed
// value changed; a part that model.yaml does not hold; and the same part entered twice. It warns, and never refuses, on
// a date written without quotes and on a date field whose text is not a YYYY-MM-DD calendar date, each naming its
// field, and on what is unanswered: a null the schema allows (a confirmation left null is not counted, since unconfirmed is normal) and an
// empty list the schema says means unanswered. Exit 0 means
// no errors, whatever the number of warnings; exit 2 means the check could not run (a missing file, or a schema that
// uses a keyword this check does not implement).
//
// The schema is JSON Schema 2020-12 written as YAML, and this check implements the subset it uses: $schema, $defs, $ref
// (to a definition under $defs), type, enum, const, required, properties, additionalProperties, items, format (date
// only, reported as a warning, since 0.2.0 accepted any text there) and description. Any other keyword stops the check, so the schema never relies on one it ignores.
import { existsSync, readFileSync } from "fs";
import { join } from "path";

export const DIALECT = "https://json-schema.org/draft/2020-12/schema";
const KEYWORDS = new Set(["$schema", "$defs", "$ref", "type", "enum", "const", "required", "properties", "additionalProperties", "items", "format", "description"]);
// The definition whose null means unconfirmed, which is the normal state of a new finding, so it is not a gap.
const NOT_A_GAP = "#/$defs/confirmed";
const EMPTY_MEANS_UNANSWERED = /empty means unanswered/i;

export type Result = { errors: string[]; warnings: string[]; schemaProblems: string[] };

const sameValue = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const typeOf = (v: unknown) => v === null ? "null" : Array.isArray(v) ? "array" : typeof v === "number" ? (Number.isInteger(v) ? "integer" : "number") : typeof v;
const allowsNull = (s: any) => (Array.isArray(s.type) ? s.type.includes("null") : s.type === "null") || (Array.isArray(s.enum) && s.enum.includes(null));

/** A real calendar date written YYYY-MM-DD. */
export function isDate(v: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return false;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.getUTCFullYear() === Number(m[1]) && d.getUTCMonth() === Number(m[2]) - 1 && d.getUTCDate() === Number(m[3]);
}

/** Validates one value against one schema node. A node reached through $ref keeps the reference, so a null under the
 *  confirmation definition is not reported as unanswered. */
export function validate(v: unknown, s: any, root: any, r: Result, at = "$", ref = ""): void {
  if (s === true || s === undefined) return;
  if (s === false) { r.errors.push(`${at}: no value is allowed here`); return; }
  for (const k of Object.keys(s)) if (!KEYWORDS.has(k)) r.schemaProblems.push(`schema at ${at}: unsupported keyword ${k}`);
  if (s.$ref !== undefined) {
    const m = /^#\/\$defs\/([\w-]+)$/.exec(String(s.$ref));
    const target = m ? root.$defs?.[m[1]] : undefined;
    if (!target) r.schemaProblems.push(`schema at ${at}: unresolved $ref ${s.$ref}`);
    else validate(v, target, root, r, at, String(s.$ref));
  }
  if (s.type !== undefined) {
    const types: string[] = Array.isArray(s.type) ? s.type : [s.type];
    const actual = typeOf(v);
    if (!types.some((x) => x === actual || (x === "number" && actual === "integer"))) r.errors.push(`${at}: is ${actual}, expected ${types.join(" or ")}`);
  }
  if (s.enum !== undefined && !s.enum.some((x: unknown) => sameValue(x, v))) r.errors.push(`${at}: ${JSON.stringify(v)} is not one of ${JSON.stringify(s.enum)}`);
  if (s.const !== undefined && !sameValue(s.const, v)) r.errors.push(`${at}: must be ${JSON.stringify(s.const)}`);
  if (s.format !== undefined) {
    if (s.format !== "date") r.schemaProblems.push(`schema at ${at}: unsupported format ${s.format}`);
    else if (typeof v === "string" && !isDate(v)) r.warnings.push(`${at}: ${JSON.stringify(v)} is not a YYYY-MM-DD calendar date; write the date as YYYY-MM-DD`);
  }
  if (v === null && s.$ref === undefined && allowsNull(s) && ref !== NOT_A_GAP) r.warnings.push(`${at}: unanswered`);
  if (typeOf(v) === "object") {
    const o = v as Record<string, unknown>;
    for (const k of s.required ?? []) if (!(k in o)) r.errors.push(`${at}: missing ${k}`);
    for (const [k, x] of Object.entries(o)) {
      if (s.properties && k in s.properties) validate(x, s.properties[k], root, r, `${at}.${k}`);
      else if (s.additionalProperties === false) r.errors.push(`${at}: unknown key ${k}`);
      else if (s.additionalProperties !== undefined) validate(x, s.additionalProperties, root, r, `${at}.${k}`);
    }
  }
  if (typeOf(v) === "array") {
    const list = v as unknown[];
    if (!list.length && EMPTY_MEANS_UNANSWERED.test(String(s.description ?? ""))) r.warnings.push(`${at}: unanswered (empty list)`);
    if (s.items !== undefined) for (const [i, x] of list.entries()) validate(x, s.items, root, r, `${at}[${i}]`);
  }
}

/** Lines where a date is written without quotes, each with its field. YAML 1.1 readers turn such a date into a date
 *  value where the schema wants text, so the check warns and asks for quotes; a profile valid before stays valid. */
export function unquotedDates(text: string): string[] {
  const out: string[] = [];
  text.split("\n").forEach((line, i) => {
    // Quoted text first, then comments, so neither a quoted date nor a date in a comment counts.
    const body = line.replace(/"(?:[^"\\]|\\.)*"|'(?:[^']|'')*'/g, '""').replace(/(^|\s)#.*$/, "");
    const m = /(?:^|[\s,{[])(?:([\w.-]+):\s*)?-?\s*(\d{4}-\d{2}-\d{2})(?![\w-])/.exec(body);
    if (m) out.push(`line ${i + 1}: ${m[1] ?? "a list item"}: the date ${m[2]} is written without quotes; quote it as "${m[2]}"`);
  });
  return out;
}

/** Checks a profile's text against the schema, and its parts against the model's part ids when they are given. */
export function checkProfileText(text: string, schema: any, partIds?: Set<string>): Result {
  const r: Result = { errors: [], warnings: [], schemaProblems: [] };
  if (schema?.$schema !== DIALECT) r.schemaProblems.push(`schema: $schema is ${JSON.stringify(schema?.$schema)}, not ${DIALECT}`);
  let doc: unknown;
  try { doc = Bun.YAML.parse(text); } catch (e) { r.errors.push(`the profile does not parse as YAML: ${String(e).slice(0, 160)}`); return r; }
  r.warnings.push(...unquotedDates(text));
  validate(doc, schema, schema, r);
  const parts = (doc as any)?.parts;
  if (Array.isArray(parts)) {
    const seen = new Set<string>();
    parts.forEach((p: any, i: number) => {
      const id = String(p?.part);
      if (partIds && !partIds.has(id)) r.errors.push(`$.parts[${i}].part: ${id} is not a part in model.yaml`);
      if (seen.has(id)) r.errors.push(`$.parts[${i}].part: ${id} has an entry already; one entry per part`);
      seen.add(id);
    });
  }
  return r;
}

/** The ids of the parts a model file holds. */
export const partIdsOf = (model: any) => new Set<string>(((model?.elements ?? []) as any[]).map((e) => String(e?.id)));

if (import.meta.main) {
  const argv = process.argv.slice(2);
  const opt = (name: string) => { const i = argv.indexOf(name); if (i < 0) return undefined; const v = argv[i + 1]; argv.splice(i, 2); return v; };
  const json = argv.includes("--json");
  if (json) argv.splice(argv.indexOf("--json"), 1);
  const schemaFile = opt("--schema") ?? join(import.meta.dir, "profile-schema.yaml");
  const modelFile = opt("--model") ?? join(import.meta.dir, "model.yaml");
  const usage = "usage: bun jig-profile-check.ts <profile> [--schema <file>] [--model <file>] [--json]";
  if (argv.length !== 1 || argv[0].startsWith("--")) { console.error(usage); process.exit(2); }
  for (const f of [argv[0], schemaFile, modelFile]) if (!existsSync(f)) { console.error(`not found: ${f}\n${usage}`); process.exit(2); }
  let schema: any, model: any;
  try { schema = Bun.YAML.parse(readFileSync(schemaFile, "utf8")); model = Bun.YAML.parse(readFileSync(modelFile, "utf8")); }
  catch (e) { console.error(`the schema or the model does not parse: ${String(e).slice(0, 160)}`); process.exit(2); }
  const r = checkProfileText(readFileSync(argv[0], "utf8"), schema, partIdsOf(model));
  if (json) console.log(JSON.stringify({ profile: argv[0], errors: r.errors, warnings: r.warnings, schema_problems: r.schemaProblems }, null, 2));
  else {
    for (const e of r.schemaProblems) console.log(`schema problem: ${e}`);
    for (const e of r.errors) console.log(`error: ${e}`);
    for (const w of r.warnings) console.log(`warning: ${w}`);
    console.log(`${argv[0]}: ${r.errors.length} error(s), ${r.warnings.length} warning(s): unanswered answers, dates without quotes and dates that are not calendar dates, none of which is ever an error`);
  }
  process.exit(r.schemaProblems.length ? 2 : r.errors.length ? 1 : 0);
}
