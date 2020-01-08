import { remote } from 'electron'
const state = {
  dogId: -1,
  watchshift: 0,
  onlineOutages: [],
  currentOutage: -1,
  watchdogOnline: true, // the dog is very silent
  unreadMessageNums: [],
  bouncerID: -1
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
    state.unreadMessageNums.push(state.currentOutage)
  },
  STOP_CURR_OUTAGES (state) {
    state.onlineOutages[state.currentOutage]['end'] = new Date()
  },
  SET_ONLINE (state, payload) {
    state.watchdogOnline = payload
  },
  RESET_OUTAGES (state) {
    state.onlineOutages = []
    state.currentOutage = -1
    state.unreadMessageNums = []
  },
  READ_A_MESSAGE (state, payload) {
    var pos = state.unreadMessageNums.indexOf(payload)
    if (pos > -1) state.unreadMessageNums.splice(pos, 1)
  },
  SET_BOUNDERID (state, payload) {
    state.bouncerID = payload
  },
  WAKEUP_DOG (state, payload) {
    state.dogId = payload
  }
}

const actions = {
  readMessage ({ commit, dispatch }, payload) {
    commit('READ_A_MESSAGE', payload)
    dispatch('labelDocksKennel')
  },
  cleanOutages ({commit}) {
    commit('RESET_OUTAGES')
  },
  initAndStartWatchDog ({dispatch, commit, state}) {
    clearInterval(state.dogId)
    var intID = setInterval(() => dispatch('runWatchDog'), 1000)
    commit('WAKEUP_DOG', intID)
  },
  letDogBark ({state, commit}) {
    var bouncerID = setInterval(() => remote.app.dock.bounce('informational'), 2000)
    commit('SET_BOUNDERID', bouncerID)
    remote.app.dock.setBadge('offline')
  },
  letDogSleep ({ state, dispatch }) {
    clearInterval(state.bouncerID)
    dispatch('labelDocksKennel')
  },
  labelDocksKennel ({state}) {
    if (state.unreadMessageNums.length > 0) {
      remote.app.dock.setBadge('' + state.unreadMessageNums.length)
    } else {
      remote.app.dock.setBadge('')
    }
  },
  runWatchDog ({state, commit, dispatch}) {
    commit('INCREMENT_SHIFT_COUNTER')

    console.log(window.navigator.onLine, state.watchdogOnline)

    console.log(state.onlineOutages)
    if (!window.navigator.onLine && state.watchdogOnline) dispatch('startNewOutage') // first appearance of offline state
    else if (window.navigator.onLine && !state.watchdogOnline) dispatch('finishCurrentOutage') // first appearance of online state

    commit('SET_ONLINE', window.navigator.onLine)
  },
  startNewOutage ({commit, dispatch}) {
    commit('INCREMENT_CURRENT_OUTAGE')
    commit('INIT_NEW_OUTAGES')
    dispatch('letDogBark')
  },

  finishCurrentOutage ({commit, dispatch}) {
    commit('STOP_CURR_OUTAGES')
    dispatch('letDogSleep')
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
