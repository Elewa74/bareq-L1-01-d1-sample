/* godot.js — تضمين محطّات لعبة «رحلة الميم» في صفحة الدرس (بارق · L1-01-d1 · v0-8 · مسوّدة للمراجعة)
   BQ.ui.godot(parent, {src, station, age, onDone, onReady, onFail, title}) → {el, box, row, iframe, load(src, station), destroy()}
     لوحة لعبة عمودية (927×1596) في iframe وسط المسرح · حالة تحميل · زرّ ملء الشاشة (حين يتاح) · رسائل اللعبة:
     postMessage({bq:'ready'|'done'|'error', station, result}).
     مراقب التحميل (v0-12): لا علامة حياة ('progress' من اللعبة أو تحميل الإطار) ٢٠ ث، أو ٩٠ ث بلا 'ready'، أو وصلت 'error'،
     أو فشل الإطار → onFail(). 'error' مع fatal:true (انهيار بعد البدء: ذاكرة/WebGL) يُعدّ فشلاً حتى بعد 'ready'.
     بلا onFail: لوحة داخل المربّع «تعذّر تشغيل اللعبة» + زرّ «العودة إلى الدرس» (لا شاشة ميّتة).
     يمرَّر emb=1: اللعبة المضمَّنة تتخطّى بطاقة عنوانها (غلاف الصفحة يكفي).
   BQ.ui.godotOK() — WebGL2 + WebAssembly + DecompressionStream متاحة، ولم تفشل اللعبة على هذا المتصفّح في هذه الجلسة
     (sessionStorage «bq-godot-fail» تكتبه اللعبة عند فشلها) · ?godot=0 يفرض النسخة الخفيفة و?godot=1 يفرض المحاولة (للفحص).
   BQ.ui.godotRender(station, htmlRender, {name, title, instruction, after(ctx, result, stage)}) → render(stage, ctx):
     المحطّة هي التجربة الأساسية، والنسخة HTML بديل آليّ (بلا WebGL، أو إن تعذّر التحميل)، ورابط للمعلّم «النسخة الخفيفة».
     after يُستدعى حين تنتهي المحطّة (بطاقة الختام أو خطوة إضافية)؛ بلا after تظهر بطاقة ختام افتراضية. */
