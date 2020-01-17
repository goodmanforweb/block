// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router';
import VueCookies from 'vue-cookies';  //引入cookies插件
import i18n from './i18n/index.js'; //引入语言包
import 'animate.css';
import './assets/common.css';

import Axios from './shujuData/api.js'; //加载接口文件
import Public from './shujuData/public.js' //加载公用js方法文件
import 'babel-polyfill'  //兼容ie


import store from './store/index'

// import "./assets/index.less"; //  加载less
import "./assets/font_wskz/iconfont.css"; //  加载图标

Vue.config.productionTip = false

Vue.prototype.$http= Axios;
Vue.prototype.$public = Public;


Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.use(ElementUI,{
  i18n:(key,value) =>i18n.t(key,value) //重点！！在注册Element时设置i18n的处理方法（这里有个小坑）
});
// 设置一个cookie
// this.$cookies.set("default_unit_second","input_value","0");

// Vue.$cookies.get(keyName)  //获取一个cookie


// 删除一个cookie
// Vue.$cookies.remove(keyName [, path [, domain]]) 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
