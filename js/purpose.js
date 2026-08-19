/**
 * purpose.js
 * Interatividade dos cards da seção "Propósito" — expandem ao clicar,
 * focar (teclado) ou passar o mouse, revelando o texto complementar.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initPurposeCards = function () {
  const cards = document.querySelectorAll('[data-purpose-card]');
  if (!cards.length) return;

  cards.forEach((card) => {
    const toggle = () => card.classList.toggle('expandido');

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
};
