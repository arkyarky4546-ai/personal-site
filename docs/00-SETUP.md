# 00 — Setup

One-time. Do this before Phase 1. About 30 minutes, mostly waiting on downloads.

---

## Prerequisite: check your Claude plan

**Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free Claude.ai plan does not include Claude Code access.**

Check this first — everything below assumes you have it. If you're on the free plan, you have two options: upgrade, or do the build in this chat interface and paste files across manually. The second is slower but workable, and the specs are written to survive it.

---

## Step 1 — Folder structure

This is the part you asked about. **`CLAUDE.md` is not in the same folder as the others.**

```
personal-site/              ← your project folder. Open Claude Code HERE.
├── CLAUDE.md               ← ROOT. Claude Code auto-loads this every session.
└── docs/
    ├── 00-SETUP.md
    ├── README.md
    ├── 01-brief.md
    ├── 02-stack-decisions.md
    ├── 03-system-design.md
    ├── 04-design-direction.md
    ├── 05-content-and-copy.md
    ├── 06-build-phases.md
    └── 07-prompts-for-claude-code.md
```

**Why the split:** Claude Code reads `CLAUDE.md` from the project root automatically, on every session, with no prompting. That's why the hard design rules live there — they're the constraints that must never get lost, and they're loaded before Claude Code does anything.

The `docs/` files are read on demand, when a prompt points at them. That's deliberate: loading all 15,000 words every session would bury the rules that matter in context it doesn't need yet.

**Commands:**

```bash
mkdir -p personal-site/docs
cd personal-site
# move the downloaded files in, then:
mv docs/CLAUDE.md .        # if CLAUDE.md ended up in docs/
```

Verify with `ls` — you should see `CLAUDE.md` and `docs/` at the top level.

---

## Step 2 — Replace the placeholders

Four placeholders across the files. Do this now; it's much more annoying later.

| Placeholder | Replace with |
|---|---|
| `{{FULL_NAME}}` | Your full name |
| `{{GITHUB}}` | Your GitHub username |
| `{{DOMAIN}}` | Your domain, or leave it — you're launching on `*.workers.dev` |
| `{{EMAIL}}` | The address you'll put on the site |

**macOS / Linux:**
```bash
cd personal-site
grep -rl '{{FULL_NAME}}' . | xargs sed -i '' 's/{{FULL_NAME}}/Your Name/g'   # macOS
grep -rl '{{FULL_NAME}}' . | xargs sed -i 's/{{FULL_NAME}}/Your Name/g'      # Linux
```

**Windows, or if that looks like a lot:** just open the files in VS Code and use Find & Replace across the folder (Ctrl+Shift+H). Honestly faster.

---

## Step 3 — Git, before anything else

```bash
cd personal-site
git init
git add .
git commit -m "docs: planning specs and CLAUDE.md"
```

**Do this before you run Claude Code.** It gives you a clean rollback point. If a session goes sideways, `git reset --hard` returns you to a known-good state instead of you trying to remember what changed.

Then create the repo on GitHub (public, named `personal-site`) and:

```bash
git remote add origin https://github.com/arkyarky4546-ai/personal-site.git
git branch -M main
git push -u origin main
```

---

## Step 4 — Install Node 22 and pnpm

Astro 6+ requires Node 22.

```bash
node -v     # must show v22.x or higher
```

If not, install from nodejs.org (or `nvm install 22`, or `winget install OpenJS.NodeJS.LTS` on Windows). Then:

```bash
npm install -g pnpm
echo "22" > .nvmrc
```

---

## Step 5 — Install Claude Code

The native installer is recommended and doesn't need Node.js for itself.

**macOS, Linux, WSL:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD:**
```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

If you see `The token '&&' is not a valid statement separator`, you're in PowerShell, not CMD. If you see `'irm' is not recognized`, you're in CMD, not PowerShell. Your prompt shows `PS C:\` in PowerShell.

**Also available:** `brew install --cask claude-code` on macOS, `winget install Anthropic.ClaudeCode` on Windows. Both need manual updates; the native installer auto-updates in the background.

**On native Windows,** installing Git for Windows is recommended — it gives Claude Code a real Bash tool. Without it, Claude Code falls back to PowerShell, which works but means the commands in these docs need translating. WSL doesn't need it.

**Prefer not to use a terminal at all?** There's a desktop app that runs Claude Code with a GUI. Same tool, no command line.

**Verify:**
```bash
claude --version     # should print something like 2.1.211 (Claude Code)
claude doctor        # diagnostics, if anything looks off
```

---

## Step 6 — Cloudflare account

1. Sign up at cloudflare.com. **No credit card** — the Workers free plan doesn't ask for one.
2. That's it for now. You'll connect the Worker to the repo at the end of Phase 1, once there's something to deploy.

---

## Step 7 — Optional, 5 minutes: GitHub Student Developer Pack

`education.github.com/pack`, with a school email or a photo of your student ID.

Gets you a free domain for a year (Name.com does `.dev`), plus JetBrains IDEs and GitHub Pro. Worth applying regardless of this project. Verification can take a few days, so start it now and carry on without it.

---

## Step 8 — Start Claude Code

```bash
cd personal-site
claude
```

First run opens a browser to log in.

You're now in an interactive session, in the project folder, with `CLAUDE.md` loaded. Open `docs/07-prompts-for-claude-code.md`, copy the **Phase 1** prompt, and paste it in.

---

## What the loop looks like from here

For each phase:

1. `cd personal-site && claude` — fresh session
2. Paste that phase's prompt from `docs/07-prompts-for-claude-code.md`
3. It proposes a plan. **Read it.** Approve or redirect.
4. It builds. You check the acceptance criteria in `docs/06-build-phases.md`.
5. `git add . && git commit -m "feat: phase N"`
6. Exit. Next phase gets a new session.

**One phase per session.** Long sessions lose the constraints — around hour two it starts forgetting the design rules, which is exactly when it begins writing components.

---

## If something goes wrong

| Problem | Fix |
|---|---|
| Session went sideways | `git reset --hard HEAD` — back to your last commit |
| It ignored the design rules | Point at the specific rule: "That's the pattern in `docs/04-design-direction.md` §1.3" |
| It's over-engineering | "This is a six-page static site. Delete the abstraction and inline it." |
| You don't understand the code | "Walk me through this file line by line. I need to maintain it myself." |
| `claude: command not found` | Restart your terminal. Still failing → `claude doctor` |

Last one matters most. Don't accept code you can't read — you're the one who has to update this site during finals week.
