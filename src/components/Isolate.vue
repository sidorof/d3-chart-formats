<template>
  <v-card
    :id=id
    class="ma-0 pa-0"
    style="justify-content: center;"
    :height="startHeight"
    :width="startWidth"
    :params="params"
  >
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { D3DateLinePlot } from '@/classes/D3/D3DateLinePlot'

export default {
  props: [
    'startHeight',
    'startWidth'
    //   'ts',
    // 'params'
    //   'id'
  ],
  data () {
    return {
      id: 'test',
      currentDisplay: null
    }
  },
  mounted: function () {
    this.setSvgDims()
    this.currentDisplay = this.displayType(
      this.windowSizes()[0])
    window.addEventListener('resize', this.handleWindowResize)
  },
  watch: {
    id: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.chartParams = this.getConfig({ id: newData })
      }
    },
    params: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.drawChart()
      }
    },
    getTs: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.drawChart()
      }
    },
    getRefreshChart: function (newData) {
      if (newData) {
        this.setSvgDims()

        this.drawChart()
        this.setRefreshChart({ value: false })
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
      getCurrentConfig: 'chart/getCurrentConfig',
      getRefreshChart: 'chart/getRefreshChart',
      getTs: 'sample/getTs'
    }),
    getDivSize () {
      return [this.svgWidth, this.svgHeight]
    },
    params () {
      return this.getCurrentConfig
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
      setRefreshChart: 'chart/setRefreshChart',
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
      var dims = this.windowSizes()
      this.svgWidth = dims[0]
      this.svgHeight = dims[1]
    },
    windowSizes () {
      var width = null
      var height = null
      // if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
      //   // this requires 18 otherwise it overflows. Why?
      //   width = window.innerWidth - 18
      //   height = window.innerHeight * 0.7
      // } else {
      //   width = document.documentElement.clientWidth
      //   height = document.documentElement.clientHeight
      // }
      width = (this.$el.clientWidth) * 0.97
      height = width * 0.4
      // height = Math.min(
      //   width * 0.5, document.documentElement.clientHeight)

      const rect = this.$el.getBoundingClientRect()
      width = rect.width
      height = rect.height
      this.$nextTick(() => {
        this.$vuetify.goTo(0)
      })
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
      const chartClassName = 'chart ma-0 pa-0'

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
