<template>
  <el-menu :default-active="$route.path" :collapse="isAsideCollapse">
    <MenuItem v-for="item in menus" :key="item.path" :item="item" @click="clickMenu" />
  </el-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MenuItem from './MenuItem.vue'
import useSession from '@p-index/store/session'
import { useRouter } from 'vue-router'
import useLayout from '@p-index/store/layout'

const router = useRouter()
const { menus } = storeToRefs(useSession())
const { isAsideCollapse } = storeToRefs(useLayout())

function clickMenu(menu: any) {
  if (menu.path.match(/^https?:\/\//)) {
    return window.open(menu.path)
  }
  router.push(menu.path)
}
</script>
