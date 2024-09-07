import service from '@/service'

export function listHot() {
  return service({
    url: 'article/hot',
    method: 'get',
  })
}
