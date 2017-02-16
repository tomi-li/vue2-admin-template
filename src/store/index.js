/**
 * Created by douxc on 2016/10/23.
 */
import actions from './actions';
import modules from './modules';
import getters from './getters';
export default function(Vuex) {
  const store = new Vuex.Store({
    actions,
    getters,
    modules
  });
  // 启用热替换
  if (module.hot) {
    const api = require('vue-hot-reload-api');
    const Vue = require('vue');

    api.install(Vue);

    // compatibility can be checked via api.compatible after installation
    if (!api.compatible) {
      throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
    }
  }
  return store;
}
