import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('app', () => {
  const id = ref('base-app')
  const name = ref(import.meta.env.APP_NAME)

  return {
    id,
    name,
  }
})
