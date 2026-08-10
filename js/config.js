/**
 * config.js
 * Configurações centrais do projeto Pluvion.
 */

export const PLUVION_CONFIG = {
  // SUBSTITUIR pelo endpoint real do backend (Cloud Function / API) quando
  // estiver disponível. Enquanto vazio, o formulário informa ao usuário
  // que o envio não está disponível no momento, em vez de simular sucesso.
  institutionalRequestEndpoint: '',

  environment: 'development',

  // Tempo (ms) de rotação automática do carrossel de notícias.
  carouselAutoplayInterval: 9000,

  // Caminho configurável para a monografia — SUBSTITUIR pelo PDF definitivo.
  monographUrl: 'https://drive.google.com/uc?export=download&id=1PMpwtRQvRNUx0hpPj3uCVZ_VY9FQH76w',
  // Caminho configurável para o vídeo pitch — SUBSTITUIR pela URL definitiva.
  pitchVideoUrl: '',
};
