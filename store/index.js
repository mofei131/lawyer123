import Vue from 'vue'
import Vuex from 'vuex'
import module1 from './modules/m1.js'
import module2 from './modules/m2.js'
Vue.use(Vuex)
//this指向store
const store = new Vuex.Store({
	modules: {
		module1,
		module2
	},
	state: {
		cities:[],
		provinces:[]

	},
	mutations: {
		getProvince(state,params){
			state.provinces = params;
			
		},
		getCity(state,params) {
			state.cities = params;
		}
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
		// getCitys(context, products) {
			
		// 	// console.log(products)
		// 	// setTimeout(() => {
		// 		context.commit('increment') 

		// },

	}

})

export default store
