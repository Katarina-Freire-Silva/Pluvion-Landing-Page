window.Pluvion = window.Pluvion || {};

/**
 * questionnaire-data.js
 * Banco de perguntas e sínteses personalizadas do questionário interativo.
*/

Pluvion.SALARIO_MINIMO_2026 = 1621;

Pluvion.QUESTIONS = [
  {
    key: 'idade',
    personalize: true,
    question: 'quantos anos você tem?',
    plainQuestion: 'Quantos anos você tem?',
    options: [
      { value: 'ate-12', label: 'Até 12 anos' },
      { value: '13-17', label: '13 a 17 anos' },
      { value: '18-24', label: '18 a 24 anos' },
      { value: '25-34', label: '25 a 34 anos' },
      { value: '35-44', label: '35 a 44 anos' },
      { value: '45-59', label: '45 a 59 anos' },
      { value: '60-mais', label: '60 anos ou mais' },
    ],
  },
  {
    key: 'renda',
    personalize: false,
    plainQuestion: 'Qual é a faixa de renda mensal da sua família?',
    options: [
      { value: 'sem-renda', label: 'Não possuo renda' },
      { value: 'ate-1sm', label: `Até 1 salário mínimo (até R$ ${Pluvion.SALARIO_MINIMO_2026.toLocaleString('pt-BR')})` },
      { value: '1-2sm', label: 'De 1 a 2 salários mínimos' },
      { value: '2-3sm', label: 'De 2 a 3 salários mínimos' },
      { value: '3-5sm', label: 'De 3 a 5 salários mínimos' },
      { value: 'acima-5sm', label: 'Acima de 5 salários mínimos' },
    ],
  },
  {
    key: 'historico',
    personalize: true,
    question: 'com que frequência a sua região enfrenta enchentes ou alagamentos?',
    plainQuestion: 'Com que frequência a sua região enfrenta enchentes ou alagamentos?',
    options: [
      { value: 'nunca', label: 'Nunca' },
      { value: 'raramente', label: 'Raramente' },
      { value: 'as-vezes', label: 'Às vezes' },
      { value: 'frequentemente', label: 'Frequentemente' },
      { value: 'sempre', label: 'Sempre / é recorrente' },
    ],
  },
  {
    key: 'seriedade',
    personalize: false,
    plainQuestion: 'Você entende que enchentes e alagamentos precisam ser tratados com maior seriedade no Brasil?',
    options: [
      { value: 'discordo-totalmente', label: 'Discordo totalmente' },
      { value: 'discordo', label: 'Discordo' },
      { value: 'neutro', label: 'Nem concordo nem discordo' },
      { value: 'concordo', label: 'Concordo' },
      { value: 'concordo-totalmente', label: 'Concordo totalmente' },
    ],
  },
  {
    key: 'interesse',
    personalize: true,
    question: 'você gostaria de ter um aplicativo seguro como o Pluvion para receber notificações filtradas para a sua região?',
    plainQuestion: 'Você gostaria de ter um aplicativo seguro como o Pluvion para receber notificações filtradas para a sua região?',
    options: [
      { value: 'jeito-nenhum', label: 'De jeito nenhum' },
      { value: 'pouco', label: 'Pouco' },
      { value: 'talvez', label: 'Talvez' },
      { value: 'gostaria', label: 'Gostaria' },
      { value: 'com-certeza', label: 'Com certeza' },
    ],
  },
];

/* ---- Dados reais usados nas sínteses ---- */
const STAT_POPULACAO_8M = {
  value: 'Mais de 8,2 milhões',
  context:
    'de pessoas vivem em áreas com risco de enchentes, enxurradas e deslizamentos, em 872 municípios brasileiros.',
  source: 'IBGE e Cemaden — base BATER, dados do Censo 2010',
  year: '2018',
  url: 'https://www.ibge.gov.br/geociencias/informacoes-ambientais/estudos-ambientais/21538-populacao-em-areas-de-risco-no-brasil.html',
};

