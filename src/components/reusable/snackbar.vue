<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      shaped
      bottom
      right
      min-width="100px"
    >
      Hello, {{ name }}

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
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
    timeout: 1999900,
  }),
  props: {
    name: String,
  },
};
</script>
