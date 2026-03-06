# DevLearn — UI/UX Enhancement Plan
> Deep research: live browser sessions, actual lessons navigated and interacted with.  
> Not homepages — real lesson pages, real interactions, real screenshots.  
> Date: 2026-03-06

---

## 🔬 Deep Research Findings (Inside Actual Lessons)

---

### 🔮 Apollo Odyssey — Actual Lesson Anatomy

**Visited:** `/tutorials/lift-off-part1/01-feature-overview-and-setup` and `/04-building-our-schema`

**Layout:**
- Dark nav bar: `[Logo] [Course title]` on left, `[Lesson #. TITLE] [⏱ 3m] [Language dropdown]` in center
- Left sidebar: flat list of lesson names, current lesson highlighted with white text
- Main content: full-width **video first**, written content scrolls below
- **Floating mini video player** (bottom-right corner) when you scroll past the main video — never lose the video
- **Copy button** top-right on every code block

**Lesson bottom:**
- `✏️ Task!` checkbox with clear instruction (e.g., "I've installed client packages and the app runs")
- `⚠️ Watch out! Did something go wrong?` — yellow warning callout, collapsible
- **"X tasks remaining ↑"** counter button — shows how many tasks left, links back up
- **"Next →"** button — always visible at bottom, no hunting for it
- **Community comments** section — powered by Giscus (GitHub Discussions), shows reply count

**Code challenge lesson (`/04-building-our-schema`):**
- Inline Monaco editor embedded in the lesson page
- **"Run ▶"** button + **"Reset 🔄"** button below the editor
- Results/errors appear inline below the editor
- Lesson continues AFTER the challenge — you must complete it to unlock Next

**Key observations:**
1. The video + text parity is real — same content, your choice how to consume it
2. The task checkbox is not optional decoration — it's the gate to proceed
3. The "Watch out" callout uses ⚠️ + yellow background — distinct from normal content
4. Language selector (JavaScript/TypeScript) is in the top bar, affects all code blocks
5. "X tasks remaining" creates micro-urgency without being aggressive

---

### 🔷 Total TypeScript — Course Page & Lesson Anatomy

**Visited:** `/tutorials/beginners-typescript` (course home) and attempted exercise pages

**Course home layout:**
- Full dark background with **stars** and a glowing portal illustration
- **Wizard silhouette walking into a portal** — the metaphor is "you're beginning a journey"
- Left: Large title + author avatar + "Start Learning" CTA + GitHub link
- Right: "Contents" list with "18 Lessons" count
- Below: **"Certificate"** — "Complete all lessons to unlock this certificate"

**Skill tree (seen at bottom of course page):**
- Connected nodes with dashed lines between them — visual dependency graph
- **"LEVEL 7 🔒 LOCKED"** label with lock icon on locked levels
- Each node is a lesson or quiz: "Quiz: Has Logged In", "Nullability", etc.
- Gray/faded styling for locked nodes, white for available

**404 page:**
- Dark castle in moonlight — fully branded, not a generic error page
- Personality: even errors feel on-theme

**Key observations:**
1. The visual theme is **total commitment** — wizard/magic everywhere, not just a logo
2. Certificate shown upfront as the goal — you know what you're working toward
3. Skill tree with locked levels creates **visible progression** (you see the whole map)
4. Author avatar + name on course page builds trust and personality
5. Exercises are behind login — the brand is the hook, login is the conversion

---

### 🐘 SQLZoo — Inside a Real SQL Lesson

**Visited:** `/wiki/SELECT_basics`

**Layout:**
- No hero, no fluff — **data table appears immediately** at top of page
- You see the `world` table (name, continent, area, population, gdp) before any instruction
- Language picker in the header (English / Deutsch / 日本語 / 中文)
- Left sidebar: clickable lesson links with **progress bar under each one**
- Right sidebar: meta links (printable, permalink, etc.)

**Exercise format:**
- Numbered exercises: "1.", "2.", "3." — sequential, one per concept
- For each exercise: written instructions + **editable SQL textarea** side by side
- **"Submit SQL"** blue button + **"restore default"** link to reset
- Result appears in the right panel (the big empty gray area on the right of the editor)
- No modals, no overlays — everything inline on the page

