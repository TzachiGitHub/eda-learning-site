# DevLearn — Mobile-First Redesign Plan

> Goal: One seamless experience across phone and laptop.  
> Not "mobile support" — a single design that works everywhere.  
> Phone = first-class citizen, not an afterthought.

---

## 🔍 Root Diagnosis

The current site is a **desktop dashboard layout ported to mobile** with patches:
- Sidebar collapses to a hamburger drawer (still thinks like a sidebar)
- Stats row overflows (designed for ~800px+)
- Buttons have inconsistent widths (desktop-relative sizing)
- Progress/XP badges clip off the right edge
- Two visual themes (dark header + light content) create a jarring transition
- No mobile-native navigation pattern (no bottom tab bar)

**The fix is not more media query patches. The fix is rebuilding the layout from 320px up.**

---

## 🎯 Core Principle: Fluid Single Layout

Instead of "desktop layout + mobile overrides", adopt:
- **One responsive layout** using `clamp()`, `min()`, `max()`, fluid grids
- **No fixed pixel widths** on containers — everything in `%`, `fr`, `ch`, or `clamp()`
- **Content-first hierarchy** — most important element (current lesson / resume) always first on screen
- **Bottom tab bar** on mobile instead of hamburger — matches every native app users already know

---

## 📐 New Layout Architecture

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ [⚡ DevLearn]    [🔍] [👤]  │  ← sticky top bar (48px)
├─────────────────────────────┤
│  EDA · Module 2             │  ← current context pill
│  ▓▓▓▓▓▓▓▓▓░░░░  65%        │  ← single progress bar
├─────────────────────────────┤
│                             │
│  📖 Continue Learning       │  ← hero card (full width)
│  2.3 CQRS Pattern           │
│  [▶ Resume]                 │
│                             │
├─────────────────────────────┤
│  Today's Path               │
│  ┌──────┐ ┌──────┐ ┌──────┐│  ← horizontal scroll cards
│  │ 2.1  │ │ 2.2  │ │ 2.3  ││
│  └──────┘ └──────┘ └──────┘│
├─────────────────────────────┤
│  [🏠] [📚] [🏆] [⚡] [👤]  │  ← bottom tab bar (fixed)
└─────────────────────────────┘
```

### Tablet (768px–1024px)
```
┌──────────────────────────────────────┐
│ [⚡ DevLearn]   [tabs row]   [👤]   │  ← sticky top bar
├──────────────────────────────────────┤
│                                      │
│  ┌─────────────────┐  ┌───────────┐  │
│  │  Course content │  │ Progress  │  │
│  │  (lesson cards) │  │ sidebar   │  │
│  └─────────────────┘  └───────────┘  │
│                                      │
└──────────────────────────────────────┘
```

### Desktop (> 1024px)
```
┌─────┬─────────────────────────────────┐
│     │  sticky top bar                 │
│Side │─────────────────────────────────│
│bar  │                                 │
│     │  Main content area              │
│     │                                 │
│     │                                 │
└─────┴─────────────────────────────────┘
```

---

## ✅ Full Todo List

### 🔴 P0 — Foundation (Do First)

- [ ] **Switch to mobile-first CSS** — remove all `@media (max-width: X)` patches; replace with `@media (min-width: X)` progressive enhancement
- [ ] **Single progress bar** — remove the duplicate `#top-progress-bar-container`; keep one clean bar integrated into the top nav
- [ ] **Remove hamburger pattern** — replace with bottom tab bar on mobile, persistent sidebar only on desktop (≥1024px)
- [ ] **Bottom tab bar** — fixed 56px bar: Home / Courses / Progress / Achievements / Settings; icons + labels; active state
- [ ] **Fluid container** — `max-width: min(100%, 1200px); padding: 0 clamp(12px, 4vw, 40px)` — no fixed px widths
- [ ] **Stats row** — use `display: grid; grid-template-columns: repeat(3, 1fr)` — always 3 equal columns, never overflows
- [ ] **XP badge** — `max-width: 90px; font-size: clamp(9px, 2vw, 13px)` — scales with viewport

### 🟠 P1 — Navigation

- [ ] **Top bar** — slim (48px), always visible; left: logo; right: search + avatar; no hamburger
- [ ] **Courses tab** (bottom bar) — tapping opens a full-screen course picker (slide up sheet) showing 8 subject cards in a 2-col grid
- [ ] **Progress tab** — shows current XP, streak, certificates, spaced repetition due
- [ ] **Active subject pill** — below top bar: "[🎯 EDA] [🔴 Redis]..." horizontal scroll of subject pills; tap to switch subject
- [ ] **Lesson modal** — fullscreen on mobile (already done), but add swipe-down to close gesture

