const DATA_URL = "data/archive.json";

const state = {
  data: null,
  category: "AD",
  phase: "All",
  search: "",
  variables: {},
  checks: {},
  appClickBound: false,
  previewNoteId: "",
};

const phases = ["Reconnaissance", "Enumeration", "Exploitation", "Post-Exploitation", "Persistence", "Reporting"];
const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

const icons = {
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l8 3v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3z" stroke="currentColor" stroke-width="2"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  copy: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  book: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" stroke="currentColor" stroke-width="2"/></svg>`,
  arrow: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  filter: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 5h18l-7 8v5l-4 2v-7L3 5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
};

async function boot() {
  state.data = await fetchJson(DATA_URL);
  state.category = state.data.categories[0].id;
  hydrateVariables();
  window.addEventListener("hashchange", render);
  render();
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not load ${url}`);
  return response.text();
}

function hydrateVariables() {
  for (const variable of state.data.variables) {
    state.variables[variable.key] = variable.example || `<${variable.key}>`;
  }
}

function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [view, id] = hash.split("/");
  return { view: view || "category", id: decodeURIComponent(id || "") };
}

function shell(content) {
  const current = route();
  const previewHref = current.view === "preview"
    ? (current.id ? `#/note/${encodeURIComponent(current.id)}` : "#/category")
    : (state.previewNoteId ? `#/preview/${encodeURIComponent(state.previewNoteId)}` : "#/preview");
  return `
    <div class="shell">
      <header class="topbar">
        <a class="brand" href="#/category">${icons.shield}<span>Tactical Intelligence Archive</span></a>
        <nav class="nav" aria-label="Categories">
          ${state.data.categories.map((cat) => `<button data-category="${cat.id}" class="${cat.id === state.category ? "active" : ""}">${escapeHtml(cat.label)}</button>`).join("")}
        </nav>
        <div class="top-actions">
          <label class="search">${icons.search}<input id="global-search" type="search" placeholder="Search" value="${escapeAttr(state.search)}" /></label>
          <a class="icon-button" href="${previewHref}" title="Markdown preview">${icons.book}</a>
        </div>
      </header>
      ${content}
    </div>
  `;
}

async function render() {
  const current = route();
  if (current.view === "note" && current.id) {
    await renderNote(current.id);
  } else if (current.view === "preview") {
    await renderPreview(current.id);
  } else {
    syncCategoryFromRoute(current.id);
    renderCategory();
  }
  bindGlobal();
}

function bindGlobal() {
  const search = document.querySelector("#global-search");
  if (search) {
    search.addEventListener("input", () => {
      state.search = search.value;
      if (route().view === "category") renderCategory();
    });
  }

  if (!state.appClickBound) {
    app.addEventListener("click", handleAppClick);
    state.appClickBound = true;
  }
}

function handleAppClick(event) {
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    event.preventDefault();
    state.category = categoryButton.dataset.category;
    state.phase = "All";
    const nextHash = `#/category/${encodeURIComponent(state.category)}`;
    if (location.hash === nextHash) renderCategory();
    else location.hash = nextHash;
    return;
  }

  const phaseButton = event.target.closest("[data-phase]");
  if (phaseButton) {
    event.preventDefault();
    state.phase = phaseButton.dataset.phase;
    renderCategory();
    return;
  }

  const copyButton = event.target.closest("[data-copy]");
  if (!copyButton) return;
  event.preventDefault();
  event.stopPropagation();
  copyText(copyButton.dataset.copy);
}

