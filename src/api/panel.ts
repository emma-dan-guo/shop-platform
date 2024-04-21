import request from './request'

class PanelAPI {
  static PREFIX = '/data'
  static async statistic(params) {
    const res = await request.post(`${PanelAPI.PREFIX}/statistic`, params)
    return res.data
  }
}

export default PanelAPI
