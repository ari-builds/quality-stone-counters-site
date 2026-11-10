/* Eco Step Flooring | script.js
   Vanilla, no dependencies. Everything animates with transform/opacity
   and every scroll effect is driven from one rAF loop or one
   IntersectionObserver. Respects prefers-reduced-motion. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header + mobile nav ---------- */
  var header = document.querySelector('.header');
  var menuBtn = document.querySelector('.header__menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');
  var floatingCall = document.querySelector('.floating-call');

  function setMenu(open) {
    mobileNav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () { setMenu(!mobileNav.classList.contains('is-open')); });
    mobileNav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) setMenu(false); });
  }

  /* ---------- scroll driven: header state, floating call, parallax ---------- */
  var hero = document.querySelector('.hero');
  var heroVideo = document.getElementById('heroVideo');
  var heroOverlay = document.querySelector('.hero__overlay');
  var parallaxImgs = Array.prototype.slice.call(document.querySelectorAll('.parallax[data-parallax] img'));
  var ctaBg = document.querySelector('.cta__bg');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (floatingCall) floatingCall.classList.toggle('is-visible', y > vh * 0.6);

    if (!reduceMotion) {
      if (hero && heroVideo && y < hero.offsetHeight) {
        var shift = y * 0.28;
        heroVideo.style.transform = 'translate3d(0,' + shift + 'px,0)';
        if (heroOverlay) heroOverlay.style.transform = 'translate3d(0,' + shift * 0.4 + 'px,0)';
      }
      parallaxImgs.forEach(function (img) {
        var box = img.parentNode.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) return;
        var speed = parseFloat(img.parentNode.getAttribute('data-parallax')) || 0.08;
        var progress = (box.top + box.height / 2 - vh / 2) / vh; // -1 .. 1
        img.style.transform = 'translate3d(0,' + (progress * -speed * box.height) + 'px,0)';
      });
      if (ctaBg) {
        var cb = ctaBg.parentNode.getBoundingClientRect();
        if (cb.bottom > 0 && cb.top < vh) {
          var p = (cb.top + cb.height / 2 - vh / 2) / vh;
          ctaBg.style.transform = 'translate3d(0,' + (p * -40) + 'px,0) scale(1.08)';
        }
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- hero video: force autoplay on mobile ---------- */
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    var tryPlay = function () {
      if (reduceMotion) { heroVideo.pause(); return; }
      var p = heroVideo.play();
      if (p !== undefined) p.catch(function () {});
    };
    tryPlay();
    document.addEventListener('visibilitychange', function () { if (!document.hidden) tryPlay(); });
    ['touchstart', 'click', 'scroll'].forEach(function (evt) {
      document.addEventListener(evt, tryPlay, { once: true, passive: true });
    });
  }

  /* ---------- reveal system ---------- */
  function addReveal(selector, cls, delay) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add(cls || 'reveal');
      if (delay != null) el.style.setProperty('--delay', delay + 'ms');
    });
  }
  function stagger(selector, stepMs, cls, scope) {
    var root = scope || document;
    Array.prototype.forEach.call(root.querySelectorAll(selector), function (el, i) {
      el.classList.add(cls || 'reveal-fade');
      el.style.setProperty('--delay', (i * stepMs) + 'ms');
    });
  }

  addReveal('.section-head');
  addReveal('.about__copy');
  addReveal('.split__copy', 'reveal', 120);
  addReveal('.ba__copy');
  addReveal('.reviews__head');
  addReveal('.faq__intro');
  addReveal('.contact__info');
  addReveal('.form', 'reveal', 220);
  addReveal('.cta__inner');
  addReveal('.footer__grid', 'reveal-fade');
  stagger('.svc', 110);
  stagger('.step', 160);
  stagger('.tile', 90);
  stagger('.review', 180);
  stagger('.faq-item', 60);
  stagger('.stats li', 140, 'reveal');
  stagger('.ba__meta', 0, 'reveal-fade');

  var nudgeSlider = function () {}; /* reassigned once the slider is wired up below */

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      if (el.classList.contains('wipe')) {
        /* never wipe open an empty box: wait for the photo, then reveal */
        var img = el.querySelector('img');
        if (img && !img.complete) {
          img.addEventListener('load', function () { el.classList.add('is-visible'); }, { once: true });
          img.addEventListener('error', function () { el.classList.add('is-visible'); }, { once: true });
          io.unobserve(el);
          return;
        }
      }
      el.classList.add('is-visible');
      if (el.classList.contains('stats')) countUp(el);
      if (el.id === 'baSlider') nudgeSlider();
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-fade, .wipe, .steps, .stats, #baSlider').forEach(function (el) { io.observe(el); });

  /* ---------- count-up numerals ---------- */
  function countUp(container) {
    container.querySelectorAll('[data-count]').forEach(function (el, i) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      if (reduceMotion) { el.textContent = target.toLocaleString('en-US') + suffix; return; }
      var start = null, dur = 1700, delay = i * 140;
      function frame(ts) {
        if (start === null) start = ts;
        var t = Math.max(0, Math.min(1, (ts - start - delay) / dur));
        var eased = 1 - Math.pow(1 - t, 4);
        el.textContent = Math.round(target * eased).toLocaleString('en-US') + (t === 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  /* ---------- before / after slider ---------- */
  var slider = document.getElementById('baSlider');
  var sliderPos = 50, setPos = null;
  if (slider) {
    var beforeImg = slider.querySelector('.ba-slider__img--before');
    var divider = slider.querySelector('.ba-slider__divider');

    setPos = function (p) {
      sliderPos = Math.max(0, Math.min(100, p));
      beforeImg.style.clipPath = 'inset(0 ' + (100 - sliderPos) + '% 0 0)';
      divider.style.left = sliderPos + '%';
      slider.setAttribute('aria-valuenow', String(Math.round(sliderPos)));
    };
    function posFromEvent(e) {
      var rect = slider.getBoundingClientRect();
      return ((e.clientX - rect.left) / rect.width) * 100;
    }
    var dragging = false, nudging = false;
    slider.addEventListener('pointerdown', function (e) {
      nudging = false; dragging = true;
      slider.classList.add('is-dragging');
      slider.setPointerCapture(e.pointerId);
      setPos(posFromEvent(e));
    });
    slider.addEventListener('pointermove', function (e) { if (dragging) setPos(posFromEvent(e)); });
    function stopDrag() { dragging = false; slider.classList.remove('is-dragging'); }
    slider.addEventListener('pointerup', stopDrag);
    slider.addEventListener('pointercancel', stopDrag);
    slider.addEventListener('keydown', function (e) {
      nudging = false;
      if (e.key === 'ArrowLeft') { setPos(sliderPos - 4); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { setPos(sliderPos + 4); e.preventDefault(); }
      else if (e.key === 'Home') { setPos(0); e.preventDefault(); }
      else if (e.key === 'End') { setPos(100); e.preventDefault(); }
    });

    /* one-time hint when it scrolls into view: 50 -> 34 -> 62 -> 50 */
    var nudged = false;
    nudgeSlider = function () {
      if (nudged || reduceMotion) return;
      nudged = true; nudging = true;
      var keyframes = [50, 34, 62, 50], seg = 0, start = null, segDur = 700;
      function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
      function frame(ts) {
        if (!nudging) return;
        if (start === null) start = ts;
        var t = Math.min(1, (ts - start) / segDur);
        var from = keyframes[seg], to = keyframes[seg + 1];
        setPos(from + (to - from) * ease(t));
        if (t >= 1) { seg += 1; start = null; if (seg >= keyframes.length - 1) { nudging = false; return; } }
        requestAnimationFrame(frame);
      }
      setTimeout(function () { if (nudging) requestAnimationFrame(frame); }, 500);
    };
  }

  /* ---------- gallery filter ---------- */
  var chips = document.querySelectorAll('.chip[data-filter]');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('#workGrid .tile'));
  var emptyMsg = document.querySelector('.work__empty');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { var on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      var shown = 0;
      tiles.forEach(function (tile) {
        var match = f === 'all' || tile.getAttribute('data-cat') === f;
        if (match) {
          shown += 1;
          tile.classList.remove('is-hidden');
          requestAnimationFrame(function () { requestAnimationFrame(function () { tile.classList.remove('is-fading'); }); });
        } else {
          tile.classList.add('is-fading');
          setTimeout(function () { if (tile.classList.contains('is-fading')) tile.classList.add('is-hidden'); }, reduceMotion ? 0 : 280);
        }
      });
      if (emptyMsg) emptyMsg.hidden = shown > 0;
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-item__q');
    var panel = item.querySelector('.faq-item__a');
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '';
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.is-open .faq-item__a').forEach(function (panel) { panel.style.maxHeight = panel.scrollHeight + 'px'; });
  });

  /* ---------- estimate form (demo: no backend) ---------- */
  var form = document.getElementById('estimateForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var ok = true, first = null;
      required.forEach(function (f) {
        var valid = f.checkValidity() && f.value.trim() !== '';
        f.style.borderColor = valid ? '' : '#8B4A22';
        if (!valid) { ok = false; if (!first) first = f; }
      });
      if (!ok) { first.focus(); return; }
      var success = form.querySelector('.form__success');
      form.classList.add('is-sent');
      success.hidden = false;
      success.focus && success.setAttribute('tabindex', '-1');
      success.focus();
    });
  }
})();
