<template>
  <!--文章详情页面-->
    <div id="article" style="margin-top: 20px;" class="relative">
      <div class="container">
        <div class="jumbotron">
          <div class="blog-header">
            <h2 class="blog-title align_center">{{article.title}}</h2>
            <div class="blog-post align_center">
              <p class="blog-post-meta">{{article.creat_time}} <a>{{article.creat_name}}</a></p>
            </div>
          </div>
          <!--<div class="blog-main" v-html="article.main" v-highlight></div>-->
          <mavon-editor v-model="article.main" default_open="preview" :editable="false"
                        :toolbarsFlag="false"
                        :subfield="false" :ishljs = "true"></mavon-editor>
        </div>
      </div>
        <i class="el-icon-caret-left back" @click="back"></i>
      <w-loader :load="loading"></w-loader>
    </div>
</template>

<script type="text/ecmascript-6">
import { mavonEditor } from 'mavon-editor';
import { error } from '@/utils/notification';
export default {
  data () {
    return {
      loading: false,
      art_id: '',
      article: {
        title: '接口有问题啦', // 标题
        detail: '接口有问题啦', // 简介
        main: '', // 主内容
        creat_time: '接口有问题啦', // 创建时间
        creat_name: '', // 编写人
        art_id: '', // 文章Id
        access_times: '' // 查看次数
      }
    };
  },
  // 组件
  components: { mavonEditor },
  methods: {
    getArticleDetail () {
      this.loading = true;
      this.$http.post(this.URL.getArticleDetail, {
        art_id: this.art_id,
        edit: 0
      })
        .then(res => {
          let data = res.data.result[0];
          if (data === '-3') { error('服务器出错,请联系管理员'); } else {
            this.article = data;
            document.title = data.title;
            this.zgClick('查看' + data.title);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getArt_id () {
      this.art_id = this.$route.query.art_id || '';
    }, // 获取id
    back () {
      this.$router.go(-1);
    }
  },
  // 当dom一创建时
  created () {
    this.getArt_id();
    this.getArticleDetail();
  }
};
</script>

<style lang="less">
  #article{
    .v-note-wrapper{
      z-index: auto;
    }
  }
</style>
