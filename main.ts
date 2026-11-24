// Robot Vacuum's Best Excuse — one-line entry writer.
//
// The vacuum speaks for itself: it mapped the spot, did its laps, then
// its battery went on strike and the dock made a better offer. The line
// is assembled from parts so the joke's turn (the dock's offer) lands
// last, and the whole thing is checked against the 140-character cap
// before it is written out.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 140;

const opening = "I mapped that spot, circled it twice,";
const middle = "then my battery filed a formal complaint";
const turn = "and my dock offered me a better life. I took it.";

const entry = [opening, middle, turn]
  .join(" ")
  .replace(/\s+/g, " ")
  .trim();

if (entry.length === 0 || entry.length > MAX_CHARS) {
  throw new Error(`entry is ${entry.length} chars, must be 1-${MAX_CHARS}`);
}
if (/\n/.test(entry)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
