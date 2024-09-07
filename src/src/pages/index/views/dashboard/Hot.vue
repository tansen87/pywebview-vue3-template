<template>
  <el-carousel>
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <el-image :src="images[index % images.length]" class="rounded-md aspect-video" />
      <div class="mt-2 text-h6 font-semibold">《{{ item.title }}》</div>
      <div class="mt-1">
        <el-tag v-for="tag in item.tags" :key="tag.name" size="small" :color="tag.color" class="mr-1 !text-sm text-white">{{ tag.name }}</el-tag>
      </div>
      <div class="mt-2 text-secondary text-msm">作者：{{ item.author }}</div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import p1 from './assets/1.webp'
import p2 from './assets/2.webp'
import p3 from './assets/3.webp'
import p4 from './assets/4.webp'
import * as api from '@/api/article'
import { ref } from 'vue'

const images = [p1, p2, p3, p4]
const list = ref()

async function load() {
  const data: any = await api.listHot()
  list.value = data
}

load()
</script>
