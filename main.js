import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import http from '@/common/http'
import amap from '@/common/SDK/amap-wx.js';
Vue.prototype.$amapPlugin = new amap.AMapWX({
	key: "9ef3f1159ac3b62ed6cb47fd15bac9df"
});
Vue.prototype.$store = store;
Vue.prototype.$myRequest = http.ajax;

Vue.config.productionTip = false;
// 图标组件
import faicon from '@/components/fa-icon/fa-icon.vue'
Vue.component('fa-icon', faicon)
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
