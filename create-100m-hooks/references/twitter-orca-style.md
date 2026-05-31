# Twitter And Orca Style Reference

Use this reference when the user asks for X/Twitter hooks, viral posts, threads, QRTs, replies, or content for Orca, AI coding agents, developer tools, or AI infrastructure.

## Style Rules

Write like an X-native AI/devtool account:

- Lead with the sharpest fact, claim, contrast, or visual.
- Use short sentences and frequent line breaks.
- Prefer lowercase for normal posts unless the user wants polished brand copy.
- Use numbers instead of spelled-out quantities: `3 agents`, `$20/mo`, `10 repos`.
- Avoid corporate words: `game-changer`, `unlock`, `leverage`, `seamless`, `revolutionary`.
- Avoid assistant filler: `great question`, `certainly`, `I'll help`.
- Use `1/ 2/ 3/` for threads, not formal numbering.
- Use `>` for compact bullet-style lists when it fits the post.
- Use bracket labels for technical proof: `[ prompt ]`, `[ time ]`, `[ cost ]`, `[ what it did ]`.
- Use code blocks only for prompts, commands, terminal output, or technical snippets.
- Keep CTAs plain: `try it`, `star the repo`, `reply and i'll send the setup`, `build with us`.

Do not copy another creator's exact phrases as a signature style. Borrow the structure: punchy fact, useful context, proof, sharp close.

## Orca Positioning

Orca is agent orchestration infrastructure for AI coding sessions.

Current concrete facts from the repo:

- It runs parallel AI coding agents such as Claude Code and Codex.
- It launches workers in Docker or Kubernetes.
- It supports long-running, multi-turn sessions.
- It streams live events through Redis and stores session/turn metadata in Postgres.
- It has a CLI and Electron desktop app.
- Workers clone repos, run the agent, stay alive, and accept follow-up turns.
- Conversation context is preserved across turns.

Position Orca as:

- `not a chatbot. coding-agent infrastructure.`
- `parallel agents without turning your laptop into a process graveyard.`
- `the missing control plane for Claude Code, Codex, and future coding agents.`
- `a way to turn one-off coding prompts into durable sessions you can inspect, resume, and stream.`

Avoid overclaiming production readiness unless the user provides proof. Prefer concrete architecture claims over hype.

## Target Audiences

Choose one audience per hook when possible:

- AI founders building coding-agent products.
- devtool founders who need agent execution infrastructure.
- engineers using Claude Code, Codex, Cursor, or Copilot every day.
- platform teams that want sandboxed agent runs.
- teams trying to run multiple repo tasks in parallel.
- open-source builders who want a visible agent session history.
- skeptics who think coding agents are just chat windows.

## High-Performing X Formats

### POV

Use for fast, visual hooks.

- `pov: you stopped babysitting 6 coding agents in 6 terminal tabs`
- `pov: your ai coding agent finally has a backend`
- `pov: claude code and codex are now workers, not tabs`

### Shock Or Contrast

Use one surprising contrast, then prove it.

- `most ai coding tools stop at the chat window`
- `orca starts after the prompt`
- `the hard part is not asking an agent to code. it is running 20 of them safely.`

### Build-In-Public Log

Show what changed and why it matters.

```
we added [feature]

before:
> [pain]

after:
> [new behavior]

this matters because [specific developer pain]
```

### Roadmap / Guide Thread

Use when teaching the category.

```
the coding-agent infrastructure stack no one maps out

most people see the chat UI.

the real system is:

1/ scheduler
2/ worker sandbox
3/ session state
4/ event stream
5/ resume protocol
```

### News / Launch Post

Use when announcing a feature or repo milestone.

```
we just shipped [specific thing]

what changed:
> [fact 1]
> [fact 2]
> [fact 3]

why it matters:
[plain consequence]
```

### Comparison

Use when contrasting Orca against raw terminals, one-off CLI runs, or chat-only tools.

```
chat window: asks once
orca session: runs, streams, stores, resumes

terminal tab: one agent
orca: many agents with a control plane
```

### QRT

Use one clear take. Add context only if needed.

- `[tool/company] proved the obvious: coding agents need infrastructure, not just better prompts.`
- `this is why orca exists. the agent is only one piece. the session runtime is the product.`

### Reply

Keep replies to 1-3 sentences. Add a missing angle, simplify the idea, or take a side. Do not hedge.

## Orca Angle Bank

Use these angles to generate original hooks:

- Chat UI vs durable agent session.
- One agent vs many parallel agents.
- Prompting vs orchestration.
- Local terminal chaos vs backend-managed workers.
- Toy demo vs resumable multi-turn coding session.
- Agent output vs event stream and audit trail.
- Laptop process vs Docker/Kubernetes worker.
- Single repo task vs queued fleet of repo tasks.
- Human babysitting vs follow-up commands and idle workers.
- Claude Code vs Codex as interchangeable adapters.
- The future IDE as a control plane, not a text box.

## Post Shapes To Return

When the user asks for Twitter/X content, offer one or more of these:

- `single posts`: 10-20 standalone posts.
- `threads`: 3-7 tweet structures with `1/ 2/ 3/` beats.
- `QRTs`: short takes on AI coding, devtools, or agent infrastructure news.
- `replies`: 1-3 sentence responses to a provided post.
- `content material`: screenshots to capture, terminal snippets to show, demo flow, visual proof, CTA.

## Ranking For X

Score candidates by:

- scroll-stop strength in the first line.
- developer specificity.
- proof density.
- reply bait without being empty rage-bait.
- clarity for someone who has never heard of Orca.
- likelihood of attracting the right users, not just broad engagement.

## Safety And Taste

Do not promise virality. Say `designed to be more testable on X` or `stronger candidates to test`.

Keep claims defensible. If the user has not provided metrics, do not invent stars, users, revenue, benchmarks, or launch dates.
