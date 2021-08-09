
import rootStore from '../index.js'
/**
 * 引入rootStore 为了 使用commit dispatch 以及 根模块的 state 等
 */
const module1 = {
  namespaced: true,
  state:()=>({
    name: 'module1-state-data',
    type: 'module1-state-type'
  }) ,
  mutations: {
    updateNameByMutation(state, appendStr){
      // state.name = state.name + " append Str: " + appendStr
    }
  },
  actions: {
    udpateNameByAction({commit}, appendStr) {
		console.log("====m1-dispatch---")
      commit("updateNameByMutation", appendStr)
    }
  },
  getters: {
    getNameA(state){
      return state.name
    },
	getModuleA(state){
		console.log(rootStore.state.count)
		rootStore.commit('increment')
		console.log(rootStore.state.count)
		return state.type
	}
  }
}
export default module1