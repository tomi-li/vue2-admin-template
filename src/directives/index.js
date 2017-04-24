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
}
