<template>
  <v-container fluid class="mt-0 ml-5 justify-content-center d-flex align-items-center">
    <v-row>
      <mods-list
        class="mt-5"
      />
      <v-card
        align="center"
        justify="center"
        class="body"
        style="color: #aaa"
      >
        Each type of graph uses the same modification transactions applied to the theme object, but are expressed in the context of the graph type.
      </v-card>
      <v-col cols="12" v-if="getChartTypesList !== undefined">
        <v-row
          align="center"
          justify="center"
        >
        <v-card
          justify-center
          :height=startHeight
          :width="svgWidth + 3"
          color="grey"
          flat
          tile
          outlined
          v-for="(chartType, i) in getChartTypesList"
          :key="i"
          dark
          class="ma-2"
        >
          <span secondary
            class="black--text"
            v-if="getSampleData(chartType.id) !== undefined"
          >
            <v-card-title>{{ modId }}</v-card-title>
            <v-card-subtitle
              class="black--text"
            >
              {{ chartType.desc }} with {{ getCurrentMod.desc }}
            </v-card-subtitle>
          </span>
          <plot-app
            :chartId="chartType.id"
            :chartTypeId="chartType.id"
            :svgHeight="svgHeight"
            :svgWidth="svgWidth"
            :chartData="getSampleData(chartType.id)"
          />
          <div secondary
            class="black--text"
            v-if="getSampleData(chartType.id) === undefined"
            style="justify-content: center;"
          >
            Sample Data for Chart Type {{ chartType.id }} is not available
          </div>

        </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { applyMods } from '@/lib/D3/apply-mods'
import Plot from '@/components/Plot'
import Mods from '@/components/Mods'

export default {
  components: {
    'plot-app': Plot,
    'mods-list': Mods
  },
  data: () => ({
    startHeight: 490,

    // slide group
    maxWidth: null,
    pcModsWidth: 0.8,
    minWidth: 400,

    svgHeight: 400,
    svgWidth: 600,
    modId: 'dflt'
  }),
  mounted: function () {
    this.maxWidth = this.getMaxWidth
    this.refreshCharts()
  },
  watch: {
    getMaxWidth: function (newData) {
      this.maxWidth = newData
    },
    getCurrentMod: function (newData) {
      if (newData !== undefined) {
        this.modId = newData
        this.refreshCharts()
      }
    }
  },
  computed: {
    ...mapGetters({
      // for combining with mod to make new config
      getDefaultConfig: 'chart/getDefaultConfig',

      getChart: 'chart/getChart',
      getCharts: 'chart/getCharts',
      getChartTypes: 'chart/getChartTypes',

      getMods: 'chart/getMods',
      getMod: 'chart/getMod',

      getCurrentMod: 'chart/getCurrentMod',
      getData: 'sample/getData'
    }),

    getChartIds () {
      return Object.keys(this.getCharts)
    },

    getChartTypesList () {
      const chartTypesList = []
      for (const chartTypeId in this.getChartTypes) {
        const chartType = this.getChartTypes[chartTypeId]
        chartTypesList.push({ id: chartTypeId, ...chartType })
      }
      return chartTypesList
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
      setRefreshChart: 'chart/setRefreshChart'
    }),

    getSampleData (chartTypeId) {
      /* getSampleData
       * NOTE: DUPE WARNING, not totally similar, but close
       */
      if (chartTypeId !== undefined) {
        const modObj = this.getMod({ id: this.modId })
        if (modObj.sampleData[chartTypeId] !== undefined) {
          const dataKey = modObj.sampleData[chartTypeId]
          return JSON.parse(JSON.stringify(this.getData({ key: dataKey })))
        } else {
          return JSON.parse(
            JSON.stringify(
              this.getData({ key: chartTypeId })
            )
          )
        }
      }
    },

    refreshCharts () {
      for (const chartType in this.getChartTypes) {
        applyMods(
          {
            vm: this,
            modId: this.modId,
            chartId: chartType,
            chartTypeId: chartType,
            width: this.svgWidth,
            height: this.svgHeight
          }
        )
        this.setRefreshChart({ id: chartType, value: true })
      }
    }
  }
}
</script>
