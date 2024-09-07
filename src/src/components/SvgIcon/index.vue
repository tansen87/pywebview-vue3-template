<!-- eslint-disable vue/no-v-html -->
<template>
  <i v-if="name" class="svg-icon inline-block">
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </i>
  <i v-else class="svg-icon inline-block" v-html="inline"></i>
</template>

<script setup lang="ts">
import { computed, } from 'vue'

interface Props {
  name?: string
  inline?: string
}
const props = defineProps<Props>()
const symbolId = computed(() => `#svg-icon/${props.name}`)
</script>

<style lang="postcss" scoped>
.svg-icon {
  /* 为什么往下偏移12.5%？请参考ant-design的图标方案 */
  @apply inline-flex items-center justify-center w-[1em] h-[1em] align-[-0.125em];
  :deep(svg) {
    @apply w-[1em] h-[1em] fill-current;
  }
}
</style>
