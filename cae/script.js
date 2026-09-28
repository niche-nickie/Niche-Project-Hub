// ============================================================
// CAE · NBAA-BACE 2026 — project dashboard data & render
// ============================================================

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

// ---------- Overview ----------
const OVERVIEW = [
  { label: 'Booth', value: '3732' },
  { label: 'Footprint', value: '40 × 70 ft Island' },
  { label: 'Venue', value: 'LVCC West Hall' },
  { label: 'Dates', value: 'Oct 20–22, 2026' },
];

// ---------- Timeline ----------
// cat: client | production | freeman | freight | show
const TIMELINE = [
  { date: '2026-09-07', title: 'Client confirms project / PO signed', cat: 'client' },
  { date: '2026-09-10', title: 'Production drawings issued', cat: 'client' },
  { date: '2026-09-12', title: 'Production starts (3-week build)', cat: 'production' },
  { date: '2026-09-16', title: 'Freeman discount deadline', cat: 'freeman' },
  { date: '2026-09-23', title: 'Graphics final files due', cat: 'client' },
  { date: '2026-10-09', title: 'Production complete / QC check', cat: 'production' },
  { date: '2026-10-10', title: 'Ship out (La Puente → Las Vegas)', cat: 'freight' },
  { date: '2026-10-14', title: 'Freight arrives show site (direct)', cat: 'freight' },
  { date: '2026-10-14', title: 'TARGET MOVE-IN (Blue Zone)', cat: 'show' },
  { date: '2026-10-20', title: 'Show opens', cat: 'show' },
  { date: '2026-10-22', title: 'Show closes / Dismantle begins', cat: 'show' },
  { date: '2026-10-24', title: 'Move-out complete (5:00 PM)', cat: 'show' },
];

const CAT_LABEL = {
  client: 'Client / Contract',
  production: 'Production',
  freeman: 'Freeman / Vendor',
  freight: 'Freight / Logistics',
  show: 'Show / On-Site',
};

const CAT_COLOR = {
  client: '#C9B98E',
  production: '#7BA6D9',
  freeman: '#B78AD9',
  freight: '#7BD9B0',
  show: '#D98A8A',
};

// ---------- Firebase (multi-user sync, shared with CoCreate) ----------
const FB_CONFIG = {
  apiKey: 'AIzaSyA_WfffoyU5_ESBmUiQ680_AmNsSNydmek',
  authDomain: 'cocreate2026-62530.firebaseapp.com',
  projectId: 'cocreate2026-62530',
  storageBucket: 'cocreate2026-62530.firebasestorage.app',
  messagingSenderId: '1036108803620',
  appId: '1:1036108803620:web:ed6a8137a2b4c072e632b1',
};
let FB_DB = null;
function initFirebase() {
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(FB_CONFIG);
      FB_DB = firebase.firestore();
    }
  } catch (e) { console.warn('Firebase init failed:', e); }
}

// ---------- Loose Items Checklist (Firestore sync + editable) ----------
// Only items we need to prepare / procure / track. Wall structure (built-in) is excluded.
const CHECKLIST_DOC = 'cae_checklist';
const CHECKLIST_ID = 'checklist';

const DEFAULT_CHECKLIST_RAW = [
  { cat: 'Electronics', items: [
    { name: '65" TV', qty: '×2' },
    { name: '50" TV', qty: '×2' },
    { name: '55" Touchscreen', qty: '×1' },
    { name: 'LED Wall Header panels (500×500)', qty: '×52' },
    { name: 'LED Wall panels (500×500)', qty: '×30' },
    { name: 'Air Conditioner', qty: '×2' },
  ]},
  { cat: 'Lighting', items: [
    { name: 'Hanging Light', qty: '×2' },
    { name: 'Metal LED Diffuser', qty: '×8' },
    { name: 'Standard Recess Light', qty: '×32' },
    { name: 'Side-Facing LED Diffuser', qty: '×2' },
  ]},
  { cat: 'Appliances', items: [
    { name: 'Glass Mini Fridge', qty: '×2' },
    { name: 'Mini Fridge', qty: '×1' },
    { name: 'Refrigerator', qty: '×1' },
    { name: 'Sink', qty: '×1' },
  ]},
  { cat: 'Furniture — AMG', items: [
    { name: 'Meeting Chair', qty: '×18' },
    { name: 'Black Bar Stool', qty: '×12' },
  ]},
  { cat: 'Furniture — designer8 (paid by client)', items: [
    { name: 'Media Lounge furniture', qty: '×5' },
    { name: 'Main Lounge tables + chairs + pillows', qty: '×16' },
    { name: 'Poe sectional (cream)', qty: '×1' },
    { name: 'Dune coffee table', qty: '×1' },
    { name: 'High tables', qty: '×12' },
    { name: 'Marlo barstool', qty: '×3' },
    { name: 'High chairs', qty: '×12' },
    { name: 'Meeting Room chairs', qty: '×32' },
    { name: 'Backoffice IBM table', qty: '×2' },
    { name: 'Backoffice chair', qty: '×4' },
  ]},
  { cat: 'Accessories', items: [
    { name: 'Neon Sign', qty: '×1' },
    { name: 'Moss', qty: '×2' },
    { name: 'Truss', qty: '×2' },
    { name: 'Sliding Glass Door', qty: '×2' },
    { name: 'Rear CAE Hanging Lightbox', qty: '×1' },
    { name: 'Rigging Point', qty: '×1' },
  ]},
  { cat: 'Graphics', items: [
    { name: 'Fabric graphics (banner / wall)', qty: '×10' },
    { name: 'PVC panels (3mm)', qty: '×7' },
    { name: 'ULTRAFOAM logos', qty: '×13' },
  ]},
  { cat: 'Flooring', items: [
    { name: 'Carpet (light gray)', qty: '2800 sf' },
  ]},
];

