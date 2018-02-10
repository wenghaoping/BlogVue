/**
 * Created by Admin on 2017/12/14.
 */
// 其他小工具
import router from './router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式

// 全局进度条
router.beforeEach((to, from, next) => {
  if (to) {
    NProgress.start(); // 开启Progress
  }
  next();
});

router.afterEach(() => {
  window.scrollTo(0, 0); // 返回到顶部
  NProgress.done(); // 结束Progress
});
