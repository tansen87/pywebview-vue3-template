import { MaybeRef, toReactive } from '@vueuse/core'
import { Ref, ref } from 'vue'

export type LoadFn<Q, R> = (query: Q) => Promise<R>

export interface UseLoadOptions<Q, R> {
  initialQuery?: MaybeRef<Q>
  initialResult?: R
  /**自动加载 */
  autoLoad?: boolean
}

export interface UseLoadReturn<Q, R> {
  query: Q
  result: Ref<R>
  loading: Ref<boolean>
  load: (disableLoading?: boolean) => Promise<void>
}

/**
 * 通用加载hooks，特性：
 * - 查询参数与加载数据
 * - 不限定加载源
 * @param fn 
 * @param options 
 * @returns 
 */
export default function<Q extends object = object, R = unknown>(
  fn: LoadFn<Q, R>,
  options: UseLoadOptions<Q, R> = {}
): UseLoadReturn<Q, R> {
  const opts = options
  const query = toReactive(opts.initialQuery || {} as Q)
  const result = ref(opts.initialResult) as Ref<R>
  const loading = ref(false)

  function load(disableLoading = false) {
    return new Promise<void>(async(resolve, reject) => {
      try {
        // eslint-disable-next-line no-promise-executor-return
        if (!fn) return reject()
        if (!disableLoading) {
          loading.value = true
        }
        result.value = await fn(query)

        resolve()
      } catch (err) {
        reject(err)
      } finally {
        loading.value = false
      }
    })
  }

  if (opts.autoLoad) {
    load()
  }

  return {
    query,
    result,
    loading,
    load,
  }
}
