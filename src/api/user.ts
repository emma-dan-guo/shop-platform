import request from './request'

class UserAPI {
  static PREFIX = '/user'
  static async login(username: string, password: string) {
    const res = await request.post(`${UserAPI.PREFIX}/login`, {
      username,
      password
    })
    return res.data
  }
  static async register(username: string, password: string) {
    const res = await request.post(`${UserAPI.PREFIX}/register`, {
      username,
      password
    })
    return res.data
  }
  static async check(username: string, userId: string) {
    const res = await request.post(`${UserAPI.PREFIX}/status`, {
      username,
      userId
    })
    return res.data
  }
}

export default UserAPI
