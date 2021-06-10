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
             <span id="base-timer-label" >{{formatTime(timeLeft)}}</span>
             <h3 v-if="isBreak" class ="current-phase">Break</h3>
             <h3 v-else class ="current-phase">Focus</h3>
           </div>
          </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      isBreak:false,
      COLOR_CODES: {
        warning: {
          color: "orange",
          threshold: 30
        },
        alert: {
          color: "red",
          threshold: 15
        }
      },
      totalRound:0,
      remainingDashCircle: 34,
      FULL_DASH_ARRAY: 283,
      WARNING_THRESHOLD: 30,
      ALERT_THRESHOLD: 15,
      // TIME_LIMIT: 1500, 25 mins
      TIME_LIMIT: 10,
      timeLeft: null,
      timerInterval: null,
      remainingPathColor: "base-timer__path-remaining green",
      timePassed: 0,
    }
  },
  created() {
    this.startTimer();
  },
  methods: {

    setUpTimer(isBreak) {
      clearInterval(this.timerInterval);
      this.remainingDashCircle = 34;
      this.FULL_DASH_ARRAY = 283;
      this.WARNING_THRESHOLD = 30;
      this.ALERT_THRESHOLD = 15;
      // TIME_LIMIT: 1500, 25 mins
      this.timeLeft = null;
      this.timerInterval = null;
      this.remainingPathColor = "base-timer__path-remaining green";
      this.timePassed = 0;

      if(!isBreak) {
        // focus time
        this.TIME_LIMIT = 10;
        this.isBreak = true;
      } else {
        // break time
        this.TIME_LIMIT = 10;
        this.totalRound += 1;
        this.isBreak = false;
      }

      if(this.totalRound === 3) {
        this.TIME_LIMIT = 1000
        this.totalRound = 0;
        this.isBreak = false;
      }

      this.startTimer();
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      this.formatTime(this.timeLeft);
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);

      if (this.timeLeft === 0) {
        this.setUpTimer(this.isBreak);
      }
      }, 1000);
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
      const circleDasharray = `${(this.calculateTimeFraction() * this.FULL_DASH_ARRAY).toFixed(0)} 283`;
      this.remainingDashCircle = circleDasharray
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
