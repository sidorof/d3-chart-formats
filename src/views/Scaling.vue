<template>
  <div class="mt-5 ml-5 d-flex flex-wrap flex-md-nowrap">
    <v-col sx12 md-2>
      <chart-types :chartId="chartId"/>
      <v-row
        class="d-flex flex-wrap mb-4"
        align="center"
        justify="center"
      >
        <sample-data class="mb-10" :dialog='dialog' :dataKey="chartTypeId"/>
        <div>
        <v-card
          tile
          outlined
        >
          <v-card-title
            align="float-center"
            class="heading"
            style="justify-content: center;"
          >
            Scaling
          </v-card-title>
          <v-slider
            dense
            class="mx-6"
            v-model="svgCtrlHeight"
            small
            label="Height"
            :min="svgCtrlHeightMin"
            :max="svgCtrlHeightMax"
            hint="Control the height in pixels of the plot"
            thumb-label="always"
            thumb-size="24"
            thumb-color="#232d6c"
            @click="refreshChart()"
          >
          </v-slider>
          <v-slider
            dense
            class="mx-6"
            v-model="svgCtrlWidth"
            label="Width"
            :min="svgCtrlWidthMin"
            :max="svgCtrlWidthMax"
            thumb-label="always"
            thumb-size="24"
            hint="Control the width in pixels of the plot"
            thumb-color="#232d6c"
            @click="refreshChart()"
          >
          </v-slider>
        </v-card>
        <v-card
          width="260"
          tile
          outlined
          style="justify-content: center;"
        >
          <v-card-title
            align="float-center"
            class="heading"
            style="justify-content: center;"
          >
            Themes
          </v-card-title>
          <template>
            <v-card-actions class="justify-space-between">
              <v-col>
                  <v-btn
                    @click="prev"
                    class="center"
                    block
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                    Previous
                  </v-btn>
                    <v-card-title
                      class="body center"
                      style="justify-content: center; background-color: #555;"
                    >
                        {{ modId }}
                    </v-card-title>
                  <v-btn
                    @click="next"
                    class="center"
                    block
                  >
                    Next
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
              </v-col>
            </v-card-actions>
          </template>
          <v-window v-model="onboarding" horizontal>
            <v-window-item
              v-for="(modId, i) in getModIds"
              :key=i
            >
              <div v-if="currentMod !== undefined">
                <div v-if="currentMod.mods.length > 0">
                  <chart-mod :modId="modId"/>
                </div>
                <v-card
                  v-if="currentMod.mods.length == 0"
                  align="center"
                  color="#555"
                  class="ml-2 pl-3"
                >
                  No Modifications
                </v-card>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
        </div>
      </v-row>
    </v-col>
    <v-col cols="10" class="d-flex flex-row mb-2 sx-12">
      <div>
        <v-card
          v-if="getSampleData !== undefined"
          justify-center
          :height="svgCtrlHeight"
          :width="svgCtrlWidth"
          color="grey lighten-2"
          flat
          tile
          outlined
        >
          <plot-app
            :chartId="chartId"
            :chartTypeId="chartTypeId"
            :svgHeight="svgCtrlHeight"
            :svgWidth="svgCtrlWidth"
            :chartData="getSampleData"
          />
        </v-card>
      </div>
    </v-col>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { applyMods } from '@/lib/D3/apply-mods'

import ChartTypes from '@/components/ChartTypes'
import SampleData from '@/components/SampleData'
import Mod from '@/components/Mod'
import Plot from '@/components/Plot'

