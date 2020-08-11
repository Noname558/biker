import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import mark from '@/store/modules/mark'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, mark
  }
})
