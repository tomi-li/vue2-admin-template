/**
 * 自定义组件
 * Created by xinchao.dou on 2016/9/5.
 */
// components
import api from './plugins/api';
import * as utils from './plugins/utils';
import axios from 'axios';
import Content from './content.vue';
import TopNavigation from './topnavbar.vue';
import Navigation from './navigation.vue';
import Footer from './footer.vue';
// 获取配置，并将配置文件存入config模块
let config = null;

require.ensure([], require => {
  config = require('src/config');
}, 'config');

function plugin(Vue) {
  // 注册组件
  Vue.component('page', Content);
  Vue.component('top-navigation', TopNavigation);
  Vue.component('navigation', Navigation);
  Vue.component('page-footer', Footer);
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
    },
    $http: {
      get() {
        return axios;
      }
    }
  });
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}
export default plugin;
