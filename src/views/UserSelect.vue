<template>
  <v-card dark class="mx-auto" max-width="300" tile>
    <v-list rounded>
      <v-subheader>Select User</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(user, i) in userList" :key="i">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.username"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-add</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add user</v-list-item-title>
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
7
