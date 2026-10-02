/* EL14 — بارق L1-01-d1 · مسوّدة · v0-9: اللعبة الأساسية Godot «بارِقٌ يوقِظُ البَوْصَلَةَ» (games/meem ?station=play) والغرفة HTML بديل · مبنيّ من kit.js + EL14.body.js (WP2 v0-8) */
(function () {
'use strict';
/* ---- BQ.mk: أدوات مشتركة لعناصر الاستماع EL01 · EL05 · EL13 · EL14 (نسخة واحدة مضمَّنة في كل ملف؛ أوّل ملف يُحمَّل يعرّفها) ----
   v0-8 (WP2): يستعمل عقد المحرّك حين يتوفّر (ctx.alive · BQ.ui.steps) مع بديل محلّيّ مطابق؛ كلّ متابعة غير متزامنة تُحرس بـS.ok().
   · جلسة تتوقّف عند مغادرة العنصر (S.play/S.sleep لا تُكمل بعد الخروج، ولا تتعلّق إذا قُطع الصوت بإعادة).
   · رؤوس الشخصيات المتكلّمة (ماجد/سيف) تنبض مع أسطرها، وبارق يطلّ من الحافّة (نسخة لا تتعلّق).
   · خرزات البوصلة، يد الإرشاد الشبحية، شرارات، طيران الخرزة، المقابلة «تقارب ثم انفصال»، موجة السمّاعة.
   · محرّك جولة «اسمع والمس» بمحاولتين وصفوف التغذية (صواب · خطأ أوّل · خطأ ثانٍ). */
const MK = (BQ.mk && BQ.mk.v === 4) ? BQ.mk : (BQ.mk = (function () {
  const h = BQ.h;
  const AR = (n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  const never = () => new Promise(() => {});
  const SC = '.bq-frame.mk';
  const CSS = `
/* v2: المحتوى صفحة كتاب على المسرح — لا إطار داخليّ؛ المقاسات cqi/clamp */
${SC} .mk-page { align-self: stretch; flex: 1; width: 100%; display: grid; grid-template-rows: auto minmax(0, 1fr); gap: clamp(12px, 2.6cqi, 24px); }
${SC} .mk-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 38px; flex-wrap: wrap; }
${SC} .mk-top:empty { display: none; }
${SC} .mk-top > :only-child { margin-inline: auto; }
${SC} .mk-body { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(16px, 3.4cqi, 30px); min-width: 0; }
${SC} .mk-steps { display: inline-flex; align-items: center; gap: 7px; min-height: 32px; box-sizing: border-box; padding: 7px 14px; border-radius: 999px; background: var(--white); border: 1.5px solid var(--sky-line); font: 700 15px/1 var(--ff-display); color: var(--navy); font-variant-numeric: tabular-nums; }
${SC} .mk-steps i { width: 9px; height: 9px; border-radius: 99px; background: var(--sky-line); transition: width .35s, background .35s; }
${SC} .mk-steps i.done { background: var(--sun); }
${SC} .mk-steps i.on { width: 24px; background: var(--sky); }
${SC} .mk-steps b { margin-inline-start: 4px; font: 600 13px/1 var(--ff-ui); }
${SC} .mk-steps b:empty { display: none; }
${SC} .mk-tag { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; box-sizing: border-box; font: 700 15px/1 var(--ff-display); color: var(--navy); background: var(--sun-soft); padding: 6px 14px; border-radius: 999px; }
${SC} .mk-tag .bq-ic { width: 22px; height: 22px; }
${SC} .bq-choice.is-picked { box-shadow: 0 0 0 4px var(--navy), 0 12px 24px var(--shade); }
${SC} .bq-btn { min-height: 48px; }
${SC}.a46 .bq-btn { min-height: 60px; padding-inline: 1.4em; }
/* زرّ المثير (اسمع الصوت) هويّة مختلفة عن سمّاعة التعليمة الصفراء: قرص أبيض بحلقة سماوية وأذن كحلية */
${SC} .bq-listen.mk-listen { background: var(--white); color: var(--navy); border: 5px solid var(--sky); box-shadow: 0 6px 0 var(--sky-2), 0 12px 24px var(--shade); }
${SC} .bq-listen.mk-listen.is-playing::after { border-color: var(--sky); }
${SC}.a46 .bq-listen.mk-listen { width: clamp(96px, 14cqi, 120px); }
${SC} .bq-choices { flex-wrap: nowrap; gap: clamp(10px, 3cqi, 28px); }
${SC} .bq-choice { width: clamp(92px, 26cqi, 236px); transition: transform .2s ease-out, opacity .3s, filter .3s, box-shadow .3s; }
${SC}.a46 .bq-choice { width: clamp(98px, 28cqi, 248px); }
${SC} .mk-body .bq-choice { max-width: max(88px, calc(var(--play-h, 700px) - 330px)); } /* v0-12: البطاقات بارتفاع الإطار (٧٢٠) */
${SC} .bq-choice.is-lift { transform: translateY(-8px) scale(1.05); box-shadow: 0 0 0 5px var(--sun-soft), 0 16px 30px var(--shade); z-index: 2; opacity: 1; }
${SC} .bq-choice.is-ok.fx-pulse { animation: mkRing .5s ease-in-out 2; }
@keyframes mkRing { 50% { box-shadow: 0 0 0 10px var(--ok), 0 12px 24px var(--shade); } }
${SC} .bq-choices.is-waiting .bq-choice { filter: saturate(.85); }
${SC} .bq-choice .bq-glyph { color: var(--coral); font-size: clamp(60px, 15cqi, 150px); }
${SC} .elp-say.mk-talk { box-shadow: 0 4px 0 var(--sun-edge), 0 0 0 6px color-mix(in srgb, var(--sun-soft) 70%, transparent); }
${SC} .mk-beads { display: inline-flex; align-items: center; gap: clamp(6px, 1.4cqi, 10px); padding: 6px 14px 6px 10px; border-radius: 999px; background: var(--white); border: 1.5px solid var(--sky-line); box-shadow: 0 4px 12px var(--shade); }
${SC} .mk-cmp { display: inline-block; width: 30px; height: 30px; flex: none; }
${SC} .mk-cmp svg { width: 100%; height: 100%; display: block; }
${SC} .mk-bead { width: clamp(15px, 3cqi, 20px); aspect-ratio: 1; border-radius: 50%; background: var(--sky-wash); border: 2.5px solid var(--sky-line); transition: background .35s, transform .35s, border-color .35s; }
${SC} .mk-bead.cur { transform: scale(1.25); border-color: var(--sun); }
${SC} .mk-bead.on { background: radial-gradient(circle at 35% 30%, var(--white) 0 14%, var(--sun-soft) 36%, var(--sun) 100%); border-color: var(--sun-edge); animation: bqPop .35s ease-out; }
${SC} .mk-bead.help { background: radial-gradient(circle at 35% 30%, var(--white) 0 14%, color-mix(in srgb, var(--sun-soft) 55%, var(--white)) 50%); border-color: var(--sun); }
${SC} .mk-beads.all .mk-bead { animation: mkGlow 1.2s ease-in-out 2; }
${SC} .mk-beads.all .mk-cmp { animation: mkSpin 1.4s ease-in-out; }
@keyframes mkGlow { 50% { box-shadow: 0 0 12px var(--sun); transform: scale(1.2); } }
@keyframes mkSpin { to { transform: rotate(360deg); } }
${SC} .mk-fly { position: absolute; z-index: 8; left: 0; top: 0; width: 22px; height: 22px; margin: -11px 0 0 -11px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, var(--white) 0 15%, var(--sun-soft) 40%, var(--sun)); box-shadow: 0 0 14px var(--sun); pointer-events: none; }
${SC} .mk-spark { position: absolute; z-index: 8; left: 0; top: 0; width: 22px; height: 22px; margin: -11px 0 0 -11px; color: var(--sun); pointer-events: none; }
${SC} .mk-spark svg { width: 100%; height: 100%; display: block; }
${SC} .mk-hand { position: absolute; z-index: 8; left: 0; top: 0; width: clamp(46px, 8cqi, 68px); height: clamp(46px, 8cqi, 68px); margin: -10px 0 0 -20px; color: var(--white); opacity: 0; pointer-events: none; filter: drop-shadow(0 6px 8px rgba(0, 52, 91, .35)); }
${SC} .mk-hand svg { width: 100%; height: 100%; display: block; }
${SC} .mk-ringwave { position: absolute; inset: -8px; border-radius: 50%; border: 5px solid var(--sun); animation: mkWave 1.1s ease-out 3; pointer-events: none; }
@keyframes mkWave { from { transform: scale(.9); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }
${SC} .mk-listenrow { position: relative; display: flex; align-items: center; justify-content: center; gap: clamp(12px, 3cqi, 24px); flex-wrap: wrap; }
${SC} .mk-hint { display: flex; align-items: center; gap: 10px; background: var(--paper); border: 2px solid var(--paper-edge); border-radius: var(--r-md); padding: 8px 12px; box-shadow: 0 6px 16px var(--shade); animation: bqPop .35s ease-out; }
${SC} .mk-lips { position: relative; width: clamp(56px, 11cqi, 88px); aspect-ratio: 1; border-radius: var(--r-sm); overflow: hidden; background: var(--white); }
${SC} .mk-lips img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(2.3); transform-origin: 50% 36%; }
${SC} .mk-lips img.b { animation: mkLips 1.3s steps(1) infinite; }
@keyframes mkLips { 0%, 55% { opacity: 0; } 56%, 100% { opacity: 1; } }
${SC} .mk-hint .bq-ic { width: clamp(30px, 6cqi, 48px); height: clamp(30px, 6cqi, 48px); color: var(--navy); }
${SC} .mk-bubble { display: inline-block; background: var(--paper); color: var(--ink); font: 700 clamp(30px, 7cqi, 60px)/1.45 var(--ff-child); padding: .08em .75em .22em; border-radius: var(--r-lg); border: 2px solid var(--paper-edge); box-shadow: 0 10px 26px var(--shade); animation: bqPop .4s ease-out; text-align: center; }
${SC} .mk-bubble .m, ${SC} .bq-word .m { color: var(--coral); }
${SC} .mk-next { animation: bqPop .35s ease-out; }
${SC} .mk-sum { margin: 0; font: 500 14px/1.7 var(--ff-ui); color: var(--navy); background: var(--sky-wash); border: 1px solid var(--sky-line); border-radius: var(--r-sm); padding: 6px 12px; max-width: 46ch; }
${SC} .mk-adult { border-top: 1.5px solid var(--sky-line); margin-top: 12px; padding-top: 12px; display: grid; gap: 8px; }
${SC} .mk-adult h4 { margin: 0; font: 700 16px/1.3 var(--ff-display); color: var(--navy); }
${SC} .mk-adult button { font: 600 14px/1.2 var(--ff-ui); min-height: 44px; border: 1.5px solid var(--sky-line); background: var(--white); color: var(--navy); border-radius: 999px; padding: 9px 14px; cursor: pointer; justify-self: start; }
${SC} .mk-adult button:hover { border-color: var(--sky); }
${SC} .mk-adult button[aria-pressed="true"] { background: var(--navy); border-color: var(--navy); color: var(--white); }
${SC} .mk-adult .log { font-size: 13px; line-height: 1.8; background: var(--sky-wash); border-radius: var(--r-sm); padding: 8px 10px; margin: 0; }
${SC} .mk-adult details { font-size: 13px; }
${SC} .mk-meta h4 { margin: 8px 0 4px; font: 700 14px/1.4 var(--ff-ui); color: var(--navy); }
${SC} .mk-meta .log { font-size: 13px; line-height: 1.8; background: var(--sky-wash); border-radius: var(--r-sm); padding: 8px 10px; margin: 0 0 8px; }
${SC} .mk-adult summary { cursor: pointer; font-weight: 600; color: var(--navy); min-height: 44px; display: flex; align-items: center; }
${SC} .mk-adult .res { font-size: 14px; line-height: 1.8; background: var(--paper); border: 1px solid var(--paper-edge); border-radius: var(--r-sm); padding: 8px 10px; margin: 0; }
${SC} .mk-adult .pin { font-size: 14px; line-height: 1.8; margin: 0; padding: 8px 10px; border-inline-start: 4px solid var(--sun); background: var(--white); }
${SC} .mk-adult .rv { font-size: 12.5px; color: var(--muted); margin: 0; }
${SC} .mk-adult .tip { font-size: 14px; line-height: 1.8; margin: 0; }
${SC} .mk-adult .hintnote { font-size: 14px; background: var(--paper); border: 1px solid var(--paper-edge); border-radius: var(--r-sm); padding: 8px 10px; margin: 0; }
${SC} .mk-adult label { display: flex; gap: 8px; align-items: center; font-weight: 600; cursor: pointer; }
${SC} button:focus-visible { outline: 4px solid var(--navy); outline-offset: 3px; }
@container stage (max-width: 560px) {
  ${SC} .bq-choices { gap: 10px; }
  ${SC} .bq-choice { width: calc((100cqi - 32px - 20px) / 3); border-radius: 16px; border-width: 3px; }
  ${SC}.a46 .bq-choice { width: calc((100cqi - 32px - 20px) / 3); }
  ${SC} .mk-steps { font-size: 13px; padding: 6px 11px; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .mk-bead.on, ${SC} .mk-ringwave, ${SC} .mk-lips img.b, ${SC} .mk-hint, ${SC} .mk-bubble, ${SC} .mk-next, ${SC} .mk-beads.all * { animation: none !important; }
  ${SC} .bq-choice.is-lift { transform: none; }
  ${SC} .bq-choice.is-dim { outline: 3px dashed var(--sky); outline-offset: -8px; }
}`;
  /** هل في app.css قاعدة .bq-hear؟ (يُفحص مرّة) */
  let hearOK = null;
  function hasHear() {
    if (hearOK != null) return hearOK;
    const pr = h('button.bq-hear', { style: { position: 'absolute', visibility: 'hidden' } }); document.body.append(pr);
    hearOK = getComputedStyle(pr).borderTopLeftRadius === '50%'; pr.remove();
    return hearOK;
  }
  function css(id, text) { if (!document.getElementById(id)) document.head.append(h('style', { id }, text)); }

  const SP = { 'ماجد': 'MAJ', 'سيف': 'SAY', 'بارق': 'BRQ' };
  /* أذن بموجتي صوت — لزرّ المثير «اسْمَعِ الصَّوْتَ» (غير سمّاعة التعليمة) */
  const EAR_SVG = '<svg viewBox="0 0 48 48"><path d="M14 20.5C14 13.6 19.4 9 25.5 9S37 13.6 37 20c0 5.2-3.3 7.4-5.6 9.4-1.9 1.7-2.6 3-2.9 5.3-.4 3.3-2.8 5.3-5.8 5.3-2.7 0-4.9-1.7-5.7-4.2" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.5 21c0-3 2.3-5.3 5.2-5.3s5.1 2.2 5.1 5c0 2.6-2 3.4-3.3 4.6" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M6 16.5c-1.6 4.3-1.6 9.7 0 14M10.5 19.8c-.8 2.5-.8 5.3 0 7.8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  const CMP_SVG = '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="var(--sun)" stroke="var(--white)" stroke-width="3"/><circle cx="24" cy="24" r="15" fill="var(--paper)"/><path d="M24 10.5l4.2 13.5h-8.4z" fill="var(--coral)"/><path d="M24 37.5l-4.2-13.5h8.4z" fill="var(--navy)"/><circle cx="24" cy="24" r="2.4" fill="var(--white)"/></svg>';

  /** جلسة عنصر: كل صوت/انتظار يتوقّف نهائياً إذا غادر المستخدم العنصر */
  function session(ctx) {
    css('st-mk', CSS);
    const frame = ctx.frame, stage = ctx.stage;
    frame.classList.add('mk');
    const age = ctx.age();
    frame.classList.toggle('a46', age === '4-6');
    const S = { ctx, frame, stage, age, alive: true, timers: new Set(), log: { replays: 0 } };
    /** ok() — العنصر ما زال مفتوحاً (عقد المحرّك ctx.alive إن وُجد + علم الجلسة المحلّيّ) */
    S.ok = () => S.alive && (typeof ctx.alive === 'function' ? ctx.alive() !== false : true);
    S.kill = () => { S.alive = false; S.timers.forEach(clearTimeout); S.timers.clear(); };
    ctx.onCleanup(S.kill);
    S.later = (fn, ms) => { const t = setTimeout(() => { S.timers.delete(t); if (S.ok()) fn(); }, ms); S.timers.add(t); return t; };
    S.cancel = (t) => { clearTimeout(t); S.timers.delete(t); };
    S.sleep = (ms) => new Promise((r) => S.later(r, ms));

    /* صوت واحد للتعليمات الآن: زرّ السمّاعة في صفّ التعليمة يتوهّج ما دام السطر يُقال */
    S.talk = (who, on) => { const b = frame.querySelector('.elp-say'); if (b) b.classList.toggle('mk-talk', !!on); };

    /** صفحة داخل المسرح: شريط علويّ (الخطوات · الخرزات) + جسم المحتوى في الوسط */
    const page = h('div.mk-page'), top = h('div.mk-top'), body = h('div.mk-body');
    page.append(top, body);
    S.top = top; S.body = body;
    S.mount = () => { if (!page.isConnected) stage.append(page); };
    S.clear = () => { S.mount(); body.replaceChildren(); };
    /** مؤشّر الخطوات المشترك BQ.ui.steps (نقاط + الحاليّة؛ «١ / ٣» لـ١٠–١٢ فقط) — وبديل محلّيّ بالشكل نفسه */
    S.steps = function (n) {
      if (BQ.ui.steps) {
        const tmp = h('div');
        const st = BQ.ui.steps(tmp, n, {});
        if (st && st.el) { top.prepend(st.el); return st; }
      }
      const dots = Array.from({ length: n }, () => h('i'));
      const lab = h('b');
      const el = h('div.mk-steps', { role: 'img' }, ...dots, lab);
      top.prepend(el);
      return { el, set(i) { dots.forEach((d, j) => { d.className = j < i ? 'done' : j === i ? 'on' : ''; }); lab.textContent = age === '10-12' ? AR(i + 1) + ' / ' + AR(n) : ''; el.setAttribute('aria-label', 'الخُطْوَةُ ' + AR(i + 1) + ' مِنْ ' + AR(n)); } };
    };
    /** وسم «راجِعْ»: أيقونة للطفل الصغير، ونصّ لـ١٠–١٢ فقط (لا تعليمة مكتوبة لما دون ذلك) */
    S.tag = () => h('span.mk-tag', { role: 'img', 'aria-label': 'راجِعْ' }, BQ.icon('replay'), age === '10-12' ? h('span', null, 'راجِعْ') : null);

    /** play(id, opt) → Promise<true إن انقطع> — لا يتعلّق عند المقاطعة، ويتوقّف تماماً عند مغادرة العنصر.
     *  opt.noCaption: مثير استماع بلا نصّ مصاحب (لا كلمة مكتوبة قبل الجواب). */
    S.play = function (id, opt) {
      if (!S.ok()) return never();
      opt = opt || {};
      const L = BQ.line(id); const who = L && SP[L.sp];
      if (opt.noCaption) BQ.audio.caption(null);
      if (who && who !== 'BRQ') S.talk(who, true);
      const p = BQ.audio.play(id, opt);
      const tok = BQ.audio.token;
      return new Promise((res) => {
        let done = false;
        const fin = (intr) => { if (done) return; done = true; clearInterval(iv); if (who) S.talk(who, false); res(intr); };
        p.then(() => fin(false));
        const iv = setInterval(() => { if (!S.ok()) { clearInterval(iv); S.talk(null, false); return; } if (BQ.audio.token !== tok) fin(true); }, 80);
      }).then((intr) => (S.ok() ? intr : never()));
    };
    /** أوّل معرّف له ملف صوت (وإلا الأوّل) — مثل «ماء.» vocab-w1_01 ← L1-01_d2_s5_03 */
    S.pick = (...ids) => ids.find((i) => BQ.hasAudio(i)) || ids[0];

    /** بارق يطلّ من حافّة الإطار ويقول سطراً (نسخة لا تتعلّق عند المقاطعة) */
    /*  v0-12: بارق المتحرّك (BQ.ui.brq) — يتكلّم أثناء السطر، ثم مزاج (cheer للتعزيز · think لإعادة المحاولة) قبل أن يخرج */
    S.bariq = async function (lineId, opt) {
      opt = opt || {};
      const anim = BQ.ui.brq ? BQ.ui.brq(lineId ? 'talk' : 'wave') : h('img', { src: BQ.char.BRQ, alt: '' });
      const pop = h('div.bq-bariq' + (BQ.ui.brq ? '.has-anim' : '') + (opt.side === 'left' ? '.left' : ''), { 'aria-hidden': 'true' }, anim);
      stage.append(pop);
      requestAnimationFrame(() => pop.classList.add('in'));
      await S.sleep(180);
      if (lineId) await S.play(lineId); else await S.sleep(opt.ms || 1200);
      if (!S.ok()) return never();
      const id = lineId || '';
      const mood = opt.mood || (/fb-yes|FB_0[1235]|EL06_05|_key_|s1_01|scr06/.test(id) ? 'cheer' : /retry|EL02_04|FB_04/.test(id) ? 'think' : '');
      if (mood && anim.brq) { anim.brq(mood); await S.sleep(opt.moodMs || 750); }
      pop.classList.remove('in'); setTimeout(() => pop.remove(), 450);
    };

    /* مواضع داخل المسرح */
    S.center = (el) => { const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(); return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2]; };

    /** شرارات هادئة حول بطاقة */
    S.sparkle = function (el, n) {
      if (BQ.reduced() || !el || !el.isConnected) return;
      n = n || 8;
      const [x, y] = S.center(el); const r = el.getBoundingClientRect().width * 0.62;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.4;
        const sp = h('span.mk-spark', { html: BQ.icons.star, style: { transform: `translate(${x}px,${y}px)` } });
        stage.append(sp);
        const an = sp.animate([{ transform: `translate(${x}px,${y}px) scale(.3)`, opacity: 1 }, { transform: `translate(${x + Math.cos(a) * r}px,${y + Math.sin(a) * r}px) scale(1) rotate(50deg)`, opacity: 0 }], { duration: 800, easing: 'cubic-bezier(.2,.8,.3,1)' });
        an.onfinish = () => sp.remove();
      }
    };
    /** خرزة تطير من البطاقة إلى مكانها في الحلقة */
    S.fly = function (fromEl, toEl) {
      if (BQ.reduced() || !fromEl || !toEl || !fromEl.isConnected || !toEl.isConnected) return Promise.resolve();
      const [x1, y1] = S.center(fromEl), [x2, y2] = S.center(toEl);
      const d = h('span.mk-fly');
      stage.append(d);
      const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - 50;
      const an = d.animate([{ transform: `translate(${x1}px,${y1}px) scale(1.5)` }, { transform: `translate(${mx}px,${my}px) scale(1.1)`, offset: 0.5 }, { transform: `translate(${x2}px,${y2}px) scale(.7)` }], { duration: 650, easing: 'ease-in-out' });
      return new Promise((r) => { an.onfinish = () => { d.remove(); if (S.ok()) r(); }; S.later(r, 900); });
    };
    /** «تقارب ثم انفصال» لبطاقتين (المقابلة الشارحة) */
    S.contrast = function (a, b) {
      if (BQ.reduced() || !a || !b) return;
      const [xa, ya] = S.center(a), [xb, yb] = S.center(b);
      const dx = (xb - xa) * 0.16, dy = (yb - ya) * 0.16;
      a.animate([{ transform: 'none' }, { transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 1000, easing: 'ease-in-out' });
      b.animate([{ transform: 'none' }, { transform: `translate(${-dx}px,${-dy}px)` }, { transform: 'none' }], { duration: 1000, easing: 'ease-in-out' });
    };
    /** موجة حول زرّ السمّاعة (تلميح البنود البيئية) */
    S.wave = function (btn) { if (!btn) return; const w = h('span.mk-ringwave', { 'aria-hidden': 'true' }); btn.append(w); setTimeout(() => w.remove(), 3500); };
    /** يد شبحية: تلمس الأوّل ثم تمرّ فوق الباقي دون أن تستقرّ (لا قرينة على الصواب) */
    S.ghost = async function (points, opt) {
      if (BQ.reduced()) return;
      opt = opt || {};
      const pts = points.map((p) => (Array.isArray(p) ? p : p && p.isConnected ? S.center(p) : null)).filter(Boolean);
      if (!pts.length) return;
      const hand = h('span.mk-hand', { html: BQ.icons.hand, 'aria-hidden': 'true' });
      stage.append(hand);
      const T = (p, s) => `translate(${p[0]}px,${p[1]}px) scale(${s || 1})`;
      const kf = [{ transform: T([pts[0][0], pts[0][1] + 70]), opacity: 0 }, { transform: T(pts[0]), opacity: 0.95 }, { transform: T(pts[0], 0.8), opacity: 0.95 }, { transform: T(pts[0]), opacity: 0.95 }];
      pts.slice(1).forEach((p) => kf.push({ transform: T([p[0], p[1] - 10]), opacity: 0.9 }));
      const l = pts[pts.length - 1];
      kf.push({ transform: T([l[0], l[1] - 90]), opacity: 0 });
      const dur = 750 * pts.length + 1200;
      const an = hand.animate(kf, { duration: dur, easing: 'ease-in-out' });
      if (opt.onTouch) S.later(opt.onTouch, dur * (2 / (kf.length - 1)));
      await new Promise((r) => { an.onfinish = () => { if (S.ok()) r(); }; S.later(r, dur + 200); });
      hand.remove();
    };

    /** شريط خرزات البوصلة (تقدّم لا درجة) */
    S.beads = function (parent, n) {
      const w = h('div.mk-beads', { role: 'img', 'aria-label': 'خَرَزاتُ البَوْصَلَةِ' }, h('span.mk-cmp', { html: CMP_SVG }));
      const bs = Array.from({ length: n }, () => h('span.mk-bead'));
      w.append(...bs); parent.append(w);
      return {
        el: w, bead: (i) => bs[i],
        cur(i) { bs.forEach((b, j) => b.classList.toggle('cur', j === i)); },
        set(i, st) { if (!bs[i] || !S.ok()) return; bs[i].classList.remove('cur', 'on', 'help'); bs[i].classList.add(st || 'on'); BQ.audio.fx(BQ.sfx.bead, 0.5); },
        all() { w.classList.add('all'); },
      };
    };

    /** زرّ السمّاعة الكبير مع حالة «يُسمَع الآن» */
    S.listen = function (onClick) {
      const b = BQ.ui.listenBtn(() => onClick(), 'اسْمَعِ الصَّوْتَ');
      b.classList.add('bq-hear'); // الصنف المشترك في app.css
      if (!hasHear()) { b.classList.add('mk-listen'); const ic = b.querySelector('.bq-ic'); if (ic) ic.innerHTML = EAR_SVG; } // بديل حتى يتوفّر .bq-hear
      b.setAttribute('aria-label', 'اسْمَعِ الصَّوْتَ');
      b.playing = (on) => b.classList.toggle('is-playing', !!on);
      return b;
    };

    /** الإعادة الآلية للعمر ٤–٦ (مرّة بعد ٦ ث، لا يُسجَّل زمن) */
    S.autoReplay = function (fn) {
      if (age !== '4-6') return { stop() {} };
      const t = S.later(fn, 6000);
      return { stop() { S.cancel(t); } };
    };

    /** قسم أدوات المعلّم يُلحق باللوحة الافتراضية (لا يستبدلها) */
    S.adultBox = function (title) {
      const panel = frame.querySelector('.bq-adult');
      const box = h('div.mk-adult', null, title ? h('h4', null, title) : null);
      const metaSec = panel.querySelector('.elp-adult-meta'); // «ملاحظات المراجِع» تبقى في الأسفل
      if (metaSec) panel.insertBefore(box, metaSec); else panel.append(box);
      return box;
    };
    /** سجلّ مطويّ داخل أدوات المعلّم (تفاصيل للمراجِع) */
    S.adultLog = function (box, summary, empty) {
      const p = h('p.log', null, empty || '');
      const metaEl = frame.querySelector('.elp-meta-el'); // المحرّك: قسم «ملاحظات المراجِع» المطويّ
      if (metaEl) metaEl.append(h('div.mk-meta', null, h('h4', null, summary || 'تفاصيل ما سُجِّل'), p));
      else box.append(h('details', null, h('summary', null, summary || 'تفاصيل ما سُجِّل'), p));
      return p;
    };
    /** السطر المثبّت عن نطق الصوت (القرار ٤) — يُضاف إن لم يعرضه الدليل بعد */
    S.adultPin = function (box) {
      const T = 'قُلِ الصَّوْتَ لا اسْمَ الحَرْفِ: «مْـ» ممدودةٌ والشَّفَتانِ مُطبَقَتانِ، بلا «مِيم» وبلا حَرَكةٍ بعدَها.';
      const panel = frame.querySelector('.bq-adult');
      if (panel && panel.textContent.indexOf('لا اسْمَ الحَرْفِ') >= 0) return;
      box.insertBefore(h('p.pin', null, T), box.firstChild && box.firstChild.tagName === 'H4' ? box.firstChild.nextSibling : box.firstChild);
    };
    S.adultNote = function (box, html) {
      let n = box.querySelector('.hintnote');
      if (!html) { if (n) n.remove(); return; }
      if (!n) { n = h('p.hintnote'); box.append(n); }
      n.innerHTML = html;
    };

    /** زرّ «التّالي» الصغير بين شاشات العنصر */
    S.nextBtn = function (parent, label) {
      return new Promise((res) => {
        const b = h('button.bq-btn.mk-next', { type: 'button', onclick: () => { b.disabled = true; res(); } }, label || 'التّالي', BQ.icon('next'));
        parent.append(b); b.focus({ preventScroll: true });
      });
    };

    /**
     * جولة «اسمع والمس» بمحاولتين: cfg = {holder, items:[{id,img|glyph}], key, prompt(wrap), stim(),
     *   onCorrect(btn,R), onFirstError(btn,R,wrap), onSecondError(btn,correctBtn,R)} → Promise<R>
     */
    S.round = function (cfg) {
      return new Promise((resolve) => {
        const R = { key: cfg.key, attempts: 0, first: false, second: false, shown: false, assisted: false, replays: 0, order: cfg.items.map((i) => i.id) };
        let phase, auto = { stop() {} };
        const setPhase = (v) => { phase = v; stage.dataset.phase = v; }; // حالة للاختبار الآليّ
        setPhase('intro'); stage.dataset.key = cfg.key;
        const wrap = BQ.ui.choices(cfg.holder, { items: cfg.items, aria: 'صُوَرٌ لِلاخْتِيارِ', onPick });
        wrap.lock(true); wrap.classList.add('is-waiting');
        const byId = (id) => wrap.btns.find((b) => b.dataset.id === id);
        S.cur = {
          R, wrap,
          replay() { if (phase !== 'await') return false; R.replays++; S.log.replays++; auto.stop(); cfg.stim(); return true; },
          hide2() { // تلميح ٢ (من لوحة المعلّم): إخفاء بديل غير صحيح — مساعدة
            if (phase === 'done') return false;
            const vis = wrap.btns.filter((b) => !b.classList.contains('is-hidden'));
            const w = vis.filter((b) => b.dataset.id !== cfg.key);
            if (vis.length <= 2 || !w.length) return false;
            w[Math.floor(Math.random() * w.length)].classList.add('is-hidden'); R.assisted = true; return true;
          },
          assist() { R.assisted = true; },
        };
        (async () => {
          await cfg.prompt(wrap);
          setPhase('await'); wrap.lock(false); wrap.classList.remove('is-waiting');
          auto = S.autoReplay(() => { if (phase === 'await') cfg.stim(); });
        })();
        async function onPick(it, btn) {
          if (phase !== 'await') return;
          setPhase('fb'); wrap.lock(true); auto.stop();
          R.attempts++;
          if (it.id === cfg.key) {
            R.first = R.attempts === 1; R.second = R.attempts === 2;
            btn.classList.remove('is-dim');
            BQ.ui.ok(btn); S.sparkle(btn);
            await cfg.onCorrect(btn, R);
            setPhase('done'); resolve(R); return;
          }
          BQ.ui.shake(btn);
          if (R.attempts === 1) {
            await cfg.onFirstError(btn, R, wrap);
            setPhase('await'); wrap.lock(false); return;
          }
          R.shown = true; R.assisted = true;
          await cfg.onSecondError(btn, byId(cfg.key), R);
          setPhase('done'); resolve(R);
        }
      });
    };
    return S;
  }

  /** خلط مواضع البدائل: لا يبقى الصواب في الموضع نفسه ثلاث جولات متتالية؛ يُحفظ الموضع في hist */
  function arrange(options, key, hist) {
    let o = options;
    for (let k = 0; k < 40; k++) {
      o = BQ.shuffle(options);
      const pos = o.indexOf(key); const n = hist.length;
      const same = hist.last && hist.last === o.join('|'); // ترتيب البند السابق نفسه — يُرفض (QA-18)
      if (!same && !(n >= 2 && hist[n - 1] === pos && hist[n - 2] === pos)) break;
    }
    hist.push(o.indexOf(key)); hist.last = o.join('|');
    return o;
  }

  return { v: 4, session, arrange, css, CMP_SVG, SC, AR };
})());
/* EL14 «العب» — «بَوْصَلَةُ سَيْفٍ» · L1-01-AS-gme-103 · unscored:HotspotScene.
   v0-8 (pedagogy P1-5): غرفة البقع HTML هي التجربة الأساسية لـEL14؛ تحتها بطاقة اختيارية «رحلة الميم» (لعبة المحطّات)،
   وبطاقة «رحلة البوصلة» مطويّة للمعلّم «مراجعة الوحدة — للمعلّم، بعد دروس الوحدة» (فيها حروف لم تُدرَّس) بلا زرّ كبير للطفل.
   مناطق اللمس تُوسَّع بمنطقة غير مرئية حتى ٦٤ بكسل (٤–٦) أو ٤٨ على الأقلّ، دون تداخل.
   المستوى ١: اكتشاف حرّ (المس فاسمع) — الصحن: صبّ ثم «ماء.» · الباب: طرقتان · البوصلة: تكّة؛ بعد المصادر الثلاثة يظهر «التّالي».
   المستوى ٢: «أَيْنَ هَذا الصَّوْتُ؟» ٦ جولات (٤ لـ٤–٦ · ٨ لـ١٠–١٢)؛ كلّ مصدر يُوجَد تُضاء خرزة (تقدّم لا درجة، لا خسارة)؛
   الخرزة الأخيرة تفتح البوصلة وفيها «م» ← سيف «هَذِهِ الميمُ: م.» ← بارق «نَعَمْ! هَذا هُوَ!».
   قرارات البناء المطابقة لنسخة Godot (البوابة ١): الخطأ الأوّل «هَيّا، أَصْغوا مَرَّةً أُخْرى!» (§١٣) · عدد الخرزات = عدد الجولات ·
   لا «راجِعْ» في EL14 · الإبرة تشير إلى نصف الغرفة لا إلى المصدر. لا تُقال «باب» أبداً (وسم الباب: «مَصْدَرُ صَوْتٍ»).
   مناطق اللمس: بنية hotspots_img-033.json (لوحة 1280×720) مع إعادة معايرة الأرقام على صورة الغرفة الفعلية img-033. */
(function () {
  const h = BQ.h;
  const HOT = { // [x, y, w, h] في لوحة 1280×720 — الأصل (على النائب المرسوم): water_dish [160,280,430,230] · compass [620,330,200,190] · door [890,140,270,424]
    water_dish: { rect: [112, 330, 292, 138], aria: 'الإبريقُ وَالصَّحْنُ' },
    compass: { rect: [588, 408, 180, 130], aria: 'البَوْصَلَةُ' },
    door: { rect: [922, 34, 334, 532], aria: 'مَصْدَرُ صَوْتٍ' },
  };
  const DEMO_WALL = [600, 280];
  const CROP = { land: [0, 1280], port: [95, 1265] };
  const S_ = { pour: 'bariq_L1-01_sfx-water-pour', pour1: 'bariq_L1-01_sfx-water-pour-1s', knock: 'bariq_L1-01_sfx-door-knock', knockB: 'bariq_L1-01_sfx-door-knock-b', click: 'bariq_L1-01_sfx-compass', clickB: 'bariq_L1-01_sfx-compass-b', m: 'bariq_L1-01_snd-m_ar', mB: 'L1-01_d2_s5_01', maa: 'bariq_L1-01_vocab-w1_01_ar', maaB: 'L1-01_d2_s5_03' };
  const L = { listen: 'bariq_L1-01_ins-listen_ar', mission: 'bariq_L1-01_intro-1_05_ar', where: 'bariq_L1-01_ins-where_ar', yes: 'bariq_L1-01_fb-yes_ar', again: 'bariq_L1-01_d1-EL02_04_ar', contrast: 'bariq_L1-01_d1-FB_04_ar', meem: 'bariq_L1-01_L1-build_03_ar' };
  // gme-103 المستوى ٢ (الترتيب كما في games.json)
  const R6 = [
    { stim: [S_.pour], key: 'water_dish' }, { stim: [S_.knock], key: 'door' }, { stim: [S_.click], key: 'compass' },
    { stim: [S_.m, S_.mB], key: 'water_dish', ling: true }, { stim: [S_.maa, S_.maaB], key: 'water_dish', ling: true }, { stim: [S_.knockB, S_.knock], key: 'door' },
  ];
  const R4 = [R6[0], R6[1], R6[3], R6[4]]; // ٤–٦: صبّ · طرق · مْـ · ماء.
  const R8 = () => BQ.shuffle(R6.concat([{ stim: [S_.clickB, S_.click], key: 'compass' }, { stim: [S_.maaB, S_.maa], key: 'water_dish', ling: true }])); // ١٠–١٢ (Q-EL14-B8)
  const SC = '.bq-frame[data-el="EL14"]';
  const CSS = `
${SC} .e14-wrap { display: flex; align-items: center; justify-content: center; gap: clamp(16px, 3cqi, 28px); width: 100%; }
${SC} .e14-side { display: flex; flex-direction: column; align-items: center; gap: 14px; flex: none; }
${SC} .e14-scene { position: relative; flex: 1; max-width: 720px; aspect-ratio: 16 / 9; border-radius: var(--r-lg); overflow: hidden; border: 5px solid var(--white); box-shadow: 0 14px 34px var(--shade); background: var(--navy); touch-action: manipulation; }
${SC} .e14-plate { position: absolute; top: 0; height: 100%; background-size: 100% 100%; cursor: pointer; }
${SC} .e14-hot { position: absolute; border: 0; padding: 0; margin: 0; background-color: transparent; background-repeat: no-repeat; border-radius: 14px; cursor: pointer; transition: transform .2s ease-out, filter .3s, box-shadow .3s; }
${SC} .e14-hot::before { content: ""; position: absolute; inset: calc(-1 * var(--ey, 6px)) calc(-1 * var(--ex, 6px)); border-radius: inherit; } /* هامش لمس صغير؛ الصندوق نفسه ≥ ٦٠ (٤–٦) أو ٤٤ */
${SC}.show-zones .e14-hot::before { outline: 2px dotted var(--white); }
${SC} .e14-hot:focus-visible { outline: 4px solid var(--sun-soft); outline-offset: 2px; }
${SC} .e14-hot.jig { animation: e14Jig .55s ease-out; z-index: 2; box-shadow: 0 10px 22px rgba(0, 35, 61, .35); }
@keyframes e14Jig { 0% { transform: scale(1); } 30% { transform: scale(1.1) rotate(-2deg); } 60% { transform: scale(1.06) rotate(2deg); } 100% { transform: scale(1); } }
${SC} .e14-hot.ok { box-shadow: 0 0 0 5px var(--ok); z-index: 2; }
${SC} .e14-hot.glow { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 26px var(--sun); z-index: 2; animation: e14Glow .6s ease-in-out 2; }
@keyframes e14Glow { 50% { box-shadow: 0 0 0 9px var(--sun-soft), 0 0 40px var(--sun); } }
${SC} .e14-hot.dim { filter: brightness(.55) saturate(.7); }
${SC} .e14-hot .tick { position: absolute; top: -10px; inset-inline-start: -10px; width: clamp(26px, 5cqi, 38px); aspect-ratio: 1; border-radius: 50%; background: var(--ok); color: var(--white); display: block; box-sizing: border-box; padding: 6px; animation: bqPop .35s ease-out; box-shadow: 0 0 0 3px var(--white); }
${SC} .e14-hot .tick svg, ${SC} .e14-hot .ear svg { width: 100%; height: 100%; display: block; }
${SC} .e14-hot .ear { position: absolute; top: -8px; inset-inline-end: -8px; width: clamp(26px, 5cqi, 36px); aspect-ratio: 1; border-radius: 50%; background: var(--white); color: var(--navy); display: block; box-sizing: border-box; padding: 5px; animation: bqPop .35s ease-out; box-shadow: 0 3px 8px var(--shade); }
${SC}.show-zones .e14-hot { outline: 3px dashed var(--sun-soft); outline-offset: -3px; }
${SC} .e14-ripple { position: absolute; width: 56px; height: 56px; margin: -28px 0 0 -28px; border-radius: 50%; border: 3px solid var(--white); pointer-events: none; animation: e14Rip .6s ease-out forwards; }
@keyframes e14Rip { from { transform: scale(.3); opacity: .9; } to { transform: scale(1.4); opacity: 0; } }
${SC} .e14-hud { position: absolute; top: 3%; left: 50%; width: 24%; aspect-ratio: 1; transform: translateX(-50%); z-index: 3; pointer-events: none; filter: drop-shadow(0 8px 12px rgba(0, 35, 61, .35)); transition: opacity .4s; }
${SC} .e14-hud svg { width: 100%; height: 100%; display: block; overflow: visible; }
${SC} .e14-hud .case { fill: var(--sun); stroke: var(--white); stroke-width: 2.5; }
${SC} .e14-hud .face { fill: var(--paper); stroke: var(--paper-edge); stroke-width: 1.5; }
${SC} .e14-hud .bd { fill: var(--sky-wash); stroke: var(--sun-edge); stroke-width: 1.2; transition: fill .35s; }
${SC} .e14-hud .bd.on { fill: var(--sun-soft); stroke: var(--white); stroke-width: 1.6; }
${SC} .e14-hud .bd.cur { stroke: var(--coral); stroke-width: 2.4; }
${SC} .e14-hud .ndl { transition: transform .6s cubic-bezier(.3,1.4,.5,1); transform-origin: 50px 50px; }
${SC} .e14-hud .ndl.shiver { animation: e14Shiver .22s ease-in-out 8 alternate; }
@keyframes e14Shiver { from { rotate: -7deg; } to { rotate: 7deg; } }
${SC} .e14-hud .ndl.spin { animation: e14Spin .9s cubic-bezier(.3,.8,.4,1); }
@keyframes e14Spin { to { rotate: 360deg; } }
${SC} .e14-hud .n { fill: var(--coral); } ${SC} .e14-hud .s { fill: var(--navy); } ${SC} .e14-hud .pin { fill: var(--white); }
${SC} .e14-next { position: absolute; bottom: 5%; left: 0; right: 0; margin: 0 auto; width: max-content; z-index: 4; }
${SC} .e14-big { position: absolute; inset: 0; z-index: 6; display: grid; place-items: center; background: rgba(0, 35, 61, .30); backdrop-filter: blur(3px); animation: e14Fade .4s ease-out; }
@keyframes e14Fade { from { opacity: 0; } }
${SC} .e14-bigc { position: relative; width: clamp(200px, 40cqi, 330px); aspect-ratio: 1; perspective: 900px; }
${SC} .e14-bigc .body { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 35% 30%, var(--tile), var(--sun) 60%, var(--sun-edge)); border: 6px solid var(--white); box-shadow: 0 18px 40px rgba(0, 35, 61, .3); display: grid; place-items: center; }
${SC} .e14-bigc .dial { width: 78%; aspect-ratio: 1; border-radius: 50%; background: var(--paper); border: 3px solid var(--paper-edge); display: grid; place-items: center; }
${SC} .e14-bigc .glyph { font: 700 clamp(100px, 22cqi, 190px)/1 var(--ff-child); color: var(--coral); padding-bottom: .16em; opacity: 0; transform: scale(.4); transition: opacity .4s .5s, transform .6s .5s cubic-bezier(.2,1.5,.4,1); }
${SC} .e14-bigc .lid { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 40% 35%, var(--tile), var(--sun) 65%); border: 6px solid var(--white); transform-origin: 50% 0%; transition: transform 1s cubic-bezier(.5,0,.3,1); display: grid; place-items: center; backface-visibility: hidden; }
${SC} .e14-bigc .lid::after { content: ""; width: 30%; aspect-ratio: 1; border-radius: 50%; border: 3px solid var(--sun-edge); opacity: .6; }
${SC} .e14-bigc.open .lid { transform: rotateX(-165deg); }
${SC} .e14-bigc.open .glyph { opacity: 1; transform: none; }
${SC} .e14-bigc .ring { position: absolute; inset: -6%; }
${SC} .e14-bigc .ring i { position: absolute; left: 50%; top: 50%; width: 7%; aspect-ratio: 1; margin: -3.5%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, var(--white) 0 14%, var(--sun-soft) 40%, var(--sun)); box-shadow: 0 0 12px var(--sun-soft); }
${SC} .e14-more { display: grid; gap: 12px; justify-items: center; margin: 18px auto 4px; width: min(100%, 560px); }
${SC} .e14-more h3 { margin: 0; justify-self: start; font: 600 14px/1.4 var(--ff-ui); color: var(--muted); }
${SC} .e14-more .bq-gcard { width: 100%; }
${SC} .e14-more .bq-gcard .go { min-height: 48px; }
${SC} .e14-unit { width: 100%; box-sizing: border-box; background: var(--white); border: 1.5px solid var(--sky-line); border-radius: var(--r-md); padding: 0 14px; font: 500 14px/1.7 var(--ff-ui); color: var(--ink); }
${SC} .e14-unit summary { min-height: 48px; display: list-item; line-height: 48px; cursor: pointer; font-weight: 600; color: var(--navy); }
${SC} .e14-unit p { margin: 0 0 10px; color: var(--muted); }
${SC} .e14-unit .bq-btn { margin-bottom: 12px; font-size: 14px; min-height: 44px; }
@container stage (max-width: 560px) {
  ${SC} .e14-wrap { flex-direction: column-reverse; gap: 16px; }
  ${SC} .e14-scene { flex: none; width: 100%; aspect-ratio: 1170 / 720; border-width: 4px; }
  ${SC} .e14-hud { width: 25%; top: 3%; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .e14-hot.jig, ${SC} .e14-hot.glow, ${SC} .e14-hud .ndl.shiver, ${SC} .e14-hud .ndl.spin, ${SC} .e14-ripple, ${SC} .e14-big { animation: none !important; }
  ${SC} .e14-hud .ndl, ${SC} .e14-bigc .lid, ${SC} .e14-bigc .glyph { transition: none; }
}`;

  function hudSvg(n) {
    let beads = '';
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2; // تبدأ من الأعلى مع عقارب الساعة
      beads += `<circle class="bd" data-i="${i}" cx="${(50 + 41.5 * Math.cos(a)).toFixed(2)}" cy="${(50 + 41.5 * Math.sin(a)).toFixed(2)}" r="5.6"/>`;
    }
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="case" cx="50" cy="50" r="48"/><circle class="face" cx="50" cy="50" r="33"/>${beads}<g class="ndl"><path class="n" d="M50 21l6 29h-12z"/><path class="s" d="M50 79l-6-29h12z"/><circle class="pin" cx="50" cy="50" r="3.2"/></g></svg>`;
  }

  function render(stage, ctx) {
    MK.css('st-EL14', CSS);
    const S = MK.session(ctx);
    const ROUNDS = S.age === '4-6' ? R4 : S.age === '10-12' ? R8() : R6;
    const N = ROUNDS.length;
    const portrait = () => S.stage.getBoundingClientRect().width < 560;
    const crop = portrait() ? CROP.port : CROP.land;
    const cw = crop[1] - crop[0];
    let phase = 'intro', curRound = null, replays = 0, results = [];
    const setPhase = (v) => { phase = v; S.stage.dataset.phase = v; };

    /* ---- لوحة المعلّم ---- */
    const box = S.adultBox('أدوات المعلّم · غير مرصود');
    const zb = h('button', { type: 'button', 'aria-pressed': 'false', onclick: () => { const on = S.frame.classList.toggle('show-zones'); zb.setAttribute('aria-pressed', String(on)); } }, 'إظهار المناطق');
    let curR = null;
    const h2 = h('button', { type: 'button', onclick: () => { if (curRound && phase === 'await') { Object.keys(spots).forEach((k) => spots[k].classList.toggle('dim', k !== curRound.key)); if (curR) curR.assisted = true; S.adultNote(box, 'تلميح ٢: عُتِّم ما ليس مصدراً لهذا الصوت — سُجّلت الجولة «بمساعدة».'); } } }, 'تلميح ٢: عتّم غير المصدر');
    box.append(zb, h2);
    const logEl = S.adultLog(box, 'ما سُجِّل في كلّ جولة', 'يُسجَّل: هل وجد المصدر من أوّل لمسة، وعدد مرّات إعادة الصوت — بلا نقاط ولا خسارة.');
    const showLog = () => { logEl.innerHTML = results.map((r, i) => `الجولة ${MK.AR(i + 1)}: ${r.first && !r.assisted ? 'من أوّل لمسة' : r.second ? 'بعد إعادة' : r.shown ? 'أُظهر له المصدر' : 'بمساعدة'}`).join('<br>') + (replays ? `<br>أعاد الصوت ${MK.AR(replays)} مرّة.` : ''); };

    /* ---- المشهد ---- */
    const wrap = h('div.e14-wrap');
    const scene = h('div.e14-scene', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
    const plate = h('div.e14-plate', { style: { width: (1280 / cw) * 100 + '%', left: (-crop[0] / cw) * 100 + '%', backgroundImage: 'url("' + BQ.img('img-033') + '")' } });
    scene.append(plate);
    const spots = {};
    Object.keys(HOT).forEach((k) => {
      const [x, y, w, hh] = HOT[k].rect;
      const b = h('button.e14-hot', {
        type: 'button', 'aria-label': HOT[k].aria, dataset: { id: k },
        style: { left: (x / 1280) * 100 + '%', top: (y / 720) * 100 + '%', width: (w / 1280) * 100 + '%', height: (hh / 720) * 100 + '%', backgroundImage: 'url("' + BQ.img('img-033') + '")', backgroundSize: `${(1280 / w) * 100}% ${(720 / hh) * 100}%`, backgroundPosition: `${(x / (1280 - w)) * 100}% ${(y / (720 - hh)) * 100}%` },
        onclick: (e) => { e.stopPropagation(); onSpot(k, b); },
      });
      spots[k] = b; plate.append(b);
    });
    plate.addEventListener('click', (e) => { // لمس بقعة فارغة: تموّج هادئ بلا صوت ولا حكم
      const r = plate.getBoundingClientRect();
      const rp = h('span.e14-ripple', { style: { left: e.clientX - r.left + 'px', top: e.clientY - r.top + 'px' } });
      plate.append(rp); setTimeout(() => rp.remove(), 700);
    });
    /* منطقة لمس غير مرئية لا تقلّ عن ٦٤ بكسل (٤–٦) أو ٤٨ — تُعاد معايرتها مع حجم المشهد */
    const MIN = portrait() ? 126 : (S.age === '4-6' ? 60 : 44); // QA-24: على الهاتف ≥ ١٢٠ بكسل (هامش للتقريب)؛ العرض يحدّه عرض الغرفة (ثلاثة مصادر متجاورة)
    const place = (b, [x, y, w, hh]) => Object.assign(b.style, { left: (x / 1280) * 100 + '%', top: (y / 720) * 100 + '%', width: (w / 1280) * 100 + '%', height: (hh / 720) * 100 + '%', backgroundSize: `${(1280 / w) * 100}% ${(720 / hh) * 100}%`, backgroundPosition: `${(x / (1280 - w)) * 100}% ${(y / (720 - hh)) * 100}%` });
    /* الصندوق المرئيّ نفسه لا يقلّ عن ٦٠×٦٠ (٤–٦) أو ٤٤×٤٤: يُوسَّع حول مركزه داخل اللوحة (لا تتداخل المناطق: الفجوات ≥ ١٨٤ وحدة) */
    const fitHits = () => {
      const pw = plate.getBoundingClientRect().width; if (!pw) return;
      const u = pw / 1280; // بكسل لكلّ وحدة لوحة
      const R = {};
      Object.keys(spots).forEach((k) => {
        let [x, y, w, hh] = HOT[k].rect;
        const mw = Math.ceil(MIN / u) + 2, mh = Math.ceil(MIN / u) + 2;
        if (w < mw) { x -= (mw - w) / 2; w = mw; }
        if (hh < mh) { y -= (mh - hh) / 2; hh = mh; }
        x = Math.max(0, Math.min(1280 - w, x)); y = Math.max(0, Math.min(720 - hh, y));
        R[k] = [x, y, w, hh];
      });
      // صندوقان متجاوران كبرا حتى تداخلا: يُقسم التداخل عند منتصفه (لا لمسة تقع في صندوقين)
      const ks = Object.keys(R).sort((a, b) => R[a][0] - R[b][0]);
      for (let i = 0; i + 1 < ks.length; i++) {
        const a = R[ks[i]], b = R[ks[i + 1]];
        const ov = a[0] + a[2] - b[0];
        if (ov > 0 && a[1] < b[1] + b[3] && b[1] < a[1] + a[3]) { const m = b[0] + ov / 2; a[2] = m - 1 - a[0]; b[2] = b[0] + b[2] - m; b[0] = m; }
      }
      Object.keys(R).forEach((k) => place(spots[k], R[k]));
    };
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => { if (S.ok()) fitHits(); }); ro.observe(scene); ctx.onCleanup(() => ro.disconnect()); }
    const hud = h('div.e14-hud', { html: hudSvg(N), role: 'img', 'aria-label': 'بَوْصَلَةُ سَيْفٍ' });
    scene.append(hud);
    const ndl = hud.querySelector('.ndl');
    const bds = [...hud.querySelectorAll('.bd')];
    const side = h('div.e14-side');
    const listen = S.listen(() => replay());
    side.append(listen);
    wrap.append(side, scene);
    S.mount(); S.body.append(wrap);
    fitHits();
    const steps = S.steps(2); steps.set(0);

    const setNeedle = (deg) => { ndl.style.transform = `rotate(${deg}deg)`; };
    const angleTo = (px, py) => { // زاوية من مركز البوصلة إلى نقطة (بكسل الشاشة) — 0 = أعلى
      const hr = hud.getBoundingClientRect(); const cx = hr.left + hr.width / 2, cy = hr.top + hr.height / 2;
      return (Math.atan2(px - cx, -(py - cy)) * 180) / Math.PI;
    };
    const spotCenter = (k) => { const r = spots[k].getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
    function jig(b) { b.classList.remove('jig'); void b.offsetWidth; b.classList.add('jig'); setTimeout(() => b.classList.remove('jig'), 600); }
    function ownSound(k, full) { // ما لُمس يُسمِع صوته هو
      if (k === 'water_dish') return full ? [S_.pour, S.pick(S_.maa, S_.maaB)] : [S_.pour1];
      return [k === 'door' ? S_.knock : S_.click];
    }
    async function playList(list, cap) { for (const id of list) { await S.play(id, cap ? {} : { noCaption: true }); } }

    /* ---- المستوى ١: المس فاسمع ---- */
    const heard = new Set();
    let l1done = null;
    async function level1() {
      setPhase('intro');
      ctx.instruction('هَيّا، أَصْغوا مَعي!');
      ctx.onReplay(() => S.play(L.mission));
      await S.play(L.listen);
      await S.play(L.mission); // سيف: «بَوْصَلَتي إِلى الأَصْواتِ!»
      // نموذج: يد شبحية تلمس بقعة فارغة من الجدار ثم ترتفع (لا تشير إلى مصدر)
      const pr = plate.getBoundingClientRect(), sr = S.stage.getBoundingClientRect();
      await S.ghost([[pr.left - sr.left + (DEMO_WALL[0] / 1280) * pr.width, pr.top - sr.top + (DEMO_WALL[1] / 720) * pr.height]]);
      setPhase('l1');
      await new Promise((r) => { l1done = r; });
    }
    let l1busy = 0;
    async function onL1(k, b) {
      const my = ++l1busy;
      jig(b);
      if (!heard.has(k)) { heard.add(k); b.append(h('span.ear', { 'aria-hidden': 'true', html: BQ.icons.ear })); }
      const list = ownSound(k, true);
      for (let i = 0; i < list.length; i++) { if (my !== l1busy) return; await S.play(list[i], i ? {} : { noCaption: true }); }
      if (heard.size === 3 && !scene.querySelector('.e14-next') && l1done) {
        await S.sleep(300);
        const nb = S.nextBtn(scene, 'التّالي'); scene.querySelector('.mk-next').classList.add('e14-next');
        nb.then(() => { scene.querySelector('.e14-next').remove(); const f = l1done; l1done = null; f(); });
      }
    }

    /* ---- المستوى ٢: أين هذا الصوت؟ ---- */
    const stimOf = (it) => S.pick(...it.stim);
    async function playStim(it) { listen.playing(true); await S.play(stimOf(it), { noCaption: true }); listen.playing(false); }
    let auto = { stop() {} };
    function replay() {
      if (phase === 'await' && curRound) { replays++; auto.stop(); showLog(); playStim(curRound); }
      else if (phase === 'l1') S.play(L.mission);
    }
    let pick = null;
    function onSpot(k, b) {
      if (phase === 'l1') return onL1(k, b);
      if (phase === 'await' && pick) pick(k, b);
    }
    async function round(it, i) {
      curRound = it; S.stage.dataset.key = it.key;
      bds.forEach((d, j) => d.classList.toggle('cur', j === i));
      Object.values(spots).forEach((s) => s.classList.remove('ok', 'glow', 'dim'));
      scene.querySelectorAll('.e14-hot .tick').forEach((t) => t.remove());
      setPhase('intro');
      if (i === 0 || S.age === '4-6') await S.play(L.where); // «أَيْنَ هَذا الصَّوْتُ؟»
      ndl.classList.remove('spin'); void ndl.getBoundingClientRect(); if (!BQ.reduced()) ndl.classList.add('spin'); // البوصلة «تُصغي»
      await S.sleep(500);
      await playStim(it);
      ndl.classList.remove('spin');
      setPhase('await');
      auto = S.autoReplay(() => { if (phase === 'await') playStim(it); });
      const R = { first: false, second: false, shown: false, assisted: false };
      curR = R;
      let tries = 0;
      await new Promise((resolve) => {
        pick = async (k, b) => {
          setPhase('fb'); auto.stop(); tries++;
          jig(b);
          if (k === it.key) {
            R.first = tries === 1; R.second = tries === 2;
            b.classList.add('ok'); b.append(h('span.tick', { 'aria-hidden': 'true', html: BQ.icons.check })); S.sparkle(b);
            await S.fly(b, bds[i]); bds[i].classList.add('on'); BQ.audio.fx(BQ.sfx.bead, 0.55); // خرزة تُضاء — تقدّم لا درجة
            await S.bariq(L.yes);
            return resolve();
          }
          if (tries === 1) {
            await playList(ownSound(k)); // ما لُمس يُسمِع صوته — لا خطأ
            await S.play(L.again); // «هَيّا، أَصْغوا مَرَّةً أُخْرى!»
            // تلميح ١: الإبرة ترتجف نحو نصف الغرفة الذي فيه المصدر (لا نحو المصدر نفسه)
            const sr = scene.getBoundingClientRect(); const [sx] = spotCenter(it.key);
            const leftHalf = sx < sr.left + sr.width / 2;
            setNeedle(leftHalf ? -90 : 90); ndl.classList.add('shiver'); setTimeout(() => ndl.classList.remove('shiver'), 2000);
            S.adultNote(box, '<b>تلميح ١:</b> الصوت يأتي من جهة — الإبرة ترتجف نحو نصف الغرفة الذي فيه المصدر، لا نحو المصدر نفسه.');
            await S.sleep(400);
            await playStim(it);
            setPhase('await'); return;
          }
          // الخطأ الثاني: الإبرة تستقرّ نحو المصدر (٦٠٠ مللي ث) ويلمع ويُسمَع؛ ثم مقابلة «هَذا، وَهَذا»
          R.shown = true;
          S.adultNote(box, null);
          setNeedle(angleTo(...spotCenter(it.key)));
          await S.sleep(650);
          spots[it.key].classList.add('glow');
          await playStim(it);
          await S.play(L.contrast);
          jig(b); await playList(ownSound(k));
          await S.sleep(250);
          jig(spots[it.key]); await playStim(it);
          spots[it.key].classList.remove('glow'); spots[it.key].classList.add('ok');
          await S.fly(spots[it.key], bds[i]); bds[i].classList.add('on'); BQ.audio.fx(BQ.sfx.bead, 0.55); // لا خسارة: الخرزة تُضاء بعد الإظهار
          resolve();
        };
      });
      pick = null;
      setNeedle(0);
      results.push(R); showLog();
      await S.sleep(350);
    }

    async function finale() {
      setPhase('end');
      ctx.instruction('هَذِهِ الميمُ: م.');
      bds.forEach((d) => d.classList.remove('cur'));
      hud.style.opacity = '0';
      const big = h('div.e14-big', { 'aria-hidden': 'true' });
      const ring = h('div.ring');
      for (let i = 0; i < N; i++) { const a = -Math.PI / 2 + (i / N) * Math.PI * 2; ring.append(h('i', { style: { transform: `translate(${Math.cos(a) * 730}%, ${Math.sin(a) * 730}%)` } })); }
      const bc = h('div.e14-bigc', null, h('div.body', null, h('div.dial', null, h('span.glyph', null, 'م'))), h('div.lid'), ring);
      big.append(bc); S.stage.append(big);
      BQ.audio.fx(S_.click, 0.7);
      await S.sleep(600);
      bc.classList.add('open'); // البوصلة تنفتح وفيها «م»
      await S.sleep(1100);
      S.sparkle(bc, 12);
      await S.play(L.meem); // سيف: «هَذِهِ الميمُ: م.»
      await S.bariq(L.yes); // بارق: «نَعَمْ! هَذا هُوَ!»
      if (!S.ok()) return;
      ctx.done();
      BQ.ui.endCard(S.stage, { title: 'هَذِهِ الميمُ: م.', onReplay: () => BQ.open('EL14', { skipCover: true }) });
    }

    async function flow() {
      await S.sleep(50);
      await level1();
      ctx.instruction('أَيْنَ هَذا الصَّوْتُ؟'); steps.set(1);
      ctx.onReplay(replay);
      Object.values(spots).forEach((s) => { const e = s.querySelector('.ear'); if (e) e.remove(); });
      for (let i = 0; i < N; i++) await round(ROUNDS[i], i);
      await finale();
    }
    flow();
    return { S, box };
  }

  /* الصفحة (v0-9): التجربة الأساسية لعبة Godot «بارِقٌ يوقِظُ البَوْصَلَةَ» (محطّة play في games/meem) عبر BQ.ui.godotRender؛
     الغرفة HTML بديل آليّ (بلا WebGL أو إن تعذّر التحميل) ورابط «النسخة الخفيفة» للمعلّم. تحت المسرح «لعب إضافيّ»: بطاقة «رحلة الميم»
     الاختيارية وبطاقة «رحلة البوصلة» مطويّة للمعلّم. فتح أيّ منهما يوقف اللعبة الأساسية ويضعه في المسرح، و«العودة إلى اللعبة» يعيدها. */
  const playSummary = (r) => {
    r = r || {};
    const A = MK.AR;
    const lv = Array.isArray(r.levels) ? r.levels : [];
    const names = ['أصوات البيت', 'فقّاعات الميم', 'جسر الأصوات', 'املأ الصحن', 'البوصلة تضيء'];
    const rows = lv.map((x, i) => x && x.items ? `${names[i] || ('المستوى ' + A(i + 1))}: ${A(x.first_try || 0)} من ${A(x.items)} من أوّل محاولة` + (x.assisted ? ` · ${A(x.assisted)} بعد تلميح` : '') + (x.revealed ? ` · ${A(x.revealed)} أظهرته اللعبة` : '') : '').filter(Boolean);
    return '<p class="goal"><b>«العب» — بارِقٌ يوقِظُ البَوْصَلَةَ (غير مرصود):</b> أتمّ الطفل المستويات الخمسة' + (r.stars ? ' ونال ' + A(r.stars) + ' من ٣ نجوم' : '') + (r.minutes ? ' في نحو ' + A(Math.max(1, Math.round(r.minutes))) + ' دقائق' : '') + '.</p>' +
      (rows.length ? '<p>' + rows.join('<br>') + '</p>' : '') +
      '<p>إعادات الصوت: ' + A(r.replays || 0) + '. النجوم للتشجيع وحده؛ الرصد في «تدرّب» (EL13).</p>';
  };

  function renderPage(stage, ctx) {
    let room = null;        // الغرفة HTML حين تعمل بديلاً
    let killPrimary = null; // إيقاف لعبة «العب» الأساسية (destroy من godotRender)
    let g = null;           // لعبة إضافية مفتوحة في المسرح
    const roomRender = (st, c) => { room = render(st, c); return room; };
    const canGame = !!(BQ.ui.godot && BQ.ui.godotOK && BQ.ui.godotOK());
    if (canGame && BQ.ui.godotRender) {
      // ctx2: نلتقط دالّة التنظيف لنوقف اللعبة الأساسية عند فتح لعبة أخرى (فلا يعمل مراقب التحميل بعدها)
      const ctx2 = Object.create(ctx);
      ctx2.onCleanup = (fn) => { killPrimary = fn; ctx.onCleanup(fn); };
      BQ.ui.godotRender('play', roomRender, {
        name: 'العب', title: 'بارِقٌ يوقِظُ البَوْصَلَةَ',
        after(c, r, st) {
          const ab = ctx.frame.querySelector('.elp-adult-body');
          if (ab) { const old = ab.querySelector('.e14-gres'); if (old) old.remove(); ab.prepend(h('div.e14-gres', { html: playSummary(r) })); }
          BQ.ui.endCard(st, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open('EL14', { skipCover: true, history: 'replace' }) });
        },
      })(stage, ctx2);
    } else {
      roomRender(stage, ctx);
    }

    const openGame = (src, station, title, btn) => {
      if (killPrimary) { try { killPrimary(); } catch (e) {} killPrimary = null; }
      if (room) { room.S.kill(); room.box.remove(); room = null; }
      const alt = ctx.frame.querySelector('.bq-alt-run'); if (alt && alt.parentNode) alt.parentNode.remove();
      BQ.audio.stop();
      if (g) { g.destroy(); g = null; }
      stage.replaceChildren(); ctx.instruction('');
      delete stage.dataset.phase;
      g = BQ.ui.godot(stage, { src, station, age: ctx.age(), title,
        onDone(m) {
          if (station && m.station !== station) return;
          if (typeof ctx.alive === 'function' && !ctx.alive()) return;
          ctx.done();
          const sm = BQ.ui.godotSummary && station ? BQ.ui.godotSummary(station, m.result || {}) : null;
          if (sm && sm.html) { const ab = ctx.frame.querySelector('.elp-adult-body'); if (ab) { const old = ab.querySelector('.e14-gres'); if (old) old.remove(); ab.prepend(h('div.e14-gres', { html: sm.html })); } }
          if (!stage.querySelector('.bq-end')) BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open('EL14', { skipCover: true }) });
          const rb = stage.querySelector('.bq-end .bq-btn.ghost'); if (rb) { const ic = rb.querySelector('.bq-ic'); rb.replaceChildren(ic || '', 'العودة إلى اللعبة'); }
        } });
      if (btn) { btn.textContent = 'العودة إلى اللعبة'; btn.onclick = () => BQ.open('EL14', { skipCover: true }); }
      const sc = ctx.frame.querySelector('.elp-stage');
      if (sc && sc.scrollIntoView) sc.scrollIntoView({ block: 'start', behavior: BQ.reduced() ? 'auto' : 'smooth' });
    };
    ctx.onCleanup(() => { if (g) g.destroy(); });

    const more = h('section.e14-more', { 'aria-label': 'لَعِبٌ إِضافِيٌّ' }, h('h3', null, 'لعب إضافيّ — اختياريّ'));
    if (canGame) {
      const go = h('button.go', { type: 'button' }, 'العب');
      go.onclick = () => openGame(null, 'journey', 'رحلة الميم', go);
      more.append(h('div.bq-gcard', null,
        h('img', { src: 'games/meem/index.icon.png', alt: '' }),
        h('span', null, h('b', null, 'رحلة الميم'), h('small', null, 'محطّات هذا الدرس في لعبة واحدة — إن رغب الطفل في اللعب مرّة أخرى')),
        go));
    }
    const unit = h('details.e14-unit', null,
      h('summary', null, 'مراجعة الوحدة — للمعلّم، بعد دروس الوحدة'),
      h('p', null, '«رحلة البوصلة» لعبة لمراجعة الوحدة الأولى كلّها، وفيها حروف وكلمات لم تُدرَّس بعد؛ افتحها بعد إتمام دروس الوحدة، لا في هذا الدرس.'));
    if (canGame) {
      const ob = h('button.bq-btn.ghost', { type: 'button' }, 'افتح لعبة المراجعة');
      ob.onclick = () => openGame('games/rehla/index.html', null, 'رحلة البوصلة', ob);
      unit.append(ob);
    }
    more.append(unit);
    const cap = ctx.frame.querySelector('.elp-cap');
    (cap || stage).after(more);
  }

  BQ.register('EL14', { hero: 'img-033', cover: 'لعبة: يساعد الطفل بارقاً على إيقاظ بوصلة الأصوات — يجد مصدر كلّ صوت، ويلتقط «مْـ»، ويملأ الصحن بالماء.', render: renderPage });
})();
})();
