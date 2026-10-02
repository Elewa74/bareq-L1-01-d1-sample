/* EL08 «فكّر وأجب» — gme-110 · ObservationButtons (غير مرصود)
   أربع شاشات بأربعة مستويات تفكير: استنتاج ← تعليل بالدليل ← توقّع ← رأي.
   كلّ جواب مقبول: لا صواب ولا خطأ؛ بعد أيّ لمس يُعرض الدليل (مشهد/صوت) ثم تعزيز بارق.
   شارة مستوى التفكير و«لماذا؟» بلغة البيت (٧–١٢) في دليل المعلّم وحده. تصميم v2: محتوى صفحة داخل المسرح.
   v0-8: ٤–٦ سؤالان فقط (س٢ أوّلاً ثم س٤)؛ ٧–١٢ الأربعة · بلا إنجليزية ولا رموز داخلية · مؤشّر الخطوات الموحّد. */
(function () {
  'use strict';
  const h = BQ.h;
  const ID = 'EL08';
  const S = '.elp[data-el="EL08"]';
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
  if (!document.getElementById('st-EL08v2')) {
    const st = document.createElement('style');
    st.id = 'st-EL08v2';
    st.textContent = `
${S} .t8-row { display: flex; align-items: center; justify-content: center; gap: clamp(18px, 5cqi, 48px); width: 100%; min-width: 0; }
${S} .t8-compass { width: clamp(200px, 40cqi, 360px); aspect-ratio: 1; }
${S} .t8-compass img.b { opacity: 0; transform: scale(1.06); }
${S} .t8-compass.rev img.a { opacity: 0; }
${S} .t8-compass.rev img.b { opacity: 1; transform: none; }
${S} .t8-who { display: grid; gap: 12px; justify-items: center; min-width: 0; }
${S} .t8-frames { display: flex; gap: clamp(10px, 2cqi, 18px); }
${S} .t8-fr { width: clamp(92px, 15cqi, 140px); aspect-ratio: 3 / 4; background: radial-gradient(90% 70% at 50% 30%, var(--white), var(--sky-wash)); }
${S} .t8-fr > img { object-fit: cover; object-position: 50% 3%; }
${S} .t8-fr[data-id="BRQ"] > img { object-fit: contain; object-position: 50% 30%; inset: 8%; width: 84%; height: 84%; }
${S} .t8-fr.is-glow { animation: t8Bob .9s ease-in-out infinite; }
@keyframes t8Bob { 50% { transform: translateY(-6px); } }
/* س٢ */
${S} .t8-mouth { width: clamp(150px, 36cqi, 330px); aspect-ratio: 1; }
${S} .t8-lips { position: absolute; left: 33%; width: 34%; top: 32%; height: 2.6%; border-radius: 99px; background: var(--sun-soft); box-shadow: 0 0 12px 4px var(--sun); opacity: 0; z-index: 1; }
${S} .t8-mouth.hum > img { animation: t8Hum .38s ease-in-out infinite; }
${S} .t8-mouth.hum .t8-lips { opacity: 1; animation: t8Glow 1s ease-in-out infinite; }
@keyframes t8Hum { 50% { transform: scale(1.02); } }
@keyframes t8Glow { 50% { opacity: .45; } }
/* س٣ */
${S} .t8-room { width: min(100%, 820px); aspect-ratio: 16 / 9; }
/* v0-12: الصور تصغر بارتفاع الإطار فلا يخرج «التّالي» (٧٢٠/٧٦٨) */
${S} .t8-compass, ${S} .t8-mouth { max-width: max(140px, calc(var(--play-h, 700px) - 260px)); }
${S} .t8-room { max-width: max(280px, calc((var(--play-h, 700px) - 250px) * 16 / 9)); }
${S} .t8-snd { max-width: max(96px, calc(var(--play-h, 700px) - 360px)); }
${S} .t8-room img.b { opacity: 0; }
${S} .t8-room.rev img.a { opacity: 0; }
${S} .t8-room.rev img.b { opacity: 1; }
${S} .t8-zone { position: absolute; border: 3px dashed color-mix(in srgb, var(--white) 88%, transparent); border-radius: 16px; background: color-mix(in srgb, var(--white) 8%, transparent); cursor: pointer; padding: 0; min-width: 44px; min-height: 44px; transition: background .3s, opacity .4s; animation: t8Breath 2.4s ease-in-out infinite; z-index: 1; }
@media (hover: hover) { ${S} .t8-zone:hover { background: color-mix(in srgb, var(--white) 22%, transparent); } }
${S} .t8-zone:focus-visible { outline: 4px solid var(--navy); outline-offset: 2px; }
${S} .t8-zone.is-picked { border-style: solid; border-color: var(--navy); box-shadow: 0 0 0 3px var(--white); background: color-mix(in srgb, var(--white) 18%, transparent); animation: none; }
${S} .t8-zone .sx-pin { top: 50%; left: 50%; transform: translate(-50%, -50%); inset-inline-start: auto; }
${S} .t8-room.settled .t8-zone:not(.is-picked), ${S} .t8-room.rev .t8-zone { opacity: 0; pointer-events: none; }
@keyframes t8Breath { 50% { border-color: color-mix(in srgb, var(--white) 45%, transparent); } }
${S} .t8-cmp { position: absolute; left: 46.5%; top: 5%; width: 17%; aspect-ratio: 1; pointer-events: none; filter: drop-shadow(0 6px 10px color-mix(in srgb, var(--navy) 40%, transparent)); transition: opacity .6s, transform .6s; z-index: 2; }
${S} .t8-cmp svg { width: 100%; height: 100%; display: block; }
${S} .t8-needle { transform-origin: 50px 50px; }
${S} .t8-cmp.spin .t8-needle { animation: t8Spin 1.1s linear infinite; }
@keyframes t8Spin { to { transform: rotate(360deg); } }
${S} .t8-room.rev .t8-cmp { opacity: 0; transform: scale(.7); }
${S} .t8-bowl { position: absolute; left: 17%; top: 68%; width: 27%; height: 20%; border-radius: 50%; border: 4px solid var(--sun-soft); box-shadow: 0 0 20px var(--sun); opacity: 0; transition: opacity .5s; pointer-events: none; z-index: 2; }
${S} .t8-room.rev .t8-bowl { opacity: 1; animation: t8Glow 1.2s ease-in-out 3; }
/* س٤ */
${S} .t8-ops { display: flex; gap: clamp(14px, 4cqi, 36px); justify-content: center; align-items: flex-start; }
${S} .t8-op { display: grid; justify-items: center; gap: 14px; transition: opacity .4s, transform .4s; }
${S} .t8-snd { width: clamp(96px, 25cqi, 230px); aspect-ratio: 1; touch-action: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
${S} .t8-snd.is-playing { box-shadow: 0 0 0 4px var(--sky-ink, var(--navy)), 0 12px 24px var(--shade); }
${S} .t8-ring { position: absolute; inset: 0; pointer-events: none; background: conic-gradient(var(--sun) calc(var(--p, 0) * 1%), transparent 0); -webkit-mask: radial-gradient(closest-side, transparent 90%, #000 91%); mask: radial-gradient(closest-side, transparent 90%, #000 91%); opacity: 0; z-index: 1; }
${S} .t8-snd.pressing .t8-ring { opacity: 1; }
${S} .t8-heart { width: clamp(48px, 7cqi, 60px); aspect-ratio: 1; border-radius: 50%; border: 1.5px solid var(--sky-line); background: var(--white); color: var(--coral); display: grid; place-items: center; cursor: pointer; padding: 0; box-shadow: 0 4px 12px var(--shade); transition: transform .2s, background .2s; }
${S}.sx-a46 .t8-heart { width: 60px; }
${S} .t8-heart svg { width: 52%; height: 52%; }
@media (hover: hover) { ${S} .t8-heart:hover { transform: scale(1.06); } }
${S} .t8-heart:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
${S} .t8-op.chosen { transform: scale(1.06); }
${S} .t8-op.chosen .t8-heart { background: var(--coral); border-color: var(--coral); color: var(--white); }
${S} .t8-ops.done .t8-op:not(.chosen) { opacity: .6; }
${S} .t8-ops.done .t8-heart { pointer-events: none; }
${S} .bq-adult .t8-badge { display: inline-block; background: var(--navy); color: var(--sun-soft); border-radius: 999px; padding: 3px 14px; font: 600 13.5px/1.6 var(--ff-ui); }
${S} .bq-adult .t8-why { background: color-mix(in srgb, var(--sun-soft) 45%, var(--white)); border-radius: var(--r-sm); padding: 8px 12px; }
${S} .bq-adult .t8-rec { display: flex; gap: 8px; margin: 4px 0 12px; flex-wrap: wrap; }
${S} .bq-adult .t8-rec .bq-btn { font-size: 15px; min-height: 44px; }
@container stage (max-width: 560px) {
  ${S} .t8-row { flex-direction: column; gap: 18px; }
  ${S} .t8-compass { width: min(100%, 250px); }
  ${S} .t8-fr { width: calc((100cqi - 72px) / 3); }
  ${S} .t8-row.two { flex-direction: row; gap: 12px; }
  ${S} .t8-mouth { width: calc((100cqi - 44px) / 2); }
  ${S} .t8-ops { gap: 8px; }
  ${S} .t8-snd { width: calc((100cqi - 52px) / 3); }
}
@media (prefers-reduced-motion: reduce) {
  ${S} .t8-fr.is-glow, ${S} .t8-mouth.hum > img, ${S} .t8-mouth.hum .t8-lips, ${S} .t8-zone, ${S} .t8-room.rev .t8-bowl { animation: none !important; }
  ${S} .t8-op, ${S} .t8-cmp { transition: none; }
  ${S} .t8-op.chosen { transform: none; }
}`;
    document.head.append(st);
  }

  const HEART = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 41S6 30 6 17.5A9.5 9.5 0 0 1 24 12a9.5 9.5 0 0 1 18 5.5C42 30 24 41 24 41z" fill="currentColor"/></svg>';
  const SND = { 'img-001': 'bariq_L1-01_sfx-water-pour-1s', 'img-007': 'bariq_L1-01_sfx-door-knock', 'img-101': 'bariq_L1-01_snd-m_ar' };
  const SND_AR = { 'img-001': 'صوت الماء', 'img-007': 'صوت الطَّرق', 'img-101': '«مْـ» من فم سيف' };

  // الأسئلة الأربعة (مستويات التفكير). ٤–٦: سؤال «أين صوت الميم؟» أوّلاً ثم «أيّ صوت لك؟» فقط؛ ٧–١٢: الأربعة بالترتيب.
  const Q = [
    { level: 'استنتاج', line: 'bariq_L1-01_d1-EL08_01_ar', text: 'هَذِهِ بَوْصَلَةُ مَنْ؟',
      adult: 'دعه يقول أو يشير؛ كلّ جواب مقبول. بعد جوابه يُسمَع سيف ويظهر وهو يفتح البوصلة.',
      why: 'اسأله بلغة البيت: <b>كيف عرفت؟</b> القرينة: البوصلة النحاسية بخيطها الجلديّ هي التي فتحها سيف في المقطع.',
      a79: 'شجّعه أن يجيب بكلمة («سَيْف»).' },
    { level: 'تعليل بالدليل', line: 'bariq_L1-01_d1-EL08_02_ar', text: 'أَيْنَ صَوْتُ الميمِ؟',
      adult: 'اسأل ولا تُطبق شفتيك وأنت تسأل. بعد أيّ اختيار يُسمَع «مْـ» من الفم المطبق.',
      why: 'اسأله بلغة البيت: <b>لماذا هذا الفم؟</b> الدليل: الشفتان تنطبقان في «مْـ» (يلمع خطّ ملتقاهما).',
      a79: 'دعه يجرّب «مْـ» ويلمس شفتيه.' },
    { level: 'توقّع', line: 'bariq_L1-01_L2-recall_01_ar', text: 'هَيّا: أَيْنَ الماءُ؟',
      adult: 'دعه يتوقّع قبل أن تقف الإبرة؛ أيّ جواب مقبول، المهمّ أن يتوقّع ثم يرى.',
      why: 'اسأله بلغة البيت: <b>لماذا توقّعت هذا المكان؟</b> ثم: أين ظهر الماء؟', a79: '' },
    { level: 'رأي', line: 'bariq_L1-01_d1-EL08_03_ar', text: 'أَيُّ صَوْتٍ لَكَ؟',
      adult: 'لا جواب خاطئ: اللمسة القصيرة تُسمِع الصوت، واللمسة المطوّلة أو زرّ القلب تختاره.',
      why: 'اسأله بلغة البيت: <b>لماذا اخترت هذا الصوت؟</b> واسمع تعليله — كلامك أنت لا نصّ الدرس.',
      a79: '' },
  ];

  BQ.register(ID, {
    hero: 'img-103',
    cover: 'أسئلة تفكير قصيرة، وكلّ جواب مقبول؛ بعده يرى الطفل الدليل.',
    render(stage, ctx) {
      const age = ctx.age();
      const K = sxKit(ctx);
      const say = K.say, bariq = K.bariq;
      const ORDER = age === '4-6' ? [1, 3] : [0, 1, 2, 3];
      let gen = 0;
      const timers = new Set();
      const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (K.alive()) fn(); }, ms); timers.add(t); return t; };
      const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
      const log = Q.map(() => ({ answered: null, choice: null, replays: 0 }));
      ctx.onCleanup(() => { gen++; clearTimers(); });
      const adultBtn = sxAdultTool(ctx.frame);
      const noteAdult = (on) => adultBtn && adultBtn.classList.toggle('sx-has-note', !!on);

      function adultPanel(i, opt) {
        opt = opt || {};
        const q = Q[i];
        const ageLine = age === '4-6' ? 'الإشارة جواب كامل؛ لا حدّ لوقت الجواب، ويُعاد السؤال مرّة بعد ست ثوانٍ.'
          : age === '10-12' ? 'اطلب «لماذا؟» شفهياً بلغة البيت؛ كلامك أنت لا نصّ الدرس.'
          : q.a79 || 'شجّعه أن يجيب بكلمة.';
        const recNote = i === 3 ? 'إن أجاب بكلمة أو إشارة ولم يلمس، المس «أجاب» ليظهر زرّ «التّالي».' : 'إن أجاب بكلمة أو إشارة ولم يلمس، المس «أجاب» ليظهر الدليل.';
        K.adult('<p>' + q.adult + '</p>' +
          (opt.why && age !== '4-6' ? '<p class="t8-why">' + q.why + '</p>' : '') +
          '<p style="margin-bottom:0">' + recNote + '</p><div class="t8-slot"></div>',
          '<p><span class="t8-badge">مستوى التفكير: ' + q.level + '</span></p>' +
          '<p><b>عمر ' + sxAR(age.replace('-', '–')) + ' سنوات:</b> ' + ageLine + '</p>' +
          '<p>أسئلة تفكير غير مرصودة: لا صواب ولا خطأ، والدليل يظهر بعد أيّ جواب. يُسجَّل لكلّ سؤال: أجاب أو لم يُجب، واختياره، ومرّات إعادة السؤال.</p>' +
          (age === '4-6' ? '<p>لعمر ٤–٦ سؤالان فقط: «أين صوت الميم؟» ثم «أيّ صوت لك؟». سؤالا البوصلة والتوقّع لعمر ٧ فما فوق.</p>' : ''));
        const slot = ctx.frame.querySelector('.t8-slot');
        if (!slot) return;
        const row = h('div.t8-rec', { role: 'group', 'aria-label': 'تسجيل اختياريّ' });
        const mk = (v, ar) => {
          const b = h('button.bq-btn' + (log[i].answered === v ? '' : '.ghost'), { type: 'button', 'aria-pressed': String(log[i].answered === v) }, ar);
          b.addEventListener('click', () => {
            log[i].answered = v;
            row.querySelectorAll('button').forEach((x) => { const on = x === b; x.setAttribute('aria-pressed', String(on)); x.classList.toggle('ghost', !on); });
            if (opt.onAnswer) opt.onAnswer(v);
          });
          return b;
        };
        row.append(mk(true, 'أجاب'), mk(false, 'لم يُجب'));
        slot.append(row);
        if (opt.why && age !== '4-6') noteAdult(true);
      }

      function scaffold(p) {
        const wrap = h('div.sx-wrap');
        const main = h('div.t8-row');
        const foot = h('div.sx-actions');
        wrap.append(sxSteps(ORDER.length, p), main, foot);
        stage.append(wrap);
        return { wrap, main, foot };
      }
      function nextBtn(foot, p) {
        if (foot.querySelector('.bq-btn')) return;
        const last = p === ORDER.length - 1;
        const b = h('button.bq-btn.sx-in', { type: 'button', onclick: () => (last ? finish() : go(p + 1)) }, last ? 'أَنْهَيْتُ' : 'التّالي', BQ.icon(last ? 'check' : 'next'));
        foot.replaceChildren(b);
        b.focus({ preventScroll: true });
      }
      function ask(i, g) {
        const q = Q[i];
        ctx.instruction(q.text);
        const replay = () => { log[i].replays++; return say(q.line); };
        ctx.onReplay(replay);
        return { arm(isDone) { if (age === '4-6') later(() => { if (g === gen && !isDone()) say(q.line); }, 6000); } };
      }
      const pin = () => h('span.sx-pin', { 'aria-hidden': 'true' }, BQ.icon('hand'));

      /* ---------- س١ · استنتاج ---------- */
      function s1(i, p) {
        const g = gen; const live = () => g === gen && K.alive();
        const { main, foot } = scaffold(p);
        const card = h('div.sx-photo.t8-compass.sx-in', { role: 'img', 'aria-label': 'بَوْصَلَةٌ' },
          h('img.a', { src: BQ.img('img-103'), alt: '' }), h('img.b', { src: BQ.img('img-008'), alt: '' }));
        const chars = BQ.shuffle([{ id: 'MAJ', src: BQ.char.MAJ, aria: 'ماجِد' }, { id: 'BRQ', src: BQ.char.BRQ, aria: 'بارِق' }, { id: 'SAY', src: BQ.char.SAY, aria: 'سَيْف' }]);
        const frames = h('div.t8-frames', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
        const btns = chars.map((c, k) => {
          const b = h('button.bq-choice.sx-photo.t8-fr.sx-in', { type: 'button', 'aria-label': c.aria, style: { animationDelay: (0.15 + k * 0.1) + 's' }, onclick: () => pick(c, b) },
            h('img', { src: c.src, alt: '', draggable: 'false' }));
          b.dataset.id = c.id; return b;
        });
        frames.append(...btns);
        main.append(card, h('div.t8-who', null, frames));
        let shown = false;
        const a = ask(i, g);
        adultPanel(i, { onAnswer: () => evidence() });
        later(async () => { await say(Q[i].line); if (live()) a.arm(() => shown); }, 350);
        function pick(c, b) {
          if (shown) return;
          log[i].choice = c.id; if (log[i].answered == null) log[i].answered = true;
          b.classList.add('is-picked');
          evidence(b);
        }
        async function evidence(picked) {
          if (shown) return; shown = true;
          BQ.audio.stop();
          btns.forEach((x) => { x.disabled = true; if (x !== picked) x.classList.add('is-dim'); });
          await BQ.sleep(500); if (!live()) return;
          card.classList.add('rev'); // الدليل: يدا سيف تفتحان البوصلة
          await say('bariq_L1-01_sfx-compass'); if (!live()) return;
          const saif = btns.find((x) => x.dataset.id === 'SAY');
          saif.classList.remove('is-dim'); saif.classList.add('is-glow');
          await say('bariq_L1-01_intro-1_03_ar'); if (!live()) return;
          saif.classList.remove('is-glow');
          await bariq(stage, 'bariq_L1-01_fb-yes_ar'); if (!live()) return;
          adultPanel(i, { why: true });
          nextBtn(foot, p);
        }
      }

      /* ---------- س٢ · تعليل بالدليل ---------- */
      function s2(i, p) {
        const g = gen; const live = () => g === gen && K.alive();
        const { main, foot } = scaffold(p);
        main.classList.add('two');
        main.setAttribute('role', 'group'); main.setAttribute('aria-label', 'صُوَرٌ لِلاخْتِيارِ');
        const btns = BQ.shuffle(['img-101', 'img-102']).map((id, k) => {
          const b = h('button.bq-choice.sx-photo.t8-mouth.sx-in', { type: 'button', 'aria-label': 'فَمٌ', style: { animationDelay: (k * 0.12) + 's' }, onclick: () => pick(id, b) },
            h('img', { src: BQ.img(id), alt: '', draggable: 'false' }), id === 'img-101' ? h('span.t8-lips', { 'aria-hidden': 'true' }) : null);
          b.dataset.id = id; return b;
        });
        main.append(...btns);
        let shown = false;
        const a = ask(i, g);
        adultPanel(i, { onAnswer: () => evidence() });
        later(async () => { await say(Q[i].line); if (live()) a.arm(() => shown); }, 350);
        function pick(id, b) {
          if (shown) return;
          log[i].choice = id; if (log[i].answered == null) log[i].answered = true;
          b.classList.add('is-picked');
          evidence();
        }
        async function evidence() {
          if (shown) return; shown = true;
          BQ.audio.stop();
          btns.forEach((x) => { x.disabled = true; });
          await BQ.sleep(500); if (!live()) return;
          // الدليل: الفم المطبق يهمهم «مْـ» ويلمع خطّ ملتقى الشفتين
          const closed = btns.find((x) => x.dataset.id === 'img-101');
          btns.find((x) => x.dataset.id === 'img-102').classList.add('is-dim');
          closed.classList.add('hum', 'is-glow');
          await say('bariq_L1-01_snd-m_ar'); if (!live()) return;
          await BQ.sleep(250);
          closed.classList.remove('is-glow');
          await say('bariq_L1-01_d1-EL03_01_ar'); if (!live()) return;
          closed.classList.remove('hum');
          ctx.onReplay(() => { closed.classList.add('hum'); say('bariq_L1-01_snd-m_ar').then(() => closed.classList.remove('hum')); });
          adultPanel(i, { why: true });
          nextBtn(foot, p);
        }
      }

      /* ---------- س٣ · توقّع ---------- */
      function s3(i, p) {
        const g = gen; const live = () => g === gen && K.alive();
        const { main, foot } = scaffold(p);
        const room = h('div.sx-photo.t8-room.sx-in', null, h('img.a', { src: BQ.img('img-119'), alt: '' }), h('img.b', { src: BQ.img('img-120'), alt: '' }));
        const ZONES = [
          { id: 'curtain', aria: 'السِّتارَةُ', l: 3, t: 2, w: 33, h: 62 },
          { id: 'table', aria: 'الطّاوِلَةُ', l: 52, t: 40, w: 16, h: 40 },
          { id: 'door', aria: 'مَصْدَرُ صَوْتٍ', l: 73, t: 8, w: 24, h: 72 },
        ];
        const zones = ZONES.map((z) => {
          const b = h('button.t8-zone', { type: 'button', 'aria-label': z.aria, style: { left: z.l + '%', top: z.t + '%', width: z.w + '%', height: z.h + '%' }, onclick: () => pick(z, b) });
          b.dataset.id = z.id; return b;
        });
        const cmp = h('div.t8-cmp.spin', { 'aria-hidden': 'true', html:
          '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="var(--tile)" stroke="var(--paper-edge)" stroke-width="3"/><circle cx="50" cy="50" r="39" fill="var(--paper)"/>' +
          [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<line x1="50" y1="${a % 90 ? 15 : 13}" x2="50" y2="19" stroke="var(--navy)" stroke-width="${a % 90 ? 1.6 : 3}" stroke-linecap="round" transform="rotate(${a} 50 50)"/>`).join('') +
          '<g class="t8-needle"><path d="M50 16 L56.5 50 L43.5 50 Z" fill="var(--coral)"/><path d="M50 84 L56.5 50 L43.5 50 Z" fill="var(--navy)"/></g><circle cx="50" cy="50" r="5" fill="var(--sun-soft)" stroke="var(--navy)" stroke-width="2"/></svg>' });
        room.append(...zones, cmp, h('span.t8-bowl', { 'aria-hidden': 'true' }));
        room.setAttribute('role', 'group'); room.setAttribute('aria-label', 'صُوَرٌ لِلاخْتِيارِ');
        main.append(room);
        let chosen = false;
        const a = ask(i, g);
        adultPanel(i, { onAnswer: () => settle() });
        const needle = cmp.querySelector('.t8-needle');
        later(async () => {
          await say('bariq_L1-01_sfx-needle'); if (!live() || chosen) return;
          await say(Q[i].line); if (live()) a.arm(() => chosen);
        }, 300);
        function pick(z, b) {
          if (chosen) return;
          log[i].choice = z.id; if (log[i].answered == null) log[i].answered = true;
          b.classList.add('is-picked'); b.append(pin());
          settle();
        }
        async function settle() {
          if (chosen) return; chosen = true;
          BQ.audio.stop();
          zones.forEach((x) => { x.disabled = true; });
          // الإبرة تبطئ وتستقرّ نحو الستارة
          const m = getComputedStyle(needle).transform;
          let ang = 0;
          const v = m && m.match(/matrix\(([^)]+)\)/);
          if (v) { const [a1, b1] = v[1].split(',').map(parseFloat); ang = Math.atan2(b1, a1) * 180 / Math.PI; }
          cmp.classList.remove('spin');
          needle.style.transform = 'rotate(' + ang + 'deg)';
          void needle.getBoundingClientRect();
          const target = 261;
          const end = BQ.reduced() ? target : ang + 360 + (((target - ang) % 360) + 360) % 360;
          needle.style.transition = BQ.reduced() ? 'none' : 'transform 1.6s cubic-bezier(.15,.75,.25,1)';
          needle.style.transform = 'rotate(' + end + 'deg)';
          say('bariq_L1-01_sfx-needle');
          await BQ.sleep(BQ.reduced() ? 300 : 1700); if (!live()) return;
          room.classList.add('settled');
          await BQ.sleep(500); if (!live()) return;
          room.classList.add('rev'); // تنفتح الستارة فيظهر الصحن
          await say('bariq_L1-01_sfx-curtain'); if (!live()) return;
          await say('bariq_L1-01_d1-scr06_01_ar'); if (!live()) return;
          ctx.onReplay(() => say('bariq_L1-01_d1-scr06_01_ar'));
          adultPanel(i, { why: true });
          nextBtn(foot, p);
        }
      }

      /* ---------- س٤ · رأي ---------- */
      function s4(i, p) {
        const g = gen; const live = () => g === gen && K.alive();
        const { main, foot } = scaffold(p);
        const ops = h('div.t8-ops', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
        let chosen = null;
        BQ.shuffle(['img-001', 'img-007', 'img-101']).forEach((id, k) => {
          const card = h('button.bq-choice.sx-photo.t8-snd.sx-in', { type: 'button', 'aria-label': 'اسْمَعْ', style: { animationDelay: (k * 0.1) + 's' } },
            h('img', { src: BQ.img(id), alt: '', draggable: 'false' }), h('span.t8-ring', { 'aria-hidden': 'true' }));
          const col = h('div.t8-op', null, card);
          col.append(h('button.t8-heart', { type: 'button', 'aria-label': 'هَذا', html: HEART, onclick: () => choose(id, col, card) }));
          // لمسة قصيرة = اسمع · مطوّلة ≥ ٥٠٠ مللي ث = اختيار
          let t0 = 0, raf = 0, longDone = false, pid = null;
          const stopRing = () => { cancelAnimationFrame(raf); card.classList.remove('pressing'); card.style.removeProperty('--p'); };
          card.addEventListener('pointerdown', (e) => {
            if (chosen) return; pid = e.pointerId; t0 = performance.now(); longDone = false; card.classList.add('pressing');
            const tick = () => { const pr = Math.min(100, (performance.now() - t0) / 5); card.style.setProperty('--p', pr); if (pr >= 100) { longDone = true; stopRing(); choose(id, col, card); } else raf = requestAnimationFrame(tick); };
            raf = requestAnimationFrame(tick);
          });
          const cancel = () => { if (pid == null) return; pid = null; stopRing(); };
          ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => card.addEventListener(ev, cancel));
          card.addEventListener('contextmenu', (e) => e.preventDefault());
          card.addEventListener('click', () => { if (longDone) { longDone = false; return; } if (!chosen) play(id, card); });
          ops.append(col);
        });
        main.append(ops);
        const a = ask(i, g);
        // المعلّم يلمس «أجاب» أو «لم يُجب» حين يجيب الطفل بلا لمس ← يظهر «التّالي» (الاختيار: لا شيء)
        adultPanel(i, { onAnswer: () => { if (!chosen && live()) nextBtn(foot, p); } });
        later(async () => { await say(Q[i].line); if (live()) a.arm(() => !!chosen); }, 350);
        function play(id, card) {
          ops.querySelectorAll('.t8-snd').forEach((c) => c.classList.remove('is-playing'));
          card.classList.add('is-playing');
          say(SND[id]).then(() => card.classList.remove('is-playing'));
        }
        async function choose(id, col, card) {
          if (chosen) return; chosen = id;
          log[i].choice = id; if (log[i].answered == null) log[i].answered = true;
          col.classList.add('chosen'); ops.classList.add('done'); card.classList.add('is-picked');
          ops.querySelectorAll('.t8-snd').forEach((c) => { c.disabled = true; });
          await say(SND[id]); if (!live()) return; // الصورة المختارة تكبر ويُعاد صوتها
          await bariq(stage, 'bariq_L1-01_fb-yes_ar'); if (!live()) return;
          ctx.onReplay(() => say(SND[id]));
          adultPanel(i, { why: true });
          const why = ctx.frame.querySelector('.bq-adult .t8-why');
          if (why) why.append(h('br'), 'اختار: ' + SND_AR[id] + '.');
          nextBtn(foot, p);
        }
      }

      const SCREENS = [s1, s2, s3, s4];
      function go(p) {
        gen++; clearTimers(); BQ.audio.stop(); noteAdult(false);
        stage.replaceChildren();
        SCREENS[ORDER[p]](ORDER[p], p);
      }
      function finish() {
        gen++; clearTimers(); BQ.audio.stop(); noteAdult(false);
        ctx.done();
        BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', onReplay: () => go(0) });
      }
      go(0);
    },
  });
})();
