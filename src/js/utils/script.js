import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { openModal } from './modals';
import { initTabsSlider } from './tabs-slider';
import { initReadMore } from './read-more';
import { removeClasses } from './utils';

if (document.querySelector('.guests'))
  document.querySelector('.guests').style.opacity = 0;

gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    trigger: '.media-lead',
    start: 'top top',
    onEnter: () => {
      if (
        document.querySelector('.cases-hero__carousel') &&
        !document.querySelector('.cases-hero__carousel._is-visible')
      ) {
        document
          .querySelector('.cases-hero__carousel')
          .classList.add('_is-visible');
      }
    },
    onLeaveBack: () => {
      if (
        document.querySelector('.cases-hero__carousel') &&
        document.querySelector('.cases-hero__carousel._is-visible')
      ) {
        document
          .querySelector('.cases-hero__carousel')
          .classList.remove('_is-visible');
      }
    },
  },
});

const horizontalLoop = (items, config) => {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: 'none' },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
          gsap.getProperty(el, 'xPercent')
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], 'scaleX') +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add('label' + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex + 1, vars);
  tl.previous = vars => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
};

document.addEventListener('DOMContentLoaded', function () {
  if (
    document.querySelector('.project table') &&
    document.querySelectorAll('.project table col').length > 3
  ) {
    document.querySelector('.project table').classList.add('_alt');
  }

  if (document.querySelector('.block-project__video-wrap')) {
    const el = document.querySelector('.block-project__video-wrap');
    el.innerHTML = `
<iframe width="560" height="315" src="${el.dataset.src}" title="YouTube video player" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        `;
  }

  if (document.querySelectorAll('.select').length) {
    document.querySelectorAll('.select').forEach(el => {
      if (el.querySelector('[aria-selected="true"]')) {
        el.querySelector('.select__btn').innerHTML = `
     ${el.querySelector('[aria-selected="true"]').innerHTML}
     `;
      }
    });
  }

  if (document.querySelector('#special-modal form')) {
    document
      .querySelector('#special-modal form')
      .addEventListener('submit', function () {
        openModal('banner-modal-success');
      });
  }

  if (document.querySelector('.project, .calendar-hero, .common-page')) {
    document.querySelector('.header').classList.add('_dark');

    if (document.querySelector('.header [style="color: #ffff00;"]')) {
      document.querySelector('.header [style="color: #ffff00;"]').style.color =
        '#151515';
    }
  }

  if (document.querySelector('.header__hamburger')) {
    document
      .querySelector('.header__hamburger')
      .addEventListener('click', function () {
        document.documentElement.classList.add('_show-menu');
      });
  }
  if (document.querySelector('.header__hamburger')) {
    document
      .querySelector('.menu-header__close-btn')
      .addEventListener('click', function () {
        document.documentElement.classList.remove('_show-menu');
      });
  }

  if (document.querySelector('.cta__close-btn')) {
    document
      .querySelector('.cta__close-btn')
      .addEventListener('click', function (e) {
        e.target.closest('.cta').style.display = 'none';
      });
  }
  if (document.querySelector('.cookie__btn')) {
    document
      .querySelector('.cookie__btn')
      .addEventListener('click', function (e) {
        e.target.closest('.cookie').style.display = 'none';

        if (document.querySelector('.cta')) {
          document.querySelector('.cta').classList.add('_pressed');
        }
      });
  } else {
    if (document.querySelector('.cta')) {
      document.querySelector('.cta').classList.add('_pressed');
    }
  }

  if (document.querySelectorAll('.search-cases-hero__input').length) {
    document.querySelectorAll('.search-cases-hero__input').forEach(input => {
      input.addEventListener('input', function (e) {
        if (e.target.value.length) {
          e.target.parentElement.classList.add('_is-active');
        } else {
          e.target.parentElement.classList.remove('_is-active');
        }
      });
    });
  }

  if (document.querySelectorAll('.custom-slider-mobapp__item').length) {
    document.querySelectorAll('.custom-slider-mobapp__item').forEach(item => {
      item.addEventListener('click', function () {
        document
          .querySelectorAll('.custom-slider-mobapp__item')
          .forEach(item => {
            item.classList.remove('_is-active');
          });
        item.classList.add('_is-active');
      });
    });
  }

  if (document.querySelectorAll('.event-card').length) {
    document.querySelectorAll('.event-card').forEach(el => {
      el.addEventListener('click', function (e) {
        if (e.target.closest('.event-card__toggle')) {
          e.preventDefault();
          el.classList.toggle('_is-visible');
        }
        if (e.target.closest('.showmore-event-card__btn')) {
          e.preventDefault();
        }
      });
    });
  }
  if (document.querySelectorAll('.select').length) {
    document.querySelectorAll('.select').forEach(select => {
      const btn = select.querySelector('.select__btn');

      btn.addEventListener('click', function (e) {
        if (select.classList.contains('_is-active')) {
          select.classList.remove('_is-active');
        } else {
          document.querySelectorAll('.select').forEach(select => {
            select.classList.remove('_is-active');
          });
          select.classList.add('_is-active');
        }
      });
    });
    document.documentElement.addEventListener('click', function (e) {
      if (
        !e.target.closest('.select._is-active') &&
        document.querySelector('.select._is-active')
      ) {
        document
          .querySelector('.select._is-active')
          .classList.remove('_is-active');
      }
      if (e.target.closest('.dropdown__item')) {
        e.target.closest('.select').classList.add('_act');
        e.target
          .closest('.dropdown')
          .querySelectorAll('.dropdown__item')
          .forEach(item => {
            item.setAttribute('aria-selected', 'false');
          });
        e.target
          .closest('.dropdown__item')
          .setAttribute('aria-selected', 'true');

        e.target.closest('.select').classList.remove('_is-active');
        e.target.closest('.select').querySelector('.select__btn').innerText =
          e.target.closest('.dropdown__item').innerText;
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (
      (e.target.closest('.nav-header__item_has-sublist._is-active button') ||
        !e.target.closest('.nav-header__item_has-sublist button')) &&
      !e.target.closest('.nav-header__list')
    ) {
      removeClasses(
        gsap.utils.toArray('.nav-header__item_has-sublist'),
        '_is-active'
      );
    } else if (e.target.closest('.nav-header__item_has-sublist button')) {
      removeClasses(
        gsap.utils.toArray('.nav-header__item_has-sublist'),
        '_is-active'
      );
      e.target.closest('.nav-header__item').classList.add('_is-active');
    }
    if (e.target.closest('.search-cases-hero__deny')) {
      e.target.closest('.cases-hero').classList.remove('_show-search');
    }
    if (e.target.closest('.search-cases-hero__icon_close')) {
      if (
        e.target
          .closest('.search-cases-hero__icon_close')
          .parentElement.querySelector('input')
      ) {
        e.target
          .closest('.search-cases-hero__icon_close')
          .parentElement.querySelector('input').value = '';
        e.target.closest('.search-cases-hero__label._is-active') &&
          e.target
            .closest('.search-cases-hero__label._is-active')
            .classList.remove('_is-active');
      }
    }
    if (e.target.closest('.search-cases-hero__btn')) {
      e.target.closest('.cases-hero').classList.add('_show-search');
    }
    if (
      e.target.closest('.chat__close-btn') ||
      (document.querySelector('._show-chat') &&
        !e.target.closest('.chat') &&
        !e.target.closest('.chat-btn'))
    ) {
      document.documentElement.classList.remove('_show-chat');
    }
  });
});

window.addEventListener('load', function () {
  document.documentElement.classList.add('_pages-loaded');

  if (document.querySelector('.item-schedule__heading')) {
    document.querySelectorAll('.item-schedule__heading').forEach(el => {
      if (
        el.innerText.length === 0 &&
        el.closest('.item-schedule').querySelector('.item-schedule__list')
      ) {
        el.closest('.item-schedule')
          .querySelector('.item-schedule__list')
          .classList.add('_nb');
      }
    });
  }
  if (document.querySelector('.guests'))
    document.querySelector('.guests').style.opacity = 1;
  if (
    document.querySelectorAll('.guests__tab').length &&
    document.querySelectorAll('.guests__tab').length === 1
  ) {
    document.querySelector('.guests').classList.add('_shrink');

    const heading = document.createElement('div');
    heading.innerHTML = document.querySelector('.guests__tab').innerHTML;
    heading.classList.add('guests__subtitle');

    document.querySelector('.info-slide-guests__inner').appendChild(heading);
  }

  if (document.querySelector('.hero-club')) {
    document.documentElement.classList.add('silicone');
  }
  const header = document.querySelector('.header');
  if (header) {
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    if (
      window.scrollY >= startPoint &&
      !document.querySelector('.cases-hero_media._show-search')
    ) {
      !header.classList.contains('_header-scroll')
        ? header.classList.add('_header-scroll')
        : null;
    }
  }

  document.querySelectorAll('.vfm-parent').length &&
    horizontalLoop(document.querySelectorAll('.vfm-parent'), { speed: 0.6 });

  initTabsSlider();
  initReadMore(() => {
    document.querySelector('[data-tabs-slider]').classList.toggle('_shrink');
  });
});
