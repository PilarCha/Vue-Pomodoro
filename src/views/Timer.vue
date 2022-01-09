<template>
  <main>
    <SnackBar :name="this.selectedUser.username" />
    <v-hover v-slot="{ hover }">
      <div data-app>
        <div class="container">
          <v-row no-gutters class="flex-nowrap">
            <v-col cols="2" class="mainbar-settings">
              <v-expand-transition>
                <MainBar v-if="hover" class="transition-fast-in-fast-out" />
              </v-expand-transition>
            </v-col>
            <v-col cols="9">
              <div id="app">
                <div class="base-timer">
                  <svg
                    class="base-timer__svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g class="base-timer__circle">
                      <circle
                        class="base-timer__path-elapsed"
                        cx="50"
                        cy="50"
                        r="45"
                      ></circle>
                      <path
                        id="base-timer-path-remaining"
                        :stroke-dasharray="remainingDashCircle"
                        v-bind:class="currentPathColor"
                        d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                      "
                      ></path>
                    </g>
                  </svg>
                  <!-- <div id="demo">
                    <transition name="fadeOne">
                      <div v-show="show" class="transition-container">
                        <span id="base-timer-label" >{{formatTime(timeLeft)}}</span>
                      </div>
                    </transition>
                    <transition name="fadeTwo">
                      <div v-show="show" class="transition-container">
                        <h3 class ="current-phase">{{currentPhase}}</h3>
                      </div>
                    </transition>
                  </div> -->

                  <h3 class="round-counter">
                    {{ currentRound }} / {{ totalRounds }}
                  </h3>
                  <span id="base-timer-label" v-bind:class="currentPathColor"
                    >{{ formatTime(timeLeft) }}
                  </span>
                  <h3 class="current-phase" @click="paused = !paused">
                    {{ currentPhase }}
                  </h3>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-hover>
  </main>
</template>
<script>
const roundEndAudio = require("@/assets/audios/moshi.mp3");
const completeCycleAudio = require("@/assets/audios/congratulations.mp3");
import MainBar from "@/components/settingsBar/main-bar.vue";
import SnackBar from "@/components/reusable/snackbar.vue";
import sendAsync from "../query-control/renderer.js";
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
import VueConfetti from "vue-confetti";

