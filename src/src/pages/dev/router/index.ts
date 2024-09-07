import { createRouter, createWebHistory } from 'vue-router'
import { addRoutes } from '@/router'

const router = createRouter({
  history: createWebHistory('/mpa/dev'),
  routes: [],
})

addRoutes(router, [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@p-dev/views/home.vue')
  }
])

export default router
