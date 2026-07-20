/* VN Creative clone — interactions */
(function () {
  'use strict';

  // Mobile menu
  var burger = document.getElementById('burger');
  var nav = document.getElementById('navMenu');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Back-to-top
  var toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    if (toTop) toTop.classList.toggle('show', window.scrollY > 500);
  });

  // Animated counters
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.querySelector('.accent') ? el.querySelector('.accent').outerHTML : '';
    var start = 0, dur = 1600, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.innerHTML = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { io.observe(c); });
  }

  // FAQ: single-open accordion
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (o) { if (o !== item) o.open = false; });
      }
    });
  });
})();
