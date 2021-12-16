<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      shaped
      bottom
      max-width="50px"
    >
      {{ name }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    snackbar: true,
    text: "test",
    timeout: 109000,
  }),
  props: {
    name: String,
  },
};
</script>
