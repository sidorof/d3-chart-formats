<template>
  <v-container fluid class="mt-5 ml-5 justify-content-center d-flex align-items-center">
    <v-row>
      <v-col cols="12" v-if="getMods !== undefined">
        <v-row
          align="center"
          justify="center"
        >
        <v-card
          justify-center
          :height=startHeight
          color="grey"
          flat
          tile
          outlined

          v-for="(modId, i) in getModIds"
          :key="i"
          dark
          class="ma-2"
        >
          <span secondary class="black--text">
            <v-card-title>{{ modId }}</v-card-title>
            <v-card-subtitle
              class="black--text"
            >
              {{getMod({ id: modId }).desc }}
            </v-card-subtitle>
          </span>
          <isolate
            :chartId="modId"
            :chartTypeId="chartTypeId"
            :svgHeight="svgHeight"
            :svgWidth="svgWidth"
          />
        </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import ChartTypes from '@/components/ChartTypes'
import Isolate from '../components/Isolate'

export default {
  components: {
    isolate: Isolate // ,
    // 'chart-types': ChartTypes
  },
  data: () => ({
    justify: [
      'start',
      'end',
      'center',
      'space-between',
      'space-around'
    ],
    startHeight: 490,
    svgHeight: 400,
    svgWidth: 600,
    chartTypeId: 'date-line-plot'
  }),
  mounted: function () {
    const config = JSON.parse(
      JSON.stringify(this.getDefaultConfig))

    for (const modId in this.getMods) {
      const modObj = JSON.parse(
        JSON.stringify(this.getMod({ id: modId })))
      modObj.colors = modObj.colors !== undefined ? modObj.colors : {}
      let mconfig = this.combineMods(config, modObj.mods, modObj.colors)
      this.setConfig({ id: modId, ...mconfig })
      this.setConfig({ ...mconfig, id: modId })
      this.setChart(
        {
          id: modId,
          config: mconfig,
          height: this.svgHeight,
          width: this.svgWidth,
          chartTypeId: this.chartTypeId
        }
      )
      this.setRefreshChart({ id: modId, value: true })
    }
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
      getMod: 'chart/getMod'
    }),
    getModIds () {
      // NOTE: this is a dupe
      return Object.keys(this.getMods)
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setChart: 'chart/setChart',
      setRefreshChart: 'chart/setRefreshChart'
    }),
    combineMods (config, mods, colors) {
      // NOTE: THIS IS ALSO A DUPE, FIND A COMMON HOME
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
    }
  }
}
</script>
