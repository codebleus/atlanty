import { maskList } from './mask_list';

const mask = selector => {
  function setMask(input) {
    if (!input.value) input.value = '+';

    let matrix = '+###############';

    maskList.forEach(item => {
      let code = item.code.replace(/[\s#]/g, ''),
        phone = input.value.replace(/[\s#-)(]/g, '');

      if (phone.includes(code)) {
        // console.log(phone, code);
        matrix = item.code;
      }
    });

    let i = 0,
      val = input.value.replace(/\D/g, '');

    input.value = matrix.replace(/(?!\+)./g, function (a) {
      return /[#\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ''
        : a;
    });
  }

  let inputs = document.querySelectorAll(selector);

  if (inputs.length) {
    inputs.forEach(input => {
      input.addEventListener('input', function () {
        setMask(input);
      });
      input.addEventListener('focus', function () {
        setMask(input);
      });
      input.addEventListener('blur', function () {
        setMask(input);

        if (input.value.replace(/[\s#-)(]/g, '').replace('+', '').length < 11) {
          input.value = '';
          input.closest('._is-filled') &&
            input.closest('._is-filled').classList.remove('_is-filled');
        }
      });
    });
  }
};
mask('input[type="tel"]');
