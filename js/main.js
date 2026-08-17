/**
 * main.js
 * Ponto de entrada da Landing Page Pluvion.
 * Inicializa cada módulo — a lógica em si vive nos respectivos arquivos.
 *
 * Este arquivo deve ser o ÚLTIMO <script> carregado no index.html, depois
 * de todos os outros módulos (config.js, navigation.js, animations.js,
 * carousel.js, charts.js, form-validation.js, institutional-form.js,
 * questionnaire-data.js, questionnaire.js, purpose.js, rating.js), já que
 * cada um deles registra suas funções em window.Pluvion e main.js é quem
 * efetivamente as chama.
 */

window.Pluvion = window.Pluvion || {};

/**
 * Liga os links de Produções (monografia e vídeo pitch) aos caminhos
 * configuráveis em config.js. Enquanto não houver um valor real
 * configurado, o link fica desabilitado visualmente em vez de apontar
 * para um destino inexistente.
 */
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
  Pluvion.initVideoPitch(); // NOVA LINHA
});
