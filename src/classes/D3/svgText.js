// svgText.js
/* This isn't really a class, will be moved later.
 * This function appends to svg and places text in
 * specific locations with style attributes.
 *
 * This is not meant for transforms (or rotations)
 */
import { applyStyles } from './apply-styles'

export const svgText = (svg, textLines) => {
  textLines.map((line) => {
    const dfltStyles = {
      fill: 'black',
      'font-size': '18'
    }

    const text = svg.append('text')
      .attr('class', line.className)
      .attr('x', line.x)
      .attr('y', line.y)
      // .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .text(line.text)

    var styles = { ...dfltStyles, ...line.styles }

    applyStyles(text, styles)
  })
}
