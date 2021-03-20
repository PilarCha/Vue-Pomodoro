<template>
  <div v-cloak class="container">
    <Loading v-if="isLoading"/>
    <div v-if="!isLoading" class="row">
      <div class="col s12">
          <div id="app">
            <div class="base-timer">
              <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                  <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="remainingDashCirle"
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
             <span id="base-timer-label" class="base-timer__label">{{formatTime(timeLeft)}}</span>
           </div>
          </div>
      </div>
    </div>
  </div>

</template>
<script>
import Loading from '../components/loading.vue'
export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: true,
      COLOR_CODES: {
        warning: {
          color: "orange",
          threshold: 10
        },
        alert: {
          color: "red",
          threshold: 5
        }
      },
      remainingDashCirle : 34,
      FULL_DASH_ARRAY: 283,
      WARNING_THRESHOLD: 10,
      ALERT_THRESHOLD: 5,
      TIME_LIMIT: 20,
      timeLeft: 20,
      timerInterval: null,
      remainingPathColor: "base-timer__path-remaining green",
      timePassed: 0,
    }
  },
  created() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;
        this.isLoading = false;
        this.formatTime(this.timeLeft);
        this.setCircleDasharray();
        this.setRemainingPathColor(this.timeLeft);

        if (this.timeLeft === 0) {
          this.onTimesUp();
        }
      }, 1000);
    },

    onTimesUp() {
      clearInterval(this.timerInterval);
    },

    formatTime (time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },

    setRemainingPathColor(timeLeft) {
      const { alert, warning} = this.COLOR_CODES;
      if (timeLeft <= alert.threshold) {
        this.remainingPathColor =  "base-timer__path-remaining red"
      } else if (timeLeft <= warning.threshold) {
        this.remainingPathColor = "base-timer__path-remaining orange"
      }
    },

    setCircleDasharray() {
      const circleDasharray = `${(
        this.calculateTimeFraction() * this.FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      this.remainingDashCirle = circleDasharray
      // document
      //   .getElementById("base-timer-path-remaining")
      //   .setAttribute("stroke-dasharray", circleDasharray);
    },

    calculateTimeFraction() {
      const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
      return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
    },


  }
}

</script>
<style src="@/assets/styles/timer.css">
</style>
