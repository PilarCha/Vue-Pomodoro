<template>
  <v-row
    no-gutters
  >
    <PickTime/>
    <TimerSettings/>
  </v-row>

</template>

<script>
import PickTime from './pick-time.vue';
import TimerSettings from './timer-settings.vue';
export default {
  name:'MainBar',
  components: {
    PickTime,
    TimerSettings
  }
}
</script>

<style lang="css" scoped>
</style>
