import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "threat-grid", import.meta.dir, process.argv.slice(2)));
