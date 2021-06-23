<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
          <div id="app">
            <div class="base-timer">
              <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" ></circle>
                  <path
                    id="base-timer-path-remaining"
                    :stroke-dasharray="remainingDashCircle"
                    v-bind:class = "remainingPathColor"
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

              <h3 class = "round-counter">{{currentRound}} / {{totalRounds}}</h3>
             <span id="base-timer-label" v-bind:class = "remainingPathColor">{{formatTime(timeLeft)}}</span>
             <h3 class ="current-phase" @click="paused = !paused">{{currentPhase}}</h3>
           </div>
          </div>
      </div>
    </div>
  </div>

</template>
<script>
const sound = require("@/assets/moshi.mp3");
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      sound,
      show: false,
      paused:true,
      remainingDashCircle: 34,
      fullDashArray: 283,
      warningThreshold: 30,
      alertThreshold: 15,
      timeLeft: null,
      timerInterval: null,
      remainingPathColor: "base-timer__path-remaining green",
      timePassed: 0,
      colorCodes: {
        warning: {
          color: "orange",
          threshold: 30
        },
        alert: {
          color: "red",
          threshold: 15
        }
      },
    }
  },

  mounted() {
    this.setUpTimer();
  },

  computed: {
    ...mapGetters(['timeLimit','currentPhase','totalRounds','currentRound'])
  },

  watch: {
    paused() {
      if(!this.paused) {
        this.startTimer()
        this.paused=false;
        return;
      }
      clearInterval(this.timerInterval);
      this.paused=true
    }
  },

  methods: {

    ...mapActions(['setTimeLimit','setTotalRounds','setCurrentRound','setCurrentPhase'])

    setUpTimer() {
      this.timeLeft = this.timeLimit - this.timePassed;
      this.formatTime(this.timeLeft);
      this.setRemainingPathColor(this.timeLeft);
    },

    restartTimer() {
      clearInterval(this.timerInterval);
      this.remainingDashCircle = 34;
      this.timeLeft = null;
      this.timerInterval = null;
      this.remainingPathColor = "base-timer__path-remaining green";
      this.timePassed = 0;
      let phase = this.currentPhase

      if(phase == 'Focus' && this.currentRound == 2) {
        this.timeLimit = 900;
        this.currentRound+=1;
        this.currentPhase = "Long Break"
      } else if(phase == 'Focus') {
        this.timeLimit = 300;
        this.currentRound += 1;
        this.currentPhase = "Break";
      } else {
        this.timeLimit = 1500;
        this.currentPhase = "Focus";
        if(phase == "Long Break")
          this.currentRound = 0;
      }

      this.startTimer();
    },

    startTimer() {
      this.show = true;
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.timeLimit - this.timePassed;
        this.formatTime(this.timeLeft);
        this.setCircleDasharray();
        this.setRemainingPathColor(this.timeLeft);

        if (this.timeLeft === 0) {
          this.show = false;
          let audio = new Audio(this.sound);
          audio.play();
          this.restartTimer();
        }
      }, 1000);
    },

    // setup methods below. No need to change these boyos
    formatTime (time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },

    setRemainingPathColor(timeLeft) {
      const { alert, warning} = this.colorCodes;
      if (timeLeft <= alert.threshold) {
        this.remainingPathColor =  "base-timer__path-remaining red"
      } else if (timeLeft <= warning.threshold) {
        this.remainingPathColor = "base-timer__path-remaining orange"
      }
    },

    setCircleDasharray() {
      const circleDasharray = `${(this.calculateTimeFraction() * this.fullDashArray).toFixed(0)} 283`;
      this.remainingDashCircle = circleDasharray
    },

    calculateTimeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
    },
  }
}
</script>
  <style src="@/assets/styles/timer.css">
</style>
