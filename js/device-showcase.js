/**
 * device-showcase.js
 * Vitrine do dispositivo SAE: vídeos do dispositivo em loop.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.initDeviceShowcase = function () {
  const root = document.querySelector('[data-device-showcase]');
  if (!root) return;

  const imageEl = root.querySelector('[data-showcase-image]');
  const videoEl = root.querySelector('[data-showcase-video]');

  const videos = [
    'video/sae-video-1.mp4',
    'video/sae-video-2.mp4',
    'video/sae-video-3.mp4',
  ];

  const IMAGE_DURATION = 4000; // ms que a imagem fica visível antes de começar os vídeos
  let index = 0;
  let imageTimer = null;

  function showImage() {
    videoEl.pause();
    videoEl.classList.remove('is-active');
    imageEl.classList.add('is-active');
    window.clearTimeout(imageTimer);
    imageTimer = window.setTimeout(playNextVideo, IMAGE_DURATION);
  }

  function playNextVideo() {
    if (!videos.length) return;
    videoEl.src = videos[index];
    videoEl.load();
    imageEl.classList.remove('is-active');
    videoEl.classList.add('is-active');
    videoEl.play().catch(() => {
      // Se o navegador bloquear o autoplay, volta pra imagem em vez de travar.
      showImage();
    });
  }

  videoEl.addEventListener('ended', () => {
    index += 1;
    if (index >= videos.length) {
      index = 0;
      showImage(); // completou o ciclo — volta pra imagem
    } else {
      playNextVideo();
    }
  });

  showImage();
};