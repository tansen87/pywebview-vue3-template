import router from '@/router'
import NProgress from '@/plugins/nprogress'

router.beforeEach((to, from, next) => {
  NProgress.start()

  next()
})

router.afterEach(() => {
  NProgress.done()
})
