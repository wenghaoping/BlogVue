<template>
    <div id="index" class="relative">
      <section class="backgroundpic backgroundpic1">
        <p>
          <strong>I HAVE A DREAM</strong><br>
          人要有梦想啊<br>
          <s>万一哪天就实现了呢</s><br>
          <small>来过要记住我啊</small><br>
        </p>
      </section>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      loading: false,
      transitionName: 'slide-left'
    };
  },
  watch: {
    '$route' (to, from) {
      if (to) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
    }
  }
};
</script>
<style lang="less" type="text/less">
  @import '../../assets/css/main.less';
</style>
