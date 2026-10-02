
/* EL04 · مفرداتي (كلماتي) — بطاقة «ماءْ» (غير مرصود)
   التسلسل: بارق «هَيّا: ما هَذا؟» ← سكتة تخمين (بلا مؤقّت: زرّ «أَكْمِلْ») ← سيف vocab-w1 (الكلمة تظهر بعد «ماءْ.» الأولى،
   الميم تضيء مع «مْـ»، الصحن يُبرَز مع الجملة) ← ماجد «قولوا مَعي» ← سيف «ماءْ.» ← سكتة ترديد ٤/٣/٢ ث ← ماجد «الميمُ في الماءِ!».
   ٤–٦: خطوة أخيرة «سمِّها ثمّ اقلبها» (استرجاع المستوى ٢ من «كلمات وصور» — ذلك العنصر يُتخطّى في «التالي» لهذا العمر).
   زرّ «الجملة» يُسمِع مقطع «الماءُ في الصَّحْنِ.» من السطر vocab-w1 نفسه (قصّ بتحليل الصمت) ويُبرز الصحن بإطار متقطّع. */
(function () {
  'use strict';
  function init() {
  const K = BQ.kit, h = BQ.h;
  const ID = 'EL04';
  const SC = '.bq-frame[data-el="EL04"]';
  const W1 = 'bariq_L1-01_vocab-w1_ar';
  const SENT_FALLBACK = 'bariq_L1-01_intro-1_09_ar';
  const WORD = () => K.pick('bariq_L1-01_vocab-w1_01_ar', 'L1-01_d2_s5_03');

  K.style('st-EL04', `
${SC} .v4-spread { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: clamp(18px, 4cqi, 44px); align-items: center; width: 100%; max-width: 860px; }
${SC} .v4-spread { max-width: min(860px, max(320px, calc((var(--play-h, 700px) - 185px) * 1.8))); } /* v0-12: يتّسع بارتفاع الإطار (٧٢٠/٧٦٨) */
${SC} .v4-photo { position: relative; margin: 0; aspect-ratio: 1; border-radius: var(--r-lg); overflow: hidden; background: var(--white); border: 6px solid var(--white); box-shadow: 0 16px 36px var(--shade); animation: v4In .5s cubic-bezier(.2,1.2,.4,1) both; }
${SC} .v4-photo > img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: calc(var(--r-lg) - 6px); }
${SC} .v4-bowl { position: absolute; left: 3%; right: 5%; top: 52%; height: 40%; border-radius: 50%; border: 5px dashed var(--sun); box-shadow: 0 0 0 3px var(--navy), inset 0 0 0 3px var(--navy); opacity: 0; transform: scale(.9); transition: opacity .25s, transform .3s; pointer-events: none; }
${SC} .v4-photo.is-bowl .v4-bowl { opacity: 1; transform: none; }
${SC} .v4-lips, ${SC} .v4-turn { position: absolute; top: 4%; inset-inline-end: 4%; width: 27%; aspect-ratio: 1; border-radius: 50%; border: 5px solid var(--white); box-shadow: 0 8px 18px var(--shade); opacity: 0; transform: scale(.6); transition: opacity .25s, transform .35s cubic-bezier(.2,1.4,.4,1); pointer-events: none; }
${SC} .v4-lips { overflow: hidden; }
${SC} .v4-lips img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.9) translateY(-2%); }
${SC} .v4-photo.is-m .v4-lips { opacity: 1; transform: none; }
${SC} .v4-turn { background: var(--paper); color: var(--coral); display: grid; place-items: center; }
${SC} .v4-turn .bq-ic { width: 62%; height: 62%; }
${SC} .v4-turn.in { opacity: 1; transform: none; animation: v4Say 1s ease-in-out infinite; }
${SC} .v4-page { display: flex; flex-direction: column; align-items: center; gap: clamp(14px, 2.6cqi, 22px); }
${SC} .v4-slot { position: relative; width: 100%; min-height: clamp(120px, 22cqi, 190px); display: grid; place-items: center; border-radius: var(--r-lg); background: var(--paper); border: 2px solid var(--paper-edge); box-shadow: 0 10px 24px var(--shade); transition: box-shadow .25s, border-color .25s; perspective: 900px; }
${SC} .v4-slot > * { grid-area: 1 / 1; }
${SC} .v4-slot::before { content: ""; grid-area: 1 / 1; width: 46%; height: 8px; margin-top: 44%; border-radius: 4px; background: var(--paper-edge); opacity: .7; transition: opacity .3s; }
${SC} .v4-slot.has-word::before { opacity: 0; }
${SC} .v4-slot.is-ok { border-color: var(--ok); box-shadow: 0 0 0 4px var(--ok), 0 10px 24px var(--shade); }
${SC} .v4-word { font: 700 clamp(64px, 13cqi, 116px)/1.35 var(--ff-child); color: var(--ink); padding-bottom: .08em; opacity: 0; transform: translateY(8px); transition: opacity .2s ease-out, transform .2s ease-out; }
${SC} .v4-word.is-on { opacity: 1; transform: none; }
${SC} .v4-word .m { color: inherit; transition: color .2s, text-shadow .2s; }
${SC} .v4-word.is-m .m { color: var(--coral); text-shadow: 0 0 .3em var(--sun-soft); }
${SC} .v4-go { display: grid; place-items: center; z-index: 2; }
${SC} .v4-cover { position: absolute; inset: 0; z-index: 3; border: 0; padding: 0; cursor: pointer; border-radius: calc(var(--r-lg) - 2px); background: linear-gradient(165deg, var(--sky-wash), var(--sky-line)); color: var(--sky-2); display: grid; place-items: center; overflow: hidden; transform-origin: 50% 50%; transition: transform .35s ease-in, opacity .35s; animation: kxIn .35s ease-out both; }
${SC} .v4-cover svg.v4-waves { position: absolute; inset: 0; width: 100%; height: 100%; }
${SC} .v4-cover:focus-visible { outline: 4px solid var(--navy); outline-offset: 4px; }
${SC} .v4-cover-ic { position: relative; width: 64px; height: 64px; border-radius: 50%; background: var(--sun); color: var(--navy); border: 5px solid var(--white); display: grid; place-items: center; box-shadow: 0 4px 0 var(--sun-edge); animation: kxBreath 1.8s ease-in-out infinite; }
${SC} .v4-cover-ic svg { width: 60%; }
${SC} .v4-cover.is-off { transform: rotateY(90deg); opacity: 0; }
${SC} .v4-tools { display: flex; gap: 12px; align-items: center; justify-content: center; min-height: 60px; }
${SC} .v4-sent { width: 76px; min-width: 60px; aspect-ratio: 1; border-radius: 50%; position: relative; cursor: pointer; animation: kxIn .35s ease-out both; }
${SC} .v4-sent:not(.bq-hear) { border: 4px solid var(--white); background: var(--navy); color: var(--white); display: grid; place-items: center; padding: 0; }
${SC} .v4-sent > .bq-ic { width: 50%; height: 50%; }
${SC} .v4-sent-bowl { position: absolute; bottom: -6px; inset-inline-end: -14px; width: 40px; height: 30px; border-radius: 9px; overflow: hidden; border: 2px solid var(--white); box-shadow: 0 3px 8px var(--shade); }
${SC} .v4-sent-bowl img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 72%; transform: scale(1.35); }
${SC} .v4-badge { display: flex; align-items: center; gap: 8px; font: 700 clamp(17px, 2.4cqi, 21px)/1.5 var(--ff-child); color: var(--navy); animation: kxIn .4s ease-out both; }
${SC} .v4-badge button { width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--sky-line); background: var(--white); padding: 0; display: grid; place-items: center; cursor: pointer; box-shadow: 0 3px 0 var(--sky-line); }
${SC} .v4-badge button:hover { border-color: var(--sky); }
${SC} .v4-badge img { width: 70%; }
/* v0-12: حركة محيطة — تموّج الماء في الصحن وقطرات تسقط · علامة «؟» تنتظر التخمين في بطاقة الكلمة */
${SC} .v4-amb { position: absolute; inset: 0; pointer-events: none; overflow: hidden; border-radius: calc(var(--r-lg) - 6px); }
${SC} .v4-rip { position: absolute; left: 50%; top: 66%; width: 46%; height: 11%; margin: -5.5% 0 0 -23%; border-radius: 50%; border: 2px solid color-mix(in srgb, var(--white) 85%, transparent); opacity: 0; animation: v4Rip 2.8s ease-out infinite; }
${SC} .v4-rip.b { animation-delay: 1.4s; }
${SC} .v4-drop { position: absolute; left: 44.5%; top: 34%; width: 1.6%; aspect-ratio: 1 / 1.4; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: color-mix(in srgb, var(--white) 80%, var(--sky-line)); opacity: 0; animation: v4Drop 1.4s ease-in infinite; }
${SC} .v4-drop.b { left: 46.5%; animation-delay: .7s; }
${SC} .v4-shine { position: absolute; inset: 0; background: linear-gradient(115deg, transparent 40%, color-mix(in srgb, var(--white) 35%, transparent) 50%, transparent 60%) 0 0 / 250% 100%; mix-blend-mode: soft-light; animation: v4Shine 5s ease-in-out infinite; }
@keyframes v4Rip { 0% { transform: scale(.25); opacity: 0; } 15% { opacity: .9; } 100% { transform: scale(1.15); opacity: 0; } }
@keyframes v4Drop { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: .9; } 85% { opacity: .8; } 100% { transform: translateY(1250%); opacity: 0; } }
@keyframes v4Shine { 0%, 100% { background-position: 120% 0; } 50% { background-position: -20% 0; } }
${SC} .v4-q { font: 700 clamp(70px, 12cqi, 120px)/1 var(--ff-display); color: var(--sun-edge); opacity: .85; transition: opacity .25s, transform .3s; animation: v4Q 1.6s ease-in-out infinite; }
${SC} .v4-slot.has-word .v4-q, ${SC} .v4-slot.is-guess .v4-q { opacity: 0; transform: scale(.6); animation: none; }
${SC} .v4-slot:has(.v4-go > *) .v4-q { align-self: start; margin-top: 4%; font-size: clamp(54px, 8cqi, 80px); }
${SC} .v4-slot:has(.v4-go > *) .v4-go { align-self: end; margin-bottom: 7%; }
${SC} .v4-slot.has-word:has(.v4-go > *) { min-height: clamp(190px, 32cqi, 250px); }
${SC} .v4-slot.has-word:has(.v4-go > *) .v4-word { align-self: start; margin-top: 4%; }
@keyframes v4Q { 50% { transform: translateY(-6px) rotate(-6deg); } }
@keyframes v4In { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes v4Say { 50% { transform: scale(1.08); } }
@container stage (max-width: 560px) {
  ${SC} .v4-spread { grid-template-columns: 1fr; gap: 14px; justify-items: center; }
  ${SC} .v4-photo { width: min(100%, 62cqi, 270px, max(120px, calc(var(--play-h, 600px) - 340px))); }
  ${SC} .v4-page { width: 100%; }
  @media (max-height: 760px) { ${SC} .v4-photo { width: min(100%, 62cqi, 270px, max(110px, calc(var(--play-h, 600px) - 385px))); } ${SC} .v4-page { gap: 8px; } ${SC} .v4-slot { min-height: 104px; } ${SC} .v4-tools { min-height: 0; } ${SC} .v4-sent { width: 60px; } }
  ${SC} .v4-slot { min-height: 124px; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .v4-photo, ${SC} .v4-turn.in, ${SC} .v4-cover, ${SC} .v4-cover-ic, ${SC} .v4-q { animation: none; }
  ${SC} .v4-amb { display: none; }
  ${SC} .v4-word { transition: opacity .2s; transform: none; }
  ${SC} .v4-cover.is-off { transform: none; }
}
`);

  /* استعمالات البطاقة اللاحقة — تُصفّى بمسار «التالي» لهذا العمر (لـ٤–٦ يُتخطّى «كلمات وصور») */
  const LATER = { EL07: '«كَلِماتٌ وَصُوَرٌ»', EL13: '«تَدَرَّبْ»', EL14: '«الْعَبْ»' };
  const laterIds = () => { const ids = Object.keys(LATER); if (!BQ.path) return ids; const p = BQ.path(); const f = ids.filter((id) => p.some((x) => x.id === id)); return f.length ? f : ids; };
  const WAVES = '<svg class="v4-waves" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    Array.from({ length: 6 }, (_, i) => { const y = 18 + i * 34; return '<path d="M-20 ' + y + ' q 25 -16 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0 t 50 0" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="' + (i % 2 ? 0.5 : 0.9) + '"/>'; }).join('') + '</svg>';
  const AGES = {
    '4-6': 'سكتة الترديد أربع ثوانٍ؛ قل الكلمة مع الطفل. في الختام خطوة «سمِّها ثمّ اقلبها».',
    '7-9': 'سكتة الترديد ثلاث ثوانٍ.',
    '10-12': 'سكتة الترديد ثانيتان، والكلمة المكتوبة تظهر مع الصورة من البداية.',
  };

  BQ.register(ID, {
    cover: 'يرى الطفل صورة الماء ويسمع كلمتها «ماءْ»، ثم يردّدها مع سيف.',
    render(stage, ctx) {
      const S = K.session(ctx);
      const age = ctx.age();
      const pause = age === '4-6' ? 4000 : age === '10-12' ? 2000 : 3000;
      const recall = age === '4-6';
      let replays = 0, namedStep = false;
      /* ---- البناء: صفحتان متقابلتان — الصورة · بطاقة الكلمة ---- */
      const root = h('div.kx-root.v4' + K.ageCls(age));
      const steps = recall ? K.steps(root, 2) : null;
      const pic = h('figure.v4-photo', null,
        h('img', { src: BQ.img('img-001'), alt: 'ماءٌ يُصَبُّ في صَحْنٍ', draggable: 'false' }),
        h('span.v4-amb', { 'aria-hidden': 'true' }, h('span.v4-shine'), h('span.v4-drop'), h('span.v4-drop.b'), h('span.v4-rip'), h('span.v4-rip.b')),
        h('span.v4-bowl', { 'aria-hidden': 'true' }),
        h('span.v4-lips', { 'aria-hidden': 'true' }, h('img', { src: BQ.img('img-101'), alt: '' })));
      const turn = h('span.v4-turn', { 'aria-hidden': 'true' }, BQ.icon('mouth'));
      pic.append(turn);
      const word = h('span.v4-word', { lang: 'ar', 'aria-live': 'polite', html: K.MAA });
      const goLayer = h('div.v4-go');
      const slot = h('div.v4-slot', null, h('span.v4-q', { 'aria-hidden': 'true' }, '؟'), word, goLayer);
      const sentBtn = h('button.bq-hear.v4-sent', { type: 'button', hidden: true, 'aria-label': 'اسْمَعِ الجُمْلَةَ', title: 'الجملة' },
        BQ.icon('ear'), h('span.v4-sent-bowl', { 'aria-hidden': 'true' }, h('img', { src: BQ.img('img-001'), alt: '' })));
      const tools = h('div.v4-tools', null, sentBtn);
      const page = h('div.v4-page', null, slot, tools);
      root.append(h('div.v4-spread', null, pic, page));
      stage.append(root);
      const showWord = () => { word.classList.add('is-on'); slot.classList.add('has-word'); };
      if (age === '10-12') showWord(); // تعرّض من البداية لهذا العمر

      /* ---- مقاطع السطر vocab-w1 (ماءْ. | مْـ… ماءْ. | الماءُ في الصَّحْنِ.) ---- */
      let segs = null, dur = K.estDur(W1), real = false;
      const ready = K.analyze(W1).then((an) => {
        if (an) {
          real = true; dur = an.dur;
          segs = K.splitByGaps(an, 3);
        }
        if (!segs) segs = [[0.05 * dur, 0.16 * dur], [0.3 * dur, 0.58 * dur], [0.7 * dur, 0.98 * dur]];
      });

      const vis = (t) => {
        if (!segs) return;
        if (t >= segs[0][1] - 0.02) showWord();
        const inM = t >= segs[1][0] - 0.05 && t < segs[1][0] + (segs[1][1] - segs[1][0]) * 0.55;
        word.classList.toggle('is-m', inM);
        pic.classList.toggle('is-m', inM);
        pic.classList.toggle('is-bowl', t >= segs[2][0] - 0.05 && t <= segs[2][1] + 0.3);
      };
      const clearVis = () => { word.classList.remove('is-m'); pic.classList.remove('is-m', 'is-bowl'); };

      async function playFull() {
        await ready;
        if (real) await K.playSeg(S, W1, 0, null, { onTime: vis });
        else await K.fakeSeg(S, W1, dur, { onTime: vis });
        clearVis();
        showWord();
      }
      async function playSentence() {
        await ready;
        if (!S.live) return;
        sentBtn.classList.add('is-playing');
        pic.classList.add('is-bowl');
        if (real && segs) await K.playSeg(S, W1, Math.max(0, segs[2][0] - 0.08), segs[2][1] + 0.12, { captionText: 'الماءُ في الصَّحْنِ.' });
        else await S.play(SENT_FALLBACK); // تعذّر القصّ الدقيق ← سطر الجملة نفسها من المقدّمة
        pic.classList.remove('is-bowl');
        sentBtn.classList.remove('is-playing');
      }
      sentBtn.addEventListener('click', () => { replays++; playSentence(); });

      /* ---- دليل المعلّم ---- */
      K.adult(ctx, {
        pin: true,
        main: '<p>بعد سؤال بارق «هَيّا: ما هَذا؟» دَعْ الطفل يخمّن — كلّ جواب مقبول — ثم اضغط «أَكْمِلْ».</p>' +
          '<p>ردّدا الكلمة معاً بعد سيف، وقل «ماءْ» وحدها حين تُريه الصوت الأوّل.</p>' +
          (recall ? '<p>في الخطوة الأخيرة انتظر أن يسمّي الصورة قبل أن يقلب البطاقة، ولا تقل الكلمة أنت.</p>' : ''),
        meta: () => '<p><b>هدف العنصر:</b> بطاقة «ماءْ»: صورة، ثم كلمة مسموعة، ثم الصوت الأوّل ممدوداً، ثم جملة من الموقف، ويردّد الطفل. الكلمة المكتوبة تظهر بعد سماعها (تعرّض لا قراءة).</p>' +
          '<p><b>العمر ' + K.ageName(age) + ':</b> ' + K.ageText(BQ.meta(ID), age, AGES) + '</p>' +
          '<p>الزرّ ذو الفقاعة يعيد جملة «الماءُ في الصَّحْنِ.» ويُحيط الصحن بإطار.</p>' +
          '<p>غير مرصود · لا يُسجَّل صوت الطفل · يُسجَّل: إتمام النشاط، وعدد مرّات إعادة الصوت (' + K.AR(replays) + ')' +
          (recall ? '، وخطوة «سمِّها ثمّ اقلبها» (' + (namedStep ? 'أُنجزت' : 'لم تُنجز بعد') + ')' : '') + '.</p>',
      });

      /* ---- ٤–٦: سمِّها ثمّ اقلبها ---- */
      async function recallStep() {
        steps.set(1);
        sentBtn.hidden = true;
        word.classList.remove('is-m');
        slot.classList.remove('is-ok');
        const cover = h('button.v4-cover', { type: 'button', 'aria-label': 'اقْلِبِ البِطاقَةَ' }, h('span', { html: WAVES, style: { display: 'contents' } }), h('span.v4-cover-ic', { html: K.FLIP_IC }));
        slot.append(cover);
        ctx.instruction('هَيّا: ما هَذا؟', null, { icon: 'mouth' });
        ctx.onReplay(() => { replays++; S.play('L1-01_d1_s2_03'); });
        await S.sleep(500);
        let ready2 = false;
        const flipped = new Promise((res) => cover.addEventListener('click', () => { if (ready2) res(); }));
        await S.gate(BQ.ui.bariq(stage, 'L1-01_d1_s2_03'));          // «هَيّا: ما هَذا؟» — يسمّي الطفل الصورة (سكتة بلا مؤقّت)
        ready2 = true;
        cover.focus({ preventScroll: true });
        await S.gate(flipped);
        cover.classList.add('is-off'); S.fx(BQ.sfx.flip, 0.6);
        await S.sleep(360);
        cover.remove();
        showWord();
        word.classList.add('is-m');
        await S.play(WORD());                                         // سيف: «ماءْ.»
        slot.classList.add('is-ok'); S.fx(BQ.sfx.ok, 0.45);
        await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_fb-yes_ar'));    // بارق: «نَعَمْ! هَذا هُوَ!»
        word.classList.remove('is-m');
        namedStep = true;
        ctx.onReplay(() => { replays++; S.play(WORD()); });
      }

      /* ---- التسلسل ---- */
      ctx.onReplay(null);
      (async () => {
        ctx.instruction('هَيّا: ما هَذا؟', null, { icon: 'ear' });
        ctx.onReplay(() => { replays++; S.play('L1-01_d1_s2_03'); });
        await S.sleep(500);
        await S.gate(BQ.ui.bariq(stage, 'L1-01_d1_s2_03'));          // ١ بارق: «هَيّا: ما هَذا؟»
        await S.gate(K.goBtn(goLayer, 'أَكْمِلْ'));                    // ٢ سكتة تخمين — كل جواب مقبول (بلا مؤقّت)
        ctx.onReplay(null);
        await playFull();                                           // ٣–٤ سيف + ظهور الكلمة
        sentBtn.hidden = false;
        ctx.onReplay(() => { replays++; playFull(); });
        await S.sleep(400);
        ctx.instruction('قولوا مَعي، هَيّا!', null, { icon: 'mouth' });
        await S.play('bariq_L1-01_ins-say_ar');                     // ٥ ماجد: «قولوا مَعي، هَيّا!»
        await S.play(WORD());                                       // ٦ سيف: «ماءْ.»
        turn.classList.add('in');                                   // ٧ سكتة ترديد ٤/٣/٢ ث
        await S.sleep(pause);
        turn.classList.remove('in');
        word.classList.add('is-m');
        ctx.instruction('الميمُ في الماءِ!', null, { icon: 'ear' });
        await S.play('bariq_L1-01_intro-1_16_ar');                  // ٨ ماجد: «الميمُ في الماءِ!»
        word.classList.remove('is-m');
        if (recall) { await S.sleep(600); await recallStep(); }
        // شارة الاستعمال الثاني «سنلعب بها» — النصّ المكتوب مع النصّ المصاحب أو لـ١٠–١٢ فقط
        const go = (id) => () => BQ.open(id, { src: 'menu' });
        const later = laterIds();
        const showTxt = BQ.state.cc || age === '10-12';
        const badge = h('div.v4-badge', null, showTxt ? 'سَنَلْعَبُ بِها!' : null,
          ...later.map((id) => { const m = BQ.meta(id); return h('button', { type: 'button', 'aria-label': m.name, title: m.name, onclick: go(id) }, h('img', { src: m.icon, alt: '' })); }));
        page.append(badge);
        await S.sleep(1800);
        ctx.done();
        K.meta(ctx);
        BQ.ui.endCard(stage, {
          title: 'ماءْ',
          note: 'سَنَلْعَبُ بِالبِطاقَةِ في ' + later.map((id) => LATER[id]).join(' وَ') + '.',
          onReplay: () => BQ.open(ID, { skipCover: true }),
        });
        const t = stage.querySelector('.bq-end-t'); if (t) { t.innerHTML = '<span lang="ar" style="font-family:var(--ff-child)"><span style="color:var(--coral)">م</span>اءْ</span>'; }
      })();
    },
  });
  }
  if (window.BQ && BQ.kit) init(); else document.addEventListener('bq-kit', init, { once: true });
})();
