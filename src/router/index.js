import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
import Register from '@/components/Register'
import PageNotFound404 from '@/components/PageNotFound404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      component: PageNotFound404
    }
  ],
  mode: 'history'
})
