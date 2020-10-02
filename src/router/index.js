import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/fish',
    name: 'Fish',
    component: () => import(/* webpackChunkName: "about" */ '../views/Fish.vue')
  },
  {
    path: '/wisp',
    name: 'Wisp',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wisp.vue')
  },
  {
    path: '/bulky',
    name: 'Bulky',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Bulky.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routes,
    ...[
      {
        path: '/',
        name: 'Inktober',
        component: Home
      },
      {
        path: '*',
        name: 'Coming Soon',
        component: () => import('../views/NotFound.vue')
      }
    ]
  ]
})

export default router