function seedIds(list) {
  return list.map((g, gi) => ({
    id: 'cat-' + gi,
    cat: g.cat,
    items: g.items.map((it, ii) => ({
      id: 'cat-' + gi + '-item-' + ii,
      name: it.name,
      qty: it.qty,
      checked: false,
    })),
  }));
}

const DEFAULT_CHECKLIST = seedIds(DEFAULT_CHECKLIST_RAW);
let CHECKLIST = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST));
let EDIT_MODE = false;

function newId(prefix) {
  return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------- Firestore persistence ----------
function persistChecklist() {
  if (!FB_DB) return;
  FB_DB.collection(CHECKLIST_DOC).doc(CHECKLIST_ID).set({
    categories: CHECKLIST,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }).catch(e => console.warn('checklist persist failed:', e));
}

function loadChecklist(cb) {
  if (!FB_DB) { cb(); return; }
  FB_DB.collection(CHECKLIST_DOC).doc(CHECKLIST_ID).get().then(snap => {
    if (snap.exists && snap.data().categories && snap.data().categories.length) {
      CHECKLIST = snap.data().categories;
    } else {
      // Firestore empty → seed defaults
      persistChecklist();
    }
    cb();
  }).catch(() => cb());
}

// Real-time listener — skip re-render when the remote snapshot equals our local write.
function watchChecklist() {
  if (!FB_DB) return;
  FB_DB.collection(CHECKLIST_DOC).doc(CHECKLIST_ID).onSnapshot(snap => {
    if (!snap.exists) return;
    const remote = snap.data().categories || [];
    if (JSON.stringify(remote) === JSON.stringify(CHECKLIST)) return;
    CHECKLIST = remote;
    renderChecklist();
  });
}

// ---------- Checklist mutations ----------
function toggleCheck(itemId, checked) {
  CHECKLIST.forEach(g => g.items.forEach(it => { if (it.id === itemId) it.checked = checked; }));
  renderChecklist();
  persistChecklist();
}

function toggleEditMode() {
  EDIT_MODE = !EDIT_MODE;
  document.body.classList.toggle('editing', EDIT_MODE);
  const btn = document.getElementById('btn-edit-toggle');
  if (btn) {
    btn.textContent = EDIT_MODE ? '✓ Done Editing' : '✎ Edit Checklist';
    btn.classList.toggle('editing-active', EDIT_MODE);
  }
  renderChecklist();
}

function addItem(catId) {
  CHECKLIST.forEach(g => { if (g.id === catId) g.items.push({ id: newId('item'), name: 'New item', qty: '×1', checked: false }); });
  renderChecklist();
  persistChecklist();
}

function removeItem(itemId) {
  if (!confirm('Remove this item?')) return;
  CHECKLIST.forEach(g => { g.items = g.items.filter(it => it.id !== itemId); });
  renderChecklist();
  persistChecklist();
}

function addCategory() {
  CHECKLIST.push({ id: newId('cat'), cat: 'New category', items: [] });
  renderChecklist();
  persistChecklist();
}

function removeCategory(catId) {
  if (!confirm('Remove this category and all its items?')) return;
  CHECKLIST = CHECKLIST.filter(g => g.id !== catId);
  renderChecklist();
  persistChecklist();
}

function editField(kind, id, field, el) {
  const val = el.textContent.trim();
  if (kind === 'item') {
    CHECKLIST.forEach(g => g.items.forEach(it => { if (it.id === id) it[field] = val; }));
  } else if (kind === 'cat') {
    CHECKLIST.forEach(g => { if (g.id === id) g[field] = val; });
  }
  persistChecklist();
}

function editAttrs(kind, id, field) {
  if (!EDIT_MODE) return '';
  return ` contenteditable="true" data-kind="${kind}" data-id="${id}" data-field="${field}" onclick="event.stopPropagation()"`;
}

// ---------- Render helpers ----------
function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fmtMoney(n) {
  if (n == null) return '';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

function renderOverview() {
  const el = document.getElementById('overview');
  el.innerHTML = OVERVIEW.map(o => `
    <div class="ov-card">
      <div class="ov-label">${o.label}</div>
      <div class="ov-value">${o.value}</div>
    </div>`).join('');
}

function renderQuote() {
  const el = document.getElementById('quote');
  const rows = QUOTE.items.map(it => `
    <div class="quote-row">
      <span class="quote-name">${it.name}</span>
      <span class="quote-amt">${fmtMoney(it.amount)}</span>
    </div>`).join('');
  el.innerHTML = `
    <div class="quote-head">
      <span class="quote-so">${QUOTE.so}</span>
      <span class="quote-date">${QUOTE.date} · ${QUOTE.client}</span>
    </div>
    ${rows}
    <div class="quote-total">
      <span>Total</span>
      <span>${fmtMoney(QUOTE.total)}</span>
    </div>`;
}

function renderTimeline() {
  const el = document.getElementById('timeline');
  el.innerHTML = TIMELINE.map(t => {
    const d = new Date(t.date + 'T00:00:00');
    const done = d < TODAY;
    return `
    <div class="tl-row ${done ? 'done' : ''}">
      <div class="tl-date">${fmtDate(t.date)}</div>
      <div class="tl-dot" style="border-color:${CAT_COLOR[t.cat]}"></div>
      <div class="tl-body">
        <div class="tl-title">${done ? '✓ ' : ''}${t.title}</div>
        <div class="tl-cat" style="color:${CAT_COLOR[t.cat]}">${CAT_LABEL[t.cat]}</div>
      </div>
    </div>`;
  }).join('');
}

function updateCheckProgress() {
  let total = 0, done = 0;
  CHECKLIST.forEach(g => g.items.forEach(it => { total++; if (it.checked) done++; }));
  const prog = document.getElementById('check-progress');
  if (prog) prog.textContent = `${done} / ${total}`;
}

function renderChecklist() {
  const el = document.getElementById('checklist');
  el.innerHTML = CHECKLIST.map(g => `
    <div class="group-card" data-cat-id="${g.id}">
      <div class="group-head">
        <span class="group-title"${editAttrs('cat', g.id, 'cat')}>${escapeHtml(g.cat)}</span>
        <span class="group-count">${g.items.length}</span>
        ${EDIT_MODE ? `<button class="edit-x" onclick="event.stopPropagation();removeCategory('${g.id}')" title="Remove category">&times;</button>` : ''}
      </div>
      ${g.items.map(it => `
        <div class="check-row ${it.checked ? 'on' : ''}" data-item-id="${it.id}">
          <input type="checkbox" ${it.checked ? 'checked' : ''}>
          <span class="check-box"></span>
          <span class="check-name"${editAttrs('item', it.id, 'name')}>${escapeHtml(it.name)}</span>
          <span class="check-qty"${editAttrs('item', it.id, 'qty')}>${escapeHtml(it.qty)}</span>
          ${EDIT_MODE ? `<button class="edit-x" onclick="event.stopPropagation();removeItem('${it.id}')" title="Remove item">&times;</button>` : ''}
        </div>`).join('')}
      ${EDIT_MODE ? `<button class="edit-add" onclick="addItem('${g.id}')">+ Add item</button>` : ''}
    </div>`).join('') + (EDIT_MODE ? `<button class="edit-add edit-add-cat" onclick="addCategory()">+ Add category</button>` : '');

  // checkbox change → update state + persist
  el.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const itemId = cb.closest('.check-row').dataset.itemId;
      CHECKLIST.forEach(g => g.items.forEach(it => { if (it.id === itemId) it.checked = cb.checked; }));
      cb.closest('.check-row').classList.toggle('on', cb.checked);
      updateCheckProgress();
      persistChecklist();
    });
  });

  // whole-row click toggles the checkbox (outside Edit Mode)
  el.querySelectorAll('.check-row').forEach(row => {
    row.addEventListener('click', (e) => {
      if (EDIT_MODE && (e.target.isContentEditable || e.target.closest('.edit-x'))) return;
      const cb = row.querySelector('input[type="checkbox"]');
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change'));
    });
  });

  // contenteditable edits save on blur
  if (EDIT_MODE) {
    el.querySelectorAll('[contenteditable]').forEach(ed => {
      ed.addEventListener('blur', () => editField(ed.dataset.kind, ed.dataset.id, ed.dataset.field, ed));
    });
  }

  updateCheckProgress();
}

