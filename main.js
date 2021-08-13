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


let socketTask = uni.connectSocket({
	url: 'wss://layer.boyaokj.cn/wss',
	header: {
		'content-type': 'application/json'
	},
	protocols: [],
	method: 'GET'
});
Vue.prototype.$socketTask = socketTask;
uni.onSocketOpen(function(res) {
	console.log('WebSocket连接已打开！');
	store.commit('commitWebsocketConnect', true)
});
uni.onSocketError(function(res) {
	console.log('WebSocket连接打开失败，请检查！');
	// store.commit('commitWebsocketConnect', false)
});

// uni.onSocketMessage(function(res) {
// 	console.log('收到服务器内容：');
// 	let data = JSON.parse(res.data);
// 	console.log(data)
// 	if (data.code == 200) {
// 		store.commit('commitSocketInfo', data.data)
// 	}

// });
uni.onSocketClose(function(res) {
	console.log('WebSocket 已关闭！');
	Vue.prototype.$socketTask = null;
	store.commit('commitWebsocketConnect', false)
});




Vue.config.productionTip = false;
// 图标组件
import faicon from '@/components/fa-icon/fa-icon.vue'
Vue.component('fa-icon', faicon)
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
