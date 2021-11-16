import Vue from "vue";
import VueRouter from "vue-router";
import Timer from "../views/Timer.vue";
// import Confetti from "../components/confetti.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Timer",
    component: Timer,
  },
  // {
  //   path: "/",
  //   name: "Confetti",
  //   component: Confetti,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
