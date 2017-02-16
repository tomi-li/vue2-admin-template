/**
 * 通用处理工具
 * Created by xinchao.dou on 2016/9/6.
 */

/**
 * 取地址栏参数
 * @param name
 * @returns {string}
 */
export function getUrlParams(name) {
  var reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)', 'i');
  var param = window.location.href.substring(1).match(reg);
  if (param !== null) {
    return param[2];
  } else {
    return undefined;
  }
};
/**
 * 生成模版文件，生成后的html文件头部包含样式信息，不会影响其他组建样式
 * @param style
 * @param html
 * @returns {string}
 */
export function generatorTemplate(style, html) {
  return '<style>' + style + '</style>' + html;
}
/**
 * 动态加载script文件
 * @param src
 * @param onload
 */
export function javascriptLoader(src, onload) {
  let _script = document.createElement('script');
  _script.setAttribute('src', src);
  _script.setAttribute('type', 'text/javascript');
  _script.onload = onload;
  document.head.appendChild(_script);
}
/**
 * 获取配置文件
 * @param cb
 */
export function getConfig(cb) {
  require.ensure([], require => {
    cb(require('src/config'));
  }, 'config');
}

/**
 * 判断是否是微信打开的页面
 * @returns {boolean}
 */
export function isInWeChat() {
  return /MicroMessenger/i.test(navigator.userAgent.toLowerCase());
}
