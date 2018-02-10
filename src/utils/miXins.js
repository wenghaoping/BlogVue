/**
 * Created by Admin on 2017/9/25.
 */
import Vue from 'vue';
import { warning } from '@/utils/notification';

// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  methods: {
    // 公用函数
    /* 点击事件
     # name 事件   例:创建项目 String
     # event 参数  例:{'手机' : '小米4','价格' : 1799,'运营商' : '移动'}  Object
     //属性名称不能超过255个字符，属性值不能超过200个字符
     */
    zgClick (name, event = {}) {

    },

    /* 识别用户
     # userId 用户Id
     # event 参数  例:name: '翁浩平',
     //预定义属性
     avatar: '头像地址',
     //预定义属性
     '行业': '互联⽹网' //⾃自定义属性  Object
     */
    zgIdentify (userName, event = {}) {

    },
    checkUser () {
      if (localStorage.user_id === '' || localStorage.user_id === undefined) {
        warning('请先登录');
        this.$router.push({name: 'login', query: {}});// 路由传参
        return false;
      } else {
        return true;
      }
    },
    //* 页面回到顶部
    getTop () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.pageYOffset = 0;
    },
    setTop (val) {
      window.scrollTo(0, val);
    }
  }
});
