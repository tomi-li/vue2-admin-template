import axios from 'axios/index';
import { store } from './main';
import Config from './config';

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
      throw new Error(`"${m[1]}" is not provided in params`);
    }
    formattedURL = formattedURL.replace(`:${m[1]}`, params[m[1]]);
    // eslint-disable-next-line no-param-reassign
    delete params[m[1]];
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

function multipartToFormData(params) {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
}

export function request(api, params = {}) {
  const requestURL = replacePathVariables(api.url, params);
  const user = store.getters.user();

  const requestParams = {
    url: requestURL,
    method: api.method,
    headers: { Authorization: user && user.token },
  };

  if (api.method !== 'get') {
    if (!api.multipart) {
      requestParams.data = params;
    } else {
      requestParams.data = multipartToFormData(params);
    }
  } else {
    requestParams.params = params;
  }

  return axios(requestParams).then((res) => {
    const errorMessage = res.headers['error-message'];
    const errorCode = res.headers['error-code'];

    if (errorCode !== undefined && errorCode !== '0') {
      throw new ResponseError(errorMessage, errorCode);
    }
    return Promise.resolve({ data: res.data, res });
  });
}


class API {
  constructor(url, { method, baseUrl, multipart = false } = {}) {
    this.url = (baseUrl)
      ? `${baseUrl}${url}`
      : `${Config.URL_BASE}${url}`;
    this.multipart = multipart;
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
  userSetLevel: new API('account/:id/level/', { method: 'post' }),
  userSetPoint: new API('account/:id/points/', { method: 'post' }),
  userIsBanned: new API('account/:id/is-banned/'),
  userBalance: new API('account/:id/treasures/'),
  userIncome: new API('account/:id/income/'),
  userCashOut: new API('account/:id/cash-out/'),
  ban: new API('account/:id/ban/', { method: 'post' }),
  unBan: new API('account/:id/un-ban/', { method: 'post' }),
  banDetail: new API('account/:id/ban/'),
  block: new API('account/:id/block/', { method: 'post' }),
  unBlock: new API('account/:id/block/', { method: 'post' }),
  blockList: new API('account/:id/block/'),
  userPrivileges: new API('account/:id/privileges/'),
  userSetPrivileges: new API('account/:id/privileges/', { method: 'post' }),
  userComments: new API('account/:id/comments/'),
  // admin
  adminCreate: new API('admin/', { method: 'post' }),
  adminDelete: new API('admin/:id/', { method: 'delete' }),
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
  eventCreate: new API('event/', { method: 'post' }),
  eventDetail: new API('event/:id/'),
  eventEdit: new API('event/:id/', { method: 'put' }),
  eventRemove: new API('event/:id/', { method: 'delete' }),
  // banner
  bannerList: new API('banner/'),
  bannerCreate: new API('banner/', { method: 'post' }),
  bannerRemove: new API('banner/:id/', { method: 'delete' }),
  bannerDetail: new API('banner/:id/'),
  floatBannerList: new API('banner/float/'),
  floatBannerCreate: new API('banner/float/', { method: 'post' }),
  floatBannerDetail: new API('banner/float/:id/'),
  floatBannerDelete: new API('banner/float/:id/', { method: 'delete' }),
  // Reported User
  reportedUserList: new API('reported-user/'),
  reportedUserDetail: new API('reported-user/:id/'),
  // params: 'mark' 1 for ban 2 for ignore
  reportedUserDelete: new API('reported-user/:id/', { method: 'delete' }),
  // Banned User
  banedUserList: new API('banned-user/'),
  // Feedback
  feedbackList: new API('feedback/'),
  feedbackDetail: new API('feedback/:id/', { method: 'get' }),
  feedbackRemove: new API('feedback/:id/', { method: 'delete' }),
  // Photo
  photoList: new API('photo/'),
  photoUpload: new API('photo/', { method: 'post', multipart: true }),
  // Filter Word
  filteredWordList: new API('text-filter/'),
  filteredWordAdd: new API('text-filter/', { method: 'post' }),
  filteredWordRemove: new API('text-filter/:word/', { method: 'delete' }),
  // Tag
  tagList: new API('tag/'),
  tagCreate: new API('tag/', { method: 'post' }),
  tagDetail: new API('tag/:id/', { method: 'get' }),
  tagRemove: new API('tag/:id/', { method: 'delete' }),
  tagEdit: new API('tag/:id/', { method: 'put' }),
  // Broadcast (NBS)
  liveList: new API('live/'),
  liveRecommend: new API('live/:id/recommend/', { method: 'post' }),
  liveUnRecommend: new API('live/:id/un-recommend/', { method: 'post' }),
  liveStatistic: new API('live/:id/statistic'),
};

