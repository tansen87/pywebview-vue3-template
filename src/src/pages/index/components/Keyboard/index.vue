<template>
  <span class="keyboard px-2 inline-block text-secondary text-xs bg-normal border border-gray-200 rounded-sm">
    <span class="inline-block scale-75">
      {{ text }}
    </span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string
}
defineProps<Props>()
</script>

<style scoped>
.keyboard {
  box-shadow: 0 1px 0 1px theme('colors.gray.200');
}
</style>
