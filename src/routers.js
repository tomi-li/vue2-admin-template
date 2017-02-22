import page from './components/content.vue';
import main from './modules/main.vue';
import minor from './modules/minor.vue';
import login from './modules/login.vue';

export default {
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/dashboard',
      component: page,
      children: [
        { path: 'main', component: main },
        { path: 'minor', component: minor }
      ]
    },
    // redirect all unmatched url to root
    {
      path: '*',
      redirect: '/dashboard/main'
    }
  ]
};
