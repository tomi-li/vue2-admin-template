import axios from 'axios';

// const URL_BASE = 'http://localhost:3000/';
const URL_BASE = 'http://localhost:5000/';

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
  // account
  userLevel: new API('account/level/details'),
  userList: new API('account/'),
  kickOff: new API('account/kick-off', { method: 'post' }),
  userDetail: new API('account/detail'),
  abuseSummary: new API('abuse/summary'),
  cashOutUser: new API('billing/diamond/cashout-users'),
  diamondIncome: new API('billing/diamond/diamond-earning-users'),
  convertCoinUser: new API('billing/diamond/convert-coin-users'),
  cashOutRequests: new API('treasure/cash-out/details'),
  floatBannerList: new API('float-banner/get-all'),
  bannerList: new API('adv/index', { method: 'post' }),
  eventList: new API('event/index', { method: 'post' }),
  topEventList: new API('topevent/index', { method: 'post' }),
  photos: new API('photo/index'),
  feedbackList: new API('feedback/index'),
  filteredWordList: new API('text-filter/get-pagination-words'),
  // abuse
  clear: new API('abuse/clear'),
  // ban
  banedUserList: new API('ban/index'),
  banDetail: new API('ban/detail'),
  isBanned: new API('ban/isBanned'),
  ban: new API('ban/setBan', { method: 'post' }),
  unBan: new API('ban/setUnBan', { method: 'post' }),
  // block
  blockedUserList: new API('block/index'),
  isBlocked: new API('block/isBlocked', { method: 'post' }),
  block: new API('block/setBlock', { method: 'post' }),
  unBlock: new API('block/setUnBlock', { method: 'post' }),
};

export function request(api, params = {}) {
  return axios({
    url: api.url,
    method: api.method,
    data: params,
    params,
  }).then(res => ({ data: res.data, res }));
}
