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
      <v-card class="mx-auto" color="#333" outline height="350">'
        <v-card-title>
            Create New Sample Data
        </v-card-title>
        <v-form class="pa-10" v-model="valid">
          <v-container>
            <v-slider
              v-model="numColumns"
              label="Columns"
              min="1"
              max="30"
              thumb-label
              thumb-color="#232d6c"
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
              v-if="chartTypeId !== 'pie-plot'"
              v-model="length"
              :label="rowsLabel"
              thumb-label
              min="5"
              max="3000"
              thumb-color="#232d6c"
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
  props: {
    dialog: Boolean,
    dataKey: String,
    chartTypeId: String,
    dataConstraints: Object
  },
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
  computed: {
    rowsLabel () {
      if (this.chartTypeId.substr(0, 4) === 'data') {
        return 'Time series periods'
      } else {
        return 'Rows'
      }
    }
  },
  methods: {
    ...mapActions({
      setRefreshChart: 'chart/setRefreshChart',

      createTimeseries: 'sample/createTimeseries',
      createLabeledData: 'sample/createLabeledData'
    }),
    recalcTs (numColumns, length) {
      this.createTimeseries(
        {
          key: this.chartTypeId,
          numColumns: numColumns,
          length: length,
          ...this.dataConstraints
        }
      )
    },
    recalcLabeledData (numColumns, length) {
      this.createLabeledData(
        {
          key: this.chartTypeId,
          numColumns: numColumns,
          length: length,
          ...this.dataConstraints
        }
      )
    },
    newData () {
      switch (this.chartTypeId) {
        case 'date-line-plot':
          this.recalcTs(this.numColumns, this.length)
          break
        case 'date-bar-plot':
          this.recalcTs(this.numColumns, this.length)
          break
        case 'line-plot':
          this.recalcLabeledData(this.numColumns, this.length)
          break
        case 'pie-plot':
          this.recalcLabeledData(this.numColumns, 1)
          break
      }
      this.setRefreshChart({ id: this.dataKey, value: true })
      this.dialogData = false
    }
  }
}
</script>
