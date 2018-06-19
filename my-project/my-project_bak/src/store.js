import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  itemList: [
    { id: 0, text: 'chloe' },
    { id: 1, text: 'Cheese' },
    { id: 2, text: 'Whatever else humans are supposed to eat' }
  ]
}

export const mutations = {
  addItem (state, item) {
    state.itemList.push(item)
  }
}

const actions = {} // side-effecting or async fns
const getters = {} // normal functions

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
