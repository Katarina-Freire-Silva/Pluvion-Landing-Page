/**
 * institutional-form.js
 * Controla o fluxo do formulário institucional: coleta, validação,
 * envio ao endpoint configurado, estados de loading/sucesso/erro.
 *
 * Fluxo:
 *   Usuário preenche → validação → botão enviar → loading →
 *   endpoint seguro (Cloud Function) → backend → Firebase →
 *   solicitação registrada → análise → aprovação/rejeição → e-mail.
 *
 * Este módulo NUNCA decide aprovação — isso pertence exclusivamente
 * ao backend. Aqui apenas registramos a tentativa de envio.
 */

window.Pluvion = window.Pluvion || {};

const RULES = {
  responsibleName: [{ test: Pluvion.validators.required, message: 'Informe o nome do responsável.' }],
  email: [
    { test: Pluvion.validators.required, message: 'Informe um e-mail.' },
    { test: Pluvion.validators.email, message: 'Informe um e-mail válido.' },
  ],
  phone: [
    { test: Pluvion.validators.required, message: 'Informe um telefone.' },
    { test: Pluvion.validators.phone, message: 'Informe um telefone válido.' },
  ],
  institutionName: [{ test: Pluvion.validators.required, message: 'Informe o nome da instituição.' }],
  institutionType: [{ test: Pluvion.validators.required, message: 'Selecione o tipo de instituição.' }],
  city: [{ test: Pluvion.validators.required, message: 'Informe a cidade.' }],
  state: [{ test: Pluvion.validators.required, message: 'Informe o estado.' }],
  consent: [{ test: (v) => v === true, message: 'É necessário aceitar para continuar.' }],
};

function setLoading(form, isLoading) {
  const submitBtn = form.querySelector('[type="submit"]');
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle('is-loading', isLoading);
}

function showStatus(form, type, message) {
  const statusEl = form.querySelector('.form-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.remove('form-status--success', 'form-status--error');
  statusEl.classList.add(`form-status--${type}`, 'is-visible');
}

function hideStatus(form) {
  const statusEl = form.querySelector('.form-status');
  if (!statusEl) return;
  statusEl.classList.remove('is-visible');
}

async function submitInstitutionalRequest(payload) {
  if (!Pluvion.CONFIG.institutionalRequestEndpoint) {
    // Endpoint ainda não configurado — não simulamos aprovação nem sucesso.
    throw new Error('ENDPOINT_NOT_CONFIGURED');
  }

  const response = await fetch(Pluvion.CONFIG.institutionalRequestEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('REQUEST_FAILED');
  }

  return response.json();
}

function buildPayload(form) {
  const data = new FormData(form);
  return {
    responsibleName: data.get('responsibleName')?.toString().trim(),
    email: data.get('email')?.toString().trim(),
    phone: data.get('phone')?.toString().trim(),
    institutionName: data.get('institutionName')?.toString().trim(),
    institutionType: data.get('institutionType')?.toString().trim(),
    city: data.get('city')?.toString().trim(),
    state: data.get('state')?.toString().trim(),
    deviceInterestCount: data.get('deviceInterestCount')?.toString().trim() || null,
    message: data.get('message')?.toString().trim() || null,
    consent: form.elements.namedItem('consent')?.checked ?? false,
    submittedAt: new Date().toISOString(),
  };
}

let isSubmitting = false;

function handleSubmit(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    hideStatus(form);

    const { valid, errors } = Pluvion.validateForm(form, RULES);
    Pluvion.showFieldErrors(form, errors);

    if (!valid) {
      const firstErrorField = form.querySelector('.field.has-error input, .field.has-error select, .field.has-error textarea');
      firstErrorField?.focus();
      return;
    }

    isSubmitting = true;
    setLoading(form, true);

    const payload = buildPayload(form);

    try {
      await submitInstitutionalRequest(payload);
      showStatus(
        form,
        'success',
        'Solicitação enviada. Nossa equipe vai analisar os dados e enviaremos um retorno por e-mail.'
      );
      form.reset();
    } catch (error) {
      if (error.message === 'ENDPOINT_NOT_CONFIGURED') {
        showStatus(
          form,
          'error',
          'O envio institucional ainda não está disponível neste ambiente. Tente novamente em breve.'
        );
      } else {
        showStatus(
          form,
          'error',
          'Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.'
        );
      }
    } finally {
      isSubmitting = false;
      setLoading(form, false);
    }
  });
}

Pluvion.initInstitutionalForm = function () {
  const form = document.querySelector('.institutional-form');
  if (!form) return;
  handleSubmit(form);
};
