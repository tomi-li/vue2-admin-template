import axios from 'axios';


export default {
  login: {
    url: 'http://localhost:3000/posts',
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
