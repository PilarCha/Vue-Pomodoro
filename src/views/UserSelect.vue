<template>
  <v-card dark height="100%">
    <template slot="progress" :loading="loading" class="mx-auto my-12">
      <v-progress-linear height="10" indeterminate></v-progress-linear>
    </template>

    <v-toolbar style="background-color: var(--settings-pink)" dense>
      <v-toolbar-title>Select User</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn small class="quit-button-color" @click="quitApplication()"
        >Quit</v-btn
      >
    </v-toolbar>

    <v-list rounded>
      <v-list-item-group>
        <v-list-item v-for="(user, i) in userList" :key="i" rounded>
          <v-list-item-icon>
            <v-icon class="titles icon-margin">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="titles" v-text="user"></v-list-item-title>
          </v-list-item-content>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon class="titles icon-margin">mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="titles">Add New User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import sendAsync from "../query-control/renderer.js";
export default {
  data: () => ({
    userList: null,
    loading: true,
  }),
  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      let sql = "Select username from User";
      sendAsync(sql).then((result) => {
        this.userList = result[0];
      });
    },

    quitApplication() {
      const electron = window.require("electron");
      const { ipcRenderer } = electron;

      ipcRenderer.send("quit-application");
    },
  },
};
</script>
<style src="@/assets/styles/userSelect.css"></style>
