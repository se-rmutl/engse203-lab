#!/usr/bin/env node
/**
 * ENGSE203 setup verifier
 * Run: node scripts/verify-setup.mjs
 *
 * This script checks local prerequisites only. Run `ssh -T git@github.com`
 * separately so the student can confirm the actual GitHub account identity.
 */

import { spawnSync } from "node:child_process";
import { platform, homedir } from "node:os";

const results = [];

function run(command, args = []) {
  const output = spawnSync(command, args, {
    encoding: "utf8",
    shell: false,
  });

  return {
    ok: output.status === 0,
    code: output.status,
    stdout: (output.stdout || "").trim(),
    stderr: (output.stderr || "").trim(),
    error: output.error?.message || "",
  };
}

function pass(label, detail) {
  results.push({ status: "PASS", label, detail });
}

function warn(label, detail) {
  results.push({ status: "WARN", label, detail });
}

function fail(label, detail) {
  results.push({ status: "FAIL", label, detail });
}

function versionAtLeast22_12(version) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(version);
  if (!match) return false;

  const [, majorText, minorText] = match;
  const major = Number(majorText);
  const minor = Number(minorText);
  return major > 22 || (major === 22 && minor >= 12);
}

console.log("\nENGSE203 Development Setup Verification");
console.log("====================================");
console.log(`Platform: ${platform()} | Home: ${homedir()}`);

const nodeVersion = process.version;
if (versionAtLeast22_12(nodeVersion)) {
  pass("Node.js", `${nodeVersion} meets the course baseline (>= 22.12.0).`);
} else {
  fail("Node.js", `${nodeVersion} is below the course baseline. Run: nvm install 22 && nvm use 22`);
}

const npm = run("npm", ["--version"]);
if (npm.ok) {
  pass("npm", npm.stdout);
} else {
  fail("npm", npm.error || npm.stderr || "npm command was not found.");
}

const git = run("git", ["--version"]);
if (git.ok) {
  pass("Git", git.stdout);
} else {
  fail("Git", git.error || git.stderr || "git command was not found.");
}

const gitName = run("git", ["config", "--global", "user.name"]);
if (gitName.ok && gitName.stdout) {
  pass("Git commit name", gitName.stdout);
} else {
  warn("Git commit name", "Not configured globally. Run: git config --global user.name \"Your English Name\"");
}

const gitEmail = run("git", ["config", "--global", "user.email"]);
if (gitEmail.ok && gitEmail.stdout) {
  pass("Git commit email", gitEmail.stdout);
} else {
  warn("Git commit email", "Not configured globally. Run: git config --global user.email \"your-github-email@example.com\"");
}

const code = run("code", ["--version"]);
if (code.ok) {
  pass("VS Code CLI", code.stdout.split("\n")[0]);
} else {
  warn("VS Code CLI", "code command was not found. Install VS Code PATH integration, then reopen the terminal.");
}

const ssh = run("ssh", ["-V"]);
if (ssh.ok || ssh.stderr) {
  pass("OpenSSH client", ssh.stdout || ssh.stderr);
} else {
  fail("OpenSSH client", ssh.error || "ssh command was not found.");
}

if (platform() === "linux") {
  const workspace = run("bash", ["-lc", "pwd"]);
  if (workspace.ok && workspace.stdout.startsWith("/home/")) {
    pass("Linux workspace", `${workspace.stdout} (Linux filesystem detected).`);
  } else {
    warn("Linux workspace", "Open the ENGSE203 workspace under /home/<user>/workspace/engse203, not /mnt/c/...");
  }
}

console.log("");
for (const result of results) {
  const icon = result.status === "PASS" ? "✓" : result.status === "WARN" ? "!" : "✗";
  console.log(`${icon} [${result.status}] ${result.label}: ${result.detail}`);
}

const failed = results.filter((result) => result.status === "FAIL").length;
console.log("\nNext required manual check:");
console.log("  ssh -T git@github.com");
console.log("  Confirm that GitHub prints your own username.");
console.log("");

process.exitCode = failed > 0 ? 1 : 0;
