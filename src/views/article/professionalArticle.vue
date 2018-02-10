<template>
    <div id="indexArticle" class="relative">
      <mavon-editor ref="editor" v-model="main" @save="goBack"
                    @imgAdd="imgAdd"></mavon-editor>
      <footer>
        <el-button type="primary" class="btn btn-lg btn-primary btn-block" @click="goBack" style="margin: 20px 0;">确认</el-button>
      </footer>
      <w-loader :load="loading"></w-loader>
    </div>
</template>

<script type="text/ecmascript-6">
import { mavonEditor } from 'mavon-editor';
export default {
  data () {
    return {
      loading: false,
      art_id: '',
      main: ''
    };
  },
  // 组件
  components: {
    mavonEditor
  },
  methods: {
    getArt_id () {
      this.art_id = this.$route.query.art_id || -1;
    }, // 获取id
    goBack () {
      this.$store.state.article.main = this.main || '';
      this.$router.push({name: 'editArticle', query: {art_id: -2}});// 路由传参
    },
    imgAdd (filename, imgfile) {
      console.log(filename);
    }
  },
  // 当dom一创建时
  created () {
    this.getArt_id();
    this.main = this.$store.state.article.main || '';
    document.title = '开始你的表演';
  }
};
</script>

<style lang="less">
  @import '../../assets/css/indexArticle.less';
</style>
