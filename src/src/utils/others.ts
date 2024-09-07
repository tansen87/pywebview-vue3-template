/**
 * 解析文件名
 * @param path 路径
 * @returns
 */
export function parseFilename(path: string) {
  if (!path) return null
  const parts = path.split(/[/\\]/g)
  return parts[parts.length - 1]
}
