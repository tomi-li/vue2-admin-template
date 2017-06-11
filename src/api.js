import axios from 'axios';
import { store } from './main';

const URL_BASE = 'http://localhost:5000/';

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

/**
 * Custom Error for display
 */
class ResponseError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}

export function request(api, params = {}) {
  const requestURL = replacePathVariables(api.url, params);
  const user = store.getters.user();
  // TODO using object to assert properties.
  return axios({
    url: requestURL,
    method: api.method,
    data: params,
    headers: { Authorization: user && user.token },
    params,
  }).then((res) => {
    const errorMessage = res.headers['error-message'];
    const errorCode = res.headers['error-code'];

    if (errorCode !== undefined && errorCode !== '0') {
      throw new ResponseError(errorMessage, errorCode);
    }
    return { data: res.data, res };
  });
}


class API {
  constructor(url, { method, baseUrl } = {}) {
    if (baseUrl) {
      this.url = `${baseUrl}${url}`;
    } else {
      this.url = `${URL_BASE}${url}`;
    }
    this.method = method || 'get';
  }

  request(params) {
    return request(this, params);
  }
}

export default {
  // account
  userList: new API('account/'),
  userDetail: new API('account/:id/'),
  userLevel: new API('account/:id/level/'),
  isBanned: new API('account/:id/is-banned/'),
  cashOutUser: new API('billing/diamond/cashout-users'),
  diamondIncome: new API('billing/diamond/diamond-earning-users'),
  convertCoinUser: new API('billing/diamond/convert-coin-users'),
  cashOutRequests: new API('treasure/cash-out/details'),
  topEventList: new API('topevent/index', { method: 'post' }),
  photos: new API('photo/index'),

  filteredWordList: new API('text-filter/get-pagination-words'),
  // abuse
  clear: new API('abuse/clear'),
  // ban

  banDetail: new API('ban/detail'),
  ban: new API('ban/setBan', { method: 'post' }),
  unBan: new API('ban/setUnBan', { method: 'post' }),
  // block
  blockedUserList: new API('block/index'),
  isBlocked: new API('block/isBlocked', { method: 'post' }),
  block: new API('block/setBlock', { method: 'post' }),
  unBlock: new API('block/setUnBlock', { method: 'post' }),
  // admin
  adminCreate: new API('admin/', { method: 'post' }),
  adminDelete: new API('admin/:id', { method: 'delete' }),
  adminList: new API('admin/'),
  adminLogin: new API('admin/login/', { method: 'post' }),
  adminLogout: new API('admin/logout/', { method: 'post' }),
  adminUpdatePassword: new API('admin/:id/update-password', { method: 'post' }),
  roleList: new API('admin/role/'),
  roleCreate: new API('admin/role/', { method: 'post' }),
  roleRemove: new API('admin/role/:id/', { method: 'delete' }),
  roleUpdate: new API('admin/role/:id/', { method: 'put' }),
  roleDetail: new API('admin/role/:id/', { method: 'get' }),
  // event
  eventList: new API('event/'),
  // banner
  bannerList: new API('banner/'),
  floatBannerList: new API('banner/float/'),
  // Reported User
  reportedUserList: new API('reported-user/'),
  // Banned User
  banedUserList: new API('banned-user/'),
  // Feedback
  feedbackList: new API('feedback/'),
  feedbackRemove: new API('feedback/:id', { method: 'delete' }),
};

