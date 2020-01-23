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
          thumb-color="#232d6c"
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
          thumb-color="#232d6c"
        >
        </v-slider>
      </v-card>

    <v-card flat tile>
    <v-card-title class="heading text-center">Themes</v-card-title>
      <template>
        <v-card-actions class="justify-space-between">
        <v-col cols="2">
          <v-btn
            text
            @click="prev"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="8">
            <v-card class="text-center">
              <div>
                <v-card-title class="body">
                  {{ modId }}
                </v-card-title>
              </div>
            </v-card>
          </v-col >
          <v-col cols="2">
          <v-btn
            text
            @click="next"
          >
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
          <v-card color="#555" class="ml-2 pl-3">
            <v-card-title class="title" >Modifications to Tree</v-card-title>
            <div v-if="hasColors">
              <div>uses color labels</div>
              <v-col >
              <v-card
                color="#aaa" class="mb-3 mr-4 px-5 black--text"
                v-for="(color, j) in Object.keys(currentMod.colors)"
                :key="j"
              >
                <div> {{ color }}: {{ getColor(currentMod.colors, color)}}</div>

                <v-icon large :color="getColor(currentMod.colors, color)"> mdi-card </v-icon>
              </v-card>
              </v-col>
            </div>
            <div>{{ getMod({ id: modId }).desc }}</div>
            <div
              v-for="(mod, n) in getMod({ id: modId }).mods"
              :key=n
            >
              <v-col >
                <v-card color="#aaa" class="mr-4 px-5 black--text">
                  <div class="body-2">/{{mod.path}}</div>
                  <div >value: {{ mod.value }}</div>
                  <v-icon v-if="asColor(mod.value)" :color="asColor(mod.value)">
                    mdi-card
                  </v-icon>
                </v-card>
              </v-col>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
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

    modId: 'default',
    currentMod: {},
    scaling: [],
    onboarding: 0,
    length: 3
  }),
  mounted: function () {
    window.addEventListener('resize', this.handleWindowResize)
    this.setRefreshChart({ value: true })
    this.length = this.numMods
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWindowResize)
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
    },
    numMods () {
      return this.getModIds.length
    },
    hasColors () {
      if (this.currentMod.colors !== undefined) {
        if (Object.keys(this.currentMod.colors).length > 0) {
          return true
        }
      }
      return false
    }
  },

  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setRefreshChart: 'chart/setRefreshChart',
      setMods: 'chart/setMods',
      scaleMod: 'chart/scaleMod',
      createTimeseries: 'sample/createTimeseries'
    }),

    refreshChart () {
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
          const modObj = this.getMod({ id: modId })
          config = this.combineMods(config, modObj.mods, modObj.colors)
          this.setConfig({ id: 'currentConfig', ...config })
        }
      }
    },

    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
      this.modId = this.getModIds[this.onboarding]
      this.currentMod = this.getMod({ id: this.modId })
      this.applyMods(this.getDefaultConfig, this.modId)
      this.updateData()
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
      this.modId = this.getModIds[this.onboarding]
      this.currentMod = this.getMod({ id: this.modId })
      this.applyMods(this.getDefaultConfig, this.modId)
      this.updateData()
    },

    updateData () {
      // sampleData in mod, update data
      const mod = this.currentMod
      if (mod.sampleData !== undefined && mod.sampleData !== null) {
        // force to timeseries for the moment
        const sampleData = JSON.parse(JSON.stringify(mod.sampleData))
        console.log('sampleData', sampleData)
        this.createTimeseries({
          key: 'ts1',
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
    getColor (colorObj, color) {
      return colorObj[color]
    },
    asColor (value) {
      // doesn't check for color words, only hex
      const strValue = value.toString()
      if (strValue.startsWith('#')) {
        return strValue
      } else {
        return false
      }
    }
  }
}
</script>