### 🟠 P2 — Content Area

- [ ] **Hero "Continue Learning" card** — full-width card; shows current lesson, module progress ring, [Resume] button; always first on screen
- [ ] **Today's Path** — horizontal scroll row of lesson pills (already exists) — make each pill taller (64px min-height), easier to tap
- [ ] **Lesson cards grid** — `grid-template-columns: 1fr` on mobile, `repeat(2, 1fr)` on tablet, `repeat(auto-fill, minmax(280px, 1fr))` on desktop
- [ ] **Module headers** — sticky while scrolling through the module; `position: sticky; top: 48px;`
- [ ] **Tap target sizes** — all buttons ≥ 44px height (Apple HIG / WCAG requirement)
- [ ] **Card title overflow** — `display: -webkit-box; -webkit-line-clamp: 2; overflow: hidden` — 2-line max with ellipsis, no orphaned words

### 🟡 P3 — Visual Consistency

- [ ] **Single color scheme** — remove the jarring dark→light transition between header and content; use one consistent background (`var(--bg)`) throughout
- [ ] **Dark mode default on mobile** — OLED screens + night learning = dark mode should be default; add OS-level `prefers-color-scheme` auto-detect
- [ ] **Consistent card radius** — `clamp(8px, 2vw, 16px)` — tighter on small screens, roomy on desktop
- [ ] **Consistent spacing scale** — define `--space-xs: 4px`, `--space-sm: 8px`, `--space-md: 16px`, `--space-lg: 24px`, `--space-xl: 40px` — use these everywhere, no magic numbers
- [ ] **Font size fluid scale** — `font-size: clamp(13px, 3.5vw, 16px)` for body; `clamp(18px, 5vw, 28px)` for headings
- [ ] **Touch feedback** — add `@media (hover: none)` to disable hover effects on touch; add `:active` states instead
- [ ] **Safe area insets** — `padding-bottom: env(safe-area-inset-bottom)` on bottom bar for iPhone notch/home bar

### 🟡 P4 — Progress Continuity (Phone ↔ Laptop)

- [ ] **localStorage sync is already there** — but add a visual "last studied on [device/time]" indicator on the home screen
- [ ] **URL-based state** — encode current subject + lesson in URL hash (`#eda/2-3`) so sharing a link lands on the right lesson on any device
- [ ] **"Pick up where you left off"** — on load, detect last incomplete lesson and scroll to + highlight it automatically
- [ ] **Export/Import progress** — "Copy progress code" → paste on other device (base64-encoded localStorage dump); no account needed

### 🔵 P5 — Advanced Mobile Features

- [ ] **Pull-to-refresh** — on the home/course view, pull down refreshes progress stats
- [ ] **Swipe between lessons** — swipe left/right in lesson modal to navigate prev/next
- [ ] **Haptic feedback** — `navigator.vibrate(50)` on lesson complete, badge earn (where supported)
- [ ] **PWA install prompt** — show "Add to Home Screen" banner after 3rd visit; tapping installs the PWA
- [ ] **Offline indicator** — top banner when offline; "Reading from cache" subtle badge

---

## 🔧 What Changes vs. What Stays

| | Keep | Change |
|--|------|--------|
| Lesson content | ✅ all of it | — |
| XP / streak / progress | ✅ all data | only the display |
| Dark mode | ✅ | make it the default + auto-detect |
| Lesson modal | ✅ mostly | add swipe-down gesture |
| Sidebar (desktop) | ✅ | hide on mobile, replace with bottom tabs |
| Stats pills | ✅ data | fix sizing to never overflow |
| Today's Path | ✅ | taller tap targets |
| Top progress bar | remove duplicate | keep one, integrate into top bar |
| Hamburger | ❌ remove | replaced by bottom tabs |

---

## 🏗️ Implementation Order

```
Step 1: CSS foundation (mobile-first variables, spacing scale, fluid containers)
Step 2: Bottom tab bar + remove hamburger pattern
Step 3: Top bar simplification + remove duplicate progress bar  
Step 4: Stats row fix (grid, never overflow)
Step 5: Content area (hero card, lesson grid, card titles)
Step 6: Visual consistency (single bg, font scale, touch targets)
Step 7: URL hash state + "pick up where you left off"
Step 8: Swipe gestures + PWA prompt
```

---

*Date: 2026-03-09 | Status: PLAN — awaiting implementation signal*
