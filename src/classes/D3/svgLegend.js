export default (vm, svg, colorScale) => {
  /*
  This function draws the legend.

  input: svg

  Later:  Address placement on plot, better provisions for multiple
          rows of items, recycling color list, mouse-overs

  Work performed:
  determines how wide the legend will be from the length of the
  characters in the column information.

  Controlable elements:
    use rectangle filled or bordered
    min, max width of legend
    legend extends down until all columns are done

    set rectangle position

    padding around column elements
    column element:
      a dot of each color in front of the column name
      spacing between dot and name
      spacing between name and next dot on same line
      size of dot
      font size of name
      mouse behavior over dot
        on:
          emphasize data series
          deemphasize other series
        off:
          restore all series to normal

        selection is based on class name of the series


  Assume a fixed character width

  dots = {
    dotSize: 7,
    padWidthRatio: 1.3
  }
  spacing = {
    itemPadding: 0,
    itemWidth: getItemWidth(font, item)
  }
  */
  // width related
  const qcharWidth: 25, // used to calculate spacing
  const legendParams = {
    legDotSize: 7, // size of dot
    legPadding: 0, // padding between items
    colorPadWidth: 10 * 1.3, // spacing for the colored dot

    // entire width of legend
    legWidth: (vm.getColumnLengths + legPadding) * charWidth,

    // upper left-hand corner
    legLeft: vm.leftOffset, // start of legend
    legTop: vm.panel.top - 5,

    legHeight: vm.legendHeight,
    useRect: true, // shows a background rectangle
    legendRect: {
      stroke: '#ccc',
      strokeWidth: 1.0,
      fill: 'none',
      opacity: 0

    },
    legendClass: 'legend'
  }

  const charWidth = 25
  const legDotSize = 7
  // const legPadding = legDotSize * 0.3     // padding between items
  // padding between items
  const legPadding = 0
  // spacing for the colored dot
  // const colorPadWidth = 10 * 1.3

  // spacing for the colored dot
  const colorPadWidth = 10 * 1.3

  const legBorder = true

  // entire width of legend
  const legWidth = (vm.getColumnLengths + legPadding) * charWidth
  console.log('ts.columns', vm.ts.columns)

  // start of legend
  const legLeft = vm.leftOffset
  const legTop = vm.panel.top - 5

  // height related
  const legHeight = vm.legendHeight
  // draw the box around the legend
  if (legBorder) {
    svg.append('g').attr('class', 'legend')

    svg.append('rect')
      .attr('transform', vm.createTranslate(legLeft, legTop))
      .attr('width', legWidth)
      .attr('height', legHeight)
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1.0)
      .attr('fill', 'none')
  }

  // iterate through the columns
  var columns = vm.data.columns
  // var font = '10pt arial'
  // var fontSize = '12px'
  var row = 0
  var columnNo = 0
  for (var count = 0; count < columns.length; count++) {
    const columnText = columns[count]
    const itemWidth = 60

    // color left hand position
    var colorLeft = colorPadWidth + (colorPadWidth + itemWidth) * columnNo

    if ((colorLeft + itemWidth) > vm.svgWidth * 0.8) {
      row += 1
      colorLeft = colorPadWidth
      columnNo = 0
    }
    columnNo += 1

    const itemLeft = colorLeft + colorPadWidth + legPadding
    const itemHeight = (legHeight * (row + 1)) + 0.2 * legHeight
    const colorHeight = (legHeight * (row + 1))

    // the colored marker
    svg
      .append('circle')
      .attr('class', 'item')
      .attr('r', legDotSize)
      .attr('cx', legLeft + colorLeft)
      .attr('cy', legTop + colorHeight)
      .attr('fill', colorScale(count))

    // text
    svg.append('text')
      .attr('class', 'item')
      .attr(
        'transform',
        vm.createTranslate(
          legLeft + itemLeft,
          legTop + itemHeight
        )
      )
      .text(columnText)
      .attr('text-anchor', 'left')
      .attr('fill', 'black')
      .attr('class', 'thisone')

    svg.selectAll('.item')
      .attr('r', legDotSize)
      .on('mouseover', function (d, i) {
        svg.selectAll('.item').transition()
          .duration(150)
          .attr('r', function (d, j) {
            return j !== i ? legDotSize : legDotSize * 1.4
          })
        svg.selectAll('.series').transition()
          .duration(250)
          .attr('stroke-width', function (d, j) {
            return j !== i ? 0.4 : 3
          })
          .attr('opacity', function (d, j) {
            return j !== i ? 0.4 : 1
          })
      })
      .on('mouseout', function (d, i) {
        svg.selectAll('.item').transition()
          .duration(250)
          .attr('r', legDotSize)
        svg.selectAll('.series').transition()
          .duration(250)
          .attr('stroke-width', 1)
          .attr('opacity', 1)
      })
  }
}
