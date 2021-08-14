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
		// isLogin: uni.getStorageSync('isLogin') ? uni.getStorageSync('isLogin') : false,
		userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : null,
		cities: [],
		provinces: [],
		bussinessTypes: [],
		lawyerLevels: [],
		workAges: [],
		wxCode: null,
		windowHeight:'750',
		websocketConnect:false,
		socketInfo:[]

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
		commitUserInfo(state, params) {
			state.userInfo = params;
		},
		commitWindowHeight(state, params){
			state.windowHeight = params;
		},
		commitWebsocketConnect(state, params){
			state.websocketConnect = params;
		},
		commitSocketInfo(state, params){
			let c = state.socketInfo;
			
			c.push(params);
			state.socketInfo = c;
		}

	},
	getters: {

		getWindowHeight: state => {
			console.log(state.windowHeight);
			return state.windowHeight+'px'
		},
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
		getWxCode(context) {
			
			console.log(context.state.userInfo );
			return new Promise((resolve,feject)=>{
				console.log('-------------------');
				console.log(context.state);
				if(context.state.userInfo && context.state.userInfo.user_id){
					resolve({hasUserInfo:true});
					return;
				};
		
				uni.login({
					provider: 'weixin',
					success: async function(res) {
						console.log(res);
						if (res.code) {
							let code = res.code;
							let res1 = await http.ajax({
								url: 'wechat/login',
								data: {
									pid: 0,
									code
								}
							});
							console.log('===========getwxcode=======================');
							console.log(res1);

							if(res1.code==-1){
								uni.showToast({
									title:res1.message,
									icon:'none'
								})
								reject(res1)
								return
							}
							if (res1 && res1.code==200) {
								console.log('');
								context.commit('commitUserInfo',res1.data);
								uni.setStorageSync('userInfo',res1.data);
								resolve({hasUserInfo:true});
								return
							}
				
						} else {
							uni.showToast({
								title: '获取数据失败',
								icon:'none',
								duration: 2000
							});
							resolve({hasUserInfo:false})
						}
					},
				});
			})
			
		},
		updateUserInfo(context){
			
			return new Promise(async (resolve,reject)=>{
				let userInfo = uni.getStorageSync('userInfo');
				let pass =true;
				if(!userInfo || !userInfo.user_id){
						let result = await context.dispatch('getWxCode');
						if(!result.hasUserInfo){
							pass =false;
						}
				}
				if(!pass){
					resolve(false);
				}
				uni.showModal({
					title: '温馨提示',
					content: '亲，授权微信登录后才能正常使用小程序功能',
					success(res) {
						if(res.confirm) {
							uni.getUserProfile({
								desc: '获取用户头像等信息',
								success: async (res) => {
									let {avatarUrl,city,country,gender,language,nickName,province} = res.userInfo;
									userInfo = uni.getStorageSync('userInfo');
									if(!userInfo){
										reject(false);
									}
									let data =  {
											nickname:nickName,
											avater:avatarUrl,
											country:country,
											gender:gender,
											province:province,
											city:city,
											user_id:userInfo && userInfo.user_id
										}
										
									let res1 = await http.ajax({
										url: 'wechat/setUserinfo',
										method:'GET',
										data
									});
									if(res1.code==200){
										userInfo.isAuthor = true;
										userInfo.nickname = nickName;
										userInfo.avater = avatarUrl;
										userInfo.country = country;
										userInfo.gender = gender;
										userInfo.province = province;
										userInfo.city = city;
										context.commit('commitUserInfo',userInfo);
										uni.setStorageSync('userInfo',userInfo);
										resolve(true);
									}else{
										reject(false)
									}
								},
								fail: (res) => {
									reject(false)
								}
							});
						}
					}
				})
				
			});
			
			
		}
	}

})

export default store
