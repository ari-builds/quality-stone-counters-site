/* ==========================================================================
   Quality Stone Counters Corp — fixed quote shell
   No framework, no build step. Bone · Ink · Clay.
   Pricing is a pure function of answers so the band moves on every click.
   ========================================================================== */

const CONFIG = {
  currency: "USD",
  locale: "en-US",
  phone: "+1-336-844-0585",
  refPrefix: "QS-",
  leadEndpoint: "https://lumi-edits-clone.vercel.app/api/lead",
  leadSite: "quality-stone-counters",
  steps: [
    {
      id: "project",
      type: "choice",
      title: "What are we building?",
      note: "Pick the closest match. We confirm the exact spec on the in-home measure.",
      options: [
        {
          id: "quartz",
          label: "Kitchen countertops",
          sub: "Quartz, template, fabrication and install included",
          rate: 85.00,
          unit: "/sq ft",
          min: 1500,
          img: "../assets/opt/cab-01.webp",
          imgAlt: "Kitchen countertops by Quality Stone Counters Corp",
          name: "Kitchen countertops",
          unitName: "Quartz, full slab"
        },
        {
          id: "granite",
          label: "Bathroom countertops",
          sub: "Granite, template, fabrication and install included",
          rate: 70.00,
          unit: "/sq ft",
          min: 1200,
          img: "../assets/opt/IMG_2320.webp",
          imgAlt: "Bathroom countertops by Quality Stone Counters Corp",
          name: "Bathroom countertops",
          unitName: "Granite, full slab"
        },
        {
          id: "cabinets",
          label: "Custom cabinets",
          sub: "Shaker or flat-panel, built in our shop, installed on site",
          rate: 450.00,
          unit: "/lin ft",
          min: 3000,
          img: "../assets/opt/cab-showroom.webp",
          imgAlt: "Custom cabinets by Quality Stone Counters Corp",
          name: "Custom cabinets",
          unitName: "Built in our shop"
        },
        {
          id: "remodel",
          label: "Full kitchen remodel",
          sub: "Cabinets, countertops, flooring, paint and install",
          rate: 175.00,
          unit: "/sq ft",
          min: 18000,
          img: "../assets/opt/IMG_2591.webp",
          imgAlt: "Full kitchen remodel by Quality Stone Counters Corp",
          name: "Full kitchen remodel",
          unitName: "Complete remodel"
        },
      ],
    },
    {
      id: "size",
      type: "range",
      title: "How big is the area?",
      note: "A rough idea is fine — we measure exactly on the in-home visit.",
      min: 20,
      max: 200,
      step: 5,
      value: 40,
      unit: "sq ft",
      chips: [30, 40, 50, 60, 80, 100],
      hint: "A typical kitchen is 40–60 square feet of countertop surface.",
    },
    {
      id: "extras",
      type: "multi",
      title: "Add the finishing touches",
      note: "Tap to add or remove. Pick as many as you like.",
      options: [
        { id: "edge", label: "Edge profile", sub: "Eased, bevel or ogee edge on countertops", add: 15.00, unit: "/lin ft", min: 0 },
        { id: "backsplash", label: "Backsplash", sub: "Matching stone, full-height or 4-inch", add: 90.00, unit: "/sq ft", min: 0 },
        { id: "sinkcut", label: "Sink cutout", sub: "Sink or cooktop cutout, sealed", add: 250.00, unit: "each", min: 0 },
        { id: "sink", label: "Undermount sink", sub: "Stainless or composite, installed", add: 400.00, unit: "each", min: 0 },
      ],
    },

    { id: "details", type: "summary", title: "Your fixed quote" },
  ],

  defaults: { project: "quartz", size: 40, extras: [] },
};

/* -------------------------------------------------------------------------- */
/* state                                                                      */
/* -------------------------------------------------------------------------- */

const state = {
  step: 0,
  answers: { ...CONFIG.defaults, extras: [] },
  contact: { name: "", phone: "", address: "", email: "" },
  returnTo: null,
  submitted: null,
};

/* -------------------------------------------------------------------------- */
/* helpers                                                                    */
/* -------------------------------------------------------------------------- */

const money = new Intl.NumberFormat(CONFIG.locale, {
  style: "currency",
  currency: CONFIG.currency,
  maximumFractionDigits: 0,
});