**Key observations:**
1. Data-first design — you see the table BEFORE you write any query (critical for context)
2. Progress bars in sidebar are thin blue lines under each topic name — subtle but clear
3. Zero friction: textarea is directly editable, no IDE load time
4. "restore default" is next to Submit — forgiveness is built in
5. The design is 2005-era ugly, but the interaction model is near-perfect

---

### ☸️ Execute Program — Skill Tree & Course Anatomy

**Visited:** `/courses/typescript-basics`

**Course intro:**
- Dark navy background, large bold title, subtitle describing the course
- **"You'll Learn"** section: describes what's covered; includes concrete numbers
  - "44 lessons containing 176 code examples"
  - "Most people finish this course in **3 hours over 6 calendar days**"
  - The **calendar days** framing = implicit spaced repetition disclosure
- Social proof: quotes from real developers (with avatars and names)

**Skill tree (at bottom of page):**
- Visual node graph — boxes connected by dashed lines
- Nodes: lessons and quizzes mixed
- **"LEVEL 7 🔒 LOCKED"** label for locked levels
- Faded/gray styling for locked nodes
- No scrolling needed to see the whole map — fits in viewport

**Key observations:**
1. Stating "3 hours over 6 calendar days" sets expectations and implies daily practice
2. Social proof (developer quotes with faces) builds credibility before commitment
3. Skill tree shows you the ENTIRE curriculum upfront — removes mystery/anxiety
4. Quiz nodes are interspersed between lessons — not all at the end
5. "176 code examples" as a metric = confidence builder ("this is thorough")

---

### 🌿 EDA Visuals (boyney.io) — Individual Concept Page

**Visited:** `/visuals/coupling-spectrum-in-distributed-systems`

**Layout:**
- White background, **massive bold title** (all-caps, large serif-ish font)
- "By DAVID BOYNE" in handwritten-style font + linked
- The diagram is **the content** — not an illustration, it IS the lesson
- Diagram uses colored boxes (green for good, red for bad, yellow for middle ground)
- Labels beneath each box in small text
- Witty caption beneath diagrams: "It's a spectrum, not a toggle"

**Visual style:**
- Hand-drawn aesthetic (not perfectly pixel-aligned — intentional roughness)
- Spectrum/slider visual: `TIGHT ←——————→ LOOSE` with items placed on the spectrum
- Benefits grid: 2×2 green boxes ("Team independence", "Resilience", "Tech flexibility", "Scalability")
- "What you gain" section = positive framing of the concept

**Bottom of page:**
- CTA card: "EDA Visuals: The book — Join over 13,000 others learning EDA"
- "Download the book" button (free), "Purchase the book" (paid to support)

**Key observations:**
1. The diagram IS the lesson — no walls of text, just visual + minimal labels
2. Color coding is semantic: red = bad/tight, green = good/loose
3. Captions add wit and personality — not just labels
4. The spectrum metaphor is reusable for any "this is a tradeoff" concept
5. Free download CTA at bottom = lead capture without being pushy

---

### ☸️ Killercoda — Scenario Entry Page

**Visited:** `/playgrounds/scenario/ubuntu`

**Layout:**
- Left panel (narrow): **scenario title + description** — plain text, minimal
- Right panel (wide): **terminal placeholder** — shows "Sign in to access for FREE" overlay
- Login options: GitHub / GitLab / Google — social login only, no email/password form

**Key observations:**
1. The split-panel layout is the core UX: read left, type right — no switching tabs
2. The barrier to entry is social login only — zero form friction
3. "Sign in to access the scenario for FREE" — the word FREE is the CTA hook
4. Content is minimal on purpose — the terminal IS the content, not supplementary

---

## 🎯 Confirmed UI Patterns (From Actual Lesson Interaction)

### The 7 Patterns That Actually Matter Most

