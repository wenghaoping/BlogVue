<template>
    <div id="chat" class="relative" style="margin-top: 20px;min-height: 719px;">
      <h1 class="align_center">交流一下想法</h1>
      <div class="container"  style="padding-top: 10px; overflow: auto">
        <div class="chatStyle" v-for="(chatList, index) in chatLists" :key="index">
          <h4 class="text-left"><strong>{{chatList.chat_name}}</strong><small class="time">{{chatList.chat_time}}</small></h4>
          <p class="text-left" style="font-size: 13px;">{{chatList.detail}}</p>
        </div>
      </div>
      <div class="container chatEdit positionFixed">
        <el-form :model="chatDetail" label-position="top" ref="chatDetail" label-width="100px" >
          <el-form-item label="内容" prop="detail"
                        :rules="[{required: true, message: '内容不能为空', trigger: 'blur'},
                        {min: 1, max:100,message: '你特么是有那么多话和我说吗,找我微信啊'}]">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3}"
              placeholder="请输入内容"
              v-model="chatDetail.detail">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn btn-lg btn-primary btn-block" @click="save">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <i class="el-icon-caret-left back" @click="closeChat"></i>
    </div>
</template>

<script type="text/ecmascript-6">
import io from 'socket.io-client';
import { curentTime } from '@/utils';
import { error } from '@/utils/notification';
// const socket = io.connect('http://192.168.9.19:3000');
const socket = io.connect('http://www.wenghaoping.com:3000');
export default {
  data () {
    return {
      loading: false,
      checkEdit: false, //
      chatDetail: {
        chat_name: '', // 名字
        detail: '', // 内容
        chat_time: '' // 创建时间
      },
      chatLists: [
        {
          chat_name: '',
          detail: '',
          chat_time: ''
        }
      ]
    };
  },
  mounted () {
    socket.on('chat', (msg) => {
      console.log(msg);
      this.chatLists.unshift(msg);
    });
  },
  methods: {
    //* 检查所有必填项目以及获取所有数据/true过.false不过
    submitForm (formName, checkName) {
      this.$refs[formName].validate((valid) => {
        this[checkName] = !valid;
      });
    },
    // 发送聊天
    save () {
      this.submitForm('chatDetail', 'checkEdit');
      setTimeout(() => {
        if (!this.checkEdit) {
          let data = {
            chat_name: localStorage.user_name || '路人',
            detail: this.chatDetail.detail,
            chat_time: curentTime()
          };
          socket.emit('chat', data);
          this.$http.post(this.URL.doChat, data)
            .then(res => {
              let data = res.data.result;
              if (data === '-3') {
                error('服务器出错,请联系管理员');
              }
              this.chatDetail.detail = '';
              window.scrollTo(0, 0); // 返回到顶部
              this.loading = false;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }, 200);
    },
    closeChat () {
      this.$router.go(-1);
    },
    // 第一次进来获取所有聊天信息
    getChatList () {
      this.$http.post(this.URL.getChatList)
        .then(res => {
          let data = res.data.result;
          this.chatLists = data;
          if (data === '-3') {
            error('服务器出错,请联系管理员');
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  // 当dom一创建时
  created () {
    this.checkUser();
    this.getChatList();
  },
  beforeRouteLeave (to, from, next) {
    next();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
};
</script>
<style lang="less">
  @import '../../assets/css/chat.less';
</style>
