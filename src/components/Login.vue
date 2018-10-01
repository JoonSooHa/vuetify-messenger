<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-12">
          <v-toolbar color="amber">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules" 
                prepend-icon="email"
                name="email" 
                label="Email" 
                type="email"
                required>
              </v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="6" 
                prepend-icon="lock" 
                name="password"
                label="Password" 
                type="password"
                required>
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              flat
              :loading="loading"
              :disabled="!valid || loading"
              @click="onSubmit"
              >Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Password must be equal or more than 6 characters'
        ]
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
        }
      }
    }, 
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
