import Vue from 'vue'
import axios from 'axios'
// import moment from 'momentjs'
import App from './App'
import router from './router'
import store from './store'

import vuetify from 'vuetify'

Vue.use(vuetify)
Vue.use(require('vue-moment'))

// import vuetify from '@/plugins/vuetify' // path to vuetify export

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
