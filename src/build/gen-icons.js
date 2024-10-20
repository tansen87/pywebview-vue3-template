import { existsSync, mkdirSync, readFileSync, writeFileSync, } from 'fs'
import { downloadSvgs, } from 'iconfont-downloader'
import path from 'path'
import { fileURLToPath, } from 'url'
import prompt from 'prompt'
import rimraf from 'rimraf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const destDir = path.resolve(__dirname, '../src/icons/svg')
const configFilePath = path.resolve(__dirname, '.gen-icons')

if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true, })
}

function readConfig() {
  if (!existsSync(configFilePath)) return null
  const content = readFileSync(configFilePath, { encoding: 'utf-8', })
  const lines = content.split(/\r?\n/g).filter((line) => line && line.trim())
  return lines.reduce((conf, line) => {
    const parts = line.split('=')
    const name = (parts[0] || '').trim()
    const value = (parts[1] || '').trim()
    if (!name || !value) return conf
    conf[name] = value
    return conf
  }, {})
}

(async function() {
  let config = readConfig()
  if (!config) {
    prompt.start()
    config = await prompt.get({
      properties: {
        pid: {
          message: '请输入项目ID',
          required: true,
        },
        token: {
          message: '请输入iconfont token',
          required: true,
        },
      },
    })
  }

  // 先删除原目录
  rimraf.sync(destDir, {})
  mkdirSync(destDir)

  try {
    await downloadSvgs({
      token: config.token,
      pid: config.pid,
      destDir,
      filename: (id) => id.replace(/^icon-(.*)$/g, '$1'),
    })
  } catch (err) {
    console.error(err)
    // 删除配置文件
    rimraf.sync(configFilePath)
    return
  }
  console.log(`生成成功！请在${destDir}中查看结果`)

  // 写入文件
  writeFileSync(
    configFilePath,
    Object.keys(config).reduce((content, name) => `${content}${name}=${config[name]}\n`, ''),
    {
      encoding: 'utf-8',
    }
  )
})()
