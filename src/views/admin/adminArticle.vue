<template>
  <!--文章管理-->
    <div id="istrationArticle"  class="relative">
      <div class="container" style="margin-top: 20px;">
        <div class="jumbotron">
          <header>
            <button type="button" class="btn btn-primary" @click="toUser" v-if="privileges == 2">用户管理</button>
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
              <tr v-for="(article,index) in articles" class="cursor" :key="index">
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
         } */
      ]
    };
  },
  methods: {
    // 成员管理入口
    toUser () {
      this.$router.push({name: 'adminUsers', query: {}});// 路由传参
    },
    // 获取所有人文章,管理员所有(不包括私密)
    getArticleListAll () {
      this.loading = true;
      this.$http.post(this.URL.getArticleListAll, {
        privileges: this.privileges
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { this.$tool.error('服务器出错,请联系管理员'); } else {
            if (data.length === 0) {
              this.$tool.warning('你这管理员好惨,都没人来发布');
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

    // 获取所有人文章,管理员所有(包括私密)
    getArticleListAllAdmin () {
      this.loading = true;
      this.$http.post(this.URL.getArticleListAllAdmin, {
        privileges: this.privileges
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { this.$tool.error('服务器出错,请联系管理员'); } else {
            if (data.length === 0) {
              this.$tool.warning('你这管理员好惨,都没人来发布');
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
          if (data === '-3') { this.$tool.error('服务器出错,请联系管理员'); } else if (data === '1') {
            this.$tool.success('删除成功');
            if (this.privileges === 1) { this.getArticleListAll(); } else if (this.privileges === 2) { this.getArticleListAllAdmin(); }
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
    this.getTop();
    if (this.checkUser()) {
      this.privileges = localStorage.privileges || 0;
      if (this.privileges === 1) { this.getArticleListAll(); } else if (this.privileges === 2) { this.getArticleListAllAdmin(); }
    };
  }
};
</script>

<style lang="less">

</style>