const fmt = (n) => money.format(Math.round(n));
const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>\"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const stepById = (id) => CONFIG.steps.find((s) => s.id === id);
const projectOpt = () => stepById("project").options.find((o) => o.id === state.answers.project);
const selectedExtras = () => stepById("extras").options.filter((o) => state.answers.extras.includes(o.id));

/* -------------------------------------------------------------------------- */
/* analytics                                                                  */
/* -------------------------------------------------------------------------- */

const DEBUG = /[?&]debug=1/.test(location.search);

function track(name, props = {}) {
  const payload = { event: name, ...props };
  try {
    if (typeof window.gtag === "function") window.gtag("event", name, props);
    if (typeof window.fbq === "function") window.fbq("trackCustom", name, props);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  } catch (e) {
    /* analytics must never break the flow */
  }
  if (DEBUG) console.debug("[track]", payload);
}

let lastStepTracked = -1;
let lastSizeTracked = null;

/* -------------------------------------------------------------------------- */
/* pricing — pure function of answers                                         */
/* -------------------------------------------------------------------------- */

function price() {
  const p = projectOpt();
  const qty = state.answers.size;
  const lines = [];

  const base = Math.max(p.rate * qty, p.min);
  lines.push({
    label: `${p.label} — ${qty} sq ft × ${fmt(p.rate)}${p.unit}`,
    note: p.min ? `minimum charge ${fmt(p.min)}` : "",
    amount: base,
  });

  selectedExtras().forEach((e) => {
    const scaled = e.unit !== "flat" && e.unit !== "each";
    const amount = scaled ? Math.max(e.add * qty, e.min) : e.add;
    const qtyText = scaled ? qty + " " : "";
    lines.push({
      label: `${e.label} — ${qtyText}× ${fmt(e.add)}${e.unit}`.trim(),
      note: scaled && e.min ? `minimum charge ${fmt(e.min)}` : "",
      amount,
    });
  });

  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  return {
    lines,
    total,
    min: Math.round(total * 0.95 / 5) * 5,
    max: Math.round(total * 1.08 / 5) * 5,
  };
}

function basisLine() {
  const p = projectOpt();
  const ex = selectedExtras();
  const bits = [`${state.answers.size} sq ft`, p.label.toLowerCase()];
  if (ex.length) bits.push(`${ex.length} extra${ex.length > 1 ? "s" : ""}`);
  return bits.join(" · ") + ", fixed quote, template and install";
}

/* -------------------------------------------------------------------------- */
/* preview                                                                    */
/* -------------------------------------------------------------------------- */

function paintPreview() {
  const p = projectOpt();
  const img = document.getElementById("prevImg");
  const name = document.getElementById("prevName");
  const unit = document.getElementById("prevUnit");
  if (img) { img.src = p.img; img.alt = p.imgAlt; }
  if (name) name.textContent = p.name;
  if (unit) unit.textContent = p.unitName;
}

/* -------------------------------------------------------------------------- */
/* views                                                                      */
/* -------------------------------------------------------------------------- */

function optCard(o, selected, meta) {
  return `<button type="button" class="opt multi" data-opt="${o.id}" aria-pressed="${selected}">
    <span class="dot" aria-hidden="true"></span>
    <span class="opt-main"><b>${esc(o.label)}</b><small>${esc(o.sub)}</small></span>
    <span class="opt-meta">${esc(meta)}</span>
  </button>`;
}

