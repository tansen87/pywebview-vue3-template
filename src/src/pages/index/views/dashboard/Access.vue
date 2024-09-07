<template>
  <div ref="el" class="w-full h-[350px] overflow-hidden" />
</template>

<script setup lang="ts">
import useChart from '@/hooks/useChart'
import { EChartsOption } from 'echarts'
import { computed, ref } from 'vue'
import * as api from '@/api/access'
import dayjs from 'dayjs'
import usePrefs from '@/store/preference'
import { storeToRefs } from 'pinia'

const list = ref([])
const options = computed<EChartsOption>(() => ({
  grid: {
    left: 40,
    right: 20,
  },
  backgroundColor: 'transparent',
  xAxis: {
    type: 'category',
    data: list.value.map((o) => dayjs(o.date).format('MM/DD')),
  },
  yAxis: {},
  tooltip: {
    trigger: 'axis',
    formatter: '{b}访问人数：{c}人',
  },
  series: [
    {
      type: 'line',
      data: list.value.map((o) => o.totalCount),
      smooth: 0.6,
      symbol: 'none',
      itemStyle: {
        borderCap: 'round',
        borderJoin: 'round',
      },
      lineStyle: {
        cap: 'round',
        join: 'round',
      },
      areaStyle: {
        color: 'rgba(22, 93, 255, .1)',
      },
    },
  ],
}))
const { darkMode } = storeToRefs(usePrefs())
const { el, loading } = useChart({
  option: options,
  resizeDuration: 300,
  theme: computed(() => darkMode.value ? 'dark' : 'light'),
})

async function load() {
  try {
    loading.value = true
    const data: any = await api.listLatest()
    list.value = data
  } finally {
    loading.value = false
  }
}

load()
</script>
