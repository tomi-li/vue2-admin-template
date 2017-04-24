import axios from 'axios';


export default {
  login: {
    url: 'https://jsonplaceholder.typicode.com/posts',
  },
};


export function request(api) {
  return axios.get(api.url)
    .then(res => res.data);
}
