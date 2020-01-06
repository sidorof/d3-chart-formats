// apply-styles.js
/* apply-styles
 *
 * This function accepts an svg object such as rect
 * and add styles to it
 */

export const applyStyles = (obj, styles) => {
  if (styles !== undefined) {
    console.log('styles', styles)
    Object.freeze(styles)
    console.log(Object.getOwnPropertyNames(styles))
    console.log('object keys', Object.keys(styles))
    Object.getOwnPropertyNames(styles).forEach((key) => {
      if (key !== '__ob__' && key !== 'length') {
        console.log('item', key, styles[key])
        obj.style(key, styles[key])
        console.log('style updated')
      }
    })
    // }
    // for (const key in styles) {
    //  obj.style(key, styles[key])
    // }
  }
}
