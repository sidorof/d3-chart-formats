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
  var axisY = vm.$d3.axisLeft()
    .scale(scaleY)
    .ticks(5)

  var axisYr = vm.$d3.axisRight()
    .scale(scaleY)
    .ticks(5)

  var axisX = vm.$d3.axisBottom()
    .scale(scaleX)
    .ticks(10)
  svg.append('g')
    .attr('class', 'x-axis axis')
    .attr(
      'transform',
      vm.createTranslate(
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
    //     .attr('stroke', '#111')
    // .attr('stroke-width', 1.0)
    // .attr('opacity', '0.2')
    .attr('stroke', '#EEEEEE')
    .attr('stroke-width', 0.5)
    .attr('opacity', '0.5')

    .merge(grid)
    .attr('y1', scaleY)
    .attr('y2', scaleY)
    .attr(
      'transform',
      vm.createTranslate(
        0,
        vm.topOffset + 0.3))

  grid.exit().remove()

  svg.append('g')
    .attr('class', 'y-axis axis')
    .attr(
      'transform',
      vm.createTranslate(
        vm.leftOffset,
        vm.topOffset))
    .call(axisY)

  // reinstate if can get more spacing
  svg.append('g')
    .attr('class', 'y-axis axis')
    .attr(
      'transform',
      vm.createTranslate(
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
    .attr('stroke', '#EEEEEE')
    .attr('stroke-width', 0.9)
    .attr('opacity', '0.5')

    .merge(grid)
    .attr('x1', scaleX)
    .attr('x2', scaleX)
    .attr(
      'transform',
      vm.createTranslate(
        vm.leftOffset + 0.5,
        0))

  grid.exit().remove()

  if (vm.ylabel !== undefined || vm.ylabel !== '') {
    svg.append('text')
      .attr('class', 'axisLabel')
      //       .attr('fill', '#000')
      .attr('fill', '#EEE')
      .attr(
        'transform',
        vm.createTranslate(
          vm.panel.left * 0.4,
          (vm.plotHeight / 2) + vm.topOffset) + ' rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 700)
      .text(vm.ylabel)
  }

  if (vm.xlabel !== undefined || vm.ylabel !== '') {
    svg.append('text')
      .attr('class', 'axisLabel')
      .attr('fill', '#000')
      .attr(
        'transform',
        vm.createTranslate(
          (vm.axisXWidth / 2) + vm.leftOffset,
          vm.topOffset + vm.plotHeight + vm.bottomOffset
        )
      )
      .attr('text-anchor', 'middle')
      .attr('font-weight', 700)
      .text(vm.xlabel)
  }

  return svg
}
