/**
 * Created by WengHaoping on 2017/6/5.
 */

/* 项目详情URL */

export default
{
  /* 总地址,下载用的 */
  url: 'http://192.168.9.19:3000', // 上线接口下载用

  test: '/',
  getSelectValue: '/getSelectValue', // 获取下拉框数据
  doRegist: '/doRegist', // 注册账户
  checkUser: '/checkUser', // 看用户名是否存在
  dologin: '/dologin', // 登陆

  doEdit: '/doEdit', // 创建文章
  doDelete: '/doDelete', // 获取文章详情

  getArticleList: '/getArticleList', // 获取文章列表个人
  getArticleListAll: '/getArticleListAll', // 获取文章列表全部
  getArticleDetail: '/getArticleDetail', // 获取文章详情

  getArticleListAdmin: '/getArticleListAdmin', // 超级管理员权限-获取文章列表
  getArticleListAllAdmin: '/getArticleListAllAdmin', // 超级管理员权限-获取文章列表

  getUsersListAdmin: '/getUsersListAdmin', // 超级管理员权限-获取用户列表
  userDelete: '/userDelete', // 超级管理员权限-删除用户
  editUsers: '/editUsers', // 超级管理员权限-修改用户权限

  doPropose: '/doPropose', // 建议入口
  getProposeList: '/getProposeList', // 建议入口

  doChat: '/doChat', // 发送聊天消息到数据库存储
  getChatList: '/getChatList' // 读取所有聊天记录，
};
