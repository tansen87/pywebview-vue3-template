import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '@/api/menu'
import * as userApi from '@/api/user'

export default defineStore('session', () => {
  const inited = ref(false)
  const user = ref()
  const menus = ref()

  function init() {
    return new Promise<void>(async(resolve, reject) => {
      try {
        if (inited.value) {
          resolve()
          return
        }
        user.value = await userApi.getCurrent()
        menus.value = await api.list()

        // eslint-disable-next-line no-promise-executor-return
        if (!user.value) return reject('')

        inited.value = true
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  return {
    user,
    menus,
    inited,
    init,
  }
})
