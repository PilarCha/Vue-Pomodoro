<template>
  <!-- <v-btn
    icon
    style="color:var(--settings-cyan)"
  >

    <v-icon large>mdi-chevron-down</v-icon>
  </v-btn> -->

    <v-speed-dial
      v-model="fab"
      :right="right"
      :direction="direction"
      :open-on-hover="hover"
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
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
  name:'TimerSettings',
  data: () => ({
      direction: 'right',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      right: true,
      transition: 'scale-transition',
    }),

    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
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
