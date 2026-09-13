# 02 — Stack Decisions

Each decision below is: **choice → why → what I rejected → when to revisit.** If you disagree with one, change it here first, then tell Claude Code — don't let the code and the spec drift apart.

---

## D1. Framework — Astro 7

**Why:**

1. **Ships zero JavaScript by default.** Astro renders to HTML at build time and sends no JS bundle unless you explicitly opt a component in. For a site that is 95% text and images, this is exactly right. A Next.js portfolio ships ~90KB of JS to render text that never changes.
2. **`.astro` files are HTML with a TypeScript block on top.** Given that you're coming from C++/algorithms rather than React, this is a much shorter ramp than JSX + hooks + hydration + server components. You'll be able to read every line of your own site.
3. **Content collections solve exactly your problem.** You define a schema in Zod, drop Markdown files in a folder, and get type-checked frontmatter with autocomplete. This is what makes "adding a project = one Markdown file" actually true instead of aspirational.
4. **Cloudflare acquired the Astro team in January 2026.** Astro stayed open source and MIT-licensed, but Astro and Cloudflare Workers are now first-party siblings. The adapter, the docs, and the local dev story are all better-supported than any other framework/host pairing available to you for free.
5. **Astro 6 added a built-in Fonts API and CSP API.** Both matter here: the Fonts API self-hosts and subsets your typefaces with one config block (see D10, and `04-design-direction.md` — typography is the highest-leverage anti-AI lever), and the CSP API generates Content-Security-Policy hashes automatically instead of you hand-maintaining them.
6. **It reads as taste.** Every AI-built portfolio is Next.js. Choosing the right tool for a content site — and being able to explain why in an interview — is a small but real signal.

**Version:** Astro 7.3.x is current as of September 2026. Requires Node 22+. Pin the major in `package.json`.

**Rejected:**

| Alternative | Why not |
|---|---|
| **Next.js** | Overkill. You'd use ~5% of it. Ships a React runtime for static text. Also: "Next.js + Tailwind + shadcn + Framer Motion" *is* the visual signature you're explicitly trying to avoid — see `04-design-direction.md`. |
| **Plain HTML/CSS** | Genuinely fine, and I nearly recommended it. Rejected because by project #4 you're hand-copying the same `<head>` block into every file, and one day you'll update your meta tags in six places and miss one. Content collections are worth the dependency. |
| **SvelteKit / Nuxt** | Fine tools, no advantage here, and neither has the Cloudflare-first-party relationship. |
| **Hugo / Eleventy / Jekyll** | Hugo is faster and dependency-free, and is a legitimate pick. Rejected on ecosystem: Astro has far more current documentation and examples for Claude Code to work from, and a smaller chance of it hallucinating template syntax. |

**Revisit if:** you want the site itself to demonstrate React proficiency for a specific role. Then either switch to Next.js, or — better — keep Astro and build one genuinely interactive React island (a live algorithm visualizer, say). That demonstrates React *and* judgment about when to use it.

---

## D2. Language — TypeScript, `strict: true`

**Why:** Astro ships with it configured. Zero setup cost. Catches typos in frontmatter field names at build time instead of you discovering a blank page after deploy. The type-safety habit transfers to work you'll actually get paid for.

**Rejected:** Plain JS — no reason to give up free type checking.

---

## D3. Styling — Vanilla CSS with custom properties

This is the most important decision in this file. Read `04-design-direction.md` alongside it.

**Why:**

1. **Tailwind's defaults are the AI look.** `slate-900` background, `indigo-500` accent, `rounded-xl`, `shadow-lg`, Inter. Every model reaches for the same tokens because they dominate the training data. You can override all of it — but if you're overriding every default, the framework is no longer buying you anything.
2. **Your site is ~6 pages.** The scale at which Tailwind's tradeoff (verbose markup in exchange for no naming and no dead CSS) pays off is a large app with many contributors. At six pages, hand-written CSS is smaller, faster to read, and easier to make distinctive.
3. **CSS custom properties give you a real token system.** `--color-ink`, `--space-m`, `--font-display` — defined once in `tokens.css`, used everywhere. That's the design-system benefit without the framework.
4. **Modern CSS is very good now.** `clamp()` for fluid type, container queries, `:has()`, subgrid, `color-mix()`, `text-wrap: balance`. Most generated CSS doesn't use these, so using them well is itself a differentiator.
5. **You'll learn actual CSS**, which is a durable skill, rather than one framework's class names.

