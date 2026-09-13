# 05 — Content and Copy

Content is the part that actually determines whether you get the interview. Design gets people to read; content makes them act.

**Write the content before you build the pages.** Real content shapes the layout. Layout built around lorem ipsum always has to be rebuilt, and building around placeholders is how you end up with a design that can only display three-word headings.

---

## 1. Site map

| Page | Purpose | Length |
|---|---|---|
| `/` | Answer who/what/why in 30 seconds. Route to everything else. | One screen + 2–3 sections |
| `/projects` | All projects, newest or best first | As many as you have |
| `/projects/<slug>` | One project, in depth | 400–800 words |
| `/about` | The longer version, in your voice | 300–500 words |
| `/resume` | HTML resume, crawlable | One page equivalent |
| `/resume.pdf` | The file people download | One page |

---

## 2. Homepage, in order

**Above the fold — no scrolling:**
1. Your name, set in the display face, as the largest thing on the page
2. One sentence: what you do and what you're looking for. Specific. `"CS undergrad at [school], graduating [month year]. I build [thing]. Looking for a [summer 2027 SWE internship]."`
3. Links: Resume · GitHub · LinkedIn · Email

That's it. Resist adding a tagline, a mission statement, or a hero image that pushes the links below the fold.

**Below:**
4. Two or three featured projects — real thumbnails, one sentence each, linked to the detail page
5. A short "what I'm working on now" — two or three lines, dated. This is the single highest-signal element on most personal sites: it proves the site is alive and the person is actively building. Update it monthly.
6. Footer: contact, links, and the year

**Deliberately absent:** a skills bar chart showing "JavaScript 85%" (meaningless, and everyone knows it), a hobbies section, a testimonials section (you don't have testimonials), an "I'm a passionate developer" paragraph.

---

## 3. Project case study template

This is the most important template in this document. A project page that follows it beats a screenshot and a tech-stack list every single time, because it's the only place on your site where a hiring engineer can see you *think*.

```markdown
---
title: "Short, concrete name"
summary: "One sentence someone could repeat to a colleague."
date: 2026-03-14
tech: ["C++", "..."]
repo: "https://github.com/arkyarky4546-ai/..."
demo: ""              # optional, omit if none
featured: true
---

## What it does
Two or three sentences. Plain language. A non-specialist should
understand what the thing is.

## Why I built it
The actual reason. "It was a class assignment" is a fine and
honest answer — say so, then say what you did beyond the spec.

## How it works
The interesting technical part. Data structures, algorithms,
architecture. Include a diagram if there's any structure worth
seeing (Excalidraw). This is the section engineers read.

## Decisions and tradeoffs
2–4 real choices you made and what you gave up for each.
"I used a hash set instead of sorting because lookups dominated
the workload — O(n) instead of O(n log n), at the cost of memory
proportional to the window size."
This section is the one that separates you from someone who
followed a tutorial.

## What broke
Something that went wrong and how you found it. Nothing on a
portfolio reads more credibly human than a debugging story.
"The sliding window was off by one on the shrink step and only
failed on inputs where the duplicate was the first character.
Found it by shrinking the failing case to four characters."

## What I'd do differently
One or two things. Shows you can evaluate your own work.

## Result
Anything measurable. Runtime, test count, input size handled,
users, a grade, a competition placement. If nothing is
measurable, say what you learned concretely — not "a lot."
```

**On thin project lists:** two projects written like this comfortably outperform six one-line entries. Build the projects index to look intentional with two. If you only have one, put it on the homepage and skip `/projects` until you have a second.

**On coursework:** you can absolutely include it, labeled honestly. `"Discrete Math — Rule 90/150 cellular automata, analyzed as linear maps over GF(2)"` is an interesting thing that most applicants can't write. What doesn't work is dressing a problem set up as a product. The honest version is more impressive than the inflated one, and inflation is always visible.

---

## 4. The resume problem

You don't have one. Here's the order that unblocks everything.

**Step 1 — write the content, in a plain file, before touching design.** Not in Word. Just the facts:

```
Name, email, phone (optional), GitHub, LinkedIn, site
Education: school, degree, expected graduation, GPA (include if ≥ 3.5)
Relevant coursework: 4–6 courses, real ones
Experience: any job. Retail counts. Bullets about responsibility and outcomes.
Projects: 2–3, one to two bullets each, with a number in at least one
Skills: languages and tools you'd defend in an interview. No proficiency bars.
```

**Step 2 — bullets use the pattern: verb + what + result/number.**

- Weak: "Worked on a program that finds substrings"
- Strong: "Implemented a sliding-window substring search in C++, reducing worst case from O(n²) to O(n) and cutting runtime on 10⁶-character inputs from 4.2s to 0.03s"

The number is what makes it land. If you don't have one, go measure one — it takes ten minutes and it's the difference between a bullet that's skimmed and one that's read.

**Step 3 — structure it as `src/data/resume.ts`.** A typed object, not prose. Then:
- `/resume` renders it as an HTML page — crawlable by Google, linkable to a specific section, readable on a phone without pinch-zoom
- `/resume.pdf` is generated from the same data, or exported once from the HTML page via print CSS

**One source of truth.** The failure mode is having a Word file, a PDF, and a web page that disagree — and you will not remember which is current when a recruiter asks.

**Step 4 — one page. No exceptions at your stage.** If it's spilling, cut.

**Practical note:** get the PDF live at `/resume.pdf` early, even if it's rough. A rough resume at a stable URL is more useful than a perfect one you haven't published, because you can start applying and improve it in place.

---

## 5. Voice rules

**Write in first person.** "I built" not "Built" and not "Noah built." The clipped resume voice on a website reads as stiff.

**Be specific or say nothing.**
- Generic: "Experienced with data structures and algorithms"
- Specific: "Most comfortable with the sliding-window and binary-search families — I've worked through about 60 of them in C++"

**Banned words and phrases.** These are the ones that mark text as generated or as filler:

> passionate · leveraging · cutting-edge · seamless · robust · innovative · dive into · elevate · unlock · craft (as a verb) · journey · ecosystem (unless you mean an actual software ecosystem) · "I'm a developer who loves to code" · "always learning" · "detail-oriented"

**Say the uncertain thing.** "I'm still figuring out where I want to specialize — right now I'm drawn to systems work" is a better sentence than any confident generality. It's specific, it's true, and it sounds like a person.

**Contractions are fine.** They make prose sound spoken rather than assembled.

**Sentence case for headings.** Not Title Case, not ALL CAPS.

**Keep it short.** Every paragraph you cut makes the rest more likely to be read.

---

## 6. About page

The one place you get to be a person. Roughly:

1. Who you are and what you're studying — one or two sentences
2. What you're actually interested in, specifically. Not "software" — the particular thing. Compilers? Numerical methods? Graphics? Say it. "I don't know yet, and here's what I'm trying" is also a real answer.
3. How you got here. A short, true story. What made you pick CS.
4. What you're doing right now — courses, what you're reading, what you're building
5. Something non-technical. One line. Not a list of hobbies with emoji — one specific thing that's true.
6. How to reach you

A real photo of you goes on this page, if not the homepage.

---

## 7. Writing order

Do it in this order. Each step unblocks the next.

1. Resume content — the plain file. **Do this first; it forces you to inventory what you actually have.**
2. Project #1 writeup, full template
3. Homepage: name, one-sentence intro, links
4. About page
5. Project #2
6. "What I'm working on now"
7. Meta descriptions for every page

Steps 1–3 are enough to launch. The rest can land after the site is live.
