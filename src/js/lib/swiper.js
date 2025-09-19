import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { remToPx } from '../utils/utils';

const mm = {
  add: (query, callback) => {
    const mql = window.matchMedia(query);
    const handler = e => {
      if (e.matches) callback();
    };
    if (mql.matches) callback();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  },
};

const initFraction = (cur, activeIdx, total, length) => {
  cur.innerHTML = `${activeIdx < 9 ? '0' + (activeIdx + 1) : activeIdx + 1}`;
  total.innerHTML = `${length < 10 ? '0' + length : length}`;
};

window.addEventListener('load', function () {
  if (document.querySelector('.products__marquee')) {
    new Swiper('.products__marquee', {
      modules: [Autoplay],
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      spaceBetween: remToPx(2),
      slidesPerView: 'auto',
      loop: true,
      speed: 4000,
    });
  }
  if (document.querySelector('.common-page__carousel')) {
    new Swiper('.common-page__carousel', {
      modules: [Autoplay],
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      centeredSlides: true,
      centeredSlidesBounds: true,
      spaceBetween: remToPx(2),
      slidesPerView: 'auto',
      loop: true,
      speed: 4000,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
    });
  }

  if (document.querySelector('.gallery__slider_main')) {
    mm.add('(min-width: 768px)', () => {
      const swiper = new Swiper('.gallery__slider_main', {
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
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
        breakpoints: {
          1441: {
            slidesPerView: 2.3,
          },
        },
      });
    });

    mm.add('(max-width: 768px)', () => {
      const swiper = new Swiper('.gallery__slider_main', {
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
          initFraction(cur, swiper.realIndex, total, swiper.slides.length);
        },
        activeIndexChange: swiper => {
          initFraction(cur, swiper.realIndex, total, swiper.slides.length);
        },
      },
    });
  }

  if (document.querySelector('.schedule__slider')) {
    mm.add('(max-width: 768px)', () => {
      new Swiper('.schedule__slider', {
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
    });
  }

  if (document.querySelector('.about-reviews__swiper')) {
    const el = document.querySelector('.about-reviews__fraction');
    const cur = el.querySelector('.fraction__current');
    const total = el.querySelector('.fraction__total');

    mm.add('(max-width: 768px)', () => {
      new Swiper('.about-reviews__swiper', {
        modules: [Navigation, Pagination, Autoplay],
        speed: 800,
        spaceBetween: 20,
        loop: true,
        autoHeight: true,
        navigation: {
          prevEl: '.about-reviews .controls__btn_prev',
          nextEl: '.about-reviews .controls__btn_next',
        },
        pagination: {
          el: '.about-reviews__controls .controls__pagination',
          type: 'bullets',
          clickable: true,
        },
        on: {
          afterInit: swiper => {
            initFraction(cur, swiper.realIndex, total, swiper.slides.length);
          },
          activeIndexChange: swiper => {
            initFraction(cur, swiper.realIndex, total, swiper.slides.length);
          },
        },
      });
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
      on: {
        afterInit: swiper => {
          initFraction(cur, swiper.realIndex, total, swiper.slides.length);
        },
        activeIndexChange: swiper => {
          initFraction(cur, swiper.realIndex, total, swiper.slides.length);
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

  if (document.querySelector('.events-info__slider')) {
    new Swiper('.events-info__slider', {
      modules: [Autoplay],
      speed: 6000,
      spaceBetween: 13,
      loop: true,
      slidesPerView: 'auto',
      allowTouchMove: false,
      centeredSlides: true,
      centeredSlidesBounds: true,
      autoplay: {
        delay: 0,
      },
      breakpoints: {
        768: {
          spaceBetween: 25,
        },
      },
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
          prevEl: section.querySelector('.controls__btn_prev'),
          nextEl: section.querySelector('.controls__btn_next'),
        },
        pagination: {
          el: section.querySelector('.controls__pagination'),
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
            slides.forEach(slide => {
              if (slide.classList.contains('card-cases-grid_large')) {
                slide.remove();
              }
            });
          },
        },
      });
    });
  }

  if (document.querySelector('.residents__swiper')) {
    mm.add('(max-width: 1278px)', () => {
      new Swiper('.residents__swiper', {
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
