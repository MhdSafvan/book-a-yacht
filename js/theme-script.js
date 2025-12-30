$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 30) {
    $("header").addClass("sticky-header");
  } else {
    $("header").removeClass("sticky-header");
  }
});

$(document).ready(function () {
  const breakpoint = 1024;
  const $dropdown = $(".dropdown");
  const $trigger = $(".dropdown > a");

  function isDesktop() {
    return window.innerWidth >= breakpoint;
  }

  function bindDesktop() {
    $dropdown
      .on("mouseenter.dropdown", function () {
        $(this).addClass("is-open");
      })
      .on("mouseleave.dropdown", function () {
        $(this).removeClass("is-open");
      });
  }

  function bindMobile() {
    $trigger.on("click.dropdown", function (e) {
      e.preventDefault();
      const $parent = $(this).parent(".dropdown");

      // Close other dropdowns
      $(".dropdown").not($parent).removeClass("is-open");

      $parent.toggleClass("is-open");
    });

    // Close when tapping outside
    $(document).on("click.dropdown", function (e) {
      if (!$(e.target).closest(".dropdown").length) {
        $(".dropdown").removeClass("is-open");
      }
    });
  }

  function reset() {
    $dropdown.off(".dropdown");
    $trigger.off(".dropdown");
    $(document).off(".dropdown");
  }

  function init() {
    reset();
    if (isDesktop()) {
      bindDesktop();
    } else {
      bindMobile();
    }
  }

  init();
  $(window).on("resize", init);

  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("primary-menu");

    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
      menu.classList.toggle("is-open");
    });
  });
});

$(document).ready(function () {
  var swiper = new Swiper(".yachtswiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    pagination: false,
    loop: true,
    speed: 5000,
    freeMode: false,
    loopedSlides: 5,
    parallax: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: { delay: 3000, disableOnInteraction: false },
    allowTouchMove: true,
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 0 },
      768: { slidesPerView: 1, spaceBetween: 0 },
      1024: { slidesPerView: 1, spaceBetween: 0 },
      1280: { slidesPerView: 1, spaceBetween: 0 },
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".js-panel-trigger");
  const panels = document.querySelectorAll(".slide-panel");

  const closePanel = (panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.querySelector(trigger.dataset.panelTarget);
      if (!panel) return;

      // Open panel
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  panels.forEach((panel) => {
    panel
      .querySelector(".slide-panel__close")
      .addEventListener("click", () => closePanel(panel));

    panel
      .querySelector(".slide-panel__overlay")
      .addEventListener("click", () => closePanel(panel));
  });
});
