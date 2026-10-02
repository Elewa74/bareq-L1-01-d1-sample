/* EL06 · أغنّي (أنشودة الميم) — خطوتان داخل المسرح (تصميم v2):
   (١) الأنشودة vid-103 — غناءٌ حقيقيّ (Eleven Music v2.5، ٩٦ نبضة/د) تُشاهَد بلا وقفات أسئلة (أُزيلت وقفات الطرق v0-10)؛
       الكلمات في النصّ المصاحب فقط (زرّ «النص المصاحب»).
   (٢) «أغنّي وحدي»: مسار الآلات (الغناء مفصول بـ demucs) وشريط صور الأسطر يتقدّم مع الإيقاع (بلا كلمات، بلا تسجيل). */
(function () {
  const NSTEPS = 2; // الأنشودة · أغنّي وحدي (مؤشّر موحّد)
  // v0-9: الأنشودة غناءٌ حقيقيّ (Eleven Music) — أزمنة سرير الآلات (نفس خطّ vid-103: طرق ٢٩٫٩٥ و٥٢٫٤٥)
  const STRIP = [
    { img: 'img-001', pos: '50% 62%', from: 10.0, to: 14.66, aria: 'ماءْ' },
    { img: 'img-120', pos: '18% 82%', zoom: 1.9, from: 14.66, to: 29.95, aria: 'صَحْنٌ' },
    { img: 'img-101', pos: '50% 34%', zoom: 1.6, from: 37.39, to: 43.21, aria: 'فَمُ سَيْفٍ' },
    { glyph: 'م', from: 43.21, to: 46.43, aria: 'الحَرْفُ م' },
    { img: 'img-122', pos: '60% 60%', from: 46.43, to: 67, aria: 'ماءْ' },
  ];
  const REFRAIN = [[29.95, 36.9], [52.45, 59.2]];

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
.bq-frame[data-el="EL06"] .e6-ctl .bq-btn{min-height:60px}
.bq-frame[data-el="EL06"] .e6-brq{position:absolute;bottom:0;inset-inline-start:0;width:clamp(70px,13cqi,120px);pointer-events:none;animation:e6Dance 1.25s ease-in-out infinite;transform-origin:50% 60%}
.bq-frame[data-el="EL06"] .e6-brq img{width:100%;display:block;filter:drop-shadow(0 8px 12px var(--shade))}
/* v0-12: «أغنّي وحدي» مسرح صغير — الشريط في الوسط، بارق يرقص بجانب أزرار التحكّم (لا فوق الصور)، نوتات تطفو أثناء العزف */
.bq-frame[data-el="EL06"] .e6-screen{margin-block:auto;flex:0 0 auto;padding-block:8px}
.bq-frame[data-el="EL06"] .e6-ctl .bq-btn{white-space:nowrap}
@container stage (max-width: 560px){.bq-frame[data-el="EL06"] .e6-ctl{gap:8px}.bq-frame[data-el="EL06"] .e6-ctl .bq-btn{padding-inline:.9em;font-size:16px}.bq-frame[data-el="EL06"] .e6-ctl .e6-brq,.bq-frame[data-el="EL06"] .e6-ctl .e6-brq.has-anim{width:64px}}
.bq-frame[data-el="EL06"] .e6-ctl .e6-brq,.bq-frame[data-el="EL06"] .e6-ctl .e6-brq.has-anim{position:relative;bottom:auto;inset-inline-start:auto;inset:auto;width:clamp(76px,11cqi,108px);margin-block:-18px -6px}
.bq-frame[data-el="EL06"] .e6-notes{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.bq-frame[data-el="EL06"] .e6-note{position:absolute;bottom:18%;font:700 clamp(22px,3.4cqi,34px)/1 var(--ff-display);color:var(--sky);opacity:0}
.bq-frame[data-el="EL06"] .e6-screen.is-on .e6-note{animation:e6Note 3.2s ease-out infinite}
.bq-frame[data-el="EL06"] .e6-note:nth-child(2){color:var(--sun-edge);animation-delay:.8s!important}
.bq-frame[data-el="EL06"] .e6-note:nth-child(3){color:var(--coral);animation-delay:1.6s!important}
.bq-frame[data-el="EL06"] .e6-note:nth-child(4){color:var(--navy);animation-delay:2.4s!important}
@keyframes e6Note{0%{opacity:0;transform:translateY(0) rotate(-10deg)}15%{opacity:.8}100%{opacity:0;transform:translateY(-220%) rotate(14deg)}}
@media (prefers-reduced-motion: reduce){.bq-frame[data-el="EL06"] .e6-notes{display:none}}
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
    const refrain = h('div.e6-refrain'); // v0-12 r3: لا رمز هندسيّ للّازمة — بارق يقفز معها (cheer) وهو الإشارة المفهومة؛ العنصر لا يُعرض
    const pp = h('button.bq-btn', { type: 'button' }, BQ.icon('pause'), h('span', null, 'إيقاف'));
    const rp = h('button.bq-btn.ghost', { type: 'button' }, BQ.icon('replay'), 'من البداية');
    const anim = BQ.ui.brq('idle'); // [brq-anim v1] cheer مع اللازمة · idle غير ذلك/عند الإيقاف
    const brq = h('div.e6-brq.has-anim', { 'aria-hidden': 'true' }, anim);
    const notes = h('div.e6-notes', { 'aria-hidden': 'true' }, ...['♪', '♫', '♪', '♬'].map((n, i) => h('span.e6-note', { style: { insetInlineStart: (12 + i * 24) + '%' } }, n)));
    scr.append(notes, strip, h('div.e6-ctl', null, brq, pp, rp));
    let bed = null, raf = 0, t0 = 0, pausedAt = 0, ended = false, alive = true, lastBeat = -1;
    const DUR = 66.5;
    const now = () => (bed && bed.el ? bed.el.currentTime : ((pausedAt || performance.now()) / 1000 - t0));
    const isPaused = () => (bed && bed.el ? bed.el.paused : !!pausedAt);
    const setPP = () => { const p = isPaused() && !ended; pp.replaceChildren(BQ.icon(p || ended ? 'play' : 'pause'), h('span', null, ended ? 'غنِّ مرّة أخرى' : p ? 'تشغيل' : 'إيقاف')); brq.style.animationPlayState = p ? 'paused' : ''; scr.classList.toggle('is-on', !p && !ended); if (p || ended) anim.brq('idle'); };
    /* v0-12 (iPad/iOS): سرير الآلات على عنصر الصوت المشترك الذي فُتح بلمسة «ابْدَأْ» — عنصر Audio جديد خارج اللمسة يُمنع صامتاً في iOS */
    function playBed() {
      const id = 'bariq_L1-01_music-song-bed';
      if (!BQ.hasAudio(id)) return BQ.audio.fx(id, 0.75);
      const done = BQ.audio.play(id, { noCaption: true, volume: 0.75 });
      const el = BQ.audio.cur;
      return { el, done, stop() { if (BQ.audio.cur === el) BQ.audio.stop(); else { try { el.pause(); } catch (e) { /* */ } } } };
    }
    function start() {
      if (bed) bed.stop();
      ended = false; lastBeat = -1;
      bed = playBed();
      const mine = bed;
      t0 = performance.now() / 1000; pausedAt = 0;
      if (bed.el) bed.done.then(() => { if (bed === mine) finish(); }); else setTimeout(() => alive && bed === mine && finish(), DUR * 1000);
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
      const rf = REFRAIN.some(([a, b]) => t >= a && t < b);
      refrain.classList.toggle('on', rf);
      if (!isPaused()) anim.brq(rf ? 'cheer' : 'idle'); // [brq-anim v1]
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
    const ids = ['01', '02', '01', '04', '05', '06', '05', '08', '09', '10', '11', '12'];
    const li = ids.map((n) => { const L = BQ.line('bariq_L1-01_song_' + n + '_ar'); return L ? '<li>' + L.t + '</li>' : ''; }).join('');
    return BQ.h('div', { html: '<p><b>كلمات الأنشودة (كما تُغنّى):</b></p><ol class="vp-lyrics" style="font:400 15px/1.9 var(--ff-child);padding-inline-start:1.2em">' + li + '</ol>' });
  };

  BQ.register('EL06', {
    hero: 'img-111',
    cover: 'غنّيا معاً «مْـ… الماءُ في الصَّحْنِ»، وتوقّفا عند الطرق.',
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
        BQ.ui.endCard(stage, { title: 'سَمِعْتُ فَرْقاً!', onReplay: () => BQ.open('EL06', { skipCover: true }) });
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
