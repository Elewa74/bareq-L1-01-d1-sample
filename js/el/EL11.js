/* EL11 · اقرأ — غير مرصود (المحاولة الأولى تُسجَّل للمعلّم للتشخيص)
   scr01 (gme-106 r1) الرسم ← الصورة: «م» ظاهرة بلا صوت ← يلمس صورتها من ثلاث.
   scr02 (gme-106 s1–s3) الجملة ← الصورة: جملة مسموعة من الدرس ← يلمس صورتها (المواضع تُخلط كلّ جولة).
   scr03 (gme-106 w1 · ٧–١٢؛ لـ٤–٦ يفتحه المعلّم) أين الميم في «ماء»؟ — يلمس رأس الميم في الكلمة المكتوبة.
   scr04 (gme-115) قراءة مشتركة: سؤال قبل على الصورة ← فقاعتان بنصّ حقيقيّ مشكول، إبراز الكلمة المقروءة، كلّ كلمة زرّ، تكبير ١٠٠–٢٠٠٪ ← سؤال بعد.
         مفتوحة لـ١٠–١٢ · يفتحها المعلّم لـ٧–٩ · مغلقة لـ٤–٦. */
(function () {
  'use strict';
  function init() {
  const K = BQ.kit, h = BQ.h;
  const ID = 'EL11';
  const SC = '.bq-frame[data-el="EL11"]';
  const WORD = () => K.pick('bariq_L1-01_vocab-w1_01_ar', 'L1-01_d2_s5_03');
  const SND_M = () => K.pick('bariq_L1-01_snd-m_ar', 'L1-01_d2_s5_01');
  const OWN = {
    'img-001': () => K.pick('bariq_L1-01_sfx-water-pour-1s', 'bariq_L1-01_sfx-water-pour'),
    'img-007': () => K.pick('bariq_L1-01_sfx-door-knock', 'bariq_L1-01_sfx-door-knock-b'),
    'img-008': () => K.pick('bariq_L1-01_sfx-compass', 'bariq_L1-01_sfx-compass-b'),
    'img-101': SND_M,
  };
  const BRIDGE = () => K.pick('bariq_L1-01_vocab-w1_02_ar', 'bariq_L1-01_vocab-w1_01_ar');   // «مْـ… ماءْ.»
  const AGES = {
    '4-6': 'الحرف والجمل فقط؛ «أين الميم؟» والقراءة المشتركة مغلقتان ويفتحهما المعلّم إن رأى الطفل مستعدّاً.',
    '7-9': 'الحرف والجمل و«أين الميم؟»؛ والقراءة المشتركة يفتحها المعلّم.',
    '10-12': 'كلّ الخطوات، والقراءة المشتركة مفتوحة؛ التكبير والاستماع كلمةً كلمة بيد الطفل. بعد لمس الصورة في الجمل اطلب منه أن يعيد الجملة (ملاحظة اختيارية).',
  };
  const ITEM_NAME = { r1: 'الحرف', s1: 'الجملة ١', s2: 'الجملة ٢', s3: 'الجملة ٣', w1: '«أين الميم؟»', read: 'بعد القراءة المشتركة' };
  const RES_NAME = { first: 'من أوّل مرّة', second: 'بعد إعادة', shown: 'عُرض الجواب' };
  const BUB = [
    { sp: 'MAJ', line: 'bariq_L1-01_d1-EL11_01_ar', words: ['يا', 'بارِقُ،', 'أَيْنَ', 'الماءُ؟'] },
    { sp: 'BRQ', line: 'bariq_L1-01_d1-EL11_02_ar', words: ['هُنا!', 'في', 'الصَّحْنِ!'] },
  ];
  const FACE = {
    MAJ: 'background-image:url(' + BQ.char.MAJ + ');background-size:175% auto;background-position:50% 2.2%',
    BRQ: 'background-image:url(' + BQ.char.BRQ + ');background-size:96% auto;background-position:50% 40%',
  };

  K.style('st-EL11', `
${SC} .k11 { min-height: 420px; }
${SC} .k11-q { display: flex; flex-direction: column; align-items: center; gap: clamp(16px, 3.4cqi, 30px); width: 100%; }
${SC} .k11-glyphcard { position: relative; background: var(--paper); border: 2px solid var(--paper-edge); border-radius: var(--r-lg); width: clamp(120px, 24cqi, 190px); aspect-ratio: 1; display: grid; place-items: center; box-shadow: 0 12px 26px var(--shade); transition: box-shadow .3s; animation: kxIn .4s ease-out both; }
${SC} .k11-glyph { font: 700 clamp(84px, 17cqi, 140px)/1 var(--ff-child); color: var(--navy); margin-top: -.2em; transition: color .25s, text-shadow .25s; }
${SC} .k11-glyphcard { animation: k11Float 3.2s ease-in-out infinite; } /* v0-12: حركة هادئة للحرف وحده على الصفحة */
${SC} .k11-glyphcard::after { content: ""; position: absolute; inset: -6px; border-radius: inherit; border: 3px solid var(--sun-soft); opacity: 0; animation: k11Halo 3.2s ease-in-out infinite; pointer-events: none; }
@keyframes k11Float { 50% { transform: translateY(-5px); } }
@keyframes k11Halo { 0%, 100% { opacity: 0; transform: scale(.97); } 50% { opacity: .9; transform: scale(1.03); } }
@media (prefers-reduced-motion: reduce) { ${SC} .k11-glyphcard, ${SC} .k11-glyphcard::after { animation: none; } }
${SC} .k11-glyphcard.is-hint { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 26px var(--sun); }
${SC} .k11-glyphcard.is-hint .k11-glyph { color: var(--coral); }
${SC} .k11-lips { position: absolute; top: -20px; inset-inline-end: -20px; width: 60px; height: 60px; border-radius: 50%; overflow: hidden; background: var(--white); border: 4px solid var(--white); box-shadow: 0 8px 16px var(--shade); opacity: 0; transform: scale(.5); transition: opacity .25s, transform .3s cubic-bezier(.2,1.4,.4,1); pointer-events: none; z-index: 2; }
${SC} .k11-lips img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
${SC} .k11-glyphcard.is-bridge { box-shadow: 0 0 0 5px var(--sun-soft), 0 12px 26px var(--shade); }
${SC} .k11-glyphcard.is-bridge .k11-glyph { color: var(--coral); }
${SC} .k11-chip { position: absolute; top: 50%; inset-inline-start: calc(100% + 16px); translate: 0 -50%; white-space: nowrap; font: 700 clamp(30px, 5.4cqi, 46px)/1.5 var(--ff-child); color: var(--ink); background: var(--paper); border: 2px solid var(--paper-edge); border-radius: var(--r-md); padding: 0 .4em .1em; box-shadow: 0 8px 18px var(--shade); animation: kxIn .35s ease-out both; }
${SC} .k11-chip .m { color: var(--coral); }
${SC} .k11-lips.in { opacity: 1; transform: none; }
${SC} .k11-listen-row { display: flex; align-items: center; justify-content: center; }
${SC} .k11-wordcard { position: relative; flex: 0 0 auto; display: grid; grid-template-columns: auto auto; align-items: center; gap: clamp(16px, 4cqi, 40px); animation: kxIn .4s ease-out both; }
${SC} .k11-wordcard > img { width: clamp(150px, 34cqi, 300px); aspect-ratio: 1; object-fit: cover; border-radius: var(--r-lg); border: 6px solid var(--white); box-shadow: 0 16px 34px var(--shade); display: block; }
${SC} .k11-word { position: relative; display: inline-block; font: 700 clamp(72px, 15cqi, 136px)/1.3 var(--ff-child); color: var(--ink); background: var(--paper); border: 2px solid var(--paper-edge); border-radius: var(--r-lg); padding: .02em .45em .12em; user-select: none; box-shadow: 0 12px 26px var(--shade); }
${SC} .k11-word .m { transition: color .25s; }
${SC} .k11-word.is-m .m { color: var(--coral); }
${SC} .k11-hit { position: absolute; border: 0; background: transparent; padding: 0; cursor: pointer; border-radius: var(--r-sm); min-width: 44px; min-height: 44px; }
${SC} .kx-a46 .k11-hit { min-width: 60px; min-height: 60px; }
${SC} .kx-a46 .k11-zoom button { width: 60px; height: 60px; }
${SC} .kx-a46 .k11-readme, ${SC} .kx-a46 .k11-w { min-height: 60px; }
${SC} .k11-hit:focus-visible { outline: 4px solid var(--navy); outline-offset: 2px; }
${SC} .k11-hit.is-ok { box-shadow: 0 0 0 4px var(--ok); }
${SC} .k11-tick { position: absolute; top: -16px; inset-inline-end: -16px; width: 36px; height: 36px; border-radius: 50%; background: var(--ok); color: var(--white); border: 3px solid var(--white); display: grid; place-items: center; padding: 6px; }
${SC} .k11-tick svg { width: 100%; }
${SC} .k11-hit.is-glow { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 26px var(--sun); animation: bqPulse .65s ease-in-out 2; }
${SC} .k11-word.fx-shake { animation: bqShake .45s ease; }
/* ---- صفحة القراءة المشتركة: كتاب مفتوح ---- */
${SC} .k11-book { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); width: 100%; max-width: 860px; min-height: clamp(320px, 50cqi, 440px); background: var(--white); border-radius: var(--r-lg); box-shadow: 0 18px 40px var(--shade), 0 3px 0 var(--sky-line); overflow: hidden; animation: kxIn .45s ease-out both; }
${SC} .k11-book::after { content: ""; position: absolute; top: 0; bottom: 0; left: 50%; width: 36px; translate: -50% 0; background: linear-gradient(90deg, transparent, rgba(0, 52, 91, .07), transparent); pointer-events: none; }
${SC} .k11-text { position: relative; padding: clamp(16px, 3cqi, 28px); display: flex; flex-direction: column; gap: 16px; overflow: auto; background: var(--paper); }
${SC} .k11-tools { display: flex; gap: 8px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
${SC} .k11-readme { font: 700 18px/1 var(--ff-display); background: var(--sun); color: var(--navy); border: 0; border-radius: 999px; padding: .6em 1.1em .65em; display: inline-flex; gap: .45em; align-items: center; cursor: pointer; box-shadow: 0 4px 0 var(--sun-edge); min-height: 46px; }
${SC} .k11-readme .bq-ic { width: 1em; height: 1em; }
${SC} .k11-readme.is-playing { background: var(--sun-soft); }
${SC} .k11-zoom { display: inline-flex; gap: 6px; align-items: center; }
${SC} .k11-zoom button { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--paper-edge); background: var(--white); color: var(--navy); font: 700 22px/1 var(--ff-display); cursor: pointer; display: grid; place-items: center; padding: 0; }
${SC} .k11-zoom button:disabled { opacity: .4; cursor: default; }
${SC} .k11-zoom b { font: 600 13px var(--ff-ui); color: var(--muted); min-width: 3.4em; text-align: center; font-variant-numeric: tabular-nums; }
${SC} .k11-bubs { --z: 1; display: flex; flex-direction: column; gap: 18px; }
${SC} .k11-bub { position: relative; display: flex; align-items: flex-start; gap: 12px; opacity: 0; transform: translateY(10px); transition: opacity .35s, transform .35s; }
${SC} .k11-bub.in { opacity: 1; transform: none; }
${SC} .k11-av { flex: 0 0 auto; width: 56px; height: 56px; border-radius: 50%; border: 3px solid var(--white); background-color: var(--sky-wash); background-repeat: no-repeat; box-shadow: 0 4px 10px var(--shade); }
${SC} .k11-say { position: relative; margin: 0; background: var(--white); border: 2px solid var(--paper-edge); border-radius: var(--r-md); padding: 4px 16px 8px; font: 700 calc(clamp(24px, 4.2cqi, 36px) * var(--z)) / 1.75 var(--ff-child); color: var(--ink); display: flex; flex-wrap: wrap; gap: 0 .26em; box-shadow: 0 4px 12px var(--shade); }
${SC} .k11-say::before { content: ""; position: absolute; top: 18px; inset-inline-start: -9px; width: 14px; height: 14px; background: var(--white); border-inline-start: 2px solid var(--paper-edge); border-bottom: 2px solid var(--paper-edge); transform: rotate(45deg); }
${SC} .k11-w { font: inherit; color: inherit; background: transparent; border: 0; padding: 0 .08em; border-radius: .25em; cursor: pointer; line-height: inherit; min-height: 44px; transition: background .12s; }
@media (hover: hover) { ${SC} .k11-w:hover { background: color-mix(in srgb, var(--sun-soft) 45%, transparent); } }
${SC} .k11-w.is-hl { background: var(--sun-soft); text-decoration: underline; text-decoration-thickness: .07em; text-underline-offset: .24em; text-decoration-color: var(--navy); }
${SC} .k11-w.is-glow { background: var(--sun-soft); box-shadow: 0 0 0 3px var(--navy); animation: bqPulse .65s ease-in-out 2; }
${SC} .k11-pic { position: relative; display: grid; place-items: center; background: var(--white); overflow: hidden; padding: clamp(10px, 2cqi, 18px); }
${SC} .k11-fig { position: relative; width: 100%; aspect-ratio: 4 / 3; border-radius: var(--r-md); overflow: hidden; }
${SC} .k11-fig > img { width: 100%; height: 100%; object-fit: cover; display: block; }
${SC} .k11-bowl { position: absolute; left: 36%; top: 69%; width: 43%; height: 28%; border-radius: 50%; border: 0; background: transparent; cursor: pointer; padding: 0; }
${SC} .k11-bowl.is-ok { border: 5px dashed var(--sun); box-shadow: 0 0 0 3px var(--navy), inset 0 0 0 3px var(--navy); }
${SC} .k11-ripple { position: absolute; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%; border: 3px solid var(--navy); pointer-events: none; animation: k11Rip .6s ease-out forwards; }
${SC} .k11-after { position: absolute; inset: 0; display: grid; place-items: center; background: var(--white); animation: kxIn .3s ease-out both; }
${SC} .k11-after .bq-choices { gap: clamp(8px, 1.6cqi, 14px); }
${SC} .k11-after .bq-choice { width: clamp(84px, 13cqi, 124px); }
@keyframes k11Rip { from { transform: scale(.4); opacity: 1; } to { transform: scale(1.4); opacity: 0; } }
@media (max-height: 700px) { ${SC} .k11-gateprev { display: none; } } /* v0-12: هاتف قصير — بطاقة البوّابة بلا معاينة */
@container stage (max-width: 560px) {
  ${SC} .k11-wordcard { grid-template-columns: 1fr; justify-items: center; }
  ${SC} .k11-wordcard > img { width: 58cqi; }
  ${SC} .k11-book { grid-template-columns: 1fr; }
  ${SC} .k11-book::after { display: none; }
  ${SC} .k11-pic { order: -1; }
  ${SC} .k11-after .bq-choice { width: 26cqi; }
  ${SC} .k11-av { width: 44px; height: 44px; }
  ${SC} .k11-say { font-size: calc(24px * var(--z)); }
  ${SC} .k11-chip { font-size: 30px; inset-inline-start: calc(100% + 10px); }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .k11-bub { transition: none; }
  ${SC} .k11-hit.is-glow, ${SC} .k11-w.is-glow, ${SC} .k11-word.fx-shake, ${SC} .k11-book, ${SC} .k11-glyphcard, ${SC} .k11-wordcard, ${SC} .k11-chip { animation: none; }
}
`);

  BQ.register(ID, {
    cover: 'يرى الطفل «م» فيلمس صورتها، ويسمع جملة فيلمس صورتها.',
    render(stage, ctx) {
      const S = K.session(ctx);
      const age = ctx.age();
      const auto = age === '4-6' ? 6000 : 0;
      const log = { items: [], replays: 0, option_order_shown: [], read_along_played: 0, words_tapped: 0 };
      const root = h('div.kx-root.k11' + K.ageCls(age));
      stage.append(root);
      const showW1 = age !== '4-6';
      const steps = K.steps(root, 4 + (showW1 ? 1 : 0) + (age === '10-12' ? 1 : 0));
      const beads = { el: steps.el, cur: (i) => steps.set(i), set() {} };
      const note = (k, res) => { log.items.push({ k, res: res.first ? 'first' : res.shown ? 'shown' : 'second' }); };
      const adult = (html) => K.adult(ctx, {
        main: html,
        meta: () => '<p><b>هدف العنصر:</b> قراءة في المستوى الأوّل: يرى «م» فيلمس صورتها، ويسمع جملة من الدرس فيلمس صورتها، ويجد الميم في «ماءْ»، ثم قراءة مشتركة.</p>' +
          '<p><b>العمر ' + K.ageName(age) + ':</b> ' + K.ageText(BQ.meta(ID), age, AGES) + '</p>' +
          '<p>غير مرصود · لا مؤقّت. ما لوحظ (للمعلّم وحده): ' + (log.items.map((x) => ITEM_NAME[x.k] + ': ' + RES_NAME[x.res]).join(' · ') || 'لم يبدأ بعد') + '</p>' +
          '<p>إعادات الصوت: ' + K.AR(log.replays) + ' · تشغيل القراءة: ' + K.AR(log.read_along_played) + ' · كلمات لُمست: ' + K.AR(log.words_tapped) + '</p>',
      });

      const clear = () => { [...root.children].forEach((c) => { if (c !== beads.el && !c.classList.contains('bq-bariq')) c.remove(); }); };
      const missed = [];

      /* ---------- scr01: الرسم ← الصورة ---------- */
      async function r1(review) {
        clear();
        beads.cur(0);
        adult('<p>أشِر إلى الحرف ولا تقل صوته ولا اسمه، ودَعْه يختار.</p><p>بعد اختياره يُسمَع «مْـ… ماءْ»؛ ردّدها معه إن أراد.</p>');
        ctx.instruction('هَذا الحَرْفُ مَعَ مَنْ؟', null, { icon: 'eye' });
        const lips = h('span.k11-lips', { 'aria-hidden': 'true' }, h('img', { src: BQ.img('img-105-mouth'), alt: '' }));
        const gc = h('div.k11-glyphcard', null, h('span.k11-glyph', { lang: 'ar', 'aria-label': 'حَرْفُ الميمِ' }, 'م'), lips);
        const chip = h('span.k11-chip', { lang: 'ar', 'aria-hidden': 'true', html: K.MAA });
        const bridge = async () => {                                  // الجسر: «مْـ… ماءْ» والميم مرجانيّة على بطاقة «ماءْ» صغيرة
          if (!chip.isConnected) gc.append(chip);
          gc.classList.add('is-bridge');
          await S.play(BRIDGE());
          gc.classList.remove('is-bridge');
        };
        root.append(gc);
        const host = h('div'); root.append(host);
        const prompt = () => S.play('bariq_L1-01_d1-scr05_01_ar');
        ctx.onReplay(() => { log.replays++; prompt(); });
        const res = await K.round(S, host, {
          items: ['img-001', 'img-007', 'img-008'].map((i) => ({ id: i, img: i, sound: OWN[i](), aria: 'صورة' })),
          correct: 'img-001', autoReplayMs: auto, prompt,
          onCorrect: async () => { await bridge(); await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_fb-yes_ar')); },
          onWrong1: async () => {
            await S.play('bariq_L1-01_fb-retry_ar');               // «جَرِّبْ مَرَّةً أُخْرى.»
            gc.classList.add('is-hint'); lips.classList.add('in');   // تلميح ١: يلمع «م» ويُسمَع «مْـ» مع شفتي سيف
            await S.play(SND_M());
            await S.sleep(300);
            gc.classList.remove('is-hint'); lips.classList.remove('in');
          },
          onWrong2: async (item, btn, cbtn) => {
            await S.play('bariq_L1-01_d1-FB_04_ar');                // «أَصْغوا: هَذا، وَهَذا.»
            BQ.ui.pulse(btn); await S.play(item.sound);
            await S.sleep(250);
            BQ.ui.pulse(cbtn); await bridge();                       // يُضاء الصواب ويُسمَع الجسر «مْـ… ماءْ»
          },
          onWrap: (w) => log.option_order_shown.push(w.btns.map((b) => b.dataset.id.slice(4)).join(',')),
        });
        if (!review) { note('r1', res); K.meta(ctx); if (!res.first) missed.push(() => r1(true)); }
        await S.sleep(600);
      }

      /* ---------- scr02: الجملة ← الصورة ---------- */
      const SENT = [
        { r: 's1', stim: 'bariq_L1-01_intro-1_09_ar', opts: ['img-101', 'img-001', 'img-008'], correct: 'img-001' },
        { r: 's2', stim: 'bariq_L1-01_d1-EL03_01_ar', opts: ['img-008', 'img-001', 'img-101'], correct: 'img-101' },
        { r: 's3', stim: 'bariq_L1-01_intro-1_03_ar', opts: ['img-001', 'img-008', 'img-101'], correct: 'img-008' },
      ];
      async function sRound(it, i, review) {
        clear();
        beads.cur(i + 1);
        adult('<p>الجملة تُعاد بلا حدّ بزرّ السمّاعة.</p><p>لا تقرأ الجملة أنت، ولا تُشِر إلى الصورة.</p>' + (age === '10-12' ? '<p>بعد اللمس اطلب منه أن يعيد الجملة.</p>' : ''));
        ctx.instruction('هَيّا: أَيْنَ هَذا؟', null, { icon: 'ear' });
        let playing = false;
        const stim = async (slow) => { playing = true; lb.classList.add('is-playing'); await S.play(it.stim, K.stim(it.stim, slow ? { rate: 0.82 } : null)); lb.classList.remove('is-playing'); playing = false; };
        const lb = BQ.ui.listenBtn(() => { if (!playing) { log.replays++; stim(); } }, 'أَعِدِ الجُمْلَةَ');
        root.append(h('div.k11-listen-row', null, lb));
        const host = h('div'); root.append(host);
        ctx.onReplay(() => { if (!playing) { log.replays++; stim(); } });
        const res = await K.round(S, host, {
          items: it.opts.map((o) => ({ id: o, img: o, sound: OWN[o](), aria: 'صورة' })),
          correct: it.correct, autoReplayMs: auto,
          prompt: async () => { await stim(); await S.play('bariq_L1-01_d1-EL05_03_ar'); },
          onCorrect: async () => { await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_fb-yes_ar')); },
          onWrong1: async () => { await S.play('bariq_L1-01_fb-retry_ar'); await S.sleep(200); await stim(true); },  // تلميح ١: الجملة أبطأ
          onWrong2: async (item, btn, cbtn) => {
            await S.play('bariq_L1-01_d1-FB_04_ar');
            BQ.ui.pulse(btn); await S.play(item.sound);
            await S.sleep(250);
            BQ.ui.pulse(cbtn); await stim();
          },
          onWrap: (w) => log.option_order_shown.push(w.btns.map((b) => b.dataset.id.slice(4)).join(',')),
        });
        if (!review) { note(it.r, res); K.meta(ctx); if (!res.first) missed.push(() => sRound(it, i, true)); }
        await S.sleep(600);
      }

      /* ---------- scr03: أين الميم في «ماء»؟ ---------- */
      async function w1(bead) {
        clear();
        if (bead >= 0) beads.cur(bead);
        adult('<p>هنا تظهر الميم في أوّل الكلمة «مـ». لا تشرح الشكل؛ يكفي أن يجد رأس الميم.</p>');
        ctx.instruction('هَيّا: أَيْنَ الميمُ؟', null, { icon: 'hand' });
        const word = h('span.k11-word', { lang: 'ar', html: K.MAA, 'aria-hidden': 'true' });
        const lips = h('span.k11-lips', { 'aria-hidden': 'true' }, h('img', { src: BQ.img('img-105-mouth'), alt: '' }));
        const wc = h('div.k11-wordcard', null, h('img', { src: BQ.img('img-001'), alt: '', draggable: 'false' }), h('div', { style: { position: 'relative' } }, word, lips));
        root.append(wc);
        await S.sleep(60);
        // مناطق اللمس فوق الكلمة: رأس الميم «مـ» (≥ ٤٤ نقطة) · بقيّة الكلمة
        const tn = word.querySelector('.m').firstChild;
        const rest = word.lastChild;
        const wr = word.getBoundingClientRect();
        const rg = document.createRange(); rg.setStart(tn, 0); rg.setEnd(tn, 1);
        const mr = rg.getBoundingClientRect();
        const rg2 = document.createRange(); rg2.setStart(rest, 0); rg2.setEnd(rest, rest.length);
        const rr = rg2.getBoundingClientRect();
        const box = (r, pad) => ({ left: ((r.left - wr.left) / wr.width * 100 - pad) + '%', top: '0', width: (r.width / wr.width * 100 + pad * 2) + '%', height: '100%' });
        const hitM = h('button.k11-hit', { type: 'button', 'aria-label': 'رَأْسُ الميمِ', style: box(mr, 3) });
        const hitR = h('button.k11-hit', { type: 'button', 'aria-label': 'بَقِيَّةُ الكَلِمَةِ', style: box(rr, 1) });
        word.append(hitR, hitM);
        let tries = 0, lock = true;
        ctx.onReplay(() => { log.replays++; S.seq([WORD(), 200, 'bariq_L1-01_d1-EL03_03_ar']); });
        await S.play(WORD());                                        // سيف: «ماء.»
        await S.play('bariq_L1-01_d1-EL03_03_ar');                   // «هَيّا: أَيْنَ الميمُ؟»
        lock = false;
        const res = await new Promise((done) => {
          const ok = async (shown) => {
            lock = true;
            word.classList.add('is-m'); hitM.classList.remove('is-glow'); hitM.classList.add('is-ok'); hitM.append(h('span.k11-tick', { 'aria-hidden': 'true', html: BQ.icons.check })); S.fx(BQ.sfx.ok, 0.45);
            await S.play(SND_M());                                   // سيف: «مْـ»
            if (!shown) await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_fb-yes_ar'));
            done({ first: tries === 0, shown });
          };
          hitM.addEventListener('click', () => { if (!lock) ok(false); });
          hitR.addEventListener('click', async () => {
            if (lock) return; lock = true; tries++;
            word.classList.remove('fx-shake'); void word.offsetWidth; word.classList.add('fx-shake');
            if (tries === 1) {
              await S.play('bariq_L1-01_fb-retry_ar');
              lips.classList.add('in'); await S.play(SND_M()); lips.classList.remove('in');   // تلميح ١: «مْـ» وشفتا سيف
              lock = false;
            } else {
              await S.play('bariq_L1-01_d1-FB_04_ar');
              hitM.classList.add('is-glow');
              await S.sleep(500);
              ok(true);
            }
          });
        });
        note('w1', res); K.meta(ctx);
        await S.sleep(700);
      }

      /* ---------- scr04: القراءة المشتركة (gme-115) ---------- */
      async function shared() {
        clear();
        if (age !== '10-12') steps.grow(steps.n + 1);
        steps.set(steps.n - 1);
        adult('<p>اقرأ معه: حرّك إصبعه تحت الكلمة المبرَزة، ولا تطلب منه القراءة وحده.</p><p>كلّ كلمة زرّ يُسمِعها، وزرّا − و+ للتكبير.</p><p>في النهاية يلمس الصورة التي تقولها الفقاعة الثانية.</p>');
        ctx.instruction('هَيّا: أَيْنَ الماءُ؟', null, { icon: 'hand' });
        const fig = h('div.k11-fig', null, h('img', { src: BQ.img('img-123'), alt: 'ماجِدٌ يَسْأَلُ، وَبارِقٌ فَوْقَ الصَّحْنِ', draggable: 'false' }));
        const bowl = h('button.k11-bowl', { type: 'button', 'aria-label': 'الصَّحْنُ' });
        fig.append(bowl);
        const picPage = h('div.k11-pic', null, fig);
        const readBtn = h('button.k11-readme', { type: 'button', hidden: true }, BQ.icon('play'), 'اقْرَأْ لي');
        let z = 1;
        const zl = h('b', null, K.AR(100) + '٪');
        const zm = h('button', { type: 'button', 'aria-label': 'تصغير', disabled: true }, '−');
        const zp = h('button', { type: 'button', 'aria-label': 'تكبير' }, '+');
        const bubs = h('div.k11-bubs');
        const setZ = (v) => { z = Math.max(1, Math.min(2, v)); bubs.style.setProperty('--z', z); zl.textContent = K.AR(Math.round(z * 100)) + '٪'; zm.disabled = z <= 1; zp.disabled = z >= 2; };
        zm.addEventListener('click', () => setZ(z - 0.25)); zp.addEventListener('click', () => setZ(z + 0.25));
        const tools = h('div.k11-tools', { hidden: true }, readBtn, h('span.k11-zoom', null, zm, zl, zp));
        const textPage = h('div.k11-text', null, tools, bubs);
        const book = h('div.k11-book', null, textPage, picPage);
        root.append(book);
        /* ---- قبل القراءة: الصورة وحدها ---- */
        ctx.onReplay(() => { log.replays++; S.play('bariq_L1-01_L2-recall_01_ar'); });
        await S.play('bariq_L1-01_L2-recall_01_ar');                 // «هَيّا: أَيْنَ الماءُ؟»
        await new Promise((res) => {
          let miss = 0;
          const hit = () => { bowl.classList.add('is-ok'); S.fx(BQ.sfx.ok, 0.4); fig.removeEventListener('click', other); res(); };
          const other = (e) => {
            if (e.target === bowl) return;
            const r = fig.getBoundingClientRect();
            const rp = h('span.k11-ripple', { style: { left: (e.clientX - r.left) + 'px', top: (e.clientY - r.top) + 'px' } });
            fig.append(rp); setTimeout(() => rp.remove(), 700);
            if (++miss >= 2) hit();
          };
          bowl.addEventListener('click', hit, { once: true });
          fig.addEventListener('click', other);
        });
        await S.sleep(900);
        bowl.classList.remove('is-ok');
        /* ---- القراءة الصوتية بإبراز الكلمة ---- */
        ctx.instruction(null);
        tools.hidden = false;
        const bubEls = BUB.map((b) => {
          const words = b.words.map((w, i) => {
            const btn = h('button.k11-w', { type: 'button', lang: 'ar' }, w);
            btn.addEventListener('click', () => { log.words_tapped++; K.meta(ctx); sayWord(b, i); });
            return btn;
          });
          const el = h('div.k11-bub', null, h('span.k11-av', { style: FACE[b.sp], 'aria-hidden': 'true' }), h('p.k11-say', { lang: 'ar', style: 'margin:0' }, ...words));
          el.words = words; b.el = el;
          bubs.append(el);
          return el;
        });
        const timing = {};
        await Promise.all(BUB.map(async (b) => { const an = await K.analyze(b.line); timing[b.line] = { real: !!an, dur: an ? an.dur : K.estDur(b.line), t: K.wordTimes(an, b.words, K.estDur(b.line)) }; }));
        const hl = (b, i) => b.el.words.forEach((w, k) => w.classList.toggle('is-hl', k === i));
        async function readBubble(b, opt) {
          opt = opt || {};
          const T = timing[b.line];
          const onTime = (t) => { hl(b, T.t.findIndex((s) => t >= s[0] - 0.05 && t < s[1] + 0.02)); };
          if (T.real) await K.playSeg(S, b.line, 0, null, { onTime, rate: opt.rate, caption: false });
          else await K.fakeSeg(S, b.line, T.dur, { onTime, rate: opt.rate, caption: false });
          hl(b, opt.keepLast ? b.words.length - 1 : -1);
        }
        async function sayWord(b, i) {
          const T = timing[b.line]; const [s, e] = T.t[i];
          hl(b, i);
          if (T.real) await K.playSeg(S, b.line, Math.max(0, s - 0.04), e + 0.06, { caption: false });
          else await S.sleep(600);
          hl(b, -1);
        }
        let reading = false;
        async function readAll() {
          if (reading) return; reading = true; log.read_along_played++; K.meta(ctx);
          readBtn.classList.add('is-playing');
          for (const b of BUB) { b.el.classList.add('in'); await readBubble(b); await S.sleep(350); }
          readBtn.classList.remove('is-playing'); reading = false;
        }
        readBtn.addEventListener('click', () => { readAll(); });
        ctx.onReplay(() => { log.replays++; readAll(); });
        readBtn.hidden = false;
        await readAll();                                             // أوّل قراءة تلقائية
        bubEls.forEach((e) => e.classList.add('in'));
        // وقت حرّ للّمس كلمةً كلمة، ثم السؤال بعد القراءة
        const go = h('div', { style: { display: 'grid', placeItems: 'center' } }); textPage.append(go);
        await K.goBtn(go, 'أَكْمِلْ');
        go.remove();
        /* ---- بعد القراءة: هَيّا: أَيْنَ هَذا؟ ---- */
        ctx.instruction('هَيّا: أَيْنَ هَذا؟', null, { icon: 'hand' });
        const after = h('div.k11-after'); picPage.append(after);
        const b2 = BUB[1];
        ctx.onReplay(() => { log.replays++; S.play('bariq_L1-01_d1-EL05_03_ar'); });
        const res = await K.round(S, after, {
          items: ['img-001', 'img-007', 'img-008'].map((i) => ({ id: i, img: i, sound: OWN[i](), aria: 'صورة' })),
          correct: 'img-001',
          prompt: () => S.play('bariq_L1-01_d1-EL05_03_ar'),
          onCorrect: async () => { await readBubble(b2); await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_d1-FB_05_ar')); },
          onWrong1: async () => { await S.play('bariq_L1-01_fb-retry_ar'); await readBubble(b2, { rate: 0.8, keepLast: true }); },  // تلميح ١: الفقاعة الثانية أبطأ مع إبراز الكلمة الأخيرة
          onWrong2: async (item, btn, cbtn) => {
            await S.play('bariq_L1-01_d1-FB_04_ar');
            await readBubble(b2);
            const last = b2.el.words[b2.words.length - 1];
            last.classList.add('is-glow'); await S.sleep(1300); last.classList.remove('is-glow');   // تلمع «الصَّحْنِ» ثم الصورة
            BQ.ui.pulse(cbtn);
          },
        });
        b2.el.words.forEach((w) => w.classList.remove('is-hl'));
        note('read', res); K.meta(ctx);
        await S.sleep(600);
      }

      (async () => {
        await S.sleep(300);
        await r1(false);
        ctx.instruction('هَيّا، أَصْغوا مَعي!', null, { icon: 'ear' });
        await S.play('bariq_L1-01_ins-listen_ar');
        for (let i = 0; i < SENT.length; i++) await sRound(SENT[i], i, false);
        // scr03: ٧–١٢؛ لـ٤–٦ مغلق افتراضياً ويفتحه المعلّم
        if (showW1) await w1(4);
        else {
          clear(); ctx.instruction(null);
          adult('<p>«أين الميم في «ماءْ»؟» مغلقة لهذا العمر. افتحها إن رأيت الطفل مستعدّاً، أو تخطَّها.</p>');
          const g = await S.gate(K.adultGate(S, root, { title: '«أين الميم في «ماءْ»؟» مغلقة لعمر ' + K.ageName('4-6') + ' سنوات. يفتحها المعلّم إن رأى الطفل مستعدّاً.', label: 'لِلْمُعَلِّمِ: اضْغَطْ مُطَوَّلاً لِلْفَتْحِ' }));
          if (g === 'open') { steps.grow(steps.n + 1); await w1(steps.n - 1); }
        }
        // الختام: البنود التي احتاجت محاولة ثانية وحدها، مرّةً، غير محتسبة
        for (const f of BQ.shuffle(missed)) await f();
        // scr04: مفتوحة لـ١٠–١٢ · يفتحها المعلّم لـ٧–٩ · مغلقة افتراضياً لـ٤–٦ (يفتحها المعلّم)
        let open = age === '10-12';
        if (!open) {
          clear(); ctx.instruction(null);
          adult('<p>صفحة القراءة المشتركة ' + (age === '4-6' ? 'مغلقة لهذا العمر' : 'يفتحها المعلّم') + '. افتحها لتقرأ مع الطفل، أو تخطَّها.</p>');
          const prev = h('img.k11-gateprev', { src: BQ.img('img-123'), alt: '', style: { width: 'min(260px, 60cqi, max(96px, calc(var(--play-h, 600px) - 360px)))', borderRadius: 'var(--r-md)', filter: 'saturate(.7)', opacity: '.9' } });
          const title = age === '4-6'
            ? 'صفحة القراءة المشتركة مغلقة لعمر ' + K.ageName('4-6') + ' سنوات. يفتحها المعلّم إن أراد أن يقرأ مع الطفل.'
            : 'صفحة القراءة المشتركة: يفتحها المعلّم لعمر ' + K.ageName('7-9') + ' سنوات ليقرأ مع الطفل.';
          open = (await S.gate(K.adultGate(S, root, { preview: prev, title, label: 'لِلْمُعَلِّمِ: اضْغَطْ مُطَوَّلاً لِلْفَتْحِ' }))) === 'open';
        }
        if (open) await shared();
        clear();
        ctx.instruction(null);
        ctx.done();
        adult('<p>اكتمل العنصر. ما لوحظ في «ملاحظات المراجِع».</p>');
        BQ.ui.endCard(stage, {
          title: 'أَحْسَنْتَ!',
          note: open ? 'رَأَيْتَ «م»، وَسَمِعْتَ الجُمَلَ، وَقَرَأْنا مَعاً.' : 'رَأَيْتَ «م»، وَسَمِعْتَ الجُمَلَ، وَلَمَسْتَ صُوَرَها.',
          onReplay: () => BQ.open(ID, { skipCover: true }),
        });
      })();
    },
  });
  }
  if (window.BQ && BQ.kit) init(); else document.addEventListener('bq-kit', init, { once: true });
})();
