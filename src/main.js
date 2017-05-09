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

const store = Store(Vuex);
const router = new VueRouter(RouterConfig);

// set page title to route name
router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h('router-view'),
});
