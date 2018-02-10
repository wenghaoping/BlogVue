<template>
  <!--文章管理-->
    <div id="istrationArticle" class="relative">
      <div class="container" style="margin-top: 20px;">
        <div class="jumbotron">
          <header>
            <button type="button" class="btn btn-primary" @click="editArticle">新建文章</button>
            <button type="button" class="btn btn-primary" @click="getAdmin" v-if="privileges == 1 || privileges == 2">管理员权限入口</button>
          </header>
          <section>
            <table class="table table-hover .table-bordered">
              <thead>
              <tr>
                <th>id</th>
                <th>时间</th>
                <th>标题</th>
                <th>创建人</th>
                <th>私密性</th>
                <th>查看次数</th>
                <th>编辑</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(article, index) in articles" :key="index" class="cursor">
                <th>{{index + 1}}</th>
                <th>{{article.creat_time}}</th>
                <td>{{article.title}}</td>
                <td>{{article.creat_name}}</td>
                <td>{{article.private | artPrivate}}</td>
                <td>{{article.access_times}}</td>
                <td>
                  <button type="button" class="btn btn-success btn-xs" @click="toDetail(article)">查看</button>
                  <button type="button" class="btn btn-primary btn-xs" @click="editArticle(article)">编辑</button>
                  <button type="button" class="btn btn-danger btn-xs" @click="deleteArticle(article)">删除</button>
                </td>
              </tr>
              </tbody>
            </table>
          </section>

        </div>
      </div>
      <w-loader :load="loading"></w-loader>
    </div>
</template>

<script type="text/ecmascript-6">
import { error, success, warning } from '@/utils/notification';
export default {
  data () {
    return {
      loading: false,
      art_id: '',
      privileges: 0, // 管理员权限
      articles: [
        /* {
         title : "接口有问题啦",//标题
         detail : "接口有问题啦",//简介
         main : "",//主内容
         creat_time : "接口有问题啦",//创建时间
         creat_name : "",//编写人
         art_id : "",//文章Id
         access_times : "",//查看次数
         private: ""
         } */
      ]
    };
  },
  methods: {
    // 获取个人列表
    getArticleList () {
      this.loading = true;
      this.$http.post(this.URL.getArticleList, {
        user_id: localStorage.user_id
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { error('服务器出错,请联系管理员'); } else {
            if (data.length === 0) {
              warning('你还没写文章呢,快去写一个');
              this.$router.push({name: 'istrationArticle', query: {}});// 路由传参
            } else {
              this.articles = data;
            }
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 管理员入口
    getAdmin () {
      this.$router.push({name: 'adminArticle', query: {privileges: this.privileges}});// 路由传参
    },
    // 创建编辑文章
    editArticle (article) {
      this.$router.push({name: 'editArticle', query: {art_id: article.art_id}});// 路由传参
    },
    // 删除文章
    deleteArticle (article) {
      this.$http.post(this.URL.doDelete, {
        art_id: article.art_id
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { error('服务器出错,请联系管理员'); } else if (data === '1') {
            success('删除成功');
            this.getArticleList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看详情
    toDetail (article) {
      this.$router.push({name: 'article', query: {art_id: article.art_id}});// 路由传参
    }
  },
  // 当dom一创建时
  created () {
    if (this.checkUser()) {
      this.getArticleList();
      this.privileges = localStorage.privileges || 0;
    };
    document.title = '文章管理';
  }
};
</script>

<style lang="less">
  @import '../../assets/css/istrationArticle.less';
</style>
