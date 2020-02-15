import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import './assets/css/reset.css'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;
function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}
function resize() {

  var docEl = document.documentElement,
    cliWidth = docEl.getBoundingClientRect().width,
    designWidth = 37.5,
    rem = cliWidth / designWidth;
  docEl.style.fontSize = rem + 'px'
}
if (_isMobile()) {
  window.addEventListener('resize', resize, false)
  document.addEventListener('DOMContentLoaded', resize, false)
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