Vue.use(VueConfetti);
export default {
  components: {
    MainBar,
    SnackBar,
  },
  data() {
    return {
      roundEndAudio,
      completeCycleAudio,
      beginConfetti: true,
      currentSound: roundEndAudio,
      hover: false,
      show: false,
      paused: true,
      remainingDashCircle: 34,
      fullDashArray: 283,
      timeLeft: null,
      timerInterval: null,
      currentPathColor: "base-timer__path-remaining green",
      timePassed: 0,
      colorCodes: {
        warning: {
          color: "warning",
          threshold: 1000,
        },
        danger: {
          color: "danger",
          threshold: 250,
        },
      },
    };
  },

  mounted() {
    this.setUpTimer();
  },

  computed: {
    // calls store to set store variables to local variables. can be called with this.whatevsss
    ...mapGetters([
      "selectedUser",
      "timeLimit",
      "focusTime",
      "breakTime",
      "longBreak",
      "currentPhase",
      "totalRounds",
      "currentRound",
      "updateTimer",
      "nextRound",
      "restartRound",
      "muteSound",
    ]),
  },
  // keeps an eye on paused. If changed runs code.
  watch: {
    paused() {
      if (!this.paused) {
        this.startTimer();
        this.paused = false;
        return;
      }
      clearInterval(this.timerInterval);
      this.paused = true;
    },

    updateTimer() {
      if (this.updateTimer) {
        this.setUpdateTimer(false);
        this.setUpTimer();
      }
    },

    nextRound() {
      if (this.nextRound) {
        this.setNextRound(false);
        this.restartTimer();
      }
    },

    restartRound() {
      if (this.restartRound) {
        this.setRestartRound(false);
        clearInterval(this.timerInterval);
        this.remainingDashCircle = 34;
        this.timeLeft = null;
        this.timerInterval = null;
        this.currentPathColor = "base-timer__path-remaining green";
        this.timePassed = 0;
        this.setTimeLimit(this.timeLimit);
        this.setUpTimer();
        // this.startTimer();
      }
    },
  },
  // bulk of the applications
  methods: {
    // actions are used to mutate the store data. Can be called with this.whatevsss
    ...mapActions([
      "setTimeLimit",
      "setTotalRounds",
      "setCurrentRound",
      "setCurrentPhase",
      "setUpdateTimer",
      "setNextRound",
      "setRestartRound",
    ]),
    // sets up the basic looks of the timer. Must click to start
    setUpTimer() {
      this.timeLeft = this.timeLimit - this.timePassed;
      this.formatTime(this.timeLeft);
      this.setCurrentPathColor(this.timeLeft);
    },

    restartTimer() {
      clearInterval(this.timerInterval);
      this.remainingDashCircle = 34;
      this.timeLeft = null;
      this.timerInterval = null;
      this.currentPathColor = "base-timer__path-remaining green";
      this.timePassed = 0;
      let phase = this.currentPhase;
      this.insertTimeIntoDB(phase);
      this.setUpTimerForNextRound(phase);
      // we have this here to immediately start the next phase
      this.startTimer();
    },
    // starts interval of 1 second countdown.
    startTimer() {
      this.show = true;
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.timeLimit - this.timePassed;
        this.formatTime(this.timeLeft);
        this.setCircleDasharray();
        this.setCurrentPathColor(this.timeLeft);

        if (this.timeLeft === 0 && !this.paused) {
          this.show = false;
          this.$confetti.start({
            defaultDropRate: 5,
            defaultSize: 5,
          });
          setTimeout(() => {
            this.$confetti.stop();
          }, 2000);
          if (!this.muteSound) {
            let audio = new Audio(this.currentSound);
            audio.play();
          }
          this.restartTimer();
        }
      }, 1000);
    },

    setUpTimerForNextRound(phase) {
      if (phase == "Focus" && this.currentRound == this.totalRounds - 1) {
        this.setTimeLimit(this.longBreak);
        this.setCurrentRound();
        this.currentSound = completeCycleAudio;
        this.setCurrentPhase("Long Break");
      } else if (phase == "Focus") {
        this.setTimeLimit(this.breakTime);
        this.setCurrentRound();
        this.currentSound = roundEndAudio;
        this.setCurrentPhase("Break");
      } else {
        this.setTimeLimit(this.focusTime);
        this.setCurrentPhase("Focus");
        this.currentSound = roundEndAudio;
        if (phase == "Long Break") this.setCurrentRound(0);
      }
    },

    insertTimeIntoDB(currentPhase) {
      let sql;
      if (currentPhase == "Focus") {
        sql = `Insert into Time (userID,timeType,timeAmount,createdOn) VALUES(${
          this.selectedUser.id
        },'Focus',${Math.floor(
          parseInt(this.focusTime) / 60
        )},strftime('%s','now'))`;
      } else {
        sql = `Insert into Time (userID,timeType,timeAmount,createdOn) VALUES(${
          this.selectedUser.id
        },'Break',${Math.floor(
          parseInt(this.breakTime) / 60
        )},strftime('%s','now'))`;
      }
      sendAsync(sql).then((result) => {
        console.log(result);
      });
    },

    // setup methods below. No need to change these boyos
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },

    setCurrentPathColor(timeLeft) {
      const { danger, warning } = this.colorCodes;
      if (timeLeft <= danger.threshold) {
        this.currentPathColor = "base-timer__path-remaining danger";
      } else if (timeLeft <= warning.threshold) {
        this.currentPathColor = "base-timer__path-remaining warning";
      }
    },

    setCircleDasharray() {
      const circleDasharray = `${(
        this.calculateTimeFraction() * this.fullDashArray
      ).toFixed(0)} 283`;
      this.remainingDashCircle = circleDasharray;
    },

    calculateTimeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
    },
  },
};
</script>
<style src="@/assets/styles/timer.css"></style>
