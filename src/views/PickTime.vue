<div id="app">
  <v-app id="inspire">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-top-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open Dialog
          </v-btn>
        </template>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="dialog = false">Content filtering</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</div>
<script>
  export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
  }
</script>
