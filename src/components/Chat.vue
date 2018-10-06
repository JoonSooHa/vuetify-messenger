<template>
  <v-container
    row 
    fluid 
    grid-list-xl 
    v-if="interlocutor">
    <app-messages
      :messages="messages"
      :user="user"
      :interlocutor="interlocutor">
    </app-messages>
    <v-layout id="scroll-to-element">
      <span style="height: 90px" />
    </v-layout>
    <v-footer app inset height="64px">
      <v-layout row align-center class="pa-4">
        <v-flex hidden-xs-only sm1 align-end>
          <v-avatar slot="activator" class="right">
            <img class="avatar-img" :src="user.avatar">
          </v-avatar>
        </v-flex>
        <v-flex xs12 sm10>
          <v-text-field 
            v-model="message"
            append-icon="send"
            color="orange darken-4"
            autofocus
            single-line
            type="text"
            label="Write a message..."
            @click:append="sendMessage()"
            @keyup.enter="sendMessage()" />
        </v-flex>
        <v-flex hidden-xs-only sm1 align-end>
          <v-avatar slot="activator" class="left">
            <img class="avatar-img" :src="interlocutor.avatar">
          </v-avatar>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-container>
  <v-container fluid fill-height v-else>
    <v-layout align-center justify-center>
      <v-flex xs9 sm6 md4 lg4>
        <p class="subheading font-weight-thin grey--text">Please select a chat to start messaging</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import Messages from './Messages'

export default {
  components: {
    'app-messages': Messages
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    clearMessage () {
      this.message = ''
    },
    scrollToEnd () {
      const options = {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      }
      this.$vuetify.goTo('#scroll-to-element', options)
    },
    sendMessage () {
      if (!this.message) {
        return
      }
      const msg = {
        from: this.user.id,
        text: this.message,
        timestamp: parseInt(moment(new Date()).format('x')),
        to: this.interlocutor.id
      }
      this.$store.dispatch('sendMessage', msg)
      this.clearMessage()
      this.scrollToEnd()
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    interlocutor () {
      return this.$store.getters.interlocutor
    },
    messages () {
      return this.$store.getters.messages
    }
  }
  // updated: function() {
  //   this.scrollToEnd()
  // }
}
</script>

<style scoped>
  .avatar-img {
    min-width: 48px;
    min-height: 48px;
  }
</style>
