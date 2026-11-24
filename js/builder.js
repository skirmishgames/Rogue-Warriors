/* Mission builder and House rules pages, plus an A4 print helper for both. Uses the helpers app.js shares on window.RWApp. */
(function () {
  const A = window.RWApp, { h, sv, opt } = A;
  const $ = (s, el) => (el || document).querySelector(s);
  const T = () => window.RW_MISSION_TABLE || null;

  // ---------------------------------------------------------------------
  // A4 print: opens the page content in a new window with the site styles and a print stylesheet, then prints it.
  // ---------------------------------------------------------------------
  const PRINT_CSS = `
    @page { size: A4; margin: 12mm; }
    html, body { background: #fff !important; color: #111 !important; }
    body { margin: 0; font-size: 10.5pt; line-height: 1.38; }
    .pp { max-width: none; padding: 0; }
    .pp h2 { color: #555; margin: 10px 0 4px; font-size: 10pt; }
    .pp h3 { margin: 8px 0 2px; }
    .pp p, .pp li { margin: 2px 0; }
    .pp ul { padding-left: 18px; margin: 2px 0 6px; }
    .no-print, button { display: none !important; }
    .pb { break-before: page; }
    .avoid { break-inside: avoid; }
    .hr-cols { columns: 2; column-gap: 9mm; }
    .hr-cols h3 { break-after: avoid; }
    .hr-cols li { break-inside: avoid; }
    .mb-sheet { border: none; padding: 0; }
    .os-map { max-width: 100%; }
    .pp .os-cols { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 0 8mm; }
    .pp .os-legend { font-size: 9.5pt; gap: 3px; } .pp .os-sw { width: 16px; height: 16px; } .pp .os-sw.os-k-wall, .pp .os-sw.os-k-door { height: 7px; margin: 4px 0; }
    .pp .os-title { font-size: 26pt; }
    .pp .os-table { font-size: 9.5pt; } .pp .os-table td.num { font-size: 11pt; }
    .pp .mb-team { margin-top: 6mm; }
    .tokens { display: flex; flex-wrap: wrap; gap: 4mm; margin-top: 4mm; }
    .token { width: 25mm; height: 25mm; border-radius: 50%; border: 1.2mm solid #111; display: grid; place-items: center; text-align: center;
      font: 600 8.5pt Oswald, sans-serif; letter-spacing: .04em; text-transform: uppercase; }
    .token.ow { border-color: #2b7fd4; color: #1b5da1; } .token.pr { border-color: #2a3123; }
  `;
  function printPage(title, nodes) {
    const w = window.open('', '_blank');
    if (!w) { A.toast('Allow pop-ups for this site to print.'); return null; }
    const base = location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
    const links = [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => `<link rel="stylesheet" href="${l.href}">`).join('');
    w.document.write(`<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><base href="${base}"><title></title>${links}<style>${PRINT_CSS}</style></head><body><div id="os-root" class="pp prose"></div></body></html>`);
    w.document.close();
    w.document.title = title;
    const root = w.document.querySelector('.pp');
    nodes.forEach((n) => root.append(w.document.importNode(n, true)));
    const go = () => setTimeout(() => { w.focus(); w.print(); }, 250);
    const ready = w.document.fonts && w.document.fonts.ready;
    if (ready) ready.then(go); else go();
    return w;
  }

  // ---------------------------------------------------------------------
  // HOUSE RULES
  // ---------------------------------------------------------------------
  function printHouseRules() {
    const body = $('#house-body').cloneNode(true);
    body.querySelectorAll('.no-print').forEach((x) => x.remove());
    const cols = h('div', { class: 'hr-cols' }); [...body.querySelectorAll('h3, ul')].forEach((x) => cols.append(x));
    const tokens = (cls, label, n) => Array.from({ length: n }, () => h('div', { class: 'token ' + cls }, label));
    printPage('Rogue Warriors house rules', [
      h('h2', {}, 'Rogue Warriors · House rules (optional)'),
      body.querySelector('p') || h('p'),
      cols,
      h('div', { class: 'avoid' }, h('h2', {}, 'Tokens: cut out, or use any marker'), h('div', { class: 'tokens' }, tokens('pr', 'Prone', 6), tokens('ow', 'Overwatch', 6))),
    ]);
  }

  // ---------------------------------------------------------------------
  // MISSION BUILDER
  // ---------------------------------------------------------------------
  // Map pieces. Rectangles use x, y, w, h (top-left corner, inches); markers use cx, cy (centre).
  const KINDS = {
    'zone-a': { name: 'Green deployment zone', legend: 'Green Team deploys here', rect: 1, def: { x: 0, y: 30, w: 36, h: 6 } },
    'zone-b': { name: 'Red deployment zone', legend: 'Red Team deploys here', rect: 1, def: { x: 0, y: 0, w: 36, h: 6 } },
    'exit-a': { name: 'Green exit point', legend: 'Green Team exit point', rect: 1, def: { x: 0, y: 0, w: 9, h: 2 } },
    'exit-b': { name: 'Red exit point', legend: 'Red Team exit point', rect: 1, def: { x: 27, y: 34, w: 9, h: 2 } },
    building: { name: 'Building', legend: 'Building', centre: 1, size: 1, rot: 1, def: { cx: 18, cy: 18, w: 6, h: 6, rot: 0 } },
    outline: { name: 'Compound or room outline', legend: 'Compound', rect: 1, def: { x: 12, y: 12, w: 12, h: 12 } },
    wall: { name: 'Wall or barricade', legend: 'Wall or barricade', rect: 1, def: { x: 14, y: 17.5, w: 8, h: 1 } },
    terrain: { name: 'Tricky Terrain', legend: 'Tricky Terrain', rect: 1, def: { x: 4, y: 14, w: 7, h: 7 } },
    door: { name: 'Door', legend: 'Door', rect: 1, def: { x: 16.75, y: 11.5, w: 2.5, h: 1 } },
    objective: { name: 'Objective marker', legend: 'Objective', centre: 1, n: 1, def: { cx: 18, cy: 18, n: '1' } },
    bag: { name: 'Loot or intel', legend: 'Loot or intel', centre: 1, def: { cx: 18, cy: 18 } },
    safe: { name: 'Safe or vault', legend: 'Safe or vault', centre: 1, def: { cx: 18, cy: 18 } },
    hostage: { name: 'Hostage or HVT', legend: 'Hostage or HVT', centre: 1, def: { cx: 18, cy: 18 } },
    battery: { name: 'Gun battery', legend: 'Gun battery', rect: 1, def: { x: 15, y: 16, w: 6, h: 3 } },
  };
  const ADDABLE = ['zone-a', 'zone-b', 'exit-a', 'exit-b', 'building', 'outline', 'wall', 'terrain', 'door', 'objective', 'bag', 'safe', 'hostage'];
  // Deployment presets written for this site. Each replaces the deployment zones and keeps everything else.
  const PRESETS = {
    edges: { name: 'Opposite edges', zones: [{ k: 'zone-a', x: 0, y: 30, w: 36, h: 6 }, { k: 'zone-b', x: 0, y: 0, w: 36, h: 6 }] },
    flanks: { name: 'Left and right flanks', zones: [{ k: 'zone-a', x: 0, y: 0, w: 6, h: 36 }, { k: 'zone-b', x: 30, y: 0, w: 6, h: 36 }] },
    corners: { name: 'Opposite corners', zones: [{ k: 'zone-a', x: 0, y: 24, w: 12, h: 12 }, { k: 'zone-b', x: 24, y: 0, w: 12, h: 12 }] },
    centre: { name: 'Defend the centre', zones: [{ k: 'zone-a', x: 0, y: 30, w: 36, h: 6 }, { k: 'zone-b', x: 12, y: 12, w: 12, h: 12 }] },
    ambush: { name: 'Ambush (both flanks against a road)', zones: [{ k: 'zone-b', x: 0, y: 15, w: 36, h: 6 }, { k: 'zone-a', x: 0, y: 0, w: 36, h: 5 }, { k: 'zone-a', x: 0, y: 31, w: 36, h: 5 }] },
  };
  const DEPLOY_CODES = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'GOLF', 'HOTEL', 'INDIA', 'JULIET', 'KILO', 'LIMA', 'MIKE', 'NOVEMBER', 'OSCAR', 'PAPA', 'QUEBEC', 'ROMEO',
    'SIERRA', 'TANGO', 'UNIFORM', 'VICTOR', 'WHISKEY', 'X-RAY', 'YANKEE', 'ZULU'].concat(Array.from({ length: 10 }, (_, i) => 'ALPHA-' + (i + 1)));
  const WIN_NAMES = ['Objective Control', 'Elimination', 'Exit Point', 'Point Accumulation', 'Survival', 'King of the Hill', 'Retrieval', 'Resource Depletion', 'Breakout', 'Scenario Completion'];
  const CLASSES = ['Top Secret', 'Secret', 'Confidential', 'Restricted'];

  const today = () => new Date().toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });
  function newMission() {
    const S = A.S, n = S.missions.length + 1;
    return {
      id: A.uid(), code: 'RWCM 1-' + String(n).padStart(2, '0'), classification: 'Top Secret', title: 'Operation ' + ['Iron Gate', 'Black Tide', 'Silent Ridge', 'Night Ledger', 'Broken Arrow', 'Cold Harbour'][(n - 1) % 6], date: today(),
      tagline: '', prompt: '',
      details: { location: '', action: '', objectives: '', enemy: '', rounds: 'Unlimited' },
      background: '', insertion: '',
      winning: { name: '', lines: '' }, special: '', sides: 'Player One is the Green Team.\nPlayer Two is the Red Team.',
      deploy: '', teamA: '', teamB: '',
      map: { shapes: JSON.parse(JSON.stringify(PRESETS.edges.zones)), labels: {}, note: '' },
    };
  }
  const lines = (t) => String(t || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const cur = () => A.S.missions.find((m) => m.id === A.S.ui.mission) || null;
  const roll = (n) => Math.floor(Math.random() * n);
  const snap = (v) => Math.round(v * 2) / 2;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ---------- the brief (screen preview and print) ----------
  function legendOf(m) {
    const seen = [];
    m.map.shapes.forEach((s) => { if (!seen.includes(s.k)) seen.push(s.k); });
    return seen.map((k) => [k, (m.map.labels && m.map.labels[k]) || (KINDS[k] ? KINDS[k].legend : k)]);
  }
  function teamBlock(teamId, side) {
    const t = A.S.teams.find((x) => x.id === teamId); if (!t) return null;
    let res; try { res = A.computeTeam(t); } catch (e) { return null; }
    return h('div', { class: 'mb-team avoid' },
      h('h2', {}, side), h('h3', { class: 'os-title' }, t.name || 'Unnamed team'),
      h('p', {}, h('b', {}, 'Team Expertise: '), res.exp ? res.exp.title : '-'),
      h('div', { class: 'table-wrap' }, h('table', { class: 'os-table' },
        h('thead', {}, h('tr', {}, ['#', 'Warrior', 'Specialisation', 'Weapons', 'Gear', 'Move', 'Hearts', 'Hits on', 'MDP'].map((x) => h('th', {}, x)))),
        h('tbody', {}, res.rows.map((r, i) => h('tr', {}, h('td', { class: 'num' }, i + 1), h('td', {}, h('b', {}, r.name || '-')), h('td', {}, r.spec), h('td', {}, r.weapon || 'Pistol only'),
          h('td', {}, r.gearNames.join(', ') || '-'), h('td', { class: 'num' }, r.stats.ma + '"'), h('td', { class: 'num' }, r.stats.hearts),
          h('td', { class: 'num' }, r.stats.hits == null ? '-' : r.stats.hits + '+'), h('td', { class: 'num' }, r.stats.mdp == null ? '-' : r.stats.mdp)))))));
  }
  function brief(m, editable) {
    const d = m.details, X = [['Location', d.location], ['Action', d.action], ['Objectives', d.objectives], ['Enemy', d.enemy], ['Rounds', d.rounds]].filter(([, v]) => v);
    const win = lines(m.winning.lines), spec = lines(m.special), sides = lines(m.sides), bg = String(m.background || '').split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);
    const map = A.missionMap({ code: m.deploy || 'custom', shapes: m.map.shapes });
    if (editable) map.classList.add('os-edit');
    const ta = teamBlock(m.teamA, 'Green Team'), tb = teamBlock(m.teamB, 'Red Team');
    return h('div', { class: 'mb-sheet' },
      h('div', { class: 'mb-stamp' }, h('span', {}, m.code), h('span', { class: 'mb-class' }, m.classification)),
      h('h3', { class: 'os-title' }, m.title || 'Untitled Mission'),
      h('p', { class: 'mb-date' }, (m.date || '') + (m.date ? ' · ' : '') + 'Restricted document'),
      m.tagline ? h('p', { class: 'os-tag' }, m.tagline) : null,
      h('div', { class: 'os-cols' },
        h('div', {},
          X.length ? [h('h2', {}, 'Details'), h('dl', { class: 'os-details' }, X.flatMap(([k, v]) => [h('dt', {}, k), h('dd', {}, v)]))] : null,
          bg.length ? [h('h2', {}, 'Background'), bg.map((p) => h('p', {}, p))] : null,
          m.insertion ? [h('h2', {}, 'Insertion'), h('p', {}, m.insertion)] : null,
          (m.winning.name || win.length) ? [h('h2', {}, 'Winning condition' + (m.winning.name ? ': ' + m.winning.name : '')), win.length ? h('ul', {}, win.map((x) => h('li', {}, x))) : null] : null,
          spec.length ? [h('h2', {}, 'Special instructions'), h('ul', {}, spec.map((x) => h('li', {}, x)))] : null,
          sides.length ? h('div', { class: 'os-sides' }, sides.map((x) => h('div', {}, x))) : null),
        h('div', {},
          h('h2', {}, 'Deployment code: ' + (m.deploy || 'Custom')), map,
          h('ul', { class: 'os-legend' }, legendOf(m).map(([k, label]) => h('li', {}, h('i', { class: 'os-sw os-k-' + k }), label))),
          m.map.note ? h('p', { class: 'hint' }, m.map.note) : null,
          h('p', { class: 'hint' }, 'A 36 by 36 inch Battlefield, with a grid line every 12 inches and a fainter one every 6.'))),
      (ta || tb) ? h('div', { class: 'pb' }, ta, tb) : null);
  }

  // ---------- editor ----------
  let previewTimer = null;
  function renderPreview() {
    const m = cur(), box = $('#mb-preview'); if (!m || !box) return;
    box.textContent = ''; box.append(brief(m, true)); wireDrag(box, m);
  }
  const later = () => { A.save(); clearTimeout(previewTimer); previewTimer = setTimeout(renderPreview, 150); };

  // Drag map pieces on the preview. The piece moves with the pointer and snaps to half inches when dropped.
  function wireDrag(box, m) {
    const svg = $('svg.os-edit', box); if (!svg) return;
    let drag = null;
    const pt = (e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
    svg.addEventListener('pointerdown', (e) => {
      const g = e.target.closest('[data-i]'); if (!g) return;
      e.preventDefault(); svg.setPointerCapture(e.pointerId);
      drag = { g, i: +g.dataset.i, start: pt(e), dx: 0, dy: 0 };
    });
    svg.addEventListener('pointermove', (e) => {
      if (!drag) return; const p = pt(e);
      drag.dx = p.x - drag.start.x; drag.dy = p.y - drag.start.y;
      drag.g.setAttribute('transform', `translate(${drag.dx} ${drag.dy})`);
    });
    const end = () => {
      if (!drag) return; const s = m.map.shapes[drag.i];
      if ('cx' in s) { s.cx = clamp(snap(s.cx + drag.dx), 0, 36); s.cy = clamp(snap(s.cy + drag.dy), 0, 36); }
      else { s.x = clamp(snap(s.x + drag.dx), 0, 36 - (s.w || 0)); s.y = clamp(snap(s.y + drag.dy), 0, 36 - (s.h || 0)); }
      drag = null; A.save(); renderEditor();
    };
    svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
  }

  function field(label, el, extra) { return h('label', { class: 'field' }, h('span', {}, label, extra || null), el); }
  function text(obj, prop, attrs) {
    return h('input', Object.assign({ type: 'text', value: obj[prop] || '', oninput: (e) => { obj[prop] = e.target.value; later(); } }, attrs || {}));
  }
  function area(obj, prop, attrs) {
    return h('textarea', Object.assign({ value: obj[prop] || '', oninput: (e) => { obj[prop] = e.target.value; later(); } }, attrs || {}));
  }
  function list(id, values) { return h('datalist', { id }, values.map((v) => h('option', { value: v }))); }

  function rollBtn(label, fn) { return h('button', { type: 'button', class: 'ghost mb-roll', title: 'Roll on the Mission Builder Table', onclick: (e) => { e.preventDefault(); fn(); A.save(); renderEditor(); } }, label || 'Roll'); }

  function renderList() {
    const ul = $('#mb-list'); ul.textContent = '';
    const S = A.S;
    for (const m of S.missions) ul.append(h('li', { class: S.ui.mission === m.id ? 'sel' : '', onclick: () => { S.ui.mission = m.id; A.save(); renderBuilder(); } }, m.title || 'Untitled Mission', h('small', {}, m.code)));
  }

  function renderEditor() {
    const root = $('#mb-root'); root.textContent = '';
    const m = cur(), S = A.S;
    if (!m) {
      root.append(h('div', { class: 'editor-empty' }, h('p', {}, 'Design your own Mission: a briefing, a winning condition, special instructions and a deployment map, laid out like the official Missions.'),
        h('button', { class: 'primary', onclick: () => { const x = newMission(); S.missions.push(x); S.ui.mission = x.id; A.save(); renderBuilder(); } }, 'New mission')));
      return;
    }
    const tb = T(), d = m.details;
    const col = (i) => tb.rows[roll(36)][i];
    const rollAll = () => {
      const r = () => tb.rows[roll(36)];
      m.prompt = r()[1]; d.location = r()[2]; d.action = r()[3]; d.objectives = r()[4]; d.enemy = r()[5]; m.deploy = r()[6];
      m.winning.name = tb.win[roll(tb.win.length)][0];
    };
    const winDesc = tb && (tb.win.find((w) => w[0] === m.winning.name) || [])[1];
    const ins = tb ? tb.insertion : null;

    // header and actions
    root.append(h('div', { class: 'os-head' },
      h('div', {}, h('h2', {}, 'Mission builder'), h('h3', { class: 'os-title' }, m.title || 'Untitled Mission')),
      h('div', { class: 'stack inline' },
        h('button', { class: 'primary', onclick: () => printPage(m.title || 'Mission', [brief(m, false)]) }, 'Print A4'),
        h('button', { onclick: () => window.RWStore.download((m.title || 'mission').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.json', JSON.stringify({ app: 'rogue-warriors-cards', kind: 'mission', version: 1, mission: m }, null, 1)) }, 'Export'),
        h('button', { onclick: () => { const c = JSON.parse(JSON.stringify(m)); c.id = A.uid(); c.title = (m.title || 'Mission') + ' (copy)'; S.missions.push(c); S.ui.mission = c.id; A.save(); renderBuilder(); } }, 'Duplicate'),
        h('button', { class: 'ghost', onclick: () => { if (!confirm(`Delete "${m.title || 'this Mission'}"?`)) return; S.missions = S.missions.filter((x) => x !== m); S.ui.mission = S.missions[0] ? S.missions[0].id : null; A.save(); renderBuilder(); } }, 'Delete'))));

    const form = h('div', { class: 'mb-form' });
    const prev = h('div', { class: 'mb-preview', id: 'mb-preview' });
    root.append(h('div', { class: 'mb-cols' }, form, h('div', {}, h('h2', { class: 'no-print' }, 'Preview'), h('p', { class: 'hint' }, 'Drag pieces on the map to move them. They snap to half inches.'), prev)));

    // 1. Mission file
    form.append(h('h2', {}, '1. Mission file'),
      h('div', { class: 'mb-grid' },
        field('Mission code', text(m, 'code', { oninput: (e) => { m.code = e.target.value; later(); renderList(); } })),
        field('Classification', h('select', { onchange: (e) => { m.classification = e.target.value; later(); } }, CLASSES.map((c) => opt(c, c, m.classification === c)))),
        field('Date', text(m, 'date', { placeholder: 'April 2024' }))),
      field('Title', text(m, 'title', { oninput: (e) => { m.title = e.target.value; later(); renderList(); $('#mb-root .os-head .os-title').textContent = m.title || 'Untitled Mission'; } })),
      field('Summary', text(m, 'tagline', { placeholder: 'Infiltrate the base. Recover the laptop. Exfil at 05:00 hours.' })));

    // 2. Details, with the Mission Builder Table when it is loaded
    form.append(h('h2', {}, '2. Details'));
    if (tb) {
      form.append(h('div', { class: 'mb-rollbar' }, rollBtn('Roll the whole table', rollAll),
        m.prompt ? h('span', { class: 'mb-prompt' }, 'Prompt: ', h('b', {}, m.prompt), ' ', rollBtn('Reroll', () => { m.prompt = col(1); })) : rollBtn('Roll a prompt', () => { m.prompt = col(1); })),
      list('mb-l-loc', [...new Set(tb.rows.map((r) => r[2]))]), list('mb-l-goal', [...new Set(tb.rows.map((r) => r[3]))]),
      list('mb-l-obj', [...new Set(tb.rows.map((r) => r[4]))]), list('mb-l-enemy', [...new Set(tb.rows.map((r) => r[5]).concat(tb.forces))]));
    } else form.append(h('p', { class: 'hint' }, 'For ideas, roll on the Mission Builder Table (Core p. 26): a prompt, location, goal, objective, enemy, deployment map and winning condition.'));
    const withRoll = (label, prop, i, listId, ph) => field(label, h('div', { class: 'row' }, text(d, prop, { list: listId || null, placeholder: ph || '' }), tb ? rollBtn('Roll', () => { d[prop] = col(i); }) : null));
    form.append(
      withRoll('Location', 'location', 2, tb && 'mb-l-loc', 'Coastal research complex'),
      withRoll('Action (goal)', 'action', 3, tb && 'mb-l-goal', 'Retrieve intel'),
      withRoll('Objectives', 'objectives', 4, tb && 'mb-l-obj', 'Laptop and 4 data storage devices'),
      withRoll('Enemy', 'enemy', 5, tb && 'mb-l-enemy', 'Special Forces Team'),
      field('Rounds', text(d, 'rounds', { placeholder: 'Unlimited, or 6 Rounds' })),
      field('Background', area(m, 'background', { rows: 4, placeholder: 'What happened, who is involved and why it matters. Leave a blank line between paragraphs.' })),
      ins ? field('Insertion (optional)', h('select', { onchange: (e) => { m.insertion = e.target.value; later(); } }, opt('', 'None', !m.insertion), ins.map(([n, b, neg]) => opt(`${n}: ${b}. ${neg}.`, n, m.insertion.startsWith(n + ':')))))
        : field('Insertion (optional)', text(m, 'insertion', { placeholder: 'How the team gets in, for example Small Boat (Core p. 25)' })));

    // 3. Winning condition
    form.append(h('h2', {}, '3. Winning condition'),
      list('mb-l-win', WIN_NAMES),
      field('Type', h('div', { class: 'row' }, h('input', { type: 'text', list: 'mb-l-win', value: m.winning.name, placeholder: 'Exit Point', oninput: (e) => { m.winning.name = e.target.value; later(); }, onchange: () => renderEditor() }),
        tb ? rollBtn('Roll', () => { m.winning.name = tb.win[roll(tb.win.length)][0]; }) : null)),
      winDesc ? h('p', { class: 'hint' }, winDesc) : h('p', { class: 'hint' }, 'The ten Winning Conditions are described in the Core Rulebook, p. 13. Pick one and say exactly how a player wins.'),
      field('How to win (one line each)', area(m.winning, 'lines', { rows: 3, placeholder: 'The Mission is successful when the laptop and at least 2 storage devices reach your own deployment zone' })));

    // 4. Special instructions and sides
    form.append(h('h2', {}, '4. Special instructions'),
      field('Instructions (one line each)', area(m, 'special', { rows: 4, placeholder: 'Locate the laptop and 4 data storage devices, shown as objective markers\nPlayer Two activates first in Round 1' })),
      field('Players and sides (one line each)', area(m, 'sides', { rows: 2 })));

    // 5. Deployment map
    form.append(h('h2', {}, '5. Deployment map'),
      list('mb-l-dep', DEPLOY_CODES),
      field('Deployment code', h('div', { class: 'row' }, text(m, 'deploy', { list: 'mb-l-dep', placeholder: 'DELTA, or your own name' }), tb ? rollBtn('Roll', () => { m.deploy = col(6); }) : null)),
      h('p', { class: 'hint' }, 'The Core Rulebook has 36 Deployment Maps: ALPHA to LIMA on p. 27, MIKE to X-RAY on p. 28, YANKEE to ALPHA-10 on p. 29. Draw the one you pick below, or design your own.'),
      field('Deployment zones', h('div', { class: 'row' }, h('select', { id: 'mb-preset' }, Object.entries(PRESETS).map(([k, p]) => opt(k, p.name))),
        h('button', { type: 'button', onclick: () => { const p = PRESETS[$('#mb-preset').value]; m.map.shapes = JSON.parse(JSON.stringify(p.zones)).concat(m.map.shapes.filter((s) => s.k !== 'zone-a' && s.k !== 'zone-b')); A.save(); renderEditor(); } }, 'Apply'))));

    const tbl = h('tbody');
    m.map.shapes.forEach((s, i) => {
      const K = KINDS[s.k] || { name: s.k }, num = (p, step) => h('input', { type: 'number', step: step || 0.5, value: s[p], title: p, oninput: (e) => { const v = parseFloat(e.target.value); if (!Number.isNaN(v)) { s[p] = v; later(); } } });
      const cells = [];
      if ('cx' in s) cells.push(h('span', { class: 'mb-xy' }, 'x ', num('cx'), ' y ', num('cy')));
      else cells.push(h('span', { class: 'mb-xy' }, 'x ', num('x'), ' y ', num('y')));
      if ('w' in s) cells.push(h('span', { class: 'mb-xy' }, 'w ', num('w'), ' h ', num('h')));
      if (K.rot) cells.push(h('span', { class: 'mb-xy' }, 'turn ', num('rot', 15)));
      if (K.n) cells.push(h('span', { class: 'mb-xy' }, 'label ', h('input', { type: 'text', value: s.n || '', maxlength: 2, class: 'mb-n', oninput: (e) => { s.n = e.target.value; later(); } })));
      const copy = () => { const c = Object.assign({}, s); if ('cx' in c) { c.cx = clamp(c.cx + 2, 0, 36); c.cy = clamp(c.cy + 2, 0, 36); } else { c.x = clamp(c.x + 2, 0, 36 - c.w); c.y = clamp(c.y + 2, 0, 36 - c.h); } if (K.n) c.n = String((parseInt(s.n, 10) || 0) + 1); m.map.shapes.splice(i + 1, 0, c); A.save(); renderEditor(); };
      tbl.append(h('tr', {}, h('td', {}, h('div', { class: 'mb-kind' }, h('i', { class: 'os-sw os-k-' + s.k }), K.name),
        h('div', { class: 'mb-act' }, h('button', { type: 'button', class: 'ghost', onclick: copy }, 'Copy'), h('button', { type: 'button', class: 'ghost', onclick: () => { m.map.shapes.splice(i, 1); A.save(); renderEditor(); } }, 'Remove'))),
        h('td', {}, cells)));
    });
    form.append(h('div', { class: 'table-wrap' }, h('table', { class: 'mb-shapes' }, tbl)),
      h('div', { class: 'row' }, h('select', { id: 'mb-add' }, ADDABLE.map((k) => opt(k, KINDS[k].name))),
        h('button', { type: 'button', class: 'primary', onclick: () => { const k = $('#mb-add').value, s = Object.assign({ k }, KINDS[k].def), off = (m.map.shapes.length % 5) * 2 - 4; if ('cx' in s) { s.cx += off; s.cy += off; } else if (k !== 'zone-a' && k !== 'zone-b') { s.x = clamp(s.x + off, 0, 36 - s.w); s.y = clamp(s.y + off, 0, 36 - s.h); } if (k === 'objective') s.n = String(m.map.shapes.filter((x) => x.k === 'objective').length + 1); m.map.shapes.push(s); A.save(); renderEditor(); } }, 'Add to map')));
    const leg = legendOf(m);
    if (leg.length) form.append(h('h3', { class: 'mb-sub' }, 'Map key'), ...leg.map(([k]) => field(KINDS[k] ? KINDS[k].name : k, h('input', { type: 'text', value: (m.map.labels || {})[k] || '', placeholder: KINDS[k] ? KINDS[k].legend : k, oninput: (e) => { m.map.labels = m.map.labels || {}; m.map.labels[k] = e.target.value; later(); } }))));
    form.append(field('Set-up note under the map', area(m.map, 'note', { rows: 2, placeholder: 'Place the bank as shown. Fill the street with parked cars and other cover.' })));

    // 6. Teams
    const teamSel = (prop) => h('select', { onchange: (e) => { m[prop] = e.target.value; later(); } }, opt('', 'None', !m[prop]), S.teams.map((t) => opt(t.id, t.name || 'Unnamed team', m[prop] === t.id)));
    form.append(h('h2', {}, '6. Teams (optional)'),
      h('p', { class: 'hint' }, S.teams.length ? 'Pick teams from Mission team. Their roster prints on a second page.' : 'Build teams on the Mission team tab, then pick them here. Their roster prints on a second page.'),
      h('div', { class: 'mb-grid two' }, field('Green Team', teamSel('teamA')), field('Red Team', teamSel('teamB'))));

    renderPreview();
  }

  function renderBuilder() { renderList(); renderEditor(); }

  function wire() {
    $('#mb-new').addEventListener('click', () => { const x = newMission(); A.S.missions.push(x); A.S.ui.mission = x.id; A.save(); renderBuilder(); });
    $('#mb-import').addEventListener('change', async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const data = JSON.parse(await f.text());
        if (data.app !== 'rogue-warriors-cards' || data.kind !== 'mission' || !data.mission) throw new Error('That file is not a Mission from this site.');
        const base = newMission(), m = Object.assign(base, data.mission, { id: A.uid(), teamA: '', teamB: '' });
        m.details = Object.assign(base.details, data.mission.details || {}); m.winning = Object.assign({ name: '', lines: '' }, data.mission.winning || {});
        m.map = Object.assign({ shapes: [], labels: {}, note: '' }, data.mission.map || {});
        A.S.missions.push(m); A.S.ui.mission = m.id; A.save(); renderBuilder(); A.toast('Mission imported.');
      } catch (err) { A.toast(err.message); }
      e.target.value = '';
    });
    $('#house-print').addEventListener('click', printHouseRules);
  }

  window.RW_VIEW_HOOKS = Object.assign(window.RW_VIEW_HOOKS || {}, { builder: () => { if (!A.S.missions) A.S.missions = []; renderBuilder(); } });
  window.RWPrintPage = printPage;
  wire();
  const v = document.getElementById('view-builder'); if (v && !v.hidden) window.RW_VIEW_HOOKS.builder();
})();
