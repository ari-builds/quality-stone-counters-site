(() => {
  'use strict';

  /* ---------- mobile nav ---------- */
  const burger = document.querySelector('.burger');
  const mnav = document.getElementById('mnav');
  if (burger && mnav) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mnav.hidden = open;
      document.body.style.overflow = open ? '' : 'hidden';
    });
    mnav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        mnav.hidden = true;
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- call bar after hero ---------- */
  const callbar = document.querySelector('.callbar');
  const hero = document.querySelector('.hero');
  if (callbar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      callbar.classList.toggle('is-on', !e.isIntersecting);
    }, { threshold: 0.15 }).observe(hero);
  }

  /* ---------- reveal ---------- */
  document.documentElement.classList.add('js');
  const rv = document.querySelectorAll('.sec .shell > *, .gal__it, .mat__card, .step, .q');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rv.forEach((el) => { el.classList.add('rv'); io.observe(el); });
    // Safety net: never leave content hidden if the observer misses.
    setTimeout(() => {
      document.querySelectorAll('.rv:not(.on)').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.2) el.classList.add('on');
      });
    }, 1200);
  }

  /* ---------- counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = Number(el.dataset.count) || 0;
        const dur = 1100;
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- gallery filter ---------- */
  const chips = document.querySelectorAll('.chip');
  const items = document.querySelectorAll('.gal__it');
  const empty = document.querySelector('.gal__empty');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', String(on));
      });
      const f = chip.dataset.f;
      let shown = 0;
      items.forEach((it) => {
        const ok = f === 'all' || it.dataset.c === f;
        it.classList.toggle('is-hide', !ok);
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* ---------- faq ---------- */
  document.querySelectorAll('.q').forEach((q) => {
    const btn = q.querySelector('.q__btn');
    const panel = q.querySelector('.q__a');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = q.classList.contains('is-open');
      document.querySelectorAll('.q.is-open').forEach((other) => {
        if (other === q) return;
        other.classList.remove('is-open');
        other.querySelector('.q__btn').setAttribute('aria-expanded', 'false');
        other.querySelector('.q__a').style.maxHeight = '';
      });
      q.classList.toggle('is-open', !open);
      btn.setAttribute('aria-expanded', String(!open));
      panel.style.maxHeight = open ? '' : panel.scrollHeight + 'px';
    });
  });

  /* ---------- form ---------- */
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      form.classList.add('is-sent');
      const ok = form.querySelector('.form__ok');
      if (ok) {
        ok.hidden = false;
        ok.setAttribute('tabindex', '-1');
        ok.focus();
      }
    });
  }
})();
