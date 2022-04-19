import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import http from '@/common/http'
import amap from '@/common/SDK/amap-wx.js';
import share from '@/common/share.js'
Vue.prototype.$amapPlugin = new amap.AMapWX({
	key: "1bd296377a30e42f60736564fc62c6bf"
});
Vue.prototype.$store = store;
Vue.prototype.$myRequest = http.ajax;

Vue.config.productionTip = false;
// 图标组件
import faicon from '@/components/fa-icon/fa-icon.vue'
Vue.component('fa-icon', faicon)
Vue.mixin(share)
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
