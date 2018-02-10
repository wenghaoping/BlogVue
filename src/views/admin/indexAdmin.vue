<template>
    <div id="indexAdmin" class="relative">
      <section class="backgroundpic backgroundpic2">
        <p>
          <strong>既然你能进入这里</strong><br>
          别瞎删啊<br>
          <s>你是我信任的人啊</s><br>
          <small>我知道谁进来过的</small><br>
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
      loading: true,
      transitionName: 'slide-left'
    };
  },
  // 当dom一创建时
  created () {
    this.getTop();
    document.title = '管理员好啊';
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
