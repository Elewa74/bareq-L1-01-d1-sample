/* EL03 · لاحظ وتعلّم — ثلاث خطوات داخل المسرح (تصميم v2):
   (١) المقطع vid-102 «الميمُ في الفَمِ» (مُصيَّر بلا شخصيات مقصوصة: فم سيف · الحرف كاملاً بتلاشٍ بلا حركة قلم · «ماءْ»)
   (٢) «المس واسمع» gme-111: بطاقتا الحرف «م» وشفتي سيف — حرّ، لا خطأ
   (٣) تتبّع «م» مرّة واحدة (gme-101 المستوى ١: أسهم مرقّمة + نقطة بدء). لا نصّ للطفل غير «م» و«ماءْ». */
(function () {
  const NSTEPS = 3; // المقطع · المس واسمع · تتبّع الحرف (مؤشّر موحّد بلا نصّ للطفل)

  function css() {
    if (document.getElementById('st-EL03')) return;
    document.head.append(BQ.h('style', { id: 'st-EL03' }, `
.bq-frame[data-el="EL03"] .elp-stage{justify-content:flex-start;gap:18px}
.bq-frame[data-el="EL03"] .e3-screen{width:100%;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;position:relative}
.bq-frame[data-el="EL03"] .e3-row{position:relative;display:flex;align-items:center;justify-content:center;gap:clamp(28px,12cqi,120px);width:100%;direction:rtl}
.bq-frame[data-el="EL03"] .e3-pad{position:relative;z-index:2;width:clamp(140px,34cqi,300px);aspect-ratio:1;border-radius:var(--r-lg);border:5px solid var(--white);background:var(--white);padding:0;cursor:pointer;overflow:hidden;box-shadow:0 8px 0 var(--sky-line),0 16px 30px var(--shade);transition:transform .45s cubic-bezier(.3,1.3,.5,1),opacity .3s,box-shadow .3s}
.bq-frame[data-el="EL03"] .e3-pad.glyph{background:var(--paper);border-color:var(--paper)}
.bq-frame[data-el="EL03"] .e3-pad:focus-visible{outline:4px solid var(--navy);outline-offset:4px}
.bq-frame[data-el="EL03"] .e3-pad .g{display:grid;place-items:center;height:100%;font:700 clamp(96px,24cqi,210px)/1 var(--ff-child);color:var(--navy);margin-top:-.12em}
.bq-frame[data-el="EL03"] .e3-pad img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 34%;transform:scale(1.5);transform-origin:50% 38%}
.bq-frame[data-el="EL03"] .e3-pad img.v{object-position:50% 50%;transform:none;opacity:0}
.bq-frame[data-el="EL03"] .e3-pad img.v.on{opacity:1}
.bq-frame[data-el="EL03"] .e3-pad.touched{box-shadow:0 0 0 5px var(--sun-soft),0 16px 30px var(--shade)}
.bq-frame[data-el="EL03"] .e3-pad.hintdim{opacity:.7}
.bq-frame[data-el="EL03"] .e3-pad.is-ok{box-shadow:0 0 0 5px var(--ok),0 16px 30px var(--shade)}
.bq-frame[data-el="EL03"] .e3-pad .bq-tick{position:absolute;top:6%;inset-inline-end:6%;width:20%;aspect-ratio:1;border-radius:50%;background:var(--ok);color:var(--white);display:none;place-items:center;padding:4%;z-index:2}
.bq-frame[data-el="EL03"] .e3-pad.is-ok .bq-tick{display:grid}
.bq-frame[data-el="EL03"] .e3-pad.tap{animation:bqPop .35s ease-out}
.bq-frame[data-el="EL03"] .e3-screen>.bq-btn{min-height:60px;padding-inline:1.5em;animation:bqPop .35s ease-out}
.bq-frame[data-el="EL03"] .e3-line{position:absolute;left:50%;top:50%;width:clamp(28px,12cqi,120px);height:5px;border-radius:5px;background:var(--ok);transform:translate(-50%,-50%) scaleX(0);transition:transform .5s .35s ease-out;z-index:1}
.bq-frame[data-el="EL03"] .e3-row.joined .e3-line{transform:translate(-50%,-50%) scaleX(1)}
.bq-frame[data-el="EL03"] .e3-ghost{position:absolute;left:50%;top:58%;width:64px;color:var(--navy);opacity:0;pointer-events:none;z-index:3;filter:drop-shadow(0 6px 10px var(--shade))}
.bq-frame[data-el="EL03"] .e3-ghost .bq-ic{width:100%;height:auto;aspect-ratio:1}
.bq-frame[data-el="EL03"] .bq-trace{container-type:size;width:min(100%,400px)}
.bq-frame[data-el="EL03"] .bq-trace-glyph{font-size:73cqh}
.bq-frame[data-el="EL03"] .e3-guide{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;color:var(--ok)}
.bq-frame[data-el="EL03"] .e3-guide .base{stroke:var(--sky-line)}
.bq-frame[data-el="EL03"] .e3-guide text{font:700 5px var(--ff-display);fill:var(--white)}
.bq-frame[data-el="EL03"] .e3-fill{position:absolute;inset:0;display:grid;place-items:center;font:700 73cqh/1 var(--ff-child);padding-bottom:6%;color:var(--sun-soft);-webkit-text-stroke:3px var(--navy);pointer-events:none;clip-path:inset(0 0 100% 0)}
@media (prefers-reduced-motion: reduce){.bq-frame[data-el="EL03"] .e3-pad{transition:none}.bq-frame[data-el="EL03"] .e3-pad.tap{animation:none}}
`));
  }

  /* الخطوة ٢ — «المس واسمع» (gme-111): حرّ، لا خطأ */
  function touchListen(scr, stage, ctx, next, G) {
    const h = BQ.h;
    const row = h('div.e3-row', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
    const tick = () => h('span.bq-tick', { 'aria-hidden': 'true', html: BQ.icons.check });
    const glyph = h('button.e3-pad.glyph', { type: 'button', 'aria-label': 'الحَرْفُ م' }, h('span.g', { 'aria-hidden': 'true' }, 'م'), tick());
    // v0-13: فم سيف = صور GPT للأوضاع (V0 راحة · V1/V1b مطبقتان للهمهمة · V2 نصف · V3/V4 «آ» واسعة · V5 إغلاق) مسجّلة على نقطة واحدة
    const VIS = ['V0', 'V1', 'V1b', 'V2', 'V3', 'V4', 'V5'];
    const vImgs = {}; VIS.forEach((v) => { vImgs[v] = h('img.v' + (v === 'V0' ? '.on' : ''), { src: 'media/img/vis/saif-' + v + '.webp', alt: '' }); });
    const lips = h('button.e3-pad', { type: 'button', 'aria-label': 'فَمُ سَيْفٍ' }, ...VIS.map((v) => vImgs[v]), tick());
    let shown = 'V0';
    const showVis = (v) => { if (v === shown) return; vImgs[shown].classList.remove('on'); vImgs[v].classList.add('on'); shown = v; };
    const ghost = h('span.e3-ghost', { 'aria-hidden': 'true' }, BQ.icon('hand'));
    row.append(glyph, h('span.e3-line', { 'aria-hidden': 'true' }), lips, ghost); // RTL: الحرف يميناً ثم الفم
    scr.append(row);
    let touched = new Set(), last = null, same = 0, finished = false;
    if (!BQ.reduced()) ghost.animate([{ opacity: 0, transform: 'translate(-50%,40%)' }, { opacity: .9, transform: 'translate(-50%,0)', offset: .4 }, { opacity: .9, transform: 'translate(-50%,0) scale(.86)', offset: .6 }, { opacity: .9, transform: 'translate(-50%,0)', offset: .75 }, { opacity: 0, transform: 'translate(-50%,10%)' }], { duration: 2000, delay: 600, easing: 'ease-in-out' });
    // مسار الأوضاع إطاراً بإطار (24/ث) محسوب من صوت السطر نفسه (v5/articulation/visemes.py — نفس محرّك الفيديو):
    // «مْـ… مْـ…» شفتان مطبقتان طوال الهمهمة (1/b) · «الميمُ في الفَمِ» تنفتح قبل الصائت بإطار وتنطبق على م/ف.
    const TRACK = '001bbb1bbb1bbb1bbb10000000001bbb1bbb1bbb1bbb100000002332221b233341b223352523331bbb1b000000000';
    const CODE = { 0: 'V0', 1: 'V1', b: 'V1b', 2: 'V2', 3: 'V3', 4: 'V4', 5: 'V5' };
    const mouthPlay = async () => {
      const id = 'bariq_L1-01_L1-build_02_ar';
      if (!G.alive()) return;
      const p = G.say(id); const au = BQ.hasAudio(id) ? BQ.audio.cur : null;
      let on = true;
      const loop = () => {
        if (!on || !G.alive()) return;
        const k = au ? Math.floor(au.currentTime * 24) : -1;
        showVis(k >= 0 && k < TRACK.length ? CODE[TRACK[k]] : 'V0');
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      await p; on = false; showVis('V0');
    };
    const tap = async (which, btn, other) => {
      btn.classList.remove('tap'); void btn.offsetWidth; btn.classList.add('tap');
      BQ.audio.stop();
      same = last === which ? same + 1 : 0; last = which;
      touched.add(which); btn.classList.add('touched'); btn.classList.remove('hintdim');
      // التلميح: تكرار لمس اللوحة نفسها ← تخفت قليلاً وتنبض الأخرى (لا صوت خطأ)
      if (!finished && same >= 1 && !touched.has(which === 'g' ? 'l' : 'g')) { btn.classList.add('hintdim'); BQ.ui.pulse(other); }
      if (which === 'g') await G.say('bariq_L1-01_snd-m_ar'); else await mouthPlay();
      if (!G.alive()) return;
      if (!finished && touched.size === 2) {
        finished = true;
        glyph.classList.remove('hintdim'); lips.classList.remove('hintdim');
        const gap = Math.round(row.clientWidth * 0.04);
        if (!BQ.reduced()) { glyph.style.transform = 'translateX(' + (-gap) + 'px)'; lips.style.transform = 'translateX(' + gap + 'px)'; }
        row.classList.add('joined');
        BQ.ui.ok(glyph); BQ.ui.ok(lips);
        await BQ.sleep(450);
        if (!G.alive()) return;
        await BQ.ui.bariq(stage, 'bariq_L1-01_fb-yes_ar');
        if (!G.alive()) return;
        scr.append(h('button.bq-btn', { type: 'button', onclick: next }, 'التّالي', BQ.icon('next')));
      }
    };
    glyph.addEventListener('click', () => tap('g', glyph, lips));
    lips.addEventListener('click', () => tap('l', lips, glyph));
  }

  /* الخطوة ٣ — تتبّع «م» مرّة واحدة */
  function traceOnce(scr, stage, ctx, G) {
    const h = BQ.h;
    // مسار «م» المنفصلة (الصيغة أ: من نقطة الالتقاء على السطر، حول الرأس، ثم الذيل) — بنسب مربّع التتبّع
    const PATH = [[0.40, 0.57], [0.42, 0.46], [0.50, 0.39], [0.59, 0.46], [0.60, 0.54], [0.50, 0.565], [0.40, 0.58], [0.385, 0.67], [0.39, 0.76], [0.40, 0.83]];
    let guide;
    // ordered: نقاط التحقّق بالترتيب، والبدء قرب النقطة الخضراء (QA-03 · P2-3)
    const box = BQ.ui.trace(scr, {
      glyph: 'م', path: PATH, ordered: true, startTol: 0.11, tol: 0.09, // v0-12: تسامح أوسع للإصبع (كان ٠٫٠٨ للبدء و٠٫٠٧٥ للمسار)
      async onDone() {
        if (!G.alive()) return;
        const f = h('span.e3-fill', { 'aria-hidden': 'true' }, 'م'); box.append(f);
        if (BQ.reduced()) f.style.clipPath = 'none';
        else f.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 600, easing: 'ease-out', fill: 'forwards' });
        guide.style.opacity = '0';
        await G.say('bariq_L1-01_snd-m_ar');
        if (!G.alive()) return;
        await BQ.ui.bariq(stage, 'bariq_L1-01_d1-FB_03_ar');
        if (!G.alive()) return;
        ctx.done();
        BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open('EL03', { skipCover: true }) });
      },
    });
    guide = h('span', { 'aria-hidden': 'true', html:
      '<svg class="e3-guide" viewBox="0 0 100 100"><defs><marker id="e3a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>' +
      '<path class="base" d="M14 57.5H86" stroke-width=".7" fill="none"/>' +
      '<path d="M40 56C39 48 44 39.5 51 39.5C57 39.5 60.5 44 60 50C59.5 55 55 56.5 49 56.5L43.5 57.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="2 2.2" marker-end="url(#e3a)"/>' +
      '<path d="M38.6 61C38 67 38.4 73 39.6 80.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="2 2.2" marker-end="url(#e3a)"/>' +
      '<circle cx="33" cy="41" r="3.6" fill="currentColor"/><text x="33" y="42.8" text-anchor="middle">١</text>' +
      '<circle cx="47" cy="73" r="3.6" fill="currentColor"/><text x="47" y="74.8" text-anchor="middle">٢</text></svg>' });
    guide.style.transition = 'opacity .4s';
    box.insertBefore(guide, box.querySelector('canvas'));
    if (BQ.elGuard) BQ.elGuard(box); // إصبع واحد · لا تمرير/تكبير أثناء التتبّع
  }

  BQ.register('EL03', {
    hero: 'img-102',
    cover: 'يرى الطفل «مْـ» على الشفتين، ثم يلمس الحرف «م» ويتتبّعه مرّة.',
    render(stage, ctx) {
      css();
      const h = BQ.h;
      const V = BQ.video;
      const G = V.liveGuard(ctx);
      V.pinAdult(ctx);
      V.adultNote(ctx,
        h('p', null, h('b', null, 'للمعلّم: '), 'بعد المقطع: «المس الحرف، والمس الفم» — لا خطأ في هذه الخطوة. ثم التتبّع: من النقطة الخضراء، السهم ١ ثم ٢، مرّة واحدة.'));
      const steps = V.steps(stage, NSTEPS);
      let scr = null;
      const go = (i) => {
        BQ.audio.stop();
        steps.set(i);
        if (scr) scr.remove();
        scr = h('div.e3-screen'); stage.append(scr);
        return scr;
      };
      // الخطوتان ٢ و٣: التعليمة مسموعة فقط (زرّ السمّاعة ظاهر، بلا نصّ مكتوب للطفل)
      const sayOnly = (lineId) => {
        if (!G.alive()) return;
        ctx.instruction('', lineId);
        const row = ctx.frame.querySelector('.elp-instr'); const t = ctx.frame.querySelector('.elp-instr-t');
        if (row) row.hidden = false; if (t) t.hidden = true;
        ctx.onReplay(() => G.say(lineId));
      };
      const s1 = go(0);
      const P = V.mp4(s1, ctx, { id: 'vid-102', aria: 'مَقْطَعُ «الميمُ في الفَمِ»', captions: true, slow: ctx.age() === '10-12' });
      ctx.onReplay(() => P.goto(P.scene));
      P.done.then(async () => {
        await BQ.sleep(500);
        if (!G.alive() || !stage.isConnected) return;
        P.destroy();
        const s2 = go(1);
        sayOnly('bariq_L1-01_d1-EL03_03_ar'); // «هَيّا: أَيْنَ الميمُ؟»
        touchListen(s2, stage, ctx, () => {
          if (!G.alive()) return;
          const s3 = go(2);
          sayOnly('bariq_L1-01_d1-EL03_02_ar'); // «هَذا حَرْفُ الميمِ.»
          traceOnce(s3, stage, ctx, G);
        }, G);
      });
    },
  });
})();
