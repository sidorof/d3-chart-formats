<template>
  <div class="mt-5">
  <v-row>
    <v-col cols="3">
      <v-card width="300" style="padding: 0px;">
        <v-slider
          dense
          v-model="svgHeight"
          small
          label="Height"
          min="40"
          max="1000"
          hint="Control the height in pixels of the plot"
          thumb-label="always"
          thumb-size="24"
          @click="refreshChart()"
        >
        </v-slider>
        <v-slider
          dense
          v-model="svgWidth"
          label="Width"
          min="40"
          max="1800"
          thumb-label="always"
          thumb-size="24"
          hint="Control the width in pixels of the plot"
          @click="refreshChart()"
        >
        </v-slider>
      </v-card>
    </v-col>
    <v-col cols="9">
    <div>
      <v-card
        justify-center
        :height="svgHeight"
        :width="svgWidth"
        color="grey lighten-2"
        flat
        tile
        outlined
      >
        <isolate
          :startHeight="svgHeight"
          :startWidth="svgWidth"
          :params="params"
          />
      </v-card>
    </div>
    </v-col>
  </v-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Isolate from '../components/Isolate'

export default {
  components: {
    isolate: Isolate
  },
  props: {
    params: Object
  },
  data: () => ({
    justify: [
      'start',
      'end',
      'center',
      'space-between',
      'space-around'
    ],
    svgWidth: '800',
    svgWidthMin: '40',
    svgWidthMax: '1200',

    svgHeight: '600',
    svgHeightMin: '40',
    svgHeightMax: '1000',

    modId: null,
    scaling: []
  }),
  mounted: function () {
    window.addEventListener('resize', this.handleWindowResize)
    this.setRefreshChart({ value: true })
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  watch: {
    svgWidth: function (newData) {
      // this.getScaleBreaks()
    },
    svgHeight: function (newData) {
      // this.getScaleBreaks()
    }
  },
  computed: {
    ...mapGetters({
      getDefaultConfig: 'chart/getDefaultConfig',
      getCurrentConfig: 'chart/getCurrentConfig',
      getMods: 'chart/getMods',
      getMod: 'chart/getMod'
    }),
    calcHeight () {
      return (this.svgHeightMax - this.svgHeight).toString()
    },
    getModIds () {
      return Object.keys(this.getMods)
    }
  },

  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setRefreshChart: 'chart/setRefreshChart',
      setMods: 'chart/setMods',
      scaleMod: 'chart/scaleMod'
    }),

    refreshChart () {
      this.applyMods(this.getDefaultConfig, this.modId)
      this.scaleMod({ width: this.svgWidth, height: this.svgHeight })
      this.setRefreshChart({ value: true })
    },

    applyMods (config, modId) {
      /* applyMods
       * config: either current or default
       * modId: typically selected from the list
       */
      config = JSON.parse(JSON.stringify({ ...config }))
      if (modId !== undefined && modId !== null) {
        if (modId === 'default') {
          this.setConfig(
            {
              id: 'currentConfig',
              ...this.getDefaultConfig
            }
          )
          this.refreshChart()
        } else {
          this.modId = modId
          const mods = this.getMod({ id: modId })

          config = this.combineMods(config, mods)
          this.setConfig({ id: 'currentConfig', ...config })
        }
        this.refreshChart()
      }
    },

    combineMods (config, mods) {
      var params = { ...config }

      mods.forEach((mod) => {
        if (mod.path !== undefined) {
          const branch = mod.path.split('.').slice(0, -1)
          const leaf = mod.path.split('.').slice(-1)
          var part = params
          for (var i = 0; i < branch.length; i++) {
            part = part[branch[i]]
            part[leaf] = mod.value
          }
        }
      })
      return params
    },

    getScaleBreaks () {
      var scaling = []
      const modScales = this.getCurrentConfig.scale

      if (modScales !== undefined) {
        modScales.map((scale) => {
          if (scale.width !== undefined && scale.width >= this.svgWidth) {
            scaling.push(scale.paths)
          }
          if (scale.height !== undefined && scale.height >= this.svgHeight) {
            scaling.push(scale.paths)
          }
        })
      }
      this.scaling = scaling
      return scaling
    },

    setDark () {
      const changes = [
        { path: 'panel.styles.fill', value: '#333' },

        { path: 'axes.xAxis.styles.fill', value: 'white' },
        { path: 'axes.yAxis.styles.fill', value: 'white' },
        { path: 'axes.yRightAxis.styles.fill', value: 'white' },

        { path: 'axes.xAxis.stroke', value: 'white' },
        { path: 'axes.yAxis.stroke', value: 'white' },
        { path: 'axes.yRightAxis.stroke', value: 'white' },

        { path: 'axes.xAxis.label.fill', value: 'white' },
        { path: 'axes.yAxis.label.fill', value: 'white' },
        { path: 'axes.yRightAxis.label.fill', value: 'white' }
      ]
      changes.forEach(change => {
        const branch = change.path.split('.').slice(0, -1)
        const leaf = change.path.split('.').slice(-1)
        var part = this.params
        for (var i = 0; i < branch.length; i++) {
          part = part[branch[i]]
        }
        part[leaf] = change.value
      })

      this.setConfig({ id: 'currentConfig', ...this.params })
      this.$nextTick(() => {
        this.$vuetify.goTo(0)
      })
    }
  }
}
</script>
