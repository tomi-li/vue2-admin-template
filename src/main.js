import 'jquery';
import 'bootstrap';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './public/scss/style.scss';
import './public/animate.css';
import './public/inspinia';

import * as utils from './utils';
import API from './api';
import RouterConfig from './routers';
import CustomComponents from './components';
import RegisterFilter from './filters';
import RegisterDirectives from './directives';
import Store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(CustomComponents);

RegisterFilter(Vue);
RegisterDirectives(Vue);

export const store = Store(Vuex);
const router = new VueRouter(RouterConfig);

// set page title to route name
router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});


// static configurations
let config = null;
require.ensure([], (require) => {
  config = require('../config');
}, 'config');

// define short hands
Object.defineProperties(Vue.prototype, {
  utils: {
    get() {
      return utils;
    },
  },
  API: {
    get() {
      return API;
    },
  },
  $config: {
    get() {
      return config;
    },
  },
});


// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h('router-view'),
});
