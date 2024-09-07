import type { MockjsMock } from 'mockjs'

type MockItemDataFn = (mock: MockjsMock) => any

export interface MockItem {
  url: string
  type?: string
  data: MockItemDataFn
}
