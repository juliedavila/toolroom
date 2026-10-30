import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "impact-report", import.meta.dir, process.argv.slice(2)));
