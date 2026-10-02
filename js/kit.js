/* kit.js — v0-8: نُقل من EL04.js دون تغيير؛ يُحمَّل قبل ملفات العناصر · kit: أدوات مشتركة لعناصر EL04 · EL07 · EL09 · EL11 (نسخة واحدة هنا؛ EL07/EL09/EL11 تنتظر حدث «bq-kit») ----
   يعمل مع عقد المحرّك v0-8 بكشف الميزات: ctx.alive · ctx.adultMeta · BQ.ui.steps · BQ.AR — وله بدائل محلّية إن غابت.
   · جلسة تتوقّف تلقائياً عند مغادرة العنصر (S.play/S.sleep لا تُكمل بعد الخروج، ولا تتعلّق إذا قُطع الصوت أو تعطّل).
   · تشغيل مقطع من ملفّ صوتيّ بزمنه (playSeg) + تحليل الصمت لإيجاد حدود الكلمات والجمل (analyze).
   · مشغّل جولة «استمع واختر» بصفوف التغذية الثلاثة (صواب · خطأ أوّل · خطأ ثانٍ).
   · دليل المعلّم: «للمعلّم» (≤ ٣ أوامر) + «ملاحظات المراجِع» المطويّة — بلا رموز داخلية ولا سجلّات خام. */
