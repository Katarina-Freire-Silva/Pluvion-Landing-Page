/**
 * config.js
 * Configurações centrais do projeto Pluvion.
 *
 * Observação sobre arquitetura: este projeto usa um namespace global
 * (window.Pluvion) em vez de ES Modules (import/export). Isso é proposital —
 * scripts com type="module" são bloqueados pelo Chrome/Edge/Firefox quando
 * a página é aberta direto do disco (file://), e este projeto precisa
 * funcionar tanto servido por um servidor quanto aberto por duplo clique.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.CONFIG = {
  // SUBSTITUIR pelo endpoint real do backend (Cloud Function / API) quando
  // estiver disponível. Enquanto vazio, o formulário informa ao usuário
  // que o envio não está disponível no momento, em vez de simular sucesso.
  institutionalRequestEndpoint: '',

  environment: 'development',

  // Tempo (ms) de rotação automática do carrossel de notícias.
  carouselAutoplayInterval: 9000,

  // Caminho configurável para a monografia.
  monographUrl: 'https://drive.google.com/uc?export=download&id=1PMpwtRQvRNUx0hpPj3uCVZ_VY9FQH76w',
  // Caminho configurável para o vídeo pitch.
  pitchVideoUrl: '',
};
