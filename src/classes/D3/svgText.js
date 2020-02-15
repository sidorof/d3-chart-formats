// svgText.js
/* This isn't really a class, will be moved later.
 * This function appends to svg and places text in
 * specific locations with style attributes.
 *
 * This is not meant for transforms (or rotations)
 */
import { applyStyles } from './apply-styles'

export const svgText = (svg, textObj, scaleBasis) => {
  const text = svg.append('text')
    .attr('class', textObj.className)
    .attr('x', textObj.x)
    .attr('y', textObj.y)
    .attr('dominant-baseline', textObj['dominant-baseline'] === undefined
      ? 'none'
      : textObj['dominant-baseline']
    )
    .attr('text-anchor', 'middle')
    .attr('text-anchor', textObj['text-anchor'] === undefined
      ? 'middle'
      : textObj['text-anchor']
    )
    .text(textObj.text)

  applyStyles(text, textObj.styles, scaleBasis)
}