**Architecture:**
```
src/styles/
  tokens.css      ← all custom properties. The single source of truth.
  reset.css       ← modern reset (Andy Bell's, or hand-rolled)
  base.css        ← element defaults: body, headings, links, lists
  utilities.css   ← a small set. Under 20 classes. Resist growth.
```
Component-specific styles go in `<style>` blocks inside the `.astro` component — Astro scopes them automatically, so no naming collisions and no BEM.

**Rejected:**

| Alternative | Why not |
|---|---|
| **Tailwind (default config)** | The look you're trying to avoid. |
| **Tailwind (fully custom theme)** | Defensible. If you take this route you must replace the *entire* palette, `fontFamily`, `borderRadius`, and spacing scale — not extend them. If any `slate-*` or `indigo-*` class survives into production, you've defeated the point. More discipline than vanilla CSS requires. |
| **shadcn/ui** | Genuinely excellent for apps. For a portfolio it's the single most recognizable "vibe-coded" signature there is. Hard no. |
| **CSS-in-JS** | Needs a JS runtime. Contradicts D1. |
| **Open Props** | Actually a good option — unopinionated CSS custom properties, no visual defaults. Not the base recommendation only because at six pages you can write 40 tokens yourself in an hour. Use it if you'd rather not. |

---

## D4. Content layer — Astro content collections (Markdown + Zod)

**Why:** Your projects live as `src/content/projects/*.md`. A Zod schema in `src/content.config.ts` defines the required frontmatter — title, summary, date, tech, repo URL, live URL, featured flag. Astro validates it at build. Misspell `technologies` as `techologies` and the build fails with a clear message instead of silently rendering nothing.

Two properties worth naming explicitly:
- **Your content is plain Markdown in git.** No vendor holds it. If you abandon Astro in 2029, your writing comes with you unchanged. Portability is worth designing for.
- **Content and presentation are separate.** Redesign the whole site without touching a single project writeup.

**Rejected:** A headless CMS (Contentful, Sanity) — external dependency, free tier that can change under you, and a login you'll forget. Hardcoded HTML — see D1.

---

## D5. Hosting — Cloudflare Workers with static assets

**$0. No credit card. No expiry.** The free Workers plan requires no card, and static assets — HTML, CSS, JS, images, fonts — are served free with **no usage limits** on both the free and paid plans. Your site is 100% static assets. There is no meter to trip.

The separate 100,000 requests/day free allowance applies to *Worker invocations* (server-side code). You have none. It will never apply to you.

**Why Workers:**

1. **Genuinely the best free host available to you.** ~300 edge locations, near-zero cold start, free TLS, free HTTP/3, free DDoS protection.
2. **Full control over response headers** via a `_headers` file. This is what lets you get an A on `securityheaders.com` — GitHub Pages can't do it at all.
3. **No commercial-use clause**, no bandwidth cap, no pause-on-limit.
4. **The same runtime if the site grows.** Want a contact-form endpoint or a small API later? Add a `fetch` handler and a binding — same deployment, no re-platforming.
5. **First-party with Astro** since Cloudflare acquired the Astro team in January 2026. The adapter, the docs, and the local dev story are all better-maintained than any other free framework/host pairing.

**One note in case you read older guides: Cloudflare Pages is in maintenance mode.** Workers gained static-asset serving, and Cloudflare's own guidance is now to start new projects on Workers. Pages still works and existing projects keep running, but all new investment — observability, gradual deployments, Tail Workers, the Vite plugin, remote dev — goes to Workers. Anything telling you to "use Cloudflare Pages for static sites" describes the previous product generation.

**Rejected:**

| Alternative | Why not |
|---|---|
| **GitHub Pages** | Also free and entirely respectable — the one genuine reason to prefer it is the free URL (see D6). Rejected as primary because it can't set custom response headers, is static-only with no growth path, and has a slower edge. Keep it in your back pocket. |
| **Vercel Hobby** | Best-in-class DX, and a personal portfolio is an allowed use. But Hobby is restricted to *personal, non-commercial* use, caps Fast Data Transfer at 100GB/mo with a separate and much lower 10GB Fast Origin Transfer cap that image-heavy sites hit first, allows one concurrent build, keeps runtime logs one hour, and has **no overage billing — features pause until the next 30-day period.** You'd never hit these. But you'd be accepting a policy constraint for DX you don't need on a static site. |
| **Netlify** | Fine. Similar free tier. No reason to prefer it. |
| **A VPS** | You'd be patching a server instead of applying to jobs. |

