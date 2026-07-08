# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is not an application — it is a **knowledge base of agent skills**. Each skill is a subdirectory holding a `SKILL.md` plus any supporting Markdown it references. There is no build, no test suite, no lint step, and no runtime. Changes are to Markdown content only.

The skills are vendored from the `mattpocock/skills` GitHub repo. `skills-lock.json` is the manifest: it maps each local skill name to its upstream `source`, `skillPath`, and a `computedHash` of the pinned content. Treat `skills-lock.json` as the source of truth for provenance — when adding, removing, or updating a skill, keep it in sync with `.claude/skills/`, and update `computedHash` when the content changes.

## Where skills live

We work exclusively with Claude Code, so skills live in **one** place:

- **`.claude/skills/`** — where **Claude Code actually discovers skills**. Claude Code only loads skills from `.claude/skills/` (project) or `~/.claude/skills/` (user). Treat this as the single source of truth for the content, and what `skills-lock.json` tracks.

The `mattpocock/skills` installer also writes a vendor-neutral `.agents/skills/` copy, but Claude Code does not scan it, so we don't keep it: `.agents/` is git-ignored and deleted from this repo. If a `skills` install regenerates `.agents/skills/`, copy any updates into `.claude/skills/` and remove `.agents/` again. Skills with `disable-model-invocation: true` are only invoked explicitly (e.g. `/setup-matt-pocock-skills`), never auto-selected by the model.

## Anatomy of a skill

- Each skill lives at `.claude/skills/<name>/SKILL.md`.
- The `SKILL.md` frontmatter has `name`, `description`, and optionally `disable-model-invocation: true` (meaning the skill is invoked explicitly, e.g. via `/name`, never auto-selected by the model from its description).
- Supporting docs (e.g. `tdd/mocking.md`, `domain-modeling/ADR-FORMAT.md`, `setup-matt-pocock-skills/issue-tracker-github.md`) are referenced from `SKILL.md` by **relative links** and hold detail or templates the main file points to. When editing, preserve these relative links.
- The `writing-great-skills` skill is the style reference for authoring or editing any skill in this repo — consult it before making substantive changes to a `SKILL.md`.

## How the skills relate

These skills assume a per-repo configuration and are designed to compose into an engineering workflow. The big picture:

- **`setup-matt-pocock-skills`** is the bootstrap. It must be run once in a *consuming* repo before the engineering skills work, because it writes `docs/agents/{issue-tracker,triage-labels,domain}.md` — the config the other skills read to know where issues live, what triage labels to use, and where domain docs (`CONTEXT.md`, `docs/adr/`) are. Many skills degrade to a local-markdown tracker default if this config is absent.
- **`ask-matt`** is the router — it points you at the right skill for a situation.
- **Planning → tickets → spec → implementation** is the main chain: `wayfinder` (plan work too large for one session as a map of tickets) / `grilling` (stress-test a plan) / `domain-modeling` → `to-tickets` / `to-spec` (publish to the tracker) → `triage` (move issues through a state machine) → `implement` / `tdd` (build it) → `code-review`.
- **Design and quality** skills: `codebase-design` (shared vocabulary for deep modules), `improve-codebase-architecture`, `diagnosing-bugs`, `prototype`, `research`.
- **Productivity** skills: `handoff` (compact a conversation for another agent), `teach`, `grill-me` / `grill-with-docs`.

An important consequence: the skills' instructions (e.g. `wayfinder`, `triage`, `to-tickets`) are written for the repo where they are *installed and run*, and reference `docs/agents/*.md` and an issue tracker that exist in that consuming repo — not here. This repo is the storage/distribution point for the skills, not their execution context.

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI; external PRs are **not** a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary — each label string equals its role name (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Task workflow

Rules for working tasks on the project kanban board ([GitHub Project #3](https://github.com/users/klemieux-octopus/projects/3) — columns and the `gh` commands to move cards are documented in `docs/agents/issue-tracker.md`):

- **When you start a task**, move it to the **In progress** column and assign it to me (the repo owner).
- **Before taking any task that is not in the Ready column, or is already assigned to someone else**, check with me first — do not start work on it until I confirm.
- **All changes ship as a pull request** — never commit directly to `main`. Stage the work on a branch and open a PR.
- **When a task's work is ready for review**, open its pull request and move the ticket to the **In review** column on the kanban board.
