/**
 * rating.js
 * Widget de avaliação por estrelas com mensagem flutuante.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initRating = function () {
  const widget = document.querySelector('[data-star-rating]');
  const submitBtn = document.querySelector('[data-rating-submit]');
  const toast = document.querySelector('[data-rating-toast]');
  if (!widget || !submitBtn) return;

  const stars = Array.from(widget.querySelectorAll('.estrela-avaliacao'));
  let selected = 0;
  let toastTimer = null;

  function paint(value) {
    stars.forEach((star, i) => {
      const filled = i < value;
      star.classList.toggle('preenchido', filled);
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
    toast.classList.add('visivel');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('visivel');
    }, 3600);
  }

  submitBtn.addEventListener('click', () => {
    if (selected === 0) {
      widget.classList.add('tremendo');
      window.setTimeout(() => widget.classList.remove('tremendo'), 500);
      return;
    }
    showToast();
  });
};
