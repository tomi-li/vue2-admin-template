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

  Vue.filter('byteToSize', (bytes, decimals) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1000;
    const dm = decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${window.parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
  });

  Vue.filter('ellipses', (str, limitation = 30) => {
    if (str.length < limitation) return str;
    return `${str.substring(0, limitation)} ...`;
  });
}
