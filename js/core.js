/* core.js — محرّك صفحة الدرس (بارق · L1-01-d1 · v0-8)
   الواجهة العامة: window.BQ — تستعملها ملفات العناصر js/el/ELxx.js عبر BQ.register(id, {render(stage, ctx)}).
   عقد v0-8 (تعتمده ملفات العناصر):
   · ctx.alive() · ctx.say(lineId, opt) · ctx.later(fn, ms) · ctx.sleep(ms) · ctx.adult(html) · ctx.adultMeta(html)
   · ctx.instruction(text, lineId?, {icon?}) — للأعمار ٤–٩ بلا «النص المصاحب» يظهر زرّ السمّاعة + أيقونة الوظيفة لا الجملة (قرار ١)
   · BQ.audio.play: مهلة توقّف max(4 ث، 2× المتوقَّع) · BQ.ui.steps(parent, n, {label}) → {el, set(i)}
   · BQ.ui.trace(parent, {glyph, path, ordered, startTol, onDone}) · BQ.ui.endCard(stage, {title, note, line, onReplay, home})
   · BQ.state.age افتراضياً '4-6' · BQ.state.cc افتراضياً false (true لـ١٠–١٢)
   · BQ.AR(n) أرقام عربية-هندية · BQ.doneAt(id) · BQ.hoursSince(id) · BQ.gate.el16() · حدث window 'bq:done'
   لا مكتبات خارجية. */
