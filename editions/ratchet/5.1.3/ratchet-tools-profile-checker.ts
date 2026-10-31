import { runTool, sources } from "./ratchet-tools";
process.exit(runTool(sources, "profile-checker", import.meta.dir, process.argv.slice(2)));
