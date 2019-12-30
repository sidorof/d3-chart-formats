import { createTranslate } from '@/lib/graph_library'

export default (vm, svg, scaleX, scaleY) => {
  /*
   * This function draws axes into the current svg.for a normal 2d plot.
   * var vm = vm
   * var svg = svg
   * var scaleX = scaleX
   * var scaleY = scaleY
   * axes
   *
   * Assumptions:
   * within vm functions:
   *    $d3
   *    createTranslate
   *
   *  values for:
  *      leftOffset
   *      plotHeight
   *      topOffset
   *      axisXWidth
   *      xlabel
   *      ylabel
   *      panel.left
   *
  */
  if (vm.chartParams !== null) {
    var axisY = vm.$d3.axisLeft()
      .scale(scaleY)
      .ticks(vm.chartParams.axes.yAxis.ticks)

    var axisYr = vm.$d3.axisRight()
      .scale(scaleY)
      .ticks(vm.chartParams.axes.yRightAxis.ticks)

    var axisX = vm.$d3.axisBottom()
      .scale(scaleX)
      .ticks(vm.chartParams.axes.xAxis.ticks)
    svg.append('g')
      .attr('class', 'x-axis axis')
      .attr(
        'transform',
        createTranslate(
          vm.leftOffset,
          vm.plotHeight + vm.topOffset))
      .call(axisX)

    var grid = svg.selectAll('line.horizontalGrid')
      .data(scaleY.ticks())

    grid.enter()
      .append('line')
      .attr('class', 'horizontalGrid')
      .attr('x1', vm.leftOffset)
      .attr('x2', vm.leftOffset + vm.axisXWidth)
      // .attr('stroke', '#111')
      // .attr('stroke-width', 1.0)
      // .attr('opacity', '0.2')
      .attr('stroke', vm.chartParams.axes.grids.horizontal.stroke)
      .attr('stroke-width', vm.chartParams.axes.grids.horizontal.strokeWidth)
      .attr('opacity', vm.chartParams.axes.grids.horizontal.opacity)

      .merge(grid)
      .attr('y1', scaleY)
      .attr('y2', scaleY)
      .attr(
        'transform',
        createTranslate(
          0,
          vm.topOffset + 0.3))

    grid.exit().remove()

    svg.append('g')
      .attr('class', 'y-axis axis')
      .attr(
        'transform',
        createTranslate(
          vm.leftOffset,
          vm.topOffset))
      .call(axisY)

    // reinstate if can get more spacing
    svg.append('g')
      .attr('class', 'y-axis axis')
      .attr(
        'transform',
        createTranslate(
          vm.leftOffset + vm.axisXWidth,
          vm.topOffset))
      .call(axisYr)

    grid = svg.selectAll('line.verticalGrid')
      .data(scaleX.ticks())

    grid.enter()
      .append('line')
      .attr('class', 'verticalGrid')
      .attr('y1', vm.topOffset)
      .attr('y2', vm.topOffset + vm.plotHeight)
      // .attr('stroke', '#111')
      // .attr('stroke-width', 1.0)
      // .attr('opacity', '0.2')
      .attr('stroke', vm.chartParams.axes.grids.vertical.stroke)
      .attr('stroke-width', vm.chartParams.axes.grids.vertical.strokeWidth)
      .attr('opacity', vm.chartParams.axes.grids.vertical.opacity)

      .merge(grid)
      .attr('x1', scaleX)
      .attr('x2', scaleX)
      .attr(
        'transform',
        createTranslate(
          vm.leftOffset + 0.5,
          0))

    grid.exit().remove()

    const ylabel = vm.chartParams.axes.yAxis.label

    if (ylabel.text !== undefined || ylabel.text !== '') {
      svg.append('text')
        .attr('class', 'axisLabel')
        .attr('fill', ylabel.fill)
        .attr(
          'transform',
          createTranslate(
            vm.panel.left * 0.4,
            (vm.plotHeight / 2) + vm.topOffset) + ' rotate(-90)')
        .attr('text-anchor', 'middle')
        .attr('font-weight', ylabel.fontWeight)
        .text(ylabel.text)
    }

    const xlabel = vm.chartParams.axes.xAxis.label

    if (xlabel.text !== undefined || xlabel.text !== '') {
      svg.append('text')
        .attr('class', 'axisLabel')
        .attr('fill', xlabel.fill)
        .attr(
          'transform',
          createTranslate(
            (vm.axisXWidth / 2) + vm.leftOffset,
            vm.topOffset + vm.plotHeight + vm.bottomOffset
          )
        )
        .attr('text-anchor', 'middle')
        .attr('font-weight', xlabel.fontWeight)
        .text(xlabel.text)
    }

    return svg
  }
}
