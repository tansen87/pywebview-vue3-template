import router, { addRoutes } from '@/router'
import Layout from '../layout/index.vue'

addRoutes(router, [{
  path: '/login',
  component: () => import('@p-index/views/login/index.vue'),
}, {
  name: 'Layout',
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@p-index/views/dashboard/index.vue'),
    },
    {
      path: 'icon',
      component: () => import('@p-index/views/icon/index.vue'),
    },
    {
      path: 'datetime',
      component: () => import('@p-index/views/datetime/index.vue'),
    },
    {
      path: 'ui',
      component: () => import('@p-index/views/ui/index.vue'),
    },
    {
      path: 'table',
      component: () => import('@p-index/views/table/index.vue'),
    },
    {
      path: 'error',
      redirect: '/error/404',
      children: [
        {
          path: '404',
          component: () => import('@p-index/views/error/404.vue'),
        },
      ],
    },
    {
      path: ':paths(.*)*',
      component: () => import('@/views/error/404.vue'),
    },
  ],
}])

export default router
