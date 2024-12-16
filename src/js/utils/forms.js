if (document.querySelectorAll('.field').length) {
  document.querySelectorAll('.field').forEach(item => {
    const input = item.querySelector('.field__input');

    input.addEventListener('input', function () {
      if (input.dataset.mask === 'text') {
        input.value = input.value.replace(/[^a-zA-Zа-яА-я]+/g, '');
      }
    });
    input.addEventListener('focusout', function () {
      if (
        input.value.length &&
        input.closest('.field') &&
        !input.closest('.field._has-error')
      )
        input.closest('.field').classList.add('_is-filled');
    });
  });
}
