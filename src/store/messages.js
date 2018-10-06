import * as fb from 'firebase'

class Message {
  constructor (from, text, timestamp, to, id = null) {
    this.from = from
    this.text = text
    this.timestamp = timestamp
    this.to = to
    this.id = id
  }
}

export default {
  state: {
    messages: [
      { id: 1, sender: 'evXJnaKkVKfGUnfmQQifEFQMYV13', text: 'This is simle message', timestamp: 1538765496000 },
      { id: 2, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'dfgdfgfdgdf', timestamp: 1538765496000 },
      { id: 3, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'Tdfgdgfdbb', timestamp: 1538765496000 },
      { id: 4, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: '1111111', timestamp: 1538765496000 },
      { id: 5, sender: 'evXJnaKkVKfGUnfmQQifEFQMYV13', text: '44444234', timestamp: 1538765496000 },
      { id: 6, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'dgsgdfs', timestamp: 1538765496000 },
      { id: 7, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'This is simle message', timestamp: 1538765496000 },
      { id: 8, sender: 'evXJnaKkVKfGUnfmQQifEFQMYV13', text: 'hhghgh', timestamp: 1538765496000 },
      { id: 9, sender: 'evXJnaKkVKfGUnfmQQifEFQMYV13', text: 'zzzzzzzz', timestamp: 1538765496000 },
      { id: 10, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'bbbbbb', timestamp: 1538765496000 },
      { id: 11, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'This is simle message', timestamp: 1538765496000 },
      { id: 12, sender: 'evXJnaKkVKfGUnfmQQifEFQMYV13', text: 'This is simle', timestamp: 1538765496000 },
      { id: 13, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: '44444234', timestamp: 1538765496000 },
      { id: 14, sender: 'evXJnaKkVKfGUnfmQQifEFQMYV13', text: 'lnirlqernlewrfer', timestamp: 1538765496000 },
      { id: 15, sender: 'QWLiTfq7AiWaPxbrUS93q0x6CSv1', text: 'Simle message', timestamp: 1538765496000 }
    ]
  },
  mutations: {
    setMessages (state, payload) {
      state.messages = payload
    },
    addMessage (state, payload) {
      state.messages.push(payload)
    }
  },
  actions: {
    async sendMessage ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newMessage = new Message(
          payload.from,
          payload.text,
          payload.timestamp,
          payload.to
        )
        const savedMessage = await fb.database().ref('messages').push(newMessage)
        commit('setLoading', false)
        commit('addMessage', {
          id: savedMessage.key,
          sender: payload.from,
          text: payload.text,
          timestamp: payload.timestamp
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    fetchMessages ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        // fb.database().ref('users').on('value', async function (snapshot) {
        //   const resultContacts = []
        //   const currentUser = await getUserState()
        //   const contacts = snapshot.val()
        //   for (const key in contacts) {
        //     if (currentUser.id === key) {
        //       continue
        //     }
        //     const newContact = new Contact(
        //       key,
        //       contacts[key].name,
        //       contacts[key].email,
        //       'lastMessage',
        //       1538636239000,
        //       gravatar.url(contacts[key].email, {s: '100', d: 'identicon'})
        //     )
        //     resultContacts.push(newContact)
        //   }
        // commit('setMessages', resultContacts)
        //  commit('setLoading', false)
        // })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    }
  },
  getters: {
    messages (state) {
      return state.messages
    }
  }
}
