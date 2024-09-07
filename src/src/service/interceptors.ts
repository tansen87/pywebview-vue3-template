import { AxiosInstance, } from 'axios'

type MaybePromise<T> = T | Promise<T>
type RemoveInterceptorFn = () => void

interface GeneralResult<T> {
  success: boolean
  message?: string
  data?: T
}

interface ResponeDataOptions<T> {
  /** 转换为通用结果对象 */
  toGeneralResult: (data: any) => MaybePromise<GeneralResult<T>>
  /** 错误回调 */
  onError?: (error: Error) => MaybePromise<void>
}

/**
 * 添加响应基础拦截器：
 * 解开响应体内容，返回真正的内容数据；并在错误时，进入错误处理分支
 * 
 * @param instance 
 * @param options 
 * 
 * @returns 卸载方法
 */
export function addResponseBaseInterceptor<T>(instance: AxiosInstance, options: ResponeDataOptions<T>): RemoveInterceptorFn {
  if (!instance) throw new Error()
  const { toGeneralResult, onError, } = options ?? {}

  const id1 = instance.interceptors.response.use(
    async(response) => {
      const result = await toGeneralResult(response.data)
      const { success, data, message, } = result
      if (success) return data
      const error = new Error(message, { cause: response.data, })
      return Promise.reject(error)
    },
    error => {
      return Promise.reject(error)
    }
  )

  const id2 = instance.interceptors.response.use(
    data => data,
    async(error) => {
      if (onError) {
        await onError(error)
      }
      return Promise.reject(error)
    }
  )

  return () => {
    instance.interceptors.response.eject(id1)
    instance.interceptors.response.eject(id2)
  }
}
