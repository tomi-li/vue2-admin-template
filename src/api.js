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
  users: new API('account/index'),
  userDetail: new API('account/detail'),
};

export function request(api, params = {}) {
  return axios({
    url: api.url,
    method: api.method,
    data: params,
    params,
  }).then(res => ({ data: res.data, res }));
}
