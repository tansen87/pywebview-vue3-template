<template>

  <div class="h-full flex">

    <!-- 左侧 -->
    <div
      class="brand-wrap hidden md:block w-[540px] bg-[#080a0f]">
      <!--  -->
    </div>

    <!-- 右侧 -->
    <div class="flex-1 w-0 flex items-center">
      <div class="w-[450px] mx-auto relative -top-20 p-8 bg-normal">
        <div class="text-h5 font-semibold">pywebview vue template</div>
        <div class="mt-6">
          <div class="mt-8">
            <el-button
              type="primary"
              size="large"
              round
              :loading="loading"
              class="!px-20"
              @click="handleLogin">waiting...</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import useLogin from './useLogin'
import * as api from '@/api/user'

const { form } = useLogin({
  remember: true,
})
const router = useRouter()
const loading = ref(false)

async function handleLogin() {
  try {
    loading.value = true
    await api.login(form)

    await router.replace('/')
  } finally {
    loading.value = false
  }
}

onMounted(async() => {
  await handleLogin()
})
</script>

<style scoped>
.el-input {
  --el-input-border-radius: theme('borderRadius.sm');
  --el-input-bg-color: theme('colors.gray.200');
  --el-input-border-color: theme('colors.gray.200');
}
.brand-wrap {
  background-image: url('./brand.png');
  @apply bg-cover bg-no-repeat bg-center;
}
</style>
