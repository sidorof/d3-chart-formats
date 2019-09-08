export default class Legend {
  /* Legend
   * Designed to fit into a max specified width. Length derives from the number
   * of entries, up to a length max
   *
   * Consists of:
   *  optional rectangle
   *  legend items (dot and label)
   *  links to series items (mouse)
   *
   * Hard-coded class names:
   *  rect: legend
   *  dot:  legendDot
   *  label: legendLabel
   *
   * NOTE:
   *  use actual char length of right-most label to help define right
   *    margin.
   *  create tool-tip detail for legend item
   */
  // spacing issues for legend items
  dotSize = 7 // size of dot
  selectDotSize = 11
  dotSizePadding = 16 // space after dot

  // is it spaced on width of item characters or fixed?
  itemPadding = 0 // padding between items if variable
  charWidth = 25 // used to calculate spacing

  itemFixedWidth = 50 // entire item width
  itemHeight = 20

  // upper left-hand corner
  left = 0 // start of legend at left
  top = 0 // start of legend at

  useRect = true // shows a background rectangle

  bottomRectY = null
  legendRectAttrs = [
    ['stroke', '#888'],
    ['strokeWidth', 0.5],
    // ['fill', 'none'],
    ['fill', 'white'],
    ['opacity', 1],
    ['rx', 7],
    ['ry', 7]
  ]
  legendLabelAttrs = [
    ['fontSize', '13px']
  ]

  transAttrs =
  {
    mouseover: {
      legendDot: {
        duration: 150,
        attrs: {}
      },
      series: {
        duration: 250,
        attrs: {
          'stroke-width': [0.4, 3] // ,
          // opacity: [0.4, 1]
        }
      }
    },
    mouseout: {
      legendDot: {
        duration: 250,
        attrs: {}
      },
      series: {
        'stroke-width': 1,
        opacity: 1
      }
    }
  }

  constructor (location, params) {
    this.left = location.left
    this.top = location.top
    this.maxWidth = location.maxWidth
    this.maxHeight = location.maxHeight

    // should this be in params: it is runtime
    this.colorScale = params.colorScale
    this.items = params.items

    this.dotSize = params.dotSize || this.dotSize
    this.selectDotSize = params.selectDotSize || this.selectDotSize
    this.dotSizePadding = params.dotSizePadding || this.dotSizePadding
    this.itemPadding = params.itemPadding || this.itemPadding
    this.itemFixedWidth = params.itemFixedWidth || this.itemFixedWidth
    this.itemHeight = params.itemHeight || this.itemHeight
    this.useRect = params.useRect || this.useRect

    if (params.legendRectAttrs !== undefined) {
      for (const attr in params.legendRectAttrs) {
        this.legendRectAttrs[attr] = params.legendRectAttrs[attr]
      }
    }

    if (params.classes !== undefined) {
      for (const key in this.classes) {
        this.classes[key] = params.classes[key] || this.classes[key]
      }
    }
    if (params.transAttrs !== undefined) {
      if (params.transAttrs.mouseover !== undefined) {
        const mouseover = params.transAttrs.mouseover
        for (const topic in mouseover) {
          this.transAttrs.mouseover[topic] = mouseover[topic]
        }
      }
      if (params.transAttrs.mouseout !== undefined) {
        const mouseout = params.transAttrs.mouseout
        for (const topic in mouseout) {
          this.transAttrs.mouseout[topic] = mouseout[topic]
        }
      }
    }
  }

  getTransAttrs = function () {
    var transAttrs = this.transAttrs
    transAttrs.mouseover.legendDot.attrs['r'] = [
      this.dotSize, this.selectDotSize]
    transAttrs.mouseout.legendDot.attrs['r'] = this.dotSize
    return transAttrs
  }

  itemWidth = function () {
    return (
      this.dotSize +
      this.dotSizePadding +
      this.itemFixedWidth +
      this.itemPadding)
  }

  rectWidth = function () {
    var itemsPerRow = this._itemsPerRow()
    if (this.items.length < itemsPerRow) {
      itemsPerRow = this.items.length
    }
    return itemsPerRow * this.itemWidth()
  }

  _itemsPerRow = function () {
    return (this.maxWidth / this.itemWidth()).toFixed(0)
  }

  rectHeight = function () {
    var rows = (this.items.length / this._itemsPerRow())
    if (rows.toFixed(0) < rows) {
      rows += 1
    }
    return (rows + 1.5) * this.itemHeight
  }

  _applyAttrs = function (obj, attrs) {
    // NOTE: this is a duped funcion: find permanent home
    for (var i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      obj.attr(attr[0], attr[1])
    }
  }

  doLegendItems = function (svg) {
    var row = 0
    var itemNo = 0

    const transAttrs = this.getTransAttrs()
    for (var count = 0; count < this.items.length; count++) {
      const item = this.items[count]

      // color left hand position
      var colorLeft = (
        this.dotSizePadding + (
          this.dotSizePadding + this.itemFixedWidth) * itemNo)

      if ((colorLeft + this.itemFixedWidth) > this.maxWidth) {
        row += 1
        colorLeft = this.dotSizePadding
        itemNo = 0
      }
      itemNo += 1

      const itemLeft = colorLeft + this.dotSizePadding + this.itemPadding
      const itemHeight = (this.itemHeight * (row + 1)) + 0.2 * this.itemHeight
      const colorHeight = (this.itemHeight * (row + 1))
      this.bottomRectY = this.top + itemHeight
      // the colored marker
      svg.append('circle')
        .attr('class', 'legendDot')
        .attr('r', this.dotSize)
        .attr('cx', this.left + colorLeft)
        .attr('cy', this.top + colorHeight)
        .attr('fill', this.colorScale(count))

      svg.append('text')
        .attr('class', 'legendLabel')
        .attr(
          'transform',
          'translate(' + (this.left + itemLeft) + ',' + (this.top + itemHeight) +
')'
        )
        .text(item)
        .attr('text-anchor', 'left')

      svg.selectAll('.legendDot')
        .attr('r', this.dotSize)
        .on('mouseover', function (d, i) {
          for (const cssClass in transAttrs.mouseover) {
            const topic = transAttrs.mouseover[cssClass]
            for (const attr in topic.attrs) {
              const val1 = topic.attrs[attr][0]
              const val2 = topic.attrs[attr][1]
              svg.selectAll('.' + cssClass).transition()
                .duration(topic.duration)
                .attr(attr, function (d, j) {
                  return j !== i ? val1 : val2
                })
            }
          }
        })
        .on('mouseout', function (d, i) {
          for (const cssClass in transAttrs.mouseout) {
            const topic = transAttrs.mouseout[cssClass]

            for (const attr in topic.attrs) {
              const val = topic.attrs[attr]
              svg.selectAll('.' + cssClass).transition()
                .duration(topic.duration)
                .attr(attr, val)
            }
          }
        })
    }
  }

  draw = function (svg) {
    this.doRect(svg)
    this.doLegendItems(svg)
  }

  doRect = function (svg) {
    var rect = svg.append('rect')
      .attr('class', 'legend')
      .attr(
        'transform',
        'translate(' + this.left + ',' + this.top + ')')
      .attr('width', this.rectWidth())
      .attr('height', this.rectHeight())
    this._applyAttrs(rect, this.legendRectAttrs)
  }

  // legendWidth = function (items) {
  //   // probably not going to be used
  //   // use this for last item in a row
  //   var canvas = document.createElement("canvas")
  //   const ctx = canvas.getContext('2d')
  //
  //   var font = ''
  //   if (this.legendFontWeight !== undefined) {
  //     font += this.legendFontWeight+ ' '
  //   }
  //   if (this.legendFontSize !== undefined) {
  //     font += this.legendFontSize + ' '
  //   }
  //   if (this.legendFont !== undefined) {
  //     // ctx.font = '400 16px sans-serif';
  //     font += this.legendFont
  //   }
  //   if (font.length > 0) {
  //     ctx.font = font.trim()
  //   }
  //   var totStr = ''
  //   const totPad = this.colorPadWidth() + this.itemPadding
  //   for (var i = 0; i < items.length; i++) {
  //     totStr += items[i]
  //   }
  //   var totLength = ctx.measureText(str).width
  //   totLength += totPad * items.length - 1
  //
  //   return totLength
  // }

  savedProperties = function () {
    return {}
  }
}
