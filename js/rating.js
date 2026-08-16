/**
 * rating.js
 * Widget de avaliação por estrelas (Google Material Symbols) com
 * mensagem flutuante de agradecimento — sem usar alert().
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initRating = function () {
  const widget = document.querySelector('[data-star-rating]');
  const submitBtn = document.querySelector('[data-rating-submit]');
  const toast = document.querySelector('[data-rating-toast]');
  if (!widget || !submitBtn) return;

  const stars = Array.from(widget.querySelectorAll('.star-rating__star'));
  let selected = 0;
  let toastTimer = null;

  function paint(value) {
    stars.forEach((star, i) => {
      const filled = i < value;
      star.classList.toggle('is-filled', filled);
      star.setAttribute('aria-checked', i === value - 1 ? 'true' : 'false');
    });
  }

  stars.forEach((star, i) => {
    const value = i + 1;
    star.addEventListener('mouseenter', () => paint(value));
    star.addEventListener('focus', () => paint(value));
    star.addEventListener('mouseleave', () => paint(selected));
    star.addEventListener('blur', () => paint(selected));
    star.addEventListener('click', () => {
      selected = value;
      paint(selected);
    });
  });

  function showToast() {
    if (!toast) return;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3600);
  }

  submitBtn.addEventListener('click', () => {
    if (selected === 0) {
      widget.classList.add('is-shake');
      window.setTimeout(() => widget.classList.remove('is-shake'), 500);
      return;
    }
    showToast();
  });
};
