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
  userList: new API('account/'),
  userDetail: new API('account/:id/'),
  userLevel: new API('account/:id/level/'),
  isBanned: new API('account/:id/is-banned/'),
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

  ban: new API('ban/setBan', { method: 'post' }),
  unBan: new API('ban/setUnBan', { method: 'post' }),
  // block
  blockedUserList: new API('block/index'),
  isBlocked: new API('block/isBlocked', { method: 'post' }),
  block: new API('block/setBlock', { method: 'post' }),
  unBlock: new API('block/setUnBlock', { method: 'post' }),
};

function replacePathVariables(url, params) {
  if (params === {}) {
    return url;
  }
  const regex = /\/:(\w+)/gm;
  let formattedURL = url;
  let m = regex.exec(formattedURL);
  while (m) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }
    if (params[m[1]] === undefined) {
      console.warn(`"${m[1]}" is not provided in params`);
      return formattedURL;
    }
    formattedURL = formattedURL.replace(`:${m[1]}`, params[m[1]]);
    m = regex.exec(formattedURL);
  }
  return formattedURL;
}


export function request(api, params = {}) {
  const requestURL = replacePathVariables(api.url, params);
  console.log(requestURL);
  return axios({
    url: requestURL,
    method: api.method,
    data: params,
    params,
  }).then(res => ({ data: res.data, res }));
}

