/* eslint-disable global-require,import/no-dynamic-require */
// components
import * as utils from '../utils';
import Navigation from './layouts/navigation';
import Footer from './layouts/footer';
import TopNavigation from './layouts/topnavbar';

import Button from './Button';
import Modal from './Modal';
import Page from './Page';
import Box from './Box';
import Tabs from './Tabs';
import Tab from './Tab';
import Gallery from './Gallery';

let config = null;

require.ensure([], (require) => {
  config = require('../config');
}, 'config');

export default (Vue) => {
  // 注册组件
  Vue.component('top-navigation', TopNavigation);
  Vue.component('navigation', Navigation);
  Vue.component('page-footer', Footer);
  Vue.component('i-button', Button);
  Vue.component('i-modal', Modal);
  Vue.component('i-page', Page);
  Vue.component('i-box', Box);
  Vue.component('i-tabs', Tabs);
  Vue.component('i-tab', Tab);
  Vue.component('i-gallery', Gallery);

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
};
