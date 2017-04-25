import $ from 'jquery';

export default function RegisterDirectives(Vue) {
  // DropDown menu
  Vue.directive('dropdown', {
    bind: (el) => {
      const menu = $(el).find('ul');
      const handler = $(el).find('.dropdown-handler');

      $(el).addClass('dropdown');
      handler.attr('data-toggle', 'dropdown');
      menu.addClass('dropdown-menu');
    },
  });

  Vue.directive('minimaliza-sidebar', (el) => {
    $(el).on('click', () => {
      $('body').toggleClass('mini-navbar');

      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(() => $('#side-menu').fadeIn(400), 200);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(() => $('#side-menu').fadeIn(400), 100);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    });
  });
}
