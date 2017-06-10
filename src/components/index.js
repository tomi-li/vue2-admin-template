/* eslint-disable global-require,import/no-dynamic-require */
// components
import * as utils from '../utils';
import Navigation from './layouts/navigation';
import Footer from './layouts/footer';
import TopNavigation from './layouts/topnavbar';
// form
import Form from './form/Form';
import FormItem from './form/FormItem';
import Radio from './form/Radio';
import RadioGroup from './form/RadioGroup';
import Checkbox from './form/Checkbox';
import CheckboxGroup from './form/CheckboxGroup';
import DatePicker from './form/DatePicker';
import Select from './form/Select';

// ui
import Button from './Button';
import Modal from './modal/Modal';
import Page from './Page';
import Box from './Box';
import Tabs from './Tabs';
import Tab from './Tab';
import Gallery from './Gallery';
import DataTable from './DataTable';
import DataTableRow from './DataTableRow';
import UserLabel from './UserLabel';
import Spinner from './Spinner';
import Avatar from './Avatar';
import Gender from './Gender';
import ProgressBar from './ProgressBar';
import List from './List';
import ListItem from './ListItem';
import BooleanText from './BooleanText';

let config = null;

require.ensure([], (require) => {
  config = require('../config');
}, 'config');

export default (Vue) => {
  // 注册组件
  Vue.component('top-navigation', TopNavigation);
  Vue.component('navigation', Navigation);
  Vue.component('page-footer', Footer);
  Vue.component('i-button', Button);
  Vue.component('i-modal', Modal);
  Vue.component('i-page', Page);
  Vue.component('i-box', Box);
  Vue.component('i-tabs', Tabs);
  Vue.component('i-tab', Tab);
  Vue.component('i-gallery', Gallery);
  Vue.component('i-table', DataTable);
  Vue.component('i-table-row', DataTableRow);
  Vue.component('i-form', Form);
  Vue.component('i-form-item', FormItem);
  Vue.component('i-radio', Radio);
  Vue.component('i-checkbox', Checkbox);
  Vue.component('i-select', Select);
  Vue.component('i-user-label', UserLabel);
  Vue.component('i-spinner', Spinner);
  Vue.component('i-avatar', Avatar);
  Vue.component('i-gender', Gender);
  Vue.component('i-date-picker', DatePicker);
  Vue.component('i-checkbox-group', CheckboxGroup);
  Vue.component('i-radio-group', RadioGroup);
  Vue.component('i-progress-bar', ProgressBar);
  Vue.component('i-list', List);
  Vue.component('i-list-item', ListItem);
  Vue.component('i-boolean-text', BooleanText);

  /**
   * 添加通用属性和方法
   */
  Object.defineProperties(Vue.prototype, {
    utils: {
      get() {
        return utils;
      },
    },
    $config: {
      get() {
        return config;
      },
    },
  });
};