function viewFor(step) {
  if (step.type === "choice" || step.type === "multi") {
    const isMulti = step.type === "multi";
    const current = isMulti ? state.answers.extras : state.answers[step.id];
    const opts = step.options
      .map((o) => {
        const on = isMulti ? current.includes(o.id) : current === o.id;
        let meta = "";
        if (step.id === "project") meta = `${fmt(o.rate)}${o.unit} · min ${fmt(o.min)}`;
        if (step.id === "extras") meta = "+" + fmt(o.add) + o.unit + (o.min ? ` · min ${fmt(o.min)}` : "");
        return optCard(o, on, meta);
      })
      .join("");
    return `<div class="step">
      <h1>${esc(step.title)}</h1>
      <p class="note">${esc(step.note)}</p>
      <div class="opts">${opts}</div>
    </div>`;
  }

  if (step.type === "range") {
    const q = state.answers.size;
    const pct = ((q - step.min) / (step.max - step.min)) * 100;
    return `<div class="step">
      <h1>${esc(step.title)}</h1>
      <p class="note">${esc(step.note)}</p>
      <div class="bigval"><b id="qtyOut">${q}</b><span>${step.unit}</span></div>
      <input id="qty" type="range" min="${step.min}" max="${step.max}" step="${step.step}" value="${q}"
        style="--pct:${pct}%" aria-label="Area in square feet" aria-valuetext="${q} square feet">
      <div class="chips">
        ${step.chips
          .map(
            (v) =>
              `<button type="button" class="chip" data-qty="${v}" aria-pressed="${v === q}">${v} ${step.unit}</button>`
          )
          .join("")}
      </div>
      <p class="hint">${esc(step.hint)}</p>
    </div>`;
  }

  /* summary */
  const p = projectOpt();
  const qty = state.answers.size;
  const ex = selectedExtras();
  const { lines, min, max } = price();

  const rows = [
    ["Project", p.label, 0],
    ["Area", `${qty} sq ft`, 1],
    ["Unit rate", `${fmt(p.rate)}${p.unit}`, 2],
    ["Extras", ex.length ? ex.map((e) => e.label).join(", ") : "None", 3],
  ]
    .map(
      ([label, value, i]) =>
        `<div class="rrow"><span>${label}</span><b>${esc(value)}</b><button type="button" class="edit" data-edit="${i}">Edit</button></div>`
    )
    .join("");

  const lineRows = lines
    .map(
      (l) =>
        `<div class="line"><span>${esc(l.label)}${l.note ? ` <em>${esc(l.note)}</em>` : ""}</span><em>${fmt(
          l.amount
        )}</em></div>`
    )
    .join("");

  return `<div class="step">
    <h1>${esc(step.title)}</h1>
    <p class="note">Here is your fixed number. Add your details and we will confirm an in-home measure.</p>
    <div class="recap">${rows}</div>
    <div class="lines">
      ${lineRows}
      <div class="linetotal"><span>Quote, written scope</span><b>${fmt(min)} – ${fmt(max)}</b></div>
    </div>
    <div class="fields">
      <label class="field"><span>Your name</span>
        <input id="f-name" type="text" autocomplete="name" placeholder="Sarah Whitfield" value="${esc(state.contact.name)}">
      </label>
      <label class="field"><span>Mobile</span>
        <input id="f-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(336) 555-0123" value="${esc(state.contact.phone)}">
      </label>
      <label class="field"><span>Address</span>
        <input id="f-address" type="text" autocomplete="street-address" placeholder="123 Oak Ridge Dr, Greensboro NC" value="${esc(state.contact.address)}">
      </label>
      <label class="field"><span>Email</span>
        <input id="f-email" type="email" autocomplete="email" placeholder="sarah@example.com" value="${esc(state.contact.email)}">
      </label>
    </div>
    <p class="err" id="err" role="alert"></p>
    <p class="fine">Free, written fixed quote. No deposit. We call within one business day to confirm your in-home measure.</p>
  </div>`;
}

function doneView() {
  const p = projectOpt();
  const q = state.answers.size;
  return `<div class="done">
    <div class="tick">
      <svg viewBox="0 0 24 24" fill="none" stroke="#171310" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </div>
    <h1>Quote requested, ${esc(state.submitted.name)}.</h1>
    <p>We will call within one business day to confirm your in-home measure.</p>
    <div class="ref">Reference ${esc(state.submitted.ref)}</div>
    <ul class="next-steps">
      <li><i>1</i><span><b>We call you.</b> Within one business day, to pick a time that suits.</span></li>
      <li><i>2</i><span><b>In-home measure.</b> ${q} sq ft ${esc(p.label.toLowerCase())}, measured and photographed on site.</span></li>
      <li><i>3</i><span><b>Fixed written quote.</b> The number you sign is the number you pay. No deposit, no upcharge.</span></li>
    </ul>
    <button type="button" class="again" id="again">Start again</button>
  </div>`;
}

/* -------------------------------------------------------------------------- */
/* chrome                                                                     */
/* -------------------------------------------------------------------------- */

function paintChrome() {
  const n = CONFIG.steps.length;
  document.getElementById("stepno").textContent = `Step ${state.step + 1} of ${n}`;
  document.getElementById("barfill").style.width = `${((state.step + 1) / n) * 100}%`;

  const back = document.getElementById("back");
  back.hidden = state.step === 0;
  document.getElementById("actions").classList.toggle("single", state.step === 0);

  document.getElementById("next").textContent =
    state.step === n - 1 ? "Request quote" : "Continue";

  document.getElementById("priceLbl").textContent =
    state.step === n - 1 ? "Your quote" : "Guide price";
}

