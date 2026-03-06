# 🎧 DevLearn Audio Mode — Plan

> Goal: Let ADHD learners consume lessons while driving, walking, or doing anything hands-free.  
> Constraint: Zero cost to run, pure frontend (GitHub Pages), no backend.

---

## 🧠 ADHD Research: What Audio Learning Needs

ADHD brains during driving/movement:
- **Can't look at a screen** — audio must be 100% self-contained
- **Lose thread easily** — needs chapter markers + "where am I?" context
- **Get bored with monotone** — voice quality matters more than average
- **Need repetition** — should be easy to replay a section
- **Hate friction** — one tap to start, no settings required
- **Benefit from structure cues** — "Now entering Module 2, Lesson 3..." spoken aloud
- **Car Bluetooth works best** — needs to survive screen lock, background audio

---

## 🔬 Implementation Options (Researched)

### Option A — Web Speech API (Browser TTS) ⭐ Free, Instant
- **API**: `window.speechSynthesis` — built into every modern browser
- **Pros**: Zero cost, works offline, no API key, instant
- **Cons**: Robotic voice quality (varies by device/OS); iOS Safari has quirks with background play
- **Voice quality**: macOS voices (Samantha, Alex) are decent; mobile varies wildly
- **ADHD fit**: ⭐⭐⭐ — works but robotic voice = ADHD brains zone out faster

### Option B — ElevenLabs API (Premium TTS) ⭐⭐⭐⭐⭐ Best quality, free tier
- **API**: `api.elevenlabs.io/v1/text-to-speech/{voice_id}`
- **Free tier**: 10,000 chars/month (enough for ~5-10 lessons per month)
- **Pros**: Human-quality voice; ADHD learners stay engaged much longer
- **Cons**: Requires API key (user provides their own); costs money at scale
- **Strategy**: User pastes their own ElevenLabs API key into settings → stored in localStorage
- **ADHD fit**: ⭐⭐⭐⭐⭐ — human voice keeps attention

### Option C — OpenAI TTS API
- **API**: `api.openai.com/v1/audio/speech`
- **Voices**: alloy, echo, fable, onyx, nova, shimmer
- **Cost**: $0.015/1K chars — relatively cheap
- **Pros**: Great quality (nova/shimmer are warm); many users already have OpenAI keys
- **Cons**: Costs money per use; not free
- **ADHD fit**: ⭐⭐⭐⭐

### Option D — Pre-generate MP3s and host on GitHub
- Generate audio files once, commit them, serve statically
- **Pros**: Offline-ready, no API calls, perfect background audio
- **Cons**: Huge repo size (20+ lessons × multiple subjects = GBs); static = can't update easily
- **ADHD fit**: ⭐⭐⭐ (great playback, terrible maintenance)

### Option E — Google Cloud TTS (WaveNet/Neural2)
- **Free tier**: 1M chars/month on WaveNet, 4M on standard
- **Pros**: High quality WaveNet voices; generous free tier; many language/voice options
- **Cons**: Requires Google Cloud setup; less intuitive for casual users
- **ADHD fit**: ⭐⭐⭐⭐

---

## ✅ Chosen Strategy: Tiered TTS

