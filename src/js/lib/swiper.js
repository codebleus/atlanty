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

let advantagesSwiper;
let suitabilitySwiper;

if (document.querySelector('.infographics__swiper')) {
  const slider = new Swiper('.infographics__swiper', {
    modules: [Navigation, Pagination],
    speed: 800,
    rewind: true,
    spaceBetween: 90,
    loop: true,
    navigation: {
      prevEl: '.controls-infographics__btn_prev',
      nextEl: '.controls-infographics__btn_next',
    },
    pagination: {
      el: '.controls-infographics__pagination',
      type: 'bullets',
      clickable: true,
    },
  });
}