const STAT_POPULACAO_9_5M = {
  value: '9,5 milhões',
  context:
    'de brasileiros vivem hoje em áreas de risco sujeitas a deslizamentos, enchentes e outros desastres climáticos, segundo a estimativa mais recente do Cemaden.',
  source: 'Cemaden, via Agência Brasil',
  year: '2022',
  url: 'https://agenciabrasil.ebc.com.br/radioagencia-nacional/geral/audio/2022-02/95-milhoes-de-brasileiros-moram-em-areas-de-risco',
};

const STAT_PROPORCAO_INUNDACAO = {
  value: '25%',
  context:
    'das famílias mapeadas em áreas de risco no Brasil vivem especificamente sob risco de inundações e enxurradas — o restante está em áreas de deslizamento de terra.',
  source: 'Cemaden e IBGE, via Agência Brasil',
  year: '2022',
  url: 'https://agenciabrasil.ebc.com.br/radioagencia-nacional/geral/audio/2022-02/95-milhoes-de-brasileiros-moram-em-areas-de-risco',
};

const STAT_OCORRENCIAS_HIDROLOGICAS = {
  value: '68%',
  context:
    'das ocorrências de desastre registradas pelo Cemaden em 2024 tiveram origem hidrológica — ou seja, enchentes e enxurradas.',
  source: 'Cemaden, via Agência Gov',
  year: '2025',
  url: 'https://agenciagov.ebc.com.br/noticias/202501/cemaden-registra-recorde-de-alertas-e-mais-de-1-6-mil-ocorrencias-de-desastre-no-brasil-em-2024',
};

const STAT_ALERTA_INEFICAZ = {
  value: 'Mesmo com aviso prévio',
  context:
    'um estudo do Cemaden sobre os deslizamentos de São Sebastião (SP) mostrou que a resposta da comunidade a alertas emitidos com antecedência foi mínima — evidenciando os limites dos sistemas de alerta genéricos atuais.',
  source: 'Cemaden, via Agência FAPESP',
  year: '2024',
  url: 'https://agencia.fapesp.br/sistemas-de-alerta-e-planos-para-evitar-desastres-por-chuvas-extremas-ainda-sao-falhos-aponta-estudo/51557',
};



