import 'bootstrap/dist/css/bootstrap.css';
import './public/style.css';
import './public/animate.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import './public/inspinia';
import 'font-awesome/css/font-awesome.min.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import RouterConfig from './routers';
import CustomComponents from 'components/index';
import RegisterFilter from './filters/index';
import RegisterDirectives from './directives/index';
import Store from './store';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(CustomComponents);

RegisterFilter(Vue);
RegisterDirectives(Vue);

const store = Store(Vuex);
const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h('page')
});

console.clear();
