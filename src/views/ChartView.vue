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
            v-if="getSampleData(modId, chartType.id) !== undefined"
          >
            <v-card-title>{{ modId }}</v-card-title>
            <v-card-subtitle
              class="black--text"
            >
              {{ chartType.desc }} with {{ getCurrentMod.desc }}
            </v-card-subtitle>
          </span>
          <isolate
            :chartId="chartType.id"
            :chartTypeId="chartType.id"
            :svgHeight="svgHeight"
            :svgWidth="svgWidth"
            :chartData="getSampleData(modId, chartType.id)"
          />
        </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Isolate from '@/components/Isolate'
import Mods from '@/components/Mods'

export default {
  components: {
    isolate: Isolate,
    'mods-list': Mods
  },
  data: () => ({
    startHeight: 490,
    maxWidth: null,
    svgHeight: 400,
    svgWidth: 600,
    // probably not going to be used
    dfltChartTypeId: 'date-line-plot',
    modId: 'dflt',
    modObj: null
  }),
  created: function () {
    const modObj = JSON.parse(
      JSON.stringify(this.getMod({ id: this.modId })))
    this.modObj = modObj
  },
  mounted: function () {
    this.maxWidth = this.getMaxWidth
    // create the charts with the default modId
    // id in this case is chartTypeId
    const config = JSON.parse(
      JSON.stringify(this.getDefaultConfig))
    const modObj = this.modObj
    for (const chartTypeId in this.getChartTypes) {
      // const chartTypeObj = JSON.parse(
      //   JSON.stringify(this.getChartType({ id: chartTypeId })))
      modObj.colors = modObj.colors !== undefined ? modObj.colors : {}
      const mconfig = this.combineMods(config, modObj.mods, modObj.colors)
      this.setConfig({ id: this.modId, ...mconfig })
      this.setConfig({ ...mconfig, id: this.modId })
      this.setChart(
        {
          id: chartTypeId,
          config: mconfig,
          height: this.svgHeight,
          width: this.svgWidth,
          chartTypeId: chartTypeId
        }
      )
      this.setRefreshChart({ id: chartTypeId, value: true })
    }
  },
  watch: {
    getMaxWidth: function (newData) {
      this.maxWidth = newData
    },
    getCurrentMod: function (newData) {
      if (newData !== undefined) {
        this.modObj = newData
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
        return window.innerWidth * 0.8
      } else {
        return 400
      }
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setChart: 'chart/setChart',
      setRefreshChart: 'chart/setRefreshChart',
      createTimeseries: 'sample/createTimeseries'
    }),
    combineMods (config, mods, colors) {
      // NOTE: THIS IS ALSO A DUPE, FIND A COMMON HOME
      var params = JSON.parse(JSON.stringify(config))
      colors = colors !== undefined
        ? JSON.parse(JSON.stringify(colors))
        : {}

      mods.forEach((mod) => {
        if (mod.path !== undefined) {
          const branch = mod.path.split('.').slice(0, -1)
          const leaf = mod.path.split('.').slice(-1)
          var part = params
          for (var i = 0; i < branch.length; i++) {
            part = part[branch[i]]
          }
          part[leaf] = mod.value.toString().startsWith('{')
            ? colors[mod.value.slice(1, -1)]
            : mod.value
        }
      })
      return params
    },

    getSampleData (modId, chartTypeId) {
      /* getSampleData
       * NOTE: DUPE WARNING, not totally similar, but close
       */
      if (chartTypeId !== undefined) {
        const modObj = JSON.parse(JSON.stringify(this.getCurrentMod))
        const dfltData = this.getData({ key: chartTypeId })
        if (modObj.sampleData[chartTypeId] !== undefined) {
          const dataKey = modObj.sampleData[chartTypeId]
          return JSON.parse(JSON.stringify(this.getData({ key: dataKey })))
        } else {
          return dfltData
        }
      }
    },
    applyMods (modId, chartTypeId) {
      /* applyMods
       * config: either modId or default
       * modId: typically selected from the list

       get list of chart type ids
       clear list of charts
       for each chart type create a new chart
       with an id of chartTypeId
       */
      if (modId !== undefined && modId !== null) {
        var config = JSON.parse(
          JSON.stringify(
            {
              id: modId,
              ...this.getDefaultConfig
            }
          )
        )

        this.modId = modId
        const modObj = this.getMod({ id: modId })
        config = this.combineMods(config, modObj.mods, modObj.colors)
        this.setConfig({ id: modId, ...config })

        this.setChart(
          {
            id: chartTypeId,
            config: config,
            height: this.svgHeight,
            width: this.svgWidth,
            chartTypeId: chartTypeId
          }
        )
        // this.refreshChart()
      }
    },
    refreshCharts () {
      const modObj = JSON.parse(JSON.stringify(this.getCurrentMod))
      for (const chartType in this.getChartTypes) {
        this.applyMods(modObj.id, chartType)
        this.setRefreshChart({ id: chartType, value: true })
      }
    }
  }
}
</script>
