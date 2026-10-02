/* EL02 · شاهد وتعلّم — المقطع vid-101 «أَيْنَ الماءُ؟» (مونتاج لقطات Grok الحقيقية · video_src/build101.py · v0-8: ≈ ١٠٦ ث)
   مشغّل فيديو أسود ١٦:٩ بعرض المسرح. v0-12 r3 (المالك: «المقطع مقطع»): يُعرض كاملاً بلا وقفات ولا طبقات أسئلة داخل الفيديو
   (noCues)؛ يوقفه المعلّم متى شاء ليسأل. مؤشّر الأجزاء الثلاثة يتبع الزمن فقط.
   يُعلَّم العنصر منجَزاً فقط إذا شوهد المقطع حتى نهايته فعلاً (≥ ٨٥٪ من ثوانيه بتشغيل عاديّ)، أو إذا علّمه المعلّم من «دليل المعلّم».
   إن تعذّر تشغيل المقطع: ملصقه ورسالة (لا رسوم مقصوصة) — ولا يُعلَّم منجَزاً. */
(function () {
  const PARTS = [0, 72.7, 83.9]; // scr01 المشاهد ١–٤ · scr02 من المشهد ٥ حتى وقفة الحكم · scr03 بعدها (تُحدَّث من ملفّ الوقفات)

  BQ.register('EL02', {
    hero: 'img-119',
    cover: 'شاهِدا المقطع معاً، وتوقّفا عند كلّ وقفة ليجيب الطفل.',
    render(stage, ctx) {
      const h = BQ.h;
      const V = BQ.video;
      const { alive } = V.liveGuard(ctx);
      stage.style.justifyContent = 'flex-start'; stage.style.gap = '14px';
      V.pinAdult(ctx);
      const steps = V.steps(stage, 3, { label: 'المقطع' }); steps.set(0);

      let finished = false;
      const finish = () => {
        if (finished || !alive()) return; finished = true;
        ctx.done();
        BQ.ui.endCard(stage, { title: 'سَمِعْتُ فَرْقاً!', onReplay: () => BQ.open('EL02', { skipCover: true }) });
      };
      // للمعلّم (في الدليل لا على الصفحة): ما يفعله + تعليم العنصر يدوياً إن شوهد المقطع بطريقة أخرى
      const mark = h('button.bq-btn.ghost', { type: 'button', onclick: () => { const sc = ctx.frame.querySelector('.elp-scrim'); if (sc && !sc.hidden) sc.click(); if (P) P.pause(); finish(); } }, BQ.icon('check'), 'شاهدناه — علِّمْه منجَزاً');
      const status = h('p.e2-status', { hidden: true, style: { fontWeight: '700', color: 'var(--navy)' } });
      V.adultNote(ctx, h('p', null, 'يُعلَّم العنصر منجَزاً حين يُشاهَد المقطع إلى آخره. إن شاهدتماه بطريقة أخرى فعلِّمه أنت:'), status, mark);
      // انتهى المقطع بأقلّ من ٨٥٪ مشاهدة (قفز إلى الأمام): سطر قصير للمعلّم تحت المشغّل + الحالة في الدليل (R-05)
      let note = null;
      const onPartial = (f) => {
        if (!alive() || finished) return;
        const pct = BQ.AR ? BQ.AR(Math.round(f * 100)) : String(Math.round(f * 100)).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
        status.hidden = false; status.textContent = 'شوهد نحو ' + pct + '٪ من المقطع، فلم يُعلَّم العنصر منجَزاً بعد.';
        if (note) note.remove();
        note = h('div.e2-partial', { role: 'status', style: { display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'center', font: '500 15px/1.6 var(--ff-ui)', color: 'var(--ink)', background: 'var(--white)', borderRadius: 'var(--r-md)', padding: '10px 14px', boxShadow: '0 4px 14px var(--shade)' } },
          // v0-12 r3b: نصّ المعلّم في الدليل وحده (السطر status أعلاه) — على شاشة الطفل زرّ الإعادة فقط
          h('button.bq-btn', { type: 'button', onclick: () => { note.remove(); note = null; P.goto(0); } }, BQ.icon('replay'), 'أَعِدِ المَقْطَعَ'));
        P.root.after(note);
      };

      const P = V.mp4(stage, ctx, { id: 'vid-101', aria: 'مَقْطَعُ «أَيْنَ الماءُ؟»', captions: true, requireFull: true, noCues: true, onPartial: (f) => onPartial(f) });
      ctx.onReplay(() => P.goto(P.scene));
      // مؤشّر الأجزاء الثلاثة يتبع زمن الفيديو
      let raf = 0, k0 = -1;
      const tick = () => {
        const v = P.video; const t = v ? v.currentTime : 0;
        let k = 0; PARTS.forEach((p, i) => { if (t >= p) k = i; });
        if (k !== k0) { k0 = k; steps.set(k); }
        raf = requestAnimationFrame(tick);
      };
      tick();
      fetch('media/video/vid-101.cues.json').then((r) => r.json()).then((j) => {
        const judge = (j.cues || []).find((c) => c.kind === 'judge');
        if (j.scenes && j.scenes[4]) PARTS[1] = j.scenes[4].t;
        if (judge) PARTS[2] = judge.resume;
      }).catch(() => {});
      ctx.onCleanup(() => cancelAnimationFrame(raf));
      P.done.then((ok) => {
        if (!alive()) return;
        if (ok !== false) { finish(); return; }
        // تعذّر التشغيل و«تابِعْ»: لا تعليم إنجاز (T02 · QA-09)
        if (finished) return;
        BQ.ui.endCard(stage, { title: 'نُكْمِلُ لاحِقاً', onReplay: () => BQ.open('EL02', { skipCover: true }) });
      });
    },
  });
})();
