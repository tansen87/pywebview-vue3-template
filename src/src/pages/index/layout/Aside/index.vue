<template>
  <aside
    class="aside relative transition-[width] duration-200 ease-in-out"
    :class="{ '!w-[60px]': isAsideCollapse, 'is-dark': asideTheme.dark }"
    :style="styles">
    <div class="flex flex-col w-full h-full overflow-hidden">
      <!-- LOGO区 -->
      <div class="aside-logo h-[52px] p-4 text-center whitespace-nowrap border-b border-b-gray-200" :class="{ '!p-2': isAsideCollapse }">
        <RouterLink to="/" class="flex items-center appearance-none text-inherit no-underline hover:text-inherit" :class="{ 'justify-center': isAsideCollapse }">
          <img :src="logoPng" class="w-6 h-6 transition-all duration-200" :class="{ 'w-8 h-8': isAsideCollapse }" />
          <span v-show="!layout.isAsideCollapse" class="ml-2 font-semibold">{{ app.name }}</span>
        </RouterLink>
      </div>
      <!-- 菜单区 -->
      <Menu class="flex-1 h-0 border-r-0 overflow-auto" />

      <!-- 个人标记 -->
      <PersonalBadge />
    </div>

    <!-- 折叠按钮 -->
    <div
      v-if="asideCollapseTogglePlace === 'aside'"
      class="
        absolute flex items-center justify-center w-[24px] h-[24px] right-0 top-[20%] translate-x-[50%] bg-normal z-10 rounded-full
        border border-gray-300 cursor-pointer hover:!bg-gray-100"
      :class="{ 'bg-black border-black hover:!bg-gray-800': asideTheme.dark }"
      @click="isAsideCollapse = !isAsideCollapse">
      <el-icon class="transition-all duration-300" :class="{ 'rotate-180': isAsideCollapse }"><ArrowLeft /></el-icon>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import useLayout from '@p-index/store/layout'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import Menu from './Menu.vue'
import useApp from '@/store/app'
import PersonalBadge from './PersonalBadge.vue'
import logoPng from '@/assets/logo.png'

const app = useApp()

const layout = useLayout()
const { isAsideCollapse, asideCollapseTogglePlace, asideWidth, asideTheme } = storeToRefs(layout)
const styles = computed<any>(() => {
  return {
    width: isAsideCollapse.value ? null : `${asideWidth.value}px`,
  }
})
</script>

<style scoped>
.el-menu {
  /* --color: theme('colors.white');
  --el-menu-bg-color: var(--color);
  --el-menu-hover-bg-color: var(--color);
  --el-menu-border-color: theme('colors.transparent');
  --el-menu-active-text-color: theme('colors.gray.100'); */
  /* &--collapse {
    @apply !w-full;
  }
  &-item {
    @apply !px-4;
  } */
}
.aside {
  &.is-dark {
    background-color: #141414;
    @apply text-white;
    .el-menu {
      --el-menu-bg-color: #141414;
      --el-menu-hover-bg-color: #1f1f1f;
      --el-menu-text-color: theme('colors.white');
    }
  }
}
</style>
