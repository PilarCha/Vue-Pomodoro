import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    timeLimit: 1500,
    currentPhase: 'Focus',
    totalRounds:3,
    currentRound:0
  },

  getters: {
    timeLimit: state => {
      return state.timeLimit
    },
    currentPhase: state => {
      return state.currentPhase
    },
    totalRounds: state => {
      return state.currentPhase
    },
    currentRound: state => {
      return state.currentRound
    }
  },

  mutations: {
    updatetimeLimit(state,time) {
      state.timeLimit = time
    },
    updatetotalRounds(state,rounds) {
      state.totalRounds = rounds
    }
  }
})
