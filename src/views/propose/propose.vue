<template>
  <!--新建编辑页-->
    <div id="istrationArticle" class="relative" style="margin-top: 20px;">
      <div class="container">
        <div class="jumbotron">
            <div class="form-signin">
              <el-form :model="propose" label-position="top" ref="propose" label-width="100px" >
                <h2 class="form-signin-heading">随便说点什么吧</h2>
                <el-form-item label="内容" prop="detail"
                              :rules="[{required: true, message: '简介不能为空', trigger: 'blur'},{min: 1, max:100,message: '你特么是有那么多话和我说吗,找我微信啊'}]">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 10}"
                    placeholder="请输入内容"
                    v-model="propose.detail">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="btn btn-lg btn-primary btn-block" @click="edit">提交</el-button>
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
import { curentTime } from '@/utils';
export default {
  data () {
    return {
      loading: false,
      checkEdit: false, //
      propose: {
        detail: '', // 简介
        creat_time: '', // 创建时间
        creat_name: '', // 编写人
        creat_user_id: '',
        pro_id: -1// 文章Id
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
    // 创建编辑
    edit () {
      this.submitForm('propose', 'checkEdit');
      setTimeout(() => {
        if (!this.checkEdit) {
          this.loading = true;
          this.$http.post(this.URL.doPropose, {
            detail: this.propose.detail,
            creat_name: localStorage.user_name || '路人',
            creat_user_id: localStorage.user_id,
            creat_time: curentTime(),
            pro_id: this.propose.pro_id
          })
            .then(res => {
              let data = res.data.result;
              console.log(res.data);
              if (data === '-3') { error('创建失败,请联系管理员'); } else if (data === '1') {
                this.$router.push({name: 'proposeList', query: {}});// 路由传参
              }
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200);
    }
  },
  // 当dom一创建时
  created () {
    document.title = '我有意见';
  }
};
</script>

<style lang="less">
  @import '../../assets/css/istrationArticle.less';
</style>
