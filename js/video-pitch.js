/**
 * video-pitch.js
 * Toca o vídeo pitch automaticamente quando está na seção Produções.
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
          });
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 } 
  );

  observer.observe(video);
};