// ---------- Gallery ----------
function renderGallery(items, containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = items.map(it => `
    <figure class="gallery-item" onclick="openLightbox('${it.src}', '${it.caption}')">
      <img src="${it.src}" alt="${it.caption}" loading="lazy">
      <figcaption>${it.caption}</figcaption>
    </figure>`).join('');
}

function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  img.src = src;
  cap.textContent = caption;
  lb.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function renderNotes() {
  const el = document.getElementById('notes');
  el.innerHTML = NOTES.map(n => `<div class="note-item">${n}</div>`).join('');
}

// ---------- Renders / Drawings / Quote / Notes data ----------
const RENDERS = [
  { src: 'assets/cae-render-01.jpg', caption: 'Main view — overview' },
  { src: 'assets/cae-render-02.jpg', caption: 'Flightscope & Cafe' },
  { src: 'assets/cae-render-03.jpg', caption: 'Entrance & reception' },
  { src: 'assets/cae-render-04.jpg', caption: 'Front exterior' },
  { src: 'assets/cae-render-05.jpg', caption: 'Main screen — Defense & Security' },
  { src: 'assets/cae-render-06.jpg', caption: 'Aerial — lounge & living wall' },
  { src: 'assets/cae-render-07.jpg', caption: 'Render 07' },
  { src: 'assets/cae-render-08.jpg', caption: 'Render 08' },
  { src: 'assets/cae-render-09.jpg', caption: 'Render 09' },
  { src: 'assets/cae-render-10.jpg', caption: 'Render 10' },
  { src: 'assets/cae-render-11.jpg', caption: 'Render 11' },
  { src: 'assets/cae-render-12.jpg', caption: 'Cafe & glass meeting room' },
  { src: 'assets/cae-render-13.jpg', caption: 'Render 13' },
  { src: 'assets/cae-render-14.jpg', caption: 'Render 14' },
  { src: 'assets/cae-render-15.jpg', caption: 'Render 15' },
  { src: 'assets/cae-render-16.jpg', caption: 'Render 16' },
  { src: 'assets/cae-render-17.jpg', caption: 'Render 17' },
  { src: 'assets/cae-render-18.jpg', caption: 'Render 18' },
  { src: 'assets/cae-render-19.jpg', caption: 'Meeting room interior' },
  { src: 'assets/cae-render-20.jpg', caption: 'Isometric — show floor' },
];

