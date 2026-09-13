# Personal Site — Planning Docs

Everything Claude Code needs to build your site, split so you can work one section at a time.

**Nothing here builds the site.** These are specs. You hand them to Claude Code phase by phase.

---

## The short version

| Decision | Choice |
|---|---|
| Framework | Astro 7 (static output) |
| Language | TypeScript, strict |
| Styling | Vanilla CSS + custom properties. **No Tailwind defaults, no shadcn.** |
| Content | Astro content collections — Markdown + Zod schemas |
| Host | Cloudflare Workers with static assets — free, no card, no expiry |
| URL | Free `*.workers.dev` to start. A domain is optional, see D6. |
| Analytics | Cloudflare Web Analytics (no cookies, no banner) — or none |
| CI | GitHub Actions: build + Lighthouse + link check on every PR |
| Repo | Public on GitHub — the repo is itself a work sample |

Total cost: **$0.** No credit card required at any point. Cloudflare's free Workers plan needs no card, and static assets are served free with no usage limits. A domain name is the only thing that can ever cost money, and it's optional — `02-stack-decisions.md` D6 has three options including a free student one.

---

## Files, in reading order

| File | What it's for | Read when |
|---|---|---|
| `00-SETUP.md` | Folder structure, installs, first session. **Start here.** | Once, before Phase 1 |
| `01-brief.md` | Goals, audience, scope, what success means | Before anything. Sets the bar. |
| `02-stack-decisions.md` | Every tech choice, why, and what was rejected | Before Phase 0. Argue with it. |
| `03-system-design.md` | Architecture, hosting, DNS, SEO, perf, security, CI | Phase 0–1, then again at Phase 6 |
| `04-design-direction.md` | The anti-AI-look design system + the full tools list | Phase 2. **This is the one you asked about.** |
| `05-content-and-copy.md` | What to write, resume strategy, voice rules | Phase 3–5 |
| `06-build-phases.md` | Phases 0–8 with testable acceptance criteria | Your working checklist |
| `07-prompts-for-claude-code.md` | Paste-ready prompts, one per phase | Every Claude Code session |
| `CLAUDE.md` | Goes in your repo root. Claude Code reads it automatically. | Copy to repo in Phase 1 |

---

## How to run this

1. **Follow `00-SETUP.md`.** Folder layout, installs, git, first session. ~30 min.
2. Read `01-brief.md` and `02-stack-decisions.md`. Change anything you disagree with — these are proposals, not orders.
3. For each phase: open a fresh Claude Code session from the project root, paste that phase's prompt from `07-prompts-for-claude-code.md`.
4. Don't skip Phase 1. Getting an ugly page live at a real URL before you design anything is the single highest-value move in this plan.

**One session per phase.** Long sessions drift. Commit at the end of each.

### Where the files go

`CLAUDE.md` sits in the **project root** — Claude Code loads it automatically every session. Everything else goes in `docs/` and gets read on demand. Details in `00-SETUP.md` §1.

---

## Placeholders to replace

Search-and-replace these across all files once you decide:

- `{{FULL_NAME}}` — e.g. Noah Smith
- `{{DOMAIN}}` — e.g. noahsmith.com
- `{{GITHUB}}` — your GitHub username
- `{{EMAIL}}` — the address you'll put on the site

---

## One honest thing before you start

A portfolio site does not get you a job. Projects get you a job. The site removes friction between a recruiter finding your name and understanding what you can do.

So: **budget two weekends for this, not two months.** The plan is deliberately scoped to fit that. If you find yourself on week four picking a border-radius, the site has started costing you more than it's worth — ship it and go build something to put on it.

The corollary: the site is only as good as what's on it. Phase 4 (projects) and `05-content-and-copy.md` matter more than Phase 2 (design). Design makes people read; content makes them call.
