/* EL10 «تحدّث» — gme-113 · ObservationButtons (غير مرصود آلياً)
   بنية «تحدّث» المألوفة: بند · نقاط · التالي. ثلاثة بنود بترتيب ثابت (عبارة في موقف ← «مْـ» ← «مْـ… ماء.»):
   نموذج ← سكتة بحسب العمر (٤/٣/٢ ث) ← المعلّم يلمس درجة من ثلاث في شريط المعلّم ← الطفل يلوّن دائرة ✓ بلمسة.
   لا ميكروفون ولا تسجيل ولا حكم آليّ على النطق. الانتقال بلا لمسة المعلّم يُسجَّل «لم تُلاحَظ». تصميم v2. */
(function () {
  'use strict';
  const h = BQ.h;
  const ID = 'EL10';
  const S = '.elp[data-el="EL10"]';
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

  if (!document.getElementById('st-EL10v2')) {
    const st = document.createElement('style');
    st.id = 'st-EL10v2';
    st.textContent = `
${S} .t10-spread { position: relative; width: min(100%, 780px); }
${S} .t10-scene { width: 100%; aspect-ratio: 16 / 9; }
${S} .t10-polaroid { position: absolute; width: clamp(96px, 24cqi, 200px); aspect-ratio: 1; bottom: -18px; inset-inline-end: -10px; transform: rotate(4deg); transition: transform .4s, box-shadow .3s; }
${S} .t10-polaroid.is-lit { transform: rotate(0) scale(1.06); }
${S} .t10-qbadge { position: absolute; top: 14px; inset-inline-end: 14px; width: clamp(52px, 9cqi, 76px); aspect-ratio: 1; border-radius: 50%; background: var(--white); color: var(--navy); display: grid; place-items: center; box-shadow: 0 6px 16px var(--shade); animation: t10Wig 2.2s ease-in-out infinite; z-index: 1; }
${S} .t10-qbadge .bq-ic { width: 56%; height: 56%; }
${S} .t10-pics { display: flex; gap: clamp(12px, 3cqi, 28px); justify-content: center; }
${S} .t10-sq { width: clamp(120px, 28cqi, 250px); aspect-ratio: 1; }
${S} .t10-big { width: clamp(170px, 38cqi, 320px); aspect-ratio: 1; }
/* v0-12: الصور تصغر بارتفاع الإطار (شاشات ٧٢٠–٨٢٠) فيبقى شريط ملاحظة المعلّم و«البند التالي» داخل الإطار */
${S} .t10-sq, ${S} .t10-big { max-width: max(110px, calc(var(--play-h, 700px) - 450px)); }
${S} .t10-spread { max-width: max(300px, calc((var(--play-h, 700px) - 230px) * 16 / 9)); }
@media (max-height: 840px) {
  ${S} .sx-wrap { gap: 12px; }
  ${S} .t10-dock { min-height: 0; }
  ${S} .t10-dock .sx-hear { width: 76px; }
  ${S} .t10-sq, ${S} .t10-big { max-width: max(104px, calc(var(--play-h, 700px) - 470px)); }
}
${S} .t10-shape { position: absolute; top: 10px; inset-inline-start: 10px; width: clamp(34px, 7cqi, 54px); aspect-ratio: 1; display: grid; place-items: center; background: var(--white); border-radius: 12px; color: var(--navy); box-shadow: 0 3px 10px var(--shade); z-index: 1; }
${S} .t10-shape svg { width: 72%; height: 72%; }
${S} .t10-mirror { position: absolute; bottom: 10px; inset-inline-end: 10px; width: clamp(34px, 7cqi, 54px); aspect-ratio: 1; border-radius: 50%; background: linear-gradient(135deg, var(--white), var(--c-word-card) 55%, var(--sky-2)); border: 4px solid var(--tile); box-shadow: 0 3px 10px var(--shade); z-index: 1; }
${S} .t10-lipshot { position: absolute; inset: 0; opacity: 0; transition: opacity .35s; overflow: hidden; }
${S} .t10-lipshot img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.9); transform-origin: 50% 30%; }
${S} .sx-photo.lip .t10-lipshot { opacity: 1; }
${S} .t10-dock { display: flex; align-items: center; justify-content: center; gap: clamp(16px, 4cqi, 32px); min-height: 84px; }
${S} .t10-turn { position: relative; width: clamp(64px, 10cqi, 84px); aspect-ratio: 1; border-radius: 50%; background: var(--white); border: 1.5px solid var(--sky-line); display: grid; place-items: center; box-shadow: 0 4px 12px var(--shade); color: var(--navy); }
${S} .t10-turn img { width: 112%; margin-top: -6%; pointer-events: none; }
${S} .t10-turn > .bq-ic { width: 52%; height: 52%; }
${S} .t10-turn .t10-brq { width: 122%; margin-top: -14%; }
${S} .t10-turn .t10-duo { display: flex; gap: 4%; width: 74%; }
${S} .t10-turn .t10-duo .bq-ic { width: 50%; height: auto; aspect-ratio: 1; }
${S} .t10-turn.go::after { content: ""; position: absolute; inset: -9px; border-radius: 50%; border: 4px solid var(--sun); animation: bqRing 1.1s ease-out infinite; }
${S} .t10-check { width: clamp(64px, 10cqi, 84px); aspect-ratio: 1; border-radius: 50%; border: 4px dashed var(--ok); background: var(--white); color: var(--ok); display: grid; place-items: center; cursor: pointer; padding: 0; box-shadow: 0 4px 12px var(--shade); animation: sxIn .45s ease both, t10Wig 1.6s ease-in-out .5s infinite; }
${S} .t10-check .bq-ic { width: 56%; height: 56%; }
${S} .t10-check.on { border-style: solid; background: var(--ok); color: var(--white); animation: bqPop .35s ease-out; cursor: default; }
${S} .t10-check.on.help { background: color-mix(in srgb, var(--ok) 55%, var(--white)); }
${S} .t10-check:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
@keyframes t10Wig { 0%, 70%, 100% { transform: scale(1); } 80% { transform: scale(1.08); } 90% { transform: scale(.97); } }
${S} .t10-next.soft { background: var(--white); color: var(--navy); box-shadow: 0 0 0 1.5px var(--sky-line) inset; }
@container stage (max-width: 560px) {
  ${S} .t10-sq { width: calc((100cqi - 48px) / 2); }
  ${S} .t10-big { width: min(62cqi, 230px); }
  ${S} .t10-polaroid { width: 34cqi; bottom: -26px; inset-inline-end: -4px; }
}
/* v0-12: هاتف قصير (٣٦٠×٦٤٠): شريط ملاحظة المعلّم صفّ واحد مضغوط، والصور أصغر */
@container stage (max-width: 560px) {
  @media (max-height: 760px) {
    ${S} .sx-adult { flex-direction: row; padding: 8px; gap: 6px; }
    ${S} .sx-adult-tag > span { display: none; }
    ${S} .sx-adult button { font-size: 13px; padding: 4px; }
    ${S} .t10-sq { width: min(calc((100cqi - 48px) / 2), max(96px, calc(var(--play-h, 600px) - 400px))); }
    ${S} .t10-big { width: min(62cqi, max(110px, calc(var(--play-h, 600px) - 380px))); }
    ${S} .t10-dock .sx-hear { width: 64px; }
  }
}
@media (prefers-reduced-motion: reduce) {
  ${S} .t10-check, ${S} .t10-qbadge, ${S} .t10-turn.go::after { animation: none !important; }
  ${S} .t10-polaroid { transition: none; }
}`;
    document.head.append(st);
  }

  const SHAPE = {
    circle: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="5"/></svg>',
    square: '<svg viewBox="0 0 48 48"><rect x="9" y="9" width="30" height="30" rx="2" fill="none" stroke="currentColor" stroke-width="5"/></svg>',
  };
  // مقياس الملاحظة الموحّد (قرار ٥): الأزرار والتقرير والخطة بالصيغة نفسها
  const LV = {
    ind: { ar: 'قالَها وحدَه', rep: 'قالها وحده' },
    help: { ar: 'قالَها بمساعدة', rep: 'قالها بمساعدة' },
    none: { ar: 'لم يَقُلْها بعدُ', rep: 'لم يقلها بعد' },
    unobs: { rep: 'لم تُلاحَظ' },
  };
  // البنود الثلاثة بترتيب المواصفة (الموقف أوّلاً)
  const ITEMS = [
    { key: 'phrase', model: ['bariq_L1-01_sfx-water-pour-1s', 'bariq_L1-01_sfx-door-knock', 'bariq_L1-01_ins-same_ar'], after: ['bariq_L1-01_key_ar'],
      observe: 'يُسمَع الماء ثم الطرق ثم سؤال ماجد، فيقول الطفل «سَمِعْتُ فَرْقاً!» في دور بارق، وحده أو معك.' },
    { key: 'm', model: ['bariq_L1-01_snd-m_ar'], after: [],
      observe: '«مْـ» ممدودة والشفتان مطبقتان، بلا حركة بعدها. ليلمس شفتيه أو ينظر في المرآة: هل انطبقتا؟' },
    { key: 'maa', model: ['bariq_L1-01_vocab-w1_02_ar'], after: [],
      observe: 'يمدّ «مْـ» ثم يقول الكلمة «ماءْ» بميم واضحة.' },
  ];
  const NAMES = { phrase: 'العبارة في موقف', m: '«مْـ»', maa: '«مْـ… ماءْ.»' };
  const HOME = [
    'اسألوا معاً: «أَيْنَ الماءُ في بَيْتِكُمْ؟» — كلّ جواب مقبول: كلمة أو إشارة أو ذهاب إلى الماء.',
    'اصنع صوتين خلف ظهرك (صبّ ماء ثم طرق) واسأل: «هَلْ هُما صَوْتٌ واحِدٌ؟»، ودعه يقول «سَمِعْتُ فَرْقاً!».',
    'ورقة تتبّع «م» بالقلم في عنصر «اكتب» — اختيارية.',
  ];

  BQ.register(ID, {
    hero: 'img-028',
    cover: 'يسمع الطفل النموذج ثم يقول: «مْـ» · «ماءْ» · «سَمِعْتُ فَرْقاً!»، وأنت تلاحظ.',
    render(stage, ctx) {
      const age = ctx.age();
      const K = sxKit(ctx);
      const say = K.say, bariq = K.bariq;
      const PAUSE = age === '4-6' ? 4000 : age === '10-12' ? 2000 : 3000;
      let gen = 0;
      const timers = new Set();
      const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); if (K.alive()) fn(); }, ms); timers.add(t); return t; };
      const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
      const log = ITEMS.map((it) => ({ item: it.key, level: null, replays: 0 }));
      ctx.onCleanup(() => { gen++; clearTimers(); });
      const reset = () => { gen++; clearTimers(); BQ.audio.stop(); stage.replaceChildren(); return gen; };

      function logTable() {
        return '<table class="t10-log"><tr><th>البند</th><th>الملاحظة</th><th>إعادة النموذج</th></tr>' + log.map((l, k) =>
          '<tr><td>' + sxAR(k + 1) + ' · ' + NAMES[l.item] + '</td><td>' + (l.level ? LV[l.level].rep : '—') + '</td><td>' + sxAR(l.replays) + '</td></tr>').join('') + '</table>';
      }
      const ageNote = age === '4-6' ? 'سكتة الترديد أربع ثوانٍ، وجلوس المعلّم بجانبه ضروريّ؛ إن غاب تُسجَّل البنود «لم تُلاحَظ».'
        : age === '10-12' ? 'سكتة الترديد ثانيتان؛ إن عمل وحده تُسجَّل البنود «لم تُلاحَظ».' : 'سكتة الترديد ثلاث ثوانٍ.';
      function panel(body) {
        K.adult(K.pinned() + body,
          '<p><b>سجلّ الملاحظة</b></p>' + logTable() +
          '<p><b>عمر ' + sxAR(age.replace('-', '–')) + ' سنوات:</b> ' + ageNote + '</p>' +
          '<p>نشاط غير مرصود: لا يُسجَّل صوت الطفل ولا يُحكم على نطقه آلياً؛ ملاحظتك هي السجلّ. الانتقال بلا لمسة منك يُسجَّل «لم تُلاحَظ».</p>');
      }
      const refreshLog = () => { const tb = ctx.frame.querySelector('table.t10-log'); if (tb) tb.outerHTML = logTable(); };

      /* ---------- ش١ · افتتاح الإغلاق ---------- */
      function s1() {
        const g = reset(); const live = () => g === gen && K.alive();
        const water = h('div.sx-photo.t10-polaroid.sx-in', { role: 'img', 'aria-label': 'ماءْ', style: { animationDelay: '.2s' } }, h('img', { src: BQ.img('img-001'), alt: '' }));
        const spread = h('div.t10-spread', null, h('div.sx-photo.t10-scene.sx-in', { role: 'img', 'aria-label': 'ماجِد وَبارِق' }, h('img', { src: BQ.img('img-028'), alt: '' })), water);
        const foot = h('div.sx-actions');
        stage.append(h('div.sx-wrap', null, spread, foot));
        ctx.instruction('قولوا مَعي، هَيّا!');
        panel('<p>استعدّا للقول معاً: ثلاثة بنود قصيرة، وأنت تلاحظ.</p>');
        ctx.onReplay(() => say('bariq_L1-01_ins-say_ar'));
        later(async () => {
          water.classList.add('is-glow');
          await say('bariq_L1-01_d1-scr06_01_ar'); if (!live()) return;
          water.classList.remove('is-glow');
          await say('bariq_L1-01_ins-say_ar'); if (!live()) return;
          foot.replaceChildren(h('button.bq-btn.sx-in', { type: 'button', onclick: () => item(0) }, 'التّالي', BQ.icon('next')));
        }, 350);
      }

      /* ---------- ش٢ · ثلاثة بنود نطق ---------- */
      function item(k) {
        const g = reset(); const live = () => g === gen && K.alive();
        const it = ITEMS[k], L = log[k];
        const wrap = h('div.sx-wrap');
        const pics = h('div.t10-pics');
        let lipCard = null; const cards = {};
        if (it.key === 'phrase') {
          cards.water = h('div.sx-photo.t10-sq.sx-in', { role: 'img', 'aria-label': 'ماءْ' }, h('img', { src: BQ.img('img-001'), alt: '' }));
          cards.door = h('div.sx-photo.t10-sq.sx-in', { role: 'img', 'aria-label': 'مَصْدَرُ صَوْتٍ', style: { animationDelay: '.12s' } }, h('img', { src: BQ.img('img-007'), alt: '' }));
          pics.append(cards.water, cards.door);
        } else {
          lipCard = h('div.sx-photo.t10-big.sx-in', { role: 'img', 'aria-label': it.key === 'm' ? 'فَمُ سَيْفٍ' : 'ماءْ' },
            h('img', { src: BQ.img(it.key === 'm' ? 'img-101' : 'img-001'), alt: '' }),
            h('span.t10-lipshot', { 'aria-hidden': 'true' }, h('img', { src: BQ.img('img-101'), alt: '' })),
            it.key === 'm' ? h('span.t10-mirror', { 'aria-hidden': 'true' }) : null);
          pics.append(lipCard);
        }
        // «دورك»: بارق في البند الأوّل (يقول الطفل العبارة في دوره) · فم في غيره · يد+فم للمعيار الذاتيّ
        const turn = h('div.t10-turn', { 'aria-hidden': 'true' }, it.key === 'phrase' ? (BQ.ui.brq ? BQ.ui.brq('cheer', 't10-brq') : h('img', { src: BQ.char.BRQ, alt: '' })) : BQ.icon('mouth'));
        // «اسمع النموذج» — زرّ أزرق بأذن (غير سمّاعة التعليمة الصفراء)
        const listen = h('button.bq-hear.sx-hear', { type: 'button', 'aria-label': 'اسْمَعِ النَّموذَجَ', onclick: () => replayModel(true) }, BQ.icon('ear'));
        const dock = h('div.t10-dock', null, listen, turn);
        // شريط «ملاحظة المعلّم»: ثلاثة أزرار بالمقياس الموحّد
        const obs = h('div.sx-adult', { role: 'group', 'aria-label': 'مُلاحَظَةُ المُعَلِّمِ' },
          h('span.sx-adult-tag', null, BQ.icon('adult'), h('span', null, h('b', null, 'ملاحظة المعلّم'), 'ماذا لاحظت؟')));
        const btnRow = h('div.sx-adult-btns');
        const obsBtns = ['ind', 'help', 'none'].map((lv) => {
          const b = h('button', { type: 'button', 'aria-pressed': String(L.level === lv), dataset: { lv } }, LV[lv].ar);
          b.addEventListener('click', () => observe(lv));
          return b;
        });
        btnRow.append(...obsBtns); obs.append(btnRow);
        const nextB = h('button.bq-btn.t10-next', { type: 'button', onclick: () => advance() }, k < ITEMS.length - 1 ? 'البَنْدُ التّالي' : 'التّالي', BQ.icon('next'));
        wrap.append(sxSteps(ITEMS.length, k), pics, dock, obs, h('div.sx-actions', null, nextB));
        stage.append(wrap);
        ctx.instruction(k === 0 ? 'هَلْ هُما صَوْتٌ واحِدٌ؟' : 'قولوا مَعي، هَيّا!');
        panel('<p><b>' + NAMES[it.key] + ':</b> ' + it.observe + '</p>' +
          '<p>بعد النموذج دعه يقول، ثم المس في شريط «ملاحظة المعلّم» ما لاحظت. إن قالها معك أو بعد أن أريته فمك فهي «قالها بمساعدة».</p>' +
          '<p>لا تصحّح؛ أعد النموذج بالزرّ الأزرق.</p>');

        async function model(first) {
          turn.classList.remove('go');
          listen.classList.add('is-playing');
          for (const id of it.model) {
            if (!live()) return;
            if (it.key === 'phrase') {
              cards.water.classList.toggle('is-glow', id.includes('water')); cards.door.classList.toggle('is-glow', id.includes('knock'));
            }
            if (!(await say(id))) { listen.classList.remove('is-playing'); return; }
            await BQ.sleep(250);
          }
          listen.classList.remove('is-playing');
          if (!live()) return;
          if (it.key === 'phrase') { cards.water.classList.remove('is-glow'); cards.door.classList.remove('is-glow'); }
          if (lipCard) lipCard.classList.remove('lip');
          turn.classList.add('go'); // سكتة الترديد — «دورك» ينبض بلا مؤقّت ظاهر
          later(() => {
            turn.classList.remove('go');
            if (it.key === 'm') { turn.replaceChildren(h('span.t10-duo', null, BQ.icon('hand'), BQ.icon('mouth'))); turn.classList.add('go'); if (first) BQ.ui.pulse(turn); }
          }, PAUSE);
        }
        function replayModel(count) { // تلميح ١: يُعاد النموذج مع لقطة الشفتين
          if (count) L.replays++;
          if (lipCard) lipCard.classList.add('lip');
          clearTimers();
          model(false);
          refreshLog();
        }
        ctx.onReplay(() => replayModel(true));
        let observed = false, colored = false, chk = null;
        async function observe(lv) {
          if (!live()) return;
          L.level = lv;
          obsBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lv === lv)));
          refreshLog();
          if (lv === 'none') { // لا حكم؛ يُعاد النموذج مع لقطة الشفتين
            observed = false;
            if (chk && !colored) { chk.remove(); chk = null; dock.append(turn); }
            replayModel(false);
            return;
          }
          if (observed) return;
          observed = true;
          BQ.audio.stop(); clearTimers(); turn.classList.remove('go'); listen.classList.remove('is-playing');
          // دائرة ✓ يلوّنها الطفل بلمسة — اللون نفسه أيّاً كانت الملاحظة (لا درجة للطفل)
          chk = h('button.t10-check', { type: 'button', 'aria-label': 'لَوِّنِ الدّائِرَةَ' }, BQ.icon('check'));
          turn.replaceWith(chk);
          chk.focus({ preventScroll: true });
          chk.addEventListener('click', async () => {
            if (colored) return; colored = true;
            chk.classList.add('on');
            BQ.audio.fx(BQ.sfx.bead, 0.5);
            await bariq(stage, 'bariq_L1-01_fb-yes_ar'); if (!live()) return;
            for (const id of it.after) { await say(id); if (!live()) return; }
            nextB.classList.remove('soft'); BQ.ui.pulse(nextB);
          });
        }
        async function advance() {
          if (!L.level) L.level = 'unobs'; // الانتقال بلا لمسة ← «لم تُلاحَظ»
          if (k < ITEMS.length - 1) return item(k + 1);
          const g2 = gen; BQ.audio.stop(); clearTimers(); nextB.disabled = true;
          await bariq(stage, 'L1-01_d1_s1_01'); if (g2 !== gen || !K.alive()) return; // ختام البنود
          s3();
        }
        later(() => model(true), 450);
      }

      /* ---------- ش٣ · سؤال البيت المفتوح ---------- */
      function s3() {
        const g = reset(); const live = () => g === gen && K.alive();
        const foot = h('div.sx-actions');
        stage.append(h('div.sx-wrap', null,
          h('div.t10-spread', null, h('div.sx-photo.t10-scene.sx-in', { role: 'img', 'aria-label': 'ماجِد وَبارِق' },
            h('img', { src: BQ.img('img-028'), alt: '' }), h('span.t10-qbadge', { 'aria-hidden': 'true' }, BQ.icon('home')))), foot));
        ctx.instruction('أَيْنَ الماءُ في بَيْتِكُمْ؟');
        panel('<p>اطرح السؤال بصوتك أيضاً إن شئت.</p><p>كلّ جواب مقبول: كلمة أو إشارة أو ذهاب إلى الماء في البيت.</p>');
        ctx.onReplay(() => say('bariq_L1-01_L1-close_01_ar'));
        later(async () => {
          await say('bariq_L1-01_L1-close_01_ar'); if (!live()) return;
          foot.replaceChildren(h('button.bq-btn.sx-in', { type: 'button', onclick: finish }, 'أَنْهَيْتُ', BQ.icon('check')));
        }, 400);
      }
      function finish() {
        gen++; clearTimers(); BQ.audio.stop();
        stage.querySelectorAll('.bq-end').forEach((n) => n.remove());
        ctx.done();
        sxEnd(stage, { title: 'أَحْسَنْتَ!', onReplay: () => { log.forEach((l) => { l.level = null; l.replays = 0; }); s1(); } });
        panel('<p>انتهت البنود الثلاثة؛ السجلّ في «ملاحظات المراجِع».</p><p class="lbl">في البيت اليوم</p><ul>' + HOME.map((t) => '<li>' + t + '</li>').join('') + '</ul>'); // v0-12 r3b: نصّ المعلّم في الدليل لا على ورقة الطفل
      }
      s1();
    },
  });
})();
