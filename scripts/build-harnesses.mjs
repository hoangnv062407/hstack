#!/usr/bin/env node

import {
  chmodSync, lstatSync, mkdirSync, mkdtempSync, readdirSync,
  readFileSync, realpathSync, renameSync, rmSync, writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, posix, relative, sep } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = realpathSync(fileURLToPath(new URL("..", import.meta.url)));
const dist = join(root, "dist");
const benny = "automations/benny";
const marker = ".hstack-generated";
const targets = {
  cursor: { skills: "skills", agents: "agents", docs: "hstack", modelRule: "~/.cursor/rules/hstack-models.mdc" },
  "claude-code": { skills: "skills", agents: "agents", docs: "hstack", modelRule: "~/.claude/rules/hstack-models.md" },
  codex: { skills: ".agents/skills", agents: ".codex/agents", docs: ".agents/hstack", modelRule: ".agents/hstack/hstack-models.md" },
  antigravity: { skills: ".agents/skills", agents: ".agents/agents", docs: ".agents/hstack", modelRule: ".agents/hstack/hstack-models.md" },
};
const installs = {
  cursor: "Copy this plugin directory to `~/.cursor/plugins/local/hstack/` and enable hstack in Customize.",
  "claude-code": "Start a test session with `claude --plugin-dir <path-to-this-directory>`. For local marketplace installation, add this directory and install `hstack@hstack-local`.",
  codex: "Copy `.agents/` and `.codex/agents/` into the target workspace. Merge the provided guidance into the workspace's `AGENTS.md`.",
  antigravity: "Copy `.agents/` into the target workspace and merge the provided `.agents/AGENTS.md` guidance. Start a new session in that workspace.",
};

function walk(directory, source = false) {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
    if (source && [".DS_Store", "node_modules"].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walk(path, source);
    if (entry.isFile()) return [path];
    throw new Error("Unsupported filesystem entry: " + path);
  });
}

function portableRelative(from, to) {
  return relative(from, to).split(sep).join("/");
}

function splitDocument(text, file) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/.exec(text);
  if (!match) throw new Error("Missing frontmatter in " + file);
  const name = /^name:\s*["']?([a-z0-9-]+)["']?\s*$/m.exec(match[1])?.[1];
  const description = /^description:[ \t]*(.+)$/m.exec(match[1])?.[1]?.trim();
  if (!name || !description) throw new Error("Missing name or description in " + file);
  return { name, description, metadata: match[1].replaceAll("\r\n", "\n"), body: match[2] };
}

function readText(file) {
  return readFileSync(join(root, file), "utf8");
}

function installedName(name) {
  return { "poteto-mode": "hstack-mode", "poteto-help": "hstack-help", "setup-pstack": "hstack-setup" }[name]
    ?? "hstack-" + name;
}

function scanSkills(directory, support) {
  return readdirSync(join(root, directory), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => {
    const name = entry.name;
    const file = posix.join(directory, name, "SKILL.md");
    const document = splitDocument(readText(file), file);
    if (document.name !== name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) || installedName(name).length > 64) {
      throw new Error("Invalid skill name in " + file);
    }
    return { name, support, directory: join(root, directory, name) };
  });
}

const skills = [...scanSkills("core/skills", false), ...scanSkills(benny + "/skills", true)];
const names = new Map(skills.map(({ name }) => [name, installedName(name)]));
if (names.size !== skills.length || new Set(names.values()).size !== skills.length) throw new Error("Duplicate skill name");

const skillReferences = new RegExp("(^|[\\s`('\"\\[])\\/(" + [...names.keys()].join("|") + ")(?![\\w-])", "g");
const linkPattern = /\]\(([^)\s]+)\)/g;

function rewriteMarkdown(text, target, markdownPath) {
  return text
    .replaceAll("~/.cursor/rules/pstack-models.mdc", target.modelRule)
    .replaceAll(".cursor/skills/", target.workspaceSkills ?? ".cursor/skills/")
    .replace(/\b(?:poteto-mode|poteto-help|setup-pstack|poteto-agent|comment-sicko)\b/g, (name, offset, input) => {
      if (input.slice(Math.max(0, offset - 7), offset) === "hstack-") return name;
      return installedName(name);
    })
    .replace(skillReferences, (_, prefix, name) => prefix + "/" + names.get(name))
    .replaceAll("principle-<title>", "hstack-principle-<title>")
    .replace(linkPattern, (link, href) => {
      if (href === "hstack-harness") return "](" + posix.relative(posix.dirname(markdownPath), target.docs + "/harness.md") + ")";
      const guide = /^\.\.\/\.\.\/\.\.\/(docs\/.+)$/.exec(href)?.[1];
      if (guide) {
        return "](" + posix.relative(posix.dirname(markdownPath), posix.join(target.docs, guide)) + ")";
      }
      if (!href.startsWith("../")) return link;
      return "](" + href.replace(/^((?:\.\.\/)+)([^/]+)(?=\/)/, (_, prefix, name) => prefix + (names.get(name) ?? name)) + ")";
    });
}

