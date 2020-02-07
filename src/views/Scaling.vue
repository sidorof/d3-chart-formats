<template>
  <div class="mt-5 ml-5 d-flex flex-wrap flex-md-nowrap">
    <v-col sx12 md-2>
      <v-row
        class="d-flex flex-wrap mb-4"
        align="center"
        justify="center"
      >
        <sample-data class="mb-10" :dialog='dialog' :dataKey="dataKey"/>
        <chart-types :chartId="chartId"/>
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
              <div v-if="currentMod.mods.length > 0">
                <chart-mod :currentMod="currentMod" :modId="modId"/>
              </div>
              <v-card
                v-if="currentMod.mods.length == 0"
                align="center"
                color="#555"
                class="ml-2 pl-3"
              >
                No Modifications
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
        </div>
      </v-row>
    </v-col>
    <v-col cols="10" class="d-flex flex-row mb-2 sx-12">
      <div>
        <v-card
          v-if="getSampleData(modId, chartTypeId) !== undefined"
          justify-center
          :height="svgCtrlHeight"
          :width="svgCtrlWidth"
          color="grey lighten-2"
          flat
          tile
          outlined
        >
          <isolate
            :chartId="chartId"
            :chartTypeId="chartTypeId"
            :svgHeight="svgCtrlHeight"
            :svgWidth="svgCtrlWidth"
            :chartData="getSampleData(modId, chartTypeId)"
          />
        </v-card>
      </div>
    </v-col>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ChartTypes from '@/components/ChartTypes'
import SampleData from '@/components/SampleData'
import Mod from '@/components/Mod'
import Isolate from '../components/Isolate'

export default {
  components: {
    isolate: Isolate,
    'sample-data': SampleData,
    'chart-mod': Mod,
    'chart-types': ChartTypes
  },
  data: () => ({
    defaultWidth: 800,
    defaultHeight: 600,

    svgCtrlWidthMin: 40,
    svgCtrlHeightMin: 40,

    chartId: 'dflt',
    dataKey: 'scale-test',
    chartTypeId: 'date-line-plot',
    modId: 'dflt',
    currentMod: { mods: [] },
    scaling: [],
    onboarding: 0,
    length: 3,
    dialog: false
  }),
  created: function () {
    // temporary
    this.createTimeseries(
      { key: 'scale-test', numColumns: 3, length: 200 })

    const config = this.getConfig({ id: this.modId })
    this.setChart({
      id: this.chartId,
      config: config,
      chartTypeId: this.chartTypeId,
      width: this.defaultWidth,
      height: this.defaultHeight
    })

    this.setRefreshChart({ chartId: this.chartId, value: true })
    this.length = this.numMods
  },
  computed: {
    ...mapGetters({
      // for combining with mod to make new config
      getDefaultConfig: 'chart/getDefaultConfig',

      // get given config
      getConfig: 'chart/getConfig',

      // get current chart settings associated with chartId
      getChart: 'chart/getChart',

      // get mods currently stored
      getMods: 'chart/getMods',

      // get particular mod
      getMod: 'chart/getMod',

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
    }
  },

  methods: {
    ...mapActions({
      // set a particular config
      setConfig: 'chart/setConfig',

      // set chart characteristics { id: config: height: width: }
      setChart: 'chart/setChart',

      // sets the width and height dimensions
      setDims: 'chart/setDims',

      // flag a particular chart to refresh via watch in Isolate
      setRefreshChart: 'chart/setRefreshChart',

      // apply scaling parameters
      scaleMod: 'chart/scaleMod',

      // this is temporary
      createTimeseries: 'sample/createTimeseries'
    }),

    refreshChart () {
      this.setRefreshChart({ chartId: this.chartId, value: true })
    },

    applyMods (modId) {
      /* applyMods
       * config: either modId or default
       * modId: typically selected from the list
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
            id: this.chartId,
            config: config,
            height: this.svgCtrlHeight,
            width: this.svgCtrlWidth,
            chartTypeId: this.chartTypeId
          }
        )
        this.refreshChart()
      }
    },

    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
      this.modId = this.getModIds[this.onboarding]
      this.currentMod = this.getMod({ id: this.modId })
      this.applyMods(this.modId)
      this.updateData()
      this.setRefreshChart({ chartId: this.chartId, value: true })
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
      this.modId = this.getModIds[this.onboarding]
      this.currentMod = this.getMod({ id: this.modId })
      this.applyMods(this.modId)
      this.updateData()
      this.setRefreshChart({ chartId: this.chartId, value: true })
    },

    updateData () {
      // sampleData in mod, update data
      const mod = this.currentMod
      if (mod.sampleData !== undefined && mod.sampleData !== null) {
        // force to timeseries for the moment
        const sampleData = JSON.parse(JSON.stringify(mod.sampleData))
        this.createTimeseries({
          key: 'date-line-plot',
          numColumns: sampleData.ts.columns,
          length: sampleData.ts.length
        })
        this.refreshChart()
      }
    },

    combineMods (config, mods, colors) {
      var params = JSON.parse(JSON.stringify(config))
      colors = JSON.parse(JSON.stringify(colors))

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
       * NOTE: DUPE WARNING, COPY IN Scaling: decide permanent home
       * select the data appropriate for both the mod and chart type.
       * stored in sample/data by key
       * Options:
       *   mod has no sampleData option
       *     use the default key for the chart type
       *   mod has a specific key for the chart type
       *     ex. sampleData: { 'date-line-plot': 'ts3' }
       *     use getData with that key
       */
      let modObj = this.getMod({ id: modId })
      const dfltData = this.getData({ key: this.dataKey })

      if (modObj !== undefined && modObj !== null) {
        modObj = JSON.parse(JSON.stringify(modObj))
        if (modObj.sampleData[this.chartTypeId] !== undefined) {
          const dataKey = modObj.sampleData[this.chartTypeId]
          return JSON.parse(JSON.stringify(this.getData({ key: dataKey })))
        } else {
          // go with default
          return dfltData
        }
      }
    }
  }
}
</script>
