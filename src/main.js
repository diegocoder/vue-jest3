import Vue from 'vue'
import App from './App.vue'
import { AxiosAuthPlugin } from './axios_auth'

Vue.config.productionTip = false
Vue.use(AxiosAuthPlugin)

new Vue({
  el: '#app',
  render: h => h(App)
})