const DRAWINGS = [
  { src: 'assets/cae-dwg-1.jpg', caption: 'Top view — with ceiling' },
  { src: 'assets/cae-dwg-2.jpg', caption: 'Top view — without ceiling' },
  { src: 'assets/cae-dwg-3.jpg', caption: 'Front view / Back view' },
  { src: 'assets/cae-dwg-4.jpg', caption: 'Left view / Right view' },
];

const QUOTE = {
  so: 'SO-21528',
  date: 'Sep 24, 2026',
  client: 'E2i Concepts Sdn Bhd',
  total: 345000,
  items: [
    { name: 'Custom Structure (40×70)', amount: 192214.70 },
    { name: 'Furniture / Electronics', amount: 28619.00 },
    { name: 'LED Screen', amount: 18200.00 },
    { name: 'Graphics', amount: 16031.05 },
    { name: 'Flooring Rental', amount: 13860.00 },
    { name: 'I&D Labor', amount: 40500.00 },
    { name: 'Transportation', amount: 10030.58 },
    { name: 'Administrative Expense', amount: 25544.68 },
  ],
};

const NOTES = [
  'Agency provides design. AMG scope: production, graphics, logistics, and I&D only.',
  'Freeman discount orders due Sep 16 — electrical, rigging, labor, carpet before this date.',
  'Graphics final files due Sep 23 (3 weeks before move-in).',
  'Direct to show site: freight ships Oct 10, arrives Oct 14. No advance warehouse.',
  'Blue target zone = earliest move-in (Oct 14). 6 full days of setup before show opens Oct 20.',
  'Furniture ordered via designer8, paid directly by client (not in AMG quote).',
];

function renderAll() {
  renderOverview();
  renderTimeline();
  renderGallery(RENDERS, 'renders');
  renderGallery(DRAWINGS, 'drawings');
  renderQuote();
  renderChecklist();
  renderNotes();
}

// ---------- Init ----------
initFirebase();
loadChecklist(() => {
  watchChecklist();
  renderAll();
});
