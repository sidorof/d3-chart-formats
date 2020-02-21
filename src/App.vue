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
            <chart-view v-if="tab === 1"/>
            <scaling-app v-if="tab === 2"/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ThemeView from './views/ThemeView'
import ChartView from './views/ChartView'
import Scaling from './views/Scaling'

export default {
  name: 'App',
  components: {
    'theme-view': ThemeView,
    'chart-view': ChartView,
    'scaling-app': Scaling
  },
  data: () => ({
    tab: 2,
    items: [
      'Explore Themes', 'Explore Chart Types', 'Explore Scaling'
    ]
  }),
  created () {
    this.createSampleData()
  },
  computed: {
    ...mapGetters({
      getDefaultConfig: 'chart/getDefaultConfig',
      getMod: 'chart/getMod',
      getChartType: 'chart/getChartType'
    })
  },
  methods: {
    ...mapActions({
      setCurrentMod: 'chart/setCurrentMod',
      setCurrentChartType: 'chart/setCurrentChartType',
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
      this.createTimeseries({ key: 'ts4', numColumns: 1, length: 6 })

      // error bars - just use numColumns as a multple of 3
      // timeseries long
      // timeseries short

      // x y data
      // this.createLabeledData({ key: 'xy1', numColumns: 7, length: 200 })
      // this.createLabeledData({ key: 'xy2', numColumns: 2, length: 15 })

      // pie data
      this.createLabeledData(
        { key: 'pie-plot', numColumns: 7, length: 1, onlyPositive: true })
      // this.createLabeledData({ key: 'labeled1', numColumns: 3, length: 1 })
      // this.createLabeledData({ key: 'labeled2', numColumns: 25, length: 1 })

      // network diagrams
    }
  }
}
</script>
