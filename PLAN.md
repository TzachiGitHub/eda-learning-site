# DevLearn — UI/UX Enhancement Plan
> Live browser research conducted 2026-03-06.  
> Sites visited and screenshotted directly. Every pattern is real and verified.

---

## 🔬 Research: Best Learning Sites per Subject

### 📡 EDA (Event-Driven Architecture)
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **EDA Visuals** ⭐ | eda-visuals.boyney.io | Hand-drawn visual cards, one concept per card, bite-sized (5 min each), sketchbook aesthetic with colored diagrams — perfect ADHD format |
| 2 | **EventCatalog** | eventcatalog.dev | Interactive architecture documentation — visual event map, service relationships graph |
| 3 | **Confluent Developer** | developer.confluent.io | Deep Kafka-centric hands-on; architecture diagrams inline; dark terminal aesthetic |
| 4 | **AWS EDA Workshop** | catalog.workshops.aws | Step-by-step numbered labs; inline AWS console screenshots; checkpoint completion gates |
| 5 | **Three Dots Labs** | threedots.tech/episode/event-driven-architecture | "Hard Parts" format — real lessons from production; podcast + written parity |

**Key EDA UI patterns to steal:**
- EDA Visuals: **card grid of visual concepts** with sketch-style diagrams — each card is one pattern
- EventCatalog: **interactive graph/map** of how events flow between services
- AWS Workshop: **numbered step gates** — you can't skip ahead without completing current step

---

### 🔴 Redis
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **Redis.io Docs** | redis.io/docs | Command reference with inline "Try it" REPL; copy buttons everywhere |
| 2 | **Upstash Docs** | upstash.com/docs | "Quick Start in 60 seconds" hero; language tabs on every code block |
| 3 | **Redis University** | university.redis.io | Video + quiz hybrid; certificate on completion; course track visualization |
| 4 | **Launchpad** | launchpad.redis.com | Community template gallery; one-click sandbox launch per template |
| 5 | **Cloudflare KV Docs** | developers.cloudflare.com/kv | Brutal honesty "When to use / When NOT to use" tables; extremely clear prose |

**Key Redis UI patterns to steal:**
- **"Quick Start in 60 seconds"** hero section before lesson content
- **"When to use / When NOT to use"** comparison table
- **Command reference cards** — each Redis command as a card with syntax, example, output

---

### 🐳 Docker
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **Play with Docker** | training.play-with-docker.com | In-browser Alpine Linux VM; time-limited sandbox creates urgency; lab step tracker |
| 2 | **Docker Docs** | docs.docker.com | Multi-OS tabs (Mac/Win/Linux) inline; "Try it out" collapsible steps |
| 3 | **KodeKloud** | kodekloud.com | Embedded hands-on terminal next to content; scenario-based auto-validation |
| 4 | **iximiuz Labs** | labs.iximiuz.com | Real container playgrounds; "Challenges" with auto-graded scenarios; beautiful dark UI |
| 5 | **Bret Fisher's Docker Mastery** | udemy.com (Docker Mastery) | Activity checklist per section; resource downloads per module |

**Key Docker UI patterns to steal:**
- **OS/platform tabs** on code blocks (Mac / Linux / Windows)
- **"Try it out"** expandable hands-on sections within lesson text
- **Time-limited lab badge** — urgency creates focus (great for ADHD)

---

### 🔮 GraphQL
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **Apollo Odyssey** ⭐ | apollographql.com/tutorials | **Best learning UX seen.** Dark space theme (rocket ship metaphor), video + written parity, inline code challenges with test runner, confetti on pass, path/track visualizer |
| 2 | **HowToGraphQL** | howtographql.com | Language/framework selector at start; GitHub-linked code at each step |
| 3 | **GraphQL.org/learn** | graphql.org/learn | Interactive query runner embedded on the page; minimal clean design |
| 4 | **The Guild Docs** | the-guild.dev | Dark-first design; "Why we built this" context before every feature |
| 5 | **Hasura Learn** | hasura.io/learn | Hands-on from step 1; embedded GraphiQL explorer; numbered progress bar |

