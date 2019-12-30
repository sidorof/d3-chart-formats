<!--

Based on:
  https://bl.ocks.org/shimizu/f90651541575f348a129444003a73467

Links:
  Props: https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props
  Methods: https://vuejs.org/v2/guide/events.html#Method-Event-Handlers

Things to replicate from matplotlib
      title
      legend
  X   colors - one for each line, or generic color scheme
  X   dots for values
      plot margins vs window margins
      line thickness
      grid lines

Nomenclature:
  svg dimensions
  margins are the outer layer
  panels: the areas where xlabel, ylabel would go
    they are outside the axes

  So the zero position for a line should be
    left margin + left panel

Issues:
  messy code
  legend font size is not working
  could look at calculated text widths again
  multiple lines in legend
  load standard functions such as:
    axes
    legends
  panel vs margins is still flaky
  do grid lines

-->

<template>
  <v-container fluid :id=id class="ma-0 pa-0">
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import drawAxes from './draw_axes'
import drawTitle from './draw_title'

import TS from '@/classes/TS.class'
import DotLabel from '@/classes/D3DotLabel.class'
import Legend from '@/classes/D3Legend.class'

export default {
  props: ['ts', 'params', 'id'],
  data () {
    return {
      chartParams: null,
      /*
      margins refer to space around v-container, done as fractions
      panels refer to space inside
      */
      panel: { top: 40, right: 40, bottom: 45, left: 60 },
      margin: { top: 0.01, right: 0.02, bottom: 0.2, left: 0.0 },
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
    this.chartParams = this.getConfig({ id: this.id })
    if (this.chartParams !== null || this.chartParams !== undefined) {
      this.applyDefaults()
      this.setSvgDims()
      this.currentDisplay = this.displayType(
        this.windowSizes()[0])
      window.addEventListener('resize', this.handleWindowResize)
      if (this.ts instanceof TS) {
        this.drawChart()
      }
    }
  },
  watch: {
    id: function (newData) {
      if (newData !== null || newData !== undefined) {
        this.chartParams = this.getConfig({ id: newData })
        console.log('chartParams', this.chartParams)
      }
    },
    chartParams: function (newData) {
      console.log('DateLinePlot:watch:backgroundColor: newData', newData)
      console.log('background', newData.plot.background)
    },

    ts: function (newData) {
      if (this.chartParams !== null || this.chartParams !== undefined) {
        if (newData instanceof TS) {
          this.drawChart()
        }
      }
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
      frequencies: 'chart/frequencies',
      getConfig: 'chart/getConfig'
    }),
    getColumnStrLengths () {
      // move this into class TssDict
      // assumes constrained by the longest column string
      // could also do a designated ts for calc
      var maxLength = 0
      for (const ticker in this.ts) {
        const ts = this.ts[ticker]
        if (maxLength < ts.columns.join().length) {
          maxLength = ts.columns.join().length
        }
      }
      return maxLength
    },
    getUseDots () {
      return this.params.useDots
    },
    calcLegendHeight () {
      // rethink this before finishing
      // switch to tickers?
      // issue if use mixture of daily, lines
      //  and monthly dots for example.
      // have provision for including ticker
      // or not
      const tickers = Object.keys(this.ts)
      return Math.round(tickers.length / 10)
    }
  },
  methods: {
    ...mapActions({
      setConfig: 'chart/setConfig',
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
      this.svgWidth = dims[0] * (1 - this.margin.left - this.margin.right)
      this.svgHeight = dims[1] * (1 - this.margin.top - this.margin.bottom)
    },
    windowSizes () {
      // if (this.chartParams.plot.size.width !== null) {}
      var w = null
      var h = null
      if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
        w = window.innerWidth
        h = window.innerHeight * 0.7
      } else {
        w = document.documentElement.clientWidth
        h = document.documentElement.clientHeight
      }
      return [w, h]
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
      this.leftOffset = this.panel.left
      this.rightOffset = this.panel.right
      this.topOffset = this.panel.top
      this.bottomOffset = this.panel.bottom
      this.plotWidth = this.svgWidth - this.leftOffset - this.rightOffset
      this.plotHeight = this.svgHeight - this.topOffset - this.bottomOffset
      this.axisXWidth = this.plotWidth - 60
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
      // supporting funcions
      var getClosestX = function (invertedX, ts) {
        return ts.closestDate(invertedX)
      }

      var getClosestY = function (invertedY, periodValues, minDiff) {
        var minValue = null
        var minIndex = null
        if (periodValues !== undefined) {
          for (var iPer = 0; iPer < periodValues.length; iPer++) {
            const pval = periodValues[iPer]

            if (minValue === null) {
              minValue = Math.abs(invertedY - pval)
              minIndex = iPer
            } else {
              const diff = Math.abs(invertedY - pval)
              if (diff < minValue) {
                minValue = diff
                minIndex = iPer
              }
            }
          }
          if (minIndex !== null && minValue > minDiff) {
            minIndex = null
          }
          return minIndex
        }
      }

      var isMouseInPlot = function (mPos, bounds) {
        var mouseInPlot = true
        const mouseX = mPos[0]
        const mouseY = mPos[1]
        if (mouseX < minLeft || mouseX > maxRight) {
          mouseInPlot = false
        }
        if (mouseY < topOffset || mouseY > vertLineHeight) {
          mouseInPlot = false
        }
        return mouseInPlot
      }

      // line plot
      if (this.ts !== null) {
        // make variables available for chart use
        const ts = this.ts

        const values = ts.withDateValues()
        const id = this.id

        const getConfig = this.getConfig
        const setConfig = this.setConfig
        const applyConfigPrices = this.applyConfigPrices
        const useFreqCtrl = this.params.useFreqCtrl
        const useDotLabels = this.params.useDotLabels

        // specificly for legend
        this.data = this.ts
        this.setPlotDims()

        var base = this.$d3.select(this.$el)

        // clear any existing lines
        base.selectAll('*').remove()

        var chart = base
          .append('div')
          .attr('class', 'chart')

        var sizes = this.windowSizes()
        chart
          // .style('border', '1px solid red')
          .style('margin-top', sizes[1] * this.margin.top + 'px')
          .style('margin-right', sizes[0] * this.margin.right + 'px')
          .style('margin-bottom', sizes[1] * this.margin.bottom + 'px')
          .style('margin-left', sizes[0] * this.margin.left + 'px')

        var svg = chart.append('svg')
          .attr('width', this.svgWidth)
          .attr('height', this.svgHeight)
          // .style('background', '#000')
          .style('background', this.chartParams.plot.background)

        // calculate scales
        const yMin = ts.minValue()
        const yMax = ts.maxValue()

        // scaling functions
        var parseTime = this.$d3.timeParse('%Y-%m-%d')
        const xMin = ts.startDate()
        const xMax = ts.endDate()
        var scaleX = this.$d3.scaleTime()
          .domain([parseTime(xMin), parseTime(xMax)])
          .range([0, this.axisXWidth])

        var dateRange = xMin + '  --  ' + xMax
        this.xlabel = dateRange
        var scaleY = this.$d3.scaleLinear()
          .domain([yMin, yMax])
          .range([this.plotHeight, 0])

        var colorScale = this.$d3.scaleSequential(
          this.$d3.interpolateRainbow)
          .domain([0, ts.columns.length])

        // line function
        for (var lineNo = 0; lineNo < ts.columns.length; lineNo++) {
          var lineFunc = this.$d3.line()
            .x((d) => scaleX(parseTime(d.date)))
            .y((d) => scaleY(d.values[lineNo]))
            // .defined(function(d) {
            //   return d[1] || d[1] === '0';
            // })
            //
          // var filteredData = values.filter(lineFunc.defined());

          svg.append('path')
            .attr('class', 'series')
            .attr(
              'transform',
              this.createTranslate(
                this.leftOffset,
                this.topOffset))
            .attr('d', lineFunc(values, lineNo))
            // .attr('d', lineFunc(filteredData, lineNo))
            .attr('stroke', colorScale(lineNo))
            .attr('stroke-width', 1.0)
            .attr('fill', 'none')

          if (this.getUseDots) {
            svg.selectAll('dot')
              .data(values)
              .enter().append('circle')
              .attr('fill', colorScale(lineNo))
              .attr('r', 2.4)
              .attr('cx', (d) => scaleX(parseTime(d.date)))
              .attr('cy', (d) => scaleY(d.values[lineNo]))
              .attr(
                'transform',
                this.createTranslate(
                  this.leftOffset,
                  this.topOffset))
          }
        }

        drawAxes(this, svg, scaleX, scaleY)
        drawTitle(this, svg)
        // drawLegend(this, svg, colorScale)
        var legend = new Legend(
          // location
          {
            left: this.leftOffset + 5,
            top: this.panel.top - 5,
            maxWidth: this.svgWidth * 0.3,
            maxHeight: null
          },
          // params
          {
            items: ts.columns,
            colorScale: colorScale
          }
        )
        legend.draw(svg)

        // mouse functions
        var minLeft = this.panel.left
        var maxRight = this.panel.left + this.axisXWidth

        var d3 = this.$d3
        const frequencies = this.frequencies
        var prevCx = null
        // var prevCy = null

        // these are here because this is not recognized in .on functions
        var leftOffset = 0
        var topOffset = this.topOffset
        var vertLineHeight = this.plotHeight

        // this draws a vertical line -- to connect with the pie chart
        if (this.drawVerticalLine) {
          svg
            .on('mouseover', function () {
              var mouseX = d3.mouse(this)
              mouseX = mouseX[0]
              if (mouseX < minLeft) {
                var linePosition = minLeft
              } else if (mouseX > maxRight) {
                linePosition = maxRight
              } else {
                linePosition = mouseX
              }

              if (prevCx !== null) {
                svg.selectAll('.vertical').remove()
              }
              var vertHorzPosition = leftOffset + linePosition
              svg
                .append('rect')
                .attr('class', 'vertical')
                .attr(
                  'transform',
                  'translate(' + vertHorzPosition + ', ' + topOffset + ')')
                .attr('width', '1px')
                .attr('height', vertLineHeight)
                .attr('fill', 'black')

              prevCx = this.leftOffset + linePosition
            })
        }

        // this shows a dot and label of the value
        if (useDotLabels) {
          svg
            // mousemove seems to work well on its own
            .on('mouseover', function () {
              // discover the location in screen coords
              // translate to data coords
              // determine whether to show dot and label
              const mPos = d3.mouse(this)
              const mouseX = mPos[0]
              const mouseY = mPos[1]

              // out of bounds?
              var mouseInPlot = isMouseInPlot(
                mPos,
                {
                  minLeft: minLeft,
                  mouseX: mouseX,
                  maxRight: maxRight,
                  topOffset: topOffset,
                  vertLineHeight: vertLineHeight
                }
              )

              // NOTE: have classes injected?
              svg.selectAll('.spotLabel').remove()
              svg.selectAll('.spotBox').remove()
              svg.selectAll('.spotDot').remove()

              if (mouseInPlot) {
                var invertedX = scaleX.invert(
                  mouseX - minLeft).toISOString().substr(0, 10)
                // var invertedY = scaleY.invert(mouseY - minLeft)
                var invertedY = scaleY.invert(mouseY - topOffset)
                const closestX = getClosestX(invertedX, ts)
                const periodYValues = ts.data[getClosestX(invertedX, ts)]
                const perIndex = getClosestY(
                  invertedY, periodYValues, scaleY.invert(vertLineHeight) * 0.05)
                const closestY = periodYValues[perIndex]

                if (prevCx !== null) {
                  svg.selectAll('.spotDot').remove()
                  svg.selectAll('.spotLabel').remove()
                }

                if (closestY !== undefined) {
                  var cx = scaleX(parseTime(getClosestX(invertedX, ts))) + minLeft
                  var cy = scaleY(closestY) + topOffset

                  var label = new DotLabel(
                    {
                      cx: cx,
                      cy: cy,
                      minLeft: minLeft,
                      maxRight: maxRight,
                      topOffset: topOffset,
                      vertLineHeight: vertLineHeight
                    },
                    {
                      labels: [
                        { text: ts.columns[perIndex], fontSize: 18, fill: '#333' },
                        { text: closestX },
                        { text: periodYValues[perIndex].toFixed(2) }
                      ],
                      dotFill: colorScale(perIndex)
                    }
                  )
                  label.draw(svg)

                  svg.selectAll('.series').transition()
                    .duration(0)
                    .attr('stroke-width', function (d, j) {
                      return j !== perIndex ? 0.4 : 3
                    })
                    .attr('opacity', function (d, j) {
                      return j !== perIndex ? 0.8 : 1
                    })
                }
              }
            })
            .on('mouseout', function (d, i) {
              svg.selectAll('.series').transition()
                .duration(250)
                .attr('stroke-width', 1)
                .attr('opacity', 1)
            })

          // .on('mouseover', function () {
          //   // necessary?
          //   var mouseX = d3.mouse(this)
          //   console.log('mouseX', mouseX)
          // })
        }

        // frequency control
        if (useFreqCtrl) {
          var freqCtrlX = minLeft - 20
          var freqCtrlY = vertLineHeight + topOffset + 35
          const freqSpacer = 50
          const selectedFreq = frequencies.findIndex((d) => {
            return d.ptype === ts.frequency
          })
          for (var freqIdx = 0; freqIdx < frequencies.length; freqIdx++) {
            svg.append('circle')
              .attr('class', 'freqCtrlCircle')
              .attr('stroke', 'blue')
              .attr('stroke-width', '2')
              .attr('fill', (
                selectedFreq === freqIdx) ? 'blue' : 'white')
              .attr('r', 7)
              .attr('cx', freqCtrlX + freqSpacer * freqIdx)
              .attr('cy', freqCtrlY)

            svg.append('text')
              .attr('class', 'freqCtrlTest')
              .attr(
                'transform', 'translate(' +
                (freqCtrlX + 12 + freqSpacer * freqIdx) + ', ' +
                (freqCtrlY + 5) + ')')
              .text(frequencies[freqIdx].ptype.toUpperCase())
              .attr('text-anchor', 'left')
              // .attr('fill', 'darkblue')
              .attr('font-size', '15px;')
          }

          svg.selectAll('.freqCtrlCircle')
            .on('click', function (d, i) {
              // const mPos = d3.mouse(this)
              // const mouseX = mPos[0]
              // const mouseY = mPos[1]
              // var freq

              svg.selectAll('.freqCtrlCircle').transition()
                .duration(150)
                .attr('fill', function (d, j) {
                  if (j === i) {
                    var config = getConfig({ id: id })
                    config.query.frequency = frequencies[j].ptype
                    setConfig(config)
                    applyConfigPrices(config)
                  }

                  return j !== i ? 'white' : 'blue'
                })
            })
            .on('mouseout', function (d, i) {
              svg.selectAll('.freqCtrlCircle')
                .style('cursorStyle', 'auto')
            })
        }
      }
    }
  }
}
</script>

