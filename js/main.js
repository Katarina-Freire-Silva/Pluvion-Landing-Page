/**
 * main.js
 * Ponto de entrada da Landing Page Pluvion.
 * Inicializa cada módulo — a lógica em si vive nos respectivos arquivos.
 */

import { PLUVION_CONFIG } from './config.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initCarousel } from './carousel.js';
import { initCharts } from './charts.js';
import { initInstitutionalForm } from './institutional-form.js';

/**
 * Liga os links de Produções (monografia e vídeo pitch) aos caminhos
 * configuráveis em config.js. Enquanto não houver um valor real
 * configurado, o link fica desabilitado visualmente em vez de apontar
 * para um destino inexistente.
 */
function initProductionLinks() {
  const monographLink = document.getElementById('monograph-download');
  if (monographLink) {
    if (PLUVION_CONFIG.monographUrl) {
      monographLink.href = PLUVION_CONFIG.monographUrl;
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
    if (PLUVION_CONFIG.pitchVideoUrl) {
      videoPitchLink.href = PLUVION_CONFIG.pitchVideoUrl;
    } else {
      videoPitchLink.addEventListener('click', (event) => {
        event.preventDefault();
      });
      videoPitchLink.title = 'Vídeo pitch ainda não disponível';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initCarousel();
  initCharts();
  initInstitutionalForm();
  initProductionLinks();
});
