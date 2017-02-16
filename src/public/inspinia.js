/**
 * INSPINIA - Responsive Admin Theme
 * 2.6.2
 *
 * Custom scripts
 */
import $ from 'jquery';

$(document).ready(() => {
  // Full height of sidebar
  function fixHeight() {
    const heightWithoutNavbar = $('body > #wrapper').height() - 61;
    $('.sidebar-panel').css('min-height', heightWithoutNavbar + 'px');

    const navbarHeight = $('nav.navbar-default').height();
    const wrapperHeigh = $('#page-wrapper').height();

    if (navbarHeight > wrapperHeigh) {
      $('#page-wrapper').css('min-height', navbarHeight + 'px');
    }

    if (navbarHeight < wrapperHeigh) {
      $('#page-wrapper').css('min-height', $(window).height() + 'px');
    }

    if ($('body').hasClass('fixed-nav')) {
      if (navbarHeight > wrapperHeigh) {
        $('#page-wrapper').css('min-height', navbarHeight + 'px');
      } else {
        $('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
      }
    }
  }

  $(window).bind('load resize scroll', () => {
    if (!$('body').hasClass('body-small')) {
      fixHeight();
    }
  });

  // Move right sidebar top after scroll
  $(window).scroll(() => {
    if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
      $('#right-sidebar').addClass('sidebar-top');
    } else {
      $('#right-sidebar').removeClass('sidebar-top');
    }
  });

  setTimeout(() => fixHeight());
});

// Minimalize menu when screen is less than 768px
$(window).bind('load resize', () => {
  if ($(document).width() < 769) {
    $('body').addClass('body-small');
  } else {
    $('body').removeClass('body-small');
  }
});
