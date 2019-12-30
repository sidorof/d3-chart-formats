<template>
  <v-container fluid>
    <v-row>
      <v-col cols=3 xs3>
        <span v-if="chartParams !== null" >
          <v-select
            :items="getConfigIds()"
            label="Chart Types"
            v-model="chartParams.id"
          ></v-select>

          <v-text-field
            v-model="chartParams.id"
            label="Chart ID"
          ></v-text-field>
        <v-expansion-panels
          multiple
          popout
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Plot
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <plot-config :chartId="chartId"/>
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
            <v-expansion-panel-header>Axes</v-expansion-panel-header>
            <v-expansion-panel-content>
                X Axis:
              <v-checkbox
                v-model="chartParams.axes.xAxis.use"
                label="Use X Axis"
              ></v-checkbox>
              <v-text-field
                v-model="chartParams.axes.xAxis.ticks"
                label="Ticks"
                type="number"
              ></v-text-field>
              Axis Label:
              <v-text-field
                v-model="chartParams.axes.xAxis.label.text"
                label="Date Range"
              ></v-text-field>
            fill: '#EEE',
            xPosition: 0.4,
              <v-text-field
                v-model="chartParams.axes.xAxis.label.fontWeight"
                label="Font Weight"
                type="number"
              ></v-text-field>
          }
        },
        yAxis: {
              <v-checkbox
                v-model="chartParams.axes.yAxis.use"
                label="Use Y Axis"
              ></v-checkbox>
              <v-text-field
                v-model="chartParams.axes.yAxis.ticks"
                label="Ticks"
                type="number"
              ></v-text-field>
          label: {
            text: 'this is the ylabel',
            fill: '#EEE',
            // yPosition: not used
            fontWeight: 700
            // font?
          }
        },
        yRightAxis: {
              <v-checkbox
                v-model="chartParams.axes.yRightAxis.use"
                label="Use Right Y Axis"
              ></v-checkbox>
              <v-text-field
                v-model="chartParams.axes.yRightAxis.ticks"
                label="Ticks"
                type="number"
              ></v-text-field>
          label: {
            text: null,
            fill: '#EEE',
            xPosition: 0.4,
            fontWeight: 700
            // font?
          }
        },
        grids: {
          horizontal: {
              <v-checkbox
                v-model="chartParams.axes.grids.horizontal.use"
                label="Use Horizontal Lines"
              ></v-checkbox>
            stroke: '#EEE',
            strokeWidth: 1,
            opacity: 0.5
          },
          vertical: {
              <v-checkbox
                v-model="chartParams.axes.grids.vertical.use"
                label="Use Vertical Lines"
              ></v-checkbox>
            stroke: '#EEEEEE',
            strokeWidth: 0.9,
            opacity: 0.5
          }
        }

            <v-text-field  START HERE
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

          <v-btn
            class="info"
            @click.native="setConfig(chartParams)"
          >Apply</v-btn>

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
        </span>
      </v-col>
      <v-col cols=4 dark xs6 class="pa-0" height="400px">
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
import Plot from '@/components/Plot'
import TS from '@/classes/TS.class'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    'line-plot': DateLinePlot,
    'show-json': ShowJson,
    'plot-config': Plot
  },
  data () {
    return {
      date: null,
      chartId: 'datelinePlot',
      chartParams: null,
      startModal: false,
      endModal: false,
      selectedTs: null,
      dateRange: {
        startDate: '2017-12-31',
        endDate: '2019-12-31'
      },
      numCols: 3,

      colorPicker: {
        mode: 'hexa',
        modes: ['rgba', 'hsla', 'hexa']
      }
    }
  },
  mounted () {
    if (this.selectedTs === null) {
      this.selectedTs = this.regenTs()
    }
    this.chartParams = this.getConfig({ id: this.chartId })
  },
  watch: {
    selectedTs: function (newData) {
    },
    chartId: function (newData) {
      if (newData === null || newData === undefined) {
        this.getConfig({ id: this.chartId })
      }
    },
    chartParams: function (newData) {
      console.log('watch:backgroundColor: newData', newData)
      console.log('background', newData.plot.background)
    },
    getColor: function (newData) {
      if (!newData.dialog) {
        switch (newData.type) {
          case 'plot.background':
            this.chartParams.plot.background = newData.color
            break
          case 'axes.xAxis.label.fill':
            this.chartParams.axes.xAxis.label.fill = newData.color
            break
          case 'axes.yAxis.label.fill':
            this.chartParams.axes.yAxis.label.fill = newData.color
            break
          case 'axes.yRightAxis.label.fill':
            this.chartParams.axes.yRightAxis.label.fill = newData.color
            break
          case 'axes.grids.horizontal.stroke':
            this.chartParams.axes.grids.horizontal.stroke = newData.color
            break
          case 'axes.grids.vertical.stroke':
            this.chartParams.axes.grids.vertical.stroke = newData.color
            break
          case 'title.fill':
            this.chartParams.title.fill = newData.color
            break
          default:
            // pass
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getConfigIds: 'chart/getConfigIds',
      getColor: 'chart/getColor'
    }),

    isDataReady () {
      return true
    },
    plotParams () {
      return {}
    },
    getParentId () {
      return 'datelinePlot'
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setColor: 'chart/setColor'
    }),
    paramColor (ctype) {
      return {
        type: ctype,
        color: this.chartParams.plot.background,
        dialog: true
      }
    },
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
    }
  }
}
</script>
