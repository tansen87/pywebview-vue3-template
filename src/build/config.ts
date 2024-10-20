import path from 'path'
import { readdirSync, } from 'fs'


export interface Page {
  name: string
  path?: string // 如'pages/dev'
  template?: string
}
export type Chunks = Record<string, string[]>
export interface CdnItem {
  /** 包名，如lodash */
  name: string
  /** 全局变量名，如lodash对应"_" */
  global: string
  /** 链接 */
  url: string
}

export interface Config {
  /** 根目录 */
  rootDir: string
  /** 单页集合 */
  pages: Page[]
  /** 在多页场景下，是否重写路径 */
  multiPageRewrite: boolean
  /** 是否压缩gzip包 */
  gzip: boolean
  /** 打包分包 */
  chunks: Chunks
  /** CDN配置 */
  cdns: CdnItem[]
  /** 是否开启图片压缩 */
  imageCompression: boolean
}


function readPages(srcDir: string): Page[] {
  const pagesDir = path.resolve(srcDir, 'pages')
  let pages: Page[] = readdirSync(pagesDir, { withFileTypes: true, })
    .filter((o) => o.isDirectory() && !/^[._]/.test(o.name))
    .map((o) => ({ name: o.name, path: path.join('pages', o.name), }))
  if (!pages.length) {
    pages = [
      {
        name: 'index',
        path: '',
      },
    ]
  }

  return pages
}

const ROOT_DIR = path.resolve(__dirname, '..')

const PAGES = readPages(path.resolve(ROOT_DIR, 'src'))

export default {
  rootDir: ROOT_DIR,
  pages: PAGES,
  // 修改此配置，单页下的router base也要相应修改！！
  multiPageRewrite: false,
  gzip: true,
  chunks: {
  },
  cdns: [
    {
      name: 'vue',
      global: 'Vue',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.37/vue.global.min.js',
    },
    {
      name: 'vue-router',
      global: 'VueRouter',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.4.3/vue-router.global.min.js',
    },
    {
      name: 'vue-demi',
      global: 'VueDemi',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vue-demi/0.14.10/index.iife.min.js',
    },
    {
      name: 'pinia',
      global: 'Pinia',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.2.1/pinia.iife.prod.min.js',
    },
    {
      name: 'lodash',
      global: '_',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js',
    },
    {
      name: 'element-plus',
      global: 'ElementPlus',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/element-plus/2.8.0/index.full.min.js',
    },
    {
      name: 'echarts',
      global: 'echarts',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js',
    },
    {
      name: 'axios',
      global: 'axios',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.3/axios.min.js',
    },
    {
      name: 'mockjs',
      global: 'Mock',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/Mock.js/1.0.0/mock-min.js',
    }
  ],
  imageCompression: true,
} as Config
