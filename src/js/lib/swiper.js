import Swiper from 'swiper';
import 'swiper/css';
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Controller,
} from 'swiper/modules';
import { remToPx } from '../utils/utils';
import gsap from 'gsap';

const mm = gsap.matchMedia();

const initFraction = (cur, activeIdx, total, length) => {
  cur.innerHTML = `
            ${activeIdx < 10 ? '0' + (activeIdx + 1) : activeIdx}
          `;

  total.innerHTML = `
            ${length < 10 ? '0' + length : length}
          `;
};

window.addEventListener('load', function () {
  if (document.querySelector('.gallery__slider_main')) {
    mm.add('(min-width: 768px)', () => {
      let swiper = new Swiper('.gallery__slider_main', {
        modules: [Navigation, Pagination],
        speed: 500,
        spaceBetween: 4.2,
        centeredSlides: true,
        slidesPerView: 1.79,
        loop: true,
        navigation: {
          prevEl: '.gallery .controls__btn_prev',
          nextEl: '.gallery .controls__btn_next',
        },
        pagination: {
          el: '.gallery .controls__pagination',
          clickable: true,
        },
        breakpoints: {
          1441: {
            slidesPerView: 2.3,
          },
        },
      });

      return () => {
        try {
          swiper.destroy();
        } catch (error) {
          console.warn(error);
        }
      };
    });
    mm.add('(max-width: 768px)', () => {
      let swiper = new Swiper('.gallery__slider_main', {
        modules: [Autoplay],
        speed: 7500,
        spaceBetween: 7,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 0,
        },
      });
      new Swiper('.gallery__slider_marquee', {
        modules: [Autoplay],
        speed: 7500,
        spaceBetween: 7,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 0,
          reverseDirection: true,
        },
      });

      return () => {
        try {
          swiper.destroy();
        } catch (error) {
          console.warn(error);
        }
      };
    });
  }
  if (document.querySelector('.guests__mob-slider')) {
    const el = document.querySelector('.guests .slider-controls__fraction');
    const cur = el.querySelector('.fraction__current');
    const total = el.querySelector('.fraction__total');

    new Swiper('.guests__mob-slider', {
      modules: [Navigation, Pagination],
      speed: 500,
      spaceBetween: 20,
      loop: true,
      navigation: {
        prevEl: '.guests__slider-controls .controls__btn_prev',
        nextEl: '.guests__slider-controls .controls__btn_next',
      },
      pagination: {
        el: '.guests__slider-controls .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
      on: {
        afterInit: swiper => {
          const activeIdx = swiper.realIndex;
          const length = swiper.slides.length;

          initFraction(cur, activeIdx, total, length);
        },
        activeIndexChange: swiper => {
          const activeIdx = swiper.realIndex;
          const length = swiper.slides.length;

          initFraction(cur, activeIdx, total, length);
        },
      },
    });
  }
  if (document.querySelector('.schedule__slider')) {
    mm.add('(max-width: 768px)', () => {
      let swiper = new Swiper('.schedule__slider', {
        modules: [Navigation, Pagination],
        speed: 500,
        spaceBetween: 20,
        loop: true,
        autoHeight: true,
        navigation: {
          prevEl: '.schedule .controls__btn_prev',
          nextEl: '.schedule .controls__btn_next',
        },
        pagination: {
          el: '.schedule .controls__pagination',
          type: 'bullets',
          clickable: true,
        },
      });

      return () => {
        try {
          swiper.destroy();
        } catch (error) {
          console.warn(error);
        }
      };
    });
  }
  if (document.querySelector('.testimonials__slider')) {
    const el = document.querySelector(
      '.testimonials .slider-controls__fraction'
    );
    const cur = el.querySelector('.fraction__current');
    const total = el.querySelector('.fraction__total');

    new Swiper('.testimonials__slider', {
      modules: [Navigation, Pagination],
      speed: 500,
      spaceBetween: 20,
      loop: true,
      navigation: {
        prevEl: '.testimonials .controls__btn_prev',
        nextEl: '.testimonials .controls__btn_next',
      },
      pagination: {
        el: '.testimonials .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        768.1: {
          slidesPerView: 2,
        },
        1300: {
          slidesPerView: 3,
        },
      },
      afterInit: swiper => {
        const activeIdx = swiper.realIndex;
        const length = swiper.slides.length;

        initFraction(cur, activeIdx, total, length);
      },
      activeIndexChange: swiper => {
        const activeIdx = swiper.realIndex;
        const length = swiper.slides.length;

        initFraction(cur, activeIdx, total, length);
      },
      on: {
        afterInit: swiper => {
          const activeIdx = swiper.realIndex;
          const length = swiper.slides.length;

          initFraction(cur, activeIdx, total, length);
        },
        activeIndexChange: swiper => {
          const activeIdx = swiper.realIndex;
          const length = swiper.slides.length;

          initFraction(cur, activeIdx, total, length);
        },
      },
    });
  }
  if (document.querySelector('.infographics__swiper')) {
    new Swiper('.infographics__swiper', {
      modules: [Navigation, Pagination],
      speed: 300,
      spaceBetween: 90,
      loop: true,
      navigation: {
        prevEl: '.infographics .controls__btn_prev',
        nextEl: '.infographics .controls__btn_next',
      },
      pagination: {
        el: '.infographics .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }
  if (document.querySelector('.cases-hero__swiper')) {
    new Swiper('.cases-hero__swiper', {
      modules: [],
      speed: 300,
      spaceBetween: 0,
      slidesPerView: 'auto',
      slideToClickedSlide: true,
      freeMode: true,
    });
  }
  if (document.querySelector('.products__slider')) {
    new Swiper('.products__slider', {
      modules: [Autoplay],
      speed: 6000,
      spaceBetween: 20,
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      autoplay: {
        delay: 0,
      },
    });
  }
  if (
    document.querySelector('.products__carousel-slider') &&
    window.innerWidth <= 1024
  ) {
    new Swiper('.products__carousel-slider', {
      modules: [Pagination, Navigation],
      speed: 300,
      spaceBetween: remToPx(4.8),
      loop: true,
      slidesPerView: 1,
      navigation: {
        prevEl: '.products .controls__btn_prev',
        nextEl: '.products .controls__btn_next',
      },
      pagination: {
        el: '.products .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        767.999: {
          slidesPerView: 3,
        },
      },
    });
  }
  if (document.querySelector('.mobapp .swiper') && window.innerWidth <= 1200) {
    new Swiper('.mobapp .swiper', {
      modules: [Pagination],
      speed: 300,
      spaceBetween: remToPx(4.8),
      loop: true,
      pagination: {
        el: '.mobapp__controls .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }
  if (document.querySelectorAll('.carousel .swiper').length) {
    document.querySelectorAll('.carousel .swiper').forEach(section => {
      new Swiper(section, {
        modules: [Navigation, Pagination],
        speed: 300,
        rewind: true,
        spaceBetween: 36,
        loop: true,
        navigation: {
          prevEl: section.querySelector(' .controls__btn_prev'),
          nextEl: section.querySelector(' .controls__btn_next'),
        },
        pagination: {
          el: section.querySelector(' .controls__pagination'),
          type: 'bullets',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2,
        },
        breakpoints: {
          649: {
            slidesPerView: 2.1,
            spaceBetween: 25,
          },
          1064: {
            slidesPerView: 3.1,
            spaceBetween: 36,
          },
        },
        on: {
          beforeInit: swiper => {
            const slides = swiper.el.querySelectorAll('.swiper-slide');

            if (slides.length) {
              slides.forEach(slide => {
                if (slide.classList.contains('card-cases-grid_large')) {
                  slide.remove();
                }
              });
            }
          },
        },
      });
    });
  }
  if (document.querySelector('.residents__swiper')) {
    // let swiper;

    mm.add('(max-width: 1278px)', () => {
      let swiper = new Swiper('.residents__swiper', {
        modules: [Navigation, Pagination],
        speed: 300,
        hashNavigation: {
          watchState: true,
        },
        navigation: {
          prevEl: '.residents .controls__btn_prev',
          nextEl: '.residents .controls__btn_next',
        },
        pagination: {
          el: '.residents .controls__pagination',
          type: 'bullets',
          clickable: true,
        },
        breakpoints: {
          767: {
            slidesPerView: 'auto',
          },
          1278: {
            slidesPerView: 5,
            slidesPerGroup: 3,
          },
        },
      });

      return () => {
        try {
          swiper.destroy();
        } catch (error) {
          console.warn(error);
        }
      };
    });
  }
});
window.addEventListener('resize', function () {
  if (
    document.querySelector('.products__carousel-slider') &&
    window.innerWidth <= 1024
  ) {
    new Swiper('.products__carousel-slider', {
      modules: [Pagination, Navigation],
      speed: 300,
      spaceBetween: remToPx(4.8),
      loop: true,
      slidesPerView: 1,
      navigation: {
        prevEl: '.products .controls__btn_prev',
        nextEl: '.products .controls__btn_next',
      },
      pagination: {
        el: '.products .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        767.999: {
          slidesPerView: 3,
        },
      },
    });
  }
  if (document.querySelector('.mobapp .swiper') && window.innerWidth <= 1200) {
    new Swiper('.mobapp .swiper', {
      modules: [Pagination],
      speed: 300,
      spaceBetween: remToPx(4.8),
      loop: true,
      pagination: {
        el: '.mobapp__controls .controls__pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }
});
