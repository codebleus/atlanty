const openModal = name => {
  const modalEl = document.getElementById(name);

  if (modalEl) {
    const refresh =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      `?modal=${name}`;
    window.history.pushState({ path: refresh }, '', refresh);

    document.documentElement.classList.add('modal-show');
    modalEl.classList.add('modal_show');
  }
};

const closeModal = modal => {
  const refresh =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname;

  document.documentElement.classList.remove('modal-show');
  modal.classList.remove('modal_show');

  window.history.replaceState({ path: refresh }, '', refresh);
};

document.documentElement.addEventListener('click', function (e) {
  if (e.target.closest('[data-modal]')) {
    e.preventDefault();

    openModal(e.target.closest('[data-modal]').dataset.modal);
  }
  if (e.target.closest('.modal__close-btn')) {
    closeModal(document.querySelector('.modal_show.modal'));
  }
});

window.addEventListener('load', function (e) {
  if (document.querySelectorAll('.modal').length) {
    document.querySelectorAll('.modal').forEach(item => {
      if (window.location.href.includes(`?modal=${item.id}`)) {
        openModal(item.id);
      } else {
        const refresh =
          window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname;

        window.history.replaceState({ path: refresh }, '', refresh);
      }
    });
  }
});
