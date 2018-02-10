<template>
  <!--个人文章首页,显示个人所有文章-->
    <div id="indexArticle" class="relative">
      <div class="container" style="padding-top: 10px;min-height: 439px;">
          <article class="article" v-for="(article, index) in articles" :key="index">
            <time>{{article.creat_time}}</time>
            <h2 class="title align_left"><a @click="toDetail(article.art_id)">{{article.title}}</a></h2>
            <span class="lag"><i><strong>作者: {{article.creat_name}}</strong> 阅读( {{article.access_times}} )</i></span>
            <section class="article-content markdown-body align_left" v-html="article.detail" v-highlight></section>
            <footer><el-button type="primary" class="btn btn-primary" @click="toDetail(article.art_id)">查看更多</el-button></footer>
          </article>
      </div>
      <w-loader :load="loading"></w-loader>
    </div>
</template>

<script type="text/ecmascript-6">
import { error, warning } from '@/utils/notification';
export default {
  data () {
    return {
      loading: false,
      timer: null,
      scrollTop: 0,
      articles: [
        {
          title: '接口有问题啦', // 标题
          detail: '接口有问题啦', // 简介
          main: '', // 主内容
          creat_time: '接口有问题啦', // 创建时间
          creat_name: '', // 编写人
          art_id: '', // 文章Id
          access_times: '' // 查看次数
        }
      ]
    };
  },
  mounted () {
    const that = this;
    window.onscroll = () => {
      return (() => {
        that.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      })();
    };
  },
  methods: {
    toDetail (artId) {
      sessionStorage.persontop = this.scrollTop;
      console.log('当前位置' + sessionStorage.persontop || 0);
      this.$router.push({name: 'article', query: {art_id: artId}});// 路由传参
    },
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
              setTimeout(() => { this.setTop(sessionStorage.persontop || 0); }, 50);
              console.log('设置位置' + sessionStorage.persontop || 0);
            }
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // 当dom一创建时
  created () {
    if (this.checkUser()) {
      this.getArticleList();
    };
    document.title = '个人文章';
  },
  watch: {
    scrollTop (val) {
      if (!this.timer) {
        this.scrollTop = val;
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
        }, 100);
      }
    }
  }
};
</script>

<style lang="less">
  @import '../../assets/css/indexArticle.less';
</style>
