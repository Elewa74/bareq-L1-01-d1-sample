/* EL06 · أغنّي (أنشودة الميم) — خطوتان داخل المسرح (تصميم v2):
   (١) الأنشودة vid-103 (مُصيَّرة بلا شخصيات مقصوصة، ٩٦ نبضة/د): عند الطرق يتوقّف الإيقاع وتظهر ○○/○□ للمس (gme-109)
       ثانيتين (لـ٤–٦ حتى «أَكْمِلْ»)؛ الكلمات في النصّ المصاحب فقط (زرّ «النص المصاحب»).
   (٢) «أغنّي وحدي»: مسار الآلات وشريط صور الأسطر يتقدّم مع الإيقاع (بلا كلمات، بلا تسجيل). */
(function () {
  const NSTEPS = 2; // الأنشودة · أغنّي وحدي (مؤشّر موحّد)
  const STRIP = [
    { img: 'img-001', pos: '50% 62%', from: 3.2, to: 10.0, aria: 'ماءْ' },
    { img: 'img-120', pos: '18% 82%', zoom: 1.9, from: 10.0, to: 16.8, aria: 'صَحْنٌ' },
    { img: 'img-101', pos: '50% 34%', zoom: 1.6, from: 27.7, to: 34.4, aria: 'فَمُ سَيْفٍ' },
    { glyph: 'م', from: 34.4, to: 40.2, aria: 'الحَرْفُ م' },
    { img: 'img-122', pos: '60% 60%', from: 46.4, to: 66, aria: 'ماءْ' },
  ];
  const REFRAIN = [[16.8, 27.7], [40.2, 46.4]];

  function css() {
    if (document.getElementById('st-EL06')) return;
    document.head.append(BQ.h('style', { id: 'st-EL06' }, `
.bq-frame[data-el="EL06"] .elp-stage{justify-content:flex-start;gap:18px}
.bq-frame[data-el="EL06"] .e6-screen{width:100%;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;position:relative}
.bq-frame[data-el="EL06"] .e6-strip{display:flex;gap:clamp(8px,2.4cqi,22px);align-items:center;justify-content:center;direction:rtl;width:100%;padding:14px 0}
.bq-frame[data-el="EL06"] .e6-card{position:relative;flex:0 1 auto;width:clamp(56px,16cqi,150px);aspect-ratio:1;border-radius:var(--r-md);border:4px solid var(--white);background:var(--white);overflow:hidden;box-shadow:0 6px 0 var(--sky-line),0 12px 24px var(--shade);opacity:.55;transform:scale(.9);transition:transform .35s cubic-bezier(.3,1.4,.5,1),opacity .3s,box-shadow .3s}
.bq-frame[data-el="EL06"] .e6-card img{width:100%;height:100%;object-fit:cover;display:block}
.bq-frame[data-el="EL06"] .e6-card.glyph{background:var(--paper);border-color:var(--paper)}
.bq-frame[data-el="EL06"] .e6-card .g{display:grid;place-items:center;height:100%;font:700 clamp(40px,11cqi,110px)/1 var(--ff-child);color:var(--navy);margin-top:-.1em}
.bq-frame[data-el="EL06"] .e6-card.past{opacity:.85}
.bq-frame[data-el="EL06"] .e6-card.now{opacity:1;transform:scale(1.2);box-shadow:0 0 0 5px var(--sun-soft),0 16px 30px var(--shade);z-index:2}
.bq-frame[data-el="EL06"] .e6-card.now.beat{transform:scale(1.26)}
.bq-frame[data-el="EL06"] .e6-refrain{height:64px;aspect-ratio:2/1;background:var(--paper);border:3px solid var(--paper-edge);border-radius:var(--r-md);color:var(--navy);display:grid;place-items:center;opacity:.25;transform:scale(.85);transition:transform .3s cubic-bezier(.3,1.5,.5,1),opacity .25s}
.bq-frame[data-el="EL06"] .e6-refrain .bq-ic{width:80%;height:80%}
.bq-frame[data-el="EL06"] .e6-refrain.on{opacity:1;transform:scale(1)}
.bq-frame[data-el="EL06"] .e6-ctl{display:flex;gap:12px;align-items:center}
.bq-frame[data-el="EL06"] .e6-ctl .bq-btn{min-height:48px}
.bq-frame[data-el="EL06"] .e6-brq{position:absolute;bottom:0;inset-inline-start:0;width:clamp(70px,13cqi,120px);pointer-events:none;animation:e6Dance 1.25s ease-in-out infinite;transform-origin:50% 60%}
.bq-frame[data-el="EL06"] .e6-brq img{width:100%;display:block;filter:drop-shadow(0 8px 12px var(--shade))}
@keyframes e6Dance{0%,50%,100%{transform:translateY(0) scale(1.06,.94)}25%{transform:translateY(-14%) rotate(-8deg) scale(.97,1.04)}75%{transform:translateY(-14%) rotate(8deg) scale(.97,1.04)}}
@media (prefers-reduced-motion: reduce){.bq-frame[data-el="EL06"] .e6-brq{animation:none}.bq-frame[data-el="EL06"] .e6-card,.bq-frame[data-el="EL06"] .e6-refrain{transition:none}}
`));
  }

  function singAlone(scr, stage, ctx, onEnd) {
    const h = BQ.h;
    const strip = h('div.e6-strip', { role: 'list', 'aria-label': 'صُوَرُ الأُنْشودَةِ' });
    const cards = STRIP.map((c) => {
      const el = h('div.e6-card' + (c.glyph ? '.glyph' : ''), { role: 'listitem', 'aria-label': c.aria },
        c.glyph ? h('span.g', { 'aria-hidden': 'true' }, c.glyph) : h('img', { src: BQ.img(c.img), alt: '', style: { objectPosition: c.pos, transform: c.zoom ? 'scale(' + c.zoom + ')' : '', transformOrigin: c.pos } }));
      strip.append(el); return el;
    });
    const refrain = h('div.e6-refrain', { 'aria-hidden': 'true' }, BQ.icon('diff'));
    const pp = h('button.bq-btn', { type: 'button' }, BQ.icon('pause'), h('span', null, 'إيقاف'));
    const rp = h('button.bq-btn.ghost', { type: 'button' }, BQ.icon('replay'), 'من البداية');
    const brq = h('div.e6-brq', { 'aria-hidden': 'true' }, h('img', { src: BQ.char.BRQ, alt: '' }));
    scr.append(refrain, strip, h('div.e6-ctl', null, pp, rp), brq);
    let bed = null, raf = 0, t0 = 0, pausedAt = 0, ended = false, alive = true, lastBeat = -1;
    const DUR = 65;
    const now = () => (bed && bed.el ? bed.el.currentTime : ((pausedAt || performance.now()) / 1000 - t0));
    const isPaused = () => (bed && bed.el ? bed.el.paused : !!pausedAt);
    const setPP = () => { const p = isPaused() && !ended; pp.replaceChildren(BQ.icon(p || ended ? 'play' : 'pause'), h('span', null, ended ? 'غنِّ مرّة أخرى' : p ? 'تشغيل' : 'إيقاف')); brq.style.animationPlayState = p ? 'paused' : ''; };
    function start() {
      if (bed) bed.stop();
      ended = false; lastBeat = -1;
      bed = BQ.audio.fx('bariq_L1-01_music-song-bed', 0.75);
      t0 = performance.now() / 1000; pausedAt = 0;
      if (bed.el) bed.done.then(finish); else setTimeout(() => alive && finish(), DUR * 1000);
      setPP(); cancelAnimationFrame(raf); tick();
    }
    function tick() {
      if (!alive) return;
      const t = now(), bi = Math.floor(t / (60 / 96));
      if (bi !== lastBeat && !isPaused()) {
        lastBeat = bi;
        const cur = scr.querySelector('.e6-card.now');
        if (cur && !BQ.reduced()) { cur.classList.add('beat'); setTimeout(() => cur.classList.remove('beat'), 120); }
      }
      STRIP.forEach((c, i) => { cards[i].classList.toggle('now', t >= c.from && t < c.to); cards[i].classList.toggle('past', t >= c.to); });
      refrain.classList.toggle('on', REFRAIN.some(([a, b]) => t >= a && t < b));
      raf = requestAnimationFrame(tick);
    }
    async function finish() {
      if (ended || !alive) return; ended = true;
      cancelAnimationFrame(raf); cards.forEach((c) => c.classList.add('past')); setPP();
      await BQ.ui.bariq(stage, 'bariq_L1-01_d1-EL06_05_ar'); // «سَمِعْتُ فَرْقاً!»
      if (alive) onEnd();
    }
    pp.addEventListener('click', () => {
      if (ended) { start(); return; }
      if (bed && bed.el) { if (bed.el.paused) bed.el.play().catch(() => {}); else bed.el.pause(); }
      else if (pausedAt) { t0 += (performance.now() - pausedAt) / 1000; pausedAt = 0; } else pausedAt = performance.now();
      setPP();
    });
    rp.addEventListener('click', start);
    ctx.onCleanup(() => { alive = false; cancelAnimationFrame(raf); if (bed) bed.stop(); });
    ctx.onReplay(start);
    ctx.instruction('', 'bariq_L1-01_ins-say_ar').then(() => { if (alive && !bed) start(); });
    const row = ctx.frame.querySelector('.elp-instr'), tx = ctx.frame.querySelector('.elp-instr-t');
    if (row) row.hidden = false; if (tx) tx.hidden = true;
  }

  const lyricsNode = () => {
    const ids = ['01', '02', '01', '03', '04', '05', '06', '07', '08', '09', '10', '04', '05', '11', '12', '13', '04', '05'];
    const li = ids.map((n) => { const L = BQ.line('bariq_L1-01_d1-EL06_' + n + '_ar'); return L ? '<li><b>' + L.sp + ':</b> ' + L.t + '</li>' : ''; }).join('');
    return BQ.h('div', { html: '<p><b>كلمات الأنشودة:</b></p><ol class="vp-lyrics" style="font:400 15px/1.9 var(--ff-child);padding-inline-start:1.2em">' + li + '</ol>' });
  };

  BQ.register('EL06', {
    hero: 'img-111',
    cover: 'غنّيا معاً «مْـ… ماءٌ!»، وتوقّفا عند الطرق.',
    render(stage, ctx) {
      css();
      const V = BQ.video;
      const G = V.liveGuard(ctx);
      const older = ctx.age() === '10-12'; // ١٠–١٢: «أغنّي وحدي» أوّلاً ثم المصوّرة للتحقّق
      const order = older ? [1, 0] : [0, 1];
      const steps = V.steps(stage, NSTEPS);
      let scr = null, n = 0;
      const go = () => {
        BQ.audio.stop();
        steps.set(n); n++;
        if (scr) scr.remove(); scr = BQ.h('div.e6-screen'); stage.append(scr); return scr;
      };
      const end = () => {
        if (!G.alive()) return;
        ctx.done();
        BQ.ui.endCard(stage, { title: 'سَمِعْتُ فَرْقاً!', note: 'غنّيتما الأنشودة. أعيدا الغناء متى شئتما بلا أصوات الشخصيات.', onReplay: () => BQ.open('EL06', { skipCover: true }) });
      };
      const video = (then) => {
        const s = go();
        const P = V.mp4(s, ctx, { id: 'vid-103', aria: 'أُنْشودَةُ الميمِ', captions: true, adultExtra: lyricsNode });
        ctx.onReplay(() => P.goto(P.scene));
        P.done.then(async () => {
          await BQ.sleep(500);
          if (!G.alive() || !stage.isConnected) return;
          P.destroy(); then();
        });
      };
      const alone = (then) => { const s = go(); singAlone(s, stage, ctx, then); };
      const stepFns = { 0: video, 1: alone };
      stepFns[order[0]](() => stepFns[order[1]](end));
    },
  });
})();
