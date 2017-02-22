/**
 * 各模块数据维护
 * Created by xinchao.dou on 2016/10/24.
 */
import * as types from '../types';
const state = { userInfo: {} };

const mutations = {
  [types.LOGIN](state, userInfo) {
    // 成功登录，获取到了用户信息，保存
    state.userInfo = userInfo;
    console.log(userInfo);
  }
};

export default {
  state, mutations
};