(function () {
  'use strict';
  const BQ = window.BQ; if (!BQ || !BQ.ui) return;
  const h = BQ.h;
  const GAME = 'games/meem/index.html';
  const AR = BQ.AR || ((n) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]));
  const IDLE_MS = 20000, READY_MS = 90000;

  if (!document.getElementById('st-godot')) {
    const st = document.createElement('style'); st.id = 'st-godot';
    st.textContent = `
.bq-godot { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.bq-godot-box { position: relative; width: min(100%, 470px); width: min(100%, calc((100vh - 230px) * 927 / 1596), 470px); width: min(100%, calc((100dvh - 230px) * 927 / 1596), 470px);
  min-width: min(100%, 240px); aspect-ratio: 927 / 1596; border-radius: var(--r-lg);
  overflow: hidden; background: var(--sky); box-shadow: 0 18px 40px var(--shade), 0 0 0 4px var(--white); }
.bq-godot-box iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block; background: var(--sky); }
.bq-godot-box:fullscreen { width: 100%; height: 100%; border-radius: 0; box-shadow: none; background: var(--sky); }
.bq-godot-load { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  background: radial-gradient(circle at 50% 40%, var(--sky-2), var(--sky)); color: var(--white); font: 600 15px/1.5 var(--ff-ui); text-align: center; padding: 20px; transition: opacity .35s; z-index: 2; }
.bq-godot-load.is-off { opacity: 0; pointer-events: none; }
.bq-godot-dead { z-index: 4; color: var(--white); }
.bq-godot-dead .bq-btn { min-height: 52px; font-size: 18px; }
.bq-godot-spin { width: 46px; height: 46px; border-radius: 50%; border: 5px solid rgba(255,255,255,.35); border-top-color: var(--sun-soft); animation: bqgspin 1s linear infinite; }
@keyframes bqgspin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .bq-godot-spin { animation: none; } }
.bq-godot-fs { position: absolute; inset-inline-start: 10px; bottom: 10px; z-index: 3; width: 44px; height: 44px; border-radius: 50%; border: 0; cursor: pointer;
  background: rgba(0, 52, 91, .55); color: var(--white); display: grid; place-items: center; }
.bq-godot-fs:hover, .bq-godot-fs:focus-visible { background: var(--navy); outline: 3px solid var(--sun-soft); }
.bq-godot-fs svg { width: 22px; height: 22px; }
.bq-godot-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 14px; font: 500 13px/1.5 var(--ff-ui); color: var(--muted); max-width: 100%; }
.bq-godot-row:empty { display: none; }
.bq-godot-link { font: 600 13px/1 var(--ff-ui); color: var(--navy); background: none; border: 0; padding: 10px 4px; min-height: 44px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.bq-godot-link:hover { color: var(--sky-ink); }
.bq-support { background: var(--paper); border: 1.5px solid var(--paper-edge); border-radius: var(--r-sm); padding: 10px 12px; margin: 0 0 12px; }
.bq-support p { margin: 0 0 8px; }
.bq-support div { display: flex; flex-wrap: wrap; gap: 8px; }
.bq-support .bq-btn { min-height: 44px; font-size: 14px; padding: .5em 1em; }
/* بطاقة اللعبة الثانية (EL14) */
.bq-gcards { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.bq-gcard { width: min(100%, 470px); display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; gap: 12px; align-items: center; text-align: start;
  background: var(--white); border: 1.5px solid var(--sky-line); border-radius: var(--r-md); padding: 10px 12px; box-shadow: 0 6px 16px var(--shade); }
.bq-gcard img { width: 64px; height: 64px; border-radius: 14px; object-fit: cover; background: var(--sky); }
.bq-gcard b { display: block; font: 700 16px/1.3 var(--ff-display); color: var(--navy); }
.bq-gcard small { display: block; font: 500 12.5px/1.5 var(--ff-ui); color: var(--muted); }
.bq-gcard .go { font: 700 14px/1 var(--ff-ui); border: 0; border-radius: 999px; padding: 12px 16px; min-height: 44px; cursor: pointer; background: var(--sun); color: var(--navy); white-space: nowrap; }
.bq-gcard .go:hover { background: var(--sun-soft); }
.bq-gcard.is-on { border-color: var(--sky); }
@media (max-height: 520px) and (orientation: landscape) { .bq-godot-box { width: min(100%, calc((100vh - 40px) * 927 / 1596), 470px); width: min(100%, calc((100dvh - 40px) * 927 / 1596), 470px); } }
`;
    document.head.append(st);
  }

  const FS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';

  const force = (() => { try { return new URLSearchParams(location.search).get('godot'); } catch (e) { return null; } })();
  BQ.ui.godotOK = function () {
    if (force === '0') return false;
    if (force !== '1') { try { if (sessionStorage.getItem('bq-godot-fail')) return false; } catch (e) { /* التخزين محجوب */ } }
    if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') return false;
    if (typeof DecompressionStream !== 'function') return false; // المحرّك مضغوط gz (Safari < 16.4 لا يدعمه)
    try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2')); } catch (e) { return false; }
  };

  BQ.ui.godot = function (parent, opt) {
    opt = opt || {};
    const url = (src, station) => (src || GAME) + (station ? '#station=' + encodeURIComponent(station) + '&age=' + encodeURIComponent(opt.age || BQ.state.age || '4-6') +
      '&rm=' + (BQ.reduced() ? 1 : 0) + '&cc=' + (BQ.state.cc ? 1 : 0) + '&emb=1' : '');
    const load = h('div.bq-godot-load', { role: 'status' }, h('span.bq-godot-spin', { 'aria-hidden': 'true' }), h('span', null, 'جارٍ تحميل اللعبة…'));
    const iframe = h('iframe', { title: opt.title || 'لعبة رحلة الميم', allow: 'autoplay; fullscreen', loading: 'eager' });
    const canFs = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    const fs = canFs ? h('button.bq-godot-fs', { type: 'button', 'aria-label': 'ملء الشاشة', title: 'ملء الشاشة', html: FS }) : null;
    const box = h('div.bq-godot-box', null, iframe, load, fs);
    const row = h('div.bq-godot-row');
    const el = h('div.bq-godot', null, box, row);
    parent.append(el);
    if (fs) fs.addEventListener('click', () => {
      try {
        if (document.fullscreenElement) { const p = document.exitFullscreen && document.exitFullscreen(); if (p && p.catch) p.catch(() => {}); return; }
        const f = box.requestFullscreen || box.webkitRequestFullscreen; if (f) { const p = f.call(box); if (p && p.catch) p.catch(() => {}); }
      } catch (e) { /* ملء الشاشة غير متاح هنا */ }
    });
    let timer = 0, watchdog = 0, cap = 0, ready = false, failed = false, dead = false;
    const hideLoad = () => { load.classList.add('is-off'); clearTimeout(timer); };
    const stopWatch = () => { clearTimeout(watchdog); clearTimeout(cap); };
    const alive = () => { if (ready || failed || dead) return; clearTimeout(watchdog); watchdog = setTimeout(() => fail('timeout'), IDLE_MS); };
    const deadBox = () => { // لا onFail: لوحة داخل المربّع بدل شاشة ميّتة
      hideLoad(); try { iframe.src = 'about:blank'; } catch (e) { /* */ }
      const back = h('button.bq-btn', { type: 'button', onclick: () => { const id = BQ.state && BQ.state.current; if (id && BQ.open) BQ.open(id, { skipCover: true, history: 'replace' }); } }, 'العودة إلى الدرس');
      box.append(h('div.bq-godot-load.bq-godot-dead', { role: 'alert' }, h('span', null, 'تعذّر تشغيل اللعبة على هذا الجهاز.'), back));
    };
    const fail = (why, fatal) => {
      if (failed || dead || (ready && !fatal)) return;
      failed = true; stopWatch();
      if (opt.onFail) opt.onFail(why); else deadBox();
    };
    iframe.addEventListener('load', () => {
      if (dead || !iframe.src || iframe.src === 'about:blank') return;
      clearTimeout(timer); timer = setTimeout(hideLoad, 1200); // اللعبة تعرض شاشة تحميلها
      alive(); clearTimeout(cap); cap = setTimeout(() => { if (!ready) fail('timeout'); }, READY_MS);
    });
    iframe.addEventListener('error', () => fail('iframe'));
    function onMsg(e) {
      if (!iframe.contentWindow || e.source !== iframe.contentWindow) return;
      const m = e.data; if (!m || typeof m !== 'object' || !m.bq) return;
      if (m.bq === 'progress') alive();
      if (m.bq === 'ready') { ready = true; stopWatch(); hideLoad(); opt.onReady && opt.onReady(m); }
      if (m.bq === 'error') fail('game', !!m.fatal);
      if (m.bq === 'done') opt.onDone && opt.onDone(m);
    }
    window.addEventListener('message', onMsg);
    const api = {
      el, box, row, iframe,
      load(src, station) { ready = false; failed = false; load.classList.remove('is-off'); const d = box.querySelector('.bq-godot-dead'); if (d) d.remove(); iframe.src = url(src, station); },
      destroy() { dead = true; window.removeEventListener('message', onMsg); clearTimeout(timer); stopWatch(); try { iframe.src = 'about:blank'; } catch (e) {} el.remove(); },
    };
    api.load(opt.src, opt.station);
    return api;
  };

  /* ملخّص المعلّم من نتيجة المحطّة (للدليل وحده — لا أرقام على شاشة الطفل) */
  function summary(station, r) {
    r = r || {};
    const n = (k) => AR(r[k] || 0);
    if (station === 'listen') {
      const rounds = AR(r.rounds || 5);
      const pass = r.passed ? 'بلغ عتبة الإتقان (٤ من ٥ من المحاولة الأولى).' : 'لم يبلغ ٤ من ٥ من المحاولة الأولى.';
      const alt = r.alt_first_try != null ? ' · الإعادة بتسجيل ثانٍ للصوت نفسه: ' + AR(r.alt_first_try) + ' من ' + AR(r.alt_rounds || 5) + ' من المحاولة الأولى' : '';
      return { line: '',
        html: '<p class="goal"><b>نتيجة «تدرّب» (النشاط المرصود):</b> ' + n('first_try') + ' من ' + rounds + ' من المحاولة الأولى — ' + pass + '</p>' +
          '<p>يقيس هذا النشاط أنّ الطفل <b>يربط «مْـ»/«ماءْ» بصورته ويميّز مصادر الأصوات</b>.</p>' +
          '<p>بعد محاولة ثانية: ' + n('after_retry') + ' · عُرض الصواب: ' + n('missed') + (r.assisted != null ? ' · بمساعدة: ' + n('assisted') : '') + alt +
          ' · جولة الحرف «م»: ' + (r.reading_first_try ? 'من أوّل لمسة' : 'بعد محاولة') + ' · جولات مراجعة غير محتسبة: ' + n('review') + ' · إعادات الصوت: ' + n('replays') + '.</p>' };
    }
    if (station === 'recall') return { line: '', html: '<p class="goal"><b>«تهيّأ» (غير مرصود):</b> لمس المصدر الصحيح أوّلاً في ' + n('first_try') + ' من ' + AR(r.items || 3) + ' · إعادات الصوت: ' + n('replays') + '. لا خطأ في الاستدعاء.</p>' };
    if (station === 'write') return { line: '', html: '<p class="goal"><b>«اكتب» (غير مرصود):</b> عدد التتبّعات المكتملة: ' + n('items') + ' (موجَّه ثم باهت ثم حرّ) · بمساعدة المسار الأعرض: ' + n('assisted') + '. المهمّ الإتمام لا الإتقان.</p>' };
    if (station === 'compass') return { line: '', html: '<p class="goal"><b>«بوصلة الأصوات» (غير مرصود):</b> وضع البطاقات الأربع حول «م» · من أوّل مرّة: ' + n('first_try') + ' · بعد تلميح: ' + n('assisted') + ' · عدد الحركات: ' + n('moves') + '.</p>' };
    if (station === 'journey') return { line: '', html: '<p class="goal"><b>«رحلة الميم»:</b> أتمّ الطفل المحطّات الأربع (غير مرصودة هنا؛ الرصد في «تدرّب» وحده).</p>' };
    return { line: '', html: '' };
  }
  BQ.ui.godotSummary = summary;

  /** بطاقة دعم للمعلّم بعد تعثّر «تدرّب» مرّتين — روابط بلا توجيه آليّ */
  function supportCard() {
    const go = (id, label) => h('button.bq-btn.ghost', { type: 'button', onclick: () => BQ.open(id, { src: 'menu' }) }, label);
    return h('div.bq-support', null,
      h('p', null, h('b', null, 'يحتاج الطفل دعماً قبل «اقرأ»: '), 'أعِد معه هذه الأنشطة في جلسة قصيرة، ثم «تدرّب» مرّة أخرى في يوم لاحق.'),
      h('div', null, go('EL02', 'شاهد وتعلّم · الجزء ١'), go('EL04', 'مفرداتي'), go('EL03', 'لاحظ وتعلّم')));
  }

  /** render(stage, ctx) يجعل محطّة اللعبة التجربة الأساسية والنسخة HTML بديلاً */
  BQ.ui.godotRender = function (station, htmlRender, opt) {
    opt = opt || {};
    return function render(stage, ctx) {
      const alive = () => (typeof ctx.alive === 'function' ? ctx.alive() : true);
      const runHtml = () => { stage.replaceChildren(); ctx.instruction(''); htmlRender(stage, ctx); };
      if (!BQ.ui.godotOK()) return htmlRender(stage, ctx);
      const body = ctx.frame.querySelector('.elp-adult-body');
      const note = h('p.meta', null, 'التجربة الأساسية هنا لعبة «رحلة الميم» (محطّة «' + (opt.name || station) + '»).');
      const altBtn = h('p', null, h('button.bq-btn.ghost.bq-alt-run', { type: 'button', onclick: () => { g.destroy(); altBtn.remove(); runHtml(); } }, 'تشغيل النسخة الخفيفة (تعمل في أيّ متصفّح)'));
      if (body) body.append(note, altBtn);
      if (opt.instruction) ctx.instruction(opt.instruction);
      let finished = false;
      const g = BQ.ui.godot(stage, { station, age: ctx.age(), title: opt.title,
        onFail() {
          if (!alive() || finished) return;
          g.destroy(); altBtn.remove(); note.textContent = 'تعذّر تحميل اللعبة على هذا الجهاز، فشُغّلت النسخة الخفيفة تلقائياً.';
          runHtml();
          const b = ctx.frame.querySelector('.elp-adult-body'); if (b && !b.contains(note)) b.prepend(note);
        },
        onDone(m) {
          if (m.station !== station || finished || !alive()) return;
          finished = true;
          ctx.done();
          const r = m.result || {};
          const s = summary(station, r);
          const b = ctx.frame.querySelector('.elp-adult-body');
          if (b) {
            const res = h('div.bq-godot-res', { html: s.html });
            const old = b.querySelector('.bq-godot-res'); if (old) old.remove();
            b.prepend(res);
            if (station === 'listen' && (r.support || m.support)) res.append(supportCard());
          }
          if (typeof opt.after === 'function') { try { opt.after(ctx, r, stage); } catch (e) { console.error(e); } }
          else BQ.ui.endCard(stage, { title: 'أَحْسَنْتَ!', onReplay: () => BQ.open(ctx.meta.id, { skipCover: true, history: 'replace' }) });
        } });
      ctx.onCleanup(() => g.destroy());
    };
  };
})();
