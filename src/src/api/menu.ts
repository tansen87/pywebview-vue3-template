import service from '@/service'

export function list() {
  return service({
    url: 'menus',
    method: 'get',
  })
}
