// components
import api from './plugins/api';
import * as utils from './plugins/utils';
import Content from './content.vue';
import Button from './Button.vue';
import Modal from './Modal.vue';

// 获取配置，并将配置文件存入config模块
let config = null;
const Footer = r => require.ensure([], () => r(require('./footer.vue')), 'layout');
const Navigation = r => require.ensure([], () => r(require('./navigation.vue')), 'layout');
const TopNavigation = r => require.ensure([], () => r(require('./topnavbar.vue')), 'layout');

require.ensure([], require => {
  config = require('../config');
}, 'config');

function plugin(Vue) {
  // 注册组件
  Vue.component('page', Content);
  Vue.component('top-navigation', TopNavigation);
  Vue.component('navigation', Navigation);
  Vue.component('page-footer', Footer);
  Vue.component('i-button', Button);
  Vue.component('i-modal', Modal);
  /**
   * 添加通用属性和方法
   */
  Object.defineProperties(Vue.prototype, {
    api: {
      get() {
        return api;
      }
    },
    utils: {
      get() {
        return utils;
      }
    },
    $config: {
      get() {
        return config;
      }
    }
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
export default plugin;
