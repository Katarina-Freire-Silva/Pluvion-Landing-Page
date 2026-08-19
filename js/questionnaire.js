/**
 * questionnaire.js
 * Controla o fluxo do questionário interativo: introdução, nome,
 * cinco perguntas.
 */

window.Pluvion = window.Pluvion || {};

const SCORE_MAPS = {
  historico: { nunca: 0, raramente: 1, 'as-vezes': 2, frequentemente: 3, sempre: 4 },
  seriedade: {
    'discordo-totalmente': 0,
    discordo: 1,
    neutro: 2,
    concordo: 3,
    'concordo-totalmente': 4,
  },
  interesse: { 'jeito-nenhum': 0, pouco: 1, talvez: 2, gostaria: 3, 'com-certeza': 4 },
};

const VULNERABLE_INCOME = new Set(['sem-renda', 'ate-1sm']);

function exposureTier(answers) {
  const score = SCORE_MAPS.historico[answers.historico] ?? 0;
  if (score <= 1) return 'baixa';
  if (score === 2) return 'media';
  return 'alta';
}

function attitudeTier(answers) {
  const concern = SCORE_MAPS.seriedade[answers.seriedade] ?? 0;
  const interest = SCORE_MAPS.interesse[answers.interesse] ?? 0;
  const avg = (concern + interest) / 2;
  if (avg < 1.5) return 'reativa';
  if (avg < 3) return 'atenta';
  return 'engajada';
}

function computeProfileKey(answers) {
  const vulnerable = VULNERABLE_INCOME.has(answers.renda) ? 'vul' : 'pad';
  return `${exposureTier(answers)}_${attitudeTier(answers)}_${vulnerable}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function buildQuestionHeading(question, name) {
  if (question.personalize && name) {
    return `${name}, ${question.question}`;
  }
  return question.plainQuestion;
}

Pluvion.initQuestionnaire = function () {
  const root = document.querySelector('[data-quiz]');
  if (!root) return;

  const questionsWrap = root.querySelector('[data-quiz-questions]');
  const progressBar = root.querySelector('[data-quiz-progress]');
  const startBtn = root.querySelector('[data-quiz-start]');
  const nameInput = root.querySelector('#nome-questionario');
  const nameNextBtn = root.querySelector('[data-quiz-next]');
  const restartBtn = root.querySelector('[data-quiz-restart]');
  const resultWrap = root.querySelector('[data-quiz-result]');

  if (!questionsWrap || !resultWrap) return;

  const state = { name: '', answers: {} };

  // ---- Monta as 5 perguntas dinamicamente a partir de questionnaire-data.js ----
  Pluvion.QUESTIONS.forEach((question, qIndex) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'etapa-questionario';
    stepEl.dataset.step = `q${qIndex + 1}`;
    stepEl.dataset.questionKey = question.key;

    const backBtn = qIndex > 0
      ? `<button type="button" class="voltar-etapa-questionario" data-quiz-back aria-label="Voltar para a pergunta anterior">
          <span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>
        </button>`
      : '';

    stepEl.innerHTML = `
      ${backBtn}
      <h3 class="pergunta-etapa-questionario" data-quiz-question-text></h3>
      <div class="opcoes-questionario" role="group" aria-label="Alternativas">
        ${question.options
          .map(
            (opt) =>
              `<button type="button" class="opcao-questionario" data-key="${question.key}" data-value="${opt.value}">${opt.label}</button>`
          )
          .join('')}
      </div>
    `;

    questionsWrap.appendChild(stepEl);
  });

  const steps = Array.from(root.querySelectorAll('.etapa-questionario'));
  const totalQuestions = Pluvion.QUESTIONS.length;
  let currentIndex = 0; // índice dentro de `etapas`

  function updateProgress() {
    const step = steps[currentIndex];
    const stepName = step?.dataset.step ?? '';
    if (stepName.startsWith('q')) {
      const qNumber = Number(stepName.slice(1));
      progressBar.style.width = `${(qNumber / totalQuestions) * 100}%`;
    } else if (stepName === 'result') {
      progressBar.style.width = '100%';
    } else {
      progressBar.style.width = '0%';
    }
  }

  function refreshQuestionText() {
    const step = steps[currentIndex];
    const key = step?.dataset.questionKey;
    if (!key) return;
    const question = Pluvion.QUESTIONS.find((q) => q.key === key);
    const heading = step.querySelector('[data-quiz-question-text]');
    if (question && heading) {
      heading.textContent = buildQuestionHeading(question, state.name);
    }
  }

  function goToIndex(newIndex) {
    steps[currentIndex]?.classList.remove('ativo');
    currentIndex = Math.max(0, Math.min(newIndex, steps.length - 1));
    steps[currentIndex]?.classList.add('ativo');
    refreshQuestionText();
    updateProgress();
  }

  function goNext() {
    goToIndex(currentIndex + 1);
  }

  function goBack() {
    goToIndex(currentIndex - 1);
  }

  // ---- Passo intro ----
  startBtn?.addEventListener('click', goNext);

  // ---- Passo nome ----
  nameNextBtn?.addEventListener('click', () => {
    state.name = capitalize((nameInput?.value || '').trim());
    goNext();
  });

  nameInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameNextBtn?.click();
    }
  });

  // ---- Perguntas: clique em uma opção responde e avança ----
  questionsWrap.addEventListener('click', (event) => {
    const optionBtn = event.target.closest('.opcao-questionario');
    if (optionBtn) {
      const { key, value } = optionBtn.dataset;
      state.answers[key] = value;

      const siblings = optionBtn.parentElement.querySelectorAll('.opcao-questionario');
      siblings.forEach((btn) => btn.classList.remove('selecionado'));
      optionBtn.classList.add('selecionado');

      window.setTimeout(() => {
        const isLastQuestion = Pluvion.QUESTIONS.every((q) => state.answers[q.key] !== undefined);
        if (isLastQuestion) {
          renderResult();
          goNext();
        } else {
          goNext();
        }
      }, 320);
      return;
    }

    const backBtn = event.target.closest('[data-quiz-back]');
    if (backBtn) {
      goBack();
    }
  });

  // ---- Resultado ----
  function renderResult() {
    const profileKey = computeProfileKey(state.answers);
    const profile = Pluvion.PROFILES[profileKey];
    if (!profile) return;

    const name = state.name || 'Você';
    const greetingName = state.name || 'você';

    resultWrap.innerHTML = `
      <h3 class="titulo-resultado-questionario">${profile.title}</h3>
      <p class="texto-resultado-questionario">${profile.buildText(name)}</p>
      <div class="estatistica-resultado-questionario">
        <span class="valor-estatistica-resultado">${profile.stat.value}</span>
        <p class="contexto-estatistica-resultado">${profile.stat.context}</p>
        <span class="fonte-resultado-questionario">
          Fonte: ${profile.stat.source}, ${profile.stat.year}
          <a href="${profile.stat.url}" target="_blank" rel="noopener noreferrer">Ver fonte</a>
        </span>
      </div>
      <p class="agradecimento-questionario">Obrigado por compartilhar um pouco da sua realidade com ${greetingName === 'você' ? 'a gente' : 'o Pluvion'}, ${greetingName}.</p>
    `;
  }

  // ---- Refazer ----
  restartBtn?.addEventListener('click', () => {
    state.name = '';
    state.answers = {};
    if (nameInput) nameInput.value = '';
    questionsWrap.querySelectorAll('.opcao-questionario.selecionado').forEach((btn) => {
      btn.classList.remove('selecionado');
    });
    goToIndex(0);
  });

  updateProgress();
};
