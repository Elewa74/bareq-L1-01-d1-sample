/* EL12 «اكتب» — gme-101 · TraceCanvas (غير مرصود: trace_completed = إتمام لا إتقان)
   ش١ نموذج «م» المنفصلة ثابتاً (نقطة بدء + أسهم مرقّمة) — لا حركة قلم قبل حسم الصيغة.
   ش٢ تتبّع بالإصبع من نقطة البدء: موجَّه بالنقاط ← نموذج باهت ← حرّ على المسطرة (١٠–١٢: موجَّه ← حرّ).
   ش٣ ورقة التتبّع (للمعلّم) — نظيرها في كتاب الطالب المطبوع.
   الصيغة معلّقة للمالك: (أ) النسخ المدرسي · (ب) خطّ اليد المبسّط — مفتاح صغير للمعلّم يبدّل بينهما (محلّياً؛ يستعمله EL16).
   سطح الرسم من BQ.ui.trace؛ التحقّق بالترتيب ونقطة البدء والتلميحات محلّية. تصميم v2: صفحتا دفتر تمارين. */
(function () {
  'use strict';
  const h = BQ.h;
  const ID = 'EL12';
  const S = '.elp[data-el="EL12"]';
  const NS = 'http://www.w3.org/2000/svg';
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

  // هندسة الصيغتين (مربّع ٠–١٠٠؛ خطّ السطر y=57 · الخطّ العلويّ y=31) — وصف مقترح من «02_الكتابة — صيغتان موسومتان»
  const VAR = {
    A: {
      tag: 'أ', name: 'النسخ المدرسي', code: 'VAR-A', asset: 'L1-01-AS-img-113', sheet: 'L1-01-AS-img-115',
      strokes: ['M45.81 53.19 A13 13 0 1 1 68 44 A13 13 0 0 1 45.81 53.19 Q40.5 60 40.5 72 L40.5 82 Q40.5 88 35 89.5'],
      cps: [[45.8, 53.2], [55, 31], [68, 44], [55, 57], [40.5, 72], [36, 89]],
      strokeStart: [0],
      arrows: [{ n: '١', d: 'M37 52 Q34 40 42 32', at: [33, 44] }, { n: '٢', d: 'M33 64 L33 80', at: [27, 72] }],
      note: 'حركة واحدة متّصلة: من نقطة الالتقاء أسفل يسار الرأس صعوداً، دورةً في اتّجاه عقارب الساعة حتى نقطة البدء، ثم الذيل نازلاً بلا رفع القلم.',
    },
    B: {
      tag: 'ب', name: 'خطّ اليد المبسّط', code: 'VAR-B', asset: 'L1-01-AS-img-114', sheet: 'L1-01-AS-img-116',
      strokes: ['M55 31 A13 13 0 1 0 55 57 A13 13 0 1 0 55 31', 'M42.3 49 L42.3 88'],
      cps: [[55, 31], [42, 44], [55, 57], [68, 44], [42.3, 50], [42.3, 87]],
      strokeStart: [0, 4],
      arrows: [{ n: '١', d: 'M60 25 Q52 23 45 28', at: [66, 24] }, { n: '٢', d: 'M35 58 L35 76', at: [29, 67] }],
      note: 'حركتان: دائرة عكسَ اتّجاه عقارب الساعة من القمّة حتى نقطة البدء، ثم تُرفَع اليد، وخطّ مستقيم نازل من حافّة الدائرة اليسرى.',
    },
  };
  const getVar = () => (BQ.store.get('write-variant', 'A') === 'B' ? 'B' : 'A');

  if (!document.getElementById('st-EL12v2')) {
    const st = document.createElement('style');
    st.id = 'st-EL12v2';
    st.textContent = `
${S} .t12-top { align-self: stretch; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }
/* دفتر مفتوح: صفحتان وخطّ تجليد */
${S} .t12-book { position: relative; width: min(100%, 820px); display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); background: var(--white); border-radius: 22px; box-shadow: 0 2px 0 var(--sky-line), 0 18px 40px var(--shade); padding: clamp(14px, 3cqi, 28px); gap: clamp(18px, 5cqi, 48px); }
${S} .t12-book::before { content: ""; position: absolute; top: 14px; bottom: 14px; left: calc(60% - 1px); width: 2px; background: linear-gradient(var(--sky-line), var(--sky-line)) center / 2px 100% no-repeat; box-shadow: 0 0 18px 6px color-mix(in srgb, var(--sky-line) 55%, transparent); pointer-events: none; }
${S} .t12-book::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; background: repeating-linear-gradient(transparent 0 33px, color-mix(in srgb, var(--sky-line) 55%, transparent) 33px 34px); opacity: .5; }
${S} .t12-page { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; min-width: 0; }
${S} .t12-glyph { font: 700 clamp(96px, 20cqi, 190px)/1.1 var(--ff-child); color: var(--coral); padding: 0 .3em .1em; background: var(--paper); border: 2px solid var(--paper-edge); border-radius: 22px; }
${S} .t12-tools { display: flex; gap: 12px; }
${S} .t12-pad { position: relative; width: 100%; max-width: min(420px, max(220px, calc(var(--play-h, 700px) - 290px))); aspect-ratio: 1; } /* v0-12: لوح التتبّع بارتفاع الإطار فيبقى «التّالي» ظاهراً */
${S} .t12-pad .bq-trace { position: absolute; inset: 0; width: 100%; background: var(--white); border: 2px solid var(--sky-line); box-shadow: none; border-radius: 18px; }
${S} .t12-pad .bq-trace-glyph { display: none; }
${S} .t12-pad .bq-trace-start { width: 8%; margin: -4% 0 0 -4%; z-index: 2; }
${S} .t12-pad.no-start .bq-trace-start { display: none; }
${S} .t12-pad.start-hint .bq-trace-start { box-shadow: 0 0 0 5px var(--white), 0 0 0 11px var(--sun-soft), 0 0 24px var(--sun); }
${S} .t12-pad.armed .bq-trace-start { box-shadow: 0 0 0 5px var(--white), 0 0 0 10px var(--navy); animation: none; }
${S} .t12-pad.done .bq-trace { border-color: var(--ok); box-shadow: 0 0 0 3px var(--ok); }
${S} .t12-model { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
${S} .t12-model .rule { stroke: var(--sky-2); stroke-width: .7; }
${S} .t12-model .rule.top { stroke-dasharray: 2 2; opacity: .8; }
${S} .t12-model .dots { fill: none; stroke: var(--navy); stroke-width: 3.2; stroke-linecap: round; stroke-dasharray: .01 5; }
${S} .t12-model .ghost { fill: none; stroke: var(--sky-wash); stroke-width: 11; stroke-linecap: round; stroke-linejoin: round; }
${S} .t12-model .faded { fill: none; stroke: color-mix(in srgb, var(--sky-2) 35%, var(--white)); stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; }
${S} .t12-model .fill { fill: none; stroke: var(--sun-soft); stroke-width: 12; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transition: opacity .6s ease; }
${S} .t12-pad.done .t12-model .fill { opacity: 1; }
${S} .t12-model .arr path { fill: none; stroke: var(--coral); stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
${S} .t12-model .arr circle { fill: var(--coral); }
${S} .t12-model .arr text, ${S} .t12-model .s2 text { fill: var(--white); font: 700 5px var(--ff-display); text-anchor: middle; dominant-baseline: central; }
${S} .t12-model .s2 text { font-size: 3.6px; }
${S} .t12-model .s2 circle { fill: var(--ok); stroke: var(--white); stroke-width: 1.2; }
${S} .t12-model .arr.hi { animation: t12Hi .6s ease-in-out 2; transform-box: fill-box; transform-origin: center; }
@keyframes t12Hi { 50% { transform: scale(1.35); } }
${S} .t12-model .cp { fill: var(--white); stroke: var(--sky-2); stroke-width: .8; }
${S} .t12-model .cp.hit { fill: var(--sun-soft); stroke: var(--sun); }
${S} .t12-model .nextcp { fill: none; stroke: var(--sun); stroke-width: 1.4; opacity: 0; }
${S} .t12-model .nextcp.on { opacity: 1; animation: t12Ring 1s ease-in-out 3; }
@keyframes t12Ring { 50% { stroke-width: 3; } }
/* v0-12: إطار قصير (٧٢٠–٨٢٠): الحرف المرجعيّ وأدواته أصغر فيتّسع لوح التتبّع ويبقى «التّالي» ظاهراً */
@media (max-height: 840px) {
  ${S} .t12-glyph { font-size: clamp(72px, 11cqi, 120px); }
  ${S} .t12-page { gap: 10px; }
  ${S} .t12-tools .sx-hear { width: 72px; }
  ${S} .sx-wrap { gap: 12px; }
}
/* ورقة التتبّع — معاينة */
${S} .t12-sheetwrap { width: 100%; max-width: 330px; aspect-ratio: 210 / 297; background: var(--white); border-radius: 8px; box-shadow: 0 0 0 1.5px var(--sky-line), 0 10px 24px var(--shade); overflow: hidden; position: relative; }
${S} .t12-sheetwrap .t12-sheet { position: absolute; top: 0; left: 0; transform-origin: 0 0; }
${S} .t12-print { display: grid; gap: 10px; }
${S} .t12-print p { margin: 0; font: 400 15px/1.75 var(--ff-ui); color: var(--ink); }
${S} .t12-print p b { color: var(--navy); }
${S} .t12-print .book { display: flex; gap: 10px; align-items: center; background: var(--paper); border: 1.5px solid var(--paper-edge); border-radius: var(--r-sm); padding: 10px 12px; font-weight: 600; }
${S} .t12-print .book .bq-ic { width: 26px; height: 26px; color: var(--navy); flex: none; }
${S} button.t12-sheetwrap { padding: 0; border: 0; cursor: zoom-in; display: block; }
${S} button.t12-sheetwrap:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
${S} .t12-big { position: absolute; inset: 0; z-index: 9; background: color-mix(in srgb, var(--sky-wash) 94%, transparent); display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 14px; overflow: auto; }
${S} .t12-big .t12-sheetwrap { max-width: min(100%, 620px); flex: none; }
${S} .t12-big .t12-big-bar { display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; font: 500 14px/1.6 var(--ff-ui); color: var(--muted); text-align: center; }
@container stage (max-width: 620px) {
  ${S} .t12-book { grid-template-columns: 1fr; padding: 14px; }
  ${S} .t12-book::before { top: auto; bottom: auto; left: 14px; right: 14px; width: auto; height: 2px; }
  ${S} .t12-book.s1::before, ${S} .t12-book.s2::before, ${S} .t12-book.s3::before { display: none; }
  ${S} .t12-page.ref { flex-direction: row; justify-content: center; }
  ${S} .t12-glyph { font-size: 72px; }
  ${S} .t12-sheetwrap { max-width: 220px; }
}
/* v0-12: هاتف — مفتاح الصيغة للمعلّم في الدليل وحده (يبقى هناك)، والحرف المرجعيّ صغير، ولوح التتبّع بارتفاع الإطار */
@container stage (max-width: 560px) {
  ${S} .t12-top .sx-var { display: none; }
  ${S} .t12-top { justify-content: center; }
  ${S} .t12-glyph { font-size: 56px; border-radius: 16px; }
  ${S} .t12-tools .sx-hear { width: 60px; }
  ${S} .t12-pad { max-width: min(420px, max(200px, calc(var(--play-h, 600px) - 300px))); }
  @media (max-height: 760px) { ${S} .t12-pad { max-width: max(170px, calc(var(--play-h, 600px) - 335px)); } ${S} .t12-book { padding: 10px; } }
}
@media (prefers-reduced-motion: reduce) {
  ${S} .t12-model .arr.hi, ${S} .t12-model .nextcp.on { animation: none !important; }
  ${S} .t12-model .fill { transition: none; }
}`;
    document.head.append(st);
  }


  /** النموذج SVG — mode: 'guided' · 'faded' · 'free' · 'model' */
  function modelSVG(v, mode) {
    const V = VAR[v];
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('class', 't12-model'); svg.setAttribute('aria-hidden', 'true');
    let s = '<defs><marker id="t12ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--coral)"/></marker></defs>';
    s += '<line class="rule top" x1="4" y1="31" x2="96" y2="31"/><line class="rule" x1="4" y1="57" x2="96" y2="57"/>';
    if (mode === 'guided' || mode === 'model') s += V.strokes.map((p) => `<path class="ghost" d="${p}"/><path class="dots" d="${p}"/>`).join('');
    if (mode === 'faded') s += V.strokes.map((p) => `<path class="faded" d="${p}"/>`).join('');
    s += V.strokes.map((p) => `<path class="fill" d="${p}"/>`).join('');
    if (mode === 'guided') s += V.cps.map((c, i) => (i === 0 ? '' : `<circle class="cp" data-i="${i}" cx="${c[0]}" cy="${c[1]}" r="1.6"/>`)).join('');
    if (mode === 'guided' || mode === 'model') s += V.arrows.map((a, i) => `<g class="arr" data-i="${i}"><path d="${a.d}" marker-end="url(#t12ah)"/><circle cx="${a.at[0]}" cy="${a.at[1]}" r="3.6"/><text x="${a.at[0]}" y="${a.at[1] + .2}">${a.n}</text></g>`).join('');
    if (V.strokeStart.length > 1 && mode !== 'free') { const c = V.cps[V.strokeStart[1]]; s += `<g class="s2"><circle cx="${c[0]}" cy="${c[1]}" r="3"/><text x="${c[0]}" y="${c[1] + .2}">٢</text></g>`; }
    s += '<circle class="nextcp" cx="0" cy="0" r="5"/>';
    svg.innerHTML = s;
    return svg;
  }
  // ورقة التتبّع (A4) — معاينة فقط؛ الطباعة من كتاب الطالب المطبوع
  function sheetHTML(v) {
    const V = VAR[v];
    const cell = (mode) => { const svg = modelSVG(v, mode); svg.querySelectorAll('.nextcp,.cp').forEach((n) => n.remove()); svg.setAttribute('class', 'm'); return `<div class="c">${svg.outerHTML}</div>`; };
    return `<div class="t12-sheet" dir="rtl" lang="ar"><style>
.t12-sheet{width:794px;height:1123px;box-sizing:border-box;padding:56px 60px;background:var(--white);color:var(--ink);font-family:var(--ff-ui)}
.t12-sheet h2{margin:0 0 4px;font:800 30px/1.3 var(--ff-display);color:var(--navy)}
.t12-sheet .sub{margin:0 0 18px;font:400 14px/1.6 var(--ff-ui);color:var(--muted)}
.t12-sheet .row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.t12-sheet .c{aspect-ratio:1;border:1.5px solid var(--sky-line);border-radius:12px}
.t12-sheet .c svg{width:100%;height:100%;display:block}
.t12-sheet .rule{stroke:var(--sky-2);stroke-width:.7}.t12-sheet .rule.top{stroke-dasharray:2 2}
.t12-sheet .dots{fill:none;stroke:var(--navy);stroke-width:3;stroke-linecap:round;stroke-dasharray:.01 5}
.t12-sheet .ghost{fill:none;stroke:var(--sky-wash);stroke-width:10;stroke-linecap:round}
.t12-sheet .faded{fill:none;stroke:var(--sky-line);stroke-width:8;stroke-linecap:round}
.t12-sheet .fill{display:none}
.t12-sheet .arr path{fill:none;stroke:var(--coral);stroke-width:1.6;stroke-linecap:round}.t12-sheet .arr circle{fill:var(--coral)}
.t12-sheet .arr text,.t12-sheet .s2 text{fill:var(--white);font:700 5px var(--ff-display);text-anchor:middle;dominant-baseline:central}
.t12-sheet .s2 circle{fill:var(--ok)}
.t12-sheet .lab{font:700 15px var(--ff-display);color:var(--navy);margin:0 0 6px}
.t12-sheet .look{display:flex;gap:40px;justify-content:center;font:700 64px/1.4 var(--ff-child);color:var(--sky-line);border-top:1.5px dashed var(--sky-line);margin-top:8px;padding-top:6px}
.t12-sheet .foot{font:400 11px/1.5 var(--ff-ui);color:var(--muted);margin-top:10px}
</style>
<h2>ورقة تتبّع «م»</h2><p class="sub">ابدأ من النقطة الخضراء واتّبع الأسهم، وقل «مْـ» ممدودة وأنت تتبّع · الصيغة (${V.tag}) ${V.name}</p>
<p class="lab">١ · على النقاط</p><div class="row">${cell('guided').repeat(4)}</div>
<p class="lab">٢ · على النموذج الباهت</p><div class="row">${cell('faded').repeat(4)}</div>
<p class="lab">٣ · على المسطرة</p><div class="row">${cell('free').repeat(4)}</div>
<p class="lab">للنظر فقط:</p><div class="look"><span>مـ</span><span>ـمـ</span><span>ـم</span></div>
<p class="foot">بارِق · الدرس الأوّل · صوت الميم</p></div>`;
  }
  function addStartDots(root, v) {
    const c = VAR[v].cps[0];
    root.querySelectorAll('.row').forEach((row, ri) => {
      if (ri > 1) return;
      row.querySelectorAll('svg').forEach((svg) => { const d = document.createElementNS(NS, 'circle'); d.setAttribute('cx', c[0]); d.setAttribute('cy', c[1]); d.setAttribute('r', '3.4'); d.setAttribute('fill', 'var(--ok)'); svg.append(d); });
    });
  }

  const HOME12 = ['اطبعا ورقة تتبّع «م» أو افتحاها في كتاب الطالب المطبوع.', 'ابدأ من النقطة الخضراء واتّبع الأسهم.', 'قل «مْـ» ممدودة وأنت تتبّع.'];

  /** خطوة ورقة التتبّع (للمعلّم) — تُستعمل في النسخة HTML وبعد انتهاء محطّة «اكتب» في «رحلة الميم» */
  function worksheet(stage, ctx, opt) {
    opt = opt || {};
    const v = getVar(), V = VAR[v];
    const wrap = h('div.sx-wrap');
    if (opt.steps) wrap.append(sxSteps(opt.steps[0], opt.steps[1]));
    const book = h('div.t12-book.sx-in.s3');
    const ref = h('div.t12-page.ref'); const work = h('div.t12-page.work');
    book.append(ref, work);
    const foot = h('div.sx-actions');
    wrap.append(book, foot);
    stage.append(wrap);
    const mkSheet = (el) => {
      el.innerHTML = sheetHTML(v);
      addStartDots(el, v);
      const fit = () => { const sh = el.querySelector('.t12-sheet'); if (sh) sh.style.transform = 'scale(' + (el.clientWidth / 794) + ')'; };
      const ro = new ResizeObserver(fit); ro.observe(el); ctx.onCleanup(() => ro.disconnect());
      return el;
    };
    function openBig() {
      const big = h('div.t12-big', { role: 'dialog', 'aria-label': 'وَرَقَةُ تَتَبُّعِ «م»' });
      const close = h('button.bq-btn', { type: 'button', onclick: () => { big.remove(); prev.focus({ preventScroll: true }); } }, BQ.icon('close'), 'إغلاق');
      big.append(h('div.t12-big-bar', null, h('span', null, 'للطباعة: الورقة نفسها في كتاب الطالب المطبوع، أو اطبع هذه الصفحة من المتصفّح.'), close),
        mkSheet(h('div.t12-sheetwrap', { role: 'img', 'aria-label': 'وَرَقَةُ تَتَبُّعٍ' })));
      stage.append(big);
      close.focus({ preventScroll: true });
    }
    const prev = mkSheet(h('button.t12-sheetwrap', { type: 'button', 'aria-label': 'افتح ورقة التتبّع', onclick: openBig }));
    ref.append(h('div.t12-print', null,
      h('p', { html: '<b>للمعلّم:</b> ورقة اختيارية للقلم في البيت؛ الدرس مكتمل بدونها.' }),
      h('p', null, 'ابدأ من النقطة الخضراء واتّبع الأسهم، وقل «مْـ» ممدودة وأنت تتبّع.'),
      h('button.bq-btn.ghost', { type: 'button', onclick: openBig }, BQ.icon('hand'), 'افتح الورقة'),
      h('p.book', null, BQ.icon('star'), 'الورقة نفسها في كتاب الطالب المطبوع.')));
    work.append(prev);
    ctx.instruction('');
    ctx.onReplay(() => {});
    foot.replaceChildren(h('button.bq-btn.sx-in', { type: 'button', onclick: () => opt.onFinish && opt.onFinish() }, 'أَنْهَيْتُ', BQ.icon('check')));
    return wrap;
  }
  function endCard12(stage, ctx, onReplay) {
    stage.querySelectorAll('.bq-end').forEach((n) => n.remove());
    ctx.done();
    const ab = ctx.frame && ctx.frame.querySelector('.elp-adult-body');
    if (ab && !ab.querySelector('.t12-home')) ab.insertAdjacentHTML('beforeend', '<div class="t12-home"><p class="lbl">في البيت اليوم</p><ul>' + HOME12.map((t) => '<li>' + t + '</li>').join('') + '</ul></div>');
    return sxEnd(stage, { title: 'أَحْسَنْتَ!', line: 'bariq_L1-01_d1-FB_03_ar', note: 'تَتَبَّعْتَ «م» مِنْ نُقْطَةِ البَدْءِ.', onReplay }); // v0-12 r3b: «في البيت اليوم» للمعلّم في الدليل لا على ورقة الطفل
  }

  const touchGuard = (el) => { if (BQ.elGuard) BQ.elGuard(el); }; // v0-12: حارس اللمس المشترك (EL01.js)

  BQ.register(ID, {
    cover: 'يشاهد الطفل حركة «م»، ثم يتتبّعها بإصبعه من النقطة الخضراء.',
    render(stage, ctx) {
      const age = ctx.age();
      const K = sxKit(ctx);
      const say = K.say, bariq = K.bariq;
      const TOL = age === '4-6' ? 0.11 : 0.085; // مسار أعرض لـ٤–٦
      let gen = 0, cur = 0;
      const timers = new Set();
      const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (K.alive()) fn(); }, ms); timers.add(t); return t; };
      const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
      const rec = { trace_completed: 0, start_ok: null, variant: getVar(), replays: 0, assisted: false, alt: false };
      ctx.onCleanup(() => { gen++; clearTimers(); });
      const adultBtn = sxAdultTool(ctx.frame);
      const reset = () => { gen++; clearTimers(); BQ.audio.stop(); stage.replaceChildren(); if (adultBtn) adultBtn.classList.remove('sx-has-note'); return gen; };
      const plan = age === '10-12' ? ['guided', 'free'] : ['guided', 'faded', 'free'];
      const NSTEP = plan.length + 2; // النموذج + مراحل التتبّع + الورقة
      const yn = (b) => (b == null ? '—' : b ? 'نعم' : 'لا');
      const recLine = () => 'عدد التتبّعات المكتملة: ' + sxAR(rec.trace_completed) + ' · بدأ من النقطة الخضراء أوّل مرّة: ' + yn(rec.start_ok) +
        ' · إعادات النموذج: ' + sxAR(rec.replays) + ' · بمساعدة: ' + yn(rec.assisted) + (rec.alt ? ' · استعمل بديل اللمس' : '');
      const ageLine = age === '4-6' ? 'مسار أعرض ونقطة بدء أكبر؛ يمكنك إمساك إصبعه في المرّة الأولى.'
        : age === '10-12' ? 'تتبّع موجَّه ثم كتابة بلا نقاط على المسطرة.' : 'تتبّع موجَّه ثم نموذج باهت ثم كتابة بلا نقاط.';

      function varToggle() {
        const v = getVar();
        const box = h('div.sx-var', { role: 'group', 'aria-label': 'صيغة الكتابة — للمعلّم' }, BQ.icon('adult'), h('span', null, 'الصيغة · للمعلّم'));
        ['A', 'B'].forEach((k) => box.append(h('button', { type: 'button', 'aria-pressed': String(v === k), 'aria-label': 'الصيغة ' + VAR[k].tag + ': ' + VAR[k].name, title: VAR[k].name, onclick: () => { if (getVar() === k) return; BQ.store.set('write-variant', k); rec.variant = k; SCREENS[cur](); } }, VAR[k].tag)));
        return box;
      }
      function panel(body, extra) {
        const V = VAR[getVar()];
        K.adult(body + (extra || ''),
          '<p>يرى نموذج «م» المنفصلة ثم يتتبّعها بإصبعه مرّتين من نقطة البدء؛ وللبيت ورقة تتبّع بالقلم. نشاط غير مرصود: يُسجَّل الإتمام لا الإتقان، ولا علامة خطأ.</p>' +
          '<p><b>الصيغة المعروضة: (' + V.tag + ') ' + V.name + '.</b> ' + V.note + '</p><div class="t12-slot"></div>' +
          '<p class="rv">ملاحظة مراجعة: صيغة كتابة «م» لم تُعتمد بعد؛ لذلك النموذج ثابت بلا حركة قلم.</p>' +
          '<p><b>عمر ' + sxAR(age.replace('-', '–')) + ' سنوات:</b> ' + ageLine + '</p>' +
          '<p><b>ما سُجِّل:</b> ' + recLine() + '</p>');
        const slot = ctx.frame.querySelector('.t12-slot');
        if (slot) slot.append(varToggle());
      }
      function scaffold(step, cls, withToggle) {
        const wrap = h('div.sx-wrap');
        const top = h('div.t12-top', null, sxSteps(NSTEP, step), withToggle ? varToggle() : h('span'));
        const book = h('div.t12-book.sx-in.' + cls);
        const ref = h('div.t12-page.ref');
        const work = h('div.t12-page.work');
        book.append(ref, work);
        const foot = h('div.sx-actions');
        wrap.append(top, book, foot);
        stage.append(wrap);
        return { wrap, ref, work, foot };
      }

      /* ---------- ش١ · نموذج الحركة (ثابت) ---------- */
      function s1() {
        const g = reset(); const live = () => g === gen && K.alive(); cur = 0;
        const v = getVar();
        const { ref, work, foot } = scaffold(0, 's1', true);
        const pad = h('div.t12-pad.no-start', { role: 'img', 'aria-label': 'حَرْفُ الميمِ' });
        const face = h('div.bq-trace');
        const svg = modelSVG(v, 'model');
        const c0 = VAR[v].cps[0];
        face.append(svg, h('span.bq-trace-start', { style: { left: c0[0] + '%', top: c0[1] + '%', animation: 'none', display: 'block' }, 'aria-hidden': 'true' }));
        pad.append(face);
        ref.append(h('span.t12-glyph', { 'aria-hidden': 'true' }, 'م'));
        work.append(pad);
        ctx.instruction('هَذا حَرْفُ الميمِ.');
        panel('<p>شاهدا النموذج مرّة: النقطة الخضراء ثم الأسهم بالترتيب.</p><p>لا تقل «منفصل» ولا «متّصل».</p>');
        const hi = () => { svg.querySelectorAll('.arr').forEach((a, k) => later(() => { a.classList.remove('hi'); void a.getBBox(); a.classList.add('hi'); }, k * 900)); };
        ctx.onReplay(() => { say('bariq_L1-01_d1-EL03_02_ar'); hi(); });
        later(async () => {
          await bariq(stage, 'bariq_L1-01_d1-EL03_02_ar'); if (!live()) return;
          hi();
          await BQ.sleep(1400); if (!live()) return;
          foot.replaceChildren(h('button.bq-btn.sx-in', { type: 'button', onclick: () => s2(0) }, 'التّالي', BQ.icon('next')));
        }, 350);
      }

      /* ---------- ش٢ · التتبّع: موجَّه ← باهت ← حرّ ---------- */
      function s2(round) {
        const g = reset(); const live = () => g === gen && K.alive(); cur = 1;
        const v = getVar(), V = VAR[v];
        const mode = plan[Math.min(round, plan.length - 1)];
        const counted = mode !== 'free'; // التتبّع المعدود مرّتان؛ الحرّ تكرار بلا حدّ
        const { ref, work, foot } = scaffold(1 + Math.min(round, plan.length - 1), 's2', true);
        const pad = h('div.t12-pad');
        // المسار البديل للمعلّم (ضغطة مطوّلة في لوح التتبّع) يُتمّ «بمساعدة»؛ تحقّق الطفل نفسه محلّيّ أدناه
        const box = BQ.ui.trace(pad, { glyph: '', path: V.cps.map((c) => [c[0] / 100, c[1] / 100]), onDone(info) { if (info && info.assisted && !done) { rec.assisted = true; next = cps.length; complete(); } } });
        const svg = modelSVG(v, mode);
        box.insertBefore(svg, box.querySelector('canvas'));
        work.append(pad);
        const modelBtn = h('button.bq-hear.sx-hear', { type: 'button', 'aria-label': 'اسْمَعْ «مْـ»', onclick: () => { rec.replays++; hint1(); say('bariq_L1-01_snd-m_ar'); } }, BQ.icon('ear'));
        const clearBtn = h('button.sx-round', { type: 'button', 'aria-label': 'امْسَحْ وَابْدَأْ مِنْ جَديدٍ', onclick: () => restart(true) }, BQ.icon('replay'));
        ref.append(h('span.t12-glyph', { 'aria-hidden': 'true' }, 'م'), h('div.t12-tools', null, modelBtn, clearBtn));
        ctx.instruction('');
        const errMsg = { 1: 'أُعيد النموذج على المسار نفسه (الأسهم بالترتيب): لم يبدأ من النقطة الخضراء أو خالف الاتّجاه.', 2: 'أُضيئت نقطة البدء.', 3: 'أمسِك إصبع الطفل وتتبّعا معاً مرّة (تُسجَّل «بمساعدة»).' };
        const refreshPanel = (extra) => panel('<p>دعه يتتبّع من النقطة الخضراء متّبعاً الأسهم، ولا تصحّح الخروج عن المسار.</p>' +
          (age === '4-6' ? '<p>في المرّة الأولى يمكنك أن تمسك إصبعه.</p>' : '') +
          '<p>بديل اللمس: المس النقطة الخضراء ثم المس الحرف.</p>', extra);
        refreshPanel();

        const cv = box.querySelector('canvas');
        const cps = V.cps.map((c) => [c[0] / 100, c[1] / 100]);
        const nextRing = svg.querySelector('.nextcp');
        const dense = [];
        V.strokes.forEach((d) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); svg.append(p); const L = p.getTotalLength(); for (let k = 0; k <= 80; k++) { const q = p.getPointAtLength(L * k / 80); dense.push([q.x / 100, q.y / 100]); } p.remove(); });
        let next = 0, drawing = false, badStart = false, offShown = false, errors = 0, done = false, armed = false, downAt = null, moved = 0, startOkLogged = false;
        const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
        const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]; };
        const showNext = () => { if (next >= cps.length) return; nextRing.setAttribute('cx', V.cps[next][0]); nextRing.setAttribute('cy', V.cps[next][1]); nextRing.classList.remove('on'); void nextRing.getBBox(); nextRing.classList.add('on'); };
        const markHits = () => svg.querySelectorAll('.cp').forEach((c) => c.classList.toggle('hit', +c.dataset.i < next));
        let tol = TOL; // يتّسع للإصبع/القلم (×١٫٢٥) ويبقى للفأرة — v0-12
        const nearStart = (p) => p && dist(p, cps[0]) < tol * 1.35;
        function hint1() {
          svg.querySelectorAll('.arr').forEach((a, k) => later(() => { a.classList.remove('hi'); void a.getBBox(); a.classList.add('hi'); }, k * 900));
          if (!svg.querySelector('.arr')) { pad.classList.add('start-hint'); later(() => pad.classList.remove('start-hint'), 1800); }
        }
        function error() {
          errors++;
          if (errors === 1) hint1();
          if (errors === 2) pad.classList.add('start-hint');
          if (errors >= 3) { rec.assisted = true; if (adultBtn) adultBtn.classList.add('sx-has-note'); }
          refreshPanel('<p class="sx-hint">' + errMsg[Math.min(errors, 3)] + '</p>');
        }
        function restart(byUser) { box.clear(); next = 0; badStart = false; armed = false; pad.classList.remove('armed', 'done'); markHits(); nextRing.classList.remove('on'); if (byUser) rec.replays++; }
        cv.addEventListener('pointerdown', (e) => {
          if (done) return;
          const p = pos(e); drawing = true; downAt = p; moved = 0; offShown = false; tol = e.pointerType === 'mouse' ? TOL : TOL * 1.25;
          if (armed && !nearStart(p)) return; // بعد التسليح: لمسة على الحرف تُتمّ (في up)؛ ضربة من نقطة البدء تبقى تتبّعاً عادياً
          const bad = V.strokeStart.includes(next) && dist(p, cps[next] || cps[0]) > tol * 1.35;
          // أوّل لمسة على الحرف تُسجَّل كما هي (صحيحة أو خاطئة) ولا تُكتب فوقها لمسة لاحقة
          if (next === 0 && !startOkLogged) { rec.start_ok = !bad; startOkLogged = true; }
          if (bad) {
            badStart = true; // wrong_start — نقطة البدء تلمع مرّة (بلا صوت)
            if (next === 0) { pad.classList.remove('start-hint'); void pad.offsetWidth; pad.classList.add('start-hint'); later(() => pad.classList.remove('start-hint'), 1200); } else showNext();
          } else badStart = false;
        });
        cv.addEventListener('pointermove', (e) => {
          if (!drawing || done) return;
          const p = pos(e);
          if (downAt) moved = Math.max(moved, dist(p, downAt));
          if (badStart) return;
          if (armed) { if (moved > 0.03 && nearStart(downAt)) { armed = false; pad.classList.remove('armed'); } else return; }
          while (next < cps.length && dist(p, cps[next]) < tol) { next++; markHits(); nextRing.classList.remove('on'); }
          if (Math.min(...dense.map((q) => dist(p, q))) > tol * 1.6 && !offShown) { offShown = true; showNext(); } // off_path — تلمع نقطة التحقّق التالية
          if (next >= cps.length) complete();
        });
        const up = (e) => {
          if (!drawing) return; drawing = false;
          if (done) return;
          const p = e && e.clientX != null ? pos(e) : downAt;
          const tap = moved < 0.02;
          // بداية خاطئة أوّلاً: لا تُعامَل كلمسة ولا تُسلِّح بديل اللمس
          if (badStart) { error(); box.clear(); next = 0; markHits(); badStart = false; return; } // مسح فوريّ: إعادة سريعة صحيحة لا تُمسَح
          if (armed) {
            if (tap && p[0] > 0.25 && p[0] < 0.78 && p[1] > 0.22 && p[1] < 0.94) { rec.alt = true; next = cps.length; box.clear(); complete(); } // بديل اللمس: نقطة البدء ثم الحرف
            else { armed = false; pad.classList.remove('armed'); box.clear(); next = 0; markHits(); }
            return;
          }
          if (tap && next === 0 && nearStart(downAt) && nearStart(p)) { armed = true; pad.classList.add('armed'); box.clear(); return; }
          if (next < cps.length && !V.strokeStart.includes(next) && !tap) { error(); showNext(); }
        };
        cv.addEventListener('pointerup', up);
        // إلغاء النظام (إيماءة/نافذة) ليس خطأً من الطفل: يتوقّف الخطّ ويبقى ما أنجزه
        cv.addEventListener('pointercancel', () => { drawing = false; badStart = false; });
        touchGuard(box);

        async function complete() {
          if (done) return; done = true; drawing = false;
          pad.classList.add('done'); nextRing.classList.remove('on'); pad.classList.remove('start-hint', 'armed');
          if (counted) rec.trace_completed++;
          await say('bariq_L1-01_snd-m_ar'); if (!live()) return; // الحرف يمتلئ بلون الدرس ويُسمَع «مْـ»
          if (round === 0) { await BQ.sleep(500); if (live()) s2(1); return; }
          if (round === 1) {
            await bariq(stage, 'bariq_L1-01_d1-FB_03_ar'); if (!live()) return;
            await say('bariq_L1-01_d1-EL05_02_ar'); if (!live()) return;
          }
          refreshPanel();
          const more = mode === 'free' ? h('button.bq-btn.ghost.sx-in', { type: 'button', onclick: () => s2(plan.length - 1) }, BQ.icon('replay'), 'مَرَّةً أُخْرى')
            : h('button.bq-btn.ghost.sx-in', { type: 'button', onclick: () => s2(round + 1) }, BQ.icon('hand'), 'اكْتُبْ بِلا نِقاطٍ');
          foot.replaceChildren(more, h('button.bq-btn.sx-in', { type: 'button', onclick: () => s3() }, 'التّالي', BQ.icon('next')));
        }
        ctx.onReplay(() => { rec.replays++; hint1(); say('bariq_L1-01_snd-m_ar'); });
        if (round === 0) later(() => say('bariq_L1-01_snd-m_ar').then(() => live() && hint1()), 400);
        else later(hint1, 300);
      }

      /* ---------- ش٣ · ورقة التتبّع (للمعلّم) — نظيرها في الكتاب المطبوع ---------- */
      function s3() {
        reset(); cur = 2;
        worksheet(stage, ctx, { steps: [NSTEP, NSTEP - 1], onFinish: finish });
        panel('<p>ورقة اختيارية للقلم في البيت؛ الدرس مكتمل بدونها.</p><p>ابدأ معه من النقطة الخضراء، وقولا «مْـ» ممدودة أثناء التتبّع.</p>');
      }
      function finish() {
        gen++; clearTimers(); BQ.audio.stop();
        endCard12(stage, ctx, () => s1());
      }
      const SCREENS = [s1, () => s2(0), s3];
      s1();
    },
  });
  // «رحلة الميم» · محطّة «اكتب» هي التجربة الأساسية؛ النسخة HTML أعلاه بديل آليّ.
  // بعد انتهاء المحطّة (after من المحرّك): تظهر ورقة التتبّع وبطاقة «في البيت اليوم» — نصف الهدف الرابع (القلم على المسطرة).
  if (BQ.ui.godotRender) {
    BQ.defs[ID].render = BQ.ui.godotRender('write', BQ.defs[ID].render, {
      name: 'اكتب',
      after(ctx, result, stage) {
        stage = stage || ctx.stage;
        if (!stage || (typeof ctx.alive === 'function' && !ctx.alive())) return;
        sxKit(ctx);
        setTimeout(() => {
          if (typeof ctx.alive === 'function' && !ctx.alive()) return;
          if (!stage.isConnected) return;
          stage.replaceChildren();
          worksheet(stage, ctx, { onFinish: () => endCard12(stage, ctx, () => BQ.open(ID, { skipCover: true })) });
          const w = stage.querySelector('.sx-wrap');
          if (w && w.scrollIntoView) w.scrollIntoView({ block: 'nearest', behavior: BQ.reduced() ? 'auto' : 'smooth' });
        }, 900);
      },
    });
  }
})();
