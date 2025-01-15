const openModal = name => {
  const modalEl = document.getElementById(name);

  if (modalEl) {
    // const refresh =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   window.location.pathname +
    //   `?modal=${name}`;
    // window.history.pushState({ path: refresh }, '', refresh);

    document.documentElement.classList.add('modal-show');
    modalEl.classList.add('modal_show');
  }
};

export const closeModal = modal => {
  // const refresh =
  //   window.location.protocol +
  //   '//' +
  //   window.location.host +
  //   window.location.pathname;

  document.documentElement.classList.remove('modal-show');
  modal.classList.remove('modal_show');

  if (document.querySelectorAll('[data-modal]._has-focus').length) {
    document.querySelectorAll('[data-modal]._has-focus').forEach(el => {
      el.classList.remove('_has-focus');
    });
  }

  // window.history.replaceState({ path: refresh }, '', refresh);
};

window.addEventListener('load', function () {
  if (document.querySelector('.project_media')) openModal('banner-modal');

  if (document.querySelector('[data-modal="special-modal"]')) {
    document
      .querySelector('[data-modal="special-modal"]')
      .addEventListener('click', function () {
        closeModal(document.getElementById('banner-modal'));
      });
  }
});

if (document.querySelectorAll('[data-modal]').length) {
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('touchstart', function (e) {
      document.querySelectorAll('[data-modal]').forEach(btni => {
        btni.classList.remove('_has-focus');
      });
      btn.classList.add('_has-focus');
    });
  });
}

document.documentElement.addEventListener('click', function (e) {
  if (e.target.closest('[data-modal]')) {
    e.preventDefault();

    e.target.closest('[data-modal]').classList.add('_has-focus');

    openModal(e.target.closest('[data-modal]').dataset.modal);
  }
  if (e.target.closest('.modal__close-btn')) {
    closeModal(document.querySelector('.modal_show.modal'));
  }
  if (e.target.closest('._has-bg') && !e.target.closest('.modal__content')) {
    closeModal(e.target.closest('._has-bg'));
  }

  if (
    e.target.closest('#banner-modal') &&
    !e.target.closest('#banner-modal .banner-modal__content')
  ) {
    closeModal(document.getElementById('banner-modal'));
  }
});
