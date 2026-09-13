# 04 — Design Direction

This is the file you asked about. It has two halves: **the tells** (what makes a site look generated, and why) and **the tools** (what to use instead, and why each one).

> **Note for Claude Code:** this environment ships a `frontend-design` skill at `/mnt/skills/public/frontend-design/SKILL.md`. Read it before any visual work. This file extends it with project-specific constraints; where they overlap, both apply.

---

## 1. The tells

You can't avoid a look you can't name. Here's the taxonomy, roughly in order of how loudly each one announces itself.

### 1.1 Typography — the loudest tell by far

**Inter.** Inter is a very good typeface. That's not the problem. The problem is that it is the reflexive default of every generator, every starter template, and every "I'll fix fonts later" build. Inter set in Inter, at default weights, with no contrast between display and body, is the single most recognizable signature of a generated site. Same for Roboto, Open Sans, Helvetica, Arial, system-ui.

The subtler version of this trap: lists of "not-Inter" fonts get absorbed within a year. Geist, Manrope, Space Grotesk, and Poppins were the 2025 escape hatch and are now defaults in their own right. **Anything that appears on an "avoid the AI look" listicle is on its way to becoming the AI look.** The durable move is to pick from a real foundry catalog rather than from a trend list.

Other typographic tells:
- Accenting one word in a headline — one word in italic, or bold, or the accent color
- Tracked-out ALL-CAPS eyebrow labels above every heading
- A monospace face used decoratively for small data labels
- Labels built as `WORD — fragment` with a spaced em dash
- Metadata joined by middle dots: `A · B · C`
- A `→` appended to every link and button

### 1.2 Color

- Purple-to-blue gradient hero. The canonical tell.
- Tailwind's `slate`/`zinc` neutrals with an `indigo`/`violet` accent
- Pure `#000` or `#fff`. Real designers almost never use either.
- Tinted near-blacks standing in for black: `#0B0B0B`, `#111`
- Gradient text on the headline
- Glassmorphism: frosted translucent cards over a blurred gradient
- Dark mode as `#0a0a0a` with one glowing accent

There are also two newer clusters, which matter because they're what a model reaches for when told "don't do the purple gradient":
- **Warm cream (~`#F4F1EA`) + high-contrast serif display + terracotta accent (~`#D97757`).** That accent is Anthropic's own interaction color — on a brief handed to Claude it reads as an especially direct tell.
- **Near-black background + a single acid-green or vermilion accent.**

Both are legitimate for some briefs. Neither is a choice when it arrives by default.

### 1.3 Layout

- Centered hero, gradient headline, two buttons side by side
- Three or four identical rounded cards in a row
- The same `border-radius` on every element regardless of hierarchy
- The same soft grey shadow — `rgba(0,0,0,0.1)` — under everything
- Feature grid with an icon, a bold title, and two lines of grey text, ×3
- Perfect symmetry everywhere, everything centered
- Numbered markers `01 / 02 / 03` on content that isn't actually a sequence
- Emoji as section headers

### 1.4 Motion

- Fade-and-slide-up on every section as you scroll. The single most common animation in generated sites.
- Hover-lift with a shadow on every card
- Animated gradient backgrounds
- Typewriter effect on the hero
- Counting-up number animations

### 1.5 Copy — badly underrated as a tell

The words give it away faster than the pixels for anyone who reads.

- "Passionate about building scalable solutions"
- "Leveraging cutting-edge technologies"
- "Seamlessly integrating robust systems"
- "I'm a developer who loves to code"
- Three-word staccato fragments. For emphasis. Like this.
- Any sentence that would be equally true of ten thousand other people

---

## 2. Typography tools — highest leverage, do this first

Changing the typeface is one line of config and the largest visual improvement available for the effort. Do it before anything else.

### Free, high quality

