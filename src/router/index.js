/* 路由配置 */
import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);

/* 配置路由 */
export default new Router({
  routes: [
    {
      path: '/',
      component: _import('index/index'),
      children: [
        {path: '', component: _import('article/indexArticle'), name: 'indexArticle'}, // 文章列表(总列表)
        {path: '/article', component: _import('article/article'), name: 'article'}, // 文章详情页面
        {path: '/personalArticle', component: _import('article/personalArticle'), name: 'personalArticle'} // 文章列表(个人列表)
      ]
    },
    {
      path: '/indexAdmin',
      component: _import('admin/indexAdmin'), // 管理员首页
      children: [
        {path: '', component: _import('admin/adminArticle')}, // 管理员文章管理页
        {path: '/adminArticle', component: _import('admin/adminArticle'), name: 'adminArticle'}, // 管理员文章管理页
        {path: '/adminUsers', component: _import('admin/adminUsers'), name: 'adminUsers'} // 管理员人员管理页
      ]
    },
    {
      path: '/istrationArticle', name: 'istrationArticle', component: _import('article/istrationArticle') // 文章管理页面
    },
    {
      path: '/editArticle', name: 'editArticle', component: _import('article/editArticle') // 文章创建编辑页面
    },
    {
      path: '/professionalArticle', name: 'professionalArticle', component: _import('article/professionalArticle') // 文章编辑页面高级
    },
    {
      path: '/register', name: 'register', component: _import('login/register') // 注册
    },
    {
      path: '/login', name: 'login', component: _import('login/login') // 登陆
    },
    {
      path: '/proposeList', name: 'proposeList', component: _import('propose/proposeList') // 管理员人员管理页
    },
    {
      path: '/propose', name: 'propose', component: _import('propose/propose') // 管理员人员管理页
    },
    {
      path: '/person', name: 'person', component: _import('person/person')
    },
    {
      path: '/chat', name: 'chat', component: _import('chat/chat')
    },
    {
      path: '/test', name: 'test', component: _import('test')
    },
    {
      path: '*', redirect: '/' // 默认回到首页
    }
  ]
});
Vue.use(Router);
