
import rootStore from '../index.js'
/**
 * 引入rootStore 为了 使用commit dispatch 以及 根模块的 state 等
 */
const module1 = {
  namespaced: true,
  state:()=>({
	// userInfo:
  }) ,
  mutations: {
    
  },
  actions: {
  //   udpateNameByAction({commit}, appendStr) {
		// console.log("====m1-dispatch---")
  //     commit("updateNameByMutation", appendStr)
  //   }
  },
  getters: {
   
	// getModuleA(state){
	// 	console.log(rootStore.state.count)
	// 	rootStore.commit('increment')
	// 	console.log(rootStore.state.count)
	// 	return state.type
	// }
  }
}
export default module1