# 06 — Build Phases

Nine phases. Each is one Claude Code session. Each ends with a commit and a green build.

**Rules:**
- Don't start a phase until the previous one's acceptance criteria pass. Skipped criteria compound.
- Fresh Claude Code session per phase. Long sessions drift and lose the constraints.
- Phases 0–5 are the launch. Phases 6–7 are the polish. Phase 8 is optional forever.

| Phase | What | Time | Who |
|---|---|---|---|
| 0 | Accounts and decisions | 20 min | You |
| 1 | Skeleton + live deploy | 1 hr | Claude Code |
| 2 | Design system | 2 hr | Claude Code (with your review) |
| 3 | Homepage | 1.5 hr | Claude Code |
| 4 | Projects | 2 hr | Claude Code |
| 5 | Resume + About | 1.5 hr | Claude Code |
| 6 | SEO, OG, a11y, perf | 1.5 hr | Claude Code |
| 7 | CI + launch | 1 hr | Claude Code |
| 8 | Optional extras | — | Later |

Roughly two weekends, including the content writing that happens alongside.

---

## Phase 0 — Decisions and accounts

**You do this. Don't delegate it.**

- [ ] Read `01-brief.md` and `02-stack-decisions.md`. Change what you disagree with.
- [ ] Create the GitHub repo. Public. Named `personal-site` or similar.
- [ ] Create a free Cloudflare account. **No credit card needed** — the Workers free plan doesn't ask for one.
- [ ] Optional, 5 min: apply for the GitHub Student Developer Pack at `education.github.com/pack`. Free domain for a year, free JetBrains IDEs, GitHub Pro. Worth doing regardless of this project.
- [ ] Decide whether you want a domain now. If unsure: **no**. Launch on the free `*.workers.dev` URL and add one later in ten minutes.
- [ ] Install Node 22 and pnpm locally.
- [ ] Search-and-replace the placeholders across the `docs/` files.
- [ ] **Start writing resume content** (`05-content-and-copy.md` §4, step 1). This runs in the background through every later phase.

**Done when:** the repo exists, the Cloudflare account exists, and `node -v` shows 22.x.

**Cost so far: $0.** No card entered anywhere.

---

## Phase 1 — Skeleton and deploy pipeline

**Goal: an ugly page live on your real domain.** Before any design work.

This ordering matters. Most people design for a week and then discover deploy problems. Inverting it means every later phase is verified against production from the first commit.

**Deliverables:**
- Astro 7 project, TypeScript strict
- Static output, `wrangler.jsonc` serving static assets only. No `@astrojs/cloudflare` adapter: Astro's Cloudflare guide says it is only needed for on-demand rendering
- `Base.astro` layout, `BaseHead.astro` with minimal meta
- `index.astro` containing only your name in unstyled HTML
- `404.astro`
- `.gitignore`, `.nvmrc`, `README.md`
- `CLAUDE.md` copied to repo root
- `docs/` committed
- Cloudflare Worker connected to the GitHub repo, auto-deploy on push to `main`
- Live on the free `*.workers.dev` URL (custom domain optional, later)

**Acceptance:**
- [ ] The `*.workers.dev` URL loads and shows your name
- [ ] `http://` redirects to `https://`
- [ ] Push to `main` triggers a deploy that goes live within ~2 minutes
- [ ] A PR produces a preview URL
- [ ] `pnpm dev` works locally
- [ ] `pnpm build` completes with zero warnings

**Do not** style anything in this phase. Unstyled is the point.

---

## Phase 2 — Design system

The phase that decides whether this looks generated. Budget real time.

**Deliverables:**
- Typeface selection — two faces, named, with a stated reason for each
- The full token spec from `04-design-direction.md` §6, approved by you before any code
- `tokens.css` — every color, size, space, and radius as a custom property
- `reset.css`, `base.css`, `utilities.css` (under 20 utility classes)
- Fonts self-hosted via Astro's Fonts API, woff2, subsetted, preloaded
- `Header.astro` and `Footer.astro`
- A `/styleguide` page rendering every token and element — headings h1–h4, body, links, lists, code, blockquote, buttons, the palette

**Acceptance:**
- [ ] The body typeface is not Inter, Roboto, Open Sans, Helvetica, Arial, or system-ui
- [ ] Display and body faces have obvious contrast
- [ ] Zero gradients anywhere
- [ ] No `#000` or `#fff`; no `#111` or `#0B0B0B`
- [ ] Exactly one accent color
- [ ] Type scale is fluid `clamp()` values, not fixed breakpoints
- [ ] No hex value appears outside `tokens.css`
- [ ] All fonts self-hosted; zero third-party requests in the network tab
- [ ] Every text/background pair ≥ 4.5:1
- [ ] `/styleguide` renders correctly at 320px and at 1920px
- [ ] Claude Code ran the §7 audit and reported results

**Your job here:** actually look at it and push back. If your reaction is "that's fine," it's probably generic — "fine" is what average looks like. Ask for two more directions before committing.

**Note:** `/styleguide` stays in the repo but gets `noindex`. It's how you check future changes didn't break the system.

---

## Phase 3 — Homepage

