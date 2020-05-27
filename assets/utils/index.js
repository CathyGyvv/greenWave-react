import axios from 'axios'
import { message } from 'antd'
import 'antd/lib/message/style'
import { browserHistory } from 'react-router'

// 创建axios实例
const service = axios.create({
  timeout: 300000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    let tokenId = window.sessionStorage.getItem('tokenId')
    if (typeof tokenId == 'undefined') {
      tokenId = ''
    }
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': tokenId
    }
    // console.info('axios拦截', config)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.isError) {
      window.sessionStorage.removeItem('tokenId')
      window.sessionStorage.removeItem('username')
      const currentRoute = browserHistory.getCurrentLocation().pathname
      if (currentRoute == '/app/app-name/login') {
        message.info(response.data.error.message)
      } else {
        message.info(response.data.error.message, 3, () => {
          window.location.href = 'login'
        })
      }
    } else {
      return response
    }
  },
  error => {
    console.log('err1' + error)// for debug
    message.error(error.message, 3)
    return Promise.reject(error)
  })

export default service
