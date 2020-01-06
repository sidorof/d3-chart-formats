// classes/D3/D3Base.js
/* D3 Base class
 *
 * This is the base class for D3. It only defines only the
 * basic characteristics such as margins. The dimensions are
 * set by the component.
 *
 * Margins are a fraction such as 0.01
 *
 * The class is instantiated prior to the creation of the svg.
 * This facilitates keeping the plot open to dimension changes in
 * the window size.
 *
 */

import { applyStyles } from './apply-styles'

export class D3Base {
  constructor ({ d3, margin, className, styles }) {
    this.d3 = d3
    // margin is used in the calculation of svg width and height
    this.margin = {
      top: margin.top !== undefined ? margin.top : 0.0,
      bottom: margin.bottom !== undefined ? margin.bottom : 0.0,
      right: margin.right !== undefined ? margin.right : 0.0,
      left: margin.left !== undefined ? margin.left : 0.0
    }

    this.styles = styles !== undefined ? styles : {}
    this.className = className !== undefined ? className : {}
  }

  createSvg = (base, className, width, height) => {
    var chart = base
      .append('div')
      .attr('class', 'chart')

    var svg = chart.append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('padding', '0px')
      .style('overflow', 'hidden') // not sure if helps
      .style('display', 'block')
      .style('margin', 'auto')
      .style('background', 'white')

    applyStyles(svg, this.styles)

    return svg
  }

  addRect = (payload) => {
    var rect = payload.svg.append('rect')
      .attr('class', payload.className)
      .attr(
        'transform',
        'translate(' + payload.left + ',' + Math.round(payload.top) + ')')
      .attr('width', payload.width)
      .attr('height', payload.height)
    applyStyles(rect, payload.styles)

    return rect
  }

  marginStyle = () => {
    return ''.concat(
      (this.margin.top * 100) + '% ',
      (this.margin.bottom * 100) + '% ',
      (this.margin.right * 100) + '% ',
      (this.margin.left * 100) + '%'
    )
  }
}
