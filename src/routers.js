import Layout from './components/layouts/content';
import Login from './pages/Login';
import Logout from './pages/Logout';
import main from './pages/main';
import Tabs from './pages/Tabs';
import Index from './pages/Index';
import Tables from './pages/Tables';
import Gallery from './pages/Gallery';

export default {
  routes: [
    {
      path: '/index',
      name: 'Index',
      redirect: '/index/main',
      component: Layout,
      children: [
        {
          path: 'main',
          name: 'Main',
          component: main,
        },
        {
          path: 'tabs',
          name: 'Tabs',
          component: Tabs,
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables,
        },
        {
          path: 'gallery',
          name: 'Gallery',
          component: Gallery,
        },
        {
          path: '*',
          redirect: 'main',
        },
      ],
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/logout',
      component: Logout,
    },
    {
      path: '/',
      component: Index,
    },
    // redirect all unmatched url to root
    {
      path: '*',
      redirect: '/',
    },
  ],
};
