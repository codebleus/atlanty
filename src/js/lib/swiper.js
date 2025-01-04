import Swiper from 'swiper';
// import 'swiper/css';
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

window.addEventListener('load', function () {
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
          1024: {
            slidesPerGroup: 3,
          },
          1278: {
            slidesPerView: 5,
          },
        },
      });

      return () => {
        swiper.destroy();
        swiper = null;
      };
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
  if (document.querySelector('.mobapp .swiper') && window.innerWidth <= 1024) {
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
      });
    });
  }
});