function renderDocs(files, target) {
  const sourceRoot = join(root, "docs");
  const outputRoot = posix.join(target.docs, "docs");
  copyTree(files, sourceRoot, outputRoot, (local, output, bytes) => {
    if (!local.endsWith(".md")) return bytes;
    return bytes.toString("utf8").replace(linkPattern, (link, href) => {
      if (!href.startsWith("../")) return link;
      const [, file, suffix] = /^(.*?)([?#].*)?$/.exec(href);
      const source = posix.join("docs", posix.dirname(local), file);
      const [first, second, third, ...rest] = source.split("/");
      let destination;
      if (first === "adapters") destination = posix.join(target.docs, second);
      if (first === "automations" && second === "benny") destination = posix.join(target.docs, "benny", third, ...rest);
      if (first === "core" && second === "skills" && names.has(third)) {
        destination = posix.join(target.skills, names.get(third), ...rest);
      }
      if (!destination) return link;
      return "](" + posix.relative(posix.dirname(output), destination) + (suffix ?? "") + ")";
    });
  });
}

function append(files, path, contents, executable = false) {
  if (files.has(path)) throw new Error("Duplicate generated file: " + path);
  files.set(path, { bytes: Buffer.isBuffer(contents) ? contents : Buffer.from(contents), executable });
}

function copyTree(files, source, destination, transform) {
  for (const path of walk(source, true)) {
    const local = portableRelative(source, path);
    const output = posix.join(destination, local);
    const bytes = readFileSync(path);
    const contents = transform ? transform(local, output, bytes) : bytes;
    const executable = (lstatSync(path).mode & 0o111) !== 0 || bytes.subarray(0, 2).toString() === "#!";
    append(files, output, contents, executable);
  }
}

function renderSkill(files, skill, target) {
  const name = names.get(skill.name);
  copyTree(files, skill.directory, posix.join(target.skills, name), (local, path, bytes) => {
    if (!path.endsWith(".md")) return bytes;
    const text = bytes.toString("utf8");
    if (local !== "SKILL.md") return rewriteMarkdown(text, target, path);
    const { metadata, body } = splitDocument(text, path);
    const frontmatter = rewriteMarkdown(metadata.replace(/^name:.*$/m, "name: " + name), target, path);
    const docs = posix.relative(posix.dirname(path), target.docs);
    const guide = "Read the [harness adapter](" + docs + "/harness.md) before following this skill.";
    const policy = skill.support ? "\n\nRead the [Benny policy](" + docs + "/benny/policy.md) and [workflow setup](" + docs + "/benny/README.md)." : "";
    return "---\n" + frontmatter + "\n---\n\n" + guide + policy + "\n\n" + rewriteMarkdown(body.trimStart(), target, path);
  });
}

function renderAgents(files, platform, target) {
  for (const file of walk(join(root, "core/agents"), true)) {
    const { name, description, metadata, body } = splitDocument(readFileSync(file, "utf8"), file);
    const agent = installedName(name);
    const path = posix.join(target.agents, agent + (platform === "codex" ? ".toml" : ".md"));
    const instructions = rewriteMarkdown(body.trim(), target, path);
    const summary = rewriteMarkdown(description, target, path);
    if (platform === "codex") {
      const permissions = name === "comment-sicko" ? 'sandbox_mode = "read-only"\n' : "";
      append(files, path, "name = " + JSON.stringify(agent) + "\ndescription = " + JSON.stringify(summary)
        + "\n" + permissions + "developer_instructions = " + JSON.stringify(instructions) + "\n");
    } else {
      const fields = platform === "cursor" ? metadata.split("\n").filter(line => /^(?:model|is_background):/.test(line))
        : platform === "antigravity" ? ["subagent: true", "mainAgent: false"] : [];
      append(files, path, ["---", "name: " + agent, "description: " + JSON.stringify(summary), ...fields, "---", "", instructions, ""].join("\n"));
    }
  }
}

function manifest(file) {
  const text = readText("manifests/" + file);
  JSON.parse(text);
  return text;
}

function render(platform, layout) {
  const target = { ...layout, workspaceSkills: platform === "claude-code" ? ".claude/skills/" : layout.skills.startsWith(".") ? layout.skills + "/" : ".cursor/skills/" };
  const files = new Map();
  for (const skill of skills) renderSkill(files, skill, target);
  renderAgents(files, platform, target);
  for (const name of ["shared", "cursor", "claude-code", "codex", "antigravity"]) {
    append(files, posix.join(target.docs, name + ".md"), readText("adapters/" + name + ".md"));
  }
  const adapter = target.skills.startsWith(".")
    ? "Select the [Codex](codex.md) or [Antigravity](antigravity.md) adapter for the active host."
    : "Read the [" + platform + " adapter](" + platform + ".md).";
  append(files, posix.join(target.docs, "harness.md"), "# Active harness\n\n" + adapter + "\n");
  for (const folder of ["templates", "scripts"]) {
    copyTree(files, join(root, benny, folder), posix.join(target.docs, "benny", folder));
  }
  for (const name of ["README.md", "FOR_AGENTS.md", "policy.md"]) {
    append(files, posix.join(target.docs, "benny", name), readText(benny + "/" + name));
  }
  renderDocs(files, target);
  append(files, "README.md", "# hstack for " + platform + "\n\n"
    + installs[platform] + "\n\n"
    + "Read the [user guide](" + target.docs + "/docs/README.md), [harness adapter](" + target.docs + "/harness.md), and [Benny workflow](" + target.docs + "/benny/README.md).\n"
    + "Run the engineering router to choose a playbook for code changes, reviews, or verification. Start with Benny setup to connect your existing Chrome session and identify the staging preview for support requests.\n"
    + "This distribution is generated by `node scripts/build-harnesses.mjs` from the hstack source.\n");
  append(files, "LICENSE", readText("LICENSE"));
  if (platform === "cursor") append(files, ".cursor-plugin/plugin.json", manifest("cursor-plugin.json"));
  if (platform === "claude-code") {
    append(files, ".claude-plugin/plugin.json", manifest("claude-plugin.json"));
    append(files, ".claude-plugin/marketplace.json", manifest("claude-marketplace.json"));
  }
  if (platform === "codex" || platform === "antigravity") {
    append(files, platform === "codex" ? "AGENTS.md" : ".agents/AGENTS.md",
      "# hstack\n\nRead the [harness adapter](" + (platform === "codex" ? target.docs : "hstack") + "/harness.md) when using a bundled hstack skill.\n");
  }
  return files;
}

function collect() {
  const files = new Map([[marker, { bytes: Buffer.from("Generated by scripts/build-harnesses.mjs\n"), executable: false }]]);
  for (const [platform, target] of Object.entries(targets)) {
    const tree = render(platform, target);
    const directories = new Set();
    for (const path of tree.keys()) {
      for (let directory = posix.dirname(path); directory !== "."; directory = posix.dirname(directory)) {
        directories.add(directory);
      }
    }
    for (const [path, file] of tree) {
      if (path.endsWith(".md")) {
        for (const [, href] of file.bytes.toString("utf8").matchAll(linkPattern)) {
          if (/^(?:[a-z][a-z0-9+.-]*:|[#/])/i.test(href)) continue;
          const destination = posix.join(posix.dirname(path), href.split(/[?#]/, 1)[0]).replace(/\/$/, "");
          if (!tree.has(destination) && !directories.has(destination)) {
            throw new Error(platform + "/" + path + " links to missing " + href);
          }
        }
      }
      files.set(posix.join(platform, path), file);
    }
  }
  return files;
}

function verifyExistingDist() {
  const info = lstatSync(dist, { throwIfNoEntry: false });
  if (!info) return false;
  if (!info.isDirectory() || !lstatSync(join(dist, marker), { throwIfNoEntry: false })?.isFile()) {
    throw new Error("Refusing to replace a directory without the hstack build marker: " + dist);
  }
  return true;
}

function check(files) {
  const diskFiles = new Set(verifyExistingDist() ? walk(dist).map(path => portableRelative(dist, path)) : []);
  const drift = [];
  for (const [path, expected] of files) {
    if (!diskFiles.delete(path) || !readFileSync(join(dist, path)).equals(expected.bytes)
      || (process.platform !== "win32" && ((lstatSync(join(dist, path)).mode & 0o111) !== 0) !== expected.executable)) {
      drift.push(path);
    }
  }
  drift.push(...diskFiles);
  if (drift.length) throw new Error("dist is out of date:\n" + drift.join("\n"));
}

async function moveOutput(from, to) {
  for (let attempt = 0; ; attempt++) {
    try {
      renameSync(from, to);
      return;
    } catch (error) {
      const transient = process.platform === "win32" && ["EACCES", "EBUSY", "EPERM"].includes(error.code);
      if (!transient || attempt === 5) throw error;
      await delay(100 * 2 ** attempt);
    }
  }
}

async function publish(files) {
  const previous = verifyExistingDist();
  const workspace = mkdtempSync(join(root, ".hstack-build-"));
  const staging = join(workspace, "next");
  const backup = join(workspace, "previous");
  let preserveBackup = false;
  try {
    for (const [path, { bytes, executable }] of files) {
      const output = join(staging, path);
      mkdirSync(dirname(output), { recursive: true });
      writeFileSync(output, bytes);
      if (executable && process.platform !== "win32") chmodSync(output, 0o755);
    }
    if (previous) await moveOutput(dist, backup);
    try {
      await moveOutput(staging, dist);
    } catch (error) {
      if (previous) {
        preserveBackup = true;
        await moveOutput(backup, dist);
        preserveBackup = false;
      }
      throw error;
    }
  } finally {
    const resolved = realpathSync(workspace);
    if (!preserveBackup && dirname(resolved) === root && !isAbsolute(relative(root, resolved))) {
      rmSync(resolved, { recursive: true });
    }
  }
}

try {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== "--check")) {
    throw new Error("Usage: node scripts/build-harnesses.mjs [--check]");
  }
  const files = collect();
  if (args[0] === "--check") check(files);
  else await publish(files);
  console.log((args.length ? "Verified" : "Built") + " " + skills.length + " skills across " + Object.keys(targets).join(", ") + ".");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
