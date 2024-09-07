import { MaybeRef, useLocalStorage } from '@vueuse/core'
import { merge } from 'lodash'
import { reactive, ref, watch } from 'vue'

interface Options {
  username?: MaybeRef<string>
  password?: MaybeRef<string>
  remember?: MaybeRef<boolean>
}

interface LoginData {
  username: string
  password: string
}

export default function(options: Options = {}) {
  const username = ref(options.username)
  const password = ref(options.password)
  const remember = ref(options.remember)
  const store = useLocalStorage<LoginData>('login-data', {} as LoginData)

  const form = reactive<LoginData>({
    username: username as any,
    password: password as any,
  })

  function toStore() {
    store.value = form
  }

  watch(store, () => {
    merge(form, store.value)
  }, { immediate: true })


  return {
    form,
    remember,

    toStore,
  }
}
