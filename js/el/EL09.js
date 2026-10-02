/* EL09 · استمع وتعلّم — غير مرصود
   scr00 (gme-114) مسموع جديد «لعبة الأصوات»: قبل (صورة الموقف + الصور الثلاث ٥ ث، توقّع حرّ) · أثناء (صوت فقط: موجة بلا صورة مصدر،
         ووقفة «مَنْ هُناكَ؟» يلمس فيها إطار شخصية) · بعد (يرتّب الصور الثلاث في خانات ● ●● ●●● سحباً أو لمساً متتابعاً).
   scr01 (gme-102) «سَمِعْتُ فَرْقاً!»: ست جولات (٨ لـ١٠–١٢) صوتان ← زرّا بارق: يصفّق «صَوْتٌ واحِدٌ» · يقفز «سَمِعْتُ فَرْقاً!» (v0-12 r3، بعد عرض بارق مرّة) ← صورتا المصدرين دليلاً. */
(function () {
  'use strict';
  function init() {
  const K = BQ.kit, h = BQ.h;
  const ID = 'EL09';
  const SC = '.bq-frame[data-el="EL09"]';

  K.style('st-EL09', `
${SC} .k9 { min-height: 420px; }
${SC} .k9-scene { position: relative; width: min(100%, 640px); aspect-ratio: 16 / 9; border-radius: var(--r-lg); overflow: hidden; border: 6px solid var(--white); box-shadow: 0 16px 36px var(--shade); background: var(--sky-wash); flex: 0 0 auto; animation: kxIn .45s ease-out both; }
${SC} .k9-scene { max-width: max(280px, calc((var(--play-h, 700px) - 300px) * 16 / 9)); } /* v0-12: لا تخرج صور التوقّع عن الإطار */
${SC} .k9-scene > img { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity .6s, filter .6s; }
${SC} .k9-scene.is-listen > img { opacity: 0; filter: blur(8px); }
${SC} .k9-predict { display: flex; justify-content: center; gap: clamp(10px, 2.6cqi, 22px); }
${SC} .k9-predict .bq-choices .bq-choice { width: clamp(84px, 17cqi, 140px); animation: kxIn .4s ease-out both; }
${SC} .k9-wave { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; transition: opacity .6s; background: radial-gradient(90% 85% at 50% 45%, var(--white), var(--sky-wash)); }
${SC} .k9-scene.is-listen .k9-wave { opacity: 1; }
${SC} .k9-wave svg { width: 100%; height: 52%; overflow: visible; }
${SC} .k9-wave path { fill: none; stroke-linecap: round; }
${SC} .k9-wave .w1 { stroke: var(--navy); stroke-width: 5; }
${SC} .k9-wave .w2 { stroke: var(--sky); stroke-width: 3.5; opacity: .85; }
${SC} .k9-wave .w3 { stroke: var(--sky-line); stroke-width: 2.5; }
${SC} .k9-av { position: absolute; bottom: 6%; width: 17%; aspect-ratio: 1; border-radius: 50%; border: 4px solid var(--white); background-color: var(--white); background-repeat: no-repeat; box-shadow: 0 6px 14px var(--shade); opacity: .6; filter: grayscale(.35); transition: opacity .3s, transform .3s cubic-bezier(.2,1.4,.4,1), border-color .3s, filter .3s; }
${SC} .k9-av.is-talk { opacity: 1; filter: none; transform: scale(1.08); box-shadow: 0 0 0 4px var(--sun), 0 6px 14px var(--shade); }
${SC} .k9-av.is-hide { opacity: 0; transform: scale(.4); }
${SC} .k9-av.maj { inset-inline-start: 5%; }
${SC} .k9-av.brq { inset-inline-end: 5%; }
${SC} .k9-av.say { inset-inline-end: 25%; }
${SC} .k9-scene.is-pause .k9-wave svg { opacity: .22; }
${SC} .k9-who { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: clamp(10px, 3cqi, 28px); padding-bottom: 12%; }
${SC} .k9-wb { width: clamp(76px, 17cqi, 132px); aspect-ratio: 1; border-radius: 50%; border: 5px solid var(--white); background-color: var(--white); background-repeat: no-repeat; cursor: pointer; padding: 0; box-shadow: 0 6px 0 var(--sky-line), 0 10px 22px var(--shade); animation: kxIn .4s ease-out both; transition: transform .2s; }
@media (hover: hover) { ${SC} .k9-wb:hover { transform: translateY(-4px); } }
${SC} .k9-wb.is-picked { border-color: var(--navy); box-shadow: 0 0 0 4px var(--navy), 0 10px 22px var(--shade); }
${SC} .k9-hint { position: absolute; bottom: 5%; left: 50%; translate: -50% 0; }
${SC} .k9-order { position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; gap: clamp(18px, 3.4cqi, 30px); }
${SC} .k9-order > .bq-listen, ${SC} .k9-order > .bq-hear { width: 72px; border-width: 4px; }
${SC} .k9-slots, ${SC} .k9-tray { display: flex; gap: clamp(10px, 3cqi, 28px); justify-content: center; position: relative; }
${SC} .k9-slots { padding-top: 26px; }
${SC} .k9-slot { position: relative; width: clamp(88px, 22cqi, 170px); aspect-ratio: 1; border-radius: var(--r-md); border: 3px dashed var(--sky-2); background: var(--white); display: grid; place-items: center; }
${SC} .k9-slot.is-over { background: var(--paper); border-color: var(--sun); }
${SC} .k9-dots { position: absolute; top: -12px; inset-inline: 0; margin: auto; width: max-content; translate: 0 -100%; display: flex; gap: 5px; padding: 6px 10px; border-radius: 999px; background: var(--navy); }
${SC} .k9-dots i { width: 10px; height: 10px; border-radius: 50%; background: var(--sun-soft); }
${SC} .k9-tray { min-height: clamp(88px, 22cqi, 170px); padding: 12px 16px; border-radius: var(--r-lg); background: color-mix(in srgb, var(--white) 55%, transparent); }
${SC} .k9-tray:empty { background: transparent; }
${SC} .k9-oc { position: relative; width: clamp(88px, 22cqi, 170px); aspect-ratio: 1; border-radius: 22px; border: 4px solid var(--white); padding: 0; overflow: hidden; background: var(--white); cursor: grab; box-shadow: 0 5px 0 var(--sky-line), 0 10px 22px var(--shade); touch-action: none; transition: box-shadow .2s; }
${SC} .k9-oc img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
${SC} .k9-slot > .k9-oc { width: 100%; box-shadow: 0 6px 16px var(--shade); }
${SC} .k9-slot, ${SC} .k9-tray .k9-oc { max-width: max(76px, calc((var(--play-h, 700px) - 370px) / 2)); } /* v0-12: الخانات والصور بارتفاع الإطار */
@media (max-height: 760px) { ${SC} .k9-order { gap: 12px; } ${SC} .k9-order > .bq-listen, ${SC} .k9-order > .bq-hear { width: 60px; } ${SC} .k9-slots { padding-top: 22px; } }
${SC} .k9-oc.is-drag { cursor: grabbing; z-index: 9; position: relative; box-shadow: 0 18px 30px rgba(0, 52, 91, .28); }
${SC} .k9-oc.is-glow { box-shadow: 0 0 0 5px var(--sun-soft), 0 0 26px var(--sun); }
${SC} .k9-oc.is-ok { border-color: var(--ok); box-shadow: 0 0 0 4px var(--ok), 0 6px 16px var(--shade); }
${SC} .k9-oc.is-pop { animation: bqPop .3s ease-out; }
${SC} .k9-line { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; } /* v0-12: عرض صريح — بدونه يأخذ SVG عرضه الافتراضيّ ٣٠٠ ويُزاح يميناً في RTL */
${SC} .k9-line path { fill: none; stroke: var(--sun); stroke-width: 6; stroke-dasharray: 3 14; stroke-linecap: round; }
${SC} .k9-sd { display: flex; flex-direction: column; align-items: center; gap: clamp(16px, 3cqi, 28px); width: 100%; }
${SC} .k9-pair { display: flex; align-items: center; gap: clamp(18px, 5cqi, 48px); }
${SC} .k9-ring { width: clamp(64px, 12cqi, 104px); aspect-ratio: 1; border-radius: 22px; border: 4px solid var(--white); background: var(--white); display: grid; place-items: center; color: var(--sky-2); position: relative; overflow: hidden; box-shadow: 0 6px 16px var(--shade); transition: transform .4s cubic-bezier(.3,1.2,.5,1), border-color .25s; } /* v0-12 r3: بطاقة صوت (سمّاعة) لا دائرة متقطّعة */
${SC} .k9-ring.is-on { border-style: solid; border-color: var(--sun); background: var(--paper); animation: k9Ping .6s ease-out infinite; }
${SC} .k9-ring svg { width: 54%; height: 54%; opacity: .7; transition: opacity .25s, transform .3s; }
${SC} .k9-ring.is-on svg { opacity: 1; transform: scale(1.12); color: var(--navy); }
${SC} .k9-ring img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s; }
${SC} .k9-ring.is-src img { opacity: 1; }
${SC} .k9-pair.is-near .k9-ring:first-child { transform: translateX(-3cqi); }
${SC} .k9-pair.is-near .k9-ring:last-child { transform: translateX(3cqi); }
${SC} .k9-pair.is-far .k9-ring:first-child { transform: translateX(3cqi); }
${SC} .k9-pair.is-far .k9-ring:last-child { transform: translateX(-3cqi); }
${SC} .k9-sd .bq-choices.icons .bq-choice { width: clamp(130px, 28cqi, 230px); aspect-ratio: 4 / 3; }
${SC} .k9-sd .bq-choice .bq-ic.big { width: 78%; height: 62%; }
${SC} .k9-sd.age46 .bq-choices.icons .bq-choice { min-width: 140px; }
${SC} .k9-foot { display: grid; place-items: center; min-height: 54px; }
@keyframes k9Ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--sun) 60%, transparent); } 100% { box-shadow: 0 0 0 18px transparent; } }
@container stage (max-width: 560px) {
  ${SC} .k9-av { width: 20%; }
  ${SC} .k9-tray { padding: 8px; }
  ${SC} .k9-slot, ${SC} .k9-oc { width: 27cqi; }
  ${SC} .k9-tray { min-height: 27cqi; }
  ${SC} .k9-sd .bq-choices.icons .bq-choice { width: 40cqi; min-width: 0; }
}
@media (prefers-reduced-motion: reduce) {
  ${SC} .k9-ring.is-on { animation: none; }
  ${SC} .k9-ring, ${SC} .k9-av { transition: none; }
  ${SC} .k9-oc.is-pop, ${SC} .k9-scene, ${SC} .k9-predict .bq-choice { animation: none; }
}
`);

  /* ---- أصوات المصادر وأشكال حلقاتها ---- */
  const SHAPE = {
    star: '<svg viewBox="0 0 48 48"><path d="M24 6l5 11.5 12.5 1.2-9.4 8.3 2.8 12.3L24 33l-10.9 6.3 2.8-12.3-9.4-8.3L19 17.5z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/></svg>',
    wave: '<svg viewBox="0 0 48 48"><path d="M4 24c5-9 9-9 13 0s8 9 13 0 9-9 14 0" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>',
    circle: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="5"/></svg>',
    square: '<svg viewBox="0 0 48 48"><rect x="9" y="9" width="30" height="30" rx="2" fill="none" stroke="currentColor" stroke-width="5"/></svg>',
    tri: '<svg viewBox="0 0 48 48"><path d="M24 7 42 39H6z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg>',
    diamond: '<svg viewBox="0 0 48 48"><path d="M24 5 43 24 24 43 5 24z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg>',
  };
  const SRC = {
    'bariq_L1-01_snd-m_ar': ['circle', 'img-101'], 'L1-01_d2_s5_01': ['circle', 'img-101'],
    'bariq_L1-01_vocab-w1_02_ar': ['star', 'img-101'],
    'bariq_L1-01_vocab-w1_01_ar': ['diamond', 'img-102'], 'L1-01_d2_s5_03': ['diamond', 'img-102'],
    'bariq_L1-01_sfx-door-knock': ['square', 'img-007'], 'bariq_L1-01_sfx-door-knock-b': ['square', 'img-007'],
    'bariq_L1-01_sfx-water-pour-1s': ['wave', 'img-001'], 'bariq_L1-01_sfx-water-pour': ['wave', 'img-001'],
    'bariq_L1-01_sfx-compass': ['tri', 'img-008'], 'bariq_L1-01_sfx-compass-b': ['tri', 'img-008'],
  };
  const FACE = {
    MAJ: { bg: 'url(' + BQ.char.MAJ + ')', size: '175% auto', pos: '50% 2.2%' },
    SAY: { bg: 'url(' + BQ.char.SAY + ')', size: '175% auto', pos: '50% 1.2%' },
    BRQ: { bg: 'url(' + BQ.char.BRQ + ')', size: '96% auto', pos: '50% 40%' },
  };
  const faceStyle = (c) => ({ backgroundImage: FACE[c].bg, backgroundSize: FACE[c].size, backgroundPosition: FACE[c].pos });
  const NAME = { MAJ: 'ماجِدٌ', SAY: 'سَيْفٌ', BRQ: 'بارِقٌ' };

  /* بنود gme-114 */
  const ORDER = [
    { id: 'water', img: 'img-001', sound: () => K.pick('bariq_L1-01_sfx-water-pour-1s', 'bariq_L1-01_sfx-water-pour') },
    { id: 'knock', img: 'img-007', sound: () => K.pick('bariq_L1-01_sfx-door-knock-b', 'bariq_L1-01_sfx-door-knock') },
    { id: 'compass', img: 'img-008', sound: () => K.pick('bariq_L1-01_sfx-compass-b', 'bariq_L1-01_sfx-compass') },
  ];
  const PASS_A = ['bariq_L1-01_ins-listen_ar', 'bariq_L1-01_sfx-water-pour', 'bariq_L1-01_d1-EL09_01_ar', 'bariq_L1-01_d1-EL09_02_ar', 'bariq_L1-01_d1-EL09_03_ar', 'bariq_L1-01_sfx-door-knock-b', 'bariq_L1-01_sfx-compass-b', 'bariq_L1-01_d1-EL09_04_ar'];
  const PASS_B = ['bariq_L1-01_d1-EL09_05_ar', 'bariq_L1-01_d1-EL09_06_ar', 'bariq_L1-01_sfx-needle'];

  /* بنود gme-102 — «مختلفان» ليست دائماً صوتاً وضجّة: كلام/كلام («مْـ» · «ماءْ») وضجّة/ضجّة (طرق · بوصلة)،
     فلا تكفي قاعدة «صوتان من نوع واحد = متماثلان» (مراجعة التربية P0-2). المواضع تُخلط كلّ مرّة. */
  const P = {
    mm: { a: 'bariq_L1-01_snd-m_ar', b: 'L1-01_d2_s5_01', key: 'same' },                          // كلام/كلام — متماثلان
    ww: { a: 'bariq_L1-01_vocab-w1_01_ar', b: 'L1-01_d2_s5_03', key: 'same' },                    // كلام/كلام — متماثلان
    kk: { a: 'bariq_L1-01_sfx-door-knock', b: 'bariq_L1-01_sfx-door-knock-b', key: 'same' },       // ضجّة/ضجّة — متماثلان
    cc: { a: 'bariq_L1-01_sfx-compass', b: 'bariq_L1-01_sfx-compass-b', key: 'same' },             // ضجّة/ضجّة — متماثلان
    mw: { a: 'bariq_L1-01_snd-m_ar', b: 'bariq_L1-01_vocab-w1_01_ar', key: 'diff' },               // كلام/كلام — مختلفان «مْـ» · «ماءْ»
    bw: { a: 'bariq_L1-01_vocab-w1_02_ar', b: 'bariq_L1-01_vocab-w1_01_ar', key: 'diff' },         // كلام/كلام — «مْـ… ماءْ» · «ماءْ»
    kc: { a: 'bariq_L1-01_sfx-door-knock-b', b: 'bariq_L1-01_sfx-compass', key: 'diff' },          // ضجّة/ضجّة — مختلفان
    cm: { a: 'bariq_L1-01_sfx-compass', b: 'bariq_L1-01_snd-m_ar', key: 'diff' },                  // ضجّة/كلام — مختلفان
  };
  const PAIRS_BY_AGE = {
    '4-6': [P.mm, P.ww, P.kk, P.mw, P.kc, P.cm],
    '7-9': [P.mm, P.ww, P.kk, P.mw, P.kc, P.bw],
    '10-12': [P.mm, P.ww, P.kk, P.cc, P.mw, P.kc, P.bw, P.cm],
  };
  const SRC_NAME = { water: 'الماء', knock: 'الطرق', compass: 'البوصلة' };
  const WHO_NAME = { MAJ: 'ماجد', BRQ: 'بارق', SAY: 'سيف' };
  /** خلط لا تتوالى فيه ثلاث جولات من نوع واحد */
  function mixRounds(list) {
    for (let k = 0; k < 200; k++) {
      const o = BQ.shuffle(list);
      if (!o.some((r, i) => i >= 2 && r.key === o[i - 1].key && r.key === o[i - 2].key)) return o;
    }
    return list.slice();
  }

  BQ.register(ID, {
    cover: 'يسمع الطفل «لعبة الأصوات» ويرتّب ما سمع، ثم يميّز: صوت واحد أم صوتان؟',
    render(stage, ctx) {
      const S = K.session(ctx);
      const age = ctx.age();
      const gap = age === '4-6' ? 1200 : 800;
      const log = { prediction: null, inference_choice: null, order_first_attempt: null, replays: 0, rounds: [] };
      const root = h('div.kx-root.k9' + K.ageCls(age));
      stage.append(root);
      const steps = K.steps(root, 4);

      const AGES = {
        '4-6': 'الصوتان في كلّ جولة أبطأ قليلاً، والأيقونتان أكبر.',
        '7-9': 'النسخة الأساسية: ست جولات.',
        '10-12': 'ثماني جولات، فيها الصوت نفسه بتسجيل آخر (متماثلان).',
      };
      const recordHtml = () => {
        const r = log.rounds.filter((x) => !x.review);
        const n1 = r.filter((x) => x.res === 'first').length, n2 = r.filter((x) => x.res === 'second').length, n3 = r.filter((x) => x.res === 'shown').length;
        const ord = log.order_first_attempt;
        return '<p><b>التوقّع قبل السماع:</b> ' + (log.prediction ? SRC_NAME[log.prediction] : 'لم يختر') +
          ' · <b>«مَنْ هُناكَ؟»:</b> ' + (log.inference_choice ? WHO_NAME[log.inference_choice] : 'لم يختر') + '</p>' +
          '<p><b>الترتيب في المحاولة الأولى:</b> ' + (ord ? ord.map((x) => SRC_NAME[x]).join(' ثم ') + (ord.join() === ORDER.map((o) => o.id).join() ? ' (مطابق)' : ' (يختلف عمّا سُمع)') : 'لم يرتّب بعد') + '</p>' +
          (r.length ? '<p><b>جولات «سَمِعْتُ فَرْقاً!»:</b> من أوّل مرّة ' + K.AR(n1) + ' · بعد إعادة ' + K.AR(n2) + ' · عُرض الجواب ' + K.AR(n3) + '</p>' : '') +
          '<p>عدد مرّات إعادة الصوت: ' + K.AR(log.replays) + '</p>';
      };
      const adultBase = (extra) => K.adult(ctx, {
        main: extra,
        meta: () => '<p><b>هدف العنصر:</b> مسموع جديد «لعبة الأصوات»: يتوقّع الطفل قبل السماع، ويستنتج مَن هناك في الوقفة، ثم يرتّب الصور بترتيب ما سمع. بعدها لعبة «سَمِعْتُ فَرْقاً!»: صوتان، أهما صوت واحد أم صوتان مختلفان؟ وفي «المختلفين» كلام مع كلام، وضجّة مع ضجّة.</p>' +
          '<p><b>العمر ' + K.ageName(age) + ':</b> ' + K.ageText(BQ.meta(ID), age, AGES) + '</p>' +
          '<p>غير مرصود · لا مؤقّت · السجلّ للمعلّم وحده:</p>' + recordHtml(),
      });
      const upd = () => K.meta(ctx);

      /* =============== scr00 — المسموع الجديد =============== */
      async function scr00() {
        adultBase('<p>قبل السماع أشِر إلى الصور الثلاث واسأله بعينيك أيّها سيسمع.</p><p>في الوقفة دَعْه يخمّن مَن هناك، ولا تُجِب عنه.</p><p>في النهاية يرتّب الصور كما سمع؛ كلّ ترتيب يُقبل، والمسموع يُعاد بزرّ السمّاعة.</p>');
        ctx.instruction('هَيّا، أَصْغوا مَعي!', null, { icon: 'ear' });
        ctx.onReplay(null);
        steps.set(0);
        const scene = h('div.k9-scene', null, h('img', { src: BQ.img('img-122'), alt: 'ماجِدٌ خَلْفَ بارِقٍ المُغْمَضِ العَيْنَيْنِ', draggable: 'false' }));
        root.append(scene);
        /* ---- قبل: توقّع حرّ (٥ ث) ---- */
        const pred = h('div.k9-predict');
        const pw = BQ.ui.choices(pred, {
          items: BQ.shuffle(ORDER).map((o) => ({ id: o.id, img: o.img, aria: 'صورة' })),
          onPick: (it, b, btns) => { btns.forEach((x) => x.classList.toggle('is-picked', x === b)); log.prediction = it.id; upd(); },
        });
        pw.btns.forEach((b, i) => { b.style.animationDelay = (300 + i * 120) + 'ms'; });
        root.append(pred);
        await S.sleep(5200);
        /* ---- أثناء: صوت فقط ---- */
        pred.style.transition = 'opacity .4s'; pred.style.opacity = '0';
        await S.sleep(400); pred.remove();
        const svg = '<svg viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true"><path class="w3"/><path class="w2"/><path class="w1"/></svg>';
        const wave = h('div.k9-wave', { html: svg });
        const avs = {};
        ['MAJ', 'BRQ', 'SAY'].forEach((c) => { avs[c] = h('span.k9-av.' + c.toLowerCase(), { style: faceStyle(c), 'aria-hidden': 'true' }); wave.append(avs[c]); });
        avs.SAY.classList.add('is-hide');
        scene.append(wave);
        scene.classList.add('is-listen');
        const paths = [...wave.querySelectorAll('path')];
        let level = 0, amp = 0.08, ph = 0, kind = 'speech';
        const draw = () => {
          paths.forEach((p, k) => {
            let d = '';
            for (let x = 0; x <= 1000; x += 20) {
              const env = Math.sin(Math.PI * x / 1000);
              const f = kind === 'sfx' ? 0.034 : 0.021;
              const y = 100 + env * amp * (70 - k * 16) * Math.sin(x * f * (1 + k * 0.23) + ph * (1.3 + k * 0.4)) * (0.8 + 0.2 * Math.sin(x * 0.006 + ph));
              d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
            }
            p.setAttribute('d', d);
          });
        };
        const loop = () => {
          if (!S.live || !wave.isConnected) return;
          amp += ((level ? (kind === 'sfx' ? 1.15 : 0.85) : 0.08) - amp) * 0.08;
          ph += BQ.reduced() ? 0 : 0.07 + amp * 0.08;
          draw();
          requestAnimationFrame(loop);
        };
        draw(); requestAnimationFrame(loop);
        const say = async (id, opt) => {
          const sp = K.spk(id);
          kind = sp ? 'speech' : 'sfx';
          Object.keys(avs).forEach((c) => avs[c].classList.toggle('is-talk', c === sp));
          level = 1;
          await S.play(id, opt);
          level = 0;
          Object.keys(avs).forEach((c) => avs[c].classList.remove('is-talk'));
          await S.sleep(sp ? 250 : 400);
        };
        steps.set(1);
        ctx.instruction('هَيّا، أَصْغوا مَعي!');
        for (const id of PASS_A) await say(id);
        /* ---- وقفة الاستنتاج: مَن هناك؟ ---- */
        scene.classList.add('is-pause');
        Object.values(avs).forEach((a) => a.classList.add('is-hide'));
        ctx.instruction('هَيّا: مَنْ هُناكَ؟', null, { icon: 'ear' });
        ctx.onReplay(() => { log.replays++; S.seq(['bariq_L1-01_sfx-door-knock-b', 300, 'bariq_L1-01_sfx-compass-b']); });
        const who = h('div.k9-who', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
        const picked = new Promise((res) => {
          BQ.shuffle(['MAJ', 'BRQ', 'SAY']).forEach((c, i) => {
            const b = h('button.k9-wb', { type: 'button', 'aria-label': NAME[c], style: Object.assign(faceStyle(c), { animationDelay: i * 120 + 'ms' }) });
            b.addEventListener('click', () => { who.querySelectorAll('.k9-wb').forEach((x) => x.classList.toggle('is-picked', x === b)); log.inference_choice = c; upd(); res(); });
            who.append(b);
          });
        });
        scene.append(who);
        await S.play('bariq_L1-01_d1-EL02_03_ar');                 // «هَيّا: مَنْ هُناكَ؟» — وقفة بلا مؤقّت
        const hintBox = h('div.k9-hint'); scene.append(hintBox);
        await S.gate(Promise.race([picked, K.goBtn(hintBox, 'أَكْمِلْ')]));
        await S.sleep(700);
        hintBox.remove(); who.remove();
        scene.classList.remove('is-pause');
        avs.MAJ.classList.remove('is-hide'); avs.BRQ.classList.remove('is-hide'); avs.SAY.classList.remove('is-hide');
        ctx.instruction('هَيّا، أَصْغوا مَعي!', null, { icon: 'ear' });
        ctx.onReplay(null);
        for (const id of PASS_B) await say(id);
        await S.sleep(500);
        scene.remove();
        /* ---- بعد: الترتيب ---- */
        await orderTask();
      }

      async function orderTask() {
        steps.set(2);
        const box = h('div.k9-order');
        const slotsRow = h('div.k9-slots', { role: 'list' });
        const slots = [1, 2, 3].map((n) => h('div.k9-slot', { role: 'listitem', 'aria-label': 'خانَةٌ ' + K.AR(n) }, h('span.k9-dots', { 'aria-hidden': 'true' }, ...Array.from({ length: n }, () => h('i')))));
        slotsRow.append(...slots);
        const tray = h('div.k9-tray', { role: 'group', 'aria-label': 'صُوَرٌ لِلاخْتِيارِ' });
        const cards = BQ.shuffle(ORDER).map((o) => { const b = h('button.k9-oc', { type: 'button', 'aria-label': 'صورة', dataset: { id: o.id } }, h('img', { src: BQ.img(o.img), alt: '', draggable: 'false' }), h('span.kx-tick', { 'aria-hidden': 'true', html: BQ.icons.check })); b.o = o; return b; });
        tray.append(...cards);
        const lb = BQ.ui.listenBtn(() => { lb.classList.add('is-playing'); log.replays++; S.seq([...PASS_A, ...PASS_B]).then(() => lb.classList.remove('is-playing')); }, 'أَعِدِ المَسْموعَ');
        box.append(lb, slotsRow, tray);
        root.append(box);
        const passage = () => { log.replays++; S.seq([...PASS_A, ...PASS_B]); };
        ctx.onReplay(passage);
        let locked = true;
        // انتقال سلس (FLIP)
        const move = (el, parent, before) => {
          const r0 = el.getBoundingClientRect();
          if (before) parent.insertBefore(el, before); else parent.append(el);
          const r1 = el.getBoundingClientRect();
          if (BQ.reduced()) return;
          el.style.transition = 'none';
          el.style.transform = `translate(${r0.left - r1.left}px, ${r0.top - r1.top}px) scale(${r0.width / r1.width})`;
          requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = 'transform .4s cubic-bezier(.3,1.2,.5,1), box-shadow .2s'; el.style.transform = ''; }));
        };
        const placeIn = (el, slot) => {
          const other = slot.querySelector('.k9-oc');
          const from = el.parentElement;
          if (other && other !== el) { if (from.classList.contains('k9-slot')) move(other, from); else move(other, tray); }
          move(el, slot);
          S.fx(BQ.sfx.snap, 0.5);
          checkFull();
        };
        const toTray = (el) => { move(el, tray); };
        let resolveFull;
        const checkFull = () => { if (slots.every((s) => s.querySelector('.k9-oc'))) { locked = true; S.later(() => resolveFull && resolveFull(), 450); } };
        // لمس متتابع + سحب
        cards.forEach((el) => {
          let sx = 0, sy = 0, drag = false, down = false;
          el.addEventListener('pointerdown', (e) => { if (locked) return; down = true; drag = false; sx = e.clientX; sy = e.clientY; el.setPointerCapture(e.pointerId); });
          el.addEventListener('pointermove', (e) => {
            if (!down) return;
            const dx = e.clientX - sx, dy = e.clientY - sy;
            if (!drag && Math.hypot(dx, dy) > 8) { drag = true; el.classList.add('is-drag'); el.style.transition = 'none'; }
            if (drag) {
              el.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
              const over = slots.find((s) => { const r = s.getBoundingClientRect(); return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom; });
              slots.forEach((s) => s.classList.toggle('is-over', s === over));
            }
          });
          const up = (e) => {
            if (!down) return; down = false;
            slots.forEach((s) => s.classList.remove('is-over'));
            if (!drag) return;
            el.classList.remove('is-drag');
            const over = slots.find((s) => { const r = s.getBoundingClientRect(); return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom; });
            el.dataset.dragged = '1';
            if (over) placeIn(el, over);
            else { el.style.transition = 'transform .3s'; el.style.transform = ''; }
          };
          el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
          el.addEventListener('click', () => {
            if (el.dataset.dragged) { delete el.dataset.dragged; return; }
            if (locked) return;
            if (el.parentElement === tray) { const empty = slots.find((s) => !s.querySelector('.k9-oc')); if (empty) placeIn(el, empty); }
            else toTray(el);
          });
        });
        // عرض: يد شبحية من صورة إلى الخانة الأولى
        locked = false;
        S.later(() => { if (!box.querySelector('.k9-slot .k9-oc')) K.ghostTap(S, ctx.frame, tray.firstElementChild, { to: slots[0], hold: 300 }); }, 500);
        let attempt = 0;
        for (;;) {
          locked = false;
          await S.gate(new Promise((r) => { resolveFull = r; }));
          const got = slots.map((s) => s.querySelector('.k9-oc'));
          const ok = got.every((c, i) => c.o.id === ORDER[i].id);
          attempt++;
          if (attempt === 1) { log.order_first_attempt = got.map((c) => c.o.id); upd(); }
          if (ok) {
            await success(got, box, slotsRow);
            break;
          }
          if (attempt === 1) {
            // خطأ أوّل: تُسمَع الصور بترتيبه هو ← «هَيّا، أَصْغوا مَرَّةً أُخْرى!» ← يُعاد المسموع وتلمع كلّ صورة لحظة صوتها
            for (const c of got) { c.classList.add('is-glow'); await S.play(c.o.sound()); c.classList.remove('is-glow'); await S.sleep(200); }
            await S.play('bariq_L1-01_d1-EL02_04_ar');
            got.forEach((c) => toTray(c));
            await S.sleep(500);
            const inTray = [...tray.querySelectorAll('.k9-oc')];
            for (const o of ORDER) { const c = inTray.find((x) => x.o.id === o.id); c.classList.add('is-glow'); await S.play(o.sound()); c.classList.remove('is-glow'); await S.sleep(350); }
            continue;
          }
          // خطأ ثانٍ: الصور تنتقل إلى ترتيبها مع أصواتها ← «أَصْغوا: هَذا، وَهَذا.»
          await S.play('bariq_L1-01_d1-FB_04_ar');
          const all = [...box.querySelectorAll('.k9-oc')];
          for (let i = 0; i < 3; i++) { const c = all.find((x) => x.o.id === ORDER[i].id); move(c, slots[i]); await S.sleep(420); c.classList.add('is-pop'); await S.play(c.o.sound()); c.classList.remove('is-pop'); }
          await success(ORDER.map((o) => all.find((x) => x.o.id === o.id)), box, slotsRow, true);
          break;
        }
        const foot = h('div.k9-foot'); root.append(foot);
        await K.nextBtn(foot);
        foot.remove(); box.remove();
      }

      async function success(got, box, slotsRow, shown) {
        // الصور تتّصل بخطّ متقطّع بترتيبها
        const br = slotsRow.getBoundingClientRect();
        const pts = got.map((c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2 - br.left, r.top + r.height / 2 - br.top]; });
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        line.setAttribute('class', 'k9-line'); line.setAttribute('aria-hidden', 'true');
        line.innerHTML = '<path d="M' + pts.map((p) => p.map((v) => v.toFixed(0)).join(' ')).join(' L') + '"/>';
        slotsRow.prepend(line);
        slotsRow.querySelectorAll('.k9-slot').forEach((s) => { s.style.zIndex = 1; });
        if (!shown) for (const c of got) { c.classList.add('is-ok', 'is-pop'); await S.play(c.o.sound()); c.classList.remove('is-pop'); await S.sleep(150); }
        else got.forEach((c) => c.classList.add('is-ok'));
        S.fx(BQ.sfx.ok, 0.45);
        if (!shown) await S.gate(BQ.ui.bariq(stage, 'bariq_L1-01_d1-FB_01_ar'));   // «نَعَمْ! سَمِعْتَ فَرْقاً!»
        await S.play('bariq_L1-01_key_ar');                                        // ماجد: «سَمِعْتُ فَرْقاً!»
        upd();
      }

      /* =============== scr01 — متماثلان أم مختلفان (gme-102) =============== */
      async function scr01() {
        adultBase('<p>دَعْه يختار بلا تلميح؛ الصوتان يُعادان بلا حدّ بزرّ السمّاعة.</p><p><b>زرّا بارق:</b> بارق يصفّق = «صَوْتٌ واحِدٌ» · بارق يقفز فاتحاً ذراعيه = «سَمِعْتُ فَرْقاً!». كلّ زرّ يقول عبارته حين يُلمس، وبعد الاختيار تظهر صورتا المصدرين دليلاً.</p><p>إن تردّد بين «مْـ» و«ماءْ» فلا تقل الجواب؛ أعِد الصوتين فقط.</p>');
        steps.set(3);
        const rounds = mixRounds(PAIRS_BY_AGE[age] || PAIRS_BY_AGE['7-9']);
        steps.resize(rounds.length, 0);   // المؤشّر الموحَّد يتحوّل إلى جولات هذه اللعبة (بلا خرزات نتيجة)
        const beads = { cur: (i) => steps.set(i), set() {} };
        const wrap = h('div.k9-sd' + (age === '4-6' ? '.age46' : ''));
        root.append(wrap);
        // v0-12 r3: بطاقتا الصوتين (سمّاعة تضيء لحظة كلّ صوت؛ بعد الاختيار تظهر فيها صورة المصدر) — بلا أشكال هندسية
        const ringA = h('div.k9-ring', null, h('span', { html: BQ.icons.speaker }), h('img', { alt: '' }));
        const ringB = h('div.k9-ring', null, h('span', { html: BQ.icons.speaker }), h('img', { alt: '' }));
        let playing = false;
        const listen = BQ.ui.listenBtn(() => { if (!playing) { log.replays++; pair(cur, gap); } });
        const pairRow = h('div.k9-pair', null, ringA, listen, ringB);
        wrap.append(pairRow);
        const choiceHost = h('div');
        wrap.append(choiceHost);
        let cur = null;
        const setRing = (ring, id, mode) => {
          const img = (SRC[id] || ['', 'img-001'])[1];
          ring.lastChild.src = BQ.img(img);
          ring.classList.toggle('is-src', mode === 'src');
        };
        const showSrc = (r) => { setRing(ringA, r.a, 'src'); setRing(ringB, r.b, 'src'); };
        const resetRings = () => { [ringA, ringB].forEach((x) => x.classList.remove('is-on', 'is-src')); pairRow.classList.remove('is-near', 'is-far'); };
        async function pair(r, g, mode) {
          playing = true; listen.classList.add('is-playing');
          resetRings();
          ringA.classList.add('is-on'); if (mode) setRing(ringA, r.a, mode);
          await S.play(r.a, { noCaption: BQ.hasAudio(r.a) });
          ringA.classList.remove('is-on');
          await S.sleep(g);
          ringB.classList.add('is-on'); if (mode) setRing(ringB, r.b, mode);
          await S.play(r.b, { noCaption: BQ.hasAudio(r.b) });
          ringB.classList.remove('is-on');
          listen.classList.remove('is-playing'); playing = false;
        }
        const say = (id) => S.play(id);
        ctx.onReplay(() => { if (!playing && cur) { log.replays++; pair(cur, gap); } });
        ctx.instruction('هَيّا، أَصْغوا مَعي!', null, { icon: 'ear' });
        await S.play('bariq_L1-01_ins-listen_ar');
        /* عرض بارق مرّة واحدة: صوتان متماثلان ← يصفّق «هُما صَوْتٌ واحِدٌ.» · صوتان مختلفان ← يقفز «سَمِعْتُ فَرْقاً!» (زوجان خارج الجولات) */
        {
          const D = BQ.elJudge(choiceHost, {}); D.lock(true);
          const dSame = { a: 'bariq_L1-01_sfx-compass', b: 'bariq_L1-01_sfx-compass-b' };
          const dDiff = { a: 'bariq_L1-01_sfx-water-pour-1s', b: 'bariq_L1-01_sfx-compass-b' };
          await pair(dSame, gap); showSrc(dSame); await D.act('same', { play: say }); await S.sleep(500);
          await pair(dDiff, gap); showSrc(dDiff); await D.act('diff', { play: say }); await S.sleep(600);
          resetRings(); choiceHost.replaceChildren();
        }
        const missed = [];
        /** جولة بزرّي بارق — ثلاث درجات: صواب (الدليل + تعزيز) · خطأ أوّل (أَصْغوا مرّة أخرى + فاصل أطول) · خطأ ثانٍ (الصورتان + الجواب بلا احتفال) */
        const judgeRound = (r) => new Promise((resolve) => {
          choiceHost.replaceChildren();
          let tries = 0, phase = 'intro', auto = 0;
          const J = BQ.elJudge(choiceHost, { onPick });
          J.lock(true); J.el.classList.add('is-waiting');
          const setPhase = (v) => { phase = v; stage.dataset.phase = v; };
          stage.dataset.key = r.key; setPhase('intro');
          const arm = () => { setPhase('await'); J.lock(false); J.el.classList.remove('is-waiting');
            if (age === '4-6') auto = S.later(async () => { if (phase !== 'await') return; J.lock(true); await pair(r, gap); if (phase === 'await') J.lock(false); }, 6000); };
          (async () => { await pair(r, gap); await S.play('bariq_L1-01_ins-same_ar'); arm(); })();
          async function onPick(id, btn) {
            if (phase !== 'await') return;
            setPhase('fb'); J.lock(true); if (auto) { S.clear(auto); auto = 0; }
            btn.classList.add('is-picked');
            await J.act(id, { play: say });                       // بارق الملموس يتحرّك ويقول عبارته
            btn.classList.remove('is-picked');
            const good = J.byId(r.key);
            if (id === r.key) {
              BQ.ui.ok(btn); S.fx(BQ.sfx.ok, 0.45);
              showSrc(r);                                          // الدليل: صورتا المصدرين
              await S.gate(BQ.ui.bariq(stage, r.key === 'diff' ? 'bariq_L1-01_d1-FB_01_ar' : 'bariq_L1-01_d1-FB_02_ar'));
              resolve({ first: tries === 0, shown: false }); return;
            }
            tries++;
            BQ.ui.shake(btn); S.later(() => btn.classList.remove('is-dim'), 800);
            if (tries === 1) {
              await S.play('bariq_L1-01_d1-EL02_04_ar');           // «هَيّا، أَصْغوا مَرَّةً أُخْرى!»
              await pair(r, 1500);                                 // تلميح ١: فاصل أطول وإضاءة كلّ بطاقة لحظة صوتها
              await S.play('bariq_L1-01_ins-same_ar');
              btn.classList.remove('is-dim'); arm(); return;
            }
            // خطأ ثانٍ: الجواب بلا احتفال — كلّ صوت مع صورة مصدره ثم بارق الصحيح يتحرّك ويقول عبارته
            btn.classList.add('is-dim');
            await S.play('bariq_L1-01_d1-FB_04_ar');               // «أَصْغوا: هَذا، وَهَذا.»
            await pair(r, 1000, 'src');
            pairRow.classList.add(r.key === 'same' ? 'is-near' : 'is-far');
            BQ.ui.ok(good); await J.act(r.key, { play: say });
            await S.sleep(600);
            resolve({ first: false, shown: true });
          }
        });
        const runRound = async (r, i, review) => {
          cur = r;
          resetRings();
          beads.cur(i);
          ctx.instruction('هَلْ هُما صَوْتٌ واحِدٌ؟', null, { icon: 'ear' });
          const res = await S.gate(judgeRound(r));
          log.rounds.push({ review, key: r.key, res: res.first ? 'first' : res.shown ? 'shown' : 'second' }); upd();
          if (!review) { beads.set(i, res.first ? 'on' : 'help'); if (!res.first) missed.push(r); }
          await S.sleep(700);
        };
        for (let i = 0; i < rounds.length; i++) await runRound(rounds[i], i, false);
        // المراجعة: البنود التي احتاجت محاولة ثانية وحدها بترتيب جديد، غير محتسبة
        for (const r of BQ.shuffle(missed)) await runRound(r, rounds.length - 1, true);
        choiceHost.replaceChildren();
        resetRings();
        delete stage.dataset.phase; delete stage.dataset.key;
        await S.play('bariq_L1-01_key_ar');                                // «سَمِعْتُ فَرْقاً!»
        upd();
      }

      (async () => {
        await S.sleep(300);
        await scr00();
        await scr01();
        ctx.done();
        BQ.ui.endCard(stage, {
          title: 'سَمِعْتُ فَرْقاً!',
          note: 'أَصْغَيْتَ، وَرَتَّبْتَ ما سَمِعْتَ، وَمَيَّزْتَ الصَّوْتَيْنِ.',
          onReplay: () => BQ.open(ID, { skipCover: true }),
        });
      })();
    },
  });
  }
  if (window.BQ && BQ.kit) init(); else document.addEventListener('bq-kit', init, { once: true });
})();
