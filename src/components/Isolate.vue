<template>
  <v-card
    :id=id
    class="ma-0 pa-0"
    style="justify-content: center;"
    :height="svgHeight"
    :width="svgWidth"
  >
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    'chartId': String,
    'svgHeight': Number,
    'svgWidth': Number
  },

  data: () => ({
    id: 'test',
    currentDisplay: null,
    params: null,
    ChartClass: null
  }),

  mounted: function () {
    if (this.chartId !== undefined && this.chartId !== null) {
      let chart = this.getChart({ id: this.chartId })
      if (chart !== undefined) {
        chart = JSON.parse(JSON.stringify(chart))
        this.ChartClass = this.getChartType({ id: chart.chartTypeId })
          .ChartClass
        this.drawChart()
      }
    }
    window.addEventListener('resize', this.handleWindowResize)
  },
  watch: {
    chartId: function (newData) {
      if (newData !== undefined && this.chartId !== null) {
        const chart = JSON.parse(
          JSON.stringify(this.getChart({ id: this.chartId })))
        this.ChartClass = this.getChartType({ id: chart.chartTypeId })
          .ChartClass
        this.drawChart()
      }
    },
    getTs: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.drawChart()
      }
    },
    svgHeight: function (newData) {
      this.drawChart()
    },
    svgWidth: function (newData) {
      this.drawChart()
    },

    initChart: function (newData) {
      newData = JSON.parse(JSON.stringify(newData))
      this.ChartClass = this.getChartType({ id: newData.chartTypeId })
        .ChartClass
      this.drawChart()
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getChart: 'chart/getChart',
      getChartType: 'chart/getChartType',
      getDefaultConfig: 'chart/getDefaultConfig',
      getRefreshCharts: 'chart/getRefreshCharts',
      getTs: 'sample/getTs'
    }),
    initChart () {
      return this.getChart({ id: this.chartId })
    },
    getParams () {
      const chart = this.getChart({ id: this.chartId })
      return this.getConfig({ id: chart.configId })
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setChart: 'chart/setChart',
      setDims: 'chart/setDims',
      setRefreshChart: 'chart/setRefreshChart',
      applyConfigPrices: 'prices/applyConfigPrices'
    }),
    refreshChart () {
      const chart = JSON.parse(
        JSON.stringify(this.getChart({ id: this.chartId })))
      this.params = chart.config
      this.ChartClass = this.getChartType({ id: chart.chartTypeId })
        .ChartClass
      this.currentDisplay = this.displayType(this.windowSizes()[0])
      this.drawChart()
    },
    setSvgDims () {
      this.setChart(
        {
          ...this.getChart({ id: this.chartId }),
          width: this.svgWidth,
          height: this.svgHeight
        }
      )
      this.setRefreshChart({ chartId: this.chartId, value: true })
    },
    windowSizes () {
      const rect = this.$el.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      this.$nextTick(() => {
        this.$vuetify.goTo(0)
      })
      return [width, height]
    },
    handleWindowResize (event) {
      if (this.windowSizes()[0] !== 0) {
        var dispType = this.displayType(this.windowSizes()[0])
        if (this.isBreakpoint(this.currentDisplay, dispType)) {
          this.currentDisplay = dispType
        }
        this.setSvgDims()
        this.drawChart()
      }
    },
    displayType (width) {
      /*
      I believe there is an update in vuetify that helps this
      xs - extra small viewport devices (< 576px)
      sm - small viewport devices (< 768px)
      md - medium viewport devices (< 992px)
      lg - large viewport devices (< 1200px)
      xl - extra large viewport devices (> 1200px)
      */
      var type
      if (width < 576) {
        type = 'xs'
      } else if (width < 768) {
        type = 'sm'
      } else if (width < 992) {
        type = 'md'
      } else if (width < 1200) {
        type = 'lg'
      } else {
        type = 'xl'
      }
      return type
    },
    isBreakpoint (oldVal, newVal) {
      // xs - extra small viewport devices (< 576px)
      // sm - small viewport devices (< 768px)
      // md - medium viewport devices (< 992px)
      // lg - large viewport devices (< 1200px)
      // xl - extra large viewport devices (> 1200px)
      return oldVal !== newVal
    },
    drawChart () {
      const chart = JSON.parse(
        JSON.stringify(this.getChart({ id: this.chartId })))
      if (this.svgWidth !== null && this.svgHeight !== null) {
        var base = this.$d3.select(this.$el)
        const chartClassName = 'chart ma-0 pa-0'

        base.selectAll('*').remove()
        const ChartClass = this.getChartType({ id: chart.chartTypeId })
          .ChartClass
        var plot = new ChartClass(
          { d3: this.$d3, ts: this.getTs, ...chart.config })

        var svg = plot.createSvg(
          base, chartClassName, this.svgWidth, this.svgHeight)
        plot.buildChart(svg, this.svgHeight, this.svgWidth)
      }
    }
  }
}
</script>

<style>
svg {

}

svg .title {
  font-size: 20px;
  color: blue;
}
</style>
