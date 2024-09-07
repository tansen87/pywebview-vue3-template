import * as Mock from 'mockjs'
import { MockItem } from '../types'

export default [
  {
    url: '/api/users',
    data: (mock: Mock.MockjsMock) => mock({
      'list|1-100': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          name: '@cname',
          age: '@integer(0, 140)',
          gender: '@boolean',
          province: '@province',
          city: '@city',
          desc: '@cparagraph(1, 5)',
        },
      ],
    }).list,
  }
] as MockItem[]
