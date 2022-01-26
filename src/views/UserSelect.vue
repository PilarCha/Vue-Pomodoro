<template>
  <v-card dark height="100%">
    <template slot="progress" :loading="loading" class="mx-auto my-12">
      <v-progress-linear height="10" indeterminate></v-progress-linear>
    </template>

    <v-toolbar style="background-color: var(--settings-pink)" dense>
      <v-toolbar-title>Select User</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn small class="quit-button-color" @click="quitApplication()"
        >Quit App</v-btn
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
                @click="directToTimer(user)"
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
            <v-list-item-title
              class="titles"
              @click="showNewUserForm = !showNewUserForm"
              >Add New User</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
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
    ...mapActions(["setSelectedUser"]),
    directToTimer(user) {
      this.setSelectedUser(user);
      this.$router.push({ path: "/timer" });
    },
    async getUsers() {
      const response = await axios.get("http://localhost:4000/getAllUsers/");
      this.userList = response.data;
    },

    async createNewUser() {
      if (this.newUserName == "" || this.newUserName.length <= 3) {
        return;
      }

      await axios.post(`http://localhost:4000/newUser/${this.newUserName}`);
    },

    editUser() {
      // editUser
    },

    async deleteUser(userId) {
      event.preventDefault();
      await axios.delete(`http://localhost:4000/delete/${userId}`);
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
