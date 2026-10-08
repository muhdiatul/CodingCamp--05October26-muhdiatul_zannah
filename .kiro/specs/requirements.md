# Requirements — Life Dashboard

## Project Overview
A client-side personal productivity web app called "Life Dashboard".
Built for CodingCamp assignment by Muhdiatul Zannah (Batch 05 October 2026).

---

## Functional Requirements

### FR-1: Greeting Section
- **FR-1.1** The app shall display the current date in a human-readable format (e.g. "Thursday, October 8, 2026")
- **FR-1.2** The app shall display a live clock that updates every second (HH:MM:SS)
- **FR-1.3** The app shall show a time-based greeting:
  - 05:00–11:59 → "☀️ Good morning"
  - 12:00–16:59 → "🌤️ Good afternoon"
  - 17:00–20:59 → "🌆 Good evening"
  - 21:00–04:59 → "🌙 Good night"
- **FR-1.4** The user shall be able to set a custom name that appears in the greeting (Challenge 2)
- **FR-1.5** The custom name shall be persisted in localStorage and restored on page reload

### FR-2: Focus Timer
- **FR-2.1** The app shall provide a countdown timer defaulting to 25 minutes
- **FR-2.2** The timer shall have three mode presets: Focus (25 min), Short Break (5 min), Long Break (15 min)
- **FR-2.3** The app shall provide Start, Stop, and Reset controls
- **FR-2.4** The timer shall not allow mode switching while it is running
- **FR-2.5** The app shall count completed Focus sessions and display the count
- **FR-2.6** The session count shall reset daily and be persisted in localStorage
- **FR-2.7** The browser tab title shall update with the remaining time while the timer runs
- **FR-2.8** The app shall send a browser notification when the timer reaches zero (if permission granted)

### FR-3: To-Do List
- **FR-3.1** The user shall be able to add a new task via a text input
- **FR-3.2** The user shall be able to mark a task as done using a checkbox
- **FR-3.3** The user shall be able to edit the text of an existing task via a modal dialog
- **FR-3.4** The user shall be able to delete a task
- **FR-3.5** All tasks shall be persisted in localStorage
- **FR-3.6** The user shall be able to filter tasks by: All, Active, Done
- **FR-3.7** A footer summary shall show the count of remaining and completed tasks
- **FR-3.8** The app shall prevent adding a duplicate task (case-insensitive) — Challenge 3
- **FR-3.9** When a duplicate is detected, the input shall shake and a warning message shall appear

### FR-4: Quick Links
- **FR-4.1** The user shall be able to add a quick link with a label and URL
- **FR-4.2** Clicking a link chip shall open the URL in a new browser tab
- **FR-4.3** The user shall be able to delete any saved link
- **FR-4.4** All links shall be persisted in localStorage
- **FR-4.5** The app shall be pre-seeded with 4 default links on first load (Google, GitHub, YouTube, Wikipedia)
- **FR-4.6** Each link chip shall display the site's favicon

### FR-5: Light / Dark Mode (Challenge 1)
- **FR-5.1** The app shall provide a toggle button to switch between dark and light themes
- **FR-5.2** The selected theme shall be persisted in localStorage
- **FR-5.3** The app shall default to dark mode on first load

---

## Non-Functional Requirements

### NFR-1: Technology Stack
- Must use only HTML, CSS, and Vanilla JavaScript (no frameworks)
- No backend server required
- No build tools or package manager required

### NFR-2: Data Storage
- All data stored client-side using the browser localStorage API only

### NFR-3: Browser Compatibility
- Must work in modern versions of Chrome, Firefox, Edge, and Safari
- Must work when opened as a local file (no server needed)

### NFR-4: Performance
- Page must load fast with no noticeable lag on user interactions

### NFR-5: Visual Design
- Clean, minimal, dark-first interface
- Clear visual hierarchy with readable typography
- Responsive layout that works on both desktop and mobile screens

### NFR-6: Accessibility
- All interactive elements must have descriptive `aria-label` attributes
- Colour contrast must be sufficient for readability
- Keyboard navigation must be supported throughout