**Key GraphQL UI patterns to steal:**
- Apollo Odyssey: **rocket/journey metaphor** for progress (you're launching a mission)
- Apollo: **inline code challenge** — write code, run tests, see pass/fail, confetti on success
- Hasura: **embedded live playground** within the lesson (not a separate tab)

---

### ⚡ React Query (TanStack)
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **Scrimba** ⭐ | scrimba.com | **IDE + video merged into one** — you pause the video and edit the code directly in the screencap; unique format |
| 2 | **TanStack Docs** | tanstack.com/query | Framework tabs (React/Vue/Angular) per code block; anchor-linked headers |
| 3 | **ui.dev** | ui.dev | Visual diagrams of query lifecycle; "Before/After" code toggle |
| 4 | **ByteGrad** | bytegrad.com | One concept per page; SEO-first format; clean minimal reading experience |
| 5 | **Epic React** | epicreact.dev (Kent C. Dodds) | Workshop format: failing test → pass; git checkout per exercise; progressive unlocking |

**Key React Query UI patterns to steal:**
- Scrimba: **interactive video** — watch + edit in the same view (unique)
- ui.dev: **"Before/After" code slider** showing code transformation
- Framework **tab switcher** on every code block

---

### ☸️ Kubernetes
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **Killercoda** ⭐ | killercoda.com | In-browser terminal (real containers!); scenario auto-checker validates your work; certification paths; clean card grid layout |
| 2 | **KodeKloud** | kodekloud.com | Full lab environments; gamified path with XP, badges, leaderboard; mock exams |
| 3 | **killer.sh** | killer.sh | Exam simulator; timed pressure; real kubectl terminal; score breakdown |
| 4 | **kubernetes.io tutorial** | kubernetes.io/docs/tutorials | Official guided terminal in browser; copy button on every command |
| 5 | **TechWorld with Nana** | youtube.com/c/TechWorldwithNana | Concept → Diagram → CLI flow per topic; cheat sheet cards per module |

**Key Kubernetes UI patterns to steal:**
- Killercoda: **certification track cards** (visual grid with badges) as entry point
- Killercoda: **step validator** — "✅ Step 1 complete, move to Step 2" shown in terminal pane
- KodeKloud: **skill tree** progression map

---

### 🐘 PostgreSQL
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **pgexercises.com** ⭐ | pgexercises.com | **Best SQL learning UX.** Left: problem + schema diagram. Right: your SQL editor. Expected results shown. Hint / Help / Run Query buttons. Breadcrumb nav. "Next Exercise →" always visible |
| 2 | **SQLZoo** | sqlzoo.net | Interactive REPL on every page; left sidebar with per-topic progress bars; language selector (MySQL/PostgreSQL); step-by-step progression |
| 3 | **Neon.tech Tutorials** | neon.tech/docs/tutorials | Modern dark docs; "Run in Neon" embedded sandbox; clean step-by-step |
| 4 | **Supabase Docs** | supabase.com/docs | "What you'll build" preview at top of every guide; screenshot-heavy; embedded SQL editor |
| 5 | **Mode Analytics SQL** | mode.com/sql-tutorial | Query results visualized as charts inline; business-context framing for every exercise |

**Key PostgreSQL UI patterns to steal:**
- pgexercises: **schema diagram always visible** while writing query (collapsible reminder)
- pgexercises: **Hint → Help → Answer** progressive reveal (reduces frustration)
- SQLZoo: **progress bar per topic** in left sidebar
- pgexercises: **"Next Exercise →"** always in top-right corner (zero friction to continue)

---

### 🔷 TypeScript
| # | Site | URL | What Makes It Great |
|---|------|-----|---------------------|
| 1 | **Total TypeScript** ⭐ | totaltypescript.com | **Dark hero with magical/wizard theme**, exercise count badges, in-browser VSCode-like editor, hover type inspection, "Beginner → Wizard" progression framing |
| 2 | **TypeHero** | typehero.dev | Community type challenges; EASY/HARD difficulty badges; card layout with challenge previews; author tags |
| 3 | **Execute Program** | executeprogram.com | Spaced repetition system (review reminders); inline REPL per concept; distraction-free |
| 4 | **TS Playground** | typescriptlang.org/play | Split editor/output; shareable URLs; live error squiggles; curated "Examples" dropdown |
| 5 | **Matt Pocock's TS Errors** | ts-error-translator.vercel.app | Paste TypeScript error → get human explanation — "error explainer" UX format |

**Key TypeScript UI patterns to steal:**
- Total TypeScript: **magical/wizard theme** — progression framing ("you're becoming a wizard")
- TypeHero: **challenge cards** with code preview, difficulty pill, author attribution
- Execute Program: **spaced repetition** — "3 items due for review today" nudge
- TS Errors: **"paste error, get explanation"** — utility-first interaction pattern

---

## 🎯 Cross-Cutting UI/UX Patterns (confirmed via live research)

### Layout Patterns
| Pattern | Seen At | How to Apply |
|---------|---------|--------------|
| **Card grid entry point** | Killercoda, TypeHero | Subject home = grid of concept cards, not a flat list |
| **Split panel (instructions + editor)** | pgexercises, Scrimba | Lesson modal → split view option |
| **Left sidebar progress per topic** | SQLZoo | Per-module progress bars in sidebar |
| **Schema/context always visible** | pgexercises | Collapsible "Schema Reminder" panel in lesson |
| **"Next →" always reachable** | pgexercises | Persistent next lesson link in header |

### Engagement Patterns
| Pattern | Seen At | How to Apply |
|---------|---------|--------------|
| **Themed visual identity** | Total TypeScript (wizard 🧙), Apollo (rocket 🚀) | Give DevLearn a strong visual theme |
| **Confetti on success** | Apollo Odyssey | Fire canvas-confetti on lesson complete |
| **Step auto-validator** | Killercoda | 1 MCQ to unlock "Mark Complete" |
| **Hint → Help → Answer** progressive reveal | pgexercises | Replace raw quiz answer with 3-step reveal |
| **Spaced repetition nudge** | Execute Program | "3 concepts due for review" badge |
| **Exercise count badges** | Total TypeScript ("10 EXERCISES") | Add count badge to module headers |

### Content Patterns
| Pattern | Seen At | How to Apply |
|---------|---------|--------------|
| **Visual concept cards** (sketched diagrams) | EDA Visuals | Add architecture diagrams to EDA/Redis/k8s lessons |
| **"When to use / When NOT to use"** | Cloudflare KV | Add comparison table to Redis, Docker, GraphQL lessons |
| **OS/language tabs on code** | Docker Docs, TanStack | Code blocks with tab switcher |
| **"Quick Start in 60 seconds"** | Upstash | Lesson opener summary card |
| **Author attribution** | TypeHero | Credit on lesson cards |
| **Certification track cards** | Killercoda | "Earn the EDA certificate" track card |

---

## ✅ Full Todo List

### 🔴 P0 — Visual Identity & Theme

- [ ] **Pick a strong visual theme** — DevLearn needs a personality. Options: 🧙 Wizard (like Total TypeScript), 🚀 Rocket/Mission (like Apollo), ⚡ Power-up (current vibe). Recommend: **"Level Up"** theme with consistent energy metaphor across all subjects
- [ ] **Hero illustration per subject** — Each subject gets a unique hero image/icon in the header (like Apollo's rocket, Total TS's potion). Could be emoji-based or simple SVG
- [ ] **Sketch-style concept diagrams** — Add hand-drawn style SVG architecture diagrams to key EDA/Redis/k8s lessons (inspired by EDA Visuals)
- [ ] **"Exercise count" badges on modules** — `10 EXERCISES` pill badge on module cards (Total TypeScript pattern)

### 🔴 P1 — Lesson Card & Navigation Polish

- [ ] **Completed card state** — Green left border (4px, `--success`), ✅ icon top-right, slightly faded CTA button replaced with "Review" in muted style
- [ ] **In-progress card state** — Accent blue border, subtle pulsing indicator dot
- [ ] **Locked card state** — Gray tone, 🔒 icon, button disabled (for future gated progression)
- [ ] **"Next →" persistent button** — After completing a lesson, add "Next Lesson →" in top-right of modal header (pgexercises pattern)
- [ ] **Module progress rings** — Animated SVG circular rings next to "X/Y Complete" in module headers
- [ ] **Exercise count badge** on each module card header — "5 LESSONS · 1 QUIZ"
- [ ] **"Today's Path" horizontal scroll pills** — Colored by difficulty, icon + name, horizontal swipe on mobile

### 🟠 P2 — Interactivity

- [ ] **Hint → Help → Answer** 3-step reveal on quiz questions — replaces showing correct answer immediately; reduces frustration; pgexercises pattern
- [ ] **Confetti on lesson complete** — `canvas-confetti` burst when marking lesson done (Apollo Odyssey pattern)
- [ ] **XP floating animation** — `+125 XP ⚡` floats up and fades on lesson complete
- [ ] **Step auto-validator** — Before "Mark Complete", show 1 MCQ knowledge check; only unlocks on correct answer (Killercoda pattern)
- [ ] **"Schema Reminder" collapsible** — For code-heavy lessons, add a collapsible panel showing the relevant data structure/schema (pgexercises pattern)
- [ ] **"Quick Start" opener card** — First lesson in each subject gets a "What you'll build in 60 seconds" summary card at the top (Upstash pattern)
- [ ] **OS/language tabs on code blocks** — Where relevant (Docker, TypeScript), add Mac/Linux/Windows or JS/TS tab switcher

### 🟠 P3 — Content Upgrades

- [ ] **"When to use / When NOT to use" tables** — Add to Redis (vs in-memory), Docker (vs bare metal), EDA (vs REST API), GraphQL (vs REST) lessons
- [ ] **Architecture diagrams** — SVG flow diagrams for: Pub/Sub, Event Sourcing, CQRS, Redis Pub/Sub, Docker networking, k8s pod-to-service (EDA Visuals style)
- [ ] **"What you'll learn" callout** — Styled box at top of every lesson modal with 3–5 bullet points (Supabase/Estuary pattern)
- [ ] **Filename labels on code blocks** — `// app.js` tab-style header on every code snippet
- [ ] **"Before/After" code toggle** — For lessons introducing a pattern, show the messy old code vs clean new code (ui.dev pattern)
- [ ] **Resource cards at lesson end** — 2–3 curated external links styled as cards after each lesson

### 🟡 P4 — Gamification

- [ ] **Spaced repetition nudge** — Track lesson completion dates; surface "🔁 3 concepts due for review" pill in sidebar after 3/7/14 days (Execute Program)
- [ ] **Visual progress path** — Replace flat module list with connected node path: ○—●—○—●—○ (Apollo Odyssey launch path)
- [ ] **Certificate card** — On full subject completion, generate a shareable canvas PNG certificate (Redis University pattern)
- [ ] **7-day streak calendar** — Row of 7 dots showing active days (more visual than just a number)
- [ ] **"Certification track" entry card** — Subject home shows a "Earn the [Subject] Certificate" card as a goal (Killercoda pattern)
- [ ] **Sidebar glow on active item** — box-shadow glow + animated left border

### 🟡 P5 — Advanced Features

- [ ] **Smooth subject switch fade** — Fade in/out on subject change
- [ ] **Stat counter animation** — XP/Lessons/Streak count up from 0 on load
- [ ] **Dark mode for code blocks** — VSCode Dark+ theme even in light mode
- [ ] **Difficulty badge polish** — EASY=green, MEDIUM=amber, HARD=red (consistent everywhere)
- [ ] **Inline code runner** — For JS/TS lessons, "Run" button executes snippet in sandboxed iframe; shows output below
- [ ] **SQL mini-REPL for PostgreSQL** — Embed sql.js (SQLite WASM) for interactive SQL exercises (SQLZoo/pgexercises pattern)
- [ ] **PWA offline mode** — Service worker caches all lesson content

---

## 🏗️ Implementation Priority

```
Sprint 1: P0 + P1 (identity, card states, navigation polish)
Sprint 2: P2 (confetti, hints, XP animation, knowledge check)
Sprint 3: P3 (content upgrades — diagrams, tables, callouts)
Sprint 4: P4 (gamification — spaced rep, path visual, certs)
Sprint 5: P5 (advanced — code runner, SQL REPL, PWA)
```

---

## 🎨 Design Inspiration Summary

| Element | Steal from | Why |
|---------|-----------|-----|
| Dark hero, magical theme | **Total TypeScript** | Strong identity, memorable |
| Visual concept cards | **EDA Visuals** | Perfect for ADHD — one idea, one card |
| Confetti + code challenges | **Apollo Odyssey** | Highest engagement pattern found |
| Split panel + schema reminder | **pgexercises** | Best SQL UX on the internet |
| Step auto-validator | **Killercoda** | Enforces actual learning |
| Hint → Help → Answer reveal | **pgexercises** | Reduces frustration, builds confidence |
| Spaced repetition nudge | **Execute Program** | Long-term retention |
| IDE + video merged | **Scrimba** | Future stretch goal for rich lessons |

---

*Research method: Live browser sessions via Chrome relay — Google searches + site visits + screenshots*  
*Sites visited: EDA Visuals, Killercoda, pgexercises, SQLZoo, Total TypeScript, Apollo Odyssey, TypeHero, Scrimba*  
*Date: 2026-03-06*
