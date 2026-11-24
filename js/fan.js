/* Fan Missions page: an index of Missions written for this site, with filters, and the full Mission view. */
(function () {
  const A = window.RWApp, { h, opt } = A;
  const $ = (s, el) => (el || document).querySelector(s);
  const PLAYTESTS_NEEDED = 3;
  const MAIL = 'skirmishgames.app@gmail.com';
  const STATUS = { playtested: { label: 'Playtested', note: `Played at least ${PLAYTESTS_NEEDED} times and tuned.` }, untested: { label: 'Needs playtest', note: 'Not played enough yet. Try it and send feedback.' } };
  const FILTERS = [['status', 'Status'], ['genre', 'Genre'], ['setting', 'Setting'], ['win', 'Winning condition'], ['needs', 'Books needed']];
  const state = { q: '', status: '', genre: '', setting: '', win: '', needs: '' };

  const list = () => (window.RW_ONESHOTS || []).filter((m) => m.fan && m.meta);
  const statusOf = (m) => (m.meta.playtests.length >= PLAYTESTS_NEEDED ? 'playtested' : 'untested');
  const valueOf = (m, key) => (key === 'status' ? statusOf(m) : m.meta[key] || '');
  const haystack = (m) => [m.title, m.code, m.meta.premise, m.meta.genre, m.meta.setting, m.meta.win, m.meta.inspired, (m.text && m.text.tagline) || ''].join(' ').toLowerCase();
  function matches(m, st) {
    for (const [k] of FILTERS) if (st[k] && valueOf(m, k) !== st[k]) return false;
    if (st.q && !st.q.toLowerCase().split(/\s+/).every((w) => haystack(m).includes(w))) return false;
    return true;
  }
  const linkOf = (m) => location.href.replace(/#.*$/, '') + '#fan/' + m.id;
  function feedbackHref(m) {
    const body = ['Teams used:', 'Playing time:', 'Result (who won, and how):', '', ...m.meta.testNotes.map((t, k) => `${k + 1}. ${t}\nAnswer:\n`), 'Anything else:'].join('\n');
    return `mailto:${MAIL}?subject=${encodeURIComponent(`Playtest: ${m.title} v${m.meta.version}`)}&body=${encodeURIComponent(body)}`;
  }
  function printMission(m) {
    const box = h('div', { id: 'os-root' }); A.missionDetail(m, box);
    window.RWPrintPage(m.title, [...box.childNodes]);
  }

  // ---------- index ----------
  function renderIndex() {
    const root = $('#fan-root'); root.textContent = '';
    const all = list();
    root.append(h('div', { class: 'fan-intro' }, h('h2', {}, 'Written for this site'), h('h3', { class: 'os-title' }, 'Fan Missions'),
      h('p', {}, 'Missions written for this site, free to play and print. Each one has a briefing, a winning condition, special instructions, a deployment map that works with whatever terrain you own, and two premade teams. A Mission shows ', h('strong', {}, 'Playtested'), ` after ${PLAYTESTS_NEEDED} playtests. Until then it shows `, h('strong', {}, 'Needs playtest'), ': try one and tell us how it went.')));

    const count = (key, value) => all.filter((m) => matches(m, Object.assign({}, state, { [key]: value }))).length;
    const values = (key) => [...new Set(all.map((m) => valueOf(m, key)).filter(Boolean))].sort();
    const label = (key, v) => (key === 'status' ? STATUS[v].label : v);
    const filters = h('div', { class: 'fan-filters', role: 'group', 'aria-label': 'Filter Fan Missions' },
      h('label', { class: 'field fan-search' }, h('span', {}, 'Search'), h('input', { type: 'search', value: state.q, placeholder: 'Title, film, objective', oninput: (e) => { state.q = e.target.value; drawCards(); } })),
      FILTERS.map(([key, name]) => h('label', { class: 'field' }, h('span', {}, name),
        h('select', { 'data-key': key, onchange: (e) => { state[key] = e.target.value; renderIndex(); } }, opt('', `Any (${count(key, '')})`, !state[key]), values(key).map((v) => opt(v, `${label(key, v)} (${count(key, v)})`, state[key] === v))))));
    const active = FILTERS.some(([k]) => state[k]) || state.q;
    if (active) filters.append(h('button', { class: 'ghost fan-clear', onclick: () => { Object.keys(state).forEach((k) => { state[k] = ''; }); renderIndex(); } }, 'Clear filters'));
    root.append(filters, h('p', { class: 'hint', id: 'fan-count' }), h('div', { class: 'fan-grid', id: 'fan-grid' }),
      h('p', { class: 'hint' }, 'Playtest feedback: ', h('a', { href: 'mailto:' + MAIL }, MAIL), '. Tell us which teams you used, how long it took, who won, and anything that felt unclear or unfair.'));
    drawCards();
  }

  function drawCards() {
    const grid = $('#fan-grid'); if (!grid) return; grid.textContent = '';
    const shown = list().filter((m) => matches(m, state));
    $('#fan-count').textContent = `${shown.length} of ${list().length} Missions`;
    if (!shown.length) grid.append(h('p', { class: 'editor-empty' }, 'No Mission matches these filters.'));
    for (const m of shown) {
      const M = m.meta, st = statusOf(m), open = () => openMission(m);
      const map = m.text && m.text.map ? A.missionMap(m.text.map) : null;
      grid.append(h('article', { class: 'fan-card', id: 'fan-' + m.id },
        h('header', {}, h('div', { class: 'fan-genre' }, `${M.genre} · ${M.setting}`), h('h3', { onclick: open }, m.title), h('div', { class: 'fan-code' }, m.code + (m.expansion ? ' · ' + m.expansion : ''))),
        map ? h('div', { class: 'fan-thumb', onclick: open, title: 'Open the Mission' }, map) : null,
        h('div', {}, h('span', { class: 'fan-status fan-' + st, title: STATUS[st].note }, STATUS[st].label)),
        h('div', { class: 'fan-meta' }, [`${M.players} players`, M.size, `${M.rounds} rounds`, `${M.time} min`].join(' · ')),
        h('div', { class: 'fan-tags' }, h('span', { class: 'tag hot' }, M.genre), h('span', { class: 'tag' }, M.win), h('span', { class: 'tag' }, M.needs), M.inspired ? h('span', { class: 'tag' }, 'Inspired by ' + M.inspired) : null),
        h('p', {}, M.premise),
        h('div', { class: 'stack inline' },
          h('button', { class: 'primary', onclick: open }, 'Open mission'),
          h('button', { onclick: () => printMission(m) }, 'Print A4'),
          h('a', { class: 'button', href: feedbackHref(m) }, 'Send feedback'),
          h('button', { class: 'ghost', title: 'Copy a link to this Mission', onclick: () => { navigator.clipboard && navigator.clipboard.writeText(linkOf(m)).then(() => A.toast('Link copied.'), () => A.toast(linkOf(m))); } }, 'Copy link')),
        h('p', { class: 'hint' }, M.playtests.length >= PLAYTESTS_NEEDED ? `Playtested ${M.playtests.length} times.` : `Playtests: ${M.playtests.length} of ${PLAYTESTS_NEEDED}.`)));
    }
  }

  // ---------- one Mission ----------
  function openMission(m) {
    A.S.ui.fan = m.id; A.save();
    const root = $('#fan-root'); root.textContent = '';
    const M = m.meta, st = statusOf(m);
    root.append(h('div', { class: 'stack inline fan-back' }, h('button', { class: 'ghost', onclick: () => { A.S.ui.fan = null; A.save(); renderIndex(); window.scrollTo(0, 0); } }, '← All Fan Missions')));
    const box = h('div', { id: 'os-root' });
    A.missionDetail(m, box, [h('button', { onclick: () => printMission(m) }, 'Print A4'), h('a', { class: 'button', href: feedbackHref(m) }, 'Send feedback')]);
    root.append(h('div', { class: 'fan-tags fan-detail-tags' }, h('span', { class: 'fan-status fan-' + st, title: STATUS[st].note }, STATUS[st].label), h('span', { class: 'tag hot' }, M.genre), h('span', { class: 'tag' }, M.setting),
      h('span', { class: 'tag' }, M.win), h('span', { class: 'tag' }, `${M.players} players · ${M.size} · ${M.rounds} rounds · ${M.time} min`), h('span', { class: 'tag' }, M.needs), M.inspired ? h('span', { class: 'tag' }, 'Inspired by ' + M.inspired) : null), box);
    if (st === 'untested') root.append(h('details', { class: 'fan-focus', open: true }, h('summary', {}, h('strong', {}, `What to test (${M.testNotes.length})`)), h('ol', {}, M.testNotes.map((t) => h('li', {}, t))),
      h('p', {}, h('a', { class: 'button primary', href: feedbackHref(m) }, 'Send playtest feedback'))));
    if (M.changes.length) root.append(h('details', { class: 'fan-focus' }, h('summary', {}, h('strong', {}, `Changes (${M.changes.length})`)), h('ul', {}, M.changes.map((t) => h('li', {}, t)))));
    window.scrollTo(0, 0);
  }

  function render() {
    const m = list().find((x) => x.id === A.S.ui.fan);
    if (m) openMission(m); else renderIndex();
  }

  window.RW_VIEW_HOOKS = Object.assign(window.RW_VIEW_HOOKS || {}, { fan: render });
  // Links such as #fan/fm-glass-case open that Mission.
  function fromHash() {
    const mm = /^#fan\/(.+)$/.exec(location.hash); if (!mm) return;
    const m = list().find((x) => x.id === decodeURIComponent(mm[1])); if (!m) return;
    A.S.ui.fan = m.id; A.showView('fan');
  }
  addEventListener('hashchange', fromHash);
  if (A.started) fromHash(); else (window.RW_AFTER_START = window.RW_AFTER_START || []).push(fromHash);
  const v = document.getElementById('view-fan'); if (v && !v.hidden) render();
})();
