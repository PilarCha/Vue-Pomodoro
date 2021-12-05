<template>
  <div>
    {{ JSON.stringify(response, null, 2) }}
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
        console.log(result);
        this.response = result;
      });
    },
  },
};
</script>
7