(function () {
  'use strict';
  const D = window.BQ_DATA;
  const AGES = ['4-6', '7-9', '10-12'];
  const BQ = (window.BQ = { D, defs: {}, state: { current: null, done: new Set(), seqPos: -1, cc: false, age: '4-6' } });

  /* ---------- أدوات عامة ---------- */
  BQ.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  BQ.shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  BQ.reduced = () => !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const AR = (BQ.AR = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]));
  const ageLabel = (a) => AR(String(a).replace('-', '–'));
  BQ.h = function h(tag, props, ...kids) {
    const [t, ...cls] = tag.split('.');
    const el = document.createElement(t || 'div');
    if (cls.length) el.className = cls.join(' ');
    if (props) for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className += (el.className ? ' ' : '') + v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat(Infinity)) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
    return el;
  };
  const h = BQ.h;
  const PFX = 'bq-L1-01-d1-';
  const store = {
    get(k, d) { try { const v = localStorage.getItem(PFX + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) { /* تخزين غير متاح */ } },
    del(k) { try { localStorage.removeItem(PFX + k); } catch (e) { /* */ } },
  };
  BQ.store = store;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const cleanName = (n) => String(n || '').replace(/\s*\(.*\)/, '');

  /* ---------- الأصول ---------- */
  const norm = (id) => String(id).replace(/^L1-01-AS-/, '').replace(/^L1-01_/, '');
  BQ.img = function (id) {
    const k = norm(id);
    if (D.assets[k]) return D.assets[k];
    const info = D.asset_info[k];
    const label = info ? info.purpose : k;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" rx="24" fill="#F1FAFE"/><rect x="8" y="8" width="384" height="284" rx="20" fill="none" stroke="#82C3E8" stroke-width="4" stroke-dasharray="14 10"/><text x="200" y="150" font-family="sans-serif" font-size="22" fill="#00345B" text-anchor="middle">${label.replace(/[<&]/g, '')}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };
  BQ.hasImg = (id) => !!D.assets[norm(id)];
  BQ.char = { BRQ: 'media/img/comp_cut_BRQ_huefix.webp', MAJ: 'media/img/comp_cut_MAJ.webp', SAY: 'media/img/comp_cut_SAY.webp' };
  /* [brq-anim v1] بارق المتحرّك (Grok i2v → WebP شفّاف): idle · talk · cheer · clap · wave · point · think — مع صورة ثابتة لكلّ حالة */
  BQ.char.MOTIONS = ['idle', 'talk', 'cheer', 'clap', 'wave', 'point', 'think'];
  BQ.char.anim = (s) => 'media/brq/brq_' + (BQ.char.MOTIONS.includes(s) ? s : 'idle') + '.webp';
  BQ.char.still = (s) => 'media/brq/brq_' + (BQ.char.MOTIONS.includes(s) ? s : 'idle') + '_still.webp';
  BQ.line = (id) => D.lines[id] || null;
  const audioSet = new Set(D.audio);
  BQ.hasAudio = (id) => audioSet.has(id);

  /* ---------- الصوت + النصّ المصاحب ---------- */
  const SPEAKER = { 'ماجد': 'ماجِد', 'سيف': 'سَيْف', 'بارق': 'بارِق', 'واجهة': '', 'مؤثّر': '' };
  const A = (BQ.audio = { cur: null, token: 0, capEl: null, onLine: null });
  A.pending = null; // مُحلّل السطر الجاري — يُستدعى عند المقاطعة حتى لا يتجمّد من ينتظره
  const settle = () => { const r = A.pending; A.pending = null; if (r) r(); };
  /* عنصر صوت واحد مشترك يُفتح بلمسة «ابْدَأْ» (سياسة التشغيل في iOS/iPadOS تحفظ الفتح للعنصر نفسه) — T10 */
  let shared = null, unlocked = false;
  const silentURL = (() => {
    try {
      const n = 800, b = new Uint8Array(44 + n), dv = new DataView(b.buffer), w = (o, s) => { for (let i = 0; i < s.length; i++) b[o + i] = s.charCodeAt(i); };
      w(0, 'RIFF'); dv.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
      dv.setUint32(24, 8000, true); dv.setUint32(28, 8000, true); dv.setUint16(32, 1, true); dv.setUint16(34, 8, true); w(36, 'data'); dv.setUint32(40, n, true); b.fill(128, 44);
      return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
    } catch (e) { return ''; }
  })();
  const mkAudio = () => { try { const a = new Audio(); a.preload = 'auto'; a.setAttribute('playsinline', ''); return a; } catch (e) { return null; } };
  const sharedEl = () => { if (!shared) shared = mkAudio(); return shared; };
  /* v0-12 · iOS/iPadOS: كلّ تشغيل يمرّ بعناصر صوت «مفتوحة» بلمسة — عنصر الكلام المشترك + مجمّع للمؤثّرات/المقاطع.
     أوّل لمسة/نقرة/مفتاح في الصفحة (لا «ابْدَأْ» وحدها) تفتحها كلّها وتستأنف AudioContext؛ ما رُفض يُعاد عند اللمسة التالية،
     ويُستأنف الكلام المعلّق عند العودة إلى الصفحة (visibilitychange). */
  const POOL_N = 6, pool = [], queue = [];
  let gestured = false;
  function poolEl() {
    const now = Date.now();
    let a = pool.find((x) => (x.paused || x.ended) && !(x._bqClaim > now - 500));
    if (!a) { a = mkAudio(); if (!a) return null; if (pool.length < 12) pool.push(a); }
    a._bqClaim = now;
    if (a._bqOff) { a._bqOff(); a._bqOff = null; }
    return a;
  }
  function unlockEl(a) {
    if (!a || a._bqUnlocked || !silentURL || !a.paused) return;
    try { a.src = silentURL; const p = a.play(); if (p && p.then) p.then(() => { a._bqUnlocked = true; if (a.src === silentURL || a.currentSrc === silentURL) a.pause(); }).catch(() => {}); } catch (e) { /* */ }
  }
  /** يُستدعى داخل لمسة المستخدم (ابْدَأْ · التالي · أيّ لمسة أولى) */
  A.unlock = function () {
    const au = sharedEl(); if (!au || unlocked || !silentURL) return;
    try {
      if (A.pending && A.cur === au) { const p = au.play(); if (p && p.then) p.then(() => { unlocked = true; }).catch(() => {}); } // السطر المعلّق نفسه يفتح العنصر
      else if (au.paused) { au.src = silentURL; const p = au.play(); if (p && p.then) p.then(() => { unlocked = true; }).catch(() => {}); }
    } catch (e) { /* */ }
  };
  function onGesture() {
    A.unlock();
    if (!gestured) { gestured = true; while (pool.length < POOL_N) { const a = mkAudio(); if (!a) break; pool.push(a); } }
    pool.forEach(unlockEl);
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!A.ctx && C) A.ctx = new C();
      if (A.ctx && A.ctx.state !== 'running') A.ctx.resume().catch(() => {});
    } catch (e) { /* */ }
    const now = Date.now();
    queue.splice(0).forEach((q) => { if (now - q.t < 6000) { try { q.fn(); } catch (e) { /* */ } } });
  }
  ['touchend', 'pointerup', 'click', 'keydown'].forEach((ev) => document.addEventListener(ev, onGesture, { capture: true, passive: true }));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    if (A.ctx && A.ctx.state !== 'running') A.ctx.resume().catch(() => {});
    const c = A.cur; if (c && c.paused && !c.ended && (A.pending || A.segLive)) { const p = c.play(); if (p && p.catch) p.catch(() => {}); }
  });
  /** عنصر الكلام المفتوح (للمقاطع المقصوصة: kit.playSeg) */
  A.voice = () => sharedEl();
  /** عنصر مؤثّر مفتوح من المجمّع */
  A.pooled = () => poolEl() || mkAudio();
  /** رفض المتصفّح التشغيل: زرّ «اضْغَطْ لِلاسْتِماعِ» + إعادة تلقائية عند أيّ لمسة تالية */
  A.whenUnlocked = (fn) => { queue.push({ fn, t: Date.now() }); };
  A.blocked = (retry) => { let once = false; const go = () => { if (once) return; once = true; hideUnlock(); retry(); }; showUnlock(go); A.whenUnlocked(go); };
  A.stop = function () {
    A.token++;
    if (A.cur) { try { A.cur.pause(); } catch (e) {} A.cur = null; }
    settle();
    A.caption(null);
    hideUnlock();
  };
  A.caption = function (id) {
    const cap = A.capEl; if (!cap) return;
    const L = id && BQ.line(id);
    if (!L || !L.t || L.sp === 'مؤثّر' || L.sp === 'واجهة') { cap.hidden = true; cap.textContent = ''; return; }
    cap.replaceChildren(SPEAKER[L.sp] ? h('b', null, SPEAKER[L.sp] + ': ') : '', L.t.replace(/⏸\S*/g, ' '));
    cap.hidden = !BQ.state.cc;
  };
  const estMs = (id) => { const L = BQ.line(id); return L ? Math.max(1200, L.t.length * 85) : 900; };
  /** play(id) → Promise تُحلّ عند انتهاء السطر، أو فوراً إن أوقف، أو بعد مهلة التوقّف max(4 ث، 2× المتوقَّع) */
  A.play = function (id, opt) {
    opt = opt || {};
    const my = ++A.token;
    if (A.cur) { try { A.cur.pause(); } catch (e) {} A.cur = null; }
    settle();
    hideUnlock();
    if (!opt.noCaption) A.caption(id);
    if (A.onLine) A.onLine(id);
    return new Promise((resolve) => {
      let fin = false, wd = 0, au = null;
      const off = () => { if (!au) return; au.removeEventListener('ended', finish); au.removeEventListener('error', finish); au.removeEventListener('loadedmetadata', onMeta); };
      function finish() { if (fin) return; fin = true; clearTimeout(wd); off(); if (A.pending === finish) A.pending = null; if (my === A.token && !opt.keepCaption) A.caption(null); resolve(); }
      const arm = (ms) => { clearTimeout(wd); wd = setTimeout(finish, Math.max(4000, ms)); };
      function onMeta() { const d = au && au.duration; if (d && isFinite(d)) arm(2 * d * 1000 / (opt.rate || 1)); }
      A.pending = finish;
      if (!audioSet.has(id)) { setTimeout(finish, estMs(id)); return; }
      au = sharedEl() || new Audio();
      try { au.pause(); } catch (e) {}
      au.src = 'media/audio/' + id + '.mp3';
      au.volume = opt.volume == null ? 1 : opt.volume;
      try { au.defaultPlaybackRate = opt.rate || 1; au.playbackRate = opt.rate || 1; } catch (e) { /* */ }
      A.cur = au;
      au.addEventListener('ended', finish);
      au.addEventListener('error', finish);
      au.addEventListener('loadedmetadata', onMeta);
      arm(2 * estMs(id));
      let p; try { p = au.play(); } catch (e) { p = null; }
      if (p && p.catch) p.catch((err) => {
        if (fin || my !== A.token) return;
        if (err && err.name === 'NotAllowedError') { clearTimeout(wd); A.blocked(() => { if (fin || my !== A.token) return; arm(2 * estMs(id)); const q = au.play(); if (q && q.catch) q.catch(() => setTimeout(finish, 600)); }); }
        else setTimeout(finish, 600);
      });
    });
  };
  /** seq([...]) — عناصر: معرّف سطر · رقم (سكتة بالمللي ث) · {id, rate} · دالة */
  A.seq = async function (list) {
    const my = ++A.token;
    for (const it of list) {
      if (my !== A.token) return false;
      if (typeof it === 'number') await BQ.sleep(it);
      else if (typeof it === 'function') await it();
      else if (typeof it === 'string') { A.token = my - 1; await A.play(it); }
      else if (it && it.id) { A.token = my - 1; await A.play(it.id, it); }
      if (A.token !== my) return false;
    }
    return true;
  };
  /** مؤثّر أو موسيقى بلا نصّ مصاحب ولا يقطع الكلام */
  A.fx = function (id, vol) {
    if (!audioSet.has(id)) return { stop() {}, done: Promise.resolve() };
    const au = A.pooled(); if (!au) return { stop() {}, done: Promise.resolve() };
    let fin = false, stopped = false, res;
    const done = new Promise((r) => { res = r; });
    const end = () => { if (fin) return; fin = true; au.removeEventListener('ended', end); au.removeEventListener('error', end); au._bqClaim = 0; res(); };
    au._bqOff = end;
    au.addEventListener('ended', end); au.addEventListener('error', end);
    au.src = 'media/audio/' + id + '.mp3'; au.volume = vol == null ? 0.8 : vol;
    const go = () => { if (stopped || fin) return; let p; try { p = au.play(); } catch (e) { p = null; } if (p && p.catch) p.catch((err) => { if (err && err.name === 'NotAllowedError') A.whenUnlocked(go); else end(); }); };
    go();
    return { el: au, stop() { stopped = true; try { au.pause(); } catch (e) {} end(); }, done };
  };
  BQ.sfx = { ok: 'bariq_L1-01_sfx-check-done', snap: 'bariq_L1-01_sfx-tile-snap', flip: 'bariq_L1-01_sfx-card-flip', bead: 'bariq_L1-01_sfx-compass-bead' };
  /* زرّ «اضْغَطْ لِلاسْتِماعِ» حين يرفض المتصفّح التشغيل */
  let unlockBtn = null;
  function hideUnlock() { if (unlockBtn) { unlockBtn.remove(); unlockBtn = null; } }
  function showUnlock(retry) {
    hideUnlock();
    const host = $('.elp-play') || $('#content'); if (!host) return;
    unlockBtn = h('button.bq-unlock', { type: 'button', onclick: () => { hideUnlock(); A.unlock(); retry(); } }, BQ.icon('speaker'), 'اضْغَطْ لِلاسْتِماعِ');
    host.prepend(unlockBtn);
  }

  /* ---------- أيقونات ---------- */
  const I = (BQ.icons = {
    speaker: '<svg viewBox="0 0 48 48"><path d="M8 18h8l11-9v30l-11-9H8z" fill="currentColor"/><path d="M32 17a9 9 0 0 1 0 14M36.5 12a16 16 0 0 1 0 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>',
    next: '<svg viewBox="0 0 48 48"><path d="M30 10 16 24l14 14" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    prev: '<svg viewBox="0 0 48 48"><path d="M18 10l14 14-14 14" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    home: '<svg viewBox="0 0 48 48"><path d="M8 23 24 9l16 14M13 20v18h9V29h4v9h9V20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    cc: '<svg viewBox="0 0 48 48"><rect x="5" y="10" width="38" height="28" rx="6" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M21 20.5a5 5 0 1 0 0 7M34 20.5a5 5 0 1 0 0 7" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>',
    adult: '<svg viewBox="0 0 48 48"><circle cx="24" cy="15" r="7" fill="currentColor"/><path d="M10 41c1-9 7-14 14-14s13 5 14 14z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 48 48"><path d="M16 10v28l24-14z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 48 48"><path d="M13 10h8v28h-8zM27 10h8v28h-8z" fill="currentColor"/></svg>',
    replay: '<svg viewBox="0 0 48 48"><path d="M12 24a12 12 0 1 0 4-9" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M9 8v10h10" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 48 48"><path d="M11 25l9 9 17-19" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    same: '<svg viewBox="0 0 96 48"><circle cx="26" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="70" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="5"/></svg>',
    diff: '<svg viewBox="0 0 96 48"><circle cx="26" cy="24" r="15" fill="none" stroke="currentColor" stroke-width="5"/><rect x="56" y="10" width="28" height="28" rx="2" fill="none" stroke="currentColor" stroke-width="5"/></svg>',
    ear: '<svg viewBox="0 0 48 48"><path d="M16 20a10 10 0 1 1 18 6c-2 3-5 4-5 8a5 5 0 0 1-9 2" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M21 21a4 4 0 1 1 7 2" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>',
    mouth: '<svg viewBox="0 0 48 48"><path d="M8 24c5-6 11-7 16-4 5-3 11-2 16 4-5 7-11 9-16 9s-11-2-16-9z" fill="currentColor"/><path d="M11 24h26" stroke="var(--c-card-fill)" stroke-width="2.5"/></svg>',
    hand: '<svg viewBox="0 0 48 48"><path d="M18 27V11a3 3 0 0 1 6 0v12-15a3 3 0 0 1 6 0v15-12a3 3 0 0 1 6 0v17c0 8-5 13-12 13-6 0-9-3-12-8l-5-8a3 3 0 0 1 5-3z" fill="currentColor"/></svg>',
    eye: '<svg viewBox="0 0 48 48"><path d="M4 24c5-9 12-14 20-14s15 5 20 14c-5 9-12 14-20 14S9 33 4 24z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/><circle cx="24" cy="24" r="7" fill="currentColor"/></svg>',
    wave: '<svg viewBox="0 0 48 48"><path d="M6 24h4M14 16v16M20 10v28M26 18v12M32 13v22M38 20v8M42 24h1" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
    star: '<svg viewBox="0 0 48 48"><path d="M24 5l5.6 12.3 13.4 1.4-10 9 2.9 13.2L24 34.2 12.1 40.9 15 27.7l-10-9 13.4-1.4z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 48 48"><path d="M14 14l20 20M34 14 14 34" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
    menu: '<svg viewBox="0 0 48 48"><path d="M9 14h30M9 24h30M9 34h30" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/></svg>',
  });
  BQ.icon = (name, cls) => h('span.bq-ic' + (cls ? '.' + cls : ''), { 'aria-hidden': 'true', html: I[name] || '' });

  /* ---------- مكوّنات الواجهة ---------- */
  const UI = (BQ.ui = {});
  const anim = (el, cls, ms) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 700); };
  UI.ok = (el) => { el.classList.add('is-ok'); anim(el, 'fx-pop', 400); };
  UI.shake = (el) => { if (!BQ.reduced()) anim(el, 'fx-shake', 500); else anim(el, 'fx-mark', 650); el.classList.add('is-dim'); };
  UI.pulse = (el) => anim(el, 'fx-pulse', 1300);
  UI.glow = (el, on) => el.classList.toggle('is-glow', on !== false);
  UI.reset = (el) => el.classList.remove('is-ok', 'is-dim', 'is-glow', 'is-hidden', 'is-picked');

  /** زرّ المثير (اسمع الصوت) — هويّة مختلفة عن سمّاعة التعليمة (تصميم D12) */
  UI.listenBtn = (onClick, label) => h('button.bq-listen.bq-hear', { type: 'button', 'aria-label': label || 'اسْمَعِ الصَّوْتَ', onclick: onClick }, BQ.icon('ear'));

  /** بطاقات اختيار — items: [{id, img, label, icon, aria}] */
  UI.choices = function (parent, opt) {
    const wrap = h('div.bq-choices' + (opt.cls ? '.' + opt.cls : ''), { role: 'group', 'aria-label': opt.aria || 'صُوَرٌ لِلاخْتِيارِ' });
    const btns = opt.items.map((it) => {
      const b = h('button.bq-choice', { type: 'button', 'aria-label': it.aria || it.label || 'صورة', dataset: { id: it.id } },
        it.img ? h('img', { src: BQ.img(it.img), alt: '', draggable: 'false' }) : null,
        it.icon ? BQ.icon(it.icon, 'big') : null,
        it.glyph ? h('span.bq-glyph', null, it.glyph) : null,
        it.label ? h('span.bq-lbl', null, it.label) : null,
        h('span.bq-tick', { 'aria-hidden': 'true', html: I.check }));
      b.addEventListener('click', () => { if (!wrap.classList.contains('is-locked') && !b.classList.contains('is-hidden')) opt.onPick && opt.onPick(it, b, btns); });
      return b;
    });
    wrap.append(...btns);
    parent.append(wrap);
    wrap.lock = (v) => wrap.classList.toggle('is-locked', v !== false);
    wrap.btns = btns;
    return wrap;
  };

  /** خرزات البوصلة (تقدّم لا درجة) — للجولات المرصودة وحدها */
  UI.beads = function (parent, n) {
    const w = h('div.bq-beads', { 'aria-label': 'التَّقَدُّمُ' });
    const bs = Array.from({ length: n }, () => h('span.bq-bead'));
    w.append(...bs); parent.append(w);
    return { el: w, set(i, st) { if (bs[i]) { bs[i].className = 'bq-bead is-' + (st || 'on'); if (st !== 'cur') BQ.audio.fx(BQ.sfx.bead, 0.5); } }, cur(i) { bs.forEach((b, j) => b.classList.toggle('is-cur', j === i)); } };
  };

  /** مؤشّر الخطوات الموحّد: نقاط + الحاليّة؛ بلا أرقام لـ٤–٩، و«١ / ٣» لـ١٠–١٢ — {el, set(i)} */
  UI.steps = function (parent, n, opt) {
    opt = opt || {}; n = Math.max(1, n | 0);
    const el = h('div.bq-steps', { role: 'img' });
    const dots = Array.from({ length: n }, () => h('span.bq-step', { 'aria-hidden': 'true' }));
    const txt = h('span.bq-steps-t', { 'aria-hidden': 'true' });
    el.append(...dots, txt);
    if (parent) parent.append(el);
    let cur = 0;
    const set = (i) => {
      cur = Math.max(0, Math.min(n - 1, i | 0));
      dots.forEach((d, j) => { d.className = 'bq-step' + (j < cur ? ' is-done' : j === cur ? ' is-cur' : ''); });
      const num = BQ.state.age === '10-12';
      txt.hidden = !num;
      txt.textContent = (opt.label ? opt.label + ' ' : '') + AR(cur + 1) + ' / ' + AR(n);
      el.setAttribute('aria-label', (opt.label || 'الخُطْوَةُ') + ' ' + AR(cur + 1) + ' مِنْ ' + AR(n));
    };
    set(0);
    return { el, set, get i() { return cur; }, n };
  };

  /** [brq-anim v1] بارق متحرّك: <span.bq-brq><img></span> بإطار ثابت بنسبة الصورة القديمة؛ el.brq(state) يبدّل الحالة.
   *  prefers-reduced-motion ← الصورة الثابتة للحالة نفسها. */
  let brqPre = false;
  UI.brq = function (state, cls, settle) {
    if (!brqPre) { brqPre = true; if (!BQ.reduced()) ['talk', 'cheer', 'think', 'idle'].forEach((s) => { const i = new Image(); i.src = BQ.char.anim(s); }); }
    const img = h('img', { alt: '', decoding: 'async', draggable: 'false' });
    const el = h('span.bq-brq' + (cls ? '.' + cls : ''), { 'aria-hidden': 'true' }, img);
    el.brq = (s) => { s = BQ.char.MOTIONS.includes(s) ? s : 'idle'; if (el.dataset.s === s) return el; el.dataset.s = s; img.src = BQ.reduced() ? BQ.char.still(s) : BQ.char.anim(s); return el; };
    el.brq(state || 'idle');
    if (settle) setTimeout(() => el.brq('idle'), settle); // يهدأ بعد مدّة
    return el;
  };
  const MOOD = (id) => (/fb-yes|FB_0[35]|EL06_05/.test(id || '') ? 'cheer' : /retry/.test(id || '') ? 'think' : '');

  /** بارق يطلّ من حافّة المسرح ويقول سطراً — يتكلّم أثناء السطر، ثم opt.mood (cheer|think|clap…) ثم يهدأ ويخرج */
  UI.bariq = async function (stage, lineId, opt) {
    opt = opt || {};
    const brq = UI.brq(lineId ? 'talk' : 'wave');
    const pop = h('div.bq-bariq.has-anim' + (opt.side === 'left' ? '.left' : ''), { 'aria-hidden': 'true' }, brq);
    // v0-12: فوق منطقة اللعب (غير متمرّرة) لا داخل المسرح المتمرّر — ظهوره لا يصنع تمريراً
    ((stage && stage.closest && stage.closest('.elp-play')) || stage).append(pop);
    requestAnimationFrame(() => pop.classList.add('in'));
    if (lineId) await BQ.audio.play(lineId); else await BQ.sleep(opt.ms || 1400);
    const mood = opt.mood || MOOD(lineId);
    if (mood) { brq.brq(mood); if (opt.mood) await BQ.sleep(opt.moodMs || 900); } else brq.brq('idle');
    pop.classList.remove('in'); setTimeout(() => pop.remove(), 450);
  };

  /** ورقة ختام العنصر — opt: {title, note, line, onReplay, home:[≤٣ أسطر «في البيت اليوم»]} */
  UI.endCard = function (stage, opt) {
    opt = opt || {};
    const nx = nextInfo();
    const tid = 'bq-end-' + Math.random().toString(36).slice(2, 7);
    const home = (opt.home || []).filter(Boolean).slice(0, 3);
    const nextBtn = h('button.bq-btn', { type: 'button', onclick: () => { A.unlock(); BQ.goNext(); } }, 'التّالي', BQ.icon('next'));
    /* v0-12: الورقة فوق منطقة اللعب كلّها (لا داخل المسرح المتمرّر) وتتّسع للإطار بلا تمرير: الأزرار قبل «في البيت اليوم» */
    const card = h('div.bq-end', { role: 'dialog', 'aria-labelledby': tid },
      h('div.bq-end-card', null,
        UI.brq('cheer', 'bq-end-brq', 6000), // [brq-anim v1]
        h('p.bq-end-t', { id: tid }, opt.title || 'أَحْسَنْتَ!'),
        opt.note ? h('p.bq-end-n', null, opt.note) : null,
        h('div.bq-end-row', null,
          h('button.bq-btn.ghost', { type: 'button', onclick: () => { card.remove(); opt.onReplay && opt.onReplay(); } }, BQ.icon('replay'), 'أَعِدِ النَّشاطَ'),
          nextBtn),
        nx ? h('p.bq-end-next', null, nx.small + ': ', h('b', null, nx.name)) : null,
        home.length ? homeBox(home) : null));
    const host = (stage && stage.closest && stage.closest('.elp-play')) || stage;
    host.append(card);
    requestAnimationFrame(() => { try { nextBtn.focus({ preventScroll: true }); } catch (e) { /* */ } });
    if (opt.line) BQ.audio.play(opt.line);
    return card;
  };
  function homeBox(lines) {
    return h('div.bq-home', null, h('p.bq-home-t', null, BQ.icon('home'), 'في البيت اليوم'), h('ul', null, lines.map((t) => h('li', null, t))));
  }

  /** تتبّع الحرف بالإصبع/الفأرة — opt: {glyph, path:[[x,y],…] (0..1), ordered, startTol, tol, onDone} */
  UI.trace = function (parent, opt) {
    opt = opt || {};
    const box = h('div.bq-trace');
    const cv = h('canvas', { width: 800, height: 800, 'aria-label': 'تَتَبَّعِ الحَرْفَ بِإِصْبَعِكَ', role: 'img' });
    box.append(h('span.bq-trace-glyph', { 'aria-hidden': 'true' }, opt.glyph || 'م'), cv);
    parent.append(box);
    const g = cv.getContext('2d');
    // مسار «م» المنفصلة: رأس دائريّ ثم ذيل نازل — نقاط مرجعية للتحقّق (نسبة من المربّع)
    const path = opt.path || [[0.62, 0.40], [0.52, 0.33], [0.40, 0.38], [0.40, 0.48], [0.52, 0.52], [0.62, 0.45], [0.62, 0.40], [0.66, 0.52], [0.66, 0.66], [0.66, 0.80]];
    const ordered = !!opt.ordered, TOL = opt.tol || 0.075, START = opt.startTol || 0.11;
    const hit = path.map(() => false);
    let drawing = false, last = null, done = false, next = 0;
    const start = h('span.bq-trace-start', { style: { left: path[0][0] * 100 + '%', top: path[0][1] * 100 + '%' }, 'aria-hidden': 'true' });
    box.append(start);
    const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; };
    const finish = (info) => { if (done) return; done = true; box.classList.add('is-done'); opt.onDone && opt.onDone(info || {}); };
    const check = (p) => {
      if (ordered) { while (next < path.length && dist(p, path[next]) < TOL) { hit[next] = true; next++; } if (next >= path.length) finish(); }
      else { path.forEach((q, i) => { if (dist(q, p) < TOL) hit[i] = true; }); if (hit.every(Boolean)) finish(); }
    };
    const draw = (p) => {
      g.strokeStyle = getComputedStyle(box).getPropertyValue('--trace-ink').trim() || '#00345B';
      g.lineWidth = 44; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath(); g.moveTo(last[0] * 800, last[1] * 800); g.lineTo(p[0] * 800, p[1] * 800); g.stroke();
      const steps = Math.max(1, Math.ceil(dist(last, p) / 0.02));
      for (let s = 1; s <= steps; s++) check([last[0] + (p[0] - last[0]) * s / steps, last[1] + (p[1] - last[1]) * s / steps]);
      last = p;
    };
    const flash = () => { start.hidden = false; anim(start, 'is-flash', 900); };
    /* v0-12 · اللمس: اللوحة تمتلك الإصبع (لا تمرير ولا تكبير ولا قائمة لمس) — touch-action:none + منع الافتراضيّ + التقاط المؤشّر */
    box.style.touchAction = 'none'; cv.style.touchAction = 'none';
    const noScroll = (e) => { if (e.cancelable) e.preventDefault(); };
    cv.addEventListener('touchstart', noScroll, { passive: false });
    cv.addEventListener('touchmove', noScroll, { passive: false });
    cv.addEventListener('contextmenu', noScroll);
    cv.addEventListener('pointerdown', (e) => {
      if (e.cancelable) e.preventDefault();
      const p = pos(e);
      if (ordered && !done && next === 0 && dist(p, path[0]) > START) { flash(); return; } // يبدأ من النقطة الخضراء
      drawing = true; last = p; try { cv.setPointerCapture(e.pointerId); } catch (x) { /* */ } start.hidden = true; check(p); draw(p);
    });
    cv.addEventListener('pointermove', (e) => { if (!drawing) return; if (e.cancelable) e.preventDefault(); const ev = e.getCoalescedEvents ? e.getCoalescedEvents() : null; if (ev && ev.length > 1) ev.forEach((c) => draw(pos(c))); else draw(pos(e)); });
    const up = (e) => { drawing = false; try { if (e && cv.hasPointerCapture && cv.hasPointerCapture(e.pointerId)) cv.releasePointerCapture(e.pointerId); } catch (x) { /* */ } };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    // مسار بديل للوحة المفاتيح/المفاتيح الخاصّة: ضغطة مطوّلة من الكبير تُتمّ التتبّع «بمساعدة» (T25)
    let hold = 0;
    const adultBtn = h('button.bq-trace-adult', { type: 'button', title: 'اضغط مطوّلاً', 'aria-label': 'للكبير: اضغط مطوّلاً لإتمام التتبّع بمساعدة' }, 'للكبير: أتمِمْ');
    const hs = () => { clearTimeout(hold); adultBtn.classList.add('is-hold'); hold = setTimeout(() => { adultBtn.classList.remove('is-hold'); finish({ assisted: true }); }, 900); };
    const he = () => { clearTimeout(hold); adultBtn.classList.remove('is-hold'); };
    adultBtn.addEventListener('pointerdown', hs); adultBtn.addEventListener('pointerup', he); adultBtn.addEventListener('pointerleave', he);
    adultBtn.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); hs(); } });
    adultBtn.addEventListener('keyup', he);
    if (opt.adultComplete !== false) box.append(adultBtn);
    box.clear = () => { g.clearRect(0, 0, 800, 800); hit.fill(false); next = 0; done = false; start.hidden = false; box.classList.remove('is-done'); };
    return box;
  };

  /** بطاقة كلمة مشكولة تظهر لحظة نطقها */
  UI.word = (text, cls) => h('span.bq-word' + (cls ? '.' + cls : ''), { lang: 'ar' }, text);

  /** إشعار قصير للكبير */
  UI.toast = function (text) {
    let t = $('#bqToast');
    if (!t) { t = h('div.bq-toast', { id: 'bqToast', role: 'status', 'aria-live': 'polite' }); ($('.page-root') || document.body).append(t); }
    t.textContent = text; t.classList.add('in');
    clearTimeout(t._tm); t._tm = setTimeout(() => t.classList.remove('in'), 3600);
  };

  /* ---------- البيانات المشتقّة: المسار والجلسات حسب العمر ---------- */
  BQ.register = function (id, def) { BQ.defs[id] = def; };
  BQ.meta = (id) => D.elements.find((e) => e.id === id);
  const SES = D.sessions || {};
  /** المسار الخطّيّ لـ«التالي» حسب العمر: [{id, s}] — بلا «اختبر نفسك» وبلا المتخطّى لهذا العمر */
  BQ.path = function (age) {
    age = age || BQ.state.age;
    const skip = new Set((D.skip_by_age || {})[age] || []);
    const out = [];
    ((D.path_by_age || {})[age] || []).forEach((s) => (SES[s] ? SES[s].ids : []).forEach((id) => { if (!skip.has(id)) out.push({ id, s }); }));
    if (!out.length) (D.next || []).forEach((id) => out.push({ id, s: 'A' }));
    return out;
  };
  /** حرف الجلسة الأساس لِلّون (ج-١/ج-٢ ← ج) */
  const sesKey = (id) => String(sesOf(id) || ((BQ.meta(id) || {}).session) || 'A').charAt(0);
  const sesOf = (id) => { const p = BQ.path(); const x = p.find((q) => q.id === id); if (x) return x.s; for (const k of Object.keys(SES)) if (SES[k].ids.includes(id)) return k; return null; };
  /** جلسة وجهةٍ ما: من موضعها في المسار إن عُرف (العنصر الواحد قد يظهر في جلستين) */
  const sesAt = (n) => { const p = BQ.path(); return n && n.pos != null && p[n.pos] && p[n.pos].id === n.id ? p[n.pos].s : sesOf(n.id); };
  /** موضع العنصر في المسار (يحترم seqPos إن طابق) */
  function posOf(id, hint) {
    const p = BQ.path();
    if (hint != null && p[hint] && p[hint].id === id) return hint;
    if (p[BQ.state.seqPos] && p[BQ.state.seqPos].id === id) return BQ.state.seqPos;
    return p.findIndex((q) => q.id === id);
  }
  /** الوجهة التالية من موضع حاليّ: عنصر أو بطاقة نهاية جلسة */
  function nextFrom(cur, pos) {
    const p = BQ.path();
    if (/^end-/.test(cur)) {
      const k = cur.slice(4); const i = p.findIndex((q, j) => q.s !== k && j > 0 && p[j - 1].s === k);
      return i >= 0 ? { id: p[i].id, pos: i } : { id: 'plan' };
    }
    if (cur === 'EL16') return { id: 'plan' };
    if (pos >= 0 && p[pos]) {
      const n = p[pos + 1];
      if (!n || n.s !== p[pos].s) return { id: 'end-' + p[pos].s, pos };
      return { id: n.id, pos: pos + 1 };
    }
    // عنصر خارج مسار هذا العمر (مثلاً «التراكيب» لـ٤–٦): أوّل عنصر من المسار يليه في الترتيب الكامل
    const full = D.next || []; const i = full.indexOf(cur);
    for (let j = i + 1; i >= 0 && j < full.length; j++) { const k = p.findIndex((q) => q.id === full[j]); if (k >= 0) return { id: full[j], pos: k }; }
    return { id: 'plan' };
  }
  function prevFrom(cur, pos) {
    const p = BQ.path();
    if (/^end-/.test(cur)) return pos >= 0 && p[pos] ? { id: p[pos].id, pos } : null;
    if (cur === 'EL16') { const l = p.length - 1; return l >= 0 ? { id: p[l].id, pos: l } : null; }
    if (pos > 0) return { id: p[pos - 1].id, pos: pos - 1 };
    if (pos === 0) return null;
    const full = D.next || []; const i = full.indexOf(cur);
    for (let j = i - 1; j >= 0; j--) { const k = p.findIndex((q) => q.id === full[j]); if (k >= 0) return { id: full[j], pos: k }; }
    return null;
  }
  const nameOf = (id) => (id === 'plan' ? 'خطة الدرس' : /^end-/.test(id) ? 'نهاية الجلسة ' + ((SES[id.slice(4)] || {}).label || '') : cleanName((BQ.meta(id) || {}).name));
  /** وصف «التالي» للعنصر الجاري: {small, name} */
  function nextInfo() {
    const cur = BQ.state.current; if (!cur || cur === 'plan') return null;
    const n = nextFrom(cur, posOf(cur));
    const s = sesAt(n);
    const small = /^end-/.test(n.id) ? 'التالي' : n.id === 'plan' ? 'التالي' : s && SES[s] ? 'التالي في الجلسة ' + SES[s].label : 'التالي في مسار الدرس';
    return { small, name: nameOf(n.id), to: n };
  }
  BQ.nextInfo = nextInfo;

  /* ---------- الإنجاز والتوقيت ---------- */
  let cleanups = [], life = null;
  /* v0-10 (المالك: «ظلّ الصوت القديم يعمل وحدث تداخل»): كل وسيط صوت/فيديو يُشغَّل يُسجَّل، وعند ترك العنصر
     يُوقَف كلّ ما بدأ قبل الانتقال (صوت، فيديو، مؤثّر، سرير موسيقى) وتُفرَّغ أيّ لعبة Godot قديمة */
  const MEDIA = new Set();
  try {
    const _play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () { MEDIA.add(this); return _play.apply(this, arguments); };
  } catch (e) {}
  function hushAll() {
    MEDIA.forEach((m) => { try { if (!m.paused) m.pause(); } catch (e) {} });
    MEDIA.clear();
    document.querySelectorAll('#content iframe').forEach((f) => { try { f.src = 'about:blank'; } catch (e) {} });
  }
  BQ.hushAll = hushAll;
  function teardown() {
    if (life) { life.alive = false; life.timers.forEach(clearTimeout); life.timers.clear(); }
    BQ.audio.stop();
    hushAll();
    cleanups.forEach((f) => { try { f(); } catch (e) {} }); cleanups = [];
    closeConfirm();
  }
  BQ.doneAt = (id) => { try { const v = localStorage.getItem(PFX + 'ts-' + id); return v ? +v : null; } catch (e) { return null; } };
  BQ.hoursSince = (id) => { const t = BQ.doneAt(id); return t ? (Date.now() - t) / 36e5 : null; };
  /** «اختبر نفسك» تحقّق مؤجَّل: يُفتح مبكّراً (<١٢ ساعة بعد «تدرّب» أو بلا سجلّ) معاينةً للكبير فقط */
  BQ.gate = { el16() { const hrs = BQ.hoursSince('EL13'); return { hours: hrs, early: hrs == null || hrs < 12, preview: !!BQ.state.el16Preview }; } };
  BQ.markDone = function (id) {
    const first = !BQ.state.done.has(id);
    BQ.state.done.add(id); store.set('done', [...BQ.state.done]);
    const ts = Date.now();
    try { localStorage.setItem(PFX + 'ts-' + id, String(ts)); } catch (e) { /* */ }
    $$('.item[data-id="' + id + '"]').forEach((it) => it.classList.add('is-done'));
    updateProgress();
    try { window.dispatchEvent(new CustomEvent('bq:done', { detail: { id, ts, first } })); } catch (e) { /* */ }
  };
  BQ.goNext = function () {
    const cur = BQ.state.current;
    const n = nextFrom(cur, posOf(cur));
    BQ.open(n.id, { pos: n.pos, src: 'next' });
  };
  BQ.goPrev = function () {
    const cur = BQ.state.current; const p = prevFrom(cur, /^end-/.test(cur) ? BQ.state.seqPos : posOf(cur));
    if (p) BQ.open(p.id, { pos: p.pos, src: 'next' });
  };

  /* ---------- رأس العنصر ---------- */
  /* v0-12: لا رقائق في الرأس — المحطّة معلومة للكبير (في دليله)، والزمن في السطر الصغير فوق العنوان */
  function stationLine(meta) {
    const st = meta.station_short || String(meta.station || '').split('—')[0].trim();
    return [st, meta.time_label].filter(Boolean).join(' · ');
  }
  function kicker(id) {
    const p = BQ.path(); const pos = posOf(id);
    if (id === 'EL16') return 'الجلسة د · في يوم لاحق';
    if (pos >= 0) { const s = p[pos].s; const inS = p.filter((q) => q.s === s); const k = inS.findIndex((q, j) => p.indexOf(q) === pos); return 'الجلسة ' + SES[s].label + ' · ' + AR(k + 1) + ' من ' + AR(inS.length); }
    const skip = ((D.skip_by_age || {})[BQ.state.age] || []).includes(id);
    return skip ? 'اختياريّ لعمر ' + ageLabel(BQ.state.age) + ' · خارج «التالي»' : 'العنصر ' + AR((BQ.meta(id) || {}).menu || '') + ' من ' + AR(D.elements.length);
  }
  const FN = [[/قول|قُل|غَنّ|رَدِّد|ما هَذا|سَمِعْتُ فَرْقاً/, 'mouth'], [/أَيْنَ|مَنْ|المِسْ|الْمِسْ|تَتَبَّع|ضَعْ|اقْلِب|رَتِّب|اخْتَر/, 'hand'], [/انْظُر|شاهِد|حَرْفُ|هَذِهِ الميمُ|^ماء/, 'eye']];
  const fnIcon = (text, line) => { const t = text || ((BQ.line(line) || {}).t) || ''; for (const [re, ic] of FN) if (re.test(t)) return ic; return 'ear'; };

  /** صفحة العنصر: رأس + [تعليمة + مسرح] + نصّ مصاحب + تنقّل + دليل الكبير (درج) */
  function frame(meta) {
    const content = $('#content');
    const stage = h('div.bq-stage.elp-stage');
    /* v0-12: النصّ المصاحب داخل صفّ التعليمة (فقاعة بجوار السمّاعة) — لا تحت الإطار ولا فوق الأزرار */
    const cap = h('p.bq-cap.elp-cap', { hidden: true, 'aria-live': 'polite' });
    BQ.audio.capEl = cap;
    const L = (life = { alive: true, timers: new Set() });
    let replayFn = null;
    let ins = { text: '', line: null, icon: null };
    const instrText = h('p.elp-instr-t');
    const fnChip = h('span.elp-fn', { 'aria-hidden': 'true' });
    const srText = h('span.sr-only');
    const sayBtn = h('button.elp-say', { type: 'button', 'aria-label': 'أَعِدِ التَّعْليمَةَ', title: 'أعد التعليمة (R)', onclick: () => { A.unlock(); if (replayFn) replayFn(); else if (ins.line) ctx.say(ins.line); } }, BQ.icon('speaker'), srText);
    const instr = h('div.bq-instr.elp-instr.is-empty', null, sayBtn, fnChip, h('div.elp-bubble', null, instrText, cap));
    function renderInstr() {
      const has = !!(ins.text || ins.line);
      const showText = !!ins.text && (BQ.state.cc || BQ.state.age === '10-12');
      instr.classList.toggle('is-empty', !has);
      instrText.textContent = ins.text || '';
      instrText.hidden = !showText;
      fnChip.hidden = showText || !has;
      fnChip.innerHTML = I[ins.icon || fnIcon(ins.text, ins.line)] || '';
      srText.textContent = ins.text ? ': ' + ins.text : '';
    }
    /* شريط الفعل داخل الإطار: يستقبل «أَكْمِلْ» وأمثاله إن وقعت خارج المساحة المرئيّة من المسرح (لا تمرير للوصول إليها) */
    const dock = h('div.elp-dock');
    const play = h('div.elp-play', null, instr, stage, dock);
    const docked = new Set();
    const PRIM = '.kx-cont, .vp-go2, .bq-btn';
    const SKIP = '.bq-end, .bq-sess, .elp-cover, .bq-adult, .elp-dock';
    function dockCheck(btn) {
      if (!btn.isConnected || btn.closest(SKIP) || !stage.contains(btn)) return;
      const r = btn.getBoundingClientRect(); if (!r.height) return;
      const sr = stage.getBoundingClientRect();
      const top = Math.max(sr.top, 0), bot = Math.min(sr.bottom, innerHeight);
      if (r.bottom <= bot + 1 && r.top >= top - 1) return;
      let node = btn; const p = btn.parentElement;
      if (p && p !== stage && p.children.length <= 3 && [...p.children].every((c) => c.tagName === 'BUTTON')) node = p;
      const ph = document.createComment('bq-dock');
      node.before(ph); dock.append(node); docked.add({ ph, node });
    }
    const dockMO = window.MutationObserver ? new MutationObserver((recs) => {
      for (const r of recs) for (const n of r.addedNodes) {
        if (n.nodeType !== 1) continue;
        const list = n.matches(PRIM) ? [n] : [...n.querySelectorAll(PRIM)];
        list.forEach((b) => requestAnimationFrame(() => requestAnimationFrame(() => dockCheck(b))));
      }
      docked.forEach((d) => { if (!d.ph.isConnected || !d.node.isConnected) { d.node.remove(); docked.delete(d); } });
    }) : null;
    if (dockMO) { dockMO.observe(stage, { childList: true, subtree: true }); cleanups.push(() => dockMO.disconnect()); }

    /* دليل الكبير: «للكبير» + «ملاحظات المراجِع» (مطويّة) */
    const adultBody = h('div.elp-adult-body');
    const metaEl = h('div.elp-meta-el');
    const metaData = h('div.elp-meta-data', { html: meta.adult_meta || '' });
    const scrim = h('div.elp-scrim', { hidden: true });
    const closeBtn = h('button.bq-adult-x', { type: 'button', 'aria-label': 'إغلاق', onclick: () => toggleAdult(false) }, BQ.icon('close'));
    const adultPanel = h('aside.bq-adult.elp-adult', { hidden: true, role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'elp-adult-h', tabindex: '-1' },
      h('div.elp-adult-top', null, h('div', null, h('h3', { id: 'elp-adult-h' }, 'دليل الكبير'), h('p.elp-adult-st', null, stationLine(meta))), closeBtn),
      meta.pinned ? h('p.elp-pin', null, BQ.icon('mouth'), h('span', null, meta.pinned)) : null,
      adultBody,
      h('details.elp-adult-meta', null, h('summary', null, 'ملاحظات المراجِع'), metaEl, metaData));
    const toolLbl = (full, short) => [h('span.elp-tool-l', null, full), h('span.elp-tool-s', { 'aria-hidden': 'true' }, short)];
    const adultBtn = h('button.elp-tool', { type: 'button', 'aria-label': 'دليل الكبير', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', onclick: () => toggleAdult() }, BQ.icon('adult'), toolLbl('دليل الكبير', 'الدليل'));
    let inertEls = [];
    function toggleAdult(v) {
      const on = v == null ? adultPanel.hidden : v;
      if (on === !adultPanel.hidden) return;
      adultPanel.hidden = !on; scrim.hidden = !on; adultBtn.setAttribute('aria-expanded', String(on));
      if (on) {
        inertEls = [head, play, nav, $('.menu'), $('.hdr'), $('.footer')].filter(Boolean);
        inertEls.forEach((e) => { e.inert = true; });
        document.addEventListener('keydown', drawerKeys, true);
        setTimeout(() => closeBtn.focus(), 30);
      } else {
        inertEls.forEach((e) => { e.inert = false; }); inertEls = [];
        document.removeEventListener('keydown', drawerKeys, true);
        if (adultBtn.isConnected) adultBtn.focus({ preventScroll: true });
      }
    }
    function drawerKeys(e) {
      if (adultPanel.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); toggleAdult(false); return; }
      if (e.key === 'Tab') {
        const f = $$('button, [href], summary, input, select, textarea, [tabindex]:not([tabindex="-1"])', adultPanel).filter((x) => !x.disabled && x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || !adultPanel.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !adultPanel.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      }
    }
    cleanups.push(() => { if (!adultPanel.hidden) { inertEls.forEach((e) => { e.inert = false; }); document.removeEventListener('keydown', drawerKeys, true); } });
    scrim.addEventListener('click', () => toggleAdult(false));
    const ccBtn = h('button.elp-tool', { type: 'button', 'aria-label': 'النص المصاحب', 'aria-pressed': String(BQ.state.cc), onclick: (e) => {
      BQ.state.cc = !BQ.state.cc; store.set('cc', BQ.state.cc);
      e.currentTarget.setAttribute('aria-pressed', String(BQ.state.cc));
      if (!BQ.state.cc) cap.hidden = true; else if (cap.textContent) cap.hidden = false;
      renderInstr();
    } }, BQ.icon('cc'), toolLbl('النص المصاحب', 'النص'));
    const restartBtn = h('button.elp-tool', { type: 'button', 'aria-label': 'من البداية', onclick: () => BQ.open(meta.id, { pos: posOf(meta.id), history: 'replace' }) }, BQ.icon('replay'), toolLbl('من البداية', 'إعادة'));
    const head = h('header.elp-head', null,
      h('div.elp-ic', null, h('img', { src: meta.icon, alt: '' })),
      h('div.elp-titles', null,
        h('p.elp-kicker', null, kicker(meta.id) + (meta.time_label ? ' · ' + meta.time_label : '')),
        h('h2.elp-title', { id: 'elp-t', tabindex: '-1' }, cleanName(meta.name))),
      h('div.elp-tools', { role: 'group', 'aria-label': 'أدوات الكبير' }, adultBtn, ccBtn, restartBtn));
    const nav = navBar(meta.id);
    const f = h('section.bq-frame.elp', { dataset: { el: meta.id, ses: sesKey(meta.id) }, 'aria-labelledby': 'elp-t' }, head, play, nav, scrim, adultPanel);
    content.replaceChildren(f);
    const ctx = {
      meta, stage, frame: f,
      alive: () => L.alive && BQ.state.current === meta.id && f.isConnected,
      say(lineId, opt) { return ctx.alive() ? BQ.audio.play(lineId, opt) : Promise.resolve(); },
      later(fn, ms) { const t = setTimeout(() => { L.timers.delete(t); if (ctx.alive()) fn(); }, ms); L.timers.add(t); return t; },
      sleep(ms) { return new Promise((r) => { if (!ctx.alive()) return r(); const t = setTimeout(() => { L.timers.delete(t); r(); }, ms); L.timers.add(t); }); },
      instruction(text, lineId, o) {
        ins = { text: text || '', line: lineId || null, icon: (o && o.icon) || null };
        renderInstr();
        if (lineId) { replayFn = () => ctx.say(lineId); return ctx.say(lineId); }
        return Promise.resolve();
      },
      onReplay(fn) { replayFn = fn; },
      adult(html) { adultBody.replaceChildren(h('div', { html })); },
      adultMeta(html) {
        // سطر هدف واحد في «ملاحظات المراجِع»: هدف العنصر إن كتبه، وإلا هدف المواصفة من المحرّك
        metaEl.innerHTML = html || '';
        const mg = metaData.querySelector('.mg'); if (mg) mg.hidden = /هدف العنصر/.test(metaEl.textContent);
      },
      openAdult: () => toggleAdult(true),
      done() { BQ.markDone(meta.id); },
      onCleanup(fn) { cleanups.push(fn); },
      clear() { BQ.audio.stop(); stage.replaceChildren(); },
      age: () => BQ.state.age,
      _renderInstr: renderInstr,
    };
    ctx.adult(defaultAdult(meta));
    return ctx;
  }
  function defaultAdult(meta) {
    const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const age = BQ.state.age;
    const ag = (meta.ages_adult || {})[age];
    return (meta.cover_lead ? '<p class="goal"><b>ماذا يفعل طفلك:</b> ' + esc(meta.cover_lead) + '</p>' : '') +
      ((meta.adult_parent || []).length ? '<p class="lbl">للكبير</p><ul class="do">' + meta.adult_parent.map((t) => '<li>' + esc(t) + '</li>').join('') + '</ul>' : '') +
      (ag ? '<p class="age"><b>لعمر ' + ageLabel(age) + ' سنوات:</b> ' + esc(ag) + '</p>' : '');
  }
  function navBar(id) {
    const pos = /^end-/.test(id) ? BQ.state.seqPos : posOf(id);
    const pv = prevFrom(id, pos);
    const nx = nextFrom(id, pos);
    const s = sesAt(nx);
    const small = /^end-/.test(nx.id) || nx.id === 'plan' ? 'التالي' : s && SES[s] ? 'التالي في الجلسة ' + SES[s].label : 'التالي في مسار الدرس';
    return h('nav.elp-nav', { 'aria-label': 'التنقّل في مسار الدرس' },
      pv ? h('button.elp-navbtn.ghost', { type: 'button', onclick: () => BQ.open(pv.id, { pos: pv.pos, src: 'next' }) }, BQ.icon('prev'), h('span', null, h('small', null, 'السابق'), nameOf(pv.id))) : h('span'),
      h('button.elp-navbtn.primary.nextbtn', { type: 'button', onclick: () => { A.unlock(); BQ.goNext(); } }, h('span', null, h('small', null, small), nameOf(nx.id)), BQ.icon('next')));
  }

  /* ---------- غلاف العنصر (v0-12): لوحة مصمَّمة بملء منطقة اللعب ----------
     الفنّ: media/cover/ELxx.webp إن وُجد (١٦:١٠، الجهة اليمنى أهدأ للعنوان)، وإلا الصورة البطلة للعنصر بتدرّج ناعم.
     فوقه: رقم العنصر والجلسة · العنوان مشكولاً · جملة للطفل · بارق المتحرّك بوضعية تناسب العنصر · زرّ بدء دائريّ كبير
     · سطر الكبير ثانوياً. لون الجلسة لمسة (أ سماويّ · ب مرجانيّ · ج أخضر · د بنفسجيّ). الحركة تحترم prefers-reduced-motion.
     النصوص هنا مسوّدة للمراجعة؛ يمكن أن تأتي من البيانات: meta.cover_title · meta.cover_child · meta.cover_pose. */
  const COVER = {
    EL01: ['تَهَيَّأْ لِلدَّرْسِ', 'اسْمَعِ الصَّوْتَ، وَالْمِسْ مَصْدَرَهُ!', 'wave'],
    EL02: ['شاهِدْ وَتَعَلَّمْ', 'شاهِدِ القِصَّةَ، وَأَجِبْ حينَ نَتَوَقَّفُ!', 'point'],
    EL03: ['لاحِظْ وَتَعَلَّمْ', 'انْظُرْ إِلى الشَّفَتَيْنِ… مْـ!', 'talk'],
    EL04: ['مُفْرَداتي', 'ما هَذا؟ اسْمَعْ، وَقُلْ مَعَ سَيْفٍ!', 'point'],
    EL05: ['التَّراكيبُ اللُّغَوِيَّةُ', 'اسْمَعِ الجُمْلَةَ، وَرَدِّدْها، وَالْمِسْ صورَتَها!', 'talk'],
    EL06: ['أُغَنّي', 'غَنِّ مَعَنا: مْـ… ماءٌ!', 'cheer'],
    EL07: ['كَلِماتٌ وَصُوَرٌ', 'اقْلِبِ البِطاقَةَ، وَاسْمَعْ ما وَراءَها!', 'clap'],
    EL08: ['فَكِّرْ وَأَجِبْ', 'فَكِّرْ… وَقُلْ جَوابَكَ!', 'think'],
    EL09: ['اسْتَمِعْ وَتَعَلَّمْ', 'صَوْتٌ واحِدٌ أَمْ صَوْتانِ؟ اسْمَعْ جَيِّداً!', 'think'],
    EL10: ['تَحَدَّثْ', 'اسْمَعْ، ثُمَّ قُلْ مَعَنا!', 'talk'],
    EL11: ['اقْرَأْ', 'انْظُرْ… وَالْمِسِ الصّورَةَ الَّتي تُناسِبُ!', 'point'],
    EL12: ['اكْتُبْ', 'تَتَبَّعْ بِإِصْبَعِكَ مِنَ النُّقْطَةِ الخَضْراءِ!', 'point'],
    EL13: ['تَدَرَّبْ', 'اسْمَعِ الصَّوْتَ، وَالْمِسْ صورَتَهُ!', 'cheer'],
    EL14: ['الْعَبْ', 'الْمِسْ… اسْمَعْ… وَجِدْ مَصْدَرَ كُلِّ صَوْتٍ!', 'wave'],
    EL15: ['الخَريطَةُ الذِّهْنِيَّةُ', 'ضَعْ كُلَّ بِطاقَةٍ في مَكانِها!', 'clap'],
    EL16: ['اخْتَبِرْ نَفْسَكَ', 'هَيّا نَتَذَكَّرُ مَعاً!', 'think'],
  };
  const HERO = { EL01: 'img-029', EL02: 'comp_L1-01_REF-SCALE-W_v03_claude-composite', EL03: 'img-102', EL04: 'img-001', EL05: 'img-001', EL06: 'img-111', EL07: 'img-008', EL08: 'img-019', EL09: 'img-121', EL10: 'img-101', EL11: 'img-123', EL13: 'img-120', EL14: 'img-033', EL15: 'img-112', EL16: 'img-109' };
  /** فنّ الغلاف المصمَّم: قائمة BQ_COVERS/D.covers إن وُجدت، وإلا تجربة تحميل الملفّ مرّة واحدة لكلّ عنصر */
  const coverProbe = {};
  function designedCover(id) {
    const list = window.BQ_COVERS || D.covers;
    if (Array.isArray(list)) return Promise.resolve(list.includes(id) ? 'media/cover/' + id + '.webp' : null);
    if (!coverProbe[id]) coverProbe[id] = new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth ? i.src : null); i.onerror = () => res(null); i.src = 'media/cover/' + id + '.webp'; });
    return coverProbe[id];
  }
  BQ.coverInfo = (id) => { const m = BQ.meta(id) || {}; const c = COVER[id] || []; return { title: m.cover_title || c[0] || cleanName(m.name), child: m.cover_child || c[1] || '', pose: m.cover_pose || c[2] || 'wave' }; };
  function cover(ctx, def, onStart) {
    const meta = ctx.meta, id = meta.id;
    const info = BQ.coverInfo(id);
    const hk = (def && def.hero) || HERO[id];
    const heroSrc = hk && BQ.hasImg(hk) ? BQ.img(hk) : null;
    const play = ctx.frame.querySelector('.elp-play');
    if (play) play.classList.add('has-cover');
    ctx.frame.classList.add('has-cover');
    const go = () => { if (play) play.classList.remove('has-cover'); ctx.frame.classList.remove('has-cover'); c.remove(); onStart(); };
    const lead = meta.cover_lead || (def && def.cover) || String(meta.goal || '').split('.')[0].split('؛')[0];
    const skip = ((D.skip_by_age || {})[BQ.state.age] || []).includes(id);
    const tid = 'elp-cv-t';
    const early = id === 'EL16' && BQ.gate.el16().early;
    if (id === 'EL16') BQ.state.el16Preview = null;

    /* الفنّ */
    const art = h('div.cv-art.is-wait' + (heroSrc ? '' : '.is-glyph'), { 'aria-hidden': 'true' },
      heroSrc ? h('img.cv-img', { src: heroSrc, alt: '', decoding: 'async', draggable: 'false' }) : h('span.cv-glyph', null, 'م'));
    designedCover(id).then((src) => {
      // الغلاف المصمَّم يحمل بارق نفسه ⇒ لا بارق متحرّك فوقه (يُخفى إلى أن يُعرف وجود الغلاف)
      art.classList.remove('is-wait');
      if (!src) { brq.classList.remove('is-wait'); return; }
      brq.remove();
      if (!c.isConnected) return;
      art.classList.remove('is-glyph'); art.classList.add('is-designed');
      art.replaceChildren(h('img.cv-img', { src, alt: '', decoding: 'async', draggable: 'false' }));
    });

    /* بارق + زرّ البدء */
    const brq = UI.brq(info.pose, 'cv-brq.is-wait');
    let action;
    if (early) {
      const hrs = BQ.gate.el16().hours;
      action = h('button.bq-btn.ghost.elp-preview.cv-preview', { type: 'button', onclick: () => { BQ.state.el16Preview = { hours: hrs, at: Date.now() }; A.unlock(); go(); } }, BQ.icon('adult'), 'معاينة الآن (للكبير)');
    } else {
      action = h('button.bq-start.cv-start', { type: 'button', 'aria-label': 'ابْدَأْ: ' + info.title, onclick: () => { A.unlock(); go(); } },
        h('span.cv-start-disc', { 'aria-hidden': 'true' }, h('span.bq-start-ic', { html: I.play })),
        h('span.cv-start-l', null, 'ابْدَأْ'));
    }
    const adultTxt = early
      ? [h('b', null, 'للكبير: '), 'التحقّق المؤجَّل يصحّ في يوم لاحق، قبل الدرس الثاني. ', BQ.gate.el16().hours == null ? 'لا سجلّ لإتمام «تدرّب» على هذا الجهاز بعد.' : 'مرّ على إتمام «تدرّب» أقلّ من ١٢ ساعة.']
      : [h('b', null, 'للكبير: '), lead, skip ? ' · اختياريّ لعمر ' + ageLabel(BQ.state.age) + ' سنوات، ولا يدخل في «التالي».' : ''];

    const c = h('div.elp-start.elp-cover', { role: 'group', 'aria-labelledby': tid, dataset: { el: id } }, h('div.cv-in', null,
      art,
      h('div.cv-shade', { 'aria-hidden': 'true' }),
      h('div.cv-text', null,
        h('p.cv-kicker', null, h('span.cv-num', { 'aria-hidden': 'true' }, AR(meta.menu || '')), h('span', null, kicker(id))),
        h('h3.cv-title', { id: tid }, info.title),
        h('p.cv-child', { lang: 'ar' }, early ? 'هَذا لِلْغَدِ!' : info.child)),
      h('div.cv-go', null, brq, action),
      h('p.cv-adult', null, BQ.icon('adult'), h('span', null, adultTxt))));
    (play || ctx.stage).append(c);
  }

  /* ---------- التمرير والتركيز ---------- */
  const behavior = () => (BQ.reduced() ? 'auto' : 'smooth');
  /* v0-12: الإطار يبدأ تحت الرأس مباشرةً ويتّسع للشاشة ⇒ النشاط كلّه مرئيّ عند أعلى الصفحة؛ لا تمرير إلى الإطار */
  function toTop() { const se = document.scrollingElement || document.documentElement; if (se && se.scrollTop > 0) window.scrollTo({ top: 0, behavior: 'auto' }); }
  function reveal() { toTop(); }
  function focusIn(root) {
    const f = $$('button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])', root).find((x) => x.offsetParent !== null && !x.closest('.elp-instr'));
    const t = f || $('.elp-say', root.closest('.elp') || document);
    if (t) try { t.focus({ preventScroll: true }); } catch (e) { /* */ }
  }

  /* ---------- الفتح والتاريخ ---------- */
  function setHistory(id, pos, mode) {
    if (mode === 'none') return;
    const st = { id, pos: pos == null ? -1 : pos };
    try {
      if (mode === 'push' && location.hash !== '#' + id) history.pushState(st, '', '#' + id);
      else history.replaceState(st, '', '#' + id);
    } catch (e) { /* */ }
  }
  function markMenu(id, pos) {
    $$('.item').forEach((b) => {
      const on = b.dataset.id === id && (b.dataset.pos == null || +b.dataset.pos === pos || !$$('.item[data-pos][data-id="' + id + '"]').some((x) => +x.dataset.pos === pos));
      if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    // القائمة تتمرّر داخلياً فقط (لا تمرير للصفحة): تُظهر العنصر الحاليّ
    const menu = $('.menu'); const sel = $('.menu-list:not([hidden]) .item[aria-current]');
    if (menu && sel) { const mr = menu.getBoundingClientRect(), r = sel.getBoundingClientRect(); if (r.top < mr.top + 90 || r.bottom > mr.bottom - 8) menu.scrollTop += r.top - mr.top - mr.height / 2 + r.height / 2; }
  }
  let lastEl = null, pendingAge = null;
  /** BQ.open(id, {pos, skipCover, history:'push'|'replace'|'none', src:'menu'|'next'|'boot'|'history'}) */
  BQ.open = function (id, opt) {
    opt = opt || {};
    if (id === 'last') id = lastEl || BQ.path()[0].id;
    const src = opt.src || 'api';
    const hmode = opt.history || (src === 'boot' ? 'replace' : 'push');
    if (id !== 'plan' && !/^end-/.test(id) && !BQ.meta(id)) return;
    teardown();
    if (pendingAge) applyAge(pendingAge, true);
    if (id === 'plan') { showPlan(hmode); return; }
    hidePlan();
    if (/^end-/.test(id)) { sessionPage(id.slice(4), opt, hmode, src); return; }
    const meta = BQ.meta(id);
    BQ.state.current = id;
    BQ.state.seqPos = posOf(id, opt.pos);
    lastEl = id;
    const saveLast = () => store.set('last', { id, pos: BQ.state.seqPos, t: Date.now() });
    if (src !== 'boot') saveLast(); // R-01: فتح الصفحة وحده لا يمحو نقطة المتابعة المحفوظة
    markMenu(id, BQ.state.seqPos);
    setHistory(id, BQ.state.seqPos, hmode);
    const def = BQ.defs[id];
    const ctx = frame(meta);
    const run = () => {
      if (!def) { ctx.stage.append(h('p.bq-missing', null, 'هذا العنصر قيد التحميل.')); return; }
      ctx.frame.classList.add('is-running');
      try { def.render(ctx.stage, ctx); } catch (e) { console.error(e); ctx.stage.append(h('p.bq-missing', null, 'تعذّر تشغيل هذا النشاط. جرّب «من البداية».')); }
    };
    const started = () => { if (src === 'boot') saveLast(); run(); requestAnimationFrame(() => { reveal(ctx.frame.querySelector('.elp-play'), true); focusIn(ctx.stage); }); };
    if (opt.skipCover) run(); else cover(ctx, def, started);
    updateResume();
    if (src !== 'boot') requestAnimationFrame(() => {
      reveal(ctx.frame);
      if (src !== 'menu' && src !== 'history') { const t = $('#elp-t'); if (t) t.focus({ preventScroll: true }); }
    });
  };

  /* ---------- بطاقة نهاية الجلسة (تربوي P1-1، P2-12) ---------- */
  function sessionPage(key, opt, hmode, src) {
    const S = SES[key]; if (!S) { BQ.open(BQ.path()[0].id); return; }
    const p = BQ.path();
    const lastIdx = (() => { let k = -1; p.forEach((q, j) => { if (q.s === key) k = j; }); return k; })();
    const pos = opt.pos != null && p[opt.pos] && p[opt.pos].s === key ? opt.pos : lastIdx;
    BQ.state.current = 'end-' + key; BQ.state.seqPos = pos;
    markMenu(null, -1);
    setHistory('end-' + key, pos, hmode);
    const age = BQ.state.age;
    const nx = nextFrom('end-' + key, pos);
    const final = nx.id === 'plan';
    const nextS = !final ? SES[sesAt(nx)] : null;
    const goOn = key === 'A' && age !== '4-6';
    const child = final ? 'انْتَهى الدَّرْسُ!' : goOn ? 'هَيّا نُكْمِلُ!' : 'نُكْمِلُ غَداً.';
    let adult;
    if (final) adult = 'اكتمل الدرس. غداً، قبل الدرس الثاني، افتحا «اختبر نفسك» — التحقّق المؤجَّل لا يصحّ في اليوم نفسه.';
    else if (goOn) adult = 'انتهت الجلسة ' + S.label + ' (' + S.time + '). لعمر ' + ageLabel(age) + ' تُكمل الجلسة ' + nextS.label + ' في الجلوس نفسه إن كان طفلك مستعدّاً (' + nextS.time + ').';
    else adult = 'انتهت الجلسة ' + S.label + ' (' + S.time + '). ' + (age === '4-6' ? 'لعمر ٤–٦ نتوقّف هنا؛ ' : 'الأفضل التوقّف هنا؛ ') + 'في المرّة القادمة تبدآن من «' + nameOf(nx.id) + '».';
    const content = $('#content');
    const doneNote = h('p.bq-sess-saved', { hidden: true, role: 'status' });
    const stop = h('button.bq-btn' + (goOn ? '.ghost' : ''), { type: 'button', onclick: () => {
      store.set('last', { end: key, pos, t: Date.now() }); updateResume();
      doneNote.hidden = false; doneNote.textContent = final ? 'أحسنتما! نلتقي غداً في «اختبر نفسك».' : 'حُفظ مكانكما. في المرّة القادمة المس «تابِعْ» أعلى الصفحة.';
      stop.disabled = true;
    } }, BQ.icon('check'), 'انْتَهَيْنا اليَوْمَ');
    const cont = final
      ? h('button.bq-btn.ghost', { type: 'button', onclick: () => BQ.open('EL16', { src: 'next' }) }, 'اختبر نفسك (غداً)')
      : h('button.bq-btn' + (goOn ? '' : '.ghost'), { type: 'button', onclick: () => { A.unlock(); BQ.open(nx.id, { pos: nx.pos, src: 'next' }); } }, 'أَكْمِلِ الآنَ', BQ.icon('next'));
    const row = goOn ? [stop, cont] : [cont, stop];
    const tid = 'elp-t';
    const card = h('div.bq-sess', null,
      UI.brq('cheer', 'bq-end-brq', 6000), // [brq-anim v1]
      h('p.bq-end-t', null, 'أَحْسَنْتَ!'),
      h('p.bq-sess-child', null, child),
      h('div.bq-end-row', null, row),
      doneNote,
      h('div.bq-sess-more', null,
        h('div.bq-sess-adult', null, h('b', null, 'للكبير: '), adult),
        S.home && S.home.length ? homeBox(S.home) : null));
    const pv = prevFrom('end-' + key, pos);
    const nav = h('nav.elp-nav', { 'aria-label': 'التنقّل في مسار الدرس' },
      pv ? h('button.elp-navbtn.ghost', { type: 'button', onclick: () => BQ.open(pv.id, { pos: pv.pos, src: 'next' }) }, BQ.icon('prev'), h('span', null, h('small', null, 'السابق'), nameOf(pv.id))) : h('span'),
      h('button.elp-navbtn.primary.nextbtn', { type: 'button', onclick: () => { A.unlock(); BQ.goNext(); } }, h('span', null, h('small', null, final ? 'التالي' : 'الجلسة ' + nextS.label), nameOf(nx.id)), BQ.icon('next')));
    const f = h('section.bq-frame.elp.elp-endses', { dataset: { el: 'end-' + key, ses: key.charAt(0) }, 'aria-labelledby': tid },
      h('header.elp-head', null,
        h('div.elp-ic.elp-ic-m', { 'aria-hidden': 'true' }, 'م'),
        h('div.elp-titles', null,
          h('p.elp-kicker', null, 'الجلسة ' + S.label + ' · ' + S.name),
          h('h2.elp-title', { id: tid, tabindex: '-1' }, final ? 'اكتمل الدرس' : 'نهاية الجلسة ' + S.label))),
      h('div.elp-play', null, h('div.bq-stage.elp-stage', null, card)), nav);
    content.replaceChildren(f);
    BQ.audio.fx(BQ.sfx.ok, 0.5);
    requestAnimationFrame(() => { reveal(f); if (src !== 'history') $('#elp-t').focus({ preventScroll: true }); });
  }

  /* ---------- خطة الدرس ---------- */
  /* v0-12: «خطة الدرس» صفحة مستقلّة (#plan): تُخفي واجهة الطفل كلّها، ولها شريطها و«العودة إلى الدرس» */
  function showPlan(hmode) {
    BQ.state.current = 'plan';
    document.body.classList.add('show-plan');
    closeMenu(); closeAdultPop();
    markMenu(null, -1);
    const lv = $('#lessonView'); if (lv) lv.hidden = true;
    const p = $('#plan'); p.hidden = false;
    if (!p.dataset.ready && window.BQ_PLAN) { window.BQ_PLAN.render(p); p.dataset.ready = '1'; }
    setHistory('plan', null, hmode || 'push');
    document.title = 'خطة الدرس · صوت الميم · بارق';
    window.scrollTo({ top: 0, behavior: 'auto' }); requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' })); setTimeout(() => { if (BQ.state.current === 'plan' && !location.hash.slice(1).startsWith('lp')) window.scrollTo({ top: 0, behavior: 'auto' }); }, 120);
    const t = p.querySelector('.lp-bar-t h2'); if (t) { t.setAttribute('tabindex', '-1'); try { t.focus({ preventScroll: true }); } catch (e) { /* */ } }
  }
  function hidePlan() {
    if (!document.body.classList.contains('show-plan')) return;
    document.body.classList.remove('show-plan');
    const lv = $('#lessonView'); if (lv) lv.hidden = false;
    const p = $('#plan'); if (p) p.hidden = true;
    document.title = 'بارق · صوت الميم';
  }

  /* ---------- قائمة العناصر (درج على الهاتف/اللوح الطوليّ) و«للكبير» ---------- */
  const DRAWER_MQ = '(max-width: 767.98px), (pointer: coarse) and (orientation: portrait) and (max-width: 1100px)';
  const isDrawer = () => !!(window.matchMedia && matchMedia(DRAWER_MQ).matches);
  function openMenu() {
    const m = $('.menu'), b = $('#menuBtn'), sc = $('#menuScrim'); if (!m || !isDrawer()) return;
    m.classList.add('is-open'); if (sc) sc.hidden = false; if (b) b.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    markMenu(BQ.state.current, BQ.state.seqPos);
    setTimeout(() => { const f = $('.menu-list:not([hidden]) .item[aria-current]') || $('.menu-tab'); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function closeMenu(refocus) {
    const m = $('.menu'), b = $('#menuBtn'), sc = $('#menuScrim'); if (!m || !m.classList.contains('is-open')) return;
    m.classList.remove('is-open'); if (sc) sc.hidden = true; if (b) b.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (refocus && b) b.focus({ preventScroll: true });
  }
  function closeAdultPop(refocus) {
    const p = $('#adultMenu'), b = $('#adultBtn'); if (!p || p.hidden) return;
    p.hidden = true; if (b) b.setAttribute('aria-expanded', 'false'); closeConfirm();
    if (refocus && b) b.focus({ preventScroll: true });
  }
  function toggleAdultPop() {
    const p = $('#adultMenu'), b = $('#adultBtn'); if (!p) return;
    if (!p.hidden) { closeAdultPop(); return; }
    closeMenu(); p.hidden = false; if (b) b.setAttribute('aria-expanded', 'true');
    const f = p.querySelector('input:checked') || p.querySelector('input, a, button'); if (f) setTimeout(() => f.focus({ preventScroll: true }), 30);
  }

  /* ---------- التقدّم والمتابعة ---------- */
  function updateProgress() {
    const n = BQ.state.done.size, t = D.elements.length;
    const el = $('#progress');
    if (el) {
      const c = el.querySelector('circle.val'); const L = 2 * Math.PI * 18;
      if (c) { c.style.strokeDasharray = L; c.style.strokeDashoffset = L * (1 - n / t); }
      const b = el.querySelector('b'); if (b) b.textContent = AR(n);
      el.setAttribute('aria-label', 'أُنجز ' + AR(n) + ' من ' + AR(t) + ' عنصراً');
    }
    const mc = $('#menuCount'); if (mc) mc.textContent = AR(n) + ' / ' + AR(t);
    $$('.menu-ses-n').forEach((x) => { const ids = (x.dataset.ids || '').split(',').filter(Boolean); const d = ids.filter((i) => BQ.state.done.has(i)).length; x.textContent = AR(d) + ' / ' + AR(ids.length); x.classList.toggle('is-full', d === ids.length); });
    updateResume();
  }
  /** وجهة «تابِعْ»: آخر عنصر لم يكتمل، أو ما بعده في المسار، أو أوّل الجلسة التالية */
  function resumeTarget() {
    const p = BQ.path(); const last = store.get('last', null);
    if (!last || typeof last !== 'object') return p.length ? { id: p[0].id, pos: 0, fresh: true } : null;
    if (last.end) { const n = nextFrom('end-' + last.end, last.pos); return n.id === 'plan' ? { id: 'EL16', pos: -1 } : n; }
    if (!BQ.meta(last.id)) return { id: p[0].id, pos: 0, fresh: true };
    if (!BQ.state.done.has(last.id)) return { id: last.id, pos: posOf(last.id, last.pos) };
    let n = nextFrom(last.id, posOf(last.id, last.pos));
    if (/^end-/.test(n.id)) n = nextFrom(n.id, n.pos);
    return n.id === 'plan' ? { id: 'EL16', pos: -1 } : n;
  }
  function updateResume() {
    const r = resumeTarget(); const b = $('#resumeBtn'); const hs = $('#hdrStart');
    if (!r) return;
    const p0 = BQ.path()[0];
    const fresh = !BQ.state.done.size && (!!r.fresh || (p0 && r.id === p0.id));
    if (b) {
      b.querySelector('.lh-resume-l').textContent = fresh ? 'ابْدَأِ الدَّرْسَ' : 'تابِعْ';
      b.querySelector('.lh-resume-n').textContent = nameOf(r.id);
      b.setAttribute('aria-label', (fresh ? 'ابدأ الدرس: ' : 'تابع من حيث توقّفت: ') + nameOf(r.id));
    }
    if (hs) hs.textContent = fresh ? 'ابدأ الدرس' : 'تابع الدرس';
  }
  function resume() { const r = resumeTarget(); if (!r) return; A.unlock(); BQ.open(r.id, { pos: r.pos, src: 'next' }); }

  /* ---------- القائمة: «العناصر ١–١٦» (افتراضيّ) + «حسب الجلسات» ---------- */
  function itemBtn(e, pos, extra) {
    const b = h('button.item' + (BQ.state.done.has(e.id) ? '.is-done' : '') + (extra || ''), { type: 'button', dataset: { id: e.id }, onclick: () => {
      closeMenu();
      if (BQ.state.current === e.id && (pos == null || pos === BQ.state.seqPos)) { reveal(); return; } // T15: لا إعادة صامتة
      BQ.open(e.id, { pos: pos == null ? undefined : pos, src: 'menu' });
    } },
      h('span.ic', null, h('img', { src: e.icon, alt: '' })),
      h('span.name', null, cleanName(e.name)),
      h('span.num', { 'aria-hidden': 'true' }, AR(e.menu)));
    if (pos != null) b.dataset.pos = String(pos);
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 15 11'); s.setAttribute('class', 'done'); s.setAttribute('aria-hidden', 'true'); s.innerHTML = '<path d="M1.5 5.5 5.5 9.5 13.5 1.5"/>';
    b.append(s);
    return b;
  }
  function buildMenu() {
    const menu = $('#menu'); if (!menu) return;
    menu.replaceChildren();
    D.elements.slice().sort((a, b) => a.menu - b.menu).forEach((e) => menu.append(h('li', null, itemBtn(e))));
    const ses = $('#menuSes'); if (!ses) return;
    ses.replaceChildren();
    const p = BQ.path(); const age = BQ.state.age; const skip = new Set((D.skip_by_age || {})[age] || []);
    const keys = ((D.path_by_age || {})[age] || []).concat(['D']);
    keys.forEach((k) => {
      const S = SES[k]; if (!S) return;
      const g = h('li.menu-ses' + (S.later ? '.is-later' : ''));
      g.append(h('div.menu-ses-h', null, h('span.menu-ses-b', { 'aria-hidden': 'true' }, S.label), h('span.menu-ses-l', null, 'الجلسة ' + S.label + (S.later ? ' · يوم لاحق' : '')), h('span.menu-ses-t', null, S.time), h('span.menu-ses-n', { dataset: { ids: S.ids.join(',') } })));
      const ul = h('ul');
      S.ids.forEach((id) => {
        const e = BQ.meta(id); if (!e) return;
        const pos = skip.has(id) ? null : p.findIndex((q, j) => q.id === id && q.s === k);
        const b = itemBtn(e, pos != null && pos >= 0 ? pos : null, skip.has(id) ? '.is-opt' : '');
        if (skip.has(id)) b.querySelector('.name').append(h('small', null, 'اختياريّ'));
        if (id === 'EL11' && k !== p.find((q) => q.id === 'EL11').s) b.querySelector('.name').append(h('small', null, 'جولة ٢'));
        ul.append(h('li', null, b));
      });
      g.append(ul); ses.append(g);
    });
    updateProgress();
    markMenu(BQ.state.current, BQ.state.seqPos);
  }
  function setMenuView(v) {
    const list = $('#menu'), ses = $('#menuSes'); if (!list || !ses) return;
    list.hidden = v === 'ses'; ses.hidden = v !== 'ses';
    $$('.menu-tab').forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.view === v)));
    store.set('menuView', v);
  }

  /* ---------- العمر ---------- */
  function applyAge(a, silent) {
    pendingAge = null;
    if (!AGES.includes(a)) return;
    BQ.state.age = a;
    const cc = store.get('cc', null);
    BQ.state.cc = typeof cc === 'boolean' ? cc : a === '10-12';
    const root = $('.page-root'); if (root) root.dataset.age = a;
    $$('#ageSeg input').forEach((r) => { r.checked = r.value === a; });
    buildMenu();
    if (!silent) updateResume();
  }

  /* ---------- «بدء من جديد» بتأكيد داخل الصفحة ---------- */
  let confirmEl = null;
  function closeConfirm() { if (confirmEl) { confirmEl.remove(); confirmEl = null; document.removeEventListener('keydown', confirmKeys, true); } }
  function confirmKeys(e) { if (e.key === 'Escape' && confirmEl) { e.preventDefault(); const b = $('#resetBtn'); closeConfirm(); if (b) b.focus({ preventScroll: true }); } }
  function askReset(btn) {
    if (confirmEl) { closeConfirm(); return; }
    const yes = h('button.bq-btn.blue', { type: 'button', onclick: () => {
      BQ.state.done.clear(); store.set('done', []); store.del('last');
      for (const e of D.elements) { try { localStorage.removeItem(PFX + 'ts-' + e.id); } catch (x) { /* */ } }
      $$('.item').forEach((i) => i.classList.remove('is-done'));
      updateProgress(); closeConfirm(); UI.toast('مُسح تقدّم الدرس.'); btn.focus({ preventScroll: true });
    } }, 'نعم، امسح');
    const no = h('button.bq-btn.ghost', { type: 'button', onclick: () => { closeConfirm(); btn.focus({ preventScroll: true }); } }, 'إلغاء');
    confirmEl = h('div.lh-confirm', { role: 'alertdialog', 'aria-label': 'تأكيد البدء من جديد' }, h('p', null, 'سيُمسح تقدّم الدرس كلّه على هذا الجهاز. متابعة؟'), h('div', null, yes, no));
    btn.insertAdjacentElement('afterend', confirmEl);
    document.addEventListener('keydown', confirmKeys, true);
    no.focus({ preventScroll: true });
  }

  /* ---------- الإقلاع ---------- */
  function boot() {
    const d = store.get('done', []);
    BQ.state.done = new Set(Array.isArray(d) ? d.filter((x) => typeof x === 'string' && BQ.meta(x)) : []);
    const a = store.get('age', '4-6');
    applyAge(AGES.includes(a) ? a : '4-6', true);
    const mv = store.get('menuView', 'list');
    setMenuView(mv === 'ses' ? 'ses' : 'list');
    $$('.menu-tab').forEach((t) => t.addEventListener('click', () => setMenuView(t.dataset.view)));
    const hs = $('#hdrStart'); if (hs) hs.addEventListener('click', resume);
    const rb = $('#resumeBtn'); if (rb) rb.addEventListener('click', resume);
    const nt = $('#navToggle'); if (nt) nt.addEventListener('click', () => { const n = $('.header .nav'); const on = !n.classList.contains('is-open'); n.classList.toggle('is-open', on); nt.setAttribute('aria-expanded', String(on)); });
    window.addEventListener('popstate', (e) => {
      const k = location.hash.slice(1); const st = e.state || {};
      if (k === 'plan' || BQ.meta(k) || /^end-/.test(k)) BQ.open(k, { pos: st.pos, history: 'none', src: 'history' });
    });
    window.addEventListener('hashchange', () => {
      const k = location.hash.slice(1);
      if (k !== BQ.state.current && (k === 'plan' || BQ.meta(k) || /^end-(A|B|C|C1|C2)$/.test(k))) BQ.open(k, { history: 'replace', src: 'history' });
    });
    $('#planBtn').addEventListener('click', (e) => { e.preventDefault(); closeAdultPop(); BQ.open('plan'); });
    const hl = $('#homeLink'); if (hl) hl.addEventListener('click', (e) => { e.preventDefault(); if (BQ.state.current === 'plan') BQ.open(lastEl || BQ.path()[0].id); else toTop(); });
    // «العناصر» (درج) و«للكبير» (قائمة منبثقة)
    const mb = $('#menuBtn'); if (mb) mb.addEventListener('click', () => ($('.menu').classList.contains('is-open') ? closeMenu(true) : openMenu()));
    const mx = $('#menuClose'); if (mx) mx.addEventListener('click', () => closeMenu(true));
    const ms = $('#menuScrim'); if (ms) ms.addEventListener('click', () => closeMenu(true));
    const ab = $('#adultBtn'); if (ab) ab.addEventListener('click', (e) => { e.stopPropagation(); toggleAdultPop(); });
    document.addEventListener('click', (e) => { const pop = $('#adultMenu'); if (pop && !pop.hidden && !e.target.closest('.hdr-adult')) closeAdultPop(); });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      if ($('.menu.is-open')) { e.preventDefault(); closeMenu(true); }
      else if ($('#adultMenu') && !$('#adultMenu').hidden) { e.preventDefault(); closeAdultPop(true); }
    });
    window.addEventListener('resize', () => { if (!isDrawer()) closeMenu(); });
    // «العودة إلى الدرس» في الخطة تعيد إلى آخر عنصر (QA-11)
    document.addEventListener('click', (e) => { const b = e.target.closest && e.target.closest('.lp-back'); if (b) { e.preventDefault(); e.stopImmediatePropagation(); BQ.open(lastEl || BQ.path()[0].id); } }, true);
    $$('#ageSeg input').forEach((r) => {
      r.addEventListener('change', () => {
        if (!r.checked) return;
        store.set('age', r.value);
        const running = BQ.state.current && /^EL/.test(BQ.state.current) && !$('.elp-start') && $('.elp.is-running');
        if (running) { pendingAge = r.value; UI.toast('يُطبَّق العمر الجديد على النشاط التالي.'); return; }
        applyAge(r.value);
        if (BQ.state.current && BQ.state.current !== 'plan') BQ.open(BQ.state.current, { history: 'replace', src: 'menu' });
      });
    });
    const rs = $('#resetBtn'); if (rs) rs.addEventListener('click', () => askReset(rs));
    updateProgress();
    const hsh = location.hash.slice(1);
    const lp = store.get('last', null);
    if (hsh === 'plan') BQ.open('plan', { src: 'boot' });
    else if (/^end-/.test(hsh) && SES[hsh.slice(4)]) BQ.open(hsh, { src: 'boot' });
    else if (BQ.meta(hsh)) BQ.open(hsh, { src: 'boot', pos: lp && lp.id === hsh ? lp.pos : undefined });
    else { const r = resumeTarget() || { id: BQ.path()[0].id, pos: 0 }; BQ.open(r.id, { src: 'boot', pos: r.pos }); }
    window.addEventListener('keydown', (e) => {
      if (e.code !== 'KeyR' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (BQ.state.current === 'plan' || (e.target.closest && e.target.closest('input, textarea, select, [contenteditable], .elp-adult'))) return;
      const b = $('.elp-say'); if (b && !b.closest('.is-empty')) b.click();
    });
  }
  function safeBoot() {
    try { boot(); } catch (e) {
      console.error(e);
      const c = $('#content'); if (c) c.replaceChildren(h('p.bq-missing', null, 'تعذّر تشغيل الصفحة. امسح بيانات الموقع ثم أعد التحميل.'));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', safeBoot); else setTimeout(safeBoot, 0);
})();
