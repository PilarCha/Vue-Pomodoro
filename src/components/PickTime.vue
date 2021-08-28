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
          class="ma-2"
          text
          icon
          style="color:var(--settings-cyan)"
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
        <v-card-title>Focus Time</v-card-title>
        <v-card-text>
          <v-chip-group
            v-model="focusSelection"
            style="color:var(--mid-cyan)"
            column
          >
            <v-chip>30 Min</v-chip>

            <v-chip>45 Min</v-chip>

            <v-chip>60 Min</v-chip>

          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-title>Break Time</v-card-title>
        <v-card-text>
          <v-chip-group
            v-model="breakSelection"
            style="color:var(--mid-cyan)"
            column
          >
            <v-chip>5 Min</v-chip>

            <v-chip>10 Min</v-chip>

            <v-chip>15 Min</v-chip>

          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-title>Long Break</v-card-title>
        <v-card-text>
          <v-chip-group
            v-model="longSelection"
            style="color:var(--mid-cyan)"
            column
          >
            <v-chip>20 Min</v-chip>

            <v-chip>25 Min</v-chip>

            <v-chip>30 Min</v-chip>

          </v-chip-group>
        </v-card-text>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        breakSelection:1,
        focusSelection:1,
        longSelection:1,
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
