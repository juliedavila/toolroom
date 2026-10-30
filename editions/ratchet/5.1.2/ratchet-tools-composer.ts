import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "composer", import.meta.dir, process.argv.slice(2)));
