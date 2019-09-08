<template>
  <v-container fluid>
    <v-row>
      <v-col cols=3 xs3>
      <v-expansion-panels
        multiple
         popout
      >
        <v-expansion-panel>
          <v-expansion-panel-header>Plot</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-text-field
            v-model="chartParams.plot.background"
            label="Background"
          ></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Title</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-text-field
            v-model="chartParams.title.text"
            label="Text"
          ></v-text-field>
            <v-checkbox
              v-model="chartParams.title.useTitle"
              label="Use Title"
              ></v-checkbox>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Legend</v-expansion-panel-header>
          <v-expansion-panel-content>
            legend
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Sample Data</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-text-field
            v-model="numCols"
            label="Number of Columns"
            type="integer"
          ></v-text-field>

          <v-dialog
            ref="dialog"
            v-model="startModal"
            :return-value.sync="dateRange.startDate"
            persistent
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateRange.startDate"
                label="Start Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateRange.startDate" scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="startModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(dateRange.startDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-dialog
            ref="dialog"
            v-model="endModal"
            :return-value.sync="dateRange.endDate"
            persistent
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateRange.endDate"
                label="End Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateRange.endDate" scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="endModal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(dateRange.endDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-btn
            class="info"
            @click.native="regenTs"
          >
            Regen Data
          </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>
        <v-card>
          <v-btn
            class="info"
            @click.native="swapTheme"
          >
            Swap Theme
          </v-btn>
          <show-json :chartParams="chartParams" />
        </v-card>
      </v-col>
      <v-col cols=9 dark xs6 class="pa-0" height="400px">
        <line-plot
          v-if="isDataReady"
          :ts="selectedTs"
          :params="plotParams"
          :id="getParentId"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ShowJson from '@/components/ShowJson'
import DateLinePlot from '@/components/DateLinePlot'
import TS from '@/classes/TS.class'

export default {
  name: 'home',
  components: {
    'line-plot': DateLinePlot,
    'show-json': ShowJson
  },
  data () {
    return {
      date: null,
      chartParams: {
        plot: {
          fixedSize: false,
          background: '#333333'
        },
        series: {
          colorScheme: null,
          lineWidth: 1.0,
          markerSize: '5px',
          opacity: 1.0
        },
        axes: {
          xAxis: {
            xLabel: {
              text: null,
              fill: '#EEE',
              xPosition: 0.4,
              fontWeight: 700
            }
          },
          yLabel: null
        },
        title: {
          useTitle: true,
          text: 'Your title here {{ test }}'
        }
      },
      startModal: false,
      endModal: false,
      selectedTs: null,
      dateRange: {
        startDate: '2017-12-31',
        endDate: '2019-12-31'
      },
      numCols: 3
    }
  },
  mounted () {
    if (this.selectedTs === null) {
      this.selectedTs = this.regenTs()
    }
  },
  watch: {
    selectedTs: function (newData) {
      console.log('watch: selectedTs')
    }
  },
  computed: {
    isDataReady () {
      return true
    },
    plotParams () {
      return {}
    },
    getParentId () {
      return 'test'
    }
  },
  methods: {
    generateData (dates, numCols) {
      var data = {}
      const startVal = 100.0
      var line = []
      for (var i = 0; i < numCols; i++) {
        line.push(startVal)
      }
      var prevLine = line
      var newValue = null
      data[dates[0]] = line
      for (i = 1; i < dates.length - 1; i++) {
        line = []
        for (var col = 0; col < numCols; col++) {
          newValue = (1.0 + (Math.random() - 0.5) * 0.05) * prevLine.slice(col, col + 1)
          line.push(newValue)
        }
        data[dates[i]] = line
        prevLine = line
      }
      return data
    },

    createDateRange (dateRange) {
      var startDate = dateRange.startDate
      var endDate = dateRange.endDate
      var dates = []
      var date = null

      if (typeof startDate === 'string') {
        startDate = new Date(startDate)
      }
      if (typeof endDate === 'string') {
        endDate = new Date(endDate)
      }
      var curDate = startDate
      while (curDate <= endDate) {
        // only week days
        date = curDate
        if (date.getDay() < 5) {
          dates.push(date.toISOString().slice(0, 10))
        }
        curDate = new Date(curDate.setDate(date.getDate() + 1))
      }
      return dates
    },

    regenTs () {
      console.log('regenTs triggered')
      var tsData = {}
      var columns = []
      for (var i = 0; i < this.numCols; i++) {
        columns.push('Col-' + (i + 1))
      }
      const frequency = 'm'
      var dates = this.createDateRange(this.dateRange)
      tsData.columns = columns
      tsData.data = this.generateData(dates, this.numCols)
      tsData.frequency = frequency
      tsData.dateRange = this.dateRange
      this.selectedTs = new TS(tsData)
      return this.selectedTs
    },
    showParams () {
      alert(JSON.stringify(this.series, null, '\t'))
    },
    swapTheme () {
      if (this.$vuetify.theme.dark === true) {
        this.$vuetify.theme.dark = false
      } else {
        this.$vuetify.theme.dark = true
      }
      console.log('theme', this.$vuetify.theme)
    }
  }
}
</script>
