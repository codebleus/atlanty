import { openModal } from "./modals";
import { initTabsSlider } from "./tabs-slider";
import { initReadMore } from "./read-more";
import { removeClasses, scrollToElement } from "./utils";

if (document.querySelector("[data-anchor]")) {
  document.querySelectorAll("[data-anchor]").forEach(element => {
    element.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = element.dataset.anchor;
      const target = document.getElementById(targetId);

      if (target) {
        scrollToElement(target, 2000);
      }
    });
  });
}

if (document.querySelector(".guests")) {
  document.querySelector(".guests").style.opacity = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".dating .dating__image-wrap image")) {
    const datingSection = document.querySelector(".dating");
    const imageWrap = document.querySelector(".dating__image-wrap image");

    window.addEventListener("scroll", () => {
      const rect = datingSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress =
          (windowHeight - rect.top) / (windowHeight + rect.height);

        const translateY = progress * 80;

        if (window.innerWidth > 768) {
          imageWrap.style.transform = `translateY(${translateY}px)`;
        } else {
          imageWrap.style.transform = `translateY(0px)`;
        }
      }
    });
  }

  if (
    document.querySelector(".project table") &&
    document.querySelectorAll(".project table col").length > 3
  ) {
    document.querySelector(".project table").classList.add("_alt");
  }

  if (document.querySelector(".block-project__video-wrap")) {
    const el = document.querySelector(".block-project__video-wrap");
    el.innerHTML = `
<iframe width="560" height="315" src="${el.dataset.src}" title="YouTube video player" frameborder="0" allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        `;
  }

  if (document.querySelectorAll(".select").length) {
    document.querySelectorAll(".select").forEach(el => {
      if (el.querySelector('[aria-selected="true"]')) {
        el.querySelector(".select__btn").innerHTML = `
     ${el.querySelector('[aria-selected="true"]').innerHTML}
     `;
      }
    });
  }

  if (document.querySelector("#special-modal form")) {
    document
      .querySelector("#special-modal form")
      .addEventListener("submit", function () {
        openModal("banner-modal-success");
      });
  }

  if (
    document.querySelector(
      ".project, .calendar-hero, .common-page, .events-hero",
    )
  ) {
    document.querySelector(".header").classList.add("_dark");

    if (document.querySelector('.header [style="color: #ffff00;"]')) {
      document.querySelector('.header [style="color: #ffff00;"]').style.color =
        "#151515";
    }
  }

  if (document.querySelector(".header__hamburger")) {
    document
      .querySelector(".header__hamburger")
      .addEventListener("click", function () {
        document.documentElement.classList.add("_show-menu");
      });
  }
  if (document.querySelector(".menu-header__close-btn")) {
    document
      .querySelector(".menu-header__close-btn")
      .addEventListener("click", function () {
        document.documentElement.classList.remove("_show-menu");
      });
  }

  if (document.querySelector(".cta__close-btn")) {
    document
      .querySelector(".cta__close-btn")
      .addEventListener("click", function (e) {
        e.target.closest(".cta").style.display = "none";
      });
  }
  if (document.querySelector(".cookie__btn")) {
    document
      .querySelector(".cookie__btn")
      .addEventListener("click", function (e) {
        e.target.closest(".cookie").style.display = "none";

        if (document.querySelector(".cta")) {
          document.querySelector(".cta").classList.add("_pressed");
        }
      });
  } else {
    if (document.querySelector(".cta")) {
      document.querySelector(".cta").classList.add("_pressed");
    }
  }

  if (document.querySelectorAll(".search-cases-hero__input").length) {
    document.querySelectorAll(".search-cases-hero__input").forEach(input => {
      input.addEventListener("input", function (e) {
        if (e.target.value.length) {
          e.target.parentElement.classList.add("_is-active");
        } else {
          e.target.parentElement.classList.remove("_is-active");
        }
      });
    });
  }

  if (document.querySelectorAll(".custom-slider-mobapp__item").length) {
    document.querySelectorAll(".custom-slider-mobapp__item").forEach(item => {
      item.addEventListener("click", function () {
        document
          .querySelectorAll(".custom-slider-mobapp__item")
          .forEach(item => {
            item.classList.remove("_is-active");
          });
        item.classList.add("_is-active");
      });
    });
  }

  if (document.querySelectorAll(".event-card").length) {
    document.querySelectorAll(".event-card").forEach(el => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".event-card__toggle")) {
          e.preventDefault();
          el.classList.toggle("_is-visible");
        }
        if (e.target.closest(".showmore-event-card__btn")) {
          e.preventDefault();
        }
      });
    });
  }
  if (document.querySelectorAll(".select").length) {
    document.querySelectorAll(".select").forEach(select => {
      const btn = select.querySelector(".select__btn");

      btn.addEventListener("click", function (e) {
        if (select.classList.contains("_is-active")) {
          select.classList.remove("_is-active");
        } else {
          document.querySelectorAll(".select").forEach(select => {
            select.classList.remove("_is-active");
          });
          select.classList.add("_is-active");
        }
      });
    });
    document.documentElement.addEventListener("click", function (e) {
      if (
        !e.target.closest(".select._is-active") &&
        document.querySelector(".select._is-active")
      ) {
        document
          .querySelector(".select._is-active")
          .classList.remove("_is-active");
      }
      if (e.target.closest(".dropdown__item")) {
        e.target.closest(".select").classList.add("_act");
        e.target
          .closest(".dropdown")
          .querySelectorAll(".dropdown__item")
          .forEach(item => {
            item.setAttribute("aria-selected", "false");
          });
        e.target
          .closest(".dropdown__item")
          .setAttribute("aria-selected", "true");

        e.target.closest(".select").classList.remove("_is-active");
        e.target.closest(".select").querySelector(".select__btn").innerText =
          e.target.closest(".dropdown__item").innerText;
      }
    });
  }

  document.addEventListener("click", function (e) {
    if (
      (e.target.closest(".nav-header__item_has-sublist._is-active button") ||
        !e.target.closest(".nav-header__item_has-sublist button")) &&
      !e.target.closest(".nav-header__list")
    ) {
      removeClasses(
        document.querySelectorAll(".nav-header__item_has-sublist"),
        "_is-active",
      );
    } else if (e.target.closest(".nav-header__item_has-sublist button")) {
      removeClasses(
        document.querySelectorAll(".nav-header__item_has-sublist"),
        "_is-active",
      );
      e.target.closest(".nav-header__item").classList.add("_is-active");
    }
    if (e.target.closest(".search-cases-hero__deny")) {
      e.target.closest(".cases-hero").classList.remove("_show-search");
    }
    if (e.target.closest(".search-cases-hero__icon_close")) {
      if (
        e.target
          .closest(".search-cases-hero__icon_close")
          .parentElement.querySelector("input")
      ) {
        e.target
          .closest(".search-cases-hero__icon_close")
          .parentElement.querySelector("input").value = "";
        e.target.closest(".search-cases-hero__label._is-active") &&
          e.target
            .closest(".search-cases-hero__label._is-active")
            .classList.remove("_is-active");
      }
    }
    if (e.target.closest(".search-cases-hero__btn")) {
      e.target.closest(".cases-hero").classList.add("_show-search");
    }
    if (
      e.target.closest(".chat__close-btn") ||
      (document.querySelector("._show-chat") &&
        !e.target.closest(".chat") &&
        !e.target.closest(".chat-btn"))
    ) {
      document.documentElement.classList.remove("_show-chat");
    }
  });
});

