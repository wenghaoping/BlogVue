<template>
  <!--文章首页,显示全部-->
    <div id="indexArticle" class="relative">
      <div class="container" style="padding-top: 10px;min-height: 439px;">
        <article class="article" v-for="(article, index) in articles" :key="index"> <time>{{article.creat_time}}</time>
          <h2 class="title align_left"><a @click="toDetail(article.art_id)">{{article.title}}</a></h2>
          <span class="lag"><i><strong>作者: {{article.creat_name}}</strong> 阅读( {{article.access_times}} )</i></span>
          <section class="article-content markdown-body align_left" v-html="article.detail" v-highlight>

          </section>
          <footer><el-button type="primary" class="btn btn-primary" @click="toDetail(article.art_id)">查看更多</el-button></footer>
        </article>
      </div>

      <w-loader :load="loading"></w-loader>

      <div class="megagame align_center cursor" @click="goChat">
        聊天
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { error } from '@/utils/notification';
export default {
  data () {
    return {
      loading: false,
      privileges: 0,
      timer: null,
      scrollTop: 0,
      chatDisplay: false,
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
      sessionStorage.indextop = this.scrollTop;
      console.log('当前位置' + sessionStorage.indextop || 0);
      this.$router.push({name: 'article', query: {art_id: artId}});// 路由传参
    },
    getArticleListAll () {
      this.loading = true;
      this.$http.post(this.URL.getArticleListAll, {
        user_id: localStorage.user_id
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { error('服务器出错,请联系管理员'); } else {
            this.articles = data;
            setTimeout(() => { this.setTop(sessionStorage.indextop || 0); }, 50);
            console.log('设置位置' + sessionStorage.indextop || 0);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    goChat () {
      this.$router.push({name: 'chat'});// 路由传参
    }
  },
  // 当dom一创建时
  created () {
    this.privileges = localStorage.privileges || 0;
    this.getArticleListAll();
    document.title = 'Story';
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
