// Store
import { store } from './main';

// Layout
import Layout from './components/layouts/content';
import Login from './pages/Login';
import Index from './pages/Index';

// Pages
import ReportedUserList from './pages/Monitoring/ReportedUserList';
import BanedUserList from './pages/Monitoring/BanedUserList';
import BanedHistory from './pages/Monitoring/BanedHistory';
// import ReplayList from './pages/Monitoring/ReplyVideoList';
import LiveList from './pages/Monitoring/Live';
import PhotoList from './pages/Monitoring/PhotoList';
import UserDetail from './pages/User/UserDetail';
import UserDetailBasicProfileIndex from './pages/User/UserDetail/BasicProfile/BasicProfileIndex';
import UserDetailBasicInfo from './pages/User/UserDetail/BasicProfile/BasicInfo';
import UserDetailComments from './pages/User/UserDetail/BasicProfile/Comments';
import UserDetailBlockedUsers from './pages/User/UserDetail/BasicProfile/BlockedUsers';
import UserDetailBannedHistory from './pages/User/UserDetail/BasicProfile/BannedHistory';
import UserBillingIndex from './pages/User/UserDetail/Billing/BillingIndex';
import GiftSent from './pages/User/UserDetail/Billing/GiftSent';
import UserList from './pages/User/UserList';
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
      path: '/',
      name: 'Index',
      component: Layout,
      beforeEnter(previous, current, next) {
        if (!store.getters.user() || Object.keys(store.getters.user()).length === 0) next({ name: 'Login' });
        next();
      },
      children: [
        {
          path: 'customer-service',
          name: 'Customer Service',
          icon: 'fa-comments',
          redirect: { name: 'Feedback List' },
          component: Index,
          children: [
            { path: 'feedback-list', name: 'Feedback List', component: FeedbackList },
          ],
        },
        {
          path: 'monitoring',
          name: 'Monitoring',
          icon: 'fa-crosshairs',
          component: Index,
          children: [
            { path: 'reported-user-list', name: 'Reported User List', component: ReportedUserList },
            { path: 'banned-user-list', name: 'Banned User List', component: BanedUserList },
            { path: 'ban-history', name: 'Ban History', component: BanedHistory },
            { path: 'photo', name: 'Photo', component: PhotoList },
            { path: 'live', name: 'Live', component: LiveList },
          ],
        },
        {
          path: 'campaigns',
          name: 'Campaigns',
          icon: 'fa-tasks',
          component: Index,
          children: [
            { path: 'banner', name: 'Banner', component: Banner },
            { path: 'float-banner', name: 'Float Banner', component: FloatBanner },
          ],
        },
        {
          path: 'user',
          name: 'User Information',
          icon: 'fa-user',
          component: Index,
          redirect: { name: 'User List' },
          children: [
            { path: 'list', name: 'User List', component: UserList },
            {
              path: 'detail/:id',
              name: 'User Detail',
              component: UserDetail,
              redirect: { name: 'User Basic Profile' },
              hide: true,
              children: [
                {
                  path: 'basic-profile',
                  name: 'User Basic Profile',
                  component: UserDetailBasicProfileIndex,
                  redirect: { name: 'Basic Info' },
                  children: [
                    { path: 'basic-info', name: 'Basic Info', component: UserDetailBasicInfo },
                    { path: 'comments', name: 'Comments', component: UserDetailComments },
                    { path: 'replay', name: 'Replay', component: UserDetailBasicInfo },
                    { path: 'title-history', name: 'Title History', component: UserDetailBasicInfo },
                    { path: 'photos', name: 'Photos', component: UserDetailBasicInfo },
                    { path: 'blocked-users', name: 'Blocked Users', component: UserDetailBlockedUsers },
                    { path: 'banned-history', name: 'Banned History', component: UserDetailBannedHistory },
                  ],
                },
                {
                  path: 'basic-profile',
                  name: 'User Billing',
                  component: UserBillingIndex,
                  redirect: { name: 'Gift Sent' },
                  children: [
                    { path: 'gift-sent', name: 'Gift Sent', component: GiftSent },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: 'billing',
          name: 'Billing',
          icon: 'fa-money',
          component: Index,
          redirect: '/index/billing/cash-out-user',
          children: [
            { path: 'cash-out-request', name: 'Cash Out Requests', component: CashOutRequests },
          ],
        },
        {
          path: 'upcoming',
          name: 'Upcoming',
          icon: 'fa-line-chart',
          component: Index,
          children: [
            { path: 'event', name: 'Event', component: Event },
          ],
        },
        {
          path: 'operations',
          name: 'App View Operations',
          icon: 'fa-sitemap',
          component: Index,
          children: [
            { path: 'filtered-word', name: 'Filtered Word List', component: FilteredWordList },
            { path: 'trending-tags', name: 'Trending Tags', component: TrendingTags },
          ],
        },
        {
          path: 'system',
          name: 'System',
          icon: 'fa-dashboard',
          component: Index,
          children: [
            { path: 'administrator', name: 'Administrators', component: AdministratorList },
            { path: 'roles', name: 'Role', component: RoleList },
            { path: 'roles/:id', name: 'Role Permissions', component: RolePermissions, hide: true },
          ],
        },
        // {
        //  path: '*',
        //  redirect: () => ({ name: 'Customer Service' }),
        // },
      ],
    },
  ],
};
