/**
 * main.js
 * Ponto de entrada da Landing Page Pluvion.
 * Inicializa cada módulo — a lógica em si vive nos respectivos arquivos.
*/

window.Pluvion = window.Pluvion || {};

function initProductionLinks() {
  const monographLink = document.getElementById('monograph-download');
  if (monographLink) {
    if (Pluvion.CONFIG.monographUrl) {
      monographLink.href = Pluvion.CONFIG.monographUrl;
    } else {
      monographLink.setAttribute('aria-disabled', 'true');
      monographLink.addEventListener('click', (event) => {
        event.preventDefault();
      });
      monographLink.title = 'Monografia ainda não disponível para download';
    }
  }

  const videoPitchLink = document.querySelector('.video-pitch');
  if (videoPitchLink) {
    if (Pluvion.CONFIG.pitchVideoUrl) {
      videoPitchLink.href = Pluvion.CONFIG.pitchVideoUrl;
    } else {
      videoPitchLink.addEventListener('click', (event) => {
        event.preventDefault();
      });
      videoPitchLink.title = 'Vídeo pitch ainda não disponível';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Pluvion.initNavigation();
  Pluvion.initAnimations();
  Pluvion.initCarousel();
  Pluvion.initCharts();
  Pluvion.initInstitutionalForm();
  initProductionLinks();
  Pluvion.initQuestionnaire();
  Pluvion.initPurposeCards();
  Pluvion.initRating();
  Pluvion.initVideoPitch(); 
  Pluvion.initDeviceShowcase(); 
});
