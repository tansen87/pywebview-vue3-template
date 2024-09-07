import { createRouter, createWebHistory, Router, RouteRecordRaw, } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [],
})

export function addRoutes(router: Router, routes: RouteRecordRaw[], parentName?: string) {
  routes.forEach((route) => {
    if (parentName) {
      router.addRoute(parentName, route)
    } else {
      router.addRoute(route)
    }
  })
}

export default router
