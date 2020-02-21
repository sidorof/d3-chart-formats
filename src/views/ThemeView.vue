<template>
  <v-container fluid class="mt-0 ml-5 justify-content-center d-flex align-items-center">
    <v-row>
      <chart-types-list
        class="mt-5"
      />
      <v-card>
        Each graph uses the same code with modification transactions applied to the theme object.
      </v-card>
      <v-col cols="12" v-if="getMods !== undefined">
        <v-row
          align="center"
          justify="center"
        >
        <v-card
          justify-center
          :height="startHeight"
          :width="svgWidth + 3"
          color="grey"
          flat
          tile
          outlined
          v-for="(modId, i) in getModIds"
          :key="i"
          dark
          class="ma-2"
        >
          <span secondary
            class="black--text"
            v-if="getSampleData(modId, chartTypeId) !== undefined"
          >
            <v-card-title>{{ modId }}</v-card-title>
            <v-card-subtitle
              class="black--text"
            >
              {{getMod({ id: modId }).desc }}
            </v-card-subtitle>
          </span>
          <plot-app
            :chartId="modId"
            :chartTypeId="chartTypeId"
            :svgHeight="svgHeight"
            :svgWidth="svgWidth"
            :chartData="getSampleData(modId, chartTypeId)"
          />
        </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { applyMods } from '@/lib/D3/apply-mods'
// import { combineMods } from '@/lib/D3/combine-mods'

import ChartTypes from '@/components/ChartTypes'
import Plot from '@/components/Plot'

export default {
  components: {
    'plot-app': Plot,
    'chart-types-list': ChartTypes
  },
  data: () => ({
    startHeight: 490,

    // slide group
    maxWidth: null,
    pcModsWidth: 0.8,
    minWidth: 400,

    svgHeight: 400,
    svgWidth: 600,
    chartTypeId: 'date-line-plot',
    chartTypeObj: null
  }),
  mounted: function () {
    this.refreshCharts()
  },
  watch: {
    getMaxWidth: function (newData) {
      this.maxWidth = newData
    },
    getCurrentChartType: function (newData) {
      if (newData !== undefined) {
        this.chartTypeId = newData
        this.refreshCharts()
      }
    }
  },
  computed: {
    ...mapGetters({
      // for combining with mod to make new config
      getDefaultConfig: 'chart/getDefaultConfig',

      // get current chart settings associated with chartId
      getChartType: 'chart/getChartType',
      getChart: 'chart/getChart',

      // get mods currently stored
      getMods: 'chart/getMods',

      // get particular mod
      getMod: 'chart/getMod',

      getCurrentChartType: 'chart/getCurrentChartType',
      getData: 'sample/getData'
    }),
    getModIds () {
      // NOTE: this is a dupe
      return Object.keys(this.getMods)
    },
    getMaxWidth () {
      if (window.innerWidth !== undefined) {
        return window.innerWidth * this.pcModsWidth
      } else {
        return this.minWidth
      }
    }
  },
  methods: {
    ...mapActions({
      setChart: 'chart/setChart',
      setCurrentChartType: 'chart/setCurrentChartType',
      setRefreshChart: 'chart/setRefreshChart',
      createTimeseries: 'sample/createTimeseries'
    }),
    getSampleData (modId) {
      /* getSampleData
       * NOTE: DUPE WARNING, not totally similar, but close
       */
      const chartTypeId = this.chartTypeId
      if (chartTypeId !== undefined) {
        const modObj = JSON.parse(
          JSON.stringify(
            this.getMod({ id: modId })
          )
        )

        if (modObj.sampleData[chartTypeId] !== undefined) {
          // sample data associated with the intended mod type use
          const dataKey = modObj.sampleData[chartTypeId]
          return JSON.parse(
            JSON.stringify(
              this.getData({ key: dataKey })
            )
          )
        } else {
          return this.getData({ key: chartTypeId })
        }
      }
    },
    refreshCharts () {
      // charts show a range of mods all same chart, so chartId is modId
      for (const modId in this.getMods) {
        applyMods(
          {
            vm: this,
            modId: modId,
            chartId: modId,
            chartTypeId: this.chartTypeId,
            width: this.svgWidth,
            height: this.svgHeight
          }
        )
        this.setRefreshChart({ id: modId, value: true })
      }
    }
  }
}
</script>
