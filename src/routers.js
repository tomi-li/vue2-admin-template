import Layout from './components/layouts/content';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import Index from './pages/Index';

// User
import UserIndex from './pages/User/Index';
import UserList from './pages/User/UserList';
import PartnerList from './pages/User/PartnerList';
import ReportedUserList from './pages/User/ReportedUserList';
import BanedUserList from './pages/User/BanedUserList';
import BanedHistory from './pages/User/BanedHistory';
import UserDetail from './pages/User/UserDetail';

// Billing
import BillingIndex from './pages/Billing/Index';
import CashOutUserList from './pages/Billing/CashOutUserList';
import DiamondIncomeList from './pages/Billing/DiamondIncomeList';
import DiamondToCoinList from './pages/Billing/DiamondToCoinList';
import CashOutRequests from './pages/Billing/CashOutRequests';

// Video
import VideoIndex from './pages/Video/Index';
import ReplayList from './pages/Video/ReplyVideoList';

// Banner
import BannerIndex from './pages/Banner/Index';
import FloatBanner from './pages/Banner/FloatBanner';
import Banner from './pages/Banner/Banner';

// Event
import Event from './pages/Event/Event';

// Picture
import PictureList from './pages/Picture/Picture';

// Other Operations
import OtherOperationsIndex from './pages/OtherOperations/Index';
import FeedbackList from './pages/OtherOperations/FeedbackList';
import FilteredWordList from './pages/OtherOperations/FilteredWordList';

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
            { path: 'detail/:id', name: 'UserDetail', component: UserDetail, hide: true },
            { path: 'list', name: 'User List', component: UserList },
            { path: 'partners', name: 'Partner List', component: PartnerList },
            { path: 'reported-user-list', name: 'Reported User List', component: ReportedUserList },
            { path: 'banned-user-list', name: 'Banned User List', component: BanedUserList },
            { path: 'ban-history', name: 'Ban History', component: BanedHistory },
          ],
        },
        {
          path: 'billing',
          name: 'Billing',
          redirect: '/index/billing/cash-out-user',
          component: BillingIndex,
          children: [
            { path: 'cash-out', name: 'Cash Out User List', component: CashOutUserList },
            { path: 'diamond-income', name: 'Diamond Income List', component: DiamondIncomeList },
            { path: 'diamond-to-coins', name: 'Diamond To Coins List', component: DiamondToCoinList },
            { path: 'cash-out-request', name: 'Cash Out Requests', component: CashOutRequests },
          ],
        },
        {
          path: 'video',
          name: 'Video',
          redirect: '/index/video/replay-list',
          component: VideoIndex,
          children: [
            { path: 'replay-list', name: 'Replay Video List', component: ReplayList },
          ],
        },
        {
          path: 'banner',
          name: 'Banners',
          redirect: '/index/video/float-banner',
          component: BannerIndex,
          children: [
            { path: 'float-banner', name: 'Float Banner', component: FloatBanner },
            { path: 'banner', name: 'Banner', component: Banner },
          ],
        },
        {
          path: 'picture',
          name: 'Picture',
          component: PictureList,
        },
        {
          path: 'event',
          name: 'Event',
          component: Event,
        },
        {
          path: 'other-operations',
          name: 'OtherOperations',
          component: OtherOperationsIndex,
          children: [
            { path: 'feedback-list', name: 'FeedbackList', component: FeedbackList },
            { path: 'filtered-word-list', name: 'FilteredWordList', component: FilteredWordList },
          ],
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
