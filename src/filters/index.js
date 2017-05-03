import Moment from 'moment';

export default function RegisterFilter(Vue) {
  Vue.filter('date', value => Moment(value).format('YYYY-MM-DD'));

  Vue.filter('datetime', value => Moment(value).format('YYYY-MM-DD HH:mm'));

  Vue.filter('banReason', (value) => {
    switch (value) {
      case 0:
        return 'Others';
      case 1:
        return 'Inappropriate avatar';
      case 2:
        return 'Inappropriate video';
      case 3:
        return 'Inappropriate event poster';
      case 4:
        return 'Offensive language';
      case 5:
        return 'Underage';
      default:
        return 'Others';
    }
  });
}
