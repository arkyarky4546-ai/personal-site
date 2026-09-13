# 01 — Project Brief

## What this is

A personal site for Noah Kitayama, CS undergrad, built to support internship and new-grad applications.

## The job the site has to do

When someone types `Noah Kitayama` into Google — a recruiter, a hiring engineer, a professor writing a rec letter, someone you met at a career fair — this site is the first result and it answers **"is this person worth 30 minutes of my time?"** in under a minute.

That's the whole job. Everything else is secondary.

## Three audiences, three time budgets

**1. Recruiter — 20 to 40 seconds, often on a phone**

Skimming. Wants: name, school, year, grad date, what kind of role you want, a resume link, and confirmation you're real. Leaves immediately if the page is slow, is hard to read on mobile, or makes them hunt for the resume.

Design implication: the top of the homepage must answer *who, what, when, where* without scrolling. The resume link must be visible without scrolling.

**2. Hiring engineer — 3 to 5 minutes, on a laptop**

Was told to "take a look." Wants: what did you actually build, did you build it or follow a tutorial, can you reason about tradeoffs. Will click through to GitHub and read your commit history and READMEs. Judges the site itself as a work sample.

Design implication: project pages need real technical depth — decisions, constraints, what broke. One project with genuine depth beats five with a screenshot and a sentence.

**3. You — over the next three years**

You have to keep this current while taking classes. If adding a project means editing five files and remembering how the layout works, you will stop doing it and the site will go stale.

Design implication: adding a project = create one Markdown file. That's the requirement. No exceptions.

## Scope

**In:**
- Homepage
- Projects: index + one page per project
- About
- Resume: a stable-URL PDF plus an HTML version
- 404 page
- Contact path (link, not a form — see `03-system-design.md`)

**Out — say no to these:**
- CMS or admin panel
- Login, accounts, database
- Dark/light toggle *in v1* (pick one mode and execute it well; add a toggle later if you want)
- Comments
- A blog, until you have three posts actually written. An empty `/blog` is worse than no `/blog`.
- Newsletter signup
- 3D hero, particle background, custom cursor, terminal emulator. All read as "spent time on the wrong thing."

## Constraints you're actually working under

**No resume yet.** Don't let this block the build. `05-content-and-copy.md` has the order of operations: build the resume *content* as structured data first, and the PDF and the HTML page both come from it. You are not blocked; you just start with content instead of code.

**Project list may be thin.** Normal for an undergrad. The plan handles this honestly:
- The projects section is built to look correct with **two** entries, not eight. No empty grid slots, no filler cards.
- Depth beats count. Two projects with real writeups outperform six stubs, every time.
- Coursework and algorithm practice can appear — but framed as what they are, not inflated into "projects." Honest framing reads as confidence. Inflation is obvious and costs you credibility instantly.

**You're a C++/algorithms person, not a web dev.** The stack in `02-stack-decisions.md` is chosen partly for this: Astro is mostly HTML and CSS with a small amount of TypeScript. You will be able to read and maintain every line. That matters more than picking whatever is trendy.

**Time.** Two weekends. The phases in `06-build-phases.md` are sized to that.

## Success criteria

Testable. Check these before you call it done.

| # | Criterion | How to check |
|---|---|---|
| 1 | Loads in under 1.5s on 4G | WebPageTest, mobile 4G profile |
| 2 | Lighthouse ≥ 95 on all four categories | `npx lighthouse {{DOMAIN}} --view` |
| 3 | Zero layout shift | Lighthouse CLS = 0 |
| 4 | Fully usable with keyboard only | Tab through every page, no traps, focus always visible |
| 5 | Resume reachable in one click from any page | Manual check |
| 6 | Adding a project = one new Markdown file, no other edits | Actually do it and confirm |
| 7 | Link preview renders correctly when pasted in Slack/LinkedIn/Discord | Paste it and look |
| 8 | Ranks #1 for your full name | Google it two weeks after launch |
| 9 | Readable at 320px wide | DevTools, iPhone SE |
| 10 | Doesn't look generated | The audit in `04-design-direction.md` §7 |

## Anti-goals

Things that would mean this went wrong:

- It looks like every other AI-built portfolio
- You spent more time on the site than on the work it showcases
- You can't explain why any technical choice was made
- It's stale three months after launch
- A recruiter has to scroll to find your resume
