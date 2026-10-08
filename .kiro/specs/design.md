# Design — Life Dashboard

## Architecture Overview

This is a single-page, client-side web application with no build step and no server.
All logic lives in one HTML file, one CSS file, and one JavaScript file.

```
index.html          ← app shell & markup
css/style.css       ← all styling, design tokens, responsive rules
js/app.js           ← all JavaScript logic (4 sections)
```

---

## UI Layout

```
┌─────────────────────────────────────────────────────┐
│                   HEADER / GREETING                  │
│   [Date]   Good morning, Muhdiatul ✏️   [🌙 toggle] │
│                    HH : MM : SS                      │
│              [name input form — hidden]              │
└─────────────────────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  FOCUS TIMER │  │  TO-DO LIST  │  │ QUICK LINKS  │
│   25:00      │  │ [input] [Add]│  │ [label][url] │
│ Focus|Break  │  │ All|Active.. │  │ [Add]        │
│ Start Stop.. │  │ • task 1     │  │ [Google] ... │
│ Sessions: 0  │  │ • task 2     │  │              │
└──────────────┘  └──────────────┘  └──────────────┘
```

The three feature cards sit in a CSS Grid (`auto-fit, minmax(320px, 1fr)`) that collapses to a single column on narrow screens.

---

## Design Tokens (CSS Custom Properties)

All colours and spacing are defined as CSS variables on `:root` so the light/dark theme toggle only needs to override values on `html.light`.

| Token | Dark value | Light value |
|---|---|---|
| `--bg-page` | `#0f1117` | `#f0f2f8` |
| `--bg-card` | `#1a1d27` | `#ffffff` |
| `--border` | `#2a2e42` | `#d4d8ec` |
| `--accent` | `#7c6af7` | `#7c6af7` (same) |
| `--text-primary` | `#e8eaf6` | `#1a1d2e` |
| `--text-secondary` | `#8b90a8` | `#4a5068` |

---

## Component Design

### Greeting Header
- Full-width header with a radial purple glow via `::before` pseudo-element
- Greeting phrase (`<span id="greeting-phrase">`) + name button (`<button id="name-edit-btn">`) sit inside an `<h1>` with gradient text (`-webkit-background-clip: text`)
- Name editor is an inline `<form>` that appears/disappears via the `hidden` attribute

### Focus Timer
- Large monospace countdown number centred in the card
- Three pill-shaped mode tabs control the duration
- Timer state drives CSS class changes: `.running` (purple glow), `.done` (green)
- Session count resets daily by comparing `new Date().toDateString()` to a stored value

### To-Do List
- Tasks stored as an array of `{ id, text, done }` objects in localStorage
- Rendered list re-built on every state change (`renderTodos()`)
- Edit opens a modal overlay (`<div role="dialog">`) with a pre-filled input
- Duplicate detection: `todos.some(t => t.text.toLowerCase() === input.toLowerCase())`
- Shake animation (`@keyframes shake`) + inline warning `<p>` on duplicate attempt

### Quick Links
- Links stored as `{ id, label, url }` objects
- Each chip fetches its favicon via Google's S2 favicon service:
  `https://www.google.com/s2/favicons?domain=<origin>&sz=32`
- Delete button revealed on hover via CSS (`display: none` → `display: flex`)

### Light / Dark Mode
- Theme class `light` added/removed on `<html>` element
- All colour tokens re-declared under `html.light { }` in CSS
- Toggle button shows 🌙 in dark mode, ☀️ in light mode

---

## Data Flow

```
User Action
    │
    ▼
Event Listener (JS)
    │
    ├─► Update in-memory array (todos / links)
    │
    ├─► localStorage.setItem(...)   ← persist
    │
    └─► renderXxx()                 ← re-draw DOM
```

On page load, each section reads from localStorage first, then renders.

---

## localStorage Schema

```js
// Theme
ld_theme           → "dark" | "light"

// Username
ld_username        → "Muhdiatul"

// To-Do tasks
ld_todos           → JSON array
  [{ id: "abc123", text: "Buy groceries", done: false }, ...]

// Quick links
ld_links           → JSON array
  [{ id: "dl1", label: "GitHub", url: "https://github.com" }, ...]

// Timer sessions
ld_timer_sessions  → "3"          (number as string)
ld_timer_date      → "Thu Oct 08 2026"
```

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| > 680px | 3-column grid, full link form layout |
| ≤ 680px | Stacked cards, link form 2-column |
| ≤ 420px | Single column everything, todo form stacks vertically |

---

## Accessibility Decisions
- All buttons have `aria-label` for screen readers
- Timer display uses `aria-live="polite"` so screen readers announce time changes
- Modal uses `role="dialog"` and `aria-modal="true"`
- Keyboard users can navigate links with Tab and activate with Enter/Space
- Form inputs have associated `aria-label` attributes (no visible `<label>` needed)