**Deliverables:**
- Homepage per `05-content-and-copy.md` §2, with **your real content** — no lorem ipsum
- Name, one-sentence intro, and all four links visible without scrolling on a 375×667 phone
- "What I'm working on now" section
- Responsive 320px → 1920px
- Zero JavaScript shipped

**Acceptance:**
- [ ] Name, intro, resume link, GitHub link all above the fold at 375×667
- [ ] Readable at 320px with no horizontal scroll
- [ ] Zero JS in the network tab
- [ ] Keyboard tab order is logical, focus always visible
- [ ] No lorem ipsum, no placeholder text
- [ ] Lighthouse ≥ 95 across all four
- [ ] Passes the anonymity test — covering your name, it could not be anyone's site

---

## Phase 4 — Projects

**Deliverables:**
- `src/content.config.ts` with a Zod schema: `title`, `summary`, `date`, `tech[]`, `repo`, `demo?`, `featured`
- `src/content/projects/` with at least one real writeup using the §3 template
- `/projects` index
- `/projects/[slug]` detail pages
- `ProjectCard.astro`
- Featured projects surfaced on the homepage
- Images via Astro's `<Image />`

**Acceptance:**
- [ ] Adding a `.md` file to `src/content/projects/` makes a new page appear with **no other file edits**. Test this by actually doing it.
- [ ] A malformed frontmatter field fails the build with a clear message
- [ ] `/projects` looks intentional with exactly two entries — no empty grid cells, no filler
- [ ] Every project page has a working repo link
- [ ] Images have explicit dimensions; CLS is 0
- [ ] Long project titles don't break the layout (test with a 90-character title)

**Criterion 1 is the one that determines whether this site is still current in a year.** Verify it properly.

---

## Phase 5 — Resume and About

**Deliverables:**
- `src/data/resume.ts` — typed structured data
- `/resume` — HTML, crawlable, mobile-readable
- `/resume.pdf` in `public/`
- Print stylesheet so the HTML page prints as a clean one-pager
- `/about` with your real photo

**Acceptance:**
- [ ] `/resume.pdf` returns 200 and the PDF is one page
- [ ] `/resume` is readable on a phone without zooming
- [ ] Ctrl-P on `/resume` produces a clean page with no nav, no footer, no URLs printed
- [ ] Resume links from the header on every page
- [ ] HTML and PDF contents agree
- [ ] The about photo is optimized, under 100KB, with dimensions set

---

## Phase 6 — SEO, OG images, accessibility, performance

**Deliverables:**
- Complete meta in `BaseHead.astro`: title, description, canonical, full OG set, Twitter card
- Generated OG images per page, 1200×630
- JSON-LD `Person` schema on the homepage
- `sitemap-index.xml` via `@astrojs/sitemap`
- `robots.txt`
- `public/_headers` with the security header set from `03-system-design.md` §9
- CSP via Astro's CSP API
- Accessibility pass
- Performance pass against the budget

**Acceptance:**
- [ ] Every page has a unique title under 60 chars and a unique description of 140–160
- [ ] Paste the URL into Slack, Discord, and LinkedIn — a proper card renders on all three
- [ ] Google's Rich Results Test validates the Person schema
- [ ] `securityheaders.com` grades A or better
- [ ] Full keyboard pass: every page, no traps, focus always visible
- [ ] Tested once with a screen reader
- [ ] `prefers-reduced-motion` disables all motion
- [ ] Lighthouse ≥ 95 on all four, on every page
- [ ] LCP < 1.5s on the 4G profile


---

## Phase 7 — CI and launch

**Deliverables:**
- `.github/workflows/ci.yml`: `astro check`, build, Lighthouse CI with budget, link checker
- Branch protection on `main` requiring the check to pass
- Repo README worth reading
- Google Search Console verified, sitemap submitted
- Site linked from GitHub profile and LinkedIn

**Acceptance:**
- [ ] A PR that drops Lighthouse below 95 fails CI. Test it by deliberately adding a huge unoptimized image.
- [ ] A PR with a dead link fails CI
- [ ] The README explains what the site is, the stack, and how to run it
- [ ] Search Console shows the sitemap accepted
- [ ] Every external link works
- [ ] The site URL appears on your GitHub profile and LinkedIn

**Then stop and ship it.** The site being live and imperfect beats it being perfect and unlaunched. Go write project #2.

---

## Phase 8 — Optional, later

Only after the site has been live for a month and you've applied to things.

- `/writing` — but only once three posts exist as drafts
- Pagefind search — only past ~15 posts
- Contact form — Cloudflare Worker + Turnstile + Resend, all free tier
- Dark/light toggle
- One interactive React island: an algorithm visualizer. Highest-value item in this list — it demonstrates React *and* judgment about when to reach for it.
- View Transitions between pages
- RSS feed

---

## Maintenance

Recurring, 15 minutes:
- **Monthly:** update "what I'm working on now"
- **Per project finished:** write it up the same week, while you still remember what broke
- **Quarterly:** Lighthouse run, click every link, confirm the resume PDF is current
- **Each semester:** update coursework and graduation date

The "now" section is the one that matters. A site with a current "now" reads as a person who's building. A site with a stale one reads as abandoned, and that's worse than not having a site.
