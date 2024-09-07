import { MaybeRef, useResizeObserver, useThrottleFn } from '@vueuse/core'
import * as echarts from 'echarts'
import { Ref, ShallowRef, onUnmounted, ref, shallowRef, watch } from 'vue'
import { merge } from 'lodash'

export interface UseChartOptions {
  el?: MaybeRef<HTMLElement>
  loading?: MaybeRef<boolean>
  option?: Ref<echarts.EChartsOption>
  theme?: MaybeRef<string>
  resizeDuration?: number
  loadingOptions?: object
}

export interface UseChartReturn {
  el: Ref<HTMLElement>
  loading: Ref<boolean>
  instance: ShallowRef<echarts.EChartsType>
  option: Ref<echarts.EChartsOption>
  theme: Ref<string>
}

const DEFAULT_OPTIONS: UseChartOptions = {
  resizeDuration: 0,
  loadingOptions: {
    text: '加载中..',
    spinnerRadius: 10,
    lineWidth: 2,
    textColor: '#333'
  }
}

/**
 * 基础图表hooks，支持以下功能：
 * 1. 根据配置自动渲染图表，组件销毁时自动销毁图表实例
 * 2. 加载状态
 * 3. 当容器大小发生变化时，自动重绘图表
 * 4. 当配置项发生变化时，自动重绘图表
 * 5. 动态换肤
 * @param options 
 * @returns 
 */
export default function(options: UseChartOptions = {}): UseChartReturn {
  const opts = merge({}, DEFAULT_OPTIONS, options)
  const el = ref(opts.el)
  const instance = shallowRef<echarts.EChartsType>()
  const loading = ref(opts.loading || false)
  const option = ref(opts.option)
  const theme = ref(opts.theme)

  function init() {
    if (!el.value) return
    instance.value = echarts.init(el.value, theme.value)
  }

  function destroy() {
    if (!instance.value) return
    if (instance.value.isDisposed()) return
    instance.value.dispose()
    instance.value = null
  }

  function resize() {
    if (!instance.value) return
    instance.value.resize({
      animation: {
        duration: opts.resizeDuration,
      }
    })
  }

  function render() {
    if (!instance.value || !option.value) return
    instance.value.setOption(option.value, {
      notMerge: true,
      lazyUpdate: true,
    })
  }


  function updateLoading() {
    if (!instance.value) return
    if (loading.value) {
      instance.value.showLoading('default', opts.loadingOptions)
    } else {
      instance.value.hideLoading()
    }
  }

  watch(el, init, { immediate: true })
  // FIXME watch el el变为空，也需要销毁
  onUnmounted(destroy)

  useResizeObserver(el, useThrottleFn(resize, 500))

  watch([instance, option], render, { deep: true })
  watch([instance, loading], updateLoading)
  watch(theme, () => {
    // FIXME 注：echarts暂不支持动态换肤，需要先销毁实例重新初始化
    // 详情请见：https://github.com/apache/echarts/issues/4607
    destroy()
    init()
  })

  return {
    el,
    loading,
    instance,
    option,
    theme,
  }
}
