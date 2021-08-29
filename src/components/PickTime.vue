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
          <v-spacer></v-spacer>

          <v-btn
            small
          >
            Save
          </v-btn>
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
                v-for="chipValue in chip.values"
                :key = "chipValue"
                @click="saveValues(chipValue,chip.title)"
                >
                {{chipValue}}
              </v-chip>

            </v-chip-group>
          </v-card-text>
          <v-divider></v-divider>
        </div>

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
            title: 'Focus',
            vmodel: 'focusSelection',
            values: ['30 Min', '45 Min', '60 Min']
          },
          {
            title: 'Break',
            vmodel: 'breakSelection',
            values: ['5 Min', '10 Min', '15 Min']
          },
          {
            title: 'Long Break',
            vmodel: 'longSelection',
            values: ['20 Min', '25 Min', '30 Min']
          },
          {
            title: 'Total Rounds',
            vmodel: 'roundSelection',
            values: ['3', '4', '5','6','7']
          }
        ],
        breakSelection:1,
        focusSelection:1,
        longSelection:1,
        roundSelection:1,
        dialog: false,
      }
    },
    methods: {
      saveValues(value,phase) {
        console.log(value,phase)
      }
    }
  }
</script>
<style src="@/assets/styles/pickTime.css">
</style>
