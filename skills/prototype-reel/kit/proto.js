/* prototype-reel kit: behavior primitives.
   Usage: Proto.init({ name, hint, start: "home", captions: { home: "..." } })
   Screens: <section class="screen" data-screen="home">…</section> inside .viewport
   Elements: data-push="id", data-back, data-sheet="id", data-close, data-toast="message" */

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const body = document.body;
  const params = new URLSearchParams(location.search);

  const P = (window.Proto = {
    stack: [],
    opts: {},
    toastTimer: null,
  });

  /* ---------- Mode ---------- */
  P.setMode = (mode) => {
    if (body.dataset.mode === mode) return;
    body.dataset.mode = mode;
    $$(".seg [data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    const url = new URL(location.href);
    url.searchParams.set("mode", mode);
    history.replaceState(null, "", url);
    fit();
  };

  // Scale the phone to fit, leaving room for the caption pill below.
  function fit() {
    const vp = $(".viewport");
    if (!vp) return;
    if (body.dataset.mode !== "mobile") { vp.style.transform = ""; return; }
    const stage = $(".stage").getBoundingClientRect();
    const s = Math.min(1, (stage.height - 120) / 832, (stage.width - 40) / 395);
    vp.style.transform = `scale(${s}) translateY(-${Math.round(24 / s)}px)`;
  }
  addEventListener("resize", fit);

  /* ---------- Screens ---------- */
  const screen = (id) => $(`.screen[data-screen="${id}"]`);
  const current = () => P.stack[P.stack.length - 1];

  function place(el, cls, animate) {
    el.classList.toggle("no-anim", !animate);
    el.classList.remove("is-left", "is-right");
    if (cls) el.classList.add(cls);
    if (!animate) { el.offsetHeight; el.classList.remove("no-anim"); }
  }

  P.push = (id, { animate = true } = {}) => {
    if (current() === id) return; // never re-trigger the screen already showing (one-frame blink)
    const next = screen(id);
    if (!next) return console.warn("No screen", id);
    const prev = current() && screen(current());
    place(next, "is-right", false);
    requestAnimationFrame(() => {
      if (prev) place(prev, "is-left", animate);
      place(next, null, animate);
    });
    P.stack.push(id);
    onState(id);
  };

  P.back = () => {
    if (P.stack.length < 2) return;
    const leaving = screen(P.stack.pop());
    const back = screen(current());
    place(leaving, "is-right", true);
    place(back, null, true);
    onState(current());
  };

  /* ---------- Sheet / modal ---------- */
  P.openSheet = (id) => {
    const sh = $(`.sheet[data-sheet="${id}"]`);
    if (!sh || sh.classList.contains("is-open")) return;
    $(".scrim").classList.add("is-open");
    sh.classList.add("is-open");
    onState(`sheet:${id}`);
  };
  P.closeSheet = () => {
    $$(".sheet.is-open").forEach((s) => s.classList.remove("is-open"));
    $(".scrim").classList.remove("is-open");
    onState(current());
  };

  /* ---------- Toast ---------- */
  P.toast = (msg, { ms = 6000 } = {}) => {
    const t = $(".toast");
    $(".msg", t).textContent = msg;
    t.classList.add("is-open");
    clearTimeout(P.toastTimer);
    P.toastTimer = setTimeout(() => t.classList.remove("is-open"), ms);
  };
  P.hideToast = () => { clearTimeout(P.toastTimer); $(".toast").classList.remove("is-open"); };

  /* ---------- Loading: skeleton for data only, rows resolve 80ms apart ---------- */
  P.load = (container, { ms = 900, stagger = 80 } = {}) =>
    new Promise((resolve) => {
      const rows = $$("[data-load]", container);
      rows.forEach((r) => { r.classList.add("skel"); r.classList.remove("resolve"); r.style.animationDelay = ""; });
      setTimeout(() => {
        rows.forEach((r, i) => {
          r.classList.remove("skel");
          r.style.animationDelay = `${i * stagger}ms`;
          r.classList.add("resolve");
        });
        resolve();
      }, ms);
    });

  /* ---------- Captions + tap hints ---------- */
  function onState(id) {
    const text = (P.opts.captions || {})[id];
    if (text != null) $(".caption").textContent = text;
    const hintFor = (P.opts.hints || {})[id];
    $$(".tap-hint").forEach((el) => el.classList.remove("tap-hint"));
    if (hintFor) $$(hintFor).forEach((el) => el.classList.add("tap-hint"));
    if (P.opts.onState) P.opts.onState(id);
  }
  P.caption = (text) => { $(".caption").textContent = text; };

  function toggle(attr, btn) {
    const on = body.dataset[attr] !== "on";
    body.dataset[attr] = on ? "on" : "off";
    btn.setAttribute("aria-pressed", String(on));
  }

  /* ---------- Restart ---------- */
  P.restart = () => {
    P.closeSheet();
    P.hideToast();
    $$(".screen").forEach((s) => place(s, "is-right", false));
    P.stack = [];
    P.push(P.opts.start, { animate: false });
    if (P.opts.onRestart) P.opts.onRestart();
  };

  /* ---------- Tap marker (for rendering videos) ---------- */
  // Appears ~0.4s before contact, presses to 0.84, then fades. Taps only, never scrolls.
  P.tapMarker = (el) =>
    new Promise((resolve) => {
      const r = el.getBoundingClientRect();
      const m = $("#ripple");
      m.style.left = `${r.left + r.width / 2}px`;
      m.style.top = `${r.top + r.height / 2}px`;
      m.animate(
        [
          { opacity: 0, transform: "scale(1.25)" },
          { opacity: 1, transform: "scale(1)", offset: 0.4 },
          { opacity: 1, transform: "scale(.84)", offset: 0.6 },
          { opacity: 0, transform: "scale(.84)" },
        ],
        { duration: 1000, easing: "cubic-bezier(0.16,1,0.3,1)" }
      );
      setTimeout(() => { el.classList.add("is-pressed"); }, 400);
      setTimeout(() => { el.classList.remove("is-pressed"); el.click(); resolve(); }, 560);
    });

  /* ---------- Wiring ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-push],[data-back],[data-sheet],[data-close],[data-toast],[data-mode],[data-toggle],[data-restart]");
    if (!t) return;
    if (t.dataset.mode) return P.setMode(t.dataset.mode);
    if (t.dataset.toggle) return toggle(t.dataset.toggle, t);
    if (t.hasAttribute("data-restart")) return P.restart();
    if (t.hasAttribute("data-close")) P.closeSheet();
    if (t.dataset.toast) P.toast(t.dataset.toast);
    if (t.dataset.sheet) P.openSheet(t.dataset.sheet);
    if (t.dataset.push) P.push(t.dataset.push);
    if (t.hasAttribute("data-back")) P.back();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") P.closeSheet(); });

  P.init = (opts) => {
    P.opts = opts;
    $(".tb .name").textContent = opts.name || "Prototype";
    $(".tb .hint").textContent = opts.hint || "";
    body.dataset.captions = params.get("captions") === "off" ? "off" : "on";
    body.dataset.hints = params.get("hints") === "off" ? "off" : "on";
    $$("[data-toggle]").forEach((b) => b.setAttribute("aria-pressed", String(body.dataset[b.dataset.toggle] === "on")));
    body.dataset.mode = "";
    P.setMode(params.get("mode") === "mobile" ? "mobile" : "desktop");
    $$(".screen").forEach((s) => place(s, "is-right", false));
    P.push(params.get("state") || opts.start, { animate: false });
  };
})();
