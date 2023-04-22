// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import axios from 'axios';
import qs from 'qs';
import AFTableColumn from 'af-table-column';
import './assets/style/base.css';
import './assets/style/index.css';

Vue.use(AFTableColumn);


// 导入组件库
import ElementUI from 'element-ui'
// 导入组件样式
import 'element-ui/lib/theme-chalk/index.css';
// 配置ElementUI插件
Vue.use(ElementUI)
//全局使用axios
Vue.prototype.$axios = axios;
//全局设置url地址
Vue.prototype.$httpUrl = "http://127.0.0.1:7948"
Vue.config.productionTip = false
Vue.prototype.$qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // 判断是否进入 /user 路径
  if (to.path === '/Home') {
    // 将路径重定向为 /user/setting
    next({path: '/index'})
  } else {
    // 不需要进入 /user 路径
    next()
  }
})

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '6zAD8CIavtzWnkGg0a7roush5maGMIPn'  //这个地方是官方提供的ak密钥
})


