/* EL13 — بارق L1-01-d1 · مسوّدة · مبنيّ من kit.js + EL13.body.js (WP2 v0-8) */
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
/* EL13 «تدرّب» — L1-01-AS-gme-001 · audio_match · المرصود الوحيد في الدرس.
   v0-8: الجولة التي ساعد فيها المعلّم (تلميح ٢ · «بمساعدة» · إظهار الجواب) لا تُحتسب «من أوّل مرّة» أبداً (QA-01)؛ لا رقم على شاشة الطفل.
   ٥ جولات (محاولتان) ← جولة قراءة r1 غير مرصودة ← (إن < ٤ من ٥: ins-listen + إعادة واحدة بلقطات _b بدرجة منفصلة)
   ← «راجِعْ» للبنود التي لم تُصَب من المحاولة الأولى (غير محتسبة) ← «الميمُ في الماءِ!».
   البنود منسوخة من DIGITAL/games.json (gme-001 · items + items_alt_set من بيانات Godot) — لا يحمّل المتصفّح games.json. */
(function () {
  const h = BQ.h;
  const W = 'img-001', K = 'img-007', C = 'img-008';
  const L = {
    where: 'bariq_L1-01_ins-where_ar', listen: 'bariq_L1-01_ins-listen_ar', yes: 'bariq_L1-01_fb-yes_ar', retry: 'bariq_L1-01_fb-retry_ar',
    yesM: 'bariq_L1-01_d1-FB_03_ar', contrast: 'bariq_L1-01_d1-FB_04_ar', which: 'bariq_L1-01_d1-scr05_01_ar', close: 'bariq_L1-01_intro-1_16_ar',
    m: 'bariq_L1-01_snd-m_ar', mB: 'L1-01_d2_s5_01', maa: 'bariq_L1-01_vocab-w1_01_ar', maaB: 'L1-01_d2_s5_03',
  };
  // gme-001 items (الترتيب كما في games.json؛ مواضع البدائل تُخلط وتُحفظ option_order_shown)
  const MAIN = [
    { r: 1, stim: L.m, ling: true, opts: [K, W, C], key: W },
    { r: 2, stim: 'bariq_L1-01_sfx-door-knock', opts: [K, C, W], key: K },
    { r: 3, stim: [L.maa, L.maaB], ling: true, opts: [C, K, W], key: W },
    { r: 4, stim: 'bariq_L1-01_sfx-compass', opts: [W, C, K], key: C },
    { r: 5, stim: L.m, ling: true, opts: [W, K, C], key: W },
  ];
  // items_alt_set (لقطات _b) — إعادة واحدة إن كانت الدرجة < ٠٫٨٠
  const ALT = [
    { r: 1, stim: L.maaB, ling: true, opts: [K, W, C], key: W },
    { r: 2, stim: [L.mB, L.m], ling: true, opts: [K, C, W], key: W },
    { r: 3, stim: [L.mB, L.m], ling: true, opts: [C, K, W], key: W },
    { r: 4, stim: 'bariq_L1-01_sfx-compass-b', opts: [W, C, K], key: C },
    { r: 5, stim: 'bariq_L1-01_sfx-door-knock-b', opts: [W, K, C], key: K },
  ];
  const NAME = { [W]: 'الماء', [K]: 'يد تطرق', [C]: 'البوصلة' };
  const SC = '.bq-frame[data-el="EL13"]';
  const CSS = `
${SC} .e13-glyph { font: 700 clamp(72px, 16cqi, 140px)/1 var(--ff-child); color: var(--coral); background: var(--white); border-radius: var(--r-lg); width: clamp(110px, 22cqi, 190px); aspect-ratio: 1; display: grid; place-items: center; padding-bottom: .14em; box-shadow: 0 0 0 4px var(--sun-soft), 0 12px 28px var(--shade); animation: bqPop .4s ease-out; }
${SC} .e13-ear { padding: 18px 26px; }
${SC} .e13-ear .bq-ic { width: clamp(52px, 10cqi, 90px); height: clamp(52px, 10cqi, 90px); }
${SC} .e13-close { display: flex; align-items: center; justify-content: center; gap: clamp(16px, 4cqi, 36px); flex-wrap: wrap; }
${SC} .e13-close img { width: clamp(120px, 30cqi, 260px); aspect-ratio: 1; object-fit: cover; border-radius: var(--r-lg); border: 4px solid var(--white); box-shadow: 0 12px 28px var(--shade); }
@container stage (max-width: 560px) { ${SC} .e13-close { flex-direction: column; } }`;

  function render(stage, ctx) {
    MK.css('st-EL13', CSS);
    const S = MK.session(ctx);
    const own = (id) => (id === W ? S.pick(L.maa, L.maaB) : id === K ? 'bariq_L1-01_sfx-door-knock' : 'bariq_L1-01_sfx-compass');
    const stimId = (it) => (Array.isArray(it.stim) ? S.pick(...it.stim) : it.stim);
    const sets = {}; // main · alt · r1 · review
    let firstDemo = true;
    let listenBtn = null, beads = null, hintEl = null;

    /* ---- دليل المعلّم: السطر المثبّت · تلميح ٢ · «بمساعدة» · النتيجة · السجلّ المطويّ ---- */
    const firstOK = (R) => R.first && !R.assisted; // «من أوّل مرّة» بلا أيّ مساعدة
    const box = S.adultBox('أدوات المعلّم · نشاط مرصود');
    S.adultPin(box);
    const b2 = h('button', { type: 'button', onclick: () => { if (S.cur && S.cur.hide2()) note('تلميح ٢: أُخفي بديل غير صحيح — سُجّلت الجولة «بمساعدة» ولا تُحتسب من أوّل مرّة.'); } }, 'تلميح ٢: أَخْفِ بديلاً');
    const bA = h('button', { type: 'button', onclick: () => { if (S.cur) { S.cur.assist(); note('سُجّلت هذه الجولة «بمساعدة» (قلتَ الكلمة أو أريتَه فمك) ولا تُحتسب من أوّل مرّة.'); } } }, 'سجّل «بمساعدة»');
    const resEl = h('p.res', { hidden: true });
    box.append(b2, bA, resEl);
    const logEl = S.adultLog(box, 'تفاصيل الجولات', 'يظهر هنا بعد كلّ جولة.');
    const note = (t) => S.adultNote(box, t);
    const showLog = () => {
      const st = (R) => (firstOK(R) ? 'من أوّل مرّة' : R.first ? 'من أوّل مرّة بمساعدة' : R.second ? 'بعد إعادة' + (R.assisted ? ' بمساعدة' : '') : 'لم يُجِب — أُظهر له الجواب');
      const row = (name, rs) => rs && rs.length ? `<b>${name}:</b><br>` + rs.map((R, i) => `الجولة ${MK.AR(i + 1)}: ${st(R)}${R.replays ? ' · أعاد الصوت ' + MK.AR(R.replays) : ''} · الترتيب: ${R.order.map((o) => NAME[o] || o).join('، ')}`).join('<br>') : '';
      logEl.innerHTML = [row('الجولات الخمس', sets.main), row('الإعادة بتسجيل آخر', sets.alt), row('جولة الحرف «م» (غير محتسبة)', sets.r1), row('المراجعة (غير محتسبة)', sets.review)].filter(Boolean).join('<br>') || 'يظهر هنا بعد كلّ جولة.';
    };

    /* ---- تخطيط الجولة ---- */
    function layout(opt) {
      S.clear();
      const top = S.top; top.replaceChildren();
      if (opt.beads) top.append(opt.beads.el);
      const row = h('div.mk-listenrow');
      if (opt.glyph) row.append(h('div.e13-glyph', { 'aria-label': 'الحَرْفُ م' }, 'م'));
      else { listenBtn = S.listen(() => S.cur && S.cur.replay()); row.append(listenBtn); }
      S.body.append(row);
      const holder = h('div'); S.body.append(holder);
      return { top, row, holder };
    }
    ctx.onReplay(() => S.cur && S.cur.replay());

    async function playStim(it) {
      if (listenBtn) listenBtn.playing(true);
      await S.play(stimId(it), { noCaption: true });
      if (listenBtn) listenBtn.playing(false);
    }
    function clearHint() { if (hintEl) { hintEl.remove(); hintEl = null; } note(null); }

    /** جولة واحدة (مرصودة أو لا) */
    function runRound(it, o) {
      const hist = o.hist;
      const items = MK.arrange(it.opts, it.key, hist).map((id) => ({ id, img: id, aria: 'صورة' }));
      const ui = layout({ beads: o.beads, glyph: o.glyph });
      if (o.beads) o.beads.cur(o.idx);
      if (o.tag) ui.top.append(S.tag());
      return S.round({
        holder: ui.holder, items, key: it.key,
        stim: () => (o.glyph ? S.play(L.which) : playStim(it)),
        async prompt(wrap) {
          if (o.glyph) { ctx.instruction('هَذا الحَرْفُ مَعَ مَنْ؟'); await S.play(L.which); return; }
          ctx.instruction('أَيْنَ هَذا الصَّوْتُ؟');
          if (o.idx === 0 || S.age === '4-6' || o.review) await S.play(L.where); else await S.sleep(350);
          if (firstDemo) { // نموذج: اليد تلمس السمّاعة ثم تمرّ فوق الصور دون استقرار
            firstDemo = false;
            await S.ghost([listenBtn, ...wrap.btns]);
          }
          await S.sleep(200);
          await playStim(it);
        },
        async onCorrect(btn, R) {
          clearHint();
          if (o.beads && o.scored) { await S.fly(btn, o.beads.bead(o.idx)); o.beads.set(o.idx, 'on'); }
          if (it.ling || o.glyph) { await S.play(S.pick(L.maa, L.maaB)); await S.bariq(L.yesM); } // «ماء.» ثم «نَعَمْ! هَذا صَوْتُ الميمِ.»
          else await S.bariq(L.yes);
          await S.sleep(350);
        },
        async onFirstError(btn, R) {
          await S.sleep(250);
          await S.play(own(btn.dataset.id)); // ما لُمس يُسمِع صوته هو
          await S.bariq(L.retry); // «جَرِّبْ مَرَّةً أُخْرى.»
          // التلميح ١ بالسبب ولا يكشف: شفتا سيف تنطبقان (بنود «مْـ»/«ماء») · موجة حول السمّاعة (البنود البيئية)
          clearHint();
          if (it.ling || o.glyph) {
            hintEl = h('div.mk-hint', { 'aria-hidden': 'true' }, h('span.mk-lips', null, h('img', { src: BQ.img('img-101'), alt: '' }), h('img.b', { src: BQ.img('img-102'), alt: '' })), BQ.icon('ear'));
            ui.row.append(hintEl);
            note('<b>تلميح ١ (لا يُحتسب مساعدة):</b> الصوت الأوّل يبدأ بإطباق الشفتين — تُعاد الكلمة وشفتا سيف تنطبقان، بلا إشارة إلى صورة.');
            if (o.glyph) await S.play(S.pick(L.m, L.mB)); else await playStim(it);
          } else {
            S.wave(listenBtn);
            note('<b>تلميح ١ (لا يُحتسب مساعدة):</b> المصدر يُعرف بصوته — يُعاد الصوت مع موجة حول السمّاعة، بلا إشارة إلى صورة.');
            await playStim(it);
          }
        },
        async onSecondError(btn, good, R) {
          clearHint();
          await S.sleep(250);
          BQ.ui.ok(good); BQ.ui.pulse(good); // يُضاء الصواب وتنبض حلقته مرّتين
          if (o.glyph) await S.play(S.pick(L.maa, L.maaB)); else await playStim(it);
          await S.sleep(300);
          await S.play(L.contrast); // «أَصْغوا: هَذا، وَهَذا.» — ما اختاره ثم الصواب
          S.contrast(btn, good);
          btn.classList.add('is-lift'); await S.play(own(btn.dataset.id)); btn.classList.remove('is-lift');
          await S.sleep(250);
          good.classList.add('is-lift');
          if (o.glyph) await S.play(S.pick(L.maa, L.maaB)); else await playStim(it);
          good.classList.remove('is-lift');
          if (o.beads && o.scored) { await S.fly(good, o.beads.bead(o.idx)); o.beads.set(o.idx, 'help'); }
          await S.sleep(400);
        },
      });
    }

    async function runSet(list, key, o) {
      const beads = o.noBeads ? null : S.beads(h('div'), list.length);
      const hist = [];
      const out = (sets[key] = []);
      for (let i = 0; i < list.length; i++) {
        const R = await runRound(list[i], { beads, idx: i, hist, scored: o.scored, review: o.review, tag: o.tag });
        R.r = list[i].r; out.push(R); showLog();
      }
      if (beads) beads.cur(-1);
      return { res: out, beads };
    }

    async function flow() {
      // ١) الجولات الخمس المرصودة
      const main = await runSet(MAIN, 'main', { scored: true });
      const score1 = main.res.filter(firstOK).length;
      // ٢) جولة القراءة r1 (غير مرصودة): «م» ← صورته
      const r1 = { r: 'r1', opts: [W, K, C], key: W };
      sets.r1 = [await runRound(r1, { idx: 0, hist: [], glyph: true, beads: main.beads })]; showLog();
      // ٣) < ٠٫٨٠ ← ins-listen + إعادة واحدة بلقطات _b (درجة منفصلة)
      let last = main.res, altBeads = null;
      if (score1 < 4) {
        S.clear(); S.top.replaceChildren();
        ctx.instruction('هَيّا، أَصْغوا مَعي!');
        const ear = h('div.mk-hint.e13-ear', { 'aria-hidden': 'true' }, BQ.icon('ear'), BQ.icon('speaker'));
        S.body.append(ear);
        await S.play(L.listen);
        await S.sleep(300);
        const alt = await runSet(ALT, 'alt', { scored: true });
        last = alt.res; altBeads = alt.beads;
      }
      // ٤) «راجِعْ»: البنود التي احتاجت محاولة ثانية وحدها، مرّة، بترتيب جديد، غير محتسبة
      const src = last === main.res ? MAIN : ALT;
      const missed = BQ.shuffle(src.filter((it, i) => !firstOK(last[i])));
      if (missed.length) {
        sets.review = [];
        const hist = [];
        for (let i = 0; i < missed.length; i++) {
          const R = await runRound(missed[i], { idx: i, hist, review: true, tag: true, beads: null });
          sets.review.push(R); showLog();
        }
      }
      // ٥) الختام: خرزة البوصلة الأخيرة ← «الميمُ في الماءِ!»
      S.clear();
      ctx.instruction('الميمُ في الماءِ!');
      const endBeads = altBeads || main.beads;
      endBeads.cur(-1); // لا حلقة «الحاليّة» على شاشة الختام
      S.top.replaceChildren(endBeads.el);
      await S.sleep(200); endBeads.all(); BQ.audio.fx(BQ.sfx.bead, 0.6);
      const close = h('div.e13-close', null, h('img', { src: BQ.img(W), alt: '' }), h('span.bq-word', { html: '<span class="m">م</span>اءْ' }));
      S.body.append(close);
      await S.sleep(300);
      await S.play(L.close);
      await S.sleep(400);
      if (!S.ok()) return;
      finish(score1, last === main.res ? null : last.filter(firstOK).length);
    }

    /** بطاقة الدعم (مطابقة لنسخة اللعبة في godot.js) */
    function supportCard() {
      if (BQ.ui.supportCard) return BQ.ui.supportCard();
      const go = (id, label) => h('button.bq-btn.ghost', { type: 'button', onclick: () => BQ.open(id, { src: 'menu' }) }, label);
      return h('div.bq-support', null,
        h('p', null, h('b', null, 'يحتاج الطفل دعماً قبل «اقرأ»: '), 'أعيدا هذه الأنشطة في جلسة قصيرة، ثم «تدرّب» مرّة أخرى في يوم لاحق.'),
        h('div', null, go('EL02', 'شاهد وتعلّم · الجزء ١'), go('EL04', 'مفرداتي'), go('EL03', 'لاحظ وتعلّم')));
    }
    /** النتيجة للمعلّم وحده (في الدليل)؛ شاشة الطفل «أَحْسَنْتَ!» بلا رقم */
    function finish(score1, scoreB) {
      const cnt = (rs) => ({ first: rs.filter(firstOK).length, second: rs.filter((R) => R.second).length, shown: rs.filter((R) => R.shown).length, assisted: rs.filter((R) => R.assisted && !R.shown).length });
      const a = cnt(sets.main);
      const n = MK.AR;
      // الفاصل «،» لا «·» — النقطة الوسطى تُلتبس بالصفر العربيّ «٠»
      const lines = [`الجولات الخمس: من أوّل مرّة بلا مساعدة ${n(a.first)} من ٥، وبعد إعادة ${n(a.second)}، وبمساعدة المعلّم ${n(a.assisted)}، وأُظهر الجواب في ${n(a.shown)}.`];
      if (sets.alt) { const b = cnt(sets.alt); lines.push(`الإعادة بتسجيل آخر (درجة منفصلة): من أوّل مرّة بلا مساعدة ${n(b.first)} من ٥، وبعد إعادة ${n(b.second)}، وبمساعدة ${n(b.assisted)}، وأُظهر الجواب في ${n(b.shown)}.`); }
      const mastery = score1 >= 4 ? 'بلغ العتبة: ٤ من ٥ فأكثر من أوّل مرّة بلا مساعدة.' : scoreB != null && scoreB >= 4 ? 'لم يبلغ العتبة في الجولات الخمس، وبلغها في الإعادة بتسجيل آخر (تُسجَّل الدرجتان منفصلتين).' : 'لم يبلغ العتبة بعد — أعيدا «تدرّب» في جلسة لاحقة.';
      resEl.hidden = false;
      const support = score1 < 4 && scoreB != null && scoreB < 4; // الجولتان دون العتبة ← بطاقة الدعم نفسها في نسخة اللعبة
      resEl.innerHTML = '<b>النتيجة (للمعلّم وحده) — يربط «مْـ»/«ماءْ» بصورته ويميّز مصادر الأصوات:</b><br>' + mastery + '<br>' + lines.join('<br>') + '<br>أعاد الصوت ' + n(S.log.replays) + ' مرّة.';
      if (support) resEl.after(supportCard());
      note(null);
      ctx.done();
      BQ.ui.endCard(S.stage, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open('EL13', { skipCover: true }) });
    }

    flow();
  }

  // لعبة «رحلة الميم» · محطّة listen (المرصودة) هي التجربة الأساسية؛ هذه النسخة HTML بديل آليّ أو برابط المعلّم.
  // بعد انتهاء المحطّة: ورقة ختام «أَحْسَنْتَ!» بلا رقم — النتيجة في دليل المعلّم (يملؤها godot.js).
  BQ.register('EL13', {
    cover: 'يسمع الطفل صوتاً فيلمس صورته — خمس جولات، وهذا النشاط الوحيد المرصود.',
    render: BQ.ui.godotRender ? BQ.ui.godotRender('listen', render, { name: 'تدرّب', title: 'تدرّب', after(c, result, stage) { c.done(); BQ.ui.endCard(stage || c.stage, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open('EL13', { skipCover: true }) }); } }) : render,
  });
})();
})();
