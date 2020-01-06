
<template>
  <v-container fluid :id=id class="ma-0 pa-0" style="border: 1px solid white; justify-content: center;">
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { D3DateLinePlot } from '@/classes/D3/D3DateLinePlot'
// import drawAxes from '@/components/draw_axes'
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
        styles: [['background', '#eee']],
        className: 'chart',
        panel: {
          top: 60,
          bottom: 70,
          right: 60,
          left: 60,
          className: 'panel',
          styles: [
            ['fill', '#ccc']
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
            text: 'Subtitle',
            x: '50%',
            y: 45,
            styles: [
              ['font-size', 14],
              ['fill', '#888888']
            ]
          }
        ],
        axes: {
          xAxis: {
            scaleFactor: 0.05,
            label: {
              className: 'axisLabel',
              text: 'xlabel goes here',
              fill: 'black',
              offset: 0.5,
              styles: [
                ['font-size', 15],
                ['font-weight', 300]
              ]
            },
            ticks: 5,
            styles: []
          },
          yAxis: {
            label: {
              className: 'axisLabel',
              text: 'ylabel goes here',
              fill: 'black',
              // fontWeight: 400,
              // fontSize: 10,
              offset: 0.4,
              styles: [
                ['font-size', 15],
                ['font-weight', 300]
              ]
            },
            ticks: 5,
            styles: [
            ]
          },
          yRightAxis: {
            label: {
              className: 'axisLabel',
              text: '',
              fill: 'black',
              offset: 0.25,
              styles: []
            },
            ticks: 5,
            styles: [
            ]
          },
          grids: {
            horizontal: {
              className: 'horizontalGrid',
              stroke: 'black',
              strokeWidth: '1.0',
              opacity: 0.1
            },
            vertical: {
              className: 'verticalGrid',
              stroke: 'black',
              strokeWidth: '1.0',
              opacity: 0.1
            }
          }
        },
        data: {
          path: {
            className: 'series',
            // stroke: not implemented here
            strokeWidth: 3.0
            // dots go here
          }
        }
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
      console.log('starting drawChart')

      // supporting functions
      // get ClosestX
      // get ClosestY
      // is MouseInPlot

      var ts = this.getTs
      var base = this.$d3.select(this.$el)
      const chartClassName = 'chart'

      base.selectAll('*').remove()

      var plot = new D3DateLinePlot(
        { d3: this.$d3, ts: this.getTs, ...this.chartParams })

      var svg = plot.createSvg(
        base, chartClassName, this.svgWidth, this.svgHeight)
      plot.buildChart(svg, this.svgHeight, this.svgWidth)

      // preparation for axes
      // --------------------------------------------
      // calculate scales
      const yMin = ts.minValue()
      const yMax = ts.maxValue()

      // scaling functions
      var parseTime = this.$d3.timeParse('%Y-%m-%d')
      const xMin = ts.startDate()
      const xMax = ts.endDate()
      var scaleX = this.$d3.scaleTime()
        .domain([parseTime(xMin), parseTime(xMax)])
        .range([0, this.svgWidth - this.chartParams.panel.left - this.chartParams.panel.right])

      // axes labeling
      var dateRange = xMin + '  --  ' + xMax
      console.log('dateRange', dateRange)
      plot.axes.xAxis.label.text = dateRange
      var scaleY = this.$d3.scaleLinear()
        .domain([yMin, yMax])
        .range([this.svgHeight - this.chartParams.panel.top - this.chartParams.panel.bottom, 0])

      var colorScale = this.$d3.scaleSequential(
        this.$d3.interpolateRainbow)
        .domain([0, ts.columns.length])

      console.log('scaleX', scaleX)
      console.log('scaleY', scaleY)
      console.log('colorScale', colorScale)

      // drawAxes(this, svg, scaleX, scaleY)
      plot.addAxes(
        this.$d3,
        svg,
        scaleX,
        scaleY,
        this.svgHeight,
        this.svgWidth
      )
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
