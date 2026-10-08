# Tasks — Life Dashboard

Implementation tasks for the Life Dashboard project.
All tasks have been completed as part of the CodingCamp assignment.

---

## Phase 1 — Project Setup

- [x] Create project folder structure (`css/`, `js/`)
- [x] Create `index.html` with semantic HTML shell
- [x] Create `css/style.css` with CSS reset and design tokens
- [x] Create `js/app.js` with `'use strict'` and section banners
- [x] Create `.kiro/steering/project.md`
- [x] Create `.kiro/specs/` documentation files

---

## Phase 2 — Core Features (MVP)

### Greeting Section
- [x] Display current date using `toLocaleDateString()`
- [x] Display live clock updating every second with `setInterval`
- [x] Show time-based greeting (morning / afternoon / evening / night)

### Focus Timer
- [x] Render countdown from 25:00 in monospace display
- [x] Implement Start button to begin countdown
- [x] Implement Stop button to pause countdown
- [x] Implement Reset button to return to initial duration
- [x] Add Focus / Short Break / Long Break mode tabs
- [x] Update browser tab title with remaining time
- [x] Count and display completed Focus sessions
- [x] Persist and reset session count daily via localStorage
- [x] Send browser notification when timer finishes

### To-Do List
- [x] Add task via form submit
- [x] Render task list from array
- [x] Toggle task done/undone via checkbox
- [x] Delete task with 🗑️ button
- [x] Edit task via modal dialog
- [x] Save and load tasks from localStorage
- [x] Filter tasks: All / Active / Done
- [x] Show remaining and done count in footer

### Quick Links
- [x] Add link with label and URL via form
- [x] Render link chips in a responsive grid
- [x] Open link in new tab on chip click
- [x] Delete link with ✕ button (shown on hover)
- [x] Save and load links from localStorage
- [x] Seed default links on first load (Google, GitHub, YouTube, Wikipedia)
- [x] Fetch and display site favicon on each chip

---

## Phase 3 — Challenge Features

### Challenge 1: Light / Dark Mode
- [x] Add theme toggle button to header
- [x] Define light theme token overrides under `html.light` in CSS
- [x] Persist selected theme in localStorage
- [x] Restore theme on page load

### Challenge 2: Custom Name in Greeting
- [x] Add name edit button in greeting heading
- [x] Show inline name input form on button click
- [x] Save custom name to localStorage
- [x] Restore and display custom name on page load

### Challenge 3: Prevent Duplicate Tasks
- [x] Implement `isDuplicate()` case-insensitive check before adding task
- [x] Show shake animation on input when duplicate detected
- [x] Show warning message that auto-dismisses after 2.5 seconds
- [x] Apply duplicate check inside Edit modal as well

---

## Phase 4 — Publishing

- [x] Initialize Git repository
- [x] Connect to GitHub remote repository
- [x] Commit all source files including `.kiro/` folder
- [x] Push to `main` branch on GitHub
- [x] Enable GitHub Pages from Settings → Pages → main branch
- [x] Verify live URL is accessible

**Live URL:** https://muhdiatul.github.io/CodingCamp--05October26-muhdiatul_zannah/
