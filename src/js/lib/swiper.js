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

const breakpoint = window.matchMedia('(min-width:768px)');

if (document.querySelector('.infographics__swiper')) {
  new Swiper('.infographics__swiper', {
    modules: [Navigation, Pagination],
    speed: 800,
    rewind: true,
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
if (document.querySelector('.residents__swiper') && window.innerWidth <= 1278) {
  new Swiper('.residents__swiper', {
    modules: [Navigation, Pagination],
    speed: 800,
    slidesPerView: 'auto',
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
      1024: {
        slidesPerGroup: 3,
      },
    },
  });
}
