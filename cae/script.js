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

// ---------- Build ----------
const BUILD = [
  {
    group: 'Custom Structure',
    items: [
      { name: 'Formica wall panels', detail: 'Blue / Maple / White / Raw Wood — 60+ pieces' },
      { name: 'Door & DS panels', detail: '12 pieces' },
      { name: 'Tempered glass', detail: '18 panels (6 + 6 + 1 + 2 + 3)' },
      { name: 'Custom wooden logo', detail: 'Acrylic support, caster wheels' },
      { name: 'LED wall frame', detail: 'Custom angle panels' },
      { name: 'Custom ceilings', detail: '8 units — white Formica + LED strips' },
      { name: 'Bar counters & counters', detail: '15 units — Formica + LED strips' },
      { name: 'Custom displays', detail: '2 units — 55" touchscreen enclosure' },
      { name: 'Stage re-skin', detail: '21× 4\'×10\' + 6× 4\'×8\', LED diffuser channel' },
      { name: 'Curved / slatted panels + cafe header', detail: 'Rubber LED channel' },
    ],
  },
  {
    group: 'Graphics',
    items: [
      { name: 'Fabric graphics', detail: '10 pieces — banner / wall graphic (4/0 print)' },
      { name: 'PVC panels', detail: '7 pieces — 3mm, CNC / V cut' },
      { name: 'ULTRAFOAM logos', detail: '13 pieces — 1" / 1/2", CNC' },
    ],
  },
];

// ---------- Purchase ----------
const PURCHASE = [
  {
    group: 'AMG Purchase',
    items: [
      { name: 'Furniture / Electronics / Accessory', detail: '65" TV ×2, 50" TV ×2, 55" touchscreen ×1, fridges ×4, meeting chairs ×18, bar stools ×12, AC ×2, neon sign, LED lighting, sliding doors ×2, moss, truss ×2, rear CAE lightbox' },
      { name: 'LED Screen', detail: 'LED Wall Header 52 panels + LED Wall 30 panels (500×500mm)' },
      { name: 'Flooring Rental', detail: '2800 sf (light gray carpet)' },
    ],
  },
  {
    group: 'Furniture — designer8 (paid by client)',
    items: [
      { name: 'Media Lounge', detail: '5 pieces (2 + 2 + 1)' },
      { name: 'Main Lounge', detail: 'Tables + chairs + pillows (16 units) + Poe sectional (cream) + Dune coffee table' },
      { name: 'High Tables / High Chairs', detail: '12 tables + 3 chairs (Marlo barstool) + 12 high chairs' },
      { name: 'Meeting Room', detail: '16 + 16 (Option 1 Modern Minimal / Option 2 Comforting Earthy)' },
      { name: 'Backoffice', detail: 'IBM table ×2 + Chair ×4' },
    ],
  },
];

// ---------- Renders (client 3D visuals, 20 views) ----------
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

// ---------- Drawings (orthographic views) ----------
const DRAWINGS = [
  { src: 'assets/cae-dwg-1.jpg', caption: 'Top view — with ceiling' },
  { src: 'assets/cae-dwg-2.jpg', caption: 'Top view — without ceiling' },
  { src: 'assets/cae-dwg-3.jpg', caption: 'Front view / Back view' },
  { src: 'assets/cae-dwg-4.jpg', caption: 'Left view / Right view' },
];

// ---------- Quote (SO-21528) ----------
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

// ---------- Notes ----------
const NOTES = [
  'Agency provides design. AMG scope: production, graphics, logistics, and I&amp;D only.',
  'Freeman discount orders due Sep 16 — electrical, rigging, labor, carpet before this date.',
  'Graphics final files due Sep 23 (3 weeks before move-in).',
  'Direct to show site: freight ships Oct 10, arrives Oct 14. No advance warehouse.',
  'Blue target zone = earliest move-in (Oct 14). 6 full days of setup before show opens Oct 20.',
  'Furniture ordered via designer8, paid directly by client (not in AMG quote).',
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

function fmtMoney(n) {
  if (n == null) return '';
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
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

function renderGroup(data, containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = data.map(g => `
    <div class="group-card">
      <div class="group-head">
        <span class="group-title">${g.group}</span>
      </div>
      ${g.items.map(it => `
        <div class="purchase-row">
          <div class="purchase-main">
            <div class="purchase-name">${it.name}</div>
            <div class="purchase-detail">${it.detail}</div>
          </div>
        </div>`).join('')}
    </div>`).join('');
}

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

renderOverview();
renderTimeline();
renderGallery(RENDERS, 'renders');
renderGallery(DRAWINGS, 'drawings');
renderQuote();
renderGroup(BUILD, 'build');
renderGroup(PURCHASE, 'purchase');
renderNotes();
