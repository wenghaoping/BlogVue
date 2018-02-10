// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router'; // 路由设置
import store from './store';
import axios from './api/api.js';// axios请求配置
import URL_ from './api/url.js';// URL请求地址汇总
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './utils/miXins.js';
import './otherUtil';
// 引入自己的CSS,格式化样式
import './assets/css/base.css';
import './assets/css/animate.css';
import './assets/css/normalize.css';
import 'mavon-editor/dist/css/index.css';
import './filters';// 过滤器
// 代码高亮
import hljs from 'highlight.js';
import wload from '@/components/wload.vue';
import 'highlight.js/styles/googlecode.css'; // 样式文件
Vue.prototype.$http = axios;
Vue.prototype.URL = URL_;
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});

// 加载动画,全局组件
Vue.component('w-loader', wload);
// 懒加载图片
/* import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/loading2.gif',
  loading: '../static/loading3.gif',
  try: 3 // default 1
}) */

Vue.use(ElementUI);// UI库
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
