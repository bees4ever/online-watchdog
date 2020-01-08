
import Vue from 'vue'
import axios from 'axios'
// import moment from 'momentjs'
import App from './App'
import router from './router'
import store from './store'

import vuetify from 'vuetify'

Vue.use(vuetify)

/* import VApp from 'vuetify/es5/components/VApp'
import VBtn from 'vuetify/es5/components/VBtn'
import VFooter from 'vuetify/es5/components/VFooter'
import VGrid from 'vuetify/es5/components/VGrid'
import VIcon from 'vuetify/es5/components/VIcon'
import VList from 'vuetify/es5/components/VList'
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer'
import VToolbar from 'vuetify/es5/components/VToolbar'
import Vuetify from 'vuetify/es5/components/Vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#008940',
    accent: '#0279D7',
    secondary: '#9F9F9F',
    info: '#0279D7',
    warning: '#B71C1C',
    error: '#B71C1C',
    success: '#4CAf50'
  },
  customProperties: true,
  iconfont: 'md'
}) */


Vue.use(require('vue-moment'))
// Using relative import with node_modules works

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
