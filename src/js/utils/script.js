document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.header__hamburger')) {
    document
      .querySelector('.header__hamburger')
      .addEventListener('click', function () {
        document.documentElement.classList.add('_show-menu');
      });
  }
  if (document.querySelector('.header__hamburger')) {
    document
      .querySelector('.menu-header__close-btn')
      .addEventListener('click', function () {
        document.documentElement.classList.remove('_show-menu');
      });
  }

  if (document.querySelector('.cta__close-btn')) {
    document
      .querySelector('.cta__close-btn')
      .addEventListener('click', function (e) {
        e.target.closest('.cta').style.display = 'none';
      });
  }
  // if (document.querySelector('.cookie__btn')) {
  //   document
  //     .querySelector('.cookie__btn')
  //     .addEventListener('click', function (e) {
  //       e.target.closest('.cookie').style.display = 'none';
  //     });
  // }

  if (document.querySelectorAll('.select').length) {
    document.querySelectorAll('.select').forEach(select => {
      const btn = select.querySelector('.select__btn');

      btn.addEventListener('click', function (e) {
        if (select.classList.contains('_is-active')) {
          select.classList.remove('_is-active');
        } else {
          document.querySelectorAll('.select').forEach(select => {
            select.classList.remove('_is-active');
          });
          select.classList.add('_is-active');
        }
      });
    });
    document.documentElement.addEventListener('click', function (e) {
      if (
        !e.target.closest('.select._is-active') &&
        document.querySelector('.select._is-active')
      ) {
        document
          .querySelector('.select._is-active')
          .classList.remove('_is-active');
      }
      if (e.target.closest('.dropdown__item')) {
        e.target
          .closest('.dropdown')
          .querySelectorAll('.dropdown__item')
          .forEach(item => {
            item.setAttribute('aria-selected', 'false');
          });
        e.target
          .closest('.dropdown__item')
          .setAttribute('aria-selected', 'true');
        e.target.closest('.select').classList.remove('_is-active');
        e.target.closest('.select').querySelector('.select__btn').innerText =
          e.target.closest('.dropdown__item').innerText;
      }
    });
  }
});
