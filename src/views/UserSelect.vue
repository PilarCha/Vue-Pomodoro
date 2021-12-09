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

    <v-list rounded class="overflow-y-auto">
      <v-list-item-group>
        <div v-if="!showNewUserForm">
          <v-list-item v-for="(user, i) in userList" :key="i" rounded>
            <v-list-item-icon>
              <v-icon class="titles icon-margin">mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="titles"
                v-text="user.username"
              ></v-list-item-title>
            </v-list-item-content>

            <v-btn icon>
              <v-icon class="titles" @click="deleteUser(user.id)"
                >mdi-trash-can</v-icon
              >
            </v-btn>
          </v-list-item>
        </div>

        <div v-if="showNewUserForm">
          <v-list-item>
            <v-list-item-content>
              <v-text-field
                label="UserName"
                :rules="rules"
                hide-details="auto"
                v-model="newUserName"
              ></v-text-field>
            </v-list-item-content>

            <v-btn icon>
              <v-icon class="titles" @click="createNewUser()"
                >mdi-account-plus</v-icon
              >
            </v-btn>
            <v-btn icon>
              <v-icon class="titles" @click="showNewUserForm = !showNewUserForm"
                >mdi-close</v-icon
              >
            </v-btn>
          </v-list-item>
        </div>

        <v-list-item v-if="!showNewUserForm">
          <v-list-item-icon>
            <v-icon class="titles icon-margin">mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="titles" @click="addUser()"
              >Add New User</v-list-item-title
            >
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
    showNewUserForm: false,
    newUserName: "",
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 3) || "Min 3 characters",
    ],
  }),
  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      let sql = "Select id,username from User";
      sendAsync(sql).then((result) => {
        this.userList = result;
      });
    },

    addUser() {
      this.showNewUserForm = true;
    },

    createNewUser() {
      if (this.newUserName == "" || this.newUserName.length <= 3) {
        return;
      }

      let sql = `Insert into User (username,createdOn) VALUES ('${this.newUserName}',strftime('%s','now'))`;
      sendAsync(sql).then((result) => {
        this.showNewUserForm = false;
        alert(result);
      });
    },

    editUser() {
      // editUser
    },

    deleteUser(userId) {
      let sql = `Delete From User where id = ${userId}`;
      sendAsync(sql).then((result) => {
        alert(result);
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
