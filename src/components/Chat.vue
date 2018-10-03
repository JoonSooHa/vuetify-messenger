<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center v-if="empty">
      <v-flex xs9 sm6 md4 lg4>
        <p class="subheading font-weight-thin grey--text">Please select a chat to start messaging</p>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex>
        <h1>Hello from Chat.vue</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
            empty: true
        }
    }
}
</script>
