/**
 * 通用处理工具
 * Created by xinchao.dou on 2016/9/6.
 */
import Vue from 'vue';
import $ from 'jquery';
import _remove from 'lodash/remove';
import ConfirmModal from './public/modal/ConfirmModal';
import AlertModal from './public/modal/AlertModal';

/**
 * 取地址栏参数
 * @param name
 * @returns {string}
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
 * 生成模版文件，生成后的html文件头部包含样式信息，不会影响其他组建样式
 * @param style
 * @param html
 * @returns {string}
 */
export function generatorTemplate(style, html) {
  return `<style>${style}</style>${html}`;
}
/**
 * 动态加载script文件
 * @param src
 * @param onload
 */
export function javascriptLoader(src, onload) {
  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', src);
  scriptEl.setAttribute('type', 'text/javascript');
  scriptEl.onload = onload;
  document.head.appendChild(scriptEl);
}

/**
 * 判断是否是微信打开的页面
 * @returns {boolean}
 */
export function isInWeChat() {
  return /MicroMessenger/i.test(navigator.userAgent.toLowerCase());
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
  });
}

export function alert(params) {
  return this.modal(AlertModal, params);
}

export function confirm(params) {
  return this.modal(ConfirmModal, params);
}
