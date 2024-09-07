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
        <div class="text-h5 font-semibold">登录{{ appName }}</div>
        <div class="mt-6">
          <el-form ref="formIns" :model="form" :rules="rules" size="large" label-position="top" label-width="120px" label-suffix="：">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                @keydown.enter="handleLogin" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                show-password
                @keydown.enter="handleLogin" />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="remember">记住用户名与密码</el-checkbox>
            </el-form-item>
          </el-form>
          <div class="mt-8">
            <el-button
              type="primary"
              size="large"
              round
              :loading="loading"
              class="!px-20"
              @click="handleLogin">登录</el-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import useApp from '@/store/app'
import { storeToRefs, } from 'pinia'
import { useRouter, } from 'vue-router'
import useLogin from './useLogin'
import { computed, ref, } from 'vue'
import { FormInstance, FormRules, } from 'element-plus'
import * as api from '@/api/user'

const { name: appName, } = storeToRefs(useApp())
const { form, remember, toStore, } = useLogin({
  remember: true,
})
const router = useRouter()
const loading = ref(false)

const formIns = ref<FormInstance>()
const rules = computed(() => ({
  username: { required: true, message: '请输入用户名', },
  password: { required: true, message: '请输入密码', },
} as FormRules))

async function handleLogin() {
  try {
    loading.value = true
    await formIns.value.validate()
    await api.login(form)

    // 记住密码时，存储登录信息
    // FIXME 明文存储有一定安全隐患
    if (remember.value) {
      toStore()
    }

    await router.replace('/')
  } finally {
    loading.value = false
  }
}
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
