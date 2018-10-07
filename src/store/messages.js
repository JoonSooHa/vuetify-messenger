import * as fb from 'firebase'

class Message {
  constructor (sender, text, timestamp) {
    this.sender = sender
    this.text = text
    this.timestamp = timestamp
  }
}

const saveMessage = async (from, to, text, timestamp, message) => {
  const chatRef = fb.database().ref('users')
    .child(from)
    .child('chats')
    .child(to)
  await chatRef.update({
    lastMessage: text,
    timestamp: timestamp
    // TODO: add unreadMessageCount
  })
  await chatRef.child('messages').push(message)
}

export default {
  state: {
    messages: []
  },
  mutations: {
    setMessages (state, payload) {
      state.messages = payload
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
          payload.timestamp
        )
        await saveMessage(payload.from, payload.to, 'You: ' + payload.text, payload.timestamp, newMessage)
        await saveMessage(payload.to, payload.from, payload.text, payload.timestamp, newMessage)
        commit('setLoading', false)
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
        const messageRef = fb.database().ref(`users/${payload.from}/chats/${payload.to}/messages`)
        if (messageRef) {
          messageRef.on('value', async function (snapshot) {
            const resultMessages = []
            const messages = snapshot.val()
            for (const key in messages) {
              const newMessage = new Message(
                messages[key].sender,
                messages[key].text,
                messages[key].timestamp
              )
              resultMessages.push(newMessage)
            }
            commit('setMessages', resultMessages)
            commit('setLoading', false)
          })
        } else {
          commit('setMessages', [])
          commit('setLoading', false)
        }
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
