import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    name: 'about',
    path: '/abouter/:login',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
