# CLAUDE.md

Instructions for Claude Code working in this repo. Read before making changes.

---

## What this is

The personal site of Noah Kitayama, a CS undergraduate. It exists so that a recruiter or hiring engineer who searches the name finds it, and can decide within a minute whether to get in touch.

Full specs live in `docs/`. Read `docs/04-design-direction.md` before any visual work.

## Cost constraint

**This project has a budget of $0.** Stay on the Cloudflare Workers FREE
plan at all times. Never introduce a paid service, a paid tier, a trial
that requires a card, or a Cloudflare binding that needs the $5/mo
Workers Paid plan (Durable Objects, Hyperdrive, and similar). If a task
seems to need one, stop and say so rather than signing anything up.

Static assets on Workers are unmetered, so serving the site itself can
never generate a charge. Keep it that way: no server-side Worker logic
unless Noah explicitly asks.

## Priorities, in order

1. **Correct and honest.** Never invent an accomplishment, a metric, or a project. If content is missing, ask — don't write plausible filler.
2. **Fast.** The performance budget in `docs/03-system-design.md` §7 is a hard limit, not a target.
3. **Distinctive.** This must not look generated. See `docs/04-design-direction.md`.
4. **Maintainable by a busy student.** Adding a project = one Markdown file. Always.
5. **Accessible.** The floor in `docs/03-system-design.md` §8 is non-negotiable.

---

## Stack

- Astro 7, static output
- TypeScript, strict
- Vanilla CSS with custom properties — **no Tailwind, no CSS-in-JS, no component library**
- Content collections: Markdown + Zod
- Cloudflare Workers with static assets (free plan)
- pnpm, Node 22

## Commands

```bash
pnpm dev          # localhost:4321
pnpm build        # → dist/
pnpm preview      # preview the build
pnpm astro check  # type + template errors
```

## Layout

```
public/       resume.pdf, favicon, robots.txt, _headers  (verbatim)
src/
  content/projects/   one .md per project
  data/resume.ts      single source of truth for resume content
  components/         BaseHead has ALL meta tags
  layouts/
  pages/
  styles/tokens.css   ALL colors, sizes, spacing. Nothing elsewhere.
docs/         the specs
```

---

## Hard rules

**Never, without Noah explicitly asking:**

Typography
- Inter, Roboto, Open Sans, Helvetica, Arial, or `system-ui` as a primary face
- Tracked-out ALL-CAPS eyebrow labels
- Accenting one word in a headline with color, italic, or bold
- Monospace as decoration for small labels
- `→` appended to link or button text
- Metadata joined by middle dots (`A · B · C`)

Color
- Any gradient, as background or on text
- Tailwind default color names
- `#000`, `#fff`, `#111`, `#0B0B0B`
- More than one accent color
- Glassmorphism / backdrop-blur decoration

Layout
- More than two visually identical cards in a row
- The same `border-radius` on every element
- `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` or similar under every card
- `01 / 02 / 03` numbering on content that isn't a sequence
- Emoji as section headers or icons
- A skills bar chart ("JavaScript 85%")

Motion
- Fade-in-on-scroll on multiple sections
- Hover-lift on every card
- Animated backgrounds, typewriter effects, counting numbers
- Any motion that ignores `prefers-reduced-motion`

Dependencies
- shadcn/ui or any component library
- Lucide or Heroicons
- Any third-party script, including font CDNs. The only permitted exception is the Cloudflare Web Analytics beacon, if Noah has enabled it.
- Any npm package not already in `package.json`, without asking first

Content
- "passionate", "leveraging", "cutting-edge", "seamless", "robust", "innovative", "dive into", "elevate", "craft" (as a verb), "journey"
- Lorem ipsum in anything that gets committed
- Stock illustration or AI-generated imagery
- Any claim about Noah that Noah did not supply

**Always:**
- Read `/mnt/skills/public/frontend-design/SKILL.md` before visual work
- Propose a plan and wait for approval before writing code
- Every color, size, and space from a custom property in `tokens.css`
- Semantic HTML before ARIA
- Visible focus ring on everything focusable
- Explicit `width` and `height` on every image
- Astro's `<Image />`, never a bare `<img>` for local images
- Sentence case for headings
- `text-wrap: balance` on headings

---

## Definition of done

A change isn't done until:

- [ ] `pnpm build` passes with zero warnings
- [ ] `pnpm astro check` passes
- [ ] Lighthouse ≥ 95 on all four categories
- [ ] CLS is 0
- [ ] Works at 320px with no horizontal scroll
- [ ] Keyboard-navigable with visible focus
- [ ] No new third-party requests
- [ ] No new JS shipped unless the feature genuinely requires interactivity

---

## Working style

- **Plan first, always.** List the files you'll touch and why. Wait.
- **One phase per session.** Phases are in `docs/06-build-phases.md`.
- **Report real numbers.** When asked about performance, run it and report actual figures. Never estimate and never round up.
- **Report failures.** If an acceptance criterion fails, say so plainly. A phase reported as passing when it isn't is worse than a phase that fails.
- **Push back.** If something in these docs is wrong, or if a request would make the site slower, less accessible, or harder to maintain, say so before building it.
- **Don't over-abstract.** Six static pages. A component used once should probably be inline. Prefer duplication over the wrong abstraction.
- **Ask rather than invent.** Missing content, an unclear metric, an ambiguous design call — ask. Never fill the gap with something plausible.
- **Missing content Noah doesn't have yet becomes a placeholder.** Build with `<Placeholder>` and list it in `docs/placeholders.md`. A build of `main` fails while any placeholder is left.
