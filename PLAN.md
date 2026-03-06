# DevLearn — Full UI/UX Enhancement Plan
> Research method: Live Chrome relay. Navigated into actual lessons, scrolled, clicked buttons, triggered interactions.  
> Sites visited: Apollo Odyssey, Total TypeScript, Execute Program, SQLZoo, pgexercises, EDA Visuals,  
> Hasura Learn, HowToGraphQL, TanStack Docs, TypeHero, Scrimba, iximiuz Labs, Killercoda, Docker Docs, Play with Docker, redis.io/learn  
> Date: 2026-03-06

---

## 🔬 Deep Research Findings — Per Subject

---

### 📡 EDA — EDA Visuals (boyney.io)
**Lesson:** `/visuals/coupling-spectrum-in-distributed-systems`

**What I saw:**
- White background, giant bold all-caps title, "By DAVID BOYNE" in handwriting style
- The **diagram IS the entire lesson** — no walls of text, just visual + minimal labels
- Spectrum bar: `TIGHT ←————————→ LOOSE` with colored boxes placed along it
- Color coding: red = bad/tight, green = good/loose
- **2×2 benefit grid**: green boxes — "Team independence", "Resilience", "Tech flexibility", "Scalability"
- Witty captions: *"It's a spectrum, not a toggle"*
- Bottom CTA: "EDA Visuals: The Book — Join over 13,000 others learning EDA" → free download

**Patterns to steal:**
- Diagram-first content (replace text walls with visual-first)
- Spectrum/tradeoff diagrams for any "it depends" concept
- Colored benefit grids for listing advantages
- Witty one-liner captions beneath diagrams

---

### 🔴 Redis — redis.io/learn
**Lesson:** `/learn/howtos/quick-start/cheat-sheet`

**What I saw:**
- "TUTORIAL" label tag at top, **author avatars + names** (multiple contributors shown)
- `⏱ 90 minute read` time estimate
- **Right sidebar "Sections" accordion**: Connect / Strings / Hashes / Sets / Sorted Sets... (clickable anchors)
- "What you'll find here:" bullet list at top of lesson
- Screenshots of actual tool (Redis Insight UI) embedded inline
- Language-specific code blocks: `node-redis`, `redis-py`, etc. with tab switcher

**Patterns to steal:**
- Author avatars + names on every lesson (trust + humanity)
- Right sidebar section accordion for long lessons
- "What you'll find here" summary at top
- Tool screenshots embedded in lessons (not just code — show the actual UI)

---

### 🐳 Docker — Play with Docker + Docker Docs
**Lesson:** `training.play-with-docker.com/beginner-linux/` + `docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/`

**What I saw (Play with Docker):**
- Two-column layout: Left = `Difficulty: Beginner | Time: ~30 minutes | Tasks:` numbered list; Right = dark terminal (login-gated)
- **Task list doubles as TOC** — clicking jumps to that section
- Tasks numbered sequentially: "1. Run some simple Docker containers", "2. Package and run a custom app using Docker"...

**What I saw (Docker Docs):**
- Breadcrumb nav + left sidebar drill-down tree
- **"Copy as Markdown" button** in top-right of article
- Right sidebar "Table of contents" with exactly 4 sections: **Explanation / Try it out / Additional resources / Next steps**
- Embedded YouTube video inline
- **"Ask AI" button** in nav bar
- "Give feedback" floating button
- Each page always ends with "Next steps" section

**Patterns to steal:**
- 4-section lesson structure: Explanation → Try it out → Additional Resources → Next steps
- "Try it out" expandable section after explanation
- "Next steps" section at every lesson end (not just a button — actual curated links)
- "Give feedback" floating button
- Task list = TOC (numbered tasks in sidebar that double as navigation)

---

### 🔮 GraphQL — Apollo Odyssey (deep) + Hasura Learn + HowToGraphQL
**Lessons visited:** Apollo `/lift-off-part1/01-feature-overview-and-setup`, `/04-building-our-schema`; Hasura `/intro-graphql/graphql-queries/`; HowToGraphQL `/basics/1-graphql-is-the-better-rest/`

