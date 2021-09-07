<template>
  <v-speed-dial
    v-model="fab"
    :right="right"
    :direction="direction"
    :transition="transition"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        class="main-icon"
        dark
        fab
        small
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else large>
          mdi-chevron-right
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="indigo"
      @click="restartTimer()"
    >
      <v-icon>mdi-replay</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      small
      color="red"
      @click="ffNextRound()"
    >
      <v-icon>mdi-fast-forward</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name:'TimerSettings',
  data: () => ({
      direction: 'right',
      fab: false,
      right: true,
      transition: 'scale-transition',
    }),

    methods: {
      ...mapActions(['setNextRound']),

      ffNextRound() {
        this.setNextRound(true);
      }
    },

    watch: {
      right (val) {
        this.left = !val
      },
    },
}
</script>

<style lang="css" scoped>
  .main-icon {
    color:var(--settings-cyan);
    margin-left:10px;
  }
</style>
