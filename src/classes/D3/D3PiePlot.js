// classes/D3/D3Pie.js
/* D3PiePlot
 *
 * This class builds on D3Plot, adding
 * pie chart related elements
 * legend
 *
 * mouseovers
 * labeling of segments
 *
 */
import { D3Plot } from '@/classes/D3/D3Plot'

export class D3PiePlot extends D3Plot {
  constructor ({ chartData, pie, panel, ...otherPayload }) {
    // pass in modification adjustments for panel size
    panel.coordMods = pie.panel.coordMods
    super({ ...otherPayload, panel })

    // see how more is being passed in here until this solidifies
    this.config = pie
    this.chartData = chartData
  }

  buildChart = (svg, height, width) => {
    this.addPanels(svg, height, width)
    this.addTitles(svg, height, width)
    this.drawSegments(svg, height, width)
  }

  drawSegments = (svg, height, width) => {
    // standard attributes of an arc
    // NOTE: move this to params
    const config = this.config
    const pieDimensions = config.pieDimensions
    const slices = config.slices
    const pointerLines = config.pointerLines
    const labels = config.labels
    // scaling ignored for now
    // const scaleBasis = {
    //   value: height,
    //   ...this.panel1.heightRange
    // }
    const coords = this.panel.coords
    const dist = pieDimensions.diameter * Math.min(
      height - coords.top - coords.bottom,
      width - coords.right - coords.left)

    const arc = this.d3.arc()
      .outerRadius(dist * slices.outerRadius)
      .innerRadius(dist * slices.innerRadius)
      // .innerRadius(dist * 0)
      .padAngle(slices.padAngle)
      .cornerRadius(slices.cornerRadius)

    // defines edge where pointer lines change to horizontal
    const middleArc = this.d3.arc()
      .innerRadius(dist * pointerLines.middleArc.innerRadius)
      .outerRadius(dist * pointerLines.middleArc.outerRadius)
    const outerArc = this.d3.arc()
      .innerRadius(dist * pointerLines.outerArc.innerRadius)
      .outerRadius(dist * pointerLines.outerArc.outerRadius)

    // alternate placements of percent labels
    const percentAArc = this.d3.arc()
      .innerRadius(dist * pointerLines.percentAArc.innerRadius)
      .outerRadius(dist * pointerLines.percentAArc.outerRadius)

    const percentBArc = this.d3.arc()
      .innerRadius(dist * pointerLines.percentBArc.innerRadius)
      .outerRadius(dist * pointerLines.percentBArc.outerRadius)

    const pieCenter = {
      // contains adjustments that would allow offsets
      //   due to alternate method of labeling
      left: coords.left +
        (width - coords.right - coords.left) *
        (0.5 + pieDimensions.centerOffset.left),
      top: coords.top +
        (height - coords.top - coords.bottom) *
        (0.5 + pieDimensions.centerOffset.top)
    }

    const pieSvg = svg
      .append('g') // main body
      .attr(
        'transform',
        this.createTranslate(
          pieCenter.left,
          pieCenter.top)
      )
    pieSvg.append('g')
      .attr('class', slices.className) // holds arcs
    pieSvg.append('g')
      .attr('class', 'percents') // holds percent of pie
    pieSvg.append('g')
      .attr('class', labels.className) // holds keys
    pieSvg.append('g')
      .attr('class', 'lines') // holds connector lines to keys
    pieSvg.append('g')
      .attr('class', pointerLines.className) // holds connector lines to keys

    const percentCutoff = 0.025

    // this is now [{ key:, value: }]
    // scale data to sum to one
    const total = this.chartData.data.values.reduce((a, b) => a + b)
    const data = []
    for (let i = 0; i < this.chartData.data.values.length; i++) {
      data.push(
        {
          key: this.chartData.data.columns[i],
          value: this.chartData.data.values[i] / total
        }
      )
    }

    const colorScale = this.d3.scaleSequential(
      this.d3.interpolateRainbow)
      .domain([0, data.length])

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      let nextItem
      let prevItem
      let isSmall
      let isSmallNext
      let isSmallPrev

      item.pcType = 0

      if (data.length > 1) {
        if (item.value < percentCutoff) {
          isSmall = true
        } else {
          isSmall = false
        }

        // nextItem
        if (i < data.length - 1) {
          nextItem = data[i + 1]
        } else {
          // wrap to the beginning
          nextItem = data[0]
        }
        if (nextItem.value < percentCutoff) {
          isSmallNext = true
        } else {
          isSmallNext = false
        }

        // prevItem
        if (i > 0) {
          prevItem = data[i - 1]
        } else {
          prevItem = data[data.length - 1]
        }

        if (prevItem.value < percentCutoff) {
          isSmallPrev = true
        } else {
          isSmallPrev = false
        }

        // finally start categorizing
        if (i === 0) {
          if (isSmall) {
            if (isSmallNext || isSmallPrev) {
              item.pcType = 1
            }
          }
        } else {
          if (isSmall) {
            if (prevItem.pcType === 1) {
              item.pcType = 2
            } else if (prevItem.pcType === 2) {
              item.pcType = 1
            } else if (isSmallNext) {
              item.pcType = 1
            }
          }
        }
      }
      data[i] = item
    }

    const pie = this.d3.pie()
      .sort(null)
      .value(function (d) { return d.value })(data)

    const sliceSvg = pieSvg.select('.slices').selectAll('path.slice')
      .data(pie)

    // [ [yValue, sequence]]
    const yRight = []
    const yLeft = []
    const yRightSorted = []
    const yLeftSorted = []
    let yRightCount = 0
    let yLeftCount = 0

