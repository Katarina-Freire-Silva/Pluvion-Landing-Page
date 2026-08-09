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

import { PLUVION_CONFIG } from './config.js';
import { validators, validateForm, showFieldErrors } from './form-validation.js';

const RULES = {
  responsibleName: [{ test: validators.required, message: 'Informe o nome do responsável.' }],
  email: [
    { test: validators.required, message: 'Informe um e-mail.' },
    { test: validators.email, message: 'Informe um e-mail válido.' },
  ],
  phone: [
    { test: validators.required, message: 'Informe um telefone.' },
    { test: validators.phone, message: 'Informe um telefone válido.' },
  ],
  institutionName: [{ test: validators.required, message: 'Informe o nome da instituição.' }],
  institutionType: [{ test: validators.required, message: 'Selecione o tipo de instituição.' }],
  city: [{ test: validators.required, message: 'Informe a cidade.' }],
  state: [{ test: validators.required, message: 'Informe o estado.' }],
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
  if (!PLUVION_CONFIG.institutionalRequestEndpoint) {
    // Endpoint ainda não configurado — não simulamos aprovação nem sucesso.
    throw new Error('ENDPOINT_NOT_CONFIGURED');
  }

  const response = await fetch(PLUVION_CONFIG.institutionalRequestEndpoint, {
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

    const { valid, errors } = validateForm(form, RULES);
    showFieldErrors(form, errors);

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

export function initInstitutionalForm() {
  const form = document.querySelector('.institutional-form');
  if (!form) return;
  handleSubmit(form);
}
