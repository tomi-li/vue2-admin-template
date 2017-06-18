import _ from 'lodash';
import { cloneStateInLocalStorage, restoreStateFromLocalStorage } from '../utils';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const myPluginWithSnapshot = (store) => {
  store.subscribe((mutation, state) => {
    const nextState = _.cloneDeep(state);
    cloneStateInLocalStorage(nextState);
  });
};

export default (Vuex) => {
  const store = new Vuex.Store({
    state: restoreStateFromLocalStorage(),
    actions,
    mutations,
    getters,
    plugins: process.env.NODE_ENV !== 'production'
      ? [myPluginWithSnapshot]
      : [],
  });

  return store;
};