**Apollo Odyssey — what I saw:**
- Left sidebar: flat lesson list, current = white text
- Main: full-width video, written content scrolls below
- **Floating mini video player** (bottom-right corner) appears when you scroll past main video
- **Copy button** top-right on every single code block
- Language selector (JS/TS) in top bar — **changes all code blocks globally**
- Bottom of lesson: `✏️ Task!` checkboxes — must check all before proceeding
- `⚠️ Watch out! Did something go wrong?` — yellow callout, collapsible
- **"X tasks remaining ↑"** live counter button
- **"Next →"** always visible at bottom
- **Community comments** (Giscus/GitHub Discussions) at the very bottom
- Code challenge lesson: Monaco editor embedded inline with **"Run ▶"** + **"Reset 🔄"** buttons; results appear below; lesson continues only after challenge passes

**Hasura Learn — what I saw:**
- Left sidebar: full flat TOC
- Breadcrumb + "Edit on GitHub →" link
- **"Key topics and takeaways"** heading = What You'll Learn
- Right sidebar: section anchors + ad/resource card (The GraphQL Handbook)
- **"Try Out GraphQL Queries"** section with screenshot of GraphiQL tool
- Dark code blocks with "Copy" button top-right on each
- GitHub star count in nav bar (social proof: 31,913)

**HowToGraphQL — what I saw:**
- **Full-viewport video** (pink/magenta background) above the fold — lesson title + part indicator ("GraphQL Fundamentals 2/4") overlaid on video
- Right sidebar: **vertical connected-node TOC** — current lesson = filled pink dot, others = open circles, connected by a vertical dashed line, **"+4 more chapters"** collapse button
- Written content scrolls below the video
- No separate "next page" — lesson is one long scrollable page

**Patterns to steal:**
- Task checkboxes that gate progress (not honor system)
- "X tasks remaining" live counter
- "⚠️ Watch out!" yellow warning callout component
- Floating mini video player (pip) when scrolling past main video
- Copy button on every code block — non-negotiable
- Global language selector (JS/TS) affecting all code blocks
- Community comments at lesson bottom (Giscus)
- Vertical connected-node sidebar TOC (current = filled dot)
- "Edit on GitHub" link on lessons
- Lesson position indicator ("Part 2 of 4")
- "Try it out" section with screenshot of the tool

---

### ⚡ React Query — TanStack Docs
**Lesson:** `/query/latest/docs/framework/react/guides/queries`

**What I saw:**
- Left sidebar: **Framework selector** (React selected) + **Version selector** at top
- "On this page" anchor list for current page sections
- **"Copy page" button** in main content header
- Code blocks: **language label** (`tsx`) in top-left + **copy icon** top-right
- Inline code styled as rounded pill boxes (not backtick monospace)
- Sponsors grid on right sidebar (partner logos)
- **"← PREVIOUS / NEXT →"** nav cards at very bottom with linked article names
- Bold + underlined emphasis on key terms inline

**Patterns to steal:**
- Language label on every code block (`tsx`, `js`, `sh`)
- "← PREVIOUS / NEXT →" nav cards at lesson bottom (not just a text link)
- Framework selector at top of sidebar (where multiple frameworks apply)
- "On this page" anchor nav in right sidebar

---

### ☸️ Kubernetes — Killercoda + iximiuz Labs
**Killercoda:** `/playgrounds/scenario/ubuntu`  
**iximiuz:** `/courses/containerd-cli`

**Killercoda — what I saw:**
- Split-panel layout: instructions left, terminal right
- Terminal placeholder: "Sign in to access for FREE" — **FREE is the hook**
- Login: GitHub / GitLab / Google only — zero form friction

**iximiuz Labs — what I saw:**
- Catalog with **filter sidebar** (Collection radio: Official/Independent/Community + Category checkboxes: Linux/Networking/Containers/Kubernetes)
- Search + "Filter by tag..." text inputs
- Course cards: **"Course on [tag], [tag]"** chips above the title
- Author attribution with link on every card
- Course page: **hand-drawn technical illustration** (containerd as a table, CLI tools as game controllers)
- **Tag chips** below course title
- **"What's Inside?"** section with module list on right side
- Module list: **connected dots on vertical line** — Module 1 (large dot) → Lesson → Lesson → Module 2 (large dot) → Lesson...
- Course description uses inline `code` formatting throughout

