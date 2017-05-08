import axios from 'axios';

// const URL_BASE = 'http://localhost:3000/';
const URL_BASE = 'http://192.168.128.62:8099/';

class API {
  constructor(url, { method, baseUrl } = {}) {
    if (baseUrl) {
      this.url = `${baseUrl}${url}`;
    } else {
      this.url = `${URL_BASE}${url}`;
    }

    this.method = method || 'get';
  }
}

export default {
  login: new API('posts'),
  // user list
  userList: new API('account/index'),
  userDetail: new API('account/detail'),
  banedUserList: new API('ban/index'),
  abuseSummary: new API('abuse/summary'),
  cashOutUser: new API('billing/diamond/cashout-users'),
  diamondIncome: new API('billing/diamond/diamond-earning-users'),
  convertCoinUser: new API('billing/diamond/convert-coin-users'),
  cashOutRequests: new API('treasure/cash-out/details'),
  floatBannerList: new API('float-banner/get-all'),
  bannerList: new API('adv/index', { method: 'post' }),
  eventList: new API('event/index', { method: 'post' }),
  topEventList: new API('topevent/index', { method: 'post' }),
};

export function request(api, params = {}) {
  return axios({
    url: api.url,
    method: api.method,
    data: params,
    params,
  }).then(res => ({ data: res.data, res }));
}
