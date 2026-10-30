import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "model-checks", import.meta.dir, process.argv.slice(2)));