| Tool | What it is | Why it's here |
|---|---|---|
| **[Fontshare](https://fontshare.com)** | Indian Type Foundry's free catalog | **The single best free source.** Professional-grade faces free for commercial use: Satoshi, General Sans, Switzer, Clash Display, Cabinet Grotesk, Chillax, Zodiak. These are foundry-quality, not hobbyist uploads, and they are not yet exhausted the way Google Fonts is. Start here. |
| **[Pangram Pangram](https://pangrampangram.com)** | Montreal foundry, free personal-use tier | Several genuinely excellent faces free for personal use (a portfolio qualifies). Read each license. |
| **[Google Fonts](https://fonts.google.com)** | The obvious one | Fine *if you pick from the deep end.* Instrument Serif, Fraunces, Newsreader, Bricolage Grotesque, Literata, Public Sans, Gabarito, Sometype Mono. Not Inter, not Roboto, not Poppins, not Montserrat. |
| **[Fontsource](https://fontsource.org)** | npm packages for open-source fonts | Self-hosting made trivial. Astro 6+'s built-in Fonts API mostly supersedes this, but useful as a fallback. |
| **[Velvetyne](https://velvetyne.fr)** | French libre type foundry | Weird, characterful, free. Good if you want something with a real point of view. |
| **[Collletttivo](https://collletttivo.it)** | Italian open-source type | Same idea, different flavor. |

### Paid — $30–80, the best money in this project

If you spend on one thing, spend it on a display face. A licensed typeface nobody else on the internship market is using does more for perceived quality than anything else you can buy.

| Foundry | Notes |
|---|---|
| **[Klim Type Foundry](https://klim.co.nz)** | Kris Sowersby. Tiempos, Söhne, Untitled Sans. Exceptional. Personal licenses are affordable. |
| **[Grilli Type](https://grillitype.com)** | Swiss. GT America, GT Sectra, GT Alpina. Free trial fonts available for testing. |
| **[OH no Type Co](https://ohnotype.co)** | Obviously Variable, Degular, Hobeaux. Distinctive and playful. |
| **[Displaay](https://displaay.net)** | Czech. Very sharp contemporary work. |
| **[Colophon](https://www.colophon-foundry.org)** | London. Reliable, well-crafted. |

### How to use them

**Pair two faces with real contrast.** One display face for headings, one workhorse sans for body. The contrast is what makes it look designed. The most reliable non-generic pairing: **a serif display + a clean grotesque body.** Almost no generated site does this, because generators default to one sans for everything.

Concrete starting pairs worth trying:
- Instrument Serif (display) + Switzer (body)
- Zodiak (display) + General Sans (body)
- Fraunces with optical sizing (display) + Public Sans (body)

**Set a real type scale.** Don't pick sizes by feel.
- **[Utopia.fyi](https://utopia.fyi)** — generates fluid type and space scales as `clamp()` values. You give it min/max viewport and min/max size; it outputs CSS custom properties that scale smoothly with no breakpoints. Use this. It takes ten minutes and it's why professional sites feel coherent at every width.
- **[Type Scale](https://typescale.com)** — simpler, for quickly comparing ratios.

**Details that read as considered:**
- Body text 16–18px minimum. Line-height 1.5–1.7 for sans, a bit more for serif.
- Line length under 75 characters. Use `max-width: 65ch`.
- Tighten letter-spacing on large headings (`-0.02em` to `-0.04em`); leave body alone.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs. Two lines of CSS, prevents orphans, almost nobody does it.
- Use real typographic characters: — – ' " …

---

## 3. Color tools

| Tool | What it is | Why it's here |
|---|---|---|
| **[Radix Colors](https://www.radix-ui.com/colors)** | 12-step accessible scales | Designed for interfaces, with steps that map to actual jobs (background, subtle bg, border, solid, text). Every step's contrast is predetermined, so you can't accidentally ship unreadable text. Not Tailwind's palette. |
| **[OKLCH Color Picker](https://oklch.com)** | Perceptually uniform color space | Lets you change lightness without the hue shifting, which is the thing that makes hand-built palettes look muddy. Modern CSS supports `oklch()` natively. |
| **[Open Color](https://yeun.github.io/open-color/)** | Open-source UI palette | Clean, restrained alternative to the Tailwind defaults. |
| **[Huemint](https://huemint.com)** | ML palette generator | Unlike most generators, it outputs brand-style palettes with defined roles rather than a row of swatches. Set it to "website" mode. |
| **[Leonardo](https://leonardocolor.io)** | Adobe's contrast-based tool | You specify required contrast ratios and it generates colors that satisfy them. Backwards from normal tools, in a good way. |
| **[Happy Hues](https://www.happyhues.co)** | Curated palettes shown in context | Shows each palette applied to a real layout, so you see how it behaves rather than guessing from swatches. |
| **[APCA Contrast Calculator](https://www.myndex.com/APCA/)** | Next-gen contrast model | More accurate than WCAG 2's ratio for real perception. Useful when a color passes 4.5:1 but still looks wrong. |

### Rules for this project

- **One accent color. Not a gradient.** A single confident accent reads as a decision; a gradient reads as an inability to choose.
- **Never `#000` or `#fff`.** Use a near-black with a hue cast (a warm `#1A1714`, a cool `#14161A`) and an off-white. And don't use `#0B0B0B` or `#111` either — those are their own tell.
- **Four to six colors total.** Background, surface, ink, muted ink, accent, border. That's enough.
- **Borders over shadows.** A 1px hairline in a low-contrast color looks considered; a soft drop shadow on every card looks generated.
- Define every one as a custom property in `tokens.css`. No hex values elsewhere in the codebase, ever.

---

## 4. Layout and inspiration

Study structure; never copy code. The goal is to build a vocabulary of what's possible so you're choosing rather than defaulting.

| Site | What it's good for |
|---|---|
| **[Godly](https://godly.website)** | Best-curated collection of genuinely good web design. Start here. |
| **[SiteInspire](https://www.siteinspire.com)** | Filterable by style, type, subject. Deep archive. |
| **[Minimal Gallery](https://minimal.gallery)** | For restraint specifically — the right reference for a portfolio. |
| **[Land-book](https://land-book.com)** | Landing pages, well-tagged. |
| **[One Page Love](https://onepagelove.com)** | Single-page sites — closest to your format. |
| **[Brutalist Websites](https://brutalistwebsites.com)** | If you want the opposite of polished. Coherent as a direction; bad as a random accent. |
| **[Awwwards](https://www.awwwards.com)** | Skew maximalist and slow — good for ideas, bad as a model for a portfolio. |

### Personal sites worth studying specifically

These are developers whose sites are distinctive without being overwrought — a much better reference class than agency work:

- **[rauno.me](https://rauno.me)** — interaction detail, restraint
- **[lynnandtonic.com](https://lynnandtonic.com)** — CSS craft, genuine personality, redesigned constantly
- **[thesephist.com](https://thesephist.com)** — dense, idiosyncratic, obviously hand-built
- **[maggieappleton.com](https://maggieappleton.com)** — illustration-led, warm
- **[joshwcomeau.com](https://www.joshwcomeau.com)** — interactive explanations done right
- **[piccalil.li](https://piccalil.li)** — Andy Bell; excellent CSS and a current Astro rebuild
- **[wattenberger.com](https://wattenberger.com)** — data visualization as the personality
- **[brittanychiang.com](https://brittanychiang.com)** — the canonical CS-undergrad portfolio. Study the *structure*; do not copy the look, it's been cloned thousands of times.

### Structural moves that break the generated pattern

- **Asymmetry.** Content off-center, or a wide/narrow two-column split instead of a centered column.
- **Vary the containers.** Not everything is a card. Some content is a list. Some is a table. Some is just a paragraph.
- **Vary vertical rhythm.** Generated pages give every section identical padding. Real ones breathe unevenly — tight where content is dense, generous where it needs air.
- **Let one element break the grid.** One image bleeding past the container edge, one oversized number. One. Not five.
- **Structure encodes information.** A divider means a topic change. A border means a boundary. If a line is there for decoration, delete it.

---

## 5. Everything else

### Icons
**[Phosphor](https://phosphoricons.com)**, **[Iconoir](https://iconoir.com)**, **[Remix Icon](https://remixicon.com)**, **[Tabler](https://tabler.io/icons)**. Not Lucide, not Heroicons — they're recognizable on sight.

Better: **use almost none.** Most portfolio icons are decoration occupying space where a thought should be. Your GitHub and LinkedIn links can be words.

### Motion
- **[Motion](https://motion.dev)** (formerly Framer Motion) — if you need JS animation. You probably don't.
- **CSS scroll-driven animations** — `animation-timeline: view()`. Native, no JS, broadly supported now.
- **View Transitions API** — Astro has built-in support. Page-to-page transitions with no framework.

**Rules:**
- One orchestrated moment beats scattered effects. A single considered page-load sequence lands; a fade-up on every section is the generic default.
- Motion that responds to a user action (opening, expanding, confirming) is welcome. Motion that happens at you is usually not.
- 150–250ms. Never linear easing — use `cubic-bezier(0.2, 0, 0, 1)` or similar.
- `prefers-reduced-motion: reduce` disables all of it. Non-negotiable.

### Texture and imagery
- **A real photo of you.** Not an avatar, not an illustration, not a 3D blob. A real photo does more for trust than any graphic treatment. Good light, plain background, ten minutes with a friend and a phone.
- **[Excalidraw](https://excalidraw.com)** — hand-drawn-style architecture diagrams. If you draw your project's system design, that diagram will be the most-looked-at thing on the page.
- **[rough.js](https://roughjs.com)** — hand-drawn rendering in code, if you want that as a motif.
- **SVG grain overlay** via `feTurbulence` — a subtle noise layer over flat color adds warmth for ~10 lines and zero requests. Keep it under 4% opacity.
- **No stock illustration.** Especially not the flat-people-with-no-faces style. It reads as a template instantly.
- **No AI-generated images.** Current generators produce artifacts people recognize immediately, and on a portfolio it's a direct contradiction of the message.

### CSS that signals hand-built
Most generated CSS doesn't use these, which is exactly why they work:

`clamp()` for fluid type · container queries · `:has()` · subgrid · `color-mix()` · `text-wrap: balance` / `pretty` · `@supports` · scroll-driven animations · `view-transition-name` · logical properties (`margin-inline`, `padding-block`) · `accent-color` · `::selection` styled to your palette

That last one is a five-second win almost nobody does: style your text selection color to match your accent.

---

## 6. The token spec — Claude Code fills this in Phase 2

Before writing any component, produce this and get sign-off:

```
COLOR (4–6 named hex/oklch values, with the role each one plays)
  --color-bg        ...  (not #fff, not #F4F1EA)
  --color-surface   ...
  --color-ink       ...  (not #000, not #111, not #0B0B0B)
  --color-ink-muted ...
  --color-accent    ...  (exactly one, no gradient)
  --color-rule      ...  (hairline borders)

TYPE
  --font-display    ...  which face, which foundry, why this one
  --font-body       ...  same
  scale:            fluid clamp() values from Utopia
  --leading-tight / --leading-normal / --leading-loose
  --tracking-tight (headings only)

SPACE
  fluid scale, Utopia-generated: 3xs → 3xl
  --measure: 65ch

SHAPE
  --radius-*        differentiated by hierarchy, NOT one value everywhere
  borders over shadows; if a shadow exists, justify it

LAYOUT
  one-sentence concept + ASCII wireframe for each page type
  alignment: left / centered / mixed — and why

PRINCIPLES
  3–5 sentences: what makes THIS site look like it belongs to
  a CS student who cares about systems and correctness, and not
  like a generic developer portfolio
```

**Then, before writing code:** review that plan and ask, honestly — *would I have produced roughly this for any developer portfolio?* If yes for any axis, revise that axis and say what changed and why. Only then start building.

---

## 7. The self-audit

Run these before launch. They catch different things.

1. **Squint test.** Blur your eyes or zoom to 20%. Is there a distinctive silhouette, or a stack of identical grey rectangles?
2. **Greyscale test.** DevTools → Rendering → Emulate vision deficiency → Achromatopsia. If the hierarchy collapses, you were using color to do typography's job.
3. **Anonymity test.** Cover your name. Could this be anyone's site? If yes, nothing on the page is specific to you.
4. **Font test.** Is the body text Inter, Roboto, Open Sans, Helvetica, or system-ui? Change it. Right now.
5. **Gradient count.** Should be zero.
6. **Card count.** More than two identical cards in a row? Ask whether that content is really a set of parallel things or whether you reached for a grid because it was easy.
7. **Copy test.** Read every sentence aloud. Would it be equally true of ten thousand other CS students? Delete or rewrite it.
8. **The Chanel test.** Before you leave the house, look in the mirror and remove one accessory. Find the one decorative element you're most attached to and cut it.
9. **Phone test.** Actually open it on your phone, outdoors, in sunlight. Not the DevTools emulator.
10. **Cold-read test.** Send it to someone who hasn't seen it and ask what you do and what you're looking for. If they can't answer in 30 seconds, the hierarchy is wrong regardless of how it looks.

---

## 8. Hard constraints for Claude Code

Copy these into `CLAUDE.md`. They are prohibitions, not preferences.

**Never, without an explicit instruction from Noah:**
- Inter, Roboto, Open Sans, Helvetica, Arial, or `system-ui` as the primary typeface
- Any gradient as a background or on text
- Tailwind default color names, or `#000`, `#fff`, `#0B0B0B`, `#111`
- shadcn/ui, or any component library
- Lucide or Heroicons
- Glassmorphism, frosted glass, backdrop-blur decoration
- More than two visually identical cards in a row
- Emoji as section headers or icons
- Fade-in-on-scroll applied to multiple sections
- `01 / 02 / 03` numbering on content that isn't a sequence
- Tracked-out ALL-CAPS eyebrow labels
- A `→` appended to link or button text
- Metadata joined by middle dots (`A · B · C`)
- Accenting one word in a headline with color, italic, or bold
- The same `border-radius` on every element
- `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` or similar on every card
- Stock illustration or AI-generated imagery
- "passionate", "leveraging", "cutting-edge", "seamless", "robust", "dive into", "elevate", "craft" (as a verb)
- Third-party scripts of any kind

**Always:**
- Read `/mnt/skills/public/frontend-design/SKILL.md` before visual work
- Propose the §6 token spec and wait for approval before writing components
- Every color and size from a custom property in `tokens.css`
- Visible keyboard focus on every interactive element
- `prefers-reduced-motion` respected
- Semantic HTML before ARIA
- Show the §7 audit results before declaring a phase done
