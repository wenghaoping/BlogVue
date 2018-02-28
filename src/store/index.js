import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login.js';
import article from './modules/article.js';

Vue.use(Vuex);

const state = {
  // 初始化状态设定

};

export default new Vuex.Store({
  state,
  modules: {
    logining: login,
    articles: article
  }
});
