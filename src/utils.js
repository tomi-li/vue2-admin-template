import Vue from 'vue';
import $ from 'jquery';
import toastr from 'toastr';
import _remove from 'lodash/remove';
import _each from 'lodash/forEach';
import 'toastr/toastr.scss';
import ConfirmModal from './components/modal/ConfirmModal';
import AlertModal from './components/modal/AlertModal';


/**
 * 取地址栏参数
 * @param name
 * @returns {undefined}
 */
export function getUrlParams(name) {
  const reg = new RegExp(`(^|&|\\?)${name}=([^&]*)(&|$)`, 'i');
  const param = window.location.href.substring(1).match(reg);
  if (param !== null) {
    return param[2];
  }
  return undefined;
}

/**
 * @returns {boolean}
 */
export function isInWeChat() {
  return /MicroMessenger/i.test(navigator.userAgent.toLowerCase());
}

/**
 * Serialize Object
 * @param object
 * @returns {string}
 */
export function serialize(object) {
  let str = '';

  _each(Object.keys(object), (key) => {
    if (str !== '') {
      str += '&';
    }
    str += `${key}=${encodeURIComponent(object[key])}`;
  });
  return str;
}

// make a modal stack
export function modal(VUEModal, params = {}) {
  return new Promise((resolve, reject) => {
    this.modalStack = this.modalStack || [];
    const modalStack = this.modalStack;
    $('body').append('<div id="modal"></div>');

    const modalId = 1050 + (modalStack.length * 50);
    const vm = new Vue({
      id: modalId,
      data: { params },
      methods: {
        ok(value) {
          $(vm.$el).modal('hide');
          resolve(value);
        },
        dismiss(value) {
          $(vm.$el).modal('hide');
          reject(value);
        },
      },
      template: `<VUEModal :id="${modalId}" style="z-index:${modalId}" :params="params" :ok="ok" :dismiss="dismiss"></VUEModal>`,
      components: { VUEModal },
    }).$mount('#modal');

    this.modalStack.push(vm);

    $(vm.$el).modal();
    $(vm.$el).on('hidden.bs.modal', () => {
      vm.$destroy();
      $(`#${vm.$options.id}`).remove();
      _remove(modalStack, modalInstance => modalInstance === vm);
    });
  }).catch(err => console.err(err));
}

export function alert(content, title) {
  return this.modal(AlertModal, { content, title });
}

export function confirm(content, title) {
  return this.modal(ConfirmModal, { content, title });
}


export const toast = {
  /**
   type: 'error',
   title: 'Title example',
   body: 'This is example of Toastr notification box.',
   showCloseButton: true,
   timeout: 600
   */
  warn(message, options) {
    toastr.warn(message, options);
  },
  info(message, options) {
    toastr.info(message, options);
  },
  error(message, options) {
    toastr.error(message, options);
  },
  success(message, options) {
    toastr.success(message, options);
  },
};


export function cloneStateInLocalStorage(state) {
  localStorage.setItem('State', JSON.stringify(state));
}

export function restoreStateFromLocalStorage() {
  console.log('[store] restored from localStorage');
  const defaultState = {
    user: {},
  };
  let previousState;
  try {
    previousState = JSON.parse(localStorage.getItem('State'));
    return previousState || defaultState;
  } catch (e) {
    return defaultState;
  }
  // TODO reload the user with token. if expired. clean self and logout.
}

