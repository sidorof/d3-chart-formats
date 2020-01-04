// applyStyles.js
/* applyStyles
 *
 * This function accepts an svg object such as rect
 * and add styles to it
 */

export const applyStyles = (obj, styles) => {
  // uses a list due to observable problem
  if (styles !== undefined) {
    for (var i = 0; i < styles.length; i++) {
      const style = styles[i]
      if (style.length !== 2) {
        console.log('ERROR in applyStyles: style must be [attr, value]')
      }
      obj.style(style[0], style[1])
    }
  }
}
