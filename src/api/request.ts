import { message } from 'antd'
import axios from 'axios'
import Config from 'common/config'
import { IRes } from 'common/interface'

const request = axios.create({
  baseURL: Config.API_URI,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

request.interceptors.response.use((response) => {
  const res: IRes<Record<string, any>> = response.data
  if (res.result !== 1) {
    message.warn(res.msg)
  }
  return response.data
})

export default request
