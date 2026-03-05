# Scope Guard Demo by Josh Knell

A companion project for **Task Class 2, Lesson 1** of the *Claude Code Hooks: A Judgment-First Course* curriculum. Follow the tutorial for instructions on how to use this project.

---

## Prerequisites

```bash
node --version   # Requires Node.js v16+
claude --version # Requires Claude Code
```

If Node isn't installed: https://nodejs.org

If this is your first time using Claude Code, run `claude` once in your terminal to trigger the login flow and authenticate with your Anthropic account before opening this project.

---

## Setup

```bash
cd scope_guard_demo
claude .
```

The hook is pre-wired in `.claude/settings.json`. No additional configuration needed.

---

## Project Structure

```
scope_guard_demo/
├── hooks/
│   └── scope_guard.js        <- the hook
├── .claude/
│   └── settings.json         <- pre-configured hook wiring
├── src/
│   ├── auth/
│   │   └── login.js
│   ├── auth_utils/
│   │   └── helpers.js
│   └── payments/
│       └── validators.js
└── tests/
    └── auth/
        └── login.test.js
```
