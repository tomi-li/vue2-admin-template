import main from './modules/main.vue';
import minor from './modules/minor.vue';

export default {
  routes: [
    {
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
    // redirect all unmatched url to root
    {
      path: '*',
      redirect: '/'
    }
  ]
};
