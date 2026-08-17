/**
 * navigation.js
 * Scroll suave por âncora, estado ativo do menu, comportamento do header
 * durante o scroll e menu mobile.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initNavigation = function () {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = Array.from(document.querySelectorAll('.main-nav__link'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  // ---- Header sticky com sombra ao rolar ----
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Menu mobile ----
  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    document.body.style.removeProperty('overflow');
  };

  const openMenu = () => {
    toggle?.setAttribute('aria-expanded', 'true');
    nav?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // ---- Estado ativo do menu conforme a seção visível ----
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
};
