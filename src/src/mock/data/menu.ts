const menus: any[] = [
  {
    name: '控制台',
    icon: 'yibiaopan2',
    path: '/',
  },
  {
    path: '/icon',
    icon: 'tubiao',
    name: '图标',
  },
  {
    path: '/datetime',
    icon: 'riqishijian',
    name: '日期时间',
  },
  {
    path: '/ui',
    icon: 'sheji',
    name: 'UI规范'
  },
  {
    path: '/table',
    icon: 'biaoge',
    name: '配置化表格',
  },
  {
    name: '错误页',
    icon: 'xiayu',
    children: [
      {
        path: '/404',
        name: '404',
      },
    ],
  },
  {
    name: '外部链接',
    icon: 'github',
    path: 'https://github.com/tansen87/pywebview-vue3-template',
  },
]

export default [
  {
    url: '/api/menus',
    data: () => menus,
  },
]
