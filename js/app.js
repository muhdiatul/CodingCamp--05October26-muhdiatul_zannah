/* ═══════════════════════════════════════════════════
   LIFE DASHBOARD — app.js
   All features: Greeting, Focus Timer, To-Do, Quick Links
   Challenges: Light/Dark mode · Custom name · No duplicates
   Storage: localStorage only  |  No frameworks
   ════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════════
   CHALLENGE 1 — LIGHT / DARK MODE
═══════════════════════════════════════════════ */
const themeToggle   = document.getElementById('theme-toggle');
const STORAGE_THEME = 'ld_theme';

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light');
    themeToggle.textContent          = '☀️';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    document.documentElement.classList.remove('light');
    themeToggle.textContent          = '🌙';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  }
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_THEME) || 'dark';
  applyTheme(saved);
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.classList.contains('light');
  const next    = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(STORAGE_THEME, next);
});

loadTheme();


/* ══════════════════════════════════════════════════
   SECTION 1 — GREETING & CLOCK
   (Challenge 2: custom name woven in)
═══════════════════════════════════════════════ */
const greetingPhrase = document.getElementById('greeting-phrase');
const greetingName   = document.getElementById('greeting-name');
const nameEditBtn    = document.getElementById('name-edit-btn');
const nameForm       = document.getElementById('name-form');
const nameInput      = document.getElementById('name-input');
const nameCancel     = document.getElementById('name-cancel');
const currentTime    = document.getElementById('current-time');
const currentDate    = document.getElementById('current-date');

const STORAGE_NAME = 'ld_username';

function getGreetingPhrase(hour) {
  if (hour >= 5  && hour < 12) return '☀️ Good morning,';
  if (hour >= 12 && hour < 17) return '🌤️ Good afternoon,';
  if (hour >= 17 && hour < 21) return '🌆 Good evening,';
  return '🌙 Good night,';
}

function loadUserName() {
  return localStorage.getItem(STORAGE_NAME) || '';
}

function renderGreetingName() {
  const name = loadUserName();
  greetingName.textContent = name || 'there';
}

function updateClock() {
  const now  = new Date();
  const hour = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');

  currentTime.textContent    = `${String(hour).padStart(2, '0')}:${mins}:${secs}`;
  greetingPhrase.textContent = getGreetingPhrase(hour);

  currentDate.textContent = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
}

/* Show the name editor */
nameEditBtn.addEventListener('click', () => {
  nameInput.value    = loadUserName();
  nameForm.hidden    = false;
  nameEditBtn.hidden = true;
  nameInput.focus();
  nameInput.select();
});

/* Save name */
nameForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem(STORAGE_NAME, name);
  } else {
    localStorage.removeItem(STORAGE_NAME);
  }
  renderGreetingName();
  nameForm.hidden    = true;
  nameEditBtn.hidden = false;
});

/* Cancel name editor */
nameCancel.addEventListener('click', () => {
  nameForm.hidden    = true;
  nameEditBtn.hidden = false;
});

renderGreetingName();
updateClock();
setInterval(updateClock, 1000);


/* ══════════════════════════════════════════════════
   SECTION 2 — FOCUS TIMER
═══════════════════════════════════════════════ */
const timerDisplay  = document.getElementById('timer-display');
const timerStart    = document.getElementById('timer-start');
const timerStop     = document.getElementById('timer-stop');
const timerReset    = document.getElementById('timer-reset');
const timerSessions = document.getElementById('timer-sessions');
const modeTabs      = document.querySelectorAll('.mode-tab');

const STORAGE_TIMER_KEY   = 'ld_timer_sessions';
const STORAGE_TIMER_DATE  = 'ld_timer_date';

let timerInterval  = null;
let timerSeconds   = 25 * 60;   // default 25 min
let timerDuration  = 25 * 60;
let sessionsToday  = 0;

