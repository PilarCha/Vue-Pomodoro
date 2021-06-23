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
      return state.totalRounds
    },
    currentRound: state => {
      return state.currentRound
    }
  },

  mutations: {
    UPDATE_TIME_LIMIT(state,time) {
      state.timeLimit = time;
    },
    UPDATE_TOTAL_ROUNDS(state,rounds) {
      state.totalRounds = rounds;
    },
    UPDATE_CURRENT_ROUND(state,round) {
      if(round == undefined) {
        return state.currentRound++;
      }
      return state.currentRound = round
    },
    UPDATE_CURRENT_PHASE(state,phase){
      state.currentPhase = phase
    }
  },

  actions: {
    setTimeLimit({commit} , payload) {
      commit('UPDATE_TIME_LIMIT',payload)
    },
    setTotalRounds({commit}, payload) {
      commit('UPDATE_TOTAL_ROUNDS', payload)
    },
    setCurrentRound({commit}, payload) {
      commit('UPDATE_CURRENT_ROUND',payload)
    },
    setCurrentPhase({commit},payload) {
      commit('UPDATE_CURRENT_PHASE',payload)
    }
  }
})
