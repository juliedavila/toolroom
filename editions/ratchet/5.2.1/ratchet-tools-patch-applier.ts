import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "patch-applier", import.meta.dir, process.argv.slice(2)));
