<template>
  <v-container fluid>
    <div width="260">
        <v-select v-model="chartTypeId"
          :items="chartList"
          label="Chart Types"
        ></v-select>
   </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    chartId: String
  },
  data: () => ({
    // default
    chartTypeId: 'date-line-plot'
  }),
  watch: {
    chartTypeId: function (newData) {
      if (newData !== null & newData !== undefined) {
        this.setChartType({ chartId: this.chartId, chartTypeId: newData })
      }
    }
  },
  computed: {
    ...mapGetters({
      getChartTypes: 'chart/getChartTypes',
      getChart: 'chart/getChart'
    }),
    chartList () {
      return Object.keys(this.getChartTypes)
    }
  },
  methods: {
    ...mapActions({
      setChartType: 'chart/setChartType'
    })
  }
}
</script>
