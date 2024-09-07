import '@/permission'
import router from '../router'
import useSession from '@p-index/store/session'
import whiteList from './whiteList'

router.beforeEach(async(to, from, next) => {
  const session = useSession()

  // 白名单通行
  if (whiteList.indexOf(to.path) >= 0) {
    return next()
  }

  // 鉴权
  if (!session.inited) {
    try {
      await session.init()
    } catch {
      return next('/login')
    }
  }

  next()
})
