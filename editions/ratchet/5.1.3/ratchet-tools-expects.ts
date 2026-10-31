import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "expects", import.meta.dir, process.argv.slice(2)));
