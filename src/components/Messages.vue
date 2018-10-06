<template>
  <span>
    <v-layout
      row
      v-for="(msg, index) in messages"
      :key="index"
      :align-start="isCurrentUser(msg.sender)"
      :align-content-start="isCurrentUser(msg.sender)"
      :align-end="!isCurrentUser(msg.sender)"
      :align-content-end="!isCurrentUser(msg.sender)">
      <v-flex
        xs8 
        sm6
        md4
        :offset-xs4="isCurrentUser(msg.sender)"
        :offset-sm6="isCurrentUser(msg.sender)"
        :offset-md8="isCurrentUser(msg.sender)">
        <v-avatar 
          slot="activator"
          size="32"
          class="pt-2"
          :class="isCurrentUser(msg.sender) ? 'right pl-4' : 'left pr-4'"
          style="z-index: 1">
          <img
            class="avatar-img-small"
            :src="isCurrentUser(msg.sender) ? user.avatar : interlocutor.avatar">
        </v-avatar>
        <h6
          class="caption grey--text"
          :class="isCurrentUser(msg.sender) ? 'text-xs-right' : 'text-xs-left'">
          {{isCurrentUser(msg.sender) ? '' : interlocutor.name + ','}}
          {{msg.timestamp | formatDate}}
        </h6>
        <v-card raised :color="isCurrentUser(msg.sender) ? 'blue' : 'white' ">
          <v-card-text :class="isCurrentUser(msg.sender) ? 'white--text' : 'black--text'">
            {{msg.text}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </span>
</template>

<script>
import moment from 'moment'

export default {
  props: [
    'messages',
    'user',
    'interlocutor'
  ],
  methods: {
    isCurrentUser (sender) {
      return sender === this.user.id
    },
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(new Date(value)).format('MM/DD/YY h:mm:ss a')
      }
    }
  }
}
</script>

<style scoped>
  .avatar-img-small {
    min-width: 32px;
    min-height: 32px;
  }
  .v-card {
    border-radius: 10px;
  }
</style>
