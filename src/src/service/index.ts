import axios from 'axios'
import { addResponseBaseInterceptor, } from './interceptors'

interface Result {
  code: number
  msg: string
  data: any
}

const instance = axios.create({
  baseURL: import.meta.env.APP_API_PREFIX,
  timeout: 60 * 1000,
})

function isBlob(data: any) {
  return typeof data === 'object' && Object.prototype.toString.call(data) === '[object Blob]'
}

function showErrorMessage(message: string): void {
  console.error(message)
}

instance.interceptors.request.use((config) => {
  // 根据需要，携带一些应用级的公共信息到服务端，避免在URL或请求体中反复携带
  if (config.headers) {
  }
  return config
})


addResponseBaseInterceptor(instance, {
  toGeneralResult: async(data: Result) => {
    if (typeof data === 'object' && 'code' in data) {
      return {
        success: data.code === 0,
        data: data.data,
        message: data.msg,
      }
    }
    if (isBlob(data)) {
      return {
        success: true,
        data: {
          blob: data,
          filename: null, // TODO 解析文件名
        },
      }
    }
    return {
      success: true,
      data: data,
    }
  },
  onError: error => showErrorMessage(error.message),
})

export default instance
