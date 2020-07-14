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
    name: 'favorite',
    path: '/favorite',
    component: () => import(/* webpackChunkName: "favorite" */ '../views/Favorite.vue'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
