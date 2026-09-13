# 07 — Prompts for Claude Code

Paste-ready, one per phase. Replace placeholders first.

---

## How to run a session

**Run `claude` from the project root** — the folder containing `CLAUDE.md`, not from inside `docs/`. Claude Code loads `CLAUDE.md` automatically from wherever you start it, so starting in the wrong folder silently drops every hard rule. See `00-SETUP.md` if you haven't set the folder up yet.

**Fresh session per phase.** Context accumulates and constraints get diluted. A long session forgets the design rules around hour two, which is exactly when it starts writing components.

**Start every session by pointing at the docs.** `CLAUDE.md` loads automatically, but the phase specs don't:

> Read `docs/02-stack-decisions.md`, `docs/04-design-direction.md`, and `docs/06-build-phases.md`. Also read `/mnt/skills/public/frontend-design/SKILL.md`. We're doing Phase N.

**Ask for a plan before code.** Every time:

> Before writing any code, tell me what files you'll create or change and why. Wait for my go-ahead.

This catches wrong-direction work in 30 seconds instead of after 200 lines.

**Reject generic output specifically.** "Make it better" produces a different generic thing. Name the tell:

> The card grid is three identical rounded boxes with the same shadow — that's the pattern in `04-design-direction.md` §1.3. Restructure this. The three items aren't parallel; project one is the substantial one and should be sized to say so.

**Make it verify its own work.** At the end of each phase:

> Run the audit in `docs/04-design-direction.md` §7 against what you built and report each result honestly, including anything that fails.

**Commit at the end of every phase.** Non-negotiable. A broken Phase 4 should not be able to take Phase 3 down with it.

---

## Phase 1 — Skeleton and deploy

```
Read docs/02-stack-decisions.md and docs/03-system-design.md.

Set up Phase 1 from docs/06-build-phases.md: an Astro 7 project that
deploys to Cloudflare Workers, with NO styling at all.

Requirements:
- Astro 7, TypeScript strict, static output
- Cloudflare Workers static assets via wrangler.jsonc, no adapter (the adapter is only for on-demand rendering)
- Stay entirely within the Workers FREE plan — no paid bindings,
  no Durable Objects, nothing that needs a card
- pnpm, Node 22, .nvmrc
- Repo layout exactly as in docs/03-system-design.md §2
- Base.astro layout and BaseHead.astro with minimal meta

IMPORTANT: this folder is NOT empty. It already contains CLAUDE.md and
docs/, both committed to git. Scaffold Astro *in place* around them.
Do not delete, move, or overwrite either one, and do not scaffold into
a subfolder. If `npm create astro` refuses to run in a non-empty
directory, scaffold to a temp dir and copy the files in instead.
- index.astro: my name in an <h1>, nothing else
- 404.astro
- .gitignore, README.md
- Copy CLAUDE.md to the repo root

Do NOT add any CSS beyond the browser default. Do NOT pick fonts or
colors — that's Phase 2 and I want to do it deliberately.

Plan first, then wait for me.
```

After it finishes, connect the Worker to your repo in the Cloudflare dashboard. That's the only click Claude Code can't do for you. Attaching a custom domain is optional and can wait.

---

## Phase 2 — Design system

The most important prompt here. Two steps.

**Step 2a — direction, no code:**

```
Read docs/04-design-direction.md in full, plus
/mnt/skills/public/frontend-design/SKILL.md.

Phase 2: the design system. Do NOT write code yet.

Context: I'm a CS undergrad. The site is for internship and new-grad
applications. My work is algorithms and systems — C++, discrete math,
correctness and performance. The site should feel like it belongs to
someone who cares about how things actually work, not someone
performing "creative developer."

Produce THREE distinct design directions. For each:
- the token spec from §6 of that doc, filled in
- two typefaces, named, with foundry and licence, and a real reason
- 4-6 colors as oklch or hex, with the role of each
- a one-sentence layout concept plus an ASCII wireframe of the homepage
- 3-5 sentences on what makes this direction specific to ME

Constraints:
- Zero gradients
- Not Inter, Roboto, Open Sans, Helvetica, Arial, or system-ui
- Not #000, #fff, #111, or #0B0B0B
- Exactly one accent per direction
- All three directions must be genuinely different from each other,
  not one idea in three color schemes

Then, for each, answer honestly: would you have produced roughly this
for any developer portfolio? Where the answer is yes, revise that part
and tell me what you changed.
```

Pick one, or ask for a hybrid, then:

**Step 2b — build it:**

