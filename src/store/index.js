/**
 * Created by douxc on 2016/10/23.
 */
import actions from './actions';
import modules from './modules';
import getters from './getters';

export default (Vuex) => {
  const store = new Vuex.Store({
    actions,
    getters,
    modules,
  });

  return store;
};