**Patterns to steal:**
- Filter sidebar with radio + checkbox (Collection + Category)
- Tag chips on course/lesson cards
- Hand-drawn technical illustrations per course/subject
- Connected-node module list (vertical timeline on right)
- "Course on [subject]" chip above card title
- "For FREE" framing on any gated content

---

### 🐘 PostgreSQL — pgexercises.com (deep)
**Lesson:** `/questions/basic/where2.html`

**What I saw:**
- **"← Previous Exercise" and "Next Exercise →"** in the very top bar of the page (above the title) — always reachable without scrolling
- **Breadcrumb**: Home / Basic / Where2
- **"Schema reminder ▲"** — collapsible box showing full ER diagram (cd.members ↔ cd.bookings ↔ cd.facilities) with column names + types
- **"Expected Results"** table shown on the LEFT — you see what you're aiming for BEFORE writing anything
- **"Your Answer"** textarea on the RIGHT
- Button row: **Hint | Help | Save | Run Query** (top-right of answer area)
- "Answers and Discussion **Show**" toggle at the bottom — hides full answer + explanation until clicked
- Answer explanation includes: the correct SQL, a plain-English walkthrough, and a diagram showing the conceptual intersection of WHERE + SELECT

**Patterns to steal:**
- Previous/Next nav in the very top of the page (not just bottom)
- Schema reminder collapsible with actual ER diagram
- Expected results shown BEFORE you write your answer
- Hint → Help → Show Answer progressive reveal (3 levels)
- Answer includes diagram + plain English explanation (not just the answer)

---

### 🔷 TypeScript — TypeHero + Total TypeScript
**TypeHero:** `/challenge/hello-world`  
**Total TypeScript:** `/tutorials/beginners-typescript`

**TypeHero — what I saw:**
- **Full split-screen challenge layout**: Left panel = `Description | Solutions | Submissions` tabs; Right panel = Monaco editor (top) + test assertions (bottom, read-only)
- Left panel shows: challenge title, author (@typehero), "Last updated 1 year ago", **BEGINNER** difficulty badge, like count (102), share + bookmark icons
- Written challenge: description + starter code snippets with copy icons
- Right panel: editable Monaco editor with **live red squiggles** (broken types highlighted instantly)
- Bottom panel (right): `Tests ▾ ⊗` — red X icon when tests fail, updates in real time
- **"Login to Submit"** CTA at bottom-right (gating just submission, not trying)
- Community solutions tab — see how others solved it

**Total TypeScript — what I saw:**
- Course page: stars background, **wizard silhouette walking into glowing portal**
- Left: course title + "Start Learning" CTA + GitHub repo link
- Right: "Contents — 18 Lessons" list
- **Certificate preview** below: "Complete all lessons to unlock this certificate"
- Skill tree at bottom: connected node graph, **"LEVEL 7 🔒 LOCKED"** for locked content
- **Even the 404 page** has a moonlit castle — total brand commitment

**Patterns to steal:**
- `Description | Solutions | Submissions` tabs on lesson (not just description)
- Live type error squiggles in code (Monaco + TypeScript language service)
- Test panel showing pass/fail in real time (red ✗ → green ✓)
- "Login to Submit" — let users TRY everything, only gate submission
- Community solutions tab (see how others solved it)
- Certificate shown on course overview page as the goal
- Locked level nodes with 🔒 in skill tree

---

### 📚 Scrimba — React courses
**Course page:** `/learn-react-c0e`

