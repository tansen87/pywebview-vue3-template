<template>
  <div class="flex items-center">
    <el-dropdown
      v-for="(item, index) in pages"
      :key="item"
      trigger="contextmenu"
      placement="bottom-start"
      :show-timeout="0"
      class="
        block w-[80px] px-1 py-3 border-r border-r-gray-200 cursor-pointer
        truncate text-center
        hover:bg-gray-100
      "
      :class="{ 'bg-gray-100': index === 0 }">
      <div>{{ item }}</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>关闭</el-dropdown-item>
          <el-dropdown-item>关闭其他</el-dropdown-item>
          <el-dropdown-item>关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
const pages = [
  '控制台',
  '图标',
  '日期时间',
]
</script>

<style scoped lang="postcss">
</style>
