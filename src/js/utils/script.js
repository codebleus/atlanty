document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.block-project__video-wrap')) {
    const el = document.querySelector('.block-project__video-wrap');

    if (el.querySelector('.block-project__video-btn')) {
      el.querySelector('.block-project__video-btn').addEventListener(
        'click',
        function () {
          el.innerHTML = `
<iframe width="560" height="315" src="${el.dataset.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        `;
        }
      );
    }
  }

  if (document.querySelector('.project, .calendar-hero')) {
    document.querySelector('.header').classList.add('_dark');
  }

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
  if (document.querySelector('.cookie__btn')) {
    document
      .querySelector('.cookie__btn')
      .addEventListener('click', function (e) {
        e.target.closest('.cookie').style.display = 'none';

        if (document.querySelector('.cta')) {
          document.querySelector('.cta').classList.add('_pressed');
        }
      });
  } else {
    if (document.querySelector('.cta')) {
      document.querySelector('.cta').classList.add('_pressed');
    }
  }

  if (document.querySelector('.search-cases-hero__input')) {
    document
      .querySelector('.search-cases-hero__input')
      .addEventListener('input', function (e) {
        if (e.target.value.length) {
          e.target.parentElement.classList.add('_is-active');
        } else {
          e.target.parentElement.classList.remove('_is-active');
        }
      });
  }

  if (document.querySelector('.search-cases-hero__icon_close')) {
    document
      .querySelector('.search-cases-hero__icon_close')
      .addEventListener('click', function (e) {
        if (
          document
            .querySelector('.search-cases-hero__icon_close')
            .parentElement.querySelector('input')
        ) {
          document
            .querySelector('.search-cases-hero__icon_close')
            .parentElement.querySelector('input').value = '';
          e.target.closest('.search-cases-hero__label._is-active') &&
            e.target
              .closest('.search-cases-hero__label._is-active')
              .classList.remove('_is-active');
        }
      });
  }

  if (document.querySelector('.search-cases-hero__btn')) {
    document
      .querySelector('.search-cases-hero__btn')
      .addEventListener('click', function (e) {
        e.target.closest('.cases-hero').classList.add('_show-search');
      });
  }

  if (document.querySelector('.search-cases-hero__deny')) {
    document
      .querySelector('.search-cases-hero__deny')
      .addEventListener('click', function (e) {
        e.target.closest('.cases-hero').classList.remove('_show-search');
      });
  }

  if (document.querySelectorAll('.event-card').length) {
    document.querySelectorAll('.event-card').forEach(el => {
      el.addEventListener('click', function (e) {
        if (e.target.closest('.event-card__toggle')) {
          e.preventDefault();
          el.classList.toggle('_is-visible');
        }
        if (e.target.closest('.showmore-event-card__btn')) {
          e.preventDefault();
        }
      });
    });
  }
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
window.addEventListener('load', function () {
  const header = document.querySelector('.header');
  const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
  if (window.scrollY >= startPoint) {
    !header.classList.contains('_header-scroll')
      ? header.classList.add('_header-scroll')
      : null;
  }
});