### The switch is cheap, deliberately

Astro's static output is just a `dist/` folder. Moving between Cloudflare Workers, GitHub Pages, Netlify, or anything else is one adapter line, one deploy workflow, and a DNS repoint if you have a domain. **Under an hour.** This decision isn't load-bearing.

---

## D6. Your URL — three options, all starting at $0

Hosting is free either way. The only open question is what the site's address is.

### Option A — `*.workers.dev`, $0 forever

Cloudflare gives every account a free `workers.dev` subdomain. Works immediately, HTTPS included, nothing to configure.

**The honest downside:** it's long, and it reads as a scratch deploy rather than a personal site. On a resume it's the weakest of the three. Fine for launching this weekend; worth replacing before you're applying in volume.

### Option B — free domain via the GitHub Student Developer Pack, $0 for a year

**This is what I'd do.** You're a student, so you qualify, and it gets you the best host *and* a real URL for nothing:

- **Name.com** — one free domain for a year across 25+ extensions including `.dev`, `.app`, `.live`, `.software`
- **Namecheap** — a free `.me` plus an SSL cert for a year. Historically limited to schools in the US, UK, Canada, and Australia, and needs your school email set as your **primary** GitHub email.
- **.tech** — one free `.tech` for a year

Apply at `education.github.com/pack` with a school email or a photo of your student ID. Point it at Cloudflare and you're done.

**The catch, and it's real:** free for year one, then it renews at that TLD's normal rate — often *above* `.com`. A `.me` renews near $20/yr; `.tech` can be near $50/yr. Run the four-year math:

| | Year 1 | Years 2–4 | 4-year total |
|---|---|---|---|
| `*.workers.dev` | $0 | $0 | **$0** |
| Student `.me` | $0 | ~$20/yr | ~$60 |
| Bought `.com` | ~$11 | ~$11/yr | ~$44 |

A `.com` you pay for is **cheaper over four years** than the "free" `.me`. If you take a student domain, either commit to the renewal or plan to let it lapse and redirect — and never let one lapse while it's printed on applications in flight.

While you're in the pack, also grab GitHub Pro, the JetBrains IDEs, and the Frontend Masters access. Worth more than the domain.

### Option C — buy `firstnamelastname.com`, ~$11/yr

**Cloudflare Registrar** sells at wholesale cost with no markup, no cheap-first-year trick, and free WHOIS privacy. **Porkbun** is priced similarly. Avoid `.io` (expensive, uncertain future) and free TLDs like `.tk` (read as spam).

### Recommendation

**Start with Option A and launch this weekend.** Adding a domain to a Cloudflare Worker later takes about ten minutes and needs no rebuild. Then apply for the Student Pack and take Option B when it comes through.

Do not let the URL question delay launch. A live site at an ugly URL beats a perfect plan for a pretty one.

**Whichever you pick:** choose one canonical host and 301 the other (`www` → apex, or the reverse), consistently. Mixing them splits your Google ranking for your own name.

---

## D7. Analytics — Cloudflare Web Analytics

**Why:** Free, and you already have the account. No cookies, no localStorage, no fingerprinting — so **no consent banner**, no GDPR obligation, and no modal covering your hero on first load.

You'll learn: pageviews, referrers, countries, top pages. That's all you need. The useful question is "did the recruiter from that application actually visit," and referrer data answers it.

**Alternative if you'd rather not depend on your host for it:** GoatCounter's free hosted tier for personal sites — sub-1KB script, same privacy properties, open source so you can self-host if it ever goes away.

**Also fine: nothing at all.** Analytics on a portfolio is mildly interesting, not useful. Skipping it means zero third-party requests, which makes the performance budget trivially easy. Nothing else in the plan depends on it.

**Rejected:** Google Analytics — needs a consent banner, adds ~45KB, slows the page, and hands visitor data to an ad company for a site with no ads. Plausible and Fathom — excellent, but ~$9/mo for something you can have free.

---

## D8. Contact — mailto + social links. **No form in v1.**

