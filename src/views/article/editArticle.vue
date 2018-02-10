<template>
  <!--新建编辑页-->
    <div id="editArticle" class="relative" style="margin-top: 20px;">
      <div class="container">
        <div class="jumbotron">
            <div class="form-signin">
              <el-form :model="article" label-position="top" ref="article" label-width="100px" >
                <h2 class="form-signin-heading">开始你的吹逼</h2>

                <el-form-item label="标题" prop="title"
                              :rules="[{required: true, message: '标题不能为空', trigger: 'blur'},{min: 1, max:40,message: '最大40个字符'}]">
                  <el-input v-model="article.title" auto-complete="off"
                            placeholder="请输入标题,不超过40个字">
                  </el-input>
                </el-form-item>
                <el-form-item label="简介" prop="detail"
                              :rules="[{required: true, message: '简介不能为空', trigger: 'blur'},{min: 1, max:500,message: '最大500个字符'}]">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 10}"
                    placeholder="请输入内容"
                    v-model="article.detail">
                  </el-input>
                </el-form-item>
                <button type="button" class="btn btn-primary " @click="toProfessionalArticle" style="margin-bottom: 10px;">进入高级编辑内容</button>
                <el-form-item label="主内容" prop="main"
                              :rules="[{required: true, message: '主内容不能为空', trigger: 'blur'},{min: 1, max:100000,message: '最大100000个字符'}]">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 100}"
                    placeholder="请输入内容"
                    v-model="article.main">
                  </el-input>
                </el-form-item>

                <el-form-item>
                    <el-switch
                      v-model="article.private"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="公开"
                      inactive-text="私密"
                      active-value="0"
                      inactive-value="1">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="btn btn-lg btn-primary btn-block" @click="edit" >提交</el-button>
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
      article: {
        title: '', // 标题
        detail: '', // 简介
        main: '', // 主内容
        creat_time: '', // 创建时间
        creat_name: '', // 编写人
        art_id: '', // 文章Id
        access_times: '', // 查看次数
        private: '0' // 私密性 0公开,1,私密
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
      this.submitForm('article', 'checkEdit');
      setTimeout(() => {
        if (!this.checkEdit) {
          this.loading = true;
          this.$http.post(this.URL.doEdit, {
            title: this.article.title,
            detail: this.article.detail,
            main: this.article.main,
            private: parseInt(this.article.private),
            creat_name: localStorage.user_name,
            creat_user_id: localStorage.user_id,
            creat_time: curentTime(),
            art_id: this.art_id
          })
            .then(res => {
              let data = res.data.result;
              //                console.log(res.data);
              if (data === '-3') { error('创建失败,请联系管理员'); } else if (data === '1') {
                this.$router.push({name: 'istrationArticle', query: {}});// 路由传参
                this.$store.state.article = {};
              }
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200);
    },
    getArt_id () {
      this.art_id = this.$route.query.art_id || -1;
    }, // 获取id
    // 获取详情
    getArticleDetail () {
      this.$http.post(this.URL.getArticleDetail, {
        art_id: this.art_id,
        edit: 1
      })
        .then(res => {
          let data = res.data.result[0];
          if (data === '-3') { error('服务器出错,请联系管理员'); } else {
            data.private = data.private.toString();
            this.article = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 去高级编辑
    toProfessionalArticle () {
      this.$store.state.article = {};
      this.$store.state.article = this.article;
      this.$router.push({name: 'professionalArticle', query: {art_id: this.article.art_id}});// 路由传参
    }
  },
  // 当dom一创建时
  created () {
    this.getArt_id();
    if (this.art_id === -2) {
      this.article = this.$store.state.article;
      this.art_id = this.article.art_id;
    } else if (this.art_id === -1) {

    } else {
      this.getArticleDetail();
    }
    document.title = '我看见你开始吹逼了';
  }
};
</script>
