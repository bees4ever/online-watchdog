import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-watcher',
      component: require('@/components/MainWatcher').default
    },
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/outages',
      name: 'outages-page',
      component: require('@/components/Outages').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
