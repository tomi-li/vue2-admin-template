import API from '../../api';
import * as types from '../types';
import { toast } from '../../utils';

export default {
  login: (context, { email, password }) => (
    API.adminLogin.request({
      email, password,
    }).then((res) => {
      context.commit(types.LOGIN, res.data);
    }).catch((e) => {
      console.error(e);
      toast.error('Wrong username or password');
      throw new Error(e);
    })
  ),
  logout: context => (
    API.adminLogout.request()
      .then(() => {
        context.commit(types.LOGOUT);
      })
      .catch((e) => {
        console.error(e);
        toast.error('Fail to logout');
        throw new Error(e);
      })
  ),
};
