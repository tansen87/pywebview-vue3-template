<template>
  <svg-icon v-if="icon" :name="icon" class="text-h5" :class="{ 'text-h4': isAsideCollapse }" />
  <span class="ml-2">
    {{ title }}
  </span>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useLayout from '@p-index/store/layout'
import SvgIcon from '@/components/SvgIcon/index.vue'

interface Props {
  icon?: string
  title: string
}
defineProps<Props>()

const { isAsideCollapse } = storeToRefs(useLayout())
</script>

<style scoped>
.svg-icon {
  :deep(svg) {
    @apply transition-all duration-150;
  }
}
</style>
