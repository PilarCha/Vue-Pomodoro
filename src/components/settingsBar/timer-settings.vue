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
        icon
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
      icon
      class="replay-icon"
      @click="restartRound()"
    >
      <v-icon large>mdi-replay</v-icon>
    </v-btn>
    <v-btn
      fab
      dark
      icon
      class="ff-icon"
      @click="ffNextRound()"
    >
      <v-icon large>mdi-fast-forward</v-icon>
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
      ...mapActions(['setNextRound','setRestartRound']),

      ffNextRound() {
        this.setNextRound(true);
      },
      restartRound() {
        this.setRestartRound(true);
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
  .replay-icon {
    color:var(--light-purp);
  }
  .ff-icon {
    color:var(--mid-cyan);
  }
</style>
