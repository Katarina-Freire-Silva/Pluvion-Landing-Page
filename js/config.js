/**
 * config.js
 * Configurações centrais do projeto Pluvion.
 * Nenhuma credencial privada deve ser colocada aqui — apenas o endpoint
 * público de entrada, que por sua vez é responsável por validar e
 * encaminhar a solicitação ao backend (Cloud Function).
 */

export const PLUVION_CONFIG = {
  // SUBSTITUIR pelo endpoint real do backend (Cloud Function / API) quando
  // estiver disponível. Enquanto vazio, o formulário informa ao usuário
  // que o envio não está disponível no momento, em vez de simular sucesso.
  institutionalRequestEndpoint: '',

  environment: 'development',

  // Tempo (ms) de rotação automática do carrossel de notícias.
  carouselAutoplayInterval: 6000,

  // Caminho configurável para a monografia — SUBSTITUIR pelo PDF definitivo.
  monographUrl: '',

  // Caminho configurável para o vídeo pitch — SUBSTITUIR pela URL definitiva.
  pitchVideoUrl: '',
};
