/* EL07 · كلمات وصور — gme-104 VocabCard(flip) · غير مرصود · حرّ بلا حالة خطأ (نسخة د١ المصغّرة)
   scr01 «اقلب واسمع»: ثلاث بطاقات بظهر موج موحَّد — الماء يقول «ماءْ.»، الطرق والبوصلة تُسمِعان صوتهما فقط (لا تُقال «باب»).
   scr02 «سمِّ ثم اقلب»: صورة الماء بلا صوت ← يسمّيها الطفل ← يقلب فيسمع «ماءْ.» ويرى الكلمة ← «نَعَمْ! هَذا هُوَ!».
   ١٠–١٢: تُخلط البطاقات مقلوبة ← «هَيّا: أَيْنَ الماءُ؟» (صفّا الخطأ الأوّل/الثاني من §١٣ يعملان هنا وحدها — Q-EL1). */
(function () {
  'use strict';
  function init() {
  const K = BQ.kit, h = BQ.h;
  const ID = 'EL07';
  const SC = '.bq-frame[data-el="EL07"]';
  const WORD = 'bariq_L1-01_vocab-w1_01_ar';

  K.style('st-EL07', `
${SC} .k7 { min-height: 400px; justify-content: center; }
${SC} .k7-row { position: relative; flex: 0 0 auto; display: flex; gap: clamp(12px, 3.6cqi, 36px); justify-content: center; align-items: center; padding: 8px 0 12px; }
${SC} .k7-card { position: relative; width: clamp(92px, 25cqi, 210px); aspect-ratio: 3 / 4; border: 0; padding: 0; background: none; cursor: pointer; perspective: 1000px; border-radius: var(--r-lg); transition: transform .4s cubic-bezier(.3,1.3,.5,1); }
@media (hover: hover) { ${SC} .k7-card:hover { transform: translateY(-4px); } }
${SC} .k7-card:focus-visible { outline: 4px solid var(--navy); outline-offset: 5px; }
${SC} .k7-in { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform .4s cubic-bezier(.4,.1,.3,1.2); border-radius: inherit; }
${SC} .k7-card.is-flip .k7-in { transform: rotateY(180deg); }
${SC} .k7-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: inherit; overflow: hidden; border: 5px solid var(--white); background: var(--white); box-shadow: 0 6px 0 var(--sky-line), 0 14px 28px var(--shade); display: flex; flex-direction: column; }
${SC} .k7-b { transform: rotateY(180deg); }
${SC} .k7-wave { background: linear-gradient(165deg, var(--sky-wash), var(--sky-line)); color: var(--sky-2); }
${SC} .k7-wave svg { width: 100%; height: 100%; display: block; }
${SC} .k7-pic { flex: 1 1 auto; min-height: 0; }
${SC} .k7-pic img { width: 100%; height: 100%; object-fit: cover; display: block; }
${SC} .k7-strip { flex: 0 0 27%; display: grid; place-items: center; background: var(--paper); color: var(--sky); border-top: 2px solid var(--paper-edge); }
${SC} .k7-strip .bq-ic { width: 30%; height: 56%; }
${SC} .k7-strip .k7-w { font: 700 clamp(24px, 5.6cqi, 50px)/1 var(--ff-child); color: var(--ink); opacity: 0; transform: translateY(6px); transition: opacity .2s ease-out, transform .2s ease-out; padding-bottom: .14em; }
${SC} .k7-strip .k7-w.is-on { opacity: 1; transform: none; }
${SC} .k7-wordface { display: grid; place-items: center; background: var(--paper); }
${SC} .k7-wordface .k7-bigw { font: 700 clamp(64px, 14cqi, 124px)/1.3 var(--ff-child); color: var(--ink); padding-bottom: .1em; }
${SC} .k7-card.is-edge .k7-face { box-shadow: 0 0 0 4px var(--sun), 0 14px 28px var(--shade); }
${SC} .k7-card.is-glow { animation: bqPulse .65s ease-in-out 2; }
${SC} .k7-card.is-glow .k7-face { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 28px var(--sun); }
${SC} .k7-card.is-ok .k7-b { border-color: var(--ok); box-shadow: 0 0 0 4px var(--ok), 0 14px 28px var(--shade); }
${SC} .k7-w .m, ${SC} .k7-bigw .m { color: var(--coral); }
${SC} .k7-card.is-pop { animation: bqPop .3s ease-out; }
${SC} .k7-card.is-dim { opacity: .6; }
${SC} .k7-card.is-shake { animation: bqShake .45s ease; }
${SC} .k7-card.big { width: clamp(190px, 38cqi, 310px); }
${SC} .k7-flipic { position: absolute; z-index: 2; bottom: -18px; left: 50%; translate: -50% 0; width: 60px; height: 60px; border-radius: 50%; background: var(--sun); color: var(--navy); border: 5px solid var(--white); display: grid; place-items: center; box-shadow: 0 4px 0 var(--sun-edge); pointer-events: none; animation: kxBreath 1.8s ease-in-out infinite; }
${SC} .k7-flipic svg { width: 60%; }
${SC} .k7-card.is-flip .k7-flipic { display: none; }
${SC} .k7-ghost { position: absolute; left: 50%; top: 50%; translate: -50% -50%; opacity: .7; pointer-events: none; }
${SC} .k7-ghost .k7-face { background: color-mix(in srgb, var(--white) 55%, transparent); border: 3px dashed var(--sky-2); box-shadow: none; }
${SC} .k7-ghost .k7-face svg { opacity: .45; }
${SC} .k7-deal { animation: k7Deal .45s cubic-bezier(.2,1.3,.4,1) both; }
${SC} .k7-foot { display: grid; place-items: center; min-height: 54px; }
@keyframes k7Deal { from { opacity: 0; transform: translateY(26px) rotate(-6deg) scale(.8); } to { opacity: 1; transform: none; } }
@container stage (max-width: 560px) {
  ${SC} .k7-card { width: 29cqi; min-width: 92px; }
  ${SC} .k7-card.big { width: 62cqi; }
  ${SC} .k7-row { gap: 3cqi; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .k7-in { transition: none; }
  ${SC} .k7-card.is-flip .k7-in { transform: none; }
  ${SC} .k7-b { transform: none; opacity: 0; transition: opacity .2s; }
  ${SC} .k7-card.is-flip .k7-b { opacity: 1; }
  ${SC} .k7-card.is-flip .k7-a { opacity: 0; }
  ${SC} .k7-deal, ${SC} .k7-card.is-glow, ${SC} .k7-card.is-pop, ${SC} .k7-card.is-shake, ${SC} .k7-flipic { animation: none; }
  ${SC} .k7-card.is-shake { opacity: .6; }
}
`);

  /* ظهر البطاقة الموحَّد (img-106 مبنيّ برمجياً): موج ماء بألوان الهوية */
  const WAVE = '<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    Array.from({ length: 9 }, (_, i) => { const y = 30 + i * 45; return '<path d="M-20 ' + y + ' q 25 -18 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" opacity="' + (i % 2 ? 0.55 : 1) + '"/>'; }).join('') +
    '<circle cx="150" cy="200" r="44" fill="var(--white)" stroke="var(--sun)" stroke-width="9"/><circle cx="150" cy="200" r="15" fill="var(--sun-soft)" stroke="var(--sun)" stroke-width="4"/></svg>';
  const AGES = {
    '4-6': 'البطاقات كبيرة ومتباعدة، والقلب بلمسة واحدة لا بسحب.',
    '7-9': 'النسخة الأساسية.',
    '10-12': 'بعد كشف البطاقات تُخلط مقلوبةً ويُطلب «أَيْنَ الماءُ؟» (تذكّر الموضع).',
  };

  /* بنود gme-104 (المستوى ١) — صوت كل بطاقة */
  const CARDS = [
    { id: 'water', img: 'img-001', sound: () => K.pick(WORD, 'L1-01_d2_s5_03'), word: true, aria: 'بِطاقَةٌ مَقْلوبَةٌ' },
    { id: 'knock', img: 'img-007', sound: () => K.pick('bariq_L1-01_sfx-door-knock', 'bariq_L1-01_sfx-door-knock-b'), aria: 'بِطاقَةٌ مَقْلوبَةٌ' },
    { id: 'compass', img: 'img-008', sound: () => K.pick('bariq_L1-01_sfx-compass', 'bariq_L1-01_sfx-compass-b'), aria: 'بِطاقَةٌ مَقْلوبَةٌ' },
  ];

  /** بطاقة بوجهين: a يُرى أوّلاً، b بعد القلب */
  function makeCard(c, opt) {
    opt = opt || {};
    const wave = () => h('span.k7-face.k7-wave', { html: WAVE });
    const picFace = (full) => h('span.k7-face.k7-picface', null,
      h('span.k7-pic', null, h('img', { src: BQ.img(c.img), alt: '', draggable: 'false' })),
      full ? null : h('span.k7-strip', null, c.word ? h('span.k7-w', { lang: 'ar', html: K.MAA }) : BQ.icon('speaker')));
    const wordFace = () => h('span.k7-face.k7-wordface', null, h('span.k7-bigw', { lang: 'ar', html: K.MAA }));
    const A = opt.mode === 'recall' ? picFace(true) : wave();
    const B = opt.mode === 'recall' ? wordFace() : picFace();
    A.classList.add('k7-a'); B.classList.add('k7-b');
    const el = h('button.k7-card', { type: 'button', 'aria-label': opt.aria || c.aria, dataset: { id: c.id } },
      h('span.k7-in', null, A, B), h('span.kx-tick', { 'aria-hidden': 'true', html: BQ.icons.check }));
    if (opt.mode === 'recall') { el.classList.add('big'); el.append(h('span.k7-flipic', { 'aria-hidden': 'true', html: K.FLIP_IC })); }
    el.card = c;
    el.flipped = false;
    el.flip = (on) => { el.flipped = on !== false; el.classList.toggle('is-flip', el.flipped); el.setAttribute('aria-pressed', String(el.flipped)); };
    return el;
  }
  const anim = (el, cls, ms) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 500); };

  BQ.register(ID, {
    cover: 'يقلب الطفل البطاقات ويسمع ما وراءها، ثم يسمّي صورة الماء قبل قلبها.',
    render(stage, ctx) {
      const S = K.session(ctx);
      const age = ctx.age();
      const big = age === '10-12';
      const root = h('div.kx-root.k7' + K.ageCls(age));
      stage.append(root);
      const steps = K.steps(root, big ? 3 : 2);
      const beads = { cur: (i) => steps.set(i), set() {} };
      let named = null, replays = 0;

      K.adult(ctx, {
        main: () => '<p>دَعْه يقلب البطاقات بالترتيب الذي يريد؛ بطاقة الماء تقول الكلمة، والأخريان تُسمِعان صوتهما فقط.</p>' +
          '<p>في البطاقة الكبيرة انتظر أن يسمّي الصورة قبل أن يقلبها، ولا تقل الكلمة أنت.</p>' +
          '<p><button type="button" class="bq-btn blue" data-k7="named"' + (named ? ' disabled' : '') + ' style="min-height:44px">' + (named ? 'سُجِّل: سمّاها قبل القلب' : 'سمّاها قبل القلب') + '</button></p>',
        meta: () => '<p><b>هدف العنصر:</b> بطاقات تُقلب: الماء وكلمته، ومصدرا الصوت بصوتيهما. ثم تذكّر: تظهر صورة الماء بلا صوت، فيسمّيها الطفل ثم يقلبها ليتحقّق بنفسه.</p>' +
          '<p><b>العمر ' + K.ageName(age) + ':</b> ' + K.ageText(BQ.meta(ID), age, AGES) + '</p>' +
          '<p>غير مرصود · لا مؤقّت ولا نجوم · يُسجَّل: إتمام النشاط، و' + (named ? 'أنّه سمّى الصورة قبل أن يقلبها' : 'تسمية الصورة قبل القلب (لم تُسجَّل بعد)') + '، وعدد مرّات إعادة الصوت (' + K.AR(replays) + ').</p>',
      });
      const onNamed = (e) => {
        const b = e.target.closest && e.target.closest('[data-k7="named"]'); if (!b || named) return;
        named = true; K.adult(ctx, {});
      };
      document.addEventListener('click', onNamed);
      ctx.onCleanup(() => document.removeEventListener('click', onNamed));
      const logLine = () => K.meta(ctx);
      /* ---------- scr01: اقلب واسمع ---------- */
      async function scr01() {
        beads.cur(0);
        ctx.instruction('هَيّا، أَصْغوا مَعي!', null, { icon: 'ear' });
        ctx.onReplay(() => { replays++; S.play('bariq_L1-01_ins-listen_ar'); });
        const row = h('div.k7-row');
        root.append(row);
        // عرض: يد شبحية تقلب بطاقة شبحية فارغة ثم تعيدها
        const ghost = makeCard({ id: 'ghost', img: 'img-106' });
        ghost.classList.add('k7-ghost'); ghost.tabIndex = -1; ghost.setAttribute('aria-hidden', 'true');
        ghost.querySelector('.k7-b').replaceChildren();
        row.append(ghost);
        const demo = K.ghostTap(S, ctx.frame, ghost, { onTap: () => { ghost.flip(true); S.fx(BQ.sfx.flip, 0.5); }, hold: 700 });
        await S.play('bariq_L1-01_ins-listen_ar');
        await demo;
        ghost.flip(false); await S.sleep(450); ghost.remove();
        const cards = BQ.shuffle(CARDS).map((c) => makeCard(c));
        cards.forEach((el, i) => { el.style.animationDelay = i * 90 + 'ms'; el.classList.add('k7-deal'); row.append(el); });
        let hint = 0, busy = false;
        await new Promise((done) => {
          cards.forEach((el) => el.addEventListener('click', async () => {
            if (busy) return;
            busy = true;
            cards.forEach((c) => c.classList.remove('is-edge', 'is-glow'));
            if (!el.flipped) {
              el.flip(true); S.fx(BQ.sfx.flip, 0.6);
              await S.sleep(420);
              const w = el.querySelector('.k7-w');
              if (w) { w.classList.add('is-on'); }
              await S.play(el.card.sound());
            } else {
              // إعادة صوت بطاقة مكشوفة — وإن بقيت بطاقات لم تُقلب فالتلميح المتدرّج
              replays++;
              await S.play(el.card.sound());
              const rest = cards.filter((c) => !c.flipped);
              if (rest.length) {
                hint++;
                if (hint === 1) rest.forEach((c) => c.classList.add('is-edge'));
                else if (hint === 2) rest.forEach((c) => anim(c, 'is-glow', 1400));
                else { busy = false; rest[0].click(); return; }
              }
            }
            busy = false;
            if (cards.every((c) => c.flipped)) done();
          }));
        });
        ctx.onReplay(() => { replays++; S.seq(cards.map((c) => c.card.sound())); });
        S.fx(BQ.sfx.ok, 0.4);
        beads.set(0, 'on');
        await S.sleep(500);
        const foot = h('div.k7-foot'); root.append(foot);
        await K.nextBtn(foot);
        foot.remove(); row.remove();
      }

      /* ---------- scr02: سمِّ ثم اقلب ---------- */
      async function scr02() {
        beads.cur(1);
        ctx.instruction('هَيّا: ما هَذا؟', null, { icon: 'mouth' });
        const row = h('div.k7-row');
        root.append(row);
        const card = makeCard(CARDS[0], { mode: 'recall', aria: 'اقْلِبِ البِطاقَةَ' });
        card.classList.add('k7-deal');
        row.append(card);
        let flipped = false;
        const flippedP = new Promise((res) => card.addEventListener('click', () => { if (!flipped && ready) { flipped = true; res(); } }));
        let ready = false;
        ctx.onReplay(() => { replays++; S.play('L1-01_d1_s2_03'); });
        await S.sleep(500);
        await S.gate(BQ.ui.bariq(stage, 'L1-01_d1_s2_03'));      // «هَيّا: ما هَذا؟» — ثم يسمّي الطفل (سكتة بلا مؤقّت)
        ready = true;
        card.focus({ preventScroll: true });
        await flippedP;
        card.flip(true); S.fx(BQ.sfx.flip, 0.6);
        await S.sleep(420);
        await S.play(K.pick(WORD, 'L1-01_d2_s5_03'));              // سيف: «ماء.»
        card.classList.add('is-ok'); anim(card, 'is-pop', 320); S.fx(BQ.sfx.ok, 0.45);
        await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_fb-yes_ar')); // بارق: «نَعَمْ! هَذا هُوَ!»
        ctx.onReplay(() => { replays++; S.play(K.pick(WORD, 'L1-01_d2_s5_03')); });
        beads.set(1, 'on');
        if (big) {
          await S.sleep(300);
          const foot = h('div.k7-foot'); root.append(foot);
          await K.nextBtn(foot);
          foot.remove();
        } else await S.sleep(1600);
        row.remove();
      }

      /* ---------- ١٠–١٢: أين الماء؟ (استرجاع موضع) ---------- */
      async function whereTask(review) {
        beads.cur(2);
        ctx.instruction('هَيّا: أَيْنَ الماءُ؟', null, { icon: 'hand' });
        const row = h('div.k7-row');
        root.append(row);
        const cards = CARDS.map((c) => makeCard(c));
        cards.forEach((c) => { c.flip(true); row.append(c); const w = c.querySelector('.k7-w'); if (w) w.classList.add('is-on'); });
        await S.sleep(review ? 500 : 1100);
        cards.forEach((c) => c.flip(false)); S.fx(BQ.sfx.flip, 0.5);
        await S.sleep(500);
        // خلط مرئيّ للمواضع (FLIP)
        const first = cards.map((c) => c.getBoundingClientRect().left);
        const order = BQ.shuffle(cards);
        if (order.every((c, i) => c === cards[i])) order.push(order.shift());
        order.forEach((c) => row.append(c));
        if (!BQ.reduced()) order.forEach((c) => {
          const dx = first[cards.indexOf(c)] - c.getBoundingClientRect().left;
          c.style.transition = 'none'; c.style.transform = `translateX(${dx}px)`;
          requestAnimationFrame(() => requestAnimationFrame(() => { c.style.transition = ''; c.style.transform = ''; }));
        });
        await S.sleep(600);
        ctx.onReplay(() => { replays++; S.play('bariq_L1-01_L2-recall_01_ar'); });
        await S.play('bariq_L1-01_L2-recall_01_ar');
        let tries = 0, busy = false;
        const water = cards[0];
        const res = await new Promise((done) => {
          order.forEach((el) => el.addEventListener('click', async () => {
            if (busy || el.flipped) return;
            busy = true;
            order.forEach((c) => c.classList.remove('is-edge'));
            el.flip(true); S.fx(BQ.sfx.flip, 0.6);
            await S.sleep(420);
            if (el === water) {
              el.querySelector('.k7-w').classList.add('is-on');
              await S.play(el.card.sound());
              el.classList.add('is-ok'); anim(el, 'is-pop', 320); S.fx(BQ.sfx.ok, 0.45);
              await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_d1-FB_05_ar')); // «نَعَمْ! الماءُ في الصَّحْنِ!»
              done(tries === 0); return;
            }
            tries++;
            anim(el, 'is-shake', 480);
            await S.play(el.card.sound());                          // البطاقة المقلوبة خطأً تُسمِع صوتها وتعود
            if (tries === 1) {
              el.flip(false); await S.sleep(420);
              await S.play('bariq_L1-01_d1-EL02_04_ar');             // «هَيّا، أَصْغوا مَرَّةً أُخْرى!»
              order.filter((c) => !c.flipped && c !== el).forEach((c) => c.classList.add('is-edge')); // تلميح ١: حافّة ما لم يُقلب
              busy = false;
            } else {
              // خطأ ثانٍ: البطاقتان تنقلبان معاً للمقابلة
              water.flip(true); water.querySelector('.k7-w').classList.add('is-on'); S.fx(BQ.sfx.flip, 0.6);
              await S.sleep(450);
              el.classList.add('is-dim');
              await S.play('bariq_L1-01_d1-FB_04_ar');               // «أَصْغوا: هَذا، وَهَذا.»
              anim(el, 'is-pop', 320); await S.play(el.card.sound());
              await S.sleep(300);
              anim(water, 'is-pop', 320); await S.play(water.card.sound());
              water.classList.add('is-ok');
              await S.sleep(700);
              done(false);
            }
          }));
        });
        await S.sleep(600);
        row.remove();
        return res;
      }

      (async () => {
        await S.sleep(300);
        await scr01();
        await scr02();
        if (big) {
          const first = await whereTask(false);
          if (!first) await whereTask(true);               // الختام: البند الذي احتاج محاولة ثانية يُعاد مرّةً غير محتسب
          beads.set(2, 'on');
        }
        ctx.instruction(null);
        ctx.done(); logLine();
        BQ.ui.endCard(stage, {
          title: 'أَحْسَنْتَ!',
          note: 'قَلَبْتَ البِطاقاتِ، وَسَمَّيْتَ صورَةَ الماءِ.',
          onReplay: () => BQ.open(ID, { skipCover: true }),
        });
      })();
    },
  });
  }
  if (window.BQ && BQ.kit) init(); else document.addEventListener('bq-kit', init, { once: true });
})();
