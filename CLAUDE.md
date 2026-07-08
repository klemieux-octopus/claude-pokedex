# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

**All work must be done in French.** This applies to everything you produce: chat responses to the
user, specs and tickets published to the issue tracker, issue and PR titles and bodies, commit
messages, code comments, and documentation. Write prose, explanations, and narration in French.

Keep in their original form the things that would break or become non-idiomatic if translated:
code identifiers (variables, functions, types), API and CLI names, file paths, labels, and any
established technical term or library name that has no natural French equivalent. When in doubt,
translate the explanation but leave the symbol untouched.

## What this repo is

This repo has **two parts**, and how you work depends on which you're touching:

1. A **knowledge base of agent skills** under `.claude/skills/`. Each skill is a subdirectory holding a `SKILL.md` plus supporting Markdown — no build, no test suite, no runtime; changes here are Markdown-only. The skills are vendored from the `mattpocock/skills` GitHub repo. `skills-lock.json` is the manifest: it maps each local skill name to its upstream `source`, `skillPath`, and a `computedHash` of the pinned content. Treat `skills-lock.json` as the source of truth for provenance — when adding, removing, or updating a skill, keep it in sync with `.claude/skills/`, and update `computedHash` when the content changes.
2. The **Pokédex web app** under `pokedex/` — a React + Vite + TypeScript app, built test-first from its spec (posted as a comment on [issue #1](https://github.com/klemieux-octopus/claude-pokedex/issues/1) — GitHub Issues are the source of truth). Unlike the skills, it *does* have a build, a test suite, and a GitHub Pages deploy; see [`pokedex/README.md`](pokedex/README.md) for the dev / test / build / deploy commands.

The skill-focused sections below (skill anatomy, how the skills relate, agent-skills config) describe part 1; the **Task workflow** section applies repo-wide, to app work included.

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

## Spec & ticket conventions

**GitHub Issues are the source of truth.** Specs, plans, and tickets produced while working are never saved as files in the repo — they live on the issues themselves.

- **`/to-spec`**: publish the spec it produces as a **comment on the parent issue**. Do **not** write it to a `SPEC.md` / `PLAN.md` (or any other doc file) in the repo.
- **`/to-tickets`**: first ask which **parent issue number** to work from. Read the spec from that issue's comments, then split it into **sub-issues of that parent issue**.

## Task workflow

Rules for working tasks on the project kanban board ([GitHub Project #3](https://github.com/users/klemieux-octopus/projects/3) — columns and the `gh` commands to move cards are documented in `docs/agents/issue-tracker.md`):

- **Never push to `main`, and never merge a PR on your own initiative.** You push only to feature branches. When a PR is ready, **propose the merge** (say it's ready and offer) and **flag any merge conflicts** — the repo owner reviews the code and decides. Merge only a specific PR the owner has **explicitly told you to merge**; absent that explicit go-ahead you never merge (the owner may merge it themselves and tell you).
- **Putting the issue in the right state is the FIRST action — before ANY work on it.** "Work" is not just writing code: it includes grilling, design, research, prototyping, planning, and running any skill against the issue (`/grill-me`, `/implement`, `/tdd`, `/prototype`, `/to-spec`, …). The instant you begin working an issue, your first step is to move it to the **In progress** column and assign it to me (the repo owner); only then do the work. If you ever notice you're mid-work with the state unset, stop and set it immediately.
- **Before taking any task that is not in the Ready column, or is already assigned to someone else**, check with me first — do not start work on it until I confirm.
- **All work is staged on a branch — never commit directly to `main`.** Work reaches `main` only through a PR, but that PR is **not** opened automatically when implementation finishes; see the review-handoff rule below.
- **Every PR to `main` must be linked to an issue** for tracking — reference it in the PR body (`Closes #<n>` for ticketed work, or `Related: #<n>`). If a change has no natural ticket, create a tracking issue first.
- **Sub-issues merge into their parent issue's branch, never into `main` directly.** For a parent issue that has sub-issues: cut one long-lived **parent branch** off `main`; work each sub-issue on its own branch off the parent branch and merge it back into the parent branch (push to the parent branch freely). **There is no PR at the sub-issue level** — when a sub-issue is done, just push its branch and merge it into the parent branch; the review-handoff rule below applies only to the final PR into `main`. When **all** sub-issues are done, **propose** (don't automatically open) a single PR from the parent branch to `main`. Every sub-issue is claimed by whoever claimed the parent issue.
- **Sub-issues you create while working a parent issue are auto-claimed and boarded.** As you create each sub-issue, immediately (a) **assign it to me** (the repo owner) — it inherits the parent's claim, so no need to ask — and (b) **add it to the kanban board and set its Status** to the column matching its state: **Ready** if it's specified and unblocked, **Backlog** if it's blocked by another open ticket, **In progress** only once you actually start it. Never leave a newly created sub-issue unassigned or off the board.
- **When implementation is done, do NOT automatically open a PR — propose it.** Push the finished work to its branch, tell me it's ready, and let me test the code in the branch first. Only once I'm happy and give an explicit go-ahead do you open the PR to `main` and move the ticket to the **In review** column. This propose-first gate is for PRs into `main` only; sub-issue → parent-branch work is exempt (see the sub-issue rule above).