    sliceSvg.enter()
      .insert('path')
      .style('fill', function (d, i) {
        // shoehorning in values for y calculations
        const side = d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 0 : 1
        if (side === 0) {
          // right side
          yRight.push([outerArc.centroid(d)[1], yRightCount])
          yRightCount += 1
        } else {
          yLeft.push([outerArc.centroid(d)[1], yLeftCount])
          yLeftCount += 1
        }
        // returning to the mission
        return colorScale(i)
      })
      .attr('class', 'slice')
      .attr('d', arc)

    sliceSvg.exit()
      .remove()
    for (let item = 0; item < yRight.length; item++) {
      yRightSorted.push([Math.abs(yRight[item][0]), yRight[item][1]])
    }

    yRightSorted.sort(function (a, b) { return a[0] - b[0] })
    if (yLeft.length > 0) {
      for (let item = 0; item < yLeft.length; item++) {
        yLeftSorted.push(yLeft[item])
      }
      yLeftSorted.sort(function (a, b) { return Math.abs(a[0]) - Math.abs(b[0]) })
    }
    const minYSpace = 15

    // consolidate these two
    let diff
    let sequence
    if (yRight.length > 1) {
      for (let i = 0; i < yRightSorted.length; i++) {
        // NOTE: consolidate this back
        sequence = yRightSorted[i][1]
        if (sequence !== 0) {
          const value = yRight[sequence][0]
          const upperValue = yRight[sequence - 1][0]

          diff = Math.abs(upperValue - value)
          if ((minYSpace > diff) || (upperValue > value)) {
            // try to fix it
            if (value > 0) {
              yRight[sequence][0] = value + minYSpace
            } else {
              yRight[sequence - 1][0] = value - minYSpace
            }
          }
          //             } else {
          //               const value = yRight[sequence][0]
          //               const prevValue = yRight[sequence + 1][0]
          //               console.log('prevValue', prevValue)
          //               if (prevValue - minYSpace < value) {
          // //                 yRight[sequence][0] = prevValue - minYSpace
          //               }
        }
      }
    }
    // 2017-10-19
    if (yLeft.length > 1) {
      for (let i = 0; i < yLeftSorted.length - 1; i++) {
        sequence = yLeftSorted[i][1]

        const value = yLeft[sequence][0]
        if (sequence + 1 < yLeft.length) {
          const upperValue = yLeft[sequence + 1][0]

          if (value < 0) {
            if (value - minYSpace < upperValue) {
              yLeft[sequence + 1][0] = value - minYSpace
            }
          } else {
            if (value + minYSpace < upperValue) {
              yLeft[sequence + 1][0] = value + minYSpace
            }
          }
        }
      }
    }
    if (labels.useLabels) {
      const textSvg = svg.select('.labels').selectAll('text')
        .data(pie)
      textSvg.enter()
        .append('text')
        .attr('dy', '.35em')
        .style('font-size', labels.styles.fontSize)
        .style('fill', labels.styles.fill)
        .style('font-weight', labels.percents.styles.fontWeight)
        .text(function (d) {
          return d.data.key
        })
        .attr(
          'transform',
          function (d, i) {
            const pos = [0, 0]
            const side = d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 0 : 1
            pos[0] = 0.8 * dist * (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 1 : -1)

            if (side === 0) {
              // right
              pos[1] = yRight[i][0]
            } else {
              pos[1] = yLeft[i - yRight.length][0]
            }

            return 'translate(' + pos + ')'
          }
        )
        .style(
          'text-anchor',
          function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 'start' : 'end'
          }
        )
      textSvg.exit()
        .remove()

      const percentSvg = svg.select('.percents').selectAll('text')
        .data(pie)

      /*
      percent strategy:
        usually put in the middle
        if percent below X
          if adjacent slices are small
            left: not small
            right: small
              Use arcA
              mark as A
            left: small
      */
      let pos
      percentSvg.enter()
        .append('text')
        .attr('dy', '.35em')
        .text(function (d) {
          return (d.data.value * 100).toFixed(1) //  + '%'
        })
        .attr(
          'transform',
          function (d, i) {
            if (d.data.pcType === 0) {
              pos = arc.centroid(d)
            } else if (d.data.pcType === 1) {
              pos = percentAArc.centroid(d)
            } else {
              pos = percentBArc.centroid(d)
            }
            const side = d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 0 : 1
            if (side === 0) {
              // right
              pos[0] -= 10
            } else {
              pos[0] += 10
            }
            return 'translate(' + pos + ')'
          }
        )
        .style('font-size', labels.percents.styles.fontSize)
        .style('font-weight', labels.percents.styles.fontWeight)
        .style('fill', labels.percents.styles.fill)
        .style(
          'text-anchor',
          function (d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 'start' : 'end'
          }
        )

      percentSvg.exit()
        .remove()

      const polyline = svg.select('.polylines').selectAll('polyline')
        .data(pie)

      polyline.enter()
        .append('polyline')
        .attr(
          'points',
          function (d, i) {
            const pos = [0, 0]
            const side = d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 0 : 1
            pos[0] = 0.79 * dist * (d.startAngle + (d.endAngle - d.startAngle) / 2 < Math.PI ? 1 : -1)
            if (side === 0) {
              // right
              pos[1] = yRight[i][0]
            } else {
              pos[1] = yLeft[i - yRight.length][0]
            }
            return [middleArc.centroid(d), outerArc.centroid(d), pos]
          }
        )
        .style('fill', pointerLines.styles.fill)
        .style('stroke', pointerLines.styles.stroke)
        .style('stroke-width', pointerLines.styles.strokeWidth)

      polyline.exit()
        .remove()
    }
  }
}
