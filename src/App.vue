<template>
  <div id="app">

    <!--     头部导航 -->
    <headered :username = "user_name" :privileges = "privileges"></headered>

    <main style="padding-top: 50px;">
      <transition :name="transitionName">
        <router-view class="child-view">

        </router-view>
      </transition>
    </main>
    <footered></footered>
  </div>
</template>
<script type="text/ecmascript-6">
import headered from '@/components/header.vue';
import footered from '@/components/footer.vue';
export default {
  data () {
    return {
      user_name: '',
      user_id: '',
      privileges: '',
      transitionName: 'slide-left'
    };
  },
  components: {
    headered,
    footered
  },
  methods: {
    checkUser () {
      this.user_id = localStorage.user_id;
      this.user_name = this.$store.state.logining.user_name || localStorage.user_name;
      this.privileges = this.$store.state.logining.privileges || localStorage.privileges;
    }
  },
  // 当dom一创建时
  created () {
    this.zgIdentify(localStorage.user_id, {name: localStorage.user_name});
  },
  watch: {
    '$route' (to, from) {
      this.checkUser();
      if (to) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
    }
  }
};
</script>

<style lang="less">
  .el-button+.el-button{
    margin-left: 0!important;
  }
  .back{
    cursor: pointer;
    position: fixed;
    right: 13%;
    bottom: 40px;
    font-size: 30px;
    border: 2px solid #333;
    border-radius: 50%;
  }

  .jumbotron{
    background: #ffffff!important;
    box-shadow: 5px 5px 25px #dadada;
  }
  body {
    /*background-color: #333;*/
    background: url(assets/images/background.png) repeat;
    overflow-x: hidden;
  }

  #app{

    .fColor{
      color: rgb(157, 157, 157);
    }
  }
  /* 路由切换动效 */
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    transition: 0.3s;
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
    transition: 0.3s;
  }
  .child-view {
    /*position: absolute;*/
    left: 0;
    width: 100%;
    height: 100%;
    /*transition: all .2s ease;*/
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
</style>
