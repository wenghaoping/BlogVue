<template>
    <header id="header">
      <nav class="navbar navbar-fixed-top navbar-inverse">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" :class="{'active' : activeName === 1}" @click="jump(1)">主页</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li :class="{'active' : activeName === 1}" ><a @click="jump(1)">最新信息</a></li>
              <li :class="{'active' : activeName === 2}"><a @click="jump(2)">个人文章</a></li>
              <li :class="{'active' : activeName === 3}"><a @click="jump(3)">文章管理</a></li>
              <li :class="{'active' : activeName === 4}"><a @click="jump(4)">我有建议</a></li>
              <li :class="{'active' : activeName === 5}"><a @click="jump(5)">来扫我啊</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li class="dropdown" v-if="user_name == ''">
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" @click="login">登陆</a>
              </li>
              <li class="dropdown" v-else>
                <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{user_name}}<span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <!--<li><a @click="jump(5)">我想认识认识</a></li>-->
                  <li><a @click="loginOut(0)">退出</a></li>
                </ul>
              </li>
            </ul>
          </div><!-- /.nav-collapse -->
        </div><!-- /.container -->
      </nav><!-- /.navbar -->
    </header>
</template>
<script type="text/ecmascript-6">
import { mapState } from 'vuex';
export default {
  data () {
    return {
      user_id: '',
      privilegesTrue: '',
      activeName: 1
    };
  },
  methods: {
    // 登陆
    login () {
      this.zgClick('登陆');
      this.$router.push({name: 'login', query: {}});// 路由传参
    },
    // 登出
    loginOut (e) {
      if (e === 0) {
        this.zgClick('登出');
        localStorage.clear();
        this.$router.push({name: 'login'});// 路由传参
        let obj = {
          user_id: '',
          user_name: '',
          privileges: ''
        };
        this.$store.dispatch('setLoginData', obj);
      }
    },
    jump (e) {
      sessionStorage.persontop = 0;
      sessionStorage.indextop = 0;
      this.activeName = e;
      if (e === 1) {
        this.zgClick('最新消息');
        this.$router.push({name: 'indexArticle', query: {}});// 路由传参
      } else if (e === 2) {
        this.zgClick('个人文章');
        this.$router.push({name: 'personalArticle', query: {}});// 路由传参
      } else if (e === 3) {
        this.zgClick('文章管理');
        this.$router.push({name: 'istrationArticle', query: {}});// 路由传参
      } else if (e === 4) {
        this.zgClick('我有意见');
        this.$router.push({name: 'proposeList', query: {}});// 路由传参
      } else if (e === 5) {
        this.zgClick('查看微信');
        this.$router.push({name: 'person', query: {}});// 路由传参
      }
    }
  },
  computed: {
    ...mapState({
      user_name: state => state.logining.user_name,
      privileges: state => state.logining.privileges
    })
  }
};
</script>

<style lang="less">

</style>