export default {
  components: {
    'plot-app': Plot,
    'sample-data': SampleData,
    'chart-mod': Mod,
    'chart-types': ChartTypes
  },
  data: () => ({
    defaultWidth: 800,
    defaultHeight: 600,

    svgCtrlWidthMin: 40,
    svgCtrlHeightMin: 40,

    chartId: 'scale-test',
    chartTypeId: 'date-line-plot',
    modId: 'dflt',

    onboarding: 0,
    length: 3,
    dialog: false
  }),

  mounted: function () {
    // temporary
    this.createTimeseries(
      { key: 'scale-test', numColumns: 3, length: 200 })

    applyMods(
      {
        vm: this,
        modId: this.modId,
        chartId: this.chartId,
        chartTypeId: this.chartTypeId,
        width: this.defaultWidth,
        height: this.defaultHeight
      }
    )

    this.setCurrentMod(this.modId)
    this.setCurrentChartType(this.chartTypeId)

    this.length = this.numMods
  },

  watch: {
    getCurrentChartType: function (newData) {
      if (newData !== undefined) {
        this.chartTypeId = newData
        this.refreshChart()
      }
    }
  },
  computed: {
    ...mapGetters({
      // for combining with mod to make new config
      getDefaultConfig: 'chart/getDefaultConfig',

      // get current chart settings associated with chartId
      getChart: 'chart/getChart',
      getChartType: 'chart/getChartType',
      getCurrentChartType: 'chart/getCurrentChartType',

      getMods: 'chart/getMods',
      getMod: 'chart/getMod',
      getCurrentMod: 'chart/getCurrentMod',

      getData: 'sample/getData'
    }),

    svgCtrlHeight: {
      get () {
        if (this.$store.state.chart.charts[this.chartId] !== undefined) {
          return this.$store.state.chart.charts[this.chartId].height
        } else {
          return null
        }
      },
      set (value) {
        if (this.$store.state.chart.charts[this.chartId] !== null) {
          this.$store.commit('chart/setDims', { id: this.chartId, height: value })
        }
      }
    },

    svgCtrlHeightMax () {
      return document.documentElement.clientHeight !== undefined
        ? document.documentElement.clientHeight
        : this.defaultHeight
    },
    svgCtrlWidthMax () {
      return document.documentElement.clientWidth !== undefined
        ? document.documentElement.clientWidth * 0.75
        : this.defaultWidth
    },
    svgCtrlWidth: {
      get () {
        if (this.$store.state.chart.charts[this.chartId] !== undefined) {
          return this.$store.state.chart.charts[this.chartId].width
        } else {
          return null
        }
      },
      set (value) {
        if (this.$store.state.chart.charts[this.chartId] !== null) {
          this.$store.commit('chart/setDims', { id: this.chartId, width: value })
        }
      }
    },

    calcHeight () {
      return (this.svgHeightMax - this.svgHeight).toString()
    },
    getModIds () {
      return Object.keys(this.getMods)
    },
    numMods () {
      return this.getModIds.length
    },
    getSampleData () {
      const modObj = JSON.parse(
        JSON.stringify(
          this.getMod({ id: this.modId })
        )
      )
      const dfltData = this.getData({ key: this.chartTypeId })
      if (modObj !== undefined && modObj !== null) {
        if (modObj.sampleData[this.chartTypeId] !== undefined) {
          const chartTypeId = modObj.sampleData[this.chartTypeId]
          return JSON.parse(JSON.stringify(this.getData({ key: chartTypeId })))
        } else {
          // go with default
          return dfltData
        }
      } else {
        return undefined
      }
    },
    currentMod () {
      return this.getMod({ id: JSON.parse(JSON.stringify(this.modId)) })
    }
  },

  methods: {
    ...mapActions({
      setChart: 'chart/setChart',
      setCurrentChartType: 'chart/setCurrentChartType',
      setCurrentMod: 'chart/setCurrentMod',

      // sets the width and height dimensions
      setDims: 'chart/setDims',

      // flag a particular chart to refresh via watch in Isolate
      setRefreshChart: 'chart/setRefreshChart',

      // apply scaling parameters
      scaleMod: 'chart/scaleMod',

      // this is temporary
      createTimeseries: 'sample/createTimeseries'
    }),

    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
      this.modId = this.getModIds[this.onboarding]
      this.setCurrentMod({ id: this.modId })
      this.refreshChart()
    },

    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
      this.modId = this.getModIds[this.onboarding]
      this.setCurrentMod({ id: this.modId })
      this.refreshChart()
    },

    refreshChart () {
      if (this.modId !== undefined) {
        applyMods(
          {
            vm: this,
            modId: this.modId,
            chartId: this.chartId,
            chartTypeId: this.chartTypeId,
            width: this.svgCtrlWidth,
            height: this.svgCtrlHeight
          }
        )
        this.setRefreshChart({ id: this.chartId, value: true })
      }
    }
  }
}
</script>