| # | Pattern | Seen At | What It Does |
|---|---------|---------|--------------|
| 1 | **Task checkbox gate** | Apollo Odyssey | User must check off tasks before Next unlocks — enforces active engagement |
| 2 | **"X tasks remaining" counter** | Apollo Odyssey | Micro-urgency without anxiety — you know exactly how much is left |
| 3 | **Data/context before instruction** | SQLZoo | Show the table/schema FIRST, then ask the question — reduces cognitive load |
| 4 | **Skill tree with visible locked levels** | Execute Program, Total TypeScript | See the whole map — removes mystery, creates desire to unlock |
| 5 | **Floating mini video player** | Apollo Odyssey | Continue reading while audio/video plays — never lose context |
| 6 | **Diagram IS the lesson** | EDA Visuals | Visual first, text second — ADHD-friendly, scannable, memorable |
| 7 | **Estimate: "X hours over Y days"** | Execute Program | Sets realistic expectation + implies spaced repetition naturally |

### Patterns That Look Good But Are Harder Than They Appear
- Inline Monaco editor (Apollo code challenges) — heavy to implement
- Real terminal in browser (Killercoda) — requires backend VM provisioning
- Spaced repetition algorithm (Execute Program) — needs persistent user state

---

## ✅ Full Todo List (Updated After Deep Research)

### 🔴 P0 — Highest Impact, Feasible Now

- [ ] **Task checkbox in lessons** — Replace or supplement "Mark Complete" with 1-3 task checkboxes inside the lesson modal; only enable "Mark Complete" when all tasks are checked *(Apollo Odyssey)*
- [ ] **"X tasks remaining" badge** — Live counter at the bottom of the lesson modal showing `✓ 2 of 3 tasks done` *(Apollo Odyssey)*
- [ ] **"⚠️ Watch out" callout block** — Add a styled yellow warning callout component for common mistakes in lessons *(Apollo Odyssey)*
- [ ] **Lesson time estimate** — Show `⏱ ~5 min` badge on every lesson card and in the lesson modal header *(Apollo Odyssey)*
- [ ] **Confetti on lesson complete** — Fire `canvas-confetti` when all tasks checked and "Mark Complete" clicked *(Apollo Odyssey)*
- [ ] **"Next →" always visible** — When a lesson modal is open, show a sticky "Next Lesson →" at the bottom; enabled only when complete *(Apollo Odyssey)*
- [ ] **Copy button on code blocks** — Every `<pre>` / code block gets a floating "Copy" button top-right *(Apollo Odyssey — on every single code block)*
- [ ] **"What you'll learn" callout** — Add 3–5 bullet learning objectives at the top of every lesson modal *(Execute Program)*
- [ ] **Course time estimate** — Show "~X hours over Y days" on each module/subject header *(Execute Program)*

### 🟠 P1 — Strong Impact, Medium Effort

- [ ] **Skill tree visualization** — Replace flat lesson list inside a module with a visual node graph (connected nodes, locked levels grayed out) *(Execute Program, Total TypeScript)*
- [ ] **"LOCKED 🔒" lesson state** — Future lessons visually locked until previous ones are complete *(Execute Program)*
- [ ] **Data/schema panel in lessons** — For Redis and PostgreSQL lessons, show a collapsible "Data Model" panel with the example schema before the instruction *(SQLZoo — data-first design)*
- [ ] **"Before/After" spectrum slider** — For EDA/architecture lessons, a Tight ↔ Loose spectrum diagram showing where different approaches fall *(EDA Visuals)*
- [ ] **Architecture diagrams as lessons** — For key EDA concepts (Pub/Sub, CQRS, Event Sourcing), the diagram IS the primary content, not an afterthought *(EDA Visuals)*
- [ ] **Certificate shown upfront** — On each subject overview, show the certificate you'll earn: "Complete all 8 lessons to earn this certificate" with a preview *(Total TypeScript)*
- [ ] **Floating mini-player for video/audio** — When lesson has audio or a demo clip, floating pip player in bottom-right corner *(Apollo Odyssey)*
- [ ] **Social login feel on sharing** — When a lesson is complete, show a shareable card (not a flow — just a UI element) *(Total TypeScript certificate)*

### 🟡 P2 — Good Polish, Lower Priority