/* ── Restore session count (reset daily) ── */
function loadTimerSessions() {
  const today      = new Date().toDateString();
  const savedDate  = localStorage.getItem(STORAGE_TIMER_DATE);
  if (savedDate === today) {
    sessionsToday = parseInt(localStorage.getItem(STORAGE_TIMER_KEY) || '0', 10);
  } else {
    sessionsToday = 0;
    localStorage.setItem(STORAGE_TIMER_DATE, today);
    localStorage.setItem(STORAGE_TIMER_KEY, '0');
  }
  updateSessionDisplay();
}

function updateSessionDisplay() {
  timerSessions.innerHTML = `Sessions today: <strong>${sessionsToday}</strong>`;
}

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function setActiveMode(minutes) {
  timerDuration = minutes * 60;
  timerSeconds  = timerDuration;
  renderTimerDisplay();
  timerDisplay.className = 'timer-display';
  document.title = `${formatTime(timerSeconds)} — Life Dashboard`;
}

/* Mode tabs */
modeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (timerInterval) return; // don't switch while running
    modeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    setActiveMode(parseInt(tab.dataset.minutes, 10));
  });
});

/* Start */
timerStart.addEventListener('click', () => {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timerSeconds--;
    renderTimerDisplay();
    document.title = `${formatTime(timerSeconds)} — Life Dashboard`;

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerDisplay.className = 'timer-display done';
      timerStart.disabled   = false;
      timerStop.disabled    = true;
      // Count session only for Focus (25 min default or anything ≥20 min)
      if (timerDuration >= 20 * 60) {
        sessionsToday++;
        localStorage.setItem(STORAGE_TIMER_KEY, String(sessionsToday));
        updateSessionDisplay();
      }
      notify('⏱️ Timer finished!', 'Great work — take a break.');
      document.title = 'Life Dashboard';
    }
  }, 1000);

  timerDisplay.className = 'timer-display running';
  timerStart.disabled    = true;
  timerStop.disabled     = false;
});

/* Stop */
timerStop.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerDisplay.className = 'timer-display';
  timerStart.disabled    = false;
  timerStop.disabled     = true;
  document.title         = 'Life Dashboard';
});

/* Reset */
timerReset.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds  = timerDuration;
  renderTimerDisplay();
  timerDisplay.className = 'timer-display';
  timerStart.disabled    = false;
  timerStop.disabled     = true;
  document.title         = 'Life Dashboard';
});

/* Browser notification helper */
function notify(title, body) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') new Notification(title, { body });
    });
  }
}

loadTimerSessions();
renderTimerDisplay();


/* ══════════════════════════════════════════════════
   SECTION 3 — TO-DO LIST
═══════════════════════════════════════════════ */
const todoForm   = document.getElementById('todo-form');
const todoInput  = document.getElementById('todo-input');
const todoList   = document.getElementById('todo-list');
const todoFooter = document.getElementById('todo-footer');
const filterBtns = document.querySelectorAll('.filter-btn');

const editModal  = document.getElementById('edit-modal');
const editInput  = document.getElementById('edit-input');
const editSave   = document.getElementById('edit-save');
const editCancel = document.getElementById('edit-cancel');

const STORAGE_TODOS = 'ld_todos';

let todos       = [];
let activeFilter = 'all';
let editingId    = null;

/* ── Persistence ── */
function saveTodos() {
  localStorage.setItem(STORAGE_TODOS, JSON.stringify(todos));
}

