
<template>
  <v-container fluid :id=id class="ma-0 pa-0" style="border: 1px solid white; justify-content: center;">
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { D3DateLinePlot } from '@/classes/D3/D3DateLinePlot'
// import drawAxes from './draw_axes'
// import drawTitle from './draw_title'
//
// import DotLabel from '@/classes/D3DotLabel.class'
// import Legend from '@/classes/D3Legend.class'

export default {
  // props: [
  //   'ts',
  //   'params',
  //   'id'],
  data () {
    return {
      id: 'test',
      chartParams: {
        styles: [['background', '#9a9a9a']],
        className: 'chart',
        panel: {
          top: 60,
          bottom: 60,
          right: 40,
          left: 40,
          className: 'panel',
          styles: [
            ['fill', '#232323']
          ]
        },
        margin: { top: 0.0, right: 0.0, bottom: 0.0, left: 0.0 },
        titles: [
          {
            text: 'My Title Here',
            x: '50%',
            y: 25,
            styles: [
              ['font-size', 24],
              ['fill', '#999999']
            ]
          },
          {
            text: 'Whoa! subtitles',
            x: '50%',
            y: 45,
            styles: [
              ['font-size', 14],
              ['fill', '#888888']
            ]
          }
        ]
      },
      colors: ['blue', 'green', 'red', 'purple'],
      xlabel: null,
      ylabel: null,
      currentDisplay: null,
      useLegend: true,
      drawVerticalLine: false,
      legendHeight: 20
    }
  },
  mounted: function () {
    console.log('starting mounted')
    this.createTimeseries({ key: 'ts1', numColumns: 3, length: 200 })
    if (this.getConfig({ id: this.id }) !== undefined) {
      this.chartParams = this.getConfig({ id: this.id })
    }
    if (this.chartParams !== null || this.chartParams !== undefined) {
      this.applyDefaults()
      this.setSvgDims()
      this.currentDisplay = this.displayType(
        this.windowSizes()[0])
      window.addEventListener('resize', this.handleWindowResize)
    }
    this.drawChart()
  },
  watch: {
    id: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.chartParams = this.getConfig({ id: newData })
        console.log('chartParams', this.chartParams)
      }
    }
    // chartParams: function (newData) {
    //   console.log('DateLinePlot:watch:background: newData', newData)
    //   console.log('background', newData.plot.background)
    // },

    // svgWidth: function (newData) {
    //   this.drawChart()
    // }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  computed: {
    ...mapGetters({
      getConfig: 'chart/getConfig',
      getTs: 'sample/getTs'
    })
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      createTimeseries: 'sample/createTimeseries',
      applyConfigPrices: 'prices/applyConfigPrices'
    }),
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
      if (this.chartParams.margin !== undefined) {
        const margin = this.chartParams.margin
        var dims = this.windowSizes()
        this.svgWidth = dims[0] * (1 - margin.left - margin.right)
        this.svgHeight = dims[1] * (1 - margin.top - margin.bottom)
      }
    },
    windowSizes () {
      var width = null
      var height = null
      if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
        console.log('using innerWidth and Height')
        // this requires 18 otherwise it overflows. Why?
        width = window.innerWidth - 18

        height = window.innerHeight * 0.7
      } else {
        console.log('using clientWidth and Height')
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
      this.setPlotDims()
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
    setPlotDims () {
    // to minimize computations: uses defaults in params data
      const panel = this.chartParams.panel
      this.leftOffset = panel.left
      this.rightOffset = panel.right
      this.topOffset = panel.top
      this.bottomOffset = panel.bottom
      this.plotWidth = this.svgWidth - this.leftOffset - this.rightOffset
      this.plotHeight = this.svgHeight - this.topOffset - this.bottomOffset
      // where did this magic number come from?
      this.axisXWidth = this.plotWidth // - 60
    },
    createTranslate (leftValues, topValues) {
      const prefix = 'translate( '
      return prefix + leftValues + ', ' + topValues + ' )'
    },
    applyDefaults () {
      // figure out about observable problem
      for (var key in this.params) {
        if (key !== 'undefined') {
          this[key] = this.params[key]
        }
      }
    },
    drawChart () {
      // supporting functions
      console.log('starting drawChart')

      var ts = this.getTs
      console.log('ts', ts)
      var base = this.$d3.select(this.$el)
      const chartClassName = 'chart'

      base.selectAll('*').remove()

      console.log(this.chartParams)
      var plot = new D3DateLinePlot(this.chartParams)
      plot.ts = ts

      console.log('plot', plot)
      // var sizes = this.windowSizes()

      var svg = plot.createSvg(
        base, chartClassName, this.svgWidth, this.svgHeight)
      // plot.addPanels(svg, this.svgHeight, this.svgWidth)
      // plot.addTitles(svg)
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
