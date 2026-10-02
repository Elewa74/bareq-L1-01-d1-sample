/* EL05 — بارق L1-01-d1 · مسوّدة · مبنيّ من kit.js + EL05.body.js (WP2 v0-8) */
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
/* EL05 «التراكيب اللغوية» — غير مرصود · شاشتان:
   (١) «اسمع وردّد»: أربع صور تظهر واحدةً بعد واحدة، كلٌّ بجملتها على نمط «هَذا/هَذِهِ …» ثم سكتة ترديد (٤/٣/٢ ث بحسب العمر).
   (٢) L1-01-AS-gme-105 «المس ما يقول ماجد»: ٣ جولات جملة ← صورة من ثلاث، محاولتان ثم يُعرض الصواب، ثم «راجِعْ» للمُخطأ فيه.
   لا مصطلح ولا «مذكّر/مؤنّث» ولا كلمة مكتوبة تحت الصور. البنود من DIGITAL/games.json (gme-105). */
(function () {
  const h = BQ.h;
  const IMG = { 'img-001': { img: 'img-001' }, 'img-101': { img: 'img-101' }, 'img-103': { img: 'img-103' }, 'img-024': { glyph: 'م' } };
  const SENT = { // الصورة ← جملتها
    'img-001': 'bariq_L1-01_intro-1_08_ar', // هَذا صَوْتُ الماءِ.
    'img-101': 'bariq_L1-01_L1-build_01_ar', // هَذا فَمُ سَيْفٍ.
    'img-103': 'bariq_L1-01_d1-EL05_01_ar', // هَذِهِ بَوْصَلَةُ سَيْفٍ.
    'img-024': 'bariq_L1-01_d1-EL05_02_ar', // هَذِهِ الميمُ: م.
  };
  const STRIP = ['img-001', 'img-101', 'img-103', 'img-024'];
  const ROUNDS = [
    { r: 1, opts: ['img-103', 'img-101', 'img-024'], key: 'img-103' },
    { r: 2, opts: ['img-001', 'img-103', 'img-101'], key: 'img-101' },
    { r: 3, opts: ['img-024', 'img-001', 'img-101'], key: 'img-024' },
  ];
  const L = { say: 'bariq_L1-01_ins-say_ar', listen: 'bariq_L1-01_ins-listen_ar', where: 'bariq_L1-01_d1-EL05_03_ar', yes: 'bariq_L1-01_fb-yes_ar', retry: 'bariq_L1-01_fb-retry_ar', contrast: 'bariq_L1-01_d1-FB_04_ar' };
  const PAUSE = { '4-6': 4000, '7-9': 3000, '10-12': 2000 };
  const SC = '.bq-frame[data-el="EL05"]';
  const CSS = `
${SC} .e05-strip { display: flex; gap: clamp(10px, 2.6cqi, 24px); justify-content: center; align-items: flex-end; }
${SC} .e05-card { position: relative; width: clamp(110px, 20cqi, 200px); aspect-ratio: 1; border-radius: var(--r-md); overflow: hidden; background: color-mix(in srgb, var(--white) 55%, transparent); border: 3px dashed var(--sky-line); display: grid; place-items: center; transition: transform .45s cubic-bezier(.2,1.3,.4,1), opacity .35s, box-shadow .3s; }
${SC} .e05-card > * { visibility: hidden; }
${SC} .e05-card:not(.in) { border: 3px solid var(--white); background: linear-gradient(110deg, var(--white) 35%, var(--sky-wash) 50%, var(--white) 65%) 0 0 / 300% 100%; opacity: .55; animation: e05Wait 2.4s linear infinite; }
@keyframes e05Wait { to { background-position: -150% 0; } }
${SC} .e05-card.now::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 4px var(--sun-soft); animation: e05Now 1.4s ease-in-out infinite; pointer-events: none; }
@keyframes e05Now { 50% { box-shadow: inset 0 0 0 8px var(--sun-soft); } }
${SC} .e05-card.in { background: var(--white); border: 4px solid var(--white); box-shadow: 0 6px 0 var(--sky-line), 0 12px 24px var(--shade); opacity: .6; animation: e05In .5s cubic-bezier(.2,1.3,.4,1); }
${SC} .e05-card.in > * { visibility: visible; }
@keyframes e05In { from { opacity: 0; transform: translateY(24px) scale(.85); } }
${SC} .e05-strip.all .e05-card { opacity: 1; }
${SC} .e05-card.now { opacity: 1; transform: translateY(-10px) scale(1.07); box-shadow: 0 0 0 5px var(--sun-soft), 0 18px 30px var(--shade); }
${SC} .e05-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
${SC} .e05-card .g { font: 700 clamp(64px, 13cqi, 140px)/1 var(--ff-child); color: var(--coral); padding-bottom: .14em; }
${SC} .e05-turn { display: flex; align-items: center; justify-content: center; min-height: 72px; }
${SC} .e05-turn .mk-hint { padding: 10px 18px; opacity: 0; transform: scale(.85); transition: opacity .25s, transform .25s; animation: none; }
${SC} .e05-turn.on .mk-hint { opacity: 1; transform: none; }
${SC} .e05-turn .bq-ic { width: clamp(36px, 7cqi, 52px); height: clamp(36px, 7cqi, 52px); color: var(--coral); }
${SC} .e05-turn.on .bq-ic { animation: e05Say .6s ease-in-out infinite alternate; }
@keyframes e05Say { to { transform: scale(1.15); } }
${SC} .e05-dots { display: flex; gap: 6px; }
${SC} .e05-dots i { width: 10px; height: 10px; border-radius: 50%; background: var(--navy); opacity: .25; }
${SC} .e05-turn.on .e05-dots i { animation: e05Dot 1.2s ease-in-out infinite; }
${SC} .e05-turn.on .e05-dots i:nth-child(2) { animation-delay: .2s; }
${SC} .e05-turn.on .e05-dots i:nth-child(3) { animation-delay: .4s; }
@keyframes e05Dot { 50% { opacity: 1; transform: translateY(-5px); } }
${SC} .e05-intro { padding: 18px 26px; }
${SC} .e05-intro .bq-ic { width: clamp(52px, 10cqi, 84px); height: clamp(52px, 10cqi, 84px); }
${SC} .e05-say4 .bq-choices { flex-wrap: wrap; }
${SC} .e05-say4 .bq-choice { width: clamp(96px, 19cqi, 190px); }
@container stage (max-width: 560px) {
  ${SC} .e05-strip { flex-wrap: wrap; max-width: 300px; }
  ${SC} .e05-card { width: 132px; }
  ${SC} .e05-say4 .bq-choices { max-width: 300px; }
  ${SC} .e05-say4 .bq-choice { width: 128px; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .e05-card, ${SC} .e05-card.now { transform: none; transition: opacity .2s; }
  ${SC} .e05-turn.on .bq-ic, ${SC} .e05-turn.on .e05-dots i, ${SC} .e05-card:not(.in), ${SC} .e05-card.now::after { animation: none; opacity: 1; }
  ${SC} .e05-card:not(.in) { opacity: .55; }
}`;

  function render(stage, ctx) {
    MK.css('st-EL05', CSS);
    const S = MK.session(ctx);
    const pause = PAUSE[S.age] || 3000;
    let support = false; // «يحتاج دعماً» (٤–٦): صورتان بدل ثلاث
    const rounds = {};
    const box = S.adultBox('أدوات المعلّم · غير مرصود');
    if (S.age === '4-6') {
      const cb = h('input', { type: 'checkbox', onchange: () => { support = cb.checked; } });
      box.append(h('label', null, cb, 'يحتاج دعماً: صورتان بدل ثلاث في «المس ما يقول ماجد»'));
    }
    const logEl = S.adultLog(box, 'ما سُجِّل في كلّ جولة', 'يُسجَّل: إتمام النشاط، والمحاولة الأولى، وعدد مرّات إعادة الصوت.');
    const note = (t) => S.adultNote(box, t);
    const showLog = () => {
      const f = (rs) => rs.map((R, i) => `الجولة ${MK.AR(i + 1)}: ${R.first && !R.assisted ? 'من أوّل مرّة' : R.second ? 'بعد إعادة' : 'أُظهر له الجواب'}${R.replays ? ' · أعاد الصوت ' + MK.AR(R.replays) : ''}`).join('<br>');
      logEl.innerHTML = [rounds.main && f(rounds.main), rounds.review && '<b>المراجعة:</b><br>' + f(rounds.review)].filter(Boolean).join('<br>');
    };

    /* ---------- الشاشة ١: اسمع وردّد ---------- */
    async function screen1() {
      S.clear(); steps.set(0);
      ctx.instruction('قولوا مَعي، هَيّا!');
      const strip = h('div.e05-strip', { role: 'img', 'aria-label': 'أَرْبَعُ صُوَرٍ' });
      const cards = STRIP.map((id) => h('div.e05-card', { 'aria-hidden': 'true' }, IMG[id].glyph ? h('span.g', null, IMG[id].glyph) : h('img', { src: BQ.img(id), alt: '' })));
      strip.append(...cards);
      const turn = h('div.e05-turn', { 'aria-hidden': 'true' }, h('div.mk-hint', null, BQ.icon('mouth'), h('span.e05-dots', null, h('i'), h('i'), h('i'))));
      S.body.append(strip, turn);
      let curIdx = -1;
      ctx.onReplay(() => { if (curIdx >= 0) S.play(SENT[STRIP[curIdx]]); else S.play(L.say); });
      await S.play(L.say);
      for (let i = 0; i < STRIP.length; i++) {
        curIdx = i;
        cards.forEach((c) => c.classList.remove('now'));
        cards[i].classList.add('in', 'now');
        await S.sleep(450);
        await S.play(SENT[STRIP[i]]); // ماجد يقول الجملة والمعلّم يشير إلى الصورة
        turn.classList.add('on'); // سكتة ترديد — دور الطفل
        await S.sleep(pause);
        turn.classList.remove('on');
      }
      cards.forEach((c) => c.classList.remove('now'));
      strip.classList.add('all');
      cards.forEach((c, i) => c.animate && !BQ.reduced() && c.animate([{ transform: 'none' }, { transform: 'translateY(-10px)' }, { transform: 'none' }], { duration: 500, delay: i * 90 }));
      await S.bariq(L.yes); // «نَعَمْ! هَذا هُوَ!»
      turn.remove();
      await S.nextBtn(S.body, 'التّالي');
    }

    /* ---------- الشاشة ٢: المس ما يقول ماجد (gme-105) ---------- */
    function items(it) {
      let opts = it.opts;
      if (support) { const wrong = opts.filter((o) => o !== it.key); opts = [it.key, wrong[Math.floor(Math.random() * wrong.length)]]; }
      return opts;
    }
    function round(it, o) {
      S.clear();
      const old = S.top.querySelector('.mk-tag'); if (old) old.remove();
      if (o.tag) S.top.append(S.tag());
      const top = h('div.mk-listenrow');
      const listen = S.listen(() => S.cur && S.cur.replay());
      top.append(listen);
      const holder = h('div');
      S.body.append(top, holder);
      const sent = SENT[it.key];
      const stim = async (opt) => { listen.playing(true); await S.play(sent, Object.assign({ noCaption: true }, opt)); listen.playing(false); };
      const order = MK.arrange(items(it), it.key, o.hist);
      return S.round({
        holder, key: it.key,
        items: order.map((id) => Object.assign({ id, aria: 'صورة' }, IMG[id])),
        stim: () => stim(),
        async prompt() {
          ctx.instruction('هَيّا: أَيْنَ هَذا؟');
          await S.sleep(250);
          await stim();
          await S.play(L.where); // «هَيّا: أَيْنَ هَذا؟»
        },
        async onCorrect(btn) {
          note(null);
          await S.bariq(L.yes); // «نَعَمْ! هَذا هُوَ!»
          btn.classList.add('is-lift'); await S.play(sent); btn.classList.remove('is-lift'); // تُعاد الجملة وتحتها الصورة
          await S.sleep(300);
        },
        async onFirstError() {
          await S.sleep(200);
          await S.bariq(L.retry); // «جَرِّبْ مَرَّةً أُخْرى.»
          // تلميح ١: تُعاد الجملة أبطأ قليلاً — الكلمة المفتاح في آخرها — بلا إضاءة صورة
          note('<b>تلميح ١:</b> الكلمة المفتاح في آخر الجملة — تُعاد الجملة أبطأ قليلاً بلا إضاءة صورة.<br><span class="rv">ملاحظة مراجعة: إبراز الكلمة الحاملة صوتياً يحتاج تسجيلاً خاصّاً.</span>');
          S.wave(listen);
          await stim({ rate: 0.85 });
        },
        async onSecondError(btn, good) {
          note(null);
          await S.sleep(200);
          BQ.ui.ok(good); BQ.ui.pulse(good); // يُضاء الصواب وتنبض حلقته
          await S.play(L.contrast); // «أَصْغوا: هَذا، وَهَذا.»
          S.contrast(btn, good);
          btn.classList.add('is-lift'); await S.play(SENT[btn.dataset.id]); btn.classList.remove('is-lift');
          await S.sleep(250);
          good.classList.add('is-lift'); await S.play(sent); good.classList.remove('is-lift');
          await S.sleep(300);
        },
      });
    }
    async function screen2() {
      S.clear(); steps.set(1);
      ctx.instruction('هَيّا، أَصْغوا مَعي!');
      ctx.onReplay(() => S.cur && S.cur.replay());
      S.body.append(h('div.mk-hint.e05-intro', { 'aria-hidden': 'true' }, BQ.icon('ear'), BQ.icon('hand')));
      await S.play(L.listen);
      const hist = [];
      rounds.main = [];
      for (const it of ROUNDS) { const R = await round(it, { hist }); rounds.main.push(R); showLog(); }
      // الختام: تُعاد البنود التي احتاجت محاولة ثانية وحدها، مرّة، بترتيب جديد، غير محتسبة
      const missed = BQ.shuffle(ROUNDS.filter((it, i) => !(rounds.main[i].first && !rounds.main[i].assisted)));
      if (missed.length) {
        rounds.review = [];
        for (const it of missed) { const R = await round(it, { hist, tag: true }); rounds.review.push(R); showLog(); }
      }
    }

    /* ---------- ١٠–١٢: جولة رابعة اختيارية «قُلِ الجملة وأنت تلمس الصورة» ---------- */
    async function sayRound() {
      S.clear(); steps.set(2);
      const old = S.top.querySelector('.mk-tag'); if (old) old.remove();
      ctx.instruction('قولوا مَعي، هَيّا!');
      const wrapBox = h('div.e05-say4');
      const done = new Set();
      let busy = false;
      const ch = BQ.ui.choices(wrapBox, {
        items: STRIP.map((id) => Object.assign({ id, aria: 'صورة' }, IMG[id])), aria: 'صُوَرٌ لِلاخْتِيارِ',
        async onPick(it, btn) {
          if (busy) return; busy = true;
          ch.btns.forEach((b) => b.classList.remove('is-lift'));
          btn.classList.add('is-lift');
          await S.sleep(pause); // يقول الطفل الجملة وهو يلمس الصورة
          await S.play(SENT[it.id]); // ثم يسمع نموذج ماجد
          if (!S.ok()) return;
          btn.classList.remove('is-lift'); BQ.ui.ok(btn); done.add(it.id); busy = false;
        },
      });
      S.body.append(wrapBox);
      note('<b>جولة اختيارية:</b> يقول الطفل الجملة وهو يلمس الصورة، ثم يسمع نموذج ماجد. لا تذكر له أيّ مصطلح.');
      await S.play(L.say);
      await S.nextBtn(S.body, 'التّالي');
    }

    const steps = S.steps(S.age === '10-12' ? 3 : 2);
    async function flow() {
      await screen1();
      await screen2();
      if (S.age === '10-12') await sayRound();
      if (!S.ok()) return;
      S.clear();
      ctx.done();
      BQ.ui.endCard(S.stage, { title: 'نَعَمْ! هَذا هُوَ!', onReplay: () => BQ.open('EL05', { skipCover: true }) });
    }
    flow();
  }

  BQ.register('EL05', { hero: 'img-001', cover: 'يسمع الطفل جملاً قصيرة من الدرس ويردّدها، ثم يلمس صورة ما يسمع.', render });
})();
})();
