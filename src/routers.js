import Layout from './components/layouts/content';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import Tabs from './pages/Tabs';
import Index from './pages/Index';
import Gallery from './pages/Gallery';
import Form from './pages/Form';

// User
import UserIndex from './pages/User/Index';
import UserList from './pages/User/UserList';
import PartnerList from './pages/User/PartnerList';
import ReportedUserList from './pages/User/ReportedUserList';
import BanedUserList from './pages/User/BanedUserList';
import BanedHistory from './pages/User/BanedHistory';


export default {
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'user',
          name: 'User',
          redirect: '/index/user/list',
          component: UserIndex,
          children: [
            { path: 'list', name: 'User List', component: UserList },
            { path: 'partners', name: 'Partner List', component: PartnerList },
            { path: 'reported-user-list', name: 'Reported User List', component: ReportedUserList },
            { path: 'banned-user-list', name: 'Banned User List', component: BanedUserList },
            { path: 'ban-history', name: 'Ban History', component: BanedHistory },
          ],
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