**Tier 1 (default, zero setup):** Web Speech API — works immediately, no key needed  
**Tier 2 (opt-in, user's key):** ElevenLabs or OpenAI TTS — user pastes key in Settings → gets premium voice  

This means:
- Works for everyone out of the box
- Power users get great voice quality
- No server, no backend, no cost to you

---

## 🎧 Feature Spec: Audio Mode

### Core Player
- **Floating audio player bar** — docked at bottom of screen (like Spotify/podcast apps)
- **Controls**: ⏮ Prev section | ⏪ -15s | ⏯ Play/Pause | ⏩ +15s | ⏭ Next section
- **Speed control**: 0.75× / 1× / 1.25× / 1.5× / 2× (ADHD users often prefer 1.25-1.5×)
- **Progress bar**: Scrubable; shows current word/sentence being read (word highlight)
- **Chapter display**: "Module 2 → Lesson 3: Pub/Sub Pattern" always visible

### ADHD-Specific Features
- **Word-by-word highlight** — sync highlighted word in the lesson text as audio plays (karaoke style)
- **Section announcements** — voice says "Section: Code Example" / "Section: Key Concept" before each block
- **Auto-advance** — option to auto-play next lesson when current ends
- **Sleep timer** — stop after X minutes (for commutes of known length)
- **Replay last 15s** — single tap; critical for when you miss something at a red light
- **"Listen Mode" layout** — simplified full-screen card with just the current sentence + big controls
- **Lock screen controls** — use MediaSession API so audio controls appear on phone lock screen / car dashboard
- **Background audio** — continues playing when screen locks (critical for driving)

### Content Preprocessing
- **Strip code blocks for audio** — don't read out raw code; replace with "[Code example available in lesson]"
- **Strip HTML** — clean lesson text before speaking
- **Add natural pauses** — insert pauses between sections using SSML (for ElevenLabs/Google) or timing for Web Speech
- **Section labels** — inject spoken headers: "Key concept:", "Example:", "Quiz question:"
- **Quiz audio** — read out quiz questions + options; user taps A/B/C/D on screen

### Settings
- **Voice provider selector**: Browser (free) / ElevenLabs / OpenAI
- **API key input** (stored in localStorage, never sent anywhere else)
- **Voice selector** — list available voices for chosen provider
- **Speed preference** — saved per-user
- **Auto-advance toggle**
- **Sleep timer presets**: 10 / 20 / 30 / 45 / 60 min

---

## 🎨 UI Design: Audio Player

```
┌─────────────────────────────────────────────────────────────────┐
│ 🎧  Module 2 · Pub/Sub Pattern                          1.25×  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░  3:42 / 8:15          │
│     ⏮    ⏪15    ⏸    ⏩15    ⏭         😴 Sleep   ⚙️        │
└─────────────────────────────────────────────────────────────────┘
```

- Fixed bottom bar, always visible when audio mode is active
- Glassmorphism style (backdrop-filter: blur) so content is visible behind it
- Tap lesson title → jumps to full-screen "Listen Mode"
- Swipe up → full player with word highlight view

**Listen Mode (full screen):**
```
┌─────────────────────────────┐
│  🎧 Listen Mode             │
│                             │
│  Module 2 · Lesson 3        │
│  Pub/Sub Pattern            │
│                             │
│  "Events are published to   │
│   a channel and subscribers │
│   receive them..."          │  ← current sentence, large text
│                             │
│  ━━━━━━━━━━━━━━━━━━━━       │
│  ⏮   ⏪15   ⏸   ⏩15   ⏭   │
│                             │
│  1.25×    😴 30min    ✕     │
└─────────────────────────────┘
```

---

## 🏗️ Technical Architecture

```
lesson text (HTML)
      ↓
stripForAudio()          ← remove code blocks, HTML tags, add section labels
      ↓
buildQueue()             ← split into sentences/sections → array of utterances
      ↓
AudioEngine              ← manages play/pause/seek/speed/provider
      ↓
  ┌───┴───────────────────────┐
  │                           │
Web Speech API          ElevenLabs / OpenAI API
(free, instant)         (user's key, premium quality)
  │                           │
  └───────────┬───────────────┘
              ↓
      AudioPlayer UI          ← floating bar + listen mode
              ↓
      MediaSession API        ← lock screen / car controls
```

### Files to Create/Modify
- `audio-engine.js` — TTS provider abstraction, queue management, seek logic
- `audio-player.js` — UI component, floating bar, listen mode
- `audio-settings.js` — provider config, voice selector, key storage
- `audio-content.js` — lesson text extraction, cleaning, section splitting
- `styles.css` — add audio player styles (bottom bar, listen mode, word highlight)
- `index.html` — add player HTML, listen mode overlay, settings panel
- `app.js` — hook into lesson open/complete events; add "🎧 Listen" button to lesson cards

---

## ✅ Full Todo List

### 🔴 P0 — Core Audio Playback

- [ ] **`audio-content.js`**: `extractLessonText(lesson)` — strips HTML, removes code blocks (replaces with "Code example: [title]"), strips markdown syntax, returns clean readable string
- [ ] **`audio-content.js`**: `buildSentenceQueue(text)` — splits text into sentences; adds spoken section headers ("Key concept:", "Example:"); returns array of `{text, type}` objects
- [ ] **`audio-engine.js`**: `WebSpeechProvider` class — wraps `window.speechSynthesis`; implements `speak(text)`, `pause()`, `resume()`, `cancel()`, `setRate(r)`, `setVoice(v)`, `onEnd` callback
- [ ] **`audio-engine.js`**: `AudioQueue` class — manages the sentence array; tracks currentIndex; handles `next()`, `prev()`, `seekTo(index)`, `autoAdvance` to next lesson
- [ ] **`audio-player.js`**: Floating bottom bar HTML injection — "🎧 [Lesson name] | ⏮ ⏪ ⏸ ⏩ ⏭ | 1× | ⚙️"
- [ ] **`audio-player.js`**: Wire up all 5 controls (prev/rewind/play/forward/next) to AudioQueue
- [ ] **`audio-player.js`**: Speed selector (0.75/1/1.25/1.5/2×) — updates `speechSynthesis.rate`
- [ ] **`audio-player.js`**: Scrubable progress bar — click to seek to that sentence
- [ ] **`index.html`**: Add `🎧 Listen` button to every lesson card (alongside "Start Lesson")
- [ ] **`styles.css`**: Audio player bottom bar styles — glassmorphism, fixed position, z-index above everything

### 🟠 P1 — Lock Screen & Background Audio

- [ ] **MediaSession API**: Set `navigator.mediaSession.metadata` with lesson title, subject, DevLearn artwork
- [ ] **MediaSession API**: Register `play`, `pause`, `previoustrack`, `nexttrack`, `seekbackward`, `seekforward` action handlers
- [ ] **iOS background audio workaround**: Play a silent audio loop to keep audio session alive when screen locks (known iOS Safari bug)
- [ ] **`audio-player.js`**: Show/hide player bar — visible when audio is loaded; hides when cancelled; persists across subject switches
- [ ] **Auto-resume**: If user navigates away and comes back, restore audio position from `sessionStorage`

### 🟠 P1 — ElevenLabs/OpenAI Provider

- [ ] **`audio-engine.js`**: `ElevenLabsProvider` class — `speak(text)` → fetch `api.elevenlabs.io/v1/text-to-speech/{voiceId}` with user's API key → decode audio → play via `Audio()`
- [ ] **`audio-engine.js`**: `OpenAITTSProvider` class — similar; POST to `api.openai.com/v1/audio/speech`; play MP3 blob
- [ ] **`audio-settings.js`**: Settings modal — provider dropdown (Browser / ElevenLabs / OpenAI); API key input (password field); voice selector (populated via voices list API); save to localStorage
- [ ] **`audio-settings.js`**: On ElevenLabs select → fetch voice list → populate voice picker with names
- [ ] **Key security note in UI**: "Your API key is stored locally in your browser only. Never sent to our servers."
- [ ] **`audio-engine.js`**: Cache TTS audio blobs in `sessionStorage` by sentence hash — avoid re-fetching same sentence

### 🟡 P2 — ADHD-Specific Features

- [ ] **Word highlight (Web Speech)**: Use `SpeechSynthesisUtterance.onboundary` event → highlight current word in lesson text using a `<mark>` wrapper updated in real-time
- [ ] **Listen Mode overlay**: Full-screen overlay showing current sentence in large text (32px+), big controls, blurred background
- [ ] **Section announcements**: Prepend spoken label to each section type ("Key concept: ...", "Here's a code example for: ...", "Quiz time: ...")
- [ ] **Sleep timer**: Dropdown (10/20/30/45/60 min) — starts countdown; shows remaining time; stops audio and shows "Sleep timer ended" toast
- [ ] **Auto-advance toggle**: Setting to auto-play next lesson on completion; announces "Now starting: [next lesson name]"
- [ ] **"Lesson playlist" mode**: From sidebar, right-click subject → "Listen to all lessons" → queues entire subject
- [ ] **Quiz audio mode**: Read quiz question + options aloud; show A/B/C/D tap buttons (large, safe for driving)

### 🟡 P2 — UI Polish

- [ ] **`styles.css`**: Listen Mode overlay — dark background, centered sentence, large readable font, smooth sentence transitions (fade old, fade in new)
- [ ] **`styles.css`**: Word highlight style — yellow background on current word, smooth transition
- [ ] **`styles.css`**: Audio button on lesson cards — teal/audio color (distinct from blue "Start" button)
- [ ] **Lesson card "🎧" badge** — show audio duration estimate next to the lesson time (e.g., "~4 min listen")
- [ ] **"Currently playing" indicator** — lesson card that's being listened to gets a subtle pulsing speaker icon

### 🔵 P3 — Nice to Have

- [ ] **Download lesson as MP3** — for ElevenLabs/OpenAI users; generate full lesson audio and offer download for true offline use
- [ ] **Podcast-style RSS feed** — generate an RSS XML file with lessons as episodes; import into any podcast app (Apple Podcasts, Spotify, Overcast)
- [ ] **Playback history** — show which lessons were listened to (separate from "completed") in a listening log
- [ ] **Speed memory** — remember preferred speed per user; default to 1.25× (research shows ADHD benefits from slightly faster pace)
- [ ] **Ambient sound option** — optional white noise / lo-fi background under the voice (research-backed for ADHD focus)
- [ ] **"Summarize for audio"** — for long lessons, generate a shorter audio version using key bullet points only (manual curation or AI summary)

---

## 🧪 ADHD UX Principles Applied

| Feature | ADHD Principle | Source |
|---------|---------------|--------|
| 1.25× default speed | Faster pace maintains attention | ADHD research: optimal info rate ~1.25× |
| -15s replay button | Forgiveness for distraction | Common in ADHD podcast tools (Overcast) |
| Section announcements | Orientation cues prevent "lost" feeling | Cognitive load theory |
| Word highlight | Dual-channel reinforcement | Multimedia learning principle |
| Sleep timer | Reduces anxiety about "when does this end" | ADHD time blindness research |
| Auto-advance | Removes friction/decision point | ADHD activation energy research |
| Large listen mode controls | Glanceable while driving | Driving safety + ADHD motor control |
| Background audio | Works with natural movement | ADHD benefits from movement while learning |
| Sentence-level queue | Can re-read exact sentence that was missed | Working memory support |

---

## ⚠️ Known Gotchas

1. **iOS Safari kills audio when screen locks** — need silent audio loop hack
2. **Web Speech voices vary wildly** — on Android they're often terrible; prompt user to switch to ElevenLabs
3. **ElevenLabs has rate limits** — cache aggressively; don't re-fetch on replay
4. **Code blocks in lessons** — MUST skip or paraphrase; `console.log("hello")` sounds awful when read aloud
5. **Long lessons** — split into chunks ≤2500 chars for ElevenLabs API limit per call
6. **CORS** — ElevenLabs/OpenAI APIs support browser-side fetch with valid key; no CORS issues

---

*Generated: 2026-03-06 | Status: PLAN ONLY — awaiting implementation signal*