- [ ] **Language/framework tab on code blocks** — JS/TS tabs where relevant *(Apollo Odyssey language selector)*
- [ ] **Module progress rings** — Animated SVG circular rings on module headers *(KodeKloud)*
- [ ] **Lesson card visual states** — Completed (green left border + ✅), in-progress (pulsing), locked (gray + 🔒) *(universal)*
- [ ] **XP floating animation** — `+125 XP ⚡` floats up and fades on lesson complete *(Apollo, KodeKloud)*
- [ ] **7-day streak calendar** — Row of 7 dots showing active learning days *(Duolingo pattern)*
- [ ] **Developer quote / social proof** — 2–3 short testimonial quotes on each subject's overview page *(Execute Program)*
- [ ] **Sidebar glow on active item** — box-shadow glow + animated left border *(polished SaaS apps)*
- [ ] **Subject switch fade** — Fade in/out content on subject switch *(standard)*
- [ ] **Stat counter animation** — XP/Lessons/Streak count up from 0 on load *(dashboards)*

### 🟡 P3 — Content Upgrades

- [ ] **"When to use / When NOT to use" table** — Structured comparison table in Redis, Docker, GraphQL lessons *(Cloudflare KV docs)*
- [ ] **Witty diagram captions** — Add single-line insight captions beneath diagrams like EDA Visuals ("It's a spectrum, not a toggle") *(EDA Visuals)*
- [ ] **Filename labels on code blocks** — `// app.ts` tab above every code snippet *(Apollo Odyssey + universal)*
- [ ] **"Why this matters" callout** — Styled callout before each concept explaining real-world relevance *(The Guild docs)*
- [ ] **Resource cards at lesson end** — 2–3 curated links styled as cards *(Confluent Developer)*
- [ ] **Difficulty badge polish** — EASY=green, MEDIUM=amber, HARD=red, consistent everywhere *(TypeHero)*

### 🔵 P4 — Advanced / Stretch

- [ ] **Inline code runner** — "Run ▶" button on JS/TS code blocks; execute in sandboxed iframe *(Apollo Odyssey code challenges)*
- [ ] **SQL REPL for PostgreSQL** — Embed sql.js (SQLite WASM); editable textarea + Submit + restore default *(SQLZoo exact pattern)*
- [ ] **Spaced repetition nudge** — Track completion dates; surface "🔁 3 reviews due" after 3/7/14 days *(Execute Program)*
- [ ] **Certificate generator** — Canvas-rendered PNG certificate on full subject completion *(Total TypeScript, Redis University)*
- [ ] **PWA offline mode** — Service worker caches all lesson content *(mobile-first)*

---

## 🏗️ Sprint Order

```
Sprint 1 (P0): Task checkboxes, time estimates, copy buttons, confetti, Next button
Sprint 2 (P1): Skill tree, schema panels, EDA diagrams, certificate preview
Sprint 3 (P2): Card states, progress rings, XP animation, streaks
Sprint 4 (P3): Content — diagrams, captions, resource cards, filename labels  
Sprint 5 (P4): Code runner, SQL REPL, spaced repetition, certificate generator
```

---

## 🎨 Design System Decisions (Based on Research)

| Decision | Based On | Rationale |
|----------|---------|-----------|
| **Dark theme as default** | Apollo, Total TypeScript, Execute Program | All top sites default to dark; lighter feels dated for dev content |
| **Diagrams first, text second** | EDA Visuals | Visual-primary is ADHD-friendly and faster to scan |
| **Task gates (not honor system)** | Apollo Odyssey | Passive "mark complete" doesn't enforce learning; tasks do |
| **Show the full map upfront** | Execute Program skill tree | Transparency about scope reduces anxiety and increases commitment |
| **Estimate in days, not just hours** | Execute Program | "3 hours over 6 calendar days" normalizes spaced practice |
| **Copy button everywhere** | Apollo Odyssey | Every code block; zero friction to use the code |
| **Captions with personality** | EDA Visuals | "It's a spectrum, not a toggle" is more memorable than a heading |
| **Social proof on course page** | Execute Program | Developer quotes with faces before login prompt |

---

*Research method: Live Chrome relay sessions — navigated into actual lessons, interacted with UIs, screenshotted real content*  
*Sites visited deeply: Apollo Odyssey (2 lessons), Total TypeScript (course page + exercise), Execute Program (course + skill tree), SQLZoo (live SQL lesson), EDA Visuals (concept article), Killercoda (scenario page)*  
*Date: 2026-03-06*
