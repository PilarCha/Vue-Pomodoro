import Vue from "vue";
import Vuex from "vuex";
import timer from "./store/timerStore";
import user from "./store/userStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    timer,
    user,
  },
});
