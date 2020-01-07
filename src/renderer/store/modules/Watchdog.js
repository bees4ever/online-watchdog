
const state = {
  watchshift: 0,
  onlineOutages: [],
  currentOutage: -1,
  watchdogOnline: true // the dig is very silent
}

const mutations = {
  INCREMENT_SHIFT_COUNTER (state) {
    state.watchshift++
  },
  INCREMENT_CURRENT_OUTAGE (state) {
    state.currentOutage++
  },
  INIT_NEW_OUTAGES (state) {
    state.onlineOutages.push({ start: new Date(), end: null })
  },
  STOP_CURR_OUTAGES (state) {
    state.onlineOutages[state.currentOutage]['end'] = new Date()
  },
  SET_ONLINE (state, payload) {
    state.watchdogOnline = payload
  }
}

const actions = {
  initAndStartWatchDog ({dispatch}) {
    setInterval(() => dispatch('runWatchDog'), 1000)
  },
  runWatchDog ({ state, commit, dispatch}) {
    commit('INCREMENT_SHIFT_COUNTER')

    console.log(window.navigator.onLine, state.watchdogOnline)
    
    console.log(state.onlineOutages)
    if (!window.navigator.onLine && state.watchdogOnline) dispatch('startNewOutage') // first appearance of offline state
    else if (window.navigator.onLine && !state.watchdogOnline) dispatch('finishCurrentOutage') // first appearance of online state
    
    commit('SET_ONLINE', window.navigator.onLine)
  },
  startNewOutage ({commit}) {
    commit('INCREMENT_CURRENT_OUTAGE')
    commit('INIT_NEW_OUTAGES')
  },

  finishCurrentOutage ({commit}) {
    commit('STOP_CURR_OUTAGES')
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