window.addEventListener("load", function () {
  document.documentElement.classList.add("_pages-loaded");

  if (document.querySelector(".item-schedule__heading")) {
    document.querySelectorAll(".item-schedule__heading").forEach(el => {
      if (
        el.innerText.length === 0 &&
        el.closest(".item-schedule").querySelector(".item-schedule__list")
      ) {
        el.closest(".item-schedule")
          .querySelector(".item-schedule__list")
          .classList.add("_nb");
      }
    });
  }
  if (document.querySelector(".guests"))
    document.querySelector(".guests").style.opacity = 1;
  if (
    document.querySelectorAll(".guests__tab").length &&
    document.querySelectorAll(".guests__tab").length === 1 &&
    !document.querySelector(".slide-guests__btn")
  ) {
    document.querySelector(".guests").classList.add("_shrink");

    const heading = document.createElement("div");
    heading.innerHTML = document.querySelector(".guests__tab").innerHTML;
    heading.classList.add("guests__subtitle");

    document.querySelector(".info-slide-guests__inner").appendChild(heading);
  }

  if (document.querySelector(".hero-club")) {
    document.documentElement.classList.add("silicone");
  }
  const header = document.querySelector(".header");
  if (header) {
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    if (
      window.scrollY >= startPoint &&
      !document.querySelector(".cases-hero_media._show-search")
    ) {
      !header.classList.contains("_header-scroll") ?
        header.classList.add("_header-scroll")
      : null;
    }
  }

  initTabsSlider();
  initReadMore(() => {
    document.querySelector("[data-tabs-slider]").classList.toggle("_shrink");
  });
});
