<template>
  <v-card dark>
    <v-list rounded>
      <v-toolbar style="background-color: var(--settings-pink)" dense>
        <v-toolbar-title>Select User</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn small class="save-button-color">Quit</v-btn>
      </v-toolbar>
      <v-spacer></v-spacer>
      <v-list-item-group color="primary">
        <v-list-item v-for="(user, i) in userList" :key="i" rounded>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add New User</v-list-item-title>
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
  }),
  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      let sql = "Select username from User";
      sendAsync(sql).then((result) => {
        this.userList = result[0];
        console.log(this.userList);
      });
    },
  },
};
</script>
<style src="@/assets/styles/userSelect.css"></style>
