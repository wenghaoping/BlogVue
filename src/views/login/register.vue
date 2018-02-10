<template>
  <!--注册页面-->
    <div id="register" class="relative" style="min-height: 719px;margin-top: 20px;">
      <div class="container">
        <div class="jumbotron">
          <div class="form-signin register">
            <el-form :model="login" label-position="top" :rules="rules" ref="login" label-width="100px" >
              <h2 class="form-signin-heading">请注册</h2>
              <el-form-item label="登陆名称" prop="user_name">
                <el-input v-model="login.user_name" auto-complete="off"
                          placeholder="请输入登陆名,不超过20个字" @blur="checkUser">
                  <el-button slot="append" :icon="errMessage" style="font-size: 25px;"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="login.password" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="login.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item label="来源" prop="source_id"
                            :rules="[{type: 'number',required: true, message: '来源不能为空', trigger: 'change'}]">
                <el-select v-model="login.source_id" clearable
                style="width: 100%;" placeholder="请选择你从哪里进入此网站的">
                  <el-option
                    v-for="item in sources"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn btn-lg btn-primary btn-block" @click="doregist()">注册</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <w-loader :load="loading"></w-loader>
    </div>
</template>
<script type="text/ecmascript-6">
import { setSelectValue } from '@/utils';
import { error, success } from '@/utils/notification';
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
          if (this.errcheck === '用户名已存在') {
            callback(new Error(this.errcheck));
          } else {
            callback();
          }
        }
      }, 200);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.login.password !== '') {
          this.$refs.login.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.login.checkPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      errMessage: 'el-icon-check', // 错误信息
      errcheck: '', // 错误信息
      loading: false,
      login: {
        user_name: '', // 登陆名称,登陆用,不允许重复
        password: '', // 密码,存起来的时候用MD5加密,一次md5
        checkPass: '', // 二次验证,正常号码
        source_id: ''// 来源
      },
      checkLogin: false, //
      sources: [], // 下拉框
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
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

    // 获取下拉框数据
    getSelectValue () {
      this.$http.get(this.URL.getSelectValue)
        .then(res => {
          let data = res.data.result;
          this.sources = setSelectValue(data, 'source');
          //                console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册
    doregist () {
      this.submitForm('login', 'checkLogin');
      setTimeout(() => {
        if (!this.checkLogin) {
          this.loading = true;
          this.$http.post(this.URL.doRegist, {
            user_name: this.login.user_name,
            password: this.login.password,
            checkPass: this.login.checkPass,
            source_id: this.login.source_id
          })
            .then(res => {
              let data = res.data.result;
              if (data === '-1') { error('用户名已存在,你取的太好了'); } else if (data === '-3') { error('服务器出错,请联系管理员'); } else if (data === '1') {
                success('注册成功');
                this.$router.push({name: 'indexArticle', query: {}});// 路由传参
                localStorage.user_name = res.data.user_name;
                localStorage.user_id = res.data.user_id;
                this.zgIdentify(res.data.user_id, {name: res.data.user_name});
                this.$store.state.logining.user_name = res.data.user_name;
                this.$store.state.logining.user_id = res.data.user_id;
              }
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200);
    },
    // 看用户名是否存在
    checkUser () {
      this.$http.post(this.URL.checkUser, {
        user_name: this.login.user_name
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-1') { this.errMessage = 'el-icon-close'; this.errcheck = '用户名已存在'; } else if (data === '-3') { error('服务器出错,请联系管理员'); } else if (data === '1') {
            this.errMessage = 'el-icon-check';
            this.errcheck = '';
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // 当dom一创建时
  created () {
    this.getSelectValue();
  }
};
</script>

<style lang="less">
.register{
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;

}
</style>
