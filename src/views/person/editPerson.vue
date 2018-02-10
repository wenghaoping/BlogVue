<template>
  <!--注册页面-->
    <div id="register" class="relative" style="min-height: 719px;margin-top: 20px;">
      <div class="container">
        <div class="jumbotron">
          <div class="form-signin register">
            <el-form :model="login" label-position="top" :rules="rules" ref="login" label-width="100px" >
              <h2 class="form-signin-heading">编辑个人信息</h2>
              <el-form-item label="登陆名称" prop="user_name">
                <el-input v-model="login.user_name" auto-complete="off"
                          placeholder="请输入登陆名,不超过20个字">
                </el-input>
              </el-form-item>
              <el-form-item
                prop="email"
                label="邮箱"
                :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
                <el-input v-model="login.email"></el-input>
              </el-form-item>

              <el-form-item
                label="手机号"
                prop="phone"
                :rules="PhoneRule">
                <el-input v-model="login.phone"
                          placeholder="手机号"
                          :maxlength="20">
                </el-input>
              </el-form-item>

              <el-form-item label="姓名" prop="real_name">
                <el-input v-model="login.real_name" auto-complete="off"
                          placeholder="请输入姓名,我就看看谁注册了">
                </el-input>
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
import { error, success } from '@/utils/notification';
import { setSelectValue } from '@/utils';
import * as validata from '@/utils/validata';
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
    var checkPhoneNumber = (rule, value, callback) => {
      if (!validata.getNull(value)) {
        setTimeout(() => {
          if (!validata.checkNumber(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!validata.checkPhoneNumber(value)) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }
        }, 100);
      } else {
        callback();
      }
    };// 电话号码正则判断
    return {
      errMessage: 'check', // 错误信息
      errcheck: '', // 错误信息
      loading: false,
      login: {
        user_name: '', // 登陆名称,登陆用,不允许重复
        email: '', // 邮箱
        phone: '', // 电话
        real_name: '', // 真实姓名
        source_id: ''// 来源
      },
      checkLogin: false, //
      sources: [], // 下拉框
      PhoneRule: { validator: checkPhoneNumber, trigger: 'blur' }, // 电话规则
      rules: {
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
          if (data === '-1') { this.errMessage = 'close'; this.errcheck = '用户名已存在'; } else if (data === '-3') { error('服务器出错,请联系管理员'); } else if (data === '1') {
            this.errMessage = 'check';
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
