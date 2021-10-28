<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" id="tuner" icon>
        <v-icon>mdi-cogs</v-icon>
      </v-btn>
    </template>

    <v-card dark :loading="loading" class="mx-auto my-12">
      <template slot="progress">
        <v-progress-linear height="10" indeterminate></v-progress-linear>
      </template>

      <v-toolbar style="background-color: var(--settings-pink)" dense>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn style="margin-right: 10px" @click="updatePlaySound()" icon>
          <v-icon v-if="muteSound"> mdi-volume-off </v-icon>

          <v-icon v-else> mdi-volume-high </v-icon>
        </v-btn>

        <v-btn small class="save-button-color" @click="saveSelected()">
          Save
        </v-btn>
      </v-toolbar>

      <div v-for="(chip, i) in chipObj" :key="i">
        <v-card-title style="color: var(--settings-pink)">
          {{ chip.title }}
        </v-card-title>
        <v-card-text>
          <v-chip-group style="color: var(--mid-cyan)" column>
            <v-chip
              outlined
              v-for="(chipValue, j) in chip.values"
              :key="j"
              @click="storeSelected(chipValue, chip.title)"
            >
              {{ chipValue }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PickTime",
  data() {
    return {
      chipObj: [
        {
          title: "Focus Time",
          vmodel: "focusSelection",
          values: ["30 Min", "45 Min", "60 Min"],
        },
        {
          title: "Break Time",
          vmodel: "breakSelection",
          values: ["5 Min", "10 Min", "15 Min"],
        },
        {
          title: "Long Break",
          vmodel: "longSelection",
          values: ["20 Min", "25 Min", "30 Min"],
        },
        {
          title: "Total Rounds",
          vmodel: "roundSelection",
          values: ["2", "3", "4", "5", "6", "7"],
        },
      ],
      selectedObj: {},
      dialog: false,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["muteSound"]),
  },
  methods: {
    ...mapActions([
      "setFocusTime",
      "setBreakTime",
      "setLongBreakTime",
      "setTotalRounds",
      "setMuteSound",
    ]),

    updatePlaySound() {
      this.muteSound ? this.setMuteSound(false) : this.setMuteSound(true);
    },

    storeSelected(value, phase) {
      if (phase in this.selectedObj) {
        this.selectedObj[phase] = value.split(" ")[0];
      }
      this.selectedObj[phase] = value.split(" ")[0];
    },

    saveSelected() {
      this.loading = true;
      for (let key in this.selectedObj) {
        switch (key) {
          case "Break Time":
            this.setBreakTime(parseInt(this.selectedObj[key]) * 60);
            break;
          case "Focus Time":
            this.setFocusTime(parseInt(this.selectedObj[key]) * 60);
            break;
          case "Long Break":
            this.setLongBreakTime(parseInt(this.selectedObj[key]) * 60);
            break;
          case "Total Rounds":
            this.setTotalRounds(parseInt(this.selectedObj[key]));
            break;
        }
      }
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>
<style src="@/assets/styles/pickTime.css"></style>
