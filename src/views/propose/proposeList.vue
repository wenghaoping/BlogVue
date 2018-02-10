<template>
  <!--文章管理-->
    <div id="istrationArticle" class="relative">
      <div class="container" style="margin-top: 20px;">
        <div class="jumbotron">
          <header>
            <button type="button" class="btn btn-primary" @click="editPropose">写建议</button>
          </header>
          <section>
            <table class="table table-hover .table-bordered">
              <thead>
              <tr>
                <th>id</th>
                <th>时间</th>
                <th>内容</th>
                <th>大佬</th>
                <!--<th>编辑</th>-->
              </tr>
              </thead>
              <tbody>
                <tr v-for="(propose,index) in proposes" :key="index">
                  <th>{{index + 1}}</th>
                  <th>{{propose.creat_time}}</th>
                  <td style="max-width: 600px;">{{propose.detail}}</td>
                  <td>{{propose.creat_name}}</td>
                  <!--<td>m
                    <button type="button" class="btn btn-primary btn-xs" @click="editArticle(article)">编辑</button>
                    <button type="button" class="btn btn-danger btn-xs" @click="deleteArticle(article)">删除</button>
                  </td>-->
                </tr>
              </tbody>
            </table>
          </section>

        </div>
      </div>
      <w-loader :load="loading"></w-loader>
    </div>
</template>

<script type="text/ecmascript-6">
import { error, success } from '@/utils/notification';
export default {
  data () {
    return {
      loading: false,
      art_id: '',
      privileges: 0, // 管理员权限
      proposes: [
        {
          detail: '', // 简介
          creat_time: '', // 创建时间
          creat_name: '', // 编写人
          creat_user_id: '',
          pro_id: 0 // 文章Id
        }
      ]
    };
  },
  methods: {
    // 获取个人列表
    getPropseList () {
      this.loading = true;
      this.$http.post(this.URL.getProposeList, {
        user_id: localStorage.user_id
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') {
            error('服务器出错,请联系管理员');
          } else {
            this.proposes = data;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 管理员入口
    getAdmin () {
      this.$router.push({name: 'adminArticle', query: {privileges: this.privileges}});
    },
    // 创建编辑文章
    editPropose (article) {
      this.$router.push({name: 'propose', query: {art_id: article.art_id}});
    },
    // 删除文章
    deleteArticle (article) {
      this.$http.post(this.URL.doDelete, {
        art_id: article.art_id
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') {
            error('服务器出错,请联系管理员');
          } else if (data === '1') {
            success('删除成功');
            this.getArticleList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // 当dom一创建时
  created () {
    this.getPropseList();
    document.title = '看看都说了些什么';
  }
};
</script>

<style lang="less">
  @import '../../assets/css/istrationArticle.less';
</style>
