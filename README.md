# skills

My collection of [Claude Code](https://claude.com/claude-code) skills.

## What's here

| Skill | Description |
|---|---|
| [`refactoring-ui/`](./refactoring-ui) | Design coach grounded in Adam Wathan & Steve Schoger's *Refactoring UI*. Triggers on any frontend UI work (build, refactor, or design-decision support) and prescribes concrete changes across hierarchy, spacing, typography, color, depth, images, and finishing touches. |

## Installing a skill

Skills live in one of two places Claude Code looks at:

- **User scope** — `~/.claude/skills/<skill-name>/` (available in every project)
- **Project scope** — `<repo>/.claude/skills/<skill-name>/` (available only in that repo)

Copy or symlink the skill directory you want into one of those locations, then restart Claude Code so it picks up the new skill.

```bash
# Example: install refactoring-ui at user scope
git clone https://github.com/vcashwin/skills.git ~/src/skills
mkdir -p ~/.claude/skills
ln -s ~/src/skills/refactoring-ui ~/.claude/skills/refactoring-ui
```

## Skill anatomy

Each skill is a directory with at least a `SKILL.md` (YAML frontmatter + markdown instructions). Most also bundle a `references/` folder with deeper guidance loaded on demand. See [Anthropic's skill-creator docs](https://github.com/anthropics/skills/tree/main/skills/skill-creator) for the format.
