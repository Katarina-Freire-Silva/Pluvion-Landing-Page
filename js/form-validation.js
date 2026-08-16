/**
 * form-validation.js
 * Regras de validação reutilizáveis, desacopladas da lógica de envio.
 */

window.Pluvion = window.Pluvion || {};

Pluvion.validators = {
  required(value) {
    return String(value ?? '').trim().length > 0;
  },

  email(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(String(value ?? '').trim());
  },

  minLength(value, length) {
    return String(value ?? '').trim().length >= length;
  },

  phone(value) {
    const digits = String(value ?? '').replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 13;
  },
};

/**
 * Valida um formulário HTML segundo um mapa de regras.
 * @param {HTMLFormElement} form
 * @param {Object} rules - { fieldName: [{ test: fn, message: string }] }
 * @returns {{ valid: boolean, errors: Object }}
 */
Pluvion.validateForm = function (form, rules) {
  const errors = {};
  let valid = true;

  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    const field = form.elements.namedItem(fieldName);
    if (!field) return;

    const value = field.type === 'checkbox' ? field.checked : field.value;

    for (const rule of fieldRules) {
      if (!rule.test(value)) {
        errors[fieldName] = rule.message;
        valid = false;
        break;
      }
    }
  });

  return { valid, errors };
};

Pluvion.showFieldErrors = function (form, errors) {
  form.querySelectorAll('.field').forEach((fieldWrap) => {
    fieldWrap.classList.remove('has-error');
  });

  Object.entries(errors).forEach(([fieldName, message]) => {
    const field = form.elements.namedItem(fieldName);
    if (!field) return;
    const fieldWrap = field.closest('.field');
    if (!fieldWrap) return;
    fieldWrap.classList.add('has-error');
    const errorEl = fieldWrap.querySelector('.field-error');
    if (errorEl) errorEl.textContent = message;
  });
};
