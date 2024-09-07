<template>
  <div>
    <div class="flex">
      <Stat />
    </div>

    <div class="md:flex mt-3">
      <div class="md:flex-1 md:w-0">
        <div class="p-3 bg-normal rounded-sm">
          <div class="flex items-center">
            <div class="flex-1 text-h6 font-semibold">访问情况趋势</div>
            <el-radio-group size="small">
              <el-radio-button>2021</el-radio-button>
              <el-radio-button>2022</el-radio-button>
              <el-radio-button>2023</el-radio-button>
            </el-radio-group>
          </div>
          <Access class="mt-4" />
        </div>

        <div class="mt-4 p-3 rounded-sm overflow-hidden bg-normal">
          <div class="text-h6 font-semibold">访问情况详情</div>
          <Users class="mt-2" />
        </div>
      </div>
      <div class="mt-2 md:mt-0 md:ml-3 md:w-[350px]">
        <div v-for="x in 2" :key="x" class="mb-2 p-3 bg-normal rounded-sm">
          <div class="mb-2 flex">
            <div class="flex-1 w-0">最近阅读变现</div>
            <el-select size="small" class="w-[80px]">
              <el-option v-for="year in ['2021', '2022', '2023']" :key="year" :value="year" :label="year"></el-option>
            </el-select>
          </div>
          <div class="text-h5 font-semibold">¥9,999.66</div>
          <div class="mt-1 text-green-500 text-xs"><svg-icon name="shang" class="text-md" /> 环比上升3.2%</div>
        </div>

        <div class="mt-4 p-3 bg-normal rounded-sm">
          <div class="mb-3">热门文章</div>
          <Hot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Access from './Access.vue'
import Users from './Users.vue'
import Hot from './Hot.vue'
import Stat from './Stat/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>