**What I saw:**
- Dark left sidebar (icons + labels): Home / Courses / Paths / Topics / Teams / Extras
- Course header: author avatar, `15.1 hrs | Intermediate | free | FOLLOW`
- Module list: each module has `2.4 hrs · 🔒 0/22` (hours + lesson count progress fraction)
- Final lesson: "Turn your certificate into an asset" — certificate is a lesson, not a separate feature
- Login: GitHub / Google / Email only
- "NEW SCRIM ⌘↩" button in sidebar — create your own scrim (content tool)
- "UPGRADE TO PRO" persistent button in sidebar

**Patterns to steal:**
- `hrs · 0/22` progress fraction on every module (not just a progress bar)
- Certificate as an actual lesson in the course (not a hidden unlock)
- Course time broken down per module, not just total

---

## 🎯 The 12 Patterns That Matter Most (Ranked by Impact)

| Rank | Pattern | From | Impact |
|------|---------|------|--------|
| 1 | **Task checkboxes gate progress** | Apollo Odyssey | Forces active engagement vs passive scrolling |
| 2 | **Copy button on every code block** | Apollo, Hasura, TanStack | Instant utility — zero friction to use the code |
| 3 | **Expected results shown first** | pgexercises | Reduces cognitive load — you know the goal before starting |
| 4 | **Schema reminder collapsible** | pgexercises | Context always available without cluttering the page |
| 5 | **Vertical connected-node TOC** | HowToGraphQL, iximiuz | Visual progress — you see where you are AND where you're going |
| 6 | **Hint → Help → Show Answer** 3-step reveal | pgexercises | Builds confidence, reduces frustration |
| 7 | **Floating mini video player** | Apollo Odyssey | Never lose context when scrolling long lessons |
| 8 | **Live test runner** (pass/fail inline) | TypeHero | Immediate feedback loop — most motivating interaction pattern found |
| 9 | **Lesson position indicator** | HowToGraphQL ("2/4") | Orientation for ADHD — always know where you are |
| 10 | **Diagram IS the content** | EDA Visuals | Visual-first beats text-first for recall and ADHD attention |
| 11 | **4-section lesson structure** | Docker Docs | Explanation → Try it → Resources → Next steps is the best prose structure found |
| 12 | **"X tasks remaining" live counter** | Apollo Odyssey | Micro-urgency + orientation without anxiety |

---

## ✅ Complete Todo List

### 🔴 Sprint 1 — Highest Impact, Feasible Now

- [ ] **Copy button on every code block** — floating "Copy" button top-right on every `<pre>`. Clipboard API. Show ✓ for 2s after copy. Zero dependencies. *(Apollo, Hasura, TanStack — seen on literally every top site)*
- [ ] **Task checkboxes in lesson modal** — Add 2-3 checkboxes per lesson ("I understand X", "I've read Y"). Only enable "Mark Complete" when all checked. *(Apollo Odyssey)*
- [ ] **"X tasks remaining" live counter** — Below checkboxes, show `✓ 1 of 3 done` updating in real time. *(Apollo Odyssey)*
- [ ] **Lesson position indicator** — In modal header: "Lesson 2 of 5 · Module: Pub/Sub". *(HowToGraphQL "2/4" pattern)*
- [ ] **"⏱ X min read" time estimate** — On every lesson card and in modal header. Estimate ~200 words/min from lesson content length. *(redis.io/learn, Apollo)*
- [ ] **Confetti on lesson complete** — `canvas-confetti` burst when Mark Complete is clicked. *(Apollo Odyssey)*
- [ ] **"⚠️ Watch out!" callout component** — Yellow-background callout block for common mistakes. Use in lessons where errors are common. *(Apollo Odyssey)*
- [ ] **"Next →" sticky button in modal** — Enabled only when complete. Navigates to next lesson without closing/reopening modal. *(Apollo, pgexercises)*
- [ ] **Previous/Next in modal header** — `← Prev | Lesson 2 of 5 | Next →` in a single bar at the top of every lesson modal. *(pgexercises top-bar pattern)*

### 🟠 Sprint 2 — Layout & Navigation

