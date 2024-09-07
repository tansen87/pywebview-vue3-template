<template>
  <div @click="copy">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { toRef, watch } from 'vue'

interface Props {
  text: string
}

const props = defineProps<Props>()

const { copy: doCopy, copied } = useClipboard({
  source: toRef(props, 'text'),
})

function copy() {
  doCopy()
}

watch(copied, () => {
  if (!copied.value) return
  ElMessage.success(`已复制：${props.text}`)
})
</script>