Pluvion.PROFILES = {
  'baixa_reativa_pad': {
    title: 'Uma realidade distante, mas não alheia',
    buildText: (name) =>
      `${name}, mesmo sem enchentes frequentes na sua região, essa realidade é próxima da de milhões de brasileiros.`,
    stat: STAT_POPULACAO_8M,
  },
  'baixa_reativa_vul': {
    title: 'Uma realidade que pode estar mais perto do que parece',
    buildText: (name) =>
      `${name}, a sua região pode não alagar com frequência, mas o cenário de renda mais apertada é o mesmo que caracteriza boa parte das famílias em áreas de risco no Brasil.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'baixa_atenta_pad': {
    title: 'Atenção mesmo sem exposição direta',
    buildText: (name) =>
      `${name}, você reconhece a seriedade do problema mesmo sem vivê-lo de perto — uma percepção que ajuda a explicar por que o tema precisa de mais visibilidade.`,
    stat: STAT_POPULACAO_9_5M,
  },
  'baixa_atenta_vul': {
    title: 'Consciência que atravessa a distância',
    buildText: (name) =>
      `${name}, sua região não é a mais afetada, mas sua atenção ao tema — somada ao seu contexto de renda — reflete a realidade de muitas famílias brasileiras vulneráveis.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'baixa_engajada_pad': {
    title: 'Interesse que vai além da própria realidade',
    buildText: (name) =>
      `${name}, seu interesse em tecnologia de alerta mesmo sem viver o problema de perto mostra como a causa pode mobilizar além de quem é diretamente afetado.`,
    stat: STAT_POPULACAO_9_5M,
  },
  'baixa_engajada_vul': {
    title: 'Engajamento com peso social',
    buildText: (name) =>
      `${name}, seu interesse pela solução, combinado ao seu contexto de renda, é exatamente o tipo de perfil que sistemas de alerta acessíveis buscam alcançar primeiro.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'media_reativa_pad': {
    title: 'Um risco que já bateu à porta algumas vezes',
    buildText: (name) =>
      `${name}, alagamentos ocasionais na sua região já são parte da paisagem — um padrão que aparece com frequência crescente nos registros nacionais.`,
    stat: STAT_OCORRENCIAS_HIDROLOGICAS,
  },
  'media_reativa_vul': {
    title: 'Exposição moderada, vulnerabilidade real',
    buildText: (name) =>
      `${name}, sua região enfrenta alagamentos de vez em quando, e o seu contexto de renda pode tornar cada episódio ainda mais difícil de recuperar.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'media_atenta_pad': {
    title: 'Percepção alinhada com a experiência',
    buildText: (name) =>
      `${name}, sua região já viveu alagamentos às vezes, e isso parece ter moldado sua visão sobre a seriedade do problema.`,
    stat: STAT_OCORRENCIAS_HIDROLOGICAS,
  },
  'media_atenta_vul': {
    title: 'Entre a exposição e a renda, uma dupla pressão',
    buildText: (name) =>
      `${name}, enfrentar alagamentos ocasionais já é difícil — somado ao contexto de renda, sua realidade ilustra por que o problema exige respostas específicas por região.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'media_engajada_pad': {
    title: 'De espectador a interessado ativo',
    buildText: (name) =>
      `${name}, sua experiência com alagamentos ocasionais parece ter despertado um interesse real por soluções de monitoramento — exatamente a intenção do Pluvion.`,
    stat: STAT_OCORRENCIAS_HIDROLOGICAS,
  },
  'media_engajada_vul': {
    title: 'Interesse construído na prática',
    buildText: (name) =>
      `${name}, entre alagamentos ocasionais e um orçamento mais apertado, seu interesse por um sistema de alerta acessível faz todo o sentido.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'alta_reativa_pad': {
    title: 'Uma convivência que pede mais atenção',
    buildText: (name) =>
      `${name}, enchentes frequentes já fazem parte da sua rotina — mesmo assim, ainda há espaço para que o tema receba a seriedade que merece.`,
    stat: STAT_ALERTA_INEFICAZ,
  },
  'alta_reativa_vul': {
    title: 'Exposição alta, atenção que pode crescer',
    buildText: (name) =>
      `${name}, conviver com enchentes recorrentes e um orçamento apertado é justamente o cenário que motivou a criação do Pluvion.`,
    stat: STAT_POPULACAO_8M,
  },
  'alta_atenta_pad': {
    title: 'Quem vive o problema, entende o problema',
    buildText: (name) =>
      `${name}, sua convivência frequente com enchentes explica sua percepção clara sobre a seriedade do tema — uma realidade compartilhada por milhões.`,
    stat: STAT_POPULACAO_8M,
  },
  'alta_atenta_vul': {
    title: 'Na linha de frente, com menos margem',
    buildText: (name) =>
      `${name}, enfrentar enchentes com frequência e um orçamento mais restrito é a combinação que mais expõe famílias brasileiras — e a que mais precisa de alertas confiáveis.`,
    stat: STAT_PROPORCAO_INUNDACAO,
  },
  'alta_engajada_pad': {
    title: 'De quem vive o problema para quem quer a solução',
    buildText: (name) =>
      `${name}, sua experiência direta com enchentes frequentes e seu interesse por um app como o Pluvion mostram exatamente por que sistemas de alerta locais fazem diferença.`,
    stat: STAT_ALERTA_INEFICAZ,
  },
  'alta_engajada_vul': {
    title: 'O perfil que mais representa a urgência do Pluvion',
    buildText: (name) =>
      `${name}, sua realidade — enchentes frequentes, orçamento apertado e interesse real em uma solução — é exatamente a que motivou a criação do Pluvion desde o início.`,
    stat: STAT_POPULACAO_9_5M,
  },
};