- [ ] **Vertical connected-node sidebar TOC** — Replace flat module accordion with vertical timeline: Module header (large dot) → Lesson (small dot) → Lesson → Module header... Current lesson = filled colored dot, completed = checkmark, future = open. *(HowToGraphQL, iximiuz)*
- [ ] **"What you'll learn" callout** — Styled box at top of every lesson modal: "In this lesson:" + 3-5 bullet points. *(Hasura "Key topics and takeaways", Docker Docs)*
- [ ] **4-section lesson structure** — Restructure or label lesson content into 4 sections: Explanation → Try it out → Additional Resources → Next Steps. Use visual dividers/headings per section. *(Docker Docs)*
- [ ] **Language label on code blocks** — Show `js` / `ts` / `bash` / `yaml` label in top-left of every code block. *(TanStack Docs)*
- [ ] **Author credit on lessons** — Small avatar + name under lesson title: "by [Name]" (can be your own). Adds humanity. *(redis.io, iximiuz)*
- [ ] **"Edit on GitHub" link** — Small "Edit on GitHub →" link in lesson modal footer. *(Hasura Learn)*
- [ ] **Hint → Help → Show Answer** — Replace immediate answer reveal on quizzes with 3 progressive buttons: Hint (vague hint) → Help (stronger hint) → Show Answer (full reveal). *(pgexercises)*
- [ ] **Schema/context collapsible** — For Redis and PostgreSQL lessons, add a "Data Schema ▲" collapsible showing the example data structure being used. *(pgexercises schema reminder)*
- [ ] **Expected result shown first** — For quiz/exercise questions, show the expected output BEFORE the answer box — not after. *(pgexercises)*
- [ ] **"← Previous / Next →" nav cards at lesson bottom** — Styled cards (not just links) with the names of adjacent lessons. *(TanStack Docs)*

### 🟡 Sprint 3 — Visual Identity & Polish

- [ ] **Tag chips on lesson cards** — Small colored pill tags (e.g., `pub/sub`, `messaging`, `async`) on each lesson card. *(iximiuz Labs)*
- [ ] **Lesson card visual states** — Completed: green left border + ✅; In-progress: accent border + pulsing dot; Locked: gray + 🔒; Default: normal. *(universal)*
- [ ] **Module progress ring** — Animated SVG circular ring replacing "X/Y" text on module headers. *(universal best practice)*
- [ ] **XP floating animation** — `+125 XP ⚡` floats up and fades on lesson complete. *(Apollo, KodeKloud)*
- [ ] **Difficulty badge polish** — EASY=green, MEDIUM=amber, HARD=red — `background: rgba(color, 0.15)` + matching text color. *(TypeHero)*
- [ ] **Subject hero illustration** — Each subject gets a themed visual. Can be emoji-based SVG or simple colored header. Hand-drawn style preferred. *(iximiuz Labs course covers)*
- [ ] **"Course on [subject]" chip** — Above lesson card titles: "Lesson on pub/sub, messaging". *(iximiuz)*
- [ ] **Witty diagram captions** — Add italic one-liner beneath key diagrams: *"Events don't wait — neither should you."* *(EDA Visuals)*
- [ ] **Spectrum/tradeoff diagrams** — For EDA concepts (Tight vs Loose coupling, Sync vs Async) use spectrum slider visual instead of text comparison. *(EDA Visuals)*
- [ ] **Sidebar glow on active item** — `box-shadow: 0 0 12px rgba(accent, 0.3)` on active sidebar item. *(polished SaaS pattern)*
- [ ] **Subject switch fade animation** — Fade in/out on subject change (0.2s opacity). *(standard UX)*
- [ ] **Stat counter animation** — XP/Lessons/Streak count up from 0 on page load. *(dashboard pattern)*

### 🟡 Sprint 4 — Gamification

