/* eslint-disable global-require,import/no-dynamic-require */
// components
import * as utils from '../utils';
import Navigation from './navigation';
import Button from './Button';
import Modal from './Modal';
import Footer from './footer';
import TopNavigation from './topnavbar';
import Page from './Page';

let config = null;

require.ensure([], (require) => {
  config = require('../config');
}, 'config');

function plugin(Vue) {
  // 注册组件
  Vue.component('top-navigation', TopNavigation);
  Vue.component('navigation', Navigation);
  Vue.component('page-footer', Footer);
  Vue.component('i-button', Button);
  Vue.component('i-modal', Modal);
  Vue.component('i-page', Page);
  /**
   * 添加通用属性和方法
   */
  Object.defineProperties(Vue.prototype, {
    utils: {
      get() {
        return utils;
      },
    },
    $config: {
      get() {
        return config;
      },
    },
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
export default plugin;
