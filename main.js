import Vue from 'vue'
import App from './App'
import store from '@/store/index'
import http from '@/common/http'

Vue.prototype.$store = store;
Vue.prototype.$myRequest = http.ajax;
Vue.config.productionTip = false
// 图标组件
import faicon from '@/components/fa-icon/fa-icon.vue'
Vue.component('fa-icon',faicon)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
