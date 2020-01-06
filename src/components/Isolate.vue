
<template>
  <v-container>
    <div
      fluid
      :id=id
      class="ma-0 pa-0"
      style="justify-content: center;"
    >
    <div class="chart"></div>
    </div>
    <v-btn>
      <v-btn
        text
        color="primary"
        @click="setDark()"
      >
        Dark
      </v-btn>
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { D3DateLinePlot } from '@/classes/D3/D3DateLinePlot'

export default {
  // props: [
  //   'ts',
  //   'params',
  //   'id'],
  data () {
    return {
      id: 'test',
      currentDisplay: null,
      params: null
    }
  },
  mounted: function () {
    this.createTimeseries({ key: 'ts1', numColumns: 3, length: 200 })
    this.setSvgDims()
    this.currentDisplay = this.displayType(
      this.windowSizes()[0])
    window.addEventListener('resize', this.handleWindowResize)
    if (this.params === null || this.params === undefined) {
      console.log('attempting to load default config')
      this.params = this.getDefaultConfig
    }
  },
  watch: {
    id: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.chartParams = this.getConfig({ id: newData })
        console.log('chartParams', this.chartParams)
      }
    },
    params: function (newData) {
      if (newData !== null || newData !== undefined) {
        console.log('params', newData)
        this.drawChart()
      }
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getDefaultConfig: 'chart/getDefaultConfig',
      getTs: 'sample/getTs'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      createTimeseries: 'sample/createTimeseries',
      applyConfigPrices: 'prices/applyConfigPrices'
    }),
    setDark () {
      const changes = [
        { path: 'panel.styles.fill', value: '#333' },
        { path: 'axes.xAxis.stroke', value: 'white' },
        { path: 'axes.yAxis.stroke', value: 'white' },
        { path: 'axes.yRightAxis.stroke', value: 'white' },

        { path: 'axes.xAxis.label.font-color', value: 'white' },
        { path: 'axes.yAxis.label.font-color', value: 'white' },
        { path: 'axes.yRightAxis.label.font-color', value: 'white' }
      ]
      changes.forEach(change => {
        var curLocation = this.params
        change.path.split('.').forEach((node) => {
          curLocation = curLocation[node]
        })

        if (Array.isArray(curLocation)) {
          curLocation.push(change.value)
        } else {
          curLocation = change.value
        }
        //         this.params = {}
      })
    },
    setParent () {
      if (this.parentId === undefined) {
        this.parent = {
          offsetHeight: window.innerHeight * 0.9,
          offsetWidth: window.innerWidth * 0.9
        }
      } else {
        this.parent = document.querySelector('#' + this.parentId)
      }
    },
    setSvgDims () {
      var dims = this.windowSizes()
      this.svgWidth = dims[0]
      this.svgHeight = dims[1]
    },
    windowSizes () {
      var width = null
      var height = null
      if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
        // this requires 18 otherwise it overflows. Why?
        width = window.innerWidth - 18
        height = window.innerHeight * 0.7
      } else {
        width = document.documentElement.clientWidth
        height = document.documentElement.clientHeight
      }
      return [width, height]
    },
    handleWindowResize (event) {
      var dispType = this.displayType(this.windowSizes()[0])
      if (this.isBreakpoint(this.currentDisplay, dispType)) {
        this.currentDisplay = dispType
      }
      this.setSvgDims()
      this.drawChart()
    },
    displayType (width) {
      /*
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
      const chartClassName = 'chart'

      base.selectAll('*').remove()

      var plot = new D3DateLinePlot(
        { d3: this.$d3, ts: this.getTs, ...this.params })

      var svg = plot.createSvg(
        base, chartClassName, this.svgWidth, this.svgHeight)
      plot.buildChart(svg, this.svgHeight, this.svgWidth)
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
