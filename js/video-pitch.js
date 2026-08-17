/**
 * video-pitch.js
 * Toca o vídeo pitch automaticamente quando a seção Produções entra
 * na tela, e pausa quando sai — em vez de tocar assim que a página carrega.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initVideoPitch = function () {
  const video = document.querySelector('.video-pitch video');
  if (!video) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Navegador bloqueou o autoplay — o usuário ainda pode
            // dar play manualmente pelos controles nativos.
          });
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 } // toca quando pelo menos 50% do vídeo está visível
  );

  observer.observe(video);
};