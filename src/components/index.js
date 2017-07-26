/* eslint-disable global-require,import/no-dynamic-require */
// components
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
import DateRangePicker from './form/DateRangePicker';
import Select from './form/Select';
import FileUpload from './form/FileUpload';
import NumberRangePicker from './form/NumberRangePicker';
// ui
import Page from './ui/Page';
import Box from './ui/Box';
import Button from './ui/Button';
import ProgressBar from './ui/ProgressBar';
import List from './ui/List';
import Tabs from './ui/Tabs';
import Tab from './ui/Tab';
import Panel from './ui/Panel';
import Spinner from './ui/Spinner';
import TabNavigation from './ui/TabNavigation';
// modal
import Modal from './modal/Modal';
// normal component
import Gallery from './Gallery';
import UserLabel from './UserLabel';
import Avatar from './Avatar';
import Gender from './Gender';
import ListItem from './ListItem';
import BooleanText from './BooleanText';
import DataTable from './DataTable';
import DataTableRow from './DataTableRow';
import VideoPlayer from './VideoPlayer';

export default (Vue) => {
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
  Vue.component('i-date-range-picker', DateRangePicker);
  Vue.component('i-number-range-picker', NumberRangePicker);
  Vue.component('i-checkbox-group', CheckboxGroup);
  Vue.component('i-radio-group', RadioGroup);
  Vue.component('i-progress-bar', ProgressBar);
  Vue.component('i-list', List);
  Vue.component('i-list-item', ListItem);
  Vue.component('i-boolean-text', BooleanText);
  Vue.component('i-file-upload', FileUpload);
  Vue.component('i-panel', Panel);
  Vue.component('i-video-player', VideoPlayer);
  Vue.component('i-tab-navigation', TabNavigation);
};
