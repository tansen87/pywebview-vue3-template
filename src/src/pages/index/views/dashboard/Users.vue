<template>
  <el-table :data="list" size="medium" max-height="450">
    <!-- <el-table-column label="序号" type="index" width="50px" /> -->
    <el-table-column label="用户" prop="name" />
    <el-table-column label="阅读文章" prop="article">
      <template #default="{ row }"> 《{{ row.article }}》 </template>
    </el-table-column>
    <el-table-column label="访问日期" prop="date" align="center" />
    <el-table-column label="本月阅读时长增长" align="center">
      <template #default="{ row }">
        <span class="text-msm" :class="{ 'text-green-500': row.inc > 0, 'text-red-500': row.inc < 0 }">
          <svg-icon :name="row.inc > 0 ? 'shang' : 'xia'" class="text-sm" />
          {{ row.inc }}
        </span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="{}">
        <el-tooltip content="查看">
          <svg-icon name="chakan" class="table-button text-b-primary hover:text-b-primary-hover" />
        </el-tooltip>
        <el-tooltip content="编辑">
          <svg-icon name="bianji" class="table-button text-b-success hover:text-b-success-hover" />
        </el-tooltip>
        <el-tooltip content="删除">
          <svg-icon name="shanchu" class="table-button text-b-danger hover:text-b-danger-hover" />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import * as api from '@/api/access'
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const list = ref([])

async function load() {
  const users: any = await api.listUsers()
  list.value = users
  console.log(users)
}

load()
</script>

<style scoped>
.table-button {
  @apply mr-2 text-h5 cursor-pointer;
}
</style>
