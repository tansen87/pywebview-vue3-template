<template>
  <span class="cursor-pointer hover:text-b-primary" @click="copy()"> {{ text }} <svg-icon :inline="icon" /> </span>
</template>

<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import { toRef, watch } from 'vue'
import icon from './icon.svg?raw'
import { ElMessage } from 'element-plus'
import SvgIcon from '@/components/SvgIcon/index.vue'

interface Props {
  text: string
}
const props = defineProps<Props>()

const { copy, copied } = useClipboard({
  source: toRef(props, 'text'),
})

watch(copied, () => {
  if (copied.value) {
    ElMessage.success({
      message: `已复制：${props.text}`,
    })
  }
})
</script>
