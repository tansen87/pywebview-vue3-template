<template>
  <ElTooltip
    :content="text"
    :disabled="!isAsideCollapse"
    placement="right">
    <div
      class="p-2 text-center text-secondary text-xs border-t border-t-gray-200"
      :class="{ 'cursor-pointer': isAsideCollapse, 'border-t-gray-800': asideTheme.dark }">
      <SvgIcon name="linggan" class="text-sm" />
      <span v-if="!isAsideCollapse" class="ml-1">{{ text }}</span>
    </div>
  </ElTooltip>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import useLayout from '@p-index/store/layout'
import { storeToRefs } from 'pinia'

const { isAsideCollapse, asideTheme } = storeToRefs(useLayout())
const text = '作者'

</script>
