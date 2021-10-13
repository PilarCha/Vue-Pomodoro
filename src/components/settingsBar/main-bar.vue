<template>
  <v-row no-gutters class="space-between">
    <PickTime />
    <TimerSettings />
    <HistoryGraph />
  </v-row>
</template>

<script>
import PickTime from "./pick-time.vue";
import TimerSettings from "./timer-settings.vue";
import HistoryGraph from "./history-graph.vue";
export default {
  name: "MainBar",
  components: {
    PickTime,
    TimerSettings,
    HistoryGraph,
  },
};
</script>

<style src="@/assets/styles/mainbar.css"></style>
