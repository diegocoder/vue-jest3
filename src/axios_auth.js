import axios from 'axios'

const http = axios.create()



let AxiosAuthPlugin = {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: http })
  }
}

export { http, AxiosAuthPlugin }
