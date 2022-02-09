<template>
  <v-row justify="center">
    <v-dialog dark v-model="dialog" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on"> Quit App </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Exit Application? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "Dialog",
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
