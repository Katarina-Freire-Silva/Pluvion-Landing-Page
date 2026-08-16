/**
 * carousel.js
 * Carrossel de notícias — controla navegação anterior/próximo,
 * indicadores, autoplay opcional, pausa no hover, teclado, swipe
 * e acessibilidade.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initCarousel = function () {
  const root = document.querySelector('.news-carousel');
  if (!root) return;

  const track = root.querySelector('.news-carousel__track');
  const slides = Array.from(root.querySelectorAll('.news-card'));
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const dotsWrap = root.querySelector('.news-carousel__dots');

  if (!track || slides.length === 0) return;

  let index = 0;
  let autoplayTimer = null;
  const total = slides.length;

  // ---- Indicadores ----
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para notícia ${i + 1} de ${total}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  function goTo(newIndex) {
    index = (newIndex + total) % total;
    update();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  prevBtn?.addEventListener('click', () => {
    prev();
    restartAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    next();
    restartAutoplay();
  });

  // ---- Teclado ----
  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      next();
      restartAutoplay();
    }
    if (event.key === 'ArrowLeft') {
      prev();
      restartAutoplay();
    }
  });

  // ---- Swipe (touch) ----
  let touchStartX = 0;
  track.addEventListener(
    'touchstart',
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    'touchend',
    (event) => {
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) {
        delta < 0 ? next() : prev();
        restartAutoplay();
      }
    },
    { passive: true }
  );

  // ---- Autoplay com pausa no hover/foco ----
  function startAutoplay() {
    if (total <= 1 || !Pluvion.CONFIG.carouselAutoplayInterval) return;
    autoplayTimer = window.setInterval(next, Pluvion.CONFIG.carouselAutoplayInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  root.addEventListener('mouseenter', stopAutoplay);
  root.addEventListener('mouseleave', startAutoplay);
  root.addEventListener('focusin', stopAutoplay);
  root.addEventListener('focusout', startAutoplay);

  update();
  startAutoplay();
};
