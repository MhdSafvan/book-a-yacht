$(document).ready(function () {

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 30) {
      $("header").addClass("sticky-header");
    } else {
      $("header").removeClass("sticky-header");
    }
  });

  const breakpoint = 1024;
  const $dropdown = $('.dropdown');
  const $trigger = $('.dropdown > a');

  function isDesktop() {
    return window.innerWidth >= breakpoint;
  }

  function bindDesktop() {
    $dropdown
      .on('mouseenter.dropdown', function () {
        $(this).addClass('is-open');
      })
      .on('mouseleave.dropdown', function () {
        $(this).removeClass('is-open');
      });
  }

  function bindMobile() {
    $trigger.on('click.dropdown', function (e) {
      e.preventDefault();
      const $parent = $(this).parent('.dropdown');

      // Close other dropdowns
      $('.dropdown').not($parent).removeClass('is-open');

      $parent.toggleClass('is-open');
    });

    // Close when tapping outside
    $(document).on('click.dropdown', function (e) {
      if (!$(e.target).closest('.dropdown').length) {
        $('.dropdown').removeClass('is-open');
      }
    });
  }

  function reset() {
    $dropdown.off('.dropdown');
    $trigger.off('.dropdown');
    $(document).off('.dropdown');
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
  $(window).on('resize', init);
  

});


document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');

    toggle.addEventListener('click', function () {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('is-open');
    });
});








