# skills

My collection of [Claude Code](https://claude.com/claude-code) skills.

## What's here

| Skill | Description |
|---|---|
| [`create-100m-hooks/`](./create-100m-hooks) | Generate high-performing hooks and X/Twitter content for offers, including Orca-style AI coding-agent/devtool posts, using a $100M Hooks-inspired interview and variation workflow. |
| [`generate-code/`](./generate-code) | Convert a Figma design (built with the shadcn/ui Kit for Figma) into a production-ready responsive React/TSX component, reusing the project's shadcn/ui components, Tailwind tokens, and icon library. Handles Pro Blocks, icons, and assets. |
| [`import-variables/`](./import-variables) | Import Figma design variables (colors, radius, typography, shadows, spacing) into CSS custom properties and sync them to `globals.css`, matching the project's color format. Bundles a `convert-colors.js` hex→oklch/hsl/hex converter. |
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