function loadTodos() {
  try {
    todos = JSON.parse(localStorage.getItem(STORAGE_TODOS)) || [];
  } catch {
    todos = [];
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ── Render ── */
function renderTodos() {
  todoList.innerHTML = '';

  const filtered = todos.filter(t => {
    if (activeFilter === 'active') return !t.done;
    if (activeFilter === 'done')   return  t.done;
    return true;
  });

  if (filtered.length === 0) {
    todoList.innerHTML = `<li class="empty-state">No tasks here yet.</li>`;
  } else {
    filtered.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;
      li.dataset.id = todo.id;
      li.setAttribute('role', 'listitem');

      li.innerHTML = `
        <input
          type="checkbox"
          class="todo-checkbox"
          aria-label="Mark as done"
          ${todo.done ? 'checked' : ''}
        />
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <div class="todo-actions" role="group" aria-label="Task actions">
          <button class="btn-icon edit-btn"   title="Edit task"   aria-label="Edit task">✏️</button>
          <button class="btn-icon delete-btn" title="Delete task" aria-label="Delete task">🗑️</button>
        </div>
      `;

      // Checkbox toggle
      li.querySelector('.todo-checkbox').addEventListener('change', () => toggleTodo(todo.id));

      // Edit
      li.querySelector('.edit-btn').addEventListener('click', () => openEdit(todo.id));

      // Delete
      li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));

      todoList.appendChild(li);
    });
  }

  // Footer summary
  const total  = todos.length;
  const done   = todos.filter(t => t.done).length;
  const active = total - done;
  todoFooter.textContent = total
    ? `${active} remaining · ${done} done`
    : '';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ── Duplicate check (Challenge 3) ── */
function isDuplicate(text, excludeId = null) {
  const lower = text.trim().toLowerCase();
  return todos.some(t => t.text.toLowerCase() === lower && t.id !== excludeId);
}

function showDuplicateWarning(inputEl) {
  // Remove any existing warning first
  const existing = inputEl.parentElement.querySelector('.duplicate-warning');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className   = 'duplicate-warning';
  msg.textContent = '⚠️ This task already exists.';
  inputEl.parentElement.after(msg);

  // Shake the input
  inputEl.classList.remove('input-shake');
  // Force reflow so re-adding the class re-triggers the animation
  void inputEl.offsetWidth;
  inputEl.classList.add('input-shake');
  inputEl.addEventListener('animationend', () => inputEl.classList.remove('input-shake'), { once: true });

  // Auto-remove warning after 2.5 s
  setTimeout(() => msg.remove(), 2500);
}

/* ── CRUD ── */
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return false;

  // Challenge 3: prevent duplicates
  if (isDuplicate(trimmed)) {
    showDuplicateWarning(todoInput);
    return false;
  }

  todos.unshift({ id: generateId(), text: trimmed, done: false });
  saveTodos();
  renderTodos();
  return true;
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

/* ── Edit Modal ── */
function openEdit(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  editingId          = id;
  editInput.value    = todo.text;
  editModal.hidden   = false;
  editInput.focus();
  editInput.select();
}

function closeEdit() {
  editModal.hidden = true;
  editingId        = null;
  editInput.value  = '';
}

editSave.addEventListener('click', () => {
  const newText = editInput.value.trim();
  if (!newText || !editingId) return;

  // Challenge 3: prevent renaming to an existing task
  if (isDuplicate(newText, editingId)) {
    showDuplicateWarning(editInput);
    return;
  }

  const todo = todos.find(t => t.id === editingId);
  if (todo) {
    todo.text = newText;
    saveTodos();
    renderTodos();
  }
  closeEdit();
});

editCancel.addEventListener('click', closeEdit);

// Close modal on overlay click
editModal.addEventListener('click', e => {
  if (e.target === editModal) closeEdit();
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !editModal.hidden) closeEdit();
});

// Save on Enter key in edit input
editInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') editSave.click();
});

/* ── Form submit ── */
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const added = addTodo(todoInput.value);
  if (added) todoInput.value = '';
});

/* ── Filter buttons ── */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderTodos();
  });
});

loadTodos();
renderTodos();


/* ══════════════════════════════════════════════════
   SECTION 4 — QUICK LINKS
═══════════════════════════════════════════════ */
const linkForm      = document.getElementById('link-form');
const linkNameInput = document.getElementById('link-name-input');
const linkUrlInput  = document.getElementById('link-url-input');
const linksGrid     = document.getElementById('links-grid');

