import * as Mock from 'mockjs'
import type { MockItem } from './types'

const modules = import.meta.glob('./data/**/*.ts', { eager: true })

function setup() {
  Mock.setup({
    timeout: '100 - 500'
  })

  Object.entries(modules).forEach(([path, mod]: [string, any]) => {
    const list: MockItem[] = mod.default
    if (!Array.isArray(list)) {
      return console.warn(`${path}没有导出mock数据！`)
    }
    list.forEach((item) => {
      Mock.mock(item.url, item.type, {
        code: 0,
        data: item.data(Mock.mock),
      })
    })
  })
}

setup()
