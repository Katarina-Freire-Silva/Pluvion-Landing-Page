/**
 * animations.js
 * Animações de entrada das seções (fade + translate) ao entrar na viewport.
 * Respeita prefers-reduced-motion e usa IntersectionObserver.
 */

export function initAnimations() {
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

  animateHeroGauge();
}

/**
 * Anima a barra de nível do card de status do Hero, com um valor
 * ilustrativo. É uma representação visual, não uma leitura real.
 */
function animateHeroGauge() {
  const fill = document.querySelector('.status-card__gauge-fill');
  if (!fill) return;

  const targetHeight = fill.dataset.level || '22%';
  requestAnimationFrame(() => {
    fill.style.height = targetHeight;
  });
}
