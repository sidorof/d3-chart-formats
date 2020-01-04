// svgText.js
/* This isn't really a class, will be moved later.
 * This function appends to svg and places text in
 * specific locations with style attributes.
 */
import { applyStyles } from './applyStyles'

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

    var styles = { ...dfltStyles }

    if (line.styles !== undefined) {
      // add defaults if none present
      line.styles.forEach(
        (styleLine) => {
          styles[styleLine[0]] = styleLine[1]
        }
      )
    }
    applyStyles(text, Object.entries(styles))
  })
}
