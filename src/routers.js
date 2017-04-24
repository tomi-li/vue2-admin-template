import main from './pages/main.vue';
import minor from './pages/minor.vue';

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
