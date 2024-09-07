<template>
  <div
    v-for="(item, index) in list"
    :key="index"
    :class="{ 'ml-2': index > 0 }"
    class="
      relative flex items-center flex-1 bg-normal p-3 py-4 rounded-sm transition-all duration-200 cursor-pointer
      hover:bg-b-primary hover:text-white
    ">
    <div class="flex items-center justify-center w-[52px] h-[52px] p-2 rounded-full bg-gray-200">
      <img :src="images[index]" class="w-full h-full" />
    </div>
    <div class="ml-6">
      <div class="text-h3">
        {{ item.value }}
        <span class="text-msm">{{ item.unit }}</span>
      </div>
      <div class="">
        {{ item.name }}
        <span v-if="item.inc != null" class="ml-2 text-sm" :class="{ 'text-green-500': item.inc > 0, 'text-red-500': item.inc < 0 }">
          <svg-icon :name="item.inc > 0 ? 'shang' : 'xia'" />
          {{ item.inc }}%
        </span>
      </div>
    </div>
    <div class="absolute right-4 top-4 cursor-pointer">
      <svg-icon name="gengduo" class="text-h6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as api from '@/api/access'
import { ref } from 'vue'
import p1 from './1.svg'
import p2 from './2.svg'
import p3 from './3.svg'
import p4 from './4.svg'
import SvgIcon from '@/components/SvgIcon/index.vue'

const images = [p1, p2, p3, p4]
const list = ref([])

async function load() {
  const data: any = await api.statGlobal()
  list.value = data
}

load()
</script>
