import "server-only";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const dates = new Map<string, Date | undefined>();
let shallowCommits: Set<string> | undefined;

function git(args: string[]) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

function shallowBoundary() {
  if (shallowCommits) return shallowCommits;
  try {
    const file = git(["rev-parse", "--git-path", "shallow"]);
    shallowCommits = new Set(existsSync(file) ? readFileSync(file, "utf8").split(/\s+/).filter(Boolean) : []);
  } catch {
    shallowCommits = new Set();
  }
  return shallowCommits;
}

export function lastCommitDate(sources: string[]): Date | undefined {
  const key = sources.join("|");
  if (dates.has(key)) return dates.get(key);

  let date: Date | undefined;
  try {
    const [hash, iso] = git(["log", "-1", "--format=%H %cI", "--", ...sources]).split(" ");
    if (hash && iso && !shallowBoundary().has(hash)) date = new Date(iso);
  } catch {
    date = undefined;
  }

  dates.set(key, date);
  return date;
}
