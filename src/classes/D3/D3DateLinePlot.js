// classes/D3/D3DateLinePlot.js
/* D3DateLinePlot
 *
 * This class builds on D3LinePlot, adding
 *  axes
 *  time series lines
 *  legend
 *
 *  mouseovers
 *  frequency control
 *  dot labels
 *
 */
import { TS } from '@/classes/TS.class'
import { D3LinePlot } from '@/classes/D3/D3LinePlot'

export class D3DateLinePlot extends D3LinePlot {
  constructor ({ chartData, data, ...otherPayload }) {
    super(otherPayload)
    // this is the timeseries, generic name due to other chart types
    this.ts = new TS(JSON.parse(JSON.stringify(chartData.ts)))
    this.data = data // this is the defining path data from config
  }

  buildChart = (svg, height, width) => {
    this.addPanels(svg, height, width)
    this.createScales(height, width)
    this.addTitles(svg, height, width)
    this.addAxes(svg, height, width)
    this.drawLines(svg)
    //    dot labels?
    // legend
    // mouseovers
    // frequency control
  }

  createScales = (height, width) => {
    /* creates scaleX, scaleY, colorScale
     *
     * TODO: provide mechanism for other
     *    color scaling methods
     *    log scaling, etc
     */
    const d3 = this.d3
    const ts = this.ts
    const panel = this.panel
    const axes = this.axes
    // this is done before setting actual xRange
    const dateRange = ts.startDate() +
      '  --  ' + ts.endDate()
    const xRange = {
      min: new Date(ts.startDate()),
      max: new Date(ts.endDate())
    }

    if (this.axes.xAxis.label.text !== 'none') {
      this.axes.xAxis.label.text = dateRange
    }

    if (axes.xAxis.scaleFactor !== 0) {
      var startDate = new Date(ts.startDate())
      var endDate = new Date(ts.endDate())
      const diff = xRange.max - xRange.min
      const diffDays = diff / 86400000
      var diffScale = diffDays * axes.xAxis.scaleFactor
      diffScale = diffScale < 1 ? 1 : Math.round(diffScale)
      startDate.setDate(startDate.getDate() - diffScale)
      endDate.setDate(endDate.getDate() + diffScale)
      xRange.min = startDate
      xRange.max = endDate
    }

    const yRange = {
      min: ts.minValue() * (1 - axes.yAxis.scaleFactor),
      max: ts.maxValue() * (1 + axes.yAxis.scaleFactor)
    }

    this.parseTime = d3.timeParse('%Y-%m-%d')

    this.scaleX = d3.scaleTime()
      .domain(
        [this.parseTime(xRange.min.toISOString().substr(0, 10)), this.parseTime(xRange.max.toISOString().substr(0, 10))])
      .range([0, width - panel.coords.left - panel.coords.right])

    this.scaleY = d3.scaleLinear()
      .domain([yRange.min, yRange.max])
      .range([height - this.panel.coords.top - panel.coords.bottom, 0])

    this.colorScale = d3.scaleSequential(
      d3.interpolateRainbow)
      .domain([0, ts.columns.length])
  }

  getClosestX = (invertedX, ts) => {
    return ts.closestDate(invertedX)
  }

  getClosestY = (invertedY, periodValues, minDiff) => {
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

  // lines
  drawLines = (svg) => {
    // TODO: reimplement this later
    const ts = this.ts
    const values = ts.withDateValues()
    const pathConfig = JSON.parse(JSON.stringify(this.data.path))
    const dots = this.data.path.dots
    for (var lineNo = 0; lineNo < ts.columns.length; lineNo++) {
      var lineFunc = this.d3.line()
        .x((d) => this.scaleX(this.parseTime(d.date)))
        .y((d) => this.scaleY(d.values[lineNo]))

      if (pathConfig.useLines) {
        svg.append('path')
          .attr('class', pathConfig.className)
          .attr(
            'transform',
            this.createTranslate(
              this.panel.coords.left,
              this.panel.coords.top)
          )
          .attr('d', lineFunc(values, lineNo))
          .attr('stroke', this.colorScale(lineNo))
          .attr('stroke-width', pathConfig.strokeWidth)
          .attr('fill', 'none')
      }
      if (dots.useDots) {
        var dot = svg.selectAll('dot')
          .data(values)
          .enter().append('circle')
          .attr('r', dots.radius)
          .attr('cx', (d) => this.scaleX(this.parseTime(d.date)))
          .attr('cy', (d) => this.scaleY(d.values[lineNo]))
          // .attr('fill', dots.useFill
          //   ? this.colorScale(lineNo)
          //   : 'none'
          // )

        if (dots.useFill) {
          dot.attr('fill', this.colorScale(lineNo))
        } else {
          dot.attr('fill', 'none')
        }

        if (dots.useStroke) {
          dot
            .attr('stroke', this.colorScale(lineNo))
            .attr('stroke-width', pathConfig.strokeWidth)
        } else {
          dot.attr('stroke', 'none')
        }

        dot.attr(
          'transform',
          this.createTranslate(
            this.panel.coords.left,
            this.panel.coords.top))
        dot.exit().remove()
      }
    }
  }

  // addFreqControl = () => {
  //   var freqCtrlX = minLeft - 20
  //   var freqCtrlY = vertLineHeight + topOffset + 35
  //   const freqSpacer = 50
  //   const selectedFreq = frequencies.findIndex((d) => {
  //     return d.ptype === ts.frequency
  //   })
  //   for (var freqIdx = 0; freqIdx < frequencies.length; freqIdx++) {
  //     svg.append('circle')
  //       .attr('class', 'freqCtrlCircle')
  //       .attr('stroke', 'blue')
  //       .attr('stroke-width', '2')
  //       .attr('fill', (
  //         selectedFreq === freqIdx) ? 'blue' : 'white')
  //       .attr('r', 7)
  //       .attr('cx', freqCtrlX + freqSpacer * freqIdx)
  //       .attr('cy', freqCtrlY)
  //
  //     svg.append('text')
  //       .attr('class', 'freqCtrlTest')
  //       .attr(
  //         'transform',
  //         this.createTranslate(
  //           freqCtrlX + 12 + freqSpacer * freqIdx,
  //           freqCtrlY + 5
  //         )
  //       )
  //       .text(frequencies[freqIdx].ptype.toUpperCase())
  //       .attr('text-anchor', 'left')
  //       .attr('font-size', '15px;')
  //   }
  //
  //   svg.selectAll('.freqCtrlCircle')
  //     .on('click', function (d, i) {
  //       // const mPos = d3.mouse(this)
  //       // const mouseX = mPos[0]
  //       // const mouseY = mPos[1]
  //       // var freq
  //
  //       svg.selectAll('.freqCtrlCircle').transition()
  //         .duration(150)
  //         .attr('fill', function (d, j) {
  //           if (j === i) {
  //             var config = getConfig({ id: id })
  //             config.query.frequency = frequencies[j].ptype
  //             setConfig(config)
  //             applyConfigPrices(config)
  //           }
  //
  //           return j !== i ? 'white' : 'blue'
  //         })
  //     })
  //     .on('mouseout', function (d, i) {
  //       svg.selectAll('.freqCtrlCircle')
  //         .style('cursorStyle', 'auto')
  //     })
  //
  // }
}
