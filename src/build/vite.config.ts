import { defineConfig, } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin, } from 'vite-plugin-svg-icons'
import config from './config'
import DefineOptions from 'unplugin-vue-define-options/vite'
import jsx from '@vitejs/plugin-vue-jsx'
import multiPageRewritePlugin from './multi-page-rewrite-plugin'
// import legacy from '@vitejs/plugin-legacy'
import compression from 'vite-plugin-compression'
import { visualizer, } from 'rollup-plugin-visualizer'
import cdn from 'vite-plugin-cdn-import'
import imagemin from 'vite-plugin-imagemin'

const useCdn = config.cdns.length > 0

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, }) => {
  const isDevCommand = command === 'serve'
  const isBuildCommand = command === 'build'
  const isAnalyseMode = mode === 'analyse'
  return {
    // 开发相关
    envPrefix: 'APP_',
    resolve: {
      alias: config.pages.reduce(
        (map, o) => {
          map[`@p-${o.name}`] = path.resolve(config.rootDir, `src/pages/${o.name}`)
          return map
        },
        {
          '@': path.resolve(config.rootDir, 'src'),
        }
      ),
    },
    logLevel: isDevCommand || isAnalyseMode ? 'info' : 'error',
    css: {
      preprocessorMaxWorkers: 8,
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api/': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    plugins: [
      // 多页应用路径重写（注：index单页不需要重写）
      config.multiPageRewrite && multiPageRewritePlugin({
        rewrites: config.pages.filter(o => o.name !== 'index').map(o => ({
          from: new RegExp(`^\\/mpa\\/${o.name}`),
          to: `/${o.name}.html`,
        })),
      }),
      vue(),
      jsx(),
      // legacy({
      //   // 根据情况设置自己的浏览器版本，或在根目录下新建.browserslistrc文件设置
      //   // 为了让其他插件共享配置，更推荐配置文件的方式
      //   // targets: ['chrome>=96'],
      // }),
      // SVG雪碧图
      createSvgIconsPlugin({
        iconDirs: [path.resolve(config.rootDir, 'src/icons/svg')],
        symbolId: 'svg-icon/[name]',
      }),
      // vue defineXXX支持
      DefineOptions(),
      // gzip压缩，保证运行时性能
      isBuildCommand && config.gzip && compression({
        algorithm: 'gzip',
      }),
      // CDN
      isBuildCommand && useCdn && cdn({
        modules: config.cdns.map(o => ({
          name: o.name,
          var: o.global,
          path: o.url,
        })),
      }),
      // 图片压缩
      config.imageCompression && isBuildCommand && imagemin({
        mozjpeg: {
          quality: 10,
        },
        pngquant: {
          quality: [0.5, 0.5],
        },
      }),

      // 打包后分析依赖图
      isAnalyseMode && visualizer({
        sourcemap: true,
      }),
    ],
    build: {
      rollupOptions: {
        // 多页支持
        input: config.pages.reduce((map, { name, }) => {
          map[name] = path.resolve(config.rootDir, `${name}.html`)
          return map
        }, {}),
        output: {
          manualChunks(id) {
            for (const [name, packages] of Object.entries(config.chunks)) {
              const pass = packages.some(packageName => id.includes(`node_modules/${packageName}\/`))
              if (pass) return name
            }
            if (id.includes('node_modules')) return 'vendor'
          },
        },
      },
      minify: 'esbuild',
      sourcemap: isAnalyseMode,
      reportCompressedSize: false,
    },
  }
})
