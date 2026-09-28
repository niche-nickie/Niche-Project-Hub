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

// ---------- Design elements ----------
const ELEMENTS = [
  { icon: '🖥️', name: 'LED Main Visual Wall', desc: 'Main visual LED wall' },
  { icon: '🎮', name: 'Flightscape Interactive Area', desc: 'Interactive flightscape zone' },
  { icon: '🪑', name: '2 Meeting Rooms', desc: 'Private meeting rooms' },
  { icon: '🌿', name: 'Living Wall', desc: 'Green living wall' },
];

// ---------- Notes ----------
const NOTES = [
  'Agency provides design. AMG scope: production, graphics, logistics, and I&amp;D only.',
  'Freeman discount orders due Sep 16 — electrical, rigging, labor, carpet before this date.',
  'Graphics final files due Sep 23 (3 weeks before move-in).',
  'Direct to show site: freight ships Oct 10, arrives Oct 14. No advance warehouse.',
  'Blue target zone = earliest move-in (Oct 14). 6 full days of setup before show opens Oct 20.',
];

// ---------- Render ----------
function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function renderOverview() {
  const el = document.getElementById('overview');
  el.innerHTML = OVERVIEW.map(o => `
    <div class="ov-card">
      <div class="ov-label">${o.label}</div>
      <div class="ov-value">${o.value}</div>
    </div>`).join('');
}

function renderTimeline() {
  const el = document.getElementById('timeline');
  el.innerHTML = TIMELINE.map(t => {
    const d = new Date(t.date + 'T00:00:00');
    const done = d < TODAY;
    const isToday = d.getTime() === TODAY.getTime();
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

function renderElements() {
  const el = document.getElementById('elements');
  el.innerHTML = ELEMENTS.map(e => `
    <div class="el-card">
      <div class="el-icon">${e.icon}</div>
      <div class="el-name">${e.name}</div>
      <div class="el-desc">${e.desc}</div>
    </div>`).join('');
}

function renderNotes() {
  const el = document.getElementById('notes');
  el.innerHTML = NOTES.map(n => `<div class="note-item">${n}</div>`).join('');
}

renderOverview();
renderTimeline();
renderElements();
renderNotes();