function renderCategory() {
  const category = getCategory();
  const notes = filteredNotes();
  const byPhase = phases.map((phase) => ({ phase, notes: notes.filter((note) => note.phase === phase) })).filter((group) => group.notes.length);
  const total = state.data.notes.filter((note) => note.category === state.category).length;

  app.innerHTML = shell(`
    <main class="layout">
      <div class="breadcrumb"><a href="#/category">Archive</a><span>›</span><strong>${escapeHtml(category.name)}</strong><span class="cursor"></span></div>
      <section class="hero-row">
        <div>
          <h1>${escapeHtml(category.titleStart)} <span class="accent">${escapeHtml(category.titleAccent)}</span></h1>
          <div class="subtitle">${total} techniques documented</div>
        </div>
        <a class="primary-button" href="#/preview">${icons.plus} New Note</a>
      </section>
      <section class="filters">
        ${icons.filter}
        ${["All", ...phases].map((phase) => `<button class="chip ${state.phase === phase ? "active" : ""}" data-phase="${phase}">${phase}</button>`).join("")}
      </section>
      <section class="archive-grid">
        <aside class="methodology">
          <div class="eyebrow">Methodology</div>
          <div class="phase-list">
            ${phases.map((phase) => phaseLink(phase)).join("")}
          </div>
        </aside>
        <div>
          ${byPhase.length ? byPhase.map(renderPhase).join("") : `<div class="empty">No notes match this view.</div>`}
        </div>
      </section>
    </main>
  `);

}

function phaseLink(phase) {
  const count = state.data.notes.filter((note) => note.category === state.category && note.phase === phase).length;
  return `<button class="phase-link ${state.phase === phase ? "active" : ""}" data-phase="${phase}">
    <span class="node"></span><span>${phase}</span><span class="count">${count || ""}</span>
  </button>`;
}

function renderPhase(group) {
  return `
    <section class="phase-section">
      <div class="section-title"><span>${escapeHtml(group.phase)}</span><span>${group.notes.length}</span></div>
      <div class="cards">${group.notes.map(renderCard).join("")}</div>
    </section>
  `;
}

function renderCard(note) {
  const command = applyVariables(note.commands[0] || "");
  return `
    <a class="card ${note.featured ? "featured" : ""}" href="#/note/${note.id}">
      <div class="card-title-row">
        <h2>${escapeHtml(note.title)}</h2>
        ${note.next?.length ? icons.arrow : ""}
      </div>
      <div class="badges">
        <span class="badge">${escapeHtml(note.phase)}</span>
        <span class="badge severity-${note.severity.toLowerCase()}">${escapeHtml(note.severity)}</span>
      </div>
      <div class="tags">${note.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="command-preview">
        <code class="command-text">›_ ${escapeHtml(command)}</code>
        <button class="copy-button" data-copy="${escapeAttr(command)}" title="Copy command">${icons.copy}</button>
      </div>
    </a>
  `;
}