```
Build direction [N]. Deliverables from Phase 2 in docs/06-build-phases.md:

- tokens.css with every color, size, space, radius as custom properties
- reset.css, base.css, utilities.css (under 20 utility classes)
- Fonts self-hosted via Astro's Fonts API — woff2, subsetted, preloaded.
  No Google Fonts CDN link.
- Type scale as fluid clamp() values. Use Utopia-style calculations.
- Header.astro and Footer.astro
- A /styleguide page showing every token and element, with noindex

Rules:
- No hex value outside tokens.css
- Visible focus ring on everything interactive
- prefers-reduced-motion respected
- Borders over shadows

When done, run the §7 audit and report every result including failures.
```

---

## Phase 3 — Homepage

```
Phase 3 from docs/06-build-phases.md. Read docs/05-content-and-copy.md §2.

Build the homepage with this real content:

NAME: Noah Kitayama
INTRO: [your one sentence — be specific]
LINKS: Resume (/resume.pdf) · GitHub (...) · LinkedIn (...) · Email (...)
NOW: [2-3 lines on what you're currently working on]

Hard requirements:
- Name, intro, and all four links above the fold at 375x667
- Zero JavaScript shipped
- Readable at 320px, no horizontal scroll
- Real content only, no lorem ipsum

Explicitly do NOT:
- Center everything by default — make an alignment choice and justify it
- Add a skills bar chart
- Use a card grid for the links
- Add fade-in-on-scroll
- Add icons where words would do

Plan the structure first, including an ASCII wireframe, then wait.
```

---

## Phase 4 — Projects

```
Phase 4 from docs/06-build-phases.md. Read docs/05-content-and-copy.md §3.

Build the projects system:
- src/content.config.ts with a Zod schema: title, summary, date,
  tech[], repo, demo (optional), featured (boolean)
- /projects index page
- /projects/[slug] detail pages
- ProjectCard.astro
- Featured projects on the homepage
- Astro <Image /> for all images

Critical: the projects index must look INTENTIONAL with exactly two
entries. Not a grid with empty slots. Design for two, scale to ten.

My first project writeup is at [path] — use it as the real content.

Test and show me: create a throwaway third markdown file and confirm
the page appears with no other edits. Then delete it.

Also test a 90-character title and show me it doesn't break the layout.
```

---

## Phase 5 — Resume and About

```
Phase 5 from docs/06-build-phases.md. Read docs/05-content-and-copy.md §4.

- src/data/resume.ts — typed structured object. My content is at [path].
- /resume — HTML page rendering that data, mobile-readable
- Print stylesheet: Ctrl-P gives a clean one-pager, no nav, no footer,
  no printed URLs
- /about with the copy at [path] and my photo at [path]

For the PDF: set up the print stylesheet so I can export /resume to
a one-page PDF and save it to public/resume.pdf. Walk me through that
export step.

The HTML and the PDF must never disagree — resume.ts is the only
source of truth.
```

---

## Phase 6 — SEO, OG, accessibility, performance

```
Phase 6 from docs/06-build-phases.md. Read docs/03-system-design.md §6-9.

- Complete meta in BaseHead.astro: unique title (<60 chars) and
  description (140-160) per page, canonical, full OG set, Twitter card
- Generated OG images, 1200x630, using the site's type treatment
- JSON-LD Person schema on the homepage per §6
- @astrojs/sitemap, robots.txt
- public/_headers with the security headers in §9
- CSP via Astro's CSP API, not hand-maintained hashes
- noindex on preview deploys

Then a full accessibility pass and a performance pass against the
budget in §7.

Report: every page's Lighthouse scores, the securityheaders.com grade,
and any accessibility issue you found and whether you fixed it. Don't
round up or omit failures.
```

---

## Phase 7 — CI and launch

```
Phase 7 from docs/06-build-phases.md.

.github/workflows/ci.yml running on every PR:
- pnpm install (frozen lockfile)
- astro check
- pnpm build
- Lighthouse CI with a budget failing below 95 on any category
- a link checker failing on any dead link
- Node pinned to 22 to match .nvmrc

Actions minutes are unlimited on public repos, so cost isn't a concern
here — but keep the runs fast anyway.

Then rewrite README.md so it's actually worth reading: what the site
is, the stack and why, how to run it locally, how to add a project.

Then PROVE the CI works: open a PR that adds a deliberately huge
unoptimized image, show me Lighthouse CI failing it, and close the PR.
```

---

## Useful mid-session prompts

**When output looks generic:**
```
That's the [specific pattern] from docs/04-design-direction.md §1.N.
Don't just restyle it — restructure it. What does this content
actually need to communicate, and what's the right shape for that?
```

**When you don't understand what it built:**
```
Walk me through [file] line by line. I need to be able to maintain
this myself — if any part is only there because it's conventional,
say so and we'll cut it.
```

**When it over-engineers:**
```
This is a six-page static site. Delete the abstraction and inline it.
Tell me what you removed.
```

**Before merging any phase:**
```
Show me: total JS shipped, total page weight, every third-party
request, and the Lighthouse scores. Actual numbers from a real run,
not estimates.
```
