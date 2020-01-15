// apply-styles.js
/* apply-styles
 *
 * This function accepts an svg object such as rect
 * and add styles to it
 */
import { calcProportion } from '@/lib/D3/utils'

export const applyStyles = (obj, styles, scaleBasis) => {
  if (styles !== undefined) {
    styles = JSON.parse(JSON.stringify(styles))
    for (const key in styles) {
      var style = styles[key]
      if (typeof style === 'object') {
        // apply scaling
        const value = calcProportion(
          scaleBasis.value, scaleBasis, style.range
        )
        obj.style(key, value)
      } else {
        obj.style(key, style)
      }
    }
  }
}
