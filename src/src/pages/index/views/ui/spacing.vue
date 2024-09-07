<template>
  <div class="flex">
    <div v-for="(cls, index) in list" :key="cls" class="mb-1 flex items-stretch cursor-pointer transition-all duration-200" :class="{ [`${cls}`]: cls === curr }" @click="check(index)">
      <div class="mr-[1px] p-2 w-[60px] h-[40px] bg-blue-600 hover:bg-blue-500 box-border text-center text-white">
        {{ index }}
      </div>
    </div>
  </div>
  <!-- <div
    v-for="cls in list"
    :key="cls"
    class="mb-1 flex items-stretch">
    <div class="w-1 bg-b-primary" />
    <div class="p-2 w-[120px] h-[40px] bg-blue-100 box-border" :class="cls">
      <Copy :text="cls" />
    </div>
  </div> -->
  <el-alert :closable="false" title="注：" class="mt-2">
    <div>1. 所有间距以4px的倍数递进，最大支持20倍。</div>
    <div>2. 间距可用于外边距、内边距、宽度、高度等场景。</div>
  </el-alert>
</template>

<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'

const list = ['ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5', 'ml-6', 'ml-7', 'ml-8', 'ml-9', 'ml-10', 'ml-11', 'ml-12', 'ml-13', 'ml-14', 'ml-15']
const currIndex = ref<number | null>(0)
const curr = computed(() => (currIndex.value == null ? null : list[currIndex.value]))

const { pause } = useIntervalFn(() => {
  const next = currIndex.value == null ? 0 : currIndex.value + 1
  currIndex.value = next >= list.length ? 0 : next
}, 500)

function check(index: number) {
  pause()
  currIndex.value = currIndex.value === index ? null : index
}
</script>