<style>

svg .title {
  font-size: 20px;
  color: blue;
}
path {
  fill: transparent;
  shape-rendering: crispEdges;
}
.axisLabel {
  font-size: 15px;
}
legend {
  font-size: 10px;
  border: 2px solid green;
}
.legend .series {
  cursor: pointer;
  font-size: 10px;
}

.legendLabel {
  font-size: 13px;
}

.thisone {
  font-size: 12px;
}

.thisone .hover {
  cursor: pointer;
}

.thisone .hover path {
  font-size: 30px;
}

.legend circle {
  stroke-width: 2px;
}
.legend .disable circle {
  fill-opacity: 0;
}

.lines path {
  fill: none;
  stroke-width: 1.5px;
  stroke-linecap: round;

  transition: stroke-width 250ms linear;
  -moz-transition: stroke-width 250ms linear;
  -webkit-transition: stroke-width 250ms linear;

  transition-delay: 250ms;
  -moz-transition-delay: 250ms;
  -webkit-transition-delay: 250ms;
}

.line.hover path {
  stroke-width: 6px;
}

.lines .point {
  transition: stroke-width 250ms linear;
  -moz-transition: stroke-width 250ms linear;
  -webkit-transition: stroke-width 250ms linear;
}

.lines .point.hover {
  stroke-width: 20px;
  stroke-opacity: .5;
}

.freqCtrlCircle {
  cursor: pointer;
}

</style>
