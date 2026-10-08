# Life Dashboard — Project Steering

## Project Overview
A client-side "To-Do List Life Dashboard" web app built as a CodingCamp assignment.
No backend, no frameworks — pure HTML, CSS, and Vanilla JavaScript.

**Student:** Muhdiatul Zannah  
**Batch:** CodingCamp — 05 October 2026

---

## Tech Stack
- **HTML5** — semantic structure (`index.html`)
- **CSS3** — styling with custom properties (`css/style.css`)
- **Vanilla JavaScript (ES6+)** — all logic (`js/app.js`)
- **localStorage** — client-side data persistence only
- No build tools, no package manager, no frameworks

---

## Folder Structure
```
project-root/
├── index.html          ← single HTML entry point
├── css/
│   └── style.css       ← only 1 CSS file allowed
├── js/
│   └── app.js          ← only 1 JS file allowed
├── .kiro/
│   └── steering/
│       └── project.md  ← this file
└── README.md
```

### Rules
- Only **1 file** inside `css/`
- Only **1 file** inside `js/`
- No external CSS frameworks (Bootstrap, Tailwind, etc.)
- No JavaScript frameworks or libraries (React, Vue, jQuery, etc.)

---

## Features Implemented

### MVP Features
| Feature | Status |
|---|---|
| Greeting with time & date | ✅ Done |
| Time-based greeting message | ✅ Done |
| Focus Timer (25 min) | ✅ Done |
| Timer start / stop / reset | ✅ Done |
| To-Do: add tasks | ✅ Done |
| To-Do: edit tasks | ✅ Done |
| To-Do: mark as done | ✅ Done |
| To-Do: delete tasks | ✅ Done |
| To-Do: localStorage save | ✅ Done |
| Quick Links with localStorage | ✅ Done |

### Challenge Features (3 of 5)
| Challenge | Status |
|---|---|
| Light / Dark mode toggle | ✅ Done |
| Custom name in greeting | ✅ Done |
| Prevent duplicate tasks | ✅ Done |
| Change Pomodoro time | ⬜ Not chosen |
| Sort tasks | ⬜ Not chosen |

---

## localStorage Keys
| Key | Purpose |
|---|---|
| `ld_theme` | Saved theme preference (dark/light) |
| `ld_username` | User's custom name for greeting |
| `ld_todos` | Array of to-do task objects |
| `ld_links` | Array of quick link objects |
| `ld_timer_sessions` | Focus session count for today |
| `ld_timer_date` | Date string to reset session count daily |

---

## Coding Standards
- Use `'use strict'` at the top of JS files
- Indent with **2 spaces**
- Use `const` by default, `let` only when reassignment is needed, never `var`
- All user-generated strings must be sanitized with `escapeHtml()` before rendering to the DOM
- Functions should be small and single-purpose
- Group related code with section comment banners like:
  ```
  /* ══ SECTION NAME ══ */
  ```
- Accessibility: interactive elements must have `aria-label` attributes

---

## Browser Compatibility
Must work on: Chrome, Firefox, Edge, Safari (latest versions).
Can be opened directly as a local HTML file — no server required.
