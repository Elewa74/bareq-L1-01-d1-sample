/* EL15 «الخريطة الذهنية» — gme-107 · MindMapBuilder (غير مرصود)
   ش١ «خريطة الميم»: «م» في دائرة وسطى + أربع خانات بأيقونات (أذن · فم · إطار صورة · يد) + أربع بطاقات
       (سمّاعة بموجة · شفتان مطبقتان · ماء · «م» مفرّغة). سحب بمؤشّر أو لمسٌ ثم لمس الخانة.
       الصحيحة: نقرة استقرار ثم صوت البطاقة؛ الخاطئة: تعود البطاقة بلطف ٤٠٠ مللي ث بلا أيّ صوت.
       تلميح ١ أيقونة الخانة تلمع خفيفاً · ٢ الخانة تلمع · ٣ البطاقة تنتقل وحدها. ١٠–١٢: خانة «في بيتكم» اختيارية للرسم.
   ش٢ الخريطة تصغر وتدخل ذراعاً أولى في «بَوْصَلَةِ الأَصْواتِ». */
(function () {
  'use strict';
  const h = BQ.h;
  const ID = 'EL15';
  const S = '.elp[data-el="EL15"]';
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

  if (!document.getElementById('st-EL15v2')) {
    const st = document.createElement('style');
    st.id = 'st-EL15v2';
    st.textContent = `
${S} .t15-in { animation: sxIn .45s cubic-bezier(.2,.9,.3,1.15) both; }
${S} .t15 { position: relative; width: min(100%, 840px); display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr); align-items: center; gap: clamp(18px, 5cqi, 48px); background: var(--white); border-radius: 22px; padding: clamp(16px, 3.4cqi, 30px); box-shadow: 0 2px 0 var(--sky-line), 0 18px 40px var(--shade); }
${S} .t15::before { content: ""; position: absolute; top: 16px; bottom: 16px; left: calc(42.5% - 1px); width: 2px; background: var(--sky-line); box-shadow: 0 0 18px 6px color-mix(in srgb, var(--sky-line) 55%, transparent); pointer-events: none; }
${S} .t15.solo { grid-template-columns: 1fr; width: min(100%, 560px); }
${S} .t15.solo::before { display: none; }
${S} .t15-board { position: relative; width: 100%; max-width: 440px; aspect-ratio: 1; justify-self: center; border-radius: 50%; background: radial-gradient(closest-side, var(--paper), var(--paper) 62%, color-mix(in srgb, var(--paper) 40%, var(--white)) 63%, var(--white) 72%); }
${S} .t15-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
${S} .t15-lines line { stroke: var(--sky-2); stroke-width: .8; stroke-dasharray: 1.6 2; stroke-linecap: round; transition: stroke .4s; }
${S} .t15-lines line.on { stroke: var(--ok); stroke-dasharray: none; stroke-width: 1.4; }
${S} .t15-center { position: absolute; left: 50%; top: 50%; width: 30%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: var(--white); border: 3px solid var(--paper-edge); box-shadow: 0 6px 18px var(--shade); display: grid; place-items: center; font: 700 clamp(44px, 9cqi, 96px)/1 var(--ff-child); color: var(--coral); padding-bottom: 6%; overflow: hidden; }
${S} .t15-board.full .t15-center { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 30px var(--sun); }
${S} .t15-slot { position: absolute; width: 26%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 18px; border: 2.5px dashed var(--sky-2); background: var(--white); padding: 0; cursor: pointer; display: grid; place-items: center; transition: background .25s, box-shadow .3s, border-color .3s; min-width: 44px; box-shadow: 0 4px 12px var(--shade); }
${S} .t15-slot > img.ic { width: 58%; height: 58%; object-fit: contain; border-radius: 10px; pointer-events: none; transition: transform .3s; }
${S} .t15-slot.over, ${S} .t15-slots-armed .t15-slot:not(.filled):hover { background: var(--sky-wash); border-style: solid; border-color: var(--sky); }
${S} .t15-slots-armed .t15-slot:not(.filled) { animation: t15Breath 1.6s ease-in-out infinite; }
@keyframes t15Breath { 50% { border-color: var(--sun); } }
${S} .t15-slot.hint1 > img.ic { animation: t15Hint 1s ease-in-out 3; }
@keyframes t15Hint { 50% { transform: scale(1.14); filter: drop-shadow(0 0 8px var(--sun)); } }
${S} .t15-slot.hint2 { border-style: solid; border-color: var(--sun); box-shadow: 0 0 0 4px var(--sun-soft), 0 0 24px var(--sun); }
${S} .t15-slot.filled { border: 0; cursor: default; box-shadow: 0 0 0 4px var(--ok), 0 8px 18px var(--shade); }
${S} .t15-slot.filled > img.ic { position: absolute; width: 34%; height: 34%; top: -14%; inset-inline-start: -14%; background: var(--white); border-radius: 50%; padding: 5%; box-shadow: 0 0 0 2px var(--ok); z-index: 2; }
${S} .t15-slot .tick { position: absolute; top: -12%; inset-inline-end: -12%; width: 30%; aspect-ratio: 1; border-radius: 50%; background: var(--ok); color: var(--white); display: grid; place-items: center; padding: 6%; z-index: 2; }
${S} .t15-slot .tick .bq-ic { width: 100%; height: 100%; }
${S} .t15-slot.home { width: 18%; border-color: var(--sky-line); }
${S} .t15-slot.home .bq-ic { width: 54%; height: 54%; color: var(--sky-2); }
${S} .t15-slot.home.drawn { border-style: solid; }
${S} .t15-slot.home img.draw { position: absolute; inset: 6%; width: 88%; height: 88%; object-fit: contain; }
/* البطاقات: ملصقات على الصفحة المقابلة */
${S} .t15-tray { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(12px, 2.6cqi, 22px); justify-items: center; }
${S} .t15-home { width: 100%; max-width: 150px; aspect-ratio: 1; border-radius: 20px; border: 2.5px dashed var(--sky-line); display: grid; }
${S} .t15-card { position: relative; width: 100%; height: 100%; border-radius: 18px; border: 4px solid var(--white); background: var(--white); box-shadow: 0 5px 0 var(--sky-line), 0 12px 22px var(--shade); padding: 0; cursor: grab; overflow: hidden; display: grid; place-items: center; touch-action: none; -webkit-user-select: none; user-select: none; transition: box-shadow .2s, transform .2s; }
${S} .t15-card img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
${S} .t15-card img.svg { object-fit: contain; background: var(--paper); }
${S} .t15-card .hollow { font: 700 clamp(40px, 8cqi, 88px)/1 var(--ff-child); color: transparent; -webkit-text-stroke: 2.5px var(--navy); padding-bottom: 14%; pointer-events: none; }
${S} .t15-card.sel { box-shadow: 0 0 0 4px var(--sun), 0 16px 26px var(--shade); transform: translateY(-6px) rotate(-2deg); }
${S} .t15-card.dragging { cursor: grabbing; z-index: 30; transition: none; box-shadow: 0 22px 36px color-mix(in srgb, var(--navy) 30%, transparent); }
${S} .t15-card.back { transition: transform .4s cubic-bezier(.3,.7,.3,1); }
${S} .t15-card.playing { box-shadow: 0 0 0 4px var(--sky), 0 12px 22px var(--shade); }
${S} .t15-slot .t15-card { position: absolute; inset: 6%; width: 88%; height: 88%; border-width: 0; box-shadow: none; cursor: pointer; border-radius: 12px; }
${S} .t15-slot .t15-card .hollow { font-size: clamp(28px, 5.4cqi, 58px); }
${S} .t15-card:focus-visible, ${S} .t15-slot:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
${S} .t15-ghost { position: absolute; left: 0; top: 0; z-index: 40; pointer-events: none; width: 64px; height: 64px; border-radius: 16px; border: 3px dashed var(--sky); background: color-mix(in srgb, var(--white) 60%, transparent); display: grid; place-items: center; color: var(--navy); opacity: 0; }
${S} .t15-ghost .bq-ic { width: 60%; height: 60%; }
/* بوصلة الأصوات (ش٢) */
${S} .t15-compass { position: relative; width: min(100%, 440px); aspect-ratio: 1; justify-self: center; }
${S} .t15-compass svg.rose { position: absolute; inset: 0; width: 100%; height: 100%; }
${S} .t15-arm { position: absolute; width: 30%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; border: 2.5px dashed var(--sky-line); background: var(--white); display: grid; place-items: center; color: var(--sky-2); font: 700 22px/1 var(--ff-display); }
${S} .t15-arm.first { border: 0; background: var(--paper); box-shadow: 0 0 0 5px var(--sun-soft), 0 0 30px var(--sun); overflow: hidden; }
${S} .t15-arm.first .mini { position: absolute; left: 0; top: 0; transform-origin: 0 0; pointer-events: none; }
${S} .t15-fly { position: absolute; z-index: 35; pointer-events: none; transform-origin: 0 0; transition: transform 1s cubic-bezier(.5,0,.2,1), opacity .3s; }
${S} .t15-hub { position: absolute; left: 50%; top: 50%; width: 20%; aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; background: var(--tile); border: 3px solid var(--paper-edge); box-shadow: 0 6px 14px var(--shade); }
${S} .t15-caption { font: 700 clamp(20px, 3cqi, 26px)/1.4 var(--ff-child); color: var(--navy); text-align: center; margin: 0; }
/* الرسم الحرّ ١٠–١٢ */
${S} .t15-drawbox { position: absolute; inset: 0; z-index: 45; display: grid; place-items: center; background: color-mix(in srgb, var(--sky-wash) 88%, transparent); }
${S} .t15-drawcard { background: var(--white); border-radius: 22px; padding: 16px; display: grid; gap: 12px; justify-items: center; box-shadow: 0 18px 40px var(--shade); }
${S} .t15-drawcard canvas { width: min(360px, 76cqi); aspect-ratio: 1; background: var(--paper); border-radius: 16px; touch-action: none; cursor: crosshair; }
${S} .t15-drawcard .row { display: flex; gap: 10px; }
${S} .bq-adult .t15-save { display: grid; gap: 10px; justify-items: start; margin: 6px 0 10px; }
${S} .bq-adult .t15-snap { width: min(100%, 260px); border-radius: 50%; box-shadow: 0 0 0 1.5px var(--sky-line); }
${S} .bq-adult .t15-save a.bq-btn { text-decoration: none; min-height: 44px; }
${S} .bq-adult .t15-save .t15-save-t { margin: 0; font-weight: 600; color: var(--navy); }
@container stage (max-width: 620px) {
  ${S} .t15 { grid-template-columns: 1fr; padding: 14px; gap: 18px; }
  ${S} .t15::before { display: none; }
  ${S} .t15-tray { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; border-top: 2px dashed var(--sky-line); padding-top: 16px; }
  ${S} .t15-card .hollow { font-size: 40px; }
  ${S} .t15-slot .t15-card .hollow { font-size: 26px; }
}
@media (prefers-reduced-motion: reduce) {
  ${S} .t15-in, ${S} .t15-slots-armed .t15-slot, ${S} .t15-slot.hint1 > img.ic { animation: none !important; }
  ${S} .t15-card.back, ${S} .t15-fly { transition: none; }
}`;
    document.head.append(st);
  }


  // الخانات (مواضع نسبية من اللوح) والبطاقات — games.json ‹L1-01-AS-gme-107›
  const SLOTS = [
    { id: 'ear', icon: 'img-105-ear', aria: 'خانَةُ الأُذُنِ', x: 50, y: 14 },
    { id: 'mouth', icon: 'img-105-mouth', aria: 'خانَةُ الفَمِ', x: 86, y: 50 },
    { id: 'picture', icon: 'img-105-frame', aria: 'خانَةُ الصّورَةِ', x: 50, y: 86 },
    { id: 'hand', icon: 'img-105-hand', aria: 'خانَةُ اليَدِ', x: 14, y: 50 },
  ];
  const TILES = [
    { id: 'sound', slot: 'ear', img: 'img-105-speaker', svg: true, line: 'bariq_L1-01_snd-m_ar', aria: 'صَوْتٌ', ar: 'الصوت «مْـ»' },
    { id: 'lips', slot: 'mouth', img: 'img-101', line: 'bariq_L1-01_L1-build_02_ar', aria: 'شَفَتانِ', ar: 'الشفتان المطبقتان' },
    { id: 'word', slot: 'picture', img: 'img-001', line: 'bariq_L1-01_vocab-w1_01_ar', aria: 'ماءْ', ar: 'صورة الماء' },
    { id: 'shape', slot: 'hand', glyph: 'م', line: 'bariq_L1-01_L1-build_03_ar', aria: 'حَرْفُ الميمِ', ar: 'شكل الحرف «م»' },
  ];
  const SNAP = 'bariq_L1-01_sfx-tile-snap';

  /** «احفظ خريطة الطفل»: صورة PNG للخريطة المكتملة تُنزَّل أو تُحفظ من الصورة نفسها (بلا طباعة آلية ولا إرسال) */
  const MAPCACHE = { url: null };
  function mapSaveBox(frame) {
    const box = h('div.t15-save');
    const help = 'إن لم يبدأ التنزيل: اضغط على الصورة مطوّلاً (أو بالزرّ الأيمن للفأرة) واختر «حفظ الصورة»، ثم اطبعها من الصور إن شئت.';
    const show = (url) => box.replaceChildren(h('p.t15-save-t', null, 'خريطة الطفل جاهزة:'), h('img.t15-snap', { src: url, alt: 'خريطة الميم المكتملة' }),
      h('a.bq-btn', { href: url, download: 'خريطة-الميم.png' }, BQ.icon('check'), 'تنزيل الصورة'),
      h('p', null, help));
    if (MAPCACHE.url) { show(MAPCACHE.url); return box; }
    const btn = h('button.bq-btn.ghost', { type: 'button', onclick: async () => {
      btn.disabled = true;
      try { MAPCACHE.url = await mapImage(frame); show(MAPCACHE.url); }
      catch (e) { console.warn('EL15 map image', e); btn.disabled = false; }
    } }, BQ.icon('star'), 'احفظ خريطة الطفل صورةً');
    box.append(h('p.t15-save-t', null, 'للبيت: صورة للخريطة المكتملة تحفظها أو تطبعها.'), btn);
    return box;
  }
  function mapImage(frame) {
    const W = 900, cv = document.createElement('canvas'); cv.width = W; cv.height = W;
    const c = cv.getContext('2d');
    const css = getComputedStyle(frame);
    const col = (n, d) => (css.getPropertyValue(n) || '').trim() || d;
    const load = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
    return Promise.all(TILES.map((t) => (t.glyph ? null : load(BQ.img(t.img))))).then((ims) => {
      c.fillStyle = col('--white', 'white'); c.fillRect(0, 0, W, W);
      c.fillStyle = col('--paper', 'ivory'); c.beginPath(); c.arc(W / 2, W / 2, W * 0.44, 0, Math.PI * 2); c.fill();
      c.strokeStyle = col('--sky-line', 'lightblue'); c.lineWidth = 6;
      SLOTS.forEach((s) => { c.beginPath(); c.moveTo(W / 2, W / 2); c.lineTo(s.x / 100 * W, s.y / 100 * W); c.stroke(); });
      const r = W * 0.13;
      SLOTS.forEach((s) => {
        const t = TILES.find((x) => x.slot === s.id), im = ims[TILES.indexOf(t)];
        const x = s.x / 100 * W, y = s.y / 100 * W;
        c.save(); c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = col('--white', 'white'); c.fill(); c.lineWidth = 8; c.strokeStyle = col('--ok', 'green'); c.stroke(); c.clip();
        if (im) { const d = t.svg ? r * 1.3 : r * 2, nw = im.naturalWidth, nh = im.naturalHeight; if (nw && nh) { const sz = Math.min(nw, nh); c.drawImage(im, (nw - sz) / 2, (nh - sz) / 2, sz, sz, x - d / 2, y - d / 2, d, d); } else c.drawImage(im, x - d / 2, y - d / 2, d, d); }
        else { c.fillStyle = col('--navy', 'navy'); c.font = '700 ' + Math.round(r * 1.2) + 'px "Noto Naskh Arabic", serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t.glyph, x, y - r * 0.1); }
        c.restore();
      });
      c.beginPath(); c.arc(W / 2, W / 2, W * 0.14, 0, Math.PI * 2); c.fillStyle = col('--white', 'white'); c.fill(); c.lineWidth = 8; c.strokeStyle = col('--coral', 'tomato'); c.stroke();
      c.fillStyle = col('--coral', 'tomato'); c.font = '700 ' + Math.round(W * 0.16) + 'px "Noto Naskh Arabic", serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('م', W / 2, W / 2 - W * 0.02);
      return cv.toDataURL('image/png');
    });
  }

  BQ.register(ID, {
    cover: 'يضع الطفل كلّ بطاقة في مكانها حول «م»: الصوت، والشفتان، والماء، وشكل الحرف.',
    render(stage, ctx) {
      const age = ctx.age();
      const K = sxKit(ctx);
      const say = K.say, bariq = K.bariq;
      let gen = 0, advance = null;
      const timers = new Set();
      const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (K.alive()) fn(); }, ms); timers.add(t); return t; };
      const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
      const rec = { completed: false, moves: 0, replays: 0, assisted: [] };
      ctx.onCleanup(() => { gen++; clearTimers(); });
      const reset = () => { gen++; clearTimers(); BQ.audio.stop(); stage.replaceChildren(); advance = null; return gen; };
      let mapState = null; // لقطة الخريطة للطباعة

      const ageLine = age === '4-6' ? 'دعه يلمس البطاقة فيسمعها قبل أن يضعها؛ بعد محاولتين تلمع الخانة، ثم تنتقل البطاقة وحدها.'
        : age === '10-12' ? 'خانة خامسة اختيارية «في بيتكم» يرسم فيها بإصبعه؛ الرسم يبقى في هذا المتصفّح فقط.' : 'السحب أو اللمس ثم اللمس؛ بعد محاولتين تلمع الخانة الصحيحة.';
      function panel(extra) {
        K.adult('<p>دعه يسحب البطاقة، أو يلمسها ثم يلمس الخانة؛ كلّ بطاقة تُسمِع صوتها حين تستقرّ.</p><p>لا صوت خطأ: البطاقة تعود بلطف، فلا تصحّح.</p>' +
          (extra || '') + '<div class="t15-pslot"></div>',
          '<p>«خريطة الميم»: في كلّ خانة بطاقتها — الصوت «مْـ»، والشفتان المطبقتان، والماء، وشكل الحرف. نشاط غير مرصود.</p>' +
          '<p><b>عمر ' + sxAR(age.replace('-', '–')) + ' سنوات:</b> ' + ageLine + '</p>' +
          '<p><b>ما سُجِّل:</b> ' + (rec.completed ? 'أتمّ الخريطة' : 'لم يُتمّها بعد') + ' · عدد الحركات: ' + sxAR(rec.moves) + ' · إعادات الصوت: ' + sxAR(rec.replays) +
          (rec.assisted.length ? ' · انتقلت وحدها: ' + rec.assisted.map((id) => TILES.find((t) => t.id === id).ar).join('، ') : '') + '</p>' +
          '<p>الخريطة نفسها في كتاب الطالب المطبوع.</p>');
        const slot = ctx.frame.querySelector('.t15-pslot');
        if (slot && mapState) slot.append(mapSaveBox(ctx.frame));
      }
      /* «احفظ خريطتي»: صورة للخريطة المكتملة تُحفظ أو تُطبع من المتصفّح (بلا إرسال) */
      /* ---------- ش١ · بناء الخريطة ---------- */
      function s1() {
        const g = reset(); const live = () => g === gen && K.alive();
        mapState = null; MAPCACHE.url = null; rec.completed = false; rec.moves = 0; rec.assisted = [];
        const placed = new Set(); const errs = {};
        const wrap = h('div.t15');
        const board = h('div.t15-board.t15-in', { role: 'group', 'aria-label': 'خَريطَةُ الميمِ' });
        const lines = h('span', { html: '<svg class="t15-lines" viewBox="0 0 100 100" aria-hidden="true">' + SLOTS.map((s) => `<line data-s="${s.id}" x1="50" y1="50" x2="${s.x}" y2="${s.y}"/>`).join('') + '</svg>' }).firstChild;
        board.append(lines, h('div.t15-center', { 'aria-hidden': 'true' }, 'م'));
        const slotEls = {};
        SLOTS.forEach((s) => {
          const b = h('button.t15-slot', { type: 'button', 'aria-label': s.aria, style: { left: s.x + '%', top: s.y + '%' }, dataset: { s: s.id } },
            h('img.ic', { src: BQ.img(s.icon), alt: '', draggable: 'false' }));
          b.addEventListener('click', () => { if (sel && !b.classList.contains('filled')) attempt(sel, b, false); else if (b.classList.contains('filled')) { const c = b.querySelector('.t15-card'); if (c) playCard(c); } });
          slotEls[s.id] = b; board.append(b);
        });
        // ١٠–١٢: خانة خامسة اختيارية «في بيتكم» للرسم بالإصبع (محلّيّ بلا إرسال)
        if (age === '10-12') {
          const hs = h('button.t15-slot.home', { type: 'button', 'aria-label': 'في بَيْتِكُمْ — ارْسُمْ', style: { left: '85%', top: '14%' } }, BQ.icon('home'));
          let saved = null; try { saved = localStorage.getItem('bq-L1-01-d1-EL15-home'); } catch (e) { saved = null; }
          if (saved) { hs.classList.add('drawn'); hs.append(h('img.draw', { src: saved, alt: '' })); }
          hs.addEventListener('click', () => drawPad(hs));
          board.append(hs);
        }
        const tray = h('div.t15-tray', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
        const cards = BQ.shuffle(TILES).map((t, k) => {
          const c = h('button.t15-card', { type: 'button', 'aria-label': t.aria, dataset: { t: t.id } },
            t.glyph ? h('span.hollow', null, t.glyph) : h('img' + (t.svg ? '.svg' : ''), { src: BQ.img(t.img), alt: '', draggable: 'false' }));
          c._t = t;
          const home = h('div.t15-home.t15-in', { style: { animationDelay: (0.1 + k * 0.08) + 's' } }, c);
          c._home = home;
          tray.append(home);
          bindCard(c);
          return c;
        });
        wrap.append(board, tray);
        stage.append(h('div.sx-wrap', null, sxSteps(2, 0), wrap));
        ctx.instruction('هَيّا: أَيْنَ الميمُ؟');
        panel();
        ctx.onReplay(() => { rec.replays++; say('bariq_L1-01_d1-EL03_03_ar'); });
        advance = () => { if (placed.size === 4) s2(); };

        let sel = null;
        function select(c) {
          if (sel === c) { c.classList.remove('sel'); sel = null; board.classList.remove('t15-slots-armed'); return; }
          if (sel) sel.classList.remove('sel');
          sel = c; c.classList.add('sel'); board.classList.add('t15-slots-armed');
        }
        function playCard(c) {
          cards.forEach((x) => x.classList.remove('playing'));
          c.classList.add('playing');
          say(c._t.line).then(() => c.classList.remove('playing'));
        }
        function bindCard(c) {
          let start = null, drag = false, pid = null, over = null;
          c.addEventListener('pointerdown', (e) => {
            if (c.classList.contains('done') || e.button > 0) return;
            start = [e.clientX, e.clientY]; drag = false; pid = e.pointerId;
            try { c.setPointerCapture(pid); } catch (er) { /* */ }
          });
          c.addEventListener('pointermove', (e) => {
            if (!start || e.pointerId !== pid) return;
            const dx = e.clientX - start[0], dy = e.clientY - start[1];
            if (!drag && Math.hypot(dx, dy) > 8) { drag = true; c.classList.remove('back'); c.classList.add('dragging'); if (sel && sel !== c) { sel.classList.remove('sel'); } sel = null; c.classList.remove('sel'); board.classList.add('t15-slots-armed'); }
            if (!drag) return;
            c.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
            c.style.visibility = 'hidden';
            const el = document.elementFromPoint(e.clientX, e.clientY);
            c.style.visibility = '';
            const s = el && el.closest && el.closest('.t15-slot:not(.filled):not(.home)');
            if (over !== s) { if (over) over.classList.remove('over'); over = s; if (s) s.classList.add('over'); }
          });
          const end = (e) => {
            if (!start || (e && e.pointerId !== pid)) return;
            const wasDrag = drag; start = null; drag = false;
            c.classList.remove('dragging');
            board.classList.remove('t15-slots-armed');
            if (over) over.classList.remove('over');
            if (wasDrag) {
              c._fromDrag = true;
              if (over) attempt(c, over, true); else goBack(c);
              over = null;
            }
          };
          c.addEventListener('pointerup', end);
          // إلغاء النظام أثناء السحب: تعود البطاقة إلى مكانها ولا تُحتسب محاولة (لا خانة من إحداثيات ٠،٠) — v0-12
          c.addEventListener('pointercancel', (e) => { if (over) over.classList.remove('over'); over = null; end(e); });
          c.addEventListener('click', () => {
            if (c._fromDrag) { c._fromDrag = false; return; }
            if (c.classList.contains('done')) return;
            select(c); playCard(c);
          });
        }
        function goBack(c) {
          c.classList.add('back');
          requestAnimationFrame(() => { c.style.transform = ''; });
          later(() => c.classList.remove('back'), 450);
        }
        function nudgeBack(c, slot) {
          // اللمس ثم اللمس: البطاقة تتّجه نحو الخانة ثم تعود بلطف (بلا صوت)
          const a = c.getBoundingClientRect(), b = slot.getBoundingClientRect();
          const dx = (b.left + b.width / 2 - a.left - a.width / 2) * 0.35, dy = (b.top + b.height / 2 - a.top - a.height / 2) * 0.35;
          if (BQ.reduced()) return;
          c.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0,0)' }], { duration: 400, easing: 'ease-in-out' });
        }
        function attempt(c, slot, fromDrag) {
          if (!live() || c.classList.contains('done')) return;
          rec.moves++;
          const t = c._t;
          if (sel) { sel.classList.remove('sel'); sel = null; }
          board.classList.remove('t15-slots-armed');
          if (slot.dataset.s !== t.slot) {
            // wrong_slot — البطاقة تعود بلطف — لا صوت
            BQ.audio.stop();
            if (fromDrag) goBack(c); else nudgeBack(c, slot);
            errs[t.id] = (errs[t.id] || 0) + 1;
            const right = slotEls[t.slot];
            right.classList.remove('hint1', 'hint2'); void right.offsetWidth;
            if (errs[t.id] === 1) right.classList.add('hint1');
            else if (errs[t.id] === 2) right.classList.add('hint2');
            else { rec.assisted.push(t.id); later(() => place(c, right, true), 450); }
            later(() => right.classList.remove('hint1', 'hint2'), 3200);
            return;
          }
          place(c, slot, false);
        }
        async function place(c, slot, auto) {
          if (c.classList.contains('done')) return;
          c.classList.add('done'); c.classList.remove('sel', 'back');
          slot.classList.remove('hint1', 'hint2');
          // FLIP: من موضعها الحاليّ إلى الخانة
          const a = c.getBoundingClientRect();
          c.style.transform = '';
          slot.append(c);
          const b = c.getBoundingClientRect();
          if (!BQ.reduced()) c.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width})`, transformOrigin: '0 0' }, { transform: 'none', transformOrigin: '0 0' }], { duration: 400, easing: 'cubic-bezier(.3,.7,.3,1)' });
          c.setAttribute('aria-label', c._t.aria);
          c._home.style.visibility = 'hidden';
          slot.classList.add('filled');
          slot.append(h('span.tick', { 'aria-hidden': 'true' }, BQ.icon('check')));
          lines.querySelector('line[data-s="' + slot.dataset.s + '"]').classList.add('on');
          if (!BQ.reduced()) slot.animate([{ transform: 'translate(-50%,-50%) scale(1)' }, { transform: 'translate(-50%,-50%) scale(1.08)' }, { transform: 'translate(-50%,-50%) scale(1)' }], { duration: 200, delay: 380, easing: 'ease-out' });
          placed.add(c._t.id);
          const g2 = gen;
          BQ.audio.fx(SNAP, 0.8);
          await BQ.sleep(380); if (g2 !== gen) return;
          if (auto) { await say('bariq_L1-01_d1-FB_04_ar'); if (g2 !== gen) return; }
          await say(c._t.line); if (g2 !== gen) return;
          if (placed.size === 4) return complete();
          if (!auto) await bariq(stage, 'bariq_L1-01_fb-yes_ar');
          panel();
        }
        async function complete() {
          const g2 = gen;
          rec.completed = true;
          board.classList.add('full');
          mapState = true;
          await BQ.sleep(300); if (g2 !== gen) return;
          await bariq(stage, 'bariq_L1-01_fb-yes_ar'); if (g2 !== gen) return;
          // «تُعاد في الختام البنود التي احتاجت محاولة ثانية وحدها، مرّةً»
          const again = TILES.filter((t) => errs[t.id]);
          for (const t of again) {
            const s = slotEls[t.slot]; s.classList.add('hint2'); await say(t.line); s.classList.remove('hint2'); if (g2 !== gen) return;
          }
          panel();
          later(s2, 500);
        }
        // عرض اليد الشبحية: بطاقة شبحية تنتقل إلى خانة شبحية وتعود (لا تكشف جواباً)
        later(async () => {
          await say('bariq_L1-01_d1-EL03_03_ar'); if (!live() || BQ.reduced() || placed.size) return;
          const st0 = stage.getBoundingClientRect();
          const from0 = tray.getBoundingClientRect(), to0 = board.getBoundingClientRect();
          const from = { left: from0.left - st0.left, top: from0.top - st0.top, width: from0.width, height: from0.height };
          const to = { left: to0.left - st0.left, top: to0.top - st0.top, width: to0.width, height: to0.height };
          const gh = h('div.t15-ghost', { 'aria-hidden': 'true' }, BQ.icon('hand'));
          stage.append(gh);
          const x0 = from.left + from.width / 2 - 32, y0 = from.top + from.height / 2 - 32;
          const x1 = to.left + to.width / 2 - 32, y1 = to.top + to.height * 0.14 - 32;
          const an = gh.animate([
            { transform: `translate(${x0}px, ${y0}px)`, opacity: 0 }, { transform: `translate(${x0}px, ${y0}px)`, opacity: .9, offset: .15 },
            { transform: `translate(${x1}px, ${y1}px)`, opacity: .9, offset: .5 }, { transform: `translate(${x1}px, ${y1}px)`, opacity: .9, offset: .6 },
            { transform: `translate(${x0}px, ${y0}px)`, opacity: 0 }], { duration: 2600, easing: 'ease-in-out' });
          an.onfinish = () => gh.remove();
          gh.style.left = '0'; gh.style.top = '0';
        }, 400);
      }

      /* رسم حرّ «في بيتكم» (١٠–١٢) — يُحفظ في هذا المتصفّح فقط */
      function drawPad(slot) {
        const box = h('div.t15-drawbox');
        const cv = h('canvas', { width: 600, height: 600, 'aria-label': 'ارْسُمْ بِإِصْبَعِكَ' });
        const cx = cv.getContext('2d');
        let dn = false, last = null;
        const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 600, (e.clientY - r.top) / r.height * 600]; };
        cv.addEventListener('pointerdown', (e) => { dn = true; last = pos(e); cv.setPointerCapture(e.pointerId); });
        cv.addEventListener('pointermove', (e) => { if (!dn) return; const p = pos(e); cx.strokeStyle = getComputedStyle(stage).getPropertyValue('--ink') || 'currentColor'; cx.lineWidth = 14; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(last[0], last[1]); cx.lineTo(p[0], p[1]); cx.stroke(); last = p; });
        cv.addEventListener('pointerup', () => { dn = false; }); cv.addEventListener('pointercancel', () => { dn = false; });
        if (BQ.elGuard) BQ.elGuard(cv);
        const close = (save) => {
          if (save) {
            const url = cv.toDataURL('image/png');
            try { localStorage.setItem('bq-L1-01-d1-EL15-home', url); } catch (e) { /* تخزين غير متاح */ }
            slot.querySelectorAll('img.draw').forEach((i) => i.remove());
            slot.classList.add('drawn'); slot.append(h('img.draw', { src: url, alt: '' }));
          }
          box.remove();
        };
        box.append(h('div.t15-drawcard', null, h('div', { style: { display: 'flex', width: '40px', height: '40px', color: 'var(--ink)' } }, BQ.icon('home')), cv,
          h('div.row', null,
            h('button.bq-btn.ghost', { type: 'button', 'aria-label': 'امْسَحْ', onclick: () => cx.clearRect(0, 0, 600, 600) }, BQ.icon('replay')),
            h('button.bq-btn.ghost', { type: 'button', 'aria-label': 'إغلاق', onclick: () => close(false) }, BQ.icon('close')),
            h('button.bq-btn', { type: 'button', 'aria-label': 'تَمَّ', onclick: () => close(true) }, BQ.icon('check')))));
        stage.append(box);
      }

      /* ---------- ش٢ · الخريطة تدخل ذراعاً أولى في «بَوْصَلَةِ الأَصْواتِ» ---------- */
      function s2() {
        const oldBoard = stage.querySelector('.t15-board');
        const fromRect = oldBoard ? oldBoard.getBoundingClientRect() : null;
        const clone = oldBoard ? oldBoard.cloneNode(true) : null;
        const pristine = oldBoard ? oldBoard.cloneNode(true) : null;
        const g = reset(); const live = () => g === gen && K.alive();
        const wrap = h('div.t15.solo.t15-in');
        const comp = h('div.t15-compass', { role: 'img', 'aria-label': 'بَوْصَلَةُ الأَصْواتِ' });
        comp.append(h('span', { html: '<svg class="rose" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="34" fill="none" stroke="var(--c-page-bg)" stroke-width=".8" stroke-dasharray="2 2" opacity=".7"/>' +
          [0, 90, 180, 270].map((a) => `<path d="M50 50 L46 40 L50 20 L54 40 Z" fill="${a === 0 ? 'var(--c-brq)' : 'color-mix(in srgb, var(--c-page-bg) 55%, transparent)'}" transform="rotate(${a} 50 50)"/>`).join('') + '</svg>' }).firstChild);
        const ARMS = [{ x: 50, y: 15, first: true }, { x: 85, y: 50 }, { x: 50, y: 85 }, { x: 15, y: 50 }];
        const arms = ARMS.map((a) => h('div.t15-arm' + (a.first ? '.first' : ''), { style: { left: a.x + '%', top: a.y + '%' } }, a.first ? null : '⋯'));
        comp.append(...arms, h('span.t15-hub', { 'aria-hidden': 'true' }));
        wrap.append(comp, h('p.t15-caption', null, 'بَوْصَلَةُ الأَصْواتِ'));
        stage.append(h('div.sx-wrap', null, sxSteps(2, 1), wrap));
        ctx.instruction('');
        panel('<p>هذه أوّل ذراع في «بوصلة الأصوات»؛ تكتمل بعد الدرس الرابع.</p>');
        ctx.onReplay(() => say('bariq_L1-01_intro-1_16_ar'));
        advance = finish;
        const first = arms[0];
        const putMini = () => {
          if (!clone) return;
          const mini = pristine; mini.classList.remove('t15-in', 'full'); mini.classList.add('mini'); mini.removeAttribute('role'); mini.setAttribute('aria-hidden', 'true'); mini.inert = true;
          const size = first.clientWidth;
          mini.style.width = fromRect.width + 'px'; mini.style.height = fromRect.height + 'px';
          mini.style.transform = 'scale(' + (size / fromRect.width) + ')';
          first.replaceChildren(mini);
        };
        requestAnimationFrame(() => {
          if (!clone || BQ.reduced()) { putMini(); return; }
          // الخريطة تصغر وتنتقل إلى الذراع العليا
          const fly = clone; fly.classList.remove('t15-in'); fly.classList.add('t15-fly'); fly.setAttribute('aria-hidden', 'true'); fly.inert = true;
          const st0 = stage.getBoundingClientRect();
          fly.style.left = (fromRect.left - st0.left) + 'px'; fly.style.top = (fromRect.top - st0.top) + 'px'; fly.style.width = fromRect.width + 'px'; fly.style.height = fromRect.height + 'px';
          stage.append(fly);
          const to = first.getBoundingClientRect();
          void fly.offsetWidth;
          fly.style.transform = `translate(${to.left - fromRect.left}px, ${to.top - fromRect.top}px) scale(${to.width / fromRect.width})`;
          later(() => { fly.remove(); putMini(); }, 1050);
        });
        later(async () => {
          await say('bariq_L1-01_d1-EL03_02_ar'); if (!live()) return;
          await say('bariq_L1-01_intro-1_16_ar'); if (!live()) return;
          later(finish, 600);
        }, 1200);
      }
      function finish() {
        gen++; clearTimers(); BQ.audio.stop(); advance = null;
        stage.querySelectorAll('.bq-end').forEach((n) => n.remove());
        ctx.done();
        BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', note: 'أَوَّلُ ذِراعٍ في «بَوْصَلَةِ الأَصْواتِ»!', onReplay: () => s1() });
        panel();
      }

      s1();
    },
  });
  // Godot «رحلة الميم» · محطّة compass هي التجربة الأساسية؛ النسخة HTML أعلاه بديل آليّ أو برابط المعلّم «نسخة بلا Godot»
  if (BQ.ui.godotRender) {
    BQ.defs[ID].render = BQ.ui.godotRender('compass', BQ.defs[ID].render, {
      name: 'بوصلة الأصوات',
      // بعد اكتمال المحطّة: بطاقة الختام + «احفظ خريطة الطفل صورةً» في دليل المعلّم (الخريطة المكتملة واحدة دائماً)
      after(ctx, result, stage) {
        stage = stage || ctx.stage;
        if (typeof ctx.alive === 'function' && !ctx.alive()) return;
        MAPCACHE.url = null;
        const body = ctx.frame.querySelector('.elp-adult-body');
        if (body && !body.querySelector('.t15-save')) body.append(mapSaveBox(ctx.frame));
        BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', note: 'أَوَّلُ ذِراعٍ في «بَوْصَلَةِ الأَصْواتِ»!', onReplay: () => BQ.open(ID, { skipCover: true, history: 'replace' }) });
      },
    });
  }
})();
