import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user.js'
import module2 from './modules/m2.js'
import http from '@/common/http'

Vue.use(Vuex)
//this指向store
const store = new Vuex.Store({
	modules: {
		userModule,
		module2
	},
	state: {
		isLogin: uni.getStorageSync('isLogin') ? uni.getStorageSync('isLogin') : false,
		userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : null,
		cities: [],
		provinces: [],
		bussinessTypes: [],
		lawyerLevels: [],
		workAges: []
	},
	mutations: {
		commitProvince(state, params) {
			state.provinces = params;
		},
		commitCity(state, params) {
			state.cities = params;
		},
		commitBussTypes(state, params) {
			state.bussinessTypes = params;
		},
		commitLyLevels(state, params) {
			state.lawyerLevels = params;
		},
		commitWorkAges(state, params) {
			state.workAges = params;
		},

	},
	getters: {

		// doneTodos: state => {
		// 	return state.todos.filter(todo => todo.done)
		// },
		// doneTodosCount: (state, getters) => { //此getter即store的getter
		// 	return getters.doneTodos.length
		// },
		// // ... 调用时可以传参 如：//store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
		// getTodoById: (state) => (id) => {
		// 	return state.todos.find(todo => todo.id === id)
		// }
	},
	actions: { //Action 类似于 mutation，不同在于：Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
		//参数  函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
		getProvinceCity(context, param) {
			let res = http.ajax({
				url: '/index/getProvince',
				method: 'GET',
				data: {}
			})
			res.then(data => {
				if (data && data.data) {
					context.commit('commitProvince', data.data)
				}

			})
			let res1 = http.ajax({
				url: '/index/getCity',
				method: 'GET',
				data: {}
			})
			res1.then(data => {
				if (data && data.data) {
					context.commit('commitCity', data.data)
				}
			})

		},
		async getBussinessTypes(context) {
			//layer/getCaseType
			let res = await http.ajax({
				url: 'layer/getCaseType',
				methods: 'GET',
				data: {}
			});
			if (res && res.data) {
				this.bussinessTypes = res.data;
				context.commit('commitBussTypes', res.data)
			}

		},
		async getLawyerLevels(context) {
			let res = await http.ajax({
				url: 'layer/level',
				methods: 'GET',
				data: {}
			});
			if (res && res.data) {
				context.commit('commitLyLevels', res.data)

			}
		},
		async getWorkAges(context) {
			let res = await http.ajax({
				url: 'layer/LayerAge',
				methods: 'GET',
				data: {}
			});
			if (res && res.data) {
				context.commit('commitWorkAges', res.data)

			}
		},

	}

})

export default store
