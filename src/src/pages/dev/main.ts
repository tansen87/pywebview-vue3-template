import '@/main'
import { createApp, } from 'vue'
import App from './App.vue'
import ElementPlus from '@/plugins/element-plus'
import errorReport from '@/plugins/error-report'
import dayjs from '@/plugins/dayjs'
import router from './router'
import './styles/index.css'

const app = createApp(App)

app
  .use(router)
  .use(ElementPlus)
  .use(errorReport)
  .use(dayjs)
  .mount('#app')
