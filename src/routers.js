import Layout from './components/layouts/content';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import Tabs from './pages/Tabs';
import Index from './pages/Index';
import Users from './pages/Users';
import Gallery from './pages/Gallery';
import Form from './pages/Form';

export default {
  routes: [
    {
      path: '/index',
      name: 'Index',
      redirect: '/index/dashboard',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
        },
        {
          path: 'tabs',
          name: 'Tabs',
          component: Tabs,
        },
        {
          path: 'gallery',
          name: 'Gallery',
          component: Gallery,
        },
        {
          path: 'form',
          name: 'Form',
          component: Form,
        },
        {
          path: '*',
          redirect: 'dashboard',
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
