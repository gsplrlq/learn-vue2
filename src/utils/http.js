import axios from 'axios'
import store from '../store/index.js'
import components from '../register.js'
const Message = components.Message
const service = axios.create({
  baseURL: '/api/learn-platform-service',
  timeout: 10000,
  withCredentials: true
})

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers.token = store.getters.userInfo.token || ''
    // config.headers.Accept = "application/json, text/plain, */*"
    // config.headers['Content-Type'] = "application/json"
    // config.headers['X-Requested-With'] = "XMLHttpRequest"
    config.headers['Content-Type'] = 'application/json'; // 设置请求的Content-Type
    config.headers['Access-Control-Allow-Origin'] = '*'; // 允许任何源的跨域请求
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'; // 允许的方法
    config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'; // 允许的头
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
service.interceptors.response.use(
  response => {
    let {status, data} = response
    if (status === 401) {
      store.commit('login/SET_SHOW_LOGIN', true)
      store.dispatch('login/logout')
      return Promise.resolve({
        code: -1,
        msg: data.msg
      })
    } else if (status !== 200) {
      Message.error('网络异常，请刷新或者重试!')
      return Promise.reject('网络异常')
    }

    
    if (data.code === 401) {
      store.commit('login/SET_SHOW_LOGIN', true)
      store.dispatch('login/logout')
      return Promise.resolve({
        code: -1,
        msg: data.msg
      })
    } else if (data.code !== 200) {
      Message.error(data.msg)
      return Promise.reject(data.msg)
    } else {
      return Promise.resolve(data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service