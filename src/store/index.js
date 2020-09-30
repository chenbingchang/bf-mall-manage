import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aesKey: null, // AES密钥
    aesIv: null, // AES偏移
  },
  mutations: {
    setAesKey (state, aesKey) {
      state.aesKey = aesKey
    },
    setAesIv (state, aesIv) {
      state.aesIv = aesIv
    },
  },
  actions: {
  },
  modules: {
  },
})
