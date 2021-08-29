<template>
  <v-row
    justify="center"
    align="center"
    >
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-top-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          id="tuner"
          text
          icon
        >
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </template>
      <v-card
        dark
        class="mx-auto my-12"
      >
        <v-toolbar
          style="background-color:var(--settings-pink)"
          dense
        >
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar>

        <div
          v-for="chip in chipObj"
          :key = "chip.id"
          >
          <v-card-title
              style="color:var(--settings-pink)"
              >
              {{chip.title}}
            </v-card-title>
          <v-card-text>
            <v-chip-group
              v-model="chip.vmodel"
              style="color:var(--mid-cyan)"
              column
            >
              <v-chip
                outlined
                v-for="value in chip.values"
                :key = "value.id"
                >{{value}}
              </v-chip>

            </v-chip-group>
          </v-card-text>
          <v-divider></v-divider>
        </div>

        <!-- <v-card-title
          style="color:var(--settings-pink)"
          >Long Break
        </v-card-title>
        <v-card-text>
          <v-chip-group
            v-model="longSelection"
            style="color:var(--mid-cyan)"
            column
          >
            <v-chip outlined>20 Min</v-chip>

            <v-chip outlined>25 Min</v-chip>

            <v-chip outlined>30 Min</v-chip>

          </v-chip-group>
        </v-card-text> -->

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        chipObj: [
          {
            "title": 'Focus Time',
            'vmodel': 'focusSelection',
            values: ['30 Min', '45 Min', '60 Min']
          },
          {
            "title": 'Break Time',
            'vmodel': 'breakSelection',
            values: ['5 Min', '10 Min', '15 Min']
          },
          {
            "title": 'Long Break',
            'vmodel': 'longSelection',
            values: ['20 Min', '25 Min', '30 Min']
          }
        ],
        breakSelection:1,
        focusSelection:1,
        longSelection:1,
        dialog: true,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
<style src="@/assets/styles/pickTime.css">
</style>
