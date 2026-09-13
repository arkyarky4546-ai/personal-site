# 03 — System Design

## 1. Architecture

```
   you                    GitHub                  Cloudflare              visitor
    │                        │                         │                     │
    ├─ git push main ───────▶│                         │                     │
    │                        ├─ Actions: check, ──────▶│                     │
    │                        │  lighthouse, links      │                     │
    │                        │                         │                     │
    │                        ├─ webhook ──────────────▶│ build:              │
    │                        │                         │  pnpm build         │
    │                        │                         │  → dist/            │
    │                        │                         │                     │
    │                        │                         ├─ push to edge ─────▶│
    │                        │                         │  (~300 PoPs)        │
    │                        │                         │                     │
    │                        │                         │◀──── GET / ─────────┤
    │                        │                         ├───── HTML ─────────▶│
```

Everything is prebuilt HTML, CSS, fonts, and images. No server runs per request. No database. No API. The Worker's only job is serving files from the nearest edge location, and static asset requests are unmetered on the free plan.

**Why this shape:** the fastest request is the one that does no work. There is nothing to be slow, nothing to go down, nothing to patch, and nothing to pay for.

**PR previews:** every pull request gets its own URL. Open the preview on your phone before merging. This is how you catch the mobile bug that would otherwise ship.

---

## 2. Repo layout

```
personal-site/
├── CLAUDE.md                    ← instructions for Claude Code (provided)
├── README.md                    ← what this is, how to run it
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── wrangler.jsonc               ← Cloudflare Workers config
├── .nvmrc                       ← "22"
├── .gitignore
├── .github/workflows/ci.yml
├── docs/                        ← these planning files, committed
│   └── ...
├── public/                      ← copied verbatim, never processed
│   ├── resume.pdf               ← PERMANENT URL. Never move or rename.
│   ├── favicon.svg
│   ├── robots.txt
│   └── _headers                 ← security headers (see §9)
└── src/
    ├── content.config.ts        ← Zod schemas for collections
    ├── content/
    │   └── projects/
    │       ├── project-one.md
    │       └── project-two.md
    ├── data/
    │   └── resume.ts            ← structured resume → HTML page + PDF
    ├── components/
    │   ├── BaseHead.astro       ← ALL meta tags. One place.
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── ProjectCard.astro
    │   └── Prose.astro
    ├── layouts/
    │   ├── Base.astro
    │   └── Project.astro
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── resume.astro
    │   ├── 404.astro
    │   ├── og/[...route].ts     ← generated OG images
    │   └── projects/
    │       ├── index.astro
    │       └── [...slug].astro
    └── styles/
        ├── tokens.css
        ├── reset.css
        ├── base.css
        └── utilities.css
```

**Rules:**
- Every `<head>` tag lives in `BaseHead.astro`. Never write a meta tag anywhere else.
- `src/data/resume.ts` is the single source of truth for resume content. The HTML page and the PDF both derive from it. See `05-content-and-copy.md` §4.
- Commit `docs/` to the repo. Claude Code can then read the spec directly instead of you re-explaining it every session.

---

## 3. URL scheme

URLs are a public contract. Once a recruiter has the link in an email thread, it has to keep working.

| URL | Contents |
|---|---|
| `/` | Homepage |
| `/projects` | All projects |
| `/projects/<slug>` | One project — slug comes from the filename |
| `/about` | About |
| `/resume` | HTML resume |
| `/resume.pdf` | **PDF. Permanent. Never move.** |
| `/404` | Not found |
| `/sitemap-index.xml` | Generated |
| `/robots.txt` | Static |

**Rules:**
- Lowercase, hyphenated, no trailing slashes (or all trailing slashes — pick one, set `trailingSlash` in config, never mix).
- `/resume.pdf` is the URL you'll paste into applications hundreds of times. If you ever restructure, redirect the old path. Never 404 it.
- If you rename a project slug, add a redirect. Astro supports these in config.

---

## 4. Environments

| | Local | Preview | Production |
|---|---|---|---|
| Trigger | `pnpm dev` | Open a PR | Merge to `main` |
| URL | `localhost:4321` | `<version>-noah-kitayama.arkyarky4546.workers.dev` | `noah-kitayama.arkyarky4546.workers.dev` (or a custom domain later) |
| Analytics | off | off | on |
| Indexed by Google | — | **no** (`X-Robots-Tag: noindex`) | yes |

Set `noindex` on preview deployments. Otherwise Google indexes a half-finished draft under a random hostname and it competes with your real site.

`main` is always deployable. Work on branches.

---

## 5. URL and DNS

**Default for Phase 1: the free `*.workers.dev` subdomain.** Works the moment you deploy. No DNS, no domain, no waiting. Launch on this.

### Adding a domain later

Ten minutes, no rebuild, no migration — this is why it's safe to launch without one:

1. Register the domain (see `02-stack-decisions.md` D6 — free student options exist).
2. Add it to Cloudflare (automatic if registered at Cloudflare Registrar).
3. In the Workers dashboard, attach the custom domain to your Worker. TLS provisions automatically.
4. Pick a canonical host. Recommendation: apex (`{{DOMAIN}}`), with `www` 301-redirecting to it.
5. Verify: `https://` works, `http://` redirects to `https://`, and the non-canonical host redirects.