async function renderNote(id) {
  const note = state.data.notes.find((item) => item.id === id);
  if (!note) {
    renderCategory();
    return;
  }
  state.category = note.category;
  state.previewNoteId = note.id;
  const markdown = await fetchText(note.file);
  const checks = state.checks[id] || new Set();
  const variableKeys = collectVariables(note);

  app.innerHTML = shell(`
    <main class="layout detail-grid">
      <aside class="side-panel">
        <div class="side-panel-inner">
          <div class="eyebrow">Checklist</div>
          <div class="checklist">
            ${note.checklist.map((item, index) => `
              <label class="check">
                <input type="checkbox" data-check="${index}" ${checks.has(index) ? "checked" : ""} />
                <span>${escapeHtml(item)}</span>
              </label>
            `).join("")}
          </div>
          <div class="progress-line"><span id="check-progress">${checks.size}/${note.checklist.length}</span> completed</div>
        </div>
      </aside>
      <article class="note">
        <header class="note-header">
          <div class="breadcrumb"><a href="#/category/${encodeURIComponent(note.category)}">Archive</a><span>›</span><strong>${escapeHtml(getCategory(note.category).name)}</strong><span>›</span><strong>${escapeHtml(note.title)}</strong><span class="cursor"></span></div>
          <h1>${escapeHtml(note.title)}</h1>
          <div class="badges">
            <span class="badge">${escapeHtml(note.category)}</span>
            <span class="badge">${escapeHtml(note.phase)}</span>
            <span class="badge severity-${note.severity.toLowerCase()}">${escapeHtml(note.severity)}</span>
          </div>
          <div class="tags">${note.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </header>
        <section class="note-section content">${renderMarkdown(markdown)}</section>
        <section class="note-section">
          <div class="eyebrow">Command Snippets</div>
          <div class="commands">
            ${note.commands.map((command) => commandBlock(command)).join("")}
          </div>
        </section>
        <section class="note-section">
          <div class="eyebrow">Next Steps</div>
          <div class="next-map">${renderNext(note)}</div>
        </section>
        <section class="note-section">
          <div class="eyebrow">References</div>
          <div class="refs">${note.references.map((ref) => `<a href="${escapeAttr(ref.url)}" target="_blank" rel="noreferrer">↗ ${escapeHtml(ref.label)}</a>`).join("")}</div>
        </section>
      </article>
      <aside class="side-panel">
        <div class="side-panel-inner">
          <div class="eyebrow accent">Variables Terminal</div>
          <p class="subtitle">Set values to auto-populate commands</p>
          <div class="variables">
            ${variableKeys.map((key) => `
              <div class="field">
                <label for="var-${key}">${escapeHtml(key)}</label>
                <input id="var-${key}" data-var="${escapeAttr(key)}" value="${escapeAttr(state.variables[key] || `<${key}>`)}" />
              </div>
            `).join("")}
          </div>
        </div>
      </aside>
    </main>
  `);

  document.querySelectorAll("[data-var]").forEach((input) => {
    input.addEventListener("input", () => {
      state.variables[input.dataset.var] = input.value;
      document.querySelectorAll("[data-command-template]").forEach((block) => {
        const command = applyVariables(block.dataset.commandTemplate);
        block.querySelector("code").textContent = command;
        block.querySelector("[data-copy]").dataset.copy = command;
      });
    });
  });

  document.querySelectorAll("[data-check]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const noteChecks = state.checks[id] || new Set();
      const index = Number(checkbox.dataset.check);
      if (checkbox.checked) noteChecks.add(index);
      else noteChecks.delete(index);
      state.checks[id] = noteChecks;
      document.querySelector("#check-progress").textContent = `${noteChecks.size}/${note.checklist.length}`;
    });
  });
}

function commandBlock(template) {
  const command = applyVariables(template);
  return `
    <div class="command-block" data-command-template="${escapeAttr(template)}">
      <code>${escapeHtml(command)}</code>
      <button class="copy-button" data-copy="${escapeAttr(command)}" title="Copy command">${icons.copy}</button>
    </div>
  `;
}

function renderNext(note) {
  if (!note.next?.length) return `<div class="empty">No linked follow-up yet.</div>`;
  return note.next.map((id) => {
    const next = state.data.notes.find((item) => item.id === id);
    if (!next) return "";
    return `<a class="next-card" href="#/note/${next.id}"><span>${escapeHtml(next.title)}</span>${icons.arrow}</a>`;
  }).join("");
}

async function renderPreview(id) {
  const fallbackNoteId = "web-authentication-testing";
  const exampleNote = state.data.notes.find((note) => note.id === id) || state.data.notes.find((note) => note.id === fallbackNoteId);
  const sample = exampleNote ? await fetchText(exampleNote.file) : `# New Note Title

## Overview
Explain when this technique is useful and what evidence it creates.

## Steps
- Confirm scope and authorization.
- Replace variables like <TARGET_IP>, <DOMAIN>, and <USER>.
- Run the command and save output.

\`\`\`bash
nmap -sV -sC <TARGET_IP> -oA scans/<HOSTNAME>
\`\`\`
`;
  const exampleTitle = exampleNote?.title || "New Note Title";
  const exampleLabel = exampleNote ? `${exampleTitle} markdown` : "Content (Markdown)";
  if (exampleNote) state.previewNoteId = exampleNote.id;

  app.innerHTML = shell(`
    <main class="layout">
      <div class="breadcrumb"><a href="#/category">Archive</a><span>›</span><strong>Contributor Preview</strong><span class="cursor"></span></div>
      <section class="hero-row">
        <div>
          <h1>Markdown <span class="accent">Render Check</span></h1>
          <div class="subtitle">Previewing ${escapeHtml(exampleTitle)} as the render example.</div>
        </div>
        <a class="secondary-button" href="#/category">Back to archive</a>
      </section>
      <section class="preview-grid">
        <div class="editor-card">
          <header><strong>${escapeHtml(exampleLabel)}</strong><button class="secondary-button" id="load-example">Example</button></header>
          <textarea id="markdown-input" spellcheck="false">${escapeHtml(sample)}</textarea>
        </div>
        <div class="editor-card">
          <header><strong>Preview</strong><button class="secondary-button" id="copy-markdown">Copy Markdown</button></header>
          <div class="preview-body content" id="markdown-output"></div>
        </div>
      </section>
    </main>
  `);

  const input = document.querySelector("#markdown-input");
  const output = document.querySelector("#markdown-output");
  const update = () => (output.innerHTML = renderMarkdown(input.value));
  input.addEventListener("input", update);
  document.querySelector("#load-example").addEventListener("click", () => {
    input.value = sample;
    update();
  });
  document.querySelector("#copy-markdown").addEventListener("click", () => copyText(input.value));
  update();
}

