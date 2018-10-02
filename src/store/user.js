import * as fb from 'firebase'

class User {
  constructor (id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {name, email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().createUserWithEmailAndPassword(email, password)
        await fb.database().ref('users').child(user.user.uid).update({name, email})
        commit('setUser', new User(user.uid, name, email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const user = await fb.auth().signInWithEmailAndPassword(email, password)
        const result = await fb.database().ref('users').child(user.user.uid).once('value')
        const userDB = result.val()
        commit('setUser', new User(user.uid, userDB.name, userDB.email))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async autoLoginUser ({commit}, payload) {
      const result = await fb.database().ref('users').child(payload.uid).once('value')
      const userDB = result.val()
      commit('setUser', new User(payload.uid, userDB.name, userDB.email))
    },
    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserAuthorized (state) {
      return state.user !== null
    }
  }
}
