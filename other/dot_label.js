export default (svg, vm, params) => {
  /* D3 Dot Label for showing information about a specic point.
   *
   * Consists of a rectangle with explanatory lines inside.
   * For example, the box contains
   *  1: ticker
   *  2: date
   *  3: value
   *
   */

  // rectangle defaults
  var rectCoords = null
  var rectClass = 'spotBox'
  var rectMarginX = 15
  var rectMarginY = 30
  var rectStroke = '#333'
  var rectStrokeWidth = '0.5'
  var rectFill = 'white'
  var rectFillOpacity = '0.5'
  var rectRx = '8'
  var rectRy = '8'
  var rectWidth = '100'
  // rectHeight = '80px'

  // line defaults
  var labels = []
  var _textHeight = 20
  var _textClass = 'spotLabel'
  var _textFill = 'darkblue'
  var _textAnchor = 'center-align'
  var _fontFamily = 'Arial;'
  var _fontSize = '13px;'

  var _accumLineOffset = function (lineNo) {
    var offset = 0
    var i = 0
    while (i < lineNo) {
      if (i < labels.length) {
        offset += labels[i].textHeight
      }
      i += 1
    }
    console.log('_accumLineOffset', offset)
    return offset
  }

  var rectHeight = function () {
    return rectMarginY + _accumLineOffset(labels.length)
  }

  var lineX = function (lineNo) {
    console.log('rectMarginX', rectMarginX)
    return (
      rectCoords[0] + rectMarginX + labels[lineNo].textOffsetX
    )
  }

  var lineY = function (lineNo) {
    return rectCoords[1] + rectMarginY + _accumLineOffset(lineNo)
  }

  var setRectCoords = function () {
    var cxNew, cyNew
    const midX = (vm.maxRight - vm.minLeft) / 2 + vm.minLeft
    const midY = vm.topOffset + vm.vertLineHeight / 2

    if (vm.cy > midY) {
      cyNew = vm.cy - rectHeight() * 1.3
    } else {
      cyNew = vm.cy + rectHeight() * 0.3
    }
    if (vm.cx > midX) {
      cxNew = vm.cx - rectWidth * 1.2
    } else {
      cxNew = vm.cx + rectWidth * 0.2
    }
    return [cxNew, cyNew]
  }

  //   var cx = location.cx
  //   var cy = location.cy

  //   var minLeft = location.minLeft
  //   var maxRight = location.maxRight
  //   var topOffset = location.topOffset
  //   var vertLineHeight = location.vertLineHeight

  if (params.rectClass !== undefined) {
    rectClass = params.rectClass
  }
  if (params.rectMarginX !== undefined) {
    rectMarginX = params.rectMarginX
  }
  if (params.rectMarginY !== undefined) {
    rectMarginY = params.rectMarginY
  }
  if (params.rectStroke !== undefined) {
    rectStroke = params.rectStroke
  }
  if (params.rectStrokeWidth !== undefined) {
    rectStrokeWidth = params.rectStrokeWidth
  }
  if (params.rectFill !== undefined) {
    rectFill = params.rectFill
  }
  if (params.rectFillOpacity !== undefined) {
    rectFillOpacity = params.rectFillOpacity
  }
  if (params.rectRx !== undefined) {
    rectRx = params.rectRx
  }
  if (params.rectRy !== undefined) {
    rectRy = params.rectRy
  }
  if (params.rectWidth !== undefined) {
    rectWidth = params.rectWidth
  }
  if (params.labelMarginX !== undefined) {
    labelMarginX = params.labelMarginX
  }
  if (params.labelMarginX !== undefined) {
    labelMarginX = params.labelMarginX
  }

  for (var i = 0; i < params.labels.length; i++) {
    var label = params.labels[i]
    if (label.textOffsetX === undefined) {
      label.textOffsetX = 0
    }
    if (label.textClass === undefined) {
      label.textClass = _textClass
    }
    if (label.textFill === undefined) {
      label.textFill = _textFill
    }
    if (label.textAnchor === undefined) {
      label.textAnchor = _textAnchor
    }
    if (label.fontFamily === undefined) {
      label.labelfontFamily = _fontFamily
    }
    if (label.fontSize === undefined) {
      label.fontSize = _fontSize
    }
    if (label.textHeight === undefined) {
      label.textHeight = _textHeight
    }
    if (label.attrs === undefined) {
      label.attrs = []
    }
    labels.push(label)
  }
  rectCoords = setRectCoords()
  console.log('rectCoords', rectCoords)

  svg.select('.spotLabel').remove()
  svg.select('.spotBox').remove()

  svg.append('rect')
    .attr('class', rectClass)
    .attr(
      'transform',
      'translate(' + rectCoords[0] + ', ' + rectCoords[1] + ')')
    .attr('width', rectWidth)
    .attr('height', rectHeight())
    .attr('stroke', rectStroke)
    .attr('stroke-width', rectStrokeWidth)
    .attr('fill', rectFill)
    .attr('fill-opacity', rectFillOpacity)
    .attr('rx', rectRx)
    .attr('ry', rectRy)

  for (var lineNo = 0; lineNo < labels.length; lineNo++) {
    const label = labels[lineNo]
    console.log('label', label)
    svg.append('text')
      .attr('class', label.textClass)
      .attr(
        'transform',
        'translate(' +
          lineX(lineNo) + ', ' +
          lineY(lineNo) + ')')
      .text(label.text)
      .attr('text-anchor', label.textAnchor)
      .attr('fill', label.textFill)
      .attr('font-family', label.labelfontFamily)
      .attr('font-size', label.fontSize)

    for (var j = 0; j < label.attrs.length; j++) {
      const attr = label.attrs[j]
      svg.attr(attr[0], attr[1])
    }
  }
}
