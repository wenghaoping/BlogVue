Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
@wenghaoping
Sign out
Watch 0
Star 0  Fork 0 wenghaoping/BlogVue
Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights  Settings
Branch: master Find file Copy pathBlogVue/src/views/test.vue
c23a8f9  on 17 Oct 2017
wenghaoping 修改
1 contributor
RawBlameHistory
72 lines (60 sloc)  2.54 KB
<template>
  <div id="editproject">
    <!--<mavon-editor v-model="value" default_open="preview" :editable="loading"
                  :toolbarsFlag="loading"
                  :subfield="loading"></mavon-editor>-->
    <!--<pulse-loader :loading="loading"></pulse-loader>-->
    <!--<pulse-loader :loading="loading" ></pulse-loader>-->
    <!--<wload :load="loading"></wload>-->
          <!--<clip-loader :loading="loading" :color="color" :size="size"></clip-loader>-->
          <!--<rise-loader :loading="loading" :color="color" :size="size"></rise-loader>-->
          <!--<beat-loader :loading="loading" :color="color" :size="size"></beat-loader>-->
          <!--<sync-loader :loading="loading" :color="color" :size="size"></sync-loader>-->
          <!--<rotate-loader :loading="loading" :color="color" :size="size"></rotate-loader>-->
          <!--<fade-loader :loading="loading" :color="color" :height="height" :width="width"></fade-loader>-->
          <!--<pacman-loader :loading="loading" :color="color" :size="size"></pacman-loader>-->
          <!--<square-loader :loading="loading" :color="color" :size="size"></square-loader>-->
          <!--<scale-loader :loading="loading" :color="color" :height="height" :width="width"></scale-loader>-->
          <!--<skew-loader :loading="loading" :color="color" :size="size"></skew-loader>-->
          <!--<moon-loader :loading="loading" :color="color" :size="size"></moon-loader>-->
          <!--<ring-loader :loading="loading" :color="color" :size="size"></ring-loader>-->
          <!--<bounce-loader :loading="loading" :color="color" :size="size"></bounce-loader>-->
          <!--<dot-loader :loading="loading" :color="color" :size="size"></dot-loader>-->
  </div>
</template>

<script type="text/ecmascript-6">
import { mavonEditor } from 'mavon-editor';
// import { GridLoader } from 'vue-spinner/dist/vue-spinner.min.js';
import gridLoader from 'vue-spinner/src/GridLoader.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import wload from '@/components/wload.vue';
export default {
  props: [],
  data () {
    return {
      loading: true
    };
  },
  // 组件
  components: {
    mavonEditor,
    gridLoader,
    PulseLoader,
    wload
  }
};
</script>

<style lang="less">
</style>
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
