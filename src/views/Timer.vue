<template>
  <div v-cloak class="container">
    <div class="row">
      <div class="col s12">
          <div id="app">
            <div class="base-timer">
              <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                  <path
                    id="base-timer-path-remaining"
                    stroke-dasharray="283"
                    class="base-timer__path-remaining {remainingPathColor}"
                    d="
                      M 50, 50
                      m -45, 0
                      a 45,45 0 1,0 90,0
                      a 45,45 0 1,0 -90,0
                    "
                  ></path>
                </g>
              </svg>
             <span id="base-timer-label" class="base-timer__label">${formatTime(
               timeLeft
             )}</span>
           </div>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      COLOR_CODES: {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: 10
        },
        alert: {
          color: "red",
          threshold: 5
        }
      },
      FULL_DASH_ARRAY: 283,
      WARNING_THRESHOLD: 10,
      ALERT_THRESHOLD: 5,
      TIME_LIMIT: 20,
      timeLeft: 20,
      timerInterval: null,
      remainingPathColor: "green",
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
        document.getElementById("base-timer-label").innerHTML = this.formatTime(
          this.timeLeft
        );
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
      const { alert, warning, info } = this.COLOR_CODES;
      if (timeLeft <= alert.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(warning.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(alert.color);
      } else if (timeLeft <= warning.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(info.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(warning.color);
      }
    },

    setCircleDasharray() {
      const circleDasharray = `${(
        this.calculateTimeFraction() * this.FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
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
