<template>
  <v-app>
    <v-navigation-drawer 
      app 
      clipped 
      fixed 
      disable-resize-watcher
      v-model="drawer">
      <v-list two-line v-if="isUserAuthorized">
        <v-subheader>Contacts</v-subheader>
        <template v-for="(contact, index) in contacts">
          <v-list-tile
            :class="isSelectedContact(contact) ? 'selected-contact' : ''"
            avatar
            :key="index"
            @click="setInterlocutor(contact)">
            <v-list-tile-avatar>
              <img :src="contact.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title 
                :class="isSelectedContact(contact) ? 'white--text' : ''"
              >{{contact.name}}
              </v-list-tile-title>
              <v-list-tile-sub-title 
                :class="isSelectedContact(contact) ? 'white--text' : ''"
              >{{contact.lastMessage}}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action-text
              :class="isSelectedContact(contact) ? 'white--text' : ''"
            >{{contact.timestamp | formatDate}}
            </v-list-tile-action-text>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="amber">
      <v-toolbar-side-icon @click.stop="onToggleDrawer">
        <v-tooltip bottom>
          <v-icon color="grey darken-3" slot="activator">people</v-icon>
          <span>Contacts</span>
        </v-tooltip>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          class="pointer"
        >Messenger
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip 
        bottom 
        v-for="(link, index) in links"
        :key="index">
        <v-btn icon slot="activator" :to="link.url">
          <v-icon color="grey darken-3">{{link.icon}}</v-icon>
        </v-btn>
        <span>{{link.tooltip}}</span>
      </v-tooltip>
      <v-tooltip bottom v-if="isUserAuthorized">
        <v-btn icon slot="activator" @click="onLogout">
          <v-icon color="grey darken-3">exit_to_app</v-icon>
        </v-btn>
        <span>Logout from {{user.name}}</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        color="error"
        :multi-line="true"
        :timeout="5000"
        :value="true"
        @input="closeError"
        >{{error}}
        <v-btn
          dark
          flat
          @click.native="closeError"
        >Close
        </v-btn>
      </v-snackbar>
    </template> 
  </v-app>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    setInterlocutor (contact) {
      const obj = {
        from: this.user.id,
        to: contact.id
      }
      this.$store.commit('setInterlocutor', contact)
      this.$store.dispatch('fetchMessages', obj)
      this.drawer = false
    },
    isSelectedContact (contact) {
      return this.interlocutor && contact.id === this.interlocutor.id
    },
    closeError () {
      this.$store.dispatch('clearError')
    },
    onToggleDrawer () {
      if (this.isUserAuthorized) {
        this.drawer = !this.drawer
      }
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  }, 
  computed: {
    error () {
      return this.$store.getters.error
    },
    user () {
      return this.$store.getters.user
    },
    isUserAuthorized () {
      return this.user !== null
    },
    links () {
      if (!this.isUserAuthorized) {
        return [
          { icon: 'person_add', tooltip: 'Register', url: '/register' },
          { icon: 'person', tooltip: 'Login', url: '/login' }
        ]
      }
      return []
    },
    contacts () {
      return this.$store.getters.contacts
    },
    interlocutor () {
      return this.$store.getters.interlocutor
    }
  },
  filters: {
    formatDate (value) {
      if (value) {
        return moment(new Date(value)).format('MM/DD/YY')
      }
    }
  },
  watch: {
    isUserAuthorized () {
      this.drawer = this.isUserAuthorized
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
  .selected-contact {
    background-color: #FFC107; /* amber */
  }
</style>