**Why:** A form needs a backend, spam protection, and delivery infrastructure, and its failure mode is silent — you never find out the message didn't arrive. A recruiter who wants to reach you will use email or LinkedIn regardless.

Put your email in plain text and accept some scraping — or use a light obfuscation (assemble it from parts in a tiny inline script, with a `<noscript>` fallback showing `name [at] domain [dot] com`). Don't use an image of your email; it can't be copied and screen readers can't read it.

**If you insist on a form later:** Cloudflare Worker + Turnstile (their free, no-puzzle CAPTCHA) + Resend for delivery. Same platform, same deployment, ~40 lines, still $0. Deferred to Phase 8.

---

## D9. Search — Pagefind, and only if you add a blog

**Why:** Pagefind indexes your built HTML after the build and ships ~10KB of runtime. No server, no service, no API key. It's the default for static Astro sites.

**Don't add it for six pages.** Ctrl-F works. Add it if `/writing` passes ~15 posts.

---

## D10. Fonts — self-hosted via Astro's Fonts API

**Why:** Never link Google Fonts' CDN. It adds a DNS lookup plus a TLS handshake to a third-party origin on the critical path, creates a GDPR question, and you're one CDN outage from your site rendering in Times New Roman.

Astro 6+ has a built-in Fonts API: declare the families in `astro.config.mjs` and it downloads, subsets, and self-hosts them, emitting the right `@font-face` rules and preload hints. Use `font-display: swap`, `woff2` only, and preload only the one or two faces used above the fold.

**Which typefaces:** see `04-design-direction.md` §2. That choice is a design decision, not an infrastructure one, and it's the highest-leverage single change you can make.

---

## D11. Icons — Phosphor or Iconoir, inlined as SVG

**Why:** Lucide and Heroicons are the defaults every generator reaches for; a Lucide icon set is a recognizable tell on sight. Phosphor and Iconoir are equally good, equally free, and not yet exhausted.

Inline the handful of SVGs you actually use directly in your components. Don't install an icon library to use four icons.

**Better still:** use almost no icons. Most portfolio icon usage is decoration filling space where a real thought should go.

---

## D12. CI — GitHub Actions

**Why:** Cloudflare already builds and deploys on push. Actions adds the checks Cloudflare won't run:

- `astro check` — TypeScript and template errors
- **Lighthouse CI with a budget** — fails the PR if performance drops below 95. This is the mechanism that stops slow decay; without it your score erodes one convenience at a time.
- **Link checker** — dead links on a portfolio are embarrassing and invisible to you.
- Optional: `pa11y-ci` for accessibility regressions

This is modest but real engineering practice on a personal project, and a hiring engineer who opens your `.github/workflows/` will notice.

---

## D13. Package manager — pnpm · Node 22 LTS

pnpm: faster, disk-efficient, strict about phantom dependencies. Node 22 because Astro 6+ requires it. Pin the version in `.nvmrc` and in the Actions workflow so local and CI can't diverge.

---

## D14. Repo — public on GitHub

**Why:** The repo is a work sample, and for many hiring engineers it's a more informative one than the rendered site. Public means: a real README, meaningful commit messages, a sane branch structure, no committed secrets.

**Do not commit:** API keys, your phone number if you don't want it public, `.env` files. Add a `.gitignore` in the first commit, not the fifth.

**Commit messages:** conventional-ish (`feat:`, `fix:`, `docs:`). Someone will read them. "update" ×40 is a bad look, and it costs nothing to avoid.

---

## Cost summary

| Item | Cost |
|---|---|
| Cloudflare Workers hosting | $0 |
| Static asset serving (unlimited) | $0 |
| TLS certificate, HTTP/3, DDoS protection | $0 |
| `*.workers.dev` URL | $0 |
| Cloudflare Web Analytics | $0 |
| GitHub repo + Actions (public repo) | $0 |
| Fonts (Fontshare, free commercial licence) | $0 |
| Every tool in `04-design-direction.md` marked free | $0 |
| **Total** | **$0** |

**Optional, never required:**

| Item | Cost | Worth it? |
|---|---|---|
| Domain name | $0–11/yr (see D6) | Nice to have. Free for a year via the Student Pack. Not required — launch without one. |
| Paid display typeface | $30–80 once | The highest-impact optional spend if you ever want one. The free Fontshare faces are good enough that you are not compromising by skipping it. |

**Nothing in this plan requires a credit card at any point.**