- [ ] **Skill tree visualization** — Replace flat lesson list with visual node graph. Locked levels grayed + 🔒. Full map visible upfront. *(Execute Program, Total TypeScript)*
- [ ] **Certificate shown upfront** — On each subject overview: "Complete all X lessons to earn this certificate" with a preview. *(Total TypeScript)*
- [ ] **`Description | Solutions | Discussion` tabs** — In lesson modal, add tabs: Description (default), Solutions (show answer after attempting), Discussion (comments). *(TypeHero)*
- [ ] **7-day streak calendar** — Row of 7 dots for active learning days (more visual than a number). *(Duolingo)*
- [ ] **Spaced repetition nudge** — Track completion dates in localStorage; surface "🔁 3 concepts due for review" pill in sidebar after 3/7/14 days. *(Execute Program)*
- [ ] **Course time broken into modules** — Show `2.4 hrs · 0/22` on each module, not just total course time. *(Scrimba)*
- [ ] **Social proof on subject overview** — 2-3 short developer quotes with names. *(Execute Program)*

### 🔵 Sprint 5 — Advanced / Interactive

- [ ] **Live code runner** — "Run ▶" on JS/TS code blocks. Execute in sandboxed iframe. Show output below. *(Apollo Odyssey code challenges)*
- [ ] **Floating mini video player** — If lessons have demo videos, show PiP player (bottom-right) on scroll. *(Apollo Odyssey)*
- [ ] **Live test runner on exercises** — For code exercises: show test assertions, run them in real time, show ✗ → ✓ transition. *(TypeHero)*
- [ ] **SQL mini-REPL** — For PostgreSQL lessons: editable textarea + Submit + restore default. Use sql.js (SQLite WASM). *(SQLZoo / pgexercises)*
- [ ] **Community comments** — Add Giscus (GitHub Discussions) comment section at the bottom of each lesson modal. *(Apollo Odyssey)*
- [ ] **Certificate generator** — canvas-rendered PNG on full subject completion, shareable. *(Total TypeScript, Redis University)*
- [ ] **Global language selector** — JS/TS toggle in header affecting all code blocks across the current lesson. *(Apollo Odyssey)*
- [ ] **PWA offline mode** — Service worker caches all lesson content. *(mobile/driving use case)*

---

## 🎨 Design System Decisions

| Element | Decision | Based On |
|---------|----------|---------|
| Dark theme default | Yes — all top sites use dark | Apollo, TypeHero, Execute Program, Scrimba |
| Code block style | VSCode Dark+ | Total TypeScript, universal recognition |
| Language label | Top-left of block | TanStack, universal |
| Copy button | Top-right of every block | Apollo, Hasura, TanStack — every site has this |
| Sidebar nav | Vertical connected-node timeline | HowToGraphQL, iximiuz |
| Lesson structure | 4 sections: Explain / Try / Resources / Next | Docker Docs |
| Quiz flow | 3-step: Hint → Help → Show | pgexercises |
| Task gating | Checkboxes before "Mark Complete" | Apollo Odyssey |
| Progress fraction | `0/22` beside module title | Scrimba |
| Diagrams | Visual-first, text-second | EDA Visuals |
| Certificate | Shown upfront as goal | Total TypeScript |
| Error pages | Branded, on-theme | Total TypeScript (castle), iximiuz (wireframe sketch) |

---

## 🏗️ Sprint Order Summary

```
Sprint 1: Copy buttons, task checkboxes, time estimates, position indicator, confetti, Next nav
Sprint 2: Connected-node sidebar, 4-section structure, hints, schema panels, prev/next cards
Sprint 3: Tag chips, card states, progress rings, XP animation, spectrum diagrams, subject illustrations
Sprint 4: Skill tree, certificate preview, tabs, spaced repetition, streak calendar
Sprint 5: Code runner, live test runner, SQL REPL, Giscus comments, PWA
```

---

*Sites visited: Apollo Odyssey (2 lessons + code challenge), Total TypeScript (course + 404), Execute Program (course + skill tree), SQLZoo (live SQL lesson), pgexercises (exercise + Hint/Help/Answer flow), EDA Visuals (concept article), Hasura Learn (2 lessons), HowToGraphQL (full lesson), TanStack Docs (guide page), TypeHero (Hello World challenge), Scrimba (course overview), iximiuz Labs (catalog + course page), Killercoda (scenario), Docker Docs (concept page), Play with Docker (lab page), redis.io/learn (tutorial page)*  
*Total: 20+ page visits, all deeply explored*
