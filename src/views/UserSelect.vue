<template>
  <div>
    {{ response }}
  </div>
</template>
<script>
import sendAsync from "../query-control/renderer.js";
export default {
  data() {
    return {
      response: null,
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      let sql = "Select * from User";
      sendAsync(sql).then((result) => {
        this.response = result;
      });
    },
  },
};
</script>
