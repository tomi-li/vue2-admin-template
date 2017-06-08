/* eslint-disable no-param-reassign */
/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 8/6/17.
 */
import * as types from '../types';

export default {
  [types.LOGIN]: (state, admin) => {
    state.user = admin;
  },
  [types.LOGOUT]: (state) => {
    state.user = undefined;
  },
};
