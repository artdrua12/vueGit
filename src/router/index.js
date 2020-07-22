import Vue from 'vue'
import VueRouter from 'vue-router'
import TheSearchUser from '../views/TheSearchUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: TheSearchUser
  },
  {
    name: 'favorite',
    path: '/favorite',
    component: () => import(/* webpackChunkName: "favorite" */ '../views/TheFavoriteFork.vue'),
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
