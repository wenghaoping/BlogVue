<template>
  <!--文章管理-->
    <div id="istrationArticle" class="relative">
      <div class="container" style="margin-top: 20px;">
        <div class="jumbotron">
          <header>
            <button type="button" class="btn btn-primary" @click="toArticle" v-if="privileges == 2">文章管理</button>
          </header>
          <section>
            <table class="table table-hover .table-bordered">
              <thead>
              <tr>
                <th>id</th>
                <th>姓名</th>
                <th>来源</th>
                <th>权限</th>
                <th>编辑</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <th>{{index + 1}}</th>
                <th>{{user.user_name}}</th>
                <td>{{user.source_id | getSource}}</td>
                <td>
                  {{user.privileges | privileges}}
                </td>
                <td>
                  <button type="button" class="btn btn-primary btn-xs" @click="editUsers(user,1)" v-if="user.privileges == 0">设为管理员</button>
                  <button type="button" class="btn btn-primary btn-xs" @click="editUsers(user,0)" v-else>取消管理员</button>
                  <button type="button" class="btn btn-danger btn-xs" @click="deleteUser(user)">删除</button>
                </td>
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
export default {
  data () {
    return {
      loading: false,
      art_id: '',
      privileges: 0, // 管理员权限
      users: [
        {
          user_name: '123',
          source_id: '2',
          user_id: 2,
          privileges: 0
        }
      ]
    };
  },
  methods: {
    // 管理员文章管理
    toArticle () {
      this.$router.push({name: 'adminArticle', query: {}});// 路由传参
    },
    // 获取个人列表
    getUsersListAdmin () {
      this.loading = true;
      this.$http.post(this.URL.getUsersListAdmin, {
        privileges: this.privileges
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { this.$tool.error('服务器出错,请联系管理员'); }
          if (data === '-4') { this.$tool.error('你特么是谁,不是管理员进来干吗'); } else {
            this.users = data;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改权限
    editUsers (user, privileges) {
      this.$http.post(this.URL.editUsers, {
        user_id: user.user_id,
        privileges: privileges
      })
        .then(res => {
          this.zgClick('修改权限');
          let data = res.data.result;
          if (data === '-3') { this.$tool.error('服务器出错,请联系管理员'); } else if (data === '1') {
            this.$tool.success('修改成功');
            this.getUsersListAdmin();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除用户
    deleteUser (user) {
      this.$http.post(this.URL.userDelete, {
        user_id: user.user_id
      })
        .then(res => {
          let data = res.data.result;
          if (data === '-3') { this.$tool.error('服务器出错,请联系管理员'); } else if (data === '1') {
            this.$tool.success('删除成功');
            this.getUsersListAdmin();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // 当dom一创建时
  created () {
    this.getTop();
    if (this.checkUser()) {
      this.privileges = localStorage.privileges || 0;

      this.getUsersListAdmin();
    };
  }
};
</script>

<style lang="less">

</style>
