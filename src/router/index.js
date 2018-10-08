import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Chat from '@/components/Chat'
import Login from '@/components/Login'
import Register from '@/components/Register'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      path: '/chat',
      name: 'Chat',
      component: Chat,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      component: PageNotFound
    }
  ],
  mode: 'history'
})
