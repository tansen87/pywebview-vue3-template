<template>
  <div class="mb-10">
    <div class="mb-2 relative text-h5 font-semibold pl-4 text-b-primary">
      <div class="absolute w-[5px] left-0 top-[20%] bottom-[20%] bg-b-primary rounded-md" />
      {{ title }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}
defineProps<Props>()
</script>
