import { addError } from '../utils/forms';

const loadInputmask = () => import('inputmask');

const handleOnIncomplete = input => {
  input.value = '';
  if (input.closest('.field')) {
    addError(input.closest('.field'), input.closest('form'));
  }
};

const initInputmask = async () => {
  const telInputCollection = document.querySelectorAll('[data-tel-mask]');
  const mailInputCollection = document.querySelectorAll('[data-mail-mask]');
  const nameInputCollection = document.querySelectorAll('[data-name-mask]');
  const companyNameInput = document.querySelector(
    '[data-input="company-name"]'
  );

  if (
    !telInputCollection.length &&
    !mailInputCollection.length &&
    !nameInputCollection.length &&
    !companyNameInput
  ) {
    return;
  }

  const { default: Inputmask } = await loadInputmask();

  if (telInputCollection.length) {
    telInputCollection.forEach(input => {
      Inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false,
        showMaskOnFocus: true,
        jitMasking: false,
        placeholder: '_',
        onincomplete: () => handleOnIncomplete(input),
      }).mask(input);
    });
  }

  if (mailInputCollection.length) {
    mailInputCollection.forEach(input => {
      Inputmask({
        showMaskOnHover: false,
        jitMasking: true,
        clearMaskOnLostFocus: true,
        clearIncomplete: true,
        alias: 'email',
        onincomplete: () => {
          if (input.closest('.field')) {
            input.closest('.field').classList.add('_incomplete');
          }
        },
        oncomplete: () => {
          if (input.closest('.field')) {
            input.closest('.field').classList.remove('_incomplete');
          }
        },
      }).mask(input);
    });
  }

  if (nameInputCollection.length) {
    nameInputCollection.forEach(input => {
      Inputmask({
        showMaskOnHover: false,
        jitMasking: true,
        regex: '^[а-яА-Яa-zA-Z]*[ ][а-яА-Яa-zA-Z]*$',
      }).mask(input);
    });
  }

  if (companyNameInput) {
    Inputmask({
      showMaskOnHover: false,
      jitMasking: true,
      regex:
        '^[а-яА-Яa-zA-Z0-9]*[ ][а-яА-Яa-zA-Z0-9]*[ ][а-яА-Яa-zA-Z0-9]*[ ][а-яА-Яa-zA-Z0-9]*[ ][а-яА-Яa-zA-Z0-9]*[ ][а-яА-Яa-zA-Z0-9]*$',
    }).mask(companyNameInput);
  }
};

window.addEventListener('load', initInputmask);
