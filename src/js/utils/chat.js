import SimpleBar from 'simplebar';
import { closeModal, openModal } from './modals';
import { removeClasses } from './utils';

window.addEventListener('load', function () {
  if (document.querySelector('.hero_mainpage')) {
    const current = document.querySelector('.inviting-modal__fraction-current');
    const total = document.querySelector('.inviting-modal__fraction-total');
    const prevBtn = document.querySelector('.inviting-modal__btn_prev');

    let chatStep = 0;

    const scrollInst = SimpleBar.instances.get(
      document.querySelector('.chat .chat__inner')
    );
    const isValid = field => {
      if (field.value.length) {
        if (
          field.dataset.input === 'company-name' &&
          field.value.split(' ').length > 6
        ) {
          field.value = '';
          return false;
        }
        return true;
      } else {
        return false;
      }
    };

    const toNext = (group, step) => {
      if (group) {
        const next = group.nextElementSibling;
        const reply = group.querySelector('.chat .chat__message_reply');

        if (!group.classList.contains('_is-checked')) {
          step += 1;

          if (reply && group.querySelector('input').value.length) {
            reply.innerHTML = group.querySelector('input').value;
            reply.classList.add('_is-active');
          }

          if (next) {
            if (
              group.querySelector('.chat .chat__field') &&
              !isValid(group.querySelector('.chat .chat__field'))
            )
              return;

            next.classList.add('_is-active');

            scrollInst.contentWrapperEl.scrollTo({
              top: scrollInst.contentEl.clientHeight,
              behavior: 'smooth',
            });

            group.classList.add('_is-checked');

            if (group.closest('.inviting-modal')) {
              current.innerHTML = step < 10 ? `0${step}` : step;

              group.closest('.inviting-modal').dataset.step = current.innerHTML;

              if (!next.nextElementSibling) {
                group.closest('.inviting-modal').classList.add('_form');
              } else {
                group.closest('.inviting-modal').classList.remove('_form');
              }

              if (prevBtn && +current.innerHTML !== 1) {
                prevBtn.classList.add('_is-visible');
              }

              if (window.innerWidth < 768) {
                document.querySelector(
                  '.inviting-modal__form-body'
                ).style.height = `${next.offsetHeight}px`;
              }
            }
          }
        }
      }
    };

    const initModal = () => {
      const nextBtn = document.querySelector('.inviting-modal__btn_next');
      const submitBtn = document.querySelector('.inviting-modal__btn_submit');
      const groups = document.querySelectorAll('.inviting-modal__group');

      if (document.querySelector('.inviting-modal__reg-btn')) {
        document
          .querySelector('.inviting-modal__reg-btn')
          .addEventListener('click', function () {
            document
              .getElementById('inviting-modal')
              .classList.add('_show-main-content');
            openModal('inviting-modal');
          });
      }

      if (current && total) {
        current.innerHTML = '01';
        total.innerHTML =
          groups.length < 10 ? `0${groups.length}` : groups.length;
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          const group = document.querySelector(
            '.inviting-modal__group._is-active:not(._is-checked)'
          );

          if (group) {
            const options = group.querySelectorAll('.chat-option__input');

            if (options) {
              options.forEach(option => {
                if (option.checked) {
                  toNext(group, +current.innerHTML);
                }
              });
            }
          }
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          let step = +current.innerHTML - 1;

          const group = groups[step];

          group.closest('.inviting-modal').classList.remove('_form');

          if (group) {
            const prev = group.previousElementSibling;
            const next = group.nextElementSibling;

            // if (!group.classList.contains('_is-checked')) {
            // step -= 1;

            if (prev) {
              removeClasses(groups, '_is-active');
              removeClasses(groups, '_is-checked');

              prev.classList.add('_is-active');
              prev.classList.remove('_is-checked');

              current.innerHTML = step < 10 ? `0${step}` : step;

              group.closest('.inviting-modal').dataset.step = current.innerHTML;

              if (window.innerWidth < 768) {
                document.querySelector(
                  '.inviting-modal__form-body'
                ).style.height = `${prev.offsetHeight}px`;
              }
            }

            if (+current.innerHTML === 1) {
              prevBtn.classList.remove('_is-visible');
            }
            // }
          }
        });
      }

      document
        .querySelector('.inviting-modal__form')
        .addEventListener('submit', function (e) {
          let arr = [];

          e.preventDefault();

          if (
            groups[groups.length - 1].querySelectorAll('.inviting-modal__input')
              .length
          ) {
            groups[groups.length - 1]
              .querySelectorAll('.inviting-modal__input')
              .forEach(input => {
                if (!input.value.length) {
                  arr.push(input);
                } else {
                  arr.indexOf(input) && arr.slice(arr.indexOf(input), 1);
                }
              });
          }

          if (arr.length) {
            window.alert('Пожалуйста, заполните все поля');
          } else {
            closeModal(document.getElementById('inviting-modal'));
            openModal('request-sent-modal');
          }
        });
    };

    const initChat = () => {
      const options = document.querySelectorAll('.chat .chat-option__input');
      const fields = document.querySelectorAll('.chat .chat__field');
      const btns = document.querySelectorAll('.chat .chat__input-btn');

      if (document.querySelector('.chat-btn')) {
        document
          .querySelector('.chat-btn')
          .addEventListener('click', function () {
            document.documentElement.classList.add('_show-chat');
          });
      }

      if (options.length) {
        options.forEach(option => {
          option.addEventListener('change', function () {
            if (option.checked) {
              const group = option.closest('.chat__group');

              toNext(group, chatStep);
            }
          });
        });
      }

      if (fields.length) {
        fields.forEach(field => {
          field.addEventListener('keypress', function (e) {
            const code = e.keyCode ? e.keyCode : e.which;
            if (code === 13) {
              toNext(e.target.closest('.chat__group'), chatStep);
            }
          });
        });
      }

      if (btns.length) {
        btns.forEach(btn => {
          btn.addEventListener('click', function (e) {
            toNext(e.target.closest('.chat__group'), chatStep);
          });
        });
      }
    };

    initChat();
    initModal();

    setTimeout(() => {
      openModal('inviting-modal');
    }, 30000);
  }
});
