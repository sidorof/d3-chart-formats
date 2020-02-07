<template>
  <v-app dark>
  <v-app-bar app>
    <v-tabs v-model="tab">
      <v-tab
        v-for="item in items"
        :key="item"
      >{{ item }}
      </v-tab>
    </v-tabs>
  </v-app-bar>
    <v-content>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card flat>
            <theme-view v-if="tab === 0"/>
            <scaling-app v-if="tab === 1"/>
            <div v-if="tab === 2">Not yet implemented</div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Scaling from './views/Scaling'
import ThemeView from './views/ThemeView'

export default {
  name: 'App',
  components: {
    'scaling-app': Scaling,
    'theme-view': ThemeView
  },
  data: () => ({
    tab: 0,
    items: [
      'Explore Themes', 'Explore Scaling', 'Explore Chart Types'
    ]
  }),
  created () {
    const config = JSON.parse(JSON.stringify(this.getDefaultConfig))
    this.setConfig({ id: 'default', ...config })
    this.createSampleData()
  },
  watch: {
    tab: function (newData) {
      this.setRefreshChart({ id: 'scale-test', value: true })
    }
  },
  computed: {
    ...mapGetters({
      getDefaultConfig: 'chart/getDefaultConfig'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setRefreshChart: 'chart/setRefreshChart',
      createTimeseries: 'sample/createTimeseries',
      createLabeledData: 'sample/createLabeledData'
    }),
    createSampleData () {
      this.createTimeseries(
        { key: 'scale-test', numColumns: 3, length: 200 })
      // timeseries long
      this.createTimeseries(
        { key: 'date-line-plot', numColumns: 3, length: 200 })

      // timeseries short
      this.createTimeseries({ key: 'ts2', numColumns: 3, length: 15 })
      this.createTimeseries({ key: 'ts3', numColumns: 5, length: 6 })

      // error bars - just use numColumns as a multple of 3
      // timeseries long
      // timeseries short

      // x y data
      this.createLabeledData({ key: 'xy1', numColumns: 7, length: 200 })
      this.createLabeledData({ key: 'xy2', numColumns: 2, length: 15 })

      // pie data
      this.createLabeledData({ key: 'labeled1', numColumns: 7, length: 1 })
      this.createLabeledData({ key: 'labeled2', numColumns: 7, length: 1 })

      // network diagrams
    }
  }
}
</script>
