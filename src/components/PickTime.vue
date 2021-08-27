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
          style="background-color:var(--settings-darkblue)"
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
        <v-card-title>Pick Time</v-card-title>
        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>30 Mins</v-chip>

            <v-chip>45 Mins</v-chip>

            <v-chip>60 Mins</v-chip>

          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data () {
      return {
        selection:1,
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
