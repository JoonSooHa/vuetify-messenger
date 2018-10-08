import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import common from './common'
import user from './user'
import contacts from './contacts'
import messages from './messages'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    contacts,
    messages
  },
  plugins: [createPersistedState()]
})
