<template>
  <section class="h-full flex flex-col">
    <!-- 网络检测区 -->
    <network-detector />
    <!-- 主区 -->
    <section class="flex-1 h-0 flex overflow-hidden">
      <!-- 侧边栏 -->
      <Aside class="h-full border-r border-r-gray-200" />
      <section class="flex flex-col flex-1 w-0">
        <!-- 头部 -->
        <Header v-show="!isHideHeader" class="z-10 border-b border-b-gray-100" />
        <!-- 标签页 -->
        <!-- <Tags /> -->
        <!-- 内容区 -->
        <Main class="flex-1 h-0 w-full bg-gray-200" />
      </section>
    </section>

  </section>

  <!-- 设置区 -->
  <el-drawer v-model="isSetting" size="300px" title="设置">
    <Settings />
  </el-drawer>

  <!-- 悬浮设置按钮 -->
  <div v-if="isHideHeader" ref="floatBtn" class="fixed right-0 bottom-2/3 z-[200]">
    <el-button type="primary" class="px-3 py-3 rounded-none rounded-tl-sm rounded-bl-sm" @click="openSettings()">
      <svg-icon name="shezhi2" class="text-h6" />
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import Header from './Header/index.vue'
import Tags from './Tags.vue'
import Aside from './Aside/index.vue'
import Main from './Main.vue'
import useLayout from '@p-index/store/layout'
import { storeToRefs } from 'pinia'
import Settings from './Settings.vue'
import useFixedDrag from './useFixedDrag'
import hotkeys from 'hotkeys-js'
import NetworkDetector from '@/components/NetworkDetector/index.vue'

const { isSetting, isHideHeader } = storeToRefs(useLayout())
const { el: floatBtn } = useFixedDrag()

function openSettings() {
  isSetting.value = true
}

hotkeys('s', () => {
  isSetting.value = !isSetting.value
})
</script>

<style scoped>
aside {
  /* FIXME 暂时去除 */
  /* box-shadow: 0 3px 20px theme('colors.gray.200'); */
}
:deep(.el-drawer__body) {
  @apply py-0;
}
</style>
