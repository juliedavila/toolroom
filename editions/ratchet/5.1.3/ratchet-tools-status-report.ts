import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "status-report", import.meta.dir, process.argv.slice(2)));
