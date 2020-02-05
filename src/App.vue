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
  mounted () {
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
      createTimeseries: 'sample/createTimeseries'
    }),
    createSampleData () {
      // timeseries long
      this.createTimeseries({ key: 'ts1', numColumns: 3, length: 200 })

      // timeseries short
      this.createTimeseries({ key: 'ts2', numColumns: 3, length: 15 })
      // timeseries long with error bars
      // timeseries short with error bars
      // x y data
      // pie data
      // network diagrams
    }
  }
}
</script>
