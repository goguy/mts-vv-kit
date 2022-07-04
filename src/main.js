import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'

// cookie
import VueCookies from "vue-cookies"

// js
import token from '@/js/auth/token.js'

// styles
import "@/assets/styles/mts.scss"

Vue.use(VueCookies)

Vue.config.productionTip = false

/** global variable in Vue app **/
Vue.prototype.$token = token;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
