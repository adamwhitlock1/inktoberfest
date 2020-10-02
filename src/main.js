import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import paper from 'paper'

Vue.config.productionTip = false
Vue.prototype.$paper = paper

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
