<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    snackbar: true,
    text: this.selectedUser,
    timeout: 2000,
  }),
  computed: {
    ...mapGetters(["selectedUser"]),
  },
};
</script>
