/**
 * vue router的配置
 * Created by xinchao.dou on 2016/9/2.
 */

import main from './modules/main.vue';
import minor from './modules/minor.vue';

export default {
  routes: [
    {
      // 跳转中间页
      path: '/',
      component: main
    },
    {
      path: '/dashboard/main',
      component: main
    },
    {
      path: '/dashboard/minor',
      component: minor
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
};
