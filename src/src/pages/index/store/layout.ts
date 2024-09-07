import { useLocalStorage, useWindowSize } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

function usePreference() {
  const { width: windowWidth } = useWindowSize()
  const isAsideCollapse = useLocalStorage('isAsideCollapse', false)
  // 菜单折叠器的位置
  const asideCollapseTogglePlace = useLocalStorage('asideCollapseTogglePlace', 'aside')
  // 菜单栏宽度
  const asideWidth = useLocalStorage('asideWidth', 180)
  // 顶部栏显示
  const isHideHeader = useLocalStorage('isHideHeader', false)
  // 是否处于设置状态
  const isSetting = ref(false)
  // 侧边栏主题配置
  const asideTheme = useLocalStorage('asideTheme', {
    dark: false,
  })

  // 自动折叠
  watch(windowWidth, () => {
    isAsideCollapse.value = windowWidth.value <= 768
  })

  return {
    isAsideCollapse,
    asideCollapseTogglePlace,
    asideWidth,
    isHideHeader,
    isSetting,
    asideTheme,
  }
}

export default defineStore('layout', () => {
  const prefs = usePreference()

  return {
    ...prefs,
  }
})
