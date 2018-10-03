import * as fb from 'firebase'
import getUserState from './getUserState'
import gravatar from 'gravatar'

class Contact {
  constructor (id, name, email, lastMessage, dateLastMessage, avatar) {
    this.id = id
    this.name = name
    this.email = email
    this.lastMessage = lastMessage
    this.dateLastMessage = dateLastMessage
    this.avatar = avatar
  }
}

export default {
  state: {
    contacts: []
  },
  mutations: {
    setContacts (state, payload) {
      state.contacts = payload
    }
  },
  actions: {
    fetchContacts ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      try {
        fb.database().ref('users').on('value', async function (snapshot) {
          const resultContacts = []
          const currentUser = await getUserState()
          const contacts = snapshot.val()
          for (const key in contacts) {
            if (currentUser.id === key) {
              continue
            }
            const newContact = new Contact(
              key,
              contacts[key].name,
              contacts[key].email,
              'lastMessage',
              'dateLastMessage',
              gravatar.url(contacts[key].email, {s: '100', d: 'identicon'})
            )
            resultContacts.push(newContact)
          }
          commit('setContacts', resultContacts)
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    contacts (state) {
      return state.contacts
    }
  }
}