function paintPrice() {
  const { min, max } = price();
  const range = min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
  const el = document.getElementById("priceRange");
  if (el.textContent !== range) el.textContent = range;
  document.getElementById("priceBasis").textContent = basisLine();
}

/* -------------------------------------------------------------------------- */
/* render + wiring                                                            */
/* -------------------------------------------------------------------------- */

function render() {
  const panel = document.getElementById("panelScroll");
  const footEl = document.getElementById("foot");

  if (state.submitted) {
    panel.innerHTML = doneView();
    footEl.hidden = true;
    document.getElementById("again").onclick = reset;
    paintPreview();
    return;
  }

  footEl.hidden = false;
  const step = CONFIG.steps[state.step];
  panel.innerHTML = viewFor(step);
  wire(step);
  paintChrome();
  paintPrice();
  paintPreview();

  if (lastStepTracked !== state.step) {
    lastStepTracked = state.step;
    track("step_view", { step: state.step + 1, total: CONFIG.steps.length, id: step.id });
  }
}

function wire(step) {
  const panel = document.getElementById("panelScroll");

  panel.onclick = (e) => {
    const opt = e.target.closest("[data-opt]");
    if (opt) return choose(step, opt.dataset.opt);

    const chip = e.target.closest("[data-qty]");
    if (chip) return setSize(Number(chip.dataset.qty));

    const edit = e.target.closest("[data-edit]");
    if (edit) {
      track("edit_jump", { to: CONFIG.steps[Number(edit.dataset.edit)].id });
      state.returnTo = CONFIG.steps.length - 1;
      state.step = Number(edit.dataset.edit);
      render();
      window.scrollTo({ top: 0 });
    }
  };

  const range = panel.querySelector("#qty");
  if (range) {
    range.oninput = () => setSize(Number(range.value), range);
  }

  ["name", "phone", "address", "email"].forEach((k) => {
    const el = panel.querySelector("#f-" + k);
    if (!el) return;
    el.oninput = () => {
      state.contact[k] = el.value;
      el.removeAttribute("aria-invalid");
      const err = panel.querySelector("#err");
      if (err) err.textContent = "";
    };
  });
}

function choose(step, id) {
  if (step.type === "multi") {
    const arr = state.answers.extras;
    const i = arr.indexOf(id);
    if (i >= 0) arr.splice(i, 1);
    else arr.push(id);
    track("extra_toggle", { option: id, on: i < 0, count: arr.length });
  } else {
    state.answers[step.id] = id;
    track("project_select", { option: id });
  }
  render();
  paintPrice();
  paintPreview();
}

