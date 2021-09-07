import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    updateTimer:false,
    restartRound:false,
    nextRound:false,
    timeLimit: 2700,
    currentPhase: 'Focus',
    totalRounds:3,
    currentRound:0,
    focusTime:2700,
    breakTime:360,
    longBreak:900
  },

  getters: {
    nextRound: state=> {
      return state.nextRound
    },
    updateTimer: state => {
      return state.updateTimer
    },
    timeLimit: state => {
      return state.timeLimit
    },
    focusTime: state => {
      return state.focusTime
    },
    breakTime: state => {
      return state.breakTime
    },
    longBreak: state => {
      return state.longBreak
    },
    currentPhase: state => {
      return state.currentPhase
    },
    totalRounds: state => {
      return state.totalRounds
    },
    currentRound: state => {
      return state.currentRound
    },
    restartRound: state => {
      return state.restartRound
    }
  },

  mutations: {
    UPDATE_TIME_LIMIT(state,time) {
      state.timeLimit = time;
    },
    UPDATE_FOCUS_TIME(state,time) {
      state.focusTime = time;
      state.timeLimit = time;
      state.updateTimer = true;
    },
    UPDATE_BREAK_TIME(state,time) {
      state.breakTime = time;
    },
    UPDATE_LONG_BREAK_TIME(state,time) {
      state.longBreak = time;
    },
    UPDATE_TOTAL_ROUNDS(state,rounds) {
      state.totalRounds = rounds;
    },
    UPDATE_CURRENT_ROUND(state,round) {
      if(round == undefined) {
        return state.currentRound++;
      }
      state.currentRound = round
    },
    UPDATE_CURRENT_PHASE(state,phase){
      state.currentPhase = phase
    },
    UPDATE_UPDATE_TIMER(state,boolean) {
      state.updateTimer = boolean
    },
    UPDATE_NEXT_ROUND(state,boolean) {
      state.nextRound = boolean
    },
    UPDATE_RESTART_ROUND(state,boolean) {
      state.restartRound = boolean
    }
  },

  actions: {
    setTimeLimit({commit} , payload) {
      commit('UPDATE_TIME_LIMIT',payload)
    },
    setFocusTime({commit},payload) {
      commit('UPDATE_FOCUS_TIME',payload)
    },
    setBreakTime({commit},payload) {
      commit('UPDATE_BREAK_TIME',payload)
    },
    setLongBreakTime({commit},payload) {
      commit('UPDATE_LONG_BREAK_TIME',payload)
    },
    setTotalRounds({commit}, payload) {
      commit('UPDATE_TOTAL_ROUNDS', payload)
    },
    setCurrentRound({commit}, payload) {
      commit('UPDATE_CURRENT_ROUND',payload)
    },
    setCurrentPhase({commit},payload) {
      commit('UPDATE_CURRENT_PHASE',payload)
    },
    setUpdateTimer({commit},payload) {
      commit('UPDATE_UPDATE_TIMER',payload)
    },
    setNextRound({commit},payload) {
      commit('UPDATE_NEXT_ROUND',payload)
    },
    setRestartRound({commit},payload) {
      commit('UPDATE_RESTART_ROUND',payload)
    }
  }
})
