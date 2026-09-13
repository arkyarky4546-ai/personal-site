# Placeholders

Content that doesn't exist yet. Until Noah writes it, each item is a placeholder on the site.

**How it works.** In `.astro` files, missing text is wrapped in `<Placeholder>` (`src/components/Placeholder.astro`). It shows with a grey background and a dashed underline. When Cloudflare builds `main`, the build fails while any placeholder is left, so none can reach the live site. Local builds and PR previews still work.

**The rule, for every phase.** If content is missing and Noah doesn't have it yet, build with a placeholder and add a row here. Never write stand-in text that reads as real. When a placeholder is filled in, delete its row.

---

## On the site now

| What | File | Replace it with |
|---|---|---|
| Intro sentence | `src/pages/index.astro` | One sentence: your school, graduation month and year, what you build, the role you want. See `05-content-and-copy.md` §2. |
| Resume link | `src/pages/index.astro` | `<li><a href="/resume.pdf">Resume</a></li>`, once `public/resume.pdf` exists |
| "What I'm working on now" | `src/pages/index.astro` | Two or three lines on what you're building or studying |
| Month for "now" | `src/pages/index.astro` | `<time datetime="2026-09">September 2026</time>`, with the real month |

Phase 3 can't merge to `main` until this table is empty.

## Left out until ready

These aren't placeholders, so they don't block going live. Add them when they exist.

| What | Where it goes | Why it's out |
|---|---|---|
| LinkedIn | One line in `src/data/links.ts`, between GitHub and email | The profile isn't ready yet |

## Needed in later phases

Each becomes a placeholder if it isn't ready when its phase is built.

| Phase | Content | Guide |
|---|---|---|
| 4 | At least one project writeup: title, one-sentence summary, date, tech, GitHub repo link, and the full write-up. Two projects for `/projects`. Screenshots or diagrams if you have them. | `05-content-and-copy.md` §3 |
| 5 | Resume content, a one-page `resume.pdf`, About page copy, and a real photo of you | `05-content-and-copy.md` §4 and §6 |
