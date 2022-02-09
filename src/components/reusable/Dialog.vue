<template>
  <v-row justify="center">
    <v-spacer></v-spacer>
    <v-dialog dark v-model="dialog" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn small class="quit-button-color" v-bind="attrs" v-on="on">
          Quit App
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Exit Application? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            No
          </v-btn>
          <v-btn color="green darken-1" text @click="quitApplication">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "Dialog",
  data: () => ({
    dialog: false,
  }),
  methods: {
    quitApplication() {
      const electron = window.require("electron");
      const { ipcRenderer } = electron;

      ipcRenderer.send("quit-application");
    },
  },
};
</script>
<style src="@/assets/styles/dialog.css"></style>
