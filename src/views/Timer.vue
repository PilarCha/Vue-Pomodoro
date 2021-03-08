<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
          <div id="app">
            <div class="base-timer">
              <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                  <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                </g>
              </svg>
              <span>
                <!-- Remaining time label -->
              </span>
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
}

</script>
<style src="@/assets/styles/timer.css">
</style>
