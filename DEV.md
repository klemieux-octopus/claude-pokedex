# DEV.md — Software Development Life Cycle

This document describes **how work moves from an idea to merged code** in this repository. It is
the practical companion to [`CLAUDE.md`](CLAUDE.md): `CLAUDE.md` states the *rules*, this file
explains the *flow* those rules produce and the tools that drive each stage.

> **Source of truth.** GitHub is authoritative. Issues hold specs, plans, and tickets; the
> [kanban board (Project #3)](https://github.com/users/klemieux-octopus/projects/3) holds state;
> pull requests hold code. Nothing about the plan lives as a file in the repo — see
> [Spec & ticket conventions](CLAUDE.md).

---

## 1. What we are building

The repo has **two parts**, and the life cycle applies differently to each:

| Part | Location | Has build/test/deploy? | Nature of changes |
| --- | --- | --- | --- |
| **Agent skills knowledge base** | `.claude/skills/` | No | Markdown only (vendored from `mattpocock/skills`; provenance tracked in `skills-lock.json`) |
| **Pokédex web app** | `pokedex/` | Yes — React + Vite + TS, test suite, GitHub Pages deploy | Code, built test-first from its spec |

The workflow below is repo-wide. The only difference is the **build/verify** stage: skill changes
are reviewed for content and links; app changes must pass typecheck, tests, and build (see
[`pokedex/README.md`](pokedex/README.md)).

---

## 2. The life cycle at a glance

```
   idea
    │
    ▼
┌─────────────┐   too big for one session?
│  PLAN       │──────────────► /wayfinder  (map of investigation tickets, resolved 1/session)
│ /grill-me   │
└─────────────┘   otherwise plan inline / stress-test with /grill-me
    │
    ▼
┌─────────────┐
│  SPECIFY    │  /to-spec  → publishes a spec as a COMMENT on the parent issue
└─────────────┘             (labels it ready-for-agent — no separate triage)
    │
    ▼
┌─────────────┐
│  SLICE      │  /to-tickets → splits the spec into vertical-slice SUB-ISSUES of the parent
└─────────────┘               (each with blocking edges; labels ready-for-agent)
    │
    ▼
┌─────────────┐  board: Backlog → Ready
│  BUILD      │  /implement one frontier ticket at a time (fresh context each)
│             │    └ /tdd at agreed seams   → board: In progress
└─────────────┘
    │
    ▼
┌─────────────┐  agent does NOT auto-open the PR — it proposes one
│  REVIEW     │  /code-review → push branch → owner tests → (go-ahead) open PR → In review
└─────────────┘
    │
    ▼
┌─────────────┐  owner merges (never the agent) → board: Done
│  SHIP       │  sub-issue branch → parent branch (no PR); parent branch → main via one proposed PR
└─────────────┘
```

The skills in the chain — `wayfinder`, `grill-me`, `to-spec`, `to-tickets`, `implement` — and their
dependencies (`grilling`, `domain-modeling`, `prototype`, `tdd`, `code-review`, and the
`setup-matt-pocock-skills` bootstrap) are the engine. Each is invoked explicitly (they are
`disable-model-invocation: true`), i.e. you run `/wayfinder`, `/to-spec`, etc.

---

## 3. The kanban board — the state machine

Every issue is an item on [Project #3](https://github.com/users/klemieux-octopus/projects/3) with a
single-select **Status** field. Work flows left to right:

| Column | Meaning | Who moves it here |
| --- | --- | --- |
| **Backlog** | Not yet ready — unspecified, or blocked by an open ticket | planning stage |
| **Ready** | Fully specified and unblocked; an agent may take it | after `/to-spec` + `/to-tickets` |
| **In progress** | Started and assigned to the owner | **first step of any task** |
| **In review** | Work done, pull request open | when a PR opens |
| **Done** | Merged / closed | on merge (owner only) |

### Golden rule: state first

> **Putting the issue in the right state is the first step — before any work.**
> When you start a task, *first* move its issue to **In progress** and assign it to the owner; only
> then begin. (`CLAUDE.md`)

Moving a card requires the `project` gh scope (`gh auth refresh -s project`). Board ids and the
`gh project item-edit` command are documented in
[`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md). Current ids:

- Project: `PVT_kwHOEeqboM4Bc1n6`
- Status field: `PVTSSF_lAHOEeqboM4Bc1n6zhXbgsE`
- Options: Backlog `f75ad846` · Ready `61e4505c` · In progress `47fc9ee4` · In review `df73e18b` · Done `98236657`

> Re-query with `gh project field-list 3 --owner klemieux-octopus --format json` if the board is
> edited — the ids change.

---

## 4. The stages in detail

### 4.1 Plan

Two entry points, depending on size:

- **Small enough for one session** → plan inline. Use **`/grill-me`** to stress-test the plan
  before building — a relentless one-question-at-a-time interview (it runs a `/grilling` session).
- **Too big for one session** → **`/wayfinder`**. It charts a **map** (a `wayfinder:map` issue) whose
  child issues are *investigation* tickets, each resolving one decision. Wayfinder **plans, it does
  not build**: the map is done when the way to the destination is clear. Rules:
  - Name the destination first (via `/grilling` + `/domain-modeling`), then map the frontier breadth-first.
  - Never resolve more than **one ticket per session**; clear context between them.
  - Ticket types carry a `wayfinder:<type>` label — `research` (AFK), `prototype` (HITL),
    `grilling` (HITL, the default), `task` (manual unblocking work).
  - Blocking uses GitHub's **native issue dependencies** so the frontier is visible in the UI.

Output of this stage: enough clarity to write a spec. Wayfinding operations (map, child, blocking,
frontier, claim, resolve) and their `gh` commands live in
[`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).

### 4.2 Specify — `/to-spec`

Synthesizes the current conversation into a **spec (PRD)** and publishes it as a **comment on the
parent issue** — never a `SPEC.md`/`PLAN.md` file.

- No interview — it synthesizes what has already been discussed.
- Uses the project domain glossary and respects ADRs in the area touched.
- **Sketches the test seams** (prefer existing seams; use the highest one; fewer is better —
  ideal is one) and confirms them with you.
- The spec covers: Problem Statement · Solution · an extensive User Stories list · Implementation
  Decisions · Testing Decisions · Out of Scope · Further Notes.
- Applies the `ready-for-agent` label directly — **no separate `/triage` step** (specs produced
  here are agent-ready by construction).

### 4.3 Slice — `/to-tickets`

Breaks the spec into **tracer-bullet vertical slices**, each published as a **sub-issue of the
parent**. First it asks which parent issue to work from, reads that issue's spec comment, then:

- Each slice cuts a narrow but **complete** path through every layer (schema → API → UI → tests) and
  is **demoable on its own**, sized to one fresh context window.
- Each ticket declares its **blocking edges** (native GitHub dependencies). Blockers first, so ids
  exist to reference.
- **Wide refactors** are the exception — sequence them **expand → migrate (batched) → contract**
  instead of forcing a vertical slice.
- Quizzes you on granularity and edges until approved, then publishes with `ready-for-agent`.

Each ticket body: **What to build** (user-facing behaviour, not a layer list) · **Acceptance
criteria** · **Blocked by**. No file paths or code snippets (they go stale) — except a decision-
encoding snippet from a prototype.

### 4.4 Build — `/implement` (+ `/tdd`)

Work the **frontier** — any ticket whose blockers are all closed — **one ticket at a time, clearing
context between tickets**.

1. **State first**: move the issue to **In progress**, assign to the owner.
2. Cut a branch (see [§5](#5-branching--pull-requests)).
3. `/implement`: build the work; **use `/tdd`** at the pre-agreed seams (red → green → refactor).
4. Typecheck regularly, run single test files as you go, and the **full suite once at the end**
   (`pokedex/` — see [`pokedex/README.md`](pokedex/README.md)).
5. Commit to the current branch (never `main`).

### 4.5 Review — `/code-review`

`/implement` finishes by invoking **`/code-review`**, which reviews the changes along two axes in
parallel:

- **Standards** — does the code follow this repo's documented coding standards?
- **Spec** — does it match what the originating issue/spec asked for?

Address findings and push the finished work to the branch.

### 4.6 Ship

- **Do not automatically open a PR when implementation finishes — propose one.** Push the branch,
  say it's ready, and let the owner **test the code in the branch** first. Only on the owner's
  explicit go-ahead do you open the PR to `main` and move the card to **In review**. (Sub-issue →
  parent-branch work is exempt: there is no PR at the sub-issue level — push and merge freely.)
- **Never commit to `main`, never merge on your own initiative.** The agent proposes the merge and
  flags any conflicts; **the repo owner reviews and merges.** An agent merges only a specific PR the
  owner has explicitly told it to merge.
- On merge, the card moves to **Done**.

---

## 5. Branching & pull requests

| Situation | Branch strategy | Merge target |
| --- | --- | --- |
| **Standalone ticket** | one feature branch off `main` | PR into `main` |
| **Parent issue with sub-issues** | one long-lived **parent branch** off `main`; each sub-issue on its own branch off the parent branch | sub-issue branch → **parent branch** (push freely); when *all* sub-issues are done, **one** PR from parent branch → `main` |

Rules (from `CLAUDE.md`):

- **Every PR to `main` must be linked to an issue.** Reference it in the PR body — `Closes #<n>` for
  ticketed work, or `Related: #<n>`. No natural ticket? Create a tracking issue first.
- **Sub-issues never merge into `main` directly** — only into their parent's branch.
- Every sub-issue is claimed by whoever claimed the parent issue.
- Before starting a task **not in the Ready column, or already assigned to someone else**, check with
  the owner first.

---

## 6. Issue tracker operations

All issue operations use the `gh` CLI (see [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md)):

| Action | Command |
| --- | --- |
| Create issue | `gh issue create --title "..." --body "..."` (heredoc for multi-line) |
| Read issue + comments | `gh issue view <n> --comments` |
| Comment | `gh issue comment <n> --body "..."` |
| Label | `gh issue edit <n> --add-label "..."` / `--remove-label "..."` |
| Close | `gh issue close <n> --comment "..."` |
| Claim (wayfinder) | `gh issue edit <n> --add-assignee @me` |

Labels in use: `ready-for-agent` (fully specified, agent-grabbable — the handoff signal `/implement`
looks for), `wontfix`, and the `wayfinder:*` family (`map`, `research`, `prototype`, `grilling`,
`task`). The full triage-role vocabulary is documented in
[`docs/agents/triage-labels.md`](docs/agents/triage-labels.md); `/triage` itself is not part of this
repo's active workflow.

---

## 7. Quick reference

```
/grill-me       stress-test a plan (one-question-at-a-time interview)
/wayfinder      plan work too big for one session as a map of tickets
/to-spec        conversation → spec, published as a comment on the parent issue
/to-tickets     spec → vertical-slice sub-issues with blocking edges
/implement      build one frontier ticket (uses /tdd, then /code-review)
```

**Do first, always:** move the issue to *In progress* and assign the owner.
**When done:** push the branch and *propose* a PR — let the owner test before you open it.
**Never:** push to `main`, auto-open a PR into `main`, or merge a PR on your own initiative.
