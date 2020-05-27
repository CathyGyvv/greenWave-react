import service from '../utils'
import API from '../api'

let loginAPI = {
  getLogin: (params) => {
    return service.post(API.URL_LOGIN, params)
  },
}

export default loginAPI