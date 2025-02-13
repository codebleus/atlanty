import Swiper from 'swiper';
import { EffectFade } from 'swiper/modules';
import { removeClasses } from './utils';

export const initTabsSlider = () => {
  const PARENT_SELECTOR = '[data-tabs-slider]';
  const IDX_ATTR = '[data-slide-idx]';

  if (document.querySelector(PARENT_SELECTOR)) {
    const sliders = Array.from(document.querySelectorAll(PARENT_SELECTOR));

    const onClickHandler = (target, swiper) => {
      const tab = target.closest(IDX_ATTR);

      if (tab) {
        swiper.slideTo(tab.dataset.slideIdx, 0);
        removeClasses(document.querySelectorAll(IDX_ATTR), '_is-active');
        tab.classList.add('_is-active');
      }
    };

    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];

      new Swiper(slider.querySelector('.swiper'), {
        modules: [EffectFade],
        speed: 300,
        spaceBetween: 90,
        allowTouchMove: false,
        loop: true,
        effect: 'fade',
        on: {
          afterInit: swiper => {
            console.log('log');
            slider.addEventListener('click', function ({ target }) {
              onClickHandler(target, swiper);
            });
          },
        },
      });
    }
  }
};