const STORAGE_LINKS = 'ld_links';

let links = [];

/* ── Default links seeded on first load ── */
const DEFAULT_LINKS = [
  { id: 'dl1', label: 'Google',   url: 'https://www.google.com'   },
  { id: 'dl2', label: 'GitHub',   url: 'https://github.com'       },
  { id: 'dl3', label: 'YouTube',  url: 'https://www.youtube.com'  },
  { id: 'dl4', label: 'Wikipedia',url: 'https://www.wikipedia.org'},
];

/* ── Persistence ── */
function saveLinks() {
  localStorage.setItem(STORAGE_LINKS, JSON.stringify(links));
}

function loadLinks() {
  try {
    const stored = localStorage.getItem(STORAGE_LINKS);
    links = stored ? JSON.parse(stored) : [...DEFAULT_LINKS];
  } catch {
    links = [...DEFAULT_LINKS];
  }
}

/* ── Render ── */
function getFaviconUrl(url) {
  try {
    const origin = new URL(url).origin;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(origin)}&sz=32`;
  } catch {
    return null;
  }
}

function renderLinks() {
  linksGrid.innerHTML = '';

  if (links.length === 0) {
    linksGrid.innerHTML = `<p class="empty-state">No links saved yet.</p>`;
    return;
  }

  links.forEach(link => {
    const chip = document.createElement('div');
    chip.className = 'link-chip';
    chip.setAttribute('role', 'link');
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('aria-label', `Open ${link.label}`);
    chip.dataset.id = link.id;

    const faviconUrl = getFaviconUrl(link.url);
    const faviconHtml = faviconUrl
      ? `<img src="${faviconUrl}" class="link-favicon" alt="" aria-hidden="true" onerror="this.style.display='none'">`
      : '';

    chip.innerHTML = `
      ${faviconHtml}
      <span class="link-label">${escapeHtml(link.label)}</span>
      <button class="link-delete-btn" title="Remove link" aria-label="Remove ${escapeHtml(link.label)}">✕</button>
    `;

    // Open link on click (excluding delete button)
    chip.addEventListener('click', e => {
      if (e.target.closest('.link-delete-btn')) return;
      window.open(link.url, '_blank', 'noopener,noreferrer');
    });

    // Keyboard: Enter or Space opens link
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(link.url, '_blank', 'noopener,noreferrer');
      }
    });

    // Delete
    chip.querySelector('.link-delete-btn').addEventListener('click', e => {
      e.stopPropagation();
      deleteLink(link.id);
    });

    linksGrid.appendChild(chip);
  });
}

/* ── CRUD ── */
function addLink(label, url) {
  const trimLabel = label.trim();
  let   trimUrl   = url.trim();

  if (!trimLabel || !trimUrl) return false;

  // Auto-prepend https if missing
  if (!/^https?:\/\//i.test(trimUrl)) {
    trimUrl = 'https://' + trimUrl;
  }

  // Basic URL validation
  try { new URL(trimUrl); } catch { return false; }

  links.push({ id: generateId(), label: trimLabel, url: trimUrl });
  saveLinks();
  renderLinks();
  return true;
}

function deleteLink(id) {
  links = links.filter(l => l.id !== id);
  saveLinks();
  renderLinks();
}

/* ── Form submit ── */
linkForm.addEventListener('submit', e => {
  e.preventDefault();
  const ok = addLink(linkNameInput.value, linkUrlInput.value);
  if (ok) {
    linkNameInput.value = '';
    linkUrlInput.value  = '';
    linkNameInput.focus();
  } else {
    // Shake the URL input to signal invalid input
    linkUrlInput.style.borderColor = '#f87171';
    setTimeout(() => { linkUrlInput.style.borderColor = ''; }, 1500);
  }
});

loadLinks();
renderLinks();
