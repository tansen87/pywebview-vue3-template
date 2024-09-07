import service from '@/service'
import Cookies from 'js-cookie'

export function list() {
  return service.get<any, unknown[]>('users')
}

interface LoginData {
  username: string
  password: string
}
export async function login(data: LoginData) {
  Cookies.set('session-user', JSON.stringify(data))
  await new Promise(resolve => {
    setTimeout(resolve, 500)
  })
  return data
}

/**
 * 获取当前登录用户
 * @returns 
 */
export function getCurrent() {
  const user = Cookies.get('session-user')
  return user ? JSON.parse(user) : null
}