(function () {
  'use strict';
  if (!window.BQ || BQ.kit) return;
  const h = BQ.h;
  const K = {};
  const never = new Promise(() => {});
  K.never = never;
  const SC = '.bq-frame:is([data-el="EL04"],[data-el="EL07"],[data-el="EL09"],[data-el="EL11"])';
  K.SC = SC;
  K.style = function (id, css) { if (!document.getElementById(id)) document.head.append(h('style', { id }, css)); };
  K.has = (id) => BQ.hasAudio(id);
  /** أوّل معرّف له ملفّ صوت، وإلا الأوّل (يُعرض نصّه المصاحب بزمن تقديريّ) */
  K.pick = (...ids) => ids.find((i) => BQ.hasAudio(i)) || ids[0];
  K.age = () => BQ.state.age;
  K.srcOf = (id) => 'media/audio/' + id + '.mp3';
  /** مثير مسموع بلا نصّ مصاحب (لا قرينة مكتوبة) — إلا إن غاب ملفّه فيبقى النصّ ليُدرَك شيء */
  K.stim = (id, extra) => Object.assign({ id, noCaption: BQ.hasAudio(id) }, extra || {});
  /** أرقام هندية */
  K.AR = (n) => (BQ.AR ? BQ.AR(n) : String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]));
  K.ageName = (a) => K.AR(String(a || '').replace('-', '–'));
  /** صنف العمر على جذر العنصر (أحجام اللمس: ٦٠ نقطة لـ٤–٦) */
  K.ageCls = (a) => (a === '4-6' ? '.kx-a46' : a === '10-12' ? '.kx-a1012' : '.kx-a79');

  const SPK = { 'ماجد': 'MAJ', 'سيف': 'SAY', 'بارق': 'BRQ' };
  const SPN = { MAJ: 'ماجِد', SAY: 'سَيْف', BRQ: 'بارِق' };
  K.spk = (id) => { const L = BQ.line(id); return L ? SPK[L.sp] || null : null; };

  /** نصّ مصاحب يدويّ (للمقاطع المقصوصة من سطر) */
  K.caption = function (sp, text) {
    const cap = BQ.audio.capEl; if (!cap) return;
    if (!text) { cap.hidden = true; cap.textContent = ''; return; }
    cap.replaceChildren(sp && SPN[sp] ? h('b', null, SPN[sp] + ': ') : '', text);
    cap.hidden = !BQ.state.cc;
  };

  /* ---------- الجلسة (تحترم ctx.alive إن وُجدت) ---------- */
  K.session = function (ctx) {
    let live = true;
    const timers = new Set();
    ctx.onCleanup(() => { live = false; timers.forEach((t) => clearTimeout(t)); });
    const alive = () => live && (typeof ctx.alive === 'function' ? ctx.alive() !== false : true);
    const gate = (p) => p.then((v) => (alive() ? v : never));
    const S = {
      ctx,
      get live() { return alive(); },
      gate,
      /** يشغّل سطراً وينتظر نهايته — ويُكمل أيضاً إن قُطع بسطر آخر (بعد انتهاء القاطع) */
      play(id, opt) {
        if (!alive()) return never;
        const p = BQ.audio.play(id, opt);
        const tok = BQ.audio.token;
        return gate(new Promise((res) => {
          let done = false;
          p.then(() => { done = true; res(); });
          const iv = setInterval(() => {
            if (done || !alive()) return clearInterval(iv);
            if (BQ.audio.token !== tok) { const c = BQ.audio.cur; if (!c || c.paused || c.ended) { clearInterval(iv); res(); } }
          }, 150);
        }));
      },
      sleep(ms) { return gate(BQ.sleep(ms)); },
      async seq(list) {
        for (const it of list) {
          if (!alive()) return never;
          if (typeof it === 'number') await S.sleep(it);
          else if (typeof it === 'function') await it();
          else if (typeof it === 'string') await S.play(it);
          else if (it && it.id) await S.play(it.id, it);
        }
      },
      fx(id, vol) { return alive() ? BQ.audio.fx(id, vol) : { stop() {}, done: never }; },
      later(fn, ms) { const t = setTimeout(() => { timers.delete(t); if (alive()) fn(); }, ms); timers.add(t); return t; },
      clear(t) { clearTimeout(t); timers.delete(t); },
    };
    return S;
  };

  /* ---------- دليل المعلّم: «للمعلّم» + «ملاحظات المراجِع» ---------- */
  const PIN = 'قُلِ الصَّوْتَ لا اسْمَ الحَرْفِ: «مْـ» ممدودةٌ والشَّفَتانِ مُطبَقَتانِ، بلا «مِيم» وبلا حَرَكةٍ بعدَها.';
  const panelOf = (ctx) => (ctx.frame && ctx.frame.querySelector('.bq-adult, .elp-adult')) || document.querySelector('.elp-adult');
  /** o: {main: html|fn, meta: html|fn, pin: bool} — تُحفظ لتحديث الملاحظات لاحقاً بـ K.meta */
  K.adult = function (ctx, o) {
    ctx._kx = Object.assign(ctx._kx || {}, o);
    const st = ctx._kx;
    const val = (v) => (typeof v === 'function' ? v() : v || '');
    const metaHtml = val(st.meta);
    const hasMeta = typeof ctx.adultMeta === 'function';
    let main = val(st.main);
    if (!hasMeta && metaHtml) {
      const p = panelOf(ctx);
      const wasOpen = !!(p && p.querySelector('details.kx-meta[open]'));
      main += '<details class="kx-meta"' + (wasOpen ? ' open' : '') + '><summary>ملاحظات المراجِع</summary>' + metaHtml + '</details>';
    }
    ctx.adult(main);
    if (st.pin) {
      const p = panelOf(ctx);
      if (!p || !p.textContent.includes('لا اسْمَ الحَرْفِ')) ctx.adult('<p class="kx-pin">' + PIN + '</p>' + main);
    }
    if (hasMeta) ctx.adultMeta(metaHtml);
  };
  /** تحديث «ملاحظات المراجِع» وحدها (سجلّ بالعربية) */
  K.meta = function (ctx) {
    if (!ctx._kx) return;
    if (typeof ctx.adultMeta === 'function') { const m = ctx._kx.meta; ctx.adultMeta(typeof m === 'function' ? m() : m || ''); }
    else K.adult(ctx, {});
  };
  /** نصّ العمر للمعلّم: حقل المحرّك ages_adult إن وُجد، وإلا نصّ العنصر */
  K.ageText = (meta, age, fallback) => (meta && meta.ages_adult && meta.ages_adult[age]) || (fallback && fallback[age]) || '';

  /* ---------- تحليل الصوت: مناطق الكلام والصمت ---------- */
  const anCache = {};
  K.analyze = function (id) {
    if (anCache[id]) return anCache[id];
    anCache[id] = (async () => {
      try {
        const r = await fetch(K.srcOf(id));
        if (!r.ok) return null;
        const buf = await r.arrayBuffer();
        const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        const ac = new OAC(1, 2, 44100);
        const ab = await new Promise((res, rej) => { const p = ac.decodeAudioData(buf, res, rej); if (p && p.catch) p.catch(rej); });
        const d = ab.getChannelData(0), sr = ab.sampleRate, fr = Math.round(sr * 0.01);
        const rms = [];
        let peak = 0;
        for (let i = 0; i + fr <= d.length; i += fr) { let s = 0; for (let j = i; j < i + fr; j++) s += d[j] * d[j]; const v = Math.sqrt(s / fr); rms.push(v); if (v > peak) peak = v; }
        const thr = Math.max(peak * 0.06, 0.004);
        const regs = [];
        let st = -1;
        rms.forEach((v, i) => { if (v >= thr) { if (st < 0) st = i; } else if (st >= 0) { regs.push([st, i]); st = -1; } });
        if (st >= 0) regs.push([st, rms.length]);
        // دمج الفجوات القصيرة جداً (< 70ms) وحذف الومضات (< 40ms)
        const m = [];
        regs.forEach((g) => { if (m.length && g[0] - m[m.length - 1][1] < 7) m[m.length - 1][1] = g[1]; else m.push(g.slice()); });
        const speech = m.filter((g) => g[1] - g[0] >= 4).map((g) => [g[0] / 100, g[1] / 100]);
        return { dur: ab.duration, speech };
      } catch (e) { return null; }
    })();
    return anCache[id];
  };
  /** يقسم سطراً إلى n مقاطع بالاعتماد على أطول (n-1) فجوات صمت */
  K.splitByGaps = function (an, n) {
    if (!an || !an.speech.length) return null;
    const sp = an.speech;
    const gaps = [];
    for (let i = 1; i < sp.length; i++) gaps.push({ i, len: sp[i][0] - sp[i - 1][1] });
    if (gaps.length < n - 1) return null;
    const cut = gaps.slice().sort((a, b) => b.len - a.len).slice(0, n - 1).map((g) => g.i).sort((a, b) => a - b);
    const out = []; let from = 0;
    cut.concat([sp.length]).forEach((c) => { out.push([sp[from][0], sp[c - 1][1]]); from = c; });
    return out;
  };
  /** أزمنة كلمات سطر: مناطق الكلام إن طابق عددها، وإلا توزيع بعدد الحروف مع الالتصاق بالفجوات */
  const bare = (w) => w.replace(/[ً-ْٰ«»،؟!.:…]/g, '').length || 1;
  K.wordTimes = function (an, words, estDur) {
    const n = words.length;
    if (an && an.speech.length) {
      const segs = K.splitByGaps(an, n);
      if (segs && an.speech.length === n) return segs;
      const on = an.speech[0][0], off = an.speech[an.speech.length - 1][1];
      const tot = words.reduce((a, w) => a + bare(w), 0);
      const bounds = [on]; let acc = 0;
      words.forEach((w) => { acc += bare(w); bounds.push(on + (off - on) * acc / tot); });
      // التصاق كل حدّ داخليّ بأقرب فجوة (± ١٨٠ms)
      const mids = []; for (let i = 1; i < an.speech.length; i++) mids.push((an.speech[i][0] + an.speech[i - 1][1]) / 2);
      for (let i = 1; i < n; i++) { let best = null; mids.forEach((g) => { if (Math.abs(g - bounds[i]) < 0.18 && (best == null || Math.abs(g - bounds[i]) < Math.abs(best - bounds[i]))) best = g; }); if (best != null) bounds[i] = best; }
      return words.map((w, i) => [bounds[i], bounds[i + 1]]);
    }
    const d = estDur || 2; const tot = words.reduce((a, w) => a + bare(w), 0); let acc = 0;
    return words.map((w) => { const a = acc; acc += bare(w); return [0.15 + (d - 0.3) * a / tot, 0.15 + (d - 0.3) * acc / tot]; });
  };

  /** يشغّل ملفّ السطر من from إلى to (ث) مع onTime(t) لكل إطار — يندمج مع BQ.audio (الإيقاف/الإعادة)؛ حارس تعطّل ٤ ث */
  K.playSeg = function (S, id, from, to, opt) {
    opt = opt || {};
    if (!S.live) return never;
    BQ.audio.stop();
    // v0-12: عنصر الكلام المشترك «المفتوح» بلمسة (iOS يرفض عنصراً جديداً خارج اللمسة) — لا new Audio()
    const au = (BQ.audio.voice && BQ.audio.voice()) || new Audio();
    try { au.pause(); } catch (e) {}
    au.preload = 'auto';
    au.src = K.srcOf(id);
    try { au.playbackRate = 1; } catch (e) {}
    BQ.audio.cur = au;
    const myTok = BQ.audio.token;
    const L = BQ.line(id);
    if (opt.caption !== false && L) K.caption(K.spk(id), opt.captionText || L.t.replace(/⏸\S*/g, ' '));
    if (BQ.audio.onLine) BQ.audio.onLine(id);
    return S.gate(new Promise((res) => {
      let done = false, blocked = false, lastT = -1, lastAt = performance.now();
      const mine = () => BQ.audio.token === myTok && BQ.audio.cur === au;
      const off = () => { au.removeEventListener('ended', fin); au.removeEventListener('error', fin); au.removeEventListener('loadedmetadata', start); };
      function fin() {
        if (done) return; done = true; off();
        if (mine()) { try { au.pause(); } catch (e) {} K.caption(null); BQ.audio.cur = null; BQ.audio.segLive = false; }
        opt.onEnd && opt.onEnd(); res();
      }
      const tick = () => {
        if (done) return;
        if (!mine() || !S.live) return fin();
        const t = au.currentTime;
        const now = performance.now();
        if (t !== lastT || blocked || document.hidden) { lastT = t; lastAt = now; } else if (now - lastAt > 4000) return fin(); // تعطّل: لا تقدّم ٤ ث
        opt.onTime && opt.onTime(t);
        if (to != null && t >= to) return fin();
        requestAnimationFrame(tick);
      };
      const play = () => {
        if (done || !mine()) return;
        let p; try { p = au.play(); } catch (e) { p = null; }
        if (p && p.then) p.then(() => { blocked = false; }).catch((err) => {
          if (done) return;
          if (err && err.name === 'NotAllowedError' && BQ.audio.blocked) { blocked = true; BQ.audio.blocked(play); } else setTimeout(fin, 500);
        });
      };
      function start() {
        if (done || !mine()) return;
        if (opt.rate) au.playbackRate = opt.rate;
        try { if (from) au.currentTime = from; } catch (e) {}
        lastAt = performance.now();
        BQ.audio.segLive = true;
        play();
        requestAnimationFrame(tick);
      }
      au.addEventListener('ended', fin); au.addEventListener('error', fin);
      if (au.readyState >= 1) start(); else au.addEventListener('loadedmetadata', start, { once: true });
      setTimeout(() => { if (!done && au.readyState < 1 && !blocked) fin(); }, 6000);
    }));
  };
  /** نسخة بلا ملفّ: نصّ مصاحب + ساعة تقديرية تُغذّي onTime */
  K.fakeSeg = function (S, id, dur, opt) {
    opt = opt || {};
    if (!S.live) return never;
    BQ.audio.stop();
    const myTok = BQ.audio.token;
    const L = BQ.line(id);
    if (L && opt.caption !== false) K.caption(K.spk(id), opt.captionText || L.t.replace(/⏸\S*/g, ' '));
    if (BQ.audio.onLine) BQ.audio.onLine(id);
    const t0 = performance.now();
    return S.gate(new Promise((res) => {
      const tick = () => {
        if (BQ.audio.token !== myTok || !S.live) { res(); return; }
        const t = (performance.now() - t0) / 1000 * (opt.rate || 1);
        opt.onTime && opt.onTime(t);
        if (t >= dur) { K.caption(null); res(); return; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }));
  };
  K.estDur = (id) => { const L = BQ.line(id); return L ? Math.max(1.2, L.t.length * 0.085) : 1; };

  /* ---------- مؤشّر الخطوات: المؤشّر الموحَّد BQ.ui.steps، وبديل محلّيّ بالشكل نفسه ---------- */
  function localSteps(parent, n) {
    const dots = Array.from({ length: n }, () => h('i'));
    const lab = h('b');
    const el = h('div.kx-steps', { role: 'img' }, ...dots, lab);
    parent.append(el);
    return {
      el,
      set(i) {
        dots.forEach((d, k) => { d.className = k < i ? 'done' : k === i ? 'on' : ''; });
        lab.textContent = BQ.state.age === '10-12' ? K.AR(i + 1) + ' / ' + K.AR(n) : '';  // الأرقام لـ١٠–١٢ وحدها
        lab.hidden = BQ.state.age !== '10-12';
        el.setAttribute('aria-label', 'الخُطْوَةُ ' + K.AR(i + 1) + ' مِنْ ' + K.AR(n));
      },
    };
  }
  K.steps = function (parent, n, opt) {
    opt = opt || {};
    const bar = h('div.kx-stepbar');
    parent.append(bar);
    let cur = 0, impl = null;
    const build = (m) => {
      bar.replaceChildren();
      if (BQ.ui.steps) {
        impl = BQ.ui.steps(bar, m, { label: opt.label });
        if (impl && impl.el && !impl.el.isConnected) bar.append(impl.el);
      } else impl = localSteps(bar, m);
    };
    const api = {
      el: bar, n,
      set(i) { cur = i; impl.set(Math.min(i, api.n - 1)); },
      /** يعيد بناء المؤشّر بعدد جديد (مثلاً: من الشاشات إلى الجولات) */
      resize(m, i) { api.n = m; build(m); api.set(i == null ? Math.min(cur, m - 1) : i); },
      grow(m) { if (m > api.n) api.resize(m); },
    };
    build(n); api.set(0);
    return api;
  };
  /* ---------- أزرار (الزرّ الموحَّد .bq-btn) ---------- */
  K.goBtn = function (parent, label) {
    return new Promise((res) => {
      const b = h('button.bq-btn.kx-cont', { type: 'button', onclick: () => { b.remove(); res(); } }, label || 'أَكْمِلْ', BQ.icon('next'));
      parent.append(b);
      requestAnimationFrame(() => b.focus({ preventScroll: true }));
    });
  };
  K.nextBtn = function (parent) {
    return new Promise((res) => {
      const b = h('button.bq-btn.kx-cont', { type: 'button', onclick: () => { b.remove(); res(); } }, 'التّالي', BQ.icon('next'));
      parent.append(b);
      requestAnimationFrame(() => b.focus({ preventScroll: true }));
    });
  };
  /** بوّابة المعلّم: ضغط مطوّل (٠٫٨ ث) أو Enter — تعيد 'open' أو 'skip' */
  K.adultGate = function (S, parent, opt) {
    return new Promise((res) => {
      let t = null;
      const open = () => { box.remove(); res('open'); };
      const btn = h('button.kx-gate-open', { type: 'button', 'aria-label': opt.label || 'لِلْمُعَلِّمِ: افْتَحْ' }, h('span.kx-gate-fill'), BQ.icon('adult'), h('span', null, opt.label || 'لِلْمُعَلِّمِ: اضْغَطْ مُطَوَّلاً لِلْفَتْحِ'));
      btn.addEventListener('pointerdown', () => { btn.classList.add('is-hold'); t = setTimeout(open, 800); });
      const cancel = () => { btn.classList.remove('is-hold'); clearTimeout(t); };
      btn.addEventListener('pointerup', cancel); btn.addEventListener('pointerleave', cancel); btn.addEventListener('pointercancel', cancel);
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
      const skip = h('button.bq-btn.ghost', { type: 'button', onclick: () => { box.remove(); res('skip'); } }, 'تَخَطَّ', BQ.icon('next'));
      const box = h('div.kx-gate', null,
        h('div.kx-gate-card', null,
          h('div.kx-gate-lock', { 'aria-hidden': 'true', html: '<svg viewBox="0 0 48 48"><rect x="10" y="21" width="28" height="21" rx="4" fill="currentColor"/><path d="M16 21v-6a8 8 0 0 1 16 0v6" fill="none" stroke="currentColor" stroke-width="4.5"/></svg>' }),
          opt.preview || null,
          h('p.kx-gate-t', null, opt.title || ''),
          h('div.kx-gate-row', null, btn, skip)));
      parent.append(box);
    });
  };

  /* ---------- جولة «استمع واختر» (audio_match) ----------
     opt: {items:[{id,img,icon,sound,aria}], correct, cls, prompt:async()=>{}, onCorrect:async(btn)=>{},
           onWrong1:async(it,btn)=>{}, onWrong2:async(it,btn,cbtn)=>{}, autoReplayMs, parent}
     → {first:boolean, shown:boolean, order:[ids]} — مظهر التغذية موحَّد: هزّة + خفوت ٨٠٠ms، صواب = حلقة خضراء + علامة */
  K.round = function (S, parent, opt) {
    return new Promise((resolve) => {
      const items = opt.noShuffle ? opt.items.slice() : BQ.shuffle(opt.items);
      let tries = 0;
      let auto = null;
      const wrap = BQ.ui.choices(parent, {
        items: items.map((it) => ({ id: it.id, img: it.img, icon: it.icon, aria: it.aria || 'صورة' })),
        cls: opt.cls, aria: 'صُوَرٌ لِلاخْتِيارِ',
        onPick: async (it, btn, btns) => {
          if (auto) { S.clear(auto); auto = null; }
          wrap.lock();
          const item = opt.items.find((x) => x.id === it.id);
          const cbtn = btns.find((b) => b.dataset.id === opt.correct);
          if (it.id === opt.correct) {
            BQ.ui.ok(btn); S.fx(BQ.sfx.ok, 0.45);
            opt.onCorrect && (await opt.onCorrect(btn));
            resolve({ first: tries === 0, shown: false, order: items.map((x) => x.id) });
            return;
          }
          tries++;
          BQ.ui.shake(btn);
          S.later(() => btn.classList.remove('is-dim'), 800);
          if (item && item.sound) await S.play(item.sound);
          if (tries === 1) {
            opt.onWrong1 && (await opt.onWrong1(item, btn));
            btn.classList.remove('is-dim');
            wrap.lock(false);
          } else {
            btns.forEach((b) => { if (b !== cbtn && b !== btn) b.classList.add('is-hidden'); });
            BQ.ui.glow(cbtn, true); BQ.ui.pulse(cbtn);
            opt.onWrong2 && (await opt.onWrong2(item, btn, cbtn));
            BQ.ui.glow(cbtn, false); BQ.ui.ok(cbtn);
            await S.sleep(500);
            resolve({ first: false, shown: true, order: items.map((x) => x.id) });
          }
        },
      });
      wrap.lock();
      (async () => {
        opt.prompt && (await opt.prompt());
        wrap.lock(false);
        if (opt.autoReplayMs && opt.prompt) auto = S.later(async () => { auto = null; wrap.lock(); await opt.prompt(); wrap.lock(false); }, opt.autoReplayMs);
      })();
      opt.onWrap && opt.onWrap(wrap);
    });
  };

  /* ---------- أنماط مشتركة ---------- */
  K.style('st-kit', `
${SC} .kx-root { position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; gap: clamp(14px, 3cqi, 26px); }
${SC} .kx-root:has(> .kx-stepbar:not(:empty)) { padding-top: 48px; }
${SC} .kx-stepbar { position: absolute; top: 0; inset-inline: 0; z-index: 3; display: flex; justify-content: center; min-height: 32px; pointer-events: none; }
${SC} .kx-stepbar > * { pointer-events: auto; }
${SC} .kx-stepbar:empty { display: none; }
${SC} .kx-steps { display: inline-flex; align-items: center; gap: 7px; min-height: 32px; padding: 0 14px; border-radius: 999px; background: var(--white); border: 1.5px solid var(--sky-line); font: 600 13px/1 var(--ff-ui); color: var(--navy); font-variant-numeric: tabular-nums; white-space: nowrap; }
${SC} .kx-steps i { width: 10px; height: 10px; border-radius: 99px; background: var(--sky-line); transition: width .35s, background .35s; }
${SC} .kx-steps i.done { background: var(--sun); }
${SC} .kx-steps i.on { width: 24px; background: var(--sky); }
${SC} .kx-steps b { margin-inline-start: 4px; font-weight: 600; }
${SC} .kx-cont { min-height: 48px; padding-inline: 1.4em; animation: kxIn .35s ease-out both; }
${SC} .kx-a46 .kx-cont, ${SC} .kx-a46 .kx-gate-row .bq-btn { min-height: 60px; font-size: 18px; }
${SC} .bq-choices { gap: clamp(8px, 2.6cqi, 26px); flex-wrap: nowrap; }
${SC} .bq-choices .bq-choice { width: clamp(84px, 26cqi, 210px); }
${SC} .bq-choice.is-picked { border-color: var(--navy); box-shadow: 0 0 0 4px var(--navy), 0 12px 24px var(--shade); }
${SC} .kx-tick { position: absolute; z-index: 3; top: 6%; inset-inline-end: 6%; width: 24%; max-width: 44px; aspect-ratio: 1; border-radius: 50%; background: var(--ok); color: var(--white); display: none; place-items: center; padding: 4%; }
${SC} .kx-tick svg { width: 100%; }
${SC} .is-ok > .kx-tick { display: grid; }
${SC} .kx-gate { width: 100%; display: grid; place-items: center; }
${SC} .kx-gate-card { background: var(--white); border-radius: var(--r-lg); padding: clamp(20px, 4cqi, 32px); display: grid; justify-items: center; gap: 14px; width: min(100%, 520px); text-align: center; box-shadow: 0 14px 34px var(--shade); }
${SC} .kx-gate-lock { width: 46px; height: 46px; border-radius: 50%; background: var(--sky-wash); color: var(--navy); display: grid; place-items: center; }
${SC} .kx-gate-lock svg { width: 58%; }
${SC} .kx-gate-t { margin: 0; font: 500 15px/1.7 var(--ff-ui); color: var(--muted); max-width: 40ch; }
${SC} .kx-gate-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
${SC} .kx-gate-open { position: relative; overflow: hidden; font: 700 16px/1 var(--ff-display); background: var(--navy); color: var(--white); border: 0; border-radius: 999px; padding: .8em 1.2em; display: inline-flex; gap: .5em; align-items: center; cursor: pointer; min-height: 48px; }
${SC} .kx-gate-open .bq-ic { width: 1.2em; height: 1.2em; position: relative; }
${SC} .kx-gate-open > span:last-child { position: relative; }
${SC} .kx-gate-fill { position: absolute; inset: 0; width: 0; background: var(--ok); }
${SC} .kx-gate-open.is-hold .kx-gate-fill { width: 100%; transition: width .8s linear; }
${SC} .kx-ghost-hand { position: absolute; width: 58px; color: var(--navy); z-index: 6; pointer-events: none; filter: drop-shadow(0 0 2px var(--white)) drop-shadow(0 6px 8px var(--shade)); opacity: 0; transition: left .7s ease-in-out, top .7s ease-in-out, opacity .3s, transform .15s; }
${SC} .kx-ghost-hand.in { opacity: .9; }
${SC} .kx-ghost-hand.tap { transform: scale(.85); }
${SC} .kx-pin { background: var(--paper); border-inline-start: 4px solid var(--coral); border-radius: var(--r-sm); padding: 8px 12px; font-weight: 600; }
.kx-meta { margin-top: 14px; border-top: 1px solid var(--sky-line); padding-top: 8px; }
.kx-meta > summary { cursor: pointer; font-weight: 600; color: var(--navy); min-height: 44px; display: flex; align-items: center; }
.kx-meta p { font-size: 14px; color: var(--muted); }
@keyframes kxIn { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: none; } }
@keyframes kxBreath { 50% { transform: scale(1.07); } }
@container stage (max-width: 560px) {
  ${SC} .kx-steps { padding: 0 11px; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .kx-cont { animation: none; }
}
`);
  /** يد شبحية: تتحرّك إلى عنصر وتنقر (إرشاد بلا كلام) */
  K.ghostTap = async function (S, frameEl, target, opt) {
    if (BQ.reduced()) return;
    opt = opt || {};
    const hand = h('span.kx-ghost-hand', { 'aria-hidden': 'true' }, BQ.icon('hand'));
    frameEl.append(hand);
    const fr = frameEl.getBoundingClientRect();
    const place = (el, dx, dy) => { const r = el.getBoundingClientRect(); hand.style.left = (r.left - fr.left + r.width * (dx == null ? 0.55 : dx)) + 'px'; hand.style.top = (r.top - fr.top + r.height * (dy == null ? 0.55 : dy)) + 'px'; };
    place(opt.from || target, 0.5, 1.1);
    await S.sleep(60); hand.classList.add('in');
    await S.sleep(200); place(target); await S.sleep(750);
    hand.classList.add('tap'); opt.onTap && opt.onTap(); await S.sleep(220); hand.classList.remove('tap');
    if (opt.to) { await S.sleep(250); place(opt.to); await S.sleep(800); opt.onDrop && opt.onDrop(); }
    await S.sleep(opt.hold || 500);
    hand.classList.remove('in'); await S.sleep(320); hand.remove();
  };
  /** الكلمة المفردة بصيغة الوقف «ماءْ» وميمها الأولى «مـ» قابلة للإضاءة بالمرجانيّ */
  K.MAA = '<span class="m">م</span>اءْ';
  K.FLIP_IC = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 20a14 14 0 0 1 25-6l3 3M38 28a14 14 0 0 1-25 6l-3-3" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><path d="M39 8v10H29M9 40V30h10" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  BQ.kit = K;
  document.dispatchEvent(new Event('bq-kit'));
})();
