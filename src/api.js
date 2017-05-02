import axios from 'axios';

const URL_BASE = 'http://localhost:3000/';

function getUrl(path) {
  return `${URL_BASE}${path}`;
}

export default {
  login: {
    url: getUrl('posts'),
  },
  users: {
    url: getUrl('users'),
  },
  userDetail: {
    url: getUrl('users/1'),
  },
};

export function request(api, params = {}) {
  return axios({
    url: api.url,
    method: api.method || 'get',
    data: params,
    params,
  }).then(res => ({ data: res.data, res }));
}
