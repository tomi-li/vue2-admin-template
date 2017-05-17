import actions from './actions';
import getters from './getters';

export default (Vuex) => {
  const store = new Vuex.Store({
    state: {
      loginUser: {
        name: 'Administrator',
        roll: 'admin',
      },
    },
    actions,
    getters,
  });

  return store;
};
