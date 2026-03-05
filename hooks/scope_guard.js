#!/usr/bin/env node
/**
 * scope_guard.js
 *
 * A PreToolUse hook that warns when Claude Code attempts to modify
 * files outside a defined scope. Configure ALLOWED_SCOPE for your project.
 *
 * Exit codes:
 *   0 - allow the operation
 *   1 - hard block (Claude Code stops)
 *   2 - non-blocking warning (Claude Code sees the message but can proceed)
 */

const readline = require('readline');
const path = require('path');

// The directories Claude Code is allowed to modify.
// Paths are relative to wherever you run Claude Code from.
const ALLOWED_SCOPE = [
  'src/auth',
  'tests/auth',
];

const FILE_TOOLS = new Set(['Write', 'Edit', 'MultiEdit']);

async function main() {
  const rl = readline.createInterface({ input: process.stdin });

  let input = '';
  for await (const line of rl) {
    input += line;
  }

  const hookInput = JSON.parse(input);
  const { tool_name: toolName, tool_input: toolInput } = hookInput;

  // Only check tools that modify files
  if (!FILE_TOOLS.has(toolName)) {
    process.exit(0);
  }

  const rawPath = toolInput?.file_path ?? '';
  if (!rawPath) {
    process.exit(0);
  }

  // Normalize to a relative path so the scope check works whether Claude Code
  // passes an absolute path (/absolute/path/to/src/auth/login.js) or a relative one.
  const filePath = path.isAbsolute(rawPath)
    ? path.relative(process.cwd(), rawPath)
    : rawPath;

  // Check whether the target file is within the allowed scope
  const inScope = ALLOWED_SCOPE.some(scope => filePath.startsWith(scope));

  if (!inScope) {
    process.stderr.write(
      `Scope warning: Claude Code is about to modify '${filePath}'\n` +
      `This file is outside the defined scope: ${JSON.stringify(ALLOWED_SCOPE)}\n`
    );
    process.exit(2); // Non-blocking: Claude Code sees the warning but can proceed
  }
}

main().catch(err => {
  process.stderr.write(`Hook error: ${err.message}\n`);
  process.exit(0); // Fail open: don't block Claude Code if the hook crashes
});
