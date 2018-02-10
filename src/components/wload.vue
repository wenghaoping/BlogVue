<template>
  <div class="loadAll" id="wload" :class="{ noshow: !load }">
    <!--<grid-loader :loading="loading" class="loading"></grid-loader>-->
    <pacman-loader :loading="loading" class="loading"></pacman-loader>
  </div>
</template>
<script type="text/ecmascript-6">
// import gridLoader from 'vue-spinner/src/GridLoader.vue';
import pacmanLoader from 'vue-spinner/src/PacmanLoader.vue';
export default {
  props: {
    load: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      loading: true
    };
  },
  // 组件
  components: {pacmanLoader},
  watch: {
    load: function (e) {
      if (e) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }
};
</script>
<style lang="less" scoped>
  .noshow{
    display: none!important;
  }
  #wload{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 3;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,.9);
      z-index: 1;
    }
    .loading{
      width: 60px;
      height: 20px;
      position: fixed!important;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 2;
    }
  }
</style>
