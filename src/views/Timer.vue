<template>
  <div class="container">
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
                    class="base-timer__path-remaining ${remainingPathColor}"
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
    <div class="row">
      <div class="col s12">
        <button class="btn waves-effect waves-light green" type="submit" name="action" onclick="startTimer()">Start
          <i class="material-icons right"></i>
        </button>
      </div>
      <div class="col s12">
        <button class="btn waves-effect waves-teal pink" type="submit" name="action" onclick="openTimerWindow()">Select Time
          <i class="material-icons right"></i>
        </button>
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
          threshold: this.WARNING_THRESHOLD
        },
        alert: {
          color: "red",
          threshold: this.ALERT_THRESHOLD
        }
      },
      FULL_DASH_ARRAY: 283,
      WARNING_THRESHOLD: 10,
      ALERT_THRESHOLD: 5,
      TIME_LIMIT: 20,
      timeLeft: this.TIME_LIMIT,
      timerInterval: null,
      remainingPathColor: this.COLOR_CODES.info.color,
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
          this.timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(this.timeLeft);

        if (this.timeLeft === 0) {
          onTimesUp();
        }
      }, 1000);
    }

  }
}

</script>
<style src="@/assets/styles/timer.css">
</style>
