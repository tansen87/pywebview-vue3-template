import history from 'connect-history-api-fallback'
import { PluginOption, } from 'vite'

interface Rewrite {
  from: RegExp
  to: any
}

interface Options {
  rewrites?: Rewrite[]
}

export default function(options: Options = {}): PluginOption {
  return {
    name: 'vite-plugin-multi-page-path-rewrite-plugin',
    configureServer(server) {
      server.middlewares.use(history({
        rewrites: options.rewrites,
        // disableDotRule: true,
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        verbose: true,
        logger: () => {
          // 
        },
      }))
    },
  }
}
