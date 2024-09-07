<template>
  <ElTooltip
    :disabled="!isAsideCollapse || depth > 0"
    :content="item.name"
    :placement="hasChild ? 'top' : 'right'"
    :enterable="false">
    <template v-if="hasChild">
      <ElSubMenu :index="item.path">
        <template #title>
          <MenuContent :icon="item.icon" :title="item.name" />
        </template>
        <MenuItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :depth="depth + 1"
          @click="(...args: any[]) => emit('click', ...args)" />
      </ElSubMenu>
    </template>
    <template v-else>
      <ElMenuItem :index="item.path" @click="click">
        <MenuContent :icon="item.icon" :title="item.name" />
      </ElMenuItem>
    </template>
  </ElTooltip>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import MenuContent from './MenuContent.vue'
import useLayout from '@p-index/store/layout'
import { computed } from 'vue'

interface Item {
  path: string
  name: string
  icon: string
  children?: Item[]
}
interface Props {
  item: Item
  depth?: number
}
const props = withDefaults(defineProps<Props>(), {
  depth: 0
})
const emit = defineEmits(['click'])
const { isAsideCollapse } = storeToRefs(useLayout())
const hasChild = computed(() => props.item.children && props.item.children.length)

function click() {
  emit('click', props.item)
}
</script>
