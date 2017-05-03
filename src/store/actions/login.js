import Vue from 'vue';
import * as types from '../types';

export const login = (test) => {
  const { commit } = test;
  return new Promise((resolve, reject) => {
    Vue.http.get('http://www.baidu.com')
      .then(
        (response) => {
          commit(types.LOGIN, response.json());
          resolve();
        },
        error => reject(error),
      );
  }).catch(rejected => console.log(rejected));
};

export const register = () => {

};
