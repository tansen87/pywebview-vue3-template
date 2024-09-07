// 全量引入
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import type { App } from 'vue'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

export default function(app: App) {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
