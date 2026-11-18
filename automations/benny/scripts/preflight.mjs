#!/usr/bin/env node

import { readFileSync, realpathSync, statSync } from "node:fs";
import { isAbsolute, relative, resolve, sep } from "node:path";

function must(condition, message) {
  if (!condition) throw new Error(message);
}

function httpsUrl(input, label, originOnly = false) {
  must(typeof input === "string" && input === input.trim() && /^https:\/\/[^\\/\s]/.test(input)
    && !/[\s\\]/.test(input), label + " must be an HTTPS URL.");
  const url = new URL(input);
  must(!url.hostname.includes("*"), label + " must not contain wildcards.");
  must(!url.username && !url.password, label + " must not contain credentials.");
  if (originOnly) must(input === url.origin, label + " must be an exact normalized HTTPS origin.");
  return url;
}

function featureMapPath(path) {
  must(typeof path === "string" && path.trim() && !isAbsolute(path), "Feature map must be workspace-relative.");
  const workspace = realpathSync(process.cwd());
  const isInside = file => {
    const local = relative(workspace, file);
    return local && local !== ".." && !local.startsWith(".." + sep) && !isAbsolute(local);
  };
  const requested = resolve(workspace, path);
  must(isInside(requested), "Feature map must stay inside the workspace.");
  const actual = realpathSync(requested);
  must(isInside(actual) && statSync(actual).isFile(), "Feature map must be a file inside the workspace.");
}

function config(path) {
  const data = JSON.parse(readFileSync(path, "utf8"));
  const repo = data?.repository?.github;
  const branch = data?.repository?.baseBranch;
  const staging = httpsUrl(data?.staging?.origin, "Staging origin", true).origin;
  const helpScout = httpsUrl(data?.helpScout?.origin, "Help Scout origin", true).origin;
  must(typeof repo === "string" && /^[\w.-]+\/[\w.-]+$/.test(repo) && repo.toUpperCase() !== "OWNER/REPO",
    "Configure the exact GitHub OWNER/REPO.");
  must(typeof branch === "string" && branch.trim(), "Configure a Git base branch.");
  must(typeof data.helpScout.mailbox === "string" && data.helpScout.mailbox.trim() && data.helpScout.mailbox !== "TEAM MAILBOX",
    "Configure the Help Scout mailbox.");
  must(staging !== helpScout && staging !== "https://team-dev-store.myshopify.com", "Configure the actual staging origin.");
  const marker = data.staging.marker;
  for (const key of ["selector", "attribute", "value"]) {
    must(typeof marker?.[key] === "string" && marker[key].trim(), "Configure the staging marker " + key + ".");
  }
  featureMapPath(data.staging.featureMap);
  return { staging, marker };
}

function checkStaging(config, candidate, merchantOrigin) {
  const url = httpsUrl(candidate, "Candidate staging URL");
  if (merchantOrigin) {
    const merchant = httpsUrl(merchantOrigin, "Merchant origin", true).origin;
    must(config.staging !== merchant, "Configured staging matches the merchant origin.");
  }
  must(url.origin === config.staging, "Candidate origin does not match the configured staging origin.");
}

try {
  const [path, action, ...args] = process.argv.slice(2);
  const arity = { validate: [0], navigate: [1, 2], observe: [2, 3] };
  must(path && Object.hasOwn(arity, action) && arity[action].includes(args.length),
    "Usage: node preflight.mjs <config> validate | navigate <url> [merchant-origin] | observe <url> <marker-value> [merchant-origin]");
  const settings = config(path);
  if (action === "navigate") checkStaging(settings, args[0], args[1]);
  if (action === "observe") {
    checkStaging(settings, args[0], args[2]);
    must(args[1] === settings.marker.value, "Observed staging marker does not equal the configured value.");
  }
  console.log("Benny " + action + " preflight passed.");
} catch (error) {
  console.error("Benny preflight blocked: " + error.message);
  process.exitCode = 1;
}
