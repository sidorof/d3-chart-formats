<template>
  <v-container
    fluid
    class="mt-0 pt-0"
  >
    <v-sheet
      :max-width="getMaxWidth"
    >
      <v-slide-group
        mandatory
        show-arrows
        center-active
     >
        <v-slide-item
          v-for="chartType in getChartTypeList"
          :key="chartType.id"
          v-slot="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            :v-model="chartType"
            active-class="primary black--text"
            style="background-color: #444;"
            depressed
            rounded
            @click="setChartTypeType(chartType, toggle)"
          >
            {{ chartType.id }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    showArrows: true,
    prevIcon: true,
    nextIcon: true,
    active: 2
  }),
  computed: {
    ...mapGetters({
      getChartTypes: 'chart/getChartTypes'
    }),
    getChartTypeList () {
      const chartTypeList = []
      for (const chartTypeId in this.getChartTypes) {
        const chartType = this.getChartTypes[chartTypeId]
        chartTypeList.push({ id: chartTypeId, ...chartType })
      }
      return chartTypeList
    },
    getMaxWidth () {
      return document.documentElement.clientWidth * 0.9
    }
  },
  methods: {
    ...mapActions({
      setCurrentChartType: 'chart/setCurrentChartType'
    }),
    setChartTypeType (chartType, toggle) {
      toggle()
      this.setCurrentChartType(chartType.id)
    }
  }
}
</script>
