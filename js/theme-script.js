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

  
});

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("primary-menu");

    toggle.addEventListener("click", function () {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
      toggle.classList.toggle("active");
      menu.classList.toggle("is-open");
    });
  });

$(document).ready(function () {
  var swiper = new Swiper(".yachtswiper", {
    slidesPerView: 2.1,
    spaceBetween: 10,
    grabCursor: true,
    pagination: false,
    loop: true,
    speed: 5000,
    freeMode: false,
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

  const PHONE = "971565407292";
  const BASE_URL = window.location.origin + window.location.pathname;

  const closePanel = (panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (location.hash === `#${panel.id}`) {
      history.pushState(null, "", BASE_URL);
    }
  };

  const openPanel = (panel) => {
    // Close other panels
    panels.forEach(closePanel);

    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Update URL with panel ID
    history.pushState(null, "", `#${panel.id}`);

    // Update WhatsApp link
    updateWhatsappLink(panel);
  };

  const updateWhatsappLink = (panel) => {
    const yachtId = panel.dataset.yachtId;
    const yachtTitle =
      panel.querySelector(".slide-panel__title")?.innerText || "this yacht";

    const yachtUrl = `${BASE_URL}#${panel.id}`;

    const message = `Hello, Can I know the availability of ${yachtTitle}?\n${yachtUrl}`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappLink = panel.querySelector(".js-whatsapp-link");

    if (whatsappLink) {
      whatsappLink.href = `https://wa.me/${PHONE}?text=${encodedMessage}`;
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panel = document.querySelector(trigger.dataset.panelTarget);
      if (!panel) return;
      openPanel(panel);
    });
  });

  panels.forEach((panel) => {
    panel
      .querySelector(".slide-panel__close")
      ?.addEventListener("click", () => closePanel(panel));

    panel
      .querySelector(".slide-panel__overlay")
      ?.addEventListener("click", () => closePanel(panel));
  });

  // 🔁 Open panel if URL contains ID
  if (location.hash) {
    const panel = document.querySelector(location.hash);
    if (panel?.classList.contains("slide-panel")) {
      openPanel(panel);
    }
  }

  // 🔙 Close on browser back
  window.addEventListener("popstate", () => {
    panels.forEach(closePanel);
  });
});
