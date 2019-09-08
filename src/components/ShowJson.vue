<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Show JSON
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          JSON Parameters sent to backend
        </v-card-title>

        <v-card-text>
          {{ paramsFormatted }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['chartParams'],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    paramsFormatted () {
      return JSON.stringify(this.chartParams, null, '\t')
    }
  }
}

</script>
