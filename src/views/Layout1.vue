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

        <v-divider/>

        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(modId, i) in getModIds"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="modId"
                  @click="applyMods(getDefaultConfig, modId)"
                  ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        {{ scaling }}
        <v-card
            class="mx-auto"
            tile
        >
          here I am
          <v-list-item
            v-for="(mod, i) in scaling"
            :key="i"
            two-line
          >
            <v-list-item-content>
              <v-list-item-title>{{ mod.path }}</v-list-item-title>
              <v-list-item-subtitle>{{ mod.value }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>

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

    svgHeight: '250',
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
    // scaling: function (newData, oldData) {
    //   console.log('watch:scaling triggered')
    //   console.log('newData, oldData', newData, oldData)
    //   console.log(typeof newData)
    //   console.log('newData.length', newData.length, typeof newData[0])
    //   console.log('Object.getOwnPropertyNames(a)', Object.getOwnPropertyNames(newData))
    //
    //   if (newData.toString() !== oldData.toString()) {
    //     var config
    //     // this is to be used if difficulty backtracking
    //     //   if (this.modId !== null) {
    //     //     const mods = this.getMod({ id: this.modId })
    //     config = this.combineMods(this.getCurrentConfig, newData.slice())
    //     this.setConfig({ id: 'currentConfig', ...config })
    //     this.setRefreshChart({ value: true })
    //     console.log('i am here')
    //   }
    // },
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
      console.log('applyMods: modId', modId)
      config = JSON.parse(JSON.stringify({ ...config }))
      if (modId !== undefined && modId !== null) {
        if (modId === 'default') {
          this.setConfig(
            {
              id: 'currentConfig',
              ...this.getDefaultConfig
            }
          )
          console.log('set with default config')
          this.refreshChart()
        } else {
          this.modId = modId
          const mods = this.getMod({ id: modId })

          config = this.combineMods(config, mods)
          console.log('config', config)
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
        } else {
          console.log('mod skipped', mod)
        }
      })
      return params
    },

    getScaleBreaks () {
      var scaling = []
      const modScales = this.getCurrentConfig.scale

      if (modScales !== undefined) {
        console.log('modScales', modScales)
        modScales.map((scale) => {
          if (scale.width !== undefined && scale.width >= this.svgWidth) {
            scaling.push(scale.paths)
            console.log('adding to scaling')
          }
          if (scale.height !== undefined && scale.height >= this.svgHeight) {
            scaling.push(scale.paths)
            console.log('adding to scaling')
          }
        })
      }
      if (scaling.length > 0) {
        console.log('scaling is', scaling)
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
        console.log('posting change', change)
        const branch = change.path.split('.').slice(0, -1)
        const leaf = change.path.split('.').slice(-1)
        var part = this.params
        for (var i = 0; i < branch.length; i++) {
          console.log('branch[i]', branch[i])
          part = part[branch[i]]
        }
        console.log('part', part)
        part[leaf] = change.value
      })
      console.log('params', this.params)
      this.setConfig({ id: 'currentConfig', ...this.params })
      this.$nextTick(() => {
        this.$vuetify.goTo(0)
      })
    }
  }
}
</script>
