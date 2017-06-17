// Store
import { store } from './main';

// Layout
import Layout from './components/layouts/content';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';

// Pages
import ReportedUserList from './pages/Monitoring/ReportedUserList';
import BanedUserList from './pages/Monitoring/BanedUserList';
import BanedHistory from './pages/Monitoring/BanedHistory';
// import ReplayList from './pages/Monitoring/ReplyVideoList';
import LiveList from './pages/Monitoring/Live';
import PhotoList from './pages/Monitoring/PhotoList';
import UserDetail from './pages/User/UserDetail';
import UserList from './pages/User/UserList';
import PartnerList from './pages/User/PartnerList';
import CashOutUserList from './pages/Billing/CashOutUserList';
import DiamondIncomeList from './pages/Billing/DiamondIncomeList';
import DiamondToCoinList from './pages/Billing/DiamondToCoinList';
import CashOutRequests from './pages/Billing/CashOutRequests';
import FloatBanner from './pages/Campaigns/FloatBanner';
import Banner from './pages/Campaigns/Banner';
import Event from './pages/Upcoming/Event';
import FeedbackList from './pages/CustomerService/FeedbackList';
import FilteredWordList from './pages/Operations/FilteredWordList';
import TrendingTags from './pages/Operations/TrendingTags';
import AdministratorList from './pages/Sytem/AdministratorList';
import RoleList from './pages/Sytem/RoleList';
import RolePermissions from './pages/Sytem/RolePermissions';

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/logout',
      component: Logout,
    },
    {
      path: '/',
      name: 'Index',
      component: Layout,
      beforeEnter(previous, current, next) {
        if (!store.getters.user() || Object.keys(store.getters.user()).length === 0) next({ name: 'Login' });
        next();
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'customer-service',
          name: 'Customer Service',
          redirect: { name: 'Feedback List' },
          component: Index,
          children: [
            { path: 'feedback-list', name: 'Feedback List', component: FeedbackList },
          ],
        },
        {
          path: 'monitoring',
          name: 'Monitoring',
          component: Index,
          children: [
            { path: 'reported-user-list', name: 'Reported User List', component: ReportedUserList },
            { path: 'banned-user-list', name: 'Banned User List', component: BanedUserList },
            { path: 'ban-history', name: 'Ban History', component: BanedHistory },
            { path: 'photo', name: 'Photo', component: PhotoList },
            { path: 'live', name: 'Live', component: LiveList },
            //{ path: 'replay', name: 'Replay Video', component: ReplayList },
          ],
        },
        {
          path: 'campaigns',
          name: 'Campaigns',
          component: Index,
          children: [
            { path: 'banner', name: 'Banner', component: Banner },
            { path: 'float-banner', name: 'Float Banner', component: FloatBanner },
          ],
        },
        {
          path: 'user',
          name: 'User Information',
          component: Index,
          redirect: { name: 'User List' },
          children: [
            { path: 'list', name: 'User List', component: UserList },
            { path: 'detail/:id', name: 'User Detail', component: UserDetail, hide: true },
            { path: 'partners', name: 'Partner List', component: PartnerList },
          ],
        },
        {
          path: 'billing',
          name: 'User Billing',
          component: Index,
          redirect: '/index/billing/cash-out-user',
          children: [
            { path: 'cash-out', name: 'Cash Out User List', component: CashOutUserList },
            { path: 'diamond-income', name: 'Diamond Income List', component: DiamondIncomeList },
            { path: 'diamond-to-coins', name: 'Diamond To Coins List', component: DiamondToCoinList },
            { path: 'cash-out-request', name: 'Cash Out Requests', component: CashOutRequests },
          ],
        },
        {
          path: 'upcoming',
          name: 'Upcoming',
          component: Index,
          children: [
            { path: 'event', name: 'Event', component: Event },
          ],
        },
        {
          path: 'operations',
          name: 'App View Operations',
          component: Index,
          children: [
            { path: 'filtered-word', name: 'Filtered Word List', component: FilteredWordList },
            { path: 'trending-tags', name: 'Trending Tags', component: TrendingTags },
          ],
        },
        {
          path: 'system',
          name: 'System',
          component: Index,
          children: [
            { path: 'administrator', name: 'Administrators', component: AdministratorList },
            { path: 'roles', name: 'Role', component: RoleList },
            { path: 'roles/:id', name: 'Role Permissions', component: RolePermissions, hide: true },
          ],
        },
        {
          path: '*',
          redirect: () => ({ name: 'Dashboard' }),
        },
      ],
    },
  ],
};
