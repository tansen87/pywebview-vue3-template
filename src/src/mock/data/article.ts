import * as Mock from 'mockjs'

export default [
  {
    url: '/api/article/hot',
    data: (mock: Mock.MockjsMock) => mock({
      'list|5': [
        {
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          title: '@ctitle',
          createTime: '@date',
          author: '@cname',
          'tags|2-4': [
            {
              name: '@ctitle',
              color: '@color',
            },
          ],
        },
      ],
    }).list,
  },
]
