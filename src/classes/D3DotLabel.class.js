export default class D3DotLabel {
  /* D3 Dot Label for showing information about a specic point.
   *
   * Consists of a rectangle with explanatory lines inside.
   * For example, the box contains
   *  1: ticker
   *  2: date
   *  3: value
   *
   * Variables:
   * textOffsetX  offset of the label from the point
   *  varies depending on how close to the axes
   */

  // rectangle defaults
  rectCoords = null
  rectClass = 'spotBox'
  rectMarginX = 15
  rectMarginY = 30
  rectStroke = '#333'
  rectStrokeWidth = '0.5'
  rectFill = 'white'
  rectFillOpacity = '0.5'
  rectRx = '8'
  rectRy = '8'
  rectWidth = '100'
  rectAttrs = []

  // line defaults
  labels = []
  _textHeight = 20
  _textClass = 'spotLabel'
  _textFill = 'darkblue'
  _textAnchor = 'center-align'
  _fontFamily = 'Arial;'
  _fontSize = '13px;'

  // dot defaults
  dotClass = 'spotDot'
  dotFill = null
  dotR = 8
  dotAttrs = []

  constructor (location, params) {
    this.cx = location.cx
    this.cy = location.cy

    this.minLeft = location.minLeft
    this.maxRight = location.maxRight
    this.topOffset = location.topOffset
    this.vertLineHeight = location.vertLineHeight

    if (params.rectClass !== undefined) {
      this.rectClass = params.rectClass
    }
    if (params.rectMarginX !== undefined) {
      this.rectMarginX = params.rectMarginX
    }
    if (params.rectMarginY !== undefined) {
      this.rectMarginY = params.rectMarginY
    }
    if (params.rectStroke !== undefined) {
      this.rectStroke = params.rectStroke
    }
    if (params.rectStrokeWidth !== undefined) {
      this.rectStrokeWidth = params.rectStrokeWidth
    }
    if (params.rectFill !== undefined) {
      this.rectFill = params.rectFill
    }
    if (params.rectFillOpacity !== undefined) {
      this.rectFillOpacity = params.rectFillOpacity
    }
    if (params.rectRx !== undefined) {
      this.rectRx = params.rectRx
    }
    if (params.rectRy !== undefined) {
      this.rectRy = params.rectRy
    }
    if (params.rectWidth !== undefined) {
      this.rectWidth = params.rectWidth
    }
    if (params.labelMarginX !== undefined) {
      this.labelMarginX = params.labelMarginX
    }
    if (params.labelMarginX !== undefined) {
      this.labelMarginX = params.labelMarginX
    }

    for (var i = 0; i < params.labels.length; i++) {
      var label = params.labels[i]
      if (label.textOffsetX === undefined) {
        label.textOffsetX = 0
      }
      if (label.textClass === undefined) {
        label.textClass = this._textClass
      }
      if (label.textFill === undefined) {
        label.textFill = this._textFill
      }
      if (label.textAnchor === undefined) {
        label.textAnchor = this._textAnchor
      }
      if (label.fontFamily === undefined) {
        label.labelfontFamily = this._fontFamily
      }
      if (label.fontSize === undefined) {
        label.fontSize = this._fontSize
      }
      if (label.textHeight === undefined) {
        label.textHeight = this._textHeight
      }
      if (label.attrs === undefined) {
        label.attrs = []
      }
      this.labels.push(label)
    }

    if (params.dotClass !== undefined) {
      this.dotClass = params.dotClass
    }
    if (params.dotFill !== undefined) {
      this.dotFill = params.dotFill
    }
    if (params.dotR !== undefined) {
      this.dotR = params.dotR
    }
    if (params.dotAttrs !== undefined) {
      this.dotAttrs = params.dotAttrs
    }
    this.setRectCoords()
  }

  rectHeight = function () {
    return this.rectMarginY + this._accumLineOffset(this.labels.length)
  }

  lineX = function (lineNo) {
    return (
      this.rectCoords[0] + this.rectMarginX + this.labels[lineNo].textOffsetX
    )
  }

  lineY = function (lineNo) {
    return this.rectCoords[1] + this.rectMarginY + this._accumLineOffset(lineNo)
  }

  _accumLineOffset = function (lineNo) {
    var offset = 0
    var i = 0
    while (i < lineNo) {
      if (i < this.labels.length) {
        offset += this.labels[i].textHeight
      }
      i += 1
    }
    return offset
  }

  setRectCoords = function () {
    var cx, cy
    const midX = (this.maxRight - this.minLeft) / 2 + this.minLeft
    const midY = this.topOffset + this.vertLineHeight / 2

    if (this.cy > midY) {
      cy = this.cy - this.rectHeight() * 1.3
    } else {
      cy = this.cy + this.rectHeight() * 0.3
    }
    if (this.cx > midX) {
      cx = this.cx - this.rectWidth * 1.2
    } else {
      cx = this.cx + this.rectWidth * 0.2
    }
    this.rectCoords = [cx, cy]
  }

  _applyAttrs = function (obj, attrs) {
    for (var i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      obj.attr(attr[0], attr[1])
    }
  }

  svgRect = function (svg) {
    // figure out why this does not work well
    // svg.select('.' + this.rectClass).remove()
    // for (var i = 0; i < this.labels.length; i++) {
    //   const label = this.labels[i]
    //   svg.select('.' + this.textClass).remove()
    // }
    // svg.select('.' + this.dotClass).remove()

    svg.append('rect')
      // .attr('class', this.rectClass)
      .attr('id', 'spot')
      .attr(
        'transform',
        'translate(' + this.rectCoords[0] + ', ' + this.rectCoords[1] + ')')
      .attr('width', this.rectWidth)
      .attr('height', this.rectHeight())
      .attr('fill', this.fill)
      .attr('stroke', this.rectStroke)
      .attr('stroke-width', this.rectStrokeWidth)
      .attr('fill', this.rectFill)
      .attr('fill-opacity', this.rectFillOpacity)
      .attr('rx', this.rectRx)
      .attr('ry', this.rectRy)

    // this._applyAttrs(rect, this.rectAttrs)

    return svg
  }

  svgText = function (svg) {
    for (var lineNo = 0; lineNo < this.labels.length; lineNo++) {
      const label = this.labels[lineNo]
      svg.append('text')
        .attr('class', label.textClass)
        .attr('id', 'spot')
        .attr(
          'transform',
          'translate(' +
            this.lineX(lineNo) + ', ' +
            this.lineY(lineNo) + ')')
        .text(label.text)
        .attr('text-anchor', label.textAnchor)
        .attr('fill', label.textFill)
        .attr('font-family', label.labelfontFamily)
        .attr('font-size', label.fontSize)

      // this._applyAttrs(svg, label.attrs)
    }
    return this.svg
  }

  svgDot = function (svg) {
    svg.append('circle')
      .attr('class', this.dotClass)
      .attr('id', 'spot')
      .attr('fill', this.dotFill)
      .attr('r', this.dotR)
      .attr('cx', this.cx)
      .attr('cy', this.cy)
    // this._applyAttrs(svg, this.dotAttrs)
  }

  draw = function (svg) {
    this.remove(svg)
    this.svgRect(svg)
    this.svgText(svg)
    this.svgDot(svg)
  }

  remove = function (svg) {
    svg.select('#spot.spotLabel').remove()
    svg.select('#sopt.spotBox').remove()
    svg.select('#spot.spotDot').remove()
    svg.select('#spot').remove()
  }

  savedProperties = function () {
    return {
      textOffsetX: this.textOffsetX,
      labelMarginX: this.labelMarginX,
      textHeight: this.textHeight,
      rectOffset: this.rectOffset,
      labels: this.labels,

      rectWidth: this.rectWidth,
      rectHeight: this.rectHeight
    }
  }
}
