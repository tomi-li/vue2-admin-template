import API from '../../api';
import * as types from '../types';

export default {
  login: (context, { email, password }) => (
    API.adminLogin.request({
      email, password,
    }).then((res) => {
      context.commit(types.LOGIN, res.data);
    })
  ),
  logout: (context) => {
    API.adminLogout.request()
      .catch((e) => {
        console.debug(e);
      });
    context.commit(types.LOGOUT);
  },
};
