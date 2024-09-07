import { parseFilename } from '@/utils/others'

const modules = import.meta.glob('@/icons/svg/*.svg', { eager: true })

function basename(filename: string) {
  return filename.split('.')[0]
}

export default Object.keys(modules).map((path) => basename(parseFilename(path)))
