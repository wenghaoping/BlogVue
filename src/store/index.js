import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import login from './modules/login.js';
import article from './modules/article.js';

Vue.use(Vuex);

const state = {
  // 初始化状态设定

};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    logining: login,
    articles: article
  }
});
