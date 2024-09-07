<template>
  <div v-if="!isOnline" class="p-2 bg-b-danger-hover text-white text-center text-xs"><svg-icon name="duankai" class="text-h6" /> 网络已断开！请检查网络设置~~</div>
</template>

<script setup lang="ts">
import { useNetwork } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'

interface Props {
  tips?: string
}

defineProps<Props>()

const { isOnline } = useNetwork()
</script>
