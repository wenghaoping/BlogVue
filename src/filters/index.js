/**
 * Created by Admin on 2017/9/6.
 */
import Vue from 'vue';

Vue.filter('timeToReallTime', (value) => {
  if (value === '') return '';
  var date = new Date();
  if (value.length > 11) date.setTime(value);
  else date.setTime(value * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  // var h = date.getHours();
  // h = h < 10 ? ('0' + h) : h;
  // var minute = date.getMinutes();
  // var second = date.getSeconds();
  // minute = minute < 10 ? ('0' + minute) : minute;
  // second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d;/* +' '+h+':'+minute+':'+second; */
});

Vue.filter('getSource', (value) => {
  if (value === 1) { return '认识翁浩平'; } else if (value === 2) { return '认识故事'; } else if (value === 3) { return '随便点点'; } else if (value === 4) { return '我们不熟'; }
});

Vue.filter('privileges', (value) => {
  if (value === 0) { return '普通用户'; } else if (value === 1) { return '管理员'; } else if (value === 2) { return '超级管理员'; }
});

Vue.filter('artPrivate', (value) => {
  if (value === 0) { return '公开'; } else if (value === 1) { return '私密'; }
});
