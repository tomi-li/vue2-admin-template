/**
 * 登录、注册页面的actions
 * Created by douxc on 2016/10/23.
 */
import Vue from 'vue';
import * as types from '../types';
/**
 * 登录
 * @param commit
 * @param user
 */
export const login = (test, user) => {
  console.log(test);
  let { commit } = test;
  return new Promise((resolve, reject) => {
    Vue.http.get('http://jsonplaceholder.typicode.com/users/1').then(response => {
      commit(types.LOGIN, response.body);
      resolve();
    }, error => {
      reject(error);
    });
  }).catch(rejected => {
    console.log(rejected);
  });
};
/**
 * 注册
 * @param commit
 * @param info
 * @returns {Promise}
 */
export const register = ({ commit }, info) => {
  return new Promise((resolve, reject) => {
    Vue.http.post('', { info }).then(response => {
      commit(types.REGISTER, response.json());
      resolve();
    }, error => {
      reject(error);
    });
  }).catch(rejected => {
    console.log(rejected);
  });
};