The `*.workers.dev` URL keeps working afterward, so any links you already sent out don't break.

### Email

You don't need email on this domain. Use your existing address. If you want `you@{{DOMAIN}}` later, Cloudflare Email Routing forwards to Gmail for free — forwarding only, not a mailbox, and replies come from your Gmail address unless you configure Gmail's "send as."

---

## 6. SEO

Small site, so the entire job is: be findable by name, and render correctly when the link is shared.

**Per-page meta — all in `BaseHead.astro`:**
```
<title>              unique per page, under 60 chars
<meta name="description">   unique per page, 140–160 chars
<link rel="canonical">      absolute URL, every page
og:title, og:description, og:image, og:url, og:type
twitter:card = summary_large_image
```

**Open Graph images — do not skip this.** When you paste your link into LinkedIn, a Slack channel, or a Discord server, a card renders. With no `og:image` it renders as a bare gray box, which reads as unfinished. Generate them at build time via `@astrojs/og` or `satori` — a template with your name, the page title, and your type treatment. 1200×630px.

**JSON-LD `Person` schema on the homepage.** This is what tells Google that this site is *about* the person named Noah Kitayama, which is what gets you the name search:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Noah Kitayama",
  "url": "https://noah-kitayama.arkyarky4546.workers.dev",
  "sameAs": [
    "https://github.com/arkyarky4546-ai",
    "https://linkedin.com/in/..."
  ],
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "..." },
  "knowsAbout": ["...", "..."]
}
```

**Also:**
- `@astrojs/sitemap` for `sitemap-index.xml`
- `robots.txt` allowing everything, pointing at the sitemap
- Submit to Google Search Console after launch. Takes five minutes and it's the only way to know if you're actually indexed.
- Link to the site from your GitHub profile and LinkedIn. Those are high-authority backlinks and they're free.
- One `<h1>` per page, containing real words.

---

## 7. Performance budget

Enforced by Lighthouse CI in the PR check, so violations fail before merge rather than after.

| Metric | Budget |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| LCP | < 1.5s on 4G |
| CLS | 0 |
| Total JS shipped | < 20KB (target: 0 on most pages) |
| Total page weight, homepage | < 400KB |
| Web fonts loaded | ≤ 2 files |

**How you actually hit these:**
- Astro's `<Image />` for every image. Emits AVIF/WebP with fallbacks, sets `width`/`height` automatically — that last part is what makes CLS zero.
- `loading="lazy"` below the fold, `loading="eager"` + `fetchpriority="high"` for anything in the LCP element.
- `woff2` fonts only, subsetted, preloaded, `font-display: swap`.
- No JS unless a component genuinely needs interactivity. Astro islands are opt-in — keep them that way.
- No third-party scripts. Zero. Not a chat widget, not a font CDN.

---

## 8. Accessibility floor

Non-negotiable. Also: some large employers do check, and it's a cheap competence signal.

- Semantic HTML: `<header> <nav> <main> <article> <footer>`. Not `<div>` with ARIA roles patched on.
- Every interactive element reachable by keyboard, in a sensible order, with a **visible focus ring**. Never `outline: none` without a replacement.
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text. Check with a real tool, not by eye.
- Alt text on every meaningful image. `alt=""` on decorative ones.
- `prefers-reduced-motion: reduce` honored — disable transforms and transitions inside it.
- Don't disable zoom. No `user-scalable=no`.
- Link text that means something out of context. Not "click here." Not a bare "→".
- `<html lang="en">`.

**Test:** unplug your mouse and use the site. Then run it through VoiceOver or NVDA once. Twenty minutes, and it finds things Lighthouse doesn't.

---

## 9. Security headers

Workers supports a `_headers` file, so you get the full set. Put this in `public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-ancestors 'none'
```

Use Astro 6+'s CSP API to generate script and style hashes rather than maintaining `'unsafe-inline'` by hand.

Verify at `securityheaders.com` after launch. Aim for A or A+. Ten minutes, and it's a reasonable thing to have done — this is one of the concrete advantages Workers has over GitHub Pages, which can't set response headers at all.

---

## 10. Error pages

`src/pages/404.astro` — real page, in the site's design, with navigation back to `/` and `/projects`. The default Cloudflare 404 is a blank white page that looks like your site is broken.

---

## 11. Observability

You need almost none. But:
- Cloudflare Web Analytics for traffic
- Cloudflare's Workers dashboard for deploy history and rollback — one click reverts to any previous deploy
- GitHub Actions notifications for failed builds
- A calendar reminder every 3 months: run Lighthouse, click every link, check the resume PDF is current

---

## 12. Portability

Worth designing for deliberately, because you'll have this site for a decade and you will not use Cloudflare and Astro that entire time.

- Content is Markdown in git. Portable to anything, forever.
- Resume content is a TypeScript object. Portable.
- The URL is yours (or free); hosting is a swap of one adapter line and one workflow file.
- No database, no proprietary format, no vendor API.

Migrating away is: run the same build somewhere else, repoint DNS if you have a domain. Under an hour. That's the property you want, and it's exactly why picking the free host first costs you nothing — the decision is reversible.
