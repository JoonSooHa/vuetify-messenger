import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBcMLj5xczyFE6tMCoktSCk0GixwJBaY90',
      authDomain: 'vuetifymessenger.firebaseapp.com',
      databaseURL: 'https://vuetifymessenger.firebaseio.com',
      projectId: 'vuetifymessenger',
      storageBucket: 'vuetifymessenger.appspot.com',
      messagingSenderId: '898913860222'
    }
    fb.initializeApp(config)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
        this.$store.dispatch('fetchContacts')
      }
    })
  }
})
