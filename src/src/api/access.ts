import service from '@/service'

export function statGlobal() {
  return service({
    url: 'access/stat',
    method: 'get',
  })
}

export function listLatest() {
  return service({
    url: 'access/latest',
    method: 'get',
  })
}

export function listUsers() {
  return service({
    url: 'access/users',
    method: 'get',
  })
}
