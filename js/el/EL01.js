/* EL01 — بارق L1-01-d1 · مسوّدة · مبنيّ من kit.js + EL01.body.js (WP2 v0-8) */
(function () {
'use strict';
/* v0-12 — عقد اللمس المشترك لملفّات العناصر الستّة عشر (لمس · قلم · فأرة؛ iPad/أندرويد):
   · لا تأخير ٣٠٠ms ولا تكبير بالنقر المزدوج على عناصر اللعب (touch-action: manipulation)
   · لا قائمة ضغط مطوّل ولا تحديد نصّ ولا سحب صورة على قطع اللعب (callout/user-select/user-drag)
   · أسطح الرسم والقطع المسحوبة لا تمرّر الصفحة (touch-action: none) */
if (!document.getElementById('st-el-touch')) {
  const st = document.createElement('style'); st.id = 'st-el-touch';
  st.textContent = '.bq-frame .elp-stage :is(button, [role="button"], .bq-choice, .k7-card, .k9-oc, .k9-wb, .t15-card, .t15-slot, .t8-zone, .e3-pad, .k11-w, .k11-hit) { touch-action: manipulation; -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }' +
    '.bq-frame .elp-stage :is(img, svg, .bq-glyph) { -webkit-user-drag: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }' +
    '.bq-frame .elp-stage :is(.bq-trace, .bq-trace canvas, .k9-oc, .t15-card, .t8-snd, .t15-drawcard canvas) { touch-action: none; -webkit-touch-callout: none; }';
  document.head.append(st);
}
/** v0-12 — حارس سطح الرسم للّمس: إصبع واحد فقط (يُتجاهل الثاني وراحة اليد)، ولا تمرير ولا تكبير ولا قائمة
 *  أثناء الرسم (touchstart/touchmove غير سلبيّة لـiOS القديم)، والتقاط المؤشّر على اللوحة. يعمل قبل مستمعي المحرّك (طور الالتقاط). */
BQ.elGuard = BQ.elGuard || function (el) {
  if (!el || el._tg) return; el._tg = true;
  let active = null;
  const block = (e) => { e.stopImmediatePropagation(); if (e.cancelable) e.preventDefault(); };
  el.addEventListener('pointerdown', (e) => {
    if (e.target.closest && e.target.closest('button')) return; // زرّ المعلّم داخل اللوحة
    if (active != null && e.pointerId !== active) return block(e);
    active = e.pointerId;
    try { e.target.setPointerCapture(e.pointerId); } catch (x) { /* */ }
  }, true);
  ['pointermove', 'pointerup', 'pointercancel'].forEach((t) => el.addEventListener(t, (e) => {
    if (active != null && e.pointerId !== active) return block(e);
    if (t !== 'pointermove') active = null;
  }, true));
  const noScroll = (e) => { if (e.cancelable && !(e.target.closest && e.target.closest('button'))) e.preventDefault(); };
  el.addEventListener('touchstart', noScroll, { passive: false });
  el.addEventListener('touchmove', noScroll, { passive: false });
  el.addEventListener('contextmenu', (e) => e.preventDefault());
};
/* v0-12 r3 — زرّا الحكم ببارق بدل رمزَي الدائرتين/الدائرة والمربّع (المالك: «غير مفهومة»):
   «صَوْتٌ واحِدٌ» = بارق يصفّق (brq clap) · «سَمِعْتُ فَرْقاً!» = بارق يقفز فاتحاً ذراعيه (brq cheer).
   كلّ زرّ يتحرّك ويقول عبارته حين يُلمس (بصوت بارق: d1-EL02_01 · d1_s1_01). ساكنان حتى يتكلّما (لا حركة دائمة تشتّت).
   BQ.elJudge(parent, {onPick(id, btn), speak:true}) → {el, btns, byId(id), lock(v), act(id, {line}) → Promise, reset()}
   BQ.elJudge.evidence(parent, imgA, imgB) → دليل بصريّ: صورتا المصدرين جنباً إلى جنب (الصورة نفسها مرّتين = صوت واحد). */
BQ.elJudge = BQ.elJudge || (function () {
  const h = BQ.h;
  const DEF = {
    same: { pose: 'clap', line: 'bariq_L1-01_d1-EL02_01_ar', label: 'صَوْتٌ واحِدٌ', aria: 'صَوْتٌ واحِدٌ — بارِقٌ يُصَفِّقُ' },
    diff: { pose: 'cheer', line: 'L1-01_d1_s1_01', label: 'سَمِعْتُ فَرْقاً!', aria: 'سَمِعْتُ فَرْقاً — بارِقٌ يَقْفِزُ' },
  };
  const CSS = `
.bq-judge { display: flex; justify-content: center; align-items: stretch; gap: clamp(14px, 4cqi, 36px); flex-wrap: nowrap; padding-top: clamp(18px, 4cqi, 34px); } /* ذراعا بارق تعلوان الزرّ */
.bq-judge-b { position: relative; width: clamp(128px, 30cqi, 230px); max-width: max(120px, calc(var(--play-h, 700px) - 360px)); display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 8px 8px 10px; border-radius: 26px; border: 4px solid var(--white); background: linear-gradient(180deg, var(--white), var(--sky-wash)); cursor: pointer;
  box-shadow: 0 6px 0 var(--sky-line), 0 12px 24px var(--shade); transition: transform .2s ease-out, box-shadow .25s, opacity .3s, filter .3s;
  touch-action: manipulation; -webkit-tap-highlight-color: transparent; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }
.bq-judge-b[data-id="diff"] { background: linear-gradient(180deg, var(--white), var(--sun-soft)); }
.bq-judge-b .bq-brq { width: 100%; }
.bq-judge-l { font: 700 clamp(17px, 2.6cqi, 24px)/1.35 var(--ff-child); color: var(--navy); white-space: nowrap; }
.bq-judge-b:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
.bq-judge-b:active { transform: translateY(4px); box-shadow: 0 2px 0 var(--sky-line), 0 6px 14px var(--shade); }
.bq-judge-b.is-act { transform: translateY(-6px) scale(1.04); box-shadow: 0 0 0 6px var(--sun-soft), 0 16px 30px var(--shade); }
.bq-judge-b.is-picked { box-shadow: 0 0 0 5px var(--navy), 0 12px 24px var(--shade); }
.bq-judge-b.is-ok { box-shadow: 0 0 0 6px var(--ok), 0 12px 24px var(--shade); }
.bq-judge-b.is-dim { opacity: .55; filter: saturate(.6); }
.bq-judge-b .bq-tick { position: absolute; top: 6px; inset-inline-end: 6px; width: 34px; height: 34px; border-radius: 50%; background: var(--ok); color: var(--white); display: none; place-items: center; padding: 6px; box-sizing: border-box; }
.bq-judge-b.is-ok .bq-tick { display: grid; }
.bq-judge.is-locked .bq-judge-b { cursor: default; }
.bq-judge.is-waiting .bq-judge-b { filter: saturate(.85); }
@media (hover: hover) { .bq-judge:not(.is-locked) .bq-judge-b:hover { transform: translateY(-4px); } }
.bq-evid { display: flex; align-items: center; justify-content: center; gap: clamp(10px, 3cqi, 22px); animation: bqPop .35s ease-out; }
.bq-evid img { width: clamp(78px, 17cqi, 140px); max-width: max(70px, calc((var(--play-h, 700px) - 420px) / 1.2)); aspect-ratio: 1; object-fit: cover; border-radius: 18px; border: 4px solid var(--white); box-shadow: 0 8px 18px var(--shade); }
.bq-evid i { width: 12px; height: 12px; border-radius: 50%; background: var(--sky-line); flex: none; }
.bq-evid.same img:last-child { animation: bqEvidSame .7s ease-out; }
@keyframes bqEvidSame { from { transform: translateX(calc(-1 * clamp(40px, 9cqi, 80px))) scale(.9); opacity: .4; } }
@container stage (max-width: 560px) { .bq-judge { gap: 10px; } .bq-judge-b { width: calc((100cqi - 30px) / 2); max-width: 180px; } }
@media (prefers-reduced-motion: reduce) { .bq-judge-b, .bq-judge-b.is-act { transition: none; transform: none; } .bq-evid, .bq-evid.same img:last-child { animation: none; } }`;
  function judge(parent, opt) {
    opt = opt || {};
    if (!document.getElementById('st-el-judge')) document.head.append(h('style', { id: 'st-el-judge' }, CSS));
    const wrap = h('div.bq-judge', { role: 'group', 'aria-label': 'صَوْتٌ واحِدٌ، أَمْ سَمِعْتَ فَرْقاً؟' });
    const btns = ['same', 'diff'].map((id) => {
      const d = DEF[id];
      const img = h('img', { alt: '', draggable: 'false', decoding: 'async', src: BQ.char.still(d.pose) });
      const b = h('button.bq-judge-b', { type: 'button', 'aria-label': d.aria, dataset: { id } },
        h('span.bq-brq', { 'aria-hidden': 'true' }, img), h('span.bq-judge-l', { lang: 'ar' }, d.label), h('span.bq-tick', { 'aria-hidden': 'true', html: BQ.icons.check }));
      b.pose = (on) => { img.src = on && !BQ.reduced() ? BQ.char.anim(d.pose) : BQ.char.still(d.pose); b.classList.toggle('is-act', !!on); };
      b.addEventListener('click', () => { if (wrap.classList.contains('is-locked') || b.classList.contains('is-hidden')) return; opt.onPick && opt.onPick(id, b); });
      return b;
    });
    wrap.append(...btns);
    parent.append(wrap);
    const api = {
      el: wrap, btns,
      byId: (id) => btns.find((b) => b.dataset.id === id),
      lock(v) { wrap.classList.toggle('is-locked', v !== false); },
      /** الزرّ يتحرّك ويقول عبارته (line:false = حركة بلا صوت) */
      async act(id, o) {
        o = o || {};
        const b = api.byId(id); if (!b) return;
        b.pose(true);
        if (o.line === false) await BQ.sleep(o.ms || 1500);
        else if (o.play) await o.play(DEF[id].line);
        else await BQ.audio.play(DEF[id].line);
        if (b.isConnected) b.pose(false);
      },
      reset() { btns.forEach((b) => { b.classList.remove('is-ok', 'is-dim', 'is-picked', 'is-hidden'); b.pose(false); }); },
    };
    return api;
  }
  judge.DEF = DEF;
  judge.evidence = function (parent, a, b) {
    const same = a === b;
    const el = h('div.bq-evid' + (same ? '.same' : ''), { role: 'img', 'aria-label': same ? 'صَوْتٌ واحِدٌ' : 'صَوْتانِ مُخْتَلِفانِ' },
      h('img', { src: BQ.img(a), alt: '' }), h('i', { 'aria-hidden': 'true' }), h('img', { src: BQ.img(b), alt: '' }));
    parent.append(el);
    return el;
  };
  return judge;
})();
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
/* EL01 «تهيّأ للدرس (الاستدعاء)» — L1-01-AS-gme-006 · غير مرصود.
   §٦ يحكم: محاولة واحدة؛ أيّ لمس ينتهي بسماع صوت المصدر الصحيح وتكبّر صورته — لا حالة خطأ ولا «جرّب مرّة أخرى».
   البند ١ صبّ الماء ← مصدره · البند ٢ طرقتان ← مصدرهما · البند ٣ صوتان ← زرّا بارق (يصفّق/يقفز) بعد عرض بارق ← «سَمِعْتُ فَرْقاً!» (ماجد ثم بارق).
   البنود من DIGITAL/games.json (gme-006)؛ لا تُقال «ماء» ولا «باب» هنا. */
(function () {
  const h = BQ.h;
  const W = 'img-001', K = 'img-007', C = 'img-008';
  const SFX = { pour: 'bariq_L1-01_sfx-water-pour', pour1: 'bariq_L1-01_sfx-water-pour-1s', knock: 'bariq_L1-01_sfx-door-knock', compass: 'bariq_L1-01_sfx-compass' };
  const OWN = { [W]: SFX.pour1, [K]: SFX.knock, [C]: SFX.compass }; // البطاقة الملموسة تُسمِع صوتها هي
  const ITEMS = [
    { item: 1, stim: [SFX.pour], opts: [W, K, C], key: W },
    { item: 2, stim: [SFX.knock], opts: [C, W, K], key: K },
    { item: 3, stim: [SFX.pour1, SFX.knock], opts: ['same', 'diff'], key: 'diff', pair: true },
  ];
  const SC = '.bq-frame[data-el="EL01"]';
  const CSS = `
${SC} .e01-pair { display: flex; gap: 10px; align-items: center; }
${SC} .e01-tok { width: clamp(44px, 8cqi, 64px); aspect-ratio: 1; border-radius: 50%; display: grid; place-items: center; background: var(--white); border: 2.5px solid var(--sky-line); color: var(--sky); transition: background .25s, transform .25s, color .25s, border-color .25s; }
${SC} .e01-tok .bq-ic { width: 52%; height: 52%; }
${SC} .e01-tok.on { background: var(--sun-soft); border-color: var(--sun); color: var(--navy); transform: scale(1.15); }
${SC} .e01-tok.on2 { background: var(--tile); border-color: var(--sun-edge); color: var(--navy); transform: scale(1.15); }
${SC} .e01-plus { width: 8px; height: 8px; border-radius: 50%; background: var(--sky-line); }
${SC} .bq-choices.icons .bq-choice { width: clamp(130px, 30cqi, 250px); aspect-ratio: 4 / 3; }
${SC} .bq-choices.icons .bq-ic.big { color: var(--navy); width: 72%; }
${SC} .bq-choice.is-picked { transform: translateY(-6px); }
${SC} .e01-key { display: flex; gap: clamp(14px, 4cqi, 36px); align-items: center; justify-content: center; }
${SC} .e01-key img { width: clamp(110px, 30cqi, 260px); aspect-ratio: 1; object-fit: cover; border-radius: var(--r-lg); border: 4px solid var(--white); box-shadow: 0 12px 28px var(--shade); }
${SC} .e01-key .e01-brq { width: clamp(90px, 17cqi, 160px); flex: none; }
@container stage (max-width: 560px) {
  ${SC} .e01-key img { width: 34cqi; }
  ${SC} .e01-key .e01-brq { width: 22cqi; }
  ${SC} .bq-choices.icons .bq-choice { width: 42cqi; }
}`;

  function render(stage, ctx) {
    MK.css('st-EL01', CSS);
    const S = MK.session(ctx);
    const hist = [];
    const res = [];
    let listenBtn = null, cur = null, firstDemo = true;
    const box = S.adultBox('ما يُسجَّل · غير مرصود');
    const logEl = S.adultLog(box, 'ما لمسه أوّلاً في كلّ بند', 'يظهر هنا بعد كلّ بند.');
    const showLog = () => { logEl.innerHTML = res.map((r) => `البند ${MK.AR(r.item)}: ${r.first ? 'لمس المصدر من أوّل مرّة' : 'لمس غيره ثم سمع المصدر'}${r.replays ? ' · أعاد الصوت ' + MK.AR(r.replays) : ''}`).join('<br>'); };
    ctx.onReplay(() => cur && cur.replay());

    async function playStim(it, tokens) {
      listenBtn.playing(true);
      for (let i = 0; i < it.stim.length; i++) {
        if (tokens) tokens[i].classList.add(i ? 'on2' : 'on');
        await S.play(it.stim[i], { noCaption: true });
        if (tokens) tokens[i].classList.remove('on', 'on2');
        if (i < it.stim.length - 1) await S.sleep(450);
      }
      listenBtn.playing(false);
    }

    function runItem(it, idx, beads) {
      return new Promise((resolve) => {
        S.clear();
        S.top.replaceChildren(beads.el);
        beads.cur(idx);
        const row = h('div.mk-listenrow');
        listenBtn = S.listen(() => cur && cur.replay());
        let tokens = null;
        if (it.pair) {
          tokens = [h('span.e01-tok', null, BQ.icon('speaker')), h('span.e01-tok', null, BQ.icon('speaker'))];
          row.append(listenBtn, h('div.e01-pair', { 'aria-hidden': 'true' }, tokens[0], h('span.e01-plus'), tokens[1]));
        } else row.append(listenBtn);
        S.body.append(row);
        const order = MK.arrange(it.opts, it.key, hist);
        // v0-12 r3: البند ٣ بزرّي بارق (يصفّق «صَوْتٌ واحِدٌ» · يقفز «سَمِعْتُ فَرْقاً!») بدل الرموز الهندسية
        let J = null, wrap;
        if (it.pair) { J = BQ.elJudge(S.body, { onPick: (id, b) => onPick({ id }, b) }); wrap = { btns: J.btns, lock: J.lock, classList: J.el.classList }; }
        else wrap = BQ.ui.choices(S.body, { items: order.map((id) => ({ id, img: id, aria: 'صورة' })), aria: 'صُوَرٌ لِلاخْتِيارِ', onPick });
        wrap.lock(true); wrap.classList.add('is-waiting');
        const R = { item: it.item, first: null, replays: 0, order };
        let phase = 'intro', auto = { stop() {} };
        const setPhase = (v) => { phase = v; S.stage.dataset.phase = v; };
        setPhase('intro'); S.stage.dataset.key = it.key;
        cur = { replay() { if (phase !== 'await') return; R.replays++; auto.stop(); playStim(it, tokens); } };

        (async () => {
          if (it.pair) {
            // عرض بارق مرّة واحدة قبل السؤال: صوتان متماثلان ← يصفّق · صوتان مختلفان ← يقفز ويقول «سَمِعْتُ فَرْقاً!» (زوج غير زوج البند)
            ctx.instruction('هَيّا، أَصْغوا مَعي!');
            await S.play('bariq_L1-01_ins-listen_ar');
            await playStim({ stim: [SFX.knock, 'bariq_L1-01_sfx-door-knock-b'] }, tokens);
            await J.act('same', { play: (id) => S.play(id) });
            await S.sleep(350);
            await playStim({ stim: [SFX.compass, SFX.knock] }, tokens);
            await J.act('diff', { play: (id) => S.play(id) });
            await S.sleep(400);
            ctx.instruction('هَلْ هُما صَوْتٌ واحِدٌ؟'); await S.play('bariq_L1-01_ins-same_ar');
          }
          else { ctx.instruction('أَيْنَ هَذا الصَّوْتُ؟'); await S.play('bariq_L1-01_ins-where_ar'); }
          if (firstDemo) { firstDemo = false; await S.ghost([listenBtn, ...wrap.btns]); } // يد شبحية لا تستقرّ على بطاقة
          await S.sleep(250);
          await playStim(it, tokens);
          setPhase('await'); wrap.lock(false); wrap.classList.remove('is-waiting');
          auto = S.autoReplay(() => { if (phase === 'await') playStim(it, tokens); });
        })();

        async function onPick(o, btn) {
          if (phase !== 'await') return;
          setPhase('fb'); wrap.lock(true); auto.stop();
          R.first = o.id === it.key;
          const good = wrap.btns.find((b) => b.dataset.id === it.key);
          if (it.pair) { // الزرّ الملموس يتحرّك ويقول عبارته — بلا حكم
            btn.classList.add('is-picked');
            await J.act(o.id, { play: (id) => S.play(id) });
            btn.classList.remove('is-picked');
            await S.sleep(200);
          }
          if (!R.first && !it.pair) { // ما لُمس يُسمِع صوته هو — بلا حكم ولا اهتزاز
            btn.classList.add('is-picked');
            await S.play(OWN[o.id], { noCaption: true });
            btn.classList.remove('is-picked');
            await S.sleep(200);
          }
          // صوت المصدر الصحيح يُعاد وصورته تكبر ١٠٨٪ (حلقة + ✓ صغيرة)
          wrap.btns.forEach((b) => { if (b !== good) b.classList.add('is-dim'); });
          BQ.ui.ok(good); S.sparkle(good, 6);
          if (it.pair) {
            // الدليل: صورتا المصدرين جنباً إلى جنب (ماء · طرق = صوتان مختلفان) مع إعادة الصوتين، ثم يقفز بارق إن لم يكن هو الملموس
            row.append(BQ.elJudge.evidence(h('div'), W, K));
            await playStim(it, tokens);
            if (!R.first) await J.act('diff', { play: (id) => S.play(id) });
          }
          else { listenBtn.playing(true); await S.play(it.stim[0], { noCaption: true }); listenBtn.playing(false); }
          await S.fly(good, beads.bead(idx)); beads.set(idx, 'on');
          res.push(R); showLog();
          await S.sleep(500);
          resolve(R);
        }
      });
    }

    async function flow() {
      if (BQ.hasAudio('bariq_L1-01_intro-1_00_ar')) await S.play('bariq_L1-01_intro-1_00_ar'); // إفصاح «صوت مؤقّت للعيّنة» إن وُجد ملفّه
      const beads = S.beads(h('div'), ITEMS.length);
      for (let i = 0; i < ITEMS.length; i++) await runItem(ITEMS[i], i, beads);
      // العبارة المحورية: ماجد ثم بارق — «سَمِعْتُ فَرْقاً!»
      S.clear();
      ctx.instruction('سَمِعْتُ فَرْقاً!');
      const key = h('div.e01-key', { 'aria-hidden': 'true' }, h('img', { src: BQ.img(W), alt: '' }), BQ.ui.brq ? BQ.ui.brq('cheer', 'e01-brq') : h('span'), h('img', { src: BQ.img(K), alt: '' }));
      S.body.append(key);
      await S.play('bariq_L1-01_key_ar');
      await S.sleep(250);
      await S.bariq('L1-01_d1_s1_01');
      if (!S.ok()) return;
      ctx.done();
      end(S.stage);
    }
    flow();
  }
  /** ورقة الختام (للنسختين): عنوان العبارة فقط — لا نصّ للمعلّم على شاشة الطفل */
  function end(stage) { BQ.ui.endCard(stage, { title: 'سَمِعْتُ فَرْقاً!', onReplay: () => BQ.open('EL01', { skipCover: true }) }); }

  // لعبة «رحلة الميم» · محطّة recall هي التجربة الأساسية؛ هذه النسخة HTML بديل آليّ (بلا WebGL/WebAssembly أو إن تعذّر التحميل) أو برابط المعلّم
  BQ.register('EL01', {
    hero: 'img-014',
    cover: 'يسمع الطفل أصواتاً من البيت، ويلمس مصدر كلّ صوت.',
    render: BQ.ui.godotRender ? BQ.ui.godotRender('recall', render, { name: 'تهيّأ', title: 'تهيّأ للدرس', after(c, result, stage) { c.done(); end(stage || c.stage); } }) : render,
  });
})();
})();
