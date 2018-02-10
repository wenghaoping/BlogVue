<template>
  <!--注册页面-->
    <div id="register" class="relative" style="min-height: 719px;margin-top: 20px;">
      <div class="container">
        <div class="jumbotron">
          <div class="form-signin register">
            <el-form :model="login" label-position="top" :rules="rules" ref="login" label-width="100px">
              <h2 class="form-signin-heading">请登录</h2>
              <el-form-item label="登陆名称" prop="user_name">
                <el-input v-model="login.user_name" auto-complete="off"
                          placeholder="请输入登陆名,不超过20个字" @blur="checkUser" clearable>
                  <el-button slot="append" :icon="errMessage" style="font-size: 25px;"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="login.password" auto-complete="off" placeholder="请输入密码" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn btn-lg btn-success btn-block" @click="doLogin()">登录</el-button>
                <el-button type="primary" class="btn btn-lg btn-primary btn-block" @click="doregister()">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <w-loader :load="loading"></w-loader>
    </div>
</template>

<script type="text/ecmascript-6">
import { error } from '@/utils/notification';
export default {
  data () {
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      setTimeout(() => {
        if (value.length > 20) {
          callback(new Error('最多输入20个字'));
        } else {
          callback();
        }
      }, 200);
    };
    return {
      errMessage: 'el-icon-check', // 错误信息
      errcheck: '', // 错误信息
      loading: false,
      login: {
        user_name: '', // 登陆名称,登陆用,不允许重复
        password: ''// 密码,存起来的时候用MD5加密,一次md5
      },
      checkLogin: false, //
      sources: [], // 下拉框
      rules: {
        pass: [
          {min: 1, max: 40, message: '最大40个字符', trigger: 'blur'}
        ],
        user_name: [
          {validator: checkname, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    //* 检查所有必填项目以及获取所有数据/true过.false不过
    submitForm (formName, checkName) {
      this.$refs[formName].validate((valid) => {
        this[checkName] = !valid;
      });
    },
    // 登陆
    doLogin () {
      this.submitForm('login', 'checkLogin');
      setTimeout(() => {
        if (!this.checkLogin) {
          this.loading = true;
          this.$http.post(this.URL.dologin, {
            user_name: this.login.user_name,
            password: this.login.password,
            source_id: this.login.source_id
          })
            .then(res => {
              let data = res.data.result;
              if (data === '-1') { error('用户名不存在,请注册'); } else if (data === '-3') { error('服务器出错,请联系管理员'); } else if (data === '-2') { error('账号或密码出错'); } else if (data === '1') {
                this.$router.push({name: 'indexArticle', query: {}});// 路由传参
                localStorage.user_name = res.data.user_name;
                localStorage.user_id = res.data.user_id;
                localStorage.privileges = res.data.privileges;
                this.zgIdentify(res.data.user_id, {name: res.data.user_name});
                this.$store.state.logining.user_name = res.data.user_name;
                this.$store.state.logining.user_id = res.data.user_id;
                this.$store.state.logining.privileges = res.data.privileges;// 特权
              }
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 50);
    },
    // 看用户名是否存在
    checkUser () {
      this.$http.post(this.URL.checkUser, {
        user_name: this.login.user_name
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-1') { this.errMessage = 'el-icon-check'; this.errcheck = '用户名存在'; } else if (data === '-3') { error('服务器出错,请联系管理员'); } else if (data === '1') {
            this.errMessage = 'el-icon-close';
            this.errcheck = '';
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册
    doregister () {
      this.$router.push({name: 'register', query: {}});// 路由传参
    }
  }
};
</script>
<style lang="less">
.register{
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.el-button+.el-button {
   margin-left: 0px;
}
</style>
