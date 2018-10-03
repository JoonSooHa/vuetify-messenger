import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import user from './user'
import chat from './chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    chat
  }
})
