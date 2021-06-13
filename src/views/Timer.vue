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
                    <h3 class ="current-phase">{{current_phase}}</h3>
                  </div>
                </transition>
              </div> -->
             <span id="base-timer-label" >{{formatTime(timeLeft)}}</span>
             <h3 class ="current-phase" v-on:click="pauseStart">{{current_phase}}</h3>
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
      show: false,
      paused:true,
      current_phase:'Focus',
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
      // TIME_LIMIT: 1500,
      TIME_LIMIT: 20, 
      timeLeft: null,
      timerInterval: null,
      remainingPathColor: "base-timer__path-remaining green",
      timePassed: 0,
    }
  },
  created() {
    this.setUpTimer();
  },
  methods: {

    setUpTimer() {
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      this.formatTime(this.timeLeft);
      // this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);
    },

    pauseStart() {
      //
      if(this.paused) {
        this.startTimer()
        this.paused=false;
        return;
      }
      // continue
      let previousInterval = this.timerInterval
      console.log(previousInterval)
      clearInterval(this.timerInterval);
      this.paused=true

    },

    restartTimer() {
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

      switch(this.current_phase) {
        case 'Focus':
          this.TIME_LIMIT = 360;
          this.totalRound += 1;
          this.current_phase = "Break";
          break;
        case 'Break':
          this.TIME_LIMIT = 1500;
          this.current_phase = "Focus";
          break;
        case 'Looong Break':
          break;
      }

      setTimeout(this.startTimer,2000);
    },

    startTimer() {
      this.show = true;
      this.timerInterval = setInterval(() => {
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      this.formatTime(this.timeLeft);
      this.setCircleDasharray();
      this.setRemainingPathColor(this.timeLeft);

      if (this.timeLeft === 0) {
        this.show = false;
        this.restartTimer();
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
