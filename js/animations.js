/**
 * animations.js
 * Animações de entrada das seções (fade + translate) ao entrar na viewport.
 * Respeita prefers-reduced-motion e usa IntersectionObserver.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initAnimations = function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
    observer.observe(el);
  });
};

