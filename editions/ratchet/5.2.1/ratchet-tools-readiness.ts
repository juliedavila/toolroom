import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "readiness", import.meta.dir, process.argv.slice(2)));