function getCategory(id = state.category) {
  return state.data.categories.find((cat) => cat.id === id) || state.data.categories[0];
}

function syncCategoryFromRoute(id) {
  if (!id) {
    state.category = state.data.categories[0].id;
    return;
  }
  const category = state.data.categories.find((cat) => cat.id.toLowerCase() === id.toLowerCase());
  if (category) state.category = category.id;
}

function filteredNotes() {
  const needle = state.search.trim().toLowerCase();
  return state.data.notes.filter((note) => {
    const inCategory = note.category === state.category;
    const inPhase = state.phase === "All" || note.phase === state.phase;
    const haystack = `${note.title} ${note.phase} ${note.severity} ${note.tags.join(" ")} ${note.commands.join(" ")}`.toLowerCase();
    return inCategory && inPhase && (!needle || haystack.includes(needle));
  });
}

function collectVariables(note) {
  const keys = new Set();
  note.commands.forEach((command) => {
    [...command.matchAll(/<([A-Z0-9_]+)>/g)].forEach((match) => keys.add(match[1]));
  });
  return [...keys];
}

function applyVariables(command) {
  return command.replace(/<([A-Z0-9_]+)>/g, (_, key) => state.variables[key] || `<${key}>`);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
  } catch {
    showToast("Clipboard permission blocked");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inCode = false;
  let codeLines = [];
  let listOpen = false;
  let orderedOpen = false;

  const closeLists = () => {
    if (listOpen) html += "</ul>";
    if (orderedOpen) html += "</ol>";
    listOpen = false;
    orderedOpen = false;
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
        codeLines = [];
        inCode = false;
      } else {
        closeLists();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (/^###\s+/.test(line)) {
      closeLists();
      html += `<h3>${inlineMarkdown(line.replace(/^###\s+/, ""))}</h3>`;
    } else if (/^##\s+/.test(line)) {
      closeLists();
      html += `<h2>${inlineMarkdown(line.replace(/^##\s+/, ""))}</h2>`;
    } else if (/^#\s+/.test(line)) {
      closeLists();
      html += `<h2>${inlineMarkdown(line.replace(/^#\s+/, ""))}</h2>`;
    } else if (/^-\s+/.test(line)) {
      if (!listOpen) {
        closeLists();
        html += "<ul>";
        listOpen = true;
      }
      html += `<li>${inlineMarkdown(line.replace(/^-\s+/, ""))}</li>`;
    } else if (/^\d+\.\s+/.test(line)) {
      if (!orderedOpen) {
        closeLists();
        html += "<ol>";
        orderedOpen = true;
      }
      html += `<li>${inlineMarkdown(line.replace(/^\d+\.\s+/, ""))}</li>`;
    } else if (line.trim()) {
      closeLists();
      html += `<p>${inlineMarkdown(line)}</p>`;
    } else {
      closeLists();
    }
  }

  if (inCode) html += `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
  closeLists();
  return html;
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}

boot().catch((error) => {
  app.innerHTML = `<main class="layout"><div class="empty">${escapeHtml(error.message)}</div></main>`;
});