function setSize(v, rangeEl) {
  state.answers.size = v;
  if (lastSizeTracked !== v) {
    lastSizeTracked = v;
    track("size_change", { area: v, unit: "sq ft" });
  }
  const panel = document.getElementById("panelScroll");
  const step = stepById("size");
  const pct = ((v - step.min) / (step.max - step.min)) * 100;
  const range = rangeEl || panel.querySelector("#qty");
  if (range) {
    range.value = v;
    range.style.setProperty("--pct", pct + "%");
    range.setAttribute("aria-valuetext", `${v} square feet`);
  }
  const out = panel.querySelector("#qtyOut");
  if (out) out.textContent = v;
  panel.querySelectorAll("[data-qty]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.qty) === v)));
  paintPrice();
  paintPreview();
}

/* -------------------------------------------------------------------------- */
/* navigation                                                                 */
/* -------------------------------------------------------------------------- */

function goNext() {
  const n = CONFIG.steps.length;
  if (state.step === n - 1) return submit();

  if (state.returnTo !== null) {
    state.step = state.returnTo;
    state.returnTo = null;
  } else {
    state.step += 1;
  }
  render();
  window.scrollTo({ top: 0 });
}

function goBack() {
  if (state.step === 0) return;
  state.step -= 1;
  state.returnTo = null;
  render();
  window.scrollTo({ top: 0 });
}

function submit() {
  const panel = document.getElementById("panelScroll");
  const name = state.contact.name.trim();
  const phone = state.contact.phone.trim();
  const address = state.contact.address.trim();
  const bad = [];

  if (name.length < 2) bad.push("name");
  if (!/[\d()\- ]{7,}/.test(phone)) bad.push("phone");
  if (address.length < 4) bad.push("address");

  if (bad.length) {
    const err = panel.querySelector("#err");
    if (err) err.textContent = "Add your name, phone and address so we can confirm the in-home measure.";
    bad.forEach((k) => {
      const el = panel.querySelector("#f-" + k);
      if (el) {
        el.setAttribute("aria-invalid", "true");
        el.focus();
      }
    });
    track("submit_blocked", { missing: bad });
    return;
  }

  const err = panel.querySelector("#err");
  if (err) err.textContent = "";

  track("submit_attempt", {
    value: price().total,
    currency: CONFIG.currency,
    project: state.answers.project,
    area: state.answers.size,
    extras: state.answers.extras.length,
  });

  const btn = document.getElementById("next");
  const idle = btn.textContent;
  btn.disabled = true;
  btn.dataset.idle = idle;
  btn.textContent = "Sending…";

  const p = projectOpt();
  const payload = {
    reference: CONFIG.refPrefix + (2000 + Math.floor(Math.random() * 7900)),
    currency: CONFIG.currency,
    project: { id: p.id, label: p.label },
    area: { value: state.answers.size, unit: "sq ft" },
    extras: selectedExtras().map((e) => ({ id: e.id, label: e.label, amount: e.add })),
    quote: { lines: price().lines, total: price().total, min: price().min, max: price().max },
    contact: { ...state.contact },
    meta: {
      submitted_at: new Date().toISOString(),
      page: location.pathname,
      referrer: document.referrer || null,
      viewport: `${innerWidth}x${innerHeight}`,
    },
  };

  /* real submit — durable lead capture with honest failure handling */
  payload.site = CONFIG.leadSite;
  payload.meta.source = "estimate";

  const finish = (ref) => {
    state.submitted = {
      ref: ref,
      name: name.split(/\s+/)[0],
    };
    btn.disabled = false;
    btn.textContent = idle;
    track("submit_success", {
      value: payload.quote.total,
      currency: payload.currency,
      reference: ref,
      project: payload.project.id,
      area: payload.area.value,
      extras: payload.extras.length,
    });
    render();
    window.scrollTo({ top: 0 });
  };

  const fail = (message) => {
    btn.disabled = false;
    btn.textContent = "Try again";
    if (err) err.textContent = message;
    track("submit_failed", { reason: message });
  };

  if (!CONFIG.leadEndpoint) {
    fail("We couldn't send your request. Please call " + CONFIG.phone + " and we'll take it over the phone.");
    return;
  }

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), 10000) : null;

  fetch(CONFIG.leadEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: controller ? controller.signal : undefined,
  })
    .then((response) => {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then((result) => {
      if (timer) clearTimeout(timer);
      if (!result || !result.ok || !result.ref) throw new Error("Unexpected response");
      finish(result.ref);
    })
    .catch((e) => {
      if (timer) clearTimeout(timer);
      const timedOut = e && e.name === "AbortError";
      fail(
        (timedOut ? "The request timed out. " : "We couldn't send your request. ") +
          "Your details are still here — tap Try again, or call " + CONFIG.phone + "."
      );
    });
}

function reset() {
  state.step = 0;
  state.answers = { ...CONFIG.defaults, extras: [] };
  state.contact = { name: "", phone: "", address: "", email: "" };
  state.returnTo = null;
  state.submitted = null;
  lastStepTracked = -1;
  lastSizeTracked = null;
  track("estimator_restart", {});
  render();
  window.scrollTo({ top: 0 });
}

/* -------------------------------------------------------------------------- */
/* keyboard                                                                   */
/* -------------------------------------------------------------------------- */

document.addEventListener("keydown", (e) => {
  if (state.submitted) return;
  const t = e.target;
  const inField = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT");

  const step = CONFIG.steps[state.step];
  if (!inField && /^[1-9]$/.test(e.key) && (step.type === "choice" || step.type === "multi")) {
    const opt = step.options[Number(e.key) - 1];
    if (opt) {
      e.preventDefault();
      choose(step, opt.id);
    }
    return;
  }

  if (inField) return;
  if (t && t.closest && t.closest("button")) return;

  if (e.key === "Enter") {
    e.preventDefault();
    goNext();
  } else if (e.key === "Escape") {
    e.preventDefault();
    goBack();
  }
});

document.getElementById("next").addEventListener("click", goNext);
document.getElementById("back").addEventListener("click", goBack);

track("estimator_view", { steps: CONFIG.steps.length, currency: CONFIG.currency });
render();
