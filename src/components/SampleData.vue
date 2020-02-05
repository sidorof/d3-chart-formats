<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      class="black--text"
      @click.stop="dialogData = true"
    >
      Update Data
    </v-btn>

    <v-dialog
      v-model="dialogData"
      max-width="430"

    >
      <v-card class="mx-auto" height="250">
        <v-form class="pa-10" v-model="valid">
          <v-container>
            <v-slider
              v-model="numColumns"
              label="Number of Columns"
              min="1"
              max="30"
              thumb-label
            >
              <template v-slot:append>
                <v-text-field
                  v-model="numColumns"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider>
            <v-slider
              v-model="length"
              label="Time Series Periods"
              thumb-label
              min="5"
              max="3000"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="length"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
            </v-slider>
            <v-btn
                color="primary"
                @click="newData()"
            >
              Update Data
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['dialog'],
  data () {
    return {
      dialogData: false,
      length: 200,
      numColumns: 3,
      valid: false
    }
  },
  watch: {
    dialog: function (newData) {
      if (newData) {
        this.dialogData = true
      }
    }
  },
  methods: {
    ...mapActions({
      createTimeseries: 'sample/createTimeseries'
    }),
    recalcTs (numColumns, length) {
      this.createTimeseries({
        key: 'ts1', numColumns: numColumns, length: length })
    },
    newData (numColumns, length) {
      // prep for various plot types switch
      this.recalcTs(this.numColumns, this.length)
      this.dialogData = false
    }
  }
}
</script>
