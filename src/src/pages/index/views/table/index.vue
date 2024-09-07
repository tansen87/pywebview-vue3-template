<template>
  <!-- <div class="text-right">
    <ElLink type="primary" @click="load()">刷新</ElLink>
  </div> -->

  <div>
    <div class="title">自由</div>
    <div class="mt-2">
      <Table :data="data" max-height="500">
        <ElTableColumn label="序号" type="index" align="center" width="100"></ElTableColumn>
        <ElTableColumn label="简介" prop="name">
          <template #default="{ row }">
            我叫{{ row.name }}，今年{{ row.age }}岁，家住{{ row.province }}{{ row.city }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="个人简介" prop="desc" show-overflow-tooltip />
      </Table>
    </div>
  </div>

  <div class="mt-4">
    <div class="title">配置化</div>
    <div class="mt-2">
      <Table :data="data" :columns="columns" max-height="500" />
    </div>
  </div>

  <div class="mt-4">
    <div class="title">默认空</div>
    <div class="mt-2">
      <Table :data="[]" :columns="columns" max-height="500" />
    </div>
  </div>

  <div class="mt-4">
    <div class="title">自定义空</div>
    <div class="mt-2">
      <Table :data="[]" :columns="columns" max-height="500">
        <template #empty>没有数据哦~</template>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Table, { Column, } from '@/components/Table/index.vue'
import useLoad from '@/hooks/useLoad'
import * as api from '@/api/user'

interface Person {
  name?: string
  age?: number
  desc?: string
  province?: string
  city?: string
  gender?: boolean
}

const { result: data, } = useLoad(() => api.list(), {
  autoLoad: true,
  initialResult: [],
})

const columns: Column<Person>[] = [{
  type: 'selection',
  fixed: true,
}, {
  label: '序号',
  type: 'index',
  width: 100,
  align: 'center',
}, {
  label: '姓名',
  prop: 'name',
}, {
  label: '年龄',
  prop: 'age',
  sortable: true,
  formatter: (row, column, cellValue) => `${cellValue}岁`,
}, {
  label: '性别',
  prop: 'gender',
  render: ({ row, }) => row.gender ? '男' : '女',
  filters: [
    { text: '男', value: 'true', },
    { text: '女', value: 'false', }
  ],
  filterMethod: (value, row: any) => value === String(row.gender),
  filterMultiple: false,
}, {
  label: '家庭地址',
  align: 'center',
  children: [{
    label: '省份',
    prop: 'province',
    align: 'center',
    resizable: true,
  }, {
    label: '城市',
    prop: 'city',
    align: 'center',
    resizable: true,
  }],
}, {
  label: '个人简介',
  prop: 'desc',
  showOverflowTooltip: true,
}]


</script>

<style lang="postcss" scoped>
.title {
  @apply text-h6 text-secondary;
  &::before {
    content: "";
  }
}
</style>
