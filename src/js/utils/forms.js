import { closeModal } from './modals';

export const addError = (field, form) => {
  field.classList.remove('_is-filled');
  field.classList.add('_has-error');
  form.classList.add('_has-error');
};

export const removeError = (field, form) => {
  if (field.classList.contains('_has-error')) {
    field.classList.remove('_has-error');
    form.classList.remove('_has-error');
  }
};

if (document.querySelectorAll('[data-field]').length) {
  document.querySelectorAll('[data-field]').forEach(field => {
    const input = field.querySelector('input');

    input.addEventListener('input', function () {
      if (input.dataset.mask === 'text') {
        input.value = input.value.replace(/[^a-zA-Zа-яА-я]+/g, '');
      }
      removeError(field, field.closest('form'));
    });

    input.addEventListener('focusin', function () {
      field.classList.remove('_is-filled');
    });
    input.addEventListener('focusout', function () {
      if (
        !field.classList.contains('_has-error') &&
        input.value &&
        input.value.length
      ) {
        field.classList.add('_is-filled');
      }
    });
  });
}

if (document.querySelectorAll('[data-form-validate]').length) {
  document.querySelectorAll('[data-form-validate]').forEach(form => {
    form.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll('[data-required]');
        const modal = document.querySelector('.modal_show.modal');
        const successAlert = document.querySelector('.form-message_success');
        const alert = document.querySelector('.form-message_alert');

        if (inputs.length) {
          inputs.forEach(input => {
            const field = input.closest('[data-field]');
            if (input.value && input.value.length) {
              const domen =
                input.value.split('@')[1] &&
                input.value.split('@')[1].split('.')[1];

              if (field) {
                if (input.type === 'checkbox') {
                  if (!input.checked)
                    !input.checked && addError(field, field.closest('form'));
                } else if (!input.value.length) {
                  addError(field, field.closest('form'));
                }

                if (input.hasAttribute('data-mail-mask')) {
                  if (
                    (domen !== 'com' && domen !== 'ru') ||
                    field.classList.contains('_incomplete')
                  ) {
                    addError(field, field.closest('form'));

                    if (
                      alert &&
                      !document.querySelector(
                        '.form-message_success._form-sent'
                      )
                    ) {
                      alert.classList.add('_show-alert');
                      setTimeout(() => {
                        alert.classList.remove('_show-alert');
                      }, 5000);
                    }
                  } else {
                    removeError(field, field.closest('form'));
                    field.classList.add('_is-filled');
                  }
                }

                if (input.hasAttribute('data-name-mask')) {
                  console.log(/^\b\w+\b \b\w+\b$/.test(input.value));
                }
              }
            } else {
              field && addError(field, field.closest('form'));
            }
          });
        }

        if (
          form.querySelector('._has-error') ||
          inputs.length !== form.querySelectorAll('._is-filled').length
        ) {
          const message = form.querySelector('.form-message_message');
          const placeholder =
            form.querySelector('.field._has-error input') &&
            form.querySelector('.field._has-error input').placeholder;

          if (message) {
            const htm = '<span class="form-message__icon"></span>';
            const setText = txt => {
              message.innerHTML = `
               ${htm}
               ${txt}
              `;
            };

            if (placeholder) {
              if (placeholder.includes('Ваше имя')) {
                setText(
                  'Пожалуйста, проверьте правильность написания вашего имени. Оно может содержать только буквы и пробелы.'
                );
              } else if (placeholder.includes('телефон')) {
                setText(
                  'Пожалуйста, проверьте правильность заполнения телефона, он должен соответствовать образцу +7 (999) 999 — 99 — 99'
                );
              } else if (placeholder.includes('email')) {
                setText('Пожалуйста, проверьте правильность написания почты');
              }
            } else {
              if (form.querySelector('.checkbox._has-error input')) {
                setText(
                  'Пожалуйста, дайте согласие на обработку персональных данных'
                );
              }
            }
          }

          return false;
        } else {
          modal && closeModal(modal);
          if (
            successAlert &&
            !document.querySelector('.form-message_alert._show-alert')
          ) {
            successAlert.classList.add('_form-sent');
            setTimeout(() => {
              successAlert.classList.remove('_form-sent');
            }, 5000);
          }
        }
      },
      false
    );
  });
}
