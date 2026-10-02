/* EL16 «اختبر نفسك» — gme-108 · تحقّق مؤجَّل (audio_match + ObservationButtons + TraceCanvas) — خارج محرّك الإتقان
   ت١ استماع · ت٢ تعرّف الرسم · ت٣ نطق (ملاحظة المعلّم) · ت٤ تفاعل/تمييز · ت٥ خطّ (نقطة البدء وحدها) · ت٦ تقرير المعلّم.
   محاولة واحدة لكلّ بند؛ الإعادة مسموحة ولا تُعدّ مساعدة. بعد كلّ جواب نغمة محايدة واحدة وتتلوّن دائرة ✓ أيّاً كان الجواب —
   لا صواب ولا خطأ أمام الطفل، ولا نسبة ولا عدد. التقرير للمعلّم: سطر لكلّ مهارة «من أوّل مرّة · بعد إعادة · لم يُجب». */
(function () {
  'use strict';
  const h = BQ.h;
  const ID = 'EL16';
  const S = '.elp[data-el="EL16"]';
  /*SX-BEGIN*/
  /* ---- مفردات تصميم مشتركة (EL08·EL10·EL12·EL15·EL16) — تُحقن مرّة واحدة؛ أيّ ملف يحملها أوّلاً (نسخ متطابقة) ---- */
  if (!document.getElementById('st-sx')) {
    const sx = document.createElement('style');
    sx.id = 'st-sx';
    sx.textContent = `
.elp .sx-wrap { width: 100%; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: clamp(14px, 2.8cqi, 26px); }
.elp .sx-in { animation: sxIn .45s cubic-bezier(.2,.9,.3,1.15) both; }
@keyframes sxIn { from { opacity: 0; transform: translateY(14px) scale(.97); } }
/* بديل محلّيّ لمؤشّر الخطوات الموحّد (يُستعمل فقط إن لم يوفّر المحرّك BQ.ui.steps) */
.elp .sx-steps { display: inline-flex; align-items: center; gap: 12px; min-height: 32px; background: var(--white); border: 1.5px solid var(--sky-line); border-radius: 999px; padding: 6px 12px; box-shadow: 0 4px 14px var(--shade); }
.elp .sx-steps .d { display: flex; gap: 6px; align-items: center; }
.elp .sx-steps i { display: block; width: 10px; height: 10px; border-radius: 99px; background: var(--sky-line); transition: width .3s, background .3s; }
.elp .sx-steps i.on { background: var(--sun); }
.elp .sx-steps i.cur { width: 24px; background: var(--sky-ink, var(--navy)); }
.elp .sx-steps b { font: 600 13px/1 var(--ff-ui); color: var(--navy); padding-top: 2px; }
.elp .sx-photo { position: relative; flex: none; border-radius: var(--r-lg); overflow: hidden; background: var(--white); border: 4px solid var(--white); box-shadow: 0 6px 0 var(--sky-line), 0 12px 24px var(--shade); padding: 0; }
.elp .sx-photo > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity .7s ease, transform .7s ease; }
.elp .sx-photo.bq-choice { width: auto; aspect-ratio: auto; display: block; }
.elp button.sx-photo { cursor: pointer; transition: transform .18s ease, box-shadow .25s, opacity .35s; }
@media (hover: hover) { .elp button.sx-photo:hover:not(:disabled) { transform: translateY(-4px); } }
.elp button.sx-photo:disabled { cursor: default; }
/* حالات موحّدة مع بطاقات المحرّك (.bq-choice): مختار = حلقة كحلية · إضاءة الدليل = هالة شمسية · باهت = ٠٫٦ */
.elp .bq-choice.is-picked, .elp .sx-photo.is-picked { border-color: var(--navy); box-shadow: 0 0 0 4px var(--navy), 0 12px 24px var(--shade); }
.elp .sx-photo.is-dim { opacity: .6; }
.elp .sx-photo.is-glow { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 28px var(--sun); }
.elp .sx-photo:focus-visible, .elp .sx-adult button:focus-visible, .elp .sx-round:focus-visible, .elp .sx-hear:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
.elp .sx-pin { position: absolute; top: 8px; inset-inline-start: 8px; width: clamp(30px, 6cqi, 44px); aspect-ratio: 1; border-radius: 50%; background: var(--navy); color: var(--sun-soft); display: grid; place-items: center; box-shadow: 0 0 0 3px var(--white); z-index: 2; }
.elp .sx-pin .bq-ic { width: 58%; height: 58%; }
.elp .sx-actions { display: flex; gap: 12px; justify-content: center; align-items: center; flex-wrap: wrap; min-height: 54px; }
.elp .bq-stage .bq-btn { min-height: 44px; }
.elp.sx-a46 .bq-stage .bq-btn { min-height: 60px; padding-inline: 1.4em; }
.elp .sx-round { width: clamp(52px, 8cqi, 64px); aspect-ratio: 1; border-radius: 50%; border: 1.5px solid var(--sky-line); background: var(--white); color: var(--navy); display: grid; place-items: center; cursor: pointer; padding: 0; box-shadow: 0 4px 12px var(--shade); }
.elp .sx-round .bq-ic { width: 46%; height: 46%; }
.elp.sx-a46 .sx-round { width: 64px; }
/* بديل احتياطيّ لـ.bq-hear (app.css) بأدنى أولوية — «اسمع الصوت» (المثير): هويّة مختلفة عن سمّاعة التعليمة الصفراء: تعبئة زرقاء وأيقونة أذن بيضاء */
:where(.elp .sx-hear) { width: clamp(64px, 10cqi, 88px); aspect-ratio: 1; border-radius: 50%; border: 4px solid var(--white); background: var(--sky-ink, var(--navy)); color: var(--white); display: grid; place-items: center; cursor: pointer; padding: 0; position: relative; box-shadow: 0 5px 0 var(--navy), 0 10px 22px var(--shade); }
:where(.elp .sx-hear .bq-ic) { width: 52%; height: 52%; }
:where(.elp .sx-hear.is-playing)::after { content: ""; position: absolute; inset: -11px; border-radius: 50%; border: 4px solid var(--sky-ink, var(--navy)); animation: bqRing 1s ease-out infinite; }
:where(.elp.sx-a46 .sx-hear) { min-width: 72px; }
/* شريط «ملاحظة المعلّم»: خارج مساحة الطفل بصرياً */
.elp .sx-adult { align-self: stretch; display: flex; align-items: center; gap: 14px; background: var(--navy); color: var(--white); border-radius: var(--r-md); padding: 10px 12px 10px 16px; box-shadow: 0 10px 24px var(--shade); position: relative; }
.elp .sx-adult::before { content: ""; position: absolute; inset-inline: 22px; top: -9px; height: 9px; background: repeating-linear-gradient(90deg, var(--sky-line) 0 8px, transparent 8px 14px); border-radius: 4px 4px 0 0; opacity: .9; }
.elp .sx-adult-tag { display: flex; align-items: center; gap: 10px; font: 500 13px/1.35 var(--ff-ui); color: var(--sky-line); min-width: 0; flex: none; }
.elp .sx-adult-tag .bq-ic { width: 34px; height: 34px; padding: 7px; border-radius: 50%; background: color-mix(in srgb, var(--white) 14%, transparent); color: var(--sun-soft); flex: none; }
.elp .sx-adult-tag b { display: block; font: 700 15px/1.3 var(--ff-ui); color: var(--white); }
.elp .sx-adult-btns { display: flex; gap: 8px; flex: 1; justify-content: flex-end; flex-wrap: wrap; }
.elp .sx-adult button { min-height: var(--sx-touch, 50px); min-width: 108px; border-radius: 14px; border: 1.5px solid color-mix(in srgb, var(--white) 30%, transparent); background: color-mix(in srgb, var(--white) 10%, transparent); color: var(--white); font: 600 16px/1.3 var(--ff-ui); display: flex; align-items: center; justify-content: center; padding: 6px 14px 7px; cursor: pointer; transition: background .2s, color .2s; }
.elp .sx-adult button:hover { background: color-mix(in srgb, var(--white) 20%, transparent); }
.elp .sx-adult button[aria-pressed="true"] { background: var(--sun); border-color: var(--sun); color: var(--navy); }
.elp.sx-a46 .sx-adult { --sx-touch: 60px; }
.elp .sx-note { margin: 0; font: 500 13px/1.6 var(--ff-ui); color: var(--muted); text-align: center; }
.elp .elp-tool.sx-has-note { position: relative; }
.elp .elp-tool.sx-has-note::after { content: ""; position: absolute; top: -2px; inset-inline-end: -2px; width: 12px; height: 12px; border-radius: 50%; background: var(--coral); box-shadow: 0 0 0 2px var(--white); animation: bqPulse 1.2s ease-in-out 3; }
.elp .sx-var { display: inline-flex; align-items: center; gap: 6px; background: var(--white); border: 1.5px solid var(--sky-line); border-radius: 999px; padding: 4px 4px 4px 10px; font: 600 12.5px/1 var(--ff-ui); color: var(--muted); box-shadow: 0 4px 12px var(--shade); }
.elp .sx-var .bq-ic { width: 16px; height: 16px; color: var(--navy); }
.elp .sx-var button { min-width: 44px; min-height: 44px; border-radius: 999px; border: 0; background: var(--sky-wash); color: var(--navy); font: 700 16px/1 var(--ff-display); cursor: pointer; }
.elp .sx-var button[aria-pressed="true"] { background: var(--navy); color: var(--white); }
.elp .bq-adult .sx-hint { background: color-mix(in srgb, var(--sun-soft) 45%, var(--white)); border-radius: var(--r-sm); padding: 8px 12px; }
.elp .bq-adult .sx-pinned { background: var(--paper); border-inline-start: 4px solid var(--coral); border-radius: var(--r-sm); padding: 8px 12px; font-weight: 600; }
.elp .bq-adult .rv { color: var(--muted); font-size: 13px; }
.elp .bq-adult table { width: 100%; border-collapse: collapse; font-size: 13.5px; margin: 4px 0 10px; }
.elp .bq-adult td, .elp .bq-adult th { border-bottom: 1px solid var(--sky-line); padding: 5px 4px; text-align: start; }
.elp .bq-adult details.sx-meta { margin-top: 12px; border-top: 1px solid var(--sky-line); padding-top: 4px; }
.elp .bq-adult details.sx-meta summary { cursor: pointer; min-height: 44px; display: flex; align-items: center; font: 600 14px/1.4 var(--ff-ui); color: var(--navy); }
.elp .bq-adult details.sx-meta p { font-size: 13.5px; }
.elp .sx-home { width: 100%; text-align: start; background: var(--paper); border: 1.5px solid var(--paper-edge); border-radius: var(--r-md); padding: 10px 14px; margin: 2px 0 0; }
.elp .sx-home b { display: block; font: 700 14px/1.5 var(--ff-ui); color: var(--navy); margin-bottom: 2px; }
.elp .sx-home ul { margin: 0; padding-inline-start: 1.2em; font: 400 14px/1.7 var(--ff-ui); color: var(--ink); }
@container stage (max-width: 560px) {
  .elp .sx-adult { flex-direction: column; align-items: stretch; padding: 12px; gap: 10px; }
  .elp .sx-adult-btns { justify-content: stretch; }
  .elp .sx-adult button { flex: 1; min-width: 0; font-size: 15px; padding: 6px 6px 7px; }
}
@media (prefers-reduced-motion: reduce) {
  .elp .sx-in, .elp .elp-tool.sx-has-note::after, .elp .sx-hear.is-playing::after { animation: none !important; }
  .elp .sx-photo > img, .elp button.sx-photo { transition: none; }
}`;
    document.head.append(sx);
  }
  const sxAR = (x) => String(x).replace(/\d/g, (c) => '٠١٢٣٤٥٦٧٨٩'[c]);
  /** مؤشّر الخطوات الموحّد (BQ.ui.steps من المحرّك)؛ بديل محلّيّ بالشكل نفسه إن لم يتوفّر — نقاط بلا أرقام لـ٤–٩ */
  const sxSteps = (n, i) => {
    if (BQ.ui.steps) {
      const tmp = document.createElement('div');
      try { const s = BQ.ui.steps(tmp, n, {}); if (s && s.set) s.set(Math.max(0, i)); const el = (s && s.el) || tmp.firstElementChild; if (el) return el; } catch (e) { /* البديل المحلّيّ */ }
    }
    const d = h('span.d', { 'aria-hidden': 'true' });
    for (let k = 0; k < n; k++) d.append(h('i', { class: k === i ? 'cur' : k < i ? 'on' : '' }));
    const c = Math.min(Math.max(i, 0) + 1, n);
    return h('div.sx-steps', { role: 'img', 'aria-label': 'الخُطْوَةُ ' + sxAR(c) + ' مِنْ ' + sxAR(n) }, d, BQ.state.age === '10-12' ? h('b', { 'aria-hidden': 'true' }, sxAR(c) + ' / ' + sxAR(n)) : null);
  };
  const sxAdultTool = (frame) => { const t = [...frame.querySelectorAll('.elp-tool')]; return t.find((b) => /دليل المعلّم/.test(b.textContent)) || t[0] || null; };
  const SX_PIN = 'قُلِ الصَّوْتَ لا اسْمَ الحَرْفِ: «مْـ» ممدودةٌ والشَّفَتانِ مُطبَقَتانِ، بلا «مِيم» وبلا حَرَكةٍ بعدَها.';
  /** أدوات آمنة لكلّ عنصر: لا صوت ولا متابعة بعد مغادرته (ctx.alive من المحرّك إن وُجد) + دليل المعلّم بقسمين */
  const sxKit = (ctx) => {
    let gone = false;
    ctx.onCleanup(() => { gone = true; });
    ctx.frame.classList.toggle('sx-a46', ctx.age() === '4-6');
    const alive = () => !gone && (typeof ctx.alive === 'function' ? ctx.alive() : true);
    function say(id, opt) {
      if (!alive()) return Promise.resolve(false);
      const p = BQ.audio.play(id, opt);
      const tok = BQ.audio.token;
      return new Promise((res) => {
        let done = false;
        p.then(() => { done = true; res(alive()); });
        const iv = setInterval(() => { if (done) return clearInterval(iv); if (BQ.audio.token !== tok || !alive()) { clearInterval(iv); res(false); } }, 120);
      });
    }
    /** بارق المتحرّك (BQ.ui.brq): يتكلّم أثناء السطر ثم مزاج قصير (cheer للتعزيز · think لإعادة المحاولة) ويخرج — v0-12 */
    function bariq(stage, id, side) {
      if (!alive()) return Promise.resolve(false);
      const anim = BQ.ui.brq ? BQ.ui.brq('talk') : h('img', { src: BQ.char.BRQ, alt: '' });
      const el = h('div.bq-bariq' + (BQ.ui.brq ? '.has-anim' : '') + (side === 'left' ? '.left' : ''), { 'aria-hidden': 'true' }, anim);
      stage.append(el);
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
      const mood = /fb-yes|FB_0[1235]|EL06_05|_key_|s1_01|scr06/.test(id || '') ? 'cheer' : /retry|EL02_04|FB_04/.test(id || '') ? 'think' : '';
      return say(id).then((r) => new Promise((res) => {
        if (r && mood && anim.brq) anim.brq(mood);
        setTimeout(() => { el.classList.remove('in'); setTimeout(() => el.remove(), 480); res(r && alive()); }, r && mood ? 700 : 0);
      }));
    }
    /** main: «للمعلّم» (≤ ٣ أوامر قصيرة) · meta: «ملاحظات المراجِع» المطويّة (المحطّة، الرصد، ما يُسجَّل) */
    function adult(main, meta) {
      if (typeof ctx.adultMeta === 'function') { ctx.adult(main); ctx.adultMeta(meta || ''); }
      else ctx.adult(main + (meta ? '<details class="sx-meta"><summary>ملاحظات المراجِع</summary>' + meta + '</details>' : ''));
    }
    /** السطر المثبَّت عن نطق الصوت — يُضاف إن لم يعرضه المحرّك خارج جسم الدليل */
    function pinned() {
      const box = ctx.frame.querySelector('.bq-adult');
      const body = ctx.frame.querySelector('.elp-adult-body');
      const outside = box ? box.textContent.replace(body ? body.textContent : '', '') : '';
      return /اسْمَ الحَرْفِ|اسم الحرف/.test(outside) ? '' : '<p class="sx-pinned">' + SX_PIN + '</p>';
    }
    return { alive, say, bariq, adult, pinned };
  };
  /** ورقة الختام من المحرّك + «في البيت اليوم» (≤ ٣ أسطر) — تُضاف محلّياً إن لم يعرضها المحرّك */
  const sxEnd = (stage, opt) => {
    const card = BQ.ui.endCard(stage, opt);
    const home = (opt.home || []).slice(0, 3);
    const box = (card && card.querySelector && card.querySelector('.bq-end-card')) || card;
    if (home.length && box && box.append && !box.textContent.includes(home[0].slice(0, 12))) {
      const row = box.querySelector('.bq-end-row');
      const el = h('div.sx-home', null, h('b', null, 'في البيت اليوم'), h('ul', null, home.map((t) => h('li', null, t))));
      if (row) row.before(el); else box.append(el);
    }
    return card;
  };
  /*SX-END*/
  const NS = 'http://www.w3.org/2000/svg';

  // «م» بالمستوى ٢ (نقطة البدء وحدها) بالصيغة المختارة في EL12 (⏸ معلّقة) — الهندسة نفسها
  const VAR = {
    A: { tag: 'أ', strokes: ['M45.81 53.19 A13 13 0 1 1 68 44 A13 13 0 0 1 45.81 53.19 Q40.5 60 40.5 72 L40.5 82 Q40.5 88 35 89.5'], cps: [[45.8, 53.2], [55, 31], [68, 44], [55, 57], [40.5, 72], [36, 89]], starts: [0] },
    B: { tag: 'ب', strokes: ['M55 31 A13 13 0 1 0 55 57 A13 13 0 1 0 55 31', 'M42.3 49 L42.3 88'], cps: [[55, 31], [42, 44], [55, 57], [68, 44], [42.3, 50], [42.3, 87]], starts: [0, 4] },
  };

  if (!document.getElementById('st-EL16v2')) {
    const st = document.createElement('style');
    st.id = 'st-EL16v2';
    st.textContent = `
${S} .t16 { width: 100%; display: flex; flex-direction: column; align-items: center; gap: clamp(16px, 3cqi, 26px); }
${S} .t16-in { animation: sxIn .45s cubic-bezier(.2,.9,.3,1.15) both; }
${S} .t16-main { width: 100%; display: flex; align-items: center; justify-content: center; gap: clamp(16px, 4cqi, 36px); flex-wrap: wrap; }
${S} .t16-dots { display: inline-flex; gap: 10px; background: var(--white); border: 1.5px solid var(--sky-line); border-radius: 999px; padding: 7px 12px; box-shadow: 0 4px 14px var(--shade); }
${S} .t16-dot { width: var(--t16-dot, 30px); aspect-ratio: 1; border-radius: 50%; border: 2.5px dashed var(--sky-2); display: grid; place-items: center; color: var(--white); transition: background .3s, border-color .3s, transform .3s; }
${S} .t16-dot .bq-ic { width: 62%; height: 62%; opacity: 0; transition: opacity .3s; }
${S} .t16-dot.cur { border-style: solid; border-color: var(--navy); transform: scale(1.1); }
${S} .t16-dot.on { border-style: solid; border-color: var(--ok); background: var(--ok); }
${S} .t16-dot.on .bq-ic { opacity: 1; }
${S} .t16-dot.pop { animation: bqPop .35s ease-out; }
${S} .t16 .bq-choices { flex-wrap: nowrap; }
${S} .t16 .bq-choice { width: clamp(92px, 23cqi, 200px); }
${S} .t16 .bq-choice.is-picked { border-color: var(--navy); box-shadow: 0 0 0 4px var(--navy), 0 12px 24px var(--shade); }
${S} .t16 .bq-choices.is-locked .bq-choice:not(.is-picked) { opacity: .6; }
${S} .t16 .bq-choices.icons .bq-choice { width: clamp(120px, 26cqi, 220px); aspect-ratio: 4 / 3; }
${S} .t16 .bq-choices.icons .bq-choice img { object-fit: contain; padding: 12%; }
${S} .t16-glyph { font: 700 clamp(84px, 16cqi, 150px)/1.1 var(--ff-child); color: var(--coral); background: var(--paper); border: 2px solid var(--paper-edge); border-radius: 22px; padding: 0 .35em .12em; flex: none; }
${S} .t16-pic { position: relative; width: clamp(180px, 38cqi, 320px); aspect-ratio: 1; }
${S} .t16-pic img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
${S} .t16-pic { max-width: max(140px, calc(var(--play-h, 700px) - 410px)); } /* v0-12: شريط ملاحظة المعلّم و«التّالي» داخل الإطار */
${S} .t16-pad { max-width: max(220px, calc(var(--play-h, 700px) - 250px)); }
${S} .t16-foot { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; }
${S} .t16-next.soft { background: var(--white); color: var(--navy); box-shadow: 0 0 0 1.5px var(--sky-line) inset; }
${S} .t16-tick { width: 64px; aspect-ratio: 1; border-radius: 50%; border: 3px dashed var(--sky-2); display: grid; place-items: center; color: var(--white); background: var(--white); transition: background .3s, border-color .3s; }
${S} .t16-tick .bq-ic { width: 60%; height: 60%; opacity: 0; transition: opacity .3s; }
${S} .t16-tick.on { border-style: solid; border-color: var(--ok); background: var(--ok); animation: bqPop .35s ease-out; }
${S} .t16-tick.on .bq-ic { opacity: 1; }
${S} .t16-rep .note { background: var(--paper); border: 1.5px solid var(--paper-edge); border-radius: var(--r-sm); padding: 8px 12px; color: var(--ink) !important; }
${S} .t16 .sx-hear { flex: none; }
${S} .t16-pad { position: relative; width: min(100%, 380px); aspect-ratio: 1; }
${S} .t16-pad .bq-trace { position: absolute; inset: 0; width: 100%; border: 2px solid var(--sky-line); border-radius: 18px; }
${S} .t16-pad .bq-trace-glyph { display: none; }
${S} .t16-pad .bq-trace-start { width: 8%; margin: -4% 0 0 -4%; animation: none; }
${S} .t16-pad svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
${S} .t16-pad .rule { stroke: var(--sky-2); stroke-width: .7; }
${S} .t16-pad .rule.top { stroke-dasharray: 2 2; }
${S} .t16-pad .dots { fill: none; stroke: var(--navy); stroke-width: 3; stroke-linecap: round; stroke-dasharray: .01 5; opacity: .7; }
/* تقرير المعلّم — جدول نظيف */
${S} .t16-rep { width: min(100%, 780px); background: var(--white); border-radius: 22px; box-shadow: 0 2px 0 var(--sky-line), 0 18px 40px var(--shade); overflow: hidden; font: 400 15px/1.6 var(--ff-ui); color: var(--ink); }
${S} .t16-rep-h { display: flex; align-items: center; gap: 12px; background: var(--navy); color: var(--white); padding: 14px 20px; }
${S} .t16-rep-h .bq-ic { width: 36px; height: 36px; padding: 8px; border-radius: 50%; background: color-mix(in srgb, var(--white) 14%, transparent); color: var(--sun-soft); flex: none; }
${S} .t16-rep-h b { display: block; font: 800 20px/1.25 var(--ff-display); }
${S} .t16-rep-h span { font-size: 12.5px; color: var(--sky-2); }
${S} .t16-rep table { width: 100%; border-collapse: collapse; }
${S} .t16-rep th { font: 600 12.5px/1.3 var(--ff-ui); color: var(--muted); text-align: start; padding: 12px 16px 8px; border-bottom: 1.5px solid var(--sky-line); }
${S} .t16-rep td { padding: 12px 16px; border-bottom: 1px solid var(--sky-line); vertical-align: middle; }
${S} .t16-rep tr:last-child td { border-bottom: 0; }
${S} .t16-rep .sk { font: 700 16px/1.3 var(--ff-display); color: var(--navy); white-space: nowrap; }
${S} .t16-rep .chip { display: inline-flex; align-items: center; gap: 6px; border-radius: 999px; padding: 4px 12px; font: 600 13.5px/1.2 var(--ff-ui); white-space: nowrap; background: var(--sky-wash); color: var(--navy); }
${S} .t16-rep .chip::before { content: ""; width: 10px; height: 10px; border-radius: 50%; border: 2px solid currentColor; }
${S} .t16-rep .chip.first { background: color-mix(in srgb, var(--ok) 12%, var(--white)); color: var(--ok); }
${S} .t16-rep .chip.first::before { background: currentColor; }
${S} .t16-rep .chip.again { background: color-mix(in srgb, var(--sun-soft) 40%, var(--white)); color: var(--navy); }
${S} .t16-rep .chip.again::before { background: linear-gradient(90deg, currentColor 50%, transparent 50%); }
${S} .t16-rep .chip.none { background: var(--sky-wash); color: var(--muted); }
${S} .t16-rep .det { color: var(--muted); font-size: 13.5px; }
${S} .t16-rep .go { min-height: 44px; border-radius: 999px; border: 1.5px solid var(--sky-line); background: var(--white); color: var(--navy); font: 700 13px var(--ff-display); cursor: pointer; padding: 4px 12px; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px; }
${S} .t16-rep .go .bq-ic { width: 16px; height: 16px; }
${S} .t16-rep .go:hover { border-color: var(--sky); }
${S} .t16-rep-f { background: var(--sky-wash); padding: 12px 20px 14px; display: grid; gap: 10px; }
${S} .t16-rep-f p { margin: 0; font-size: 13px; color: var(--muted); }
${S} .t16-rep-f .acts { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
${S} .t16-rev { position: absolute; inset: 0; z-index: 8; background: color-mix(in srgb, var(--sky-wash) 90%, transparent); display: grid; place-items: center; padding: 16px; }
${S} .t16-rev .card { background: var(--white); border-radius: 22px; box-shadow: 0 18px 40px var(--shade); padding: 20px; display: grid; gap: 14px; justify-items: center; max-width: 100%; }
${S} .t16-rev .items { display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; }
${S} .t16-rev .it { display: grid; justify-items: center; gap: 10px; }
${S} .t16-rev .it .bq-choice { width: clamp(90px, 18cqi, 150px); cursor: default; }
${S} .t16-rev .it .bq-listen { width: 56px; border-width: 3px; }
@container stage (max-width: 560px) {
  ${S} .t16-main { flex-direction: column; }
  ${S} .t16 .bq-choices { gap: 8px; }
  ${S} .t16 .bq-choice { width: calc((100cqi - 56px) / 3); }
  ${S} .t16 .bq-choices.icons .bq-choice { width: calc((100cqi - 52px) / 2); }
  ${S} .t16-dots { gap: 7px; padding: 6px 10px; }
  ${S} .t16-rep thead { display: none; }
  ${S} .t16-rep tr { display: grid; grid-template-columns: 1fr auto; gap: 6px 10px; padding: 12px 14px; border-bottom: 1px solid var(--sky-line); }
  ${S} .t16-rep td { padding: 0; border: 0; }
  ${S} .t16-rep td.det { grid-column: 1 / -1; }
  ${S} .t16-rep td.lk { grid-column: 1 / -1; }
  ${S} .t16-rep td.lk:empty { display: none; }
  ${S} .t16-rep-f .acts { justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  ${S} .t16-in, ${S} .t16-dot.pop, ${S} .t16-tick.on { animation: none !important; }
  ${S} .t16-dot { transition: none; }
}`;
    document.head.append(st);
  }

  const CHECK = 'bariq_L1-01_sfx-check-done';
  // مقياس الملاحظة الموحّد (قرار ٥)
  const OBS = { ind: 'قالَها وحدَه', help: 'قالَها بمساعدة', none: 'لم يَقُلْها بعدُ' };
  const OBS_REP = { ind: 'قالها وحده', help: 'قالها بمساعدة', none: 'لم يقلها بعد', unobs: 'لم تُلاحَظ' };
  const ST = { first: 'من أوّل مرّة', again: 'بعد إعادة', none: 'لم يُجِب' };

  // البنود الخمسة (استماع · رسم · نطق · تمييز · خطّ) — للمعلّم سطر واحد لكلّ بند
  const ITEMS = [
    { key: 'C1', skill: 'الاستماع', link: ['EL02', 'شاهد وتعلّم'], correct: 'img-001', opts: ['img-007', 'img-008', 'img-001'],
      adult: 'لا تلميح ولا إراءة فم. إعادة الصوت مسموحة ولا تُعدّ مساعدة.' },
    { key: 'C2', skill: 'تعرّف الرسم', link: ['EL03', 'لاحظ وتعلّم'], correct: 'img-001', opts: ['img-008', 'img-001', 'img-007'],
      adult: 'أشِر إلى الحرف ولا تقل صوته.' },
    { key: 'C3', skill: 'النطق', link: ['EL10', 'تحدّث'],
      adult: 'لا تقل الكلمة. المس في شريط «ملاحظة المعلّم»: قالها وحده · قالها بمساعدة · لم يقلها بعد.' },
    { key: 'C4', skill: 'التمييز', link: ['EL09', 'استمع وتعلّم'], correct: 'img-010', opts: ['img-009', 'img-010'],
      adult: 'إن قال «سَمِعْتُ فَرْقاً!» وحده فالمس ذلك في الشريط.' },
    { key: 'C5', skill: 'الخطّ', link: ['EL12', 'اكتب'],
      adult: 'لاحظ نقطة البدء والاتّجاه فقط.' },
  ];
  const STIM = {
    C1: ['L1-01_d2_s5_01'],
    C2: ['bariq_L1-01_d1-scr05_01_ar'],
    C4: ['bariq_L1-01_sfx-water-pour-1s', 400, 'bariq_L1-01_sfx-compass-b', 400, 'bariq_L1-01_ins-same_ar'],
  };
  // «أَعِدِ» قبل همزة الوصل («استمع…»، «اكتب») و«أَعِدْ» قبل غيرها
  const redo = (name) => (/^ا/.test(name) ? 'أَعِدِ «' : 'أَعِدْ «') + name + '»';

  /** زمن آخر إتمام لـ«تدرّب» — يكتبه المحرّك (بوّابة اليوم التالي في core)؛ هنا قراءة فقط */
  function doneAt(id) {
    try {
      if (typeof BQ.doneAt === 'function') { const v = BQ.doneAt(id); if (v) return +v; }
      if (BQ.state && BQ.state.doneAt && BQ.state.doneAt[id]) return +BQ.state.doneAt[id];
      if (BQ.store) {
        const m = BQ.store.get('doneAt', null) || BQ.store.get('ts', null);
        if (m && typeof m === 'object' && m[id]) return +m[id];
        const v = BQ.store.get('ts-' + id, null); if (v) return +v;
      }
    } catch (e) { /* تخزين غير متاح */ }
    return null;
  }

  BQ.register(ID, {
    cover: 'مراجعة قصيرة في يوم لاحق: يسمع الطفل ويلمس ويقول ويتتبّع، والتقرير لك.',
    render(stage, ctx) {
      const age = ctx.age();
      const K = sxKit(ctx);
      const say = K.say, bariq = K.bariq;
      const items = age === '4-6' ? ITEMS.slice(0, 4) : ITEMS; // ٤–٦: أربعة بنود (الخطّ في دفتر الخطّ مع المعلّم)
      let gen = 0, advance = null;
      const timers = new Set();
      const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (K.alive()) fn(); }, ms); timers.add(t); return t; };
      const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
      const blank = () => ({ answered: false, first_attempt: null, replays: 0, pick: null, obs: null, phrase: false, trace_completed: false, start_ok: null, assisted: false, order: null });
      const res = items.map((it) => Object.assign({ key: it.key }, blank()));
      ctx.onCleanup(() => { gen++; clearTimers(); });
      const reset = () => { gen++; clearTimers(); BQ.audio.stop(); stage.replaceChildren(); advance = null; return gen; };
      const tag = (it) => 'ت' + sxAR(it.key.slice(1));
      const ageLine = age === '4-6' ? 'أربعة بنود؛ بند الخطّ يُتتبَّع في دفتر الخطّ معك.' : age === '10-12' ? 'خمسة بنود، والتقرير يُعرض له ولك.' : 'خمسة بنود.';

      function panel(k, extra) {
        const it = items[k];
        K.adult((it ? '<p><b>' + tag(it) + ' · ' + it.skill + ':</b> ' + it.adult + '</p>' : '') + (extra || '') +
          '<p>بعد كلّ جواب تتلوّن دائرة ✓ أيّاً كان الجواب؛ لا صواب ولا خطأ أمام الطفل.</p>',
          '<p>مراجعة مؤجَّلة ليوم لاحق: بند واحد لكلّ مهارة، ومحاولة واحدة لكلّ بند، بلا تلميح. غير مرصودة ولا تغيّر فتح الدرس التالي.</p>' +
          '<p><b>عمر ' + sxAR(age.replace('-', '–')) + ' سنوات:</b> ' + ageLine + '</p>' + logText());
      }
      function logText() {
        const rows = res.map((r, k) => {
          const it = items[k]; const bits = [];
          if (it.key === 'C3') bits.push(r.obs ? OBS_REP[r.obs] : 'لم يُلاحَظ بعد');
          else if (it.key === 'C5') bits.push(r.trace_completed ? 'أتمّ التتبّع' + (r.start_ok === false ? ' من غير نقطة البدء' : ' من نقطة البدء') : 'لم يُتمّ التتبّع');
          else bits.push(!r.answered ? 'بلا جواب' : r.first_attempt ? 'اختار الصواب' : 'اختار صورة أخرى');
          if (it.key === 'C4' && r.phrase) bits.push('قال العبارة وحده');
          if (r.replays) bits.push('إعادات: ' + sxAR(r.replays));
          return '<li>' + tag(it) + ' ' + it.skill + ': ' + bits.join(' · ') + '</li>';
        }).join('');
        return '<p><b>ما سُجِّل حتى الآن:</b></p><ul>' + rows + '</ul>';
      }
      // جواب: نغمة محايدة واحدة + تلوين دائرة ✓ — بلا أيّ فرق بين الصواب وغيره
      async function answered(k, tick) {
        res[k].answered = true;
        if (tick) tick.classList.add('on');
        await say(CHECK);
      }
      const mkTick = () => h('span.t16-tick', { 'aria-hidden': 'true' }, BQ.icon('check'));
      function nextOf(k) { return k + 1 < items.length ? () => item(k + 1) : report; }
      const softNext = () => h('button.bq-btn.t16-next.soft', { type: 'button', onclick: () => advance && advance() }, 'التّالي', BQ.icon('next'));

      /* ---------- ت١ · ت٢ · ت٤: لمس صورة/أيقونة ---------- */
      function tapItem(k) {
        const g = reset(); const live = () => g === gen && K.alive();
        const it = items[k], r = res[k];
        const wrap = h('div.t16');
        const main = h('div.t16-main');
        const tick = mkTick();
        const nextB = softNext();
        const foot = h('div.t16-foot', null, h('div.sx-actions', null, tick, nextB));
        wrap.append(sxSteps(items.length, k), main, foot); stage.append(wrap);
        const order = BQ.shuffle(it.opts); r.order = order.slice();
        const isIcons = it.key === 'C4';
        const stimulus = STIM[it.key];
        let playing = false;
        // «اسمع الصوت» (المثير) — زرّ أزرق بأذن، مختلف عن سمّاعة التعليمة الصفراء
        const listen = h('button.bq-hear.sx-hear', { type: 'button', 'aria-label': 'اسْمَعِ الصَّوْتَ', onclick: () => replay() }, BQ.icon('ear'));
        async function run(list) {
          playing = true; listen.classList.add('is-playing');
          for (const x of list) { if (!live()) return; if (typeof x === 'number') await BQ.sleep(x); else if (!(await say(x))) break; }
          playing = false; listen.classList.remove('is-playing');
        }
        function replay() { if (r.answered) return; r.replays++; run(stimulus); }
        ctx.onReplay(replay);
        if (it.key === 'C2') main.append(h('span.t16-glyph.t16-in', { role: 'img', 'aria-label': 'حَرْفٌ' }, 'م'));
        else if (!isIcons) main.append(listen);
        // v0-12 r3: ت٤ (التمييز) بزرّي بارق بدل الرموز الهندسية — يصفّق «صَوْتٌ واحِدٌ» (img-009) · يقفز «سَمِعْتُ فَرْقاً!» (img-010)؛ الزرّ يقول عبارته ولا حكم
        const GID = { same: 'img-009', diff: 'img-010' };
        let J = null;
        const ch = isIcons
          ? (J = BQ.elJudge(main, { onPick: (id, b) => onPickC(id, b) }), { btns: J.btns, lock: J.lock, el: J.el })
          : BQ.ui.choices(main, {
          aria: 'صُوَرٌ لِلاخْتِيارِ',
          items: order.map((id) => ({ id, img: id, aria: 'صُورَةٌ' })),
          onPick: (item, btn) => onPickC(item.id, btn) });
        async function onPickC(pid, btn) {
            const item = { id: isIcons ? GID[pid] : pid };
            if (r.answered) return;
            ch.lock(); BQ.audio.stop(); clearTimers(); listen.classList.remove('is-playing');
            btn.classList.add('is-picked');
            r.pick = item.id; r.first_attempt = item.id === it.correct;
            if (J) await J.act(pid, { play: (x) => say(x) }); if (!live()) return; // بارق الملموس يقول عبارته (عبارة الطفل نفسه، لا حكم)
            await answered(k, tick); if (!live()) return;
            panel(k, '<p>إن لم يجب فالمس «التّالي»؛ يُسجَّل البند «لم يُجِب».</p>');
            if (it.key === 'C4') {
              // ملاحظة اختيارية للمعلّم: قال العبارة وحده؟
              const b = h('button', { type: 'button', 'aria-pressed': 'false' }, 'قالَ «سَمِعْتُ فَرْقاً!» وحدَه');
              b.addEventListener('click', () => { r.phrase = !r.phrase; b.setAttribute('aria-pressed', String(r.phrase)); });
              const strip = h('div.sx-adult.t16-in', { role: 'group', 'aria-label': 'مُلاحَظَةُ المُعَلِّمِ' }, h('span.sx-adult-tag', null, BQ.icon('adult'), h('span', null, h('b', null, 'ملاحظة المعلّم'), 'اختياريّ')), h('div.sx-adult-btns', null, b));
              nextB.classList.remove('soft');
              foot.prepend(strip);
              return;
            }
            later(() => nextOf(k)(), 900);
        }
        ch.btns.forEach((b, j) => { b.classList.add('t16-in'); b.style.animationDelay = (0.08 * j) + 's'; });
        if (it.key === 'C2') ch.btns.forEach((b) => b.querySelector('img').setAttribute('alt', ''));
        if (isIcons) main.insertBefore(listen, ch.el);
        ctx.instruction(it.key === 'C1' ? 'أَيْنَ هَذا الصَّوْتُ؟' : it.key === 'C2' ? 'هَذا الحَرْفُ مَعَ مَنْ؟' : 'هَلْ هُما صَوْتٌ واحِدٌ؟');
        panel(k, '<p>إن لم يجب فالمس «التّالي»؛ يُسجَّل البند «لم يُجِب».</p>');
        advance = () => nextOf(k)(); // الانتقال بلا جواب ← «لم يُجِب»
        later(async () => {
          if (it.key === 'C1') { await say('bariq_L1-01_ins-listen_ar'); if (!live()) return; await say('bariq_L1-01_ins-where_ar'); if (!live()) return; await BQ.sleep(300); }
          if (!live()) return;
          await run(stimulus);
          // ٤–٦: المثير يُعاد آلياً بعد ست ثوانٍ مرّةً (لا يُعدّ إعادة من الطفل)
          if (age === '4-6') later(() => { if (live() && !r.answered && !playing) run(stimulus); }, 6000);
        }, 350);
      }

      /* ---------- ت٣ · نطق: ملاحظة المعلّم ---------- */
      function sayItem(k) {
        const g = reset(); const live = () => g === gen && K.alive();
        const r = res[k];
        const wrap = h('div.t16');
        const pic = h('div.sx-photo.t16-pic.t16-in', { role: 'img', 'aria-label': 'صُورَةٌ' }, h('img', { src: BQ.img('img-001'), alt: '' }));
        const tick = mkTick();
        const main = h('div.t16-main', null, pic);
        const obs = h('div.sx-adult', { role: 'group', 'aria-label': 'مُلاحَظَةُ المُعَلِّمِ' }, h('span.sx-adult-tag', null, BQ.icon('adult'), h('span', null, h('b', null, 'ملاحظة المعلّم'), 'لا تقل الكلمة')));
        const btns = Object.keys(OBS).map((lv) => {
          const b = h('button', { type: 'button', 'aria-pressed': 'false', dataset: { lv } }, OBS[lv]);
          b.addEventListener('click', async () => {
            const firstTime = !r.obs;
            r.obs = lv; btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
            panel(k, '<p>إن انتقلت بلا لمسة تُسجَّل «لم تُلاحَظ».</p>');
            if (firstTime) { await answered(k, tick); if (!live()) return; nextB.classList.remove('soft'); }
          });
          return b;
        });
        obs.append(h('div.sx-adult-btns', null, ...btns));
        const nextB = softNext();
        const foot = h('div.t16-foot', null, obs, h('div.sx-actions', null, tick, nextB));
        wrap.append(sxSteps(items.length, k), main, foot); stage.append(wrap);
        ctx.instruction('هَيّا: ما هَذا؟');
        panel(k, '<p>إن انتقلت بلا لمسة تُسجَّل «لم تُلاحَظ».</p>');
        const prompt = () => bariq(stage, 'L1-01_d1_s2_03');
        ctx.onReplay(() => { r.replays++; prompt(); });
        advance = () => { if (!r.obs) r.obs = 'unobs'; nextOf(k)(); };
        later(() => { if (live()) prompt(); }, 350);
      }

      /* ---------- ت٥ · خطّ: تتبّع «م» مرّة بنقطة البدء وحدها ---------- */
      function traceItem(k) {
        const g = reset(); const live = () => g === gen && K.alive();
        const r = res[k];
        const v = BQ.store.get('write-variant', 'A') === 'B' ? 'B' : 'A';
        const V = VAR[v];
        const wrap = h('div.t16');
        const pad = h('div.t16-pad.t16-in');
        const box = BQ.ui.trace(pad, { glyph: '', path: V.cps.map((c) => [c[0] / 100, c[1] / 100]), onDone(info) { if (info && info.assisted && !done) { r.assisted = true; complete(); } } });
        const svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('aria-hidden', 'true');
        svg.innerHTML = '<line class="rule top" x1="4" y1="31" x2="96" y2="31"/><line class="rule" x1="4" y1="57" x2="96" y2="57"/>' + V.strokes.map((d) => `<path class="dots" d="${d}"/>`).join('');
        box.insertBefore(svg, box.querySelector('canvas'));
        const main = h('div.t16-main', null, pad);
        const tick = mkTick();
        const nextB = softNext();
        const foot = h('div.t16-foot', null, h('div.sx-actions', null, tick, nextB));
        wrap.append(sxSteps(items.length, k), main, foot); stage.append(wrap);
        ctx.instruction('');
        panel(k, '<p>نقطة البدء وحدها بلا أسهم؛ إتمام لا إتقان.</p>');
        ctx.onReplay(() => { r.replays++; box.clear(); next = 0; });
        advance = () => nextOf(k)();
        // تحقّق بالترتيب بتسامح واسع (بلا تلميح — مراجعة مؤجَّلة)
        const cv = box.querySelector('canvas');
        const cps = V.cps.map((c) => [c[0] / 100, c[1] / 100]);
        let TOL = 0.1; // يتّسع للإصبع/القلم ×١٫٢ — v0-12
        let next = 0, drawing = false, done = false;
        const pos = (e) => { const rc = cv.getBoundingClientRect(); return [(e.clientX - rc.left) / rc.width, (e.clientY - rc.top) / rc.height]; };
        const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
        cv.addEventListener('pointerdown', (e) => {
          if (done) return; drawing = true; TOL = e.pointerType === 'mouse' ? 0.1 : 0.12;
          const p = pos(e);
          if (next === 0 && r.start_ok == null) r.start_ok = dist(p, cps[0]) < TOL * 1.35;
        });
        cv.addEventListener('pointermove', (e) => {
          if (!drawing || done) return;
          const p = pos(e);
          while (next < cps.length && dist(p, cps[next]) < TOL) next++;
          if (next >= cps.length) complete();
        });
        const up = () => { drawing = false; };
        cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
        if (BQ.elGuard) BQ.elGuard(box); // v0-12: إصبع واحد · لا تمرير/تكبير
        async function complete() {
          if (done) return; done = true; drawing = false;
          pad.classList.add('done');
          r.trace_completed = true; r.first_attempt = r.start_ok !== false;
          await answered(k, tick); if (!live()) return;
          await say('bariq_L1-01_ins-say_ar'); if (!live()) return;
          await say('bariq_L1-01_key_ar'); if (!live()) return;
          await bariq(stage, 'L1-01_d1_s1_01'); if (!live()) return;
          nextB.classList.remove('soft');
          later(() => nextOf(k)(), 700);
        }
      }

      function item(k) {
        const key = items[k].key;
        if (key === 'C3') return sayItem(k);
        if (key === 'C5') return traceItem(k);
        return tapItem(k);
      }

      /* ---------- ت٦ · تقرير المعلّم: سطر لكلّ مهارة — بلا نسبة ولا عدد ---------- */
      function status(k) {
        const it = items[k], r = res[k];
        if (it.key === 'C3') {
          if (r.obs === 'ind') return [r.replays ? 'again' : 'first', OBS_REP.ind, r.replays ? 'بعد إعادة السؤال' : 'من أوّل مرّة'];
          if (r.obs === 'help') return ['again', OBS_REP.help, 'قالها معك أو بعد أن أريته فمك'];
          if (r.obs === 'none') return ['none', OBS_REP.none, 'أعد النموذج معه في «تحدّث»'];
          return ['none', OBS_REP.unobs, 'لم يلمس المعلّم شريط الملاحظة'];
        }
        if (it.key === 'C5') {
          if (!r.trace_completed) return ['none', 'لم يُتمّ', 'لم يُتمّ التتبّع'];
          if (r.assisted) return ['again', 'بمساعدة', 'أتمّه المعلّم بالضغطة المطوّلة'];
          return [r.replays ? 'again' : 'first', r.replays ? ST.again : ST.first, 'أتمّ التتبّع' + (r.start_ok === false ? '، ولم يبدأ من النقطة الخضراء' : ' من نقطة البدء')];
        }
        if (!r.answered) return ['none', ST.none, 'انتقل بلا جواب'];
        const det = (r.first_attempt ? 'اختار الصواب' : 'اختار صورة أخرى') + (r.replays ? ' · أُعيد الصوت ' + (r.replays === 1 ? 'مرّة' : 'أكثر من مرّة') : '') + (it.key === 'C4' && r.phrase ? ' · قال العبارة وحده' : '');
        if (!r.first_attempt) return ['none', 'اختار غيرها', det];
        return [r.replays ? 'again' : 'first', r.replays ? ST.again : ST.first, det];
      }
      function report() {
        reset();
        const wrap = h('div.t16');
        const own = age === '10-12';
        const tbody = h('tbody');
        items.forEach((it, k) => {
          const [st, chip, det] = status(k);
          tbody.append(h('tr', null,
            h('td.sk', null, it.skill),
            h('td', null, h('span.chip.' + st, null, chip)),
            h('td.det', null, det),
            h('td.lk', null, st !== 'first' ? h('button.go', { type: 'button', onclick: () => BQ.open(it.link[0]) }, BQ.icon('replay'), redo(it.link[1])) : null)));
        });
        // بوّابة اليوم التالي من المحرّك (BQ.gate.el16)؛ قراءة مباشرة للزمن إن لم تتوفّر
        const gate = BQ.gate && typeof BQ.gate.el16 === 'function' ? BQ.gate.el16() : null;
        const ts = doneAt('EL13');
        const hrs = gate && gate.hours != null ? Math.max(0, Math.round(gate.hours)) : ts ? Math.max(0, Math.round((Date.now() - ts) / 36e5)) : null;
        const early = gate ? !!gate.early : hrs == null || hrs < 12;
        const weak = items.some((it, k) => (it.key === 'C1' || it.key === 'C2') && status(k)[0] === 'none');
        const rep = h('div.t16-rep.t16-in', { role: 'region', 'aria-label': 'تَقْريرُ المُعَلِّمِ' },
          h('div.t16-rep-h', null, BQ.icon('adult'), h('div', null, h('b', null, own ? 'تَقْريري — وَلِلْمُعَلِّمِ' : 'تقرير المعلّم — بالمهارة'), h('span', null, 'مراجعة في يوم لاحق · بلا نسبة ولا عدد'))),
          h('table', null, h('thead', null, h('tr', null, h('th', null, 'المهارة'), h('th', null, 'النتيجة'), h('th', null, 'ما لوحظ'), h('th', null, ''))), tbody),
          h('div.t16-rep-f', null,
            early ? h('p.note', null, hrs == null ? 'لا سجلّ لإتمام «تدرّب» في هذا المتصفّح؛ هذه معاينة لا تقيس ما بقي بعد يوم.' : 'لم يمرّ يوم على إتمام «تدرّب» بعد؛ هذه معاينة لا تقيس ما بقي بعد يوم.') : null,
            weak ? h('p', null, 'إن لم يُجِب في الاستماع أو الرسم فأعيدا «شاهد وتعلّم» و«لاحظ وتعلّم» قبل الدرس التالي.') : null,
            h('p', null, (hrs == null ? '' : 'مرّ على آخر إتمام لـ«تدرّب»: ' + sxAR(hrs) + ' (بالساعات).') + (age === '4-6' ? ' بند الخطّ في دفتر الخطّ معك.' : '')),
            h('div.acts', null,
              h('button.bq-btn.ghost', { type: 'button', onclick: review }, BQ.icon('ear'), 'راجِعِ الأَجْوِبَةَ'),
              h('button.bq-btn', { type: 'button', onclick: finish }, 'أَنْهَيْتُ', BQ.icon('check')))));
        wrap.append(h('div.t16-main', null, rep)); stage.append(wrap);
        rep.querySelectorAll('.t16-rep-f p').forEach((p) => { if (!p.textContent.trim()) p.remove(); });
        ctx.instruction('');
        panel(-1, '<p>التقرير بالمهارة: من أوّل مرّة · بعد إعادة · لم يُجِب.</p><p>إن لم يُجِب في الاستماع أو الرسم فأعيدا «شاهد وتعلّم» و«لاحظ وتعلّم» قبل الدرس التالي.</p>');
        ctx.onReplay(() => {});
        advance = finish;
      }
      // «راجِعِ الأَجْوِبَةَ» اختيارية: الصواب يُعرض بعد البنود — غير محتسبة
      function review() {
        const box = h('div.t16-rev', { role: 'dialog', 'aria-label': 'مُراجَعَةٌ' });
        const its = h('div.items');
        items.filter((it) => it.correct).forEach((it) => {
          const stim = it.key === 'C4' ? ['bariq_L1-01_sfx-water-pour-1s', 'bariq_L1-01_sfx-compass-b'] : STIM[it.key];
          const tile = h('div.bq-choice.is-ok', { style: it.key === 'C4' ? { aspectRatio: '4 / 3', background: 'var(--paper)' } : null },
            it.key === 'C2' ? h('span.bq-glyph', { style: { position: 'absolute', insetInlineStart: '6%', top: '2%', fontSize: 'clamp(26px, 5cqi, 40px)', color: 'var(--coral)' } }, 'م') : null,
            it.key === 'C4' ? h('span.bq-brq', { style: { width: '78%', margin: 'auto' } }, h('img', { src: BQ.char.still('cheer'), alt: '' })) // بارق يقفز = «سَمِعْتُ فَرْقاً!» (لا رمز هندسيّ)
              : h('img', { src: BQ.img(it.correct), alt: '' }),
            h('span.bq-tick', { 'aria-hidden': 'true', html: BQ.icons.check }));
          its.append(h('div.it', null, tile, h('button.bq-hear.sx-hear', { type: 'button', 'aria-label': 'اسْمَعْ', onclick: async () => { for (const x of stim) { if (typeof x === 'string' && !(await say(x))) break; } } }, BQ.icon('ear'))));
        });
        const close = h('button.bq-btn', { type: 'button', 'aria-label': 'إغلاق', onclick: () => { BQ.audio.stop(); box.remove(); } }, BQ.icon('close'), 'إغلاق');
        box.append(h('div.card', null, its, close));
        stage.append(box);
        close.focus({ preventScroll: true });
      }
      function finish() {
        gen++; clearTimers(); BQ.audio.stop(); advance = null;
        stage.querySelectorAll('.bq-end, .t16-rev').forEach((n) => n.remove());
        ctx.done();
        BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', onReplay: () => { res.forEach((r) => Object.assign(r, blank())); item(0); } });
      }
      item(0);
    },
  });
})();
