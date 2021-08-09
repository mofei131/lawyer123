
const module2 = {
  namespaced: true,
  state: {
    name: 'module2',
    type: 'module2'
  },
  mutations: {
    updateNameByMutation(state, appendStr){
      state.name = state.name + " append Str: " + appendStr
    }
  },
  actions: {
    udpateNameByAction({commit}, appendStr) {
      commit("updateNameByMutation", appendStr)
    }
  },
  getters: {
    getNameA(state){
      return state.name
    },
	getModule2(state){
	  return "module2"
	}
  }
}
export default module2