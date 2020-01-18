// classes/D3/D3LinePlot.js
/* D3LinePlot
 *
 * This class builds on D3Plot, adding
 *  axes
 *  lines
 *  legend
 *
 *  mouseovers
 *  frequency control
 *  dot labels
 *
 */

import { applyStyles } from './apply-styles'
import { calcProportion } from '@/lib/D3/utils'

import { D3Plot } from '@/classes/D3/D3Plot'

export class D3LinePlot extends D3Plot {
  constructor ({ axes, ...otherPayload }) {
    super(otherPayload)

    this.axes = axes
  }

  buildChart = (svg, height, width) => {
    this.addPanels(svg, height, width)
    this.addTitles(svg, height, width)
  }

  addAxes = (svg, height, width) => {
    /* Was going to separate, but grids require both x/y
     * dimensions anyway, so might as well leave
     * combined.
     *
     * Still looks like a good candidate to rework.
     *
     * TODO: there are still some inconsistencies on class names.
     */
    const panel = this.panel
    const axes = this.axes
    const d3 = this.d3
    const scaleX = this.scaleX
    const scaleY = this.scaleY

    var axisY = d3.axisLeft()
      .scale(scaleY)
      .ticks(axes.yAxis.ticks)

    var axisYr = d3.axisRight()
      .scale(scaleY)
      .ticks(axes.yRightAxis.ticks)

    console.log(
      'this.panel1.widthRange',
      JSON.parse(JSON.stringify(this.panel1.widthRange)))
    // const tickRange =
    console.log(
      'ticks',
      Math.round(
        calcProportion(
          width,
          JSON.parse(JSON.stringify(this.panel1.widthRange)),
          { max: axes.xAxis.ticks.range.max, min: axes.xAxis.ticks.range.min }
        )))

    var axisX = d3.axisBottom()
      .scale(scaleX)
      .ticks(axes.xAxis.ticks)
      .ticks(Math.round(
        calcProportion(
          width,
          this.panel1.widthRange,
          axes.xAxis.ticks.range
        ).toString()))
      // .ticks(d3.timeMonth.every(1))

    svg.append('g')
      .attr('class', 'x-axis axis')
      .attr(
        'transform',
        this.createTranslate(panel.left, height - panel.bottom)
      )
      .call(axisX)

    // tie this in to line class names
    var grid = svg.selectAll('line.horizontalGrid')
      .data(scaleY.ticks())

    grid.enter()
      .append('line')
      .attr('class', axes.grids.horizontal.className)
      .attr('x1', panel.left)
      .attr('x2', width - panel.right)
      .attr('stroke', axes.grids.horizontal.stroke)
      .attr('stroke-width', axes.grids.horizontal.strokeWidth)
      .attr('opacity', axes.grids.horizontal.opacity)

      .merge(grid)
      .attr('y1', scaleY)
      .attr('y2', scaleY)
      .attr(
        'transform',
        this.createTranslate(0, panel.top)
      )

    grid.exit().remove()

    svg.append('g')
      .attr('class', 'y-axis axis')
      .attr(
        'transform',
        this.createTranslate(panel.left, panel.top)
      )
      .call(axisY)

    svg.append('g')
      .attr('class', 'y-axis axis')
      .attr(
        'transform',
        this.createTranslate(width - panel.right, panel.top)
      )
      .call(axisYr)

    grid = svg.selectAll('line.verticalGrid')
      .data(scaleX.ticks())

    grid.enter()
      .append('line')
      .attr('class', axes.grids.vertical.className)
      .attr('y1', panel.top)
      .attr('y2', height - panel.bottom)
      .attr('stroke', axes.grids.vertical.stroke)
      .attr('stroke-width', axes.grids.vertical.strokeWidth)
      .attr('opacity', axes.grids.vertical.opacity)

      .merge(grid)
      .attr('x1', scaleX)
      .attr('x2', scaleX)
      .attr(
        'transform',
        this.createTranslate(panel.left + 0.5, 0)
      )

    grid.exit().remove()

    var label = axes.yAxis.label
    const scaleBasis = {
      value: height, ...this.panel1.heightRange
    }

    if (label.text !== undefined || label.text !== '') {
      var text = svg.append('text')
        .attr('class', label.className)
        .attr('fill', label.fill)
        .attr(
          'transform',
          this.createTranslate(
            panel.left * label.offset,
            (height - panel.bottom + panel.top) / 2)
            .concat(' rotate(-90)')
        )
        .attr('text-anchor', 'middle')
        .text(label.text)

      applyStyles(text, label.styles, scaleBasis)
      text.exit().remove()
    }

    label = axes.yRightAxis.label

    if (label.text !== undefined || label.text !== '') {
      text = svg.append('text')
        .attr('class', label.className)
        .attr('fill', label.fill)
        .attr(
          'transform',
          this.createTranslate(
            width - panel.right * label.offset,
            (height - panel.bottom + panel.top) / 2)
            .concat(' rotate(-90)')
        )
        .attr('text-anchor', 'middle')
        .text(label.text)

      applyStyles(text, label.styles, scaleBasis)
      text.exit().remove()
    }

    label = axes.xAxis.label

    if (label.text !== undefined || label.text !== '') {
      text = svg.append('text')
        .attr('class', label.className)
        .attr('fill', label.fill)
        .attr('x', (width - panel.right - panel.left) / 2 + panel.left)
        .attr('y', height - panel.top + panel.bottom * label.offset)
        .attr('text-anchor', 'middle')
        .text(label.text)

      applyStyles(text, label.styles, scaleBasis)
      text.exit().remove()
    }
  }

  // lines
  drawLines = (data) => {
    // TODO: reimplement this later
  }
}
