export const initReadMore = (callback = () => '') => {
  const SELECTOR = '[data-read-more]';
  const ACTIVE_CLASS = '_is-active';

  if (document.querySelector(SELECTOR)) {
    const items = document.querySelectorAll(SELECTOR);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      item.addEventListener('click', function () {
        item.parentElement.classList.toggle(ACTIVE_CLASS);
        callback && callback();
      });
    }
  }
};
