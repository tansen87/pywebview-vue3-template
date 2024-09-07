import * as Mock from 'mockjs'
import dayjs from 'dayjs'

function getLatestDates(): Date[] {
  const list: Date[] = []
  for (let i = 0;i < 15;i++) {
    list.unshift(dayjs().subtract(i, 'day').toDate())
  }
  return list
}

export default [
  {
    url: '/api/access/stat',
    data: (mock: Mock.MockjsMock) => {
      return mock([
        {
          name: '总访问量',
          value: '@integer(3000, 150000)',
          unit: '人',
          inc: '@float(-30, 30, 2, 2)',
        },
        {
          name: '日均活跃用户',
          value: '@integer(600, 2000)',
          unit: '人',
          inc: '@float(-30, 30, 2, 2)',
        },
        {
          name: '今日打赏总额',
          value: '@integer(100, 10000)',
          unit: '元',
        },
        {
          name: '累计打赏金额',
          value: '@integer(50000, 200000)',
          unit: '元',
        },
      ])
    },
  },
  {
    url: '/api/access/latest',
    data: (mock: Mock.MockjsMock) => {
      // let last = 4000;
      return mock({
        list: getLatestDates().map((date) => {
          // const up = Math.random() < 0.7;
          // const totalCount = last + Math.round(Math.random() * 4000) * (up ? 1 : -1);
          // last = totalCount;
          return {
            date: dayjs(date).format('YYYY-MM-DD'),
            totalCount: '@integer(4000, 8000)',
          }
        }),
      }).list
    },
  },
  {
    url: '/api/access/users',
    data: (mock: Mock.MockjsMock) => mock({
      'list|10-30': [
        {
          name: '@cname',
          date: '@date',
          article: '@ctitle',
          inc: '@float(-100, 100, 2, 2)',
        },
      ],
    }).list,
  },
]
