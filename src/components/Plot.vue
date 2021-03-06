<template>
  <v-card
    :id=id
    class="ma-0 pa-0"
    style="justify-content: center;"
    :height="svgHeight"
    :width="svgWidth"
    :chartData="chartData"
  >
  </v-card>
</template>

<script>
/* Plot
props received:
  chartId: the id of the chart as in store.charts[id]
  svgHeight: height of the svg node created
  svgWidth: width of the svg node created
  chartData: the data that is expressed in the chart

  It is expected that the chartId would not change.

  The other props should be reactive.

  NOTE:
  One ambiguity, the dimensions have two sources of truth
  at the moment, embedded in the chartObj and passed in as props.
  This needs to be resolved. Note that dimensions are also
  modified by changes in windowSizes.
*/
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    chartId: String,
    svgHeight: Number,
    svgWidth: Number,
    chartData: Object
  },

  data: () => ({
    id: 'test',
    currentDisplay: null,
    params: null,
    ChartClass: null
  }),
  mounted: function () {
    window.addEventListener('resize', this.handleWindowResize)
  },
  watch: {
    getChartParams: function (newData) {
      if (newData !== undefined) {
        this.drawChart()
      }
    },

    refreshChartFlag: function (newData) {
      if (newData !== undefined) {
        this.ChartClass = this.getChartType({ id: this.chartTypeId })
          .ChartClass
        this.drawChart()
      }
    },
    svgHeight: function (newData) {
      this.drawChart()
    },
    svgWidth: function (newData) {
      this.drawChart()
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  computed: {
    ...mapGetters({
      getChart: 'chart/getChart',
      getChartType: 'chart/getChartType',
      getDefaultConfig: 'chart/getDefaultConfig',
      getRefreshCharts: 'chart/getRefreshCharts',
      getRefreshChart: 'chart/getRefreshChart'
    }),
    refreshChartFlag () {
      return this.getRefreshChart({ id: this.chartId })
    },
    chartTypeId: {
      get () {
        if (this.$store.state.chart.charts[this.chartId] !== undefined) {
          return this.$store.state.chart.charts[this.chartId].chartTypeId
        } else {
          return null
        }
      }
    },
    getChartParams () {
      return this.getChart({ id: this.chartId })
    }
  },
  methods: {
    ...mapActions({
      setChart: 'chart/setChart',
      setDims: 'chart/setDims',
      setRefreshChart: 'chart/setRefreshChart',
      applyConfigPrices: 'prices/applyConfigPrices'
    }),
    refreshChart () {
      const chart = JSON.parse(
        JSON.stringify(this.getChart({ id: this.chartId })))
      this.params = chart.config
      this.ChartClass = this.getChartType({ id: this.chartTypeId })
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
      var base = this.$d3.select(this.$el)
      base.selectAll('*').remove()
      const chartClassName = 'chart ma-0 pa-0'

      const chart = JSON.parse(
        JSON.stringify(this.getChartParams))

      if (
        this.svgWidth !== null &&
        this.svgHeight !== null &&
        chart.config !== undefined) {
        const chartData = JSON.parse(JSON.stringify(this.chartData))

        const ChartClass = this.getChartType({ id: chart.chartTypeId })
          .ChartClass
        var plot = new ChartClass(
          {
            d3: this.$d3,
            chartData: chartData,
            ...chart.config
          }
        )

        var svg = plot.createSvg(
          base, chartClassName, this.svgWidth, this.svgHeight)
        plot.buildChart(svg, this.svgHeight, this.svgWidth)
        this.setRefreshChart({ id: this.chartId, value: false })
      }
    }
  }
}
</script>
