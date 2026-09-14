# Placeholders

Content that doesn't exist yet. Until Noah writes it, each item is a placeholder on the site.

**How it works.** In `.astro` files, missing text is wrapped in `<Placeholder>` (`src/components/Placeholder.astro`). It shows with a grey background and a dashed underline. When Cloudflare builds `main`, the build fails while any placeholder is left, so none can reach the live site. Local builds and PR previews still work.

**The rule, for every phase.** If content is missing and Noah doesn't have it yet, build with a placeholder and add a row here. Never write stand-in text that reads as real, and never invent entries to fill a resume or a project. When a placeholder is filled in, delete its row.

---

## On the site now

| What | File | Replace it with |
|---|---|---|
| Intro sentence | `src/pages/index.astro` | One sentence: your school, graduation year, what you build, the role you want. See `05-content-and-copy.md` §2. School and year are known (below). |
| Resume link | `src/pages/index.astro` | `<li><a href="/resume.pdf">Resume</a></li>`, once `public/resume.pdf` exists |
| "What I'm working on now" | `src/pages/index.astro` | Two or three lines on what you're building or studying |
| Month for "now" | `src/pages/index.astro` | `<time datetime="2026-09">September 2026</time>`, with the real month |

Phase 3 can't merge to `main` until this table is empty.

## Left out until ready

These aren't placeholders, so they don't block going live. Add them when they exist.

| What | Where it goes | Why it's out |
|---|---|---|
| LinkedIn | One line in `src/data/links.ts`, between GitHub and email | The profile isn't ready yet |

## Known so far

Supplied by Noah. Use these as written; don't add to them.

- Computer science major at Carnegie Mellon University, expected to graduate in 2030
- High school: TMI Episcopal
- Email: noahkitayama26@gmail.com
- GitHub: https://github.com/arkyarky4546-ai

---

## Phase 4: projects

Noah chose these four repos as the project cards. Each card links to its real repo. The writeups are placeholders until he writes them, using the template in `05-content-and-copy.md` §3.

| Card | Repo | What the repo shows | Still needed from Noah |
|---|---|---|---|
| Chordially | https://github.com/arkyarky4546-ai/HackCMU-Happy- | Upload printed violin sheet music; it rates each passage's difficulty from 0 to 10 and suggests how to practice it. Python and JavaScript. The repo was created in September 2026 and its name says HackCMU. | Whether it was a team project and what his part was, the summary, the writeup |
| This website | https://github.com/arkyarky4546-ai/personal-site | Astro 7, static, on Cloudflare Workers | The summary, the writeup |
| TMI robotics code | https://github.com/arkyarky4546-ai/TMI2026RoboticsCode | Java robot code built on the FTC SDK. The repo description calls it the TMI Robotics Team's code. | What he did on the team, the summary, the writeup |
| Matasano crypto | https://github.com/arkyarky4546-ai/MatasanoProblems | Python solutions to the Matasano crypto challenges. No README. | The summary, the writeup |

Left out: `SomeOpenGLStuff` is an empty repo, so its link would lead nowhere.

Card titles, one-sentence summaries and dates are Noah's to confirm. Until then they're placeholders too.

## Phase 5: resume and About

Noah chose to **wait for his real resume**, not to use a placeholder resume. The homepage Resume link stays a placeholder until `public/resume.pdf` exists.

Still needed: resume content (`05-content-and-copy.md` §4), a one-page `resume.pdf`, About page copy (§6), and a real photo.
